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