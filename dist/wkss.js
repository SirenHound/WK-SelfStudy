(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var buildNode = require('./buildnode.js');

// Create DOM for 'add' window
var addElement = buildNode('div', {id: "add", className: "WKSS"});

var formElement = buildNode('form', {id: "addForm"});
addElement.appendChild(formElement);

var buttonElement = buildNode('button', {id: "AddCloseBtn", className: "wkss-close", type: "reset"});
formElement.appendChild(buttonElement);

var iconElement = buildNode('i', {className: "icon-remove"});
buttonElement.appendChild(iconElement);

var headerElement = buildNode('h1');
formElement.appendChild(headerElement);

var headerText = document.createTextNode("Add a new Item");
headerElement.appendChild(headerText);

var inputKanjiElement = buildNode('input', {id: "addKanji", type: "text", placeholder: "Enter 漢字, ひらがな or カタカナ"});
formElement.appendChild(inputKanjiElement);

var inputReadingElement = buildNode('input', {id: "addReading", type: "text", title: "Leave empty to add vocabulary like する (to do)", placeholder: "Enter reading"});
formElement.appendChild(inputReadingElement);

var inputMeaningElement = buildNode('input', {id: "addMeaning", type: "text", placeholder: "Enter meaning"});
formElement.appendChild(inputMeaningElement);

var pElement = buildNode('p', {id: "addStatus"});
formElement.appendChild(pElement);

var pText = document.createTextNode("Ready to add..");
pElement.appendChild(pText);

var execButtonElement = buildNode('button', {id: "AddItemBtn", type: "button"});
formElement.appendChild(execButtonElement);

var execText = document.createTextNode("Add new Item");
execButtonElement.appendChild(execText);

module.exports = addElement;
},{"./buildnode.js":2}],2:[function(require,module,exports){
/** Builds a node element with an id and className and other attributes if provided
* @param {string} type - The type of element to create ('div', 'p', etc...)
* @param {object} [options]
* @param {string} options.id - The id of the node
* @param {string} options.className - One or more classes for the element seperated by spaces
* @returns {HTMLElement} The node built as specified
*/
var buildNode = function(type, options){
	var node = document.createElement(type);
	for (var option in options) if (options.hasOwnProperty(option)) {
		if (option === "className" || option === "id"){
			node[option] = options[option];
		}
		else {
			node.setAttribute(option, options[option]);
		}
	}
	return node;
};

module.exports = buildNode;
},{}],3:[function(require,module,exports){
var buildNode = require('./buildnode.js');

// tag, id, className, other, childNodes

/* IWindow:

{
	id: "WKSS-edit",
	className: "WKSS",
	childNodes:[{
		tag: 'form',
		id: "WKSS-editForm",
		childNodes:[{
			tag: 'button',
			id: "WKSS-editCloseBtn",
			className: "WKSS-close"
			childNodes:[{
				tag: 'i',
				className: "icon-remove"
			}]
		},{
			tag: 'h1',
			childNodes:[
				"Edit your Vocab"                 <--- string types for text node
			]
		},{
			tag: 'select',
			id: "editWindow",
			other: {size: "8"}					<--- 'other' avoids clashes with HTMLElement attributes just in case
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
			id: "editStatus"
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
}

*/

var struct = {
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

// 'this' context is node to attach to
var attachChildNode = function(childNode){
	var el;
	if ("string" === typeof childNode){ //TextNode
		 el = document.createTextNode(childNode);
	}
	else{
		el = buildNode(childNode.tag, {id: childNode.id, className: childNode.className});
		for (var attr in childNode.other){
			el.setAttribute(attr, childNode.other[attr]);
		}
		if (childNode.childNodes){
			childNode.childNodes.forEach(attachChildNode, el);
		}
	}
	this.appendChild(el);
};

/** Takes a JSON object with the structure of the window to create and builds a DIVElement from that
* @param {IWindow} windowStructure
* @returns {DIVElement} The specified window.
*/
var buildWindow = function(windowStructure) {
	
	var resultWindow = buildNode('div', {id: windowStructure.id, className: windowStructure.className});
	for (var attr in windowStructure.other){
		resultWindow.setAttribute(attr, windowStructure.other[attr]);
	}
	if (windowStructure.childNodes){
		windowStructure.childNodes.forEach(attachChildNode, resultWindow);
	}
	return resultWindow;
};

/*	
{	
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
		editForm.appendChild(editItemText);//..
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
};*/
module.exports = buildWindow;
},{"./buildnode.js":2}],4:[function(require,module,exports){
module.exports = function(){

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
		if (debugging) {console.log("building item: "+kanji);}
		item.kanji = kanji;
		item.reading = reading; //optional
		item.meaning = meaning;

		success = true;
		if (debugging) {console.log("item is valid");}
	}

	//on successful creation of item
	if (success) {
		//clear error layout to required fields
		$("#addKanji").removeClass("error");
		$("#addMeaning").removeClass("error");



		//if there are already user items, retrieve vocabList
		// var vocabList = [];
		var vocabList = getFullList();

		if (debugging) {console.log("vocabList retrieved, length: "+vocabList.length);}
		//check stored user items for duplicates ****************** to do: option for editing duplicate item with new input
		if(checkForDuplicates(vocabList,item)) {
			$("#addStatus").text("Duplicate Item detected!");
			$("#addKanji").addClass("error");
			return;
		}

		setVocItem(item);

		if (debugging) {console.log("clear form");}
		$("#addForm")[0].reset();

		//--------------------------------------------------------------------------------------------------------
		if (item.manualLock === "yes" || item.manualLock === "DB" && lockDB){
			$("#addStatus").html("<i class=\"icon-lock\"></i> Added locked item");
		} else {
			$("#addStatus").html("<i class=\"icon-unlock\"></i>Added successfully");
		}
		//--------------------------------------------------------------------------------------------------------
	}
};
},{}],5:[function(require,module,exports){
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

				var respText = JSON.stringify({
					level: "U",
					meaning_explanation: "This is user-defined item. Meaning explanations are not supported at this time. [id: "+id+"]",
					reading_explanation: "This is user-defined item. Reading explanations are not supported at this time. [id: "+id+"]",
					en: currentItem.en.join(", "),
					kana: currentItem.kana.join(", "),
					sentences:[],
					parts_of_speech_ids:[],
					part_of_speech:[],
					audio:null,
					meaning_note:null,
					reading_note:null,
					related:JSON.parse(related)
				});
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


},{}],6:[function(require,module,exports){

var ImportUtil = {
	fileUpload: function(ev){
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

		if (debugging) { console.log("tsvfile: "); }
		if (debugging) { console.log("file uploaded: "+CSVs[0].name); }
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
					if (debugging) { console.log("Skipping row #"+i); }

				}else{
					console.log(row);


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
								console.log("item.meaning["+c+"]: "+item.meaning[c]);
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
			console.log(JSONimport);

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
						StorageUtil.setVocItem(add[a]);
					}

					$("#importStatus").text("Import successful!");

					$("#importForm")[0].reset();
					$("#importArea").text("");

				}
				catch (e) {
					$("#importStatus").text("Parsing Error!");
					console.log(e);
				}

			}
			else {
				$("#importStatus").text("Nothing to import :( Please paste your stuff first");
			}

		};
	}
};

module.exports = ImportUtil;
},{}],7:[function(require,module,exports){
var ReviewUtil = {
	/** Takes an array of strings and returns the portions before left brackets '(' but only for strings that have them. It is used to add synonym values to the answer list.
	* @param {Array.<string>} solution - An array of acceptable answers for the Task
	* @returns {Array.<string>} Parts of the solution left of left bracket in strings where it exists
	* @example unbracketSolution(["newspaper", "reading Stick (this text won't get through)"]) // ["reading stick"]
	*/
	unbracketSolution: function(solution){
        var unbracketed = solution.filter(function(ans){
            var openBracket = ans.indexOf("(");
            if (openBracket !== -1){ //string contains a bracket
                return ans.toLowerCase().substr(0, openBracket).trim();
            } 
        }, this);
        return unbracketed;
    },

	inputCorrect: function() {
        var input = $("#rev-input").val().toLowerCase().trim();
        var solution = document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/);
        var correctCharCount = 0;
        var returnvalue = false;

        console.log("Input: " + input);

        var append = this.unbracketSolution(solution);
        solution = solution.concat(append);
        var i = solution.length;
        while(i--){

            var threshold = 0;//how many characters can be wrong
            if(document.getElementById('rev-type').innerHTML == "Meaning") {
                threshold = Math.floor(solution[i].length / errorAllowance);
            }

            console.log("Checking " + solution[i] + " with threshold: " + threshold);

            var j;
            var lengthDiff = Math.abs(input.length - solution[i].length);
            if (lengthDiff > threshold){
                returnvalue = returnvalue || false;
                console.log("false at if branch " + input.length + " < " + JSON.stringify(solution[i]));//.length );//- threshold));
            } else { //difference in response length is within threshold
                j = input.length;
                while (j--) {
                    if (input[j] == solution[i][j]) {
                        console.log (input[j] +" == "+ solution[i][j]);
                        correctCharCount++;
                    }
                }
                if (correctCharCount >= solution[i].length - threshold){
                    returnvalue = true;
                }
            }

        }

        console.log("Returning " + returnvalue);
        return returnvalue;
    },

	submitResponse: function (e) {
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
			}
			else{
				//handle grading and storing solution

				//check for input, do nothing if none
				if(input.length === 0){
					return;
				}

				//disable input after submission
				//document.getElementById('rev-input').disabled = true;


				//was the input correct?
				var correct = this.inputCorrect();

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
					console.log("correct answer");
					if (reviewList !== null){
						var oldlen = reviewList.length;

						reviewList.splice(rnd, 1);
						console.log("sessionList.length: "+ oldlen +" -> "+reviewList.length);

						//replace shorter (by one) sessionList to session
						if (reviewList.length !== 0) {
							console.log("sessionList.length: "+ reviewList.length);
							sessionSet('User-Review', JSON.stringify(reviewList));

						} else {
							//reveiw over, delete sessionlist from session
							sessionStorage.removeItem('User-Review');
						}
					}else{
						console.error("Error: no review session found");
					}
				}
				else{
					//   if(forgiven){
					//     console.log(input +" has been forgiven. "+item.type);
					//   return;
					// }
					console.log("wrong answer");
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
			console.log("keystat = " + submit);

			//there are still more reviews in session?
			if (sessionStorage.getItem('User-Review')) {
				// console.log("found a 'User-Review': " + sessionStorage.getItem('User-Review'));

				setTimeout(function () {
					console.log("refreshing reviewList from storage");
					var reviewList = JSON.parse(sessionStorage.getItem('User-Review'));

					//cue up first remaining review
					nextReview(reviewList);
					console.log("checking for empty reviewList");
					if (reviewList.length === 0){

						console.log("session over. reviewList: "+JSON.stringify(reviewList));
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
					console.log("showResults");
					showResults();
					$("#resultwindow").show();
					console.log("showResults completed");

					//*/  //clear session
					sessionStorage.clear();
					reviewActive = false;


				}, 1);
			}
			submit = true;

		}
	}
};

module.exports = ReviewUtil;
},{}],8:[function(require,module,exports){

var StorageUtil = {
	/** Initialise User-Vocab
	*/
	initStorage: function(){
		if (!this.localGet("User-Vocab")){
			this.localSet("User-Vocab", []);
		}
	},
	parseString: function(strObj){
        //avoids duplication of code for sesssionGet and localGet
        var obj;
        try {
            obj = JSON.parse(strObj);
            console.log("Variable is of type " + typeof obj);
        }
		catch(e){
            if (e.name === "SyntaxError"){
                console.log(strObj + " is an ordinary string that cannot be parsed.");
                obj = strObj;
            }
			else{
                console.error("Could not parse " + strObj + ". Error: ", e);
            }
        }
        return obj;
    },
	/**
	*/
	localGet: function(strName){
        var strObj = localStorage.getItem(strName);
        return this.parseString(strObj);
    },
	/** Sets strings and objects into browser storage
	* @requires localStorage
	* @requires JSON
	*/
	localSet: function(strName, obj){
        localStorage.setItem(strName, typeof obj === "string"? obj : JSON.stringify(obj));
    },
	/**
	*/
	sessionGet: function(strName){
        var strObj = sessionStorage.getItem(strName);
        return this.parseString(strObj);
    },
	/** Sets strings and objects into browser session storage
	* @requires localStorage
	* @requires JSON
	*/
	sessionSet: function(strName, obj){
        sessionStorage.setItem(strName, typeof obj === "string"? obj : JSON.stringify(obj));
    },
	/**
	*/
	getVocList: function(){
        var vocList = JSON.parse(localStorage.getItem('User-Vocab'))||[];
        if (vocList){
            var v=vocList.length;
            while(v--){
                vocList[v].i = v; //set index for item (->out)
            }
        }
        return vocList;
    },
	setVocList: function(vocList){
		this.localSet('User-Vocab', vocList);
	},
	/**
	*/
	setVocItem: function(item){
        //Assumption: item comes only with kanji, reading and meaning
        item.level = 0;
        item.date = Date.now();
        item.manualLock = "";
        item = setLocks(item);
		 //0.1.9 adding in 'due' property to make review building simpler
        item.due = item.date + srsObject[item.level].duration;

        var vocList = localGet('User-Vocab')||[];

		var found = vocList.find(function(task){
            return task.kanji === item.kanji;
        }, this);
		//add meaning and reading to existing item
		//        vocList[v].meaning = item.meaning;
		//      vocList[v].reading = item.reading;
        if (!found) {
            //provide index for faster searches
            console.log(item.kanji +" not found in vocablist, adding now");
            item.i = vocList.length;
            vocList.push(item);

            localSet('User-Vocab',vocList);
        }
    }
};

module.exports = StorageUtil;
},{}],9:[function(require,module,exports){
/*  This is the original code that I am breaking into bite size bits */
//NEED TO MAKE SURE BROWSERIFY PUTS THIS ON THE TOP

 
 /** Describes any object that can be reviewed or learned, includes IRadical, IKanji, and IVocabulary
 * @typedef {Object} Task
 * @property {boolean|string} locked - locked
 * @property {boolean|string} manualLock - manualLock
 */
 
var StorageUtil = require('./storageutil.js');
var ImportUtil = require('./importutil.js');
var WanikaniUtil = require('./wanikaniutil.js');
var ReviewUtil = require('./reviewutil.js');

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
	
    var userVocabs = StorageUtil.getVocList();
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

},{"./addelement.js":1,"./buildnode.js":2,"./buildwindow.js":3,"./handleAddClick.js":4,"./importutil.js":6,"./reviewutil.js":7,"./storageutil.js":8,"./wanikaniutil.js":10,"./wkstyle.js":12}],10:[function(require,module,exports){
/** Utilities for interaction with the Wanikani API and general website.
*/
var WanikaniUtil = {
	hijackRequests: require('./hijackrequests.js'),
	createCORSRequest: function(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open(method, url, true);
        }
		else if (typeof XDomainRequest !== "undefined"){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        }
		else {
            xhr = null;
        }
        return xhr;
    },
	/** Gets the user information using the Wanikani API and stores them directly into browser storage.
	* @param
	* @param
	*/
	getServerResp: function(APIkey, requestedItem){

        requestedItem = requestedItem === void 0 ? 'kanji' :requestedItem;

        if (APIkey !== "test"){
            var levels = (requestedItem ==="kanji")? "/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50":
            "/1,2,3,4,5,6,7,8,9,10";
            var xhrk = this.createCORSRequest("get", "https://www.wanikani.com/api/user/" + APIkey + "/" + requestedItem + levels);
            if (!isEmpty(xhrk)){
                xhrk.onreadystatechange = function() {
                    if (xhrk.readyState == 4){
                        var kanjiList = this.handleReadyStateFour(xhrk,requestedItem);

                        if (requestedItem === 'kanji'){
                            localSet('User-KanjiList', kanjiList);
                            console.log("kanjiList from server", kanjiList);
                            //update locks in localStorage 
                            //pass kanjilist into this function
                            //(don't shift things through storage unecessarily)
                            refreshLocks();
                        }
						else{
                            var v = kanjiList.length;
                            console.log(v + " items found, attempting to import");
                            while (v--){
                                StorageUtil.setVocItem(kanjiList[v]);
                            }
                        }
                    }
                };

                xhrk.send();
                console.log("below");  
            }
        }
		else {
            //dummy server response for testing.
            setTimeout(function () {
                var kanjiList = [];
                console.log("creating dummy response");
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

                console.log("Server responded with dummy kanjiList: \n"+JSON.stringify(kanjiList));

                localSet('User-KanjiList', kanjiList);

                //update locks in localStorage
                refreshLocks();
            }, 10000);
        }   
    },
	
	handleReadyStateFour: function(xhrk, requestedItem){

        var localkanjiList = [];
        console.log("readystate: "+ xhrk.readyState);
        var resp = JSON.parse(xhrk.responseText);
        console.log("about to loop through requested information"); 
		if (resp.requested_information && resp.requested_information.length){
			
			localkanjiList = resp.requested_information.map(function(requestedTask){
				if (requestedItem === "kanji"){
					if (requestedTask.user_specific !== null){
						return {
							character: requestedTask.character,
							srs: requestedTask.user_specific.srs,
							reading: requestedTask[requestedTask.important_reading].split(",")[0],
							meaning: requestedTask.meaning.split(",")[0]
						};
					}
					else{
						return {
							character: requestedTask.character,
							srs: "unreached"
						};
					}
				}
				else if(requestedItem === "vocabulary"){
					if (requestedTask.user_specific !== null||true){ //--
						//build vocablist
						return {
							kanji: requestedTask.character,
							reading: requestedTask.kana.split(","),
							meaning: requestedTask.meaning.split(",")
						};
					}
				}
			}, this);
		}
        //return kanjiList
        //  console.log("Server responded with new kanjiList: \n"+JSON.stringify(kanjiList));
        return localkanjiList;
    }

};
},{"./hijackrequests.js":5}],11:[function(require,module,exports){
// Window Configs
module.exports = {
	add:{height: "300px", width: "300px"},
	exportImport:{height: "275px", width: "390px"},
	edit:{height: "380px", width: "800px"},
	study:{height: "auto", width: "600px"}, //height : auto
	result:{height: "500px", width: "700px"}
};
},{}],12:[function(require,module,exports){
/* jshint multistr: true */
// Config for window sizes in pixels
var windowConfig = require('./windowconfig.js');

//.WKSS
var classWKSS = [
	{position: "fixed"},
	{zIndex: "2"},
	{top: "125px"},
	{left: "50%"},
	{margin: "0px"},
	{background: "#FFF"},
	{padding: "5px"},
	{font: "12px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{color: "#888"},
	{textShadow: "1px 1px 1px #FFF"},
	{border: "1px solid #DDD"},
	{borderRadius: "5px"},
	{WebkitBorderRadius: "5px"},
	{MozBorderRadius: "5px"},
	{boxShadow: "10px 10px 5px #888888"}
];

//.WKSS h1
var classWKSS_h1 = [
	{font: "25px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{paddingLeft: "5px"},
	{display: "block"},
	{borderBottom: "1px solid #DADADA"},
	{margin: "0px"},
	{color: "#888"}
];

//.WKSS h1 > span
var classWKSS_h1_direct_Span = [
	{display: "block"},
	{fontSize: "11px"}
];

//.WKSS label
var w = [
	{display: "block"},
	{margin: "0px 0px 5px"},
];

//.WKSS label>span
w = [
	{float: "left"},
	{width: "80px"},
	{textAlign: "right"},
	{paddingRight: "10px"},
	{marginTop: "10px"},
	{color: "#333"},
	{fontFamily: "\"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{fontWeight: "bold"}
];

//.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea 
w = [
	{border: "1px solid #CCC"},
	{color: "#888"},
	{height: "20px"},
	{marginBottom: "16px"},
	{marginRight: "6px"},
	{marginTop: "2px"},
	{outline: "0 none"},
	{padding: "6px 12px"},
	{width: "80%"},
	{borderRadius: "4px"},
	{lineHeight: "normal !important"},
	{WebkitBorderRadius: "4px"},
	{MozBorderRadius: "4px"},
	{font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"}
];

//.WKSS select
w = [
	{border: "1px solid \"#CCC\""},
	{color: "#888"},
	{outline: "0 none"},
	{padding: "6px 12px"},
	{height: "160px !important"},
	{width: "95%"},
	{borderRadius: "4px"},
	{WebkitBorderRadius: "4px"},
	{MozBorderRadius: "4px"},
	{font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{background: "#FFF url('down-arrow.png') no-repeat right"},
	{appearance: "none"},
	{WebkitAppearance: "none"},
	{MozAppearance: "none"},
	{textIndent: "0.01px"},
	{textOverflow: "''"}
];

//.WKSS textarea
w = [
	{height: "100px"}
];

//.WKSS button, .button
w = [
	{position: "relative"},
	{background: "#FFF"},
	{border: "1px solid #CCC"},
	{padding: "10px 25px 10px 25px"},
	{color: "#333"},
	{borderRadius: "4px"},
	{display: "inline !important"}
];

//.WKSS button:disabled
w = [
	{background: "#EBEBEB"},
	{border: "1px solid #CCC"},
	{padding: "10px 25px 10px 25px"},
	{color: "#333"},
	{borderRadius: "4px"}
];

//.WKSS .button:hover, button:hover:enabled
w = [
	{color: "#333"},
	{backgroundColor: "#EBEBEB"},
	{borderColor: "#ADADAD"}
];

//.WKSS button:hover:disabled
w = [
	{cursor: "default"}                             
];

//.error
w = [
	{borderColor:"#F00 !important"},
	{color: "#F00 !important"}
];

//.caution
w = [
	{borderColor: "#F90 !important"},
	{color: "#F90 !important"}
];

//.correct
w = [
	{borderColor: "#0F0 !important"},
	{color: "#0F0 !important"}
];

//.info
w = [
	{borderColor: "#696969 !important"},
	{color: "#696969 !important"}
];

//.rev-error
w = [
	{textShadow: "none"},
	{border: "1px solid #F00 !important"},
	{borderRadius: "10px"},
	{backgroundColor: "#F00"},
	{padding: "4px"},
	{margin: "4px"},
	{color: "#FFFFFF"},
	{font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"}
];

//.rev-correct
w = [
	{textShadow:"none"},
	{border: "1px"},
	{solid: "#088A08 !important"},
	{borderRadius: "10px"},
	{backgroundColor: "#088A08"},
	{padding: "4px"},
	{margin:"4px"},
	{color: "#FFFFFF"},
	{font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"}
];

//#add
w = [
	{width: windowConfig.add.width},
	{height: windowConfig.add.height},
	{marginLeft: -windowConfig.add.width/2}
];

//#export, #import
w = [
{background: "#fff"},
	{width: windowConfig.exportImport.width},
	{height: windowConfig.exportImport.height},
	{marginLeft: -windowConfig.exportImport.width/2}
];

//#edit
w = [
	{width: windowConfig.edit.width},
	{height: windowConfig.edit.height},
	{marginLeft: -windowConfig.edit.width/2}
];

//#selfstudy
w = [
	{left: "50%"},
	{width: windowConfig.study.width},
	{height: windowConfig.study.height},
	{marginLeft: -windowConfig.study.width/2}
];

//#resultwindow
w = [
	{left:"50%"},
	{width: windowConfig.result.width + "px"},
	{height: windowConfig.result.height + "px"},
	{marginLeft: -windowConfig.result.width/2 + "px"}
];

//#AudioButton
w = [
	{marginTop: "35px"},
	{position: "relative"},
	{display: "inline !important"},
	{WebkitMarginBefore: "50px"}
];

//button.wkss-close
w = [
	{float: "right"},
	{backgroundColor: "#ff4040"},
	{color: "#fff"},
	{padding: "0px"},
	{height: "27px"},
	{width: "27px"}
];

//#wkss-close
w = [
	{float: "right"},
	{backgroundColor: "#ff4040"},
	{color: "#fff"},
	{padding: "0px"},
	{height: "27px"},
	{width: "27px"}
];

//#wkss-kanji, #rev-kanji
w = [
	{textAlign: "center !important"},
	{fontSize: "50px !important"},
	{backgroundColor: "#9400D3 !important"},
	{color: "#FFFFFF !important"},
	{borderRadius: "10px 10px 0px 0px"}
];

//#wkss-solution, #rev-solution
w = [
	{textAlign: "center !important"},
	{fontSize: "30px !important"},
	{color: "#FFFFFF"},
	{padding: "2px"}
];

//#wkss-type
w = [
	{textAlign: "center !important"},
	{fontSize: "24px !important"},
	{backgroundColor: "#696969"},
	{color: "#FFFFFF !important"},
	{borderRadius: "0px 0px 10px 10px"}
];

//#rev-type
w = [
	{textAlign: "center !important"},
	{fontSize: "24px !important"},
	{color: "#FFFFFF !important"},
	{borderRadius: "0px 0px 10px 10px"}
];
//#wkss-input
w = [
	{textAlign: "center !important"},
	{fontSize: "40px !important"},
	{height: "80px !important"},
	{lineHeight: "normal !important"}
];

//#rev-input
w = [
	{textAlign: "center !important"},
	{fontSize: "40px !important"},
	{height: "60px !important"},
	{lineHeight: "normal !important"}
];

//----
module.exports = classWKSS;
//module.exports = wkstyleCSS;
},{"./windowconfig.js":11}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRkZWxlbWVudC5qcyIsInNyYy9idWlsZG5vZGUuanMiLCJzcmMvYnVpbGR3aW5kb3cuanMiLCJzcmMvaGFuZGxlQWRkQ2xpY2suanMiLCJzcmMvaGlqYWNrcmVxdWVzdHMuanMiLCJzcmMvaW1wb3J0dXRpbC5qcyIsInNyYy9yZXZpZXd1dGlsLmpzIiwic3JjL3N0b3JhZ2V1dGlsLmpzIiwic3JjL3RydW5rLmpzIiwic3JjL3dhbmlrYW5pdXRpbC5qcyIsInNyYy93aW5kb3djb25maWcuanMiLCJzcmMvd2tzdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0OEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYnVpbGROb2RlID0gcmVxdWlyZSgnLi9idWlsZG5vZGUuanMnKTtcclxuXHJcbi8vIENyZWF0ZSBET00gZm9yICdhZGQnIHdpbmRvd1xyXG52YXIgYWRkRWxlbWVudCA9IGJ1aWxkTm9kZSgnZGl2Jywge2lkOiBcImFkZFwiLCBjbGFzc05hbWU6IFwiV0tTU1wifSk7XHJcblxyXG52YXIgZm9ybUVsZW1lbnQgPSBidWlsZE5vZGUoJ2Zvcm0nLCB7aWQ6IFwiYWRkRm9ybVwifSk7XHJcbmFkZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZm9ybUVsZW1lbnQpO1xyXG5cclxudmFyIGJ1dHRvbkVsZW1lbnQgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJBZGRDbG9zZUJ0blwiLCBjbGFzc05hbWU6IFwid2tzcy1jbG9zZVwiLCB0eXBlOiBcInJlc2V0XCJ9KTtcclxuZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uRWxlbWVudCk7XHJcblxyXG52YXIgaWNvbkVsZW1lbnQgPSBidWlsZE5vZGUoJ2knLCB7Y2xhc3NOYW1lOiBcImljb24tcmVtb3ZlXCJ9KTtcclxuYnV0dG9uRWxlbWVudC5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcblxyXG52YXIgaGVhZGVyRWxlbWVudCA9IGJ1aWxkTm9kZSgnaDEnKTtcclxuZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XHJcblxyXG52YXIgaGVhZGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQWRkIGEgbmV3IEl0ZW1cIik7XHJcbmhlYWRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyVGV4dCk7XHJcblxyXG52YXIgaW5wdXRLYW5qaUVsZW1lbnQgPSBidWlsZE5vZGUoJ2lucHV0Jywge2lkOiBcImFkZEthbmppXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJFbnRlciDmvKLlrZcsIOOBsuOCieOBjOOBqiBvciDjgqvjgr/jgqvjg4pcIn0pO1xyXG5mb3JtRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEthbmppRWxlbWVudCk7XHJcblxyXG52YXIgaW5wdXRSZWFkaW5nRWxlbWVudCA9IGJ1aWxkTm9kZSgnaW5wdXQnLCB7aWQ6IFwiYWRkUmVhZGluZ1wiLCB0eXBlOiBcInRleHRcIiwgdGl0bGU6IFwiTGVhdmUgZW1wdHkgdG8gYWRkIHZvY2FidWxhcnkgbGlrZSDjgZnjgosgKHRvIGRvKVwiLCBwbGFjZWhvbGRlcjogXCJFbnRlciByZWFkaW5nXCJ9KTtcclxuZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRSZWFkaW5nRWxlbWVudCk7XHJcblxyXG52YXIgaW5wdXRNZWFuaW5nRWxlbWVudCA9IGJ1aWxkTm9kZSgnaW5wdXQnLCB7aWQ6IFwiYWRkTWVhbmluZ1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgbWVhbmluZ1wifSk7XHJcbmZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0TWVhbmluZ0VsZW1lbnQpO1xyXG5cclxudmFyIHBFbGVtZW50ID0gYnVpbGROb2RlKCdwJywge2lkOiBcImFkZFN0YXR1c1wifSk7XHJcbmZvcm1FbGVtZW50LmFwcGVuZENoaWxkKHBFbGVtZW50KTtcclxuXHJcbnZhciBwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUmVhZHkgdG8gYWRkLi5cIik7XHJcbnBFbGVtZW50LmFwcGVuZENoaWxkKHBUZXh0KTtcclxuXHJcbnZhciBleGVjQnV0dG9uRWxlbWVudCA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIkFkZEl0ZW1CdG5cIiwgdHlwZTogXCJidXR0b25cIn0pO1xyXG5mb3JtRWxlbWVudC5hcHBlbmRDaGlsZChleGVjQnV0dG9uRWxlbWVudCk7XHJcblxyXG52YXIgZXhlY1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCBuZXcgSXRlbVwiKTtcclxuZXhlY0J1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoZXhlY1RleHQpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhZGRFbGVtZW50OyIsIi8qKiBCdWlsZHMgYSBub2RlIGVsZW1lbnQgd2l0aCBhbiBpZCBhbmQgY2xhc3NOYW1lIGFuZCBvdGhlciBhdHRyaWJ1dGVzIGlmIHByb3ZpZGVkXHJcbiogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBlbGVtZW50IHRvIGNyZWF0ZSAoJ2RpdicsICdwJywgZXRjLi4uKVxyXG4qIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pZCAtIFRoZSBpZCBvZiB0aGUgbm9kZVxyXG4qIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNsYXNzTmFtZSAtIE9uZSBvciBtb3JlIGNsYXNzZXMgZm9yIHRoZSBlbGVtZW50IHNlcGVyYXRlZCBieSBzcGFjZXNcclxuKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBub2RlIGJ1aWx0IGFzIHNwZWNpZmllZFxyXG4qL1xyXG52YXIgYnVpbGROb2RlID0gZnVuY3Rpb24odHlwZSwgb3B0aW9ucyl7XHJcblx0dmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xyXG5cdGZvciAodmFyIG9wdGlvbiBpbiBvcHRpb25zKSBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XHJcblx0XHRpZiAob3B0aW9uID09PSBcImNsYXNzTmFtZVwiIHx8IG9wdGlvbiA9PT0gXCJpZFwiKXtcclxuXHRcdFx0bm9kZVtvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG5vZGU7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkTm9kZTsiLCJ2YXIgYnVpbGROb2RlID0gcmVxdWlyZSgnLi9idWlsZG5vZGUuanMnKTtcclxuXHJcbi8vIHRhZywgaWQsIGNsYXNzTmFtZSwgb3RoZXIsIGNoaWxkTm9kZXNcclxuXHJcbi8qIElXaW5kb3c6XHJcblxyXG57XHJcblx0aWQ6IFwiV0tTUy1lZGl0XCIsXHJcblx0Y2xhc3NOYW1lOiBcIldLU1NcIixcclxuXHRjaGlsZE5vZGVzOlt7XHJcblx0XHR0YWc6ICdmb3JtJyxcclxuXHRcdGlkOiBcIldLU1MtZWRpdEZvcm1cIixcclxuXHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiV0tTUy1lZGl0Q2xvc2VCdG5cIixcclxuXHRcdFx0Y2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIlxyXG5cdFx0XHRjaGlsZE5vZGVzOlt7XHJcblx0XHRcdFx0dGFnOiAnaScsXHJcblx0XHRcdFx0Y2xhc3NOYW1lOiBcImljb24tcmVtb3ZlXCJcclxuXHRcdFx0fV1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdoMScsXHJcblx0XHRcdGNoaWxkTm9kZXM6W1xyXG5cdFx0XHRcdFwiRWRpdCB5b3VyIFZvY2FiXCIgICAgICAgICAgICAgICAgIDwtLS0gc3RyaW5nIHR5cGVzIGZvciB0ZXh0IG5vZGVcclxuXHRcdFx0XVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ3NlbGVjdCcsXHJcblx0XHRcdGlkOiBcImVkaXRXaW5kb3dcIixcclxuXHRcdFx0b3RoZXI6IHtzaXplOiBcIjhcIn1cdFx0XHRcdFx0PC0tLSAnb3RoZXInIGF2b2lkcyBjbGFzaGVzIHdpdGggSFRNTEVsZW1lbnQgYXR0cmlidXRlcyBqdXN0IGluIGNhc2VcclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdpbnB1dCcsIFxyXG5cdFx0XHRvdGhlcjp7XHJcblx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0bmFtZTogXCJcIixcclxuXHRcdFx0XHRzaXplOiBcIjQwXCIsXHJcblx0XHRcdFx0cGxhY2Vob2xkZXI6IFwiU2VsZWN0IHZvY2FiLCBjbGljayBlZGl0LCBjaGFuZ2UgYW5kIHNhdmUhXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0aWQ6IFwiZWRpdEl0ZW1cIlxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ3AnLCBcclxuXHRcdFx0aWQ6IFwiZWRpdFN0YXR1c1wiXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiUmVhZHkgdG8gZWRpdC4uLlwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXRFZGl0QnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRWRpdFwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXRTYXZlQnRuXCIsXHJcblx0XHRcdG90aGVyOnt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJTYXZlXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdERlbGV0ZUJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIkRlbGV0ZSBzZWxlY3RlZCBpdGVtXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkRlbGV0ZVwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXREZWxldGVBbGxCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCLmnKzlvZPjgavjgoTjgovjga7vvJ9cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRGVsZXRlIEFsbFwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIlJlc2V0TGV2ZWxzQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiUmVzZXQgbGV2ZWxzXCJdXHJcblx0XHR9XVxyXG5cdH1dXHJcbn1cclxuXHJcbiovXHJcblxyXG52YXIgc3RydWN0ID0ge1xyXG5cdGlkOiBcIldLU1MtZWRpdFwiLFxyXG5cdGNsYXNzTmFtZTogXCJXS1NTXCIsXHJcblx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0dGFnOiAnZm9ybScsXHJcblx0XHRpZDogXCJXS1NTLWVkaXRGb3JtXCIsXHJcblx0XHRjaGlsZE5vZGVzOlt7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIldLU1MtZWRpdENsb3NlQnRuXCIsXHJcblx0XHRcdGNsYXNzTmFtZTogXCJXS1NTLWNsb3NlXCIsXHJcblx0XHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0XHR0YWc6ICdpJyxcclxuXHRcdFx0XHRjbGFzc05hbWU6IFwiaWNvbi1yZW1vdmVcIlxyXG5cdFx0XHR9XVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2gxJyxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJFZGl0IHlvdXIgVm9jYWJcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdzZWxlY3QnLFxyXG5cdFx0XHRpZDogXCJlZGl0V2luZG93XCIsXHJcblx0XHRcdG90aGVyOiB7c2l6ZTogXCI4XCJ9XHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnaW5wdXQnLCBcclxuXHRcdFx0b3RoZXI6e1xyXG5cdFx0XHRcdHR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdG5hbWU6IFwiXCIsXHJcblx0XHRcdFx0c2l6ZTogXCI0MFwiLFxyXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIlNlbGVjdCB2b2NhYiwgY2xpY2sgZWRpdCwgY2hhbmdlIGFuZCBzYXZlIVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGlkOiBcImVkaXRJdGVtXCJcclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdwJywgXHJcblx0XHRcdGlkOiBcImVkaXRTdGF0dXNcIixcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJSZWFkeSB0byBlZGl0Li4uXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdEVkaXRCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJFZGl0XCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdFNhdmVCdG5cIixcclxuXHRcdFx0b3RoZXI6e3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlNhdmVcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RGVsZXRlQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIiwgdGl0bGU6IFwiRGVsZXRlIHNlbGVjdGVkIGl0ZW1cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRGVsZXRlXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdERlbGV0ZUFsbEJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIuacrOW9k+OBq+OChOOCi+OBru+8n1wifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJEZWxldGUgQWxsXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiUmVzZXRMZXZlbHNCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJSZXNldCBsZXZlbHNcIl1cclxuXHRcdH1dXHJcblx0fV1cclxufTtcclxuXHJcbi8vICd0aGlzJyBjb250ZXh0IGlzIG5vZGUgdG8gYXR0YWNoIHRvXHJcbnZhciBhdHRhY2hDaGlsZE5vZGUgPSBmdW5jdGlvbihjaGlsZE5vZGUpe1xyXG5cdHZhciBlbDtcclxuXHRpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGNoaWxkTm9kZSl7IC8vVGV4dE5vZGVcclxuXHRcdCBlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkTm9kZSk7XHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRlbCA9IGJ1aWxkTm9kZShjaGlsZE5vZGUudGFnLCB7aWQ6IGNoaWxkTm9kZS5pZCwgY2xhc3NOYW1lOiBjaGlsZE5vZGUuY2xhc3NOYW1lfSk7XHJcblx0XHRmb3IgKHZhciBhdHRyIGluIGNoaWxkTm9kZS5vdGhlcil7XHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZShhdHRyLCBjaGlsZE5vZGUub3RoZXJbYXR0cl0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNoaWxkTm9kZS5jaGlsZE5vZGVzKXtcclxuXHRcdFx0Y2hpbGROb2RlLmNoaWxkTm9kZXMuZm9yRWFjaChhdHRhY2hDaGlsZE5vZGUsIGVsKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5hcHBlbmRDaGlsZChlbCk7XHJcbn07XHJcblxyXG4vKiogVGFrZXMgYSBKU09OIG9iamVjdCB3aXRoIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIHdpbmRvdyB0byBjcmVhdGUgYW5kIGJ1aWxkcyBhIERJVkVsZW1lbnQgZnJvbSB0aGF0XHJcbiogQHBhcmFtIHtJV2luZG93fSB3aW5kb3dTdHJ1Y3R1cmVcclxuKiBAcmV0dXJucyB7RElWRWxlbWVudH0gVGhlIHNwZWNpZmllZCB3aW5kb3cuXHJcbiovXHJcbnZhciBidWlsZFdpbmRvdyA9IGZ1bmN0aW9uKHdpbmRvd1N0cnVjdHVyZSkge1xyXG5cdFxyXG5cdHZhciByZXN1bHRXaW5kb3cgPSBidWlsZE5vZGUoJ2RpdicsIHtpZDogd2luZG93U3RydWN0dXJlLmlkLCBjbGFzc05hbWU6IHdpbmRvd1N0cnVjdHVyZS5jbGFzc05hbWV9KTtcclxuXHRmb3IgKHZhciBhdHRyIGluIHdpbmRvd1N0cnVjdHVyZS5vdGhlcil7XHJcblx0XHRyZXN1bHRXaW5kb3cuc2V0QXR0cmlidXRlKGF0dHIsIHdpbmRvd1N0cnVjdHVyZS5vdGhlclthdHRyXSk7XHJcblx0fVxyXG5cdGlmICh3aW5kb3dTdHJ1Y3R1cmUuY2hpbGROb2Rlcyl7XHJcblx0XHR3aW5kb3dTdHJ1Y3R1cmUuY2hpbGROb2Rlcy5mb3JFYWNoKGF0dGFjaENoaWxkTm9kZSwgcmVzdWx0V2luZG93KTtcclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdFdpbmRvdztcclxufTtcclxuXHJcbi8qXHRcclxue1x0XHJcblx0XHR2YXIgZWRpdEZvcm0gPSBidWlsZE5vZGUoJ2Zvcm0nLCB7aWQ6IFwiV0tTUy1lZGl0Rm9ybVwifSk7XHJcblx0ZWRpdFdpbmRvdy5hcHBlbmRDaGlsZChlZGl0Rm9ybSk7XHJcblx0XHRcdHZhciBlZGl0Q2xvc2VCdXR0b24gPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJXS1NTLWVkaXRDbG9zZUJ0blwiLCBjbGFzc05hbWU6IFwiV0tTUy1jbG9zZVwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0Q2xvc2VCdXR0b24pO1xyXG5cdFxyXG5cdFx0XHRlZGl0Q2xvc2VCdXR0b24uYXBwZW5kQ2hpbGQoYnVpbGROb2RlKCdpJywge2NsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwifSkpO1xyXG5cdFx0XHR2YXIgaDFFbGVtZW50ID0gYnVpbGROb2RlKCdoMScpO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoaDFFbGVtZW50KTtcclxuXHRcdFx0aDFFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWRpdCB5b3VyIFZvY2FiXCIpKTtcclxuXHRcdFx0dmFyIHNlbGVjdEVsZW1lbnQgPSBidWlsZE5vZGUoJ3NlbGVjdCcsIHtpZDogXCJlZGl0V2luZG93XCIsIHNpemU6IFwiOFwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChzZWxlY3RFbGVtZW50KTtcclxuXHRcdFx0dmFyIGVkaXRJdGVtVGV4dCA9IGJ1aWxkTm9kZSgnaW5wdXQnLCB7dHlwZTogXCJ0ZXh0XCIgaWQ6IFwiZWRpdEl0ZW1cIiBuYW1lOiBcIlwiIHNpemU6IFwiNDBcIiBwbGFjZWhvbGRlcjogXCJTZWxlY3Qgdm9jYWIsIGNsaWNrIGVkaXQsIGNoYW5nZSBhbmQgc2F2ZSFcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdEl0ZW1UZXh0KTsvLy4uXHJcblx0XHRcdHZhciBlZGl0U3RhdHVzID0gYnVpbGROb2RlKCdwJywge2lkOiBcImVkaXRTdGF0dXNcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdFN0YXR1cyk7XHJcblx0XHRcdGVkaXRTdGF0dXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJSZWFkeSB0byBlZGl0Li5cIikpO1xyXG5cdFxyXG5cdFx0XHR2YXIgZWRpdEJ1dHRvbiA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIkVkaXRFZGl0QnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG5cdFx0XHRlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWRpdFwiKSk7XHJcblx0XHRcdHZhciBlZGl0U2F2ZSA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIkVkaXRTYXZlQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRTYXZlKTtcclxuXHRcdFx0ZWRpdFNhdmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTYXZlXCIpKTtcclxuXHRcdFx0dmFyIGVkaXREZWxldGUgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0RGVsZXRlQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIkRlbGV0ZSBzZWxlY3RlZCBpdGVtXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXREZWxldGUpO1xyXG5cdFx0XHRlZGl0RGVsZXRlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRGVsZXRlXCIpKTtcclxuXHRcdFx0dmFyIGVkaXREZWxldGVBbGwgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0RGVsZXRlQWxsQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIuacrOW9k+OBq+OChOOCi+OBru+8n1wifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlQWxsKTtcclxuXHRcdFx0ZWRpdERlbGV0ZUFsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRlbGV0ZSBBbGxcIikpO1xyXG5cdFx0XHR2YXIgZWRpdFJlc2V0TGV2ZWxzID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiUmVzZXRMZXZlbHNCdG5cIiwgdHlwZTogXCJidXR0b25cIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdFJlc2V0TGV2ZWxzKTtcclxuXHRcdFx0ZWRpdFJlc2V0TGV2ZWxzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUmVzZXQgbGV2ZWxzXCIpKTtcclxuXHRcdFxyXG5cdHJldHVybiBlZGl0V2luZG93O1xyXG59OyovXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRXaW5kb3c7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG5cclxuXHR2YXIga2FuamkgPSAkKFwiI2FkZEthbmppXCIpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XHJcblx0dmFyIHJlYWRpbmcgPSAkKFwiI2FkZFJlYWRpbmdcIikudmFsKCkudG9Mb3dlckNhc2UoKS5zcGxpdCgvWyzjgIFdK1xccyovKTsgLy9zcGxpdCBhdCAsIG9yIOOAgWZvbGxvd2VkIGJ5IDAgb3IgYW55IG51bWJlciBvZiBzcGFjZXNcclxuXHR2YXIgbWVhbmluZyA9ICQoXCIjYWRkTWVhbmluZ1wiKS52YWwoKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9bLOOAgV0rXFxzKi8pO1xyXG5cdHZhciBzdWNjZXNzID0gZmFsc2U7IC8vaW5pdGFsaXNlIHZhbHVlc1xyXG5cdHZhciBtZWFubGVuID0gMDtcclxuXHJcblx0dmFyIGkgPSBtZWFuaW5nLmxlbmd0aDtcclxuXHR3aGlsZSAoaS0tKXtcclxuXHRcdG1lYW5sZW4gKz0gbWVhbmluZ1tpXS5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHQvL2lucHV0IGlzIGludmFsaWQ6IHByb21wdCB1c2VyIGZvciB2YWxpZCBpbnB1dFxyXG5cdHZhciBpdGVtID0ge307XHJcblx0aWYgKGthbmppLmxlbmd0aCA9PT0gMCB8fCBtZWFubGVuID09PSAwKSB7XHJcblx0XHQkKFwiI2FkZFN0YXR1c1wiKS50ZXh0KFwiT25lIG9yIG1vcmUgcmVxdWlyZWQgZmllbGRzIGFyZSBlbXB0eSFcIik7XHJcblx0XHRpZiAoa2FuamkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdCQoXCIjYWRkS2FuamlcIikuYWRkQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoXCIjYWRkS2FuamlcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdH1cclxuXHRcdGlmIChtZWFubGVuID09PSAwKSB7XHJcblx0XHRcdCQoXCIjYWRkTWVhbmluZ1wiKS5hZGRDbGFzcyhcImVycm9yXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChcIiNhZGRNZWFuaW5nXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHtjb25zb2xlLmxvZyhcImJ1aWxkaW5nIGl0ZW06IFwiK2thbmppKTt9XHJcblx0XHRpdGVtLmthbmppID0ga2Fuamk7XHJcblx0XHRpdGVtLnJlYWRpbmcgPSByZWFkaW5nOyAvL29wdGlvbmFsXHJcblx0XHRpdGVtLm1lYW5pbmcgPSBtZWFuaW5nO1xyXG5cclxuXHRcdHN1Y2Nlc3MgPSB0cnVlO1xyXG5cdFx0aWYgKGRlYnVnZ2luZykge2NvbnNvbGUubG9nKFwiaXRlbSBpcyB2YWxpZFwiKTt9XHJcblx0fVxyXG5cclxuXHQvL29uIHN1Y2Nlc3NmdWwgY3JlYXRpb24gb2YgaXRlbVxyXG5cdGlmIChzdWNjZXNzKSB7XHJcblx0XHQvL2NsZWFyIGVycm9yIGxheW91dCB0byByZXF1aXJlZCBmaWVsZHNcclxuXHRcdCQoXCIjYWRkS2FuamlcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdCQoXCIjYWRkTWVhbmluZ1wiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG5cclxuXHJcblxyXG5cdFx0Ly9pZiB0aGVyZSBhcmUgYWxyZWFkeSB1c2VyIGl0ZW1zLCByZXRyaWV2ZSB2b2NhYkxpc3RcclxuXHRcdC8vIHZhciB2b2NhYkxpc3QgPSBbXTtcclxuXHRcdHZhciB2b2NhYkxpc3QgPSBnZXRGdWxsTGlzdCgpO1xyXG5cclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHtjb25zb2xlLmxvZyhcInZvY2FiTGlzdCByZXRyaWV2ZWQsIGxlbmd0aDogXCIrdm9jYWJMaXN0Lmxlbmd0aCk7fVxyXG5cdFx0Ly9jaGVjayBzdG9yZWQgdXNlciBpdGVtcyBmb3IgZHVwbGljYXRlcyAqKioqKioqKioqKioqKioqKiogdG8gZG86IG9wdGlvbiBmb3IgZWRpdGluZyBkdXBsaWNhdGUgaXRlbSB3aXRoIG5ldyBpbnB1dFxyXG5cdFx0aWYoY2hlY2tGb3JEdXBsaWNhdGVzKHZvY2FiTGlzdCxpdGVtKSkge1xyXG5cdFx0XHQkKFwiI2FkZFN0YXR1c1wiKS50ZXh0KFwiRHVwbGljYXRlIEl0ZW0gZGV0ZWN0ZWQhXCIpO1xyXG5cdFx0XHQkKFwiI2FkZEthbmppXCIpLmFkZENsYXNzKFwiZXJyb3JcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRWb2NJdGVtKGl0ZW0pO1xyXG5cclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHtjb25zb2xlLmxvZyhcImNsZWFyIGZvcm1cIik7fVxyXG5cdFx0JChcIiNhZGRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcblxyXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0aWYgKGl0ZW0ubWFudWFsTG9jayA9PT0gXCJ5ZXNcIiB8fCBpdGVtLm1hbnVhbExvY2sgPT09IFwiREJcIiAmJiBsb2NrREIpe1xyXG5cdFx0XHQkKFwiI2FkZFN0YXR1c1wiKS5odG1sKFwiPGkgY2xhc3M9XFxcImljb24tbG9ja1xcXCI+PC9pPiBBZGRlZCBsb2NrZWQgaXRlbVwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoXCIjYWRkU3RhdHVzXCIpLmh0bWwoXCI8aSBjbGFzcz1cXFwiaWNvbi11bmxvY2tcXFwiPjwvaT5BZGRlZCBzdWNjZXNzZnVsbHlcIik7XHJcblx0XHR9XHJcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0fVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuXHQvLyB7XCJsZXZlbFwiOlwiMTdcIixcIm1lYW5pbmdfZXhwbGFuYXRpb25cIjpcIlRoaXMgd29yZCBjb25zaXN0cyBvZiBrYW5qaSB3aXRoIGhpcmFnYW5hIGF0dGFjaGVkLiBCZWNhdXNlIHRoZSBoaXJhZ2FuYSBlbmRzIHdpdGggYW4gW2phXeOBhlsvamFdIHNvdW5kLCB5b3Uga25vdyB0aGlzIHdvcmQgaXMgYSB2ZXJiLiBUaGUga2FuamkgaXRzZWxmIG1lYW5zIFtrYW5qaV1mbG91cmlzaFsva2FuamldIG9yIFtrYW5qaV1wcm9zcGVyaXR5Wy9rYW5qaV0sIHNvIHRoZSB2ZXJiIHZvY2FiIHZlcnNpb25zIG9mIHRoZXNlIHdvdWxkIGJlIFt2b2NhYnVsYXJ5XXRvIGZsb3VyaXNoWy92b2NhYnVsYXJ5XSBvciBbdm9jYWJ1bGFyeV10byBwcm9zcGVyWy92b2NhYnVsYXJ5XS5cIixcInJlYWRpbmdfZXhwbGFuYXRpb25cIjpcIlNpbmNlIHRoaXMgd29yZCBjb25zaXN0cyBvZiBhIGthbmppIHdpdGggaGlyYWdhbmEgYXR0YWNoZWQsIHlvdSBjYW4gYmV0IHRoYXQgaXQgd2lsbCB1c2UgdGhlIGt1bid5b21pIHJlYWRpbmcuIFlvdSBkaWRuJ3QgbGVhcm4gdGhhdCByZWFkaW5nIHdpdGggdGhpcyBrYW5qaSwgc28gaGVyZSdzIGEgbW5lbW9uaWMgdG8gaGVscCB5b3U6IFdoYXQgZG8geW91IGZsb3VyaXNoIGF0PyBZb3UncmUgYW4gYW1hemluZyBbdm9jYWJ1bGFyeV1zb2NjZXJbL3ZvY2FidWxhcnldIChbamFd44GV44GLWy9qYV0pIHBsYXllciB3aG8gZmxvdXJpc2hlcyBhbmQgcHJvc3BlcnMgbm8gbWF0dGVyIHdoZXJlIHlvdSBnbyB0byBwbGF5IHRoaXMgd29uZGVyZnVsIChidXQgbm90IGFzIGdvb2QgYXMgYmFzZWJhbGwpIHNwb3J0LlwiLFwiZW5cIjpcIlRvIEZsb3VyaXNoLCBUbyBQcm9zcGVyXCIsXCJrYW5hXCI6XCLjgZXjgYvjgYjjgotcIixcInNlbnRlbmNlc1wiOltbXCLkuK3lm73jgavjga/jgIHopprjgZvjgYTliaTjga7nlJ/nlKPjgafmoITjgYjjgabjgYTjgZ/mnZHjgYzjgYLjgorjgb7jgZfjgZ/jgIJcIixcIlRoZXJlIHdhcyBhIHZpbGxhZ2UgaW4gQ2hpbmEgZmxvdXJpc2hpbmcgb24gdGhlaXIgcHJvZHVjdGlvbiBvZiBzdGltdWxhbnRzLiBcIl1dLFwicGFydHNfb2Zfc3BlZWNoX2lkc1wiOltcIjRcIixcIjE5XCJdLFwicGFydF9vZl9zcGVlY2hcIjpcIkludHJhbnNpdGl2ZSBWZXJiLCBJY2hpZGFuIFZlcmJcIixcImF1ZGlvXCI6XCIyZTE5NGNiZjE5NDM3MWNkNDc4NDgwZDZlYTY3NzY5ZGE2MjNlOTlhLm1wM1wiLFwibWVhbmluZ19ub3RlXCI6bnVsbCxcInJlYWRpbmdfbm90ZVwiOm51bGwsXCJyZWxhdGVkXCI6W3tcImthblwiOlwi5qCEXCIsXCJlblwiOlwiUHJvc3Blcml0eSwgRmxvdXJpc2hcIixcInNsdWdcIjpcIuaghFwifV19XHJcblxyXG5cclxuXHRpZiAodHlwZW9mICQubW9ja2pheCA9PT0gXCJmdW5jdGlvblwiKXtcclxuXHRcdCQubW9ja2pheCh7XHJcblx0XHRcdHVybDogL15cXC9qc29uXFwvcHJvZ3Jlc3NcXD92V0tTUyguKylcXFtcXF09KC4rKSZ2V0tTUy4rXFxbXFxdPSguKykkLyxcclxuXHRcdFx0dXJsUGFyYW1zOltcIldLU1NpZFwiLCBcIk1lYW5pbmdXcm9uZ1wiLCBcIlJlYWRpbmdXcm9uZ1wiXSxcclxuXHRcdFx0cmVzcG9uc2U6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XHJcblx0XHRcdFx0Ly8gZG8gYW55IHJlcXVpcmVkIGNsZWFudXBcclxuXHRcdFx0XHR2YXIgaWQgPSBOdW1iZXIoc2V0dGluZ3MudXJsUGFyYW1zLldLU1NpZCk7XHJcblx0XHRcdFx0dmFyIE13ID0gTnVtYmVyKHNldHRpbmdzLnVybFBhcmFtcy5NZWFuaW5nV3JvbmcpO1xyXG5cdFx0XHRcdHZhciBSdyA9IE51bWJlcihzZXR0aW5ncy51cmxQYXJhbXMuUmVhZGluZ1dyb25nKTtcclxuXHRcdFx0XHR2YXIgVXNlclZvY2FiID0gbG9jYWxHZXQoXCJVc2VyLVZvY2FiXCIpfHxbXTtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJpcyB0aGlzIHlvdXIgY2FyZD9cIiwgVXNlclZvY2FiW2lkXSk7XHJcblx0XHRcdFx0aWYgKFVzZXJWb2NhYltpZF0uZHVlIDwgRGF0ZS5ub3coKSl7Ly9kb3VibGUgY2hlY2sgdGhhdCBpdGVtIHdhcyBkdWUgZm9yIHJldmlld1xyXG5cdFx0XHRcdFx0aWYgKE13fHxSdyl7XHJcblx0XHRcdFx0XHRcdC8vZHJvcCBsZXZlbHMgaWYgd3JvbmdcclxuXHJcblx0XHRcdFx0XHRcdC8vQWRhcHRlZCBmcm9tIFdhbmlLYW5pJ3Mgc3JzIHRvIGF1dGhlbnRpY2FsbHkgbWltaWMgbGV2ZWwgZG93bnNcclxuXHRcdFx0XHRcdFx0dmFyIG8gPSAoTXd8fDApKyhSd3x8MCk7XHJcblx0XHRcdFx0XHRcdHZhciB0ID0gVXNlclZvY2FiW2lkXS5sZXZlbDtcclxuXHRcdFx0XHRcdFx0dmFyIHI9dD49NT8yKk1hdGgucm91bmQoby8yKToxKk1hdGgucm91bmQoby8yKTtcclxuXHRcdFx0XHRcdFx0dmFyIG49dC1yPDE/MTp0LXI7Ly9kb24ndCBzdGF5IG9uICdzdGFydGVkJ1xyXG5cclxuXHRcdFx0XHRcdFx0VXNlclZvY2FiW2lkXS5sZXZlbCA9IG47XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0Ly9pbmNyZWFzZSBsZXZlbCBpZiBub25lIHdyb25nXHJcblx0XHRcdFx0XHRcdFVzZXJWb2NhYltpZF0ubGV2ZWwrKztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vUHV0IFVzZXJWb2NhYiBiYWNrIGluIHN0b3JhZ2VcclxuXHRcdFx0XHRcdFVzZXJWb2NhYltpZF0uZGF0ZSA9IERhdGUubm93KCk7XHJcblx0XHRcdFx0XHRVc2VyVm9jYWJbaWRdLmR1ZSA9IERhdGUubm93KCkgKyBzcnNpbnRlcnZhbHNbVXNlclZvY2FiW2lkXS5sZXZlbF07XHJcblx0XHRcdFx0XHRsb2NhbFNldChcIlVzZXItVm9jYWJcIiwgVXNlclZvY2FiKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFVzZXJWb2NhYltpZF0uZHVlICtcIiA+IFwiKyBEYXRlLm5vdygpICsgXCIgKFwiICsgbXMyc3RyKFVzZXJWb2NhYltpZF0uZHVlIC0gRGF0ZS5ub3coKSkrXCIpXCIpO1xyXG5cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVGhpcyBpdGVtIGlzIG5vdCBkdWUgZm9yIHJldmlldyB5ZXQsIGRpc2NhcmRpbmcgcmVzdWx0c1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZXNwb25zZVRleHQgPSAne1widldLU1MnK2lkLnRvU3RyaW5nKCkrJ1wiOltcIicrTXcudG9TdHJpbmcoKSsnXCIsXCInK1J3LnRvU3RyaW5nKCkrJ1wiXX0nO1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JC5tb2NramF4KHtcclxuXHRcdFx0dXJsOiAvXlxcL2pzb25cXC92b2NhYnVsYXJ5XFwvV0tTUyguKykvLFxyXG5cdFx0XHR1cmxQYXJhbXM6W1wiV0tTU2lkXCJdLFxyXG5cdFx0XHRyZXNwb25zZTogZnVuY3Rpb24oc2V0dGluZ3MpIHtcclxuXHJcblx0XHRcdFx0Ly8gSW52ZXN0aWdhdGUgdGhlIGBzZXR0aW5nc2AgdG8gZGV0ZXJtaW5lIHRoZSByZXNwb25zZS4uLlxyXG5cdFx0XHRcdHZhciBpZCA9IHNldHRpbmdzLnVybFBhcmFtcy5XS1NTaWQudG9TdHJpbmcoKTtcclxuXHRcdFx0XHR2YXIgY3VycmVudEl0ZW0gPSAkLmpTdG9yYWdlLmdldChcImN1cnJlbnRJdGVtXCIpO1xyXG5cdFx0XHRcdGlmIChjdXJyZW50SXRlbS5pZCA9PT0gXCJXS1NTXCIraWQpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJhcyBleHBlY3RlZFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIHJlbGF0ZWQgPSAnWyc7XHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGN1cnJlbnRJdGVtLmNvbXBvbmVudHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0cmVsYXRlZCArPSAne1wia2FuXCI6XCInK2N1cnJlbnRJdGVtLmNvbXBvbmVudHNbaV0rJ1wiLFwiZW5cIjpcIlwiLFwic2x1Z1wiOlwiJytjdXJyZW50SXRlbS5jb21wb25lbnRzW2ldKydcIn0nO1xyXG5cdFx0XHRcdFx0cmVsYXRlZCArPSAoaSsxPGN1cnJlbnRJdGVtLmNvbXBvbmVudHMubGVuZ3RoKT8nLCc6Jyc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlbGF0ZWQgKz0gJ10nO1xyXG5cclxuXHRcdFx0XHR2YXIgcmVzcFRleHQgPSBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0XHRsZXZlbDogXCJVXCIsXHJcblx0XHRcdFx0XHRtZWFuaW5nX2V4cGxhbmF0aW9uOiBcIlRoaXMgaXMgdXNlci1kZWZpbmVkIGl0ZW0uIE1lYW5pbmcgZXhwbGFuYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIGF0IHRoaXMgdGltZS4gW2lkOiBcIitpZCtcIl1cIixcclxuXHRcdFx0XHRcdHJlYWRpbmdfZXhwbGFuYXRpb246IFwiVGhpcyBpcyB1c2VyLWRlZmluZWQgaXRlbS4gUmVhZGluZyBleHBsYW5hdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgYXQgdGhpcyB0aW1lLiBbaWQ6IFwiK2lkK1wiXVwiLFxyXG5cdFx0XHRcdFx0ZW46IGN1cnJlbnRJdGVtLmVuLmpvaW4oXCIsIFwiKSxcclxuXHRcdFx0XHRcdGthbmE6IGN1cnJlbnRJdGVtLmthbmEuam9pbihcIiwgXCIpLFxyXG5cdFx0XHRcdFx0c2VudGVuY2VzOltdLFxyXG5cdFx0XHRcdFx0cGFydHNfb2Zfc3BlZWNoX2lkczpbXSxcclxuXHRcdFx0XHRcdHBhcnRfb2Zfc3BlZWNoOltdLFxyXG5cdFx0XHRcdFx0YXVkaW86bnVsbCxcclxuXHRcdFx0XHRcdG1lYW5pbmdfbm90ZTpudWxsLFxyXG5cdFx0XHRcdFx0cmVhZGluZ19ub3RlOm51bGwsXHJcblx0XHRcdFx0XHRyZWxhdGVkOkpTT04ucGFyc2UocmVsYXRlZClcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLnJlc3BvbnNlVGV4dCA9IHJlc3BUZXh0O1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbkFmdGVyQ29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGRvIGFueSByZXF1aXJlZCBjbGVhbnVwXHJcblx0XHRcdFx0JChcIi51c2VyLXN5bm9ueW1zXCIpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdC8vIGtlZXBpbmcgdGhlIGhvb2tzIGZvciBDb21tdW5pdHkgTW5lbW9uaWNzXHJcblx0XHRcdFx0JChcIiNub3RlLW1lYW5pbmcsICNub3RlLXJlYWRpbmdcIikuaHRtbChcIlwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG4vLy0tLS0tLS0tLS0tLS0tRW5kIEluc2VydCBJbnRvIFdLIFJldmlldyBGdW5jdGlvbnMtLS0tLS0tLS0tLS0tLVxyXG5cclxuIiwiXHJcbnZhciBJbXBvcnRVdGlsID0ge1xyXG5cdGZpbGVVcGxvYWQ6IGZ1bmN0aW9uKGV2KXtcclxuXHRcdHZhciBjc3ZIZWFkZXIgPSB0cnVlOyAgICAgICAgLy9maXJzdCByb3cgY29udGFpbnMgc3R1ZmYgbGlrZSBcIkthbmppL1ZvY2FiLCBSZWFkaW5nLCBNZWFuaW5nXCIgZXRjXHJcblx0XHR2YXIgdHN2ZmlsZTsgICAgICAgICAgLy90YWJzIHNlcGFyYXRlIGZpZWxkcywgY29tbWFzIHNlcGVyYXRlIHZhbHVlcz8gb3IgZmFsc2UgZm9yIHZpY2UgdmVyc2FcclxuXHRcdHZhciBDU1ZzID0gZXYudGFyZ2V0LmZpbGVzO1xyXG5cdFx0dmFyIG5hbWUgPUNTVnNbMF0ubmFtZTtcclxuXHRcdHZhciBjb2xzcGxpdCwgdnNwbGl0O1xyXG5cdFx0aWYgKG5hbWUuc3Vic3RyKG5hbWUubGFzdEluZGV4T2YoXCIuXCIpLDQpPT09XCIuY3N2XCIpe1xyXG5cdFx0XHR0c3ZmaWxlID0gZmFsc2U7XHJcblx0XHRcdGNvbHNwbGl0ID0gXCIsXCI7XHJcblx0XHRcdHZzcGxpdCA9IFwiXFx0XCI7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dHN2ZmlsZSA9IHRydWU7XHJcblx0XHRcdGNvbHNwbGl0ID0gXCJcXHRcIjtcclxuXHRcdFx0dnNwbGl0ID0gXCIsXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRlYnVnZ2luZykgeyBjb25zb2xlLmxvZyhcInRzdmZpbGU6IFwiKTsgfVxyXG5cdFx0aWYgKGRlYnVnZ2luZykgeyBjb25zb2xlLmxvZyhcImZpbGUgdXBsb2FkZWQ6IFwiK0NTVnNbMF0ubmFtZSk7IH1cclxuXHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0cmVhZGVyLnJlYWRBc1RleHQoQ1NWc1swXSk7XHJcblx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHR2YXIgY3N2U3RyaW5nID0gZXYudGFyZ2V0LnJlc3VsdDtcclxuXHRcdFx0dmFyIGNzdlJvdyA9IGNzdlN0cmluZy5zcGxpdChcIlxcblwiKTtcclxuXHRcdFx0Ly9kZWZhdWx0IGNvbHVtbiByb3dzXHJcblx0XHRcdHZhciBrID0gMDtcclxuXHRcdFx0dmFyIHIgPSAxO1xyXG5cdFx0XHR2YXIgbSA9IDI7XHJcblxyXG5cdFx0XHR2YXIgaSA9IGNzdlJvdy5sZW5ndGg7XHJcblx0XHRcdC8vcHJvY2VzcyBoZWFkZXIsIGNoYW5naW5nIGsscixtIGlmIG5lY2Vzc2FyeVxyXG5cdFx0XHR2YXIgSlNPTmltcG9ydCA9IFtdO1xyXG5cdFx0XHR3aGlsZShpLS0pe1xyXG5cdFx0XHRcdHZhciByb3cgPSBjc3ZSb3dbaV07XHJcblx0XHRcdFx0aWYgKChjc3ZIZWFkZXIgPT09IHRydWUgJiYgaSA9PT0gMCl8fCAgLy8gIFNraXAgaGVhZGVyXHJcblx0XHRcdFx0XHQocm93ID09PSBcIlwiKSAvLyBTa2lwIGVtcHR5IHJvd3NcclxuXHRcdFx0XHQgICApe1xyXG5cdFx0XHRcdFx0aWYgKGRlYnVnZ2luZykgeyBjb25zb2xlLmxvZyhcIlNraXBwaW5nIHJvdyAjXCIraSk7IH1cclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyb3cpO1xyXG5cclxuXHJcblx0XHRcdFx0XHR2YXIgZWxlbSA9IHJvdy5zcGxpdChjb2xzcGxpdCk7XHJcblx0XHRcdFx0XHR2YXIgaXRlbSA9IHt9O1xyXG5cdFx0XHRcdFx0dmFyIGM7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVsZW1ba10pe1xyXG5cdFx0XHRcdFx0XHRpdGVtLmthbmppID0gZWxlbVtrXS50cmltKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZWxlbVtyXSl7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChlbGVtW3JdLmluZGV4T2YodnNwbGl0KT4tMSl7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBlZyAncmVhZGluZyAxW3RhYl1yZWFkaW5nIDJbdGFiXXJlYWRpbmcgMydcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpdGVtLnJlYWRpbmcgPSBlbGVtW3JdLnNwbGl0KHZzcGxpdCk7XHJcblx0XHRcdFx0XHRcdFx0fWVsc2V7IC8vbm8gdGFicyBpbiBzdHJpbmcsIHNpbmdsZSB2YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5yZWFkaW5nPVtlbGVtW3JdXTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLnJlYWRpbmc9W1wiXCJdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZWxlbVttXSl7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChlbGVtW21dLmluZGV4T2YodnNwbGl0KT4tMSl7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBlZyAnbWVhbmluZyAxW3RhYl1tZWFuaW5nIDJbdGFiXW1lYW5pbmcgMydcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpdGVtLm1lYW5pbmcgPSBlbGVtW21dLnNwbGl0KFwiXFx0XCIpO1xyXG5cdFx0XHRcdFx0XHRcdH1lbHNleyAvL25vIHRhYnMgaW4gc3RyaW5nLCBzaW5nbGUgdmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW0ubWVhbmluZz1bZWxlbVttXV07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRjID0gaXRlbS5tZWFuaW5nLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHRcdFx0d2hpbGUoYy0tKXtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaXRlbS5tZWFuaW5nW1wiK2MrXCJdOiBcIitpdGVtLm1lYW5pbmdbY10pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fWVsc2V7Ly90b2RvOiBwcm92aWRlIG92ZXJ3cml0ZSBvcHRpb24gb24gZm9yY2VkIG1lYW5pbmdcclxuXHRcdFx0XHRcdFx0XHRpdGVtLm1lYW5pbmc9W1wiXCJdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRKU09OaW1wb3J0LnB1c2goaXRlbSk7XHJcblx0XHRcdFx0XHR9ZWxzZXsgLy8gY29ycnVwdCByb3cgKCdrYW5qaScgaXMgbWFuZGF0b3J5IChjYW4gYmUga2FuYS1vbmx5IHdvcmQpLCBpcyBub3QgcHJlc2VudCBvbiByb3csIHNraXBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIEpTT05zdHJpbmcgPSBKU09OLnN0cmluZ2lmeShKU09OaW1wb3J0KTtcclxuXHRcdFx0Y29uc29sZS5sb2coSlNPTmltcG9ydCk7XHJcblxyXG5cdFx0XHRpZiAoSlNPTnN0cmluZy5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0dmFyIGFkZCA9IEpTT04ucGFyc2UoSlNPTnN0cmluZy50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdFx0XHRcdC8qLy8tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRcdCBpZiAoIWNoZWNrQWRkKGFkZCkpIHtcclxuXHRcdFx0XHQgJChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIk5vIHZhbGlkIGlucHV0IChkdXBsaWNhdGVzPykhXCIpO1xyXG5cdFx0XHRcdCByZXR1cm47XHJcblx0XHRcdFx0IH1cclxuXHRcdFx0XHQgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0XHRcdFx0XHR2YXIgYSA9IGFkZC5sZW5ndGg7XHJcblx0XHRcdFx0XHR3aGlsZShhLS0pe1xyXG5cdFx0XHRcdFx0XHRTdG9yYWdlVXRpbC5zZXRWb2NJdGVtKGFkZFthXSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0JChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIkltcG9ydCBzdWNjZXNzZnVsIVwiKTtcclxuXHJcblx0XHRcdFx0XHQkKFwiI2ltcG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuXHRcdFx0XHRcdCQoXCIjaW1wb3J0QXJlYVwiKS50ZXh0KFwiXCIpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJQYXJzaW5nIEVycm9yIVwiKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0JChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIk5vdGhpbmcgdG8gaW1wb3J0IDooIFBsZWFzZSBwYXN0ZSB5b3VyIHN0dWZmIGZpcnN0XCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEltcG9ydFV0aWw7IiwidmFyIFJldmlld1V0aWwgPSB7XHJcblx0LyoqIFRha2VzIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHJldHVybnMgdGhlIHBvcnRpb25zIGJlZm9yZSBsZWZ0IGJyYWNrZXRzICcoJyBidXQgb25seSBmb3Igc3RyaW5ncyB0aGF0IGhhdmUgdGhlbS4gSXQgaXMgdXNlZCB0byBhZGQgc3lub255bSB2YWx1ZXMgdG8gdGhlIGFuc3dlciBsaXN0LlxyXG5cdCogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gc29sdXRpb24gLSBBbiBhcnJheSBvZiBhY2NlcHRhYmxlIGFuc3dlcnMgZm9yIHRoZSBUYXNrXHJcblx0KiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59IFBhcnRzIG9mIHRoZSBzb2x1dGlvbiBsZWZ0IG9mIGxlZnQgYnJhY2tldCBpbiBzdHJpbmdzIHdoZXJlIGl0IGV4aXN0c1xyXG5cdCogQGV4YW1wbGUgdW5icmFja2V0U29sdXRpb24oW1wibmV3c3BhcGVyXCIsIFwicmVhZGluZyBTdGljayAodGhpcyB0ZXh0IHdvbid0IGdldCB0aHJvdWdoKVwiXSkgLy8gW1wicmVhZGluZyBzdGlja1wiXVxyXG5cdCovXHJcblx0dW5icmFja2V0U29sdXRpb246IGZ1bmN0aW9uKHNvbHV0aW9uKXtcclxuICAgICAgICB2YXIgdW5icmFja2V0ZWQgPSBzb2x1dGlvbi5maWx0ZXIoZnVuY3Rpb24oYW5zKXtcclxuICAgICAgICAgICAgdmFyIG9wZW5CcmFja2V0ID0gYW5zLmluZGV4T2YoXCIoXCIpO1xyXG4gICAgICAgICAgICBpZiAob3BlbkJyYWNrZXQgIT09IC0xKXsgLy9zdHJpbmcgY29udGFpbnMgYSBicmFja2V0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsIG9wZW5CcmFja2V0KS50cmltKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHVuYnJhY2tldGVkO1xyXG4gICAgfSxcclxuXHJcblx0aW5wdXRDb3JyZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKFwiI3Jldi1pbnB1dFwiKS52YWwoKS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgICAgICB2YXIgc29sdXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LXNvbHV0aW9uJykuaW5uZXJIVE1MLnNwbGl0KC9bLOOAgV0rXFxzKi8pO1xyXG4gICAgICAgIHZhciBjb3JyZWN0Q2hhckNvdW50ID0gMDtcclxuICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbnB1dDogXCIgKyBpbnB1dCk7XHJcblxyXG4gICAgICAgIHZhciBhcHBlbmQgPSB0aGlzLnVuYnJhY2tldFNvbHV0aW9uKHNvbHV0aW9uKTtcclxuICAgICAgICBzb2x1dGlvbiA9IHNvbHV0aW9uLmNvbmNhdChhcHBlbmQpO1xyXG4gICAgICAgIHZhciBpID0gc29sdXRpb24ubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlKGktLSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhyZXNob2xkID0gMDsvL2hvdyBtYW55IGNoYXJhY3RlcnMgY2FuIGJlIHdyb25nXHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtdHlwZScpLmlubmVySFRNTCA9PSBcIk1lYW5pbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkID0gTWF0aC5mbG9vcihzb2x1dGlvbltpXS5sZW5ndGggLyBlcnJvckFsbG93YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgXCIgKyBzb2x1dGlvbltpXSArIFwiIHdpdGggdGhyZXNob2xkOiBcIiArIHRocmVzaG9sZCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgajtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aERpZmYgPSBNYXRoLmFicyhpbnB1dC5sZW5ndGggLSBzb2x1dGlvbltpXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAobGVuZ3RoRGlmZiA+IHRocmVzaG9sZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm52YWx1ZSA9IHJldHVybnZhbHVlIHx8IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYWxzZSBhdCBpZiBicmFuY2ggXCIgKyBpbnB1dC5sZW5ndGggKyBcIiA8IFwiICsgSlNPTi5zdHJpbmdpZnkoc29sdXRpb25baV0pKTsvLy5sZW5ndGggKTsvLy0gdGhyZXNob2xkKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vZGlmZmVyZW5jZSBpbiByZXNwb25zZSBsZW5ndGggaXMgd2l0aGluIHRocmVzaG9sZFxyXG4gICAgICAgICAgICAgICAgaiA9IGlucHV0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRbal0gPT0gc29sdXRpb25baV1bal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKGlucHV0W2pdICtcIiA9PSBcIisgc29sdXRpb25baV1bal0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Q2hhckNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvcnJlY3RDaGFyQ291bnQgPj0gc29sdXRpb25baV0ubGVuZ3RoIC0gdGhyZXNob2xkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm52YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJldHVybmluZyBcIiArIHJldHVybnZhbHVlKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuXHRzdWJtaXRSZXNwb25zZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vZnVuY3Rpb25zOlxyXG5cdFx0Ly8gIGlucHV0Q29ycmVjdCgpXHJcblxyXG5cdFx0Ly9jaGVjayBpZiBrZXkgcHJlc3Mgd2FzICdlbnRlcicgKGtleUNvZGUgMTMpIG9uIHRoZSB3YXkgdXBcclxuXHRcdC8vYW5kIGtleXN0YXRlIHRydWUgKGFuc3dlciBiZWluZyBzdWJtaXR0ZWQpXHJcblx0XHQvL2FuZCBjdXJzb3IgaXMgZm9jdXNlZCBpbiByZXZpZXdmaWVsZFxyXG5cdFx0aWYgKGUua2V5Q29kZSA9PSAxMyAmJiBzdWJtaXQgPT09IHRydWUpIHtcclxuXHRcdFx0dmFyIGlucHV0ID0gJChcIiNyZXYtaW5wdXRcIikudmFsKCk7XHJcblx0XHRcdHZhciByZXZpZXdMaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1SZXZpZXcnKXx8W107XHJcblx0XHRcdHZhciBybmQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdXS1NTLXJuZCcpfHwwO1xyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBzZXNzaW9uR2V0KCdXS1NTLWl0ZW0nKTtcclxuXHJcblx0XHRcdC8vLS0gc3RhcnRpbmcgaW1wbGVtZW50YXRpb24gb2YgZm9yZ2l2ZW5lc3MgcHJvdG9jb2xcclxuXHJcblx0XHRcdGl0ZW0uZm9yZ2l2ZSA9IFtdOy8vXCLjgobjgovjgZlcIl07IC8vcGxhY2Vob2xkZXIgKOioseOBmSB0byBmb3JnaXZlKVxyXG5cclxuXHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpe1xyXG5cdFx0XHRcdGFsZXJ0KFwiSXRlbSBOdWxsPz9cIik7XHJcblx0XHRcdFx0cmV2aWV3TGlzdC5zcGxpY2Uocm5kLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdC8vaGFuZGxlIGdyYWRpbmcgYW5kIHN0b3Jpbmcgc29sdXRpb25cclxuXHJcblx0XHRcdFx0Ly9jaGVjayBmb3IgaW5wdXQsIGRvIG5vdGhpbmcgaWYgbm9uZVxyXG5cdFx0XHRcdGlmKGlucHV0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL2Rpc2FibGUgaW5wdXQgYWZ0ZXIgc3VibWlzc2lvblxyXG5cdFx0XHRcdC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0XHRcdC8vd2FzIHRoZSBpbnB1dCBjb3JyZWN0P1xyXG5cdFx0XHRcdHZhciBjb3JyZWN0ID0gdGhpcy5pbnB1dENvcnJlY3QoKTtcclxuXHJcblx0XHRcdFx0Ly93YXMgdGhlIGlucHV0IGZvcmdpdmVuP1xyXG5cdFx0XHRcdHZhciBmb3JnaXZlbiA9IChpdGVtLmZvcmdpdmUuaW5kZXhPZihpbnB1dCkgIT09IC0xKTtcclxuXHJcblx0XHRcdFx0aWYgKGNvcnJlY3QpIHtcclxuXHRcdFx0XHRcdC8vaGlnaGxpZ2h0IGluIChkZWZhdWx0KSBncmVlblxyXG5cdFx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJjb3JyZWN0XCIpO1xyXG5cdFx0XHRcdFx0Ly9zaG93IGFuc3dlclxyXG5cdFx0XHRcdFx0JChcIiNyZXYtc29sdXRpb25cIikuYWRkQ2xhc3MoXCJpbmZvXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZm9yZ2l2ZW4pe1xyXG5cdFx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJjYXV0aW9uXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvL2hpZ2hpZ2h0IGluIHJlZFxyXG5cdFx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdFx0XHRcdC8vc2hvdyBhbnN3ZXJcclxuXHRcdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLmFkZENsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vcmVtb3ZlIGZyb20gc2Vzc2lvbkxpc3QgaWYgY29ycmVjdFxyXG5cdFx0XHRcdGlmIChjb3JyZWN0KSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNvcnJlY3QgYW5zd2VyXCIpO1xyXG5cdFx0XHRcdFx0aWYgKHJldmlld0xpc3QgIT09IG51bGwpe1xyXG5cdFx0XHRcdFx0XHR2YXIgb2xkbGVuID0gcmV2aWV3TGlzdC5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0XHRyZXZpZXdMaXN0LnNwbGljZShybmQsIDEpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNlc3Npb25MaXN0Lmxlbmd0aDogXCIrIG9sZGxlbiArXCIgLT4gXCIrcmV2aWV3TGlzdC5sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9yZXBsYWNlIHNob3J0ZXIgKGJ5IG9uZSkgc2Vzc2lvbkxpc3QgdG8gc2Vzc2lvblxyXG5cdFx0XHRcdFx0XHRpZiAocmV2aWV3TGlzdC5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNlc3Npb25MaXN0Lmxlbmd0aDogXCIrIHJldmlld0xpc3QubGVuZ3RoKTtcclxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uU2V0KCdVc2VyLVJldmlldycsIEpTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Ly9yZXZlaXcgb3ZlciwgZGVsZXRlIHNlc3Npb25saXN0IGZyb20gc2Vzc2lvblxyXG5cdFx0XHRcdFx0XHRcdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItUmV2aWV3Jyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6IG5vIHJldmlldyBzZXNzaW9uIGZvdW5kXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0Ly8gICBpZihmb3JnaXZlbil7XHJcblx0XHRcdFx0XHQvLyAgICAgY29uc29sZS5sb2coaW5wdXQgK1wiIGhhcyBiZWVuIGZvcmdpdmVuLiBcIitpdGVtLnR5cGUpO1xyXG5cdFx0XHRcdFx0Ly8gICByZXR1cm47XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIndyb25nIGFuc3dlclwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGl0ZW0gPSBtYXJrQW5zd2VyKGl0ZW0pO1xyXG5cclxuXHRcdFx0XHRzZXNzaW9uU2V0KGl0ZW0uaW5kZXgsIGl0ZW0pO1xyXG5cclxuXHJcblx0XHRcdFx0dmFyIGxpc3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJVc2VyLVN0YXRzXCIpKXx8W107XHJcblx0XHRcdFx0dmFyIGZvdW5kID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChsaXN0KXtcclxuXHRcdFx0XHRcdHZhciBpID0gbGlzdC5sZW5ndGg7XHJcblx0XHRcdFx0XHR3aGlsZShpLS0pe1xyXG5cdFx0XHRcdFx0XHRpZiAobGlzdFtpXS5pbmRleCA9PSBpdGVtLmluZGV4KSB7XHJcblx0XHRcdFx0XHRcdFx0bGlzdFtpXSA9IGl0ZW07XHRcdFx0XHRcdFx0XHRcdC8vcmVwbGFjZSBpdGVtIGlmIGl0IGV4aXN0c1xyXG5cdFx0XHRcdFx0XHRcdGZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYoIWZvdW5kKXtcclxuXHRcdFx0XHRcdFx0bGlzdCA9IHNhdmVUb1NvcnRlZExpc3QobGlzdCxpdGVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxpc3QgPSBbaXRlbV07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzZXNzaW9uU2V0KFwiVXNlci1TdGF0c1wiLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcblx0XHRcdFx0Ly9wbGF5QXVkaW8oKTtcclxuXHJcblx0XHRcdFx0Ly9hbnN3ZXIgc3VibWl0dGVkLCBuZXh0ICdlbnRlcicgcHJvY2VlZHMgd2l0aCBzY3JpcHRcclxuXHRcdFx0XHRzdWJtaXQgPSBmYWxzZTtcclxuXHRcdFx0fS8vbnVsbCBnYXJiYWdlIGNvbGxlY3Rpb25cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGUua2V5Q29kZSA9PSAxMyAmJiBzdWJtaXQgPT09IGZhbHNlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwia2V5c3RhdCA9IFwiICsgc3VibWl0KTtcclxuXHJcblx0XHRcdC8vdGhlcmUgYXJlIHN0aWxsIG1vcmUgcmV2aWV3cyBpbiBzZXNzaW9uP1xyXG5cdFx0XHRpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSkge1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKFwiZm91bmQgYSAnVXNlci1SZXZpZXcnOiBcIiArIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItUmV2aWV3JykpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicmVmcmVzaGluZyByZXZpZXdMaXN0IGZyb20gc3RvcmFnZVwiKTtcclxuXHRcdFx0XHRcdHZhciByZXZpZXdMaXN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVJldmlldycpKTtcclxuXHJcblx0XHRcdFx0XHQvL2N1ZSB1cCBmaXJzdCByZW1haW5pbmcgcmV2aWV3XHJcblx0XHRcdFx0XHRuZXh0UmV2aWV3KHJldmlld0xpc3QpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJjaGVja2luZyBmb3IgZW1wdHkgcmV2aWV3TGlzdFwiKTtcclxuXHRcdFx0XHRcdGlmIChyZXZpZXdMaXN0Lmxlbmd0aCA9PT0gMCl7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNlc3Npb24gb3Zlci4gcmV2aWV3TGlzdDogXCIrSlNPTi5zdHJpbmdpZnkocmV2aWV3TGlzdCkpO1xyXG5cdFx0XHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiVXNlci1SZXZpZXdcIik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWlucHV0JykuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0JChcIiNyZXYtc29sdXRpb25cIikucmVtb3ZlQ2xhc3MoXCJpbmZvXCIpO1xyXG5cdFx0XHRcdFx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpLmZhZGVJbignZmFzdCcpO1xyXG5cclxuXHRcdFx0XHR9LCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBubyByZXZpZXcgc3RvcmVkIGluIHNlc3Npb24sIHJldmlldyBpcyBvdmVyXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG5cdFx0XHRcdFx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWlucHV0JykuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLnJlbW92ZUNsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic2hvd1Jlc3VsdHNcIik7XHJcblx0XHRcdFx0XHRzaG93UmVzdWx0cygpO1xyXG5cdFx0XHRcdFx0JChcIiNyZXN1bHR3aW5kb3dcIikuc2hvdygpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzaG93UmVzdWx0cyBjb21wbGV0ZWRcIik7XHJcblxyXG5cdFx0XHRcdFx0Ly8qLyAgLy9jbGVhciBzZXNzaW9uXHJcblx0XHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG5cdFx0XHRcdFx0cmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcblxyXG5cclxuXHRcdFx0XHR9LCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdWJtaXQgPSB0cnVlO1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJldmlld1V0aWw7IiwiXHJcbnZhciBTdG9yYWdlVXRpbCA9IHtcclxuXHQvKiogSW5pdGlhbGlzZSBVc2VyLVZvY2FiXHJcblx0Ki9cclxuXHRpbml0U3RvcmFnZTogZnVuY3Rpb24oKXtcclxuXHRcdGlmICghdGhpcy5sb2NhbEdldChcIlVzZXItVm9jYWJcIikpe1xyXG5cdFx0XHR0aGlzLmxvY2FsU2V0KFwiVXNlci1Wb2NhYlwiLCBbXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRwYXJzZVN0cmluZzogZnVuY3Rpb24oc3RyT2JqKXtcclxuICAgICAgICAvL2F2b2lkcyBkdXBsaWNhdGlvbiBvZiBjb2RlIGZvciBzZXNzc2lvbkdldCBhbmQgbG9jYWxHZXRcclxuICAgICAgICB2YXIgb2JqO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG9iaiA9IEpTT04ucGFyc2Uoc3RyT2JqKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBpcyBvZiB0eXBlIFwiICsgdHlwZW9mIG9iaik7XHJcbiAgICAgICAgfVxyXG5cdFx0Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09IFwiU3ludGF4RXJyb3JcIil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdHJPYmogKyBcIiBpcyBhbiBvcmRpbmFyeSBzdHJpbmcgdGhhdCBjYW5ub3QgYmUgcGFyc2VkLlwiKTtcclxuICAgICAgICAgICAgICAgIG9iaiA9IHN0ck9iajtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHRlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBwYXJzZSBcIiArIHN0ck9iaiArIFwiLiBFcnJvcjogXCIsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9LFxyXG5cdC8qKlxyXG5cdCovXHJcblx0bG9jYWxHZXQ6IGZ1bmN0aW9uKHN0ck5hbWUpe1xyXG4gICAgICAgIHZhciBzdHJPYmogPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdHJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVN0cmluZyhzdHJPYmopO1xyXG4gICAgfSxcclxuXHQvKiogU2V0cyBzdHJpbmdzIGFuZCBvYmplY3RzIGludG8gYnJvd3NlciBzdG9yYWdlXHJcblx0KiBAcmVxdWlyZXMgbG9jYWxTdG9yYWdlXHJcblx0KiBAcmVxdWlyZXMgSlNPTlxyXG5cdCovXHJcblx0bG9jYWxTZXQ6IGZ1bmN0aW9uKHN0ck5hbWUsIG9iail7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyTmFtZSwgdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIj8gb2JqIDogSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICB9LFxyXG5cdC8qKlxyXG5cdCovXHJcblx0c2Vzc2lvbkdldDogZnVuY3Rpb24oc3RyTmFtZSl7XHJcbiAgICAgICAgdmFyIHN0ck9iaiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3RyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTdHJpbmcoc3RyT2JqKTtcclxuICAgIH0sXHJcblx0LyoqIFNldHMgc3RyaW5ncyBhbmQgb2JqZWN0cyBpbnRvIGJyb3dzZXIgc2Vzc2lvbiBzdG9yYWdlXHJcblx0KiBAcmVxdWlyZXMgbG9jYWxTdG9yYWdlXHJcblx0KiBAcmVxdWlyZXMgSlNPTlxyXG5cdCovXHJcblx0c2Vzc2lvblNldDogZnVuY3Rpb24oc3RyTmFtZSwgb2JqKXtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0ck5hbWUsIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI/IG9iaiA6IEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgfSxcclxuXHQvKipcclxuXHQqL1xyXG5cdGdldFZvY0xpc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHZvY0xpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpfHxbXTtcclxuICAgICAgICBpZiAodm9jTGlzdCl7XHJcbiAgICAgICAgICAgIHZhciB2PXZvY0xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSh2LS0pe1xyXG4gICAgICAgICAgICAgICAgdm9jTGlzdFt2XS5pID0gdjsgLy9zZXQgaW5kZXggZm9yIGl0ZW0gKC0+b3V0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2b2NMaXN0O1xyXG4gICAgfSxcclxuXHRzZXRWb2NMaXN0OiBmdW5jdGlvbih2b2NMaXN0KXtcclxuXHRcdHRoaXMubG9jYWxTZXQoJ1VzZXItVm9jYWInLCB2b2NMaXN0KTtcclxuXHR9LFxyXG5cdC8qKlxyXG5cdCovXHJcblx0c2V0Vm9jSXRlbTogZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgLy9Bc3N1bXB0aW9uOiBpdGVtIGNvbWVzIG9ubHkgd2l0aCBrYW5qaSwgcmVhZGluZyBhbmQgbWVhbmluZ1xyXG4gICAgICAgIGl0ZW0ubGV2ZWwgPSAwO1xyXG4gICAgICAgIGl0ZW0uZGF0ZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaXRlbS5tYW51YWxMb2NrID0gXCJcIjtcclxuICAgICAgICBpdGVtID0gc2V0TG9ja3MoaXRlbSk7XHJcblx0XHQgLy8wLjEuOSBhZGRpbmcgaW4gJ2R1ZScgcHJvcGVydHkgdG8gbWFrZSByZXZpZXcgYnVpbGRpbmcgc2ltcGxlclxyXG4gICAgICAgIGl0ZW0uZHVlID0gaXRlbS5kYXRlICsgc3JzT2JqZWN0W2l0ZW0ubGV2ZWxdLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICB2YXIgdm9jTGlzdCA9IGxvY2FsR2V0KCdVc2VyLVZvY2FiJyl8fFtdO1xyXG5cclxuXHRcdHZhciBmb3VuZCA9IHZvY0xpc3QuZmluZChmdW5jdGlvbih0YXNrKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2sua2FuamkgPT09IGl0ZW0ua2Fuamk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblx0XHQvL2FkZCBtZWFuaW5nIGFuZCByZWFkaW5nIHRvIGV4aXN0aW5nIGl0ZW1cclxuXHRcdC8vICAgICAgICB2b2NMaXN0W3ZdLm1lYW5pbmcgPSBpdGVtLm1lYW5pbmc7XHJcblx0XHQvLyAgICAgIHZvY0xpc3Rbdl0ucmVhZGluZyA9IGl0ZW0ucmVhZGluZztcclxuICAgICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vcHJvdmlkZSBpbmRleCBmb3IgZmFzdGVyIHNlYXJjaGVzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0ua2FuamkgK1wiIG5vdCBmb3VuZCBpbiB2b2NhYmxpc3QsIGFkZGluZyBub3dcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uaSA9IHZvY0xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB2b2NMaXN0LnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFNldCgnVXNlci1Wb2NhYicsdm9jTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdG9yYWdlVXRpbDsiLCIvKiAgVGhpcyBpcyB0aGUgb3JpZ2luYWwgY29kZSB0aGF0IEkgYW0gYnJlYWtpbmcgaW50byBiaXRlIHNpemUgYml0cyAqL1xyXG4vL05FRUQgVE8gTUFLRSBTVVJFIEJST1dTRVJJRlkgUFVUUyBUSElTIE9OIFRIRSBUT1BcclxuXHJcbiBcclxuIC8qKiBEZXNjcmliZXMgYW55IG9iamVjdCB0aGF0IGNhbiBiZSByZXZpZXdlZCBvciBsZWFybmVkLCBpbmNsdWRlcyBJUmFkaWNhbCwgSUthbmppLCBhbmQgSVZvY2FidWxhcnlcclxuICogQHR5cGVkZWYge09iamVjdH0gVGFza1xyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW58c3RyaW5nfSBsb2NrZWQgLSBsb2NrZWRcclxuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gbWFudWFsTG9jayAtIG1hbnVhbExvY2tcclxuICovXHJcbiBcclxudmFyIFN0b3JhZ2VVdGlsID0gcmVxdWlyZSgnLi9zdG9yYWdldXRpbC5qcycpO1xyXG52YXIgSW1wb3J0VXRpbCA9IHJlcXVpcmUoJy4vaW1wb3J0dXRpbC5qcycpO1xyXG52YXIgV2FuaWthbmlVdGlsID0gcmVxdWlyZSgnLi93YW5pa2FuaXV0aWwuanMnKTtcclxudmFyIFJldmlld1V0aWwgPSByZXF1aXJlKCcuL3Jldmlld3V0aWwuanMnKTtcclxuXHJcbmZ1bmN0aW9uIG1haW4oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICQoXCJoZWFkXCIpLnByZXBlbmQoXCI8c2NyaXB0IHNyYz0naHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2pxdWVyeS5tb2NramF4LzEuNi4xL2pxdWVyeS5tb2NramF4LmpzJz48L3NjcmlwdD5cIik7XHJcblxyXG4gICAgdmFyIEFQSWtleSA9IFwiWU9VUl9BUElfSEVSRVwiO1xyXG4gICAgdmFyIGxvY2tzT24gPSB0cnVlOyAvL0Rpc2FibGUgdm9jYWIgbG9ja3MgKHVubG9ja2VkIGl0ZW1zIHBlcnNpc3QgdW50aWwgZGVsZXRlZClcclxuICAgIHZhciBsb2NrREIgPSB0cnVlOyAvL1NldCB0byBmYWxzZSB0byB1bmxvY2sgS2FuamkgaXMgbm90IGF2YWlsYWJsZSBvbiBXYW5pS2FuaSAoaWUuIG5vdCByZXR1cm5lZCBieSBBUEkpXHJcbiAgICB2YXIgcmV2ZXJzZSA9IHRydWU7IC8vSW5jbHVkZSBFbmdsaXNoIHRvIOOBsuOCieOBjOOBqiByZWFkaW5nIHJldmlld3NcclxuICAgIHZhciBkZWJ1Z2dpbmcgPSB0cnVlO1xyXG4gICAgdmFyIGFzV0sgPSB0cnVlOyAvL1B1c2ggdXNlciByZXZpZXdzIGludG8gdGhlIG1haW4gV0sgcmV2aWV3IHF1ZXVlXHJcblxyXG4gICAgLy8gc2h1dCB1cCBKU0hpbnRcclxuICAgIC8qIGpzaGludCBtdWx0aXN0cjogdHJ1ZSAsIGpxdWVyeTogdHJ1ZSwgZXhwcjogdHJ1ZSwgaW5kZW50OjIgKi9cclxuICAgIC8qIGdsb2JhbCB3aW5kb3csIHdhbmFrYW5hLCBYRG9tYWluUmVxdWVzdCAqL1xyXG5cclxuICAgIC8qKiBEZWJ1Z2dpbmdcclxuXHQgKi9cclxuXHRjb25zb2xlLmxvZyA9IGRlYnVnZ2luZyA/IGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR3aW5kb3cuY29uc29sZS5sb2coXCJXS1NTOiBcIiArIG1zZyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0d2luZG93LmNvbnNvbGUubG9nKFwiV0tTUzogXCIsIG1zZyk7XHJcblx0XHR9XHJcblx0fSA6IGZ1bmN0aW9uICgpIHtcclxuXHR9O1xyXG5cdFxyXG4gICAgJChcImhlYWRcIikucHJlcGVuZCgnPHNjcmlwdCBzcmM9XCJodHRwczovL3Jhd2dpdC5jb20vV2FuaUthbmkvV2FuYUthbmEvbWFzdGVyL2xpYi93YW5ha2FuYS5qc1wiIHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj48L3NjcmlwdD4nKTtcclxuICAgIFxyXG4gICAgdmFyIGxvY2FsU2V0ID0gZnVuY3Rpb24oc3RyTmFtZSwgb2JqKXtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKHN0ck5hbWUgKyBcIiBpcyBvZiB0eXBlIFwiICsgdHlwZW9mIG9iaik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIG9iaj1KU09OLnN0cmluZ2lmeShvYmopO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0ck5hbWUsIG9iaik7XHJcbiAgICB9O1xyXG5cclxuXHQvL3RyYWNrIHZlcnNpb25zICYgZGF0YXR5cGVzXHJcblx0bG9jYWxTZXQoXCJXS1NTZGF0YVwiLCB7XHJcbiAgICAgICAgdjogXCIwLjEuMTNcIixcclxuICAgICAgICBwcm9wZXJ0eVR5cGU6IHtcclxuXHRcdFx0bWVhbmluZzogXCJhcnJheVwiLCByZWFkaW5nOiBcImFycmF5XCIsIGthbmppOiBcInN0cmluZ1wiLCBpOlwibnVtYmVyXCIsIGNvbXBvbmVudHM6IFwiYXJyYXlcIiwgZGF0ZTogXCJudW1iZXJcIiwgZHVlOiBcIm51bWJlclwiLCBsb2NrZWQ6IFwic3RyaW5nXCIsIG1hbnVhbExvY2s6IFwic3RyaW5nXCJcclxuXHRcdH0sXHJcbiAgICAgICAgcHJvcGVydHlEZXNjOiB7XHJcblx0XHRcdG1lYW5pbmc6IFwibGlzdCBvZiBtZWFuaW5nc1wiLCByZWFkaW5nOiBcImxpc3Qgb2YgcmVhZGluZ3NcIiwga2Fuamk6IFwiaXRlbSBwcm9tcHRcIiwgaTpcIml0ZW0gaW5kZXhcIiwgY29tcG9uZW50czogXCJrYW5qaSBmb3VuZCBpbiB3b3JkXCIsIGRhdGU6IFwidGltZXN0YW1wIG9mIG5ldyBsZXZlbFwiLCBkdWU6IFwidGltZXN0YW1wIG9mIGl0ZW0ncyBuZXh0IHJldmlld1wiLCBsb2NrZWQ6IFwiaW5kaWNhdG9yIG9mIHdoZXRoZXIgY29tcG9uZW50cyBhcmUgZWxpZ2libGVcIiwgbWFudWFsTG9jazogXCJsYXRjaCBmb3IgJ2xvY2tlZCcgc28gZmFpbGluZyBjb21wb25lbnRzIGRvbid0IHJlLWxvY2sgdGhlIGl0ZW1cIlxyXG5cdFx0fVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8qKiBTZXR0aW5ncyBhbmQgY29uc3RhbnRzXHJcblx0ICovXHJcbiAgICB2YXIgZXJyb3JBbGxvd2FuY2UgPSA0OyAvL2V2ZXJ5IHggbGV0dGVycywgeW91IGNhbiBtYWtlIG9uZSBtaXN0YWtlIHdoZW4gZW50ZXJpbmcgdGhlIG1lYW5pbmdcclxuXHJcbiAgICAvL3NycyA0aCwgOGgsIDI0aCwgM2QgKGd1cnUpLCAxdywgMncgKG1hc3RlciksIDFtIChlbmxpZ2h0ZW5lZCksIDRtIChidXJuZWQpXHJcbiAgICBcclxuICAgIHZhciBocnMgPSA2MCo2MCoxMDAwO1xyXG4gICAgdmFyIGRheXMgPSAyNCpocnM7XHJcbiAgICB2YXIgd2Vla3MgPSA3KmRheXM7XHJcblx0dmFyIHNyc09iamVjdCA9IFtcclxuXHRcdHtsZXZlbDogMCwgcmFuazogXCJTdGFydGVkXCIsXHRcdGR1cmF0aW9uOiAwfSwgXHJcblx0XHR7bGV2ZWw6IDEsIHJhbms6IFwiQXBwcmVudGljZVwiLFx0ZHVyYXRpb246IDQqaHJzfSxcclxuXHRcdHtsZXZlbDogMiwgcmFuazogXCJBcHByZW50aWNlXCIsXHRkdXJhdGlvbjogOCpocnN9LFxyXG5cdFx0e2xldmVsOiAzLCByYW5rOiBcIkFwcHJlbnRpY2VcIixcdGR1cmF0aW9uOiAxKmRheXN9LFxyXG5cdFx0e2xldmVsOiA0LCByYW5rOiBcIkFwcHJlbnRpY2VcIixcdGR1cmF0aW9uOiAzKmRheXN9LFxyXG5cdFx0e2xldmVsOiA1LCByYW5rOiBcIkd1cnVcIixcdFx0ZHVyYXRpb246IDEqd2Vla3N9LFxyXG5cdFx0e2xldmVsOiA2LCByYW5rOiBcIkd1cnVcIixcdFx0ZHVyYXRpb246IDIqd2Vla3N9LFxyXG5cdFx0e2xldmVsOiA3LCByYW5rOiBcIk1hc3RlclwiLFx0XHRkdXJhdGlvbjogNzMwKmhyc30sXHJcblx0XHR7bGV2ZWw6IDgsIHJhbms6IFwiRW5saWdodGVuZWRcIixcdGR1cmF0aW9uOiAyOTIyKmhyc30sXHJcblx0XHR7bGV2ZWw6IDksIHJhbms6IFwiQnVybmVkXCJ9XHJcblx0XTtcclxuXHJcblxyXG5cclxuXHR2YXIgbG9jYWxHZXQgPSBmdW5jdGlvbihzdHJOYW1lKXtcclxuICAgICAgICB2YXIgc3RyT2JqID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlU3RyaW5nKHN0ck9iaik7XHJcbiAgICB9O1xyXG4gICAgXHJcblx0Ly8gSW5pdGlhbGlzZSBVc2VyLVZvY2FiXHJcblx0U3RvcmFnZVV0aWwuaW5pdFN0b3JhZ2UoKTtcclxuXHRcclxuXHQvL0dNX2FkZFN0eWxlIHNoaW0gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBncmVhc2Vtb25rZXlcclxuICAgIHZhciBnTV9hZGRTdHlsZSA9IGZ1bmN0aW9uKENzc1N0cmluZyl7XHJcbiAgICAgICAgLy9nZXQgRE9NIGhlYWRcclxuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbiAgICAgICAgaWYgKGhlYWQpIHtcclxuICAgICAgICAgICAgLy9idWlsZCBzdHlsZSB0YWdcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XHJcbiAgICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gQ3NzU3RyaW5nO1xyXG4gICAgICAgICAgICAvL2luc2VydCBET00gc3R5bGUgaW50byBoZWFkXHJcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqICBKUXVlcnkgZml4ZXNcclxuXHQgKi9cclxuICAgICQoXCJbcGxhY2Vob2xkZXJdXCIpLmZvY3VzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmIChpbnB1dC52YWwoKSA9PSBpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIikpIHtcclxuICAgICAgICAgICAgaW5wdXQudmFsKFwiJydcIik7XHJcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUNsYXNzKFwiJ3BsYWNlaG9sZGVyJ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9KS5ibHVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmIChpbnB1dC52YWwoKSA9PSBcIicnXCIgfHwgaW5wdXQudmFsKCkgPT0gaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZENsYXNzKFwicGxhY2Vob2xkZXJcIik7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbChpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH0pLmJsdXIoKTtcclxuXHJcbiAgICAkKFwiW3BsYWNlaG9sZGVyXVwiKS5wYXJlbnRzKFwiZm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZChcIltwbGFjZWhvbGRlcl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC52YWwoKSA9PSBpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIikpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cdC8qKiBIYW5kbGUgdGhlIHVzZXJzIEFQSSBrZXkuXHJcblx0KiBAcGFyYW0ge3N0cmluZ30gQVBJa2V5IC0gdGhlIHVzZXJzIEFQSSBrZXkgdG8gc2V0LiBJZiBnaXZlbiBcIllPVVJfQVBJX0hFUkVcIiwgaXQgd2lsbCByZXR1cm4gdGhlIGtleSBpbiBicm93c2VyIHN0b3JhZ2UuXHJcblx0KiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdXNlcnMgQVBJIGtleSBhcyBzdXBwbGllZCBhbmQgc3RvcmVkLCBvciBpbiB0aGUgY2FzZSBvZiBcIllPVVJfQVBJX0hFUkVcIiBiZWluZyBwYXNzZWQsIHRoZSBzdG9yZWQga2V5LlxyXG5cdCovXHJcbiAgICB2YXIgZ2V0U2V0QXBpID0gZnVuY3Rpb24oQVBJa2V5KXtcclxuICAgICAgICB2YXIgc3RvcmVkQVBJID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dhbmlLYW5pLUFQSScpO1xyXG4gICAgICAgIGlmIChBUElrZXkgPT09IFwiWU9VUl9BUElfSEVSRVwiKXtcclxuICAgICAgICAgICAgaWYgKHN0b3JlZEFQSSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBBUElrZXkgPSBzdG9yZWRBUEk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRlbHNle1xyXG4gICAgICAgICAgICAvL0FQSSBoYXMgYmVlbiBzZXQgaW4gY29kZS5cclxuICAgICAgICAgICAgaWYgKHN0b3JlZEFQSSAhPT0gQVBJa2V5KXtcclxuICAgICAgICAgICAgICAgIGxvY2FsU2V0KCdXYW5pS2FuaS1BUEknLCBBUElrZXkpOy8vb3ZlcndyaXRlIHdpdGggbmV3IEFQSVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUElrZXk7XHJcbiAgICB9O1xyXG4gICAgQVBJa2V5ID0gZ2V0U2V0QXBpKEFQSWtleSk7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLVN0YXJ0IEluc2VydCBJbnRvIFdLIFJldmlldyBGdW5jdGlvbnMtLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQvKiogTWVzc2luZyBhcm91bmQgd2l0aCB2YW5pbGxhIFdhbmlLYW5pIHJldmlldyB2YXJpYWJsZXNcclxuXHQqL1xyXG4gICAgdmFyIGpvaW5SZXZpZXdzID0gZnVuY3Rpb24oV0tJdGVtcyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJqb2luaW5nIHJldmlld3NcIik7XHJcbiAgICAgICAgJC5qU3RvcmFnZS5zdG9wTGlzdGVuaW5nKFwicmV2aWV3UXVldWVcIiwgam9pblJldmlld3MpO1xyXG4gICAgICAgIHZhciBXS3JldmlldyA9ICQualN0b3JhZ2UuZ2V0KFwicmV2aWV3UXVldWVcIil8fFtdO1xyXG4gICAgICAgIHZhciBXS2NvbWJpbmVkID0gV0tyZXZpZXcuY29uY2F0KFdLSXRlbXMpO1xyXG4gICAgICAgICQualN0b3JhZ2Uuc2V0KFwicmV2aWV3UXVldWVcIiwgV0tjb21iaW5lZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBXS0l0ZW1zID0gW107XHJcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKFwiTG9hZGluZyBJdGVtc1wiKTtcclxuXHRcclxuXHR2YXIgd0tTU190b19XSyA9IGZ1bmN0aW9uKFdLU1NJdGVtKXtcclxuICAgICAgICB2YXIgV0tJdGVtID0ge307XHJcbiAgICAgICAgLy8gICAgV0tJdGVtLmF1ZCA9IFwiXCI7XHJcbiAgICAgICAgV0tJdGVtLmVuID0gV0tTU0l0ZW0ubWVhbmluZy5tYXAoZnVuY3Rpb24ocykge1xyXG5cdFx0XHQgLy90cmltIHdoaXRlc3BhY2UgYW5kIGNhcGl0YWxpemUgd29yZHNcclxuXHRcdFx0IHJldHVybiBzLnRyaW0oKS5yZXBsYWNlKC9cXGJcXHcvZyAsIGZ1bmN0aW9uKG0pe1xyXG5cdFx0XHRcdHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcbiAgICAgICAgV0tJdGVtLmlkID0gXCJXS1NTXCIgKyBXS1NTSXRlbS5pO1xyXG4gICAgICAgIFdLSXRlbS5rYW5hID0gV0tTU0l0ZW0ucmVhZGluZztcclxuICAgICAgICBXS0l0ZW0uc3JzID0gV0tTU0l0ZW0ubGV2ZWwrMTsvL1dLIHN0YXJ0cyBsZXZlbHMgZnJvbSAxLCBXS1NTIHN0YXJ0cyB0aGVtIGZyb20gMFxyXG4gICAgICAgIFdLSXRlbS52b2MgPSBXS1NTSXRlbS5rYW5qaTtcclxuICAgICAgICBXS0l0ZW0uY29tcG9uZW50cyA9IFdLU1NJdGVtLmNvbXBvbmVudHM7XHJcblxyXG4gICAgICAgIFdLSXRlbS5zeW4gPSBbXTtcclxuICAgICAgICAvL0FkZCBzeW5vbnltcyBvZiBzdHJpbmdzIHdpdGhvdXQgYnJhY2tldGVkIGluZm8gdG8gZ2V0IGFyb3VuZCBjaGVja2luZyB0aGUgZnVsbCBzdHJpbmcgaW5jbHVkaW5nIGJyYWNrZXRzXHJcbiAgICAgICAgV0tTU0l0ZW0ubWVhbmluZy5mb3JFYWNoKGZ1bmN0aW9uKG1lYW5pbmcpe1xyXG4gICAgICAgICAgICB2YXIgb3BlbkJyYWNrZXQgPSBtZWFuaW5nLmluZGV4T2YoXCIoXCIpO1xyXG4gICAgICAgICAgICBpZiAob3BlbkJyYWNrZXQgIT09IC0xICYmIG1lYW5pbmcuaW5kZXhPZihcIilcIikgIT09IC0xKXtcclxuICAgICAgICAgICAgICAgIFdLSXRlbS5zeW4ucHVzaChtZWFuaW5nLnN1YnN0cigwLCBvcGVuQnJhY2tldCkudHJpbSgpLnJlcGxhY2UoL1xcYlxcdy9nICwgZnVuY3Rpb24obSl7IHJldHVybiBtLnRvVXBwZXJDYXNlKCk7fSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBXS0l0ZW07XHJcbiAgICB9O1xyXG5cclxuXHR2YXIgbG9hZFRhc2tzID0gZnVuY3Rpb24odXNlclZvY2FiLCBpLCB1c2VyVm9jYWJzKXtcclxuICAgICAgICB2YXIgZHVlTm93ID0gKHVzZXJWb2NhYi5sb2NrZWQgPT09IFwibm9cIiAmJiB1c2VyVm9jYWIubGV2ZWwgPCA5ICYmIERhdGUubm93KCkgPiB1c2VyVm9jYWIuZHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGR1ZU5vdyl7XHJcbiAgICAgICAgICAgIGlmICh1c2VyVm9jYWIua2FuamkubGVuZ3RoICogdXNlclZvY2FiLm1lYW5pbmdbMF0ubGVuZ3RoICogdXNlclZvY2FiLnJlYWRpbmdbMF0ubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIC8vU29ycnksIHdlIG5lZWQgYWxsIHRocmVlIHRvIGFkZCB0byBXSyByZXZpZXcsIG5vIGthbmEgb25seSB3aXRob3V0IHJlYWRpbmdzIGV0Yy5cclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJpdGVtOlwiICsgdXNlclZvY2FiLmthbmppICsgXCIsIFwiICsgdXNlclZvY2FiLmxvY2tlZCArXCIgPT09IFxcXCJub1xcXCIgJiYgXCIgKyB1c2VyVm9jYWIubGV2ZWwgKyBcIiA8IDkgJiYgXCIgKyBEYXRlLm5vdygpICsgXCIgPiBcIiArIHVzZXJWb2NhYi5kdWUpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhkdWVOb3cpO1xyXG4gICAgICAgICAgICAgICAgV0tJdGVtcy5wdXNoKHdLU1NfdG9fV0sodXNlclZvY2FiKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIkl0ZW0gXCIgKyB1c2VyVm9jYWIua2FuamkgKyBcIiBjb3VsZCBub3QgYmUgYWRkZWQsIGl0IGlzIG1pc3Npbmcgb25lIG9yIG1vcmUgb2YgdGhlIGVzc2VudGlhbCBmaWVsZHMgZm9yIGEgV0sgdm9jYWJ1bGFyeSByZXZpZXdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cdFxyXG4gICAgdmFyIHVzZXJWb2NhYnMgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcbiAgICB1c2VyVm9jYWJzLmZvckVhY2gobG9hZFRhc2tzKTsvLywgdGhpcyk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHJcbiAgICAvL3doZXJlIHRoZSBtYWdpYyBoYXBwZW5zXHJcbiAgICBpZiAoYXNXSyl7XHJcbiAgICAgICAgJC5qU3RvcmFnZS5saXN0ZW5LZXlDaGFuZ2UoXCJyZXZpZXdRdWV1ZVwiLCBmdW5jdGlvbigpe2pvaW5SZXZpZXdzKFdLSXRlbXMpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZXNzaW9uU2V0ID0gZnVuY3Rpb24oc3RyTmFtZSwgb2JqKXtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKHN0ck5hbWUgKyBcIiBpcyBvZiB0eXBlIFwiICsgdHlwZW9mIG9iaik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIG9iaj1KU09OLnN0cmluZ2lmeShvYmopO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3RyTmFtZSwgb2JqKTtcclxuICAgIH07XHJcblx0XHJcbiAgICB2YXIgc2Vzc2lvbkdldCA9IGZ1bmN0aW9uKHN0ck5hbWUpe1xyXG4gICAgICAgIHZhciBzdHJPYmogPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0ck5hbWUpO1xyXG4gICAgICAgIHJldHVybiBwYXJzZVN0cmluZyhzdHJPYmopO1xyXG4gICAgfTtcclxuXHJcblx0dmFyIGdlbmVyYXRlUmV2aWV3TGlzdCA9IGZ1bmN0aW9uKHJldmlld0FjdGl2ZSkge1xyXG4gICAgICAgIC8vZG9uJ3QgaW50ZXJmZXJlIHdpdGggYW4gYWN0aXZlIHNlc3Npb25cclxuICAgICAgICBpZiAocmV2aWV3QWN0aXZlKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcmV2aWV3JykuaW5uZXJIVE1MID0gXCJSZXZpZXcgaW4gUHJvZ3Jlc3NcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImdlbmVyYXRlUmV2aWV3TGlzdCgpXCIpO1xyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGdlbmVyYXRlUmV2aWV3TGlzdCgpIGJ1aWxkcyBhIHJldmlldyBzZXNzaW9uIGFuZCB1cGRhdGVzIHRoZSBodG1sIG1lbnUgdG8gc2hvdyBudW1iZXIgd2FpdGluZy5cclxuICAgICAgICB2YXIgbnVtUmV2aWV3cyA9IDA7XHJcbiAgICAgICAgdmFyIHNvb25lc3QgPSBJbmZpbml0eTtcclxuICAgICAgICB2YXIgbmV4dDtcclxuXHJcbiAgICAgICAgdmFyIHJldmlld0xpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgLy9jaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgdm9jYWIgYWxyZWFkeSBpbiBvZmZsaW5lIHN0b3JhZ2VcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkge1xyXG4gICAgICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKHZvY2FiTGlzdCk7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICAgICAgLy9mb3IgZWFjaCB2b2NhYiBpbiBzdG9yYWdlLCBnZXQgdGhlIGFtb3VudCBvZiB0aW1lIHZvY2FiIGhhcyBsaXZlZFxyXG4gICAgICAgICAgICAvL3ZhciBpID0gdm9jYWJMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy93aGlsZShpLS0pe1xyXG5cdFx0XHR2b2NhYkxpc3QuZm9yRWFjaChmdW5jdGlvbih0YXNrLCBpKXtcclxuICAgICAgICAgICAgICAgIHZhciBkdWUgPSB0YXNrLmRhdGUgKyBzcnNPYmplY3RbdGFzay5sZXZlbF0uZHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGVtIGlzIHVubG9ja2VkIGFuZCB1bmJ1cm5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2subGV2ZWwgPCA5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKHRhc2subWFudWFsTG9jayA9PT0gXCJub1wiIHx8IHRhc2subWFudWFsTG9jayA9PT0gXCJuXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgdGFzay5tYW51YWxMb2NrID09PVwiREJcIiAmJiAhbG9ja0RCICkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHBhc3QgcmV2aWV3IHRpbWVcclxuICAgICAgICAgICAgICAgICAgICBpZihub3cgPj0gZHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvdW50IHZvY2FiIHVwIGZvciByZXZpZXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtUmV2aWV3cysrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGl0ZW0tbWVhbmluZyBvYmplY3QgdG8gcmV2aWV3TGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoYXZlIG1hZGUgdGhpcyBvcHRpb25hbCBmb3Igc3VybmFtZSBsaXN0cyBldGMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLm1lYW5pbmdbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUmV2X0l0ZW0gb2JqZWN0IGFyZ3M6IHByb21wdCwga2FuamksIHR5cGUsIHNvbHV0aW9uLCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldkl0ZW0gPSBuZXcgUmV2X0l0ZW0odGFzay5rYW5qaSwgdGFzay5rYW5qaSwgXCJNZWFuaW5nXCIsIHRhc2subWVhbmluZywgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdMaXN0LnB1c2gocmV2SXRlbSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWRpbmcgaXMgb3B0aW9uYWwsIGlmIHRoZXJlIGlzIGEgcmVhZGluZyBmb3IgdGhlIHZvY2FiLCBhZGQgaXRzIG9iamVjdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2sucmVhZGluZ1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SZXZfSXRlbSBvYmplY3QgYXJnczogcHJvbXB0LCBrYW5qaSwgdHlwZSwgc29sdXRpb24sIGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2SXRlbTIgPSBuZXcgUmV2X0l0ZW0odGFzay5rYW5qaSwgdGFzay5rYW5qaSwgXCJSZWFkaW5nXCIsIHRhc2sucmVhZGluZywgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdMaXN0LnB1c2gocmV2SXRlbTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZXJlIGlzIGEgbWVhbmluZyBhbmQgcmVhZGluZywgYW5kIHJldmVyc2UgZmxhZyBpcyB0cnVlLCB0ZXN0IHJlYWRpbmcgZnJvbSBlbmdsaXNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnJlYWRpbmdbMF0gIT09IFwiXCIgJiYgdGFzay5tZWFuaW5nWzBdICE9PSBcIlwiICYmIHJldmVyc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SZXZfSXRlbSBvYmplY3QgYXJnczogcHJvbXB0LCBrYW5qaSwgdHlwZSwgc29sdXRpb24sIGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2SXRlbTMgPSBuZXcgUmV2X0l0ZW0odGFzay5tZWFuaW5nLmpvaW4oXCIsIFwiKSwgdGFzay5rYW5qaSwgXCJSZXZlcnNlXCIsIHRhc2sucmVhZGluZywgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdMaXN0LnB1c2gocmV2SXRlbTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2V7Ly91bmxvY2tlZC91bmJ1cm5lZCBidXQgbm90IHRpbWUgdG8gcmV2aWV3IHlldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2V0dGluZyBzb29uZXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0gZHVlIC0gbm93O1xyXG5cdFx0XHRcdFx0XHRzb29uZXN0ID0gTWF0aC5taW4oc29vbmVzdCwgbmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdH0vL2VuZCBpZiBpdGVtIGlzIHVwIGZvciByZXZpZXdcclxuXHRcdFx0fSwgdGhpcyk7Ly8gZW5kIGl0ZXJhdGUgdGhyb3VnaCB2b2NhYmxpc3RcclxuXHRcdH0vLyBlbmQgaWYgbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgaWYgKHJldmlld0xpc3QubGVuZ3RoICE9PSAwKXtcclxuICAgICAgICAgICAgLy9zdG9yZSByZXZpZXdMaXN0IGluIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAgICAgICAgICBzZXNzaW9uU2V0KCdVc2VyLVJldmlldycsIEpTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhyZXZpZXdMaXN0KTtcclxuICAgICAgICB9XHJcblx0XHRlbHNle1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwicmV2aWV3TGlzdCBpcyBlbXB0eTogXCIrSlNPTi5zdHJpbmdpZnkocmV2aWV3TGlzdCkpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1yZXZpZXcnKS5pbm5lckhUTUwgPSBzb29uZXN0PEluZmluaXR5PyBcIk5leHQgUmV2aWV3IGluIFwiK21zMnN0cihzb29uZXN0KSA6IFwiTm8gUmV2aWV3cyBBdmFpbGFibGVcIjtcclxuXHRcdH1cclxuICAgICAgICB2YXIgc3RyUmV2aWV3cyA9IG51bVJldmlld3MudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLyogSWYgeW91IHdhbnQgdG8gZG8gdGhlIDQyKyB0aGluZy5cclxuXHRcdCBpZiAobnVtUmV2aWV3cyA+IDQyKSB7XHJcblx0XHQgc3RyUmV2aWV3cyA9IFwiNDIrXCI7IC8vaGFpbCB0aGUgY3JhYmlnYXRvciFcclxuXHRcdCB9XHJcblx0XHQvLyovXHJcblxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgbnVtYmVyIG9mIHJldmlld3NcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKG51bVJldmlld3MudG9TdHJpbmcoKSArXCIgcmV2aWV3cyBjcmVhdGVkXCIpO1xyXG4gICAgICAgIGlmIChudW1SZXZpZXdzID4gMCl7XHJcbiAgICAgICAgICAgIHZhciByZXZpZXdTdHJpbmcgPSAoc29vbmVzdCAhPT0gdm9pZCAwKT8gXCI8YnIvPlxcXHJcbk1vcmUgdG8gY29tZSBpbiBcIittczJzdHIoc29vbmVzdCk6XCJcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcmV2aWV3JykuaW5uZXJIVE1MID0gXCJSZXZpZXcgKFwiICsgc3RyUmV2aWV3cyArIFwiKVwiICsgcmV2aWV3U3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cdFxyXG4vKlxyXG4qIHBvcHVsYXRlIHJldmlld3Mgd2hlbiBtZW51IGJ1dHRvbiBwcmVzc2VkXHJcbiovXHJcblxyXG53aW5kb3cuZ2VuZXJhdGVSZXZpZXdMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblx0Ly9pZiBtZW51IGlzIGludmlzaWJsZSwgaXQgaXMgYWJvdXQgdG8gYmUgdmlzaWJsZVxyXG5cdGlmICggJChcIiNXS1NTX2Ryb3Bkb3duXCIpLmlzKFwiOmhpZGRlblwiKSApe1xyXG5cdFx0Ly9UaGlzIGlzIHJlYWxseSB0aGUgb25seSB0aW1lIGl0IG5lZWRzIHRvIHJ1blxyXG5cdFx0Ly91bmxlc3Mgd2Ugd2FudCB0byBzdGFydCB1cGRhdGluZyBpbiByZWFsdGltZSBieSBrZWVwaW5nIHRyYWNrIG9mIHRoZSBzb29uZXN0IGl0ZW1cclxuXHRcdGdlbmVyYXRlUmV2aWV3TGlzdCgpO1xyXG5cdH1cclxufTtcclxuXHJcbi8qXHJcbiogIEFkZCBJdGVtXHJcbiovXHJcbi8vIGV2ZW50IGZ1bmN0aW9uIHRvIG9wZW4gXCJhZGQgd2luZG93XCIgYW5kIGNsb3NlIGFueSBvdGhlciB3aW5kb3cgdGhhdCBtaWdodCBiZSBvcGVuIGF0IHRoZSB0aW1lLlxyXG53aW5kb3cuV0tTU19hZGQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Ly9zaG93IHRoZSBhZGQgd2luZG93XHJcblx0JChcIiNhZGRcIikuc2hvdygpO1xyXG5cdC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcblx0JChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cdCQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG5cdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxufTtcclxuXHJcbi8vJ2FkZCB3aW5kb3cnIGh0bWwgdGV4dFxyXG52YXIgYWRkSHRtbCA9ICdcXG5cXFxyXG48ZGl2IGlkPVwiYWRkXCIgY2xhc3M9XCJXS1NTXCI+XFxuXFxcclxuPGZvcm0gaWQ9XCJhZGRGb3JtXCI+XFxuXFxcclxuPGJ1dHRvbiBpZD1cIkFkZENsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cInJlc2V0XCI+PGkgY2xhc3M9XCJpY29uLXJlbW92ZVwiPjwvaT48L2J1dHRvbj5cXG5cXFxyXG48aDE+QWRkIGEgbmV3IEl0ZW08L2gxPlxcblxcXHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiYWRkS2FuamlcIiBwbGFjZWhvbGRlcj1cIkVudGVyIOa8ouWtlywg44Gy44KJ44GM44GqIG9yIOOCq+OCv+OCq+ODilwiPlxcblxcXHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiYWRkUmVhZGluZ1wiIHRpdGxlPVwiTGVhdmUgZW1wdHkgdG8gYWRkIHZvY2FidWxhcnkgbGlrZSDjgZnjgosgKHRvIGRvKVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgcmVhZGluZ1wiPlxcblxcXHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiYWRkTWVhbmluZ1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgbWVhbmluZ1wiPlxcblxcXHJcblxcblxcXHJcbjxwIGlkPVwiYWRkU3RhdHVzXCI+UmVhZHkgdG8gYWRkLi48L3A+XFxuXFxcclxuPGJ1dHRvbiBpZD1cIkFkZEl0ZW1CdG5cIiB0eXBlPVwiYnV0dG9uXCI+QWRkIG5ldyBJdGVtPC9idXR0b24+XFxuXFxcclxuPC9mb3JtPlxcblxcXHJcbjwvZGl2Plxcbic7XHJcblxyXG4vL2FkZCBodG1sIHRvIHBhZ2Ugc291cmNlXHJcbiQoXCJib2R5XCIpLmFwcGVuZChhZGRIdG1sKTtcclxuXHJcbi8vaGlkZSBhZGQgd2luZG93IChcImRpdiBhZGRcIiBjb2RlIHRoYXQgd2FzIGp1c3QgYXBwZW5kZWQpXHJcbiQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHJcbi8vZnVuY3Rpb24gdG8gZmlyZSBvbiBjbGljayBldmVudCBmb3IgXCJBZGQgbmV3IEl0ZW1cIlxyXG4kKFwiI0FkZEl0ZW1CdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdGhhbmRsZUFkZENsaWNrKCk7XHJcbn0pO1xyXG5cclxuJChcIiNBZGRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0JChcIiNhZGRcIikuaGlkZSgpO1xyXG5cdCQoXCIjYWRkRm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdCQoXCIjYWRkU3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGFkZC4uJyk7XHJcblx0JChcIiNhZGRLYW5qaVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG5cdCQoXCIjYWRkTWVhbmluZ1wiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy8tLS1GdW5jdGlvbiB3cmFwcGVycyB0byBmYWNpbGl0YXRlIHVzZSBvZiBvbmUgbG9jYWxzdG9yYWdlIGFycmF5XHJcbi8vLS0tTWFpbnRhaW5zIGRhdGEgaW50ZWdyaXR5IGJldHdlZW4gcHJldmlvdXNseSB0d28gKHZvY2FiIGFuZCBzcnMpXHJcblxyXG5cclxuZnVuY3Rpb24gc2V0U3JzSXRlbShzcnNpdGVtLHNyc0xpc3Qpe1xyXG5cdHZhciBpbmRleCA9IHNyc2l0ZW0uaTtcclxuXHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2V0U3JzSXRlbTogXCIpO1xyXG5cclxuXHRpZihzcnNMaXN0KXtcclxuXHRcdGlmKHNyc0xpc3RbaW5kZXhdLmthbmppPT09c3JzaXRlbS5rYW5qaSl7Ly8gdHJ5IHNlYXJjaCBieSBpbmRleFxyXG5cclxuXHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInN1Y2Nlc3M6IFwiK3Nyc2l0ZW0ua2FuamkrXCIgZm91bmQgYXQgaW5kZXggXCIrIGluZGV4KTtcclxuXHRcdFx0Ly9yZXBsYWNlIG9ubHkgdGhlIHNycyBwYXJ0cyBvZiB0aGUgaXRlbVxyXG5cdFx0XHRzcnNMaXN0W2luZGV4XS5kYXRlID0gc3JzaXRlbS5kYXRlO1xyXG5cdFx0XHRzcnNMaXN0W2luZGV4XS5sZXZlbCA9IHNyc2l0ZW0ubGV2ZWw7XHJcblx0XHRcdHNyc0xpc3RbaW5kZXhdLmxvY2tlZCA9IHNyc2l0ZW0ubG9ja2VkO1xyXG5cdFx0XHRzcnNMaXN0W2luZGV4XS5tYW51YWxMb2NrID0gc3JzaXRlbS5tYW51YWxMb2NrO1xyXG5cdFx0fWVsc2V7IC8vYmFja3VwIHBsYW4gKGN5Y2xlIHRocm91Z2ggbGlzdD8pXHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJTUlMgS2Fuamkgbm90IGZvdW5kIGluIHZvY2FibGlzdCwgbmVlZHMgd29ya1wiKTtcclxuXHJcblx0XHR9XHJcblx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiaXRlbTogXCIpO1xyXG5cdFx0cmV0dXJuIHNyc0xpc3Q7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTcnNMaXN0KCl7XHJcblx0dmFyIHNyc0xpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcblx0cmV0dXJuIHNyc0xpc3Q7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGdWxsTGlzdCgpe1xyXG5cdHZhciBmdWxsTGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSl8fFtdO1xyXG5cdGlmKCFmdWxsTGlzdCl7XHJcblx0XHRmdWxsTGlzdD1bXTtcclxuXHR9XHJcblx0cmV0dXJuIGZ1bGxMaXN0O1xyXG59XHJcblxyXG4vLy0tLS0tLS0tXHJcblxyXG4vKlxyXG4qICBFZGl0IEl0ZW1zXHJcbiovXHJcbndpbmRvdy5XS1NTX2VkaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Z2VuZXJhdGVFZGl0T3B0aW9ucygpO1xyXG5cdCQoXCIjZWRpdFwiKS5zaG93KCk7XHJcblx0Ly9oaWRlIG90aGVyIHdpbmRvd3NcclxuXHQkKFwiI2V4cG9ydFwiKS5oaWRlKCk7XHJcblx0JChcIiNpbXBvcnRcIikuaGlkZSgpO1xyXG5cdCQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHQkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbn07XHJcblxyXG4kKFwiYm9keVwiKS5hcHBlbmQoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGRpdiBpZD1cXFwiZWRpdFxcXCIgY2xhc3M9XFxcIldLU1NcXFwiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGZvcm0gaWQ9XFxcImVkaXRGb3JtXFxcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxidXR0b24gaWQ9XFxcIkVkaXRDbG9zZUJ0blxcXCIgY2xhc3M9XFxcIndrc3MtY2xvc2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+PGkgY2xhc3M9XFxcImljb24tcmVtb3ZlXFxcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPkVkaXQgeW91ciBWb2NhYjwvaDE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPHNlbGVjdCBpZD1cXFwiZWRpdFdpbmRvd1xcXCIgc2l6ZT1cXFwiOFxcXCI+PC9zZWxlY3Q+XFxcclxuPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGlkPVxcXCJlZGl0SXRlbVxcXCIgbmFtZT1cXFwiXFxcIiBzaXplPVxcXCI0MFxcXCIgcGxhY2Vob2xkZXI9XFxcIlNlbGVjdCB2b2NhYiwgY2xpY2sgZWRpdCwgY2hhbmdlIGFuZCBzYXZlIVxcXCI+XFxcclxuXFxcclxuPHAgaWQ9XFxcImVkaXRTdGF0dXNcXFwiPlJlYWR5IHRvIGVkaXQuLjwvcD5cXFxyXG48YnV0dG9uIGlkPVxcXCJFZGl0RWRpdEJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5FZGl0PC9idXR0b24+XFxcclxuPGJ1dHRvbiBpZD1cXFwiRWRpdFNhdmVCdG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+U2F2ZTwvYnV0dG9uPiAgICAgICAgIFxcXHJcbjxidXR0b24gaWQ9XFxcIkVkaXREZWxldGVCdG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdGl0bGU9XFxcIkRlbGV0ZSBzZWxlY3RlZCBpdGVtXFxcIj5EZWxldGU8L2J1dHRvbj4gICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVxcXCJFZGl0RGVsZXRlQWxsQnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHRpdGxlPVxcXCLmnKzlvZPjgavjgoTjgovjga7vvJ9cXFwiPkRlbGV0ZSBBbGw8L2J1dHRvbj4gICBcXFxyXG48YnV0dG9uIGlkPVxcXCJSZXNldExldmVsc0J0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5SZXNldCBsZXZlbHM8L2J1dHRvbj4gICAgICAgICBcXFxyXG48L2Zvcm0+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjwvZGl2PlwiKTtcclxuJChcIiNlZGl0XCIpLmhpZGUoKTtcclxuXHJcbiQoXCIjRWRpdEVkaXRCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdC8vZ2V0IGhhbmRsZSBmb3IgJ3NlbGVjdCcgYXJlYVxyXG5cdHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRXaW5kb3dcIik7XHJcblxyXG5cdC8vZ2V0IHRoZSBpbmRleCBmb3IgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtXHJcblx0dmFyIGluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7IC8vc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlIGlzIG5vdCByZXF1aXJlZCwgb3B0aW9uIHZhbHVlcyBhcmUgc2V0IHRvIGluZGV4XHJcblx0dmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuXHR2b2NhYkxpc3QgPSB2b2NhYkxpc3QucmV2ZXJzZSgpO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikudmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2b2NhYkxpc3RbaW5kZXhdKTtcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLm5hbWUgPSBpbmRleDsgLy91c2luZyBuYW1lIHRvIHNhdmUgdGhlIGluZGV4XHJcblx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0xvYWRlZCBpdGVtIHRvIGVkaXQnKTtcclxufSk7XHJcblxyXG4kKFwiI0VkaXRTYXZlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoJChcIiNlZGl0SXRlbVwiKS52YWwoKS5sZW5ndGggIT09IDApIHtcclxuXHRcdC8vLS0gYmUgYXdhcmVcclxuXHRcdC8vZGVsZXRpbmcgb25lIGl0ZW0gbWF5IGNhdXNlIG1pc21hdGNoIGlmIGkgaXMgcHJvcGVydHkgb2YgaXRlbSBpbiBsaXN0XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLm5hbWU7XHJcblx0XHRcdHZhciBpdGVtID0gSlNPTi5wYXJzZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG5cdFx0XHR2YXIgbSA9IGl0ZW0ubWVhbmluZy5sZW5ndGg7XHJcblx0XHRcdHdoaWxlKG0tLSl7XHJcblx0XHRcdFx0aWYgKGl0ZW0ubWVhbmluZ1ttXSA9PT0gXCJcIil7XHJcblx0XHRcdFx0XHRkZWxldGUgaXRlbS5tZWFuaW5nW21dO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgZnVsbExpc3QgPSBnZXRGdWxsTGlzdCgpLnJldmVyc2UoKTtcclxuXHJcblxyXG5cdFx0XHRpZiAoaXNJdGVtVmFsaWQoaXRlbSkgJiYvL2l0ZW0gaXMgdmFsaWRcclxuXHRcdFx0XHQhKGNoZWNrRm9yRHVwbGljYXRlcyhmdWxsTGlzdCxpdGVtKSAmJiAvL2thbmppIChpZiBjaGFuZ2VkKSBpcyBub3QgYWxyZWFkeSBpbiB0aGUgbGlzdFxyXG5cdFx0XHRcdCAgZnVsbExpc3RbaW5kZXhdLmthbmppICE9PSBpdGVtLmthbmppKSkgey8vdW5sZXNzIGl0IGlzIHRoZSBpdGVtIGJlaW5nIGVkaXRlZFxyXG5cclxuXHJcblx0XHRcdFx0dmFyIHNyc2xpc3QgPSBnZXRTcnNMaXN0KCkucmV2ZXJzZSgpO1xyXG5cdFx0XHRcdC8vZ2V0IHNycyBjb21wb25lbnRzIG9mIGl0ZW0obGlzdClcclxuXHJcblx0XHRcdFx0ZnVsbExpc3RbaW5kZXhdID0gaXRlbTsvL2RvZXMgbm90IGhhdmUgc3JzIHN0dWZmLCByZS1hZGQgaXQgbm93XHJcblxyXG5cdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coZnVsbExpc3RbaW5kZXhdKTtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKHNyc2xpc3RbaW5kZXhdKTtcclxuXHRcdFx0XHRmdWxsTGlzdFtpbmRleF0uZGF0ZSA9IHNyc2xpc3RbaW5kZXhdLmRhdGU7XHJcblx0XHRcdFx0ZnVsbExpc3RbaW5kZXhdLmxldmVsID0gc3JzbGlzdFtpbmRleF0ubGV2ZWw7XHJcblx0XHRcdFx0ZnVsbExpc3RbaW5kZXhdLmxvY2tlZCA9IHNyc2xpc3RbaW5kZXhdLmxvY2tlZDtcclxuXHRcdFx0XHRmdWxsTGlzdFtpbmRleF0ubWFudWFsTG9jayA9IHNyc2xpc3RbaW5kZXhdLm1hbnVhbExvY2s7XHJcblxyXG5cdFx0XHRcdGZ1bGxMaXN0ID0gZnVsbExpc3QucmV2ZXJzZSgpOyAvL3Jlc2V0IG9yZGVyIG9mIGFycmF5XHJcblxyXG5cdFx0XHRcdGxvY2FsU2V0KCdVc2VyLVZvY2FiJywgZnVsbExpc3QpO1xyXG5cclxuXHRcdFx0XHRnZW5lcmF0ZUVkaXRPcHRpb25zKCk7XHJcblx0XHRcdFx0JChcIiNlZGl0U3RhdHVzXCIpLmh0bWwoJ1NhdmVkIGNoYW5nZXMhJyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS52YWx1ZSA9IFwiXCI7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS5uYW1lID0gXCJcIjtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHQkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnSW52YWxpZCBpdGVtIG9yIGR1cGxpY2F0ZSEnKTtcclxuXHRcdFx0XHRhbGVydChpc0l0ZW1WYWxpZChpdGVtKS50b1N0cmluZygpICtcIiAmJiDvvIEoXCIrIGNoZWNrRm9yRHVwbGljYXRlcyhmdWxsTGlzdCxpdGVtKS50b1N0cmluZygpK1wiICYmICEoXCIrZnVsbExpc3RbaW5kZXhdLmthbmppK1wiICE9PSBcIitpdGVtLmthbmppK1wiKVwiKTtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdCQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG4kKFwiI0VkaXREZWxldGVCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdC8vc2VsZWN0IG9wdGlvbnMgZWxlbWVudCB3aW5kb3dcclxuXHR2YXIgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0V2luZG93XCIpO1xyXG5cclxuXHQvL2luZGV4IG9mIHNlbGVjdGVkIGl0ZW1cclxuXHR2YXIgaXRlbSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcblx0Ly9mZXRjaCBKU09OIHN0cmluZ3MgZnJvbSBzdG9yYWdlIGFuZCBjb252ZXJ0IHRoZW0gaW50byBKYXZhc2NyaXB0IGxpdGVyYWxzXHJcblx0dmFyIHZvY2FiTGlzdCA9IGdldEZ1bGxMaXN0KCk7XHJcblxyXG5cdC8vc3RhcnRpbmcgYXQgc2VsZWN0ZWQgaW5kZXgsIHJlbW92ZSAxIGVudHJ5ICh0aGUgc2VsZWN0ZWQgaW5kZXgpLlxyXG5cdGlmIChpdGVtID4gLTEpIHtcclxuXHRcdGlmICh2b2NhYkxpc3QgIT09IG51bGwpe1xyXG5cdFx0XHR2b2NhYkxpc3Quc3BsaWNlKGl0ZW0sIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly95dWNrXHJcblx0aWYgKHZvY2FiTGlzdC5sZW5ndGggIT09IDApIHtcclxuXHRcdGxvY2FsU2V0KCdVc2VyLVZvY2FiJywgdm9jYWJMaXN0KTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1Wb2NhYicpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlRWRpdEdVSSgpO1xyXG5cclxuXHQkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnSXRlbSBkZWxldGVkIScpO1xyXG59KTtcclxuXHJcbiQoXCIjRWRpdERlbGV0ZUFsbEJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0dmFyIGRlbGV0ZUFsbCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCBlbnRyaWVzP1wiKTtcclxuXHRpZiAoZGVsZXRlQWxsKSB7XHJcblxyXG5cdFx0Ly9kcm9wIGxvY2FsIHN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLVZvY2FiJyk7XHJcblxyXG5cclxuXHRcdHVwZGF0ZUVkaXRHVUkoKTtcclxuXHJcblx0XHQkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnQWxsIGl0ZW1zIGRlbGV0ZWQhJyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4kKFwiI0VkaXRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0JChcIiNlZGl0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2VkaXRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcblx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGVkaXQuLicpO1xyXG59KTtcclxuXHJcbi8qXHJcbiogIEV4cG9ydFxyXG4qL1xyXG53aW5kb3cuV0tTU19leHBvcnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0JChcIiNleHBvcnRcIikuc2hvdygpO1xyXG5cdC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcblx0JChcIiNhZGRcIikuaGlkZSgpO1xyXG5cdCQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG5cdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxufTtcclxuXHJcbiQoXCJib2R5XCIpLmFwcGVuZCgnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XCJleHBvcnRcIiBjbGFzcz1cIldLU1NcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxmb3JtIGlkPVwiZXhwb3J0Rm9ybVwiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cIkV4cG9ydENsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPkV4cG9ydCBJdGVtczwvaDE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPHRleHRhcmVhIGNvbHM9XCI1MFwiIHJvd3M9XCIxOFwiIGlkPVwiZXhwb3J0QXJlYVwiIHBsYWNlaG9sZGVyPVwiRXhwb3J0IHlvdXIgc3R1ZmYhIFNoYXJpbmcgaXMgY2FyaW5nIDspXCI+PC90ZXh0YXJlYT4gICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG5cXFxyXG48cCBpZD1cImV4cG9ydFN0YXR1c1wiPlJlYWR5IHRvIGV4cG9ydC4uPC9wPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVwiRXhwb3J0SXRlbXNCdG5cIiB0eXBlPVwiYnV0dG9uXCI+RXhwb3J0IEl0ZW1zPC9idXR0b24+XFxcclxuPGJ1dHRvbiBpZD1cIkV4cG9ydFNlbGVjdEFsbEJ0blwiIHR5cGU9XCJidXR0b25cIj5TZWxlY3QgQWxsPC9idXR0b24+XFxcclxuPGJ1dHRvbiBpZD1cIkV4cG9ydENzdkJ0blwiIHR5cGU9XCJidXR0b25cIj5FeHBvcnQgQ1NWPC9idXR0b24+XFxcclxuPC9mb3JtPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48L2Rpdj4nKTtcclxuJChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cclxuXHJcbiQoXCIjRXhwb3J0SXRlbXNCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkge1xyXG5cdFx0JChcIiNleHBvcnRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcblx0XHR2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG5cdFx0JChcIiNleHBvcnRBcmVhXCIpLnRleHQoSlNPTi5zdHJpbmdpZnkodm9jYWJMaXN0KSk7XHJcblx0XHQkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KFwiQ29weSB0aGlzIHRleHQgYW5kIHNoYXJlIGl0IHdpdGggb3RoZXJzIVwiKTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHQkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KFwiTm90aGluZyB0byBleHBvcnQgeWV0IDooXCIpO1xyXG5cdH1cclxufSk7XHJcblxyXG4kKFwiI0V4cG9ydFNlbGVjdEFsbEJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCQoXCIjZXhwb3J0QXJlYVwiKS52YWwoKS5sZW5ndGggIT09IDApIHtcclxuXHRcdHNlbGVjdF9hbGwoXCJleHBvcnRBcmVhXCIpO1xyXG5cdFx0JChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIkRvbid0IGZvcmdldCB0byBDVFJMICsgQyFcIik7XHJcblx0fVxyXG59KTtcclxuXHJcbiQoXCIjRXhwb3J0Q3N2QnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdm9jYWJMaXN0ID0gZ2V0RnVsbExpc3QoKTtcclxuXHR2YXIgQ3N2RmlsZSA9IGNyZWF0ZUNTVih2b2NhYkxpc3QpO1xyXG5cdHdpbmRvdy5vcGVuKENzdkZpbGUpO1xyXG59KTtcclxuXHJcbiQoXCIjRXhwb3J0Q2xvc2VCdG5cIikuY2xpY2soXHJcblx0ZnVuY3Rpb24gKCkge1xyXG5cdFx0JChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cdFx0JChcIiNleHBvcnRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcblx0XHQkKFwiI2V4cG9ydEFyZWFcIikudGV4dChcIlwiKTtcclxuXHRcdCQoXCIjZXhwb3J0U3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGV4cG9ydC4uJyk7XHJcblx0fVxyXG4pO1xyXG5cclxuLypcclxuKiAgSW1wb3J0XHJcbiovXHJcbndpbmRvdy5XS1NTX2ltcG9ydCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKFwiI2ltcG9ydFwiKS5zaG93KCk7XHJcblx0Ly9oaWRlIG90aGVyIHdpbmRvd3NcclxuXHQkKFwiI2FkZFwiKS5oaWRlKCk7XHJcblx0JChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cdCQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcblx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG59O1xyXG5cclxuJChcImJvZHlcIikuYXBwZW5kKCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGRpdiBpZD1cImltcG9ydFwiIGNsYXNzPVwiV0tTU1wiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGZvcm0gaWQ9XCJpbXBvcnRGb3JtXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVwiSW1wb3J0Q2xvc2VCdG5cIiBjbGFzcz1cIndrc3MtY2xvc2VcIiB0eXBlPVwicmVzZXRcIj48aSBjbGFzcz1cImljb24tcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5JbXBvcnQgSXRlbXM8L2gxPlxcXHJcbjx0ZXh0YXJlYSBjb2xzPVwiNTBcIiByb3dzPVwiMThcIiBpZD1cImltcG9ydEFyZWFcIiBwbGFjZWhvbGRlcj1cIlBhc3RlIHlvdXIgc3R1ZmYgYW5kIGhpdCB0aGUgaW1wb3J0IGJ1dHRvbiEgVXNlIHdpdGggY2F1dGlvbiFcIj48L3RleHRhcmVhPiAgICAgICAgICAgICAgICAgICAgIFxcXHJcblxcXHJcbjxwIGlkPVwiaW1wb3J0U3RhdHVzXCI+UmVhZHkgdG8gaW1wb3J0Li48L3A+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxsYWJlbCBjbGFzcz1cImJ1dHRvblwiIGlkPVwiSW1wb3J0SXRlbXNCdG5cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO1wiPkltcG9ydCBJdGVtczwvbGFiZWw+XFxcclxuXFxcclxuPGxhYmVsIGlkPVwiSW1wb3J0Q3N2QnRuXCIgY2xhc3M9XCJidXR0b25cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO2N1cnNvcjogcG9pbnRlcjtcIj5JbXBvcnQgQ1NWICAgICAgICAgXFxcclxuXFxcclxuPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJ1cGxvYWRcIiBhY2NlcHQ9XCIuY3N2LC50c3ZcIiBzdHlsZT1cImhlaWdodDowcHg7d2lkdGg6MHB4O2JhY2tncm91bmQ6cmVkO29wYWNpdHk6MDtmaWx0ZXI6b3BhY2l0eSgxKTtcIiAvPlxcXHJcblxcXHJcbjwvbGFiZWw+XFxcclxuXFxcclxuPGxhYmVsIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJJbXBvcnRXS0J0blwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmU7XCI+PGkgY2xhc3M9XCJpY29uLWRvd25sb2FkLWFsdFwiPjwvaT4gV0s8L2xhYmVsPlxcXHJcbjwvZm9ybT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPC9kaXY+Jyk7XHJcbiQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkXCIpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIEltcG9ydFV0aWwuZmlsZVVwbG9hZCwgZmFsc2UpO1xyXG5cclxuXHJcbiQoXCIjSW1wb3J0Q3N2QnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxufSk7XHJcblxyXG4kKFwiI0ltcG9ydFdLQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0V2FuaWthbmlVdGlsLmdldFNlcnZlclJlc3AoQVBJa2V5LFwidm9jYWJ1bGFyeVwiKTtcclxuXHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwibWF5YmU/XCIpO1xyXG59KTtcclxuXHJcbiQoXCIjSW1wb3J0SXRlbXNCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuXHRpZiAoJChcIiNpbXBvcnRBcmVhXCIpLnZhbCgpLmxlbmd0aCAhPT0gMCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGFkZCA9IEpTT04ucGFyc2UoJChcIiNpbXBvcnRBcmVhXCIpLnZhbCgpLnRvTG93ZXJDYXNlKCkpO1xyXG5cdFx0XHRhbGVydChKU09OLnN0cmluZ2lmeShhZGQpKTtcclxuXHRcdFx0aWYgKGNoZWNrQWRkKGFkZCkpIHtcclxuXHRcdFx0XHQkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KFwiTm8gdmFsaWQgaW5wdXQgKGR1cGxpY2F0ZXM/KSFcIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbmV3bGlzdDtcclxuXHRcdFx0dmFyIHNyc2xpc3QgPSBbXTtcclxuXHRcdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpIHtcclxuXHRcdFx0XHR2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG5cdFx0XHRcdHNyc2xpc3QgPSBnZXRTcnNMaXN0KCk7XHJcblx0XHRcdFx0bmV3bGlzdCA9IHZvY2FiTGlzdC5jb25jYXQoYWRkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRuZXdsaXN0ID0gYWRkO1xyXG5cclxuXHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGkgPSBhZGQubGVuZ3RoO1xyXG5cdFx0XHR3aGlsZShpLS0pe1xyXG5cdFx0XHRcdFN0b3JhZ2VVdGlsLnNldFZvY0l0ZW0oYWRkW2ldKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIkltcG9ydCBzdWNjZXNzZnVsIVwiKTtcclxuXHJcblx0XHRcdCQoXCIjaW1wb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdFx0XHQkKFwiI2ltcG9ydEFyZWFcIikudGV4dChcIlwiKTtcclxuXHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHQkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KFwiUGFyc2luZyBFcnJvciFcIik7XHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coZSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJOb3RoaW5nIHRvIGltcG9ydCA6KCBQbGVhc2UgcGFzdGUgeW91ciBzdHVmZiBmaXJzdFwiKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuJChcIiNJbXBvcnRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0JChcIiNpbXBvcnRcIikuaGlkZSgpO1xyXG5cdCQoXCIjaW1wb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdCQoXCIjaW1wb3J0QXJlYVwiKS50ZXh0KFwiXCIpO1xyXG5cdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGltcG9ydC4uJyk7XHJcbn0pO1xyXG5cclxuLypcclxuKiAgUmV2aWV3IEl0ZW1zXHJcbiovXHJcbndpbmRvdy5XS1NTX3JldmlldyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0Ly9pcyB0aGVyZSBhIHNlc3Npb24gd2FpdGluZyBpbiBzdG9yYWdlP1xyXG5cdGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItUmV2aWV3JykpIHtcclxuXHJcblx0XHQvL3Nob3cgdGhlIHNlbGZzdHVkeSB3aW5kb3dcclxuXHRcdCQoXCIjc2VsZnN0dWR5XCIpLnNob3coKTtcclxuXHJcblx0XHQvL2hpZGUgb3RoZXIgd2luZG93c1xyXG5cdFx0JChcIiNhZGRcIikuaGlkZSgpO1xyXG5cdFx0JChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cdFx0JChcIiNlZGl0XCIpLmhpZGUoKTtcclxuXHRcdCQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHJcblx0XHRzdGFydFJldmlldygpO1xyXG5cdH1cclxufTtcclxuXHJcbiQoXCJib2R5XCIpLmFwcGVuZCgnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XCJzZWxmc3R1ZHlcIiBjbGFzcz1cIldLU1NcIj5cXFxyXG48YnV0dG9uIGlkPVwiU2VsZnN0dWR5Q2xvc2VCdG5cIiBjbGFzcz1cIndrc3MtY2xvc2VcIiB0eXBlPVwiYnV0dG9uXCI+PGkgY2xhc3M9XCJpY29uLXJlbW92ZVwiPjwvaT48L2J1dHRvbj5cXFxyXG48aDE+UmV2aWV3PHNwYW4gaWQ9XCJSZXZOdW1cIj48L3NwYW4+PC9oMT5cXFxyXG48ZGl2IGlkPVwid2tzcy1rYW5qaVwiPlxcXHJcbjxzcGFuIGlkPVwicmV2LWthbmppXCI+PC9zcGFuPlxcXHJcbjwvZGl2PjxkaXYgaWQ9XCJ3a3NzLXR5cGVcIj5cXFxyXG48c3BhbiBpZD1cInJldi10eXBlXCI+PC9zcGFuPjxiciAvPlxcXHJcbjwvZGl2PjxkaXYgaWQ9XCJ3a3NzLXNvbHV0aW9uXCI+XFxcclxuPHNwYW4gaWQ9XCJyZXYtc29sdXRpb25cIj48L3NwYW4+XFxcclxuPC9kaXY+PGRpdiBpZD1cIndrc3MtaW5wdXRcIj5cXFxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInJldi1pbnB1dFwiIHNpemU9XCI0MFwiIHBsYWNlaG9sZGVyPVwiXCI+XFxcclxuPC9kaXY+PHNwYW4gaWQ9XCJyZXYtaW5kZXhcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPjwvc3Bhbj5cXFxyXG5cXFxyXG48Zm9ybSBpZD1cImF1ZGlvLWZvcm1cIj5cXFxyXG48bGFiZWwgaWQ9XCJBdWRpb0J1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCI+UGxheSBhdWRpbzwvbGFiZWw+XFxcclxuPGxhYmVsIGlkPVwiV3JhcFVwQnRuXCIgICBjbGFzcz1cImJ1dHRvblwiPldyYXAgVXA8L2xhYmVsPlxcXHJcbjwvZm9ybT5cXFxyXG48ZGl2IGlkPVwicmV2LWF1ZGlvXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PC9kaXY+XFxcclxuPC9kaXY+Jyk7XHJcbiQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuXHJcbiQoXCIjU2VsZnN0dWR5Q2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuXHQkKFwiI3Jldi1pbnB1dFwiKS52YWwoXCJcIik7XHJcblx0cmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcbn0pO1xyXG5cclxuJChcIiNXcmFwVXBCdG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNlc3Npb25MaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1SZXZpZXcnKXx8W107XHJcblx0dmFyIHN0YXRzTGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItU3RhdHMnKXx8W107XHJcblx0Ly9pZiBhbiBpbmRleCBpbiBzZXNzaW9uTGlzdCBtYXRjaGVzIG9uZSBpbiBzdGF0c0xpc3QsIGRvbid0IGRlbGV0ZVxyXG5cdHZhciBzZXNzaW9uSSA9IHNlc3Npb25MaXN0Lmxlbmd0aDtcclxuXHR2YXIgaXRlbSA9IHNlc3Npb25HZXQoJ1dLU1MtaXRlbScpfHxbXTtcclxuXHR2YXIgYXJyMiA9IFtdO1xyXG5cdC8vZm9yIGV2ZXJ5IGl0ZW0gaW4gc2Vzc2lvbkxpc3QsIGxvb2sgZm9yIGluZGV4IGluIHN0YXRzTGlzdCxcclxuXHQvL2lmIG5vdCB0aGVyZSAoLTEpIGRlbGV0ZSBpdGVtIGZyb20gc2Vzc2lvbkxpc3RcclxuXHR3aGlsZSAoc2Vzc2lvbkktLSl7XHJcblx0XHR2YXIgaW5kZXggPSBmaW5kSW5kZXgoc3RhdHNMaXN0LHNlc3Npb25MaXN0W3Nlc3Npb25JXSk7XHJcblx0XHRpZiAoKE1hdGguc2lnbigxL2luZGV4KSAhPT0gLTEpfHwoc2Vzc2lvbkxpc3Rbc2Vzc2lvbkldLmluZGV4ID09IGl0ZW0uaW5kZXgpKXtcclxuXHJcblx0XHRcdGFycjIucHVzaChzZXNzaW9uTGlzdFtzZXNzaW9uSV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdGRlYnVnZ2luZyYmY29uc29sZS5sb2coYXJyMik7XHJcblx0c2Vzc2lvblNldCgnVXNlci1SZXZpZXcnLCBKU09OLnN0cmluZ2lmeShhcnIyKSk7XHJcbn0pO1xyXG5cclxuJChcIiNBdWRpb0J1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0b3BlbkluTmV3VGFiKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtYXVkaW8nKS5pbm5lckhUTUwpO1xyXG59KTtcclxuXHJcbiQoXCJib2R5XCIpLmFwcGVuZCgnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XCJyZXN1bHR3aW5kb3dcIiBjbGFzcz1cIldLU1NcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVwiUmV2aWV3cmVzdWx0c0Nsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPlJldmlldyBSZXN1bHRzPC9oMT5cXFxyXG48aDI+QWxsPC9oMj5cXFxyXG48ZGl2IGlkPVwic3RhdHMtYVwiPjwvZGl2PlxcXHJcbjwvZGl2PicpO1xyXG5cclxuJChcIiNyZXN1bHR3aW5kb3dcIikuaGlkZSgpO1xyXG5cclxuJChcIiNSZXZpZXdyZXN1bHRzQ2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjcmVzdWx0d2luZG93XCIpLmhpZGUoKTtcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWFcIikuaW5uZXJIVE1MID0gXCJcIjtcclxufSk7XHJcblxyXG4vL2RlY2xhcmUgZ2xvYmFsIHZhbHVlcyBmb3Iga2V5dXAgZXZlbnRcclxuLy9pcyBhbiBhbnN3ZXIgYmVpbmcgc3VibWl0dGVkP1xyXG52YXIgc3VibWl0ID0gdHJ1ZTtcclxuXHJcbi8vanF1ZXJ5IGtleXVwIGV2ZW50XHJcbiQoXCIjcmV2LWlucHV0XCIpLmtleXVwKGZ1bmN0aW9uIChlKSB7XHJcblx0Ly9mdW5jdGlvbnM6XHJcblx0Ly8gIGlucHV0Q29ycmVjdCgpXHJcblxyXG5cdC8vY2hlY2sgaWYga2V5IHByZXNzIHdhcyAnZW50ZXInIChrZXlDb2RlIDEzKSBvbiB0aGUgd2F5IHVwXHJcblx0Ly9hbmQga2V5c3RhdGUgdHJ1ZSAoYW5zd2VyIGJlaW5nIHN1Ym1pdHRlZClcclxuXHQvL2FuZCBjdXJzb3IgaXMgZm9jdXNlZCBpbiByZXZpZXdmaWVsZFxyXG5cdGlmIChlLmtleUNvZGUgPT0gMTMgJiYgc3VibWl0ID09PSB0cnVlKSB7XHJcblx0XHR2YXIgaW5wdXQgPSAkKFwiI3Jldi1pbnB1dFwiKS52YWwoKTtcclxuXHRcdHZhciByZXZpZXdMaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1SZXZpZXcnKXx8W107XHJcblx0XHR2YXIgcm5kID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnV0tTUy1ybmQnKXx8MDtcclxuXHJcblx0XHR2YXIgaXRlbSA9IHNlc3Npb25HZXQoJ1dLU1MtaXRlbScpO1xyXG5cclxuXHRcdC8vLS0gc3RhcnRpbmcgaW1wbGVtZW50YXRpb24gb2YgZm9yZ2l2ZW5lc3MgcHJvdG9jb2xcclxuXHJcblx0XHRpdGVtLmZvcmdpdmUgPSBbXTsvL1wi44KG44KL44GZXCJdOyAvL3BsYWNlaG9sZGVyICjoqLHjgZkgdG8gZm9yZ2l2ZSlcclxuXHJcblxyXG5cdFx0aWYgKGl0ZW0gPT09IG51bGwpe1xyXG5cdFx0XHRhbGVydChcIkl0ZW0gTnVsbD8/XCIpO1xyXG5cdFx0XHRyZXZpZXdMaXN0LnNwbGljZShybmQsIDEpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdC8vaGFuZGxlIGdyYWRpbmcgYW5kIHN0b3Jpbmcgc29sdXRpb25cclxuXHJcblx0XHRcdC8vY2hlY2sgZm9yIGlucHV0LCBkbyBub3RoaW5nIGlmIG5vbmVcclxuXHRcdFx0aWYoaW5wdXQubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vZGlzYWJsZSBpbnB1dCBhZnRlciBzdWJtaXNzaW9uXHJcblx0XHRcdC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0XHQvL3dhcyB0aGUgaW5wdXQgY29ycmVjdD9cclxuXHRcdFx0dmFyIGNvcnJlY3QgPSBpbnB1dENvcnJlY3QoKTtcclxuXHJcblx0XHRcdC8vd2FzIHRoZSBpbnB1dCBmb3JnaXZlbj9cclxuXHRcdFx0dmFyIGZvcmdpdmVuID0gKGl0ZW0uZm9yZ2l2ZS5pbmRleE9mKGlucHV0KSAhPT0gLTEpO1xyXG5cclxuXHRcdFx0aWYgKGNvcnJlY3QpIHtcclxuXHRcdFx0XHQvL2hpZ2hsaWdodCBpbiAoZGVmYXVsdCkgZ3JlZW5cclxuXHRcdFx0XHQkKFwiI3Jldi1pbnB1dFwiKS5hZGRDbGFzcyhcImNvcnJlY3RcIik7XHJcblx0XHRcdFx0Ly9zaG93IGFuc3dlclxyXG5cdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLmFkZENsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0fSBlbHNlIGlmIChmb3JnaXZlbil7XHJcblx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJjYXV0aW9uXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vaGlnaGlnaHQgaW4gcmVkXHJcblx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdFx0XHQvL3Nob3cgYW5zd2VyXHJcblx0XHRcdFx0JChcIiNyZXYtc29sdXRpb25cIikuYWRkQ2xhc3MoXCJpbmZvXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL3JlbW92ZSBmcm9tIHNlc3Npb25MaXN0IGlmIGNvcnJlY3RcclxuXHRcdFx0aWYgKGNvcnJlY3QpIHtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiY29ycmVjdCBhbnN3ZXJcIik7XHJcblx0XHRcdFx0aWYgKHJldmlld0xpc3QgIT09IG51bGwpe1xyXG5cdFx0XHRcdFx0dmFyIG9sZGxlbiA9IHJldmlld0xpc3QubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdHJldmlld0xpc3Quc3BsaWNlKHJuZCwgMSk7XHJcblx0XHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2Vzc2lvbkxpc3QubGVuZ3RoOiBcIisgb2xkbGVuICtcIiAtPiBcIityZXZpZXdMaXN0Lmxlbmd0aCk7XHJcblxyXG5cdFx0XHRcdFx0Ly9yZXBsYWNlIHNob3J0ZXIgKGJ5IG9uZSkgc2Vzc2lvbkxpc3QgdG8gc2Vzc2lvblxyXG5cdFx0XHRcdFx0aWYgKHJldmlld0xpc3QubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzZXNzaW9uTGlzdC5sZW5ndGg6IFwiKyByZXZpZXdMaXN0Lmxlbmd0aCk7XHJcblx0XHRcdFx0XHRcdHNlc3Npb25TZXQoJ1VzZXItUmV2aWV3JywgSlNPTi5zdHJpbmdpZnkocmV2aWV3TGlzdCkpO1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vcmV2ZWl3IG92ZXIsIGRlbGV0ZSBzZXNzaW9ubGlzdCBmcm9tIHNlc3Npb25cclxuXHRcdFx0XHRcdFx0c2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1SZXZpZXcnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogbm8gcmV2aWV3IHNlc3Npb24gZm91bmRcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQvLyAgIGlmKGZvcmdpdmVuKXtcclxuXHRcdFx0XHQvLyAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhpbnB1dCArXCIgaGFzIGJlZW4gZm9yZ2l2ZW4uIFwiK2l0ZW0udHlwZSk7XHJcblx0XHRcdFx0Ly8gICByZXR1cm47XHJcblx0XHRcdFx0Ly99XHJcblx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIndyb25nIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXRlbSA9IG1hcmtBbnN3ZXIoaXRlbSk7XHJcblxyXG5cdFx0XHRzZXNzaW9uU2V0KGl0ZW0uaW5kZXgsIGl0ZW0pO1xyXG5cclxuXHJcblx0XHRcdHZhciBsaXN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiVXNlci1TdGF0c1wiKSl8fFtdO1xyXG5cdFx0XHR2YXIgZm91bmQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChsaXN0KXtcclxuXHRcdFx0XHR2YXIgaSA9IGxpc3QubGVuZ3RoO1xyXG5cdFx0XHRcdHdoaWxlKGktLSl7XHJcblx0XHRcdFx0XHRpZiAobGlzdFtpXS5pbmRleCA9PSBpdGVtLmluZGV4KSB7XHJcblx0XHRcdFx0XHRcdGxpc3RbaV0gPSBpdGVtO1x0XHRcdFx0XHRcdFx0XHQvL3JlcGxhY2UgaXRlbSBpZiBpdCBleGlzdHNcclxuXHRcdFx0XHRcdFx0Zm91bmQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoIWZvdW5kKXtcclxuXHRcdFx0XHRcdGxpc3QgPSBzYXZlVG9Tb3J0ZWRMaXN0KGxpc3QsaXRlbSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaXN0ID0gW2l0ZW1dO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXNzaW9uU2V0KFwiVXNlci1TdGF0c1wiLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcblx0XHRcdC8vcGxheUF1ZGlvKCk7XHJcblxyXG5cdFx0XHQvL2Fuc3dlciBzdWJtaXR0ZWQsIG5leHQgJ2VudGVyJyBwcm9jZWVkcyB3aXRoIHNjcmlwdFxyXG5cdFx0XHRzdWJtaXQgPSBmYWxzZTtcclxuXHRcdH0vL251bGwgZ2FyYmFnZSBjb2xsZWN0aW9uXHJcblx0fVxyXG5cdGVsc2UgaWYgKGUua2V5Q29kZSA9PSAxMyAmJiBzdWJtaXQgPT09IGZhbHNlKSB7XHJcblx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwia2V5c3RhdCA9IFwiICsgc3VibWl0KTtcclxuXHJcblx0XHQvL3RoZXJlIGFyZSBzdGlsbCBtb3JlIHJldmlld3MgaW4gc2Vzc2lvbj9cclxuXHRcdGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVJldmlldycpKSB7XHJcblx0XHRcdC8vIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJmb3VuZCBhICdVc2VyLVJldmlldyc6IFwiICsgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwicmVmcmVzaGluZyByZXZpZXdMaXN0IGZyb20gc3RvcmFnZVwiKTtcclxuXHRcdFx0XHR2YXIgcmV2aWV3TGlzdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSk7XHJcblxyXG5cdFx0XHRcdC8vY3VlIHVwIGZpcnN0IHJlbWFpbmluZyByZXZpZXdcclxuXHRcdFx0XHRuZXh0UmV2aWV3KHJldmlld0xpc3QpO1xyXG5cdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJjaGVja2luZyBmb3IgZW1wdHkgcmV2aWV3TGlzdFwiKTtcclxuXHRcdFx0XHRpZiAocmV2aWV3TGlzdC5sZW5ndGggPT09IDApe1xyXG5cclxuXHRcdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzZXNzaW9uIG92ZXIuIHJldmlld0xpc3Q6IFwiK0pTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuXHRcdFx0XHRcdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJVc2VyLVJldmlld1wiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0XHQkKFwiI3Jldi1zb2x1dGlvblwiKS5yZW1vdmVDbGFzcyhcImluZm9cIik7XHJcblx0XHRcdFx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpLmZhZGVJbignZmFzdCcpO1xyXG5cclxuXHRcdFx0fSwgMSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gbm8gcmV2aWV3IHN0b3JlZCBpbiBzZXNzaW9uLCByZXZpZXcgaXMgb3ZlclxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdFx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG5cdFx0XHRcdC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0JChcIiNyZXYtc29sdXRpb25cIikucmVtb3ZlQ2xhc3MoXCJpbmZvXCIpO1xyXG5cdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzaG93UmVzdWx0c1wiKTtcclxuXHRcdFx0XHRzaG93UmVzdWx0cygpO1xyXG5cdFx0XHRcdCQoXCIjcmVzdWx0d2luZG93XCIpLnNob3coKTtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2hvd1Jlc3VsdHMgY29tcGxldGVkXCIpO1xyXG5cclxuXHRcdFx0XHQvLyovICAvL2NsZWFyIHNlc3Npb25cclxuXHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG5cdFx0XHRcdHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHJcblx0XHRcdH0sIDEpO1xyXG5cdFx0fVxyXG5cdFx0c3VibWl0ID0gdHJ1ZTtcclxuXHJcblx0fVxyXG59KTtcclxuXHQvKiogcG9wdWxhdGUgcmV2aWV3cyB3aGVuIG1lbnUgYnV0dG9uIHByZXNzZWRcclxuXHQqL1xyXG4gICAgd2luZG93LmdlbmVyYXRlUmV2aWV3TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vaWYgbWVudSBpcyBpbnZpc2libGUsIGl0IGlzIGFib3V0IHRvIGJlIHZpc2libGVcclxuICAgICAgICBpZiAoICQoXCIjV0tTU19kcm9wZG93blwiKS5pcyhcIjpoaWRkZW5cIikgKXtcclxuICAgICAgICAgICAgLy9UaGlzIGlzIHJlYWxseSB0aGUgb25seSB0aW1lIGl0IG5lZWRzIHRvIHJ1blxyXG4gICAgICAgICAgICAvL3VubGVzcyB3ZSB3YW50IHRvIHN0YXJ0IHVwZGF0aW5nIGluIHJlYWx0aW1lIGJ5IGtlZXBpbmcgdHJhY2sgb2YgdGhlIHNvb25lc3QgaXRlbVxyXG4gICAgICAgICAgICBnZW5lcmF0ZVJldmlld0xpc3QocmV2aWV3QWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cdC8qKiAgQWRkIEl0ZW06IGV2ZW50IGZ1bmN0aW9uIHRvIG9wZW4gXCJhZGQgd2luZG93XCIgYW5kIGNsb3NlIGFueSBvdGhlciB3aW5kb3cgdGhhdCBtaWdodCBiZSBvcGVuIGF0IHRoZSB0aW1lLlxyXG5cdCovXHJcbiAgICB3aW5kb3cuV0tTU19hZGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9zaG93IHRoZSBhZGQgd2luZG93XHJcbiAgICAgICAgJChcIiNhZGRcIikuc2hvdygpO1xyXG4gICAgICAgIC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcbiAgICAgICAgJChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuICAgIH07XHJcblx0XHJcblx0dmFyIGFkZEVsZW1lbnQgPSByZXF1aXJlKCcuL2FkZGVsZW1lbnQuanMnKTtcclxuXHQvL2FkZCBodG1sIHRvIHBhZ2Ugc291cmNlXHJcbiAgICAkKFwiYm9keVwiKS5hcHBlbmQoYWRkRWxlbWVudCk7XHJcbiAgICAvL2hpZGUgYWRkIHdpbmRvdyAoXCJkaXYgYWRkXCIgY29kZSB0aGF0IHdhcyBqdXN0IGFwcGVuZGVkKVxyXG4gICAgJChcIiNhZGRcIikuaGlkZSgpO1xyXG5cclxuICAgIHZhciBoYW5kbGVBZGRDbGljayA9IHJlcXVpcmUoJy4vaGFuZGxlQWRkQ2xpY2suanMnKTtcclxuXHRcclxuICAgIC8vZnVuY3Rpb24gdG8gZmlyZSBvbiBjbGljayBldmVudCBmb3IgXCJBZGQgbmV3IEl0ZW1cIlxyXG4gICAgJChcIiNBZGRJdGVtQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBoYW5kbGVBZGRDbGljaygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNBZGRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNhZGRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjYWRkRm9ybVwiKVswXS5yZXNldCgpO1xyXG4gICAgICAgICQoXCIjYWRkU3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGFkZC4uJyk7XHJcbiAgICAgICAgJChcIiNhZGRLYW5qaVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG4gICAgICAgICQoXCIjYWRkTWVhbmluZ1wiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqIEtlZXBzIGxlZ2FjeSBzcnNMaXN0IHVwZGF0ZWQuXHJcblx0KiBAZGVwcmVjaWF0ZVxyXG5cdCogQHBhcmFtIHtTcnNJdGVtfSBzcnNpdGVtXHJcblx0KiBAcGFyYW0ge0FycmF5LjxTcnNJdGVtPn0gc3JzTGlzdFxyXG5cdCogQHJldHVybnMge0FycmF5LjxTcnNJdGVtPn0gVGhlIHNycyBkYXRhIGZvciBhIHRhc2suIE9yIG51bGwgaWYgbm8gc3JzTGlzdCB3YXMgcHJvdmlkZWQuXHJcblx0Ki9cclxuICAgIHZhciB1cGRhdGVTcnNJbkxpc3QgPSBmdW5jdGlvbihzcnNpdGVtLCBzcnNMaXN0KXtcclxuICAgICAgICB2YXIgaW5kZXggPSBzcnNpdGVtLmk7XHJcbiAgICAgICAgaWYoc3JzTGlzdCl7XHJcbiAgICAgICAgICAgIGlmKHNyc0xpc3RbaW5kZXhdLmthbmppPT09c3JzaXRlbS5rYW5qaSl7Ly8gdHJ5IHNlYXJjaCBieSBpbmRleFxyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInN1Y2Nlc3M6IFwiK3Nyc2l0ZW0ua2FuamkrXCIgZm91bmQgYXQgaW5kZXggXCIrIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vcmVwbGFjZSBvbmx5IHRoZSBzcnMgcGFydHMgb2YgdGhlIGl0ZW1cclxuICAgICAgICAgICAgICAgIHNyc0xpc3RbaW5kZXhdLmRhdGUgPSBzcnNpdGVtLmRhdGU7XHJcbiAgICAgICAgICAgICAgICBzcnNMaXN0W2luZGV4XS5sZXZlbCA9IHNyc2l0ZW0ubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBzcnNMaXN0W2luZGV4XS5sb2NrZWQgPSBzcnNpdGVtLmxvY2tlZDtcclxuICAgICAgICAgICAgICAgIHNyc0xpc3RbaW5kZXhdLm1hbnVhbExvY2sgPSBzcnNpdGVtLm1hbnVhbExvY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNyc0xpc3Q7XHJcbiAgICAgICAgfVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcbiAgICB9O1xyXG4gICAgLyoqIENoZWNrcyBpZiBhbiBpdGVtJ3Mga2FuamkgaXMgcmVwcmVzZW50ZWQgaW4gYSBsaXN0XHJcblx0KiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQqL1xyXG4gICAgdmFyIGNoZWNrRm9yRHVwbGljYXRlcyA9IGZ1bmN0aW9uKGxpc3QsIGl0ZW0pe1xyXG5cdFx0cmV0dXJuIGxpc3Quc29tZShmdW5jdGlvbihhKXtyZXR1cm4gYS5rYW5qaSA9PT0gaXRlbS5rYW5qaTt9KTtcclxuXHR9O1xyXG5cclxuXHQvKiogQ3JlYXRlcyBhIGxvb2t1cCBhcnJheSBmb3IgZWFjaCBrYW5qaSB3aXRoIGl0cyBzcnMgbGV2ZWwuIFVzZWQgZm9yIGRpc3BsYXlpbmcgY29tcG9uZW50IGxldmVscy5cclxuXHQqIEBwYXJhbSBpdGVtXHJcblx0KiBAcGFyYW0ga2FuamlsaXN0XHJcblx0KiBAcmV0dXJucyBBbiBhcnJheSBvZiB0aGUga2Fuamkgd2l0aCBTUlMgdmFsdWVzIGZvciBlYWNoIGthbmppIGNvbXBvbmVudC5cclxuXHQqIEBleGFtcGxlXHJcbiAgICAgICAgZWcuIOaKmOOCiue0mTpcclxuICAgICAgICBjb21wU1JTID0gW3tcImthbmppXCI6IFwi5oqYXCIsIFwic3JzXCI6IFwiZ3VydVwifSwge1wia2FuamlcIjogXCLntJlcIiwgXCJzcnNcIjogXCJhcHByZW50aWNlXCJ9XVxyXG5cdCovXHJcbiAgICB2YXIgZ2V0Q29tcEthbmppID0gZnVuY3Rpb24oaXRlbSwga2FuamlMaXN0KXtcclxuICAgICAgICBpZiAoIWthbmppTGlzdCl7XHJcbiAgICAgICAgICAgIGthbmppTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiZ2V0Q29tcEthbmppKGl0ZW0sIGthbmppTGlzdClcIik7XHJcblxyXG4gICAgICAgIHZhciBjb21wU1JTID0gW107XHJcbiAgICAgICAgdmFyIGthbmppUmVhZHkgPSBmYWxzZTsgLy9pbmRpY2F0ZXMgaWYgdGhlIGthbmppTGlzdCBoYXMgYmVlbiBwb3B1bGF0ZWRcclxuICAgICAgICB2YXIgdXNlckd1cHB5ID0gZmFsc2U7IC8vaW5kaWNhdGVzIGlmIGthbmppTGlzdCBoYXMgbGVzcyB0aGFuIDEwMCBpdGVtc1xyXG4gICAgICAgIHZhciBrYW5qaU9iaiA9IHt9O1xyXG5cclxuICAgICAgICAvL2hhcyB0aGUgc2VydmVyIHJlc3BvbmRlZCB5ZXRcclxuICAgICAgICBpZiAoa2FuamlMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwia2FuamlMaXN0IGlzID4gMFwiKTtcclxuICAgICAgICAgICAga2FuamlSZWFkeSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL2NyZWF0ZSBsb29rdXAgb2JqZWN0XHJcbiAgICAgICAgICAgIGZvciAodmFyIGs9MDtrPGthbmppTGlzdC5sZW5ndGg7aysrKXtcclxuICAgICAgICAgICAgICAgIGthbmppT2JqW2thbmppTGlzdFtrXS5jaGFyYWN0ZXJdID0ga2FuamlMaXN0W2tdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2lzIHRoZXJlIGxlc3MgdGhhbiAxMDAga2FuamkgaW4gdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIGlmIChrYW5qaUxpc3QubGVuZ3RoIDwgMTAwKXtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJrYW5qaUxpc3QgaXMgPCAxMDBcIik7XHJcbiAgICAgICAgICAgICAgICB1c2VyR3VwcHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBpdGVtLmNvbXBvbmVudHM7XHJcbiAgICAgICAgLy9mb3IgZWFjaCBrYW5qaSBjaGFyYWN0ZXIgY29tcG9uZW50XHJcbiAgICAgICAgLy8gICAgdGhpcyBpcyB0aGUgb3V0ZXIgbG9vcCBzaW5jZSB0aGVyZSB3aWxsIGJlIGZhciBsZXNzIG9mIHRoZW0gdGhhbiBrYW5qaUxpc3RcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7IGkrKyl7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL2ZvciBlYWNoIGthbmppIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXJcclxuICAgICAgICAgICAgLy8gZm9yKHZhciBqPTA7IGo8a2FuamlMaXN0Lmxlbmd0aDsgaisrKXtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgdGhlIGthbmppIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXIgbWF0Y2hlcyB0aGUgY2hhcmFjdGVyIGluIHRoZSBpdGVtXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2FuamlPYmpbY29tcG9uZW50c1tpXV0gIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgaWYgKGthbmppTGlzdFtqXS5jaGFyYWN0ZXIgPT0gY29tcG9uZW50c1tpXSl7XHJcbiAgICAgICAgICAgICAgICBjb21wU1JTW2ldID0ge1wia2FuamlcIjogY29tcG9uZW50c1tpXSwgXCJzcnNcIjoga2FuamlPYmpbY29tcG9uZW50c1tpXV0uc3JzfTtcclxuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJyZWFrOyAvL2thbmppIGZvdW5kOiAnaScgaXMgaXRzIHBvc2l0aW9uIGluIGl0ZW0gY29tcG9uZW50czsgJ2onIGlzIGl0cyBwb3N0aW9uIGluIHRoZSAna2FuamlMaXN0JyBzZXJ2ZXIgcmVzcG9uc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hlZCA9PT0gZmFsc2UpeyAvLyBjaGFyYWN0ZXIgZ290IGFsbCB0aGUgd2F5IHRocm91Z2gga2FuamlMaXN0IHdpdGhvdXQgYSBtYXRjaC5cclxuICAgICAgICAgICAgICAgIGlmIChrYW5qaVJlYWR5KXsgLy93YXMgdGhlcmUgYSBzZXJ2ZXIgcmVzcG9uc2U/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJHdXBweSl7IC8vaXMgdGhlIHVzZXIgYSBndXBweSAoa2FuamkgcHJvYmFibHkgbWF0Y2hlcyBhIHR1cnRsZXMgcmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJtYXRjaGVkPWZhbHNlLCBrYW5qaUxpc3QubGVuZ3RoOiBcIitrYW5qaUxpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcFNSU1tpXSA9IHtcImthbmppXCI6IGNvbXBvbmVudHNbaV0sIFwic3JzXCI6IFwibm9NYXRjaEd1cHB5XCJ9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdGVsc2V7IC8vdXNlciBpcyBhIHR1cnRsZSwga2FuamkgbXVzdCBub3QgaGF2ZSBiZWVuIGFkZGVkIHRvIFdLICh5ZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJtYXRjaGVkPWZhbHNlLCBrYW5qaUxpc3QubGVuZ3RoOiBcIitrYW5qaUxpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcFNSU1tpXSA9IHtcImthbmppXCI6IGNvbXBvbmVudHNbaV0sIFwic3JzXCI6IFwibm9NYXRjaFdLXCJ9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJtYXRjaGVkPWZhbHNlLCBrYW5qaVJlYWR5PWZhbHNlLCBub1NlcnZlclJlc3BcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcFNSU1tpXSA9IHtcImthbmppXCI6IGNvbXBvbmVudHNbaV0sIFwic3JzXCI6IFwibm9TZXJ2ZXJSZXNwXCJ9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wU1JTO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyIGlzS2FuamlMb2NrZWQgPSBmdW5jdGlvbihzcnNpdGVtLCBrYW5qaUxpc3QsIGxvY2tzT24pe1xyXG4gICAgICAgIC8vaXRlbSB1bmxvY2tlZCBieSBkZWZhdWx0XHJcbiAgICAgICAgLy9tYXkgaGF2ZSBubyBrYW5qaSwgb25seSB1bmxvY2tlZCBrYW5qaSB3aWxsIGdldCB0aHJvdWdoIHRoZSBjb2RlIHVuZmxhZ2dlZFxyXG5cclxuXHRcdC8vIEVudW1lcmF0aW9uIFwieWVzXCIsIFwibm9cIiwgXCJEQlwiXHJcbiAgICAgICAgdmFyIGxvY2tlZCA9IFwibm9cIjtcclxuICAgICAgICBpZiAobG9ja3NPbil7XHJcbiAgICAgICAgICAgIC8vZ2V0IHRoZSBrYW5qaSBjaGFyYWN0ZXJzIGluIHRoZSB3b3JkLlxyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50TGlzdCA9IGdldENvbXBLYW5qaShzcnNpdGVtLCBrYW5qaUxpc3QpO1xyXG4gICAgICAgICAgICAvLyBlZzogY29tcG9uZW50TGlzdCA9IGdldENvbXBLYW5qaShcIuaKmOOCiue0mVwiLCBrYW5qaUxpc3QpO1xyXG4gICAgICAgICAgICAvLyBjb21wb25lbnRMaXN0ID0gW3tcImthbmppXCI6IFwi5oqYXCIsIFwic3JzXCI6IFwiZ3VydVwifSwge1wia2FuamlcIjogXCLntJlcIiwgXCJzcnNcIjogXCJhcHByZW50aWNlXCJ9XVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBjID0gY29tcG9uZW50TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHdoaWxlKGMtLSl7XHJcbiAgICAgICAgICAgICAgICAvL2xvb2sgZm9yIGxvY2tlZCBrYW5qaSBpbiBsaXN0XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50TGlzdFtjXS5zcnMgPT0gXCJhcHByZW50aWNlXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRMaXN0W2NdLnNycyA9PSBcIm5vU2VydmVyUmVzcFwifHxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRMaXN0W2NdLnNycyA9PSBcInVucmVhY2hlZFwiXHJcbiAgICAgICAgICAgICAgICAgICApe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy0tLS1jb3VsZCBiZSBhcHByZW50aWNlIGV0Yy5cclxuICAgICAgICAgICAgICAgICAgICAvL1NpbXBsZTogbG9jayBpcyAneWVzJ1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IFwieWVzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJ5ZXNcIjpcdGl0ZW0gd2lsbCBiZSBsb2NrZWQgd2hpbGUgdGhlcmUgaXMgbm8gZGF0YWJhc2UgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAvL1x0XHRcdGlmIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW5kaWNhdGVzIHRoYXQgaXQgaGFzIGJlZW4gdW5sb2NrZWQsIG9ubHkgdGhlbiB3aWxsIGl0IGJlIGF2YWlsYWJsZSBmb3IgcmV2aWV3XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ0ZXN0IHNycyBmb3IgYXBwcmVudGljZSBldGMuICdsb2NrZWQnOiBcIisgbG9ja2VkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhjb21wb25lbnRMaXN0W2NdLmthbmppICtcIjogXCIrY29tcG9uZW50TGlzdFtjXS5zcnMgK1wiIC0+IFwiKyBsb2NrZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gYXMgc29vbiBhcyBvbmUga2FuamkgaXMgbG9ja2VkLCB0aGUgd2hvbGUgaXRlbSBpcyBsb2NrZWRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0RCIGxvY2tzIGdldCBzcGVjaWFsIHN0YXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50TGlzdFtjXS5zcnMgPT0gXCJub01hdGNoV0tcIiB8fCBjb21wb25lbnRMaXN0W2NdLnNycyA9PSBcIm5vTWF0Y2hHdXBweVwiKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gXCJEQlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXCJEQlwiXHQ6IGRhdGFiYXNlIGxpbWl0YXRpb25zLCBvbmUgb2YgdHdvIHRoaW5nc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYS4gdGhlIGthbmppIGlzbid0IGluIHRoZSBkYXRhYmFzZSBhbmQgdGhlIHVzZXIgaXMgYSBndXBweSAtLWNvdWxkIGNoYW5nZSBpZiB1c2VyIHN1YnNjcmliZXMgb3IgZmlyc3QgdHdvIGxldmVscyBjaGFuZ2UvZXhwYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgLy9iLiB0aGUga2FuamkgaXNuJ3QgaW4gdGhlIGRhdGFiYXNlIGFuZCB0aGUgdXNlciBpcyBhIHR1cnRsZSAtLWNvdWxkIGNoYW5nZSBpZiBtb3JlIGthbmppIGFkZGVkLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwidGVzdCBzcnMgZm9yIHVubWF0Y2hlZCBrYW5qaS4gJ2xvY2tlZCc6IFwiKyBsb2NrZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGNvbXBvbmVudExpc3RbY10ua2FuamkgK1wiOiBcIitjb21wb25lbnRMaXN0W2NdLnNycyArXCIgLT4gXCIrIGxvY2tlZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gLy9mb3IgY2hhciBpbiBjb21wb25lbnRMaXN0XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJvdXQgb2YgY2hhcmFjdGVyIGxvb3BcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbG9ja2VkIHdpbGwgYmUgZWl0aGVyIFwieWVzXCIsXCJub1wiLCBvciBcIkRCXCJcclxuICAgICAgICByZXR1cm4gW2xvY2tlZF07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBHZXRzIHRoZSBLYW5qaSBjaGFyYWN0ZXJzIGluIGEgZ2l2ZW4gc3RyaW5nLlxyXG5cdCogQHBhcmFtIHtzdHJpbmd9IHZvY2FiU3RyaW5nIC1cclxuXHQqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBBbiBhcnJheSBvZiB0aGUga2FuamkgY29tcG9uZW50cyBpbiB0aGUgZ2l2ZW4gc3RyaW5nXHJcblx0Ki9cclxuICAgIHZhciBnZXRDb21wb25lbnRzID0gZnVuY3Rpb24odm9jYWJTdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodm9jYWJTdHJpbmcsIGZ1bmN0aW9uKGNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIC9eW1xcdTRlMDAtXFx1OWZhZl0rJC8udGVzdChjaCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBNYW5hZ2VzIHRoZSBsb2NrZWQgYW5kIG1hbnVhbExvY2sgcHJvcGVydGllcyBvZiBzcnNpdGVtLiBUaGlzIGlzIHRvIHN0b3AgaXRlbXMgYmVpbmcgbG9ja2VkIGFnYWluIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIHVubG9ja2VkIGlmIGFueSBvZiB0aGUga2FuamkgdXNlZCBmYWxscyBiZWxvdyB0aGUgdW5sb2NrIHRocmVzaG9sZCAoZWcuIGlmIHRoZSDli4kgaW4g5YuJ5by3IGZhbGxzIGJhY2sgdG8gYXBwcmVudGljZSwgd2UgZG8gbm90IHdhbnQgdG8gbG9jayB1cCDli4nlvLcgYWdhaW4uKVxyXG5cdCogQHBhcmFtIHtPYmplY3R9IGl0ZW1cclxuXHQqIEBwYXJhbSB7c3RyaW5nfSBpdGVtLmxvY2tlZCAtIChTdHJpbmcgZW51bWVyYXRpb24pIEEgcmVhbCB0aW1lIGV2YWx1YXRpb24gb2YgdGhlIGl0ZW0gKGlzIGFueSBvZiB0aGUga2FuamkgaW4gdGhlIHdvcmQgbG9ja2VkPylcclxuXHQqIEBwYXJhbSB7c3RyaW5nfSBpdGVtLm1hbnVhbExvY2sgLSAoU3RyaW5nIGVudW1lcmF0aW9uKSBXaWxsIHJldHVybiAnbm8nIGlmIC5sb2NrZWQgaGFzIGV2ZXIgcmV0dXJuZWQgJ25vJy5cclxuXHQqIEByZXR1cm5zIHtJVGFza30gaXRlbVxyXG5cdCovXHJcbiAgICB2YXIgc2V0TG9ja3MgPSBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAvL29uY2UgbWFudWFsTG9jayBpcyBcIm5vXCIgaXQgc3RheXMgXCJub1wiXHJcbiAgICAgICAgaWYgKGl0ZW0ubWFudWFsTG9jayAhPT0gZmFsc2UgJiYgaXRlbS5tYW51YWxMb2NrICE9PSBcIm5vXCIgJiYgaXRlbS5tYW51YWxMb2NrICE9PSBcIm5cIil7XHJcblxyXG4gICAgICAgICAgICB2YXIga2FuamlMaXN0ID0gbG9jYWxHZXQoJ1VzZXItS2FuamlMaXN0Jyl8fFtdO1xyXG5cclxuICAgICAgICAgICAgaXRlbS5jb21wb25lbnRzID0gZ2V0Q29tcG9uZW50cyhpdGVtLmthbmppKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrYW5qaUxvY2tlZFJlc3VsdCA9IGlzS2FuamlMb2NrZWQoaXRlbSwga2FuamlMaXN0LCBsb2Nrc09uKTtcclxuICAgICAgICAgICAgaXRlbS5sb2NrZWQgPSBrYW5qaUxvY2tlZFJlc3VsdFswXTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0ubWFudWFsTG9jayA9IGl0ZW0ubG9ja2VkO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpdGVtLm1hbnVhbExvY2sgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzZXR0aW5nIGxvY2tzIGZvciBcIisgaXRlbS5rYW5qaSArXCI6IGxvY2tlZDogXCIraXRlbS5sb2NrZWQrXCIsIG1hbnVhbExvY2s6IFwiKyBpdGVtLm1hbnVhbExvY2spO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH07XHJcbiAgICAvKiogQ29udmVydHMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbnRvIGEgcmVhZGFibGUgc3RyaW5nXHJcblx0KiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gYXBwcm94aW1hdGVcclxuXHQqIEByZXR1cm5zIHtzdHJpbmd9IFJlYWRhYmxlIHRpbWUgZnJhbWUgKCcyIG1vbnRocycsICczIGhvdXJzJywgJzEgd2VlaycgZXRjKS5cclxuXHQqL1xyXG5cdHZhciBtczJzdHIgPSBmdW5jdGlvbihtaWxsaXNlY29uZHMpe1xyXG4gICAgICAgIHZhciBudW07IC8vbnVtYmVyIG9mIG1vbnRocyB3ZWVrcyBob3VycyBldGNcclxuICAgICAgICAvL21vcmUgdGltZSBoYXMgZWxhcHNlZCB0aGFuIHJlcXVpcmVkIGZvciB0aGUgbGV2ZWxcclxuICAgICAgICBpZihtaWxsaXNlY29uZHMgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJOb3dcIiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbGxpc2Vjb25kcyA+IDI2MjgwMDAwMDApIHsvL0Fib3V0IGEgbW9udGhcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMvMjYyODAwMDAwMCkudG9TdHJpbmcoKStcIiBtb250aFwiO1xyXG4gICAgICAgICAgICBpZiAobnVtICE9PSBcIjEgbW9udGhcIil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtK1wic1wiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWlsbGlzZWNvbmRzID4gNjA0ODAwMDAwKSB7Ly9BIHdlZWtcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMvNjA0ODAwMDAwKS50b1N0cmluZygpK1wiIHdlZWtcIjtcclxuICAgICAgICAgICAgaWYgKG51bSAhPT0gXCIxIHdlZWtcIil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtK1wic1wiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWlsbGlzZWNvbmRzID4gODY0MDAwMDApIHsvL0EgZGF5XHJcbiAgICAgICAgICAgIG51bSA9IE1hdGguZmxvb3IobWlsbGlzZWNvbmRzLzg2NDAwMDAwKS50b1N0cmluZygpK1wiIGRheVwiO1xyXG4gICAgICAgICAgICBpZiAobnVtICE9PSBcIjEgZGF5XCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bStcInNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbGxpc2Vjb25kcyA+IDM2MDAwMDApIHsvL0FuIGhvdXJcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMvMzYwMDAwMCkudG9TdHJpbmcoKStcIiBob3VyXCI7XHJcbiAgICAgICAgICAgIGlmIChudW0gIT09IFwiMSBob3VyXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bStcInNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbGxpc2Vjb25kcyA+IDYwMDAwKSB7Ly9BIG1pbnV0ZVxyXG4gICAgICAgICAgICBudW0gPSBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcy82MDAwMCkudG9TdHJpbmcoKStcIiBtaW51dGVcIjtcclxuICAgICAgICAgICAgaWYgKG51bSAhPT0gXCIxIG1pbnV0ZVwiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW0rXCJzXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaWxsaXNlY29uZHMgPiAwKSB7Ly9BIHNlY29uZCBpcyAxMDAwLCBidXQgbmVlZCB0byByZXR1cm4gc29tZXRoaW5nIGZvciBsZXNzIHRoYW4gb25lIHRvb1xyXG4gICAgICAgICAgICBudW0gPSBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcy8xMDAwKS50b1N0cmluZygpK1wiIHNlY29uZFwiO1xyXG4gICAgICAgICAgICBpZiAobnVtICE9PSBcIjEgc2Vjb25kXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bStcInNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBSZXRyaWV2ZXMgdmFsdWVzIGZyb20gc3RvcmFnZSB0byBwb3B1bGF0ZSAnZWRpdEl0ZW1zJyBtZW51XHJcblx0Ki9cclxuICAgIHZhciBnZW5lcmF0ZUVkaXRPcHRpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0V2luZG93Jyk7XHJcbiAgICAgICAgLy9jbGVhciB0aGUgZWRpdFdpbmRvd1xyXG4gICAgICAgIHdoaWxlIChzZWxlY3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2hpbGQoc2VsZWN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NoZWNrIGZvciBpdGVtcyB0byBhZGRcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkge1xyXG5cclxuICAgICAgICAgICAgLy9yZXRyaWV2ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgdmFyIHNyc2xpc3QgPSAgU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAvL2J1aWxkIG9wdGlvbiBzdHJpbmdcclxuICAgICAgICAgICAgLy92YXIgaSA9IHZvY2FiTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vd2hpbGUgKGktLSl7XHJcblx0XHRcdHZvY2FiTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHRhc2spe1xyXG4gICAgICAgICAgICAgICAgLy9mb3JtIGVsZW1lbnQgdG8gc2F2ZSBzdHJpbmdcclxuICAgICAgICAgICAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2R5bmFtaWMgY29tcG9uZW50cyBvZiBzdHJpbmdcclxuXHJcbiAgICAgICAgICAgICAgICAvL3doZW4gaXMgdGhpcyBpdGVtIHVwIGZvciByZXZpZXdcclxuICAgICAgICAgICAgICAgIHZhciBkdWUgPSB0YXNrLmR1ZXx8dGFzay5kYXRlICsgc3JzT2JqZWN0W3Rhc2subGV2ZWxdLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldmlldyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9ubyBmdXR1cmUgcmV2aWV3cyBpZiBidXJuZWRcclxuICAgICAgICAgICAgICAgIGlmKHRhc2subGV2ZWwgPj0gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldyA9IFwiTmV2ZXJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSBuZXh0IHJlbGF0aXZlIHJldmlldyB0aW1lXHJcbiAgICAgICAgICAgICAgICAvL2N1cnJlbnQgdGltZXN0YW1wIGlzIHBhc3QgZHVlIGRhdGUuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKERhdGUubm93KCkgPj0gZHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3ID0gXCJOb3dcIiA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcgPSBtczJzdHIoZHVlIC0gRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgICAgICAgICB9Ly9lbmQgaWYgcmV2aWV3IGlzIG5vdCAnbmV2ZXInIG9yICdub3cnXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSB0YXNrLmthbmppICsgXCIgJiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGFzay5yZWFkaW5nICsgXCIgJiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgdGFzay5tZWFuaW5nICsgXCIgKFwiICtcclxuXHRcdFx0XHRcdHNyc09iamVjdFt0YXNrLmxldmVsXS5yYW5rICtcclxuXHRcdFx0XHRcdFwiIC0gUmV2aWV3OiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3ICsgXCIpIExvY2tlZDogXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2subWFudWFsTG9jaztcclxuXHJcbiAgICAgICAgICAgICAgICBvcHQudmFsdWUgPSBpO1xyXG4gICAgICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2gob3B0KTsvL2ZvciBmdXR1cmUgdXNlIChzb3J0aW5nIGRhdGEgZXRjKVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7Ly9leHBvcnQgaXRlbSB0byBvcHRpb24gbWVudVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIEVkaXQgSXRlbXNcclxuXHQqL1xyXG4gICAgd2luZG93LldLU1NfZWRpdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnZW5lcmF0ZUVkaXRPcHRpb25zKCk7XHJcbiAgICAgICAgJChcIiNlZGl0XCIpLnNob3coKTtcclxuICAgICAgICAvL2hpZGUgb3RoZXIgd2luZG93c1xyXG4gICAgICAgICQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNhZGRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuICAgIH07XHJcblx0dmFyIGJ1aWxkTm9kZSA9IHJlcXVpcmUoJy4vYnVpbGRub2RlLmpzJyk7XHJcblxyXG5cdHZhciBidWlsZFdpbmRvdyA9IHJlcXVpcmUoJy4vYnVpbGR3aW5kb3cuanMnKTtcclxuXHRcclxuXHQvKnZhciBhZGRFZGl0V2luZG93ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZWRpdFdpbmRvdyA9IGJ1aWxkTm9kZSgnZGl2Jywge2lkOiBcIldLU1MtZWRpdFwiLCBjbGFzc05hbWU6IFwiV0tTU1wifSk7XHJcblx0XHR2YXIgZWRpdEZvcm0gPSBidWlsZE5vZGUoJ2Zvcm0nLCB7aWQ6IFwiV0tTUy1lZGl0Rm9ybVwifSk7XHJcblx0XHRlZGl0V2luZG93LmFwcGVuZENoaWxkKGVkaXRGb3JtKTtcclxuXHRcdHZhciBlZGl0Q2xvc2VCdXR0b24gPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJXS1NTLWVkaXRDbG9zZUJ0blwiLCBjbGFzc05hbWU6IFwiV0tTUy1jbG9zZVwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0Q2xvc2VCdXR0b24pO1xyXG5cdFx0XHJcblx0XHRlZGl0Q2xvc2VCdXR0b24uYXBwZW5kQ2hpbGQoYnVpbGROb2RlKCdpJywge2NsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwifSkpO1xyXG5cdFx0dmFyIGgxRWxlbWVudCA9IGJ1aWxkTm9kZSgnaDEnKTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGgxRWxlbWVudCk7XHJcblx0XHRoMUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJFZGl0IHlvdXIgVm9jYWJcIikpO1xyXG5cdFx0dmFyIHNlbGVjdEVsZW1lbnQgPSBidWlsZE5vZGUoJ3NlbGVjdCcsIHtpZDogXCJlZGl0V2luZG93XCIsIHNpemU6IFwiOFwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChzZWxlY3RFbGVtZW50KTtcclxuXHRcdHZhciBlZGl0SXRlbVRleHQgPSBidWlsZE5vZGUoJ2lucHV0Jywge3R5cGU6IFwidGV4dFwiIGlkOiBcImVkaXRJdGVtXCIgbmFtZTogXCJcIiBzaXplOiBcIjQwXCIgcGxhY2Vob2xkZXI6IFwiU2VsZWN0IHZvY2FiLCBjbGljayBlZGl0LCBjaGFuZ2UgYW5kIHNhdmUhXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRJdGVtVGV4dCk7XHJcblx0XHR2YXIgZWRpdFN0YXR1cyA9IGJ1aWxkTm9kZSgncCcsIHtpZDogXCJlZGl0U3RhdHVzXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRTdGF0dXMpO1xyXG5cdFx0ZWRpdFN0YXR1cy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlJlYWR5IHRvIGVkaXQuLlwiKSk7XHJcblx0XHRcclxuXHRcdHZhciBlZGl0QnV0dG9uID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiRWRpdEVkaXRCdG5cIiwgdHlwZTogXCJidXR0b25cIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcblx0XHRlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWRpdFwiKSk7XHJcblx0XHR2YXIgZWRpdFNhdmUgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0U2F2ZUJ0blwiLCB0eXBlOiBcImJ1dHRvblwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0U2F2ZSk7XHJcblx0XHRlZGl0U2F2ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlNhdmVcIikpO1xyXG5cdFx0dmFyIGVkaXREZWxldGUgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0RGVsZXRlQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIkRlbGV0ZSBzZWxlY3RlZCBpdGVtXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXREZWxldGUpO1xyXG5cdFx0ZWRpdERlbGV0ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRlbGV0ZVwiKSk7XHJcblx0XHR2YXIgZWRpdERlbGV0ZUFsbCA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIkVkaXREZWxldGVBbGxCdG5cIiwgdHlwZTogXCJidXR0b25cIiwgdGl0bGU6IFwi5pys5b2T44Gr44KE44KL44Gu77yfXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXREZWxldGVBbGwpO1xyXG5cdFx0ZWRpdERlbGV0ZUFsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRlbGV0ZSBBbGxcIikpO1xyXG5cdFx0dmFyIGVkaXRSZXNldExldmVscyA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIlJlc2V0TGV2ZWxzQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRSZXNldExldmVscyk7XHJcblx0XHRlZGl0UmVzZXRMZXZlbHMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJSZXNldCBsZXZlbHNcIikpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gZWRpdFdpbmRvdztcclxuXHR9O1xyXG5cdCovXHJcblx0dmFyIGVkaXRXaW5kb3dTdHJ1Y3R1cmUgPSB7XHJcblx0aWQ6IFwiV0tTUy1lZGl0XCIsXHJcblx0Y2xhc3NOYW1lOiBcIldLU1NcIixcclxuXHRjaGlsZE5vZGVzOlt7XHJcblx0XHR0YWc6ICdmb3JtJyxcclxuXHRcdGlkOiBcIldLU1MtZWRpdEZvcm1cIixcclxuXHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiV0tTUy1lZGl0Q2xvc2VCdG5cIixcclxuXHRcdFx0Y2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIixcclxuXHRcdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHRcdHRhZzogJ2knLFxyXG5cdFx0XHRcdGNsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwiXHJcblx0XHRcdH1dXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnaDEnLFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkVkaXQgeW91ciBWb2NhYlwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ3NlbGVjdCcsXHJcblx0XHRcdGlkOiBcImVkaXRXaW5kb3dcIixcclxuXHRcdFx0b3RoZXI6IHtzaXplOiBcIjhcIn1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdpbnB1dCcsIFxyXG5cdFx0XHRvdGhlcjp7XHJcblx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0bmFtZTogXCJcIixcclxuXHRcdFx0XHRzaXplOiBcIjQwXCIsXHJcblx0XHRcdFx0cGxhY2Vob2xkZXI6IFwiU2VsZWN0IHZvY2FiLCBjbGljayBlZGl0LCBjaGFuZ2UgYW5kIHNhdmUhXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0aWQ6IFwiZWRpdEl0ZW1cIlxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ3AnLCBcclxuXHRcdFx0aWQ6IFwiZWRpdFN0YXR1c1wiLFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlJlYWR5IHRvIGVkaXQuLi5cIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RWRpdEJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkVkaXRcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0U2F2ZUJ0blwiLFxyXG5cdFx0XHRvdGhlcjp7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiU2F2ZVwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXREZWxldGVCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgaXRlbVwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJEZWxldGVcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RGVsZXRlQWxsQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIiwgdGl0bGU6IFwi5pys5b2T44Gr44KE44KL44Gu77yfXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkRlbGV0ZSBBbGxcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJSZXNldExldmVsc0J0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlJlc2V0IGxldmVsc1wiXVxyXG5cdFx0fV1cclxuXHR9XVxyXG59O1xyXG5cclxuICAgIHZhciBhZGRFZGl0V2luZG93ID0gYnVpbGRXaW5kb3coZWRpdFdpbmRvd1N0cnVjdHVyZSk7XHJcblx0JChcImJvZHlcIikuYXBwZW5kKGFkZEVkaXRXaW5kb3cpO1xyXG4gICAgJChcIiNXS1NTLWVkaXRcIikuaGlkZSgpO1xyXG5cclxuXHQvKiogUmVzZXRzIHRoZSBsZXZlbHMgb2YgYWxsIHRhc2tzIGFuZCByZS1pbmRleGVzIHRoZW0gaW4gc3RvcmFnZS5cclxuXHQqIEBwYXJhbSB7RXZlbnR9IGV2dCAtIENsaWNrIGV2ZW50IChub3QgdXNlZClcclxuXHQqL1xyXG5cdHZhciByZXNldExldmVscyA9IGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdHZhciB2b2NMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpLm1hcChmdW5jdGlvbih2b2NJdGVtLCBpKXtcclxuXHRcdFx0dm9jSXRlbS5sZXZlbCA9IDA7XHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ2b2NMaXN0W2ldLmkgYmVmb3JlOiBcIit2b2NJdGVtLmkpO1xyXG5cdFx0XHR2b2NJdGVtLmk9aTtcclxuXHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInZvY0xpc3RbaV0uaSBhZnRlcjogXCIrdm9jSXRlbS5pKTtcclxuXHRcdFx0cmV0dXJuIHZvY0l0ZW07XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdFN0b3JhZ2VVdGlsLnNldFZvY0xpc3Qodm9jTGlzdCk7XHJcbiAgICB9O1xyXG4gICAgJChcIiNSZXNldExldmVsc0J0blwiKS5jbGljayhyZXNldExldmVscyk7XHJcblxyXG4gICAgJChcIiNFZGl0RWRpdEJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9nZXQgaGFuZGxlIGZvciAnc2VsZWN0JyBhcmVhXHJcbiAgICAgICAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFdpbmRvd1wiKTtcclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIGluZGV4IGZvciB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1cclxuICAgICAgICB2YXIgaW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDsgLy9zZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWUgaXMgbm90IHJlcXVpcmVkLCBvcHRpb24gdmFsdWVzIGFyZSBzZXQgdG8gaW5kZXhcclxuICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgIHZvY2FiTGlzdCA9IHZvY2FiTGlzdC5yZXZlcnNlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZvY2FiTGlzdFtpbmRleF0pO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikubmFtZSA9IGluZGV4OyAvL3VzaW5nIG5hbWUgdG8gc2F2ZSB0aGUgaW5kZXhcclxuICAgICAgICAkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnTG9hZGVkIGl0ZW0gdG8gZWRpdCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgPT09IHZvaWQgMCB8fCB2YWx1ZSA9PT0gbnVsbCk7XHJcbiAgICB9O1xyXG5cdFxyXG5cdHZhciBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKXtcclxuXHRcdHJldHVybiBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheShhcmcpIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcblx0fTtcclxuXHJcbiAgICAvKiogVmFsaWRhdGVzIGEgdGFzayBvYmplY3RcclxuXHQqIEBwYXJhbSB7VGFza30gYWRkIC0gVGhlIFRhc2sgYmVpbmcgdmVyaWZpZWRcclxuXHQqIEByZXR1cm5zIHtCb29sZWFufSBJZiB0aGUgcHJvdmlkZWQgdGFzayBoYXMgYWxsIHRoZSBuZWNlc3NhcnkgcHJvcGVydGllcyB0byBiZSBhZGRlZCB0byB0aGUgcmV2aWV3IGxpc3QuXHJcblx0Ki9cclxuXHR2YXIgaXNJdGVtVmFsaWQgPSBmdW5jdGlvbihhZGQpIHtcclxuICAgICAgICByZXR1cm4gKCFpc0VtcHR5KGFkZC5rYW5qaSkgJiYgLy9rYW5qaSBwcm9wZXJ0eSBleGlzdHNcclxuXHRcdFx0IWlzRW1wdHkoYWRkLm1lYW5pbmcpICYmIC8vbWVhbmluZyBwcm9wZXJ0eSBleGlzdHNcclxuXHRcdFx0IWlzRW1wdHkoYWRkLnJlYWRpbmcpICYmIC8vcmVhZGluZyBwcm9wZXJ0eSBleGlzdHNcclxuXHRcdFx0aXNBcnJheShhZGQubWVhbmluZykgJiYvL21lYW5pbmcgaXMgYW4gYXJyYXlcclxuXHRcdFx0aXNBcnJheShhZGQucmVhZGluZykpOy8vcmVhZGluZyBpcyBhbiBhcnJheVxyXG4gICAgfTtcclxuXHJcbiAgICAkKFwiI0VkaXRTYXZlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vLS0gYmUgYXdhcmVcclxuXHRcdC8vZGVsZXRpbmcgb25lIGl0ZW0gbWF5IGNhdXNlIG1pc21hdGNoIGlmIGkgaXMgcHJvcGVydHkgb2YgaXRlbSBpbiBsaXN0XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoJChcIiNlZGl0SXRlbVwiKS52YWwoKS5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0XHR2YXIgZWRpdEl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZWRpdEl0ZW0ubmFtZTtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IEpTT04ucGFyc2UoZWRpdEl0ZW0udmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgd29yZCAnbWVhbmluZycgaXMgaW1tdXRhYmxlLCBzbyBpdCBleGlzdHMgdG8gdHJpbVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChpdGVtLm1lYW5pbmcpe1xyXG5cdFx0XHRcdFx0aXRlbS5tZWFuaW5nLmZvckVhY2goZnVuY3Rpb24obWVhbmluZywgbSwgbWVhbmluZ3Mpe1xyXG5cdFx0XHRcdFx0XHRpZiAobWVhbmluZyA9PT0gXCJcIil7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIG1lYW5pbmdzW21dO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LCB0aGlzKTtcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICB2YXIgZnVsbExpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCkucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0l0ZW1WYWxpZChpdGVtKSAmJi8vaXRlbSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICEoY2hlY2tGb3JEdXBsaWNhdGVzKGZ1bGxMaXN0LGl0ZW0pICYmIC8va2FuamkgKGlmIGNoYW5nZWQpIGlzIG5vdCBhbHJlYWR5IGluIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICBmdWxsTGlzdFtpbmRleF0ua2FuamkgIT09IGl0ZW0ua2FuamkpKSB7Ly91bmxlc3MgaXQgaXMgdGhlIGl0ZW0gYmVpbmcgZWRpdGVkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcnNsaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2dldCBzcnMgY29tcG9uZW50cyBvZiBpdGVtKGxpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpc3RbaW5kZXhdID0gaXRlbTsvL2RvZXMgbm90IGhhdmUgc3JzIHN0dWZmLCByZS1hZGQgaXQgbm93XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMaXN0W2luZGV4XS5kYXRlID0gc3JzbGlzdFtpbmRleF0uZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsTGlzdFtpbmRleF0ubGV2ZWwgPSBzcnNsaXN0W2luZGV4XS5sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsTGlzdFtpbmRleF0ubG9ja2VkID0gc3JzbGlzdFtpbmRleF0ubG9ja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMaXN0W2luZGV4XS5tYW51YWxMb2NrID0gc3JzbGlzdFtpbmRleF0ubWFudWFsTG9jaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpc3QgPSBmdWxsTGlzdC5yZXZlcnNlKCk7IC8vcmVzZXQgb3JkZXIgb2YgYXJyYXlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTZXQoJ1VzZXItVm9jYWInLCBmdWxsTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRWRpdE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2VkaXRTdGF0dXNcIikuaHRtbCgnU2F2ZWQgY2hhbmdlcyEnKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLm5hbWUgPSBcIlwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KCdJbnZhbGlkIGl0ZW0gb3IgZHVwbGljYXRlIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGlzSXRlbVZhbGlkKGl0ZW0pLnRvU3RyaW5nKCkgK1wiICYmIO+8gShcIisgY2hlY2tGb3JEdXBsaWNhdGVzKGZ1bGxMaXN0LGl0ZW0pLnRvU3RyaW5nKCkrXCIgJiYgIShcIitmdWxsTGlzdFtpbmRleF0ua2FuamkrXCIgIT09IFwiK2l0ZW0ua2FuamkrXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHQkKFwiI2VkaXRTdGF0dXNcIikudGV4dChlKTtcclxuXHRcdH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB1cGRhdGVFZGl0R1VJID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBnZW5lcmF0ZUVkaXRPcHRpb25zKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS5uYW1lID0gXCJcIjtcclxuICAgIH07XHJcblx0dmFyIGVkaXREZWxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9zZWxlY3Qgb3B0aW9ucyBlbGVtZW50IHdpbmRvd1xyXG4gICAgICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRXaW5kb3dcIik7XHJcblxyXG4gICAgICAgIC8vaW5kZXggb2Ygc2VsZWN0ZWQgaXRlbVxyXG4gICAgICAgIHZhciBpdGVtID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuICAgICAgICAvL2ZldGNoIEpTT04gc3RyaW5ncyBmcm9tIHN0b3JhZ2UgYW5kIGNvbnZlcnQgdGhlbSBpbnRvIEphdmFzY3JpcHQgbGl0ZXJhbHNcclxuICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG5cclxuICAgICAgICAvL3N0YXJ0aW5nIGF0IHNlbGVjdGVkIGluZGV4LCByZW1vdmUgMSBlbnRyeSAodGhlIHNlbGVjdGVkIGluZGV4KS5cclxuICAgICAgICBpZiAoaXRlbSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGlmICh2b2NhYkxpc3QgIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdm9jYWJMaXN0LnNwbGljZShpdGVtLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy95dWNrXHJcbiAgICAgICAgaWYgKHZvY2FiTGlzdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgbG9jYWxTZXQoJ1VzZXItVm9jYWInLCB2b2NhYkxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItVm9jYWInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZUVkaXRHVUkoKTtcclxuXHJcbiAgICAgICAgJChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0l0ZW0gZGVsZXRlZCEnKTtcclxuICAgIH07XHJcbiAgICAkKFwiI0VkaXREZWxldGVCdG5cIikuY2xpY2soZWRpdERlbGV0ZSk7XHJcblxyXG5cdHZhciBlZGl0RGVsZXRlQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWxldGVBbGwgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgZW50cmllcz9cIik7XHJcbiAgICAgICAgaWYgKGRlbGV0ZUFsbCkge1xyXG4gICAgICAgICAgICAvL2Ryb3AgbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1Wb2NhYicpO1xyXG4gICAgICAgICAgICB1cGRhdGVFZGl0R1VJKCk7XHJcbiAgICAgICAgICAgICQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KCdBbGwgaXRlbXMgZGVsZXRlZCEnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgJChcIiNFZGl0RGVsZXRlQWxsQnRuXCIpLmNsaWNrKGVkaXREZWxldGVBbGwpO1xyXG5cclxuICAgICQoXCIjRWRpdENsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZWRpdEZvcm1cIilbMF0ucmVzZXQoKTtcclxuICAgICAgICAkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnUmVhZHkgdG8gZWRpdC4uJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiogRXhwb3J0XHJcblx0Ki9cclxuICAgIHdpbmRvdy5XS1NTX2V4cG9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2V4cG9ydFwiKS5zaG93KCk7XHJcbiAgICAgICAgLy9oaWRlIG90aGVyIHdpbmRvd3NcclxuICAgICAgICAkKFwiI2FkZFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNpbXBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG4gICAgfTtcclxuXHJcblx0dmFyIGV4cG9ydFdpbmRvd1N0cnVjdHVyZSA9IHtcclxuXHRcdGlkOiBcIldLU1MtZXhwb3J0XCIsXHJcblx0XHRjbGFzc05hbWU6IFwiV0tTU1wiLFxyXG5cdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHR0YWc6ICdmb3JtJyxcclxuXHRcdFx0aWQ6IFwiV0tTUy1leHBvcnRGb3JtXCIsXHJcblx0XHRcdGNoaWxkTm9kZXM6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdFx0XHRpZDogXCJXS1NTLWV4cG9ydENsb3NlQnRuXCIsXHJcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiV0tTUy1jbG9zZVwiLFxyXG5cdFx0XHRcdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHRcdFx0XHR0YWc6ICdpJyxcclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImljb24tcmVtb3ZlXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdoMScsXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcIkV4cG9ydCBJdGVtc1wiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAndGV4dGFyZWEnLFxyXG5cdFx0XHRcdFx0aWQ6IFwiZXhwb3J0QXJlYVwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6IHtjb2xzOiBcIjUwXCIsIHJvd3M6IFwiMThcIiwgcGxhY2Vob2xkZXI6IFwiRXhwb3J0IHlvdXIgc3R1ZmYhIFNoYXJpbmcgaXMgY2FyaW5nIDspXCJ9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdwJywgXHJcblx0XHRcdFx0XHRpZDogXCJleHBvcnRTdGF0dXNcIixcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W1wiUmVhZHkgdG8gZXhwb3J0Li4uXCJdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRcdFx0aWQ6IFwiRXhwb3J0SXRlbXNCdG5cIixcclxuXHRcdFx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcIkV4cG9ydCBJdGVtc1wiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0XHRcdGlkOiBcIkV4cG9ydFNlbGVjdEFsbEJ0blwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6e3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJTZWxlY3QgQWxsXCJdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRcdFx0aWQ6IFwiRXhwb3J0Q3N2QnRuXCIsXHJcblx0XHRcdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJFeHBvcnQgQ1NWXCJdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XVxyXG5cdH07XHJcblx0dmFyIGV4cG9ydFdpbmRvdyA9IGJ1aWxkV2luZG93KGV4cG9ydFdpbmRvd1N0cnVjdHVyZSk7XHJcblxyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKGV4cG9ydFdpbmRvdyk7XHJcbiAgICAkKFwiI1dLU1MtZXhwb3J0XCIpLmhpZGUoKTtcclxuXHJcblxyXG4gICAgJChcIiNFeHBvcnRJdGVtc0J0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1Wb2NhYicpKSB7XHJcbiAgICAgICAgICAgICQoXCIjZXhwb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG4gICAgICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgICAgICAkKFwiI2V4cG9ydEFyZWFcIikudGV4dChKU09OLnN0cmluZ2lmeSh2b2NhYkxpc3QpKTtcclxuICAgICAgICAgICAgJChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIkNvcHkgdGhpcyB0ZXh0IGFuZCBzaGFyZSBpdCB3aXRoIG90aGVycyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KFwiTm90aGluZyB0byBleHBvcnQgeWV0IDooXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR2YXIgc2VsZWN0X2FsbCA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICAgIHZhciB0ZXh0X3ZhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0cik7XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyh0ZXh0X3ZhbCk7XHJcbiAgICAgICAgdGV4dF92YWwuZm9jdXMoKTtcclxuICAgICAgICB0ZXh0X3ZhbC5zZWxlY3QoKTtcclxuICAgIH07XHJcblxyXG4gICAgJChcIiNFeHBvcnRTZWxlY3RBbGxCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKFwiI2V4cG9ydEFyZWFcIikudmFsKCkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdF9hbGwoXCJleHBvcnRBcmVhXCIpO1xyXG4gICAgICAgICAgICAkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KFwiRG9uJ3QgZm9yZ2V0IHRvIENUUkwgKyBDIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgY3JlYXRlQ1NWID0gZnVuY3Rpb24oSlNPTnN0cmluZyl7XHJcbiAgICAgICAgdmFyIEpTT05vYmplY3QgPSAodHlwZW9mIEpTT05zdHJpbmcgPT09ICdzdHJpbmcnKSA/IEpTT04ucGFyc2UoSlNPTnN0cmluZykgOiBKU09Oc3RyaW5nO1xyXG4gICAgICAgIHZhciBrZXk7XHJcbiAgICAgICAgdmFyIENTVmFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIGhlYWRlciA9IFtdOyAgXHJcbiAgICAgICAgdmFyIGlkID0gSlNPTm9iamVjdC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGlkKXsvL29iamVjdCBub3QgZW1wdHlcclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gSlNPTm9iamVjdFswXSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoSlNPTm9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENTVmFycmF5LnB1c2goaGVhZGVyLmpvaW4oJywnKSk7XHJcblxyXG4gICAgICAgIHdoaWxlKGlkLS0pe1xyXG4gICAgICAgICAgICB2YXIgbGluZSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgaCA9IGhlYWRlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIHdoaWxlKGgtLSl7Ly8gb25seSBkbyBrZXlzIGluIGhlYWRlciwgaW4gdGhlIGhlYWRlcidzIG9yZGVyLiAvL0pTT05vYmplY3RbaWRdKXtcclxuICAgICAgICAgICAgICAgIGtleSA9IGhlYWRlcltoXTtcclxuICAgICAgICAgICAgICAgIGlmKEpTT05vYmplY3RbaWRdW2tleV0gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoSlNPTm9iamVjdFtpZF1ba2V5XSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3BhcnNlIGFycmF5IGhlcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZS5wdXNoKEpTT05vYmplY3RbaWRdW2tleV0uam9pbihcIlxcdFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUucHVzaChKU09Ob2JqZWN0W2lkXVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1saW5lID0gbGluZS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIENTVmFycmF5LnB1c2gobGluZS5qb2luKCcsJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgQ1NWc3RyaW5nID0gQ1NWYXJyYXkuam9pbihcIlxcclxcblwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSShcImRhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxcIiArIENTVnN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgICQoXCIjRXhwb3J0Q3N2QnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgIHZhciBDc3ZGaWxlID0gY3JlYXRlQ1NWKHZvY2FiTGlzdCk7XHJcbiAgICAgICAgd2luZG93Lm9wZW4oQ3N2RmlsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0V4cG9ydENsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHRcdCQoXCIjZXhwb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdFx0JChcIiNleHBvcnRBcmVhXCIpLnRleHQoXCJcIik7XHJcblx0XHQkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBleHBvcnQuLicpO1xyXG5cdH0pO1xyXG5cclxuICAgIC8qKiBJbXBvcnRcclxuXHQqL1xyXG4gICAgd2luZG93LldLU1NfaW1wb3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjaW1wb3J0XCIpLnNob3coKTtcclxuICAgICAgICAvL2hpZGUgb3RoZXIgd2luZG93c1xyXG4gICAgICAgICQoXCIjYWRkXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2V4cG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNlZGl0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbiAgICB9O1xyXG5cclxuIFx0dmFyIGltcG9ydFdpbmRvd1N0cnVjdHVyZSA9IHtcclxuXHRcdGlkOiBcIldLU1MtaW1wb3J0XCIsXHJcblx0XHRjbGFzc05hbWU6IFwiV0tTU1wiLFxyXG5cdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHR0YWc6ICdmb3JtJyxcclxuXHRcdFx0aWQ6IFwiV0tTUy1pbXBvcnRGb3JtXCIsXHJcblx0XHRcdGNoaWxkTm9kZXM6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdFx0XHRpZDogXCJXS1NTLWltcG9ydENsb3NlQnRuXCIsXHJcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiV0tTUy1jbG9zZVwiLFxyXG5cdFx0XHRcdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHRcdFx0XHR0YWc6ICdpJyxcclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImljb24tcmVtb3ZlXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdoMScsXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcIkltcG9ydCBJdGVtc1wiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAndGV4dGFyZWEnLFxyXG5cdFx0XHRcdFx0aWQ6IFwiaW1wb3J0QXJlYVwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6IHtjb2xzOiBcIjUwXCIsIHJvd3M6IFwiMThcIiwgcGxhY2Vob2xkZXI6IFwiUGFzdGUgeW91ciBzdHVmZiBhbmQgaGl0IHRoZSBpbXBvcnQgYnV0dG9uISBVc2Ugd2l0aCBjYXV0aW9uIVwifVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAncCcsIFxyXG5cdFx0XHRcdFx0aWQ6IFwiaW1wb3J0U3RhdHVzXCIsXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcIlJlYWR5IHRvIGltcG9ydC4uLlwiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnbGFiZWwnLFxyXG5cdFx0XHRcdFx0aWQ6IFwiSW1wb3J0SXRlbXNCdG5cIixcclxuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJidXR0b25cIixcclxuXHRcdFx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIiwgc3R5bGU6IFwiZGlzcGxheTppbmxpbmU7XCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJJbXBvcnQgSXRlbXNcIl1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ2xhYmVsJyxcclxuXHRcdFx0XHRcdGlkOiBcIkltcG9ydENzdkJ0blwiLFxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6IHtzdHlsZTpcImRpc3BsYXk6aW5saW5lOyBjdXJzb3I6IHBvaW50ZXI7XCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJJbXBvcnQgQ1NWXCIsXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR0YWc6ICdpbnB1dCcsXHJcblx0XHRcdFx0XHRcdFx0aWQ6IFwidXBsb2FkXCIsXHJcblx0XHRcdFx0XHRcdFx0b3RoZXI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZmlsZVwiLCBhY2NlcHQ6IFwiLmNzdiwgLnRzdlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU6IFwiaGVpZ2h0OjBweDt3aWR0aDowcHg7YmFja2dyb3VuZDpyZWQ7b3BhY2l0eTowO2ZpbHRlcjpvcGFjaXR5KDEpO1wiXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdsYWJlbCcsXHJcblx0XHRcdFx0XHRpZDogXCJJbXBvcnRXS0J0blwiLFxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImJ1dHRvblwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6IHtzdHlsZTogXCJkaXNwbGF5OmlubGluZTtcIn0sXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHRhZzonaScsXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImljb24tZG93bmxvYWQtYWx0XCJcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XCJXS1wiXHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XVxyXG5cdH07XHJcblx0dmFyIGltcG9ydFdpbmRvdyA9IGJ1aWxkV2luZG93KGltcG9ydFdpbmRvd1N0cnVjdHVyZSk7XHJcblxyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKGltcG9ydFdpbmRvdyk7XHJcbiAgICQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHJcblx0dmFyIGNoZWNrQWRkID0gZnVuY3Rpb24oYWRkKSB7XHJcbiAgICAgICAgLy90YWtlIGEgSlNPTiBvYmplY3QgKHBhcnNlZCBmcm9tIGltcG9ydCB3aW5kb3cpIGFuZCBjaGVjayB3aXRoIHN0b3JlZCBpdGVtcyBmb3IgYW55IGR1cGxpY2F0ZXNcclxuICAgICAgICAvLyBSZXR1cm5zIHRydWUgaWYgZWFjaCBpdGVtIGluICdhZGQnIGFycmF5IGlzIHZhbGlkIGFuZFxyXG4gICAgICAgIC8vYXQgbGVhc3Qgb25lIG9mIHRoZW0gYWxyZWFkeSBleGlzdHMgaW4gc3RvcmFnZVxyXG4gICAgICAgIHZhciBpID0gYWRkLmxlbmd0aDtcclxuICAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1Wb2NhYicpKSB7ICAgIFxyXG4gICAgICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgICAgICB3aGlsZShpLS0pe1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSXRlbVZhbGlkKGFkZFtpXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0ZvckR1cGxpY2F0ZXModm9jYWJMaXN0LGFkZFtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFwiKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFwiKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBJbXBvcnRVdGlsLmZpbGVVcGxvYWQsIGZhbHNlKTtcclxuXHJcblx0dmFyIHJlZnJlc2hMb2NrcyA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgdm9jTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKS5tYXAoZnVuY3Rpb24odm9jSXRlbSl7XHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ2b2NMaXN0W2ldID0gc2V0TG9ja3Modm9jTGlzdFtpXSk7XCIpO1xyXG5cdFx0XHR2b2NJdGVtID0gc2V0TG9ja3Modm9jSXRlbSk7ICBcclxuXHRcdFx0cmV0dXJuIHZvY0l0ZW07XHJcblx0XHR9LCB0aGlzKTtcclxuXHRcdGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuXHRcdFN0b3JhZ2VVdGlsLnNldFZvY0xpc3Qodm9jTGlzdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG4gICAgJChcIiNJbXBvcnRXS0J0blwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIFdhbmlrYW5pVXRpbC5nZXRTZXJ2ZXJSZXNwKEFQSWtleSxcInZvY2FidWxhcnlcIik7XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIm1heWJlP1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjSW1wb3J0SXRlbXNCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKFwiI2ltcG9ydEFyZWFcIikudmFsKCkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkID0gSlNPTi5wYXJzZSgkKFwiI2ltcG9ydEFyZWFcIikudmFsKCkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICBhbGVydChKU09OLnN0cmluZ2lmeShhZGQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0FkZChhZGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIk5vIHZhbGlkIGlucHV0IChkdXBsaWNhdGVzPykhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3bGlzdDtcclxuICAgICAgICAgICAgICAgIHZhciBzcnNsaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2b2NhYkxpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JzbGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdsaXN0ID0gdm9jYWJMaXN0LmNvbmNhdChhZGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3bGlzdCA9IGFkZDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBhZGQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICBTdG9yYWdlVXRpbC5zZXRWb2NJdGVtKGFkZFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIkltcG9ydCBzdWNjZXNzZnVsIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI2ltcG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICQoXCIjaW1wb3J0QXJlYVwiKS50ZXh0KFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIlBhcnNpbmcgRXJyb3IhXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJOb3RoaW5nIHRvIGltcG9ydCA6KCBQbGVhc2UgcGFzdGUgeW91ciBzdHVmZiBmaXJzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0ltcG9ydENsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNpbXBvcnRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgJChcIiNpbXBvcnRBcmVhXCIpLnRleHQoXCJcIik7XHJcbiAgICAgICAgJChcIiNpbXBvcnRTdGF0dXNcIikudGV4dCgnUmVhZHkgdG8gaW1wb3J0Li4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBwbGF5QXVkaW8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIga2FuamkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWthbmppJykuaW5uZXJIVE1MO1xyXG4gICAgICAgIHZhciBrYW5hID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtc29sdXRpb24nKS5pbm5lckhUTUwuc3BsaXQoL1ss44CBXStcXHMqLykpWzBdO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWF1ZGlvJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8tZm9ybScpLmFjdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQXVkaW9CdXR0b24nKS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKCAha2FuamkubWF0Y2goL1thLXpBLVpdKy9pKSAmJiAha2FuYS5tYXRjaCgvW2EtekEtWl0rL2kpKSB7XHJcblxyXG4gICAgICAgICAgICBrYW5qaSA9IGVuY29kZVVSSUNvbXBvbmVudChrYW5qaSk7XHJcbiAgICAgICAgICAgIGthbmEgPSBlbmNvZGVVUklDb21wb25lbnQoa2FuYSk7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld2thbmppID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwga2FuamkubGVuZ3RoOyBpID0gaSszKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5qaSA9IG5ld2thbmppLmNvbmNhdChrYW5qaVtpLTFdKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmppID0gbmV3a2FuamkuY29uY2F0KCcyJyk7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5qaSA9IG5ld2thbmppLmNvbmNhdCgnNScpO1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuamkgPSBuZXdrYW5qaS5jb25jYXQoa2FuamlbaV0pO1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuamkgPSBuZXdrYW5qaS5jb25jYXQoa2FuamlbaSsxXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdrYW5hID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwga2FuYS5sZW5ndGg7IGkgPSBpKzMpIHtcclxuICAgICAgICAgICAgICAgIG5ld2thbmEgPSBuZXdrYW5hLmNvbmNhdChrYW5hW2ktMV0pO1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuYSA9IG5ld2thbmEuY29uY2F0KCcyJyk7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5hID0gbmV3a2FuYS5jb25jYXQoJzUnKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmEgPSBuZXdrYW5hLmNvbmNhdChrYW5hW2ldKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmEgPSBuZXdrYW5hLmNvbmNhdChrYW5hW2krMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdXJsID0gXCJodHRwOi8vd3d3LmNzc2UubW9uYXNoLmVkdS5hdS9+andiL2F1ZGlvY2suc3dmP3U9a2FuYT1cIiArIG5ld2thbmEgKyBcIiUyNmthbmppPVwiICsgbmV3a2Fuamk7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiQXVkaW8gVVJMOiBcIiArIHVybCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQXVkaW9CdXR0b24nKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1hdWRpbycpLmlubmVySFRNTCA9IHVybDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5leHRSZXZpZXcgPSBmdW5jdGlvbihyZXZpZXdMaXN0KSB7XHJcbiAgICAgICAgLy9zZXRzIHVwIHRoZSBuZXh0IGl0ZW0gZm9yIHJldmlld1xyXG4gICAgICAgIC8vdXNlcyBmdW5jdGlvbnM6XHJcbiAgICAgICAgLy8gICAgd2FuYWthbmEuYmluZC91bmJpbmRcclxuXHJcbiAgICAgICAgdmFyIHJuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyZXZpZXdMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSByZXZpZXdMaXN0W3JuZF07XHJcbiAgICAgICAgc2Vzc2lvblNldCgnV0tTUy1pdGVtJywgSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xyXG4gICAgICAgIHNlc3Npb25TZXQoJ1dLU1Mtcm5kJywgcm5kKTtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1TdGF0cycpKXtcclxuICAgICAgICAgICAgJChcIiNSZXZOdW1cIikuaW5uZXJIdG1sID0gc2Vzc2lvbkdldCgnVXNlci1TdGF0cycpLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1rYW5qaScpLmlubmVySFRNTCA9IGl0ZW0ucHJvbXB0O1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtdHlwZScpLmlubmVySFRNTCA9IGl0ZW0udHlwZTtcclxuICAgICAgICB2YXIgdHlwZUJnQ29sb3IgPSAnZ3JleSc7XHJcbiAgICAgICAgaWYgKGl0ZW0udHlwZS50b0xvd2VyQ2FzZSgpID09ICdtZWFuaW5nJyl7XHJcbiAgICAgICAgICAgIHR5cGVCZ0NvbG9yID0gJ2JsdWUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlLnRvTG93ZXJDYXNlKCkgPT0gJ3JlYWRpbmcnKXtcclxuICAgICAgICAgICAgdHlwZUJnQ29sb3IgPSAnb3JhbmdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZS50b0xvd2VyQ2FzZSgpID09ICdyZXZlcnNlJyl7XHJcbiAgICAgICAgICAgIHR5cGVCZ0NvbG9yID0gJ29yYW5nZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3a3NzLXR5cGUnKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB0eXBlQmdDb2xvcjtcclxuICAgICAgICAkKFwiI3Jldi1zb2x1dGlvblwiKS5yZW1vdmVDbGFzcyhcImluZm9cIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1zb2x1dGlvbicpLmlubmVySFRNTCA9IGl0ZW0uc29sdXRpb247XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbmRleCcpLmlubmVySFRNTCA9IGl0ZW0uaW5kZXg7XHJcblxyXG4gICAgICAgIC8vaW5pdGlhbGlzZSB0aGUgaW5wdXQgZmllbGRcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS5mb2N1cygpO1xyXG4gICAgICAgICQoXCIjcmV2LWlucHV0XCIpLnJlbW92ZUNsYXNzKFwiY2F1dGlvblwiKTtcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG4gICAgICAgICQoXCIjcmV2LWlucHV0XCIpLnJlbW92ZUNsYXNzKFwiY29ycmVjdFwiKTtcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgIC8vY2hlY2sgZm9yIGFscGhhYmV0IGxldHRlcnMgYW5kIGRlY2lkZSB0byBiaW5kIG9yIHVuYmluZCB3YW5ha2FuYVxyXG4gICAgICAgIGlmIChpdGVtLnNvbHV0aW9uWzBdLm1hdGNoKC9bYS16QS1aXSsvaSkpIHtcclxuICAgICAgICAgICAgd2FuYWthbmEudW5iaW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICQoJyNyZXYtaW5wdXQnKS5hdHRyKCdwbGFjZWhvbGRlcicsJ1lvdXIgcmVzcG9uc2UnKTtcclxuICAgICAgICAgICAgJCgnI3Jldi1pbnB1dCcpLmF0dHIoJ2xhbmcnLCdlbicpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdhbmFrYW5hLmJpbmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpKTtcclxuICAgICAgICAgICAgJCgnI3Jldi1pbnB1dCcpLmF0dHIoJ3BsYWNlaG9sZGVyJywn562U44GIJyk7XHJcbiAgICAgICAgICAgICQoJyNyZXYtaW5wdXQnKS5hdHRyKCdsYW5nJywnamEnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwbGF5QXVkaW8oKTtcclxuICAgIH07XHJcblxyXG5cdC8vZ2xvYmFsIHRvIGtlZXAgdHJhY2sgb2Ygd2hlbiBhIHJldmlldyBpcyBpbiBzZXNzaW9uLlxyXG4gICAgdmFyIHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBzdGFydFJldmlldyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzdGFydFJldmlldygpXCIpO1xyXG4gICAgICAgIHN1Ym1pdCA9IHRydWU7XHJcbiAgICAgICAgcmV2aWV3QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL2dldCB0aGUgcmV2aWV3ICdsaXN0JyBmcm9tIHNlc3Npb24gc3RvcmFnZSwgbGluZSB1cCB0aGUgZmlyc3QgaXRlbSBpbiBxdWV1ZVxyXG4gICAgICAgIHZhciByZXZpZXdMaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1SZXZpZXcnKXx8W107XHJcbiAgICAgICAgbmV4dFJldmlldyhyZXZpZXdMaXN0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIFJldmlldyBJdGVtc1xyXG5cdCovXHJcbiAgICB3aW5kb3cuV0tTU19yZXZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vaXMgdGhlcmUgYSBzZXNzaW9uIHdhaXRpbmcgaW4gc3RvcmFnZT9cclxuICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVJldmlldycpKSB7XHJcblxyXG4gICAgICAgICAgICAvL3Nob3cgdGhlIHNlbGZzdHVkeSB3aW5kb3dcclxuICAgICAgICAgICAgJChcIiNzZWxmc3R1ZHlcIikuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgLy9oaWRlIG90aGVyIHdpbmRvd3NcclxuICAgICAgICAgICAgJChcIiNhZGRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI2V4cG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UmV2aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkKFwiYm9keVwiKS5hcHBlbmQoJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48ZGl2IGlkPVwic2VsZnN0dWR5XCIgY2xhc3M9XCJXS1NTXCI+XFxcclxuPGJ1dHRvbiBpZD1cIlNlbGZzdHVkeUNsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPlJldmlldzxzcGFuIGlkPVwiUmV2TnVtXCI+PC9zcGFuPjwvaDE+XFxcclxuPGRpdiBpZD1cIndrc3Mta2FuamlcIj5cXFxyXG48c3BhbiBpZD1cInJldi1rYW5qaVwiPjwvc3Bhbj5cXFxyXG48L2Rpdj48ZGl2IGlkPVwid2tzcy10eXBlXCI+XFxcclxuPHNwYW4gaWQ9XCJyZXYtdHlwZVwiPjwvc3Bhbj48YnIgLz5cXFxyXG48L2Rpdj48ZGl2IGlkPVwid2tzcy1zb2x1dGlvblwiPlxcXHJcbjxzcGFuIGlkPVwicmV2LXNvbHV0aW9uXCI+PC9zcGFuPlxcXHJcbjwvZGl2PjxkaXYgaWQ9XCJ3a3NzLWlucHV0XCI+XFxcclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJyZXYtaW5wdXRcIiBzaXplPVwiNDBcIiBwbGFjZWhvbGRlcj1cIlwiPlxcXHJcbjwvZGl2PjxzcGFuIGlkPVwicmV2LWluZGV4XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj48L3NwYW4+XFxcclxuXFxcclxuPGZvcm0gaWQ9XCJhdWRpby1mb3JtXCI+XFxcclxuPGxhYmVsIGlkPVwiQXVkaW9CdXR0b25cIiBjbGFzcz1cImJ1dHRvblwiPlBsYXkgYXVkaW88L2xhYmVsPlxcXHJcbjxsYWJlbCBpZD1cIldyYXBVcEJ0blwiICAgY2xhc3M9XCJidXR0b25cIj5XcmFwIFVwPC9sYWJlbD5cXFxyXG48L2Zvcm0+XFxcclxuPGRpdiBpZD1cInJldi1hdWRpb1wiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvZGl2PlxcXHJcbjwvZGl2PicpO1xyXG4gICAgJChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG5cclxuICAgICQoXCIjU2VsZnN0dWR5Q2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgcmV2aWV3QWN0aXZlID0gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgYmluYXJ5U2VhcmNoID0gZnVuY3Rpb24odmFsdWVzLCB0YXJnZXQsIHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICAvL2RlYnVnZ2luZyYmY29uc29sZS5sb2coXCJiaW5hcnlTZWFyY2godmFsdWVzOiAsdGFyZ2V0OiAsIHN0YXJ0OiBcIitzdGFydCtcIiwgZW5kOiBcIitlbmQrXCIpXCIpO1xyXG5cclxuICAgICAgICBpZiAoc3RhcnQgPiBlbmQpIHtcclxuICAgICAgICAgICAgLy9zdGFydCBoYXMgaGlnaGVyIHZhbHVlIHRoYW4gdGFyZ2V0LCBlbmQgaGFzIGxvd2VyIHZhbHVlXHJcbiAgICAgICAgICAgIC8vaXRlbSBiZWxvbmdzIGJldHdlZW5cclxuICAgICAgICAgICAgLy8gbmVlZCB0byByZXR1cm4gJ3N0YXJ0JyB3aXRoIGEgZmxhZyB0aGF0IGl0IGhhc24ndCBiZWVuIGZvdW5kXHJcbiAgICAgICAgICAgIC8vaW52ZXJ0IHNpZ24gOilcclxuICAgICAgICAgICAgcmV0dXJuIC0oc3RhcnQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZm9yIHRlc3RpbmcgdHJ1dGhzXHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBTdHJpbmcoZW5kKStcIiA8IFwiK2l0ZW0uaW5kZXgrXCIgPCBcIitTdHJpbmcoc3RhcnQpO1xyXG5cclxuICAgICAgICB9IC8vZG9lcyBub3QgZXhpc3RcclxuXHJcblxyXG4gICAgICAgIHZhciBtaWRkbGUgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNbbWlkZGxlXTtcclxuICAgICAgICAvKmRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzdGFydC5pbmRleDogXCIrdmFsdWVzW3N0YXJ0XS5pbmRleCk7XHJcbiAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIm1pZGRsZS5pbmRleDogXCIrdmFsdWVzW21pZGRsZV0uaW5kZXgpO1xyXG4gICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJlbmQuaW5kZXg6IFwiK3ZhbHVlc1tlbmRdLmluZGV4KTtcclxuICAgICAqL1xyXG4gICAgICAgIGlmIChOdW1iZXIodmFsdWUuaW5kZXgpID4gTnVtYmVyKHRhcmdldC5pbmRleCkpIHtcclxuXHRcdFx0cmV0dXJuIGJpbmFyeVNlYXJjaCh2YWx1ZXMsIHRhcmdldCwgc3RhcnQsIG1pZGRsZS0xKTtcclxuXHRcdH1cclxuICAgICAgICBpZiAoTnVtYmVyKHZhbHVlLmluZGV4KSA8IE51bWJlcih0YXJnZXQuaW5kZXgpKSB7XHJcblx0XHRcdHJldHVybiBiaW5hcnlTZWFyY2godmFsdWVzLCB0YXJnZXQsIG1pZGRsZSsxLCBlbmQpO1xyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybiBtaWRkbGU7IC8vZm91bmQhXHJcbiAgICB9O1xyXG5cclxuXHR2YXIgZmluZEluZGV4ID0gZnVuY3Rpb24odmFsdWVzLCB0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gYmluYXJ5U2VhcmNoKHZhbHVlcywgdGFyZ2V0LCAwLCB2YWx1ZXMubGVuZ3RoIC0gMSk7XHJcblx0fTtcclxuXHJcbiAgICAkKFwiI1dyYXBVcEJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2Vzc2lvbkxpc3QgPSBzZXNzaW9uR2V0KCdVc2VyLVJldmlldycpfHxbXTtcclxuICAgICAgICB2YXIgc3RhdHNMaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1TdGF0cycpfHxbXTtcclxuICAgICAgICAvL2lmIGFuIGluZGV4IGluIHNlc3Npb25MaXN0IG1hdGNoZXMgb25lIGluIHN0YXRzTGlzdCwgZG9uJ3QgZGVsZXRlXHJcbiAgICAgICAgdmFyIHNlc3Npb25JID0gc2Vzc2lvbkxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHZhciBpdGVtID0gc2Vzc2lvbkdldCgnV0tTUy1pdGVtJyl8fFtdO1xyXG4gICAgICAgIHZhciBhcnIyID0gW107XHJcbiAgICAgICAgLy9mb3IgZXZlcnkgaXRlbSBpbiBzZXNzaW9uTGlzdCwgbG9vayBmb3IgaW5kZXggaW4gc3RhdHNMaXN0LFxyXG4gICAgICAgIC8vaWYgbm90IHRoZXJlICgtMSkgZGVsZXRlIGl0ZW0gZnJvbSBzZXNzaW9uTGlzdFxyXG4gICAgICAgIHdoaWxlIChzZXNzaW9uSS0tKXtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHN0YXRzTGlzdCxzZXNzaW9uTGlzdFtzZXNzaW9uSV0pO1xyXG4gICAgICAgICAgICBpZiAoKE1hdGguc2lnbigxL2luZGV4KSAhPT0gLTEpfHwoc2Vzc2lvbkxpc3Rbc2Vzc2lvbkldLmluZGV4ID09IGl0ZW0uaW5kZXgpKXtcclxuXHJcbiAgICAgICAgICAgICAgICBhcnIyLnB1c2goc2Vzc2lvbkxpc3Rbc2Vzc2lvbkldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGFycjIpO1xyXG4gICAgICAgIHNlc3Npb25TZXQoJ1VzZXItUmV2aWV3JywgSlNPTi5zdHJpbmdpZnkoYXJyMikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqIFNhdmUgdG8gbGlzdCBiYXNlZCBvbiAuaW5kZXggcHJvcGVydHlcclxuXHQqIEBwYXJhbSB7QXJyYXkuPHRhc2s+fSBlTGlzdFxyXG5cdCogQHBhcmFtIHt0YXNrfSBlSXRlbVxyXG5cdCovXHJcbiAgICB2YXIgc2F2ZVRvU29ydGVkTGlzdCA9IGZ1bmN0aW9uKGVMaXN0LGVJdGVtKXtcclxuICAgICAgICB2YXIgZ2V0ID0gZmluZEluZGV4KGVMaXN0LGVJdGVtKTtcclxuICAgICAgICBpZiAoTWF0aC5zaWduKDEvZ2V0KSA9PT0gLTEpe1xyXG4gICAgICAgICAgICBlTGlzdC5zcGxpY2UoLWdldCwwLGVJdGVtKTtcclxuICAgICAgICB9XHJcblx0XHRyZXR1cm4gZUxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLVxyXG4gICAgdmFyIG9wZW5Jbk5ld1RhYiA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciB3aW49d2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgd2luLmZvY3VzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgICQoXCIjQXVkaW9CdXR0b25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9wZW5Jbk5ld1RhYihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWF1ZGlvJykuaW5uZXJIVE1MKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBSZXZfSXRlbSA9IGZ1bmN0aW9uKHByb21wdCwga2FuamksIHR5cGUsIHNvbHV0aW9uLCBpbmRleCl7XHJcbiAgICAgICAgdGhpcy5wcm9tcHQgPSBwcm9tcHQ7XHJcbiAgICAgICAgdGhpcy5rYW5qaSA9IGthbmppO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5zb2x1dGlvbiA9IHNvbHV0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHVwZGF0ZVNSUyA9IGZ1bmN0aW9uKHN0YXRzLCB2b2NsaXN0KSB7XHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmR1ZSA8IG5vdyl7IC8vZG91YmxlIGNoZWNrIHRoYXQgdGhlIGl0ZW0gd2FzIHJlYWxseSB1cCBmb3IgcmV2aWV3LlxyXG4gICAgICAgICAgICBpZighc3RhdHMubnVtV3JvbmcgJiYgdm9jbGlzdFtzdGF0cy5pbmRleF0ubGV2ZWwgPCA5KSB7Ly9hbGwgY29ycmVjdCAobm9uZSB3cm9uZylcclxuICAgICAgICAgICAgICAgIHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5udW1Xcm9uZyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgLy9BZGFwdGVkIGZyb20gV2FuaUthbmkncyBzcnMgdG8gYXV0aGVudGljYWxseSBtaW1pYyBsZXZlbCBkb3duc1xyXG4gICAgICAgICAgICAgICAgdmFyIG8gPSAoc3RhdHMubnVtV3JvbmcuTWVhbmluZ3x8MCkrKHN0YXRzLm51bVdyb25nLlJlYWRpbmd8fDApKyhzdGF0cy5udW1Xcm9uZy5SZXZlcnNlfHwwKTtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gdm9jbGlzdFtzdGF0cy5pbmRleF0ubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICB2YXIgcj10Pj01PzIqTWF0aC5yb3VuZChvLzIpOjEqTWF0aC5yb3VuZChvLzIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG49dC1yPDE/MTp0LXI7XHJcblxyXG4gICAgICAgICAgICAgICAgdm9jbGlzdFtzdGF0cy5pbmRleF0ubGV2ZWwgPSBuOy8vZG9uJ3Qgc3RheSBvbiAnc3RhcnRlZCdcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdm9jbGlzdFtzdGF0cy5pbmRleF0uZGF0ZSA9IG5vdztcclxuICAgICAgICAgICAgdm9jbGlzdFtzdGF0cy5pbmRleF0uZHVlID0gbm93ICsgc3JzT2JqZWN0W3ZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsXS5kdXJhdGlvbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZXh0IHJldmlldyBpbiBcIittczJzdHIoc3JzT2JqZWN0W3ZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsXS5kdXJhdGlvbikpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZvY2xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIHN0YXRzTGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItU3RhdHMnKXx8W107XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGF0c2xpc3RcIiwgc3RhdHNMaXN0KTtcclxuICAgICAgICB2YXIgdm9jbGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICBcclxuXHRcdHN0YXRzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHN0YXRzLCBpLCBzdGF0c0xpc3Qpe1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic3RhdHNcIixzdGF0cyk7XHJcbiAgICAgICAgICAgIHZhciBhbHRUZXh0ID0gdm9jbGlzdFtzdGF0cy5pbmRleF0ubGV2ZWw7Ly8rc3RhdHMudHlwZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0cy5udW1Xcm9uZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzLm51bVdyb25nLk1lYW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0VGV4dCA9IGFsdFRleHQgKyBcIiBNZWFuaW5nIFdyb25nIHhcIitzdGF0cy5udW1Xcm9uZy5NZWFuaW5nICtcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzLm51bVdyb25nLlJlYWRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0VGV4dCA9IGFsdFRleHQgKyBcIiBSZWFkaW5nIFdyb25nIHhcIitzdGF0cy5udW1Xcm9uZy5SZWFkaW5nICtcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzLm51bVdyb25nLlJldmVyc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0VGV4dCA9IGFsdFRleHQgKyBcIiBSZXZlcnNlIFdyb25nIHhcIitzdGF0cy5udW1Xcm9uZy5SZXZlcnNlICtcIlxcblwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChzdGF0cy5udW1Db3JyZWN0KXtcclxuXHRcdFx0XHRpZiAoc3RhdHMubnVtQ29ycmVjdC5NZWFuaW5nKVxyXG5cdFx0XHRcdFx0YWx0VGV4dCA9IGFsdFRleHQgKyBcIiBNZWFuaW5nIENvcnJlY3QgeFwiK3N0YXRzLm51bUNvcnJlY3QuTWVhbmluZyArXCJcXG5cIjtcclxuXHRcdFx0XHRpZiAoc3RhdHMubnVtQ29ycmVjdC5SZWFkaW5nKVxyXG5cdFx0XHRcdFx0YWx0VGV4dCA9IGFsdFRleHQgKyBcIiBSZWFkaW5nIENvcnJlY3QgeFwiK3N0YXRzLm51bUNvcnJlY3QuUmVhZGluZyArXCJcXG5cIjtcclxuXHRcdFx0XHRpZiAoc3RhdHMubnVtQ29ycmVjdC5SZXZlcnNlKVxyXG5cdFx0XHRcdFx0YWx0VGV4dCA9IGFsdFRleHQgKyBcIiBSZXZlcnNlIENvcnJlY3QgeFwiK3N0YXRzLm51bUNvcnJlY3QuUmV2ZXJzZSArXCJcXG5cIjtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0cyk7XHJcblxyXG5cdFx0XHQvL1RPRE8gc29ydCBpbnRvIGFwcHJlbnRpY2UsIGd1cnUsIGV0Y1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWFcIikuaW5uZXJIVE1MICs9XHJcblx0XHRcdFx0XCI8c3BhbiBjbGFzcz1cIiArXHJcblx0XHRcdFx0KHN0YXRzLm51bVdyb25nPyBcIlxcXCJyZXYtZXJyb3JcXFwiXCI6XCJcXFwicmV2LWNvcnJlY3RcXFwiXCIpICtcclxuXHRcdFx0XHRcIiB0aXRsZT0nXCIrYWx0VGV4dCtcIic+XCIgKyBzdGF0cy5rYW5qaSArIFwiPC9zcGFuPlwiO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9tYXAgd2l0aCBzaWRlIGVmZmVjdHM/XHJcbiAgICAgICAgICAgIHN0YXRzTGlzdFtpXSA9IHVwZGF0ZVNSUyhzdGF0cywgdm9jbGlzdCk7XHJcblxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHNlc3Npb25TZXQoXCJVc2VyLVN0YXRzXCIsc3RhdHNMaXN0KTtcclxuICAgICAgICBsb2NhbFNldChcIlVzZXItVm9jYWJcIiwgdm9jbGlzdCk7XHJcbiAgICB9O1xyXG5cclxuICAgICQoXCJib2R5XCIpLmFwcGVuZCgnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XCJyZXN1bHR3aW5kb3dcIiBjbGFzcz1cIldLU1NcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVwiUmV2aWV3cmVzdWx0c0Nsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPlJldmlldyBSZXN1bHRzPC9oMT5cXFxyXG48aDI+QWxsPC9oMj5cXFxyXG48ZGl2IGlkPVwic3RhdHMtYVwiPjwvZGl2PlxcXHJcbjwvZGl2PicpO1xyXG5cclxuICAgICQoXCIjcmVzdWx0d2luZG93XCIpLmhpZGUoKTtcclxuXHJcbiAgICAkKFwiI1Jldmlld3Jlc3VsdHNDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNyZXN1bHR3aW5kb3dcIikuaGlkZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtYVwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG5cdHZhciBtYXJrQW5zd2VyID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIC8vZXZhbHVhdGUgJ2l0ZW0nIGFnYWluc3QgdGhlIHF1ZXN0aW9uLlxyXG4gICAgICAgIC8vIG1hdGNoIGJ5IGluZGV4XHJcbiAgICAgICAgLy8gZ2V0IHR5cGUgb2YgcXVlc3Rpb25cclxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgcmlnaHQgb3Igd3JvbmcgYW5kIHJldHVybiByZXN1bHQgYXBwcm9wcmlhdGVseVxyXG5cclxuICAgICAgICAvL2dldCB0aGUgcXVlc3Rpb25cclxuICAgICAgICAvL3ZhciBwcm9tcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWthbmppJykuaW5uZXJIVE1MLnRyaW0oKTtcclxuICAgICAgICAvL2dldCB0aGUgYW5zd2VyXHJcbiAgICAgICAgdmFyIGFuc3dlciA9ICQoXCIjcmV2LWlucHV0XCIpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgLy9nZXQgdGhlIGluZGV4XHJcbiAgICAgICAgdmFyIGluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbmRleCcpLmlubmVySFRNTC50cmltKCk7XHJcbiAgICAgICAgLy9nZXQgdGhlIHF1ZXN0aW9uIHR5cGVcclxuICAgICAgICB2YXIgdHlwZSAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LXR5cGUnKS5pbm5lckhUTUwudHJpbSgpO1xyXG5cclxuICAgICAgICAvL3ZhciB2b2NhYiA9IGxvY2FsR2V0KFwiVXNlci1Wb2NhYlwiKTtcclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIGl0ZW0gaWYgaXQgaXMgaW4gdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG4gICAgICAgIHZhciBzdG9yZWRJdGVtID0gc2Vzc2lvbkdldChpdGVtLmluZGV4KTtcclxuICAgICAgICBpZiAoc3RvcmVkSXRlbSl7XHJcblxyXG4gICAgICAgICAgICBpdGVtLm51bUNvcnJlY3QgPSBzdG9yZWRJdGVtLm51bUNvcnJlY3Q7XHJcbiAgICAgICAgICAgIGl0ZW0ubnVtV3JvbmcgPSBzdG9yZWRJdGVtLm51bVdyb25nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09IGl0ZW0uaW5kZXgpey8vLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBpZiAoaW5wdXRDb3JyZWN0KCkpe1xyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhhbnN3ZXIrXCIvXCIraXRlbS5zb2x1dGlvblswXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtQ29ycmVjdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImluaXRpYWxpc2luZyBudW1Db3JyZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtQ29ycmVjdD17fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiQ29ycmVjdDogXCIrIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJNZWFuaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5udW1Db3JyZWN0Lk1lYW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtQ29ycmVjdC5NZWFuaW5nID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Db3JyZWN0Lk1lYW5pbmcrKztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIlJlYWRpbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLm51bUNvcnJlY3QuUmVhZGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Db3JyZWN0LlJlYWRpbmcgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bUNvcnJlY3QuUmVhZGluZysrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiUmV2ZXJzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtQ29ycmVjdC5SZXZlcnNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm51bUNvcnJlY3QuUmV2ZXJzZSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtQ29ycmVjdC5SZXZlcnNlKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coYW5zd2VyK1wiIT1cIitpdGVtLnNvbHV0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5udW1Xcm9uZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImluaXRpYWxpc2luZyBudW1Db3JyZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtV3Jvbmc9e307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIldyb25nOiBcIisgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIk1lYW5pbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLm51bVdyb25nLk1lYW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtV3JvbmcuTWVhbmluZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtV3JvbmcuTWVhbmluZysrO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiUmVhZGluZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtV3JvbmcuUmVhZGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Xcm9uZy5SZWFkaW5nID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Xcm9uZy5SZWFkaW5nKys7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJSZXZlcnNlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5udW1Xcm9uZy5SZXZlcnNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm51bVdyb25nLlJldmVyc2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bVdyb25nLlJldmVyc2UrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IGluZGV4ZXMgZG9uJ3QgbWF0Y2hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfTtcclxuXHJcblx0XHJcbiAgICAvL2pxdWVyeSBrZXl1cCBldmVudFxyXG4gICAgJChcIiNyZXYtaW5wdXRcIikua2V5dXAoUmV2aWV3VXRpbC5zdWJtaXRSZXNwb25zZSk7XHJcblxyXG5cclxuICAgIC8qKiBBZGRzIHRoZSBCdXR0b25cclxuXHQqL1xyXG4gICAgdmFyIGFkZFVzZXJWb2NhYkJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJhZGRVc2VyVm9jYWJCdXR0b24oKVwiKTtcclxuICAgICAgICAvL0Z1bmN0aW9ucyAoaW5kaXJlY3QpXHJcbiAgICAgICAgLy8gICAgV0tTU19hZGQoKVxyXG4gICAgICAgIC8vICAgIFdLU1NfZWRpdCgpXHJcbiAgICAgICAgLy8gICAgV0tTU19leHBvcnQoKVxyXG4gICAgICAgIC8vICAgIFdLU1NfaW1wb3J0KClcclxuICAgICAgICAvLyAgICBXS1NTX2xvY2soKVxyXG4gICAgICAgIC8vICAgIFdLU1NfcmV2aWV3KClcclxuXHJcbiAgICAgICAgdmFyIG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdicpO1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJnZW5lcmF0aW5nIHJldmlldyBsaXN0IGJlY2F1c2U6IGluaXRpYWxpc2luZyBzY3JpcHQgYW5kIHBvcHVsYXRpbmcgcmV2aWV3c1wiKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChuYXYmJm5hdi5sZW5ndGg+Mikge1xyXG4gICAgICAgICAgICBuYXZbMl0uaW5uZXJIVE1MID0gbmF2WzJdLmlubmVySFRNTCArIFwiXFxuXFxcclxuPGxpIGNsYXNzPVxcXCJkcm9wZG93biBjdXN0b21cXFwiPlxcblxcXHJcbjxhIGNsYXNzPVxcXCJkcm9wZG93bi10b2dnbGUgY3VzdG9tXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGhyZWY9XFxcIiNcXFwiIG9uY2xpY2s9XFxcImdlbmVyYXRlUmV2aWV3TGlzdCgpO1xcXCI+XFxuXFxcclxuPHNwYW4gbGFuZz1cXFwiamFcXFwiPuiHque/kjwvc3Bhbj5cXG5cXFxyXG5TZWxmLVN0dWR5IDxpIGNsYXNzPVxcXCJpY29uLWNoZXZyb24tZG93blxcXCI+PC9pPlxcblxcXHJcbjwvYT5cXG5cXFxyXG48dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnVcXFwiIGlkPVxcXCJXS1NTX2Ryb3Bkb3duXFxcIj5cXG5cXFxyXG48bGkgY2xhc3M9XFxcIm5hdi1oZWFkZXJcXFwiPkN1c3RvbWl6ZTwvbGk+XFxuXFxcclxuPGxpPjxhIGlkPVxcXCJjbGlja1xcXCIgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiV0tTU19hZGQoKTtcXFwiPkFkZDwvYT48L2xpPlxcblxcXHJcbjxsaT48YSBocmVmPVxcXCIjXFxcIiBvbmNsaWNrPVxcXCJXS1NTX2VkaXQoKTtcXFwiPkVkaXQ8L2E+PC9saT5cXG5cXFxyXG48bGk+PGEgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiV0tTU19leHBvcnQoKTtcXFwiPkV4cG9ydDwvYT48L2xpPlxcblxcXHJcbjxsaT48YSBocmVmPVxcXCIjXFxcIiBvbmNsaWNrPVxcXCJXS1NTX2ltcG9ydCgpO1xcXCI+SW1wb3J0PC9hPjwvbGk+XFxuXFxcclxuPCEtLS8vICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiIG9uY2xpY2s9XFxcIldLU1NfbG9jaygpO1xcXCI+U2VydmVyIFNldHRpbmdzPC9hPjwvbGk+Ly8tLT5cXG5cXFxyXG48bGkgY2xhc3M9XFxcIm5hdi1oZWFkZXJcXFwiPkxlYXJuPC9saT5cXG5cXFxyXG48bGk+PGEgaWQ9XFxcInVzZXItcmV2aWV3XFxcIiBocmVmPVxcXCIjXFxcIiBvbmNsaWNrPVxcXCJXS1NTX3JldmlldygpO1xcXCI+UGxlYXNlIHdhaXQuLi48L2E+PC9saT5cXG5cXFxyXG48L3VsPlxcblxcXHJcbjwvbGk+XCI7XHJcblxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImNvdWxkIG5vdCBmaW5kIG5hdlwiLCBuYXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImFkZFVzZXJWb2NhYlwiKTtcclxuICAgIH07XHJcblxyXG5cdCAgICAvKiogRXJyb3IgaGFuZGxpbmdcclxuXHQqIENhbiB1c2UgJ2Vycm9yLnN0YWNrJywgbm90IGNyb3NzLWJyb3dzZXIgKHRob3VnaCBpdCBzaG91bGQgd29yayBvbiBGaXJlZm94IGFuZCBDaHJvbWUpXHJcblx0Ki9cclxuICAgIHZhciBsb2dFcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImxvZ0Vycm9yKGVycm9yKVwiKTtcclxuICAgICAgICB2YXIgc3RhY2tNZXNzYWdlID0gXCJcIjtcclxuICAgICAgICBpZiAoXCJzdGFja1wiIGluIGVycm9yKVxyXG4gICAgICAgICAgICBzdGFja01lc3NhZ2UgPSBcIlxcblxcdFN0YWNrOiBcIiArIGVycm9yLnN0YWNrO1xyXG5cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiV0tTUzogRXJyb3I6IFwiICsgZXJyb3IubmFtZSArIFwiXFxuXFx0TWVzc2FnZTogXCIgKyBlcnJvci5tZXNzYWdlICsgc3RhY2tNZXNzYWdlKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiV0tTUzogRXJyb3I6IFwiICsgZXJyb3IubmFtZSArIFwiXFxuXFx0TWVzc2FnZTogXCIgKyBlcnJvci5tZXNzYWdlICsgc3RhY2tNZXNzYWdlKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKiAgUHJlcGFyZXMgdGhlIHNjcmlwdFxyXG5cdCovXHJcbiAgICB2YXIgc2NyaXB0SW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzY3JpcHRJbml0KClcIik7XHJcbiAgICAgICAgLy9mdW5jdGlvbnM6XHJcbiAgICAgICAgLy8gICAgYWRkVXNlclZvY2FiQnV0dG9uKClcclxuICAgICAgICAvLyAgICBsb2dFcnJvcihlcnIpXHJcblxyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJJbml0aWFsaXppbmcgV2FuaWthbmkgVXNlclZvY2FiIFNjcmlwdCFcIik7XHJcblxyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbSAuZHJvcGRvd24tbWVudSB7YmFja2dyb3VuZC1jb2xvcjogI0RCQTkwMSAhaW1wb3J0YW50O31cIik7XHJcbiAgICAgICAgZ01fYWRkU3R5bGUoXCIuY3VzdG9tIC5kcm9wZG93bi1tZW51OmFmdGVyIHtib3JkZXItYm90dG9tLWNvbG9yOiAjREJBOTAxICFpbXBvcnRhbnQ7XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbSAuZHJvcGRvd24tbWVudTpiZWZvcmUge2JvcmRlci1ib3R0b20tY29sb3I6ICNEQkE5MDEgIWltcG9ydGFudDtcIik7XHJcbiAgICAgICAgZ01fYWRkU3R5bGUoXCIub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmN1c3RvbSB7YmFja2dyb3VuZC1jb2xvcjogI0ZGQzQwMCAhaW1wb3J0YW50O31cIik7XHJcbiAgICAgICAgZ01fYWRkU3R5bGUoXCIuY3VzdG9tIC5kcm9wZG93bi1tZW51IGE6aG92ZXIge2JhY2tncm91bmQtY29sb3I6ICNBNjdGMDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbTpob3ZlciB7Y29sb3I6ICNGRkM0MDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbTpob3ZlciBzcGFuIHtib3JkZXItY29sb3I6ICNGRkM0MDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbTpmb2N1cyB7Y29sb3I6ICNGRkM0MDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbTpmb2N1cyBzcGFuIHtib3JkZXItY29sb3I6ICNGRkM0MDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLm9wZW4gLmN1c3RvbSBzcGFuIHtib3JkZXItY29sb3I6ICNGRkZGRkYgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLm9wZW4gLmN1c3RvbSB7Y29sb3I6ICNGRkZGRkYgIWltcG9ydGFudH1cIik7XHJcblxyXG5cdFx0dmFyIHdrU3R5bGVDU1MgPSByZXF1aXJlKCcuL3drc3R5bGUuanMnKTtcclxuICAgICAgICBnTV9hZGRTdHlsZSh3a1N0eWxlQ1NTKTtcclxuICAgICAgICAvLyBTZXQgdXAgYnV0dG9uc1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRVc2VyVm9jYWJCdXR0b24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Byb3ZpZGUgd2FybmluZyB0byB1c2VycyB0cnlpbmcgdG8gdXNlIHRoZSAoaW5jb21wbGV0ZSkgc2NyaXB0LlxyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInRoaXMgc2NyaXB0IGlzIHN0aWxsIGluY29tcGxldGU6IFxcblxcXHJcbkl0IGlzIHByb3ZpZGVkIGFzIGlzIHdpdGhvdXQgd2FycmFudHkgZXhwcmVzcyBvciBpbXBsaWVkXFxuXFxcclxuaW4gdGhlIGhvcGUgdGhhdCB5b3UgbWF5IGZpbmQgaXQgdXNlZnVsLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJXYW5pa2FuaSBTZWxmLVN0dWR5OiBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBsb2NhbFN0b3JhZ2UuLiBTb3JyeSA6KFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblx0Y29uc29sZS5pbmZvKGRvY3VtZW50LnJlYWR5U3RhdGUpO1xyXG4gICAgY29uc29sZS5sb2coXCJhZGRpbmcgRE9NIGxpc3RlbmVyXCIsIGRvY3VtZW50LnJlYWR5U3RhdGUpO1xyXG4gICAgLy8gQ2hlY2sgZm9yIGZpbGUgQVBJIHN1cHBvcnQuXHJcbiAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XHJcblxyXG4gICAgfVxyXG5cdGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU3RhcnQgdGhlIHNjcmlwdFxyXG4gICAgKi9cclxuICAgIC8vdW5sZXNzIHRoZSB1c2VyIG5hdmlnYXRlZCBmcm9tIHRoZSByZXZpZXcgZGlyZWN0b3J5LCB0aGV5IGFyZSB1bmxpa2VseSB0byBoYXZlIHVubG9ja2VkIGFueSBrYW5qaVxyXG4gICAgdmFyIG5vTmV3U3R1ZmYgPSAvXmh0dHBzOlxcL1xcLy4qXFwud2FuaWthbmlcXC5jb21cXC8uKi8udGVzdChkb2N1bWVudC5yZWZlcnJlcikmJiEoL2h0dHBzOlxcL1xcLy4qXFwud2FuaWthbmlcXC5jb21cXC9yZXZpZXcuKi8udGVzdChkb2N1bWVudC5yZWZlcnJlcikpO1xyXG4gICAgdmFyIHVzaW5nSFRUUFMgPSAvXmh0dHBzOi8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zb2xlLmluZm8odXNpbmdIVFRQUywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgaWYgKHVzaW5nSFRUUFMpe1xyXG4gICAgICAgIGlmICghbm9OZXdTdHVmZil7ICAvL0Rvbid0IHdhc3RlIHRpbWUgaWYgdXNlciBpcyBicm93c2luZyBzaXRlXHJcbiAgICAgICAgICAgIFdhbmlrYW5pVXRpbC5nZXRTZXJ2ZXJSZXNwKEFQSWtleSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJVc2VyIGlzIHVubGlrZWx5IHRvIGhhdmUgbmV3IGthbmppIHVubG9ja2VkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUuaW5mbyhcIldhbmlLYW5pIFNlbGYtU3R1ZHkgUGx1cyBpcyBhYm91dCB0byBzdGFydFwiKTtcclxuXHJcbiAgICAgICAgc2NyaXB0SW5pdCgpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS53YXJuKFwiSXQgYXBwZWFycyB0aGF0IHlvdSBhcmUgbm90IHVzaW5nIGh0dHBzIHByb3RvY29sLiBBdHRlbXB0aW5nIHRvIHJlZGlyZWN0IHRvIGh0dHBzIG5vdy5cIik7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9eaHR0cC8sIFwiaHR0cHNcIik7XHJcbiAgICB9XHJcbn1cclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpe1xyXG4gICAgY29uc29sZS5pbmZvKFwiQWJvdXQgdG8gaW5pdGlhbGlzZSBXS1NTK1wiKTtcclxuICAgIG1haW4oKTtcclxufSBlbHNlIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBtYWluLCBmYWxzZSk7XHJcbn1cclxuIiwiLyoqIFV0aWxpdGllcyBmb3IgaW50ZXJhY3Rpb24gd2l0aCB0aGUgV2FuaWthbmkgQVBJIGFuZCBnZW5lcmFsIHdlYnNpdGUuXHJcbiovXHJcbnZhciBXYW5pa2FuaVV0aWwgPSB7XHJcblx0aGlqYWNrUmVxdWVzdHM6IHJlcXVpcmUoJy4vaGlqYWNrcmVxdWVzdHMuanMnKSxcclxuXHRjcmVhdGVDT1JTUmVxdWVzdDogZnVuY3Rpb24obWV0aG9kLCB1cmwpe1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpe1xyXG4gICAgICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcclxuICAgICAgICB9XHJcblx0XHRlbHNlIHtcclxuICAgICAgICAgICAgeGhyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHhocjtcclxuICAgIH0sXHJcblx0LyoqIEdldHMgdGhlIHVzZXIgaW5mb3JtYXRpb24gdXNpbmcgdGhlIFdhbmlrYW5pIEFQSSBhbmQgc3RvcmVzIHRoZW0gZGlyZWN0bHkgaW50byBicm93c2VyIHN0b3JhZ2UuXHJcblx0KiBAcGFyYW1cclxuXHQqIEBwYXJhbVxyXG5cdCovXHJcblx0Z2V0U2VydmVyUmVzcDogZnVuY3Rpb24oQVBJa2V5LCByZXF1ZXN0ZWRJdGVtKXtcclxuXHJcbiAgICAgICAgcmVxdWVzdGVkSXRlbSA9IHJlcXVlc3RlZEl0ZW0gPT09IHZvaWQgMCA/ICdrYW5qaScgOnJlcXVlc3RlZEl0ZW07XHJcblxyXG4gICAgICAgIGlmIChBUElrZXkgIT09IFwidGVzdFwiKXtcclxuICAgICAgICAgICAgdmFyIGxldmVscyA9IChyZXF1ZXN0ZWRJdGVtID09PVwia2FuamlcIik/IFwiLzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwXCI6XHJcbiAgICAgICAgICAgIFwiLzEsMiwzLDQsNSw2LDcsOCw5LDEwXCI7XHJcbiAgICAgICAgICAgIHZhciB4aHJrID0gdGhpcy5jcmVhdGVDT1JTUmVxdWVzdChcImdldFwiLCBcImh0dHBzOi8vd3d3LndhbmlrYW5pLmNvbS9hcGkvdXNlci9cIiArIEFQSWtleSArIFwiL1wiICsgcmVxdWVzdGVkSXRlbSArIGxldmVscyk7XHJcbiAgICAgICAgICAgIGlmICghaXNFbXB0eSh4aHJrKSl7XHJcbiAgICAgICAgICAgICAgICB4aHJrLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHJrLnJlYWR5U3RhdGUgPT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrYW5qaUxpc3QgPSB0aGlzLmhhbmRsZVJlYWR5U3RhdGVGb3VyKHhocmsscmVxdWVzdGVkSXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdGVkSXRlbSA9PT0gJ2thbmppJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFNldCgnVXNlci1LYW5qaUxpc3QnLCBrYW5qaUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJrYW5qaUxpc3QgZnJvbSBzZXJ2ZXJcIiwga2FuamlMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGxvY2tzIGluIGxvY2FsU3RvcmFnZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFzcyBrYW5qaWxpc3QgaW50byB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhkb24ndCBzaGlmdCB0aGluZ3MgdGhyb3VnaCBzdG9yYWdlIHVuZWNlc3NhcmlseSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hMb2NrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRcdGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGthbmppTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2ICsgXCIgaXRlbXMgZm91bmQsIGF0dGVtcHRpbmcgdG8gaW1wb3J0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHYtLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuc2V0Vm9jSXRlbShrYW5qaUxpc3Rbdl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB4aHJrLnNlbmQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmVsb3dcIik7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgICAvL2R1bW15IHNlcnZlciByZXNwb25zZSBmb3IgdGVzdGluZy5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2FuamlMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0aW5nIGR1bW15IHJlc3BvbnNlXCIpO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi54yrXCIsIFwic3JzXCI6IFwibm9TZXJ2ZXJSZXNwXCJ9KTtcclxuICAgICAgICAgICAgICAgIHZhciBTUlMgPSBcImFwcHJlbnRpY2VcIjsgLy9wcm9tcHQoXCJlbnRlciBTUlMgZm9yIOWtkFwiLCBcImd1cnVcIik7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLlrZBcIiwgXCJzcnNcIjogU1JTfSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLlk4FcIiwgXCJzcnNcIjogXCJndXJ1XCJ9KTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIuS+m1wiLCBcInNyc1wiOiBcImd1cnVcIn0pO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi5pysXCIsIFwic3JzXCI6IFwiZ3VydVwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLogZ5cIiwgXCJzcnNcIjogXCJhcHByZW50aWNlXCJ9KTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIuS6ulwiLCBcInNyc1wiOiBcImVubGlnaHRlbmVkXCJ9KTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIualvVwiLCBcInNyc1wiOiBcImJ1cm5lZFwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLnm7hcIiwgXCJzcnNcIjogXCJndXJ1XCJ9KTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIuWNklwiLCBcInNyc1wiOiBcIm5vTWF0Y2hXS1wifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLnhKFcIiwgXCJzcnNcIjogXCJub01hdGNoR3VwcHlcIn0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIHJlc3BvbmRlZCB3aXRoIGR1bW15IGthbmppTGlzdDogXFxuXCIrSlNPTi5zdHJpbmdpZnkoa2FuamlMaXN0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTZXQoJ1VzZXItS2FuamlMaXN0Jywga2FuamlMaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsb2NrcyBpbiBsb2NhbFN0b3JhZ2VcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hMb2NrcygpO1xyXG4gICAgICAgICAgICB9LCAxMDAwMCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfSxcclxuXHRcclxuXHRoYW5kbGVSZWFkeVN0YXRlRm91cjogZnVuY3Rpb24oeGhyaywgcmVxdWVzdGVkSXRlbSl7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbGthbmppTGlzdCA9IFtdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVhZHlzdGF0ZTogXCIrIHhocmsucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgdmFyIHJlc3AgPSBKU09OLnBhcnNlKHhocmsucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFib3V0IHRvIGxvb3AgdGhyb3VnaCByZXF1ZXN0ZWQgaW5mb3JtYXRpb25cIik7IFxyXG5cdFx0aWYgKHJlc3AucmVxdWVzdGVkX2luZm9ybWF0aW9uICYmIHJlc3AucmVxdWVzdGVkX2luZm9ybWF0aW9uLmxlbmd0aCl7XHJcblx0XHRcdFxyXG5cdFx0XHRsb2NhbGthbmppTGlzdCA9IHJlc3AucmVxdWVzdGVkX2luZm9ybWF0aW9uLm1hcChmdW5jdGlvbihyZXF1ZXN0ZWRUYXNrKXtcclxuXHRcdFx0XHRpZiAocmVxdWVzdGVkSXRlbSA9PT0gXCJrYW5qaVwiKXtcclxuXHRcdFx0XHRcdGlmIChyZXF1ZXN0ZWRUYXNrLnVzZXJfc3BlY2lmaWMgIT09IG51bGwpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdGNoYXJhY3RlcjogcmVxdWVzdGVkVGFzay5jaGFyYWN0ZXIsXHJcblx0XHRcdFx0XHRcdFx0c3JzOiByZXF1ZXN0ZWRUYXNrLnVzZXJfc3BlY2lmaWMuc3JzLFxyXG5cdFx0XHRcdFx0XHRcdHJlYWRpbmc6IHJlcXVlc3RlZFRhc2tbcmVxdWVzdGVkVGFzay5pbXBvcnRhbnRfcmVhZGluZ10uc3BsaXQoXCIsXCIpWzBdLFxyXG5cdFx0XHRcdFx0XHRcdG1lYW5pbmc6IHJlcXVlc3RlZFRhc2subWVhbmluZy5zcGxpdChcIixcIilbMF1cclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyOiByZXF1ZXN0ZWRUYXNrLmNoYXJhY3RlcixcclxuXHRcdFx0XHRcdFx0XHRzcnM6IFwidW5yZWFjaGVkXCJcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihyZXF1ZXN0ZWRJdGVtID09PSBcInZvY2FidWxhcnlcIil7XHJcblx0XHRcdFx0XHRpZiAocmVxdWVzdGVkVGFzay51c2VyX3NwZWNpZmljICE9PSBudWxsfHx0cnVlKXsgLy8tLVxyXG5cdFx0XHRcdFx0XHQvL2J1aWxkIHZvY2FibGlzdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdGthbmppOiByZXF1ZXN0ZWRUYXNrLmNoYXJhY3RlcixcclxuXHRcdFx0XHRcdFx0XHRyZWFkaW5nOiByZXF1ZXN0ZWRUYXNrLmthbmEuc3BsaXQoXCIsXCIpLFxyXG5cdFx0XHRcdFx0XHRcdG1lYW5pbmc6IHJlcXVlc3RlZFRhc2subWVhbmluZy5zcGxpdChcIixcIilcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHRoaXMpO1xyXG5cdFx0fVxyXG4gICAgICAgIC8vcmV0dXJuIGthbmppTGlzdFxyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhcIlNlcnZlciByZXNwb25kZWQgd2l0aCBuZXcga2FuamlMaXN0OiBcXG5cIitKU09OLnN0cmluZ2lmeShrYW5qaUxpc3QpKTtcclxuICAgICAgICByZXR1cm4gbG9jYWxrYW5qaUxpc3Q7XHJcbiAgICB9XHJcblxyXG59OyIsIi8vIFdpbmRvdyBDb25maWdzXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFkZDp7aGVpZ2h0OiBcIjMwMHB4XCIsIHdpZHRoOiBcIjMwMHB4XCJ9LFxyXG5cdGV4cG9ydEltcG9ydDp7aGVpZ2h0OiBcIjI3NXB4XCIsIHdpZHRoOiBcIjM5MHB4XCJ9LFxyXG5cdGVkaXQ6e2hlaWdodDogXCIzODBweFwiLCB3aWR0aDogXCI4MDBweFwifSxcclxuXHRzdHVkeTp7aGVpZ2h0OiBcImF1dG9cIiwgd2lkdGg6IFwiNjAwcHhcIn0sIC8vaGVpZ2h0IDogYXV0b1xyXG5cdHJlc3VsdDp7aGVpZ2h0OiBcIjUwMHB4XCIsIHdpZHRoOiBcIjcwMHB4XCJ9XHJcbn07IiwiLyoganNoaW50IG11bHRpc3RyOiB0cnVlICovXHJcbi8vIENvbmZpZyBmb3Igd2luZG93IHNpemVzIGluIHBpeGVsc1xyXG52YXIgd2luZG93Q29uZmlnID0gcmVxdWlyZSgnLi93aW5kb3djb25maWcuanMnKTtcclxuXHJcbi8vLldLU1NcclxudmFyIGNsYXNzV0tTUyA9IFtcclxuXHR7cG9zaXRpb246IFwiZml4ZWRcIn0sXHJcblx0e3pJbmRleDogXCIyXCJ9LFxyXG5cdHt0b3A6IFwiMTI1cHhcIn0sXHJcblx0e2xlZnQ6IFwiNTAlXCJ9LFxyXG5cdHttYXJnaW46IFwiMHB4XCJ9LFxyXG5cdHtiYWNrZ3JvdW5kOiBcIiNGRkZcIn0sXHJcblx0e3BhZGRpbmc6IFwiNXB4XCJ9LFxyXG5cdHtmb250OiBcIjEycHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn0sXHJcblx0e3RleHRTaGFkb3c6IFwiMXB4IDFweCAxcHggI0ZGRlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjREREXCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtXZWJraXRCb3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtNb3pCb3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtib3hTaGFkb3c6IFwiMTBweCAxMHB4IDVweCAjODg4ODg4XCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIGgxXHJcbnZhciBjbGFzc1dLU1NfaDEgPSBbXHJcblx0e2ZvbnQ6IFwiMjVweCBcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7cGFkZGluZ0xlZnQ6IFwiNXB4XCJ9LFxyXG5cdHtkaXNwbGF5OiBcImJsb2NrXCJ9LFxyXG5cdHtib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkICNEQURBREFcIn0sXHJcblx0e21hcmdpbjogXCIwcHhcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgaDEgPiBzcGFuXHJcbnZhciBjbGFzc1dLU1NfaDFfZGlyZWN0X1NwYW4gPSBbXHJcblx0e2Rpc3BsYXk6IFwiYmxvY2tcIn0sXHJcblx0e2ZvbnRTaXplOiBcIjExcHhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgbGFiZWxcclxudmFyIHcgPSBbXHJcblx0e2Rpc3BsYXk6IFwiYmxvY2tcIn0sXHJcblx0e21hcmdpbjogXCIwcHggMHB4IDVweFwifSxcclxuXTtcclxuXHJcbi8vLldLU1MgbGFiZWw+c3BhblxyXG53ID0gW1xyXG5cdHtmbG9hdDogXCJsZWZ0XCJ9LFxyXG5cdHt3aWR0aDogXCI4MHB4XCJ9LFxyXG5cdHt0ZXh0QWxpZ246IFwicmlnaHRcIn0sXHJcblx0e3BhZGRpbmdSaWdodDogXCIxMHB4XCJ9LFxyXG5cdHttYXJnaW5Ub3A6IFwiMTBweFwifSxcclxuXHR7Y29sb3I6IFwiIzMzM1wifSxcclxuXHR7Zm9udEZhbWlseTogXCJcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7Zm9udFdlaWdodDogXCJib2xkXCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXSwgLldLU1MgaW5wdXRbdHlwZT1cXFwiZW1haWxcXFwiXSwgLldLU1MgdGV4dGFyZWEgXHJcbncgPSBbXHJcblx0e2JvcmRlcjogXCIxcHggc29saWQgI0NDQ1wifSxcclxuXHR7Y29sb3I6IFwiIzg4OFwifSxcclxuXHR7aGVpZ2h0OiBcIjIwcHhcIn0sXHJcblx0e21hcmdpbkJvdHRvbTogXCIxNnB4XCJ9LFxyXG5cdHttYXJnaW5SaWdodDogXCI2cHhcIn0sXHJcblx0e21hcmdpblRvcDogXCIycHhcIn0sXHJcblx0e291dGxpbmU6IFwiMCBub25lXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjZweCAxMnB4XCJ9LFxyXG5cdHt3aWR0aDogXCI4MCVcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2xpbmVIZWlnaHQ6IFwibm9ybWFsICFpbXBvcnRhbnRcIn0sXHJcblx0e1dlYmtpdEJvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e01vekJvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2ZvbnQ6IFwibm9ybWFsIDE0cHgvMTRweCBcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7V2Via2l0Qm94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifSxcclxuXHR7Ym94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifSxcclxuXHR7TW96Qm94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifVxyXG5dO1xyXG5cclxuLy8uV0tTUyBzZWxlY3RcclxudyA9IFtcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCBcXFwiI0NDQ1xcXCJcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn0sXHJcblx0e291dGxpbmU6IFwiMCBub25lXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjZweCAxMnB4XCJ9LFxyXG5cdHtoZWlnaHQ6IFwiMTYwcHggIWltcG9ydGFudFwifSxcclxuXHR7d2lkdGg6IFwiOTUlXCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtXZWJraXRCb3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtNb3pCb3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtmb250OiBcIm5vcm1hbCAxNHB4LzE0cHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn0sXHJcblx0e1dlYmtpdEJveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e2JveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e01vekJveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e2JhY2tncm91bmQ6IFwiI0ZGRiB1cmwoJ2Rvd24tYXJyb3cucG5nJykgbm8tcmVwZWF0IHJpZ2h0XCJ9LFxyXG5cdHthcHBlYXJhbmNlOiBcIm5vbmVcIn0sXHJcblx0e1dlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwifSxcclxuXHR7TW96QXBwZWFyYW5jZTogXCJub25lXCJ9LFxyXG5cdHt0ZXh0SW5kZW50OiBcIjAuMDFweFwifSxcclxuXHR7dGV4dE92ZXJmbG93OiBcIicnXCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIHRleHRhcmVhXHJcbncgPSBbXHJcblx0e2hlaWdodDogXCIxMDBweFwifVxyXG5dO1xyXG5cclxuLy8uV0tTUyBidXR0b24sIC5idXR0b25cclxudyA9IFtcclxuXHR7cG9zaXRpb246IFwicmVsYXRpdmVcIn0sXHJcblx0e2JhY2tncm91bmQ6IFwiI0ZGRlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjQ0NDXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjEwcHggMjVweCAxMHB4IDI1cHhcIn0sXHJcblx0e2NvbG9yOiBcIiMzMzNcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2Rpc3BsYXk6IFwiaW5saW5lICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgYnV0dG9uOmRpc2FibGVkXHJcbncgPSBbXHJcblx0e2JhY2tncm91bmQ6IFwiI0VCRUJFQlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjQ0NDXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjEwcHggMjVweCAxMHB4IDI1cHhcIn0sXHJcblx0e2NvbG9yOiBcIiMzMzNcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgLmJ1dHRvbjpob3ZlciwgYnV0dG9uOmhvdmVyOmVuYWJsZWRcclxudyA9IFtcclxuXHR7Y29sb3I6IFwiIzMzM1wifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiNFQkVCRUJcIn0sXHJcblx0e2JvcmRlckNvbG9yOiBcIiNBREFEQURcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgYnV0dG9uOmhvdmVyOmRpc2FibGVkXHJcbncgPSBbXHJcblx0e2N1cnNvcjogXCJkZWZhdWx0XCJ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXTtcclxuXHJcbi8vLmVycm9yXHJcbncgPSBbXHJcblx0e2JvcmRlckNvbG9yOlwiI0YwMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRjAwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmNhdXRpb25cclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiI0Y5MCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRjkwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmNvcnJlY3RcclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiIzBGMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjMEYwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmluZm9cclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiIzY5Njk2OSAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjNjk2OTY5ICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLnJldi1lcnJvclxyXG53ID0gW1xyXG5cdHt0ZXh0U2hhZG93OiBcIm5vbmVcIn0sXHJcblx0e2JvcmRlcjogXCIxcHggc29saWQgI0YwMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMTBweFwifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiNGMDBcIn0sXHJcblx0e3BhZGRpbmc6IFwiNHB4XCJ9LFxyXG5cdHttYXJnaW46IFwiNHB4XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGXCJ9LFxyXG5cdHtmb250OiBcIm5vcm1hbCAxOHB4IFxcXCLjg5Ljg6njgq7jg47op5LjgrQgUHJvIFczXFxcIiwgXFxcIkhpcmFnaW5vIEtha3UgR290aGljIFByb1xcXCIsT3Nha2EsIFxcXCLjg6HjgqTjg6rjgqpcXFwiLCBNZWlyeW8sIFxcXCLvvK3vvLMg77yw44K044K344OD44KvXFxcIiwgXFxcIk1TIFBHb3RoaWNcXFwiLCBzYW5zLXNlcmlmXCJ9XHJcbl07XHJcblxyXG4vLy5yZXYtY29ycmVjdFxyXG53ID0gW1xyXG5cdHt0ZXh0U2hhZG93Olwibm9uZVwifSxcclxuXHR7Ym9yZGVyOiBcIjFweFwifSxcclxuXHR7c29saWQ6IFwiIzA4OEEwOCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMTBweFwifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiMwODhBMDhcIn0sXHJcblx0e3BhZGRpbmc6IFwiNHB4XCJ9LFxyXG5cdHttYXJnaW46XCI0cHhcIn0sXHJcblx0e2NvbG9yOiBcIiNGRkZGRkZcIn0sXHJcblx0e2ZvbnQ6IFwibm9ybWFsIDE4cHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn1cclxuXTtcclxuXHJcbi8vI2FkZFxyXG53ID0gW1xyXG5cdHt3aWR0aDogd2luZG93Q29uZmlnLmFkZC53aWR0aH0sXHJcblx0e2hlaWdodDogd2luZG93Q29uZmlnLmFkZC5oZWlnaHR9LFxyXG5cdHttYXJnaW5MZWZ0OiAtd2luZG93Q29uZmlnLmFkZC53aWR0aC8yfVxyXG5dO1xyXG5cclxuLy8jZXhwb3J0LCAjaW1wb3J0XHJcbncgPSBbXHJcbntiYWNrZ3JvdW5kOiBcIiNmZmZcIn0sXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LndpZHRofSxcclxuXHR7aGVpZ2h0OiB3aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LmhlaWdodH0sXHJcblx0e21hcmdpbkxlZnQ6IC13aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNlZGl0XHJcbncgPSBbXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuZWRpdC53aWR0aH0sXHJcblx0e2hlaWdodDogd2luZG93Q29uZmlnLmVkaXQuaGVpZ2h0fSxcclxuXHR7bWFyZ2luTGVmdDogLXdpbmRvd0NvbmZpZy5lZGl0LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNzZWxmc3R1ZHlcclxudyA9IFtcclxuXHR7bGVmdDogXCI1MCVcIn0sXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuc3R1ZHkud2lkdGh9LFxyXG5cdHtoZWlnaHQ6IHdpbmRvd0NvbmZpZy5zdHVkeS5oZWlnaHR9LFxyXG5cdHttYXJnaW5MZWZ0OiAtd2luZG93Q29uZmlnLnN0dWR5LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNyZXN1bHR3aW5kb3dcclxudyA9IFtcclxuXHR7bGVmdDpcIjUwJVwifSxcclxuXHR7d2lkdGg6IHdpbmRvd0NvbmZpZy5yZXN1bHQud2lkdGggKyBcInB4XCJ9LFxyXG5cdHtoZWlnaHQ6IHdpbmRvd0NvbmZpZy5yZXN1bHQuaGVpZ2h0ICsgXCJweFwifSxcclxuXHR7bWFyZ2luTGVmdDogLXdpbmRvd0NvbmZpZy5yZXN1bHQud2lkdGgvMiArIFwicHhcIn1cclxuXTtcclxuXHJcbi8vI0F1ZGlvQnV0dG9uXHJcbncgPSBbXHJcblx0e21hcmdpblRvcDogXCIzNXB4XCJ9LFxyXG5cdHtwb3NpdGlvbjogXCJyZWxhdGl2ZVwifSxcclxuXHR7ZGlzcGxheTogXCJpbmxpbmUgIWltcG9ydGFudFwifSxcclxuXHR7V2Via2l0TWFyZ2luQmVmb3JlOiBcIjUwcHhcIn1cclxuXTtcclxuXHJcbi8vYnV0dG9uLndrc3MtY2xvc2VcclxudyA9IFtcclxuXHR7ZmxvYXQ6IFwicmlnaHRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjZmY0MDQwXCJ9LFxyXG5cdHtjb2xvcjogXCIjZmZmXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjBweFwifSxcclxuXHR7aGVpZ2h0OiBcIjI3cHhcIn0sXHJcblx0e3dpZHRoOiBcIjI3cHhcIn1cclxuXTtcclxuXHJcbi8vI3drc3MtY2xvc2VcclxudyA9IFtcclxuXHR7ZmxvYXQ6IFwicmlnaHRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjZmY0MDQwXCJ9LFxyXG5cdHtjb2xvcjogXCIjZmZmXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjBweFwifSxcclxuXHR7aGVpZ2h0OiBcIjI3cHhcIn0sXHJcblx0e3dpZHRoOiBcIjI3cHhcIn1cclxuXTtcclxuXHJcbi8vI3drc3Mta2FuamksICNyZXYta2FuamlcclxudyA9IFtcclxuXHR7dGV4dEFsaWduOiBcImNlbnRlciAhaW1wb3J0YW50XCJ9LFxyXG5cdHtmb250U2l6ZTogXCI1MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjOTQwMEQzICFpbXBvcnRhbnRcIn0sXHJcblx0e2NvbG9yOiBcIiNGRkZGRkYgIWltcG9ydGFudFwifSxcclxuXHR7Ym9yZGVyUmFkaXVzOiBcIjEwcHggMTBweCAwcHggMHB4XCJ9XHJcbl07XHJcblxyXG4vLyN3a3NzLXNvbHV0aW9uLCAjcmV2LXNvbHV0aW9uXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMzBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjJweFwifVxyXG5dO1xyXG5cclxuLy8jd2tzcy10eXBlXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMjRweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzY5Njk2OVwifSxcclxuXHR7Y29sb3I6IFwiI0ZGRkZGRiAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMHB4IDBweCAxMHB4IDEwcHhcIn1cclxuXTtcclxuXHJcbi8vI3Jldi10eXBlXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMjRweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGICFpbXBvcnRhbnRcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCIwcHggMHB4IDEwcHggMTBweFwifVxyXG5dO1xyXG4vLyN3a3NzLWlucHV0XHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiNDBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtoZWlnaHQ6IFwiODBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtsaW5lSGVpZ2h0OiBcIm5vcm1hbCAhaW1wb3J0YW50XCJ9XHJcbl07XHJcblxyXG4vLyNyZXYtaW5wdXRcclxudyA9IFtcclxuXHR7dGV4dEFsaWduOiBcImNlbnRlciAhaW1wb3J0YW50XCJ9LFxyXG5cdHtmb250U2l6ZTogXCI0MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2hlaWdodDogXCI2MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2xpbmVIZWlnaHQ6IFwibm9ybWFsICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzV0tTUztcclxuLy9tb2R1bGUuZXhwb3J0cyA9IHdrc3R5bGVDU1M7Il19
