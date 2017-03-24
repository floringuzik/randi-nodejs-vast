AdsWizz AdsWizz
===============

A small library providing methods to request ads from AdsWizz and report the tracking URLs


## Installation

`npm install request xml2js async adswizzad --save`
`npm install`

## Usage
var AdsWizzAd = require("adswizzad");
var vast = new AdsWizzAd("demo", 12288);
var vastCallback = function() {
	console.log("here it is" );
	console.log(vast.getMediaFile());
	console.log(vast.getMediaFileDurationInSeconds());
	vast.reportImpressions();
};
vast.vastRequest(vastCallback);

## Test
node AdsWizzAdTest.js

## Release History
* 1.0.0 Initial release
