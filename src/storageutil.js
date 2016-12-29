var StorageUtil = {
	/** Initialise User-Vocab
	*/
	initStorage: function(){
		if (!this.localGet("User-Vocab")){
			this.localSet("User-Vocab", []);
		}
	},
	/** Handle the users API key.
	* @param {string} APIkey - the users API key to set. If given "YOUR_API_HERE", it will return the key in browser storage.
	* @returns {string} the users API key as supplied and stored, or in the case of "YOUR_API_HERE" being passed, the stored key.
	*/
    getSetApi: function(APIkey){
        var storedAPI = localStorage.getItem('Wanikani-API');
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
			this.localSet("Wanikani-API", APIkey);
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
	}
};

module.exports = StorageUtil;