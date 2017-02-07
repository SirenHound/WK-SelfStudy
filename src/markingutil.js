var StorageUtil = require('./storageutil.js');
var ObjectUtil = require('./objectutil.js');
var SettingsUtil = require('./settingsutil.js');
var WanikaniDomUtil = require('./wanikanidomutil.js');
var SetReviewsUtil = require('./setreviewsutil.js');

var submit = true;
var MarkingUtil = {
	/** Updates the srs variables of a task
	* @param {Task} task
	* task.due
	* task.date
	* {Object} task.numWrong
	* {number} task.index
	*/
	updateSRS: function(task) {
        var now = Date.now();
        if (task.due < now){ //double check that the item was really up for review and hasn't found its way into the list from an old session or another tab.
            if(!task.numWrong && task.level < 9) {//all correct (none wrong)
                task.level++;
            }
            else {
                task.numWrong = {};
                //Adapted from WaniKani's srs to authentically mimic level downs
                var totalWrong = (task.numWrong.Meaning||0)+(task.numWrong.Reading||0)+(task.numWrong.Reverse||0);
                var t = task.level;
                var r= (t>=5? 2:1)*Math.round(totalWrong/2);
                var n=t-r<1?1:t-r;

                task.level = n;//don't stay on 'started'
            }
            task.date = now;
            task.levelStartDate = now;
            task.due = now + SettingsUtil.srsObject[task.level].duration;
            console.log("Next review in "+ObjectUtil.ms2str(SettingsUtil.srsObject[task.level].duration));
        }
		return task;
    },
	/** Display the results of the completed review in a popup.
	* @param {Array.<Item>} itemList built from completed reviews
	*/
	showResults: function (itemList) {
	    //TODO sort into apprentice, guru, etc

	    console.log("itemList", itemList);

        document.getElementById("stats-a").innerHTML =  ""; //should do this when closing //--

        itemList.forEach(function (item, i, itemList) {
            console.log("item", item);

            var altText = item.level + (item.numWrong ? (item.numWrong.Meaning ? " Meaning Wrong x" + item.numWrong.Meaning + "\n" : "") + (item.numWrong.Reading ? " Meaning Wrong x" + item.numWrong.Reading + "\n" : "") + (item.numWrong.Reverse ? " Meaning Wrong x" + item.numWrong.Reverse + "\n" : "") : "") +
            (item.numCorrect ? (item.numCorrect.Meaning ? " Meaning Correct x" + item.numCorrect.Meaning + "\n" : "") + (item.numCorrect.Reading ? " Meaning Correct x" + item.numCorrect.Reading + "\n" : "") + (item.numCorrect.Reverse ? " Meaning Correct x" + item.numCorrect.Reverse + "\n" : "") : "");

			document.getElementById("stats-a").innerHTML +=
				"<span class=" +
				(item.numWrong? "\"rev-error\"":"\"rev-correct\"") +
				" title='"+altText+"'>" + item.kanji + "</span>";
        }, this);
    },
	startReview: function() {
        console.log("startReview()");
	    //       var reviewList = StorageUtil.localGet('User-Review') || [];
        var reviewList = SetReviewsUtil.reviewList;
        if (reviewList.length) {

            Array.prototype.forEach.call(document.getElementsByClassName("WKSS"), function (el) { el.style.display = 'none'; });
            document.getElementById("WKSS-selfstudy").style.display = '';

            submit = true;
            reviewActive = true;
            //get the review 'list' from session storage, line up the first item in queue
            MarkingUtil.nextReview(reviewList);
        }
        else {
            console.log("No reviews available.");
        }
    },
    /** Sets up the next task for review
    * @param {Array.<Task>} reviewList - Array of review objects
    */
	nextReview: function(reviewList) {
        //sets up the next item for review
        //uses functions:
        //    wanakana.bind/unbind

        var rnd = Math.floor(Math.random()*reviewList.length);
		console.log("next random number", rnd);
        var task = reviewList[rnd];
		console.log("next item: ", task);
        //StorageUtil.localSet('WKSS-item', item);
        StorageUtil.localSet('WKSS-rnd', rnd);
		
		MarkingUtil.setTask(task);
		
    //    playAudio();
    },
	/** Populate the review window with the given task
	*/
	setTask: function(item){
	    var reviewList = SetReviewsUtil.reviewList;
		document.getElementById("RevNum").innerText = reviewList.length; // is this even used?
		
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
        WanikaniDomUtil.addClass(document.getElementById("rev-solution"), "info");
        document.getElementById('rev-solution').innerHTML = item.solution;
        document.getElementById('rev-index').innerHTML = item.index;

        //initialise the input field
        document.getElementById("rev-input").focus();
		WanikaniDomUtil.removeClass(document.getElementById("rev-input"), "caution");
		WanikaniDomUtil.removeClass(document.getElementById("rev-input"), "error");
        WanikaniDomUtil.removeClass(document.getElementById("rev-input"), "correct");
        document.getElementById("rev-input").value = "";

        //check for alphabet letters and decide to bind or unbind wanakana
        if (item.solution[0].match(/[a-zA-Z]+/i)) {
            wanakana.unbind(document.getElementById('rev-input'));
            document.getElementById("rev-input").setAttribute('placeholder','Your response');
            document.getElementById("rev-input").setAttribute('lang','en');
        }
        else {
            wanakana.bind(document.getElementById('rev-input'));
			document.getElementById("rev-input").setAttribute('placeholder','答え');
			document.getElementById("rev-input").setAttribute('lang','ja');
        }
	},
    /** Evaluates the input against the correct answers with some tolerance.
    * @param {Task} task - The task that forms the current query
    * @returns {Item} The item that the review relates to. 
    */
	markAnswer: function(task) {
        var answer = document.getElementById("rev-input").value.toLowerCase();
        //get the index
        var index = document.getElementById('rev-index').innerHTML.trim();
        //get the question type
        var type  = document.getElementById('rev-type').innerHTML.trim();

        //get the item if it is in the current session
        var item = StorageUtil.getVocList() && StorageUtil.getVocList()[task.index];
        if (item) {
            if (index == task.index) {//-------------
                if (MarkingUtil.inputCorrect()) {
                    console.log(answer + "/" + task.solution[0]);
                    if (!item.numCorrect) {
                        console.log("initialising numCorrect");
                        item.numCorrect = {};
                    }

                    console.log("Correct: " + type);
                    switch (type){
                        case "Meaning":
                            if (!item.numCorrect.Meaning)
                                item.numCorrect.Meaning = 0;

                            item.numCorrect.Meaning++;
                            break;
                    case "Reading":
                        if (!item.numCorrect.Reading)
                            item.numCorrect.Reading = 0;

                        item.numCorrect.Reading++;
                        break;
                    case "Reverse":
                        if (!item.numCorrect.Reverse)
                            item.numCorrect.Reverse = 0;

                        item.numCorrect.Reverse++;
                        break;
                    }

                }
                else {
                    console.log(answer + "!=" + task.solution);
                    if (!item.numWrong) {
                        console.log("initialising numCorrect");
                        item.numWrong = {};
                    }

                    console.log("Wrong: " + type);
                    switch (type) {
                        case "Meaning":
                            if (!item.numWrong.Meaning)
                                item.numWrong.Meaning = 0;
                            item.numWrong.Meaning++;
                            break;
                        case "Reading":
                            if (!item.numWrong.Reading)
                                item.numWrong.Reading = 0;

                            item.numWrong.Reading++;
                            break;
                        case "Reverse":
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
        }
	},
    localresults: [],
	/**
	* @param {Array.<Task>}
	* @param {string}
	*/
    submitAnswer: function (reviewList, input, localresults) {

        var rnd = StorageUtil.localGet('WKSS-rnd') || 0;

        var task = reviewList[rnd];
        //-- starting implementation of forgiveness protocol
        task.forgive = [];//"ゆるす"]; //placeholder (許す to forgive)

        console.log("submit answer task", task);
        var vocList = StorageUtil.getVocList();
        var item = vocList[task.index];
        console.log("submit answer vocList, item", vocList, item);

		//was the input correct?
		var correct = MarkingUtil.inputCorrect(input);
		
		//was the input forgiven?
		var forgiven = (task.forgive.indexOf(input) !== -1);

		//disable input after submission
		//document.getElementById('rev-input').disabled = true;

		if (correct) {
			//highlight in (default) green
			WanikaniDomUtil.addClass(document.getElementById("rev-input"), "correct");
			//show answer
			WanikaniDomUtil.addClass(document.getElementById("rev-solution"), "info");

			console.log("correct answer");
			if (reviewList !== null){
				var oldlen = reviewList.length;

				//save the result 
				//var results = StorageUtil.localGet("User-Stats")||[];
				//results.push(item);
				localresults.push(item);
				
				
				//--
				//StorageUtil.localSet("User-Stats", results);
				reviewList.splice(rnd, 1);

				//replace shorter (by one) reviewList to session
				if (reviewList.length !== 0) {
					console.info("reviewList.length: "+ reviewList.length);
				    //					StorageUtil.localSet('User-Review', reviewList);
                    SetReviewsUtil.reviewList = reviewList;
				}
				else {
					//reveiw over, delete sessionlist from session
					StorageUtil.localRemove('User-Review');
				}
			}
			else{
				console.error("Error: no review session found");
			}
		}
		else if (forgiven){
			WanikaniDomUtil.addClass(document.getElementById("rev-input"), "caution");
		     console.log(input +" has been forgiven. "+item.type);
			//   return;
		}
		else{
			//highight in red
			WanikaniDomUtil.addClass(document.getElementById("rev-input"), "error");
			//show answer
			WanikaniDomUtil.addClass(document.getElementById("rev-solution"), "info");
			console.log("wrong answer");
		}

		item = MarkingUtil.markAnswer(task);
		console.warn("this should be an item not a task", item);
		//StorageUtil.localSet(item.i, item); // (reviews are stored by revindex, will clash)
		//playAudio();

		//answer submitted, next 'enter' proceeds with script
		submit = false;
		vocList[task.index] = item;
		return vocList;
		//return localresults;
	},
	reviewKeyUpHandler: function (evt) {
		//check if key press was 'enter' (keyCode 13) on the way up
		//and keystate true (answer being submitted)
		//and cursor is focused in reviewfield
	    var reviewList = SetReviewsUtil.reviewList;// StorageUtil.localGet('User-Review')||[];
		//var localresults = [];
		console.log("reviewList (keyuphandler) types", reviewList.map(function(a){return a.type;}));
		// No nulls or undefineds thanks
	    //reviewList = reviewList.filter(function(item) {return item;});
		var localResults;
		if (evt.keyCode == 13){
			if (submit) {
				console.group("Answer being submitted.");
				var input = document.getElementById("rev-input").value.trim();
				//check for input, do nothing if none
				if(input.length === 0){
					console.log("input was empty, abort submission");
					console.groupEnd();
					return;
				}

				
				console.log("input:", input);
				MarkingUtil.localresults = MarkingUtil.submitAnswer(reviewList, input, MarkingUtil.localresults);
				console.groupEnd();
				
			}
			else {
				console.log("keystat = " + submit);

				//there are still more reviews in session?
				if (reviewList.length !== 0) {
					//setTimeout(function () {
						console.groupCollapsed("%cReview session continues...[", "color:#889944");

						//cue up first remaining review
						submit = true;
						MarkingUtil.nextReview(reviewList);

						//         document.getElementById('rev-input').disabled = true;
						WanikaniDomUtil.removeClass(document.getElementById("rev-solution"), "info");
						document.getElementById("WKSS-selfstudy").style.display = '';//.fadeIn('fast');
						console.groupEnd();
						console.log("%c]", "color:#889944");
					//}, 1);
				}
				else {
				    MarkingUtil.endReview(MarkingUtil.localresults);
				}
			}
		}
	},
	endReview: function(resultItems){
	    // no review stored in session, review is over
	    //					setTimeout(function (evt) {
	    console.groupCollapsed("Review session over, Function showing results: [");
	    document.getElementById("WKSS-selfstudy").style.display = 'none';
						
	    StorageUtil.localRemove("User-Review");
						
	    //document.getElementById('rev-input').disabled = false;
	    WanikaniDomUtil.removeClass(document.getElementById("rev-solution"), "info");
	    
	    var itemList = resultItems.map(function (item) {
	        return MarkingUtil.updateSRS(item);
	    }, this);
	    StorageUtil.setVocList(itemList);
	    MarkingUtil.showResults(itemList);

	    document.getElementById("WKSS-resultwindow").style.display = '';
	    console.log("showResults completed");

        //clear session
	    MarkingUtil.localresults = [];
	    reviewActive = false;
	    console.groupEnd();
	    console.log("]");
	  
	},
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
	/** Compares input to solutions to see if it is correct or close enough.
	*/
	inputCorrect: function(input, solution) {
        input = input || document.getElementById("rev-input").value.toLowerCase().trim();
        solution = solution || document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/);
        var correctCharCount = 0;
        var returnvalue = false;

        console.log("Input: " + input);

        var append = this.unbracketSolution(solution);
        solution = solution.concat(append);
        var i = solution.length;
        while(i--){

            var threshold = 0;//how many characters can be wrong
            if(document.getElementById('rev-type').innerHTML == "Meaning") {
                threshold = Math.floor(solution[i].length / SettingsUtil.ERROR_ALLOWANCE);
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
    }
};

module.exports = MarkingUtil;