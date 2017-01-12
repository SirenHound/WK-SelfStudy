var buildNode = require('./buildnode.js');


// 'this' context is node to attach to
var attachChildNode = function(childNode){
	var el;
	if ("string" === typeof childNode){ //TextNode
		 el = document.createTextNode(childNode);
	}
	else{
		el = buildNode(childNode.tag, {id: childNode.id, className: childNode.className});
		for (var attr in childNode.other){
			el.setAttribute(attr, childNode.other[attr]);
		}
		if (childNode.childNodes){
			childNode.childNodes.forEach(attachChildNode, el);
		}
		if (childNode.eventListeners){
			for (var listener in childNode.eventListeners){
				el.addEventListener(listener, childNode.eventListeners[listener]);
			}
		}
	}
	this.appendChild(el);
};

// IWindow
// tag, id, className, other, childNodes

/** Takes a JSON object with the structure of the window to create and builds a DIVElement from that
* @param {IWindow} windowStructure
* @param {string} [mainElement = 'div']
* @returns {DIVElement} The specified window.
*/
var buildWindow = function(windowStructure, mainElement) {
	
	var resultWindow = buildNode(mainElement || 'div', {id: windowStructure.id, className: windowStructure.className});
	for (var attr in windowStructure.other){
		resultWindow.setAttribute(attr, windowStructure.other[attr]);
	}
	if (windowStructure.childNodes){
		windowStructure.childNodes.forEach(attachChildNode, resultWindow);
	}
	return resultWindow;
};
module.exports = buildWindow;