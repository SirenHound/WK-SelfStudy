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
				
				var APIfields = Array.prototype.filter.call(divElement.getElementsByTagName("input"), function(elem){
					return elem.getAttribute("placeholder") === "Key has not been generated";
				});
				console.log("APIfields: ", APIfields.toString());
				console.log("APIfields: ", APIfields instanceof HTMLCollection);
				if (APIfields.length){
					var APIkey = APIfields[0].value;
					callback(APIkey);
				}
			}
		};
		try{
			xhrk.send();
		}
		catch (e){
			console.log("An error has occurred: ", e);
			console.error("An error has occurred: ", e);
			
		}
	},
	createCORSRequest: function(method, url){
		var xhr = new XMLHttpRequest();
		try{
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
		catch (e){
			console.error("Uh oh!: ", e);
			console.log("Uh oh!: ", e);
		}
	}
};

module.exports = ServerUtil;