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

function main(){
    "use strict";

    $("head").prepend("<script src='https://cdn.jsdelivr.net/jquery.mockjax/1.6.1/jquery.mockjax.js'></script>");

    var APIkey = StorageUtil.getSetApi();
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
	console.log = WKSS_Settings.debugging ? function () {
		if (typeof arguments[0] === 'string') {
			arguments[0] = "WKSS: " + arguments[0];
		}
		else {
			Array.prototype.unshift.call(arguments, "WKSS: ");
		}
		window.console.log.apply(arguments);
	} : function () {
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

    $("head").prepend('<script src="https://rawgit.com/WaniKani/WanaKana/master/lib/wanakana.js" type="text/javascript"></script>');
    
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
	var generateReviewList = function(evt) {
        //don't interfere with an active session
		
        if (reviewActive){
			console.log("generateReviewList args", arguments);
            document.getElementById('user-review').innerHTML = "Review in Progress";
            return;
        }

        console.log("generateReviewList()");
        // function generateReviewList() builds a review session and updates the html menu to show number waiting.
        var numReviews = 0;
        var soonest = Infinity;
        var next;

        var reviewList = [];

        //check to see if there is vocab already in offline storage
        if (localStorage.getItem('User-Vocab')) {
            var vocabList = StorageUtil.getVocList();
            console.log(vocabList);
            var now = Date.now();

            //for each vocab in storage, get the amount of time vocab has lived
            //var i = vocabList.length;
            //while(i--){
			vocabList.forEach(function(task, i){
                var due = task.date + SettingsUtil.srsObject[task.level].duration;

                // if tem is unlocked and unburned
                if (task.level < 9 &&
                    (!task.manualLock ||task.manualLock === "no" || task.manualLock === "n" ||
                     task.manualLock ==="DB" && !WKSS_Settings.lockDB )){
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
                        if (task.reading[0] !== "" && task.meaning[0] !== "" && WKSS_Settings.reverse){
                            //Rev_Item object args: prompt, kanji, type, solution, index
                            var revItem3 = new Rev_Item(task.meaning.join(", "), task.kanji, "Reverse", task.reading, i);
                            reviewList.push(revItem3);
                        }

                    }
					else{//unlocked/unburned but not time to review yet
                        console.log("setting soonest");
                        next = due - now;
						soonest = Math.min(soonest, next);
                    }
				}//end if item is up for review
			}, this);// end iterate through vocablist
		}// end if localStorage
        if (reviewList.length !== 0){
            //store reviewList in current session
            StorageUtil.localSet('User-Review', JSON.stringify(reviewList));
            console.log(reviewList);
        }
		else{
            console.log("reviewList is empty: "+JSON.stringify(reviewList));
			document.getElementById('user-review').innerHTML = soonest<Infinity? "Next Review in "+ObjectUtil.ms2str(soonest) : "No Reviews Available";
		}
        var strReviews = numReviews.toString();

        /* If you want to do the 42+ thing.
		 if (numReviews > 42) {
		 strReviews = "42+"; //hail the crabigator!
		 }
		//*/

        // return the number of reviews
        console.log(numReviews.toString() +" reviews created");
        if (numReviews > 0){
            var reviewString = (soonest !== void 0)? "<br/>\r\nMore to come in "+ObjectUtil.ms2str(soonest):"";
            document.getElementById('user-review').innerHTML = "Review (" + strReviews + ")" + reviewString;
        }
    };

	var showUserWindow = function() {
		$(".WKSS").hide();
		$("#WKSS-user").show();
	};

	/*
	*  Add Item
	*/
	// event function to open "add window" and close any other window that might be open at the time.
	var WKSS_add = function () {
		$(".WKSS").hide();
		//show the add window
		$("#WKSS-add").show();
	};

	//hide add window ("div add" code that was just appended)
	$("#WKSS-add").hide();

	var handleAddClick = require('./handleAddClick.js');

	/**  Edit Items
	*/
	var WKSS_edit = function () {
		EditWindowFunctions.generateEditOptions();
		$(".WKSS").hide();
		$("#WKSS-edit").show();
	};
	/**  Export
	*/
	var WKSS_export = function () {
		$(".WKSS").hide();
		$("#WKSS-export").show();
	};

	/**  Import
	*/
	var WKSS_import = function () {
		$(".WKSS").hide();
		$("#WKSS-import").show();
	};
	
	/**  Review Items
	*/
	var WKSS_review = function (evt) {
		//is there a session waiting in storage?
		if(StorageUtil.localGet('User-Review')) {

			$(".WKSS").hide();
			$("#WKSS-selfstudy").show();
			MarkingUtil.startReview();
		}
	};

	//declare global values for keyup event
	//is an answer being submitted?
	var submit = true;

	var buildNode = require('./buildnode.js');
	var buildWindow = require('./buildwindow.js');
	var windowObjects = require('./windowobjects.js');

	var autoFillUser = function(evt){
		console.info(user.loggedInUser);
		$("#userApi").val(user.loggedInUser._api);
		StorageUtil.saveUserApi(user.loggedInUser._api);
		$("#WKSS-username").append(user.loggedInUser.getUsername());
	};

	var userWindow = buildWindow(windowObjects.user);
	$("body").append(userWindow);
	$("#WKSS-user").hide();
	$("#AutofillUserBtn").click(autoFillUser);
	
    var addAddWindow = buildWindow(windowObjects.addVocab);
	$("body").append(addAddWindow);
    $("#WKSS-add").hide();

	//function to fire on click event for "Add new Item"
	$("#AddItemBtn").click(handleAddClick);

	$("#AddCloseBtn").click(function () {
		$("#WKSS-add").hide();
		$("#addForm")[0].reset();
		$("#addStatus").text('Ready to add..');
		$("#addKanji").removeClass("error");
		$("#addMeaning").removeClass("error");
	});

    var addEditWindow = buildWindow(windowObjects.editTask);
	$("body").append(addEditWindow);
    $("#WKSS-edit").hide();
    $("#ResetLevelsBtn").click(EditWindowFunctions.resetLevels);
    $("#EditEditBtn").click(EditWindowFunctions.editEditHandler);
    $("#EditSaveBtn").click(SetReviewsUtil.editSaveHandler);
    $("#EditDeleteBtn").click(EditWindowFunctions.editDelete);
	$("#EditDeleteAllBtn").click(EditWindowFunctions.editDeleteAll);
    $("#WKSS-editCloseBtn").click(function () {
        $("#WKSS-edit").hide();
        $("#WKSS-editForm")[0].reset();
        $("#WKSS-editStatus").text('Ready to edit...');
    });

	var exportWindow = buildWindow(windowObjects.export);
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
        console.log(text_val);
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

	var importWindow = buildWindow(windowObjects.import);

    $("body").append(importWindow);
   $("#WKSS-import").hide();
	
    document.getElementById("upload") && document.getElementById("upload").addEventListener('change', ImportUtil.fileUpload, false);

	$("#ImportCsvBtn").click(function () {
	});
    
    $("#ImportWKBtn").click(function(){
        WanikaniUtil.getServerResp(APIkey,"vocabulary", WanikaniUtil.onStateChangeHandler);
        console.log("maybe?");
    });

    $("#ImportItemsBtn").click(SetReviewsUtil.importItemsHandler);

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

            console.log("Audio URL: " + url);

            document.getElementById('AudioButton').disabled = false;

            document.getElementById('rev-audio').innerHTML = url;

        }

    };

	var endReviewSession = function () {
 //       $("#WKSS-selfstudy").hide();
        document.getElementById('selfStudyForm').reset();
//		$("#rev-input").val("");
        reviewActive = false;
    };
	
	var selfStudyWindow = buildWindow(windowObjects.review);

    $("body").append(selfStudyWindow);
    $("#WKSS-selfstudy").hide();

    $("#WKSS-SelfstudyCloseBtn").click(endReviewSession);

    
    $("#WrapUpBtn").click(function() {
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
	
	//jquery keyup event
	$("#rev-input").keyup(MarkingUtil.reviewKeyUpHandler);


    
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


	var resultsWindow = buildWindow(windowObjects.results);
    $("body").append(resultsWindow);

    $("#WKSS-resultwindow").hide();

    $("#WKSS-ReviewresultsCloseBtn").click(function () {
        $("#resultwindow").hide();
        document.getElementById("stats-a").innerHTML = "";
    });
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
    var scriptInit = function() {
        //functions:
        //    addUserVocabButton()
        //    logError(err)
		console.log("Initializing Wanikani UserVocab Script!");

		var wkStyleCSS = require('./wkstyle.js');
        gM_addStyle(wkStyleCSS);
        // Set up buttons
        try {
            if (typeof localStorage !== "undefined") {
                WanikaniDomUtil.addSelfStudyMenu(WKSS_add, WKSS_edit, WKSS_import, WKSS_export, null, WKSS_review, showUserWindow, generateReviewList);

                //provide warning to users trying to use the (incomplete) script.
                console.log("this script is still incomplete: \r\nIt is provided as is without warranty express or implied\r\nin the hope that you may find it useful.");
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
        console.info("WaniKani Self-Study Plus is about to start");
		if (noNewStuff){  //Don't waste time if user is browsing site
			console.log("User is unlikely to have new kanji unlocked");
        }
		else{
			WanikaniUtil.getServerResp(APIkey, 'kanji', WanikaniUtil.onStateChangeHandler);
        }
        
        scriptInit();

    }else{
        console.warn("It appears that you are not using https protocol. Attempting to redirect to https now.");
        window.location.href = window.location.href.replace(/^http/, "https");
    }
}
if (document.readyState === 'complete'){
    console.info("About to initialise WKSS+");
    main();
} else {
    window.addEventListener("load", main, false);
}
