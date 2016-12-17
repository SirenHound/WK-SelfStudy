module.exports = function(){
	// {"level":"17","meaning_explanation":"This word consists of kanji with hiragana attached. Because the hiragana ends with an [ja]う[/ja] sound, you know this word is a verb. The kanji itself means [kanji]flourish[/kanji] or [kanji]prosperity[/kanji], so the verb vocab versions of these would be [vocabulary]to flourish[/vocabulary] or [vocabulary]to prosper[/vocabulary].","reading_explanation":"Since this word consists of a kanji with hiragana attached, you can bet that it will use the kun'yomi reading. You didn't learn that reading with this kanji, so here's a mnemonic to help you: What do you flourish at? You're an amazing [vocabulary]soccer[/vocabulary] ([ja]さか[/ja]) player who flourishes and prospers no matter where you go to play this wonderful (but not as good as baseball) sport.","en":"To Flourish, To Prosper","kana":"さかえる","sentences":[["中国には、覚せい剤の生産で栄えていた村がありました。","There was a village in China flourishing on their production of stimulants. "]],"parts_of_speech_ids":["4","19"],"part_of_speech":"Intransitive Verb, Ichidan Verb","audio":"2e194cbf194371cd478480d6ea67769da623e99a.mp3","meaning_note":null,"reading_note":null,"related":[{"kan":"栄","en":"Prosperity, Flourish","slug":"栄"}]}


	if (typeof $.mockjax === "function"){
		$.mockjax({
			url: /^\/json\/progress\?vWKSS(.+)\[\]=(.+)&vWKSS.+\[\]=(.+)$/,
			urlParams:["WKSSid", "MeaningWrong", "ReadingWrong"],
			response: function(settings) {
				// do any required cleanup
				var id = Number(settings.urlParams.WKSSid);
				var Mw = Number(settings.urlParams.MeaningWrong);
				var Rw = Number(settings.urlParams.ReadingWrong);
				var UserVocab = localGet("User-Vocab")||[];

				console.log("is this your card?", UserVocab[id]);
				if (UserVocab[id].due < Date.now()){//double check that item was due for review
					if (Mw||Rw){
						//drop levels if wrong

						//Adapted from WaniKani's srs to authentically mimic level downs
						var o = (Mw||0)+(Rw||0);
						var t = UserVocab[id].level;
						var r=t>=5?2*Math.round(o/2):1*Math.round(o/2);
						var n=t-r<1?1:t-r;//don't stay on 'started'

						UserVocab[id].level = n;
					}else{
						//increase level if none wrong
						UserVocab[id].level++;
					}
					//Put UserVocab back in storage
					UserVocab[id].date = Date.now();
					UserVocab[id].due = Date.now() + srsintervals[UserVocab[id].level];
					localSet("User-Vocab", UserVocab);
					console.log(UserVocab[id].due +" > "+ Date.now() + " (" + ms2str(UserVocab[id].due - Date.now())+")");

				}else{
					console.log("This item is not due for review yet, discarding results");
				}
				this.responseText = '{"vWKSS'+id.toString()+'":["'+Mw.toString()+'","'+Rw.toString()+'"]}';

			}
		});

		$.mockjax({
			url: /^\/json\/vocabulary\/WKSS(.+)/,
			urlParams:["WKSSid"],
			response: function(settings) {

				// Investigate the `settings` to determine the response...
				var id = settings.urlParams.WKSSid.toString();
				var currentItem = $.jStorage.get("currentItem");
				if (currentItem.id === "WKSS"+id){
					console.log("as expected");
				}
				var related = '[';
				for (i = 0; i < currentItem.components.length; i++){
					related += '{"kan":"'+currentItem.components[i]+'","en":"","slug":"'+currentItem.components[i]+'"}';
					related += (i+1<currentItem.components.length)?',':'';
				}
				related += ']';

				var respText = JSON.stringify({"level":"U",
											   "meaning_explanation":"This is user-defined item. Meaning explanations are not supported at this time. [id: "+id+"]",
											   "reading_explanation":"This is user-defined item. Reading explanations are not supported at this time. [id: "+id+"]",
											   "en":currentItem.en.join(", "),
											   "kana":currentItem.kana.join(", "),
											   "sentences":[],
											   "parts_of_speech_ids":[],
											   "part_of_speech":[],
											   "audio":null,
											   "meaning_note":null,
											   "reading_note":null,
											   "related":JSON.parse(related)});
				this.responseText = respText;
			},
			onAfterComplete: function() {
				// do any required cleanup
				$(".user-synonyms").remove();
				// keeping the hooks for Community Mnemonics
				$("#note-meaning, #note-reading").html("");
			}
		});
	}
};
//--------------End Insert Into WK Review Functions--------------

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

function handleAddClick(){

	var kanji = $("#addKanji").val().toLowerCase();
	var reading = $("#addReading").val().toLowerCase().split(/[,、]+\s*/); //split at , or 、followed by 0 or any number of spaces
	var meaning = $("#addMeaning").val().toLowerCase().split(/[,、]+\s*/);
	var success = false; //initalise values
	var meanlen = 0;

	var i = meaning.length;
	while (i--){
		meanlen += meaning[i].length;
	}

	//input is invalid: prompt user for valid input
	var item = {};
	if (kanji.length === 0 || meanlen === 0) {
		$("#addStatus").text("One or more required fields are empty!");
		if (kanji.length === 0) {
			$("#addKanji").addClass("error");
		} else {
			$("#addKanji").removeClass("error");
		}
		if (meanlen === 0) {
			$("#addMeaning").addClass("error");
		} else {
			$("#addMeaning").removeClass("error");
		}
	} else {
		debugging&&console.log("building item: "+kanji);
		item.kanji = kanji;
		item.reading = reading; //optional
		item.meaning = meaning;

		success = true;
		debugging&&console.log("item is valid");
	}

	//on successful creation of item
	if (success) {
		//clear error layout to required fields
		$("#addKanji").removeClass("error");
		$("#addMeaning").removeClass("error");



		//if there are already user items, retrieve vocabList
		// var vocabList = [];
		var vocabList = getFullList();

		debugging&&console.log("vocabList retrieved, length: "+vocabList.length);
		//check stored user items for duplicates ****************** to do: option for editing duplicate item with new input
		if(checkForDuplicates(vocabList,item)) {
			$("#addStatus").text("Duplicate Item detected!");
			$("#addKanji").addClass("error");
			return;
		}

		setVocItem(item);

		debugging&&console.log("clear form");
		$("#addForm")[0].reset();

		//--------------------------------------------------------------------------------------------------------
		if (item.manualLock === "yes" || item.manualLock === "DB" && lockDB){
			$("#addStatus").html("<i class=\"icon-lock\"></i> Added locked item");
		} else {
			$("#addStatus").html("<i class=\"icon-unlock\"></i>Added successfully");
		}
		//--------------------------------------------------------------------------------------------------------
	}
}


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
	var srsList = getVocList();
	return srsList;
}

function getVocList(){
	var vocList = JSON.parse(localStorage.getItem('User-Vocab'))||[];
	if (vocList){
		var v=vocList.length;
		while(v--){
			vocList[v].i = v; //set index for item (->out)
		}
	}
	debugging&&console.log("getVocList: ");
	return vocList;
}

function setVocItem(item){

	//Assumption: item comes only with kanji, reading and meaning

	item.level = 0;
	item.date = Date.now();
	item.manualLock = "";
	item = setLocks(item);
	item.due = item.date + srsintervals[item.level]; //0.1.9 adding in 'due' property to make review building simpler

	var found = false;
	var vocList = localGet('User-Vocab')||[];

	var v = vocList.length;
	while(v--){
		if (vocList[v].kanji === item.kanji){
			found = true;
			debugging&&console.log("duplicate found, skipping item (give options in future)");

			//add meaning and reading to existing item
			//        vocList[v].meaning = item.meaning;
			//      vocList[v].reading = item.reading;
		}
	}
	if (!found) {
		//provide index for faster searches
		debugging&&console.log(item.kanji +" not found in vocablist, adding now");
		item.i = vocList.length;
		vocList.push(item);

		localSet('User-Vocab',vocList);
	}
}

function getFullList(){
	var fullList = JSON.parse(localStorage.getItem('User-Vocab'))||[];
	if(!fullList){
		fullList=[];
	}
	return fullList;
}



//checks if an item is present in a list
function checkForDuplicates(list, item) {
	debugging&&console.log("Check for dupes with:" + item.kanji);

	var i = list.length;
	while(i--){
		list[i].i = i; //set index property for quick lookup
		if(list[i].kanji == item.kanji)

			return true;
	}
	return false;
}

//manages .locked property of srsitem
/*This function manages the .locked and manualLock properties of srsitem
.locked is a real time evaluation of the item (is any of the kanji in the word locked?)
.manualLock will return 'no' if .locked has ever returned 'no'.
This is to stop items being locked again after they have been unlocked if any
of the kanji used falls below the unlock threshold
(eg. if the 勉 in 勉強 falls back to apprentice, we do not want to lock up 勉強 again.)
*/
function setLocks(item){
	//functions:
	//    isKanjiLocked(srsitem)

	//-----------------------]

	//once manualLock is "no" it stays "no"
	if (item.manualLock !== "no" && item.manualLock !== "n"){

		var kanjiList = localGet('User-KanjiList')||[];

		item.components = getComponents(item.kanji);

		var kanjiLockedResult = isKanjiLocked(item, kanjiList);
		item.locked = kanjiLockedResult[0];

		item.manualLock = item.locked;
	}else{
		item.manualLock = 'no';
	}

	debugging&&console.log("setting locks for "+ item.kanji +": locked: "+item.locked+", manualLock: "+ item.manualLock);

	return item;
}

function isKanjiLocked(srsitem, kanjiList){
	//functions:
	//    getCompKanji(srsitem.kanji, kanjiList)

	//item unlocked by default
	//may have no kanji, only unlocked kanji will get through the code unflagged

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
	var vocabList = getVocList();
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

			}else{
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

function updateEditGUI(){

	generateEditOptions();
	document.getElementById("editItem").value = "";
	document.getElementById("editItem").name = "";

}

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

//retrieve values from storage to populate 'editItems' menu
function generateEditOptions() {
	var select = document.getElementById('editWindow');

	//clear the menu (blank slate)
	while (select.firstChild) {
		select.removeChild(select.firstChild);
	}

	//check for items to add
	if (localStorage.getItem('User-Vocab')) {

		//retrieve from local storage
		var vocabList = getVocList();
		var srslist =  getSrsList();
		var options = [];
		//build option string
		var i = vocabList.length;
		while (i--){
			//form element to save string
			var opt = document.createElement('option');

			//dynamic components of string

			//when is this item up for review
			var due = srslist[i].due||srslist[i].date + srsintervals[srslist[i].level];
			var review = "";

			//no future reviews if burned
			if(srslist[i].level >= 9) {
				review = "Never";
			}

			//calculate next relative review time
			//current timestamp is past due date.
			else if(Date.now() >= due) {
				review = "Now" ;
			}

			else {//turn number (milliseconds) into relatable string (hours, days, etc)
				review = ms2str(due - Date.now());
			}//end if review is not 'never' or 'now'

			var text = vocabList[i].kanji + " & " +
				vocabList[i].reading + " & " +
				vocabList[i].meaning + " (" +
				srslevels[srslist[i].level] + " - Review: " +
				review + ") Locked: " +
				srslist[i].manualLock;

			opt.value = i;
			opt.innerHTML = text;
			options.push(opt);//for future use (sorting data etc)
			select.appendChild(opt);//export item to option menu
		}
	}
}

function ms2str(milliseconds){
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
}

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
		var vocabList = getVocList();
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

function fileUpload (ev){
	var csvHeader = true;        //first row contains stuff like "Kanji/Vocab, Reading, Meaning" etc
	var tsvfile;          //tabs separate fields, commas seperate values? or false for vice versa
	var CSVs = ev.target.files;
	var name =CSVs[0].name;
	var colsplit, vsplit;
	if (name.substr(name.lastIndexOf("."),4)===".csv"){
		tsvfile = false;
		colsplit = ",";
		vsplit = "\t";
	}else{
		tsvfile = true;
		colsplit = "\t";
		vsplit = ",";
	}

	debugging&&console.log("tsvfile: ");
	debugging&&console.log("file uploaded: "+CSVs[0].name);
	var reader = new FileReader();
	reader.readAsText(CSVs[0]);
	reader.onload = function(ev){
		var csvString = ev.target.result;
		var csvRow = csvString.split("\n");
		//default column rows
		var k = 0;
		var r = 1;
		var m = 2;

		var i = csvRow.length;
		//process header, changing k,r,m if necessary
		var JSONimport = [];
		while(i--){
			var row = csvRow[i];
			if ((csvHeader === true && i === 0)||  //  Skip header
				(row === "") // Skip empty rows
			   ){
				debugging&&console.log("Skipping row #"+i);

			}else{
				debugging&&console.log(row);


				var elem = row.split(colsplit);
				var item = {};
				var c;

				if (elem[k]){
					item.kanji = elem[k].trim();

					if (elem[r]){

						if (elem[r].indexOf(vsplit)>-1){
							// eg 'reading 1[tab]reading 2[tab]reading 3'

							item.reading = elem[r].split(vsplit);
						}else{ //no tabs in string, single value
							item.reading=[elem[r]];
						}

					}else{
						item.reading=[""];
					}

					if (elem[m]){

						if (elem[m].indexOf(vsplit)>-1){
							// eg 'meaning 1[tab]meaning 2[tab]meaning 3'

							item.meaning = elem[m].split("\t");
						}else{ //no tabs in string, single value
							item.meaning=[elem[m]];
						}

						c = item.meaning.length;

						while(c--){
							debugging&&console.log("item.meaning["+c+"]: "+item.meaning[c]);
						}
					}else{//todo: provide overwrite option on forced meaning
						item.meaning=[""];
					}

					JSONimport.push(item);
				}else{ // corrupt row ('kanji' is mandatory (can be kana-only word), is not present on row, skip
				}
			}
		}
		var JSONstring = JSON.stringify(JSONimport);
		debugging&&console.log(JSONimport);

		if (JSONstring.length !== 0) {
			try {
				var add = JSON.parse(JSONstring.toLowerCase());
				/*//---------/-------------
			 if (!checkAdd(add)) {
			 $("#importStatus").text("No valid input (duplicates?)!");
			 return;
			 }
			 //----------------------*/

				var a = add.length;
				while(a--){
					setVocItem(add[a]);
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

	};
}

document.getElementById("upload") && document.getElementById("upload").addEventListener('change', fileUpload, false);


$("#ImportCsvBtn").click(function () {
});

$("#ImportWKBtn").click(function(){
	getServerResp(APIkey,"vocabulary");
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
				var vocabList = getVocList();
				srslist = getSrsList();
				newlist = vocabList.concat(add);
			}
			else {
				newlist = add;


			}
			var i = add.length;
			while(i--){
				setVocItem(add[i]);
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

//---------
// save to list based on .index property
function saveToSortedList(eList,eItem){
	var get = findIndex(eList,eItem);
	if (Math.sign(1/get) === -1){
		eList.splice(-get,0,eItem);
		return eList;
	}
}

function findIndex(values, target) {
	return binarySearch(values, target, 0, values.length - 1);
}

function binarySearch(values, target, start, end) {
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
	if (Number(value.index) > Number(target.index)) { return binarySearch(values, target, start, middle-1); }
	if (Number(value.index) < Number(target.index)) { return binarySearch(values, target, middle+1, end); }
	return middle; //found!
}
//-------

$("#AudioButton").click(function () {
	openInNewTab(document.getElementById('rev-audio').innerHTML);
});

function openInNewTab(url)
{
	var win=window.open(url, '_blank');
	win.focus();
}

function playAudio() {

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

}

var Rev_Item = function(prompt, kanji, type, solution, index){
	this.prompt = prompt;
	this.kanji = kanji;
	this.type = type;
	this.solution = solution;
	this.index = index;
};

function generateReviewList() {
	//don't interfere with an active session
	if (reviewActive){
		document.getElementById('user-review').innerHTML = "Review in Progress";
		return;
	}

	debugging&&console.log("generateReviewList()");
	// function generateReviewList() builds a review session and updates the html menu to show number waiting.
	var numReviews = 0;
	var soonest;
	var next;

	var reviewList = [];

	//check to see if there is vocab already in offline storage
	if (localStorage.getItem('User-Vocab')) {
		var vocabList = getFullList();
		debugging&&console.log(vocabList);
		var now = Date.now();

		//for each vocab in storage, get the amount of time vocab has lived
		var i = vocabList.length;
		while(i--){
			var due = vocabList[i].date + srsintervals[vocabList[i].level];


			// if tem is unlocked and unburned
			if (vocabList[i].level < 9 &&
				(vocabList[i].manualLock === "no" || vocabList[i].manualLock === "n" ||
				 vocabList[i].manualLock ==="DB" && !lockDB )){
				// if it is past review time
				if(now >= due) {
					// count vocab up for review
					numReviews++;

					// add item-meaning object to reviewList
					// have made this optional for surname lists etc.
					if (vocabList[i].meaning[0] !== "") {
						//Rev_Item object args: prompt, kanji, type, solution, index
						var revItem = new Rev_Item(vocabList[i].kanji, vocabList[i].kanji, "Meaning", vocabList[i].meaning, i);
						reviewList.push(revItem);
					}

					// reading is optional, if there is a reading for the vocab, add its object.
					if (vocabList[i].reading[0] !== "") {
						//Rev_Item object args: prompt, kanji, type, solution, index
						var revItem2 = new Rev_Item(vocabList[i].kanji, vocabList[i].kanji, "Reading", vocabList[i].reading, i);
						reviewList.push(revItem2);
					}

					//if there is a meaning and reading, and reverse flag is true, test reading from english
					if (vocabList[i].reading[0] !== "" && vocabList[i].meaning[0] !== "" && reverse){
						//Rev_Item object args: prompt, kanji, type, solution, index
						var revItem3 = new Rev_Item(vocabList[i].meaning.join(", "), vocabList[i].kanji, "Reverse", vocabList[i].reading, i);
						reviewList.push(revItem3);
					}

				}else{//unlocked/unburned but not time to review yet
					debugging&&console.log("setting soonest");
					next = due - now;
					if(soonest){
						soonest = Math.min(soonest, next);
					}else{
						soonest = next;
					}

				}
			}//end if item is up for review
		}// end iterate through vocablist
	}// end if localStorage

	if (reviewList.length !== 0){

		//store reviewList in current session
		sessionSet('User-Review', JSON.stringify(reviewList));
		debugging&&console.log(reviewList);

	}else{
		debugging&&console.log("reviewList is empty: "+JSON.stringify(reviewList));
		if (typeof soonest !== "undefined"){
			document.getElementById('user-review').innerHTML = "Next Review in "+ms2str(soonest);
		}else{
			document.getElementById('user-review').innerHTML = "No Reviews Available";
		}
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
		var reviewString = (soonest !== undefined)? "<br/>\
More to come in "+ms2str(soonest):"";
		document.getElementById('user-review').innerHTML = "Review (" + strReviews + ")" + reviewString;
	}
}

//global to keep track of when a review is in session.
var reviewActive = false;

function startReview() {
	debugging&&console.log("startReview()");
	submit = true;
	reviewActive = true;
	//get the review 'list' from session storage, line up the first item in queue
	var reviewList = sessionGet('User-Review')||[];
	nextReview(reviewList);
}

function nextReview(reviewList) {
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
}

function markAnswer(item) {
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

	} else {
		console.error("Error: indexes don't match");
	}

	return item;

}

function showResults() {

	var statsList = sessionGet('User-Stats')||[];
	sessionStorage.clear();

	console.log("statslist", statsList);
	var i =  statsList.length;
	var voclist = getVocList();
	while(i--){

		//slist[statsList[i].index].level;
		debugging&&console.log("b");
		debugging&&console.log("statslist[i]",statsList[i]);
		var altText = voclist[statsList[i].index].level;//+statsList[i].type;
		debugging&&console.log("a");

		if (!statsList[i].numWrong) {
			if (statsList[i].numCorrect){
				if (statsList[i].numCorrect.Meaning)
					altText = altText + " Meaning Correct x"+statsList[i].numCorrect.Meaning +"\n";
				if (statsList[i].numCorrect.Reading)
					altText = altText + " Reading Correct x"+statsList[i].numCorrect.Reading +"\n";
				if (statsList[i].numCorrect.Reverse)
					altText = altText + " Reverse Correct x"+statsList[i].numCorrect.Reverse +"\n";
			}

			document.getElementById("stats-a").innerHTML +=
				"<span class=\"rev-correct\"  title='"+altText+" +'>" + statsList[i].kanji + "</span>";
		} else {
			if (statsList[i].numWrong.Meaning)
				altText = altText + " Meaning Wrong x"+statsList[i].numWrong.Meaning +"\n";
			if (statsList[i].numWrong.Reading)
				altText = altText + " Reading Wrong x"+statsList[i].numWrong.Reading +"\n";
			if (statsList[i].numWrong.Reverse)
				altText = altText + " Reverse Wrong x"+statsList[i].numWrong.Reverse +"\n";
			if (statsList[i].numCorrect){
				if (statsList[i].numCorrect.Meaning)
					altText = altText + " Meaning Correct x"+statsList[i].numCorrect.Meaning +"\n";
				if (statsList[i].numCorrect.Reading)
					altText = altText + " Reading Correct x"+statsList[i].numCorrect.Reading +"\n";
				if (statsList[i].numCorrect.Reverse)
					altText = altText + " Reverse Correct x"+statsList[i].numCorrect.Reverse +"\n";
			}


			//TODO sort into apprentice, guru, etc
			document.getElementById("stats-a").innerHTML +=
				"<span class=\"rev-error\"  title='"+altText+"'>" + statsList[i].kanji + "</span>";
		}
		console.log(statsList[i]);
		statsList[i] = updateSRS(statsList[i], voclist);

	}
	sessionSet("User-Stats",statsList);
	localSet("User-Vocab", voclist);

}

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
