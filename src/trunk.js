/*  This is the original code that I am breaking into bite size bits */
//NEED TO MAKE SURE BROWSERIFY PUTS THIS ON THE TOP

// ==UserScript==
// @name        Wanikani Self-Study Plus
// @namespace   wkselfstudyplus
// @description Adds an option to add and review your own custom vocabulary
// @include     *.wanikani.com/*
// @include     *.wanikani.com/chat/*
// @exclude	    *.wanikani.com
// @include     *.wanikani.com/dashboard*
// @include     *.wanikani.com/community*
// @version     0.2.0
// @author      shudouken and Ethan
// @run-at      document-end
// @grant       none
// ==/UserScript==

/*
 *  This script is licensed under the Creative Commons License
 *  "Attribution-NonCommercial 3.0 Unported"
 *
 *  More information at:
 *  http://creativecommons.org/licenses/by-nc/3.0/
 */

 
 /** Describes any object that can be reviewed or learned, includes IRadical, IKanji, and IVocabulary
 * @typedef {Object} Task
 * @property {boolean|string} locked - locked
 * @property {boolean|string} manualLock - manualLock
 */
 
var StorageUtil = require('./storageutil.js');
var ImportUtil = require('./importutil.js');
var WanikaniUtil = require('./wanikaniutil.js');

function main(){
    "use strict";

    $("head").prepend("<script src='https://cdn.jsdelivr.net/jquery.mockjax/1.6.1/jquery.mockjax.js'></script>");

    var APIkey = "YOUR_API_HERE";
    var locksOn = true; //Disable vocab locks (unlocked items persist until deleted)
    var lockDB = true; //Set to false to unlock Kanji is not available on WaniKani (ie. not returned by API)
    var reverse = true; //Include English to ひらがな reading reviews
    var debugging = true;
    var asWK = true; //Push user reviews into the main WK review queue

    // shut up JSHint
    /* jshint multistr: true , jquery: true, expr: true, indent:2 */
    /* global window, wanakana, XDomainRequest */

    /** Debugging
	 */
	console.log = debugging ? function (msg) {
		if (typeof msg === 'string') {
			window.console.log("WKSS: " + msg);
		}
		else {
			window.console.log("WKSS: ", msg);
		}
	} : function () {
	};
	
    $("head").prepend('<script src="https://rawgit.com/WaniKani/WanaKana/master/lib/wanakana.js" type="text/javascript"></script>');
    
    var localSet = function(strName, obj){
        debugging&&console.log(strName + " is of type " + typeof obj);
        if (typeof obj === "object")
            obj=JSON.stringify(obj);
        localStorage.setItem(strName, obj);
    };

	//track versions & datatypes
	localSet("WKSSdata", {
        v: "0.1.13",
        propertyType: {
			meaning: "array", reading: "array", kanji: "string", i:"number", components: "array", date: "number", due: "number", locked: "string", manualLock: "string"
		},
        propertyDesc: {
			meaning: "list of meanings", reading: "list of readings", kanji: "item prompt", i:"item index", components: "kanji found in word", date: "timestamp of new level", due: "timestamp of item's next review", locked: "indicator of whether components are eligible", manualLock: "latch for 'locked' so failing components don't re-lock the item"
		}
    });


    /** Settings and constants
	 */
    var errorAllowance = 4; //every x letters, you can make one mistake when entering the meaning

    //srs 4h, 8h, 24h, 3d (guru), 1w, 2w (master), 1m (enlightened), 4m (burned)
    
    var hrs = 60*60*1000;
    var days = 24*hrs;
    var weeks = 7*days;
	var srsObject = [
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
	];

	var parseString = function(strObj){
        //avoids duplication of code for sesssionGet and localGet
        var obj;
        try {
            obj = JSON.parse(strObj);
            debugging&&console.log("Variable is of type " + typeof obj);
        }
		catch(e){
            if (e.name === "SyntaxError"){
                debugging&&console.log(strObj + " is an ordinary string that cannot be parsed.");
                obj = strObj;
            }
			else{
                console.error("Could not parse " + strObj + ". Error: ", e);
            }
        }
        return obj;
    };


	var localGet = function(strName){
        var strObj = localStorage.getItem(strName);
        return parseString(strObj);
    };
    
	// Initialise User-Vocab
	StorageUtil.initStorage();
	
	//GM_addStyle shim for compatibility with greasemonkey
    var gM_addStyle = function(CssString){
        //get DOM head
        var head = document.getElementsByTagName('head')[0];
        if (head) {
            //build style tag
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.textContent = CssString;
            //insert DOM style into head
            head.appendChild(style);
        }
    };

    /**  JQuery fixes
	 */
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

	/** Handle the users API key.
	* @param {string} APIkey - the users API key to set. If given "YOUR_API_HERE", it will return the key in browser storage.
	* @returns {string} the users API key as supplied and stored, or in the case of "YOUR_API_HERE" being passed, the stored key.
	*/
    var getSetApi = function(APIkey){
        var storedAPI = localStorage.getItem('WaniKani-API');
        if (APIkey === "YOUR_API_HERE"){
            if (storedAPI !== null){
                APIkey = storedAPI;
            }
        }
		else{
            //API has been set in code.
            if (storedAPI !== APIkey){
                localSet('WaniKani-API', APIkey);//overwrite with new API
            }
        }
        return APIkey;
    };
    APIkey = getSetApi(APIkey);

    //--------------Start Insert Into WK Review Functions--------------

	/** Messing around with vanilla WaniKani review variables
	*/
    var joinReviews = function(WKItems){
        console.log("joining reviews");
        $.jStorage.stopListening("reviewQueue", joinReviews);
        var WKreview = $.jStorage.get("reviewQueue")||[];
        var WKcombined = WKreview.concat(WKItems);
        $.jStorage.set("reviewQueue", WKcombined);
    };

    var WKItems = [];
    console.groupCollapsed("Loading Items");
	
	var wKSS_to_WK = function(WKSSItem){
        var WKItem = {};
        //    WKItem.aud = "";
        WKItem.en = WKSSItem.meaning.map(function(s) {
			 //trim whitespace and capitalize words
			 return s.trim().replace(/\b\w/g , function(m){
				return m.toUpperCase();
			});
		});
        WKItem.id = "WKSS" + WKSSItem.i;
        WKItem.kana = WKSSItem.reading;
        WKItem.srs = WKSSItem.level+1;//WK starts levels from 1, WKSS starts them from 0
        WKItem.voc = WKSSItem.kanji;
        WKItem.components = WKSSItem.components;

        WKItem.syn = [];
        //Add synonyms of strings without bracketed info to get around checking the full string including brackets
        WKSSItem.meaning.forEach(function(meaning){
            var openBracket = meaning.indexOf("(");
            if (openBracket !== -1 && meaning.indexOf(")") !== -1){
                WKItem.syn.push(meaning.substr(0, openBracket).trim().replace(/\b\w/g , function(m){ return m.toUpperCase();}));
            }
        }, this);

        return WKItem;
    };

	var loadTasks = function(userVocab, i, userVocabs){
        var dueNow = (userVocab.locked === "no" && userVocab.level < 9 && Date.now() > userVocab.due);

        if (dueNow){
            if (userVocab.kanji.length * userVocab.meaning[0].length * userVocab.reading[0].length){
                //Sorry, we need all three to add to WK review, no kana only without readings etc.
                debugging&&console.log("item:" + userVocab.kanji + ", " + userVocab.locked +" === \"no\" && " + userVocab.level + " < 9 && " + Date.now() + " > " + userVocab.due);
                debugging&&console.log(dueNow);
                WKItems.push(wKSS_to_WK(userVocab));
            }else{
                debugging&&console.log("Item " + userVocab.kanji + " could not be added, it is missing one or more of the essential fields for a WK vocabulary review");
            }
        }
    };
	
    var userVocabs = localGet("User-Vocab")||[];
    userVocabs.forEach(loadTasks);//, this);
    console.groupEnd();
	
    //where the magic happens
    if (asWK){
        $.jStorage.listenKeyChange("reviewQueue", function(){joinReviews(WKItems);});
    }

    var sessionSet = function(strName, obj){
        debugging&&console.log(strName + " is of type " + typeof obj);
        if (typeof obj === "object")
            obj=JSON.stringify(obj);
        sessionStorage.setItem(strName, obj);
    };
	
    var sessionGet = function(strName){
        var strObj = sessionStorage.getItem(strName);
        return parseString(strObj);
    };

	var generateReviewList = function(reviewActive) {
        //don't interfere with an active session
        if (reviewActive){
            document.getElementById('user-review').innerHTML = "Review in Progress";
            return;
        }

        debugging&&console.log("generateReviewList()");
        // function generateReviewList() builds a review session and updates the html menu to show number waiting.
        var numReviews = 0;
        var soonest = Infinity;
        var next;

        var reviewList = [];

        //check to see if there is vocab already in offline storage
        if (localStorage.getItem('User-Vocab')) {
            var vocabList = StorageUtil.getVocList();
            debugging&&console.log(vocabList);
            var now = Date.now();

            //for each vocab in storage, get the amount of time vocab has lived
            //var i = vocabList.length;
            //while(i--){
			vocabList.forEach(function(task, i){
                var due = task.date + srsObject[task.level].duration;

                // if tem is unlocked and unburned
                if (task.level < 9 &&
                    (task.manualLock === "no" || task.manualLock === "n" ||
                     task.manualLock ==="DB" && !lockDB )){
                    // if it is past review time
                    if(now >= due) {
                        // count vocab up for review
                        numReviews++;

                        // add item-meaning object to reviewList
                        // have made this optional for surname lists etc.
                        if (task.meaning[0] !== "") {
                            //Rev_Item object args: prompt, kanji, type, solution, index
                            var revItem = new Rev_Item(task.kanji, task.kanji, "Meaning", task.meaning, i);
                            reviewList.push(revItem);
						}

                        // reading is optional, if there is a reading for the vocab, add its object.
                        if (task.reading[0] !== "") {
                            //Rev_Item object args: prompt, kanji, type, solution, index
                            var revItem2 = new Rev_Item(task.kanji, task.kanji, "Reading", task.reading, i);
                            reviewList.push(revItem2);
                        }

                        //if there is a meaning and reading, and reverse flag is true, test reading from english
                        if (task.reading[0] !== "" && task.meaning[0] !== "" && reverse){
                            //Rev_Item object args: prompt, kanji, type, solution, index
                            var revItem3 = new Rev_Item(task.meaning.join(", "), task.kanji, "Reverse", task.reading, i);
                            reviewList.push(revItem3);
                        }

                    }
					else{//unlocked/unburned but not time to review yet
                        debugging&&console.log("setting soonest");
                        next = due - now;
						soonest = Math.min(soonest, next);
                    }
				}//end if item is up for review
			}, this);// end iterate through vocablist
		}// end if localStorage
        if (reviewList.length !== 0){
            //store reviewList in current session
            sessionSet('User-Review', JSON.stringify(reviewList));
            debugging&&console.log(reviewList);
        }
		else{
            debugging&&console.log("reviewList is empty: "+JSON.stringify(reviewList));
			document.getElementById('user-review').innerHTML = soonest<Infinity? "Next Review in "+ms2str(soonest) : "No Reviews Available";
		}
        var strReviews = numReviews.toString();

        /* If you want to do the 42+ thing.
		 if (numReviews > 42) {
		 strReviews = "42+"; //hail the crabigator!
		 }
		//*/

        // return the number of reviews
        debugging&&console.log(numReviews.toString() +" reviews created");
        if (numReviews > 0){
            var reviewString = (soonest !== void 0)? "<br/>\
More to come in "+ms2str(soonest):"";
            document.getElementById('user-review').innerHTML = "Review (" + strReviews + ")" + reviewString;
        }
    };

	
/*
* populate reviews when menu button pressed
*/

window.generateReviewList = function() {
	//if menu is invisible, it is about to be visible
	if ( $("#WKSS_dropdown").is(":hidden") ){
		//This is really the only time it needs to run
		//unless we want to start updating in realtime by keeping track of the soonest item
		generateReviewList();
	}
};

/*
*  Add Item
*/
// event function to open "add window" and close any other window that might be open at the time.
window.WKSS_add = function () {
	//show the add window
	$("#add").show();
	//hide other windows
	$("#export").hide();
	$("#import").hide();
	$("#edit").hide();
	$("#selfstudy").hide();
};

//'add window' html text
var addHtml = '\n\
<div id="add" class="WKSS">\n\
<form id="addForm">\n\
<button id="AddCloseBtn" class="wkss-close" type="reset"><i class="icon-remove"></i></button>\n\
<h1>Add a new Item</h1>\n\
<input type="text" id="addKanji" placeholder="Enter 漢字, ひらがな or カタカナ">\n\
<input type="text" id="addReading" title="Leave empty to add vocabulary like する (to do)" placeholder="Enter reading">\n\
<input type="text" id="addMeaning" placeholder="Enter meaning">\n\
\n\
<p id="addStatus">Ready to add..</p>\n\
<button id="AddItemBtn" type="button">Add new Item</button>\n\
</form>\n\
</div>\n';

//add html to page source
$("body").append(addHtml);

//hide add window ("div add" code that was just appended)
$("#add").hide();

//function to fire on click event for "Add new Item"
$("#AddItemBtn").click(function () {
	handleAddClick();
});

$("#AddCloseBtn").click(function () {
	$("#add").hide();
	$("#addForm")[0].reset();
	$("#addStatus").text('Ready to add..');
	$("#addKanji").removeClass("error");
	$("#addMeaning").removeClass("error");
});



//---Function wrappers to facilitate use of one localstorage array
//---Maintains data integrity between previously two (vocab and srs)


function setSrsItem(srsitem,srsList){
	var index = srsitem.i;
	debugging&&console.log("setSrsItem: ");

	if(srsList){
		if(srsList[index].kanji===srsitem.kanji){// try search by index

			debugging&&console.log("success: "+srsitem.kanji+" found at index "+ index);
			//replace only the srs parts of the item
			srsList[index].date = srsitem.date;
			srsList[index].level = srsitem.level;
			srsList[index].locked = srsitem.locked;
			srsList[index].manualLock = srsitem.manualLock;
		}else{ //backup plan (cycle through list?)
			debugging&&console.log("SRS Kanji not found in vocablist, needs work");

		}
		debugging&&console.log("item: ");
		return srsList;
	}
}

function getSrsList(){
	var srsList = StorageUtil.getVocList();
	return srsList;
}


function getFullList(){
	var fullList = JSON.parse(localStorage.getItem('User-Vocab'))||[];
	if(!fullList){
		fullList=[];
	}
	return fullList;
}

//--------

/*
*  Edit Items
*/
window.WKSS_edit = function () {
	generateEditOptions();
	$("#edit").show();
	//hide other windows
	$("#export").hide();
	$("#import").hide();
	$("#add").hide();
	$("#selfstudy").hide();
};

$("body").append("                                                          \
<div id=\"edit\" class=\"WKSS\">                                               \
<form id=\"editForm\">                                                                    \
<button id=\"EditCloseBtn\" class=\"wkss-close\" type=\"button\"><i class=\"icon-remove\"></i></button>\
<h1>Edit your Vocab</h1>                                                \
<select id=\"editWindow\" size=\"8\"></select>\
<input type=\"text\" id=\"editItem\" name=\"\" size=\"40\" placeholder=\"Select vocab, click edit, change and save!\">\
\
<p id=\"editStatus\">Ready to edit..</p>\
<button id=\"EditEditBtn\" type=\"button\">Edit</button>\
<button id=\"EditSaveBtn\" type=\"button\">Save</button>         \
<button id=\"EditDeleteBtn\" type=\"button\" title=\"Delete selected item\">Delete</button>         \
<button id=\"EditDeleteAllBtn\" type=\"button\" title=\"本当にやるの？\">Delete All</button>   \
<button id=\"ResetLevelsBtn\" type=\"button\">Reset levels</button>         \
</form>                                                                   \
</div>");
$("#edit").hide();

$("#ResetLevelsBtn").click(function () {


	//var srslist = getSrsList();
	var srsList = JSON.parse(localStorage.getItem('User-Vocab'))||[];

	if (srsList) {
		var i = srsList.length;
		while(i--){
			srsList[i].level = 0;
			debugging&&console.log("srsList[i].i before: "+srsList[i].i);
			srsList[i].i=i;
			debugging&&console.log("srsList[i].i after: "+srsList[i].i);
			var srsList2 = localGet('User-Vocab')||[];

			srsList2 = setSrsItem(srsList[i],srsList2);
			localSet('User-Vocab', srsList2);

		}
	}
});


$("#EditEditBtn").click(function () {
	//get handle for 'select' area
	var select = document.getElementById("editWindow");

	//get the index for the currently selected item
	var index = select.selectedIndex; //select.options[select.selectedIndex].value is not required, option values are set to index
	var vocabList = StorageUtil.getVocList();
	vocabList = vocabList.reverse();
	document.getElementById("editItem").value = JSON.stringify(vocabList[index]);
	document.getElementById("editItem").name = index; //using name to save the index
	$("#editStatus").text('Loaded item to edit');
});

$("#EditSaveBtn").click(function () {
	if ($("#editItem").val().length !== 0) {
		//-- be aware
		//deleting one item may cause mismatch if i is property of item in list
		try {
			var index = document.getElementById("editItem").name;
			var item = JSON.parse(document.getElementById("editItem").value.toLowerCase());
			var m = item.meaning.length;
			while(m--){
				if (item.meaning[m] === ""){
					delete item.meaning[m];
				}
			}
			var fullList = getFullList().reverse();


			if (isItemValid(item) &&//item is valid
				!(checkForDuplicates(fullList,item) && //kanji (if changed) is not already in the list
				  fullList[index].kanji !== item.kanji)) {//unless it is the item being edited


				var srslist = getSrsList().reverse();
				//get srs components of item(list)

				fullList[index] = item;//does not have srs stuff, re-add it now

				debugging&&console.log(fullList[index]);
				debugging&&console.log(srslist[index]);
				fullList[index].date = srslist[index].date;
				fullList[index].level = srslist[index].level;
				fullList[index].locked = srslist[index].locked;
				fullList[index].manualLock = srslist[index].manualLock;

				fullList = fullList.reverse(); //reset order of array

				localSet('User-Vocab', fullList);

				generateEditOptions();
				$("#editStatus").html('Saved changes!');
				document.getElementById("editItem").value = "";
				document.getElementById("editItem").name = "";

			}
			else{
				$("#editStatus").text('Invalid item or duplicate!');
				alert(isItemValid(item).toString() +" && ！("+ checkForDuplicates(fullList,item).toString()+" && !("+fullList[index].kanji+" !== "+item.kanji+")");

			}
		}
		catch (e) {
			$("#editStatus").text(e);
		}
	}
});

$("#EditDeleteBtn").click(function () {
	//select options element window
	var select = document.getElementById("editWindow");

	//index of selected item
	var item = select.options[select.selectedIndex].value;

	//fetch JSON strings from storage and convert them into Javascript literals
	var vocabList = getFullList();

	//starting at selected index, remove 1 entry (the selected index).
	if (item > -1) {
		if (vocabList !== null){
			vocabList.splice(item, 1);
		}
	}

	//yuck
	if (vocabList.length !== 0) {
		localSet('User-Vocab', vocabList);
	}
	else {
		localStorage.removeItem('User-Vocab');
	}

	updateEditGUI();

	$("#editStatus").text('Item deleted!');
});

$("#EditDeleteAllBtn").click(function () {
	var deleteAll = confirm("Are you sure you want to delete all entries?");
	if (deleteAll) {

		//drop local storage
		localStorage.removeItem('User-Vocab');


		updateEditGUI();

		$("#editStatus").text('All items deleted!');
	}
});


$("#EditCloseBtn").click(function () {
	$("#edit").hide();
	$("#editForm")[0].reset();
	$("#editStatus").text('Ready to edit..');
});

/*
*  Export
*/
window.WKSS_export = function () {
	$("#export").show();
	//hide other windows
	$("#add").hide();
	$("#import").hide();
	$("#edit").hide();
	$("#selfstudy").hide();
};

$("body").append('                                                          \
<div id="export" class="WKSS">                                               \
<form id="exportForm">                                                                    \
<button id="ExportCloseBtn" class="wkss-close" type="button"><i class="icon-remove"></i></button>\
<h1>Export Items</h1>                                                \
<textarea cols="50" rows="18" id="exportArea" placeholder="Export your stuff! Sharing is caring ;)"></textarea>                           \
\
<p id="exportStatus">Ready to export..</p>                                        \
<button id="ExportItemsBtn" type="button">Export Items</button>\
<button id="ExportSelectAllBtn" type="button">Select All</button>\
<button id="ExportCsvBtn" type="button">Export CSV</button>\
</form>                                                                   \
</div>');
$("#export").hide();


$("#ExportItemsBtn").click(function () {

	if (localStorage.getItem('User-Vocab')) {
		$("#exportForm")[0].reset();
		var vocabList = StorageUtil.getVocList();
		$("#exportArea").text(JSON.stringify(vocabList));
		$("#exportStatus").text("Copy this text and share it with others!");
	}
	else {
		$("#exportStatus").text("Nothing to export yet :(");
	}
});

$("#ExportSelectAllBtn").click(function () {
	if ($("#exportArea").val().length !== 0) {
		select_all("exportArea");
		$("#exportStatus").text("Don't forget to CTRL + C!");
	}
});

$("#ExportCsvBtn").click(function () {
	var vocabList = getFullList();
	var CsvFile = createCSV(vocabList);
	window.open(CsvFile);
});

$("#ExportCloseBtn").click(
	function () {
		$("#export").hide();
		$("#exportForm")[0].reset();
		$("#exportArea").text("");
		$("#exportStatus").text('Ready to export..');
	}
);

/*
*  Import
*/
window.WKSS_import = function () {
	$("#import").show();
	//hide other windows
	$("#add").hide();
	$("#export").hide();
	$("#edit").hide();
	$("#selfstudy").hide();
};

$("body").append('                                                          \
<div id="import" class="WKSS">                                               \
<form id="importForm">                                                                    \
<button id="ImportCloseBtn" class="wkss-close" type="reset"><i class="icon-remove"></i></button>\
<h1>Import Items</h1>\
<textarea cols="50" rows="18" id="importArea" placeholder="Paste your stuff and hit the import button! Use with caution!"></textarea>                     \
\
<p id="importStatus">Ready to import..</p>                                        \
<label class="button" id="ImportItemsBtn" style="display:inline;">Import Items</label>\
\
<label id="ImportCsvBtn" class="button" style="display:inline;cursor: pointer;">Import CSV         \
\
<input type="file" id="upload" accept=".csv,.tsv" style="height:0px;width:0px;background:red;opacity:0;filter:opacity(1);" />\
\
</label>\
\
<label class="button" id="ImportWKBtn" style="display:inline;"><i class="icon-download-alt"></i> WK</label>\
</form>                                                                   \
</div>');
$("#import").hide();

document.getElementById("upload") && document.getElementById("upload").addEventListener('change', ImportUtil.fileUpload, false);


$("#ImportCsvBtn").click(function () {
});

$("#ImportWKBtn").click(function(){
	WanikaniUtil.getServerResp(APIkey,"vocabulary");
	debugging&&console.log("maybe?");
});

$("#ImportItemsBtn").click(function () {

	if ($("#importArea").val().length !== 0) {
		try {
			var add = JSON.parse($("#importArea").val().toLowerCase());
			alert(JSON.stringify(add));
			if (checkAdd(add)) {
				$("#importStatus").text("No valid input (duplicates?)!");
				return;
			}

			var newlist;
			var srslist = [];
			if (localStorage.getItem('User-Vocab')) {
				var vocabList = StorageUtil.getVocList();
				srslist = getSrsList();
				newlist = vocabList.concat(add);
			}
			else {
				newlist = add;


			}
			var i = add.length;
			while(i--){
				StorageUtil.setVocItem(add[i]);
			}

			$("#importStatus").text("Import successful!");

			$("#importForm")[0].reset();
			$("#importArea").text("");

		}
		catch (e) {
			$("#importStatus").text("Parsing Error!");
			debugging&&console.log(e);
		}

	}
	else {
		$("#importStatus").text("Nothing to import :( Please paste your stuff first");
	}
});

$("#ImportCloseBtn").click(function () {
	$("#import").hide();
	$("#importForm")[0].reset();
	$("#importArea").text("");
	$("#importStatus").text('Ready to import..');
});

/*
*  Review Items
*/
window.WKSS_review = function () {

	//is there a session waiting in storage?
	if(sessionStorage.getItem('User-Review')) {

		//show the selfstudy window
		$("#selfstudy").show();

		//hide other windows
		$("#add").hide();
		$("#export").hide();
		$("#edit").hide();
		$("#import").hide();

		startReview();
	}
};

$("body").append('                                                          \
<div id="selfstudy" class="WKSS">\
<button id="SelfstudyCloseBtn" class="wkss-close" type="button"><i class="icon-remove"></i></button>\
<h1>Review<span id="RevNum"></span></h1>\
<div id="wkss-kanji">\
<span id="rev-kanji"></span>\
</div><div id="wkss-type">\
<span id="rev-type"></span><br />\
</div><div id="wkss-solution">\
<span id="rev-solution"></span>\
</div><div id="wkss-input">\
<input type="text" id="rev-input" size="40" placeholder="">\
</div><span id="rev-index" style="display: block;"></span>\
\
<form id="audio-form">\
<label id="AudioButton" class="button">Play audio</label>\
<label id="WrapUpBtn"   class="button">Wrap Up</label>\
</form>\
<div id="rev-audio" style="display:none;"></div>\
</div>');
$("#selfstudy").hide();

$("#SelfstudyCloseBtn").click(function () {
	$("#selfstudy").hide();
	$("#rev-input").val("");
	reviewActive = false;
});

$("#WrapUpBtn").click(function() {
	var sessionList = sessionGet('User-Review')||[];
	var statsList = sessionGet('User-Stats')||[];
	//if an index in sessionList matches one in statsList, don't delete
	var sessionI = sessionList.length;
	var item = sessionGet('WKSS-item')||[];
	var arr2 = [];
	//for every item in sessionList, look for index in statsList,
	//if not there (-1) delete item from sessionList
	while (sessionI--){
		var index = findIndex(statsList,sessionList[sessionI]);
		if ((Math.sign(1/index) !== -1)||(sessionList[sessionI].index == item.index)){

			arr2.push(sessionList[sessionI]);
		}
	}


	debugging&&console.log(arr2);
	sessionSet('User-Review', JSON.stringify(arr2));
});

$("#AudioButton").click(function () {
	openInNewTab(document.getElementById('rev-audio').innerHTML);
});

$("body").append('                                                          \
<div id="resultwindow" class="WKSS">                                    \
<button id="ReviewresultsCloseBtn" class="wkss-close" type="button"><i class="icon-remove"></i></button>\
<h1>Review Results</h1>\
<h2>All</h2>\
<div id="stats-a"></div>\
</div>');

$("#resultwindow").hide();

$("#ReviewresultsCloseBtn").click(function () {
	$("#resultwindow").hide();
	document.getElementById("stats-a").innerHTML = "";
});

//declare global values for keyup event
//is an answer being submitted?
var submit = true;

//jquery keyup event
$("#rev-input").keyup(function (e) {
	//functions:
	//  inputCorrect()

	//check if key press was 'enter' (keyCode 13) on the way up
	//and keystate true (answer being submitted)
	//and cursor is focused in reviewfield
	if (e.keyCode == 13 && submit === true) {
		var input = $("#rev-input").val();
		var reviewList = sessionGet('User-Review')||[];
		var rnd = sessionStorage.getItem('WKSS-rnd')||0;

		var item = sessionGet('WKSS-item');

		//-- starting implementation of forgiveness protocol

		item.forgive = [];//"ゆるす"]; //placeholder (許す to forgive)


		if (item === null){
			alert("Item Null??");
			reviewList.splice(rnd, 1);
		}else{
			//handle grading and storing solution

			//check for input, do nothing if none
			if(input.length === 0){
				return;
			}

			//disable input after submission
			//document.getElementById('rev-input').disabled = true;


			//was the input correct?
			var correct = inputCorrect();

			//was the input forgiven?
			var forgiven = (item.forgive.indexOf(input) !== -1);

			if (correct) {
				//highlight in (default) green
				$("#rev-input").addClass("correct");
				//show answer
				$("#rev-solution").addClass("info");
			} else if (forgiven){
				$("#rev-input").addClass("caution");
			} else {
				//highight in red
				$("#rev-input").addClass("error");
				//show answer
				$("#rev-solution").addClass("info");
			}

			//remove from sessionList if correct
			if (correct) {
				debugging&&console.log("correct answer");
				if (reviewList !== null){
					var oldlen = reviewList.length;

					reviewList.splice(rnd, 1);
					debugging&&console.log("sessionList.length: "+ oldlen +" -> "+reviewList.length);

					//replace shorter (by one) sessionList to session
					if (reviewList.length !== 0) {
						debugging&&console.log("sessionList.length: "+ reviewList.length);
						sessionSet('User-Review', JSON.stringify(reviewList));

					} else {
						//reveiw over, delete sessionlist from session
						sessionStorage.removeItem('User-Review');
					}
				}else{
					console.error("Error: no review session found");
				}
			}else{
				//   if(forgiven){
				//     debugging&&console.log(input +" has been forgiven. "+item.type);
				//   return;
				//}
				debugging&&console.log("wrong answer");
			}

			item = markAnswer(item);

			sessionSet(item.index, item);


			var list = JSON.parse(sessionStorage.getItem("User-Stats"))||[];
			var found = false;

			if (list){
				var i = list.length;
				while(i--){
					if (list[i].index == item.index) {
						list[i] = item;								//replace item if it exists
						found = true;
						break;
					}
				}
				if(!found){
					list = saveToSortedList(list,item);
				}

			} else {
				list = [item];
			}

			sessionSet("User-Stats", JSON.stringify(list));
			//playAudio();

			//answer submitted, next 'enter' proceeds with script
			submit = false;
		}//null garbage collection
	}
	else if (e.keyCode == 13 && submit === false) {
		debugging&&console.log("keystat = " + submit);

		//there are still more reviews in session?
		if (sessionStorage.getItem('User-Review')) {
			// debugging&&console.log("found a 'User-Review': " + sessionStorage.getItem('User-Review'));

			setTimeout(function () {
				debugging&&console.log("refreshing reviewList from storage");
				var reviewList = JSON.parse(sessionStorage.getItem('User-Review'));

				//cue up first remaining review
				nextReview(reviewList);
				debugging&&console.log("checking for empty reviewList");
				if (reviewList.length === 0){

					debugging&&console.log("session over. reviewList: "+JSON.stringify(reviewList));
					sessionStorage.removeItem("User-Review");
				}

				//         document.getElementById('rev-input').disabled = true;
				$("#rev-solution").removeClass("info");
				$("#selfstudy").hide().fadeIn('fast');

			}, 1);
		}
		else {
			// no review stored in session, review is over
			setTimeout(function () {

				$("#selfstudy").hide();
				//document.getElementById('rev-input').disabled = false;
				$("#rev-solution").removeClass("info");
				debugging&&console.log("showResults");
				showResults();
				$("#resultwindow").show();
				debugging&&console.log("showResults completed");

				//*/  //clear session
				sessionStorage.clear();
				reviewActive = false;


			}, 1);
		}
		submit = true;

	}
});
	/** populate reviews when menu button pressed
	*/
    window.generateReviewList = function() {
        //if menu is invisible, it is about to be visible
        if ( $("#WKSS_dropdown").is(":hidden") ){
            //This is really the only time it needs to run
            //unless we want to start updating in realtime by keeping track of the soonest item
            generateReviewList(reviewActive);
        }
    };
	/**  Add Item: event function to open "add window" and close any other window that might be open at the time.
	*/
    window.WKSS_add = function () {
        //show the add window
        $("#add").show();
        //hide other windows
        $("#export").hide();
        $("#import").hide();
        $("#edit").hide();
        $("#selfstudy").hide();
    };
	
	var addElement = require('./addelement.js');
	//add html to page source
    $("body").append(addElement);
    //hide add window ("div add" code that was just appended)
    $("#add").hide();

    var handleAddClick = require('./handleAddClick.js');
	
    //function to fire on click event for "Add new Item"
    $("#AddItemBtn").click(function () {
        handleAddClick();
    });

    $("#AddCloseBtn").click(function () {
        $("#add").hide();
        $("#addForm")[0].reset();
        $("#addStatus").text('Ready to add..');
        $("#addKanji").removeClass("error");
        $("#addMeaning").removeClass("error");
    });

    /** Keeps legacy srsList updated.
	* @depreciate
	* @param {SrsItem} srsitem
	* @param {Array.<SrsItem>} srsList
	* @returns {Array.<SrsItem>} The srs data for a task. Or null if no srsList was provided.
	*/
    var updateSrsInList = function(srsitem, srsList){
        var index = srsitem.i;
        if(srsList){
            if(srsList[index].kanji===srsitem.kanji){// try search by index
                debugging&&console.log("success: "+srsitem.kanji+" found at index "+ index);
                //replace only the srs parts of the item
                srsList[index].date = srsitem.date;
                srsList[index].level = srsitem.level;
                srsList[index].locked = srsitem.locked;
                srsList[index].manualLock = srsitem.manualLock;
            }
            return srsList;
        }
		else{
			return null;
		}
    };
    /** Checks if an item's kanji is represented in a list
	* @returns {boolean}
	*/
    var checkForDuplicates = function(list, item){
		return list.some(function(a){return a.kanji === item.kanji;});
	};

	/** Creates a lookup array for each kanji with its srs level. Used for displaying component levels.
	* @param item
	* @param kanjilist
	* @returns An array of the kanji with SRS values for each kanji component.
	* @example
        eg. 折り紙:
        compSRS = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]
	*/
    var getCompKanji = function(item, kanjiList){
        if (!kanjiList){
            kanjiList = [];
        }
        debugging&&console.log("getCompKanji(item, kanjiList)");

        var compSRS = [];
        var kanjiReady = false; //indicates if the kanjiList has been populated
        var userGuppy = false; //indicates if kanjiList has less than 100 items
        var kanjiObj = {};

        //has the server responded yet
        if (kanjiList.length > 0){
            debugging&&console.log("kanjiList is > 0");
            kanjiReady = true;

            //create lookup object
            for (var k=0;k<kanjiList.length;k++){
                kanjiObj[kanjiList[k].character] = kanjiList[k];
            }

            //is there less than 100 kanji in the response
            if (kanjiList.length < 100){
                debugging&&console.log("kanjiList is < 100");
                userGuppy = true;
            }
        }    

        var components = item.components;
        //for each kanji character component
        //    this is the outer loop since there will be far less of them than kanjiList
        for(var i = 0; i < components.length; i++){

            var matched = false;
            //for each kanji returned by the server
            // for(var j=0; j<kanjiList.length; j++){

            //if the kanji returned by the server matches the character in the item
            if (typeof kanjiObj[components[i]] !== 'undefined'){
                //      if (kanjiList[j].character == components[i]){
                compSRS[i] = {"kanji": components[i], "srs": kanjiObj[components[i]].srs};
                matched = true;

                // break; //kanji found: 'i' is its position in item components; 'j' is its postion in the 'kanjiList' server response
            }
            // }

            if (matched === false){ // character got all the way through kanjiList without a match.
                if (kanjiReady){ //was there a server response?
                    if (userGuppy){ //is the user a guppy (kanji probably matches a turtles response)
                        debugging&&console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        compSRS[i] = {"kanji": components[i], "srs": "noMatchGuppy"};
                    }
					else{ //user is a turtle, kanji must not have been added to WK (yet)
                        debugging&&console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        compSRS[i] = {"kanji": components[i], "srs": "noMatchWK"};
                    }
                }
				else{
                    debugging&&console.log("matched=false, kanjiReady=false, noServerResp");
                    compSRS[i] = {"kanji": components[i], "srs": "noServerResp"};
                }
            }
        }
        return compSRS;
    };


    var isKanjiLocked = function(srsitem, kanjiList, locksOn){
        //item unlocked by default
        //may have no kanji, only unlocked kanji will get through the code unflagged

		// Enumeration "yes", "no", "DB"
        var locked = "no";
        if (locksOn){
            //get the kanji characters in the word.
            var componentList = getCompKanji(srsitem, kanjiList);
            // eg: componentList = getCompKanji("折り紙", kanjiList);
            // componentList = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]


            var c = componentList.length;
            while(c--){
                //look for locked kanji in list
                if (componentList[c].srs == "apprentice" ||
                    componentList[c].srs == "noServerResp"||
                    componentList[c].srs == "unreached"
                   ){

                    //----could be apprentice etc.
                    //Simple: lock is 'yes'
                    locked = "yes";
                    // "yes":	item will be locked while there is no database connection.
                    //			if the server response indicates that it has been unlocked, only then will it be available for review

                    debugging&&console.log("test srs for apprentice etc. 'locked': "+ locked);

                    debugging&&console.log(componentList[c].kanji +": "+componentList[c].srs +" -> "+ locked);

                    break; // as soon as one kanji is locked, the whole item is locked
                }

                //DB locks get special state
                if (componentList[c].srs == "noMatchWK" || componentList[c].srs == "noMatchGuppy"){

                    locked = "DB";
                    //"DB"	: database limitations, one of two things
                    //a. the kanji isn't in the database and the user is a guppy --could change if user subscribes or first two levels change/expand
                    //b. the kanji isn't in the database and the user is a turtle --could change if more kanji added.

                    debugging&&console.log("test srs for unmatched kanji. 'locked': "+ locked);

                    debugging&&console.log(componentList[c].kanji +": "+componentList[c].srs +" -> "+ locked);


                }

            } //for char in componentList
            debugging&&console.log("out of character loop");
        }
        //locked will be either "yes","no", or "DB"
        return [locked];
    };

    /** Gets the Kanji characters in a given string.
	* @param {string} vocabString -
	* @return {Array.<string>} An array of the kanji components in the given string
	*/
    var getComponents = function(vocabString){
        return Array.prototype.filter.call(vocabString, function(ch){
            return /^[\u4e00-\u9faf]+$/.test(ch);
        }, this);
    };

    /** Manages the locked and manualLock properties of srsitem. This is to stop items being locked again after they have been unlocked if any of the kanji used falls below the unlock threshold (eg. if the 勉 in 勉強 falls back to apprentice, we do not want to lock up 勉強 again.)
	* @param {Object} item
	* @param {string} item.locked - (String enumeration) A real time evaluation of the item (is any of the kanji in the word locked?)
	* @param {string} item.manualLock - (String enumeration) Will return 'no' if .locked has ever returned 'no'.
	* @returns {ITask} item
	*/
    var setLocks = function(item){
        //once manualLock is "no" it stays "no"
        if (item.manualLock !== false && item.manualLock !== "no" && item.manualLock !== "n"){

            var kanjiList = localGet('User-KanjiList')||[];

            item.components = getComponents(item.kanji);

            var kanjiLockedResult = isKanjiLocked(item, kanjiList, locksOn);
            item.locked = kanjiLockedResult[0];

            item.manualLock = item.locked;
        }else{
            item.manualLock = false;
        }

        debugging&&console.log("setting locks for "+ item.kanji +": locked: "+item.locked+", manualLock: "+ item.manualLock);

        return item;
    };
    /** Converts number of milliseconds into a readable string
	* @param {number} milliseconds - The number of milliseconds to approximate
	* @returns {string} Readable time frame ('2 months', '3 hours', '1 week' etc).
	*/
	var ms2str = function(milliseconds){
        var num; //number of months weeks hours etc
        //more time has elapsed than required for the level
        if(milliseconds <= 0) {
            return "Now" ;
        }
        if(milliseconds > 2628000000) {//About a month
            num = Math.floor(milliseconds/2628000000).toString()+" month";
            if (num !== "1 month"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 604800000) {//A week
            num = Math.floor(milliseconds/604800000).toString()+" week";
            if (num !== "1 week"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 86400000) {//A day
            num = Math.floor(milliseconds/86400000).toString()+" day";
            if (num !== "1 day"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 3600000) {//An hour
            num = Math.floor(milliseconds/3600000).toString()+" hour";
            if (num !== "1 hour"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 60000) {//A minute
            num = Math.floor(milliseconds/60000).toString()+" minute";
            if (num !== "1 minute"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 0) {//A second is 1000, but need to return something for less than one too
            num = Math.floor(milliseconds/1000).toString()+" second";
            if (num !== "1 second"){
                return num+"s";
            }else{
                return num;
            }
        }
    };
    /** Retrieves values from storage to populate 'editItems' menu
	*/
    var generateEditOptions = function() {
        var select = document.getElementById('editWindow');
        //clear the editWindow
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
        //check for items to add
        if (localStorage.getItem('User-Vocab')) {

            //retrieve from local storage
            var vocabList = StorageUtil.getVocList();
            var srslist =  StorageUtil.getVocList();
            var options = [];
            //build option string
            //var i = vocabList.length;
            //while (i--){
			vocabList.forEach(function(task){
                //form element to save string
                var opt = document.createElement('option');

                //dynamic components of string

                //when is this item up for review
                var due = task.due||task.date + srsObject[task.level].duration;
                var review = "";

                //no future reviews if burned
                if(task.level >= 9) {
                    review = "Never";
                }

                //calculate next relative review time
                //current timestamp is past due date.
                else if(Date.now() >= due) {
                    review = "Now" ;
                }
                else {
                    review = ms2str(due - Date.now());
                }//end if review is not 'never' or 'now'

                var text = task.kanji + " & " +
                    task.reading + " & " +
                    task.meaning + " (" +
					srsObject[task.level].rank +
					" - Review: " +
                    review + ") Locked: " +
                    task.manualLock;

                opt.value = i;
                opt.innerHTML = text;
                options.push(opt);//for future use (sorting data etc)
                select.appendChild(opt);//export item to option menu
            }, this);
        }
    };
    /** Edit Items
	*/
    window.WKSS_edit = function () {
        generateEditOptions();
        $("#edit").show();
        //hide other windows
        $("#export").hide();
        $("#import").hide();
        $("#add").hide();
        $("#selfstudy").hide();
    };
	var buildNode = require('./buildnode.js');

	var buildWindow = require('./buildwindow.js');
	
	/*var addEditWindow = function() {
		var editWindow = buildNode('div', {id: "WKSS-edit", className: "WKSS"});
		var editForm = buildNode('form', {id: "WKSS-editForm"});
		editWindow.appendChild(editForm);
		var editCloseButton = buildNode('button', {id: "WKSS-editCloseBtn", className: "WKSS-close"});
		editForm.appendChild(editCloseButton);
		
		editCloseButton.appendChild(buildNode('i', {className: "icon-remove"}));
		var h1Element = buildNode('h1');
		editForm.appendChild(h1Element);
		h1Element.appendChild(document.createTextNode("Edit your Vocab"));
		var selectElement = buildNode('select', {id: "editWindow", size: "8"});
		editForm.appendChild(selectElement);
		var editItemText = buildNode('input', {type: "text" id: "editItem" name: "" size: "40" placeholder: "Select vocab, click edit, change and save!"});
		editForm.appendChild(editItemText);
		var editStatus = buildNode('p', {id: "editStatus"});
		editForm.appendChild(editStatus);
		editStatus.appendChild(document.createTextNode("Ready to edit.."));
		
		var editButton = buildNode('button', {id: "EditEditBtn", type: "button"});
		editForm.appendChild(editButton);
		editButton.appendChild(document.createTextNode("Edit"));
		var editSave = buildNode('button', {id: "EditSaveBtn", type: "button"});
		editForm.appendChild(editSave);
		editSave.appendChild(document.createTextNode("Save"));
		var editDelete = buildNode('button', {id: "EditDeleteBtn", type: "button", title: "Delete selected item"});
		editForm.appendChild(editDelete);
		editDelete.appendChild(document.createTextNode("Delete"));
		var editDeleteAll = buildNode('button', {id: "EditDeleteAllBtn", type: "button", title: "本当にやるの？"});
		editForm.appendChild(editDeleteAll);
		editDeleteAll.appendChild(document.createTextNode("Delete All"));
		var editResetLevels = buildNode('button', {id: "ResetLevelsBtn", type: "button"});
		editForm.appendChild(editResetLevels);
		editResetLevels.appendChild(document.createTextNode("Reset levels"));
		
		return editWindow;
	};
	*/
	var editWindowStructure = {
	id: "WKSS-edit",
	className: "WKSS",
	childNodes:[{
		tag: 'form',
		id: "WKSS-editForm",
		childNodes:[{
			tag: 'button',
			id: "WKSS-editCloseBtn",
			className: "WKSS-close",
			childNodes:[{
				tag: 'i',
				className: "icon-remove"
			}]
		},{
			tag: 'h1',
			childNodes:["Edit your Vocab"]
		},{
			tag: 'select',
			id: "editWindow",
			other: {size: "8"}
		},{
			tag: 'input', 
			other:{
				type: "text",
				name: "",
				size: "40",
				placeholder: "Select vocab, click edit, change and save!"
			},
			id: "editItem"
		},{
			tag: 'p', 
			id: "editStatus",
			childNodes:["Ready to edit..."]
		},{
			tag: 'button',
			id: "EditEditBtn",
			other: {type: "button"},
			childNodes:["Edit"]
		},{
			tag: 'button',
			id: "EditSaveBtn",
			other:{type: "button"},
			childNodes:["Save"]
		},{
			tag: 'button',
			id: "EditDeleteBtn",
			other: {type: "button", title: "Delete selected item"},
			childNodes:["Delete"]
		},{
			tag: 'button',
			id: "EditDeleteAllBtn",
			other: {type: "button", title: "本当にやるの？"},
			childNodes:["Delete All"]
		},{
			tag: 'button',
			id: "ResetLevelsBtn",
			other: {type: "button"},
			childNodes:["Reset levels"]
		}]
	}]
};

    var addEditWindow = buildWindow(editWindowStructure);
	$("body").append(addEditWindow);
    $("#WKSS-edit").hide();

	/** Resets the levels of all tasks and re-indexes them in storage.
	* @param {Event} evt - Click event (not used)
	*/
	var resetLevels = function (evt) {
		var vocList = StorageUtil.getVocList().map(function(vocItem, i){
			vocItem.level = 0;
			debugging&&console.log("vocList[i].i before: "+vocItem.i);
			vocItem.i=i;
			debugging&&console.log("vocList[i].i after: "+vocItem.i);
			return vocItem;
		}, this);
		StorageUtil.setVocList(vocList);
    };
    $("#ResetLevelsBtn").click(resetLevels);

    $("#EditEditBtn").click(function () {
        //get handle for 'select' area
        var select = document.getElementById("editWindow");

        //get the index for the currently selected item
        var index = select.selectedIndex; //select.options[select.selectedIndex].value is not required, option values are set to index
        var vocabList = StorageUtil.getVocList();
        vocabList = vocabList.reverse();
        document.getElementById("editItem").value = JSON.stringify(vocabList[index]);
        document.getElementById("editItem").name = index; //using name to save the index
        $("#editStatus").text('Loaded item to edit');
    });

    var isEmpty = function(value) {
        return (value === void 0 || value === null);
    };
	
	var isArray = function(arg){
		return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === '[object Array]';
	};

    /** Validates a task object
	* @param {Task} add - The Task being verified
	* @returns {Boolean} If the provided task has all the necessary properties to be added to the review list.
	*/
	var isItemValid = function(add) {
        return (!isEmpty(add.kanji) && //kanji property exists
			!isEmpty(add.meaning) && //meaning property exists
			!isEmpty(add.reading) && //reading property exists
			isArray(add.meaning) &&//meaning is an array
			isArray(add.reading));//reading is an array
    };

    $("#EditSaveBtn").click(function () {
		//-- be aware
		//deleting one item may cause mismatch if i is property of item in list
		try {
			if ($("#editItem").val().length !== 0) {
				var editItem = document.getElementById("editItem");
                var index = editItem.name;
				var item = JSON.parse(editItem.value.toLowerCase());
                // Make sure that the word 'meaning' is immutable, so it exists to trim
				
				if (item.meaning){
					item.meaning.forEach(function(meaning, m, meanings){
						if (meaning === ""){
							delete meanings[m];
						}
					}, this);
				}
                var fullList = StorageUtil.getVocList().reverse();

                if (isItemValid(item) &&//item is valid
                    !(checkForDuplicates(fullList,item) && //kanji (if changed) is not already in the list
                      fullList[index].kanji !== item.kanji)) {//unless it is the item being edited

                    var srslist = StorageUtil.getVocList().reverse();
                    //get srs components of item(list)
                    fullList[index] = item;//does not have srs stuff, re-add it now

                    fullList[index].date = srslist[index].date;
                    fullList[index].level = srslist[index].level;
                    fullList[index].locked = srslist[index].locked;
                    fullList[index].manualLock = srslist[index].manualLock;

                    fullList = fullList.reverse(); //reset order of array

                    localSet('User-Vocab', fullList);

                    generateEditOptions();
                    $("#editStatus").html('Saved changes!');
                    document.getElementById("editItem").value = "";
                    document.getElementById("editItem").name = "";
				}
				else{
                    $("#editStatus").text('Invalid item or duplicate!');
                    alert(isItemValid(item).toString() +" && ！("+ checkForDuplicates(fullList,item).toString()+" && !("+fullList[index].kanji+" !== "+item.kanji+")");
                }
			}
		}
		catch (e) {
			$("#editStatus").text(e);
		}
    });

    var updateEditGUI = function(){
        generateEditOptions();
        document.getElementById("editItem").value = "";
        document.getElementById("editItem").name = "";
    };
	var editDelete = function () {
        //select options element window
        var select = document.getElementById("editWindow");

        //index of selected item
        var item = select.options[select.selectedIndex].value;

        //fetch JSON strings from storage and convert them into Javascript literals
        var vocabList = StorageUtil.getVocList();

        //starting at selected index, remove 1 entry (the selected index).
        if (item > -1) {
            if (vocabList !== null){
                vocabList.splice(item, 1);
            }
        }

        //yuck
        if (vocabList.length !== 0) {
            localSet('User-Vocab', vocabList);
        }
        else {
            localStorage.removeItem('User-Vocab');
        }

        updateEditGUI();

        $("#editStatus").text('Item deleted!');
    };
    $("#EditDeleteBtn").click(editDelete);

	var editDeleteAll = function () {
        var deleteAll = confirm("Are you sure you want to delete all entries?");
        if (deleteAll) {
            //drop local storage
            localStorage.removeItem('User-Vocab');
            updateEditGUI();
            $("#editStatus").text('All items deleted!');
        }
    };
    $("#EditDeleteAllBtn").click(editDeleteAll);

    $("#EditCloseBtn").click(function () {
        $("#edit").hide();
        $("#editForm")[0].reset();
        $("#editStatus").text('Ready to edit..');
    });

    /** Export
	*/
    window.WKSS_export = function () {
        $("#export").show();
        //hide other windows
        $("#add").hide();
        $("#import").hide();
        $("#edit").hide();
        $("#selfstudy").hide();
    };

	var exportWindowStructure = {
		id: "WKSS-export",
		className: "WKSS",
		childNodes:[{
			tag: 'form',
			id: "WKSS-exportForm",
			childNodes:[
				{
					tag: 'button',
					id: "WKSS-exportCloseBtn",
					className: "WKSS-close",
					childNodes:[{
						tag: 'i',
						className: "icon-remove"
					}]
				},
				{
					tag: 'h1',
					childNodes:["Export Items"]
				},
				{
					tag: 'textarea',
					id: "exportArea",
					other: {cols: "50", rows: "18", placeholder: "Export your stuff! Sharing is caring ;)"}
				},
				{
					tag: 'p', 
					id: "exportStatus",
					childNodes:["Ready to export..."]
				},
				{
					tag: 'button',
					id: "ExportItemsBtn",
					other: {type: "button"},
					childNodes:["Export Items"]
				},
				{
					tag: 'button',
					id: "ExportSelectAllBtn",
					other:{type: "button"},
					childNodes:["Select All"]
				},
				{
					tag: 'button',
					id: "ExportCsvBtn",
					other: {type: "button"},
					childNodes:["Export CSV"]
				}
			]
		}]
	};
	var exportWindow = buildWindow(exportWindowStructure);

    $("body").append(exportWindow);
    $("#WKSS-export").hide();


    $("#ExportItemsBtn").click(function () {

        if (localStorage.getItem('User-Vocab')) {
            $("#exportForm")[0].reset();
            var vocabList = StorageUtil.getVocList();
            $("#exportArea").text(JSON.stringify(vocabList));
            $("#exportStatus").text("Copy this text and share it with others!");
        }
        else {
            $("#exportStatus").text("Nothing to export yet :(");
        }
    });

	var select_all = function(str) {
        var text_val = document.getElementById(str);
        debugging&&console.log(text_val);
        text_val.focus();
        text_val.select();
    };

    $("#ExportSelectAllBtn").click(function () {
        if ($("#exportArea").val().length !== 0) {
            select_all("exportArea");
            $("#exportStatus").text("Don't forget to CTRL + C!");
        }
    });

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
                    if (Array.isArray(JSONobject[id][key])){
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

    $("#ExportCsvBtn").click(function () {
        var vocabList = StorageUtil.getVocList();
        var CsvFile = createCSV(vocabList);
        window.open(CsvFile);
    });

    $("#ExportCloseBtn").click(function () {
		$("#export").hide();
		$("#exportForm")[0].reset();
		$("#exportArea").text("");
		$("#exportStatus").text('Ready to export..');
	});

    /** Import
	*/
    window.WKSS_import = function () {
        $("#import").show();
        //hide other windows
        $("#add").hide();
        $("#export").hide();
        $("#edit").hide();
        $("#selfstudy").hide();
    };

 	var importWindowStructure = {
		id: "WKSS-import",
		className: "WKSS",
		childNodes:[{
			tag: 'form',
			id: "WKSS-importForm",
			childNodes:[
				{
					tag: 'button',
					id: "WKSS-importCloseBtn",
					className: "WKSS-close",
					childNodes:[{
						tag: 'i',
						className: "icon-remove"
					}]
				},
				{
					tag: 'h1',
					childNodes:["Import Items"]
				},
				{
					tag: 'textarea',
					id: "importArea",
					other: {cols: "50", rows: "18", placeholder: "Paste your stuff and hit the import button! Use with caution!"}
				},
				{
					tag: 'p', 
					id: "importStatus",
					childNodes:["Ready to import..."]
				},
				{
					tag: 'label',
					id: "ImportItemsBtn",
					className: "button",
					other: {type: "button", style: "display:inline;"},
					childNodes:["Import Items"]
				},
				{
					tag: 'label',
					id: "ImportCsvBtn",
					className: "button",
					other: {style:"display:inline; cursor: pointer;"},
					childNodes:["Import CSV",
						{
							tag: 'input',
							id: "upload",
							other: {
								type: "file", accept: ".csv, .tsv",
								style: "height:0px;width:0px;background:red;opacity:0;filter:opacity(1);"
							}
						}
					]
				},
				{
					tag: 'label',
					id: "ImportWKBtn",
					className: "button",
					other: {style: "display:inline;"},
					childNodes:[
						{
							tag:'i',
							className: "icon-download-alt"
						},
						"WK"
					]
				}
			]
		}]
	};
	var importWindow = buildWindow(importWindowStructure);

    $("body").append(importWindow);
   $("#import").hide();

	var checkAdd = function(add) {
        //take a JSON object (parsed from import window) and check with stored items for any duplicates
        // Returns true if each item in 'add' array is valid and
        //at least one of them already exists in storage
        var i = add.length;
        if(localStorage.getItem('User-Vocab')) {    
            var vocabList = StorageUtil.getVocList();
            while(i--){
                if (isItemValid(add[i]) &&
                    checkForDuplicates(vocabList,add[i]))
                    return true;
            }
        }
        return false;
    };

    document.getElementById("upload") && document.getElementById("upload").addEventListener('change', ImportUtil.fileUpload, false);

	var refreshLocks = function(){
		var vocList = StorageUtil.getVocList().map(function(vocItem){
			debugging&&console.log("vocList[i] = setLocks(vocList[i]);");
			vocItem = setLocks(vocItem);  
			return vocItem;
		}, this);
		console.groupEnd();
		StorageUtil.setVocList(vocList);
    };

    
    $("#ImportWKBtn").click(function(){
        WanikaniUtil.getServerResp(APIkey,"vocabulary");
        debugging&&console.log("maybe?");
    });

    $("#ImportItemsBtn").click(function () {
        if ($("#importArea").val().length !== 0) {
            try {
                var add = JSON.parse($("#importArea").val().toLowerCase());
                alert(JSON.stringify(add));
                if (checkAdd(add)) {
                    $("#importStatus").text("No valid input (duplicates?)!");
                    return;
                }

                var newlist;
                var srslist = [];
                if (localStorage.getItem('User-Vocab')) {
                    var vocabList = StorageUtil.getVocList();
                    srslist = StorageUtil.getVocList();
                    newlist = vocabList.concat(add);
                }
                else {
                    newlist = add;


                }
                var i = add.length;
                while(i--){
                    StorageUtil.setVocItem(add[i]);
                }

                $("#importStatus").text("Import successful!");

                $("#importForm")[0].reset();
                $("#importArea").text("");

            }
            catch (e) {
                $("#importStatus").text("Parsing Error!");
                debugging&&console.log(e);
            }

        }
        else {
            $("#importStatus").text("Nothing to import :( Please paste your stuff first");
        }
    });

    $("#ImportCloseBtn").click(function () {
        $("#import").hide();
        $("#importForm")[0].reset();
        $("#importArea").text("");
        $("#importStatus").text('Ready to import..');
    });

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

            debugging&&console.log("Audio URL: " + url);

            document.getElementById('AudioButton').disabled = false;

            document.getElementById('rev-audio').innerHTML = url;

        }

    };

    var nextReview = function(reviewList) {
        //sets up the next item for review
        //uses functions:
        //    wanakana.bind/unbind

        var rnd = Math.floor(Math.random()*reviewList.length);
        var item = reviewList[rnd];
        sessionSet('WKSS-item', JSON.stringify(item));
        sessionSet('WKSS-rnd', rnd);
        if (sessionStorage.getItem('User-Stats')){
            $("#RevNum").innerHtml = sessionGet('User-Stats').length;
        }
        document.getElementById('rev-kanji').innerHTML = item.prompt;
        document.getElementById('rev-type').innerHTML = item.type;
        var typeBgColor = 'grey';
        if (item.type.toLowerCase() == 'meaning'){
            typeBgColor = 'blue';
        } else if (item.type.toLowerCase() == 'reading'){
            typeBgColor = 'orange';
        } else if (item.type.toLowerCase() == 'reverse'){
            typeBgColor = 'orange';
        }
        document.getElementById('wkss-type').style.backgroundColor = typeBgColor;
        $("#rev-solution").removeClass("info");
        document.getElementById('rev-solution').innerHTML = item.solution;
        document.getElementById('rev-index').innerHTML = item.index;

        //initialise the input field
        $("#rev-input").focus();
        $("#rev-input").removeClass("caution");
        $("#rev-input").removeClass("error");
        $("#rev-input").removeClass("correct");
        $("#rev-input").val("");

        //check for alphabet letters and decide to bind or unbind wanakana
        if (item.solution[0].match(/[a-zA-Z]+/i)) {
            wanakana.unbind(document.getElementById('rev-input'));
            $('#rev-input').attr('placeholder','Your response');
            $('#rev-input').attr('lang','en');

        }
        else {
            wanakana.bind(document.getElementById('rev-input'));
            $('#rev-input').attr('placeholder','答え');
            $('#rev-input').attr('lang','ja');

        }

        playAudio();
    };

	//global to keep track of when a review is in session.
    var reviewActive = false;

    var startReview = function() {
        debugging&&console.log("startReview()");
        submit = true;
        reviewActive = true;
        //get the review 'list' from session storage, line up the first item in queue
        var reviewList = sessionGet('User-Review')||[];
        nextReview(reviewList);
    };

    /** Review Items
	*/
    window.WKSS_review = function () {

        //is there a session waiting in storage?
        if(sessionStorage.getItem('User-Review')) {

            //show the selfstudy window
            $("#selfstudy").show();

            //hide other windows
            $("#add").hide();
            $("#export").hide();
            $("#edit").hide();
            $("#import").hide();

            startReview();
        }
    };

    $("body").append('                                                          \
<div id="selfstudy" class="WKSS">\
<button id="SelfstudyCloseBtn" class="wkss-close" type="button"><i class="icon-remove"></i></button>\
<h1>Review<span id="RevNum"></span></h1>\
<div id="wkss-kanji">\
<span id="rev-kanji"></span>\
</div><div id="wkss-type">\
<span id="rev-type"></span><br />\
</div><div id="wkss-solution">\
<span id="rev-solution"></span>\
</div><div id="wkss-input">\
<input type="text" id="rev-input" size="40" placeholder="">\
</div><span id="rev-index" style="display: block;"></span>\
\
<form id="audio-form">\
<label id="AudioButton" class="button">Play audio</label>\
<label id="WrapUpBtn"   class="button">Wrap Up</label>\
</form>\
<div id="rev-audio" style="display:none;"></div>\
</div>');
    $("#selfstudy").hide();

    $("#SelfstudyCloseBtn").click(function () {
        $("#selfstudy").hide();
        $("#rev-input").val("");
        reviewActive = false;
    });

    var binarySearch = function(values, target, start, end) {
        //debugging&&console.log("binarySearch(values: ,target: , start: "+start+", end: "+end+")");

        if (start > end) {
            //start has higher value than target, end has lower value
            //item belongs between
            // need to return 'start' with a flag that it hasn't been found
            //invert sign :)
            return -(start);


            //for testing truths
            //    return String(end)+" < "+item.index+" < "+String(start);

        } //does not exist


        var middle = Math.floor((start + end) / 2);
        var value = values[middle];
        /*debugging&&console.log("start.index: "+values[start].index);
     debugging&&console.log("middle.index: "+values[middle].index);
     debugging&&console.log("end.index: "+values[end].index);
     */
        if (Number(value.index) > Number(target.index)) {
			return binarySearch(values, target, start, middle-1);
		}
        if (Number(value.index) < Number(target.index)) {
			return binarySearch(values, target, middle+1, end);
		}
        return middle; //found!
    };

	var findIndex = function(values, target) {
        return binarySearch(values, target, 0, values.length - 1);
	};

    $("#WrapUpBtn").click(function() {
        var sessionList = sessionGet('User-Review')||[];
        var statsList = sessionGet('User-Stats')||[];
        //if an index in sessionList matches one in statsList, don't delete
        var sessionI = sessionList.length;
        var item = sessionGet('WKSS-item')||[];
        var arr2 = [];
        //for every item in sessionList, look for index in statsList,
        //if not there (-1) delete item from sessionList
        while (sessionI--){
            var index = findIndex(statsList,sessionList[sessionI]);
            if ((Math.sign(1/index) !== -1)||(sessionList[sessionI].index == item.index)){

                arr2.push(sessionList[sessionI]);
            }
        }
        debugging&&console.log(arr2);
        sessionSet('User-Review', JSON.stringify(arr2));
    });

    /** Save to list based on .index property
	* @param {Array.<task>} eList
	* @param {task} eItem
	*/
    var saveToSortedList = function(eList,eItem){
        var get = findIndex(eList,eItem);
        if (Math.sign(1/get) === -1){
            eList.splice(-get,0,eItem);
        }
		return eList;
    };

    //-------
    var openInNewTab = function(url) {
        var win=window.open(url, '_blank');
        win.focus();
    };

    $("#AudioButton").click(function () {
        openInNewTab(document.getElementById('rev-audio').innerHTML);
    });

    var Rev_Item = function(prompt, kanji, type, solution, index){
        this.prompt = prompt;
        this.kanji = kanji;
        this.type = type;
        this.solution = solution;
        this.index = index;
    };

    var updateSRS = function(stats, voclist) {
        var now = Date.now();
        if (voclist[stats.index].due < now){ //double check that the item was really up for review.
            if(!stats.numWrong && voclist[stats.index].level < 9) {//all correct (none wrong)
                voclist[stats.index].level++;
            }
            else {
                stats.numWrong = {};
                //Adapted from WaniKani's srs to authentically mimic level downs
                var o = (stats.numWrong.Meaning||0)+(stats.numWrong.Reading||0)+(stats.numWrong.Reverse||0);
                var t = voclist[stats.index].level;
                var r=t>=5?2*Math.round(o/2):1*Math.round(o/2);
                var n=t-r<1?1:t-r;

                voclist[stats.index].level = n;//don't stay on 'started'

            }
            voclist[stats.index].date = now;
            voclist[stats.index].due = now + srsObject[voclist[stats.index].level].duration;
            console.log("Next review in "+ms2str(srsObject[voclist[stats.index].level].duration));

            return voclist;
        }
    };

    var showResults = function() {

        var statsList = sessionGet('User-Stats')||[];
        sessionStorage.clear();

        console.log("statslist", statsList);
        var voclist = StorageUtil.getVocList();
        
		statsList.forEach(function(stats, i, statsList){
            debugging&&console.log("stats",stats);
            var altText = voclist[stats.index].level;//+stats.type;

            if (stats.numWrong) {
                if (stats.numWrong.Meaning)
                    altText = altText + " Meaning Wrong x"+stats.numWrong.Meaning +"\n";
                if (stats.numWrong.Reading)
                    altText = altText + " Reading Wrong x"+stats.numWrong.Reading +"\n";
                if (stats.numWrong.Reverse)
                    altText = altText + " Reverse Wrong x"+stats.numWrong.Reverse +"\n";
			}
			if (stats.numCorrect){
				if (stats.numCorrect.Meaning)
					altText = altText + " Meaning Correct x"+stats.numCorrect.Meaning +"\n";
				if (stats.numCorrect.Reading)
					altText = altText + " Reading Correct x"+stats.numCorrect.Reading +"\n";
				if (stats.numCorrect.Reverse)
					altText = altText + " Reverse Correct x"+stats.numCorrect.Reverse +"\n";
			}
            console.log(stats);

			//TODO sort into apprentice, guru, etc
			document.getElementById("stats-a").innerHTML +=
				"<span class=" +
				(stats.numWrong? "\"rev-error\"":"\"rev-correct\"") +
				" title='"+altText+"'>" + stats.kanji + "</span>";
			
			//map with side effects?
            statsList[i] = updateSRS(stats, voclist);

        }, this);
        sessionSet("User-Stats",statsList);
        localSet("User-Vocab", voclist);
    };

    $("body").append('                                                          \
<div id="resultwindow" class="WKSS">                                    \
<button id="ReviewresultsCloseBtn" class="wkss-close" type="button"><i class="icon-remove"></i></button>\
<h1>Review Results</h1>\
<h2>All</h2>\
<div id="stats-a"></div>\
</div>');

    $("#resultwindow").hide();

    $("#ReviewresultsCloseBtn").click(function () {
        $("#resultwindow").hide();
        document.getElementById("stats-a").innerHTML = "";
    });

	var markAnswer = function(item) {
        //evaluate 'item' against the question.
        // match by index
        // get type of question
        // determine if right or wrong and return result appropriately

        //get the question
        //var prompt = document.getElementById('rev-kanji').innerHTML.trim();
        //get the answer
        var answer = $("#rev-input").val().toLowerCase();
        //get the index
        var index = document.getElementById('rev-index').innerHTML.trim();
        //get the question type
        var type  = document.getElementById('rev-type').innerHTML.trim();

        //var vocab = localGet("User-Vocab");

        //get the item if it is in the current session
        var storedItem = sessionGet(item.index);
        if (storedItem){

            item.numCorrect = storedItem.numCorrect;
            item.numWrong = storedItem.numWrong;
        }

        if (index == item.index){//-------------
            if (inputCorrect()){
                debugging&&console.log(answer+"/"+item.solution[0]);
                if (!item.numCorrect){
                    debugging&&console.log("initialising numCorrect");
                    item.numCorrect={};
                }

                debugging&&console.log("Correct: "+ type);
                if (type == "Meaning"){
                    if (!item.numCorrect.Meaning)
                        item.numCorrect.Meaning = 0;

                    item.numCorrect.Meaning++;

                }
                if (type == "Reading"){
                    if (!item.numCorrect.Reading)
                        item.numCorrect.Reading = 0;

                    item.numCorrect.Reading++;
                }

                if (type == "Reverse"){
                    if (!item.numCorrect.Reverse)
                        item.numCorrect.Reverse = 0;

                    item.numCorrect.Reverse++;
                }

            }else{
                debugging&&console.log(answer+"!="+item.solution);
                if (!item.numWrong){
                    debugging&&console.log("initialising numCorrect");
                    item.numWrong={};
                }

                debugging&&console.log("Wrong: "+ type);
                if (type == "Meaning"){
                    if (!item.numWrong.Meaning)
                        item.numWrong.Meaning = 0;

                    item.numWrong.Meaning++;

                }
                if (type == "Reading"){
                    if (!item.numWrong.Reading)
                        item.numWrong.Reading = 0;

                    item.numWrong.Reading++;

                }
                if (type == "Reverse"){
                    if (!item.numWrong.Reverse)
                        item.numWrong.Reverse = 0;

                    item.numWrong.Reverse++;
                }
            }
        }
		else {
            console.error("Error: indexes don't match");
        }
        return item;
    };

	
    //jquery keyup event
    $("#rev-input").keyup(ReviewUtil.submitResponse);


    /** Adds the Button
	*/
    var addUserVocabButton = function() {
        debugging&&console.log("addUserVocabButton()");
        //Functions (indirect)
        //    WKSS_add()
        //    WKSS_edit()
        //    WKSS_export()
        //    WKSS_import()
        //    WKSS_lock()
        //    WKSS_review()

        var nav = document.getElementsByClassName('nav');
        debugging&&console.log("generating review list because: initialising script and populating reviews");


        if (nav&&nav.length>2) {
            nav[2].innerHTML = nav[2].innerHTML + "\n\
<li class=\"dropdown custom\">\n\
<a class=\"dropdown-toggle custom\" data-toggle=\"dropdown\" href=\"#\" onclick=\"generateReviewList();\">\n\
<span lang=\"ja\">自習</span>\n\
Self-Study <i class=\"icon-chevron-down\"></i>\n\
</a>\n\
<ul class=\"dropdown-menu\" id=\"WKSS_dropdown\">\n\
<li class=\"nav-header\">Customize</li>\n\
<li><a id=\"click\" href=\"#\" onclick=\"WKSS_add();\">Add</a></li>\n\
<li><a href=\"#\" onclick=\"WKSS_edit();\">Edit</a></li>\n\
<li><a href=\"#\" onclick=\"WKSS_export();\">Export</a></li>\n\
<li><a href=\"#\" onclick=\"WKSS_import();\">Import</a></li>\n\
<!--//   <li><a href=\"#\" onclick=\"WKSS_lock();\">Server Settings</a></li>//-->\n\
<li class=\"nav-header\">Learn</li>\n\
<li><a id=\"user-review\" href=\"#\" onclick=\"WKSS_review();\">Please wait...</a></li>\n\
</ul>\n\
</li>";


        }else{
            console.error("could not find nav", nav);
        }
        console.log("addUserVocab");
    };

	    /** Error handling
	* Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
	*/
    var logError = function(error) {
        debugging&&console.log("logError(error)");
        var stackMessage = "";
        if ("stack" in error)
            stackMessage = "\n\tStack: " + error.stack;

        debugging&&console.log("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
        console.error("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
    };


    /**  Prepares the script
	*/
    var scriptInit = function() {
        debugging&&console.log("scriptInit()");
        //functions:
        //    addUserVocabButton()
        //    logError(err)

        debugging&&console.log("Initializing Wanikani UserVocab Script!");

        gM_addStyle(".custom .dropdown-menu {background-color: #DBA901 !important;}");
        gM_addStyle(".custom .dropdown-menu:after {border-bottom-color: #DBA901 !important;");
        gM_addStyle(".custom .dropdown-menu:before {border-bottom-color: #DBA901 !important;");
        gM_addStyle(".open .dropdown-toggle.custom {background-color: #FFC400 !important;}");
        gM_addStyle(".custom .dropdown-menu a:hover {background-color: #A67F00 !important;}");
        gM_addStyle(".custom:hover {color: #FFC400 !important;}");
        gM_addStyle(".custom:hover span {border-color: #FFC400 !important;}");
        gM_addStyle(".custom:focus {color: #FFC400 !important;}");
        gM_addStyle(".custom:focus span {border-color: #FFC400 !important;}");
        gM_addStyle(".open .custom span {border-color: #FFFFFF !important;}");
        gM_addStyle(".open .custom {color: #FFFFFF !important}");

		var wkStyleCSS = require('./wkstyle.js');
        gM_addStyle(wkStyleCSS);
        // Set up buttons
        try {
            if (typeof localStorage !== "undefined") {
                addUserVocabButton();

                //provide warning to users trying to use the (incomplete) script.
                debugging&&console.log("this script is still incomplete: \n\
It is provided as is without warranty express or implied\n\
in the hope that you may find it useful.");
            }
            else {
                debugging&&console.log("Wanikani Self-Study: Your browser does not support localStorage.. Sorry :(");
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

    }
	else {
        alert('The File APIs are not fully supported in this browser.');
    }

    /** Start the script
    */
    //unless the user navigated from the review directory, they are unlikely to have unlocked any kanji
    var noNewStuff = /^https:\/\/.*\.wanikani\.com\/.*/.test(document.referrer)&&!(/https:\/\/.*\.wanikani\.com\/review.*/.test(document.referrer));
    var usingHTTPS = /^https:/.test(window.location.href);
    console.info(usingHTTPS, window.location.href);
    if (usingHTTPS){
        if (!noNewStuff){  //Don't waste time if user is browsing site
            WanikaniUtil.getServerResp(APIkey);
        }else{
            debugging&&console.log("User is unlikely to have new kanji unlocked");
        }
        debugging&&console.info("WaniKani Self-Study Plus is about to start");

        scriptInit();

    }else{
        debugging&&console.warn("It appears that you are not using https protocol. Attempting to redirect to https now.");
        window.location.href = window.location.href.replace(/^http/, "https");
    }
}
if (document.readyState === 'complete'){
    console.info("About to initialise WKSS+");
    main();
} else {
    window.addEventListener("load", main, false);
}
