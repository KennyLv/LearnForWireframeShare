/**
 * Observer class
 * 
 * @package com.kenny.util
 * @import com.kenny.util.Hashtable
 * @author xuliyu
 */
if (!com.kenny.util.Observer) {
	com.kenny.util.Observer = {
		_messageTable : new com.kenny.util.Hashtable(),

		Message : function() {
			this.id = null;
			this.sender = null;
			this.data = null;
			this.isStoped = false;
		},

		register : function(messageId, object) {
			if (!object.update)
				alert("update method undefined");
			if (!com.kenny.util.Observer._messageTable.contains(messageId)) {
				var objectList = [];
				objectList.add(object);
				com.kenny.util.Observer._messageTable.add(messageId, objectList);
			} else
				com.kenny.util.Observer._messageTable.items(messageId).add(object);
		},

		unregister : function(messageId, object) {
			var objectList = com.kenny.util.Observer._messageTable.items(messageId);
			if(objectList && objectList.indexOf(object, 0)!=-1){
				objectList.removeAt(objectList.indexOf(object, 0));
			}
		},

		sendMessage : function(message) {
			if (message == null)
				alert("message object is null");
			//function exec() {
				//alert(message.id);
				var objectList = com.kenny.util.Observer._messageTable.items(message.id);
				for ( var i = 0; objectList != null && i < objectList.length; i++) {
					//try {
						objectList[i].update(message);
						if (message.isStoped)
							break;
					//} catch (e) {
					//	alert(e);
					//}
				}
			//}
			//window.setTimeout(exec, 0);
		},
		
		send : function(id, sender, data) {
			var message = new com.kenny.util.Observer.Message();
			message.id = id;
			message.sender = sender;
			message.data = data == null ? {} : data;
			this.sendMessage(message);
		}
	};
}

if (!com.kenny.util.Observer.MessageType) {
    com.kenny.util.Observer.CommonMessageType = {
       Node: {
           INSERT: "NODE_INSERT",
           FOCUS: "NODE_FOCUS",
           RESIZE: "NODE_RESIZE",
           LAYOUT: "NODE_LAYOUT"
       }    
    };
    com.kenny.util.Observer.MessageType = {
        NEW_KENNY_PAPERS: 'NEW_KENNY_PAPERS',
        NEW_KENNY_SHEETS: 'NEW_KENNY_SHEETS',
        NEW_KENNY_PRESENTATIONS: 'NEW_KENNY_PRESENTATIONS',
        POPU_MENU: 'POPU_MENU', //POPU THE EDIT MENU OUT

        ADD_PAGES: 'ADD_PAGES',
        REMOVE_PAGES: 'REMOVE_PAGES',
        ACTIVE_PAGE: 'ACTIVE_PAGE', //tell the word that this page is activated now

        DOCUMENT_CREATE: 'DOCUMENT_CREATE',
        DOCUMENT_CONFIGURATION: 'DOCUMENT_CONFIGURATION', //Notify menu & toolbar, document configuration
        DOCUMENT_STYLE: 'DOCUMENT_STYLE',
        DOCUMENT_SAVE: 'DOCUMENT_SAVE',
        
        SLIDES_CREATE: 'SLIDES_CREATE',
        SHEETS_CREATE: 'SHEETS_CREATE',
        SHEETS_CLOSE: 'SHEETS_CLOSE',
        
        SLIDES_SAVE: 'SLIDES_SAVE',
        SHEETS_SAVE: 'SHEETS_SAVE',
        
        SLIDE_CREATE: 'SLIDE_CREATE',
        SLIDE_CUT: 'SLIDE_CUT',
        SLIDE_COPY: 'SLIDE_COPY',
        SLIDE_PASTE: 'SLIDE_PASTE',
        SLIDE_REMOVE: 'SLIDE_REMOVE',
        SLIDE_ADD_TRANSITION: 'SLIDE_ADD_TRANSITION',
        SLIDE_SET_BACKGROUND: 'SLIDE_SET_BACKGROUND',

        TABLE_SELECTED: 'TABLE_SELECTED',        // Table on focus
        TABLE_FOCUS: 'TABLE_FOCUS',        // Table on focus
        TABLE_ROW_ADD: 'TABLE_ROW_ADD',    // Table on adding row
        TABLE_COL_ADD: 'TABLE_COL_ADD',    // Table on adding col
        TABLE_MOVED: 'TABLE_MOVED',        // Table on moved
        TABLE_INSERT: 'TABLE_INSERT',      // Insert Table
		TABLE_CHANGED:'TABLE_CHANGED',     // Table on change ,added by zhuxiaoquan
		TABLE_LAYOUT: 'TABLE_LAYOUT',     // After table is inserted, need to notified, the page to be updated
		TABLE_POSITION:'TABLE_POSITION',
		
        TABLE_ROW_SELECT: 'TABLE_ROW_SELECT',
        TABLE_COL_SELECT: 'TABLE_COL_SELECT',
        TABLE_ROW_HEIGHT_CHANGE: 'TABLE_ROW_HEIGHT_CHANGE',
        TABLE_COL_WIDTH_CHANGE: 'TABLE_COL_WIDTH_CHANGE',

        TABLE_STYLE: 'TABLE_STYLE',
        TABLE_ARRANGE: 'TABLE_ARRANGE',
        CELL_ADDFUNCTION: 'CELL_ADDFUNCTION', //cell function setting

        TABLE_MENU_DELETE: 'TABLE_MENU_DELETE',

        CELL_MENU_HIDE: 'CELL_MENU_HIDE',
        CELL_MENU_INSERT: 'CELL_MENU_INSERT',
        CELL_MENU_DELETE: 'CELL_MENU_DELETE',

        CELL_CLICK: 'CELL_CLICK', // Cell select message id code
        CELL_DBLCLICK: 'CELL_DBLCLICK',
        //CELL_RIGHTCLICK: 'CELL_RIGHTCLICK',
        CELL_FOCUS: 'CELL_FOCUS',

        CELL_CHANGED: 'CELL_CHANGED',//cell format setting

        CELL_CUT:'CELL_CUT',
        CELL_COPY:'CELL_COPY',
        CELL_DELETE:'CELL_DELETE',
        CELL_PASTE:'CELL_PASTE',
        CELL_FORMULAS:'CELL_FORMULAS',
        CELL_VALUES:'CELL_VALUES',
        //CELL_FILL:'',
        
        CELL_STYLE: 'CELL_STYLE', //added by Feng for cell style changes

        IMAGE_FOCUS: 'IMAGE_FOCUS',
        IMAGE_RESIZE: 'IMAGE_RESIZE',
        IMAGE_DBLCLICK: 'IMAGE_DBLCLICK',
        IMAGE_SETSTYLE: 'IMAGE_SETSTYLE', //set the style of the image - opacity||className
        IMAGE_INSERT: 'IMAGE_INSERT', //Insert Image
        IMAGE_LAYOUT: 'IMAGE_LAYOUT', //After insert Image, this event should be inserted
        IMAGE_POSITION:'IMAGE_POSITION',
		IMAGE_CLIP: 'IMAGE_CLIP',
        
        IMAGE_STYLE: 'IMAGE_STYLE',
        IMAGE_ARRANGE: 'IMAGE_ARRANGE',

        VIDEO_INSERT: 'VIDEO_INSERT',
        VIDEO_FOCUS: 'VIDEO_FOCUS',
        VIDEO_RESIZE: 'VIDEO_RESIZE',
        VIDEO_POSITION: 'VIDEO_POSITION',
        VIDEO_ARRANGE: 'VIDEO_ARRANGE',

        SHAPE_FOCUS: 'SHAPE_FOCUS',
        SHAPE_TRACKER_HIDE: 'SHAPE_TRACKER_HIDE',
        SHAPE_TRACKER_FIX: 'SHAPE_TRACKER_FIX',
        SHAPE_RESIZE: 'SHAPE_RESIZE',
        SHAPE_INSERT: 'SHAPE_INSERT',
        SHAPE_EDIT: 'SHAPE_EDIT',

        SHAPE_STYLE: 'SHAPE_STYLE',
        SHAPE_TEXT_STYLE: 'SHAPE_TEXT_STYLE',
        SHAPE_ARRANGE: 'SHAPE_ARRANGE',
        
        SHAPE_LAYOUT: 'SHAPE_LAYOUT', //send this message to update the left side of slide
        SHAPE_POSITION:'SHAPE_POSITION',

        CHART_FOCUS:  'CHART_FOCUS',
        CHART_RESIZE: 'CHART_RESIZE',
        CHART_INSERT: 'CHART_INSERT',
        CHART_LAYOUT: 'CHART_LAYOUT',
        CHART_POSITION: 'CHART_POSITION',
        
        CONTEXT_BLUR: 'CONTEXT_BLUR',
        CONTEXT_FOCUS: 'CONTEXT_FOCUS',
        CONTEXT_ACTIVE: 'CONTEXT_ACTIVE',
        CONTEXT_INACTIVE: 'CONTEXT_INACTIVE',

        OBJ_CUT: 'OBJ_CUT',
        OBJ_COPY: 'OBJ_COPY',
        OBJ_PASTE: 'OBJ_PASTE',
        OBJ_PASTEVALUE: 'OBJ_PASTEVALUE',
        OBJ_DELETE: 'OBJ_DELETE',

        CUT_ITEM: 'CUT_ITEM',
        COPY_ITEM: 'COPY_ITEM',
        PASTE_ITEM: 'PASTE_ITEM',
        DELETE_ITEM: 'DELETE_ITEM',

        KEYBOARD_ADD: 'KEYBOARD_ADD',
        KEYBOARD_REMOVE: 'KEYBOARD_REMOVE',
		KEYBOARD_FOCUS: 'KEYBOARD_FOCUS',
		SVG_KEYBOARD_FOCUS: 'SVG_KEYBOARD_FOCUS',
        KEYBOARD_BLUR: 'KEYBOARD_BLUR',
        KEYBOARD_COMMAND: 'KEYBOARD_COMMAND',
        KEYBOARD_INPUT: 'KEYBOARD_INPUT',
		
        
        SVG_TEXT_DELETE: 'SVG_TEXT_DELETE',
        SVG_TEXT_BACKSPACE: 'SVG_TEXT_BACKSPACE',
        SVG_TEXT_ENTER: 'SVG_TEXT_ENTER',
        SVG_TEXT_LEFT: 'SVG_TEXT_LEFT',
        SVG_TEXT_RIGHT: 'SVG_TEXT_RIGHT',
        SVG_TEXT_UP: 'SVG_TEXT_UP',
        SVG_TEXT_DOWN: 'SVG_TEXT_DOWN',
        SVG_TEXT_INPUT: 'SVG_TEXT_INPUT',
        SVG_TEXT_INPUT_ITEM: 'SVG_TEXT_INPUT_ITEM',
        SVG_TEXT_STYLE: 'SVG_TEXT_STYLE',
        SVG_TEXT_STYLE_NOTIFY: 'SVG_TEXT_STYLE_NOTIFY',
        SVG_KEYBOARD_ACTIVE: 'SVG_KEYBOARD_ACTIVE',
        SVG_STYLE_NOTIFY: 'SVG_STYLE_NOTIFY',
        
        CURSOR_SHOW: 'CURSOR_SHOW',
        CURSOR_HIDE: 'CURSOR_HIDE',
        CURSOR_PAUSE: 'CURSOR_PAUSE',
        CURSOR_RECOVER: 'CURSOR_RECOVER',
        CURSOR_UNDISPLAY: 'CURSOR_UNDISPLAY',

        SVG_CURSOR_SHOW: 'SVG_CURSOR_SHOW',
        SVG_CURSOR_HIDE: 'SVG_CURSOR_HIDE',
        SVG_CURSOR_PAUSE: 'SVG_CURSOR_PAUSE',
        SVG_CURSOR_RECOVER: 'SVG_CURSOR_RECOVER',
		
        PARAGRAPH_STYLE: 'PARAGRAPH_STYLE',
        PARAGRAPH_ACTION: 'PARAGRAPH_ACTION',
        
        TEXT_SELECT: 'TEXT_SELECT', // when select text
        TEXT_STYLE: 'TEXT_STYLE', // set style of text - bold | italic | underline | font family | font size
		TEXT_ACTION_DELETE: 'TEXT_ACTION_DELETE', // when delete or backspace text
		TEXT_ACTION_BACKSPACE_DELETE: 'TEXT_ACTION_BACKSPACE_DELETE', // when delete or backspace text
		TEXT_ACTION_INPUT: 'TEXT_ACTION_INPUT', //when add new Redo&Undo, 
		PARAGRAPH_ACTION_DELETE: 'PARAGRAPH_ACTION_DELETE', // when delete text at last place
		PARAGRAPH_ACTION_BACKSPACE: 'PARAGRAPH_ACTION_BACKSPACE', // when backspace text at first place
		TEXT_ACTION_ENTER: 'TEXT_ACTION_ENTER',
		TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE: 'TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE',
		TEXT_ACTION_REPLACE: 'TEXT_ACTION_REPLACE',
		
    	UPDATE_ZINDEX : 'UPDATE_ZINDEX',
    	UPDATE_SLIDE_LEFTSIDE : 'UPDATE_SLIDE_LEFTSIDE', //sync left side of slide
		
		UNDO : 'UNDO',
		REDO : 'REDO',

		RULER_DISPLAY : 'RULER_DISPLAY'
    };
}
