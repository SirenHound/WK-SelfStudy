var StorageUtil = require('./storageutil.js');
var ObjectUtil = require('./objectutil.js');
var SettingsUtil = require('./settingsutil.js');
var EditWindowFunctions = {
	//get handle for 'select' area
	getEditOptionsElement: function(){
		return document.getElementById("editWindow");
	},
	//get handle for 'status' area
	getEditStatusElement: function(){
		return document.getElementById("editStatus");
	},
	
	/** Resets the levels of all tasks and re-indexes them in storage.
	* @param {Event} evt - Click event (not used)
	*/
	resetLevels: function (evt) {
		var vocList = StorageUtil.getVocList().map(function(vocItem, i){
			vocItem.level = 0;
			console.log("vocList[i].i before: "+vocItem.i);
			vocItem.i=i;
			console.log("vocList[i].i after: "+vocItem.i);
			return vocItem;
		}, this);
		StorageUtil.setVocList(vocList);
    },
	editEditHandler: function (evt) {
		EditWindowFunctions._optionsElement = EditWindowFunctions._optionsElement || EditWindowFunctions.getEditOptionsElement();
        //get the index for the currently selected item
        var index = EditWindowFunctions._optionsElement.selectedIndex;
		var vocabList = StorageUtil.getVocList();
        vocabList = vocabList.reverse();
        EditWindowFunctions._optionsElement.value = JSON.stringify(vocabList[index]);
        EditWindowFunctions._optionsElement.name = index; //using name to save the index
      //  EditWindowFunctions._getEditStatusElement().textContent = 'Loaded item to edit';
    },
    /** Retrieves values from storage to populate 'editItems' menu
	*/
    generateEditOptions: function() {
        var select = document.getElementById('editWindow');
        //clear the editWindow
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
		//retrieve from local storage
		var vocabList = StorageUtil.getVocList();
		
		var options = vocabList.map(function(task){
			//form element to save string
			var opt = document.createElement('option');

			//when is this item up for review
			var due = task.due||task.date + srsObject[task.level].duration;
			
			var review = task.level >= 9 ? "Never" : Date.now() >= due ? "Now" : ObjectUtil.ms2str(due - Date.now());

			var text = task.kanji + " & " +
				task.reading + " & " +
				task.meaning + " (" +
				SettingsUtil.srsObject[task.level].rank +
				" - Review: " +
				review + ") Locked: " +
				task.manualLock;

			opt.value = task.i;
			opt.innerHTML = text;
			return opt;//for future use (sorting data etc)
		}, this);
		options.forEach(function(opt){
			select.appendChild(opt);//export item to option menu
		},this);
    },
	updateEditGUI: function(){
        EditWindowFunctions.generateEditOptions();
        document.getElementById("editItem").value = "";
        document.getElementById("editItem").name = "";
    },
	editDeleteAll: function () {
        var deleteAll = confirm("Are you sure you want to delete all entries?");
        if (deleteAll) {
            //drop local storage
            localStorage.removeItem('User-Vocab');
            EditWindowFunctions.updateEditGUI();
            $("#editStatus").text('All items deleted!');
        }
    },
	editDelete: function () {
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
            StorageUtil.localSet('User-Vocab', vocabList);
        }
        else {
            localStorage.removeItem('User-Vocab');
        }

        EditWindowFunctions.updateEditGUI();

        $("#editStatus").text('Item deleted!');
    }
};

module.exports = EditWindowFunctions;