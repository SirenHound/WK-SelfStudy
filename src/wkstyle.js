/* jshint multistr: true */
// Config for window sizes in pixels
var windowConfig = require('./windowconfig.js');

//.WKSS
var classWKSS = [
	{position: "fixed"},
	{zIndex: "2"},
	{top: "125px"},
	{left: "50%"},
	{margin: "0px"},
	{background: "#FFF"},
	{padding: "5px"},
	{font: "12px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{color: "#888"},
	{textShadow: "1px 1px 1px #FFF"},
	{border: "1px solid #DDD"},
	{borderRadius: "5px"},
	{WebkitBorderRadius: "5px"},
	{MozBorderRadius: "5px"},
	{boxShadow: "10px 10px 5px #888888"}
];

//.WKSS h1
var classWKSS_h1 = [
	{font: "25px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{paddingLeft: "5px"},
	{display: "block"},
	{borderBottom: "1px solid #DADADA"},
	{margin: "0px"},
	{color: "#888"}
];

//.WKSS h1 > span
var classWKSS_h1_direct_Span = [
	{display: "block"},
	{fontSize: "11px"}
];

//.WKSS label
var w = [
	{display: "block"},
	{margin: "0px 0px 5px"},
];

//.WKSS label>span
w = [
	{float: "left"},
	{width: "80px"},
	{textAlign: "right"},
	{paddingRight: "10px"},
	{marginTop: "10px"},
	{color: "#333"},
	{fontFamily: "\"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{fontWeight: "bold"}
];

//.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea 
w = [
	{border: "1px solid #CCC"},
	{color: "#888"},
	{height: "20px"},
	{marginBottom: "16px"},
	{marginRight: "6px"},
	{marginTop: "2px"},
	{outline: "0 none"},
	{padding: "6px 12px"},
	{width: "80%"},
	{borderRadius: "4px"},
	{lineHeight: "normal !important"},
	{WebkitBorderRadius: "4px"},
	{MozBorderRadius: "4px"},
	{font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"}
];

//.WKSS select
w = [
	{border: "1px solid \"#CCC\""},
	{color: "#888"},
	{outline: "0 none"},
	{padding: "6px 12px"},
	{height: "160px !important"},
	{width: "95%"},
	{borderRadius: "4px"},
	{WebkitBorderRadius: "4px"},
	{MozBorderRadius: "4px"},
	{font: "normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"},
	{WebkitBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{MozBoxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)"},
	{background: "#FFF url('down-arrow.png') no-repeat right"},
	{appearance: "none"},
	{WebkitAppearance: "none"},
	{MozAppearance: "none"},
	{textIndent: "0.01px"},
	{textOverflow: "''"}
];

//.WKSS textarea
w = [
	{height: "100px"}
];

//.WKSS button, .button
w = [
	{position: "relative"},
	{background: "#FFF"},
	{border: "1px solid #CCC"},
	{padding: "10px 25px 10px 25px"},
	{color: "#333"},
	{borderRadius: "4px"},
	{display: "inline !important"}
];

//.WKSS button:disabled
w = [
	{background: "#EBEBEB"},
	{border: "1px solid #CCC"},
	{padding: "10px 25px 10px 25px"},
	{color: "#333"},
	{borderRadius: "4px"}
];

//.WKSS .button:hover, button:hover:enabled
w = [
	{color: "#333"},
	{backgroundColor: "#EBEBEB"},
	{borderColor: "#ADADAD"}
];

//.WKSS button:hover:disabled
w = [
	{cursor: "default"}                             
];

//.error
w = [
	{borderColor:"#F00 !important"},
	{color: "#F00 !important"}
];

//.caution
w = [
	{borderColor: "#F90 !important"},
	{color: "#F90 !important"}
];

//.correct
w = [
	{borderColor: "#0F0 !important"},
	{color: "#0F0 !important"}
];

//.info
w = [
	{borderColor: "#696969 !important"},
	{color: "#696969 !important"}
];

//.rev-error
w = [
	{textShadow: "none"},
	{border: "1px solid #F00 !important"},
	{borderRadius: "10px"},
	{backgroundColor: "#F00"},
	{padding: "4px"},
	{margin: "4px"},
	{color: "#FFFFFF"},
	{font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"}
];

//.rev-correct
w = [
	{textShadow:"none"},
	{border: "1px"},
	{solid: "#088A08 !important"},
	{borderRadius: "10px"},
	{backgroundColor: "#088A08"},
	{padding: "4px"},
	{margin:"4px"},
	{color: "#FFFFFF"},
	{font: "normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"}
];

//#add
w = [
	{width: windowConfig.add.width},
	{height: windowConfig.add.height},
	{marginLeft: -windowConfig.add.width/2}
];

//#export, #import
w = [
{background: "#fff"},
	{width: windowConfig.exportImport.width},
	{height: windowConfig.exportImport.height},
	{marginLeft: -windowConfig.exportImport.width/2}
];

//#edit
w = [
	{width: windowConfig.edit.width},
	{height: windowConfig.edit.height},
	{marginLeft: -windowConfig.edit.width/2}
];

//#selfstudy
w = [
	{left: "50%"},
	{width: windowConfig.study.width},
	{height: windowConfig.study.height},
	{marginLeft: -windowConfig.study.width/2}
];

//#resultwindow
w = [
	{left:"50%"},
	{width: windowConfig.result.width + "px"},
	{height: windowConfig.result.height + "px"},
	{marginLeft: -windowConfig.result.width/2 + "px"}
];

//#AudioButton
w = [
	{marginTop: "35px"},
	{position: "relative"},
	{display: "inline !important"},
	{WebkitMarginBefore: "50px"}
];

//button.wkss-close
w = [
	{float: "right"},
	{backgroundColor: "#ff4040"},
	{color: "#fff"},
	{padding: "0px"},
	{height: "27px"},
	{width: "27px"}
];

//#wkss-close
w = [
	{float: "right"},
	{backgroundColor: "#ff4040"},
	{color: "#fff"},
	{padding: "0px"},
	{height: "27px"},
	{width: "27px"}
];

//#wkss-kanji, #rev-kanji
w = [
	{textAlign: "center !important"},
	{fontSize: "50px !important"},
	{backgroundColor: "#9400D3 !important"},
	{color: "#FFFFFF !important"},
	{borderRadius: "10px 10px 0px 0px"}
];

//#wkss-solution, #rev-solution
w = [
	{textAlign: "center !important"},
	{fontSize: "30px !important"},
	{color: "#FFFFFF"},
	{padding: "2px"}
];

//#wkss-type
w = [
	{textAlign: "center !important"},
	{fontSize: "24px !important"},
	{backgroundColor: "#696969"},
	{color: "#FFFFFF !important"},
	{borderRadius: "0px 0px 10px 10px"}
];

//#rev-type
w = [
	{textAlign: "center !important"},
	{fontSize: "24px !important"},
	{color: "#FFFFFF !important"},
	{borderRadius: "0px 0px 10px 10px"}
];
//#wkss-input
w = [
	{textAlign: "center !important"},
	{fontSize: "40px !important"},
	{height: "80px !important"},
	{lineHeight: "normal !important"}
];

//#rev-input
w = [
	{textAlign: "center !important"},
	{fontSize: "40px !important"},
	{height: "60px !important"},
	{lineHeight: "normal !important"}
];

//----
module.exports = classWKSS;
//module.exports = wkstyleCSS;