var express = require('express');
var router = express.Router();
var tone = require('../tone');
var bInit = true;

/* GET home page. */
//router.get('/', function(req, res, next) {
//    tone.play(528, function(errPlay, pid) {
//    if (errPlay) { console.log('play() returned with error set'); }
//    if (pid && bInit) {
//      console.log('get() saw process: ' + pid);
//      bInit = false;
//      setTimeout(function() { tone.stop(null, pid); }, 1000)
//    }
//  });
//  res.render('index', { title: 'Heal' });
//  bInit = true;
//});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Heal', hertz: null, pid: null });
});

/* POST back to home page. */
router.post('/stop', function(req, res, next) {
  console.log('POST /stop : ', req.body.pid);
  setTimeout(function() { tone.stop(null, req.body.pid); }, 100);
  res.redirect('/');
});      // router.post()

router.post('/', function(req, res, next) {
  console.log('POST / : ', req.body.hertz);

  tone.play(req.body.hertz, function(errPlay, pid) {
    if (errPlay) { console.log('play() returned with error set'); }
    if (pid && bInit) {
      console.log('get() saw process: ' + pid);
      bInit = false;
      //setTimeout(function() { tone.stop(null, pid); }, 1000);

      res.render('index', {
        title: 'Playing healing frequency ' + req.body.hertz,
        hertz: req.body.hertz,
        pid: pid
      });  // res.render()

    }      // if (pid...)
  });

  bInit = true;
});      // router.post()

module.exports = router;
