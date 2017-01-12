var ObjectUtil = require('./objectutil.js');
var StorageUtil = require('./storageutil.js');
var ServerUtil = require('./serverutil.js');
var SetReviewsUtil = require('./setreviewsutil.js');
/** Utilities for interaction with the Wanikani API and general website.
*/
var WanikaniUtil = {
	//take out of here soon!
	//Called by reference to xhrk
	onStateChangeHandler: function() {
		if (this.readyState == 4){
			var kanjiList = WanikaniUtil.handleReadyStateFour(this, this.requestedItem);

			if (this.requestedItem === 'kanji'){
				StorageUtil.localSet('User-KanjiList', kanjiList);
				console.log("kanjiList from server", kanjiList);
				//update locks in localStorage 
				//pass kanjilist into this function
				//(don't shift things through storage unecessarily)
//--
				SetReviewsUtil.refreshLocks();
			}
			else{
				var v = kanjiList.length;
				console.log(v + " items found, attempting to import");
				while (v--){
//--
					SetReviewsUtil.setVocItem(kanjiList[v]);
				}
			}
		}
	},
	hijackRequests: require('./hijackrequests.js'),
	/** Gets the user information using the Wanikani API and stores them directly into browser storage.
	* @param
	* @param {string} [requestedItem = 'kanji'] - The type of request to make to the Wanikani API
	*/
	getServerResp: function(APIkey, requestedItem){
		console.groupCollapsed("%cGetting Response through API using APIkey: %c"+APIkey, "font-weight: bold;", "color: red; font-family:monospace;");
        requestedItem = requestedItem === void 0 ? 'kanji' :requestedItem;
        if (APIkey !== "test"){
            var levels = (requestedItem ==="kanji")? "/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50":
            "/1,2,3,4,5,6,7,8,9,10"; // Vocab times out if you try to do it all at once. Limited to ten for now.
            var xhrk = ServerUtil.createCORSRequest("get", "https://www.wanikani.com/api/user/" + APIkey + "/" + requestedItem + levels);
            if (!ObjectUtil.isEmpty(xhrk)){
                xhrk.onreadystatechange = function() {
                    if (xhrk.readyState == 4){
                        var kanjiList = this.handleReadyStateFour(xhrk,requestedItem);

                        if (requestedItem === 'kanji'){
                            StorageUtil.localSet('User-KanjiList', kanjiList);
                            console.log("kanjiList from server", kanjiList);
                            //update locks in localStorage 
                            //pass kanjilist into this function
                            //(don't shift things through storage unecessarily)
                            SetReviewsUtil.refreshLocks();
                        }
						else{
                            var v = kanjiList.length;
                            console.log(v + " items found, attempting to import");
                            while (v--){
                                SetReviewsUtil.setVocItem(kanjiList[v]);
                            }
                        }
                    }
                }.bind(this);

                xhrk.send();
            }
        }
		else {
            //dummy server response for testing.
            setTimeout(function () {
                var kanjiList = [];
                console.log("creating dummy response");
                var SRS = "apprentice"; //prompt("enter SRS for 子", "guru");
                kanjiList.push({"character": "猫", "srs": "noServerResp"});
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

                StorageUtil.localSet('User-KanjiList', kanjiList);

                //update locks in localStorage
                StorageUtil.refreshLocks();
            }, 10000);
        }
		console.groupEnd();
    },
	
	handleReadyStateFour: function(xhrk, requestedItem){

        var localkanjiList = [];
        console.log("readystate: "+ xhrk.readyState);
        var resp = StorageUtil.parseString(xhrk.responseText);
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