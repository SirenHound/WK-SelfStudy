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
};