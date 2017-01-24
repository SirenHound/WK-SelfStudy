/* jshint multistr: true */
// Config for window sizes in pixels
var windowConfig = require('./windowconfig.js');

var StringUtil = {
	
	isUpperCase: function(ch){
		return ch === ch.toUpperCase() && ch !== ch.toLowerCase();
	},

	camelCaseToDashed: function(camelCase){
		var dashedString = "";
		for (var ch in camelCase){
			dashedString += this.isUpperCase(camelCase[ch]) ? "-"+camelCase[ch].toLowerCase() : camelCase[ch];
		}
		return dashedString;
	}
};

var cssObjectToString = function(cssSelector, cssObj){
	var cssString = cssSelector + " {\r\n";
	for (var cssItem in cssObj){
		cssString += StringUtil.camelCaseToDashed(cssItem) + ": " + cssObj[cssItem] + ";\r\n";
	}
	cssString += "}\r\n";
	return cssString;
};

var classWKSS = cssObjectToString('.custom .dropdown-menu', {backgroundColor: "#DBA901 !important"}) +
cssObjectToString('.custom .dropdown-menu:after', {borderBottomColor: "#DBA901 !important"}) +
cssObjectToString('.custom .dropdown-menu:before', {borderBottomColor: "#DBA901 !important"}) +
cssObjectToString('.open .dropdown-toggle.custom', {backgroundColor: "#FFC400 !important"}) +
cssObjectToString('.custom .dropdown-menu a:hover', {backgroundColor: "#A67F00 !important"}) +
cssObjectToString('.custom:hover', {color: "#FFC400 !important"}) +
cssObjectToString('.custom:hover span', {borderColor: "#FFC400 !important"}) +
cssObjectToString('.custom:focus', {color: "#FFC400 !important"}) +
cssObjectToString('.custom:focus span', {borderColor: "#FFC400 !important"}) +
cssObjectToString('.open .custom span', {borderColor: "#FFFFFF !important"}) +
cssObjectToString('.open .custom', {color: "#FFFFFF !important"}) +
cssObjectToString('.WKSS', {
	position: "fixed",
	zIndex: "2",
	top: "125px",
	left: "50%",
	margin: "0px",
	background: "#FFF",
	padding: "5px",
	font: "12px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif",
	color: "#888",
	textShadow: "1px 1px 1px #FFF",
	border: "1px solid #DDD",
	borderRadius: "5px",
	WebkitBorderRadius: "5px",
	MozBorderRadius: "5px",
	boxShadow: "10px 10px 5px #888888"
}) + 
cssObjectToString('.WKSS h1', {//.WKSS h1
	font: "25px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif",
	paddingLeft: "5px",
	display: "block",
	borderBottom: "1px solid #DADADA",
	margin: "0px",
	color: "#888"
}) + 
cssObjectToString('.WKSS h1 > span', {//.WKSS h1 > span
	display: "block",
	fontSize: "11px"
}) +
cssObjectToString('.WKSS label', {//.WKSS label
	display: "block",
	margin: "0px 0px 5px"
}) +
cssObjectToString('.WKSS label>span', {//.WKSS label>span
	float: "left",
	width: "80px",
	textAlign: "right",
	paddingRight: "10px",
	marginTop: "10px",
	color: "#333",
	fontFamily: "\"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif",
	fontWeight: "bold"
}) +
cssObjectToString('.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea', {//.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea 
	border: "1px solid #CCC",
	color: "#888",
	height: "20px",
	marginBottom: "16px",
	marginRight: "6px",
	marginTop: "2px",
	outline: "0 none",
	padding: "6px 12px",
	width: "80%",
	borderRadius: "4px",
	lineHeight: "normal !important",
	WebkitBorderRadius: "4px",
	MozBorderRadius: "4px",
	font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif",
	WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
	boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
	MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"
}) +
cssObjectToString('.WKSS select', {//.WKSS select
	border: "1px solid \"#CCC\"",
	color: "#888",
	outline: "0 none",
	padding: "6px 12px",
	height: "160px !important",
	width: "95%",
	borderRadius: "4px",
	WebkitBorderRadius: "4px",
	MozBorderRadius: "4px",
	font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif",
	WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
	boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
	MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
	background: "#FFF url('down-arrow.png') no-repeat right",
	appearance: "none",
	WebkitAppearance: "none",
	MozAppearance: "none",
	textIndent: "0.01px",
	textOverflow: "''"
}) +
//.WKSS textarea
cssObjectToString('.WKSS textarea', {height: "100px"}) +
cssObjectToString('.WKSS button, .button',{//.WKSS button, .button
	position: "relative",
	background: "#FFF",
	border: "1px solid #CCC",
	padding: "10px 25px 10px 25px",
	color: "#333",
	borderRadius: "4px",
	display: "inline !important"
}) +
cssObjectToString('.WKSS button:disabled', {//.WKSS button:disabled
	background: "#EBEBEB",
	border: "1px solid #CCC",
	padding: "10px 25px 10px 25px",
	color: "#333",
	borderRadius: "4px"
}) +
cssObjectToString('.WKSS .button:hover, button:hover:enabled', {//.WKSS .button:hover, button:hover:enabled
	color: "#333",
	backgroundColor: "#EBEBEB",
	borderColor: "#ADADAD"
}) +
//.WKSS button:hover:disabled
cssObjectToString('.WKSS button:hover:disabled', {cursor: "default"}) +
cssObjectToString('.error', {//.error
	borderColor:"#F00 !important",
	color: "#F00 !important"
}) +
cssObjectToString('.caution', {//.caution
	borderColor: "#F90 !important",
	color: "#F90 !important"
}) +
cssObjectToString('.correct', {//.correct
	borderColor: "#0F0 !important",
	color: "#0F0 !important"
}) +
cssObjectToString('.info', {
	borderColor: "#696969 !important",
	color: "#696969 !important"
}) +
cssObjectToString('.rev-error', {
	textShadow: "none",
	border: "1px solid #F00 !important",
	borderRadius: "10px",
	backgroundColor: "#F00",
	padding: "4px",
	margin: "4px",
	color: "#FFFFFF",
	font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"
}) +
cssObjectToString('.rev-correct', {
	textShadow:"none",
	border: "1px",
	solid: "#088A08 !important",
	borderRadius: "10px",
	backgroundColor: "#088A08",
	padding: "4px",
	margin:"4px",
	color: "#FFFFFF",
	font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"
}) +
cssObjectToString('#WKSS-add', {
	width: windowConfig.add.width,
	height: windowConfig.add.height,
	marginLeft: -windowConfig.add.width/2
}) +
cssObjectToString('#WKSS-export, #WKSS-import', {
	background: "#fff",
	width: windowConfig.exportImport.width,
	height: windowConfig.exportImport.height,
	marginLeft: -windowConfig.exportImport.width/2
}) +
cssObjectToString('#edit', {
	width: windowConfig.edit.width,
	height: windowConfig.edit.height,
	marginLeft: -windowConfig.edit.width/2
}) +
cssObjectToString('#selfstudy', {	left: "50%",
	width: windowConfig.study.width,
	height: windowConfig.study.height,
	marginLeft: -windowConfig.study.width/2
}) +
cssObjectToString('#resultwindow', {
	left:"50%",
	width: windowConfig.result.width + "px",
	height: windowConfig.result.height + "px",
	marginLeft: -windowConfig.result.width/2 + "px"
}) +
cssObjectToString('#AudioButton', {
	marginTop: "35px",
	position: "relative",
	display: "inline !important",
	WebkitMarginBefore: "50px"
}) +
cssObjectToString('button.wkss-close', {
	float: "right",
	backgroundColor: "#ff4040",
	color: "#fff",
	padding: "0px",
	height: "27px",
	width: "27px"
}) +
cssObjectToString('#wkss-close', {
	float: "right",
	backgroundColor: "#ff4040",
	color: "#fff",
	padding: "0px",
	height: "27px",
	width: "27px"
}) +
cssObjectToString('#wkss-kanji, #rev-kanji', {
	textAlign: "center !important",
	fontSize: "50px !important",
	backgroundColor: "#9400D3 !important",
	color: "#FFFFFF !important",
	borderRadius: "10px 10px 0px 0px"
}) +
cssObjectToString('#wkss-solution, #rev-solution', {
	textAlign: "center !important",
	fontSize: "30px !important",
	color: "#FFFFFF",
	padding: "2px"
}) +
cssObjectToString('#wkss-type', {
	textAlign: "center !important",
	fontSize: "24px !important",
	backgroundColor: "#696969",
	color: "#FFFFFF !important",
	borderRadius: "0px 0px 10px 10px"
}) +
cssObjectToString('#rev-type', {
	textAlign: "center !important",
	fontSize: "24px !important",
	color: "#FFFFFF !important",
	borderRadius: "0px 0px 10px 10px"
}) +
cssObjectToString('#wkss-input', {
	textAlign: "center !important",
	fontSize: "40px !important",
	height: "80px !important",
	lineHeight: "normal !important"
}) +
cssObjectToString('#rev-input', {
	textAlign: "center !important",
	fontSize: "40px !important",
	height: "60px !important",
	lineHeight: "normal !important"
});
//----
module.exports = classWKSS;
//module.exports = wkstyleCSS;