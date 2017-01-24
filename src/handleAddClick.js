var StorageUtil = require('./storageutil.js');
var SetReviewsUtil = require('./setreviewsutil.js');
var WanikaniDomUtil = require('./wanikanidomutil.js');
module.exports = function(){

	var kanji = document.getElementById("addKanji").value.toLowerCase();
	var reading = document.getElementById("addReading").value.toLowerCase().split(/[,、]+\s*/); //split at , or 、followed by 0 or any number of spaces
	var meaning = document.getElementById("addMeaning").value.toLowerCase().split(/[,、]+\s*/);
	var success = false; //initalise values
	var meanlen = 0;

	var i = meaning.length;
	while (i--){
		meanlen += meaning[i].length;
	}

	//input is invalid: prompt user for valid input
	var item = {};
	if (kanji.length === 0 || meanlen === 0) {
		document.getElementById("addStatus").innerText = "One or more required fields are empty!";
		if (kanji.length === 0) {
			WanikaniDomUtil.addClass(document.getElementById("addKanji"), "error");
		}
		else {
			WanikaniDomUtil.removeClass(document.getElementById("addKanji"), "error");
		}

		if (meanlen === 0) {
			WanikaniDomUtil.addClass(document.getElementById("addMeaning"), "error");
		}
		else {
			WanikaniDomUtil.removeClass(document.getElementById("addMeaning"), "error");
		}
	}
	else {
		console.log("building item: "+kanji);
		item.kanji = kanji;
		item.reading = reading; //optional
		item.meaning = meaning;

		success = true;
		console.log("item is valid");
	}

	//on successful creation of item
	if (success) {
		//clear error layout to required fields
		WanikaniDomUtil.removeClass(document.getElementById("addKanji"), "error");
		WanikaniDomUtil.removeClass(document.getElementById("addMeaning"), "error");

		//if there are already user items, retrieve vocabList
		var vocabList = StorageUtil.getVocList();

		console.log("vocabList retrieved, length: "+vocabList.length);
		//check stored user items for duplicates ****************** to do: option for editing duplicate item with new input
		if(SetReviewsUtil.checkForDuplicates(vocabList,item)) {
			document.getElementById("addStatus").innerText = "Duplicate Item detected!";
			WanikaniDomUtil.removeClass(document.getElementById("addKanji"), "error");
			return;
		}

		SetReviewsUtil.setVocItem(item);

		console.log("clear form");
		document.getElementById("addForm").reset();

		//--------------------------------------------------------------------------------------------------------
		if (item.manualLock === "yes" || item.manualLock === "DB" && lockDB){
			document.getElementById("addStatus").innerHTML = "<i class=\"icon-lock\"></i> Added locked item";
		}
		else {
			document.getElementById("addStatus").innerHTML = "<i class=\"icon-unlock\"></i>Added successfully";
		}
		//--------------------------------------------------------------------------------------------------------
	}
};