/**
* Menu Listener class
* 
* @package com.kenny.event
* @import com.kenny.util.BaseTool
* @author Jian.T
*/
if (!com.kenny.event.MenuListener) {
    com.kenny.event.MenuListener = function () {
    	
        this.update = function (message) {
        	var needRefreshMenuFlag = false; 
            switch (message.id) {
                case com.kenny.util.Observer.MessageType.CONTEXT_BLUR:
                    currentSelectedObj = null;
                    return;
                    break;
                case com.kenny.util.Observer.MessageType.POPU_MENU:
                    if (!currentSelectedObj){
                    	showMenu('None', message.data);
                    }
                    break;
                case com.kenny.util.Observer.MessageType.UNDO:
                    jskataUndo.undo();
                    break;
                case com.kenny.util.Observer.MessageType.REDO:
                    jsk.redo();
                    break;
                case com.kenny.util.Observer.MessageType.RULER_DISPLAY:
                	var data = message.data;
                	data.display ? $('.ruler').css({'display':'block'}) : $('.ruler').css({'display':'none'}); 
                	break;
            }
        };
    };
    var menuListener = new com.kenny.event.MenuListener();

    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CONTEXT_BLUR, menuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.POPU_MENU, menuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.UNDO, menuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.REDO, menuListener);   
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.RULER_DISPLAY, menuListener);
}

