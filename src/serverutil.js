var ServerUtil = {
	//Make asyncronous call for the API of the currently logged in user, ask for confirmation, don't be creepy :P
	getLoggedInUserAPI: function(callback){
		var xhrk = this.createCORSRequest('get', 'https://www.wanikani.com/account');
		/**
		* @param {Event} evt - evt.type === "readystatechange"
		*/
		xhrk.onreadystatechange = function(evt) {
			if (xhrk.readyState == 4){
				var divElement = document.createElement('div');
				divElement.innerHTML = xhrk.responseText;
				
				var APIkey = Array.prototype.filter.call(divElement.getElementsByTagName("input"), function(elem){
					return elem.getAttribute("placeholder") === "Key has not been generated";
				})[0].value;
				console.log(APIkey);
				callback(APIkey);
			}
		}.bind(this);
		xhrk.send();
	},
	createCORSRequest: function(method, url){
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr){
			xhr.open(method, url, true);
		}
		else if (typeof XDomainRequest !== "undefined"){
			xhr = new XDomainRequest();
			xhr.open(method, url);
		}
		else {
			xhr = null;
		}
		return xhr;
	}
};

module.exports = ServerUtil;