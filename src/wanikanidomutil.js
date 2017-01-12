/** Deals specifically with the DOM of Wanikani.com, unlike {@link WanikaniUtil} which deals primarily with the API and application side.
*/
var WanikaniDomUtil = {
	buildWindow: require('./buildwindow.js'),
	/** Adds the Button
	*/
    addSelfStudyMenu: function(showAddWindow, showEditWindow, showImportWindow, showExportWindow, showLockWindow, showReviewWindow, showUserWindow, generateReviewList) {
        console.log("addUserVocabButton()");

        var nav = document.getElementsByClassName('nav');

        if (nav&&nav.length>2) {
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
						childNodes:["自習"],
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
            $(nav[2]).append(dropdownListItem);

        }else{
            console.error("could not find nav", nav);
        }
        console.log("addUserVocab");
    }
};

module.exports = WanikaniDomUtil;