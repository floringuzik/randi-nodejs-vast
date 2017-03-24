AdsWizzAd
=========

A small Node.js library providing methods to request ads from AdsWizz and report the tracking URLs


## Installation

`npm install request xml2js async adswizzad --save`  
`npm install`  

## Usage
`var AdsWizzAd = require("adswizzad");`  
`var vast = new AdsWizzAd("demo", 12288);`  
`var vastCallback = function() {`  
`&nbsp;&nbsp;&nbsp;&nbsp;console.log("here it is" );`  
`&nbsp;&nbsp;&nbsp;&nbsp;console.log(vast.getMediaFile());`  
`&nbsp;&nbsp;&nbsp;&nbsp;console.log(vast.getMediaFileDurationInSeconds());`  
`&nbsp;&nbsp;&nbsp;&nbsp;vast.reportImpressions();`  
`};`  
`vast.vastRequest(vastCallback);`  


## Release History
* 1.0.0 Initial release
