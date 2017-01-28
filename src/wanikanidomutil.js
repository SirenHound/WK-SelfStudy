/** Deals specifically with the DOM of Wanikani.com, unlike {@link WanikaniUtil} which deals primarily with the API and application side.
*/
var WanikaniDomUtil = {
	buildWindow: require('./buildwindow.js'),
	
	addClass: function(el, className){
	if (el.classList)
		el.classList.add(className);
	else
		el.className += ' ' + className;
	},

	removeClass: function(el, className){
	if (el.classList)
		el.classList.remove(className);
	else
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	},
	
	// Generic selector functions
	
	getNavBar: function(){
		return document.getElementsByClassName('nav')[2];
	},
	/** Adds the Button
	*/
    getSelfStudyMenu: function(showAddWindow, showEditWindow, showImportWindow, showExportWindow, showLockWindow, showReviewWindow, showUserWindow, generateReviewList) {
        console.log("addUserVocabButton()");

	
		var dropdownMenu = {
			className: "dropdown custom",
			id: "customDropdown",
			other: {
				"data-dropdown": ""
			},
			childNodes: [{
				tag: 'a',
				className: "dropdown-toggle custom",
				other: {dataToggle: "dropdown"},
				eventListeners: {
					click: generateReviewList
				},
				childNodes: [{
					tag: 'span',
					other: {lang: "ja"},
					childNodes:[String.fromCharCode(33258)+String.fromCharCode(32722)],
				},
				"Self-Study",
				{
					tag: 'i',
					className: "icon-chevron-down",
				}]
			},
			{
				tag: 'ul',
				className: "dropdown-menu",
				id: "WKSS_dropdown",
				childNodes: [{
					tag: 'li',
					className: "nav-header",
					childNodes: ["Customize"]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						id: "click",
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showUserWindow
						},
						childNodes: ["User"]
					}]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						id: "click",
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showAddWindow
						},
						childNodes: ["Add"]
					}]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showEditWindow
						},
						childNodes: ["Edit"]
					}]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showExportWindow
						},
						childNodes: ["Export"]
					}]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showImportWindow
						},
						childNodes: ["Import"]
					}]
				},
				{
					tag: 'li',
					className: "nav-header",
					childNodes: ["Learn"]
				},
				{
					tag: 'li',
					childNodes: [{
						tag: 'a',
						id: "user-review",
						other: {
							style: "cursor: pointer;"
						},
						eventListeners: {
							click: showReviewWindow
						},
						childNodes: ["Please wait..."]
					}]
				}]
					//   <li><a href=\"#\" onclick=\"WKSS_lock();\">Server Settings</a></li>//-->

			}]
		};
		var dropdownListItem = this.buildWindow(dropdownMenu, 'li');
		return dropdownListItem;
    }
};

module.exports = WanikaniDomUtil;