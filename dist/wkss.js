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

module.exports = WanikaniUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWRkZWxlbWVudC5qcyIsInNyYy9idWlsZG5vZGUuanMiLCJzcmMvYnVpbGR3aW5kb3cuanMiLCJzcmMvaGFuZGxlQWRkQ2xpY2suanMiLCJzcmMvaGlqYWNrcmVxdWVzdHMuanMiLCJzcmMvaW1wb3J0dXRpbC5qcyIsInNyYy9yZXZpZXd1dGlsLmpzIiwic3JjL3N0b3JhZ2V1dGlsLmpzIiwic3JjL3RydW5rLmpzIiwic3JjL3dhbmlrYW5pdXRpbC5qcyIsInNyYy93aW5kb3djb25maWcuanMiLCJzcmMvd2tzdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0OEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGJ1aWxkTm9kZSA9IHJlcXVpcmUoJy4vYnVpbGRub2RlLmpzJyk7XHJcblxyXG4vLyBDcmVhdGUgRE9NIGZvciAnYWRkJyB3aW5kb3dcclxudmFyIGFkZEVsZW1lbnQgPSBidWlsZE5vZGUoJ2RpdicsIHtpZDogXCJhZGRcIiwgY2xhc3NOYW1lOiBcIldLU1NcIn0pO1xyXG5cclxudmFyIGZvcm1FbGVtZW50ID0gYnVpbGROb2RlKCdmb3JtJywge2lkOiBcImFkZEZvcm1cIn0pO1xyXG5hZGRFbGVtZW50LmFwcGVuZENoaWxkKGZvcm1FbGVtZW50KTtcclxuXHJcbnZhciBidXR0b25FbGVtZW50ID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiQWRkQ2xvc2VCdG5cIiwgY2xhc3NOYW1lOiBcIndrc3MtY2xvc2VcIiwgdHlwZTogXCJyZXNldFwifSk7XHJcbmZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW1lbnQpO1xyXG5cclxudmFyIGljb25FbGVtZW50ID0gYnVpbGROb2RlKCdpJywge2NsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwifSk7XHJcbmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkVsZW1lbnQpO1xyXG5cclxudmFyIGhlYWRlckVsZW1lbnQgPSBidWlsZE5vZGUoJ2gxJyk7XHJcbmZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xyXG5cclxudmFyIGhlYWRlclRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCBhIG5ldyBJdGVtXCIpO1xyXG5oZWFkZXJFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlclRleHQpO1xyXG5cclxudmFyIGlucHV0S2FuamlFbGVtZW50ID0gYnVpbGROb2RlKCdpbnB1dCcsIHtpZDogXCJhZGRLYW5qaVwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiRW50ZXIg5ryi5a2XLCDjgbLjgonjgYzjgaogb3Ig44Kr44K/44Kr44OKXCJ9KTtcclxuZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRLYW5qaUVsZW1lbnQpO1xyXG5cclxudmFyIGlucHV0UmVhZGluZ0VsZW1lbnQgPSBidWlsZE5vZGUoJ2lucHV0Jywge2lkOiBcImFkZFJlYWRpbmdcIiwgdHlwZTogXCJ0ZXh0XCIsIHRpdGxlOiBcIkxlYXZlIGVtcHR5IHRvIGFkZCB2b2NhYnVsYXJ5IGxpa2Ug44GZ44KLICh0byBkbylcIiwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgcmVhZGluZ1wifSk7XHJcbmZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0UmVhZGluZ0VsZW1lbnQpO1xyXG5cclxudmFyIGlucHV0TWVhbmluZ0VsZW1lbnQgPSBidWlsZE5vZGUoJ2lucHV0Jywge2lkOiBcImFkZE1lYW5pbmdcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcIkVudGVyIG1lYW5pbmdcIn0pO1xyXG5mb3JtRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dE1lYW5pbmdFbGVtZW50KTtcclxuXHJcbnZhciBwRWxlbWVudCA9IGJ1aWxkTm9kZSgncCcsIHtpZDogXCJhZGRTdGF0dXNcIn0pO1xyXG5mb3JtRWxlbWVudC5hcHBlbmRDaGlsZChwRWxlbWVudCk7XHJcblxyXG52YXIgcFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlJlYWR5IHRvIGFkZC4uXCIpO1xyXG5wRWxlbWVudC5hcHBlbmRDaGlsZChwVGV4dCk7XHJcblxyXG52YXIgZXhlY0J1dHRvbkVsZW1lbnQgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJBZGRJdGVtQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoZXhlY0J1dHRvbkVsZW1lbnQpO1xyXG5cclxudmFyIGV4ZWNUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJBZGQgbmV3IEl0ZW1cIik7XHJcbmV4ZWNCdXR0b25FbGVtZW50LmFwcGVuZENoaWxkKGV4ZWNUZXh0KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYWRkRWxlbWVudDsiLCIvKiogQnVpbGRzIGEgbm9kZSBlbGVtZW50IHdpdGggYW4gaWQgYW5kIGNsYXNzTmFtZSBhbmQgb3RoZXIgYXR0cmlidXRlcyBpZiBwcm92aWRlZFxyXG4qIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgZWxlbWVudCB0byBjcmVhdGUgKCdkaXYnLCAncCcsIGV0Yy4uLilcclxuKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaWQgLSBUaGUgaWQgb2YgdGhlIG5vZGVcclxuKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jbGFzc05hbWUgLSBPbmUgb3IgbW9yZSBjbGFzc2VzIGZvciB0aGUgZWxlbWVudCBzZXBlcmF0ZWQgYnkgc3BhY2VzXHJcbiogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgbm9kZSBidWlsdCBhcyBzcGVjaWZpZWRcclxuKi9cclxudmFyIGJ1aWxkTm9kZSA9IGZ1bmN0aW9uKHR5cGUsIG9wdGlvbnMpe1xyXG5cdHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHRmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xyXG5cdFx0aWYgKG9wdGlvbiA9PT0gXCJjbGFzc05hbWVcIiB8fCBvcHRpb24gPT09IFwiaWRcIil7XHJcblx0XHRcdG5vZGVbb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZShvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBub2RlO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZE5vZGU7IiwidmFyIGJ1aWxkTm9kZSA9IHJlcXVpcmUoJy4vYnVpbGRub2RlLmpzJyk7XHJcblxyXG4vLyB0YWcsIGlkLCBjbGFzc05hbWUsIG90aGVyLCBjaGlsZE5vZGVzXHJcblxyXG4vKiBJV2luZG93OlxyXG5cclxue1xyXG5cdGlkOiBcIldLU1MtZWRpdFwiLFxyXG5cdGNsYXNzTmFtZTogXCJXS1NTXCIsXHJcblx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0dGFnOiAnZm9ybScsXHJcblx0XHRpZDogXCJXS1NTLWVkaXRGb3JtXCIsXHJcblx0XHRjaGlsZE5vZGVzOlt7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIldLU1MtZWRpdENsb3NlQnRuXCIsXHJcblx0XHRcdGNsYXNzTmFtZTogXCJXS1NTLWNsb3NlXCJcclxuXHRcdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHRcdHRhZzogJ2knLFxyXG5cdFx0XHRcdGNsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwiXHJcblx0XHRcdH1dXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnaDEnLFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcclxuXHRcdFx0XHRcIkVkaXQgeW91ciBWb2NhYlwiICAgICAgICAgICAgICAgICA8LS0tIHN0cmluZyB0eXBlcyBmb3IgdGV4dCBub2RlXHJcblx0XHRcdF1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdzZWxlY3QnLFxyXG5cdFx0XHRpZDogXCJlZGl0V2luZG93XCIsXHJcblx0XHRcdG90aGVyOiB7c2l6ZTogXCI4XCJ9XHRcdFx0XHRcdDwtLS0gJ290aGVyJyBhdm9pZHMgY2xhc2hlcyB3aXRoIEhUTUxFbGVtZW50IGF0dHJpYnV0ZXMganVzdCBpbiBjYXNlXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnaW5wdXQnLCBcclxuXHRcdFx0b3RoZXI6e1xyXG5cdFx0XHRcdHR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdG5hbWU6IFwiXCIsXHJcblx0XHRcdFx0c2l6ZTogXCI0MFwiLFxyXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIlNlbGVjdCB2b2NhYiwgY2xpY2sgZWRpdCwgY2hhbmdlIGFuZCBzYXZlIVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGlkOiBcImVkaXRJdGVtXCJcclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdwJywgXHJcblx0XHRcdGlkOiBcImVkaXRTdGF0dXNcIlxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlJlYWR5IHRvIGVkaXQuLi5cIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RWRpdEJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkVkaXRcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0U2F2ZUJ0blwiLFxyXG5cdFx0XHRvdGhlcjp7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiU2F2ZVwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXREZWxldGVCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgaXRlbVwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJEZWxldGVcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RGVsZXRlQWxsQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIiwgdGl0bGU6IFwi5pys5b2T44Gr44KE44KL44Gu77yfXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkRlbGV0ZSBBbGxcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJSZXNldExldmVsc0J0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlJlc2V0IGxldmVsc1wiXVxyXG5cdFx0fV1cclxuXHR9XVxyXG59XHJcblxyXG4qL1xyXG5cclxudmFyIHN0cnVjdCA9IHtcclxuXHRpZDogXCJXS1NTLWVkaXRcIixcclxuXHRjbGFzc05hbWU6IFwiV0tTU1wiLFxyXG5cdGNoaWxkTm9kZXM6W3tcclxuXHRcdHRhZzogJ2Zvcm0nLFxyXG5cdFx0aWQ6IFwiV0tTUy1lZGl0Rm9ybVwiLFxyXG5cdFx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJXS1NTLWVkaXRDbG9zZUJ0blwiLFxyXG5cdFx0XHRjbGFzc05hbWU6IFwiV0tTUy1jbG9zZVwiLFxyXG5cdFx0XHRjaGlsZE5vZGVzOlt7XHJcblx0XHRcdFx0dGFnOiAnaScsXHJcblx0XHRcdFx0Y2xhc3NOYW1lOiBcImljb24tcmVtb3ZlXCJcclxuXHRcdFx0fV1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdoMScsXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRWRpdCB5b3VyIFZvY2FiXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnc2VsZWN0JyxcclxuXHRcdFx0aWQ6IFwiZWRpdFdpbmRvd1wiLFxyXG5cdFx0XHRvdGhlcjoge3NpemU6IFwiOFwifVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2lucHV0JywgXHJcblx0XHRcdG90aGVyOntcclxuXHRcdFx0XHR0eXBlOiBcInRleHRcIixcclxuXHRcdFx0XHRuYW1lOiBcIlwiLFxyXG5cdFx0XHRcdHNpemU6IFwiNDBcIixcclxuXHRcdFx0XHRwbGFjZWhvbGRlcjogXCJTZWxlY3Qgdm9jYWIsIGNsaWNrIGVkaXQsIGNoYW5nZSBhbmQgc2F2ZSFcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpZDogXCJlZGl0SXRlbVwiXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAncCcsIFxyXG5cdFx0XHRpZDogXCJlZGl0U3RhdHVzXCIsXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiUmVhZHkgdG8gZWRpdC4uLlwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXRFZGl0QnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRWRpdFwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXRTYXZlQnRuXCIsXHJcblx0XHRcdG90aGVyOnt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJTYXZlXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdERlbGV0ZUJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIkRlbGV0ZSBzZWxlY3RlZCBpdGVtXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIkRlbGV0ZVwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIkVkaXREZWxldGVBbGxCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCLmnKzlvZPjgavjgoTjgovjga7vvJ9cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRGVsZXRlIEFsbFwiXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIlJlc2V0TGV2ZWxzQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiUmVzZXQgbGV2ZWxzXCJdXHJcblx0XHR9XVxyXG5cdH1dXHJcbn07XHJcblxyXG4vLyAndGhpcycgY29udGV4dCBpcyBub2RlIHRvIGF0dGFjaCB0b1xyXG52YXIgYXR0YWNoQ2hpbGROb2RlID0gZnVuY3Rpb24oY2hpbGROb2RlKXtcclxuXHR2YXIgZWw7XHJcblx0aWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBjaGlsZE5vZGUpeyAvL1RleHROb2RlXHJcblx0XHQgZWwgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZE5vZGUpO1xyXG5cdH1cclxuXHRlbHNle1xyXG5cdFx0ZWwgPSBidWlsZE5vZGUoY2hpbGROb2RlLnRhZywge2lkOiBjaGlsZE5vZGUuaWQsIGNsYXNzTmFtZTogY2hpbGROb2RlLmNsYXNzTmFtZX0pO1xyXG5cdFx0Zm9yICh2YXIgYXR0ciBpbiBjaGlsZE5vZGUub3RoZXIpe1xyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgY2hpbGROb2RlLm90aGVyW2F0dHJdKTtcclxuXHRcdH1cclxuXHRcdGlmIChjaGlsZE5vZGUuY2hpbGROb2Rlcyl7XHJcblx0XHRcdGNoaWxkTm9kZS5jaGlsZE5vZGVzLmZvckVhY2goYXR0YWNoQ2hpbGROb2RlLCBlbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMuYXBwZW5kQ2hpbGQoZWwpO1xyXG59O1xyXG5cclxuLyoqIFRha2VzIGEgSlNPTiBvYmplY3Qgd2l0aCB0aGUgc3RydWN0dXJlIG9mIHRoZSB3aW5kb3cgdG8gY3JlYXRlIGFuZCBidWlsZHMgYSBESVZFbGVtZW50IGZyb20gdGhhdFxyXG4qIEBwYXJhbSB7SVdpbmRvd30gd2luZG93U3RydWN0dXJlXHJcbiogQHJldHVybnMge0RJVkVsZW1lbnR9IFRoZSBzcGVjaWZpZWQgd2luZG93LlxyXG4qL1xyXG52YXIgYnVpbGRXaW5kb3cgPSBmdW5jdGlvbih3aW5kb3dTdHJ1Y3R1cmUpIHtcclxuXHRcclxuXHR2YXIgcmVzdWx0V2luZG93ID0gYnVpbGROb2RlKCdkaXYnLCB7aWQ6IHdpbmRvd1N0cnVjdHVyZS5pZCwgY2xhc3NOYW1lOiB3aW5kb3dTdHJ1Y3R1cmUuY2xhc3NOYW1lfSk7XHJcblx0Zm9yICh2YXIgYXR0ciBpbiB3aW5kb3dTdHJ1Y3R1cmUub3RoZXIpe1xyXG5cdFx0cmVzdWx0V2luZG93LnNldEF0dHJpYnV0ZShhdHRyLCB3aW5kb3dTdHJ1Y3R1cmUub3RoZXJbYXR0cl0pO1xyXG5cdH1cclxuXHRpZiAod2luZG93U3RydWN0dXJlLmNoaWxkTm9kZXMpe1xyXG5cdFx0d2luZG93U3RydWN0dXJlLmNoaWxkTm9kZXMuZm9yRWFjaChhdHRhY2hDaGlsZE5vZGUsIHJlc3VsdFdpbmRvdyk7XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHRXaW5kb3c7XHJcbn07XHJcblxyXG4vKlx0XHJcbntcdFxyXG5cdFx0dmFyIGVkaXRGb3JtID0gYnVpbGROb2RlKCdmb3JtJywge2lkOiBcIldLU1MtZWRpdEZvcm1cIn0pO1xyXG5cdGVkaXRXaW5kb3cuYXBwZW5kQ2hpbGQoZWRpdEZvcm0pO1xyXG5cdFx0XHR2YXIgZWRpdENsb3NlQnV0dG9uID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiV0tTUy1lZGl0Q2xvc2VCdG5cIiwgY2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdENsb3NlQnV0dG9uKTtcclxuXHRcclxuXHRcdFx0ZWRpdENsb3NlQnV0dG9uLmFwcGVuZENoaWxkKGJ1aWxkTm9kZSgnaScsIHtjbGFzc05hbWU6IFwiaWNvbi1yZW1vdmVcIn0pKTtcclxuXHRcdFx0dmFyIGgxRWxlbWVudCA9IGJ1aWxkTm9kZSgnaDEnKTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGgxRWxlbWVudCk7XHJcblx0XHRcdGgxRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVkaXQgeW91ciBWb2NhYlwiKSk7XHJcblx0XHRcdHZhciBzZWxlY3RFbGVtZW50ID0gYnVpbGROb2RlKCdzZWxlY3QnLCB7aWQ6IFwiZWRpdFdpbmRvd1wiLCBzaXplOiBcIjhcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoc2VsZWN0RWxlbWVudCk7XHJcblx0XHRcdHZhciBlZGl0SXRlbVRleHQgPSBidWlsZE5vZGUoJ2lucHV0Jywge3R5cGU6IFwidGV4dFwiIGlkOiBcImVkaXRJdGVtXCIgbmFtZTogXCJcIiBzaXplOiBcIjQwXCIgcGxhY2Vob2xkZXI6IFwiU2VsZWN0IHZvY2FiLCBjbGljayBlZGl0LCBjaGFuZ2UgYW5kIHNhdmUhXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRJdGVtVGV4dCk7Ly8uLlxyXG5cdFx0XHR2YXIgZWRpdFN0YXR1cyA9IGJ1aWxkTm9kZSgncCcsIHtpZDogXCJlZGl0U3RhdHVzXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRTdGF0dXMpO1xyXG5cdFx0XHRlZGl0U3RhdHVzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUmVhZHkgdG8gZWRpdC4uXCIpKTtcclxuXHRcclxuXHRcdFx0dmFyIGVkaXRCdXR0b24gPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0RWRpdEJ0blwiLCB0eXBlOiBcImJ1dHRvblwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcclxuXHRcdFx0ZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVkaXRcIikpO1xyXG5cdFx0XHR2YXIgZWRpdFNhdmUgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0U2F2ZUJ0blwiLCB0eXBlOiBcImJ1dHRvblwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0U2F2ZSk7XHJcblx0XHRcdGVkaXRTYXZlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiU2F2ZVwiKSk7XHJcblx0XHRcdHZhciBlZGl0RGVsZXRlID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiRWRpdERlbGV0ZUJ0blwiLCB0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgaXRlbVwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlKTtcclxuXHRcdFx0ZWRpdERlbGV0ZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkRlbGV0ZVwiKSk7XHJcblx0XHRcdHZhciBlZGl0RGVsZXRlQWxsID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiRWRpdERlbGV0ZUFsbEJ0blwiLCB0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCLmnKzlvZPjgavjgoTjgovjga7vvJ9cIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUFsbCk7XHJcblx0XHRcdGVkaXREZWxldGVBbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJEZWxldGUgQWxsXCIpKTtcclxuXHRcdFx0dmFyIGVkaXRSZXNldExldmVscyA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIlJlc2V0TGV2ZWxzQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRSZXNldExldmVscyk7XHJcblx0XHRcdGVkaXRSZXNldExldmVscy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlJlc2V0IGxldmVsc1wiKSk7XHJcblx0XHRcclxuXHRyZXR1cm4gZWRpdFdpbmRvdztcclxufTsqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkV2luZG93OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGthbmppID0gJChcIiNhZGRLYW5qaVwiKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xyXG5cdHZhciByZWFkaW5nID0gJChcIiNhZGRSZWFkaW5nXCIpLnZhbCgpLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1ss44CBXStcXHMqLyk7IC8vc3BsaXQgYXQgLCBvciDjgIFmb2xsb3dlZCBieSAwIG9yIGFueSBudW1iZXIgb2Ygc3BhY2VzXHJcblx0dmFyIG1lYW5pbmcgPSAkKFwiI2FkZE1lYW5pbmdcIikudmFsKCkudG9Mb3dlckNhc2UoKS5zcGxpdCgvWyzjgIFdK1xccyovKTtcclxuXHR2YXIgc3VjY2VzcyA9IGZhbHNlOyAvL2luaXRhbGlzZSB2YWx1ZXNcclxuXHR2YXIgbWVhbmxlbiA9IDA7XHJcblxyXG5cdHZhciBpID0gbWVhbmluZy5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSl7XHJcblx0XHRtZWFubGVuICs9IG1lYW5pbmdbaV0ubGVuZ3RoO1xyXG5cdH1cclxuXHJcblx0Ly9pbnB1dCBpcyBpbnZhbGlkOiBwcm9tcHQgdXNlciBmb3IgdmFsaWQgaW5wdXRcclxuXHR2YXIgaXRlbSA9IHt9O1xyXG5cdGlmIChrYW5qaS5sZW5ndGggPT09IDAgfHwgbWVhbmxlbiA9PT0gMCkge1xyXG5cdFx0JChcIiNhZGRTdGF0dXNcIikudGV4dChcIk9uZSBvciBtb3JlIHJlcXVpcmVkIGZpZWxkcyBhcmUgZW1wdHkhXCIpO1xyXG5cdFx0aWYgKGthbmppLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHQkKFwiI2FkZEthbmppXCIpLmFkZENsYXNzKFwiZXJyb3JcIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKFwiI2FkZEthbmppXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XHJcblx0XHR9XHJcblx0XHRpZiAobWVhbmxlbiA9PT0gMCkge1xyXG5cdFx0XHQkKFwiI2FkZE1lYW5pbmdcIikuYWRkQ2xhc3MoXCJlcnJvclwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoXCIjYWRkTWVhbmluZ1wiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAoZGVidWdnaW5nKSB7Y29uc29sZS5sb2coXCJidWlsZGluZyBpdGVtOiBcIitrYW5qaSk7fVxyXG5cdFx0aXRlbS5rYW5qaSA9IGthbmppO1xyXG5cdFx0aXRlbS5yZWFkaW5nID0gcmVhZGluZzsgLy9vcHRpb25hbFxyXG5cdFx0aXRlbS5tZWFuaW5nID0gbWVhbmluZztcclxuXHJcblx0XHRzdWNjZXNzID0gdHJ1ZTtcclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHtjb25zb2xlLmxvZyhcIml0ZW0gaXMgdmFsaWRcIik7fVxyXG5cdH1cclxuXHJcblx0Ly9vbiBzdWNjZXNzZnVsIGNyZWF0aW9uIG9mIGl0ZW1cclxuXHRpZiAoc3VjY2Vzcykge1xyXG5cdFx0Ly9jbGVhciBlcnJvciBsYXlvdXQgdG8gcmVxdWlyZWQgZmllbGRzXHJcblx0XHQkKFwiI2FkZEthbmppXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XHJcblx0XHQkKFwiI2FkZE1lYW5pbmdcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuXHJcblxyXG5cclxuXHRcdC8vaWYgdGhlcmUgYXJlIGFscmVhZHkgdXNlciBpdGVtcywgcmV0cmlldmUgdm9jYWJMaXN0XHJcblx0XHQvLyB2YXIgdm9jYWJMaXN0ID0gW107XHJcblx0XHR2YXIgdm9jYWJMaXN0ID0gZ2V0RnVsbExpc3QoKTtcclxuXHJcblx0XHRpZiAoZGVidWdnaW5nKSB7Y29uc29sZS5sb2coXCJ2b2NhYkxpc3QgcmV0cmlldmVkLCBsZW5ndGg6IFwiK3ZvY2FiTGlzdC5sZW5ndGgpO31cclxuXHRcdC8vY2hlY2sgc3RvcmVkIHVzZXIgaXRlbXMgZm9yIGR1cGxpY2F0ZXMgKioqKioqKioqKioqKioqKioqIHRvIGRvOiBvcHRpb24gZm9yIGVkaXRpbmcgZHVwbGljYXRlIGl0ZW0gd2l0aCBuZXcgaW5wdXRcclxuXHRcdGlmKGNoZWNrRm9yRHVwbGljYXRlcyh2b2NhYkxpc3QsaXRlbSkpIHtcclxuXHRcdFx0JChcIiNhZGRTdGF0dXNcIikudGV4dChcIkR1cGxpY2F0ZSBJdGVtIGRldGVjdGVkIVwiKTtcclxuXHRcdFx0JChcIiNhZGRLYW5qaVwiKS5hZGRDbGFzcyhcImVycm9yXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0Vm9jSXRlbShpdGVtKTtcclxuXHJcblx0XHRpZiAoZGVidWdnaW5nKSB7Y29uc29sZS5sb2coXCJjbGVhciBmb3JtXCIpO31cclxuXHRcdCQoXCIjYWRkRm9ybVwiKVswXS5yZXNldCgpO1xyXG5cclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGlmIChpdGVtLm1hbnVhbExvY2sgPT09IFwieWVzXCIgfHwgaXRlbS5tYW51YWxMb2NrID09PSBcIkRCXCIgJiYgbG9ja0RCKXtcclxuXHRcdFx0JChcIiNhZGRTdGF0dXNcIikuaHRtbChcIjxpIGNsYXNzPVxcXCJpY29uLWxvY2tcXFwiPjwvaT4gQWRkZWQgbG9ja2VkIGl0ZW1cIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKFwiI2FkZFN0YXR1c1wiKS5odG1sKFwiPGkgY2xhc3M9XFxcImljb24tdW5sb2NrXFxcIj48L2k+QWRkZWQgc3VjY2Vzc2Z1bGx5XCIpO1xyXG5cdFx0fVxyXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdH1cclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8ge1wibGV2ZWxcIjpcIjE3XCIsXCJtZWFuaW5nX2V4cGxhbmF0aW9uXCI6XCJUaGlzIHdvcmQgY29uc2lzdHMgb2Yga2Fuamkgd2l0aCBoaXJhZ2FuYSBhdHRhY2hlZC4gQmVjYXVzZSB0aGUgaGlyYWdhbmEgZW5kcyB3aXRoIGFuIFtqYV3jgYZbL2phXSBzb3VuZCwgeW91IGtub3cgdGhpcyB3b3JkIGlzIGEgdmVyYi4gVGhlIGthbmppIGl0c2VsZiBtZWFucyBba2FuamldZmxvdXJpc2hbL2thbmppXSBvciBba2FuamldcHJvc3Blcml0eVsva2FuamldLCBzbyB0aGUgdmVyYiB2b2NhYiB2ZXJzaW9ucyBvZiB0aGVzZSB3b3VsZCBiZSBbdm9jYWJ1bGFyeV10byBmbG91cmlzaFsvdm9jYWJ1bGFyeV0gb3IgW3ZvY2FidWxhcnlddG8gcHJvc3Blclsvdm9jYWJ1bGFyeV0uXCIsXCJyZWFkaW5nX2V4cGxhbmF0aW9uXCI6XCJTaW5jZSB0aGlzIHdvcmQgY29uc2lzdHMgb2YgYSBrYW5qaSB3aXRoIGhpcmFnYW5hIGF0dGFjaGVkLCB5b3UgY2FuIGJldCB0aGF0IGl0IHdpbGwgdXNlIHRoZSBrdW4neW9taSByZWFkaW5nLiBZb3UgZGlkbid0IGxlYXJuIHRoYXQgcmVhZGluZyB3aXRoIHRoaXMga2FuamksIHNvIGhlcmUncyBhIG1uZW1vbmljIHRvIGhlbHAgeW91OiBXaGF0IGRvIHlvdSBmbG91cmlzaCBhdD8gWW91J3JlIGFuIGFtYXppbmcgW3ZvY2FidWxhcnldc29jY2VyWy92b2NhYnVsYXJ5XSAoW2phXeOBleOBi1svamFdKSBwbGF5ZXIgd2hvIGZsb3VyaXNoZXMgYW5kIHByb3NwZXJzIG5vIG1hdHRlciB3aGVyZSB5b3UgZ28gdG8gcGxheSB0aGlzIHdvbmRlcmZ1bCAoYnV0IG5vdCBhcyBnb29kIGFzIGJhc2ViYWxsKSBzcG9ydC5cIixcImVuXCI6XCJUbyBGbG91cmlzaCwgVG8gUHJvc3BlclwiLFwia2FuYVwiOlwi44GV44GL44GI44KLXCIsXCJzZW50ZW5jZXNcIjpbW1wi5Lit5Zu944Gr44Gv44CB6Kaa44Gb44GE5Ymk44Gu55Sf55Sj44Gn5qCE44GI44Gm44GE44Gf5p2R44GM44GC44KK44G+44GX44Gf44CCXCIsXCJUaGVyZSB3YXMgYSB2aWxsYWdlIGluIENoaW5hIGZsb3VyaXNoaW5nIG9uIHRoZWlyIHByb2R1Y3Rpb24gb2Ygc3RpbXVsYW50cy4gXCJdXSxcInBhcnRzX29mX3NwZWVjaF9pZHNcIjpbXCI0XCIsXCIxOVwiXSxcInBhcnRfb2Zfc3BlZWNoXCI6XCJJbnRyYW5zaXRpdmUgVmVyYiwgSWNoaWRhbiBWZXJiXCIsXCJhdWRpb1wiOlwiMmUxOTRjYmYxOTQzNzFjZDQ3ODQ4MGQ2ZWE2Nzc2OWRhNjIzZTk5YS5tcDNcIixcIm1lYW5pbmdfbm90ZVwiOm51bGwsXCJyZWFkaW5nX25vdGVcIjpudWxsLFwicmVsYXRlZFwiOlt7XCJrYW5cIjpcIuaghFwiLFwiZW5cIjpcIlByb3NwZXJpdHksIEZsb3VyaXNoXCIsXCJzbHVnXCI6XCLmoIRcIn1dfVxyXG5cclxuXHJcblx0aWYgKHR5cGVvZiAkLm1vY2tqYXggPT09IFwiZnVuY3Rpb25cIil7XHJcblx0XHQkLm1vY2tqYXgoe1xyXG5cdFx0XHR1cmw6IC9eXFwvanNvblxcL3Byb2dyZXNzXFw/dldLU1MoLispXFxbXFxdPSguKykmdldLU1MuK1xcW1xcXT0oLispJC8sXHJcblx0XHRcdHVybFBhcmFtczpbXCJXS1NTaWRcIiwgXCJNZWFuaW5nV3JvbmdcIiwgXCJSZWFkaW5nV3JvbmdcIl0sXHJcblx0XHRcdHJlc3BvbnNlOiBmdW5jdGlvbihzZXR0aW5ncykge1xyXG5cdFx0XHRcdC8vIGRvIGFueSByZXF1aXJlZCBjbGVhbnVwXHJcblx0XHRcdFx0dmFyIGlkID0gTnVtYmVyKHNldHRpbmdzLnVybFBhcmFtcy5XS1NTaWQpO1xyXG5cdFx0XHRcdHZhciBNdyA9IE51bWJlcihzZXR0aW5ncy51cmxQYXJhbXMuTWVhbmluZ1dyb25nKTtcclxuXHRcdFx0XHR2YXIgUncgPSBOdW1iZXIoc2V0dGluZ3MudXJsUGFyYW1zLlJlYWRpbmdXcm9uZyk7XHJcblx0XHRcdFx0dmFyIFVzZXJWb2NhYiA9IGxvY2FsR2V0KFwiVXNlci1Wb2NhYlwiKXx8W107XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiaXMgdGhpcyB5b3VyIGNhcmQ/XCIsIFVzZXJWb2NhYltpZF0pO1xyXG5cdFx0XHRcdGlmIChVc2VyVm9jYWJbaWRdLmR1ZSA8IERhdGUubm93KCkpey8vZG91YmxlIGNoZWNrIHRoYXQgaXRlbSB3YXMgZHVlIGZvciByZXZpZXdcclxuXHRcdFx0XHRcdGlmIChNd3x8Uncpe1xyXG5cdFx0XHRcdFx0XHQvL2Ryb3AgbGV2ZWxzIGlmIHdyb25nXHJcblxyXG5cdFx0XHRcdFx0XHQvL0FkYXB0ZWQgZnJvbSBXYW5pS2FuaSdzIHNycyB0byBhdXRoZW50aWNhbGx5IG1pbWljIGxldmVsIGRvd25zXHJcblx0XHRcdFx0XHRcdHZhciBvID0gKE13fHwwKSsoUnd8fDApO1xyXG5cdFx0XHRcdFx0XHR2YXIgdCA9IFVzZXJWb2NhYltpZF0ubGV2ZWw7XHJcblx0XHRcdFx0XHRcdHZhciByPXQ+PTU/MipNYXRoLnJvdW5kKG8vMik6MSpNYXRoLnJvdW5kKG8vMik7XHJcblx0XHRcdFx0XHRcdHZhciBuPXQtcjwxPzE6dC1yOy8vZG9uJ3Qgc3RheSBvbiAnc3RhcnRlZCdcclxuXHJcblx0XHRcdFx0XHRcdFVzZXJWb2NhYltpZF0ubGV2ZWwgPSBuO1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdC8vaW5jcmVhc2UgbGV2ZWwgaWYgbm9uZSB3cm9uZ1xyXG5cdFx0XHRcdFx0XHRVc2VyVm9jYWJbaWRdLmxldmVsKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvL1B1dCBVc2VyVm9jYWIgYmFjayBpbiBzdG9yYWdlXHJcblx0XHRcdFx0XHRVc2VyVm9jYWJbaWRdLmRhdGUgPSBEYXRlLm5vdygpO1xyXG5cdFx0XHRcdFx0VXNlclZvY2FiW2lkXS5kdWUgPSBEYXRlLm5vdygpICsgc3JzaW50ZXJ2YWxzW1VzZXJWb2NhYltpZF0ubGV2ZWxdO1xyXG5cdFx0XHRcdFx0bG9jYWxTZXQoXCJVc2VyLVZvY2FiXCIsIFVzZXJWb2NhYik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhVc2VyVm9jYWJbaWRdLmR1ZSArXCIgPiBcIisgRGF0ZS5ub3coKSArIFwiIChcIiArIG1zMnN0cihVc2VyVm9jYWJbaWRdLmR1ZSAtIERhdGUubm93KCkpK1wiKVwiKTtcclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlRoaXMgaXRlbSBpcyBub3QgZHVlIGZvciByZXZpZXcgeWV0LCBkaXNjYXJkaW5nIHJlc3VsdHNcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMucmVzcG9uc2VUZXh0ID0gJ3tcInZXS1NTJytpZC50b1N0cmluZygpKydcIjpbXCInK013LnRvU3RyaW5nKCkrJ1wiLFwiJytSdy50b1N0cmluZygpKydcIl19JztcclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQubW9ja2pheCh7XHJcblx0XHRcdHVybDogL15cXC9qc29uXFwvdm9jYWJ1bGFyeVxcL1dLU1MoLispLyxcclxuXHRcdFx0dXJsUGFyYW1zOltcIldLU1NpZFwiXSxcclxuXHRcdFx0cmVzcG9uc2U6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XHJcblxyXG5cdFx0XHRcdC8vIEludmVzdGlnYXRlIHRoZSBgc2V0dGluZ3NgIHRvIGRldGVybWluZSB0aGUgcmVzcG9uc2UuLi5cclxuXHRcdFx0XHR2YXIgaWQgPSBzZXR0aW5ncy51cmxQYXJhbXMuV0tTU2lkLnRvU3RyaW5nKCk7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRJdGVtID0gJC5qU3RvcmFnZS5nZXQoXCJjdXJyZW50SXRlbVwiKTtcclxuXHRcdFx0XHRpZiAoY3VycmVudEl0ZW0uaWQgPT09IFwiV0tTU1wiK2lkKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiYXMgZXhwZWN0ZWRcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciByZWxhdGVkID0gJ1snO1xyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjdXJyZW50SXRlbS5jb21wb25lbnRzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdHJlbGF0ZWQgKz0gJ3tcImthblwiOlwiJytjdXJyZW50SXRlbS5jb21wb25lbnRzW2ldKydcIixcImVuXCI6XCJcIixcInNsdWdcIjpcIicrY3VycmVudEl0ZW0uY29tcG9uZW50c1tpXSsnXCJ9JztcclxuXHRcdFx0XHRcdHJlbGF0ZWQgKz0gKGkrMTxjdXJyZW50SXRlbS5jb21wb25lbnRzLmxlbmd0aCk/JywnOicnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWxhdGVkICs9ICddJztcclxuXHJcblx0XHRcdFx0dmFyIHJlc3BUZXh0ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdFx0bGV2ZWw6IFwiVVwiLFxyXG5cdFx0XHRcdFx0bWVhbmluZ19leHBsYW5hdGlvbjogXCJUaGlzIGlzIHVzZXItZGVmaW5lZCBpdGVtLiBNZWFuaW5nIGV4cGxhbmF0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGlzIHRpbWUuIFtpZDogXCIraWQrXCJdXCIsXHJcblx0XHRcdFx0XHRyZWFkaW5nX2V4cGxhbmF0aW9uOiBcIlRoaXMgaXMgdXNlci1kZWZpbmVkIGl0ZW0uIFJlYWRpbmcgZXhwbGFuYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIGF0IHRoaXMgdGltZS4gW2lkOiBcIitpZCtcIl1cIixcclxuXHRcdFx0XHRcdGVuOiBjdXJyZW50SXRlbS5lbi5qb2luKFwiLCBcIiksXHJcblx0XHRcdFx0XHRrYW5hOiBjdXJyZW50SXRlbS5rYW5hLmpvaW4oXCIsIFwiKSxcclxuXHRcdFx0XHRcdHNlbnRlbmNlczpbXSxcclxuXHRcdFx0XHRcdHBhcnRzX29mX3NwZWVjaF9pZHM6W10sXHJcblx0XHRcdFx0XHRwYXJ0X29mX3NwZWVjaDpbXSxcclxuXHRcdFx0XHRcdGF1ZGlvOm51bGwsXHJcblx0XHRcdFx0XHRtZWFuaW5nX25vdGU6bnVsbCxcclxuXHRcdFx0XHRcdHJlYWRpbmdfbm90ZTpudWxsLFxyXG5cdFx0XHRcdFx0cmVsYXRlZDpKU09OLnBhcnNlKHJlbGF0ZWQpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5yZXNwb25zZVRleHQgPSByZXNwVGV4dDtcclxuXHRcdFx0fSxcclxuXHRcdFx0b25BZnRlckNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBkbyBhbnkgcmVxdWlyZWQgY2xlYW51cFxyXG5cdFx0XHRcdCQoXCIudXNlci1zeW5vbnltc1wiKS5yZW1vdmUoKTtcclxuXHRcdFx0XHQvLyBrZWVwaW5nIHRoZSBob29rcyBmb3IgQ29tbXVuaXR5IE1uZW1vbmljc1xyXG5cdFx0XHRcdCQoXCIjbm90ZS1tZWFuaW5nLCAjbm90ZS1yZWFkaW5nXCIpLmh0bWwoXCJcIik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuLy8tLS0tLS0tLS0tLS0tLUVuZCBJbnNlcnQgSW50byBXSyBSZXZpZXcgRnVuY3Rpb25zLS0tLS0tLS0tLS0tLS1cclxuXHJcbiIsIlxyXG52YXIgSW1wb3J0VXRpbCA9IHtcclxuXHRmaWxlVXBsb2FkOiBmdW5jdGlvbihldil7XHJcblx0XHR2YXIgY3N2SGVhZGVyID0gdHJ1ZTsgICAgICAgIC8vZmlyc3Qgcm93IGNvbnRhaW5zIHN0dWZmIGxpa2UgXCJLYW5qaS9Wb2NhYiwgUmVhZGluZywgTWVhbmluZ1wiIGV0Y1xyXG5cdFx0dmFyIHRzdmZpbGU7ICAgICAgICAgIC8vdGFicyBzZXBhcmF0ZSBmaWVsZHMsIGNvbW1hcyBzZXBlcmF0ZSB2YWx1ZXM/IG9yIGZhbHNlIGZvciB2aWNlIHZlcnNhXHJcblx0XHR2YXIgQ1NWcyA9IGV2LnRhcmdldC5maWxlcztcclxuXHRcdHZhciBuYW1lID1DU1ZzWzBdLm5hbWU7XHJcblx0XHR2YXIgY29sc3BsaXQsIHZzcGxpdDtcclxuXHRcdGlmIChuYW1lLnN1YnN0cihuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSw0KT09PVwiLmNzdlwiKXtcclxuXHRcdFx0dHN2ZmlsZSA9IGZhbHNlO1xyXG5cdFx0XHRjb2xzcGxpdCA9IFwiLFwiO1xyXG5cdFx0XHR2c3BsaXQgPSBcIlxcdFwiO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRzdmZpbGUgPSB0cnVlO1xyXG5cdFx0XHRjb2xzcGxpdCA9IFwiXFx0XCI7XHJcblx0XHRcdHZzcGxpdCA9IFwiLFwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHsgY29uc29sZS5sb2coXCJ0c3ZmaWxlOiBcIik7IH1cclxuXHRcdGlmIChkZWJ1Z2dpbmcpIHsgY29uc29sZS5sb2coXCJmaWxlIHVwbG9hZGVkOiBcIitDU1ZzWzBdLm5hbWUpOyB9XHJcblx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdHJlYWRlci5yZWFkQXNUZXh0KENTVnNbMF0pO1xyXG5cdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0dmFyIGNzdlN0cmluZyA9IGV2LnRhcmdldC5yZXN1bHQ7XHJcblx0XHRcdHZhciBjc3ZSb3cgPSBjc3ZTdHJpbmcuc3BsaXQoXCJcXG5cIik7XHJcblx0XHRcdC8vZGVmYXVsdCBjb2x1bW4gcm93c1xyXG5cdFx0XHR2YXIgayA9IDA7XHJcblx0XHRcdHZhciByID0gMTtcclxuXHRcdFx0dmFyIG0gPSAyO1xyXG5cclxuXHRcdFx0dmFyIGkgPSBjc3ZSb3cubGVuZ3RoO1xyXG5cdFx0XHQvL3Byb2Nlc3MgaGVhZGVyLCBjaGFuZ2luZyBrLHIsbSBpZiBuZWNlc3NhcnlcclxuXHRcdFx0dmFyIEpTT05pbXBvcnQgPSBbXTtcclxuXHRcdFx0d2hpbGUoaS0tKXtcclxuXHRcdFx0XHR2YXIgcm93ID0gY3N2Um93W2ldO1xyXG5cdFx0XHRcdGlmICgoY3N2SGVhZGVyID09PSB0cnVlICYmIGkgPT09IDApfHwgIC8vICBTa2lwIGhlYWRlclxyXG5cdFx0XHRcdFx0KHJvdyA9PT0gXCJcIikgLy8gU2tpcCBlbXB0eSByb3dzXHJcblx0XHRcdFx0ICAgKXtcclxuXHRcdFx0XHRcdGlmIChkZWJ1Z2dpbmcpIHsgY29uc29sZS5sb2coXCJTa2lwcGluZyByb3cgI1wiK2kpOyB9XHJcblxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocm93KTtcclxuXHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsZW0gPSByb3cuc3BsaXQoY29sc3BsaXQpO1xyXG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSB7fTtcclxuXHRcdFx0XHRcdHZhciBjO1xyXG5cclxuXHRcdFx0XHRcdGlmIChlbGVtW2tdKXtcclxuXHRcdFx0XHRcdFx0aXRlbS5rYW5qaSA9IGVsZW1ba10udHJpbSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGVsZW1bcl0pe1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoZWxlbVtyXS5pbmRleE9mKHZzcGxpdCk+LTEpe1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZWcgJ3JlYWRpbmcgMVt0YWJdcmVhZGluZyAyW3RhYl1yZWFkaW5nIDMnXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5yZWFkaW5nID0gZWxlbVtyXS5zcGxpdCh2c3BsaXQpO1xyXG5cdFx0XHRcdFx0XHRcdH1lbHNleyAvL25vIHRhYnMgaW4gc3RyaW5nLCBzaW5nbGUgdmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW0ucmVhZGluZz1bZWxlbVtyXV07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS5yZWFkaW5nPVtcIlwiXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGVsZW1bbV0pe1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoZWxlbVttXS5pbmRleE9mKHZzcGxpdCk+LTEpe1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZWcgJ21lYW5pbmcgMVt0YWJdbWVhbmluZyAyW3RhYl1tZWFuaW5nIDMnXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5tZWFuaW5nID0gZWxlbVttXS5zcGxpdChcIlxcdFwiKTtcclxuXHRcdFx0XHRcdFx0XHR9ZWxzZXsgLy9ubyB0YWJzIGluIHN0cmluZywgc2luZ2xlIHZhbHVlXHJcblx0XHRcdFx0XHRcdFx0XHRpdGVtLm1lYW5pbmc9W2VsZW1bbV1dO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0YyA9IGl0ZW0ubWVhbmluZy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHdoaWxlKGMtLSl7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIml0ZW0ubWVhbmluZ1tcIitjK1wiXTogXCIraXRlbS5tZWFuaW5nW2NdKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1lbHNley8vdG9kbzogcHJvdmlkZSBvdmVyd3JpdGUgb3B0aW9uIG9uIGZvcmNlZCBtZWFuaW5nXHJcblx0XHRcdFx0XHRcdFx0aXRlbS5tZWFuaW5nPVtcIlwiXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0SlNPTmltcG9ydC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHRcdFx0fWVsc2V7IC8vIGNvcnJ1cHQgcm93ICgna2FuamknIGlzIG1hbmRhdG9yeSAoY2FuIGJlIGthbmEtb25seSB3b3JkKSwgaXMgbm90IHByZXNlbnQgb24gcm93LCBza2lwXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBKU09Oc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoSlNPTmltcG9ydCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKEpTT05pbXBvcnQpO1xyXG5cclxuXHRcdFx0aWYgKEpTT05zdHJpbmcubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHZhciBhZGQgPSBKU09OLnBhcnNlKEpTT05zdHJpbmcudG9Mb3dlckNhc2UoKSk7XHJcblx0XHRcdFx0XHQvKi8vLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS1cclxuXHRcdFx0XHQgaWYgKCFjaGVja0FkZChhZGQpKSB7XHJcblx0XHRcdFx0ICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJObyB2YWxpZCBpbnB1dCAoZHVwbGljYXRlcz8pIVwiKTtcclxuXHRcdFx0XHQgcmV0dXJuO1xyXG5cdFx0XHRcdCB9XHJcblx0XHRcdFx0IC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFx0XHRcdFx0dmFyIGEgPSBhZGQubGVuZ3RoO1xyXG5cdFx0XHRcdFx0d2hpbGUoYS0tKXtcclxuXHRcdFx0XHRcdFx0U3RvcmFnZVV0aWwuc2V0Vm9jSXRlbShhZGRbYV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJJbXBvcnQgc3VjY2Vzc2Z1bCFcIik7XHJcblxyXG5cdFx0XHRcdFx0JChcIiNpbXBvcnRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcblx0XHRcdFx0XHQkKFwiI2ltcG9ydEFyZWFcIikudGV4dChcIlwiKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHQkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KFwiUGFyc2luZyBFcnJvciFcIik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJOb3RoaW5nIHRvIGltcG9ydCA6KCBQbGVhc2UgcGFzdGUgeW91ciBzdHVmZiBmaXJzdFwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbXBvcnRVdGlsOyIsInZhciBSZXZpZXdVdGlsID0ge1xyXG5cdC8qKiBUYWtlcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCByZXR1cm5zIHRoZSBwb3J0aW9ucyBiZWZvcmUgbGVmdCBicmFja2V0cyAnKCcgYnV0IG9ubHkgZm9yIHN0cmluZ3MgdGhhdCBoYXZlIHRoZW0uIEl0IGlzIHVzZWQgdG8gYWRkIHN5bm9ueW0gdmFsdWVzIHRvIHRoZSBhbnN3ZXIgbGlzdC5cclxuXHQqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHNvbHV0aW9uIC0gQW4gYXJyYXkgb2YgYWNjZXB0YWJsZSBhbnN3ZXJzIGZvciB0aGUgVGFza1xyXG5cdCogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fSBQYXJ0cyBvZiB0aGUgc29sdXRpb24gbGVmdCBvZiBsZWZ0IGJyYWNrZXQgaW4gc3RyaW5ncyB3aGVyZSBpdCBleGlzdHNcclxuXHQqIEBleGFtcGxlIHVuYnJhY2tldFNvbHV0aW9uKFtcIm5ld3NwYXBlclwiLCBcInJlYWRpbmcgU3RpY2sgKHRoaXMgdGV4dCB3b24ndCBnZXQgdGhyb3VnaClcIl0pIC8vIFtcInJlYWRpbmcgc3RpY2tcIl1cclxuXHQqL1xyXG5cdHVuYnJhY2tldFNvbHV0aW9uOiBmdW5jdGlvbihzb2x1dGlvbil7XHJcbiAgICAgICAgdmFyIHVuYnJhY2tldGVkID0gc29sdXRpb24uZmlsdGVyKGZ1bmN0aW9uKGFucyl7XHJcbiAgICAgICAgICAgIHZhciBvcGVuQnJhY2tldCA9IGFucy5pbmRleE9mKFwiKFwiKTtcclxuICAgICAgICAgICAgaWYgKG9wZW5CcmFja2V0ICE9PSAtMSl7IC8vc3RyaW5nIGNvbnRhaW5zIGEgYnJhY2tldFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFucy50b0xvd2VyQ2FzZSgpLnN1YnN0cigwLCBvcGVuQnJhY2tldCkudHJpbSgpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB1bmJyYWNrZXRlZDtcclxuICAgIH0sXHJcblxyXG5cdGlucHV0Q29ycmVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gJChcIiNyZXYtaW5wdXRcIikudmFsKCkudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgICAgdmFyIHNvbHV0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1zb2x1dGlvbicpLmlubmVySFRNTC5zcGxpdCgvWyzjgIFdK1xccyovKTtcclxuICAgICAgICB2YXIgY29ycmVjdENoYXJDb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXQ6IFwiICsgaW5wdXQpO1xyXG5cclxuICAgICAgICB2YXIgYXBwZW5kID0gdGhpcy51bmJyYWNrZXRTb2x1dGlvbihzb2x1dGlvbik7XHJcbiAgICAgICAgc29sdXRpb24gPSBzb2x1dGlvbi5jb25jYXQoYXBwZW5kKTtcclxuICAgICAgICB2YXIgaSA9IHNvbHV0aW9uLmxlbmd0aDtcclxuICAgICAgICB3aGlsZShpLS0pe1xyXG5cclxuICAgICAgICAgICAgdmFyIHRocmVzaG9sZCA9IDA7Ly9ob3cgbWFueSBjaGFyYWN0ZXJzIGNhbiBiZSB3cm9uZ1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LXR5cGUnKS5pbm5lckhUTUwgPT0gXCJNZWFuaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IE1hdGguZmxvb3Ioc29sdXRpb25baV0ubGVuZ3RoIC8gZXJyb3JBbGxvd2FuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNraW5nIFwiICsgc29sdXRpb25baV0gKyBcIiB3aXRoIHRocmVzaG9sZDogXCIgKyB0aHJlc2hvbGQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGo7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGhEaWZmID0gTWF0aC5hYnMoaW5wdXQubGVuZ3RoIC0gc29sdXRpb25baV0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGxlbmd0aERpZmYgPiB0aHJlc2hvbGQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJudmFsdWUgPSByZXR1cm52YWx1ZSB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFsc2UgYXQgaWYgYnJhbmNoIFwiICsgaW5wdXQubGVuZ3RoICsgXCIgPCBcIiArIEpTT04uc3RyaW5naWZ5KHNvbHV0aW9uW2ldKSk7Ly8ubGVuZ3RoICk7Ly8tIHRocmVzaG9sZCkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL2RpZmZlcmVuY2UgaW4gcmVzcG9uc2UgbGVuZ3RoIGlzIHdpdGhpbiB0aHJlc2hvbGRcclxuICAgICAgICAgICAgICAgIGogPSBpbnB1dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0W2pdID09IHNvbHV0aW9uW2ldW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChpbnB1dFtqXSArXCIgPT0gXCIrIHNvbHV0aW9uW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdENoYXJDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb3JyZWN0Q2hhckNvdW50ID49IHNvbHV0aW9uW2ldLmxlbmd0aCAtIHRocmVzaG9sZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJudmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXR1cm5pbmcgXCIgKyByZXR1cm52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG4gICAgfSxcclxuXHJcblx0c3VibWl0UmVzcG9uc2U6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvL2Z1bmN0aW9uczpcclxuXHRcdC8vICBpbnB1dENvcnJlY3QoKVxyXG5cclxuXHRcdC8vY2hlY2sgaWYga2V5IHByZXNzIHdhcyAnZW50ZXInIChrZXlDb2RlIDEzKSBvbiB0aGUgd2F5IHVwXHJcblx0XHQvL2FuZCBrZXlzdGF0ZSB0cnVlIChhbnN3ZXIgYmVpbmcgc3VibWl0dGVkKVxyXG5cdFx0Ly9hbmQgY3Vyc29yIGlzIGZvY3VzZWQgaW4gcmV2aWV3ZmllbGRcclxuXHRcdGlmIChlLmtleUNvZGUgPT0gMTMgJiYgc3VibWl0ID09PSB0cnVlKSB7XHJcblx0XHRcdHZhciBpbnB1dCA9ICQoXCIjcmV2LWlucHV0XCIpLnZhbCgpO1xyXG5cdFx0XHR2YXIgcmV2aWV3TGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItUmV2aWV3Jyl8fFtdO1xyXG5cdFx0XHR2YXIgcm5kID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnV0tTUy1ybmQnKXx8MDtcclxuXHJcblx0XHRcdHZhciBpdGVtID0gc2Vzc2lvbkdldCgnV0tTUy1pdGVtJyk7XHJcblxyXG5cdFx0XHQvLy0tIHN0YXJ0aW5nIGltcGxlbWVudGF0aW9uIG9mIGZvcmdpdmVuZXNzIHByb3RvY29sXHJcblxyXG5cdFx0XHRpdGVtLmZvcmdpdmUgPSBbXTsvL1wi44KG44KL44GZXCJdOyAvL3BsYWNlaG9sZGVyICjoqLHjgZkgdG8gZm9yZ2l2ZSlcclxuXHJcblx0XHRcdGlmIChpdGVtID09PSBudWxsKXtcclxuXHRcdFx0XHRhbGVydChcIkl0ZW0gTnVsbD8/XCIpO1xyXG5cdFx0XHRcdHJldmlld0xpc3Quc3BsaWNlKHJuZCwgMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZXtcclxuXHRcdFx0XHQvL2hhbmRsZSBncmFkaW5nIGFuZCBzdG9yaW5nIHNvbHV0aW9uXHJcblxyXG5cdFx0XHRcdC8vY2hlY2sgZm9yIGlucHV0LCBkbyBub3RoaW5nIGlmIG5vbmVcclxuXHRcdFx0XHRpZihpbnB1dC5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9kaXNhYmxlIGlucHV0IGFmdGVyIHN1Ym1pc3Npb25cclxuXHRcdFx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cclxuXHRcdFx0XHQvL3dhcyB0aGUgaW5wdXQgY29ycmVjdD9cclxuXHRcdFx0XHR2YXIgY29ycmVjdCA9IHRoaXMuaW5wdXRDb3JyZWN0KCk7XHJcblxyXG5cdFx0XHRcdC8vd2FzIHRoZSBpbnB1dCBmb3JnaXZlbj9cclxuXHRcdFx0XHR2YXIgZm9yZ2l2ZW4gPSAoaXRlbS5mb3JnaXZlLmluZGV4T2YoaW5wdXQpICE9PSAtMSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb3JyZWN0KSB7XHJcblx0XHRcdFx0XHQvL2hpZ2hsaWdodCBpbiAoZGVmYXVsdCkgZ3JlZW5cclxuXHRcdFx0XHRcdCQoXCIjcmV2LWlucHV0XCIpLmFkZENsYXNzKFwiY29ycmVjdFwiKTtcclxuXHRcdFx0XHRcdC8vc2hvdyBhbnN3ZXJcclxuXHRcdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLmFkZENsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGZvcmdpdmVuKXtcclxuXHRcdFx0XHRcdCQoXCIjcmV2LWlucHV0XCIpLmFkZENsYXNzKFwiY2F1dGlvblwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly9oaWdoaWdodCBpbiByZWRcclxuXHRcdFx0XHRcdCQoXCIjcmV2LWlucHV0XCIpLmFkZENsYXNzKFwiZXJyb3JcIik7XHJcblx0XHRcdFx0XHQvL3Nob3cgYW5zd2VyXHJcblx0XHRcdFx0XHQkKFwiI3Jldi1zb2x1dGlvblwiKS5hZGRDbGFzcyhcImluZm9cIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvL3JlbW92ZSBmcm9tIHNlc3Npb25MaXN0IGlmIGNvcnJlY3RcclxuXHRcdFx0XHRpZiAoY29ycmVjdCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJjb3JyZWN0IGFuc3dlclwiKTtcclxuXHRcdFx0XHRcdGlmIChyZXZpZXdMaXN0ICE9PSBudWxsKXtcclxuXHRcdFx0XHRcdFx0dmFyIG9sZGxlbiA9IHJldmlld0xpc3QubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV2aWV3TGlzdC5zcGxpY2Uocm5kLCAxKTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXNzaW9uTGlzdC5sZW5ndGg6IFwiKyBvbGRsZW4gK1wiIC0+IFwiK3Jldmlld0xpc3QubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vcmVwbGFjZSBzaG9ydGVyIChieSBvbmUpIHNlc3Npb25MaXN0IHRvIHNlc3Npb25cclxuXHRcdFx0XHRcdFx0aWYgKHJldmlld0xpc3QubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXNzaW9uTGlzdC5sZW5ndGg6IFwiKyByZXZpZXdMaXN0Lmxlbmd0aCk7XHJcblx0XHRcdFx0XHRcdFx0c2Vzc2lvblNldCgnVXNlci1SZXZpZXcnLCBKU09OLnN0cmluZ2lmeShyZXZpZXdMaXN0KSk7XHJcblxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdC8vcmV2ZWl3IG92ZXIsIGRlbGV0ZSBzZXNzaW9ubGlzdCBmcm9tIHNlc3Npb25cclxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLVJldmlldycpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yOiBubyByZXZpZXcgc2Vzc2lvbiBmb3VuZFwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vICAgaWYoZm9yZ2l2ZW4pe1xyXG5cdFx0XHRcdFx0Ly8gICAgIGNvbnNvbGUubG9nKGlucHV0ICtcIiBoYXMgYmVlbiBmb3JnaXZlbi4gXCIraXRlbS50eXBlKTtcclxuXHRcdFx0XHRcdC8vICAgcmV0dXJuO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ3cm9uZyBhbnN3ZXJcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpdGVtID0gbWFya0Fuc3dlcihpdGVtKTtcclxuXHJcblx0XHRcdFx0c2Vzc2lvblNldChpdGVtLmluZGV4LCBpdGVtKTtcclxuXHJcblxyXG5cdFx0XHRcdHZhciBsaXN0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiVXNlci1TdGF0c1wiKSl8fFtdO1xyXG5cdFx0XHRcdHZhciBmb3VuZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAobGlzdCl7XHJcblx0XHRcdFx0XHR2YXIgaSA9IGxpc3QubGVuZ3RoO1xyXG5cdFx0XHRcdFx0d2hpbGUoaS0tKXtcclxuXHRcdFx0XHRcdFx0aWYgKGxpc3RbaV0uaW5kZXggPT0gaXRlbS5pbmRleCkge1xyXG5cdFx0XHRcdFx0XHRcdGxpc3RbaV0gPSBpdGVtO1x0XHRcdFx0XHRcdFx0XHQvL3JlcGxhY2UgaXRlbSBpZiBpdCBleGlzdHNcclxuXHRcdFx0XHRcdFx0XHRmb3VuZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKCFmb3VuZCl7XHJcblx0XHRcdFx0XHRcdGxpc3QgPSBzYXZlVG9Tb3J0ZWRMaXN0KGxpc3QsaXRlbSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRsaXN0ID0gW2l0ZW1dO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2Vzc2lvblNldChcIlVzZXItU3RhdHNcIiwgSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG5cdFx0XHRcdC8vcGxheUF1ZGlvKCk7XHJcblxyXG5cdFx0XHRcdC8vYW5zd2VyIHN1Ym1pdHRlZCwgbmV4dCAnZW50ZXInIHByb2NlZWRzIHdpdGggc2NyaXB0XHJcblx0XHRcdFx0c3VibWl0ID0gZmFsc2U7XHJcblx0XHRcdH0vL251bGwgZ2FyYmFnZSBjb2xsZWN0aW9uXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChlLmtleUNvZGUgPT0gMTMgJiYgc3VibWl0ID09PSBmYWxzZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImtleXN0YXQgPSBcIiArIHN1Ym1pdCk7XHJcblxyXG5cdFx0XHQvL3RoZXJlIGFyZSBzdGlsbCBtb3JlIHJldmlld3MgaW4gc2Vzc2lvbj9cclxuXHRcdFx0aWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItUmV2aWV3JykpIHtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcImZvdW5kIGEgJ1VzZXItUmV2aWV3JzogXCIgKyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVJldmlldycpKTtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInJlZnJlc2hpbmcgcmV2aWV3TGlzdCBmcm9tIHN0b3JhZ2VcIik7XHJcblx0XHRcdFx0XHR2YXIgcmV2aWV3TGlzdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSk7XHJcblxyXG5cdFx0XHRcdFx0Ly9jdWUgdXAgZmlyc3QgcmVtYWluaW5nIHJldmlld1xyXG5cdFx0XHRcdFx0bmV4dFJldmlldyhyZXZpZXdMaXN0KTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiY2hlY2tpbmcgZm9yIGVtcHR5IHJldmlld0xpc3RcIik7XHJcblx0XHRcdFx0XHRpZiAocmV2aWV3TGlzdC5sZW5ndGggPT09IDApe1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzZXNzaW9uIG92ZXIuIHJldmlld0xpc3Q6IFwiK0pTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuXHRcdFx0XHRcdFx0c2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcIlVzZXItUmV2aWV3XCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLnJlbW92ZUNsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0XHRcdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHJcblx0XHRcdFx0fSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gbm8gcmV2aWV3IHN0b3JlZCBpbiBzZXNzaW9uLCByZXZpZXcgaXMgb3ZlclxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0XHRcdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuXHRcdFx0XHRcdC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1pbnB1dCcpLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHQkKFwiI3Jldi1zb2x1dGlvblwiKS5yZW1vdmVDbGFzcyhcImluZm9cIik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNob3dSZXN1bHRzXCIpO1xyXG5cdFx0XHRcdFx0c2hvd1Jlc3VsdHMoKTtcclxuXHRcdFx0XHRcdCQoXCIjcmVzdWx0d2luZG93XCIpLnNob3coKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic2hvd1Jlc3VsdHMgY29tcGxldGVkXCIpO1xyXG5cclxuXHRcdFx0XHRcdC8vKi8gIC8vY2xlYXIgc2Vzc2lvblxyXG5cdFx0XHRcdFx0c2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHRcdFx0XHRcdHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuXHJcblx0XHRcdFx0fSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3VibWl0ID0gdHJ1ZTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZXZpZXdVdGlsOyIsIlxyXG52YXIgU3RvcmFnZVV0aWwgPSB7XHJcblx0LyoqIEluaXRpYWxpc2UgVXNlci1Wb2NhYlxyXG5cdCovXHJcblx0aW5pdFN0b3JhZ2U6IGZ1bmN0aW9uKCl7XHJcblx0XHRpZiAoIXRoaXMubG9jYWxHZXQoXCJVc2VyLVZvY2FiXCIpKXtcclxuXHRcdFx0dGhpcy5sb2NhbFNldChcIlVzZXItVm9jYWJcIiwgW10pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cGFyc2VTdHJpbmc6IGZ1bmN0aW9uKHN0ck9iail7XHJcbiAgICAgICAgLy9hdm9pZHMgZHVwbGljYXRpb24gb2YgY29kZSBmb3Igc2Vzc3Npb25HZXQgYW5kIGxvY2FsR2V0XHJcbiAgICAgICAgdmFyIG9iajtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKHN0ck9iaik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgaXMgb2YgdHlwZSBcIiArIHR5cGVvZiBvYmopO1xyXG4gICAgICAgIH1cclxuXHRcdGNhdGNoKGUpe1xyXG4gICAgICAgICAgICBpZiAoZS5uYW1lID09PSBcIlN5bnRheEVycm9yXCIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RyT2JqICsgXCIgaXMgYW4gb3JkaW5hcnkgc3RyaW5nIHRoYXQgY2Fubm90IGJlIHBhcnNlZC5cIik7XHJcbiAgICAgICAgICAgICAgICBvYmogPSBzdHJPYmo7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcGFyc2UgXCIgKyBzdHJPYmogKyBcIi4gRXJyb3I6IFwiLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSxcclxuXHQvKipcclxuXHQqL1xyXG5cdGxvY2FsR2V0OiBmdW5jdGlvbihzdHJOYW1lKXtcclxuICAgICAgICB2YXIgc3RyT2JqID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTdHJpbmcoc3RyT2JqKTtcclxuICAgIH0sXHJcblx0LyoqIFNldHMgc3RyaW5ncyBhbmQgb2JqZWN0cyBpbnRvIGJyb3dzZXIgc3RvcmFnZVxyXG5cdCogQHJlcXVpcmVzIGxvY2FsU3RvcmFnZVxyXG5cdCogQHJlcXVpcmVzIEpTT05cclxuXHQqL1xyXG5cdGxvY2FsU2V0OiBmdW5jdGlvbihzdHJOYW1lLCBvYmope1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0ck5hbWUsIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI/IG9iaiA6IEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgfSxcclxuXHQvKipcclxuXHQqL1xyXG5cdHNlc3Npb25HZXQ6IGZ1bmN0aW9uKHN0ck5hbWUpe1xyXG4gICAgICAgIHZhciBzdHJPYmogPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKHN0ck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3RyaW5nKHN0ck9iaik7XHJcbiAgICB9LFxyXG5cdC8qKiBTZXRzIHN0cmluZ3MgYW5kIG9iamVjdHMgaW50byBicm93c2VyIHNlc3Npb24gc3RvcmFnZVxyXG5cdCogQHJlcXVpcmVzIGxvY2FsU3RvcmFnZVxyXG5cdCogQHJlcXVpcmVzIEpTT05cclxuXHQqL1xyXG5cdHNlc3Npb25TZXQ6IGZ1bmN0aW9uKHN0ck5hbWUsIG9iail7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShzdHJOYW1lLCB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiPyBvYmogOiBKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICAgIH0sXHJcblx0LyoqXHJcblx0Ki9cclxuXHRnZXRWb2NMaXN0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB2b2NMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1Wb2NhYicpKXx8W107XHJcbiAgICAgICAgaWYgKHZvY0xpc3Qpe1xyXG4gICAgICAgICAgICB2YXIgdj12b2NMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgd2hpbGUodi0tKXtcclxuICAgICAgICAgICAgICAgIHZvY0xpc3Rbdl0uaSA9IHY7IC8vc2V0IGluZGV4IGZvciBpdGVtICgtPm91dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdm9jTGlzdDtcclxuICAgIH0sXHJcblx0c2V0Vm9jTGlzdDogZnVuY3Rpb24odm9jTGlzdCl7XHJcblx0XHR0aGlzLmxvY2FsU2V0KCdVc2VyLVZvY2FiJywgdm9jTGlzdCk7XHJcblx0fSxcclxuXHQvKipcclxuXHQqL1xyXG5cdHNldFZvY0l0ZW06IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIC8vQXNzdW1wdGlvbjogaXRlbSBjb21lcyBvbmx5IHdpdGgga2FuamksIHJlYWRpbmcgYW5kIG1lYW5pbmdcclxuICAgICAgICBpdGVtLmxldmVsID0gMDtcclxuICAgICAgICBpdGVtLmRhdGUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGl0ZW0ubWFudWFsTG9jayA9IFwiXCI7XHJcbiAgICAgICAgaXRlbSA9IHNldExvY2tzKGl0ZW0pO1xyXG5cdFx0IC8vMC4xLjkgYWRkaW5nIGluICdkdWUnIHByb3BlcnR5IHRvIG1ha2UgcmV2aWV3IGJ1aWxkaW5nIHNpbXBsZXJcclxuICAgICAgICBpdGVtLmR1ZSA9IGl0ZW0uZGF0ZSArIHNyc09iamVjdFtpdGVtLmxldmVsXS5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgdmFyIHZvY0xpc3QgPSBsb2NhbEdldCgnVXNlci1Wb2NhYicpfHxbXTtcclxuXHJcblx0XHR2YXIgZm91bmQgPSB2b2NMaXN0LmZpbmQoZnVuY3Rpb24odGFzayl7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrLmthbmppID09PSBpdGVtLmthbmppO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cdFx0Ly9hZGQgbWVhbmluZyBhbmQgcmVhZGluZyB0byBleGlzdGluZyBpdGVtXHJcblx0XHQvLyAgICAgICAgdm9jTGlzdFt2XS5tZWFuaW5nID0gaXRlbS5tZWFuaW5nO1xyXG5cdFx0Ly8gICAgICB2b2NMaXN0W3ZdLnJlYWRpbmcgPSBpdGVtLnJlYWRpbmc7XHJcbiAgICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgICAgICAvL3Byb3ZpZGUgaW5kZXggZm9yIGZhc3RlciBzZWFyY2hlc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLmthbmppICtcIiBub3QgZm91bmQgaW4gdm9jYWJsaXN0LCBhZGRpbmcgbm93XCIpO1xyXG4gICAgICAgICAgICBpdGVtLmkgPSB2b2NMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdm9jTGlzdC5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTZXQoJ1VzZXItVm9jYWInLHZvY0xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RvcmFnZVV0aWw7IiwiLyogIFRoaXMgaXMgdGhlIG9yaWdpbmFsIGNvZGUgdGhhdCBJIGFtIGJyZWFraW5nIGludG8gYml0ZSBzaXplIGJpdHMgKi9cclxuLy9ORUVEIFRPIE1BS0UgU1VSRSBCUk9XU0VSSUZZIFBVVFMgVEhJUyBPTiBUSEUgVE9QXHJcblxyXG4gXHJcbiAvKiogRGVzY3JpYmVzIGFueSBvYmplY3QgdGhhdCBjYW4gYmUgcmV2aWV3ZWQgb3IgbGVhcm5lZCwgaW5jbHVkZXMgSVJhZGljYWwsIElLYW5qaSwgYW5kIElWb2NhYnVsYXJ5XHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRhc2tcclxuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gbG9ja2VkIC0gbG9ja2VkXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbnxzdHJpbmd9IG1hbnVhbExvY2sgLSBtYW51YWxMb2NrXHJcbiAqL1xyXG4gXHJcbnZhciBTdG9yYWdlVXRpbCA9IHJlcXVpcmUoJy4vc3RvcmFnZXV0aWwuanMnKTtcclxudmFyIEltcG9ydFV0aWwgPSByZXF1aXJlKCcuL2ltcG9ydHV0aWwuanMnKTtcclxudmFyIFdhbmlrYW5pVXRpbCA9IHJlcXVpcmUoJy4vd2FuaWthbml1dGlsLmpzJyk7XHJcbnZhciBSZXZpZXdVdGlsID0gcmVxdWlyZSgnLi9yZXZpZXd1dGlsLmpzJyk7XHJcblxyXG5mdW5jdGlvbiBtYWluKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAkKFwiaGVhZFwiKS5wcmVwZW5kKFwiPHNjcmlwdCBzcmM9J2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9qcXVlcnkubW9ja2pheC8xLjYuMS9qcXVlcnkubW9ja2pheC5qcyc+PC9zY3JpcHQ+XCIpO1xyXG5cclxuICAgIHZhciBBUElrZXkgPSBcIllPVVJfQVBJX0hFUkVcIjtcclxuICAgIHZhciBsb2Nrc09uID0gdHJ1ZTsgLy9EaXNhYmxlIHZvY2FiIGxvY2tzICh1bmxvY2tlZCBpdGVtcyBwZXJzaXN0IHVudGlsIGRlbGV0ZWQpXHJcbiAgICB2YXIgbG9ja0RCID0gdHJ1ZTsgLy9TZXQgdG8gZmFsc2UgdG8gdW5sb2NrIEthbmppIGlzIG5vdCBhdmFpbGFibGUgb24gV2FuaUthbmkgKGllLiBub3QgcmV0dXJuZWQgYnkgQVBJKVxyXG4gICAgdmFyIHJldmVyc2UgPSB0cnVlOyAvL0luY2x1ZGUgRW5nbGlzaCB0byDjgbLjgonjgYzjgaogcmVhZGluZyByZXZpZXdzXHJcbiAgICB2YXIgZGVidWdnaW5nID0gdHJ1ZTtcclxuICAgIHZhciBhc1dLID0gdHJ1ZTsgLy9QdXNoIHVzZXIgcmV2aWV3cyBpbnRvIHRoZSBtYWluIFdLIHJldmlldyBxdWV1ZVxyXG5cclxuICAgIC8vIHNodXQgdXAgSlNIaW50XHJcbiAgICAvKiBqc2hpbnQgbXVsdGlzdHI6IHRydWUgLCBqcXVlcnk6IHRydWUsIGV4cHI6IHRydWUsIGluZGVudDoyICovXHJcbiAgICAvKiBnbG9iYWwgd2luZG93LCB3YW5ha2FuYSwgWERvbWFpblJlcXVlc3QgKi9cclxuXHJcbiAgICAvKiogRGVidWdnaW5nXHJcblx0ICovXHJcblx0Y29uc29sZS5sb2cgPSBkZWJ1Z2dpbmcgPyBmdW5jdGlvbiAobXNnKSB7XHJcblx0XHRpZiAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0d2luZG93LmNvbnNvbGUubG9nKFwiV0tTUzogXCIgKyBtc2cpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHdpbmRvdy5jb25zb2xlLmxvZyhcIldLU1M6IFwiLCBtc2cpO1xyXG5cdFx0fVxyXG5cdH0gOiBmdW5jdGlvbiAoKSB7XHJcblx0fTtcclxuXHRcclxuICAgICQoXCJoZWFkXCIpLnByZXBlbmQoJzxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9yYXdnaXQuY29tL1dhbmlLYW5pL1dhbmFLYW5hL21hc3Rlci9saWIvd2FuYWthbmEuanNcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+PC9zY3JpcHQ+Jyk7XHJcbiAgICBcclxuICAgIHZhciBsb2NhbFNldCA9IGZ1bmN0aW9uKHN0ck5hbWUsIG9iail7XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhzdHJOYW1lICsgXCIgaXMgb2YgdHlwZSBcIiArIHR5cGVvZiBvYmopO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICBvYmo9SlNPTi5zdHJpbmdpZnkob2JqKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdHJOYW1lLCBvYmopO1xyXG4gICAgfTtcclxuXHJcblx0Ly90cmFjayB2ZXJzaW9ucyAmIGRhdGF0eXBlc1xyXG5cdGxvY2FsU2V0KFwiV0tTU2RhdGFcIiwge1xyXG4gICAgICAgIHY6IFwiMC4xLjEzXCIsXHJcbiAgICAgICAgcHJvcGVydHlUeXBlOiB7XHJcblx0XHRcdG1lYW5pbmc6IFwiYXJyYXlcIiwgcmVhZGluZzogXCJhcnJheVwiLCBrYW5qaTogXCJzdHJpbmdcIiwgaTpcIm51bWJlclwiLCBjb21wb25lbnRzOiBcImFycmF5XCIsIGRhdGU6IFwibnVtYmVyXCIsIGR1ZTogXCJudW1iZXJcIiwgbG9ja2VkOiBcInN0cmluZ1wiLCBtYW51YWxMb2NrOiBcInN0cmluZ1wiXHJcblx0XHR9LFxyXG4gICAgICAgIHByb3BlcnR5RGVzYzoge1xyXG5cdFx0XHRtZWFuaW5nOiBcImxpc3Qgb2YgbWVhbmluZ3NcIiwgcmVhZGluZzogXCJsaXN0IG9mIHJlYWRpbmdzXCIsIGthbmppOiBcIml0ZW0gcHJvbXB0XCIsIGk6XCJpdGVtIGluZGV4XCIsIGNvbXBvbmVudHM6IFwia2FuamkgZm91bmQgaW4gd29yZFwiLCBkYXRlOiBcInRpbWVzdGFtcCBvZiBuZXcgbGV2ZWxcIiwgZHVlOiBcInRpbWVzdGFtcCBvZiBpdGVtJ3MgbmV4dCByZXZpZXdcIiwgbG9ja2VkOiBcImluZGljYXRvciBvZiB3aGV0aGVyIGNvbXBvbmVudHMgYXJlIGVsaWdpYmxlXCIsIG1hbnVhbExvY2s6IFwibGF0Y2ggZm9yICdsb2NrZWQnIHNvIGZhaWxpbmcgY29tcG9uZW50cyBkb24ndCByZS1sb2NrIHRoZSBpdGVtXCJcclxuXHRcdH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKiogU2V0dGluZ3MgYW5kIGNvbnN0YW50c1xyXG5cdCAqL1xyXG4gICAgdmFyIGVycm9yQWxsb3dhbmNlID0gNDsgLy9ldmVyeSB4IGxldHRlcnMsIHlvdSBjYW4gbWFrZSBvbmUgbWlzdGFrZSB3aGVuIGVudGVyaW5nIHRoZSBtZWFuaW5nXHJcblxyXG4gICAgLy9zcnMgNGgsIDhoLCAyNGgsIDNkIChndXJ1KSwgMXcsIDJ3IChtYXN0ZXIpLCAxbSAoZW5saWdodGVuZWQpLCA0bSAoYnVybmVkKVxyXG4gICAgXHJcbiAgICB2YXIgaHJzID0gNjAqNjAqMTAwMDtcclxuICAgIHZhciBkYXlzID0gMjQqaHJzO1xyXG4gICAgdmFyIHdlZWtzID0gNypkYXlzO1xyXG5cdHZhciBzcnNPYmplY3QgPSBbXHJcblx0XHR7bGV2ZWw6IDAsIHJhbms6IFwiU3RhcnRlZFwiLFx0XHRkdXJhdGlvbjogMH0sIFxyXG5cdFx0e2xldmVsOiAxLCByYW5rOiBcIkFwcHJlbnRpY2VcIixcdGR1cmF0aW9uOiA0Kmhyc30sXHJcblx0XHR7bGV2ZWw6IDIsIHJhbms6IFwiQXBwcmVudGljZVwiLFx0ZHVyYXRpb246IDgqaHJzfSxcclxuXHRcdHtsZXZlbDogMywgcmFuazogXCJBcHByZW50aWNlXCIsXHRkdXJhdGlvbjogMSpkYXlzfSxcclxuXHRcdHtsZXZlbDogNCwgcmFuazogXCJBcHByZW50aWNlXCIsXHRkdXJhdGlvbjogMypkYXlzfSxcclxuXHRcdHtsZXZlbDogNSwgcmFuazogXCJHdXJ1XCIsXHRcdGR1cmF0aW9uOiAxKndlZWtzfSxcclxuXHRcdHtsZXZlbDogNiwgcmFuazogXCJHdXJ1XCIsXHRcdGR1cmF0aW9uOiAyKndlZWtzfSxcclxuXHRcdHtsZXZlbDogNywgcmFuazogXCJNYXN0ZXJcIixcdFx0ZHVyYXRpb246IDczMCpocnN9LFxyXG5cdFx0e2xldmVsOiA4LCByYW5rOiBcIkVubGlnaHRlbmVkXCIsXHRkdXJhdGlvbjogMjkyMipocnN9LFxyXG5cdFx0e2xldmVsOiA5LCByYW5rOiBcIkJ1cm5lZFwifVxyXG5cdF07XHJcblxyXG5cclxuXHJcblx0dmFyIGxvY2FsR2V0ID0gZnVuY3Rpb24oc3RyTmFtZSl7XHJcbiAgICAgICAgdmFyIHN0ck9iaiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0ck5hbWUpO1xyXG4gICAgICAgIHJldHVybiBwYXJzZVN0cmluZyhzdHJPYmopO1xyXG4gICAgfTtcclxuICAgIFxyXG5cdC8vIEluaXRpYWxpc2UgVXNlci1Wb2NhYlxyXG5cdFN0b3JhZ2VVdGlsLmluaXRTdG9yYWdlKCk7XHJcblx0XHJcblx0Ly9HTV9hZGRTdHlsZSBzaGltIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ3JlYXNlbW9ua2V5XHJcbiAgICB2YXIgZ01fYWRkU3R5bGUgPSBmdW5jdGlvbihDc3NTdHJpbmcpe1xyXG4gICAgICAgIC8vZ2V0IERPTSBoZWFkXHJcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG4gICAgICAgIGlmIChoZWFkKSB7XHJcbiAgICAgICAgICAgIC8vYnVpbGQgc3R5bGUgdGFnXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xyXG4gICAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IENzc1N0cmluZztcclxuICAgICAgICAgICAgLy9pbnNlcnQgRE9NIHN0eWxlIGludG8gaGVhZFxyXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiAgSlF1ZXJ5IGZpeGVzXHJcblx0ICovXHJcbiAgICAkKFwiW3BsYWNlaG9sZGVyXVwiKS5mb2N1cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoaW5wdXQudmFsKCkgPT0gaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbChcIicnXCIpO1xyXG4gICAgICAgICAgICBpbnB1dC5yZW1vdmVDbGFzcyhcIidwbGFjZWhvbGRlcidcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSkuYmx1cihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoaW5wdXQudmFsKCkgPT0gXCInJ1wiIHx8IGlucHV0LnZhbCgpID09IGlucHV0LmF0dHIoXCJwbGFjZWhvbGRlclwiKSkge1xyXG4gICAgICAgICAgICBpbnB1dC5hZGRDbGFzcyhcInBsYWNlaG9sZGVyXCIpO1xyXG4gICAgICAgICAgICBpbnB1dC52YWwoaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9KS5ibHVyKCk7XHJcblxyXG4gICAgJChcIltwbGFjZWhvbGRlcl1cIikucGFyZW50cyhcImZvcm1cIikuc3VibWl0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoXCJbcGxhY2Vob2xkZXJdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsKCkgPT0gaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHQvKiogSGFuZGxlIHRoZSB1c2VycyBBUEkga2V5LlxyXG5cdCogQHBhcmFtIHtzdHJpbmd9IEFQSWtleSAtIHRoZSB1c2VycyBBUEkga2V5IHRvIHNldC4gSWYgZ2l2ZW4gXCJZT1VSX0FQSV9IRVJFXCIsIGl0IHdpbGwgcmV0dXJuIHRoZSBrZXkgaW4gYnJvd3NlciBzdG9yYWdlLlxyXG5cdCogQHJldHVybnMge3N0cmluZ30gdGhlIHVzZXJzIEFQSSBrZXkgYXMgc3VwcGxpZWQgYW5kIHN0b3JlZCwgb3IgaW4gdGhlIGNhc2Ugb2YgXCJZT1VSX0FQSV9IRVJFXCIgYmVpbmcgcGFzc2VkLCB0aGUgc3RvcmVkIGtleS5cclxuXHQqL1xyXG4gICAgdmFyIGdldFNldEFwaSA9IGZ1bmN0aW9uKEFQSWtleSl7XHJcbiAgICAgICAgdmFyIHN0b3JlZEFQSSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdXYW5pS2FuaS1BUEknKTtcclxuICAgICAgICBpZiAoQVBJa2V5ID09PSBcIllPVVJfQVBJX0hFUkVcIil7XHJcbiAgICAgICAgICAgIGlmIChzdG9yZWRBUEkgIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgQVBJa2V5ID0gc3RvcmVkQVBJO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdFx0ZWxzZXtcclxuICAgICAgICAgICAgLy9BUEkgaGFzIGJlZW4gc2V0IGluIGNvZGUuXHJcbiAgICAgICAgICAgIGlmIChzdG9yZWRBUEkgIT09IEFQSWtleSl7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFNldCgnV2FuaUthbmktQVBJJywgQVBJa2V5KTsvL292ZXJ3cml0ZSB3aXRoIG5ldyBBUElcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBJa2V5O1xyXG4gICAgfTtcclxuICAgIEFQSWtleSA9IGdldFNldEFwaShBUElrZXkpO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS1TdGFydCBJbnNlcnQgSW50byBXSyBSZXZpZXcgRnVuY3Rpb25zLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0LyoqIE1lc3NpbmcgYXJvdW5kIHdpdGggdmFuaWxsYSBXYW5pS2FuaSByZXZpZXcgdmFyaWFibGVzXHJcblx0Ki9cclxuICAgIHZhciBqb2luUmV2aWV3cyA9IGZ1bmN0aW9uKFdLSXRlbXMpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiam9pbmluZyByZXZpZXdzXCIpO1xyXG4gICAgICAgICQualN0b3JhZ2Uuc3RvcExpc3RlbmluZyhcInJldmlld1F1ZXVlXCIsIGpvaW5SZXZpZXdzKTtcclxuICAgICAgICB2YXIgV0tyZXZpZXcgPSAkLmpTdG9yYWdlLmdldChcInJldmlld1F1ZXVlXCIpfHxbXTtcclxuICAgICAgICB2YXIgV0tjb21iaW5lZCA9IFdLcmV2aWV3LmNvbmNhdChXS0l0ZW1zKTtcclxuICAgICAgICAkLmpTdG9yYWdlLnNldChcInJldmlld1F1ZXVlXCIsIFdLY29tYmluZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgV0tJdGVtcyA9IFtdO1xyXG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChcIkxvYWRpbmcgSXRlbXNcIik7XHJcblx0XHJcblx0dmFyIHdLU1NfdG9fV0sgPSBmdW5jdGlvbihXS1NTSXRlbSl7XHJcbiAgICAgICAgdmFyIFdLSXRlbSA9IHt9O1xyXG4gICAgICAgIC8vICAgIFdLSXRlbS5hdWQgPSBcIlwiO1xyXG4gICAgICAgIFdLSXRlbS5lbiA9IFdLU1NJdGVtLm1lYW5pbmcubWFwKGZ1bmN0aW9uKHMpIHtcclxuXHRcdFx0IC8vdHJpbSB3aGl0ZXNwYWNlIGFuZCBjYXBpdGFsaXplIHdvcmRzXHJcblx0XHRcdCByZXR1cm4gcy50cmltKCkucmVwbGFjZSgvXFxiXFx3L2cgLCBmdW5jdGlvbihtKXtcclxuXHRcdFx0XHRyZXR1cm4gbS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG4gICAgICAgIFdLSXRlbS5pZCA9IFwiV0tTU1wiICsgV0tTU0l0ZW0uaTtcclxuICAgICAgICBXS0l0ZW0ua2FuYSA9IFdLU1NJdGVtLnJlYWRpbmc7XHJcbiAgICAgICAgV0tJdGVtLnNycyA9IFdLU1NJdGVtLmxldmVsKzE7Ly9XSyBzdGFydHMgbGV2ZWxzIGZyb20gMSwgV0tTUyBzdGFydHMgdGhlbSBmcm9tIDBcclxuICAgICAgICBXS0l0ZW0udm9jID0gV0tTU0l0ZW0ua2Fuamk7XHJcbiAgICAgICAgV0tJdGVtLmNvbXBvbmVudHMgPSBXS1NTSXRlbS5jb21wb25lbnRzO1xyXG5cclxuICAgICAgICBXS0l0ZW0uc3luID0gW107XHJcbiAgICAgICAgLy9BZGQgc3lub255bXMgb2Ygc3RyaW5ncyB3aXRob3V0IGJyYWNrZXRlZCBpbmZvIHRvIGdldCBhcm91bmQgY2hlY2tpbmcgdGhlIGZ1bGwgc3RyaW5nIGluY2x1ZGluZyBicmFja2V0c1xyXG4gICAgICAgIFdLU1NJdGVtLm1lYW5pbmcuZm9yRWFjaChmdW5jdGlvbihtZWFuaW5nKXtcclxuICAgICAgICAgICAgdmFyIG9wZW5CcmFja2V0ID0gbWVhbmluZy5pbmRleE9mKFwiKFwiKTtcclxuICAgICAgICAgICAgaWYgKG9wZW5CcmFja2V0ICE9PSAtMSAmJiBtZWFuaW5nLmluZGV4T2YoXCIpXCIpICE9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICBXS0l0ZW0uc3luLnB1c2gobWVhbmluZy5zdWJzdHIoMCwgb3BlbkJyYWNrZXQpLnRyaW0oKS5yZXBsYWNlKC9cXGJcXHcvZyAsIGZ1bmN0aW9uKG0peyByZXR1cm4gbS50b1VwcGVyQ2FzZSgpO30pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gV0tJdGVtO1xyXG4gICAgfTtcclxuXHJcblx0dmFyIGxvYWRUYXNrcyA9IGZ1bmN0aW9uKHVzZXJWb2NhYiwgaSwgdXNlclZvY2Ficyl7XHJcbiAgICAgICAgdmFyIGR1ZU5vdyA9ICh1c2VyVm9jYWIubG9ja2VkID09PSBcIm5vXCIgJiYgdXNlclZvY2FiLmxldmVsIDwgOSAmJiBEYXRlLm5vdygpID4gdXNlclZvY2FiLmR1ZSk7XHJcblxyXG4gICAgICAgIGlmIChkdWVOb3cpe1xyXG4gICAgICAgICAgICBpZiAodXNlclZvY2FiLmthbmppLmxlbmd0aCAqIHVzZXJWb2NhYi5tZWFuaW5nWzBdLmxlbmd0aCAqIHVzZXJWb2NhYi5yZWFkaW5nWzBdLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAvL1NvcnJ5LCB3ZSBuZWVkIGFsbCB0aHJlZSB0byBhZGQgdG8gV0sgcmV2aWV3LCBubyBrYW5hIG9ubHkgd2l0aG91dCByZWFkaW5ncyBldGMuXHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiaXRlbTpcIiArIHVzZXJWb2NhYi5rYW5qaSArIFwiLCBcIiArIHVzZXJWb2NhYi5sb2NrZWQgK1wiID09PSBcXFwibm9cXFwiICYmIFwiICsgdXNlclZvY2FiLmxldmVsICsgXCIgPCA5ICYmIFwiICsgRGF0ZS5ub3coKSArIFwiID4gXCIgKyB1c2VyVm9jYWIuZHVlKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coZHVlTm93KTtcclxuICAgICAgICAgICAgICAgIFdLSXRlbXMucHVzaCh3S1NTX3RvX1dLKHVzZXJWb2NhYikpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJJdGVtIFwiICsgdXNlclZvY2FiLmthbmppICsgXCIgY291bGQgbm90IGJlIGFkZGVkLCBpdCBpcyBtaXNzaW5nIG9uZSBvciBtb3JlIG9mIHRoZSBlc3NlbnRpYWwgZmllbGRzIGZvciBhIFdLIHZvY2FidWxhcnkgcmV2aWV3XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHRcclxuICAgIHZhciB1c2VyVm9jYWJzID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgdXNlclZvY2Ficy5mb3JFYWNoKGxvYWRUYXNrcyk7Ly8sIHRoaXMpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG5cdFxyXG4gICAgLy93aGVyZSB0aGUgbWFnaWMgaGFwcGVuc1xyXG4gICAgaWYgKGFzV0spe1xyXG4gICAgICAgICQualN0b3JhZ2UubGlzdGVuS2V5Q2hhbmdlKFwicmV2aWV3UXVldWVcIiwgZnVuY3Rpb24oKXtqb2luUmV2aWV3cyhXS0l0ZW1zKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2Vzc2lvblNldCA9IGZ1bmN0aW9uKHN0ck5hbWUsIG9iail7XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhzdHJOYW1lICsgXCIgaXMgb2YgdHlwZSBcIiArIHR5cGVvZiBvYmopO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICBvYmo9SlNPTi5zdHJpbmdpZnkob2JqKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0ck5hbWUsIG9iaik7XHJcbiAgICB9O1xyXG5cdFxyXG4gICAgdmFyIHNlc3Npb25HZXQgPSBmdW5jdGlvbihzdHJOYW1lKXtcclxuICAgICAgICB2YXIgc3RyT2JqID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdHJOYW1lKTtcclxuICAgICAgICByZXR1cm4gcGFyc2VTdHJpbmcoc3RyT2JqKTtcclxuICAgIH07XHJcblxyXG5cdHZhciBnZW5lcmF0ZVJldmlld0xpc3QgPSBmdW5jdGlvbihyZXZpZXdBY3RpdmUpIHtcclxuICAgICAgICAvL2Rvbid0IGludGVyZmVyZSB3aXRoIGFuIGFjdGl2ZSBzZXNzaW9uXHJcbiAgICAgICAgaWYgKHJldmlld0FjdGl2ZSl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXJldmlldycpLmlubmVySFRNTCA9IFwiUmV2aWV3IGluIFByb2dyZXNzXCI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJnZW5lcmF0ZVJldmlld0xpc3QoKVwiKTtcclxuICAgICAgICAvLyBmdW5jdGlvbiBnZW5lcmF0ZVJldmlld0xpc3QoKSBidWlsZHMgYSByZXZpZXcgc2Vzc2lvbiBhbmQgdXBkYXRlcyB0aGUgaHRtbCBtZW51IHRvIHNob3cgbnVtYmVyIHdhaXRpbmcuXHJcbiAgICAgICAgdmFyIG51bVJldmlld3MgPSAwO1xyXG4gICAgICAgIHZhciBzb29uZXN0ID0gSW5maW5pdHk7XHJcbiAgICAgICAgdmFyIG5leHQ7XHJcblxyXG4gICAgICAgIHZhciByZXZpZXdMaXN0ID0gW107XHJcblxyXG4gICAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIHZvY2FiIGFscmVhZHkgaW4gb2ZmbGluZSBzdG9yYWdlXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpIHtcclxuICAgICAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyh2b2NhYkxpc3QpO1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yIGVhY2ggdm9jYWIgaW4gc3RvcmFnZSwgZ2V0IHRoZSBhbW91bnQgb2YgdGltZSB2b2NhYiBoYXMgbGl2ZWRcclxuICAgICAgICAgICAgLy92YXIgaSA9IHZvY2FiTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIC8vd2hpbGUoaS0tKXtcclxuXHRcdFx0dm9jYWJMaXN0LmZvckVhY2goZnVuY3Rpb24odGFzaywgaSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHVlID0gdGFzay5kYXRlICsgc3JzT2JqZWN0W3Rhc2subGV2ZWxdLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIHRlbSBpcyB1bmxvY2tlZCBhbmQgdW5idXJuZWRcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmxldmVsIDwgOSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0YXNrLm1hbnVhbExvY2sgPT09IFwibm9cIiB8fCB0YXNrLm1hbnVhbExvY2sgPT09IFwiblwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIHRhc2subWFudWFsTG9jayA9PT1cIkRCXCIgJiYgIWxvY2tEQiApKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyBwYXN0IHJldmlldyB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobm93ID49IGR1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3VudCB2b2NhYiB1cCBmb3IgcmV2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bVJldmlld3MrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBpdGVtLW1lYW5pbmcgb2JqZWN0IHRvIHJldmlld0xpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGF2ZSBtYWRlIHRoaXMgb3B0aW9uYWwgZm9yIHN1cm5hbWUgbGlzdHMgZXRjLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5tZWFuaW5nWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1Jldl9JdGVtIG9iamVjdCBhcmdzOiBwcm9tcHQsIGthbmppLCB0eXBlLCBzb2x1dGlvbiwgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXZJdGVtID0gbmV3IFJldl9JdGVtKHRhc2sua2FuamksIHRhc2sua2FuamksIFwiTWVhbmluZ1wiLCB0YXNrLm1lYW5pbmcsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3TGlzdC5wdXNoKHJldkl0ZW0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWFkaW5nIGlzIG9wdGlvbmFsLCBpZiB0aGVyZSBpcyBhIHJlYWRpbmcgZm9yIHRoZSB2b2NhYiwgYWRkIGl0cyBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnJlYWRpbmdbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUmV2X0l0ZW0gb2JqZWN0IGFyZ3M6IHByb21wdCwga2FuamksIHR5cGUsIHNvbHV0aW9uLCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldkl0ZW0yID0gbmV3IFJldl9JdGVtKHRhc2sua2FuamksIHRhc2sua2FuamksIFwiUmVhZGluZ1wiLCB0YXNrLnJlYWRpbmcsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3TGlzdC5wdXNoKHJldkl0ZW0yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBpcyBhIG1lYW5pbmcgYW5kIHJlYWRpbmcsIGFuZCByZXZlcnNlIGZsYWcgaXMgdHJ1ZSwgdGVzdCByZWFkaW5nIGZyb20gZW5nbGlzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5yZWFkaW5nWzBdICE9PSBcIlwiICYmIHRhc2subWVhbmluZ1swXSAhPT0gXCJcIiAmJiByZXZlcnNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUmV2X0l0ZW0gb2JqZWN0IGFyZ3M6IHByb21wdCwga2FuamksIHR5cGUsIHNvbHV0aW9uLCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldkl0ZW0zID0gbmV3IFJldl9JdGVtKHRhc2subWVhbmluZy5qb2luKFwiLCBcIiksIHRhc2sua2FuamksIFwiUmV2ZXJzZVwiLCB0YXNrLnJlYWRpbmcsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3TGlzdC5wdXNoKHJldkl0ZW0zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRlbHNley8vdW5sb2NrZWQvdW5idXJuZWQgYnV0IG5vdCB0aW1lIHRvIHJldmlldyB5ZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInNldHRpbmcgc29vbmVzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCA9IGR1ZSAtIG5vdztcclxuXHRcdFx0XHRcdFx0c29vbmVzdCA9IE1hdGgubWluKHNvb25lc3QsIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHR9Ly9lbmQgaWYgaXRlbSBpcyB1cCBmb3IgcmV2aWV3XHJcblx0XHRcdH0sIHRoaXMpOy8vIGVuZCBpdGVyYXRlIHRocm91Z2ggdm9jYWJsaXN0XHJcblx0XHR9Ly8gZW5kIGlmIGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGlmIChyZXZpZXdMaXN0Lmxlbmd0aCAhPT0gMCl7XHJcbiAgICAgICAgICAgIC8vc3RvcmUgcmV2aWV3TGlzdCBpbiBjdXJyZW50IHNlc3Npb25cclxuICAgICAgICAgICAgc2Vzc2lvblNldCgnVXNlci1SZXZpZXcnLCBKU09OLnN0cmluZ2lmeShyZXZpZXdMaXN0KSk7XHJcbiAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2cocmV2aWV3TGlzdCk7XHJcbiAgICAgICAgfVxyXG5cdFx0ZWxzZXtcclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInJldmlld0xpc3QgaXMgZW1wdHk6IFwiK0pTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcmV2aWV3JykuaW5uZXJIVE1MID0gc29vbmVzdDxJbmZpbml0eT8gXCJOZXh0IFJldmlldyBpbiBcIittczJzdHIoc29vbmVzdCkgOiBcIk5vIFJldmlld3MgQXZhaWxhYmxlXCI7XHJcblx0XHR9XHJcbiAgICAgICAgdmFyIHN0clJldmlld3MgPSBudW1SZXZpZXdzLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8qIElmIHlvdSB3YW50IHRvIGRvIHRoZSA0MisgdGhpbmcuXHJcblx0XHQgaWYgKG51bVJldmlld3MgPiA0Mikge1xyXG5cdFx0IHN0clJldmlld3MgPSBcIjQyK1wiOyAvL2hhaWwgdGhlIGNyYWJpZ2F0b3IhXHJcblx0XHQgfVxyXG5cdFx0Ly8qL1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gdGhlIG51bWJlciBvZiByZXZpZXdzXHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhudW1SZXZpZXdzLnRvU3RyaW5nKCkgK1wiIHJldmlld3MgY3JlYXRlZFwiKTtcclxuICAgICAgICBpZiAobnVtUmV2aWV3cyA+IDApe1xyXG4gICAgICAgICAgICB2YXIgcmV2aWV3U3RyaW5nID0gKHNvb25lc3QgIT09IHZvaWQgMCk/IFwiPGJyLz5cXFxyXG5Nb3JlIHRvIGNvbWUgaW4gXCIrbXMyc3RyKHNvb25lc3QpOlwiXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXJldmlldycpLmlubmVySFRNTCA9IFwiUmV2aWV3IChcIiArIHN0clJldmlld3MgKyBcIilcIiArIHJldmlld1N0cmluZztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHRcclxuLypcclxuKiBwb3B1bGF0ZSByZXZpZXdzIHdoZW4gbWVudSBidXR0b24gcHJlc3NlZFxyXG4qL1xyXG5cclxud2luZG93LmdlbmVyYXRlUmV2aWV3TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cdC8vaWYgbWVudSBpcyBpbnZpc2libGUsIGl0IGlzIGFib3V0IHRvIGJlIHZpc2libGVcclxuXHRpZiAoICQoXCIjV0tTU19kcm9wZG93blwiKS5pcyhcIjpoaWRkZW5cIikgKXtcclxuXHRcdC8vVGhpcyBpcyByZWFsbHkgdGhlIG9ubHkgdGltZSBpdCBuZWVkcyB0byBydW5cclxuXHRcdC8vdW5sZXNzIHdlIHdhbnQgdG8gc3RhcnQgdXBkYXRpbmcgaW4gcmVhbHRpbWUgYnkga2VlcGluZyB0cmFjayBvZiB0aGUgc29vbmVzdCBpdGVtXHJcblx0XHRnZW5lcmF0ZVJldmlld0xpc3QoKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKlxyXG4qICBBZGQgSXRlbVxyXG4qL1xyXG4vLyBldmVudCBmdW5jdGlvbiB0byBvcGVuIFwiYWRkIHdpbmRvd1wiIGFuZCBjbG9zZSBhbnkgb3RoZXIgd2luZG93IHRoYXQgbWlnaHQgYmUgb3BlbiBhdCB0aGUgdGltZS5cclxud2luZG93LldLU1NfYWRkID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vc2hvdyB0aGUgYWRkIHdpbmRvd1xyXG5cdCQoXCIjYWRkXCIpLnNob3coKTtcclxuXHQvL2hpZGUgb3RoZXIgd2luZG93c1xyXG5cdCQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblx0JChcIiNlZGl0XCIpLmhpZGUoKTtcclxuXHQkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbn07XHJcblxyXG4vLydhZGQgd2luZG93JyBodG1sIHRleHRcclxudmFyIGFkZEh0bWwgPSAnXFxuXFxcclxuPGRpdiBpZD1cImFkZFwiIGNsYXNzPVwiV0tTU1wiPlxcblxcXHJcbjxmb3JtIGlkPVwiYWRkRm9ybVwiPlxcblxcXHJcbjxidXR0b24gaWQ9XCJBZGRDbG9zZUJ0blwiIGNsYXNzPVwid2tzcy1jbG9zZVwiIHR5cGU9XCJyZXNldFwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxuXFxcclxuPGgxPkFkZCBhIG5ldyBJdGVtPC9oMT5cXG5cXFxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImFkZEthbmppXCIgcGxhY2Vob2xkZXI9XCJFbnRlciDmvKLlrZcsIOOBsuOCieOBjOOBqiBvciDjgqvjgr/jgqvjg4pcIj5cXG5cXFxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImFkZFJlYWRpbmdcIiB0aXRsZT1cIkxlYXZlIGVtcHR5IHRvIGFkZCB2b2NhYnVsYXJ5IGxpa2Ug44GZ44KLICh0byBkbylcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHJlYWRpbmdcIj5cXG5cXFxyXG48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImFkZE1lYW5pbmdcIiBwbGFjZWhvbGRlcj1cIkVudGVyIG1lYW5pbmdcIj5cXG5cXFxyXG5cXG5cXFxyXG48cCBpZD1cImFkZFN0YXR1c1wiPlJlYWR5IHRvIGFkZC4uPC9wPlxcblxcXHJcbjxidXR0b24gaWQ9XCJBZGRJdGVtQnRuXCIgdHlwZT1cImJ1dHRvblwiPkFkZCBuZXcgSXRlbTwvYnV0dG9uPlxcblxcXHJcbjwvZm9ybT5cXG5cXFxyXG48L2Rpdj5cXG4nO1xyXG5cclxuLy9hZGQgaHRtbCB0byBwYWdlIHNvdXJjZVxyXG4kKFwiYm9keVwiKS5hcHBlbmQoYWRkSHRtbCk7XHJcblxyXG4vL2hpZGUgYWRkIHdpbmRvdyAoXCJkaXYgYWRkXCIgY29kZSB0aGF0IHdhcyBqdXN0IGFwcGVuZGVkKVxyXG4kKFwiI2FkZFwiKS5oaWRlKCk7XHJcblxyXG4vL2Z1bmN0aW9uIHRvIGZpcmUgb24gY2xpY2sgZXZlbnQgZm9yIFwiQWRkIG5ldyBJdGVtXCJcclxuJChcIiNBZGRJdGVtQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRoYW5kbGVBZGRDbGljaygpO1xyXG59KTtcclxuXHJcbiQoXCIjQWRkQ2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHQkKFwiI2FkZEZvcm1cIilbMF0ucmVzZXQoKTtcclxuXHQkKFwiI2FkZFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBhZGQuLicpO1xyXG5cdCQoXCIjYWRkS2FuamlcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuXHQkKFwiI2FkZE1lYW5pbmdcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vLS0tRnVuY3Rpb24gd3JhcHBlcnMgdG8gZmFjaWxpdGF0ZSB1c2Ugb2Ygb25lIGxvY2Fsc3RvcmFnZSBhcnJheVxyXG4vLy0tLU1haW50YWlucyBkYXRhIGludGVncml0eSBiZXR3ZWVuIHByZXZpb3VzbHkgdHdvICh2b2NhYiBhbmQgc3JzKVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNldFNyc0l0ZW0oc3JzaXRlbSxzcnNMaXN0KXtcclxuXHR2YXIgaW5kZXggPSBzcnNpdGVtLmk7XHJcblx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInNldFNyc0l0ZW06IFwiKTtcclxuXHJcblx0aWYoc3JzTGlzdCl7XHJcblx0XHRpZihzcnNMaXN0W2luZGV4XS5rYW5qaT09PXNyc2l0ZW0ua2Fuamkpey8vIHRyeSBzZWFyY2ggYnkgaW5kZXhcclxuXHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIitzcnNpdGVtLmthbmppK1wiIGZvdW5kIGF0IGluZGV4IFwiKyBpbmRleCk7XHJcblx0XHRcdC8vcmVwbGFjZSBvbmx5IHRoZSBzcnMgcGFydHMgb2YgdGhlIGl0ZW1cclxuXHRcdFx0c3JzTGlzdFtpbmRleF0uZGF0ZSA9IHNyc2l0ZW0uZGF0ZTtcclxuXHRcdFx0c3JzTGlzdFtpbmRleF0ubGV2ZWwgPSBzcnNpdGVtLmxldmVsO1xyXG5cdFx0XHRzcnNMaXN0W2luZGV4XS5sb2NrZWQgPSBzcnNpdGVtLmxvY2tlZDtcclxuXHRcdFx0c3JzTGlzdFtpbmRleF0ubWFudWFsTG9jayA9IHNyc2l0ZW0ubWFudWFsTG9jaztcclxuXHRcdH1lbHNleyAvL2JhY2t1cCBwbGFuIChjeWNsZSB0aHJvdWdoIGxpc3Q/KVxyXG5cdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiU1JTIEthbmppIG5vdCBmb3VuZCBpbiB2b2NhYmxpc3QsIG5lZWRzIHdvcmtcIik7XHJcblxyXG5cdFx0fVxyXG5cdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIml0ZW06IFwiKTtcclxuXHRcdHJldHVybiBzcnNMaXN0O1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3JzTGlzdCgpe1xyXG5cdHZhciBzcnNMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG5cdHJldHVybiBzcnNMaXN0O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RnVsbExpc3QoKXtcclxuXHR2YXIgZnVsbExpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpfHxbXTtcclxuXHRpZighZnVsbExpc3Qpe1xyXG5cdFx0ZnVsbExpc3Q9W107XHJcblx0fVxyXG5cdHJldHVybiBmdWxsTGlzdDtcclxufVxyXG5cclxuLy8tLS0tLS0tLVxyXG5cclxuLypcclxuKiAgRWRpdCBJdGVtc1xyXG4qL1xyXG53aW5kb3cuV0tTU19lZGl0ID0gZnVuY3Rpb24gKCkge1xyXG5cdGdlbmVyYXRlRWRpdE9wdGlvbnMoKTtcclxuXHQkKFwiI2VkaXRcIikuc2hvdygpO1xyXG5cdC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcblx0JChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG5cdCQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2FkZFwiKS5oaWRlKCk7XHJcblx0JChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG59O1xyXG5cclxuJChcImJvZHlcIikuYXBwZW5kKFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XFxcImVkaXRcXFwiIGNsYXNzPVxcXCJXS1NTXFxcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxmb3JtIGlkPVxcXCJlZGl0Rm9ybVxcXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVxcXCJFZGl0Q2xvc2VCdG5cXFwiIGNsYXNzPVxcXCJ3a3NzLWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPjxpIGNsYXNzPVxcXCJpY29uLXJlbW92ZVxcXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5FZGl0IHlvdXIgVm9jYWI8L2gxPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxzZWxlY3QgaWQ9XFxcImVkaXRXaW5kb3dcXFwiIHNpemU9XFxcIjhcXFwiPjwvc2VsZWN0PlxcXHJcbjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBpZD1cXFwiZWRpdEl0ZW1cXFwiIG5hbWU9XFxcIlxcXCIgc2l6ZT1cXFwiNDBcXFwiIHBsYWNlaG9sZGVyPVxcXCJTZWxlY3Qgdm9jYWIsIGNsaWNrIGVkaXQsIGNoYW5nZSBhbmQgc2F2ZSFcXFwiPlxcXHJcblxcXHJcbjxwIGlkPVxcXCJlZGl0U3RhdHVzXFxcIj5SZWFkeSB0byBlZGl0Li48L3A+XFxcclxuPGJ1dHRvbiBpZD1cXFwiRWRpdEVkaXRCdG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+RWRpdDwvYnV0dG9uPlxcXHJcbjxidXR0b24gaWQ9XFxcIkVkaXRTYXZlQnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlNhdmU8L2J1dHRvbj4gICAgICAgICBcXFxyXG48YnV0dG9uIGlkPVxcXCJFZGl0RGVsZXRlQnRuXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHRpdGxlPVxcXCJEZWxldGUgc2VsZWN0ZWQgaXRlbVxcXCI+RGVsZXRlPC9idXR0b24+ICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cXFwiRWRpdERlbGV0ZUFsbEJ0blxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB0aXRsZT1cXFwi5pys5b2T44Gr44KE44KL44Gu77yfXFxcIj5EZWxldGUgQWxsPC9idXR0b24+ICAgXFxcclxuPGJ1dHRvbiBpZD1cXFwiUmVzZXRMZXZlbHNCdG5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+UmVzZXQgbGV2ZWxzPC9idXR0b24+ICAgICAgICAgXFxcclxuPC9mb3JtPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48L2Rpdj5cIik7XHJcbiQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcblxyXG4kKFwiI0VkaXRFZGl0QnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHQvL2dldCBoYW5kbGUgZm9yICdzZWxlY3QnIGFyZWFcclxuXHR2YXIgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0V2luZG93XCIpO1xyXG5cclxuXHQvL2dldCB0aGUgaW5kZXggZm9yIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbVxyXG5cdHZhciBpbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4OyAvL3NlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZSBpcyBub3QgcmVxdWlyZWQsIG9wdGlvbiB2YWx1ZXMgYXJlIHNldCB0byBpbmRleFxyXG5cdHZhciB2b2NhYkxpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcblx0dm9jYWJMaXN0ID0gdm9jYWJMaXN0LnJldmVyc2UoKTtcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkodm9jYWJMaXN0W2luZGV4XSk7XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS5uYW1lID0gaW5kZXg7IC8vdXNpbmcgbmFtZSB0byBzYXZlIHRoZSBpbmRleFxyXG5cdCQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KCdMb2FkZWQgaXRlbSB0byBlZGl0Jyk7XHJcbn0pO1xyXG5cclxuJChcIiNFZGl0U2F2ZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCQoXCIjZWRpdEl0ZW1cIikudmFsKCkubGVuZ3RoICE9PSAwKSB7XHJcblx0XHQvLy0tIGJlIGF3YXJlXHJcblx0XHQvL2RlbGV0aW5nIG9uZSBpdGVtIG1heSBjYXVzZSBtaXNtYXRjaCBpZiBpIGlzIHByb3BlcnR5IG9mIGl0ZW0gaW4gbGlzdFxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS5uYW1lO1xyXG5cdFx0XHR2YXIgaXRlbSA9IEpTT04ucGFyc2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdFx0dmFyIG0gPSBpdGVtLm1lYW5pbmcubGVuZ3RoO1xyXG5cdFx0XHR3aGlsZShtLS0pe1xyXG5cdFx0XHRcdGlmIChpdGVtLm1lYW5pbmdbbV0gPT09IFwiXCIpe1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGl0ZW0ubWVhbmluZ1ttXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGZ1bGxMaXN0ID0gZ2V0RnVsbExpc3QoKS5yZXZlcnNlKCk7XHJcblxyXG5cclxuXHRcdFx0aWYgKGlzSXRlbVZhbGlkKGl0ZW0pICYmLy9pdGVtIGlzIHZhbGlkXHJcblx0XHRcdFx0IShjaGVja0ZvckR1cGxpY2F0ZXMoZnVsbExpc3QsaXRlbSkgJiYgLy9rYW5qaSAoaWYgY2hhbmdlZCkgaXMgbm90IGFscmVhZHkgaW4gdGhlIGxpc3RcclxuXHRcdFx0XHQgIGZ1bGxMaXN0W2luZGV4XS5rYW5qaSAhPT0gaXRlbS5rYW5qaSkpIHsvL3VubGVzcyBpdCBpcyB0aGUgaXRlbSBiZWluZyBlZGl0ZWRcclxuXHJcblxyXG5cdFx0XHRcdHZhciBzcnNsaXN0ID0gZ2V0U3JzTGlzdCgpLnJldmVyc2UoKTtcclxuXHRcdFx0XHQvL2dldCBzcnMgY29tcG9uZW50cyBvZiBpdGVtKGxpc3QpXHJcblxyXG5cdFx0XHRcdGZ1bGxMaXN0W2luZGV4XSA9IGl0ZW07Ly9kb2VzIG5vdCBoYXZlIHNycyBzdHVmZiwgcmUtYWRkIGl0IG5vd1xyXG5cclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGZ1bGxMaXN0W2luZGV4XSk7XHJcblx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhzcnNsaXN0W2luZGV4XSk7XHJcblx0XHRcdFx0ZnVsbExpc3RbaW5kZXhdLmRhdGUgPSBzcnNsaXN0W2luZGV4XS5kYXRlO1xyXG5cdFx0XHRcdGZ1bGxMaXN0W2luZGV4XS5sZXZlbCA9IHNyc2xpc3RbaW5kZXhdLmxldmVsO1xyXG5cdFx0XHRcdGZ1bGxMaXN0W2luZGV4XS5sb2NrZWQgPSBzcnNsaXN0W2luZGV4XS5sb2NrZWQ7XHJcblx0XHRcdFx0ZnVsbExpc3RbaW5kZXhdLm1hbnVhbExvY2sgPSBzcnNsaXN0W2luZGV4XS5tYW51YWxMb2NrO1xyXG5cclxuXHRcdFx0XHRmdWxsTGlzdCA9IGZ1bGxMaXN0LnJldmVyc2UoKTsgLy9yZXNldCBvcmRlciBvZiBhcnJheVxyXG5cclxuXHRcdFx0XHRsb2NhbFNldCgnVXNlci1Wb2NhYicsIGZ1bGxMaXN0KTtcclxuXHJcblx0XHRcdFx0Z2VuZXJhdGVFZGl0T3B0aW9ucygpO1xyXG5cdFx0XHRcdCQoXCIjZWRpdFN0YXR1c1wiKS5odG1sKCdTYXZlZCBjaGFuZ2VzIScpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikudmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikubmFtZSA9IFwiXCI7XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0ludmFsaWQgaXRlbSBvciBkdXBsaWNhdGUhJyk7XHJcblx0XHRcdFx0YWxlcnQoaXNJdGVtVmFsaWQoaXRlbSkudG9TdHJpbmcoKSArXCIgJiYg77yBKFwiKyBjaGVja0ZvckR1cGxpY2F0ZXMoZnVsbExpc3QsaXRlbSkudG9TdHJpbmcoKStcIiAmJiAhKFwiK2Z1bGxMaXN0W2luZGV4XS5rYW5qaStcIiAhPT0gXCIraXRlbS5rYW5qaStcIilcIik7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHQkKFwiI2VkaXRTdGF0dXNcIikudGV4dChlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuJChcIiNFZGl0RGVsZXRlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHQvL3NlbGVjdCBvcHRpb25zIGVsZW1lbnQgd2luZG93XHJcblx0dmFyIHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdFdpbmRvd1wiKTtcclxuXHJcblx0Ly9pbmRleCBvZiBzZWxlY3RlZCBpdGVtXHJcblx0dmFyIGl0ZW0gPSBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcblxyXG5cdC8vZmV0Y2ggSlNPTiBzdHJpbmdzIGZyb20gc3RvcmFnZSBhbmQgY29udmVydCB0aGVtIGludG8gSmF2YXNjcmlwdCBsaXRlcmFsc1xyXG5cdHZhciB2b2NhYkxpc3QgPSBnZXRGdWxsTGlzdCgpO1xyXG5cclxuXHQvL3N0YXJ0aW5nIGF0IHNlbGVjdGVkIGluZGV4LCByZW1vdmUgMSBlbnRyeSAodGhlIHNlbGVjdGVkIGluZGV4KS5cclxuXHRpZiAoaXRlbSA+IC0xKSB7XHJcblx0XHRpZiAodm9jYWJMaXN0ICE9PSBudWxsKXtcclxuXHRcdFx0dm9jYWJMaXN0LnNwbGljZShpdGVtLCAxKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8veXVja1xyXG5cdGlmICh2b2NhYkxpc3QubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRsb2NhbFNldCgnVXNlci1Wb2NhYicsIHZvY2FiTGlzdCk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItVm9jYWInKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUVkaXRHVUkoKTtcclxuXHJcblx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0l0ZW0gZGVsZXRlZCEnKTtcclxufSk7XHJcblxyXG4kKFwiI0VkaXREZWxldGVBbGxCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdHZhciBkZWxldGVBbGwgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgZW50cmllcz9cIik7XHJcblx0aWYgKGRlbGV0ZUFsbCkge1xyXG5cclxuXHRcdC8vZHJvcCBsb2NhbCBzdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlci1Wb2NhYicpO1xyXG5cclxuXHJcblx0XHR1cGRhdGVFZGl0R1VJKCk7XHJcblxyXG5cdFx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0FsbCBpdGVtcyBkZWxldGVkIScpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuJChcIiNFZGl0Q2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcblx0JChcIiNlZGl0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdCQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBlZGl0Li4nKTtcclxufSk7XHJcblxyXG4vKlxyXG4qICBFeHBvcnRcclxuKi9cclxud2luZG93LldLU1NfZXhwb3J0ID0gZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjZXhwb3J0XCIpLnNob3coKTtcclxuXHQvL2hpZGUgb3RoZXIgd2luZG93c1xyXG5cdCQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHQkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblx0JChcIiNlZGl0XCIpLmhpZGUoKTtcclxuXHQkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbn07XHJcblxyXG4kKFwiYm9keVwiKS5hcHBlbmQoJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48ZGl2IGlkPVwiZXhwb3J0XCIgY2xhc3M9XCJXS1NTXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48Zm9ybSBpZD1cImV4cG9ydEZvcm1cIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxidXR0b24gaWQ9XCJFeHBvcnRDbG9zZUJ0blwiIGNsYXNzPVwid2tzcy1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cImljb24tcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5FeHBvcnQgSXRlbXM8L2gxPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjx0ZXh0YXJlYSBjb2xzPVwiNTBcIiByb3dzPVwiMThcIiBpZD1cImV4cG9ydEFyZWFcIiBwbGFjZWhvbGRlcj1cIkV4cG9ydCB5b3VyIHN0dWZmISBTaGFyaW5nIGlzIGNhcmluZyA7KVwiPjwvdGV4dGFyZWE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuXFxcclxuPHAgaWQ9XCJleHBvcnRTdGF0dXNcIj5SZWFkeSB0byBleHBvcnQuLjwvcD4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cIkV4cG9ydEl0ZW1zQnRuXCIgdHlwZT1cImJ1dHRvblwiPkV4cG9ydCBJdGVtczwvYnV0dG9uPlxcXHJcbjxidXR0b24gaWQ9XCJFeHBvcnRTZWxlY3RBbGxCdG5cIiB0eXBlPVwiYnV0dG9uXCI+U2VsZWN0IEFsbDwvYnV0dG9uPlxcXHJcbjxidXR0b24gaWQ9XCJFeHBvcnRDc3ZCdG5cIiB0eXBlPVwiYnV0dG9uXCI+RXhwb3J0IENTVjwvYnV0dG9uPlxcXHJcbjwvZm9ybT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPC9kaXY+Jyk7XHJcbiQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHJcblxyXG4kKFwiI0V4cG9ydEl0ZW1zQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpIHtcclxuXHRcdCQoXCIjZXhwb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdFx0dmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuXHRcdCQoXCIjZXhwb3J0QXJlYVwiKS50ZXh0KEpTT04uc3RyaW5naWZ5KHZvY2FiTGlzdCkpO1xyXG5cdFx0JChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIkNvcHkgdGhpcyB0ZXh0IGFuZCBzaGFyZSBpdCB3aXRoIG90aGVycyFcIik7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0JChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIk5vdGhpbmcgdG8gZXhwb3J0IHlldCA6KFwiKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuJChcIiNFeHBvcnRTZWxlY3RBbGxCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdGlmICgkKFwiI2V4cG9ydEFyZWFcIikudmFsKCkubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRzZWxlY3RfYWxsKFwiZXhwb3J0QXJlYVwiKTtcclxuXHRcdCQoXCIjZXhwb3J0U3RhdHVzXCIpLnRleHQoXCJEb24ndCBmb3JnZXQgdG8gQ1RSTCArIEMhXCIpO1xyXG5cdH1cclxufSk7XHJcblxyXG4kKFwiI0V4cG9ydENzdkJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZvY2FiTGlzdCA9IGdldEZ1bGxMaXN0KCk7XHJcblx0dmFyIENzdkZpbGUgPSBjcmVhdGVDU1Yodm9jYWJMaXN0KTtcclxuXHR3aW5kb3cub3BlbihDc3ZGaWxlKTtcclxufSk7XHJcblxyXG4kKFwiI0V4cG9ydENsb3NlQnRuXCIpLmNsaWNrKFxyXG5cdGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHRcdCQoXCIjZXhwb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG5cdFx0JChcIiNleHBvcnRBcmVhXCIpLnRleHQoXCJcIik7XHJcblx0XHQkKFwiI2V4cG9ydFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBleHBvcnQuLicpO1xyXG5cdH1cclxuKTtcclxuXHJcbi8qXHJcbiogIEltcG9ydFxyXG4qL1xyXG53aW5kb3cuV0tTU19pbXBvcnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0JChcIiNpbXBvcnRcIikuc2hvdygpO1xyXG5cdC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcblx0JChcIiNhZGRcIikuaGlkZSgpO1xyXG5cdCQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG5cdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxufTtcclxuXHJcbiQoXCJib2R5XCIpLmFwcGVuZCgnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxkaXYgaWQ9XCJpbXBvcnRcIiBjbGFzcz1cIldLU1NcIj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjxmb3JtIGlkPVwiaW1wb3J0Rm9ybVwiPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cIkltcG9ydENsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cInJlc2V0XCI+PGkgY2xhc3M9XCJpY29uLXJlbW92ZVwiPjwvaT48L2J1dHRvbj5cXFxyXG48aDE+SW1wb3J0IEl0ZW1zPC9oMT5cXFxyXG48dGV4dGFyZWEgY29scz1cIjUwXCIgcm93cz1cIjE4XCIgaWQ9XCJpbXBvcnRBcmVhXCIgcGxhY2Vob2xkZXI9XCJQYXN0ZSB5b3VyIHN0dWZmIGFuZCBoaXQgdGhlIGltcG9ydCBidXR0b24hIFVzZSB3aXRoIGNhdXRpb24hXCI+PC90ZXh0YXJlYT4gICAgICAgICAgICAgICAgICAgICBcXFxyXG5cXFxyXG48cCBpZD1cImltcG9ydFN0YXR1c1wiPlJlYWR5IHRvIGltcG9ydC4uPC9wPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48bGFiZWwgY2xhc3M9XCJidXR0b25cIiBpZD1cIkltcG9ydEl0ZW1zQnRuXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtcIj5JbXBvcnQgSXRlbXM8L2xhYmVsPlxcXHJcblxcXHJcbjxsYWJlbCBpZD1cIkltcG9ydENzdkJ0blwiIGNsYXNzPVwiYnV0dG9uXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZTtjdXJzb3I6IHBvaW50ZXI7XCI+SW1wb3J0IENTViAgICAgICAgIFxcXHJcblxcXHJcbjxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwidXBsb2FkXCIgYWNjZXB0PVwiLmNzdiwudHN2XCIgc3R5bGU9XCJoZWlnaHQ6MHB4O3dpZHRoOjBweDtiYWNrZ3JvdW5kOnJlZDtvcGFjaXR5OjA7ZmlsdGVyOm9wYWNpdHkoMSk7XCIgLz5cXFxyXG5cXFxyXG48L2xhYmVsPlxcXHJcblxcXHJcbjxsYWJlbCBjbGFzcz1cImJ1dHRvblwiIGlkPVwiSW1wb3J0V0tCdG5cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO1wiPjxpIGNsYXNzPVwiaWNvbi1kb3dubG9hZC1hbHRcIj48L2k+IFdLPC9sYWJlbD5cXFxyXG48L2Zvcm0+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcXHJcbjwvZGl2PicpO1xyXG4kKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFwiKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFwiKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBJbXBvcnRVdGlsLmZpbGVVcGxvYWQsIGZhbHNlKTtcclxuXHJcblxyXG4kKFwiI0ltcG9ydENzdkJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbn0pO1xyXG5cclxuJChcIiNJbXBvcnRXS0J0blwiKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFdhbmlrYW5pVXRpbC5nZXRTZXJ2ZXJSZXNwKEFQSWtleSxcInZvY2FidWxhcnlcIik7XHJcblx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIm1heWJlP1wiKTtcclxufSk7XHJcblxyXG4kKFwiI0ltcG9ydEl0ZW1zQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0aWYgKCQoXCIjaW1wb3J0QXJlYVwiKS52YWwoKS5sZW5ndGggIT09IDApIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBhZGQgPSBKU09OLnBhcnNlKCQoXCIjaW1wb3J0QXJlYVwiKS52YWwoKS50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdFx0YWxlcnQoSlNPTi5zdHJpbmdpZnkoYWRkKSk7XHJcblx0XHRcdGlmIChjaGVja0FkZChhZGQpKSB7XHJcblx0XHRcdFx0JChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIk5vIHZhbGlkIGlucHV0IChkdXBsaWNhdGVzPykhXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG5ld2xpc3Q7XHJcblx0XHRcdHZhciBzcnNsaXN0ID0gW107XHJcblx0XHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1Wb2NhYicpKSB7XHJcblx0XHRcdFx0dmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuXHRcdFx0XHRzcnNsaXN0ID0gZ2V0U3JzTGlzdCgpO1xyXG5cdFx0XHRcdG5ld2xpc3QgPSB2b2NhYkxpc3QuY29uY2F0KGFkZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bmV3bGlzdCA9IGFkZDtcclxuXHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBpID0gYWRkLmxlbmd0aDtcclxuXHRcdFx0d2hpbGUoaS0tKXtcclxuXHRcdFx0XHRTdG9yYWdlVXRpbC5zZXRWb2NJdGVtKGFkZFtpXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJJbXBvcnQgc3VjY2Vzc2Z1bCFcIik7XHJcblxyXG5cdFx0XHQkKFwiI2ltcG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuXHRcdFx0JChcIiNpbXBvcnRBcmVhXCIpLnRleHQoXCJcIik7XHJcblxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0JChcIiNpbXBvcnRTdGF0dXNcIikudGV4dChcIlBhcnNpbmcgRXJyb3IhXCIpO1xyXG5cdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGUpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHQkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KFwiTm90aGluZyB0byBpbXBvcnQgOiggUGxlYXNlIHBhc3RlIHlvdXIgc3R1ZmYgZmlyc3RcIik7XHJcblx0fVxyXG59KTtcclxuXHJcbiQoXCIjSW1wb3J0Q2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdCQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuXHQkKFwiI2ltcG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuXHQkKFwiI2ltcG9ydEFyZWFcIikudGV4dChcIlwiKTtcclxuXHQkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBpbXBvcnQuLicpO1xyXG59KTtcclxuXHJcbi8qXHJcbiogIFJldmlldyBJdGVtc1xyXG4qL1xyXG53aW5kb3cuV0tTU19yZXZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdC8vaXMgdGhlcmUgYSBzZXNzaW9uIHdhaXRpbmcgaW4gc3RvcmFnZT9cclxuXHRpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVJldmlldycpKSB7XHJcblxyXG5cdFx0Ly9zaG93IHRoZSBzZWxmc3R1ZHkgd2luZG93XHJcblx0XHQkKFwiI3NlbGZzdHVkeVwiKS5zaG93KCk7XHJcblxyXG5cdFx0Ly9oaWRlIG90aGVyIHdpbmRvd3NcclxuXHRcdCQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHRcdCQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuXHRcdCQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcblx0XHQkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblxyXG5cdFx0c3RhcnRSZXZpZXcoKTtcclxuXHR9XHJcbn07XHJcblxyXG4kKFwiYm9keVwiKS5hcHBlbmQoJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48ZGl2IGlkPVwic2VsZnN0dWR5XCIgY2xhc3M9XCJXS1NTXCI+XFxcclxuPGJ1dHRvbiBpZD1cIlNlbGZzdHVkeUNsb3NlQnRuXCIgY2xhc3M9XCJ3a3NzLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbi1yZW1vdmVcIj48L2k+PC9idXR0b24+XFxcclxuPGgxPlJldmlldzxzcGFuIGlkPVwiUmV2TnVtXCI+PC9zcGFuPjwvaDE+XFxcclxuPGRpdiBpZD1cIndrc3Mta2FuamlcIj5cXFxyXG48c3BhbiBpZD1cInJldi1rYW5qaVwiPjwvc3Bhbj5cXFxyXG48L2Rpdj48ZGl2IGlkPVwid2tzcy10eXBlXCI+XFxcclxuPHNwYW4gaWQ9XCJyZXYtdHlwZVwiPjwvc3Bhbj48YnIgLz5cXFxyXG48L2Rpdj48ZGl2IGlkPVwid2tzcy1zb2x1dGlvblwiPlxcXHJcbjxzcGFuIGlkPVwicmV2LXNvbHV0aW9uXCI+PC9zcGFuPlxcXHJcbjwvZGl2PjxkaXYgaWQ9XCJ3a3NzLWlucHV0XCI+XFxcclxuPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJyZXYtaW5wdXRcIiBzaXplPVwiNDBcIiBwbGFjZWhvbGRlcj1cIlwiPlxcXHJcbjwvZGl2PjxzcGFuIGlkPVwicmV2LWluZGV4XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj48L3NwYW4+XFxcclxuXFxcclxuPGZvcm0gaWQ9XCJhdWRpby1mb3JtXCI+XFxcclxuPGxhYmVsIGlkPVwiQXVkaW9CdXR0b25cIiBjbGFzcz1cImJ1dHRvblwiPlBsYXkgYXVkaW88L2xhYmVsPlxcXHJcbjxsYWJlbCBpZD1cIldyYXBVcEJ0blwiICAgY2xhc3M9XCJidXR0b25cIj5XcmFwIFVwPC9sYWJlbD5cXFxyXG48L2Zvcm0+XFxcclxuPGRpdiBpZD1cInJldi1hdWRpb1wiIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvZGl2PlxcXHJcbjwvZGl2PicpO1xyXG4kKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcblxyXG4kKFwiI1NlbGZzdHVkeUNsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHQkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcblx0JChcIiNyZXYtaW5wdXRcIikudmFsKFwiXCIpO1xyXG5cdHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG59KTtcclxuXHJcbiQoXCIjV3JhcFVwQnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzZXNzaW9uTGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItUmV2aWV3Jyl8fFtdO1xyXG5cdHZhciBzdGF0c0xpc3QgPSBzZXNzaW9uR2V0KCdVc2VyLVN0YXRzJyl8fFtdO1xyXG5cdC8vaWYgYW4gaW5kZXggaW4gc2Vzc2lvbkxpc3QgbWF0Y2hlcyBvbmUgaW4gc3RhdHNMaXN0LCBkb24ndCBkZWxldGVcclxuXHR2YXIgc2Vzc2lvbkkgPSBzZXNzaW9uTGlzdC5sZW5ndGg7XHJcblx0dmFyIGl0ZW0gPSBzZXNzaW9uR2V0KCdXS1NTLWl0ZW0nKXx8W107XHJcblx0dmFyIGFycjIgPSBbXTtcclxuXHQvL2ZvciBldmVyeSBpdGVtIGluIHNlc3Npb25MaXN0LCBsb29rIGZvciBpbmRleCBpbiBzdGF0c0xpc3QsXHJcblx0Ly9pZiBub3QgdGhlcmUgKC0xKSBkZWxldGUgaXRlbSBmcm9tIHNlc3Npb25MaXN0XHJcblx0d2hpbGUgKHNlc3Npb25JLS0pe1xyXG5cdFx0dmFyIGluZGV4ID0gZmluZEluZGV4KHN0YXRzTGlzdCxzZXNzaW9uTGlzdFtzZXNzaW9uSV0pO1xyXG5cdFx0aWYgKChNYXRoLnNpZ24oMS9pbmRleCkgIT09IC0xKXx8KHNlc3Npb25MaXN0W3Nlc3Npb25JXS5pbmRleCA9PSBpdGVtLmluZGV4KSl7XHJcblxyXG5cdFx0XHRhcnIyLnB1c2goc2Vzc2lvbkxpc3Rbc2Vzc2lvbkldKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGFycjIpO1xyXG5cdHNlc3Npb25TZXQoJ1VzZXItUmV2aWV3JywgSlNPTi5zdHJpbmdpZnkoYXJyMikpO1xyXG59KTtcclxuXHJcbiQoXCIjQXVkaW9CdXR0b25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdG9wZW5Jbk5ld1RhYihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWF1ZGlvJykuaW5uZXJIVE1MKTtcclxufSk7XHJcblxyXG4kKFwiYm9keVwiKS5hcHBlbmQoJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48ZGl2IGlkPVwicmVzdWx0d2luZG93XCIgY2xhc3M9XCJXS1NTXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cIlJldmlld3Jlc3VsdHNDbG9zZUJ0blwiIGNsYXNzPVwid2tzcy1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cImljb24tcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5SZXZpZXcgUmVzdWx0czwvaDE+XFxcclxuPGgyPkFsbDwvaDI+XFxcclxuPGRpdiBpZD1cInN0YXRzLWFcIj48L2Rpdj5cXFxyXG48L2Rpdj4nKTtcclxuXHJcbiQoXCIjcmVzdWx0d2luZG93XCIpLmhpZGUoKTtcclxuXHJcbiQoXCIjUmV2aWV3cmVzdWx0c0Nsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHQkKFwiI3Jlc3VsdHdpbmRvd1wiKS5oaWRlKCk7XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1hXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbn0pO1xyXG5cclxuLy9kZWNsYXJlIGdsb2JhbCB2YWx1ZXMgZm9yIGtleXVwIGV2ZW50XHJcbi8vaXMgYW4gYW5zd2VyIGJlaW5nIHN1Ym1pdHRlZD9cclxudmFyIHN1Ym1pdCA9IHRydWU7XHJcblxyXG4vL2pxdWVyeSBrZXl1cCBldmVudFxyXG4kKFwiI3Jldi1pbnB1dFwiKS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG5cdC8vZnVuY3Rpb25zOlxyXG5cdC8vICBpbnB1dENvcnJlY3QoKVxyXG5cclxuXHQvL2NoZWNrIGlmIGtleSBwcmVzcyB3YXMgJ2VudGVyJyAoa2V5Q29kZSAxMykgb24gdGhlIHdheSB1cFxyXG5cdC8vYW5kIGtleXN0YXRlIHRydWUgKGFuc3dlciBiZWluZyBzdWJtaXR0ZWQpXHJcblx0Ly9hbmQgY3Vyc29yIGlzIGZvY3VzZWQgaW4gcmV2aWV3ZmllbGRcclxuXHRpZiAoZS5rZXlDb2RlID09IDEzICYmIHN1Ym1pdCA9PT0gdHJ1ZSkge1xyXG5cdFx0dmFyIGlucHV0ID0gJChcIiNyZXYtaW5wdXRcIikudmFsKCk7XHJcblx0XHR2YXIgcmV2aWV3TGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItUmV2aWV3Jyl8fFtdO1xyXG5cdFx0dmFyIHJuZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1dLU1Mtcm5kJyl8fDA7XHJcblxyXG5cdFx0dmFyIGl0ZW0gPSBzZXNzaW9uR2V0KCdXS1NTLWl0ZW0nKTtcclxuXHJcblx0XHQvLy0tIHN0YXJ0aW5nIGltcGxlbWVudGF0aW9uIG9mIGZvcmdpdmVuZXNzIHByb3RvY29sXHJcblxyXG5cdFx0aXRlbS5mb3JnaXZlID0gW107Ly9cIuOChuOCi+OBmVwiXTsgLy9wbGFjZWhvbGRlciAo6Kix44GZIHRvIGZvcmdpdmUpXHJcblxyXG5cclxuXHRcdGlmIChpdGVtID09PSBudWxsKXtcclxuXHRcdFx0YWxlcnQoXCJJdGVtIE51bGw/P1wiKTtcclxuXHRcdFx0cmV2aWV3TGlzdC5zcGxpY2Uocm5kLCAxKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHQvL2hhbmRsZSBncmFkaW5nIGFuZCBzdG9yaW5nIHNvbHV0aW9uXHJcblxyXG5cdFx0XHQvL2NoZWNrIGZvciBpbnB1dCwgZG8gbm90aGluZyBpZiBub25lXHJcblx0XHRcdGlmKGlucHV0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL2Rpc2FibGUgaW5wdXQgYWZ0ZXIgc3VibWlzc2lvblxyXG5cdFx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKS5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG5cclxuXHRcdFx0Ly93YXMgdGhlIGlucHV0IGNvcnJlY3Q/XHJcblx0XHRcdHZhciBjb3JyZWN0ID0gaW5wdXRDb3JyZWN0KCk7XHJcblxyXG5cdFx0XHQvL3dhcyB0aGUgaW5wdXQgZm9yZ2l2ZW4/XHJcblx0XHRcdHZhciBmb3JnaXZlbiA9IChpdGVtLmZvcmdpdmUuaW5kZXhPZihpbnB1dCkgIT09IC0xKTtcclxuXHJcblx0XHRcdGlmIChjb3JyZWN0KSB7XHJcblx0XHRcdFx0Ly9oaWdobGlnaHQgaW4gKGRlZmF1bHQpIGdyZWVuXHJcblx0XHRcdFx0JChcIiNyZXYtaW5wdXRcIikuYWRkQ2xhc3MoXCJjb3JyZWN0XCIpO1xyXG5cdFx0XHRcdC8vc2hvdyBhbnN3ZXJcclxuXHRcdFx0XHQkKFwiI3Jldi1zb2x1dGlvblwiKS5hZGRDbGFzcyhcImluZm9cIik7XHJcblx0XHRcdH0gZWxzZSBpZiAoZm9yZ2l2ZW4pe1xyXG5cdFx0XHRcdCQoXCIjcmV2LWlucHV0XCIpLmFkZENsYXNzKFwiY2F1dGlvblwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL2hpZ2hpZ2h0IGluIHJlZFxyXG5cdFx0XHRcdCQoXCIjcmV2LWlucHV0XCIpLmFkZENsYXNzKFwiZXJyb3JcIik7XHJcblx0XHRcdFx0Ly9zaG93IGFuc3dlclxyXG5cdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLmFkZENsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9yZW1vdmUgZnJvbSBzZXNzaW9uTGlzdCBpZiBjb3JyZWN0XHJcblx0XHRcdGlmIChjb3JyZWN0KSB7XHJcblx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImNvcnJlY3QgYW5zd2VyXCIpO1xyXG5cdFx0XHRcdGlmIChyZXZpZXdMaXN0ICE9PSBudWxsKXtcclxuXHRcdFx0XHRcdHZhciBvbGRsZW4gPSByZXZpZXdMaXN0Lmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHRyZXZpZXdMaXN0LnNwbGljZShybmQsIDEpO1xyXG5cdFx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInNlc3Npb25MaXN0Lmxlbmd0aDogXCIrIG9sZGxlbiArXCIgLT4gXCIrcmV2aWV3TGlzdC5sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHRcdC8vcmVwbGFjZSBzaG9ydGVyIChieSBvbmUpIHNlc3Npb25MaXN0IHRvIHNlc3Npb25cclxuXHRcdFx0XHRcdGlmIChyZXZpZXdMaXN0Lmxlbmd0aCAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2Vzc2lvbkxpc3QubGVuZ3RoOiBcIisgcmV2aWV3TGlzdC5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0XHRzZXNzaW9uU2V0KCdVc2VyLVJldmlldycsIEpTT04uc3RyaW5naWZ5KHJldmlld0xpc3QpKTtcclxuXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvL3JldmVpdyBvdmVyLCBkZWxldGUgc2Vzc2lvbmxpc3QgZnJvbSBzZXNzaW9uXHJcblx0XHRcdFx0XHRcdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItUmV2aWV3Jyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6IG5vIHJldmlldyBzZXNzaW9uIGZvdW5kXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Ly8gICBpZihmb3JnaXZlbil7XHJcblx0XHRcdFx0Ly8gICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coaW5wdXQgK1wiIGhhcyBiZWVuIGZvcmdpdmVuLiBcIitpdGVtLnR5cGUpO1xyXG5cdFx0XHRcdC8vICAgcmV0dXJuO1xyXG5cdFx0XHRcdC8vfVxyXG5cdFx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ3cm9uZyBhbnN3ZXJcIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGl0ZW0gPSBtYXJrQW5zd2VyKGl0ZW0pO1xyXG5cclxuXHRcdFx0c2Vzc2lvblNldChpdGVtLmluZGV4LCBpdGVtKTtcclxuXHJcblxyXG5cdFx0XHR2YXIgbGlzdCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIlVzZXItU3RhdHNcIikpfHxbXTtcclxuXHRcdFx0dmFyIGZvdW5kID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAobGlzdCl7XHJcblx0XHRcdFx0dmFyIGkgPSBsaXN0Lmxlbmd0aDtcclxuXHRcdFx0XHR3aGlsZShpLS0pe1xyXG5cdFx0XHRcdFx0aWYgKGxpc3RbaV0uaW5kZXggPT0gaXRlbS5pbmRleCkge1xyXG5cdFx0XHRcdFx0XHRsaXN0W2ldID0gaXRlbTtcdFx0XHRcdFx0XHRcdFx0Ly9yZXBsYWNlIGl0ZW0gaWYgaXQgZXhpc3RzXHJcblx0XHRcdFx0XHRcdGZvdW5kID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKCFmb3VuZCl7XHJcblx0XHRcdFx0XHRsaXN0ID0gc2F2ZVRvU29ydGVkTGlzdChsaXN0LGl0ZW0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGlzdCA9IFtpdGVtXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2Vzc2lvblNldChcIlVzZXItU3RhdHNcIiwgSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG5cdFx0XHQvL3BsYXlBdWRpbygpO1xyXG5cclxuXHRcdFx0Ly9hbnN3ZXIgc3VibWl0dGVkLCBuZXh0ICdlbnRlcicgcHJvY2VlZHMgd2l0aCBzY3JpcHRcclxuXHRcdFx0c3VibWl0ID0gZmFsc2U7XHJcblx0XHR9Ly9udWxsIGdhcmJhZ2UgY29sbGVjdGlvblxyXG5cdH1cclxuXHRlbHNlIGlmIChlLmtleUNvZGUgPT0gMTMgJiYgc3VibWl0ID09PSBmYWxzZSkge1xyXG5cdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImtleXN0YXQgPSBcIiArIHN1Ym1pdCk7XHJcblxyXG5cdFx0Ly90aGVyZSBhcmUgc3RpbGwgbW9yZSByZXZpZXdzIGluIHNlc3Npb24/XHJcblx0XHRpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSkge1xyXG5cdFx0XHQvLyBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiZm91bmQgYSAnVXNlci1SZXZpZXcnOiBcIiArIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItUmV2aWV3JykpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInJlZnJlc2hpbmcgcmV2aWV3TGlzdCBmcm9tIHN0b3JhZ2VcIik7XHJcblx0XHRcdFx0dmFyIHJldmlld0xpc3QgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItUmV2aWV3JykpO1xyXG5cclxuXHRcdFx0XHQvL2N1ZSB1cCBmaXJzdCByZW1haW5pbmcgcmV2aWV3XHJcblx0XHRcdFx0bmV4dFJldmlldyhyZXZpZXdMaXN0KTtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiY2hlY2tpbmcgZm9yIGVtcHR5IHJldmlld0xpc3RcIik7XHJcblx0XHRcdFx0aWYgKHJldmlld0xpc3QubGVuZ3RoID09PSAwKXtcclxuXHJcblx0XHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2Vzc2lvbiBvdmVyLiByZXZpZXdMaXN0OiBcIitKU09OLnN0cmluZ2lmeShyZXZpZXdMaXN0KSk7XHJcblx0XHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiVXNlci1SZXZpZXdcIik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKS5kaXNhYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0JChcIiNyZXYtc29sdXRpb25cIikucmVtb3ZlQ2xhc3MoXCJpbmZvXCIpO1xyXG5cdFx0XHRcdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKS5mYWRlSW4oJ2Zhc3QnKTtcclxuXHJcblx0XHRcdH0sIDEpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIG5vIHJldmlldyBzdG9yZWQgaW4gc2Vzc2lvbiwgcmV2aWV3IGlzIG92ZXJcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdCQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuXHRcdFx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoXCIjcmV2LXNvbHV0aW9uXCIpLnJlbW92ZUNsYXNzKFwiaW5mb1wiKTtcclxuXHRcdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2hvd1Jlc3VsdHNcIik7XHJcblx0XHRcdFx0c2hvd1Jlc3VsdHMoKTtcclxuXHRcdFx0XHQkKFwiI3Jlc3VsdHdpbmRvd1wiKS5zaG93KCk7XHJcblx0XHRcdFx0ZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInNob3dSZXN1bHRzIGNvbXBsZXRlZFwiKTtcclxuXHJcblx0XHRcdFx0Ly8qLyAgLy9jbGVhciBzZXNzaW9uXHJcblx0XHRcdFx0c2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHRcdFx0XHRyZXZpZXdBY3RpdmUgPSBmYWxzZTtcclxuXHJcblxyXG5cdFx0XHR9LCAxKTtcclxuXHRcdH1cclxuXHRcdHN1Ym1pdCA9IHRydWU7XHJcblxyXG5cdH1cclxufSk7XHJcblx0LyoqIHBvcHVsYXRlIHJldmlld3Mgd2hlbiBtZW51IGJ1dHRvbiBwcmVzc2VkXHJcblx0Ki9cclxuICAgIHdpbmRvdy5nZW5lcmF0ZVJldmlld0xpc3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvL2lmIG1lbnUgaXMgaW52aXNpYmxlLCBpdCBpcyBhYm91dCB0byBiZSB2aXNpYmxlXHJcbiAgICAgICAgaWYgKCAkKFwiI1dLU1NfZHJvcGRvd25cIikuaXMoXCI6aGlkZGVuXCIpICl7XHJcbiAgICAgICAgICAgIC8vVGhpcyBpcyByZWFsbHkgdGhlIG9ubHkgdGltZSBpdCBuZWVkcyB0byBydW5cclxuICAgICAgICAgICAgLy91bmxlc3Mgd2Ugd2FudCB0byBzdGFydCB1cGRhdGluZyBpbiByZWFsdGltZSBieSBrZWVwaW5nIHRyYWNrIG9mIHRoZSBzb29uZXN0IGl0ZW1cclxuICAgICAgICAgICAgZ2VuZXJhdGVSZXZpZXdMaXN0KHJldmlld0FjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHQvKiogIEFkZCBJdGVtOiBldmVudCBmdW5jdGlvbiB0byBvcGVuIFwiYWRkIHdpbmRvd1wiIGFuZCBjbG9zZSBhbnkgb3RoZXIgd2luZG93IHRoYXQgbWlnaHQgYmUgb3BlbiBhdCB0aGUgdGltZS5cclxuXHQqL1xyXG4gICAgd2luZG93LldLU1NfYWRkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vc2hvdyB0aGUgYWRkIHdpbmRvd1xyXG4gICAgICAgICQoXCIjYWRkXCIpLnNob3coKTtcclxuICAgICAgICAvL2hpZGUgb3RoZXIgd2luZG93c1xyXG4gICAgICAgICQoXCIjZXhwb3J0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNlZGl0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbiAgICB9O1xyXG5cdFxyXG5cdHZhciBhZGRFbGVtZW50ID0gcmVxdWlyZSgnLi9hZGRlbGVtZW50LmpzJyk7XHJcblx0Ly9hZGQgaHRtbCB0byBwYWdlIHNvdXJjZVxyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKGFkZEVsZW1lbnQpO1xyXG4gICAgLy9oaWRlIGFkZCB3aW5kb3cgKFwiZGl2IGFkZFwiIGNvZGUgdGhhdCB3YXMganVzdCBhcHBlbmRlZClcclxuICAgICQoXCIjYWRkXCIpLmhpZGUoKTtcclxuXHJcbiAgICB2YXIgaGFuZGxlQWRkQ2xpY2sgPSByZXF1aXJlKCcuL2hhbmRsZUFkZENsaWNrLmpzJyk7XHJcblx0XHJcbiAgICAvL2Z1bmN0aW9uIHRvIGZpcmUgb24gY2xpY2sgZXZlbnQgZm9yIFwiQWRkIG5ldyBJdGVtXCJcclxuICAgICQoXCIjQWRkSXRlbUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaGFuZGxlQWRkQ2xpY2soKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjQWRkQ2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjYWRkXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2FkZEZvcm1cIilbMF0ucmVzZXQoKTtcclxuICAgICAgICAkKFwiI2FkZFN0YXR1c1wiKS50ZXh0KCdSZWFkeSB0byBhZGQuLicpO1xyXG4gICAgICAgICQoXCIjYWRkS2FuamlcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuICAgICAgICAkKFwiI2FkZE1lYW5pbmdcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKiBLZWVwcyBsZWdhY3kgc3JzTGlzdCB1cGRhdGVkLlxyXG5cdCogQGRlcHJlY2lhdGVcclxuXHQqIEBwYXJhbSB7U3JzSXRlbX0gc3JzaXRlbVxyXG5cdCogQHBhcmFtIHtBcnJheS48U3JzSXRlbT59IHNyc0xpc3RcclxuXHQqIEByZXR1cm5zIHtBcnJheS48U3JzSXRlbT59IFRoZSBzcnMgZGF0YSBmb3IgYSB0YXNrLiBPciBudWxsIGlmIG5vIHNyc0xpc3Qgd2FzIHByb3ZpZGVkLlxyXG5cdCovXHJcbiAgICB2YXIgdXBkYXRlU3JzSW5MaXN0ID0gZnVuY3Rpb24oc3JzaXRlbSwgc3JzTGlzdCl7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3JzaXRlbS5pO1xyXG4gICAgICAgIGlmKHNyc0xpc3Qpe1xyXG4gICAgICAgICAgICBpZihzcnNMaXN0W2luZGV4XS5rYW5qaT09PXNyc2l0ZW0ua2Fuamkpey8vIHRyeSBzZWFyY2ggYnkgaW5kZXhcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJzdWNjZXNzOiBcIitzcnNpdGVtLmthbmppK1wiIGZvdW5kIGF0IGluZGV4IFwiKyBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3JlcGxhY2Ugb25seSB0aGUgc3JzIHBhcnRzIG9mIHRoZSBpdGVtXHJcbiAgICAgICAgICAgICAgICBzcnNMaXN0W2luZGV4XS5kYXRlID0gc3JzaXRlbS5kYXRlO1xyXG4gICAgICAgICAgICAgICAgc3JzTGlzdFtpbmRleF0ubGV2ZWwgPSBzcnNpdGVtLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgc3JzTGlzdFtpbmRleF0ubG9ja2VkID0gc3JzaXRlbS5sb2NrZWQ7XHJcbiAgICAgICAgICAgICAgICBzcnNMaXN0W2luZGV4XS5tYW51YWxMb2NrID0gc3JzaXRlbS5tYW51YWxMb2NrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzcnNMaXN0O1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG4gICAgfTtcclxuICAgIC8qKiBDaGVja3MgaWYgYW4gaXRlbSdzIGthbmppIGlzIHJlcHJlc2VudGVkIGluIGEgbGlzdFxyXG5cdCogQHJldHVybnMge2Jvb2xlYW59XHJcblx0Ki9cclxuICAgIHZhciBjaGVja0ZvckR1cGxpY2F0ZXMgPSBmdW5jdGlvbihsaXN0LCBpdGVtKXtcclxuXHRcdHJldHVybiBsaXN0LnNvbWUoZnVuY3Rpb24oYSl7cmV0dXJuIGEua2FuamkgPT09IGl0ZW0ua2Fuamk7fSk7XHJcblx0fTtcclxuXHJcblx0LyoqIENyZWF0ZXMgYSBsb29rdXAgYXJyYXkgZm9yIGVhY2gga2Fuamkgd2l0aCBpdHMgc3JzIGxldmVsLiBVc2VkIGZvciBkaXNwbGF5aW5nIGNvbXBvbmVudCBsZXZlbHMuXHJcblx0KiBAcGFyYW0gaXRlbVxyXG5cdCogQHBhcmFtIGthbmppbGlzdFxyXG5cdCogQHJldHVybnMgQW4gYXJyYXkgb2YgdGhlIGthbmppIHdpdGggU1JTIHZhbHVlcyBmb3IgZWFjaCBrYW5qaSBjb21wb25lbnQuXHJcblx0KiBAZXhhbXBsZVxyXG4gICAgICAgIGVnLiDmipjjgorntJk6XHJcbiAgICAgICAgY29tcFNSUyA9IFt7XCJrYW5qaVwiOiBcIuaKmFwiLCBcInNyc1wiOiBcImd1cnVcIn0sIHtcImthbmppXCI6IFwi57SZXCIsIFwic3JzXCI6IFwiYXBwcmVudGljZVwifV1cclxuXHQqL1xyXG4gICAgdmFyIGdldENvbXBLYW5qaSA9IGZ1bmN0aW9uKGl0ZW0sIGthbmppTGlzdCl7XHJcbiAgICAgICAgaWYgKCFrYW5qaUxpc3Qpe1xyXG4gICAgICAgICAgICBrYW5qaUxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImdldENvbXBLYW5qaShpdGVtLCBrYW5qaUxpc3QpXCIpO1xyXG5cclxuICAgICAgICB2YXIgY29tcFNSUyA9IFtdO1xyXG4gICAgICAgIHZhciBrYW5qaVJlYWR5ID0gZmFsc2U7IC8vaW5kaWNhdGVzIGlmIHRoZSBrYW5qaUxpc3QgaGFzIGJlZW4gcG9wdWxhdGVkXHJcbiAgICAgICAgdmFyIHVzZXJHdXBweSA9IGZhbHNlOyAvL2luZGljYXRlcyBpZiBrYW5qaUxpc3QgaGFzIGxlc3MgdGhhbiAxMDAgaXRlbXNcclxuICAgICAgICB2YXIga2FuamlPYmogPSB7fTtcclxuXHJcbiAgICAgICAgLy9oYXMgdGhlIHNlcnZlciByZXNwb25kZWQgeWV0XHJcbiAgICAgICAgaWYgKGthbmppTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcImthbmppTGlzdCBpcyA+IDBcIik7XHJcbiAgICAgICAgICAgIGthbmppUmVhZHkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy9jcmVhdGUgbG9va3VwIG9iamVjdFxyXG4gICAgICAgICAgICBmb3IgKHZhciBrPTA7azxrYW5qaUxpc3QubGVuZ3RoO2srKyl7XHJcbiAgICAgICAgICAgICAgICBrYW5qaU9ialtrYW5qaUxpc3Rba10uY2hhcmFjdGVyXSA9IGthbmppTGlzdFtrXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pcyB0aGVyZSBsZXNzIHRoYW4gMTAwIGthbmppIGluIHRoZSByZXNwb25zZVxyXG4gICAgICAgICAgICBpZiAoa2FuamlMaXN0Lmxlbmd0aCA8IDEwMCl7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwia2FuamlMaXN0IGlzIDwgMTAwXCIpO1xyXG4gICAgICAgICAgICAgICAgdXNlckd1cHB5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgXHJcblxyXG4gICAgICAgIHZhciBjb21wb25lbnRzID0gaXRlbS5jb21wb25lbnRzO1xyXG4gICAgICAgIC8vZm9yIGVhY2gga2FuamkgY2hhcmFjdGVyIGNvbXBvbmVudFxyXG4gICAgICAgIC8vICAgIHRoaXMgaXMgdGhlIG91dGVyIGxvb3Agc2luY2UgdGhlcmUgd2lsbCBiZSBmYXIgbGVzcyBvZiB0aGVtIHRoYW4ga2FuamlMaXN0XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvbXBvbmVudHMubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9mb3IgZWFjaCBrYW5qaSByZXR1cm5lZCBieSB0aGUgc2VydmVyXHJcbiAgICAgICAgICAgIC8vIGZvcih2YXIgaj0wOyBqPGthbmppTGlzdC5sZW5ndGg7IGorKyl7XHJcblxyXG4gICAgICAgICAgICAvL2lmIHRoZSBrYW5qaSByZXR1cm5lZCBieSB0aGUgc2VydmVyIG1hdGNoZXMgdGhlIGNoYXJhY3RlciBpbiB0aGUgaXRlbVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGthbmppT2JqW2NvbXBvbmVudHNbaV1dICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIGlmIChrYW5qaUxpc3Rbal0uY2hhcmFjdGVyID09IGNvbXBvbmVudHNbaV0pe1xyXG4gICAgICAgICAgICAgICAgY29tcFNSU1tpXSA9IHtcImthbmppXCI6IGNvbXBvbmVudHNbaV0sIFwic3JzXCI6IGthbmppT2JqW2NvbXBvbmVudHNbaV1dLnNyc307XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBicmVhazsgLy9rYW5qaSBmb3VuZDogJ2knIGlzIGl0cyBwb3NpdGlvbiBpbiBpdGVtIGNvbXBvbmVudHM7ICdqJyBpcyBpdHMgcG9zdGlvbiBpbiB0aGUgJ2thbmppTGlzdCcgc2VydmVyIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoZWQgPT09IGZhbHNlKXsgLy8gY2hhcmFjdGVyIGdvdCBhbGwgdGhlIHdheSB0aHJvdWdoIGthbmppTGlzdCB3aXRob3V0IGEgbWF0Y2guXHJcbiAgICAgICAgICAgICAgICBpZiAoa2FuamlSZWFkeSl7IC8vd2FzIHRoZXJlIGEgc2VydmVyIHJlc3BvbnNlP1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyR3VwcHkpeyAvL2lzIHRoZSB1c2VyIGEgZ3VwcHkgKGthbmppIHByb2JhYmx5IG1hdGNoZXMgYSB0dXJ0bGVzIHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwibWF0Y2hlZD1mYWxzZSwga2FuamlMaXN0Lmxlbmd0aDogXCIra2FuamlMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBTUlNbaV0gPSB7XCJrYW5qaVwiOiBjb21wb25lbnRzW2ldLCBcInNyc1wiOiBcIm5vTWF0Y2hHdXBweVwifTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0XHRlbHNleyAvL3VzZXIgaXMgYSB0dXJ0bGUsIGthbmppIG11c3Qgbm90IGhhdmUgYmVlbiBhZGRlZCB0byBXSyAoeWV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwibWF0Y2hlZD1mYWxzZSwga2FuamlMaXN0Lmxlbmd0aDogXCIra2FuamlMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBTUlNbaV0gPSB7XCJrYW5qaVwiOiBjb21wb25lbnRzW2ldLCBcInNyc1wiOiBcIm5vTWF0Y2hXS1wifTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwibWF0Y2hlZD1mYWxzZSwga2FuamlSZWFkeT1mYWxzZSwgbm9TZXJ2ZXJSZXNwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBTUlNbaV0gPSB7XCJrYW5qaVwiOiBjb21wb25lbnRzW2ldLCBcInNyc1wiOiBcIm5vU2VydmVyUmVzcFwifTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcFNSUztcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciBpc0thbmppTG9ja2VkID0gZnVuY3Rpb24oc3JzaXRlbSwga2FuamlMaXN0LCBsb2Nrc09uKXtcclxuICAgICAgICAvL2l0ZW0gdW5sb2NrZWQgYnkgZGVmYXVsdFxyXG4gICAgICAgIC8vbWF5IGhhdmUgbm8ga2FuamksIG9ubHkgdW5sb2NrZWQga2Fuamkgd2lsbCBnZXQgdGhyb3VnaCB0aGUgY29kZSB1bmZsYWdnZWRcclxuXHJcblx0XHQvLyBFbnVtZXJhdGlvbiBcInllc1wiLCBcIm5vXCIsIFwiREJcIlxyXG4gICAgICAgIHZhciBsb2NrZWQgPSBcIm5vXCI7XHJcbiAgICAgICAgaWYgKGxvY2tzT24pe1xyXG4gICAgICAgICAgICAvL2dldCB0aGUga2FuamkgY2hhcmFjdGVycyBpbiB0aGUgd29yZC5cclxuICAgICAgICAgICAgdmFyIGNvbXBvbmVudExpc3QgPSBnZXRDb21wS2Fuamkoc3JzaXRlbSwga2FuamlMaXN0KTtcclxuICAgICAgICAgICAgLy8gZWc6IGNvbXBvbmVudExpc3QgPSBnZXRDb21wS2FuamkoXCLmipjjgorntJlcIiwga2FuamlMaXN0KTtcclxuICAgICAgICAgICAgLy8gY29tcG9uZW50TGlzdCA9IFt7XCJrYW5qaVwiOiBcIuaKmFwiLCBcInNyc1wiOiBcImd1cnVcIn0sIHtcImthbmppXCI6IFwi57SZXCIsIFwic3JzXCI6IFwiYXBwcmVudGljZVwifV1cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYyA9IGNvbXBvbmVudExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZShjLS0pe1xyXG4gICAgICAgICAgICAgICAgLy9sb29rIGZvciBsb2NrZWQga2FuamkgaW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudExpc3RbY10uc3JzID09IFwiYXBwcmVudGljZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TGlzdFtjXS5zcnMgPT0gXCJub1NlcnZlclJlc3BcInx8XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TGlzdFtjXS5zcnMgPT0gXCJ1bnJlYWNoZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tY291bGQgYmUgYXBwcmVudGljZSBldGMuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9TaW1wbGU6IGxvY2sgaXMgJ3llcydcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSBcInllc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFwieWVzXCI6XHRpdGVtIHdpbGwgYmUgbG9ja2VkIHdoaWxlIHRoZXJlIGlzIG5vIGRhdGFiYXNlIGNvbm5lY3Rpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cdFx0XHRpZiB0aGUgc2VydmVyIHJlc3BvbnNlIGluZGljYXRlcyB0aGF0IGl0IGhhcyBiZWVuIHVubG9ja2VkLCBvbmx5IHRoZW4gd2lsbCBpdCBiZSBhdmFpbGFibGUgZm9yIHJldmlld1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwidGVzdCBzcnMgZm9yIGFwcHJlbnRpY2UgZXRjLiAnbG9ja2VkJzogXCIrIGxvY2tlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coY29tcG9uZW50TGlzdFtjXS5rYW5qaSArXCI6IFwiK2NvbXBvbmVudExpc3RbY10uc3JzICtcIiAtPiBcIisgbG9ja2VkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIGFzIHNvb24gYXMgb25lIGthbmppIGlzIGxvY2tlZCwgdGhlIHdob2xlIGl0ZW0gaXMgbG9ja2VkXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9EQiBsb2NrcyBnZXQgc3BlY2lhbCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudExpc3RbY10uc3JzID09IFwibm9NYXRjaFdLXCIgfHwgY29tcG9uZW50TGlzdFtjXS5zcnMgPT0gXCJub01hdGNoR3VwcHlcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IFwiREJcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL1wiREJcIlx0OiBkYXRhYmFzZSBsaW1pdGF0aW9ucywgb25lIG9mIHR3byB0aGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAvL2EuIHRoZSBrYW5qaSBpc24ndCBpbiB0aGUgZGF0YWJhc2UgYW5kIHRoZSB1c2VyIGlzIGEgZ3VwcHkgLS1jb3VsZCBjaGFuZ2UgaWYgdXNlciBzdWJzY3JpYmVzIG9yIGZpcnN0IHR3byBsZXZlbHMgY2hhbmdlL2V4cGFuZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYi4gdGhlIGthbmppIGlzbid0IGluIHRoZSBkYXRhYmFzZSBhbmQgdGhlIHVzZXIgaXMgYSB0dXJ0bGUgLS1jb3VsZCBjaGFuZ2UgaWYgbW9yZSBrYW5qaSBhZGRlZC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInRlc3Qgc3JzIGZvciB1bm1hdGNoZWQga2FuamkuICdsb2NrZWQnOiBcIisgbG9ja2VkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhjb21wb25lbnRMaXN0W2NdLmthbmppICtcIjogXCIrY29tcG9uZW50TGlzdFtjXS5zcnMgK1wiIC0+IFwiKyBsb2NrZWQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IC8vZm9yIGNoYXIgaW4gY29tcG9uZW50TGlzdFxyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwib3V0IG9mIGNoYXJhY3RlciBsb29wXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xvY2tlZCB3aWxsIGJlIGVpdGhlciBcInllc1wiLFwibm9cIiwgb3IgXCJEQlwiXHJcbiAgICAgICAgcmV0dXJuIFtsb2NrZWRdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogR2V0cyB0aGUgS2FuamkgY2hhcmFjdGVycyBpbiBhIGdpdmVuIHN0cmluZy5cclxuXHQqIEBwYXJhbSB7c3RyaW5nfSB2b2NhYlN0cmluZyAtXHJcblx0KiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn0gQW4gYXJyYXkgb2YgdGhlIGthbmppIGNvbXBvbmVudHMgaW4gdGhlIGdpdmVuIHN0cmluZ1xyXG5cdCovXHJcbiAgICB2YXIgZ2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uKHZvY2FiU3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHZvY2FiU3RyaW5nLCBmdW5jdGlvbihjaCl7XHJcbiAgICAgICAgICAgIHJldHVybiAvXltcXHU0ZTAwLVxcdTlmYWZdKyQvLnRlc3QoY2gpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogTWFuYWdlcyB0aGUgbG9ja2VkIGFuZCBtYW51YWxMb2NrIHByb3BlcnRpZXMgb2Ygc3JzaXRlbS4gVGhpcyBpcyB0byBzdG9wIGl0ZW1zIGJlaW5nIGxvY2tlZCBhZ2FpbiBhZnRlciB0aGV5IGhhdmUgYmVlbiB1bmxvY2tlZCBpZiBhbnkgb2YgdGhlIGthbmppIHVzZWQgZmFsbHMgYmVsb3cgdGhlIHVubG9jayB0aHJlc2hvbGQgKGVnLiBpZiB0aGUg5YuJIGluIOWLieW8tyBmYWxscyBiYWNrIHRvIGFwcHJlbnRpY2UsIHdlIGRvIG5vdCB3YW50IHRvIGxvY2sgdXAg5YuJ5by3IGFnYWluLilcclxuXHQqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXHJcblx0KiBAcGFyYW0ge3N0cmluZ30gaXRlbS5sb2NrZWQgLSAoU3RyaW5nIGVudW1lcmF0aW9uKSBBIHJlYWwgdGltZSBldmFsdWF0aW9uIG9mIHRoZSBpdGVtIChpcyBhbnkgb2YgdGhlIGthbmppIGluIHRoZSB3b3JkIGxvY2tlZD8pXHJcblx0KiBAcGFyYW0ge3N0cmluZ30gaXRlbS5tYW51YWxMb2NrIC0gKFN0cmluZyBlbnVtZXJhdGlvbikgV2lsbCByZXR1cm4gJ25vJyBpZiAubG9ja2VkIGhhcyBldmVyIHJldHVybmVkICdubycuXHJcblx0KiBAcmV0dXJucyB7SVRhc2t9IGl0ZW1cclxuXHQqL1xyXG4gICAgdmFyIHNldExvY2tzID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgLy9vbmNlIG1hbnVhbExvY2sgaXMgXCJub1wiIGl0IHN0YXlzIFwibm9cIlxyXG4gICAgICAgIGlmIChpdGVtLm1hbnVhbExvY2sgIT09IGZhbHNlICYmIGl0ZW0ubWFudWFsTG9jayAhPT0gXCJub1wiICYmIGl0ZW0ubWFudWFsTG9jayAhPT0gXCJuXCIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGthbmppTGlzdCA9IGxvY2FsR2V0KCdVc2VyLUthbmppTGlzdCcpfHxbXTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uY29tcG9uZW50cyA9IGdldENvbXBvbmVudHMoaXRlbS5rYW5qaSk7XHJcblxyXG4gICAgICAgICAgICB2YXIga2FuamlMb2NrZWRSZXN1bHQgPSBpc0thbmppTG9ja2VkKGl0ZW0sIGthbmppTGlzdCwgbG9ja3NPbik7XHJcbiAgICAgICAgICAgIGl0ZW0ubG9ja2VkID0ga2FuamlMb2NrZWRSZXN1bHRbMF07XHJcblxyXG4gICAgICAgICAgICBpdGVtLm1hbnVhbExvY2sgPSBpdGVtLmxvY2tlZDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaXRlbS5tYW51YWxMb2NrID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2V0dGluZyBsb2NrcyBmb3IgXCIrIGl0ZW0ua2FuamkgK1wiOiBsb2NrZWQ6IFwiK2l0ZW0ubG9ja2VkK1wiLCBtYW51YWxMb2NrOiBcIisgaXRlbS5tYW51YWxMb2NrKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbnZlcnRzIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW50byBhIHJlYWRhYmxlIHN0cmluZ1xyXG5cdCogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kcyAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGFwcHJveGltYXRlXHJcblx0KiBAcmV0dXJucyB7c3RyaW5nfSBSZWFkYWJsZSB0aW1lIGZyYW1lICgnMiBtb250aHMnLCAnMyBob3VycycsICcxIHdlZWsnIGV0YykuXHJcblx0Ki9cclxuXHR2YXIgbXMyc3RyID0gZnVuY3Rpb24obWlsbGlzZWNvbmRzKXtcclxuICAgICAgICB2YXIgbnVtOyAvL251bWJlciBvZiBtb250aHMgd2Vla3MgaG91cnMgZXRjXHJcbiAgICAgICAgLy9tb3JlIHRpbWUgaGFzIGVsYXBzZWQgdGhhbiByZXF1aXJlZCBmb3IgdGhlIGxldmVsXHJcbiAgICAgICAgaWYobWlsbGlzZWNvbmRzIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTm93XCIgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaWxsaXNlY29uZHMgPiAyNjI4MDAwMDAwKSB7Ly9BYm91dCBhIG1vbnRoXHJcbiAgICAgICAgICAgIG51bSA9IE1hdGguZmxvb3IobWlsbGlzZWNvbmRzLzI2MjgwMDAwMDApLnRvU3RyaW5nKCkrXCIgbW9udGhcIjtcclxuICAgICAgICAgICAgaWYgKG51bSAhPT0gXCIxIG1vbnRoXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bStcInNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbGxpc2Vjb25kcyA+IDYwNDgwMDAwMCkgey8vQSB3ZWVrXHJcbiAgICAgICAgICAgIG51bSA9IE1hdGguZmxvb3IobWlsbGlzZWNvbmRzLzYwNDgwMDAwMCkudG9TdHJpbmcoKStcIiB3ZWVrXCI7XHJcbiAgICAgICAgICAgIGlmIChudW0gIT09IFwiMSB3ZWVrXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bStcInNcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1pbGxpc2Vjb25kcyA+IDg2NDAwMDAwKSB7Ly9BIGRheVxyXG4gICAgICAgICAgICBudW0gPSBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcy84NjQwMDAwMCkudG9TdHJpbmcoKStcIiBkYXlcIjtcclxuICAgICAgICAgICAgaWYgKG51bSAhPT0gXCIxIGRheVwiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW0rXCJzXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaWxsaXNlY29uZHMgPiAzNjAwMDAwKSB7Ly9BbiBob3VyXHJcbiAgICAgICAgICAgIG51bSA9IE1hdGguZmxvb3IobWlsbGlzZWNvbmRzLzM2MDAwMDApLnRvU3RyaW5nKCkrXCIgaG91clwiO1xyXG4gICAgICAgICAgICBpZiAobnVtICE9PSBcIjEgaG91clwiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW0rXCJzXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtaWxsaXNlY29uZHMgPiA2MDAwMCkgey8vQSBtaW51dGVcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMvNjAwMDApLnRvU3RyaW5nKCkrXCIgbWludXRlXCI7XHJcbiAgICAgICAgICAgIGlmIChudW0gIT09IFwiMSBtaW51dGVcIil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtK1wic1wiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWlsbGlzZWNvbmRzID4gMCkgey8vQSBzZWNvbmQgaXMgMTAwMCwgYnV0IG5lZWQgdG8gcmV0dXJuIHNvbWV0aGluZyBmb3IgbGVzcyB0aGFuIG9uZSB0b29cclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMvMTAwMCkudG9TdHJpbmcoKStcIiBzZWNvbmRcIjtcclxuICAgICAgICAgICAgaWYgKG51bSAhPT0gXCIxIHNlY29uZFwiKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW0rXCJzXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogUmV0cmlldmVzIHZhbHVlcyBmcm9tIHN0b3JhZ2UgdG8gcG9wdWxhdGUgJ2VkaXRJdGVtcycgbWVudVxyXG5cdCovXHJcbiAgICB2YXIgZ2VuZXJhdGVFZGl0T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdFdpbmRvdycpO1xyXG4gICAgICAgIC8vY2xlYXIgdGhlIGVkaXRXaW5kb3dcclxuICAgICAgICB3aGlsZSAoc2VsZWN0LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNoaWxkKHNlbGVjdC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jaGVjayBmb3IgaXRlbXMgdG8gYWRkXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0cmlldmUgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgICAgIHZhciB2b2NhYkxpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcbiAgICAgICAgICAgIHZhciBzcnNsaXN0ID0gIFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgLy9idWlsZCBvcHRpb24gc3RyaW5nXHJcbiAgICAgICAgICAgIC8vdmFyIGkgPSB2b2NhYkxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAvL3doaWxlIChpLS0pe1xyXG5cdFx0XHR2b2NhYkxpc3QuZm9yRWFjaChmdW5jdGlvbih0YXNrKXtcclxuICAgICAgICAgICAgICAgIC8vZm9ybSBlbGVtZW50IHRvIHNhdmUgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9keW5hbWljIGNvbXBvbmVudHMgb2Ygc3RyaW5nXHJcblxyXG4gICAgICAgICAgICAgICAgLy93aGVuIGlzIHRoaXMgaXRlbSB1cCBmb3IgcmV2aWV3XHJcbiAgICAgICAgICAgICAgICB2YXIgZHVlID0gdGFzay5kdWV8fHRhc2suZGF0ZSArIHNyc09iamVjdFt0YXNrLmxldmVsXS5kdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgIHZhciByZXZpZXcgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbm8gZnV0dXJlIHJldmlld3MgaWYgYnVybmVkXHJcbiAgICAgICAgICAgICAgICBpZih0YXNrLmxldmVsID49IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcgPSBcIk5ldmVyXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgbmV4dCByZWxhdGl2ZSByZXZpZXcgdGltZVxyXG4gICAgICAgICAgICAgICAgLy9jdXJyZW50IHRpbWVzdGFtcCBpcyBwYXN0IGR1ZSBkYXRlLlxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihEYXRlLm5vdygpID49IGR1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldyA9IFwiTm93XCIgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3ID0gbXMyc3RyKGR1ZSAtIERhdGUubm93KCkpO1xyXG4gICAgICAgICAgICAgICAgfS8vZW5kIGlmIHJldmlldyBpcyBub3QgJ25ldmVyJyBvciAnbm93J1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gdGFzay5rYW5qaSArIFwiICYgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2sucmVhZGluZyArIFwiICYgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2subWVhbmluZyArIFwiIChcIiArXHJcblx0XHRcdFx0XHRzcnNPYmplY3RbdGFzay5sZXZlbF0ucmFuayArXHJcblx0XHRcdFx0XHRcIiAtIFJldmlldzogXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldyArIFwiKSBMb2NrZWQ6IFwiICtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrLm1hbnVhbExvY2s7XHJcblxyXG4gICAgICAgICAgICAgICAgb3B0LnZhbHVlID0gaTtcclxuICAgICAgICAgICAgICAgIG9wdC5pbm5lckhUTUwgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKG9wdCk7Ly9mb3IgZnV0dXJlIHVzZSAoc29ydGluZyBkYXRhIGV0YylcclxuICAgICAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHQpOy8vZXhwb3J0IGl0ZW0gdG8gb3B0aW9uIG1lbnVcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBFZGl0IEl0ZW1zXHJcblx0Ki9cclxuICAgIHdpbmRvdy5XS1NTX2VkaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVFZGl0T3B0aW9ucygpO1xyXG4gICAgICAgICQoXCIjZWRpdFwiKS5zaG93KCk7XHJcbiAgICAgICAgLy9oaWRlIG90aGVyIHdpbmRvd3NcclxuICAgICAgICAkKFwiI2V4cG9ydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNpbXBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjYWRkXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbiAgICB9O1xyXG5cdHZhciBidWlsZE5vZGUgPSByZXF1aXJlKCcuL2J1aWxkbm9kZS5qcycpO1xyXG5cclxuXHR2YXIgYnVpbGRXaW5kb3cgPSByZXF1aXJlKCcuL2J1aWxkd2luZG93LmpzJyk7XHJcblx0XHJcblx0Lyp2YXIgYWRkRWRpdFdpbmRvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGVkaXRXaW5kb3cgPSBidWlsZE5vZGUoJ2RpdicsIHtpZDogXCJXS1NTLWVkaXRcIiwgY2xhc3NOYW1lOiBcIldLU1NcIn0pO1xyXG5cdFx0dmFyIGVkaXRGb3JtID0gYnVpbGROb2RlKCdmb3JtJywge2lkOiBcIldLU1MtZWRpdEZvcm1cIn0pO1xyXG5cdFx0ZWRpdFdpbmRvdy5hcHBlbmRDaGlsZChlZGl0Rm9ybSk7XHJcblx0XHR2YXIgZWRpdENsb3NlQnV0dG9uID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiV0tTUy1lZGl0Q2xvc2VCdG5cIiwgY2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdENsb3NlQnV0dG9uKTtcclxuXHRcdFxyXG5cdFx0ZWRpdENsb3NlQnV0dG9uLmFwcGVuZENoaWxkKGJ1aWxkTm9kZSgnaScsIHtjbGFzc05hbWU6IFwiaWNvbi1yZW1vdmVcIn0pKTtcclxuXHRcdHZhciBoMUVsZW1lbnQgPSBidWlsZE5vZGUoJ2gxJyk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChoMUVsZW1lbnQpO1xyXG5cdFx0aDFFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiRWRpdCB5b3VyIFZvY2FiXCIpKTtcclxuXHRcdHZhciBzZWxlY3RFbGVtZW50ID0gYnVpbGROb2RlKCdzZWxlY3QnLCB7aWQ6IFwiZWRpdFdpbmRvd1wiLCBzaXplOiBcIjhcIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoc2VsZWN0RWxlbWVudCk7XHJcblx0XHR2YXIgZWRpdEl0ZW1UZXh0ID0gYnVpbGROb2RlKCdpbnB1dCcsIHt0eXBlOiBcInRleHRcIiBpZDogXCJlZGl0SXRlbVwiIG5hbWU6IFwiXCIgc2l6ZTogXCI0MFwiIHBsYWNlaG9sZGVyOiBcIlNlbGVjdCB2b2NhYiwgY2xpY2sgZWRpdCwgY2hhbmdlIGFuZCBzYXZlIVwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0SXRlbVRleHQpO1xyXG5cdFx0dmFyIGVkaXRTdGF0dXMgPSBidWlsZE5vZGUoJ3AnLCB7aWQ6IFwiZWRpdFN0YXR1c1wifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0U3RhdHVzKTtcclxuXHRcdGVkaXRTdGF0dXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJSZWFkeSB0byBlZGl0Li5cIikpO1xyXG5cdFx0XHJcblx0XHR2YXIgZWRpdEJ1dHRvbiA9IGJ1aWxkTm9kZSgnYnV0dG9uJywge2lkOiBcIkVkaXRFZGl0QnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9KTtcclxuXHRcdGVkaXRGb3JtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG5cdFx0ZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkVkaXRcIikpO1xyXG5cdFx0dmFyIGVkaXRTYXZlID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiRWRpdFNhdmVCdG5cIiwgdHlwZTogXCJidXR0b25cIn0pO1xyXG5cdFx0ZWRpdEZvcm0uYXBwZW5kQ2hpbGQoZWRpdFNhdmUpO1xyXG5cdFx0ZWRpdFNhdmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJTYXZlXCIpKTtcclxuXHRcdHZhciBlZGl0RGVsZXRlID0gYnVpbGROb2RlKCdidXR0b24nLCB7aWQ6IFwiRWRpdERlbGV0ZUJ0blwiLCB0eXBlOiBcImJ1dHRvblwiLCB0aXRsZTogXCJEZWxldGUgc2VsZWN0ZWQgaXRlbVwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlKTtcclxuXHRcdGVkaXREZWxldGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJEZWxldGVcIikpO1xyXG5cdFx0dmFyIGVkaXREZWxldGVBbGwgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJFZGl0RGVsZXRlQWxsQnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIuacrOW9k+OBq+OChOOCi+OBru+8n1wifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlQWxsKTtcclxuXHRcdGVkaXREZWxldGVBbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJEZWxldGUgQWxsXCIpKTtcclxuXHRcdHZhciBlZGl0UmVzZXRMZXZlbHMgPSBidWlsZE5vZGUoJ2J1dHRvbicsIHtpZDogXCJSZXNldExldmVsc0J0blwiLCB0eXBlOiBcImJ1dHRvblwifSk7XHJcblx0XHRlZGl0Rm9ybS5hcHBlbmRDaGlsZChlZGl0UmVzZXRMZXZlbHMpO1xyXG5cdFx0ZWRpdFJlc2V0TGV2ZWxzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUmVzZXQgbGV2ZWxzXCIpKTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGVkaXRXaW5kb3c7XHJcblx0fTtcclxuXHQqL1xyXG5cdHZhciBlZGl0V2luZG93U3RydWN0dXJlID0ge1xyXG5cdGlkOiBcIldLU1MtZWRpdFwiLFxyXG5cdGNsYXNzTmFtZTogXCJXS1NTXCIsXHJcblx0Y2hpbGROb2Rlczpbe1xyXG5cdFx0dGFnOiAnZm9ybScsXHJcblx0XHRpZDogXCJXS1NTLWVkaXRGb3JtXCIsXHJcblx0XHRjaGlsZE5vZGVzOlt7XHJcblx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdGlkOiBcIldLU1MtZWRpdENsb3NlQnRuXCIsXHJcblx0XHRcdGNsYXNzTmFtZTogXCJXS1NTLWNsb3NlXCIsXHJcblx0XHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0XHR0YWc6ICdpJyxcclxuXHRcdFx0XHRjbGFzc05hbWU6IFwiaWNvbi1yZW1vdmVcIlxyXG5cdFx0XHR9XVxyXG5cdFx0fSx7XHJcblx0XHRcdHRhZzogJ2gxJyxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJFZGl0IHlvdXIgVm9jYWJcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdzZWxlY3QnLFxyXG5cdFx0XHRpZDogXCJlZGl0V2luZG93XCIsXHJcblx0XHRcdG90aGVyOiB7c2l6ZTogXCI4XCJ9XHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnaW5wdXQnLCBcclxuXHRcdFx0b3RoZXI6e1xyXG5cdFx0XHRcdHR5cGU6IFwidGV4dFwiLFxyXG5cdFx0XHRcdG5hbWU6IFwiXCIsXHJcblx0XHRcdFx0c2l6ZTogXCI0MFwiLFxyXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBcIlNlbGVjdCB2b2NhYiwgY2xpY2sgZWRpdCwgY2hhbmdlIGFuZCBzYXZlIVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGlkOiBcImVkaXRJdGVtXCJcclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdwJywgXHJcblx0XHRcdGlkOiBcImVkaXRTdGF0dXNcIixcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJSZWFkeSB0byBlZGl0Li4uXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdEVkaXRCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJFZGl0XCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdFNhdmVCdG5cIixcclxuXHRcdFx0b3RoZXI6e3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcIlNhdmVcIl1cclxuXHRcdH0se1xyXG5cdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRpZDogXCJFZGl0RGVsZXRlQnRuXCIsXHJcblx0XHRcdG90aGVyOiB7dHlwZTogXCJidXR0b25cIiwgdGl0bGU6IFwiRGVsZXRlIHNlbGVjdGVkIGl0ZW1cIn0sXHJcblx0XHRcdGNoaWxkTm9kZXM6W1wiRGVsZXRlXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiRWRpdERlbGV0ZUFsbEJ0blwiLFxyXG5cdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCIsIHRpdGxlOiBcIuacrOW9k+OBq+OChOOCi+OBru+8n1wifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJEZWxldGUgQWxsXCJdXHJcblx0XHR9LHtcclxuXHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0aWQ6IFwiUmVzZXRMZXZlbHNCdG5cIixcclxuXHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0Y2hpbGROb2RlczpbXCJSZXNldCBsZXZlbHNcIl1cclxuXHRcdH1dXHJcblx0fV1cclxufTtcclxuXHJcbiAgICB2YXIgYWRkRWRpdFdpbmRvdyA9IGJ1aWxkV2luZG93KGVkaXRXaW5kb3dTdHJ1Y3R1cmUpO1xyXG5cdCQoXCJib2R5XCIpLmFwcGVuZChhZGRFZGl0V2luZG93KTtcclxuICAgICQoXCIjV0tTUy1lZGl0XCIpLmhpZGUoKTtcclxuXHJcblx0LyoqIFJlc2V0cyB0aGUgbGV2ZWxzIG9mIGFsbCB0YXNrcyBhbmQgcmUtaW5kZXhlcyB0aGVtIGluIHN0b3JhZ2UuXHJcblx0KiBAcGFyYW0ge0V2ZW50fSBldnQgLSBDbGljayBldmVudCAobm90IHVzZWQpXHJcblx0Ki9cclxuXHR2YXIgcmVzZXRMZXZlbHMgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHR2YXIgdm9jTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKS5tYXAoZnVuY3Rpb24odm9jSXRlbSwgaSl7XHJcblx0XHRcdHZvY0l0ZW0ubGV2ZWwgPSAwO1xyXG5cdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwidm9jTGlzdFtpXS5pIGJlZm9yZTogXCIrdm9jSXRlbS5pKTtcclxuXHRcdFx0dm9jSXRlbS5pPWk7XHJcblx0XHRcdGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ2b2NMaXN0W2ldLmkgYWZ0ZXI6IFwiK3ZvY0l0ZW0uaSk7XHJcblx0XHRcdHJldHVybiB2b2NJdGVtO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0XHRTdG9yYWdlVXRpbC5zZXRWb2NMaXN0KHZvY0xpc3QpO1xyXG4gICAgfTtcclxuICAgICQoXCIjUmVzZXRMZXZlbHNCdG5cIikuY2xpY2socmVzZXRMZXZlbHMpO1xyXG5cclxuICAgICQoXCIjRWRpdEVkaXRCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vZ2V0IGhhbmRsZSBmb3IgJ3NlbGVjdCcgYXJlYVxyXG4gICAgICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRXaW5kb3dcIik7XHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBpbmRleCBmb3IgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtXHJcbiAgICAgICAgdmFyIGluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7IC8vc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlIGlzIG5vdCByZXF1aXJlZCwgb3B0aW9uIHZhbHVlcyBhcmUgc2V0IHRvIGluZGV4XHJcbiAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICB2b2NhYkxpc3QgPSB2b2NhYkxpc3QucmV2ZXJzZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikudmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2b2NhYkxpc3RbaW5kZXhdKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRJdGVtXCIpLm5hbWUgPSBpbmRleDsgLy91c2luZyBuYW1lIHRvIHNhdmUgdGhlIGluZGV4XHJcbiAgICAgICAgJChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ0xvYWRlZCBpdGVtIHRvIGVkaXQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBpc0VtcHR5ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gKHZhbHVlID09PSB2b2lkIDAgfHwgdmFsdWUgPT09IG51bGwpO1xyXG4gICAgfTtcclxuXHRcclxuXHR2YXIgaXNBcnJheSA9IGZ1bmN0aW9uKGFyZyl7XHJcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheSA/IEFycmF5LmlzQXJyYXkoYXJnKSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xyXG5cdH07XHJcblxyXG4gICAgLyoqIFZhbGlkYXRlcyBhIHRhc2sgb2JqZWN0XHJcblx0KiBAcGFyYW0ge1Rhc2t9IGFkZCAtIFRoZSBUYXNrIGJlaW5nIHZlcmlmaWVkXHJcblx0KiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgdGhlIHByb3ZpZGVkIHRhc2sgaGFzIGFsbCB0aGUgbmVjZXNzYXJ5IHByb3BlcnRpZXMgdG8gYmUgYWRkZWQgdG8gdGhlIHJldmlldyBsaXN0LlxyXG5cdCovXHJcblx0dmFyIGlzSXRlbVZhbGlkID0gZnVuY3Rpb24oYWRkKSB7XHJcbiAgICAgICAgcmV0dXJuICghaXNFbXB0eShhZGQua2FuamkpICYmIC8va2FuamkgcHJvcGVydHkgZXhpc3RzXHJcblx0XHRcdCFpc0VtcHR5KGFkZC5tZWFuaW5nKSAmJiAvL21lYW5pbmcgcHJvcGVydHkgZXhpc3RzXHJcblx0XHRcdCFpc0VtcHR5KGFkZC5yZWFkaW5nKSAmJiAvL3JlYWRpbmcgcHJvcGVydHkgZXhpc3RzXHJcblx0XHRcdGlzQXJyYXkoYWRkLm1lYW5pbmcpICYmLy9tZWFuaW5nIGlzIGFuIGFycmF5XHJcblx0XHRcdGlzQXJyYXkoYWRkLnJlYWRpbmcpKTsvL3JlYWRpbmcgaXMgYW4gYXJyYXlcclxuICAgIH07XHJcblxyXG4gICAgJChcIiNFZGl0U2F2ZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHQvLy0tIGJlIGF3YXJlXHJcblx0XHQvL2RlbGV0aW5nIG9uZSBpdGVtIG1heSBjYXVzZSBtaXNtYXRjaCBpZiBpIGlzIHByb3BlcnR5IG9mIGl0ZW0gaW4gbGlzdFxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKCQoXCIjZWRpdEl0ZW1cIikudmFsKCkubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdFx0dmFyIGVkaXRJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGVkaXRJdGVtLm5hbWU7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBKU09OLnBhcnNlKGVkaXRJdGVtLnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIHdvcmQgJ21lYW5pbmcnIGlzIGltbXV0YWJsZSwgc28gaXQgZXhpc3RzIHRvIHRyaW1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAoaXRlbS5tZWFuaW5nKXtcclxuXHRcdFx0XHRcdGl0ZW0ubWVhbmluZy5mb3JFYWNoKGZ1bmN0aW9uKG1lYW5pbmcsIG0sIG1lYW5pbmdzKXtcclxuXHRcdFx0XHRcdFx0aWYgKG1lYW5pbmcgPT09IFwiXCIpe1xyXG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBtZWFuaW5nc1ttXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSwgdGhpcyk7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJdGVtVmFsaWQoaXRlbSkgJiYvL2l0ZW0gaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAhKGNoZWNrRm9yRHVwbGljYXRlcyhmdWxsTGlzdCxpdGVtKSAmJiAvL2thbmppIChpZiBjaGFuZ2VkKSBpcyBub3QgYWxyZWFkeSBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgZnVsbExpc3RbaW5kZXhdLmthbmppICE9PSBpdGVtLmthbmppKSkgey8vdW5sZXNzIGl0IGlzIHRoZSBpdGVtIGJlaW5nIGVkaXRlZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3JzbGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgc3JzIGNvbXBvbmVudHMgb2YgaXRlbShsaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMaXN0W2luZGV4XSA9IGl0ZW07Ly9kb2VzIG5vdCBoYXZlIHNycyBzdHVmZiwgcmUtYWRkIGl0IG5vd1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdWxsTGlzdFtpbmRleF0uZGF0ZSA9IHNyc2xpc3RbaW5kZXhdLmRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpc3RbaW5kZXhdLmxldmVsID0gc3JzbGlzdFtpbmRleF0ubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpc3RbaW5kZXhdLmxvY2tlZCA9IHNyc2xpc3RbaW5kZXhdLmxvY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICBmdWxsTGlzdFtpbmRleF0ubWFudWFsTG9jayA9IHNyc2xpc3RbaW5kZXhdLm1hbnVhbExvY2s7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMaXN0ID0gZnVsbExpc3QucmV2ZXJzZSgpOyAvL3Jlc2V0IG9yZGVyIG9mIGFycmF5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU2V0KCdVc2VyLVZvY2FiJywgZnVsbExpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUVkaXRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlZGl0U3RhdHVzXCIpLmh0bWwoJ1NhdmVkIGNoYW5nZXMhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0SXRlbVwiKS5uYW1lID0gXCJcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnSW52YWxpZCBpdGVtIG9yIGR1cGxpY2F0ZSEnKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChpc0l0ZW1WYWxpZChpdGVtKS50b1N0cmluZygpICtcIiAmJiDvvIEoXCIrIGNoZWNrRm9yRHVwbGljYXRlcyhmdWxsTGlzdCxpdGVtKS50b1N0cmluZygpK1wiICYmICEoXCIrZnVsbExpc3RbaW5kZXhdLmthbmppK1wiICE9PSBcIitpdGVtLmthbmppK1wiKVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0JChcIiNlZGl0U3RhdHVzXCIpLnRleHQoZSk7XHJcblx0XHR9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdXBkYXRlRWRpdEdVSSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2VuZXJhdGVFZGl0T3B0aW9ucygpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdEl0ZW1cIikubmFtZSA9IFwiXCI7XHJcbiAgICB9O1xyXG5cdHZhciBlZGl0RGVsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vc2VsZWN0IG9wdGlvbnMgZWxlbWVudCB3aW5kb3dcclxuICAgICAgICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0V2luZG93XCIpO1xyXG5cclxuICAgICAgICAvL2luZGV4IG9mIHNlbGVjdGVkIGl0ZW1cclxuICAgICAgICB2YXIgaXRlbSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcbiAgICAgICAgLy9mZXRjaCBKU09OIHN0cmluZ3MgZnJvbSBzdG9yYWdlIGFuZCBjb252ZXJ0IHRoZW0gaW50byBKYXZhc2NyaXB0IGxpdGVyYWxzXHJcbiAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuXHJcbiAgICAgICAgLy9zdGFydGluZyBhdCBzZWxlY3RlZCBpbmRleCwgcmVtb3ZlIDEgZW50cnkgKHRoZSBzZWxlY3RlZCBpbmRleCkuXHJcbiAgICAgICAgaWYgKGl0ZW0gPiAtMSkge1xyXG4gICAgICAgICAgICBpZiAodm9jYWJMaXN0ICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHZvY2FiTGlzdC5zcGxpY2UoaXRlbSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8veXVja1xyXG4gICAgICAgIGlmICh2b2NhYkxpc3QubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU2V0KCdVc2VyLVZvY2FiJywgdm9jYWJMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyLVZvY2FiJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVFZGl0R1VJKCk7XHJcblxyXG4gICAgICAgICQoXCIjZWRpdFN0YXR1c1wiKS50ZXh0KCdJdGVtIGRlbGV0ZWQhJyk7XHJcbiAgICB9O1xyXG4gICAgJChcIiNFZGl0RGVsZXRlQnRuXCIpLmNsaWNrKGVkaXREZWxldGUpO1xyXG5cclxuXHR2YXIgZWRpdERlbGV0ZUFsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGVsZXRlQWxsID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYWxsIGVudHJpZXM/XCIpO1xyXG4gICAgICAgIGlmIChkZWxldGVBbGwpIHtcclxuICAgICAgICAgICAgLy9kcm9wIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXItVm9jYWInKTtcclxuICAgICAgICAgICAgdXBkYXRlRWRpdEdVSSgpO1xyXG4gICAgICAgICAgICAkKFwiI2VkaXRTdGF0dXNcIikudGV4dCgnQWxsIGl0ZW1zIGRlbGV0ZWQhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICQoXCIjRWRpdERlbGV0ZUFsbEJ0blwiKS5jbGljayhlZGl0RGVsZXRlQWxsKTtcclxuXHJcbiAgICAkKFwiI0VkaXRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNlZGl0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2VkaXRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgJChcIiNlZGl0U3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGVkaXQuLicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqIEV4cG9ydFxyXG5cdCovXHJcbiAgICB3aW5kb3cuV0tTU19leHBvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNleHBvcnRcIikuc2hvdygpO1xyXG4gICAgICAgIC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcbiAgICAgICAgJChcIiNhZGRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjaW1wb3J0XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuICAgIH07XHJcblxyXG5cdHZhciBleHBvcnRXaW5kb3dTdHJ1Y3R1cmUgPSB7XHJcblx0XHRpZDogXCJXS1NTLWV4cG9ydFwiLFxyXG5cdFx0Y2xhc3NOYW1lOiBcIldLU1NcIixcclxuXHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0dGFnOiAnZm9ybScsXHJcblx0XHRcdGlkOiBcIldLU1MtZXhwb3J0Rm9ybVwiLFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRcdFx0aWQ6IFwiV0tTUy1leHBvcnRDbG9zZUJ0blwiLFxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIixcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0XHRcdFx0dGFnOiAnaScsXHJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwiXHJcblx0XHRcdFx0XHR9XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnaDEnLFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJFeHBvcnQgSXRlbXNcIl1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ3RleHRhcmVhJyxcclxuXHRcdFx0XHRcdGlkOiBcImV4cG9ydEFyZWFcIixcclxuXHRcdFx0XHRcdG90aGVyOiB7Y29sczogXCI1MFwiLCByb3dzOiBcIjE4XCIsIHBsYWNlaG9sZGVyOiBcIkV4cG9ydCB5b3VyIHN0dWZmISBTaGFyaW5nIGlzIGNhcmluZyA7KVwifVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAncCcsIFxyXG5cdFx0XHRcdFx0aWQ6IFwiZXhwb3J0U3RhdHVzXCIsXHJcblx0XHRcdFx0XHRjaGlsZE5vZGVzOltcIlJlYWR5IHRvIGV4cG9ydC4uLlwiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0XHRcdGlkOiBcIkV4cG9ydEl0ZW1zQnRuXCIsXHJcblx0XHRcdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJFeHBvcnQgSXRlbXNcIl1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ2J1dHRvbicsXHJcblx0XHRcdFx0XHRpZDogXCJFeHBvcnRTZWxlY3RBbGxCdG5cIixcclxuXHRcdFx0XHRcdG90aGVyOnt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W1wiU2VsZWN0IEFsbFwiXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnYnV0dG9uJyxcclxuXHRcdFx0XHRcdGlkOiBcIkV4cG9ydENzdkJ0blwiLFxyXG5cdFx0XHRcdFx0b3RoZXI6IHt0eXBlOiBcImJ1dHRvblwifSxcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W1wiRXhwb3J0IENTVlwiXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fV1cclxuXHR9O1xyXG5cdHZhciBleHBvcnRXaW5kb3cgPSBidWlsZFdpbmRvdyhleHBvcnRXaW5kb3dTdHJ1Y3R1cmUpO1xyXG5cclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChleHBvcnRXaW5kb3cpO1xyXG4gICAgJChcIiNXS1NTLWV4cG9ydFwiKS5oaWRlKCk7XHJcblxyXG5cclxuICAgICQoXCIjRXhwb3J0SXRlbXNCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkge1xyXG4gICAgICAgICAgICAkKFwiI2V4cG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgJChcIiNleHBvcnRBcmVhXCIpLnRleHQoSlNPTi5zdHJpbmdpZnkodm9jYWJMaXN0KSk7XHJcbiAgICAgICAgICAgICQoXCIjZXhwb3J0U3RhdHVzXCIpLnRleHQoXCJDb3B5IHRoaXMgdGV4dCBhbmQgc2hhcmUgaXQgd2l0aCBvdGhlcnMhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIk5vdGhpbmcgdG8gZXhwb3J0IHlldCA6KFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblx0dmFyIHNlbGVjdF9hbGwgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICB2YXIgdGV4dF92YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHIpO1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2codGV4dF92YWwpO1xyXG4gICAgICAgIHRleHRfdmFsLmZvY3VzKCk7XHJcbiAgICAgICAgdGV4dF92YWwuc2VsZWN0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgICQoXCIjRXhwb3J0U2VsZWN0QWxsQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJChcIiNleHBvcnRBcmVhXCIpLnZhbCgpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBzZWxlY3RfYWxsKFwiZXhwb3J0QXJlYVwiKTtcclxuICAgICAgICAgICAgJChcIiNleHBvcnRTdGF0dXNcIikudGV4dChcIkRvbid0IGZvcmdldCB0byBDVFJMICsgQyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGNyZWF0ZUNTViA9IGZ1bmN0aW9uKEpTT05zdHJpbmcpe1xyXG4gICAgICAgIHZhciBKU09Ob2JqZWN0ID0gKHR5cGVvZiBKU09Oc3RyaW5nID09PSAnc3RyaW5nJykgPyBKU09OLnBhcnNlKEpTT05zdHJpbmcpIDogSlNPTnN0cmluZztcclxuICAgICAgICB2YXIga2V5O1xyXG4gICAgICAgIHZhciBDU1ZhcnJheSA9IFtdO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSBbXTsgIFxyXG4gICAgICAgIHZhciBpZCA9IEpTT05vYmplY3QubGVuZ3RoO1xyXG4gICAgICAgIGlmIChpZCl7Ly9vYmplY3Qgbm90IGVtcHR5XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIEpTT05vYmplY3RbMF0pe1xyXG4gICAgICAgICAgICAgICAgaWYgKEpTT05vYmplY3RbMF0uaGFzT3duUHJvcGVydHkoa2V5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBDU1ZhcnJheS5wdXNoKGhlYWRlci5qb2luKCcsJykpO1xyXG5cclxuICAgICAgICB3aGlsZShpZC0tKXtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGggPSBoZWFkZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZShoLS0pey8vIG9ubHkgZG8ga2V5cyBpbiBoZWFkZXIsIGluIHRoZSBoZWFkZXIncyBvcmRlci4gLy9KU09Ob2JqZWN0W2lkXSl7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBoZWFkZXJbaF07XHJcbiAgICAgICAgICAgICAgICBpZihKU09Ob2JqZWN0W2lkXVtrZXldICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KEpTT05vYmplY3RbaWRdW2tleV0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXJzZSBhcnJheSBoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUucHVzaChKU09Ob2JqZWN0W2lkXVtrZXldLmpvaW4oXCJcXHRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLnB1c2goSlNPTm9iamVjdFtpZF1ba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9bGluZSA9IGxpbmUucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICBDU1ZhcnJheS5wdXNoKGxpbmUuam9pbignLCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIENTVnN0cmluZyA9IENTVmFycmF5LmpvaW4oXCJcXHJcXG5cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUkkoXCJkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsXCIgKyBDU1ZzdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkKFwiI0V4cG9ydENzdkJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICB2YXIgQ3N2RmlsZSA9IGNyZWF0ZUNTVih2b2NhYkxpc3QpO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKENzdkZpbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNFeHBvcnRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiI2V4cG9ydFwiKS5oaWRlKCk7XHJcblx0XHQkKFwiI2V4cG9ydEZvcm1cIilbMF0ucmVzZXQoKTtcclxuXHRcdCQoXCIjZXhwb3J0QXJlYVwiKS50ZXh0KFwiXCIpO1xyXG5cdFx0JChcIiNleHBvcnRTdGF0dXNcIikudGV4dCgnUmVhZHkgdG8gZXhwb3J0Li4nKTtcclxuXHR9KTtcclxuXHJcbiAgICAvKiogSW1wb3J0XHJcblx0Ki9cclxuICAgIHdpbmRvdy5XS1NTX2ltcG9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2ltcG9ydFwiKS5zaG93KCk7XHJcbiAgICAgICAgLy9oaWRlIG90aGVyIHdpbmRvd3NcclxuICAgICAgICAkKFwiI2FkZFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZWRpdFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNzZWxmc3R1ZHlcIikuaGlkZSgpO1xyXG4gICAgfTtcclxuXHJcbiBcdHZhciBpbXBvcnRXaW5kb3dTdHJ1Y3R1cmUgPSB7XHJcblx0XHRpZDogXCJXS1NTLWltcG9ydFwiLFxyXG5cdFx0Y2xhc3NOYW1lOiBcIldLU1NcIixcclxuXHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0dGFnOiAnZm9ybScsXHJcblx0XHRcdGlkOiBcIldLU1MtaW1wb3J0Rm9ybVwiLFxyXG5cdFx0XHRjaGlsZE5vZGVzOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdidXR0b24nLFxyXG5cdFx0XHRcdFx0aWQ6IFwiV0tTUy1pbXBvcnRDbG9zZUJ0blwiLFxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcIldLU1MtY2xvc2VcIixcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W3tcclxuXHRcdFx0XHRcdFx0dGFnOiAnaScsXHJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogXCJpY29uLXJlbW92ZVwiXHJcblx0XHRcdFx0XHR9XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnaDEnLFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJJbXBvcnQgSXRlbXNcIl1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ3RleHRhcmVhJyxcclxuXHRcdFx0XHRcdGlkOiBcImltcG9ydEFyZWFcIixcclxuXHRcdFx0XHRcdG90aGVyOiB7Y29sczogXCI1MFwiLCByb3dzOiBcIjE4XCIsIHBsYWNlaG9sZGVyOiBcIlBhc3RlIHlvdXIgc3R1ZmYgYW5kIGhpdCB0aGUgaW1wb3J0IGJ1dHRvbiEgVXNlIHdpdGggY2F1dGlvbiFcIn1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ3AnLCBcclxuXHRcdFx0XHRcdGlkOiBcImltcG9ydFN0YXR1c1wiLFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXCJSZWFkeSB0byBpbXBvcnQuLi5cIl1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRhZzogJ2xhYmVsJyxcclxuXHRcdFx0XHRcdGlkOiBcIkltcG9ydEl0ZW1zQnRuXCIsXHJcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiYnV0dG9uXCIsXHJcblx0XHRcdFx0XHRvdGhlcjoge3R5cGU6IFwiYnV0dG9uXCIsIHN0eWxlOiBcImRpc3BsYXk6aW5saW5lO1wifSxcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W1wiSW1wb3J0IEl0ZW1zXCJdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0YWc6ICdsYWJlbCcsXHJcblx0XHRcdFx0XHRpZDogXCJJbXBvcnRDc3ZCdG5cIixcclxuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJidXR0b25cIixcclxuXHRcdFx0XHRcdG90aGVyOiB7c3R5bGU6XCJkaXNwbGF5OmlubGluZTsgY3Vyc29yOiBwb2ludGVyO1wifSxcclxuXHRcdFx0XHRcdGNoaWxkTm9kZXM6W1wiSW1wb3J0IENTVlwiLFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0dGFnOiAnaW5wdXQnLFxyXG5cdFx0XHRcdFx0XHRcdGlkOiBcInVwbG9hZFwiLFxyXG5cdFx0XHRcdFx0XHRcdG90aGVyOiB7XHJcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImZpbGVcIiwgYWNjZXB0OiBcIi5jc3YsIC50c3ZcIixcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlOiBcImhlaWdodDowcHg7d2lkdGg6MHB4O2JhY2tncm91bmQ6cmVkO29wYWNpdHk6MDtmaWx0ZXI6b3BhY2l0eSgxKTtcIlxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGFnOiAnbGFiZWwnLFxyXG5cdFx0XHRcdFx0aWQ6IFwiSW1wb3J0V0tCdG5cIixcclxuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJidXR0b25cIixcclxuXHRcdFx0XHRcdG90aGVyOiB7c3R5bGU6IFwiZGlzcGxheTppbmxpbmU7XCJ9LFxyXG5cdFx0XHRcdFx0Y2hpbGROb2RlczpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR0YWc6J2knLFxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogXCJpY29uLWRvd25sb2FkLWFsdFwiXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFwiV0tcIlxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fV1cclxuXHR9O1xyXG5cdHZhciBpbXBvcnRXaW5kb3cgPSBidWlsZFdpbmRvdyhpbXBvcnRXaW5kb3dTdHJ1Y3R1cmUpO1xyXG5cclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChpbXBvcnRXaW5kb3cpO1xyXG4gICAkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblxyXG5cdHZhciBjaGVja0FkZCA9IGZ1bmN0aW9uKGFkZCkge1xyXG4gICAgICAgIC8vdGFrZSBhIEpTT04gb2JqZWN0IChwYXJzZWQgZnJvbSBpbXBvcnQgd2luZG93KSBhbmQgY2hlY2sgd2l0aCBzdG9yZWQgaXRlbXMgZm9yIGFueSBkdXBsaWNhdGVzXHJcbiAgICAgICAgLy8gUmV0dXJucyB0cnVlIGlmIGVhY2ggaXRlbSBpbiAnYWRkJyBhcnJheSBpcyB2YWxpZCBhbmRcclxuICAgICAgICAvL2F0IGxlYXN0IG9uZSBvZiB0aGVtIGFscmVhZHkgZXhpc3RzIGluIHN0b3JhZ2VcclxuICAgICAgICB2YXIgaSA9IGFkZC5sZW5ndGg7XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXItVm9jYWInKSkgeyAgICBcclxuICAgICAgICAgICAgdmFyIHZvY2FiTGlzdCA9IFN0b3JhZ2VVdGlsLmdldFZvY0xpc3QoKTtcclxuICAgICAgICAgICAgd2hpbGUoaS0tKXtcclxuICAgICAgICAgICAgICAgIGlmIChpc0l0ZW1WYWxpZChhZGRbaV0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JEdXBsaWNhdGVzKHZvY2FiTGlzdCxhZGRbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRcIikgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRcIikuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgSW1wb3J0VXRpbC5maWxlVXBsb2FkLCBmYWxzZSk7XHJcblxyXG5cdHZhciByZWZyZXNoTG9ja3MgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHZvY0xpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCkubWFwKGZ1bmN0aW9uKHZvY0l0ZW0pe1xyXG5cdFx0XHRkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwidm9jTGlzdFtpXSA9IHNldExvY2tzKHZvY0xpc3RbaV0pO1wiKTtcclxuXHRcdFx0dm9jSXRlbSA9IHNldExvY2tzKHZvY0l0ZW0pOyAgXHJcblx0XHRcdHJldHVybiB2b2NJdGVtO1xyXG5cdFx0fSwgdGhpcyk7XHJcblx0XHRjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHRTdG9yYWdlVXRpbC5zZXRWb2NMaXN0KHZvY0xpc3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgICQoXCIjSW1wb3J0V0tCdG5cIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBXYW5pa2FuaVV0aWwuZ2V0U2VydmVyUmVzcChBUElrZXksXCJ2b2NhYnVsYXJ5XCIpO1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJtYXliZT9cIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI0ltcG9ydEl0ZW1zQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJChcIiNpbXBvcnRBcmVhXCIpLnZhbCgpLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFkZCA9IEpTT04ucGFyc2UoJChcIiNpbXBvcnRBcmVhXCIpLnZhbCgpLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoYWRkKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tBZGQoYWRkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJObyB2YWxpZCBpbnB1dCAoZHVwbGljYXRlcz8pIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld2xpc3Q7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3JzbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyLVZvY2FiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdm9jYWJMaXN0ID0gU3RvcmFnZVV0aWwuZ2V0Vm9jTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNyc2xpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3bGlzdCA9IHZvY2FiTGlzdC5jb25jYXQoYWRkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld2xpc3QgPSBhZGQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpID0gYWRkLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlKGktLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgU3RvcmFnZVV0aWwuc2V0Vm9jSXRlbShhZGRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJJbXBvcnQgc3VjY2Vzc2Z1bCFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNpbXBvcnRGb3JtXCIpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2ltcG9ydEFyZWFcIikudGV4dChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoXCJQYXJzaW5nIEVycm9yIVwiKTtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiI2ltcG9ydFN0YXR1c1wiKS50ZXh0KFwiTm90aGluZyB0byBpbXBvcnQgOiggUGxlYXNlIHBhc3RlIHlvdXIgc3R1ZmYgZmlyc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNJbXBvcnRDbG9zZUJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNpbXBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjaW1wb3J0Rm9ybVwiKVswXS5yZXNldCgpO1xyXG4gICAgICAgICQoXCIjaW1wb3J0QXJlYVwiKS50ZXh0KFwiXCIpO1xyXG4gICAgICAgICQoXCIjaW1wb3J0U3RhdHVzXCIpLnRleHQoJ1JlYWR5IHRvIGltcG9ydC4uJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgcGxheUF1ZGlvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGthbmppID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1rYW5qaScpLmlubmVySFRNTDtcclxuICAgICAgICB2YXIga2FuYSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LXNvbHV0aW9uJykuaW5uZXJIVE1MLnNwbGl0KC9bLOOAgV0rXFxzKi8pKVswXTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1hdWRpbycpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvLWZvcm0nKS5hY3Rpb24gPSBcIlwiO1xyXG4gICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0F1ZGlvQnV0dG9uJykuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiggIWthbmppLm1hdGNoKC9bYS16QS1aXSsvaSkgJiYgIWthbmEubWF0Y2goL1thLXpBLVpdKy9pKSkge1xyXG5cclxuICAgICAgICAgICAga2FuamkgPSBlbmNvZGVVUklDb21wb25lbnQoa2FuamkpO1xyXG4gICAgICAgICAgICBrYW5hID0gZW5jb2RlVVJJQ29tcG9uZW50KGthbmEpO1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdrYW5qaSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8IGthbmppLmxlbmd0aDsgaSA9IGkrMykge1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuamkgPSBuZXdrYW5qaS5jb25jYXQoa2FuamlbaS0xXSk7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5qaSA9IG5ld2thbmppLmNvbmNhdCgnMicpO1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuamkgPSBuZXdrYW5qaS5jb25jYXQoJzUnKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmppID0gbmV3a2FuamkuY29uY2F0KGthbmppW2ldKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmppID0gbmV3a2FuamkuY29uY2F0KGthbmppW2krMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3a2FuYSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8IGthbmEubGVuZ3RoOyBpID0gaSszKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5hID0gbmV3a2FuYS5jb25jYXQoa2FuYVtpLTFdKTtcclxuICAgICAgICAgICAgICAgIG5ld2thbmEgPSBuZXdrYW5hLmNvbmNhdCgnMicpO1xyXG4gICAgICAgICAgICAgICAgbmV3a2FuYSA9IG5ld2thbmEuY29uY2F0KCc1Jyk7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5hID0gbmV3a2FuYS5jb25jYXQoa2FuYVtpXSk7XHJcbiAgICAgICAgICAgICAgICBuZXdrYW5hID0gbmV3a2FuYS5jb25jYXQoa2FuYVtpKzFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHVybCA9IFwiaHR0cDovL3d3dy5jc3NlLm1vbmFzaC5lZHUuYXUvfmp3Yi9hdWRpb2NrLnN3Zj91PWthbmE9XCIgKyBuZXdrYW5hICsgXCIlMjZrYW5qaT1cIiArIG5ld2thbmppO1xyXG5cclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIkF1ZGlvIFVSTDogXCIgKyB1cmwpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0F1ZGlvQnV0dG9uJykuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtYXVkaW8nKS5pbm5lckhUTUwgPSB1cmw7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuZXh0UmV2aWV3ID0gZnVuY3Rpb24ocmV2aWV3TGlzdCkge1xyXG4gICAgICAgIC8vc2V0cyB1cCB0aGUgbmV4dCBpdGVtIGZvciByZXZpZXdcclxuICAgICAgICAvL3VzZXMgZnVuY3Rpb25zOlxyXG4gICAgICAgIC8vICAgIHdhbmFrYW5hLmJpbmQvdW5iaW5kXHJcblxyXG4gICAgICAgIHZhciBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmV2aWV3TGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIHZhciBpdGVtID0gcmV2aWV3TGlzdFtybmRdO1xyXG4gICAgICAgIHNlc3Npb25TZXQoJ1dLU1MtaXRlbScsIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcclxuICAgICAgICBzZXNzaW9uU2V0KCdXS1NTLXJuZCcsIHJuZCk7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXItU3RhdHMnKSl7XHJcbiAgICAgICAgICAgICQoXCIjUmV2TnVtXCIpLmlubmVySHRtbCA9IHNlc3Npb25HZXQoJ1VzZXItU3RhdHMnKS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYta2FuamknKS5pbm5lckhUTUwgPSBpdGVtLnByb21wdDtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LXR5cGUnKS5pbm5lckhUTUwgPSBpdGVtLnR5cGU7XHJcbiAgICAgICAgdmFyIHR5cGVCZ0NvbG9yID0gJ2dyZXknO1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnbWVhbmluZycpe1xyXG4gICAgICAgICAgICB0eXBlQmdDb2xvciA9ICdibHVlJztcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZS50b0xvd2VyQ2FzZSgpID09ICdyZWFkaW5nJyl7XHJcbiAgICAgICAgICAgIHR5cGVCZ0NvbG9yID0gJ29yYW5nZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAncmV2ZXJzZScpe1xyXG4gICAgICAgICAgICB0eXBlQmdDb2xvciA9ICdvcmFuZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2tzcy10eXBlJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdHlwZUJnQ29sb3I7XHJcbiAgICAgICAgJChcIiNyZXYtc29sdXRpb25cIikucmVtb3ZlQ2xhc3MoXCJpbmZvXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtc29sdXRpb24nKS5pbm5lckhUTUwgPSBpdGVtLnNvbHV0aW9uO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5kZXgnKS5pbm5lckhUTUwgPSBpdGVtLmluZGV4O1xyXG5cclxuICAgICAgICAvL2luaXRpYWxpc2UgdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgJChcIiNyZXYtaW5wdXRcIikuZm9jdXMoKTtcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS5yZW1vdmVDbGFzcyhcImNhdXRpb25cIik7XHJcbiAgICAgICAgJChcIiNyZXYtaW5wdXRcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcclxuICAgICAgICAkKFwiI3Jldi1pbnB1dFwiKS5yZW1vdmVDbGFzcyhcImNvcnJlY3RcIik7XHJcbiAgICAgICAgJChcIiNyZXYtaW5wdXRcIikudmFsKFwiXCIpO1xyXG5cclxuICAgICAgICAvL2NoZWNrIGZvciBhbHBoYWJldCBsZXR0ZXJzIGFuZCBkZWNpZGUgdG8gYmluZCBvciB1bmJpbmQgd2FuYWthbmFcclxuICAgICAgICBpZiAoaXRlbS5zb2x1dGlvblswXS5tYXRjaCgvW2EtekEtWl0rL2kpKSB7XHJcbiAgICAgICAgICAgIHdhbmFrYW5hLnVuYmluZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2LWlucHV0JykpO1xyXG4gICAgICAgICAgICAkKCcjcmV2LWlucHV0JykuYXR0cigncGxhY2Vob2xkZXInLCdZb3VyIHJlc3BvbnNlJyk7XHJcbiAgICAgICAgICAgICQoJyNyZXYtaW5wdXQnKS5hdHRyKCdsYW5nJywnZW4nKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3YW5ha2FuYS5iaW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5wdXQnKSk7XHJcbiAgICAgICAgICAgICQoJyNyZXYtaW5wdXQnKS5hdHRyKCdwbGFjZWhvbGRlcicsJ+etlOOBiCcpO1xyXG4gICAgICAgICAgICAkKCcjcmV2LWlucHV0JykuYXR0cignbGFuZycsJ2phJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGxheUF1ZGlvKCk7XHJcbiAgICB9O1xyXG5cclxuXHQvL2dsb2JhbCB0byBrZWVwIHRyYWNrIG9mIHdoZW4gYSByZXZpZXcgaXMgaW4gc2Vzc2lvbi5cclxuICAgIHZhciByZXZpZXdBY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgc3RhcnRSZXZpZXcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic3RhcnRSZXZpZXcoKVwiKTtcclxuICAgICAgICBzdWJtaXQgPSB0cnVlO1xyXG4gICAgICAgIHJldmlld0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy9nZXQgdGhlIHJldmlldyAnbGlzdCcgZnJvbSBzZXNzaW9uIHN0b3JhZ2UsIGxpbmUgdXAgdGhlIGZpcnN0IGl0ZW0gaW4gcXVldWVcclxuICAgICAgICB2YXIgcmV2aWV3TGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItUmV2aWV3Jyl8fFtdO1xyXG4gICAgICAgIG5leHRSZXZpZXcocmV2aWV3TGlzdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBSZXZpZXcgSXRlbXNcclxuXHQqL1xyXG4gICAgd2luZG93LldLU1NfcmV2aWV3ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL2lzIHRoZXJlIGEgc2Vzc2lvbiB3YWl0aW5nIGluIHN0b3JhZ2U/XHJcbiAgICAgICAgaWYoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnVXNlci1SZXZpZXcnKSkge1xyXG5cclxuICAgICAgICAgICAgLy9zaG93IHRoZSBzZWxmc3R1ZHkgd2luZG93XHJcbiAgICAgICAgICAgICQoXCIjc2VsZnN0dWR5XCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIC8vaGlkZSBvdGhlciB3aW5kb3dzXHJcbiAgICAgICAgICAgICQoXCIjYWRkXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIiNleHBvcnRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI2VkaXRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI2ltcG9ydFwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBzdGFydFJldmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGRpdiBpZD1cInNlbGZzdHVkeVwiIGNsYXNzPVwiV0tTU1wiPlxcXHJcbjxidXR0b24gaWQ9XCJTZWxmc3R1ZHlDbG9zZUJ0blwiIGNsYXNzPVwid2tzcy1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cImljb24tcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5SZXZpZXc8c3BhbiBpZD1cIlJldk51bVwiPjwvc3Bhbj48L2gxPlxcXHJcbjxkaXYgaWQ9XCJ3a3NzLWthbmppXCI+XFxcclxuPHNwYW4gaWQ9XCJyZXYta2FuamlcIj48L3NwYW4+XFxcclxuPC9kaXY+PGRpdiBpZD1cIndrc3MtdHlwZVwiPlxcXHJcbjxzcGFuIGlkPVwicmV2LXR5cGVcIj48L3NwYW4+PGJyIC8+XFxcclxuPC9kaXY+PGRpdiBpZD1cIndrc3Mtc29sdXRpb25cIj5cXFxyXG48c3BhbiBpZD1cInJldi1zb2x1dGlvblwiPjwvc3Bhbj5cXFxyXG48L2Rpdj48ZGl2IGlkPVwid2tzcy1pbnB1dFwiPlxcXHJcbjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicmV2LWlucHV0XCIgc2l6ZT1cIjQwXCIgcGxhY2Vob2xkZXI9XCJcIj5cXFxyXG48L2Rpdj48c3BhbiBpZD1cInJldi1pbmRleFwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+PC9zcGFuPlxcXHJcblxcXHJcbjxmb3JtIGlkPVwiYXVkaW8tZm9ybVwiPlxcXHJcbjxsYWJlbCBpZD1cIkF1ZGlvQnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIj5QbGF5IGF1ZGlvPC9sYWJlbD5cXFxyXG48bGFiZWwgaWQ9XCJXcmFwVXBCdG5cIiAgIGNsYXNzPVwiYnV0dG9uXCI+V3JhcCBVcDwvbGFiZWw+XFxcclxuPC9mb3JtPlxcXHJcbjxkaXYgaWQ9XCJyZXYtYXVkaW9cIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48L2Rpdj5cXFxyXG48L2Rpdj4nKTtcclxuICAgICQoXCIjc2VsZnN0dWR5XCIpLmhpZGUoKTtcclxuXHJcbiAgICAkKFwiI1NlbGZzdHVkeUNsb3NlQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI3NlbGZzdHVkeVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNyZXYtaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIHJldmlld0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGJpbmFyeVNlYXJjaCA9IGZ1bmN0aW9uKHZhbHVlcywgdGFyZ2V0LCBzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgLy9kZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiYmluYXJ5U2VhcmNoKHZhbHVlczogLHRhcmdldDogLCBzdGFydDogXCIrc3RhcnQrXCIsIGVuZDogXCIrZW5kK1wiKVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSB7XHJcbiAgICAgICAgICAgIC8vc3RhcnQgaGFzIGhpZ2hlciB2YWx1ZSB0aGFuIHRhcmdldCwgZW5kIGhhcyBsb3dlciB2YWx1ZVxyXG4gICAgICAgICAgICAvL2l0ZW0gYmVsb25ncyBiZXR3ZWVuXHJcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gcmV0dXJuICdzdGFydCcgd2l0aCBhIGZsYWcgdGhhdCBpdCBoYXNuJ3QgYmVlbiBmb3VuZFxyXG4gICAgICAgICAgICAvL2ludmVydCBzaWduIDopXHJcbiAgICAgICAgICAgIHJldHVybiAtKHN0YXJ0KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2ZvciB0ZXN0aW5nIHRydXRoc1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gU3RyaW5nKGVuZCkrXCIgPCBcIitpdGVtLmluZGV4K1wiIDwgXCIrU3RyaW5nKHN0YXJ0KTtcclxuXHJcbiAgICAgICAgfSAvL2RvZXMgbm90IGV4aXN0XHJcblxyXG5cclxuICAgICAgICB2YXIgbWlkZGxlID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW21pZGRsZV07XHJcbiAgICAgICAgLypkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic3RhcnQuaW5kZXg6IFwiK3ZhbHVlc1tzdGFydF0uaW5kZXgpO1xyXG4gICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJtaWRkbGUuaW5kZXg6IFwiK3ZhbHVlc1ttaWRkbGVdLmluZGV4KTtcclxuICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiZW5kLmluZGV4OiBcIit2YWx1ZXNbZW5kXS5pbmRleCk7XHJcbiAgICAgKi9cclxuICAgICAgICBpZiAoTnVtYmVyKHZhbHVlLmluZGV4KSA+IE51bWJlcih0YXJnZXQuaW5kZXgpKSB7XHJcblx0XHRcdHJldHVybiBiaW5hcnlTZWFyY2godmFsdWVzLCB0YXJnZXQsIHN0YXJ0LCBtaWRkbGUtMSk7XHJcblx0XHR9XHJcbiAgICAgICAgaWYgKE51bWJlcih2YWx1ZS5pbmRleCkgPCBOdW1iZXIodGFyZ2V0LmluZGV4KSkge1xyXG5cdFx0XHRyZXR1cm4gYmluYXJ5U2VhcmNoKHZhbHVlcywgdGFyZ2V0LCBtaWRkbGUrMSwgZW5kKTtcclxuXHRcdH1cclxuICAgICAgICByZXR1cm4gbWlkZGxlOyAvL2ZvdW5kIVxyXG4gICAgfTtcclxuXHJcblx0dmFyIGZpbmRJbmRleCA9IGZ1bmN0aW9uKHZhbHVlcywgdGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGJpbmFyeVNlYXJjaCh2YWx1ZXMsIHRhcmdldCwgMCwgdmFsdWVzLmxlbmd0aCAtIDEpO1xyXG5cdH07XHJcblxyXG4gICAgJChcIiNXcmFwVXBCdG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlc3Npb25MaXN0ID0gc2Vzc2lvbkdldCgnVXNlci1SZXZpZXcnKXx8W107XHJcbiAgICAgICAgdmFyIHN0YXRzTGlzdCA9IHNlc3Npb25HZXQoJ1VzZXItU3RhdHMnKXx8W107XHJcbiAgICAgICAgLy9pZiBhbiBpbmRleCBpbiBzZXNzaW9uTGlzdCBtYXRjaGVzIG9uZSBpbiBzdGF0c0xpc3QsIGRvbid0IGRlbGV0ZVxyXG4gICAgICAgIHZhciBzZXNzaW9uSSA9IHNlc3Npb25MaXN0Lmxlbmd0aDtcclxuICAgICAgICB2YXIgaXRlbSA9IHNlc3Npb25HZXQoJ1dLU1MtaXRlbScpfHxbXTtcclxuICAgICAgICB2YXIgYXJyMiA9IFtdO1xyXG4gICAgICAgIC8vZm9yIGV2ZXJ5IGl0ZW0gaW4gc2Vzc2lvbkxpc3QsIGxvb2sgZm9yIGluZGV4IGluIHN0YXRzTGlzdCxcclxuICAgICAgICAvL2lmIG5vdCB0aGVyZSAoLTEpIGRlbGV0ZSBpdGVtIGZyb20gc2Vzc2lvbkxpc3RcclxuICAgICAgICB3aGlsZSAoc2Vzc2lvbkktLSl7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChzdGF0c0xpc3Qsc2Vzc2lvbkxpc3Rbc2Vzc2lvbkldKTtcclxuICAgICAgICAgICAgaWYgKChNYXRoLnNpZ24oMS9pbmRleCkgIT09IC0xKXx8KHNlc3Npb25MaXN0W3Nlc3Npb25JXS5pbmRleCA9PSBpdGVtLmluZGV4KSl7XHJcblxyXG4gICAgICAgICAgICAgICAgYXJyMi5wdXNoKHNlc3Npb25MaXN0W3Nlc3Npb25JXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhhcnIyKTtcclxuICAgICAgICBzZXNzaW9uU2V0KCdVc2VyLVJldmlldycsIEpTT04uc3RyaW5naWZ5KGFycjIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKiBTYXZlIHRvIGxpc3QgYmFzZWQgb24gLmluZGV4IHByb3BlcnR5XHJcblx0KiBAcGFyYW0ge0FycmF5Ljx0YXNrPn0gZUxpc3RcclxuXHQqIEBwYXJhbSB7dGFza30gZUl0ZW1cclxuXHQqL1xyXG4gICAgdmFyIHNhdmVUb1NvcnRlZExpc3QgPSBmdW5jdGlvbihlTGlzdCxlSXRlbSl7XHJcbiAgICAgICAgdmFyIGdldCA9IGZpbmRJbmRleChlTGlzdCxlSXRlbSk7XHJcbiAgICAgICAgaWYgKE1hdGguc2lnbigxL2dldCkgPT09IC0xKXtcclxuICAgICAgICAgICAgZUxpc3Quc3BsaWNlKC1nZXQsMCxlSXRlbSk7XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIGVMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS1cclxuICAgIHZhciBvcGVuSW5OZXdUYWIgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICB2YXIgd2luPXdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xyXG4gICAgICAgIHdpbi5mb2N1cygpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkKFwiI0F1ZGlvQnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvcGVuSW5OZXdUYWIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1hdWRpbycpLmlubmVySFRNTCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgUmV2X0l0ZW0gPSBmdW5jdGlvbihwcm9tcHQsIGthbmppLCB0eXBlLCBzb2x1dGlvbiwgaW5kZXgpe1xyXG4gICAgICAgIHRoaXMucHJvbXB0ID0gcHJvbXB0O1xyXG4gICAgICAgIHRoaXMua2FuamkgPSBrYW5qaTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuc29sdXRpb24gPSBzb2x1dGlvbjtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB1cGRhdGVTUlMgPSBmdW5jdGlvbihzdGF0cywgdm9jbGlzdCkge1xyXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmICh2b2NsaXN0W3N0YXRzLmluZGV4XS5kdWUgPCBub3cpeyAvL2RvdWJsZSBjaGVjayB0aGF0IHRoZSBpdGVtIHdhcyByZWFsbHkgdXAgZm9yIHJldmlldy5cclxuICAgICAgICAgICAgaWYoIXN0YXRzLm51bVdyb25nICYmIHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsIDwgOSkgey8vYWxsIGNvcnJlY3QgKG5vbmUgd3JvbmcpXHJcbiAgICAgICAgICAgICAgICB2b2NsaXN0W3N0YXRzLmluZGV4XS5sZXZlbCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdHMubnVtV3JvbmcgPSB7fTtcclxuICAgICAgICAgICAgICAgIC8vQWRhcHRlZCBmcm9tIFdhbmlLYW5pJ3Mgc3JzIHRvIGF1dGhlbnRpY2FsbHkgbWltaWMgbGV2ZWwgZG93bnNcclxuICAgICAgICAgICAgICAgIHZhciBvID0gKHN0YXRzLm51bVdyb25nLk1lYW5pbmd8fDApKyhzdGF0cy5udW1Xcm9uZy5SZWFkaW5nfHwwKSsoc3RhdHMubnVtV3JvbmcuUmV2ZXJzZXx8MCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHI9dD49NT8yKk1hdGgucm91bmQoby8yKToxKk1hdGgucm91bmQoby8yKTtcclxuICAgICAgICAgICAgICAgIHZhciBuPXQtcjwxPzE6dC1yO1xyXG5cclxuICAgICAgICAgICAgICAgIHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsID0gbjsvL2Rvbid0IHN0YXkgb24gJ3N0YXJ0ZWQnXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmRhdGUgPSBub3c7XHJcbiAgICAgICAgICAgIHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmR1ZSA9IG5vdyArIHNyc09iamVjdFt2b2NsaXN0W3N0YXRzLmluZGV4XS5sZXZlbF0uZHVyYXRpb247XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmV4dCByZXZpZXcgaW4gXCIrbXMyc3RyKHNyc09iamVjdFt2b2NsaXN0W3N0YXRzLmluZGV4XS5sZXZlbF0uZHVyYXRpb24pKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2b2NsaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHNob3dSZXN1bHRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBzdGF0c0xpc3QgPSBzZXNzaW9uR2V0KCdVc2VyLVN0YXRzJyl8fFtdO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHNsaXN0XCIsIHN0YXRzTGlzdCk7XHJcbiAgICAgICAgdmFyIHZvY2xpc3QgPSBTdG9yYWdlVXRpbC5nZXRWb2NMaXN0KCk7XHJcbiAgICAgICAgXHJcblx0XHRzdGF0c0xpc3QuZm9yRWFjaChmdW5jdGlvbihzdGF0cywgaSwgc3RhdHNMaXN0KXtcclxuICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcInN0YXRzXCIsc3RhdHMpO1xyXG4gICAgICAgICAgICB2YXIgYWx0VGV4dCA9IHZvY2xpc3Rbc3RhdHMuaW5kZXhdLmxldmVsOy8vK3N0YXRzLnR5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdHMubnVtV3JvbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0cy5udW1Xcm9uZy5NZWFuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgTWVhbmluZyBXcm9uZyB4XCIrc3RhdHMubnVtV3JvbmcuTWVhbmluZyArXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0cy5udW1Xcm9uZy5SZWFkaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgUmVhZGluZyBXcm9uZyB4XCIrc3RhdHMubnVtV3JvbmcuUmVhZGluZyArXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0cy5udW1Xcm9uZy5SZXZlcnNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgUmV2ZXJzZSBXcm9uZyB4XCIrc3RhdHMubnVtV3JvbmcuUmV2ZXJzZSArXCJcXG5cIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoc3RhdHMubnVtQ29ycmVjdCl7XHJcblx0XHRcdFx0aWYgKHN0YXRzLm51bUNvcnJlY3QuTWVhbmluZylcclxuXHRcdFx0XHRcdGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgTWVhbmluZyBDb3JyZWN0IHhcIitzdGF0cy5udW1Db3JyZWN0Lk1lYW5pbmcgK1wiXFxuXCI7XHJcblx0XHRcdFx0aWYgKHN0YXRzLm51bUNvcnJlY3QuUmVhZGluZylcclxuXHRcdFx0XHRcdGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgUmVhZGluZyBDb3JyZWN0IHhcIitzdGF0cy5udW1Db3JyZWN0LlJlYWRpbmcgK1wiXFxuXCI7XHJcblx0XHRcdFx0aWYgKHN0YXRzLm51bUNvcnJlY3QuUmV2ZXJzZSlcclxuXHRcdFx0XHRcdGFsdFRleHQgPSBhbHRUZXh0ICsgXCIgUmV2ZXJzZSBDb3JyZWN0IHhcIitzdGF0cy5udW1Db3JyZWN0LlJldmVyc2UgK1wiXFxuXCI7XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHMpO1xyXG5cclxuXHRcdFx0Ly9UT0RPIHNvcnQgaW50byBhcHByZW50aWNlLCBndXJ1LCBldGNcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1hXCIpLmlubmVySFRNTCArPVxyXG5cdFx0XHRcdFwiPHNwYW4gY2xhc3M9XCIgK1xyXG5cdFx0XHRcdChzdGF0cy5udW1Xcm9uZz8gXCJcXFwicmV2LWVycm9yXFxcIlwiOlwiXFxcInJldi1jb3JyZWN0XFxcIlwiKSArXHJcblx0XHRcdFx0XCIgdGl0bGU9J1wiK2FsdFRleHQrXCInPlwiICsgc3RhdHMua2FuamkgKyBcIjwvc3Bhbj5cIjtcclxuXHRcdFx0XHJcblx0XHRcdC8vbWFwIHdpdGggc2lkZSBlZmZlY3RzP1xyXG4gICAgICAgICAgICBzdGF0c0xpc3RbaV0gPSB1cGRhdGVTUlMoc3RhdHMsIHZvY2xpc3QpO1xyXG5cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICBzZXNzaW9uU2V0KFwiVXNlci1TdGF0c1wiLHN0YXRzTGlzdCk7XHJcbiAgICAgICAgbG9jYWxTZXQoXCJVc2VyLVZvY2FiXCIsIHZvY2xpc3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICAkKFwiYm9keVwiKS5hcHBlbmQoJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXFxyXG48ZGl2IGlkPVwicmVzdWx0d2luZG93XCIgY2xhc3M9XCJXS1NTXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxcclxuPGJ1dHRvbiBpZD1cIlJldmlld3Jlc3VsdHNDbG9zZUJ0blwiIGNsYXNzPVwid2tzcy1jbG9zZVwiIHR5cGU9XCJidXR0b25cIj48aSBjbGFzcz1cImljb24tcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPlxcXHJcbjxoMT5SZXZpZXcgUmVzdWx0czwvaDE+XFxcclxuPGgyPkFsbDwvaDI+XFxcclxuPGRpdiBpZD1cInN0YXRzLWFcIj48L2Rpdj5cXFxyXG48L2Rpdj4nKTtcclxuXHJcbiAgICAkKFwiI3Jlc3VsdHdpbmRvd1wiKS5oaWRlKCk7XHJcblxyXG4gICAgJChcIiNSZXZpZXdyZXN1bHRzQ2xvc2VCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjcmVzdWx0d2luZG93XCIpLmhpZGUoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWFcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH0pO1xyXG5cclxuXHR2YXIgbWFya0Fuc3dlciA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAvL2V2YWx1YXRlICdpdGVtJyBhZ2FpbnN0IHRoZSBxdWVzdGlvbi5cclxuICAgICAgICAvLyBtYXRjaCBieSBpbmRleFxyXG4gICAgICAgIC8vIGdldCB0eXBlIG9mIHF1ZXN0aW9uXHJcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHJpZ2h0IG9yIHdyb25nIGFuZCByZXR1cm4gcmVzdWx0IGFwcHJvcHJpYXRlbHlcclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIHF1ZXN0aW9uXHJcbiAgICAgICAgLy92YXIgcHJvbXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi1rYW5qaScpLmlubmVySFRNTC50cmltKCk7XHJcbiAgICAgICAgLy9nZXQgdGhlIGFuc3dlclxyXG4gICAgICAgIHZhciBhbnN3ZXIgPSAkKFwiI3Jldi1pbnB1dFwiKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIC8vZ2V0IHRoZSBpbmRleFxyXG4gICAgICAgIHZhciBpbmRleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXYtaW5kZXgnKS5pbm5lckhUTUwudHJpbSgpO1xyXG4gICAgICAgIC8vZ2V0IHRoZSBxdWVzdGlvbiB0eXBlXHJcbiAgICAgICAgdmFyIHR5cGUgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldi10eXBlJykuaW5uZXJIVE1MLnRyaW0oKTtcclxuXHJcbiAgICAgICAgLy92YXIgdm9jYWIgPSBsb2NhbEdldChcIlVzZXItVm9jYWJcIik7XHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBpdGVtIGlmIGl0IGlzIGluIHRoZSBjdXJyZW50IHNlc3Npb25cclxuICAgICAgICB2YXIgc3RvcmVkSXRlbSA9IHNlc3Npb25HZXQoaXRlbS5pbmRleCk7XHJcbiAgICAgICAgaWYgKHN0b3JlZEl0ZW0pe1xyXG5cclxuICAgICAgICAgICAgaXRlbS5udW1Db3JyZWN0ID0gc3RvcmVkSXRlbS5udW1Db3JyZWN0O1xyXG4gICAgICAgICAgICBpdGVtLm51bVdyb25nID0gc3RvcmVkSXRlbS5udW1Xcm9uZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PSBpdGVtLmluZGV4KXsvLy0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgaWYgKGlucHV0Q29ycmVjdCgpKXtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coYW5zd2VyK1wiL1wiK2l0ZW0uc29sdXRpb25bMF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLm51bUNvcnJlY3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJpbml0aWFsaXNpbmcgbnVtQ29ycmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bUNvcnJlY3Q9e307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIkNvcnJlY3Q6IFwiKyB0eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiTWVhbmluZ1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtQ29ycmVjdC5NZWFuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm51bUNvcnJlY3QuTWVhbmluZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtQ29ycmVjdC5NZWFuaW5nKys7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJSZWFkaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5udW1Db3JyZWN0LlJlYWRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtQ29ycmVjdC5SZWFkaW5nID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Db3JyZWN0LlJlYWRpbmcrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIlJldmVyc2VcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLm51bUNvcnJlY3QuUmV2ZXJzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Db3JyZWN0LlJldmVyc2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bUNvcnJlY3QuUmV2ZXJzZSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKGFuc3dlcitcIiE9XCIraXRlbS5zb2x1dGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtV3Jvbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJpbml0aWFsaXNpbmcgbnVtQ29ycmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bVdyb25nPXt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJXcm9uZzogXCIrIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJNZWFuaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5udW1Xcm9uZy5NZWFuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm51bVdyb25nLk1lYW5pbmcgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm51bVdyb25nLk1lYW5pbmcrKztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIlJlYWRpbmdcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLm51bVdyb25nLlJlYWRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtV3JvbmcuUmVhZGluZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnVtV3JvbmcuUmVhZGluZysrO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwiUmV2ZXJzZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubnVtV3JvbmcuUmV2ZXJzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Xcm9uZy5SZXZlcnNlID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5udW1Xcm9uZy5SZXZlcnNlKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBpbmRleGVzIGRvbid0IG1hdGNoXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH07XHJcblxyXG5cdFxyXG4gICAgLy9qcXVlcnkga2V5dXAgZXZlbnRcclxuICAgICQoXCIjcmV2LWlucHV0XCIpLmtleXVwKFJldmlld1V0aWwuc3VibWl0UmVzcG9uc2UpO1xyXG5cclxuXHJcbiAgICAvKiogQWRkcyB0aGUgQnV0dG9uXHJcblx0Ki9cclxuICAgIHZhciBhZGRVc2VyVm9jYWJCdXR0b24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiYWRkVXNlclZvY2FiQnV0dG9uKClcIik7XHJcbiAgICAgICAgLy9GdW5jdGlvbnMgKGluZGlyZWN0KVxyXG4gICAgICAgIC8vICAgIFdLU1NfYWRkKClcclxuICAgICAgICAvLyAgICBXS1NTX2VkaXQoKVxyXG4gICAgICAgIC8vICAgIFdLU1NfZXhwb3J0KClcclxuICAgICAgICAvLyAgICBXS1NTX2ltcG9ydCgpXHJcbiAgICAgICAgLy8gICAgV0tTU19sb2NrKClcclxuICAgICAgICAvLyAgICBXS1NTX3JldmlldygpXHJcblxyXG4gICAgICAgIHZhciBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXYnKTtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiZ2VuZXJhdGluZyByZXZpZXcgbGlzdCBiZWNhdXNlOiBpbml0aWFsaXNpbmcgc2NyaXB0IGFuZCBwb3B1bGF0aW5nIHJldmlld3NcIik7XHJcblxyXG5cclxuICAgICAgICBpZiAobmF2JiZuYXYubGVuZ3RoPjIpIHtcclxuICAgICAgICAgICAgbmF2WzJdLmlubmVySFRNTCA9IG5hdlsyXS5pbm5lckhUTUwgKyBcIlxcblxcXHJcbjxsaSBjbGFzcz1cXFwiZHJvcGRvd24gY3VzdG9tXFxcIj5cXG5cXFxyXG48YSBjbGFzcz1cXFwiZHJvcGRvd24tdG9nZ2xlIGN1c3RvbVxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIiBocmVmPVxcXCIjXFxcIiBvbmNsaWNrPVxcXCJnZW5lcmF0ZVJldmlld0xpc3QoKTtcXFwiPlxcblxcXHJcbjxzcGFuIGxhbmc9XFxcImphXFxcIj7oh6rnv5I8L3NwYW4+XFxuXFxcclxuU2VsZi1TdHVkeSA8aSBjbGFzcz1cXFwiaWNvbi1jaGV2cm9uLWRvd25cXFwiPjwvaT5cXG5cXFxyXG48L2E+XFxuXFxcclxuPHVsIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51XFxcIiBpZD1cXFwiV0tTU19kcm9wZG93blxcXCI+XFxuXFxcclxuPGxpIGNsYXNzPVxcXCJuYXYtaGVhZGVyXFxcIj5DdXN0b21pemU8L2xpPlxcblxcXHJcbjxsaT48YSBpZD1cXFwiY2xpY2tcXFwiIGhyZWY9XFxcIiNcXFwiIG9uY2xpY2s9XFxcIldLU1NfYWRkKCk7XFxcIj5BZGQ8L2E+PC9saT5cXG5cXFxyXG48bGk+PGEgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiV0tTU19lZGl0KCk7XFxcIj5FZGl0PC9hPjwvbGk+XFxuXFxcclxuPGxpPjxhIGhyZWY9XFxcIiNcXFwiIG9uY2xpY2s9XFxcIldLU1NfZXhwb3J0KCk7XFxcIj5FeHBvcnQ8L2E+PC9saT5cXG5cXFxyXG48bGk+PGEgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiV0tTU19pbXBvcnQoKTtcXFwiPkltcG9ydDwvYT48L2xpPlxcblxcXHJcbjwhLS0vLyAgIDxsaT48YSBocmVmPVxcXCIjXFxcIiBvbmNsaWNrPVxcXCJXS1NTX2xvY2soKTtcXFwiPlNlcnZlciBTZXR0aW5nczwvYT48L2xpPi8vLS0+XFxuXFxcclxuPGxpIGNsYXNzPVxcXCJuYXYtaGVhZGVyXFxcIj5MZWFybjwvbGk+XFxuXFxcclxuPGxpPjxhIGlkPVxcXCJ1c2VyLXJldmlld1xcXCIgaHJlZj1cXFwiI1xcXCIgb25jbGljaz1cXFwiV0tTU19yZXZpZXcoKTtcXFwiPlBsZWFzZSB3YWl0Li4uPC9hPjwvbGk+XFxuXFxcclxuPC91bD5cXG5cXFxyXG48L2xpPlwiO1xyXG5cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZmluZCBuYXZcIiwgbmF2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGRVc2VyVm9jYWJcIik7XHJcbiAgICB9O1xyXG5cclxuXHQgICAgLyoqIEVycm9yIGhhbmRsaW5nXHJcblx0KiBDYW4gdXNlICdlcnJvci5zdGFjaycsIG5vdCBjcm9zcy1icm93c2VyICh0aG91Z2ggaXQgc2hvdWxkIHdvcmsgb24gRmlyZWZveCBhbmQgQ2hyb21lKVxyXG5cdCovXHJcbiAgICB2YXIgbG9nRXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJsb2dFcnJvcihlcnJvcilcIik7XHJcbiAgICAgICAgdmFyIHN0YWNrTWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKFwic3RhY2tcIiBpbiBlcnJvcilcclxuICAgICAgICAgICAgc3RhY2tNZXNzYWdlID0gXCJcXG5cXHRTdGFjazogXCIgKyBlcnJvci5zdGFjaztcclxuXHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmxvZyhcIldLU1M6IEVycm9yOiBcIiArIGVycm9yLm5hbWUgKyBcIlxcblxcdE1lc3NhZ2U6IFwiICsgZXJyb3IubWVzc2FnZSArIHN0YWNrTWVzc2FnZSk7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIldLU1M6IEVycm9yOiBcIiArIGVycm9yLm5hbWUgKyBcIlxcblxcdE1lc3NhZ2U6IFwiICsgZXJyb3IubWVzc2FnZSArIHN0YWNrTWVzc2FnZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKiogIFByZXBhcmVzIHRoZSBzY3JpcHRcclxuXHQqL1xyXG4gICAgdmFyIHNjcmlwdEluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwic2NyaXB0SW5pdCgpXCIpO1xyXG4gICAgICAgIC8vZnVuY3Rpb25zOlxyXG4gICAgICAgIC8vICAgIGFkZFVzZXJWb2NhYkJ1dHRvbigpXHJcbiAgICAgICAgLy8gICAgbG9nRXJyb3IoZXJyKVxyXG5cclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIFdhbmlrYW5pIFVzZXJWb2NhYiBTY3JpcHQhXCIpO1xyXG5cclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b20gLmRyb3Bkb3duLW1lbnUge2JhY2tncm91bmQtY29sb3I6ICNEQkE5MDEgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbSAuZHJvcGRvd24tbWVudTphZnRlciB7Ym9yZGVyLWJvdHRvbS1jb2xvcjogI0RCQTkwMSAhaW1wb3J0YW50O1wiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b20gLmRyb3Bkb3duLW1lbnU6YmVmb3JlIHtib3JkZXItYm90dG9tLWNvbG9yOiAjREJBOTAxICFpbXBvcnRhbnQ7XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5jdXN0b20ge2JhY2tncm91bmQtY29sb3I6ICNGRkM0MDAgIWltcG9ydGFudDt9XCIpO1xyXG4gICAgICAgIGdNX2FkZFN0eWxlKFwiLmN1c3RvbSAuZHJvcGRvd24tbWVudSBhOmhvdmVyIHtiYWNrZ3JvdW5kLWNvbG9yOiAjQTY3RjAwICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b206aG92ZXIge2NvbG9yOiAjRkZDNDAwICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b206aG92ZXIgc3BhbiB7Ym9yZGVyLWNvbG9yOiAjRkZDNDAwICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b206Zm9jdXMge2NvbG9yOiAjRkZDNDAwICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5jdXN0b206Zm9jdXMgc3BhbiB7Ym9yZGVyLWNvbG9yOiAjRkZDNDAwICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5vcGVuIC5jdXN0b20gc3BhbiB7Ym9yZGVyLWNvbG9yOiAjRkZGRkZGICFpbXBvcnRhbnQ7fVwiKTtcclxuICAgICAgICBnTV9hZGRTdHlsZShcIi5vcGVuIC5jdXN0b20ge2NvbG9yOiAjRkZGRkZGICFpbXBvcnRhbnR9XCIpO1xyXG5cclxuXHRcdHZhciB3a1N0eWxlQ1NTID0gcmVxdWlyZSgnLi93a3N0eWxlLmpzJyk7XHJcbiAgICAgICAgZ01fYWRkU3R5bGUod2tTdHlsZUNTUyk7XHJcbiAgICAgICAgLy8gU2V0IHVwIGJ1dHRvbnNcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgYWRkVXNlclZvY2FiQnV0dG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9wcm92aWRlIHdhcm5pbmcgdG8gdXNlcnMgdHJ5aW5nIHRvIHVzZSB0aGUgKGluY29tcGxldGUpIHNjcmlwdC5cclxuICAgICAgICAgICAgICAgIGRlYnVnZ2luZyYmY29uc29sZS5sb2coXCJ0aGlzIHNjcmlwdCBpcyBzdGlsbCBpbmNvbXBsZXRlOiBcXG5cXFxyXG5JdCBpcyBwcm92aWRlZCBhcyBpcyB3aXRob3V0IHdhcnJhbnR5IGV4cHJlc3Mgb3IgaW1wbGllZFxcblxcXHJcbmluIHRoZSBob3BlIHRoYXQgeW91IG1heSBmaW5kIGl0IHVzZWZ1bC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiV2FuaWthbmkgU2VsZi1TdHVkeTogWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbG9jYWxTdG9yYWdlLi4gU29ycnkgOihcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBsb2dFcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cdGNvbnNvbGUuaW5mbyhkb2N1bWVudC5yZWFkeVN0YXRlKTtcclxuICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIERPTSBsaXN0ZW5lclwiLCBkb2N1bWVudC5yZWFkeVN0YXRlKTtcclxuICAgIC8vIENoZWNrIGZvciBmaWxlIEFQSSBzdXBwb3J0LlxyXG4gICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xyXG5cclxuICAgIH1cclxuXHRlbHNlIHtcclxuICAgICAgICBhbGVydCgnVGhlIEZpbGUgQVBJcyBhcmUgbm90IGZ1bGx5IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFN0YXJ0IHRoZSBzY3JpcHRcclxuICAgICovXHJcbiAgICAvL3VubGVzcyB0aGUgdXNlciBuYXZpZ2F0ZWQgZnJvbSB0aGUgcmV2aWV3IGRpcmVjdG9yeSwgdGhleSBhcmUgdW5saWtlbHkgdG8gaGF2ZSB1bmxvY2tlZCBhbnkga2FuamlcclxuICAgIHZhciBub05ld1N0dWZmID0gL15odHRwczpcXC9cXC8uKlxcLndhbmlrYW5pXFwuY29tXFwvLiovLnRlc3QoZG9jdW1lbnQucmVmZXJyZXIpJiYhKC9odHRwczpcXC9cXC8uKlxcLndhbmlrYW5pXFwuY29tXFwvcmV2aWV3LiovLnRlc3QoZG9jdW1lbnQucmVmZXJyZXIpKTtcclxuICAgIHZhciB1c2luZ0hUVFBTID0gL15odHRwczovLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgY29uc29sZS5pbmZvKHVzaW5nSFRUUFMsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGlmICh1c2luZ0hUVFBTKXtcclxuICAgICAgICBpZiAoIW5vTmV3U3R1ZmYpeyAgLy9Eb24ndCB3YXN0ZSB0aW1lIGlmIHVzZXIgaXMgYnJvd3Npbmcgc2l0ZVxyXG4gICAgICAgICAgICBXYW5pa2FuaVV0aWwuZ2V0U2VydmVyUmVzcChBUElrZXkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUubG9nKFwiVXNlciBpcyB1bmxpa2VseSB0byBoYXZlIG5ldyBrYW5qaSB1bmxvY2tlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWdnaW5nJiZjb25zb2xlLmluZm8oXCJXYW5pS2FuaSBTZWxmLVN0dWR5IFBsdXMgaXMgYWJvdXQgdG8gc3RhcnRcIik7XHJcblxyXG4gICAgICAgIHNjcmlwdEluaXQoKTtcclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBkZWJ1Z2dpbmcmJmNvbnNvbGUud2FybihcIkl0IGFwcGVhcnMgdGhhdCB5b3UgYXJlIG5vdCB1c2luZyBodHRwcyBwcm90b2NvbC4gQXR0ZW1wdGluZyB0byByZWRpcmVjdCB0byBodHRwcyBub3cuXCIpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXmh0dHAvLCBcImh0dHBzXCIpO1xyXG4gICAgfVxyXG59XHJcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKXtcclxuICAgIGNvbnNvbGUuaW5mbyhcIkFib3V0IHRvIGluaXRpYWxpc2UgV0tTUytcIik7XHJcbiAgICBtYWluKCk7XHJcbn0gZWxzZSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbiwgZmFsc2UpO1xyXG59XHJcbiIsIi8qKiBVdGlsaXRpZXMgZm9yIGludGVyYWN0aW9uIHdpdGggdGhlIFdhbmlrYW5pIEFQSSBhbmQgZ2VuZXJhbCB3ZWJzaXRlLlxyXG4qL1xyXG52YXIgV2FuaWthbmlVdGlsID0ge1xyXG5cdGhpamFja1JlcXVlc3RzOiByZXF1aXJlKCcuL2hpamFja3JlcXVlc3RzLmpzJyksXHJcblx0Y3JlYXRlQ09SU1JlcXVlc3Q6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKXtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgaWYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyKXtcclxuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCk7XHJcbiAgICAgICAgfVxyXG5cdFx0ZWxzZSB7XHJcbiAgICAgICAgICAgIHhociA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4aHI7XHJcbiAgICB9LFxyXG5cdC8qKiBHZXRzIHRoZSB1c2VyIGluZm9ybWF0aW9uIHVzaW5nIHRoZSBXYW5pa2FuaSBBUEkgYW5kIHN0b3JlcyB0aGVtIGRpcmVjdGx5IGludG8gYnJvd3NlciBzdG9yYWdlLlxyXG5cdCogQHBhcmFtXHJcblx0KiBAcGFyYW1cclxuXHQqL1xyXG5cdGdldFNlcnZlclJlc3A6IGZ1bmN0aW9uKEFQSWtleSwgcmVxdWVzdGVkSXRlbSl7XHJcblxyXG4gICAgICAgIHJlcXVlc3RlZEl0ZW0gPSByZXF1ZXN0ZWRJdGVtID09PSB2b2lkIDAgPyAna2FuamknIDpyZXF1ZXN0ZWRJdGVtO1xyXG5cclxuICAgICAgICBpZiAoQVBJa2V5ICE9PSBcInRlc3RcIil7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbHMgPSAocmVxdWVzdGVkSXRlbSA9PT1cImthbmppXCIpPyBcIi8xLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MFwiOlxyXG4gICAgICAgICAgICBcIi8xLDIsMyw0LDUsNiw3LDgsOSwxMFwiO1xyXG4gICAgICAgICAgICB2YXIgeGhyayA9IHRoaXMuY3JlYXRlQ09SU1JlcXVlc3QoXCJnZXRcIiwgXCJodHRwczovL3d3dy53YW5pa2FuaS5jb20vYXBpL3VzZXIvXCIgKyBBUElrZXkgKyBcIi9cIiArIHJlcXVlc3RlZEl0ZW0gKyBsZXZlbHMpO1xyXG4gICAgICAgICAgICBpZiAoIWlzRW1wdHkoeGhyaykpe1xyXG4gICAgICAgICAgICAgICAgeGhyay5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyay5yZWFkeVN0YXRlID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2FuamlMaXN0ID0gdGhpcy5oYW5kbGVSZWFkeVN0YXRlRm91cih4aHJrLHJlcXVlc3RlZEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RlZEl0ZW0gPT09ICdrYW5qaScpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTZXQoJ1VzZXItS2FuamlMaXN0Jywga2FuamlMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2FuamlMaXN0IGZyb20gc2VydmVyXCIsIGthbmppTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBsb2NrcyBpbiBsb2NhbFN0b3JhZ2UgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bhc3Mga2FuamlsaXN0IGludG8gdGhpcyBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8oZG9uJ3Qgc2hpZnQgdGhpbmdzIHRocm91Z2ggc3RvcmFnZSB1bmVjZXNzYXJpbHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoTG9ja3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHRlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBrYW5qaUxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codiArIFwiIGl0ZW1zIGZvdW5kLCBhdHRlbXB0aW5nIHRvIGltcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh2LS0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0b3JhZ2VVdGlsLnNldFZvY0l0ZW0oa2FuamlMaXN0W3ZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgeGhyay5zZW5kKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJlbG93XCIpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblx0XHRlbHNlIHtcclxuICAgICAgICAgICAgLy9kdW1teSBzZXJ2ZXIgcmVzcG9uc2UgZm9yIHRlc3RpbmcuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGthbmppTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGluZyBkdW1teSByZXNwb25zZVwiKTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIueMq1wiLCBcInNyc1wiOiBcIm5vU2VydmVyUmVzcFwifSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgU1JTID0gXCJhcHByZW50aWNlXCI7IC8vcHJvbXB0KFwiZW50ZXIgU1JTIGZvciDlrZBcIiwgXCJndXJ1XCIpO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi5a2QXCIsIFwic3JzXCI6IFNSU30pO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi5ZOBXCIsIFwic3JzXCI6IFwiZ3VydVwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLkvptcIiwgXCJzcnNcIjogXCJndXJ1XCJ9KTtcclxuICAgICAgICAgICAgICAgIGthbmppTGlzdC5wdXNoKHtcImNoYXJhY3RlclwiOiBcIuacrFwiLCBcInNyc1wiOiBcImd1cnVcIn0pO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi6IGeXCIsIFwic3JzXCI6IFwiYXBwcmVudGljZVwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLkurpcIiwgXCJzcnNcIjogXCJlbmxpZ2h0ZW5lZFwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLmpb1cIiwgXCJzcnNcIjogXCJidXJuZWRcIn0pO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi55u4XCIsIFwic3JzXCI6IFwiZ3VydVwifSk7XHJcbiAgICAgICAgICAgICAgICBrYW5qaUxpc3QucHVzaCh7XCJjaGFyYWN0ZXJcIjogXCLljZJcIiwgXCJzcnNcIjogXCJub01hdGNoV0tcIn0pO1xyXG4gICAgICAgICAgICAgICAga2FuamlMaXN0LnB1c2goe1wiY2hhcmFjdGVyXCI6IFwi54ShXCIsIFwic3JzXCI6IFwibm9NYXRjaEd1cHB5XCJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZlciByZXNwb25kZWQgd2l0aCBkdW1teSBrYW5qaUxpc3Q6IFxcblwiK0pTT04uc3RyaW5naWZ5KGthbmppTGlzdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU2V0KCdVc2VyLUthbmppTGlzdCcsIGthbmppTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgbG9ja3MgaW4gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoTG9ja3MoKTtcclxuICAgICAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgICAgIH0gICBcclxuICAgIH0sXHJcblx0XHJcblx0aGFuZGxlUmVhZHlTdGF0ZUZvdXI6IGZ1bmN0aW9uKHhocmssIHJlcXVlc3RlZEl0ZW0pe1xyXG5cclxuICAgICAgICB2YXIgbG9jYWxrYW5qaUxpc3QgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlYWR5c3RhdGU6IFwiKyB4aHJrLnJlYWR5U3RhdGUpO1xyXG4gICAgICAgIHZhciByZXNwID0gSlNPTi5wYXJzZSh4aHJrLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhYm91dCB0byBsb29wIHRocm91Z2ggcmVxdWVzdGVkIGluZm9ybWF0aW9uXCIpOyBcclxuXHRcdGlmIChyZXNwLnJlcXVlc3RlZF9pbmZvcm1hdGlvbiAmJiByZXNwLnJlcXVlc3RlZF9pbmZvcm1hdGlvbi5sZW5ndGgpe1xyXG5cdFx0XHRcclxuXHRcdFx0bG9jYWxrYW5qaUxpc3QgPSByZXNwLnJlcXVlc3RlZF9pbmZvcm1hdGlvbi5tYXAoZnVuY3Rpb24ocmVxdWVzdGVkVGFzayl7XHJcblx0XHRcdFx0aWYgKHJlcXVlc3RlZEl0ZW0gPT09IFwia2FuamlcIil7XHJcblx0XHRcdFx0XHRpZiAocmVxdWVzdGVkVGFzay51c2VyX3NwZWNpZmljICE9PSBudWxsKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXI6IHJlcXVlc3RlZFRhc2suY2hhcmFjdGVyLFxyXG5cdFx0XHRcdFx0XHRcdHNyczogcmVxdWVzdGVkVGFzay51c2VyX3NwZWNpZmljLnNycyxcclxuXHRcdFx0XHRcdFx0XHRyZWFkaW5nOiByZXF1ZXN0ZWRUYXNrW3JlcXVlc3RlZFRhc2suaW1wb3J0YW50X3JlYWRpbmddLnNwbGl0KFwiLFwiKVswXSxcclxuXHRcdFx0XHRcdFx0XHRtZWFuaW5nOiByZXF1ZXN0ZWRUYXNrLm1lYW5pbmcuc3BsaXQoXCIsXCIpWzBdXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdGNoYXJhY3RlcjogcmVxdWVzdGVkVGFzay5jaGFyYWN0ZXIsXHJcblx0XHRcdFx0XHRcdFx0c3JzOiBcInVucmVhY2hlZFwiXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYocmVxdWVzdGVkSXRlbSA9PT0gXCJ2b2NhYnVsYXJ5XCIpe1xyXG5cdFx0XHRcdFx0aWYgKHJlcXVlc3RlZFRhc2sudXNlcl9zcGVjaWZpYyAhPT0gbnVsbHx8dHJ1ZSl7IC8vLS1cclxuXHRcdFx0XHRcdFx0Ly9idWlsZCB2b2NhYmxpc3RcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRrYW5qaTogcmVxdWVzdGVkVGFzay5jaGFyYWN0ZXIsXHJcblx0XHRcdFx0XHRcdFx0cmVhZGluZzogcmVxdWVzdGVkVGFzay5rYW5hLnNwbGl0KFwiLFwiKSxcclxuXHRcdFx0XHRcdFx0XHRtZWFuaW5nOiByZXF1ZXN0ZWRUYXNrLm1lYW5pbmcuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHRcdH1cclxuICAgICAgICAvL3JldHVybiBrYW5qaUxpc3RcclxuICAgICAgICAvLyAgY29uc29sZS5sb2coXCJTZXJ2ZXIgcmVzcG9uZGVkIHdpdGggbmV3IGthbmppTGlzdDogXFxuXCIrSlNPTi5zdHJpbmdpZnkoa2FuamlMaXN0KSk7XHJcbiAgICAgICAgcmV0dXJuIGxvY2Fsa2FuamlMaXN0O1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV2FuaWthbmlVdGlsOyIsIi8vIFdpbmRvdyBDb25maWdzXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFkZDp7aGVpZ2h0OiBcIjMwMHB4XCIsIHdpZHRoOiBcIjMwMHB4XCJ9LFxyXG5cdGV4cG9ydEltcG9ydDp7aGVpZ2h0OiBcIjI3NXB4XCIsIHdpZHRoOiBcIjM5MHB4XCJ9LFxyXG5cdGVkaXQ6e2hlaWdodDogXCIzODBweFwiLCB3aWR0aDogXCI4MDBweFwifSxcclxuXHRzdHVkeTp7aGVpZ2h0OiBcImF1dG9cIiwgd2lkdGg6IFwiNjAwcHhcIn0sIC8vaGVpZ2h0IDogYXV0b1xyXG5cdHJlc3VsdDp7aGVpZ2h0OiBcIjUwMHB4XCIsIHdpZHRoOiBcIjcwMHB4XCJ9XHJcbn07IiwiLyoganNoaW50IG11bHRpc3RyOiB0cnVlICovXHJcbi8vIENvbmZpZyBmb3Igd2luZG93IHNpemVzIGluIHBpeGVsc1xyXG52YXIgd2luZG93Q29uZmlnID0gcmVxdWlyZSgnLi93aW5kb3djb25maWcuanMnKTtcclxuXHJcbi8vLldLU1NcclxudmFyIGNsYXNzV0tTUyA9IFtcclxuXHR7cG9zaXRpb246IFwiZml4ZWRcIn0sXHJcblx0e3pJbmRleDogXCIyXCJ9LFxyXG5cdHt0b3A6IFwiMTI1cHhcIn0sXHJcblx0e2xlZnQ6IFwiNTAlXCJ9LFxyXG5cdHttYXJnaW46IFwiMHB4XCJ9LFxyXG5cdHtiYWNrZ3JvdW5kOiBcIiNGRkZcIn0sXHJcblx0e3BhZGRpbmc6IFwiNXB4XCJ9LFxyXG5cdHtmb250OiBcIjEycHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn0sXHJcblx0e3RleHRTaGFkb3c6IFwiMXB4IDFweCAxcHggI0ZGRlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjREREXCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtXZWJraXRCb3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtNb3pCb3JkZXJSYWRpdXM6IFwiNXB4XCJ9LFxyXG5cdHtib3hTaGFkb3c6IFwiMTBweCAxMHB4IDVweCAjODg4ODg4XCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIGgxXHJcbnZhciBjbGFzc1dLU1NfaDEgPSBbXHJcblx0e2ZvbnQ6IFwiMjVweCBcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7cGFkZGluZ0xlZnQ6IFwiNXB4XCJ9LFxyXG5cdHtkaXNwbGF5OiBcImJsb2NrXCJ9LFxyXG5cdHtib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkICNEQURBREFcIn0sXHJcblx0e21hcmdpbjogXCIwcHhcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgaDEgPiBzcGFuXHJcbnZhciBjbGFzc1dLU1NfaDFfZGlyZWN0X1NwYW4gPSBbXHJcblx0e2Rpc3BsYXk6IFwiYmxvY2tcIn0sXHJcblx0e2ZvbnRTaXplOiBcIjExcHhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgbGFiZWxcclxudmFyIHcgPSBbXHJcblx0e2Rpc3BsYXk6IFwiYmxvY2tcIn0sXHJcblx0e21hcmdpbjogXCIwcHggMHB4IDVweFwifSxcclxuXTtcclxuXHJcbi8vLldLU1MgbGFiZWw+c3BhblxyXG53ID0gW1xyXG5cdHtmbG9hdDogXCJsZWZ0XCJ9LFxyXG5cdHt3aWR0aDogXCI4MHB4XCJ9LFxyXG5cdHt0ZXh0QWxpZ246IFwicmlnaHRcIn0sXHJcblx0e3BhZGRpbmdSaWdodDogXCIxMHB4XCJ9LFxyXG5cdHttYXJnaW5Ub3A6IFwiMTBweFwifSxcclxuXHR7Y29sb3I6IFwiIzMzM1wifSxcclxuXHR7Zm9udEZhbWlseTogXCJcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7Zm9udFdlaWdodDogXCJib2xkXCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXSwgLldLU1MgaW5wdXRbdHlwZT1cXFwiZW1haWxcXFwiXSwgLldLU1MgdGV4dGFyZWEgXHJcbncgPSBbXHJcblx0e2JvcmRlcjogXCIxcHggc29saWQgI0NDQ1wifSxcclxuXHR7Y29sb3I6IFwiIzg4OFwifSxcclxuXHR7aGVpZ2h0OiBcIjIwcHhcIn0sXHJcblx0e21hcmdpbkJvdHRvbTogXCIxNnB4XCJ9LFxyXG5cdHttYXJnaW5SaWdodDogXCI2cHhcIn0sXHJcblx0e21hcmdpblRvcDogXCIycHhcIn0sXHJcblx0e291dGxpbmU6IFwiMCBub25lXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjZweCAxMnB4XCJ9LFxyXG5cdHt3aWR0aDogXCI4MCVcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2xpbmVIZWlnaHQ6IFwibm9ybWFsICFpbXBvcnRhbnRcIn0sXHJcblx0e1dlYmtpdEJvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e01vekJvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2ZvbnQ6IFwibm9ybWFsIDE0cHgvMTRweCBcXFwi44OS44Op44Ku44OO6KeS44K0IFBybyBXM1xcXCIsIFxcXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9cXFwiLE9zYWthLCBcXFwi44Oh44Kk44Oq44KqXFxcIiwgTWVpcnlvLCBcXFwi77yt77yzIO+8sOOCtOOCt+ODg+OCr1xcXCIsIFxcXCJNUyBQR290aGljXFxcIiwgc2Fucy1zZXJpZlwifSxcclxuXHR7V2Via2l0Qm94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifSxcclxuXHR7Ym94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifSxcclxuXHR7TW96Qm94U2hhZG93OiBcImluc2V0IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMDc1KVwifVxyXG5dO1xyXG5cclxuLy8uV0tTUyBzZWxlY3RcclxudyA9IFtcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCBcXFwiI0NDQ1xcXCJcIn0sXHJcblx0e2NvbG9yOiBcIiM4ODhcIn0sXHJcblx0e291dGxpbmU6IFwiMCBub25lXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjZweCAxMnB4XCJ9LFxyXG5cdHtoZWlnaHQ6IFwiMTYwcHggIWltcG9ydGFudFwifSxcclxuXHR7d2lkdGg6IFwiOTUlXCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtXZWJraXRCb3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtNb3pCb3JkZXJSYWRpdXM6IFwiNHB4XCJ9LFxyXG5cdHtmb250OiBcIm5vcm1hbCAxNHB4LzE0cHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn0sXHJcblx0e1dlYmtpdEJveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e2JveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e01vekJveFNoYWRvdzogXCJpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSlcIn0sXHJcblx0e2JhY2tncm91bmQ6IFwiI0ZGRiB1cmwoJ2Rvd24tYXJyb3cucG5nJykgbm8tcmVwZWF0IHJpZ2h0XCJ9LFxyXG5cdHthcHBlYXJhbmNlOiBcIm5vbmVcIn0sXHJcblx0e1dlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwifSxcclxuXHR7TW96QXBwZWFyYW5jZTogXCJub25lXCJ9LFxyXG5cdHt0ZXh0SW5kZW50OiBcIjAuMDFweFwifSxcclxuXHR7dGV4dE92ZXJmbG93OiBcIicnXCJ9XHJcbl07XHJcblxyXG4vLy5XS1NTIHRleHRhcmVhXHJcbncgPSBbXHJcblx0e2hlaWdodDogXCIxMDBweFwifVxyXG5dO1xyXG5cclxuLy8uV0tTUyBidXR0b24sIC5idXR0b25cclxudyA9IFtcclxuXHR7cG9zaXRpb246IFwicmVsYXRpdmVcIn0sXHJcblx0e2JhY2tncm91bmQ6IFwiI0ZGRlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjQ0NDXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjEwcHggMjVweCAxMHB4IDI1cHhcIn0sXHJcblx0e2NvbG9yOiBcIiMzMzNcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn0sXHJcblx0e2Rpc3BsYXk6IFwiaW5saW5lICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgYnV0dG9uOmRpc2FibGVkXHJcbncgPSBbXHJcblx0e2JhY2tncm91bmQ6IFwiI0VCRUJFQlwifSxcclxuXHR7Ym9yZGVyOiBcIjFweCBzb2xpZCAjQ0NDXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjEwcHggMjVweCAxMHB4IDI1cHhcIn0sXHJcblx0e2NvbG9yOiBcIiMzMzNcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCI0cHhcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgLmJ1dHRvbjpob3ZlciwgYnV0dG9uOmhvdmVyOmVuYWJsZWRcclxudyA9IFtcclxuXHR7Y29sb3I6IFwiIzMzM1wifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiNFQkVCRUJcIn0sXHJcblx0e2JvcmRlckNvbG9yOiBcIiNBREFEQURcIn1cclxuXTtcclxuXHJcbi8vLldLU1MgYnV0dG9uOmhvdmVyOmRpc2FibGVkXHJcbncgPSBbXHJcblx0e2N1cnNvcjogXCJkZWZhdWx0XCJ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXTtcclxuXHJcbi8vLmVycm9yXHJcbncgPSBbXHJcblx0e2JvcmRlckNvbG9yOlwiI0YwMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRjAwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmNhdXRpb25cclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiI0Y5MCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRjkwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmNvcnJlY3RcclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiIzBGMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjMEYwICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLmluZm9cclxudyA9IFtcclxuXHR7Ym9yZGVyQ29sb3I6IFwiIzY5Njk2OSAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjNjk2OTY5ICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLnJldi1lcnJvclxyXG53ID0gW1xyXG5cdHt0ZXh0U2hhZG93OiBcIm5vbmVcIn0sXHJcblx0e2JvcmRlcjogXCIxcHggc29saWQgI0YwMCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMTBweFwifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiNGMDBcIn0sXHJcblx0e3BhZGRpbmc6IFwiNHB4XCJ9LFxyXG5cdHttYXJnaW46IFwiNHB4XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGXCJ9LFxyXG5cdHtmb250OiBcIm5vcm1hbCAxOHB4IFxcXCLjg5Ljg6njgq7jg47op5LjgrQgUHJvIFczXFxcIiwgXFxcIkhpcmFnaW5vIEtha3UgR290aGljIFByb1xcXCIsT3Nha2EsIFxcXCLjg6HjgqTjg6rjgqpcXFwiLCBNZWlyeW8sIFxcXCLvvK3vvLMg77yw44K044K344OD44KvXFxcIiwgXFxcIk1TIFBHb3RoaWNcXFwiLCBzYW5zLXNlcmlmXCJ9XHJcbl07XHJcblxyXG4vLy5yZXYtY29ycmVjdFxyXG53ID0gW1xyXG5cdHt0ZXh0U2hhZG93Olwibm9uZVwifSxcclxuXHR7Ym9yZGVyOiBcIjFweFwifSxcclxuXHR7c29saWQ6IFwiIzA4OEEwOCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMTBweFwifSxcclxuXHR7YmFja2dyb3VuZENvbG9yOiBcIiMwODhBMDhcIn0sXHJcblx0e3BhZGRpbmc6IFwiNHB4XCJ9LFxyXG5cdHttYXJnaW46XCI0cHhcIn0sXHJcblx0e2NvbG9yOiBcIiNGRkZGRkZcIn0sXHJcblx0e2ZvbnQ6IFwibm9ybWFsIDE4cHggXFxcIuODkuODqeOCruODjuinkuOCtCBQcm8gVzNcXFwiLCBcXFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvXFxcIixPc2FrYSwgXFxcIuODoeOCpOODquOCqlxcXCIsIE1laXJ5bywgXFxcIu+8re+8syDvvLDjgrTjgrfjg4Pjgq9cXFwiLCBcXFwiTVMgUEdvdGhpY1xcXCIsIHNhbnMtc2VyaWZcIn1cclxuXTtcclxuXHJcbi8vI2FkZFxyXG53ID0gW1xyXG5cdHt3aWR0aDogd2luZG93Q29uZmlnLmFkZC53aWR0aH0sXHJcblx0e2hlaWdodDogd2luZG93Q29uZmlnLmFkZC5oZWlnaHR9LFxyXG5cdHttYXJnaW5MZWZ0OiAtd2luZG93Q29uZmlnLmFkZC53aWR0aC8yfVxyXG5dO1xyXG5cclxuLy8jZXhwb3J0LCAjaW1wb3J0XHJcbncgPSBbXHJcbntiYWNrZ3JvdW5kOiBcIiNmZmZcIn0sXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LndpZHRofSxcclxuXHR7aGVpZ2h0OiB3aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LmhlaWdodH0sXHJcblx0e21hcmdpbkxlZnQ6IC13aW5kb3dDb25maWcuZXhwb3J0SW1wb3J0LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNlZGl0XHJcbncgPSBbXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuZWRpdC53aWR0aH0sXHJcblx0e2hlaWdodDogd2luZG93Q29uZmlnLmVkaXQuaGVpZ2h0fSxcclxuXHR7bWFyZ2luTGVmdDogLXdpbmRvd0NvbmZpZy5lZGl0LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNzZWxmc3R1ZHlcclxudyA9IFtcclxuXHR7bGVmdDogXCI1MCVcIn0sXHJcblx0e3dpZHRoOiB3aW5kb3dDb25maWcuc3R1ZHkud2lkdGh9LFxyXG5cdHtoZWlnaHQ6IHdpbmRvd0NvbmZpZy5zdHVkeS5oZWlnaHR9LFxyXG5cdHttYXJnaW5MZWZ0OiAtd2luZG93Q29uZmlnLnN0dWR5LndpZHRoLzJ9XHJcbl07XHJcblxyXG4vLyNyZXN1bHR3aW5kb3dcclxudyA9IFtcclxuXHR7bGVmdDpcIjUwJVwifSxcclxuXHR7d2lkdGg6IHdpbmRvd0NvbmZpZy5yZXN1bHQud2lkdGggKyBcInB4XCJ9LFxyXG5cdHtoZWlnaHQ6IHdpbmRvd0NvbmZpZy5yZXN1bHQuaGVpZ2h0ICsgXCJweFwifSxcclxuXHR7bWFyZ2luTGVmdDogLXdpbmRvd0NvbmZpZy5yZXN1bHQud2lkdGgvMiArIFwicHhcIn1cclxuXTtcclxuXHJcbi8vI0F1ZGlvQnV0dG9uXHJcbncgPSBbXHJcblx0e21hcmdpblRvcDogXCIzNXB4XCJ9LFxyXG5cdHtwb3NpdGlvbjogXCJyZWxhdGl2ZVwifSxcclxuXHR7ZGlzcGxheTogXCJpbmxpbmUgIWltcG9ydGFudFwifSxcclxuXHR7V2Via2l0TWFyZ2luQmVmb3JlOiBcIjUwcHhcIn1cclxuXTtcclxuXHJcbi8vYnV0dG9uLndrc3MtY2xvc2VcclxudyA9IFtcclxuXHR7ZmxvYXQ6IFwicmlnaHRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjZmY0MDQwXCJ9LFxyXG5cdHtjb2xvcjogXCIjZmZmXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjBweFwifSxcclxuXHR7aGVpZ2h0OiBcIjI3cHhcIn0sXHJcblx0e3dpZHRoOiBcIjI3cHhcIn1cclxuXTtcclxuXHJcbi8vI3drc3MtY2xvc2VcclxudyA9IFtcclxuXHR7ZmxvYXQ6IFwicmlnaHRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjZmY0MDQwXCJ9LFxyXG5cdHtjb2xvcjogXCIjZmZmXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjBweFwifSxcclxuXHR7aGVpZ2h0OiBcIjI3cHhcIn0sXHJcblx0e3dpZHRoOiBcIjI3cHhcIn1cclxuXTtcclxuXHJcbi8vI3drc3Mta2FuamksICNyZXYta2FuamlcclxudyA9IFtcclxuXHR7dGV4dEFsaWduOiBcImNlbnRlciAhaW1wb3J0YW50XCJ9LFxyXG5cdHtmb250U2l6ZTogXCI1MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2JhY2tncm91bmRDb2xvcjogXCIjOTQwMEQzICFpbXBvcnRhbnRcIn0sXHJcblx0e2NvbG9yOiBcIiNGRkZGRkYgIWltcG9ydGFudFwifSxcclxuXHR7Ym9yZGVyUmFkaXVzOiBcIjEwcHggMTBweCAwcHggMHB4XCJ9XHJcbl07XHJcblxyXG4vLyN3a3NzLXNvbHV0aW9uLCAjcmV2LXNvbHV0aW9uXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMzBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGXCJ9LFxyXG5cdHtwYWRkaW5nOiBcIjJweFwifVxyXG5dO1xyXG5cclxuLy8jd2tzcy10eXBlXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMjRweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzY5Njk2OVwifSxcclxuXHR7Y29sb3I6IFwiI0ZGRkZGRiAhaW1wb3J0YW50XCJ9LFxyXG5cdHtib3JkZXJSYWRpdXM6IFwiMHB4IDBweCAxMHB4IDEwcHhcIn1cclxuXTtcclxuXHJcbi8vI3Jldi10eXBlXHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiMjRweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtjb2xvcjogXCIjRkZGRkZGICFpbXBvcnRhbnRcIn0sXHJcblx0e2JvcmRlclJhZGl1czogXCIwcHggMHB4IDEwcHggMTBweFwifVxyXG5dO1xyXG4vLyN3a3NzLWlucHV0XHJcbncgPSBbXHJcblx0e3RleHRBbGlnbjogXCJjZW50ZXIgIWltcG9ydGFudFwifSxcclxuXHR7Zm9udFNpemU6IFwiNDBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtoZWlnaHQ6IFwiODBweCAhaW1wb3J0YW50XCJ9LFxyXG5cdHtsaW5lSGVpZ2h0OiBcIm5vcm1hbCAhaW1wb3J0YW50XCJ9XHJcbl07XHJcblxyXG4vLyNyZXYtaW5wdXRcclxudyA9IFtcclxuXHR7dGV4dEFsaWduOiBcImNlbnRlciAhaW1wb3J0YW50XCJ9LFxyXG5cdHtmb250U2l6ZTogXCI0MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2hlaWdodDogXCI2MHB4ICFpbXBvcnRhbnRcIn0sXHJcblx0e2xpbmVIZWlnaHQ6IFwibm9ybWFsICFpbXBvcnRhbnRcIn1cclxuXTtcclxuXHJcbi8vLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzV0tTUztcclxuLy9tb2R1bGUuZXhwb3J0cyA9IHdrc3R5bGVDU1M7Il19
