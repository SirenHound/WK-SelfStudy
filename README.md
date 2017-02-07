## Classes

<dl>
<dt><a href="#Item">Item</a></dt>
<dd><p>{Object} Item
]</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#SetReviewsUtil">SetReviewsUtil</a></dt>
<dd><p>Prepare Reviews and put them into storage.</p>
</dd>
<dt><a href="#WanikaniDomUtil">WanikaniDomUtil</a></dt>
<dd><p>Deals specifically with the DOM of Wanikani.com, unlike <a href="#WanikaniUtil">WanikaniUtil</a> which deals primarily with the API and application side.</p>
</dd>
<dt><a href="#WanikaniUtil">WanikaniUtil</a></dt>
<dd><p>Utilities for interaction with the Wanikani API and general website.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#buildNode">buildNode(type, [options])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Builds a node element with an id and className and other attributes if provided</p>
</dd>
<dt><a href="#buildWindow">buildWindow(windowStructure, [mainElement])</a> ⇒ <code>DIVElement</code></dt>
<dd><p>Takes a JSON object with the structure of the window to create and builds a DIVElement from that</p>
</dd>
<dt><a href="#WKSS_edit">WKSS_edit()</a></dt>
<dd><p>Edit Items</p>
</dd>
<dt><a href="#WKSS_export">WKSS_export()</a></dt>
<dd><p>Export</p>
</dd>
<dt><a href="#WKSS_import">WKSS_import()</a></dt>
<dd><p>Import</p>
</dd>
<dt><a href="#WKSS_review">WKSS_review()</a></dt>
<dd><p>Review Items</p>
</dd>
<dt><a href="#logError">logError()</a></dt>
<dd><p>Error handling
Can use &#39;error.stack&#39;, not cross-browser (though it should work on Firefox and Chrome)</p>
</dd>
<dt><a href="#scriptInit">scriptInit()</a></dt>
<dd><p>Prepares the script</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Task">Task</a> : <code>Object</code></dt>
<dd><p>Describes a single review task</p>
</dd>
</dl>

<a name="Item"></a>

## Item
{Object} Item
]

**Kind**: global class  

* [Item](#Item)
    * [new Item()](#new_Item_new)
    * [._locked](#Item+_locked)
    * [._manualLock](#Item+_manualLock)

<a name="new_Item_new"></a>

### new Item()
Any item that can be learned, to include implementations IRadical, IKanji, and IVocabulary

<a name="Item+_locked"></a>

### item._locked
boolean|string

**Kind**: instance property of <code>[Item](#Item)</code>  
<a name="Item+_manualLock"></a>

### item._manualLock
boolean

**Kind**: instance property of <code>[Item](#Item)</code>  
<a name="SetReviewsUtil"></a>

## SetReviewsUtil
Prepare Reviews and put them into storage.

**Kind**: global variable  

* [SetReviewsUtil](#SetReviewsUtil)
    * [.generateReviewList()](#SetReviewsUtil.generateReviewList)
    * [.checkAdd()](#SetReviewsUtil.checkAdd) ⇒ <code>boolean</code>
    * [.checkForDuplicates()](#SetReviewsUtil.checkForDuplicates) ⇒ <code>boolean</code>
    * [.refreshLocks()](#SetReviewsUtil.refreshLocks)
    * [.getCompKanji(item, kanjilist)](#SetReviewsUtil.getCompKanji) ⇒
    * [.setLocks(item)](#SetReviewsUtil.setLocks) ⇒ <code>ITask</code>
    * [.setVocItem()](#SetReviewsUtil.setVocItem)

<a name="SetReviewsUtil.generateReviewList"></a>

### SetReviewsUtil.generateReviewList()
This is an event handler

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
<a name="SetReviewsUtil.checkAdd"></a>

### SetReviewsUtil.checkAdd() ⇒ <code>boolean</code>
Takes a JSON object (parsed from import window) and checks with stored items for any duplicates

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
**Returns**: <code>boolean</code> - True if each item in 'add' array is valid and at least one of them already exists in storage  
<a name="SetReviewsUtil.checkForDuplicates"></a>

### SetReviewsUtil.checkForDuplicates() ⇒ <code>boolean</code>
Checks if an item's kanji is represented in a list

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
<a name="SetReviewsUtil.refreshLocks"></a>

### SetReviewsUtil.refreshLocks()
Sets the locks on all Tasks in storage

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
<a name="SetReviewsUtil.getCompKanji"></a>

### SetReviewsUtil.getCompKanji(item, kanjilist) ⇒
Creates a lookup array for each kanji with its srs level. Used for displaying component levels.

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
**Returns**: An array of the kanji with SRS values for each kanji component.  

| Param |
| --- |
| item | 
| kanjilist | 

**Example**  
```js
eg. 折り紙:
        compSRS = [{"kanji": "折", "srs": "guru"}, {"kanji": "紙", "srs": "apprentice"}]
```
<a name="SetReviewsUtil.setLocks"></a>

### SetReviewsUtil.setLocks(item) ⇒ <code>ITask</code>
Manages the locked and manualLock properties of srsitem. This is to stop items being locked again after they have been unlocked if any of the kanji used falls below the unlock threshold (eg. if the 勉 in 勉強 falls back to apprentice, we do not want to lock up 勉強 again.)

**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
**Returns**: <code>ITask</code> - item  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> |  |
| item.locked | <code>string</code> | (String enumeration) A real time evaluation of the item (is any of the kanji in the word locked?) |
| item.manualLock | <code>string</code> | (String enumeration) Will return 'no' if .locked has ever returned 'no'. |

<a name="SetReviewsUtil.setVocItem"></a>

### SetReviewsUtil.setVocItem()
**Kind**: static method of <code>[SetReviewsUtil](#SetReviewsUtil)</code>  
<a name="WanikaniDomUtil"></a>

## WanikaniDomUtil
Deals specifically with the DOM of Wanikani.com, unlike [WanikaniUtil](#WanikaniUtil) which deals primarily with the API and application side.

**Kind**: global variable  
<a name="WanikaniDomUtil.getSelfStudyMenu"></a>

### WanikaniDomUtil.getSelfStudyMenu()
Adds the Button

**Kind**: static method of <code>[WanikaniDomUtil](#WanikaniDomUtil)</code>  
<a name="WanikaniUtil"></a>

## WanikaniUtil
Utilities for interaction with the Wanikani API and general website.

**Kind**: global variable  
<a name="WanikaniUtil.getServerResp"></a>

### WanikaniUtil.getServerResp([requestedItem])
Gets the user information using the Wanikani API and stores them directly into browser storage.

**Kind**: static method of <code>[WanikaniUtil](#WanikaniUtil)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
|  |  |  |  |
| [requestedItem] | <code>string</code> | <code>&quot;&#x27;kanji&#x27;&quot;</code> | The type of request to make to the Wanikani API |

<a name="buildNode"></a>

## buildNode(type, [options]) ⇒ <code>HTMLElement</code>
Builds a node element with an id and className and other attributes if provided

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - The node built as specified  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of element to create ('div', 'p', etc...) |
| [options] | <code>object</code> |  |
| options.id | <code>string</code> | The id of the node |
| options.className | <code>string</code> | One or more classes for the element seperated by spaces |

<a name="buildWindow"></a>

## buildWindow(windowStructure, [mainElement]) ⇒ <code>DIVElement</code>
Takes a JSON object with the structure of the window to create and builds a DIVElement from that

**Kind**: global function  
**Returns**: <code>DIVElement</code> - The specified window.  

| Param | Type | Default |
| --- | --- | --- |
| windowStructure | <code>IWindow</code> |  | 
| [mainElement] | <code>string</code> | <code>&quot;&#x27;div&#x27;&quot;</code> | 

<a name="WKSS_edit"></a>

## WKSS_edit()
Edit Items

**Kind**: global function  
<a name="WKSS_export"></a>

## WKSS_export()
Export

**Kind**: global function  
<a name="WKSS_import"></a>

## WKSS_import()
Import

**Kind**: global function  
<a name="WKSS_review"></a>

## WKSS_review()
Review Items

**Kind**: global function  
<a name="logError"></a>

## logError()
Error handlingCan use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)

**Kind**: global function  
<a name="scriptInit"></a>

## scriptInit()
Prepares the script

**Kind**: global function  
<a name="Task"></a>

## Task : <code>Object</code>
Describes a single review task

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>string</code> | 
| prompt | <code>string</code> | 
| solution | <code>Array.&lt;string&gt;</code> | 

