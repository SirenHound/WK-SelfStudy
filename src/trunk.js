// shut up JSHint
/* jshint jquery: true, expr: true, indent:2 */
/* global window, wanakana, XDomainRequest */


 
 /** Describes any object that can be reviewed or learned, includes IRadical, IKanji, and IVocabulary
 * @typedef {Object} Task
 * @property {boolean|string} locked - locked
 * @property {boolean|string} manualLock - manualLock
 */

//GM_addStyle shim for compatibility with greasemonkey
var gM_addStyle = function(CssString){
	//get DOM head
	if (document.head) {
		//build style tag
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.textContent = CssString;
		//insert DOM style into head
		document.head.appendChild(style);
	}
};

 
var StorageUtil = require('./storageutil.js');
var SettingsUtil = require('./settingsutil.js');
var ImportUtil = require('./importutil.js');
var WanikaniUtil = require('./wanikaniutil.js');
var MarkingUtil = require('./markingutil.js');
var SetReviewsUtil = require('./setreviewsutil.js');
var ObjectUtil = require('./objectutil.js');
var WanikaniDomUtil = require('./wanikanidomutil.js');
var ServerUtil = require('./serverutil');
var ReviewSessionUtil = require('./reviewsessionutil.js');
var UserClass = require('./userclass.js');

// Make a display window class for all inputs, this is an instance of such.
var EditWindowFunctions = require('./editwindow.js');

var isBeingRunLocally = window.document.location.protocol === "file:";

var main = function(){
    "use strict";
	
	console.log("Browser: ", navigator.userAgent);
	// Get the element to attach the menu to
	var nav = window.document.location.protocol === "https:" ? WanikaniDomUtil.getNavBar() : document.body;

	var mockjax = document.createElement("script");
	mockjax.setAttribute('src', 'https://cdn.jsdelivr.net/jquery.mockjax/1.6.1/jquery.mockjax.js');
	mockjax.setAttribute('type', 'text/javascript');

	var wanakana = document.createElement("script");
	wanakana.setAttribute('src', 'https://rawgit.com/WaniKani/WanaKana/master/lib/wanakana.js');
	wanakana.setAttribute('type', 'text/javascript');
	

	var wanakanaLocal = document.createElement("script");
	wanakanaLocal.setAttribute('src', 'wanakana.js');
	wanakanaLocal.setAttribute('type', 'text/javascript');

	if (typeof jQuery !== "undefined"){
		document.head.insertBefore(mockjax, document.head.firstChild);
	}
	document.head.insertBefore(wanakana, document.head.firstChild);
	
	if (window.document.location.protocol === "file:") {
	    document.head.insertBefore(wanakanaLocal, document.head.firstChild);
	}
	
	// TODO make sure selfStudyMenu has been built before adding
	nav.appendChild(document.selfStudyMenu);

	document.body.appendChild(userWindow);
	document.getElementById("WKSS-user").style.display = 'none';
	document.body.appendChild(addAddWindow);
	document.getElementById("WKSS-add").style.display = 'none';
	document.body.appendChild(addEditWindow);
	document.getElementById("WKSS-edit").style.display = 'none';
	document.body.appendChild(exportWindow);
	document.getElementById("WKSS-export").style.display = 'none';
	document.body.appendChild(importWindow);
	document.getElementById("WKSS-import").style.display = 'none';
	document.body.appendChild(resultsWindow);
	document.getElementById("WKSS-resultwindow").style.display = 'none';
	document.body.appendChild(selfStudyWindow);
	document.getElementById("WKSS-selfstudy").style.display = 'none';
	
	addClickEvent(document.getElementById("AutofillUserBtn"), autoFillUser);
	addClickEvent(document.getElementById("AddItemBtn"), handleAddClick);
	addClickEvent(document.getElementById("AddCloseBtn"), function () {
		document.getElementById("WKSS-add").style.display = 'none';
		document.getElementById("addForm").reset();
		document.getElementById("addStatus").innerText = 'Ready to add..';
		WanikaniDomUtil.removeClass(document.getElementById("addKanji"), "error");
		WanikaniDomUtil.removeClass(document.getElementById("addMeaning"), "error");
	});
	addClickEvent(document.getElementById("ResetLevelsBtn"), EditWindowFunctions.resetLevels);
	addClickEvent(document.getElementById("EditEditBtn"), EditWindowFunctions.editEditHandler);
	addClickEvent(document.getElementById("EditSaveBtn"), SetReviewsUtil.editSaveHandler);
	addClickEvent(document.getElementById("EditDeleteBtn"), EditWindowFunctions.editDelete);
	addClickEvent(document.getElementById("EditDeleteAllBtn"), EditWindowFunctions.editDeleteAll);
	addClickEvent(document.getElementById("WKSS-editCloseBtn"), function () {
		document.getElementById("WKSS-edit").style.display = 'none';
		document.getElementById("WKSS-editForm").reset();
		document.getElementById("WKSS-editStatus").innerText = 'Ready to edit...';
	});
	addClickEvent(document.getElementById("ExportItemsBtn"), function () {
		if (localStorage.getItem('User-Vocab')) {
			document.getElementById("exportForm").reset();
			var vocabList = StorageUtil.getVocList();
			document.getElementById("exportArea").innerText = JSON.stringify(vocabList);
			document.getElementById("exportStatus").innerText = "Copy this text and share it with others!";
		}
		else {
			document.getElementById("exportStatus").innerText = "Nothing to export yet :(";
		}
	});
	addClickEvent(document.getElementById("ExportSelectAllBtn"), function () {
		if (document.getElementById("exportArea").value.length !== 0) {
			select_all("exportArea");
			document.getElementById("exportStatus").innerText = "Don't forget to CTRL + C!";
		}
	});
	addClickEvent(document.getElementById("ExportCsvBtn"), function () {
		var vocabList = StorageUtil.getVocList();
		var CsvFile = createCSV(vocabList);
		window.open(CsvFile);
	});
	addClickEvent(document.getElementById("WKSS-exportCloseBtn"), function () {
		document.getElementById("export").style.display = 'none';
		document.getElementById("exportForm").reset();
		document.getElementById("exportArea").innerText = "";
		document.getElementById("exportStatus").innerText = 'Ready to export..';
	});
	addClickEvent(document.getElementById("ImportCsvBtn"), function () {
	});
	addClickEvent(document.getElementById("ImportWKBtn"), function(){
		WanikaniUtil.getServerResp(APIkey,"vocabulary", WanikaniUtil.onStateChangeHandler);
		console.log("maybe?");
	});
	addClickEvent(document.getElementById("ImportItemsBtn"), SetReviewsUtil.importItemsHandler);
	addClickEvent(document.getElementById("WKSS-importCloseBtn"), function () {
		document.getElementById("import").style.display = 'none';
		document.getElementById("importForm").reset();
		document.getElementById("importArea").innerText = "";
		document.getElementById("importStatus").innerText = 'Ready to import..';
	});
	addClickEvent(document.getElementById("WKSS-SelfstudyCloseBtn"), SetReviewsUtil.endReviewSession);
	addClickEvent(document.getElementById("WrapUpBtn"), function() {
		var sessionList = StorageUtil.localGet('User-Review')||[];
			var statsList = StorageUtil.sessionGet('User-Stats')||[];
		//if an index in sessionList matches one in statsList, don't delete
		var sessionI = sessionList.length;
		var item = StorageUtil.sessionGet('WKSS-item')||[];
		var arr2 = [];
		//for every item in sessionList, look for index in statsList,
		//if not there (-1) delete item from sessionList
		while (sessionI--){
			var index = ObjectUtil.findIndex(statsList,sessionList[sessionI]);
			if ((Math.sign(1/index) !== -1)||(sessionList[sessionI].index == item.index)){

				arr2.push(sessionList[sessionI]);
			}
		}
		console.log(arr2);
		StorageUtil.localSet('User-Review', arr2);
	});
	addClickEvent(document.getElementById("AudioButton"), function () {
		openInNewTab(document.getElementById('rev-audio').innerHTML);
	});
	addClickEvent(document.getElementById("WKSS-ReviewresultsCloseBtn"), function () {
		document.getElementById("WKSS-resultwindow").style.display = 'none';
		document.getElementById("stats-a").innerHTML = "";
	});

	document.getElementById("upload") && document.getElementById("upload").addEventListener('change', ImportUtil.fileUpload, false);
	
	document.getElementById("rev-input").addEventListener('keyup', MarkingUtil.reviewKeyUpHandler);

};

var APIkey = StorageUtil.getSetApi();
console.log("APIkey: ", APIkey);
var userFactory = function(APIkey){
	this.loggedInUser = new UserClass(APIkey);
};
var user = {};
// Calls the function argument (userFactory) with the logged in APIkey as its argument
ServerUtil.getLoggedInUserAPI(userFactory.bind(user));
// Default settings
StorageUtil.localSetFirstTime('WKSS-settings', {
	//Disable vocab locks (unlocked items persist until deleted)
	locksOn: true,
	//Set to false to unlock Kanji is not available on WaniKani (ie. not returned by API)
	lockDB: true,
	//Include English to ひらがな reading reviews
	reverse: true,
	debugging: true,
	//Push user reviews into the main WK review queue
	asWK: true,
	//every x letters, you can make one mistake when entering the meaning
	errorAllowance: 4
});
var WKSS_Settings = StorageUtil.localGet('WKSS-settings');
// Set log function as per settings
var nativeLog = console.log;
console.log = WKSS_Settings.debugging ? function () {
	var args = arguments;
	if (typeof arguments[0] === 'string') {
		args[0] = "WKSS: " + arguments[0];
	}
	else {
		Array.prototype.unshift.call(args, "WKSS: ");
	}
	nativeLog.apply(console, args);
} : function () {
};

/**  JQuery fixes
 */
if (typeof jQuery !== "undefined"){
	$("[placeholder]").focus(function () {
		var input = $(this);
		if (input.val() == input.attr("placeholder")) {
			input.val("''");
			input.removeClass("'placeholder'");
		}
	}).blur(function () {
		var input = $(this);
		if (input.val() == "''" || input.val() == input.attr("placeholder")) {
			input.addClass("placeholder");
			input.val(input.attr("placeholder"));
		}
	}).blur();

	$("[placeholder]").parents("form").submit(function () {
		$(this).find("[placeholder]").each(function () {
			var input = $(this);
			if (input.val() == input.attr("placeholder")) {
				input.val("");
			}
		});
	});
}
 
//track versions & datatypes
StorageUtil.localSet("WKSSdata", {
	v: "0.1.13",
	propertyType: {
		meaning: "array", reading: "array", kanji: "string", i:"number", components: "array", date: "number", due: "number", locked: "string", manualLock: "string"
	},
	propertyDesc: {
		meaning: "list of meanings", reading: "list of readings", kanji: "item prompt", i:"item index", components: "kanji found in word", date: "timestamp of new level", due: "timestamp of item's next review", locked: "indicator of whether components are eligible", manualLock: "latch for 'locked' so failing components don't re-lock the item"
	}
});

// Initialise User-Vocab
StorageUtil.initStorage();

//ReviewSessionUtil.shoehornIntoWaniKani();
var reviewActive;
var showUserWindow = function() {
	Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = '';});
	document.getElementById("WKSS-user").style.display = '';
};

/*
*  Add Item
*/
// event function to open "add window" and close any other window that might be open at the time.
var WKSS_add = function () {
	Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = 'none';});
	//show the add window
	document.getElementById("WKSS-add").style.display = '';
};

var handleAddClick = require('./handleAddClick.js');

/**  Edit Items
*/
var WKSS_edit = function () {
	EditWindowFunctions.generateEditOptions();
	Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = 'none';});
	document.getElementById("WKSS-edit").style.display = '';
};
/**  Export
*/
var WKSS_export = function () {
	Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = 'none';});
	document.getElementById("WKSS-export").style.display = '';
};

/**  Import
*/
var WKSS_import = function () {
	Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = 'none';});
	document.getElementById("WKSS-import").style.display = '';
};

/**  Review Items
*/
var WKSS_review = function (evt) {
	//is there a session waiting in storage?
	if(StorageUtil.localGet('User-Review')) {

		Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function(el){el.style.display = 'none';});
		document.getElementById("WKSS-selfstudy").style.display = '';
		MarkingUtil.startReview();
	}
};

//declare global values for keyup event
//is an answer being submitted?
//var submit = true;

var buildNode = require('./buildnode.js');
var buildWindow = require('./buildwindow.js');
var windowObjects = require('./windowobjects.js');

var autoFillUser = function(evt){
	console.info(user.loggedInUser);
			document.getElementById("zxuserApi").val(user.loggedInUser._api);
	StorageUtil.saveUserApi(user.loggedInUser._api);
	document.getElementById("WKSS-username").append(user.loggedInUser.getUsername());
};

var addClickEvent = function(el, handler, cxt){
	el.addEventListener('click', handler.bind(cxt));
};

var userWindow = buildWindow(windowObjects.user);

var addAddWindow = buildWindow(windowObjects.addVocab);
var addEditWindow = buildWindow(windowObjects.editTask);
var exportWindow = buildWindow(windowObjects.export);

var select_all = function(str) {
	var text_val = document.getElementById(str);
	console.log(text_val);
	text_val.focus();
	text_val.select();
};


var createCSV = function(JSONstring){
	var JSONobject = (typeof JSONstring === 'string') ? JSON.parse(JSONstring) : JSONstring;
	var key;
	var CSVarray = [];
	var header = [];  
	var id = JSONobject.length;
	if (id){//object not empty
		for (key in JSONobject[0]){
			if (JSONobject[0].hasOwnProperty(key)){
				header.push(key);
			}
		}
	}
	CSVarray.push(header.join(','));

	while(id--){
		var line = [];
		var h = header.length;
		while(h--){// only do keys in header, in the header's order. //JSONobject[id]){
			key = header[h];
			if(JSONobject[id][key] !== undefined){
				if (ObjectUtil.isArray(JSONobject[id][key])){
					//parse array here
					line.push(JSONobject[id][key].join("\t"));
				}else{
					line.push(JSONobject[id][key]);
				}
			}
		}line = line.reverse();
		CSVarray.push(line.join(','));
	}
	var CSVstring = CSVarray.join("\r\n");

	return encodeURI("data:text/csv;charset=utf-8," + CSVstring);
};


var importWindow = buildWindow(windowObjects.import);

var playAudio = function() {
	var kanji = document.getElementById('rev-kanji').innerHTML;
	var kana = (document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/))[0];

	document.getElementById('rev-audio').innerHTML = "";
	document.getElementById('audio-form').action = "";
	//document.getElementById('AudioButton').disabled = true;

	if( !kanji.match(/[a-zA-Z]+/i) && !kana.match(/[a-zA-Z]+/i)) {

		kanji = encodeURIComponent(kanji);
		kana = encodeURIComponent(kana);
		var i;

		var newkanji = "";
		for(i = 1; i < kanji.length; i = i+3) {
			newkanji = newkanji.concat(kanji[i-1]);
			newkanji = newkanji.concat('2');
			newkanji = newkanji.concat('5');
			newkanji = newkanji.concat(kanji[i]);
			newkanji = newkanji.concat(kanji[i+1]);
		}

		var newkana = "";
		for(i = 1; i < kana.length; i = i+3) {
			newkana = newkana.concat(kana[i-1]);
			newkana = newkana.concat('2');
			newkana = newkana.concat('5');
			newkana = newkana.concat(kana[i]);
			newkana = newkana.concat(kana[i+1]);
		}

		var url = "http://www.csse.monash.edu.au/~jwb/audiock.swf?u=kana=" + newkana + "%26kanji=" + newkanji;

		console.log("Audio URL: " + url);

		document.getElementById('AudioButton').disabled = false;

		document.getElementById('rev-audio').innerHTML = url;

	}

};

var selfStudyWindow = buildWindow(windowObjects.review);

//-------
var openInNewTab = function(url) {
	var win=window.open(url, '_blank');
	win.focus();
};




var resultsWindow = buildWindow(windowObjects.results);

/** Error handling
* Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
*/
var logError = function(error) {
	console.log("logError(error)");
	var stackMessage = "";
	if ("stack" in error)
		stackMessage = "\n\tStack: " + error.stack;

	console.log("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
	console.error("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
};


/**  Prepares the script
*/
var scriptInit = function(element) {
	//functions:
	//    addUserVocabButton()
	//    logError(err)
	console.log("Initializing Wanikani UserVocab Script!");


	document.anchorElement = element;
	var wkStyleCSS = require('./wkstyle.js');
	gM_addStyle(wkStyleCSS);
	
	// Set up buttons
	try {
		if (typeof localStorage !== "undefined") {
			document.selfStudyMenu = WanikaniDomUtil.getSelfStudyMenu(WKSS_add, WKSS_edit, WKSS_import, WKSS_export, null, WKSS_review, showUserWindow,  SetReviewsUtil.generateReviewList);

			//provide warning to users trying to use the (incomplete) script.
			console.log("this script is still incomplete: \r\nIt is provided as is without warranty express or implied\r\nin the hope that you may find it useful.");
			
			
			if (document.readyState === 'complete'){
				console.info("About to initialise WKSS+");
				main();
			}
			else {
				console.info("Adding event listener to window");
				window.addEventListener("load", main, false);
			}
		}
		else {
			console.log("Wanikani Self-Study: Your browser does not support localStorage.. Sorry :(");
		}
	}
	catch (err) {
		logError(err);
	}
};

console.info(document.readyState);
console.log("adding DOM listener", document.readyState);
// Check for file API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.info("File APIs supported.");
}
else {
	throw 'The File APIs are not fully supported in this browser.';
}

/** Start the script
*/

switch (window.document.location.protocol) {
	case "https:":
	    console.info("WaniKani Self-Study Plus is about to start");
	    // If the user came from another page on WaniKani, they are unlikely to have unlocked any kanji unless that page was the review page

	    var noNewStuff = /^https:\/\/.*\.wanikani\.com\/.*/.test(document.referrer) && !(/https:\/\/.*\.wanikani\.com\/review.*/.test(document.referrer));
        if (noNewStuff){  //Don't waste time if user is browsing site
			console.log("User is unlikely to have new kanji unlocked");
		}
		else{
			WanikaniUtil.getServerResp(APIkey, 'kanji', WanikaniUtil.onStateChangeHandler);
		}
		
		scriptInit();
		break;
	case "http:":
		console.warn("It appears that you are not using https protocol. Attempting to redirect to https now.");
		window.location.href = window.location.href.replace(/^http/, "https");
		break;
	case "file:":
		console.info("Hello local user");
		scriptInit();
		break;
}


