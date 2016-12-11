# Heal
Play an adjustable collection of healing tones to the speaker using ``speaker-test`` from ``alsa-utils``.

### alsa-utils and Linux

I'm targeting this first version to just Linux, noting that ``alsa-utils`` from the Open Sound System (OSS) interface is loaded by default on Raspian where I'm testing this on a Raspberry Pi 3.

### Installation (assumes that you already have Node.js and npm installed)

````
git clone https://github.com/OutsourcedGuru/heal.git
cd heal
npm install
DEBUG=heal:* npm start
````

If your server doesn't have an internal speaker then plug in headphones or a speaker to the headphone jack. The sound is meant to be server-based (rather than client-based) since this was by design.*

### Surfing the created website

Depending upon where you are running the server, either:

[http://localhost:3000](http://localhost:3000)

...or http://*device-ip-address*:3000

### Webpage

The website offers a selection of tones which may be played. Once started, a Stop button is displayed, allowing a new tone to be supplied.

### Notes

I could not otherwise find a node module which very simply plays or otherwise synthesizes a tone on the server. Everything I found was both client-side and required a browser window object, neither of which filled my needs here since it's a headless, server-side project.

\* Intentionally, I created this so that the sound events would occur on the server since I'm implementing this on a Raspberry Pi 3 device.  In theory, the user would initiate the controls on their cellphone, surfing the Pi by its name plus port.