var standardStyleGet = "font-weight: bold; color: #5599AA";
var italicStyleGet = "font-style: italic; color: #5599AA";
var standardStyleSet = "font-weight: bold; color: #559933";
var italicStyleSet = "font-style: italic; color: #559933";

var StorageUtil = {
	VOCAB_LABEL: "User-Vocab",
	API_LABEL: "Wanikani-API",
	/** Initialise User-Vocab
	*/
	initStorage: function(){
		if (!this.localGet(this.VOCAB_LABEL)){
			this.localSet(this.VOCAB_LABEL, []);
		}
	},
	/** Handle the users API key.
	* @param {string} APIkey - the users API key to set. If given "YOUR_API_HERE", it will return the key in browser storage.
	* @returns {string} the users API key as supplied and stored, or in the case of "YOUR_API_HERE" being passed, the stored key.
	*/
    getSetApi: function(APIkey){
        var storedAPI = this.localGet(this.API_LABEL);
        if (!APIkey || APIkey === "YOUR_API_HERE"){
            if (storedAPI !== null && storedAPI !== "undefined"){
                APIkey = storedAPI;
            }
        }
		else{
            //API has been set in code.
            if (storedAPI !== APIkey){
                StorageUtil.saveUserApi(APIkey);//overwrite with new API
            }
        }
        return APIkey;
    },
	saveUserApi: function(APIkey){
		if (APIkey){
			this.localSet(this.API_LABEL, APIkey);
		}
	},
	/**
	*/
	parseString: function(strObj){
		console.assert("string" === typeof strObj, "non-string passed to parseString", strObj);
        //avoids duplication of code for sesssionGet and localGet
        var obj;
        try {
            obj = JSON.parse(strObj);
            console.log("Variable is of type " + typeof obj);
        }
		catch(e){
			console.error(strObj + " is an ordinary string that cannot be parsed.");
			obj = strObj;
        }
        return obj;
    },
	/**
	*/
	localGet: function(strName){
		var data = localStorage.getItem(strName);
		var result = data && this.parseString(data);
		console.groupCollapsed("%cRetrieving %c"+strName+" %cfrom local storage", standardStyleGet, italicStyleGet, standardStyleGet);
		console.info(typeof result, result);
		console.groupEnd();
		return result;
    },
	localRemove: function(strName){
		if (localStorage.getItem(strName) !== null){
			localStorage.removeItem(strName);
			return true;
		}
		else{
			return false;
		}
	},
	/** Sets strings and objects into browser storage
	* @requires localStorage
	* @requires JSON
	*/
	localSet: function(strName, obj){
		console.groupCollapsed("%cStoring %c"+strName+" %cinto local storage", standardStyleSet, italicStyleSet, standardStyleSet);
		console.info(typeof obj, obj);
		console.groupEnd();

        localStorage.setItem(strName, typeof obj === "string"? obj : JSON.stringify(obj));
    },
	/** Only sets strings and objects into browser storage if they are not already there
	* @requires localStorage
	* @requires JSON
	*/
	localSetFirstTime: function(strName, obj){
		if (!this.localGet(strName)){
			this.localSet(strName, obj);
		}
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
	/** Gets the list of user defined vocabulary items
	*/
	getVocList: function(){
        var vocList = this.localGet(this.VOCAB_LABEL);
        vocList.forEach(function(item, i){
			item.i = i; //set index for item (->out)
        }, this);
        return vocList;
    },
	setVocList: function(vocList){
		this.localSet(this.VOCAB_LABEL, vocList);
	}
};

module.exports = StorageUtil;