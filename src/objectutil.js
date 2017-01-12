var ObjectUtil = {
    /** Validates a task object
	* @param {Task} add - The Task being verified
	* @returns {Boolean} If the provided task has all the necessary properties to be added to the review list.
	*/
	isItemValid: function(add) {
        return (!this.isEmpty(add.kanji) && //kanji property exists
			!this.isEmpty(add.meaning) && //meaning property exists
			!this.isEmpty(add.reading) && //reading property exists
			this.isArray(add.meaning) &&//meaning is an array
			this.isArray(add.reading));//reading is an array
    },
	/** Save to list based on .index property
	* @param {Array.<task>} eList
	* @param {task} eItem
	*/
    saveToSortedList: function(eList,eItem){
        var get = ObjectUtil.findIndex(eList,eItem);
        if (Math.sign(1/get) === -1){
            eList.splice(-get,0,eItem);
        }
		return eList;
    },

	binarySearch: function(values, target, start, end) {
        if (start > end) {
            /* start has higher value than target, end has lower value.
            Item belongs between.
            Need to return 'start' with a flag that it hasn't been found (invert sign) */
            return -(start);
        }
        var middle = Math.floor((start + end) / 2);
        var value = values[middle];
        if (Number(value.index) > Number(target.index)) {
			return ObjectUtil.binarySearch(values, target, start, middle-1);
		}
        if (Number(value.index) < Number(target.index)) {
			return ObjectUtil.binarySearch(values, target, middle+1, end);
		}
        return middle; //found!
    },
	findIndex: function(values, target) {
        return ObjectUtil.binarySearch(values, target, 0, values.length - 1);
	},

   /** Converts number of milliseconds into a readable string
	* @param {number} milliseconds - The number of milliseconds to approximate
	* @returns {string} Readable time frame ('2 months', '3 hours', '1 week' etc).
	*/
	ms2str: function(milliseconds){
        var num; //number of months weeks hours etc
        //more time has elapsed than required for the level
        if(milliseconds <= 0) {
            return "Now" ;
        }
        if(milliseconds > 2628000000) {//About a month
            num = Math.floor(milliseconds/2628000000).toString()+" month";
            if (num !== "1 month"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 604800000) {//A week
            num = Math.floor(milliseconds/604800000).toString()+" week";
            if (num !== "1 week"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 86400000) {//A day
            num = Math.floor(milliseconds/86400000).toString()+" day";
            if (num !== "1 day"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 3600000) {//An hour
            num = Math.floor(milliseconds/3600000).toString()+" hour";
            if (num !== "1 hour"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 60000) {//A minute
            num = Math.floor(milliseconds/60000).toString()+" minute";
            if (num !== "1 minute"){
                return num+"s";
            }else{
                return num;
            }
        }
        if(milliseconds > 0) {//A second is 1000, but need to return something for less than one too
            num = Math.floor(milliseconds/1000).toString()+" second";
            if (num !== "1 second"){
                return num+"s";
            }else{
                return num;
            }
        }
    },
    /** Gets the Kanji characters in a given string.
	* @param {string} vocabString -
	* @return {Array.<string>} An array of the kanji components in the given string
	*/
    getComponents: function(vocabString){
        return Array.prototype.filter.call(vocabString, function(ch){
            return /^[\u4e00-\u9faf]+$/.test(ch);
        }, this);
    },

	isEmpty: function(value) {
        return (value === void 0 || value === null);
    },
	isArray: function(arg){
		return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === '[object Array]';
	}
};

module.exports = ObjectUtil;