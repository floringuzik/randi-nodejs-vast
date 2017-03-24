var AdsWizzAd = require("./index.js");
// Checks whether minimum of 3 parameters have been entered


var vast = new AdsWizzAd("demo", 12288);
var vastCallback = function() {
	console.log("here it is" );
	console.log(vast.getMediaFile());
	console.log(vast.getMediaFileDurationInSeconds());
	vast.reportImpressions();
};
vast.vastRequest(vastCallback);

/*
var daast = new AdsWizzAd("chimay", 489387);
daast.addRequestParameter("aw_0_1st.accelerometer", "true");
var daastCallback = function() {
	console.log("here it is" );
	console.log(daast.getMedia());
	daast.reportImpressions();
};
daast.daastRequest(daastCallback);
*/
//setTimeout(ad.reportImpression(), 100000);