var ServerUtil = require('./serverutil.js');
var ObjectUtil = require('./objectutil.js');

var User = function(APIkey){
	this._api = APIkey;
	var xhrk = ServerUtil.createCORSRequest("get", "https://www.wanikani.com/api/user/" + APIkey + "/user-information");
	if (!ObjectUtil.isEmpty(xhrk)){
		xhrk.onreadystatechange = function() {
			if (xhrk.readyState == 4){
				console.info("are there arguments passed to onreadystatechange? ", arguments);
				var resp = JSON.parse(xhrk.responseText);
				for (var key in resp.user_information){
					this[key] = resp.user_information[key];
				}
			}
		}.bind(this);
		xhrk.send();
	}
};

User.prototype = {
	getApi: function() {
		return this._api;
	},
	getUsername: function() {
		return this.username;
	}
};

module.exports = User;