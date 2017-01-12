var StorageUtil = require('./storageutil.js');
var ObjectUtil = require('./objectutil.js');
var SettingsUtil = require('./settingsutil.js');

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
	* @param {Array.<Task>} completedReviews
	*/
    showResults: function(completedReviews) {

        console.log("completedReviews", completedReviews);
        
		completedReviews.forEach(function(stats, i, statsList){
            console.log("stats",stats);
            var altText = stats.level;//+stats.type;

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
            statsList[i] = MarkingUtil.updateSRS(stats);

        }, this);
        StorageUtil.localSet("User-Stats",completedReviews);
    },
	startReview: function() {
        console.log("startReview()");
        submit = true;
        reviewActive = true;
        //get the review 'list' from session storage, line up the first item in queue
        var reviewList = StorageUtil.localGet('User-Review')||[];
        MarkingUtil.nextReview(reviewList);
    },

	// Should be in SetReviewsUtil?
	nextReview: function(reviewList) {
        //sets up the next item for review
        //uses functions:
        //    wanakana.bind/unbind

        var rnd = Math.floor(Math.random()*reviewList.length);
        var item = reviewList[rnd];
        StorageUtil.localSet('WKSS-item', item);
        StorageUtil.localSet('WKSS-rnd', rnd);
		
		MarkingUtil.setTask(item);
		
    //    playAudio();
    },
	/** Populate the review window with the given task
	*/
	setTask: function(item){
		var statsList = StorageUtil.localGet('User-Stats');
        if (statsList){
            $("#RevNum").innerHtml = statsList.length;
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
	},
	markAnswer: function(item) {
        //evaluate 'item' against the question.
        // match by index
        // get type of question
        // determine if right or wrong and return result appropriately

        //get the question
        //var prompt = document.getElementById('rev-kanji').innerHTML.trim();
        //get the answer
        var answer = document.getElementById("rev-input").value.toLowerCase();
        //get the index
        var index = document.getElementById('rev-index').innerHTML.trim();
        //get the question type
        var type  = document.getElementById('rev-type').innerHTML.trim();

        //var vocab = localGet("User-Vocab");

        //get the item if it is in the current session
        var storedItem = StorageUtil.localGet(item.index);
        if (storedItem){
            item.numCorrect = storedItem.numCorrect;
            item.numWrong = storedItem.numWrong;
        }

        if (index == item.index){//-------------
            if (MarkingUtil.inputCorrect()){
                console.log(answer+"/"+item.solution[0]);
                if (!item.numCorrect){
                    console.log("initialising numCorrect");
                    item.numCorrect={};
                }

                console.log("Correct: "+ type);
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

            }
			else{
                console.log(answer+"!="+item.solution);
                if (!item.numWrong){
                    console.log("initialising numCorrect");
                    item.numWrong={};
                }

                console.log("Wrong: "+ type);
                switch (type){
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
    },
	/**
	* @param {Array.<Task>}
	* @param {Task}
	* @param {number}
	* @param {string}
	*/
	submitAnswer: function(reviewList, item, rnd, input, statsList){
		//was the input correct?
		var correct = MarkingUtil.inputCorrect(input);

		//was the input forgiven?
		var forgiven = (item.forgive.indexOf(input) !== -1);

		//handle grading and storing solution

		//disable input after submission
		//document.getElementById('rev-input').disabled = true;

		
		
		//remove from sessionList if correct
		if (correct) {
			//highlight in (default) green
			$("#rev-input").addClass("correct");
			//show answer
			$("#rev-solution").addClass("info");

			console.log("correct answer");
			if (reviewList !== null){
				var oldlen = reviewList.length;

				reviewList.splice(rnd, 1);
				console.log("sessionList.length: "+ oldlen +" -> "+reviewList.length);

				//replace shorter (by one) sessionList to session
				if (reviewList.length !== 0) {
					console.log("reviewList.length: "+ reviewList.length);
					StorageUtil.localSet('User-Review', reviewList);
				}
				else {
					//reveiw over, delete sessionlist from session
					StorageUtil.localRemove('User-Review');
				}
			}else{
				console.error("Error: no review session found");
			}
		}
		else if (forgiven){
			$("#rev-input").addClass("caution");
			//     console.log(input +" has been forgiven. "+item.type);
			//   return;
		}
		else{
			//highight in red
			$("#rev-input").addClass("error");
			//show answer
			$("#rev-solution").addClass("info");
			console.log("wrong answer");
		}

		item = MarkingUtil.markAnswer(item);

		StorageUtil.localSet(item.index, item);


		var found = false;

		if (statsList){
			//statsList.forEach(function(v, i, statsList){
			var i = statsList.length;
			while(i--){
				if (statsList[i].index == item.index) {
					statsList[i] = item;								//replace item if it exists
					found = true;
				}
			}
			if(found){
				statsList = ObjectUtil.saveToSortedList(statsList,item);
			}

		}
		else {
			statsList = [item];
		}

		StorageUtil.localSet("User-Stats", JSON.stringify(statsList));
		//playAudio();

		//answer submitted, next 'enter' proceeds with script
		submit = false;
	},
	reviewKeyUpHandler: function (evt) {
		//check if key press was 'enter' (keyCode 13) on the way up
		//and keystate true (answer being submitted)
		//and cursor is focused in reviewfield
		if (evt.keyCode == 13){
			var reviewList = StorageUtil.localGet('User-Review')||[];
			var statsList = StorageUtil.localGet("User-Stats")||[];
			statsList = statsList.filter(function(item) {return item;});
		
			if (submit) {
				var input = $("#rev-input").val().trim();
				//check for input, do nothing if none
				if(input.length === 0){
					return;
				}

				var rnd = StorageUtil.localGet('WKSS-rnd')||0;

				var item = StorageUtil.localGet('WKSS-item');

				//-- starting implementation of forgiveness protocol
				item.forgive = [];//"ゆるす"]; //placeholder (許す to forgive)
				
				// reviewList[rnd] === item
				if (item === null){
					//take the item out of the review
					reviewList.splice(rnd, 1);
				}
				else{
					MarkingUtil.submitAnswer(reviewList, item, rnd, input, statsList);
				}
			}
			else {
				console.log("keystat = " + submit);

				//there are still more reviews in session?
				if (reviewList.length === 0 && StorageUtil.localGet('User-Review')) {
					setTimeout(function () {
						console.groupCollapsed("%cReview session over, Timeout function showing results: [", "color:#889944");
						console.info("arguments", arguments);
						//Repopulate reviewList
						reviewList = StorageUtil.localGet('User-Review')||[];

						//cue up first remaining review
						MarkingUtil.nextReview(reviewList);
//----
						if (reviewList.length === 0){
							StorageUtil.localRemove("User-Review");
						}

						//         document.getElementById('rev-input').disabled = true;
						$("#rev-solution").removeClass("info");
						$("#WKSS-selfstudy").hide().fadeIn('fast');
						console.groupEnd();
						console.log("%c]", "color:#889944");
					}, 1);
				}
				else {
					// no review stored in session, review is over
					setTimeout(function (evt) {
						console.groupCollapsed("Review session over, Timeout function showing results: [");
						console.info("arguments", arguments);
						$("#WKSS-selfstudy").hide();
						//document.getElementById('rev-input').disabled = false;
						$("#rev-solution").removeClass("info");
						console.log("showResults");
						
						var statsList = StorageUtil.localGet('User-Stats')||[];
						sessionStorage.clear();

						MarkingUtil.showResults(statsList);
						
						$("#WKSS-resultwindow").show();
						console.log("showResults completed");

						//*/  //clear session
						sessionStorage.clear();
						reviewActive = false;
						console.groupEnd();
						console.log("]");
					}, 1);
				}
				submit = true;
			}
		}
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
        input = input || $("#rev-input").val().toLowerCase().trim();
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