AdsWizzAd
=========

A small Node.js library providing methods to request ads from AdsWizz and report the tracking URLs


## Installation

`npm install request xml2js async adswizzad --save`   

## Usage
`var AdsWizzAd = require("adswizzad");`  
`var vast = new AdsWizzAd("demo", 12288);`  
`var vastCallback = function() {`   
`	   console.log(vast.getMediaFile());`  
`	   console.log(vast.getMediaFileDurationInSeconds());`  
`	   vast.reportImpressions();`  
`};`  
`vast.vastRequest(vastCallback);`  


## Release History
* 1.0.0 Initial release
