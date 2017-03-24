'use strict';
const request = require('request');

//Private
var VAST_URL_PATTERN  = 'http://{instance}.deliveryengine.adswizz.com/www/delivery/swfIndex.php?reqType=AdsSetup&protocolVersion=2.0-compliant&zoneId={zoneId}&protocolAnswer=3&cb=';
var DAAST_URL_PATTERN = 'http://{instance}.deliveryengine.adswizz.com/www/delivery/daastIndex.php?zoneId={zoneId}&protocolVersion=1.0&protocolAnswer=2&reqType=AdRequest&cb=';


function AdsWizzAd(instance, zoneId) {
    this.instance = instance;
    this.zoneId = zoneId; 
    this.impressions = [];
	this.requestParameters = [];
   
}
// class methods
AdsWizzAd.prototype.getMediaFile = function(){
	return this.mediaFile;
}

AdsWizzAd.prototype.getMediaFileDurationInSeconds = function() {
	return this.mediaFileDuration;
}

AdsWizzAd.prototype.addRequestParameter = function(name, value) {
	this.requestParameters.push(name + "=" + encodeURI(value));
}

AdsWizzAd.prototype.reportImpressions = function(){
	const async = require('async');
	async.map(this.impressions, request, function(err, results) {
		if (err) throw(err);          // handle error 
		console.log(results.length);  // == urls.length
	});
}

AdsWizzAd.prototype.vastRequest = function(callback) {
	var url = (VAST_URL_PATTERN.replace("{instance}",this.instance)).replace("{zoneId}",this.zoneId) + Math.random().toString(36).substring(7);
	for (var i in this.requestParameters) {
		url += ("&" + this.requestParameters[i]);
	}
	console.log("VAST request: " + url);
	request.get({
		url: url,
		json: true,
		headers: {'User-Agent': 'request'}
	}, (err, res, data) => {
		if (err) {
			console.log('Error:', err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', res.statusCode);
		} else {
			try {
				this.mediaFile = data.vast.ad[0].inLine.creatives.creative[0].linear.mediaFiles.mediaFile[0].value;
				if (data.vast.ad[0].inLine.creatives.creative[0].linear.duration) {
					var durationElem = data.vast.ad[0].inLine.creatives.creative[0].linear.duration.split(":");
					this.mediaFileDuration = Number(durationElem[2]) + Number(durationElem[1]) * 60 + Number(durationElem[0]) * 3600;
				}
			} catch(err) {
				this.mediaFile = null;
			}
			console.log("mediaFile: " + this.mediaFile);

			for(var exKey in data.vast.ad[0].inLine.impression) {
				console.log("Impression: " + data.vast.ad[0].inLine.impression[exKey].value);
				this.impressions.push(data.vast.ad[0].inLine.impression[exKey].value);
			}
			
			console.log((this.impressions.length == 0 ? "No" : this.impressions.length.toString()) + " impression tracking URL" + (this.impressions.length > 1 ? "s have" : " has") + " been found.");

		}
		callback();
	});    
};

AdsWizzAd.prototype.daastRequest = function(callback) {
	var url = (DAAST_URL_PATTERN.replace("{instance}",this.instance)).replace("{zoneId}",this.zoneId) + Math.random().toString(36).substring(7);
	for (var i in this.requestParameters) {
		url += ("&" + this.requestParameters[i]);
	}
	console.log("DAAST request: " + url);
	request.get({
		url: url,
		json: true,
		headers: {'User-Agent': 'request'}
	}, (err, res, data) => {
		if (err) {
			console.log('Error:', err);
		} else if (res.statusCode !== 200) {
			console.log('Status:', res.statusCode);
		} else {
			//console.log(data);
			var xml = parseXml(data);
			const xml2js = require("xml2js");
			xml2js.parseString(data, function (error, json) {
				if (error) {
					console.log(error);
				} else {
					//console.log(json);
					if (json.DAAST.Ad && json.DAAST.Ad.length > 0) {
						//We got an ad from ad-server
						if (json.DAAST.Ad[0].InLine && json.DAAST.Ad[0].InLine.length > 0) {
							//We got an inline audio ad
							var inlineAd = json.DAAST.Ad[0].InLine[0];
							
							//Determine impression URL
							if (inlineAd.Impression) {
								//console.log(inlineAd.Impression);
								for (var exKey in inlineAd.Impression) {
									console.log("Impression: " + inlineAd.Impression[exKey]._);
									
								}
							}
						}
					}
				}
			});
		}
		callback();
	});    
};

// export the class
module.exports = AdsWizzAd;


