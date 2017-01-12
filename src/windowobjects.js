var windowObjects = {
	user: {
		id: "WKSS-user",
		className: "WKSS",
		childNodes: [{tag: 'form',
			id: "userForm",
			childNodes: [{ tag: 'button',
				id: "UserCloseBtn",
				className: "wkss-close",
				other: {type: "reset"},
				childNodes: [{tag: 'i', 
					className: "icon-remove"
				}]
			},
			{ tag:'h1',
				childNodes: ["User Settings"]
			},
			{ tag: 'input', 
				id: "userApi", 
				other: {type: "text", placeholder: "Enter API Key"}
			},
			{ tag: 'p',
				childNodes:[
					{ tag: 'b',
						childNodes: ["Username: "]
					},
					{ tag: 'span',
						id: "WKSS-username",
					}
				]
			},
			{ tag: 'button',
				id: "AutofillUserBtn",
				other: {type: "button", title: "Use the details of the current login"},
				childNodes: ["Autofill"]
			},
			{ tag: 'button',
				id: "saveUserBtn",
				other: {type: "button"},
				childNodes: ["Save User Details"]
			}]
		}]
	},
	addVocab: {
		id: "WKSS-add",
		className: "WKSS",
		childNodes: [{tag: 'form',
			id: "addForm",
			childNodes: [{ tag: 'button',
				id: "AddCloseBtn",
				className: "wkss-close",
				other: {type: "reset"},
				childNodes: [{tag: 'i', 
					className: "icon-remove"
				}]
			},
			{ tag:'h1',
				childNodes: ["Add a new Item"]
			},
			{ tag: 'input', 
				id: "addKanji", 
				other: {type: "text", placeholder: "Enter 漢字, ひらがな or カタカナ"}
			},
			{ tag: 'input',
				id: "addReading",
				other: {type: "text", title: "Leave empty to add vocabulary like する (to do)", placeholder: "Enter reading"}
			},
			{ tag: 'input',
				id: "addMeaning",
				other: {type: "text", placeholder: "Enter meaning"}
			},
			{ tag: 'p',
				id: "addStatus",
				childNodes: ["Ready to add..."]
			},
			{ tag: 'button',
				id: "AddItemBtn",
				other: {type: "button"},
				childNodes: ["Add new Item"]
			}]
		}]
	},
	editTask: {
		id: "WKSS-edit",
		className: "WKSS",
		childNodes:[{
			tag: 'form',
			id: "WKSS-editForm",
			childNodes:[{
				tag: 'button',
				id: "WKSS-editCloseBtn",
				className: "wkss-close",
				other: {type: "reset"},
				childNodes:[{
					tag: 'i',
					className: "icon-remove"
				}]
			},
			{
				tag: 'h1',
				childNodes:["Edit your Vocab"]
			},
			{
				tag: 'select',
				id: "editWindow",
				other: {size: "8"}
			},
			{
				tag: 'input', 
				other:{
					type: "text",
					name: "",
					size: "40",
					placeholder: "Select vocab, click edit, change and save!"
				},
				id: "editItem"
			},
			{
				tag: 'p', 
				id: "WKSS-editStatus",
				childNodes:["Ready to edit..."]
			},
			{
				tag: 'button',
				id: "EditEditBtn",
				other: {type: "button"},
				childNodes:["Edit"]
			},
			{
				tag: 'button',
				id: "EditSaveBtn",
				other:{type: "button"},
				childNodes:["Save"]
			},{
				tag: 'button',
				id: "EditDeleteBtn",
				other: {type: "button", title: "Delete selected item"},
				childNodes:["Delete"]
			},{
				tag: 'button',
				id: "EditDeleteAllBtn",
				other: {type: "button", title: "本当にやるの？"},
				childNodes:["Delete All"]
			},{
				tag: 'button',
				id: "ResetLevelsBtn",
				other: {type: "button"},
				childNodes:["Reset levels"]
			}]
		}]
	},
	export: {
		id: "WKSS-export",
		className: "WKSS",
		childNodes:[{
			tag: 'form',
			id: "WKSS-exportForm",
			childNodes:[
				{ tag: 'button',
					id: "WKSS-exportCloseBtn",
					className: "wkss-close",
					childNodes:[{
						tag: 'i',
						className: "icon-remove"
					}]
				},
				{
					tag: 'h1',
					childNodes:["Export Items"]
				},
				{
					tag: 'textarea',
					id: "exportArea",
					other: {cols: "50", rows: "18", placeholder: "Export your stuff! Sharing is caring ;)"}
				},
				{
					tag: 'p', 
					id: "exportStatus",
					childNodes:["Ready to export..."]
				},
				{
					tag: 'button',
					id: "ExportItemsBtn",
					other: {type: "button"},
					childNodes:["Export Items"]
				},
				{
					tag: 'button',
					id: "ExportSelectAllBtn",
					other:{type: "button"},
					childNodes:["Select All"]
				},
				{
					tag: 'button',
					id: "ExportCsvBtn",
					other: {type: "button"},
					childNodes:["Export CSV"]
				}
			]
		}]
	},
	import: {
		id: "WKSS-import",
		className: "WKSS",
		childNodes:[{
			tag: 'form',
			id: "WKSS-importForm",
			childNodes:[
				{
					tag: 'button',
					id: "WKSS-importCloseBtn",
					className: "wkss-close",
					childNodes:[{
						tag: 'i',
						className: "icon-remove"
					}]
				},
				{
					tag: 'h1',
					childNodes:["Import Items"]
				},
				{
					tag: 'textarea',
					id: "importArea",
					other: {cols: "50", rows: "18", placeholder: "Paste your stuff and hit the import button! Use with caution!"}
				},
				{
					tag: 'p', 
					id: "importStatus",
					childNodes:["Ready to import..."]
				},
				{
					tag: 'label',
					id: "ImportItemsBtn",
					className: "button",
					other: {type: "button", style: "display:inline;"},
					childNodes:["Import Items"]
				},
				{
					tag: 'label',
					id: "ImportCsvBtn",
					className: "button",
					other: {style:"display:inline; cursor: pointer;"},
					childNodes:["Import CSV",
						{
							tag: 'input',
							id: "upload",
							other: {
								type: "file", accept: ".csv, .tsv",
								style: "height:0px;width:0px;background:red;opacity:0;filter:opacity(1);"
							}
						}
					]
				},
				{
					tag: 'label',
					id: "ImportWKBtn",
					className: "button",
					other: {style: "display:inline;"},
					childNodes:[
						{
							tag:'i',
							className: "icon-download-alt"
						},
						"WK"
					]
				}
			]
		}]
	},
	review: {
		id: "WKSS-selfstudy",
		className: "WKSS",
		childNodes:[{tag: 'form',
			id: "selfStudyForm",
			childNodes: [{ tag: 'button',
				id: "WKSS-SelfstudyCloseBtn",
				className: "wkss-close",
			childNodes:[{
					tag: 'i',
					className: "icon-remove"
				}]
			},
			{ tag: 'h1',
				childNodes:["Review",
					{ tag: 'span',
						id: "RevNum"
					}
				]
			},
			{ tag: 'div',
				id: "wkss-kanji",
				childNodes:[
					{ tag: 'span',
						id: "rev-kanji"
					}
				]
			},
			{ tag: 'div',
				id: "wkss-type",
				childNodes:[
					{ tag: 'span',
						id: "rev-type"
					}
				]
			},
			{ tag: 'div',
				id: "wkss-solution",
				childNodes:[
					{ tag: 'span',
						id: "rev-solution"
					}
				]
			},
			{ tag: 'input',
				id: "rev-input",
				other: {type: "text"},
				eventListeners: {
					keypress: function(evt){
						console.log(evt);
						if (evt.keyCode === 13){
							evt.preventDefault();
						}
					}
				}
			},
			{ tag: 'span',
				id: "rev-index",
				other: { style: "display: block;"}
			},
			{ tag: 'form',
				id: "audio-form",
				childNodes: [
					{ tag: 'label',
						id: "AudioButton",
						className: "button",
						other: {type: "button", style: "display:inline;"},
						childNodes:["Play Audio"]
					},
					{ tag: 'label',
						id: "WrapUpBtn",
						className: "button",
						other: {style:"display:inline; cursor: pointer;"},
						childNodes:["Wrap Up"]
					}
				]
			},
			{ tag: 'div',
				id: "rev-audio",
				other: {style: "display: none;"}
			}]
		}]
	},
	results: {
		id: "WKSS-resultwindow",
		className: "WKSS",
		childNodes: [
			{ tag: 'button',
				id: "WKSS-ReviewresultsCloseBtn",
				className: "wkss-close",
			childNodes:[{
					tag: 'i',
					className: "icon-remove"
				}]
			},
			{ tag: 'h1',
				childNodes:["Review Results"]
			},
			{ tag: 'h2',
				childNodes:["All"]
			},
			{ tag: 'div',
				id: "stats-a"
			}
		]
	}
};

module.exports = windowObjects;