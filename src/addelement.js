var buildNode = require('./buildnode.js');

// Create DOM for 'add' window
var addElement = buildNode('div', {id: "add", className: "WKSS"});

var formElement = buildNode('form', {id: "addForm"});
addElement.appendChild(formElement);

var buttonElement = buildNode('button', {id: "AddCloseBtn", className: "wkss-close", type: "reset"});
formElement.appendChild(buttonElement);

var iconElement = buildNode('i', {className: "icon-remove"});
buttonElement.appendChild(iconElement);

var headerElement = buildNode('h1');
formElement.appendChild(headerElement);

var headerText = document.createTextNode("Add a new Item");
headerElement.appendChild(headerText);

var inputKanjiElement = buildNode('input', {id: "addKanji", type: "text", placeholder: "Enter 漢字, ひらがな or カタカナ"});
formElement.appendChild(inputKanjiElement);

var inputReadingElement = buildNode('input', {id: "addReading", type: "text", title: "Leave empty to add vocabulary like する (to do)", placeholder: "Enter reading"});
formElement.appendChild(inputReadingElement);

var inputMeaningElement = buildNode('input', {id: "addMeaning", type: "text", placeholder: "Enter meaning"});
formElement.appendChild(inputMeaningElement);

var pElement = buildNode('p', {id: "addStatus"});
formElement.appendChild(pElement);

var pText = document.createTextNode("Ready to add..");
pElement.appendChild(pText);

var execButtonElement = buildNode('button', {id: "AddItemBtn", type: "button"});
formElement.appendChild(execButtonElement);

var execText = document.createTextNode("Add new Item");
execButtonElement.appendChild(execText);

module.exports = addElement;