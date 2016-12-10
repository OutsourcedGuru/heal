'use strict';

var child_process = require('child_process');
var path = require('path');
var tone = exports;
var childD;
var killed = false;

/**
 * Uses system libraries to play tone via the speakers.
 *
 * @param {number} hertz Frequency in hertz of tone (e.g. 528)
 * @param {Function|null} callback A callback of type function(err) to return.
 */
tone.play = function(hertz, callback) {
  var commands, pipedData;

  if (typeof callback !== 'function') {
    callback = function() {};
  }

  commands = [ '-c', 2, '-t', 'sine', '-f', hertz ];
  //commands = ['--pipe'];
  //pipedData = '';

  childD = child_process.spawn('speaker-test', commands);
  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');
  //childD.stdin.end(pipedData);

  // Log the output of the speaker-test command itself
  childD.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    if (killed) { return; }
    console.log('pid: ' + childD.pid);
    callback(null, childD.pid);
  });
  // If there is an error running speaker-test, do our best
  childD.stderr.once('data', function(data) {
    // we can't stop execution from this function
    callback(new Error(data));
  });
  // Listen for the end of the function
  childD.addListener('exit', function (code, signal) {
    console.log('Exit function invoked.');
    if (code === null || signal !== null) {
      return callback(new Error('tone.js: could not talk, had an error [code: ' + code + '] [signal: ' + signal + ']'));
    }
    childD = null;
    callback(null);
    killed = false;
  });

}

/**
 * Stops currently playing tone. There will be unexpected results if multiple tones are being played at once.
 *
 * TODO: If two tones are being played simultaneously, childD points to new instance, no way to kill previous
 */
exports.stop = function(callback, pid) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  if (!childD) {
    return callback(new Error('stop() said "No sound to kill"'));
  }
  console.log('stop() attempting to kill process: ' + pid);
  process.kill(pid);
  killed = true;
  callback(null);
};
