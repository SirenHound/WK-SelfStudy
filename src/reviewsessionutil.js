var reviewSessionUtil = {
	/** Messing around with vanilla WaniKani review variables
	*/
    joinReviews: function(WKItems){
        console.log("joining reviews");
        $.jStorage.stopListening("reviewQueue", joinReviews);
        var WKreview = $.jStorage.get("reviewQueue")||[];
        var WKcombined = WKreview.concat(WKItems);
        $.jStorage.set("reviewQueue", WKcombined);
    },
	wKSS_to_WK: function(WKSSItem){
        var WKItem = {};
        //    WKItem.aud = "";
        WKItem.en = WKSSItem.meaning.map(function(s) {
			 //trim whitespace and capitalize words
			 return s.trim().replace(/\b\w/g , function(m){
				return m.toUpperCase();
			});
		});
        WKItem.id = "WKSS" + WKSSItem.i;
        WKItem.kana = WKSSItem.reading;
        WKItem.srs = WKSSItem.level+1;//WK starts levels from 1, WKSS starts them from 0
        WKItem.voc = WKSSItem.kanji;
        WKItem.components = WKSSItem.components;

        WKItem.syn = [];
        //Add synonyms of strings without bracketed info to get around checking the full string including brackets
        WKSSItem.meaning.forEach(function(meaning){
            var openBracket = meaning.indexOf("(");
            if (openBracket !== -1 && meaning.indexOf(")") !== -1){
                WKItem.syn.push(meaning.substr(0, openBracket).trim().replace(/\b\w/g , function(m){ return m.toUpperCase();}));
            }
        }, this);

        return WKItem;
    },

	loadTasks: function(userVocab, i, userVocabs){
        var dueNow = (userVocab.locked === "no" && userVocab.level < 9 && Date.now() > userVocab.due);

        if (dueNow){
            if (userVocab.kanji.length * userVocab.meaning[0].length * userVocab.reading[0].length){
                //Sorry, we need all three to add to WK review, no kana only without readings etc.
                console.log("item:" + userVocab.kanji + ", " + userVocab.locked +" === \"no\" && " + userVocab.level + " < 9 && " + Date.now() + " > " + userVocab.due);
                console.log(dueNow);
                return wKSS_to_WK(userVocab);
            }
			else{
                console.log("Item " + userVocab.kanji + " could not be added, it is missing one or more of the essential fields for a WK vocabulary review");
            }
        }
    },
	getWKItems: function(){
		return StorageUtil.getVocList().map(this.loadTasks, this);
    },
	
	shoehornIntoWaniKani: function(){
		//where the magic happens
		if (WKSS_Settings.asWK){
			$.jStorage.listenKeyChange("reviewQueue", function(){this.joinReviews(this.getWKItems());});
		}
	}		
};