/*  This is the original code that I am breaking into bite size bits */


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
function main(){
    "use strict";

    $("head").prepend("<script src='https://cdn.jsdelivr.net/jquery.mockjax/1.6.1/jquery.mockjax.js'></script>");
    /*
 *  This script is licensed under the Creative Commons License
 *  "Attribution-NonCommercial 3.0 Unported"
 *
 *  More information at:
 *  http://creativecommons.org/licenses/by-nc/3.0/
 */
    var APIkey = "YOUR_API_HERE";
    var locksOn = true; //Disable vocab locks (unlocked items persist until deleted)
    var lockDB = true; //Set to false to unlock Kanji is not available on WaniKani (ie. not returned by API)
    var reverse = true; //Include English to ひらがな reading reviews
    var debugging = true;
    //debugging = false;
    var asWK = true; //Push user reviews into the main WK review queue

    // shut up JSHint
    /* jshint multistr: true , jquery: true, expr: true, indent:2 */
    /* global window, wanakana, XDomainRequest */


    /*
 *  Debugging
 */
    /*
var debugging&&console.log = debugging ? function (msg) {
    if (typeof msg === 'string') {
        window.console.log("WKSS: " + msg);
    } else {
        window.console.log("WKSS: ", msg);
    }
} : function () {
};
*/

    //convert localstorage User-Vocab for updates
    function convertStorage(vocab){
        vocab = vocab || localGet("User-Vocab") || [];
        var v = vocab.length;
        while (v--){
            if (typeof vocab[v].due === "undefined" ||
                vocab[v].due !== vocab[v].date + srsintervals[vocab[v].level]
               ){
            }
        }
        localSet("User-Vocab", vocab);
    }

    $("head").prepend('<script src="https://rawgit.com/WaniKani/WanaKana/master/lib/wanakana.js" type="text/javascript"></script>');

    //track versions & datatypes
    var VersionData = {
        v: "0.1.13",
        propertyType: {meaning: "array", reading: "array", kanji: "string", i:"number", components: "array", date: "number", due: "number", locked: "string", manualLock: "string"},
        propertyDesc: {meaning: "list of meanings", reading: "list of readings", kanji: "item prompt", i:"item index", components: "kanji found in word", date: "timestamp of new level", due: "timestamp of item's next review", locked: "indicator of whether components are eligible", manualLock: "latch for 'locked' so failing components don't re-lock the item"}
    };
    localSet("WKSSdata", VersionData);


    /*
 *  Settings and constants
 */

    function getSetApi(APIkey){

        var storedAPI = localStorage.getItem('WaniKani-API');
        if (APIkey === "YOUR_API_HERE"){
            if (storedAPI !== null){
                APIkey = localStorage.getItem('WaniKani-API');
            }
        }else{
            //API has been set in code.
            if (storedAPI !== APIkey){
                localSet('WaniKani-API', APIkey);//overwrite with new API
            }
        }
        return APIkey;
    }
    APIkey = getSetApi(APIkey);


    ///###############################################
    // Config for window sizes in pixels

    // add Window, standard 300 x 300
    var addWindowHeight = 300;
    var addWindowWidth = 300;

    // export and import Window, standard 275 x 390
    var exportImportWindowHeight = 275;
    var exportImportWindowWidth = 390;

    // edit Window, standard 380 x 800
    var editWindowHeight = 380;
    var editWindowWidth = 800;

    // study(review) Window, standard 380 x 600
    var studyWindowWidth = 600;

    // result Window, standard 500 x 700
    var resultWindowHeight = 500;
    var resultWindowWidth = 700;

    ///###############################################

    var errorAllowance = 4; //every x letters, you can make one mistake when entering the meaning

    //srs 4h, 8h, 24h, 3d (guru), 1w, 2w (master), 1m (enlightened), 4m (burned)
    var srslevels = ["Started", "Apprentice", "Apprentice", "Apprentice", "Apprentice", "Guru", "Guru", "Master", "Enlightened", "Burned"];

    var srsintervals = [];
    var hrs = 60*60*1000;
    var days = 24*hrs;
    var weeks = 7*days;
    srsintervals.push(0);
    srsintervals.push(4*hrs);
    srsintervals.push(8*hrs);
    srsintervals.push(1*days);
    srsintervals.push(3*days);
    srsintervals.push(1*weeks);
    srsintervals.push(2*weeks);
    srsintervals.push(730*hrs);//average month
    srsintervals.push(2922*hrs);//average 4 months

    //---
    convertStorage();


    //GM_addStyle shim for compatibility
    function gM_addStyle(CssString){
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
    }

    /*
 *  JQuery fixes
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


    //--------------Start Insert Into WK Review Functions--------------

    var WKItems = [];
    var userVocab = localGet("User-Vocab")||[];
    console.groupCollapsed("Loading Items");
    for (var i = 0; i < userVocab.length; i++){
        var dueNow = (userVocab[i].locked === "no" && userVocab[i].level < 9 && Date.now() > userVocab[i].due);

        if (dueNow){
            if (userVocab[i].kanji.length * userVocab[i].meaning[0].length * userVocab[i].reading[0].length){
                //Sorry, we need all three to add to WK review, no kana only without readings etc.
                debugging&&console.log("item:" + userVocab[i].kanji + ", " + userVocab[i].locked +" === \"no\" && " + userVocab[i].level + " < 9 && " + Date.now() + " > " + userVocab[i].due);
                debugging&&console.log(dueNow);
                WKItems.push(wKSS_to_WK(userVocab[i]));
            }else{
                debugging&&console.log("Item " + userVocab[i].kanji + " could not be added, it is missing one or more of the essential fields for a WK vocabulary review");
            }
        }
    }
    console.groupEnd();//That should be a lot neater.

    if (userVocab.length){
        console.log("first item regardless of being added to queue:", wKSS_to_WK(userVocab[0]), JSON.stringify(wKSS_to_WK(userVocab[0])));
    }

    console.log(WKItems);
    //where the magic happens
    if (asWK){
        $.jStorage.listenKeyChange("reviewQueue",joinReviews);
    }



    function joinReviews(){
        console.log("joining reviews");
        $.jStorage.stopListening("reviewQueue", joinReviews);
        var WKreview = $.jStorage.get("reviewQueue")||[];
        var WKcombined = WKreview.concat(WKItems);
        $.jStorage.set("reviewQueue", WKcombined);
    }

    function wKSS_to_WK(WKSSItem){
        var WKItem = {};
        //    WKItem.aud = "";
        WKItem.en = WKSSItem.meaning.map(function(s) { return s.trim().replace(/\b\w/g , function(m){ return m.toUpperCase(); }); }); //trim whitespace and capitalize words
        WKItem.id = "WKSS" + WKSSItem.i;
        WKItem.kana = WKSSItem.reading;
        WKItem.srs = WKSSItem.level+1;//WK starts levels from 1, WKSS starts them from 0

        WKItem.syn = [];
        //Add synonyms of strings without bracketed info to get around checking the full string including brackets
        for (var m = 0; m < WKSSItem.meaning.length; m++){
            var openBracket = WKSSItem.meaning[m].indexOf("(");
            if (openBracket !== -1 && WKSSItem.meaning[m].indexOf(")") !== -1){
                WKItem.syn.push(WKSSItem.meaning[m].substr(0, openBracket).trim().replace(/\b\w/g , function(m){ return m.toUpperCase();}));
            }
        }

        WKItem.voc = WKSSItem.kanji;
        //
        WKItem.components = WKSSItem.components;
        return WKItem;
    }

var hijackRequests = require('./hijackRequests.js');

    function updateSRS(stats, voclist) {


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
            voclist[stats.index].due = now + srsintervals[voclist[stats.index].level];
            console.log("Next review in "+ms2str(srsintervals[voclist[stats.index].level]));

            return voclist;
        }
    }

    function localSet(strName, obj){
        debugging&&console.log(strName + " is of type " + typeof obj);
        if (typeof obj === "object")
            obj=JSON.stringify(obj);
        localStorage.setItem(strName, obj);
    }
    function localGet(strName){
        var strObj = localStorage.getItem(strName);
        return parseString(strObj);
    }
    function sessionSet(strName, obj){
        debugging&&console.log(strName + " is of type " + typeof obj);
        if (typeof obj === "object")
            obj=JSON.stringify(obj);
        sessionStorage.setItem(strName, obj);
    }
    function sessionGet(strName){
        var strObj = sessionStorage.getItem(strName);
        return parseString(strObj);
    }

    function parseString(strObj){
        //avoids duplication of code for sesssionGet and localGet
        var obj;
        try {
            obj = JSON.parse(strObj);
            debugging&&console.log("Variable is of type " + typeof obj);
        }catch(e){
            if (e.name === "SyntaxError"){
                debugging&&console.log(strObj + " is an ordinary string that cannot be parsed.");
                obj = strObj;
            }else{
                console.error("Could not parse " + strObj + ". Error: ", e);
            }
        }
        return obj;

    }

    function unbracketSolution(solution){
        //takes an arry of strings and returns the portions before left brackets
        var unbracketed = [];
        i = solution.length;
        while(i--){
            var openBracket = solution[i].indexOf("(");
            if (openBracket !== -1){ //string contains a bracket
                unbracketed.push(solution[i].toLowerCase().substr(0, openBracket));
            }
        }
        return unbracketed;
    }

    function inputCorrect() {

        var input = $("#rev-input").val().toLowerCase().trim();
        var solution = document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/);
        var correctCharCount = 0;
        var returnvalue = false;

        debugging&&console.log("Input: " + input);

        var append = unbracketSolution(solution);
        solution = solution.concat(append);
        var i = solution.length;
        while(i--){

            var threshold = 0;//how many characters can be wrong
            if(document.getElementById('rev-type').innerHTML == "Meaning") {
                threshold = Math.floor(solution[i].length / errorAllowance);
            }

            debugging&&console.log("Checking " + solution[i] + " with threshold: " + threshold);

            var j;
            var lengthDiff = Math.abs(input.length - solution[i].length);
            if (lengthDiff > threshold){
                returnvalue = returnvalue || false;
                debugging&&console.log("false at if branch " + input.length + " < " + JSON.stringify(solution[i]));//.length );//- threshold));
            } else { //difference in response length is within threshold
                j = input.length;
                while (j--) {
                    if (input[j] == solution[i][j]) {
                        debugging&&console.log (input[j] +" == "+ solution[i][j]);
                        correctCharCount++;
                    }
                }
                if (correctCharCount >= solution[i].length - threshold){
                    returnvalue = true;
                }
            }

        }

        debugging&&console.log("Returning " + returnvalue);
        return returnvalue;
    }

    /*
 *  Adds the Button
 */
    function addUserVocabButton() {
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
    }



    /*
 *  Prepares the script
 */
    function scriptInit() {
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

        gM_addStyle("   \
.WKSS {\
position:fixed;\
z-index: 2;\
top:125px;\
left:50%;\
margin:0px;\
background: #FFF;\
padding: 5px;\
font: 12px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
color: #888;\
text-shadow: 1px 1px 1px #FFF;\
border:1px solid #DDD;\
border-radius: 5px;\
-webkit-border-radius: 5px;\
-moz-border-radius: 5px;\
box-shadow: 10px 10px 5px #888888;\
}\
.WKSS h1 {\
font: 25px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
padding-left: 5px;\
display: block;\
border-bottom: 1px solid #DADADA;\
margin: 0px;\
color: #888;\
}\
.WKSS h1>span {\
display: block;\
font-size: 11px;\
}\
.WKSS label {\
display: block;\
margin: 0px 0px 5px;\
}\
\
\
.WKSS label>span {\
float: left;\
width: 80px;\
text-align: right;\
padding-right: 10px;\
margin-top: 10px;\
color: #333;\
font-family: \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
font-weight: bold;\
}\
.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea{\
border: 1px solid #CCC;\
color: #888;\
height: 20px;\
margin-bottom: 16px;\
margin-right: 6px;\
margin-top: 2px;\
outline: 0 none;\
padding: 6px 12px;\
width: 80%;\
border-radius: 4px;\
line-height: normal !important;\
-webkit-border-radius: 4px;\
-moz-border-radius: 4px;\
font: normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
}\
.WKSS select {\
border: 1px solid #CCC;\
color: #888;\
outline: 0 none;\
padding: 6px 12px;\
height: 160px !important;\
width: 95%;\
border-radius: 4px;\
-webkit-border-radius: 4px;\
-moz-border-radius: 4px;\
font: normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
#background: #FFF url('down-arrow.png') no-repeat right;\
#background: #FFF url('down-arrow.png') no-repeat right);\
appearance:none;\
-webkit-appearance:none;\
-moz-appearance: none;\
text-indent: 0.01px;\
text-overflow: '';\
}\
.WKSS textarea{\
height:100px;\
}\
.WKSS button, .button {\
position: relative;\
background: #FFF;\
border: 1px solid #CCC;\
padding: 10px 25px 10px 25px;\
color: #333;\
border-radius: 4px;\
display: inline !important;\
}\
.WKSS button:disabled {\
background: #EBEBEB;\
border: 1px solid #CCC;\
padding: 10px 25px 10px 25px;\
color: #333;\
border-radius: 4px;\
}\
.WKSS .button:hover, button:hover:enabled {\
color: #333;\
background-color: #EBEBEB;\
border-color: #ADADAD;\
}                                                          \
.WKSS button:hover:disabled {\
cursor: default\
}                                                          \
.error {border-color:#F00 !important; color: #F00 !important;}\
.caution {border-color:#F90 !important; color: #F90 !important;}\
.correct {border-color:#0F0 !important; color: #0F0 !important;}\
.info {border-color:#696969 !important; color: #696969 !important;}\
.rev-error {text-shadow:none; border: 1px solid #F00 !important;border-radius: 10px; background-color: #F00; padding:4px; margin:4px; color: #FFFFFF; font: normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;}\
.rev-correct {text-shadow:none; border: 1px solid #088A08 !important;border-radius: 10px; background-color: #088A08; padding:4px; margin:4px; color: #FFFFFF; font: normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;}");
        gM_addStyle("\
#add {\
width:" + addWindowWidth + "px;\
height:" + addWindowHeight + "px; \
margin-left:-" + addWindowWidth/2 + "px; \
}");
        gM_addStyle("\
#export, #import {\
background:#fff;\
width:" + exportImportWindowWidth + "px;\
height:" + exportImportWindowHeight + "px;\
margin-left:-" + exportImportWindowWidth/2 + "px; \
}");
        gM_addStyle("\
#edit {\
width:" + editWindowWidth + "px;\
height:" + editWindowHeight + "px; \
margin-left:-" + editWindowWidth/2 + "px; \
}");
        gM_addStyle("\
#selfstudy {\
left:50%;\
width:" + studyWindowWidth + "px;\
height:auto; \
margin-left:-" + studyWindowWidth/2 + "px; \
}");
        gM_addStyle("\
#resultwindow {\
left:50%;\
width:" + resultWindowWidth + "px;\
height:" + resultWindowHeight + "px; \
margin-left:-" + resultWindowWidth/2 + "px; \
}");
        gM_addStyle("\
#AudioButton {\
margin-top: 35px;\
position: relative;\
display: inline !important;\
-webkit-margin-before: 50px;\
}\
button.wkss-close {\
float:right;\
background-color:#ff4040;\
color:#fff;\
padding:0px;\
height:27px;\
width:27px\
}\
\
#wkss-close {\
float:right;\
background-color:#ff4040;\
color:#fff;\
padding:0px;\
height:27px;\
width:27px\
}\
#wkss-kanji, #rev-kanji {\
text-align:center !important;\
font-size:50px !important;\
background-color: #9400D3 !important;\
color: #FFFFFF !important;\
border-radius: 10px     10px      0px           0px;\
}\
#wkss-solution, #rev-solution {\
text-align: center !important;\
font-size:30px !important;\
color: #FFFFFF;\
padding: 2px;\
}\
#wkss-type{\
text-align:center !important;\
font-size:24px !important;\
background-color: #696969;\
color: #FFFFFF !important;\
border-radius: 0px     0px      10px           10px;\
}\
#rev-type {\
text-align:center !important;\
font-size:24px !important;\
color: #FFFFFF !important;\
border-radius: 0px     0px      10px           10px;\
}\
#wkss-input {\
text-align:center !important;\
font-size:40px !important;\
height: 80px !important;\
line-height: normal !important;\
}\
#rev-input {\
text-align:center !important;\
font-size:40px !important;\
height: 60px !important;\
line-height: normal !important;\
}");
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
    }

    /*
 * Helper Functions/Variables
 */

    function isEmpty(value) {
        return (typeof value === "undefined" || value === null);
    }

    function select_all(str) {
        //eval can be harmful
        var text_val = document.getElementById(str);
        debugging&&console.log(text_val);
        text_val.focus();
        text_val.select();
    }

    function checkAdd(add) {
        //take a JSON object (parsed from import window) and check with stored items for any duplicates
        // Returns true if each item in 'add' array is valid and
        //at least one of them already exists in storage
        var i = add.length;
        if(localStorage.getItem('User-Vocab')) {    
            var vocabList = getVocList();
            while(i--){
                if (isItemValid(add[i]) &&
                    checkForDuplicates(vocabList,add[i]))
                    return true;
            }
        }
        return false;
    }


    function isItemValid(add) {
        //validates an object representing vocab
        return (!isEmpty(add.kanji) && //kanji property exists
                !isEmpty(add.meaning) && //meaning property exists
                !isEmpty(add.reading)&& //reading property exists
                Object.prototype.toString.call(add.meaning) === '[object Array]'&&//meaning is an array
                Object.prototype.toString.call(add.reading) === '[object Array]');//reading is an array
    }

    /*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
    function logError(error) {
        debugging&&console.log("logError(error)");
        var stackMessage = "";
        if ("stack" in error)
            stackMessage = "\n\tStack: " + error.stack;

        debugging&&console.log("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
        console.error("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
    }


    //*****Ethan's Functions*****
    function handleReadyStateFour(xhrk, requestedItem){

        var localkanjiList = [];
        debugging&&console.log("readystate: "+ xhrk.readyState);
        var resp = JSON.parse(xhrk.responseText);
        debugging&&console.log("about to loop through requested information"); 
var i;
        if (resp.requested_information)
            i=resp.requested_information.length||0;
        if (requestedItem === "kanji"){
            while(i--){
                //push response onto kanjilist variable
                if (resp.requested_information[i].user_specific !== null){
                    localkanjiList.push({"character": resp.requested_information[i].character,
                                         "srs": resp.requested_information[i].user_specific.srs,
                                         "reading": resp.requested_information[i][resp.requested_information[i].important_reading].split(",")[0],
                                         "meaning": resp.requested_information[i].meaning.split(",")[0]
                                        });
                }else{
                    localkanjiList.push({"character": resp.requested_information[i].character,
                                         "srs": "unreached"});
                }
            }
        }else if(requestedItem === "vocabulary"){
            while(i--){
                //push response onto kanjilist variable
                if (resp.requested_information[i].user_specific !== null||true){
                    //build vocablist
                    localkanjiList.push({"kanji": resp.requested_information[i].character,
                                         "reading": resp.requested_information[i].kana.split(","),
                                         "meaning": resp.requested_information[i].meaning.split(",")});
                }
            }
        }
        //return kanjiList
        //  debugging&&console.log("Server responded with new kanjiList: \n"+JSON.stringify(kanjiList));
        return localkanjiList;

    }


    function getServerResp(APIkey, requestedItem){

        requestedItem = typeof requestedItem !== 'undefined' ? requestedItem : 'kanji';

        //functions:
        //    refreshLocks()
        //    generateReviewList()

        if (APIkey !== "test"){
            var levels = (requestedItem ==="kanji")? "/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50":
            "/1,2,3,4,5,6,7,8,9,10";
            var xhrk = createCORSRequest("get", "https://www.wanikani.com/api/user/" + APIkey + "/" + requestedItem + levels);


            if (!isEmpty(xhrk)){

                xhrk.onreadystatechange = function() {
                    if (xhrk.readyState == 4){

                        var kanjiList = handleReadyStateFour(xhrk,requestedItem);

                        if (requestedItem === 'kanji'){
                            localSet('User-KanjiList', kanjiList);
                            debugging&&console.log("kanjiList from server", kanjiList);
                            //update locks in localStorage 
                            //pass kanjilist into this function
                            //(don't shift things through storage unecessarily)
                            refreshLocks();
                        }else{
                            var v = kanjiList.length;
                            debugging&&console.log(v + " items found, attempting to import");
                            while (v--){
                                setVocItem(kanjiList[v]);
                            }
                        }
                        //------
                    }
                };

                xhrk.send();
                debugging&&console.log("below");  
            }
        } else {
            //dummy server response for testing.
            setTimeout(function () {
                var kanjiList = [];
                debugging&&console.log("creating dummy response");
                kanjiList.push({"character": "猫", "srs": "noServerResp"});
                var SRS = "apprentice"; //prompt("enter SRS for 子", "guru");
                kanjiList.push({"character": "子", "srs": SRS});
                kanjiList.push({"character": "品", "srs": "guru"});
                kanjiList.push({"character": "供", "srs": "guru"});
                kanjiList.push({"character": "本", "srs": "guru"});
                kanjiList.push({"character": "聞", "srs": "apprentice"});
                kanjiList.push({"character": "人", "srs": "enlightened"});
                kanjiList.push({"character": "楽", "srs": "burned"});
                kanjiList.push({"character": "相", "srs": "guru"});
                kanjiList.push({"character": "卒", "srs": "noMatchWK"});
                kanjiList.push({"character": "無", "srs": "noMatchGuppy"});

                debugging&&console.log("Server responded with dummy kanjiList: \n"+JSON.stringify(kanjiList));

                localSet('User-KanjiList', kanjiList);

                //update locks in localStorage
                refreshLocks();


            }, 10000);
        }   
    }

    function getComponents(kanji){
        debugging&&console.log("getComponents(kanji)");
        //functions:
        //    none

        //takes in a string and returns an array containing only the kanji characters in the string.
        var components = [];

        for (var c = 0; c < kanji.length; c++){
            if(/^[\u4e00-\u9faf]+$/.test(kanji[c])) {
                components.push(kanji[c]);
            }
        }
        return components; 
    }

    function refreshLocks(){
        //functions:
        //    setLocks(srsitem)

        //debugging&&console.log("refreshLocks()");
        if (localStorage.getItem('User-Vocab')) {

            var vocList = getSrsList();
            var i = vocList.length;
            var srsList2 = JSON.parse(localStorage.getItem('User-Vocab'));
            console.groupCollapsed("Setting Locks");
            while(i--){
                debugging&&console.log("vocList[i] = setLocks(vocList[i]);");
                vocList[i] = setLocks(vocList[i]);  
                debugging&&console.log("setSrsItem(srsList[i]);");
                //Pull out list (whole thing)

                srsList2 = setSrsItem(vocList[i],srsList2);

            }
            console.groupEnd();
            localSet('User-Vocab', srsList2);
            //      debugging&&console.log("Setting new locks: "+JSON.stringify(srsList));
        }else{
            debugging&&console.log("no srs storage found");
        }
    }

    function getCompKanji(item, kanjiList){
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
            //}

            if (matched === false){ // character got all the way through kanjiList without a match.
                if (kanjiReady){ //was there a server response?
                    if (userGuppy){ //is the user a guppy (kanji probably matches a turtles response)
                        debugging&&console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        compSRS[i] = {"kanji": components[i], "srs": "noMatchGuppy"};
                    }else{ //user is a turtle, kanji must not have been added to WK (yet)
                        debugging&&console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        compSRS[i] = {"kanji": components[i], "srs": "noMatchWK"};
                    }
                }else{
                    debugging&&console.log("matched=false, kanjiReady=false, noServerResp");
                    compSRS[i] = {"kanji": components[i], "srs": "noServerResp"};
                }
            }
        }
        return compSRS; // compSRS is an array of the kanji with SRS values for each kanji component.
        // eg. 折り紙:
        // compSRS = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]
    }

    function createCORSRequest(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined"){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }

    function createCSV(JSONstring){
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
    }


    console.info(document.readyState);
    //document.addEventListener("DOMContentLoaded",
    //                        function() { hijackRequests(); });
    console.log("adding DOM listener", document.readyState);
    // Check for file API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {



    } else {
        alert('The File APIs are not fully supported in this browser.');
    }



    /*
    * Start the script
    */



    //unless the user navigated from the review directory, they are unlikely to have unlocked any kanji
    var noNewStuff = /^https:\/\/.*\.wanikani\.com\/.*/.test(document.referrer)&&!(/https:\/\/.*\.wanikani\.com\/review.*/.test(document.referrer));
    var usingHTTPS = /^https:/.test(window.location.href);
    console.info(usingHTTPS, window.location.href);
    if (usingHTTPS){
        if (!noNewStuff){  //Don't waste time if user is browsing site
            getServerResp(APIkey);
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
