var hrs = 60*60*1000;
var days = 24*hrs;
var weeks = 7*days;

var StorageUtil = require('./storageutil.js');

var SettingsUtil = {
	// Every x letters, one can be wrong.
	ERROR_ALLOWANCE: 4,
	LOCKS_ENABLED: true,
	    //srs 4h, 8h, 24h, 3d (guru), 1w, 2w (master), 1m (enlightened), 4m (burned)
    
	srsObject: [
		{level: 0, rank: "Started",		duration: 0}, 
		{level: 1, rank: "Apprentice",	duration: 4*hrs},
		{level: 2, rank: "Apprentice",	duration: 8*hrs},
		{level: 3, rank: "Apprentice",	duration: 1*days},
		{level: 4, rank: "Apprentice",	duration: 3*days},
		{level: 5, rank: "Guru",		duration: 1*weeks},
		{level: 6, rank: "Guru",		duration: 2*weeks},
		{level: 7, rank: "Master",		duration: 730*hrs},
		{level: 8, rank: "Enlightened",	duration: 2922*hrs},
		{level: 9, rank: "Burned"}
	]
};

module.exports = SettingsUtil;