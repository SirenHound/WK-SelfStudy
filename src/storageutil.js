var StorageUtil = {
	/** Initialise User-Vocab
	*/
	initStorage: function(){
		if (!this.localGet("User-Vocab")){
			this.localSet("User-Vocab", []);
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
	},
	/**
	*/
	setVocItem: function(item){
        //Assumption: item comes only with kanji, reading and meaning
        item.level = 0;
        item.date = Date.now();
        item.manualLock = "";
        item = setLocks(item);
		 //0.1.9 adding in 'due' property to make review building simpler
        item.due = item.date + srsObject[item.level].duration;

        var vocList = localGet('User-Vocab')||[];

		var found = vocList.find(function(task){
            return task.kanji === item.kanji;
        }, this);
		//add meaning and reading to existing item
		//        vocList[v].meaning = item.meaning;
		//      vocList[v].reading = item.reading;
        if (!found) {
            //provide index for faster searches
            console.log(item.kanji +" not found in vocablist, adding now");
            item.i = vocList.length;
            vocList.push(item);

            localSet('User-Vocab',vocList);
        }
    }
};

module.exports = StorageUtil;