var StorageUtil = require('./storageutil.js');
var ObjectUtil = require('./objectutil.js');
var SettingsUtil = require('./settingsutil.js');

//Constructors
var Rev_Item = require('./revitem.js');

/** Prepare Reviews and put them into storage.
*/
var SetReviewsUtil = {
	reviewActive: false,
	
	endReviewSession: function () {
		document.getElementById('selfStudyForm').reset();
		this.reviewActive = false;
	},
	generateReviewList: function(evt) {
		//don't ]interfere with an active session
		
		if (this.reviewActive){
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
			var now = Date.now();

			//for each vocab in storage, get the amount of time vocab has lived
			vocabList.forEach(function(task, i){
				var due = task.date + SettingsUtil.srsObject[task.level].duration;

				// if item is unlocked and unburned
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
	},

	importItemsHandler: function() {
		var impt = document.getElementById("importArea").value;
        if (impt.length !== 0) {
            try {
                var add = JSON.parse(impt.toLowerCase());
                if (setReviewsUtil.checkAdd(add)) {
                    document.getElementById("importStatus").appendChild(document.createTextNode("No valid input (duplicates?)!"));
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
                console.log(e);
            }

        }
        else {
            $("#importStatus").text("Nothing to import :( Please paste your stuff first");
        }
    },
	/** Takes a JSON object (parsed from import window) and checks with stored items for any duplicates
	* @returns {boolean} True if each item in 'add' array is valid and at least one of them already exists in storage
	*/
	checkAdd: function(add) {
        var i = add.length;
        if(localStorage.getItem('User-Vocab')) {    
            var vocabList = StorageUtil.getVocList();
            while(i--){
                if (ObjectUtil.isItemValid(add[i]) &&
                    setReviewsUtil.checkForDuplicates(vocabList,add[i]))
                    return true;
            }
        }
        return false;
    },
	editSaveHandler: function () {
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

                if (ObjectUtil.isItemValid(item) &&//item is valid
                    !(SetReviewsUtil.checkForDuplicates(fullList,item) && //kanji (if changed) is not already in the list
                      fullList[index].kanji !== item.kanji)) {//unless it is the item being edited

                    var srslist = StorageUtil.getVocList().reverse();
                    //get srs components of item(list)
                    fullList[index] = item;//does not have srs stuff, re-add it now

                    fullList[index].date = srslist[index].date;
                    fullList[index].level = srslist[index].level;
                    fullList[index].locked = srslist[index].locked;
                    fullList[index].manualLock = srslist[index].manualLock;

                    fullList = fullList.reverse(); //reset order of array

                    StorageUtil.localSet('User-Vocab', fullList);

                    editWindowInst.generateEditOptions();
                    $("#editStatus").html('Saved changes!');
                    document.getElementById("editItem").value = "";
                    document.getElementById("editItem").name = "";
				}
				else{
                    $("#editStatus").text('Invalid item or duplicate!');
                    alert(ObjectUtil.isItemValid(item).toString() +" && ！("+ SetReviewsUtil.checkForDuplicates(fullList,item).toString()+" && !("+fullList[index].kanji+" !== "+item.kanji+")");
                }
			}
		}
		catch (e) {
			$("#editStatus").text(e);
		}
    },
	/** Checks if an item's kanji is represented in a list
	* @returns {boolean}
	*/
    checkForDuplicates: function(list, item){
		return list.some(function(a){return a.kanji === item.kanji;});
	},
	/** Sets the locks on all Tasks in storage
	*/
	refreshLocks: function(){
		var vocList = StorageUtil.getVocList().map(function(vocItem){
			console.log("vocList[i] = setLocks(vocList[i]);");
			vocItem = this.setLocks(vocItem);  
			return vocItem;
		}, this);
		console.groupEnd();
		StorageUtil.setVocList(vocList);
    },
	/** Creates a lookup array for each kanji with its srs level. Used for displaying component levels.
	* @param item
	* @param kanjilist
	* @returns An array of the kanji with SRS values for each kanji component.
	* @example
        eg. 折り紙:
        compSRS = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]
	*/
	getCompKanji: function(item, kanjiList){
		kanjiList = kanjiList || [];
		var GUPPY_LIMIT = 100;

        var kanjiReady = false; //indicates if the kanjiList has been populated
        var userGuppy = false; //indicates if kanjiList has less than 100 items
        var kanjiObj = {};

        //has the server responded yet
        if (kanjiList.length > 0){
            console.log("kanjiList is > 0");
            kanjiReady = true;
			//is there less than 100 kanji in the response
            if (kanjiList.length < GUPPY_LIMIT){
                console.log("kanjiList is < " + GUPPY_LIMIT);
                userGuppy = true;
            }
            //create lookup object
			kanjiList.forEach(function(kanji){
				kanjiObj[kanji.character] = kanji;
            }, this);
        }

        var components = item.components;
		var compSRS = components.map(function(component){
            var matched = false;

            //if the character in the item exists in the kanjiObj index sourced from server
			if (kanjiObj[component] !== void 0){ //match found
				return {
					kanji: component,
					srs: kanjiObj[component].srs
				};
			}
			else { // character was not in the kanjiObj index
                if (kanjiReady){ //was there a server response?
                    if (userGuppy){ //is the user a guppy (kanji probably matches a turtles response)
                        console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        return {
							kanji: component,
							srs: "noMatchGuppy"
						};
                    }
					else{ //user is a turtle, kanji must not have been added to WK (yet)
                        console.log("matched=false, kanjiList.length: "+kanjiList.length);
                        return {
							kanji: component,
							srs: "noMatchWK"
						};
                    }
                }
				else{
                    // No server response
					return {
						kanji: component,
						srs: "noServerResp"
					};
                }
            }
        }, this);
        return compSRS;
    },

	isKanjiLocked: function(srsitem, kanjiList, locksOn){
		// Enumeration "yes", "no", "DB"
        var locked = "no";
        if (locksOn){
			// "yes":	item will be locked while there is no database connection.
			//			if the server response indicates that it has been unlocked, only then will it be available for review
			
			// Kanji with these levels will be locked
			var lockedSrsLevels = ["apprentice", "noServerResp", "unreached"];
			// Task is unlocked by default, Check locks on each Kanji encountered
            var componentList = this.getCompKanji(srsitem, kanjiList);
            // eg: componentList = getCompKanji("折り紙", kanjiList);
            // componentList = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]
            var isLocked = componentList.some(function(component){
                //look for locked kanji in list
                if (component.srs == "apprentice" ||
                    component.srs == "noServerResp"||
                    component.srs == "unreached"
                   ){
                    locked = "yes";
					return true; // Ends 'some' loop, locked kanji overrides everything.
                }
				//DB locks get special state
                else if (component.srs == "noMatchWK" ||
					component.srs == "noMatchGuppy"){
                    locked = "DB";
                    //"DB"	: database limitations.
                    // Kanji was not found, either user is Guppy, or WK doesn't have it.
					return false;
                }
			}, this);
        }
        //locked will be either "yes","no", or "DB"
        return locked;
    },
    /** Manages the locked and manualLock properties of srsitem. This is to stop items being locked again after they have been unlocked if any of the kanji used falls below the unlock threshold (eg. if the 勉 in 勉強 falls back to apprentice, we do not want to lock up 勉強 again.)
	* @param {Object} item
	* @param {string} item.locked - (String enumeration) A real time evaluation of the item (is any of the kanji in the word locked?)
	* @param {string} item.manualLock - (String enumeration) Will return 'no' if .locked has ever returned 'no'.
	* @returns {ITask} item
	*/
    setLocks: function(item, kanjiList){
        //once manualLock is "no" it stays "no". Only run this if it is true, "yes" or "DB"
        if (item.manualLock !== false && item.manualLock !== "no" && item.manualLock !== "n"){

            kanjiList = kanjiList||[];

            item.components = ObjectUtil.getComponents(item.kanji);

            item.locked = this.isKanjiLocked(item, kanjiList, SettingsUtil.LOCKS_ENABLED);

            item.manualLock = item.locked !== "no"; //cast manualLock to boolean
        }else{
            item.manualLock = false;
        }

        console.log("setting locks for "+ item.kanji +": locked: "+item.locked+", manualLock: "+ item.manualLock);
		
		//phase out manualLock
		item.achieved = item.manualLock;

        return item;
    },

	/**
	*/
	setVocItem: function(item){
        //Assumption: item comes only with kanji, reading and meaning
        item.level = 0;
        item.date = Date.now();
        item.manualLock = "";
		var kanjiList = StorageUtil.localGet('User-KanjiList');
        item = this.setLocks(item, kanjiList);
		 //0.1.9 adding in 'due' property to make review building simpler
        item.due = item.date + SettingsUtil.srsObject[item.level].duration;

        var vocList = StorageUtil.getVocList();

		var found = vocList.find(function(task){
            return task.kanji === item.kanji;
        }, this);
		
        if (!found) {
            //provide index for faster searches
            console.log(item.kanji +" not found in vocablist, adding now");
            item.i = vocList.length;
			vocList.push(item);

            StorageUtil.localSet('User-Vocab',vocList);
        }
    }
};

module.exports = SetReviewsUtil;