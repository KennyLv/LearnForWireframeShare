/**
* Menu Listener class
* 
* @package com.hoperun.event
* @import com.hoperun.util.BaseTool
* @author Jian.T
*/
if (!com.hoperun.event.MenuListener) {
    com.hoperun.event.MenuListener = function () {
    	
        this.update = function (message) {
        	var needRefreshMenuFlag = false; 
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.CONTEXT_BLUR:
                    currentSelectedObj = null;
                    return;
                    break;
                case com.hoperun.util.Observer.MessageType.POPU_MENU:
                    if (!currentSelectedObj){
                    	showMenu('None', message.data);
                    }
                    break;
                case com.hoperun.util.Observer.MessageType.UNDO:
                    jskataUndo.undo();
                    break;
                case com.hoperun.util.Observer.MessageType.REDO:
                    jsk.redo();
                    break;
                case com.hoperun.util.Observer.MessageType.RULER_DISPLAY:
                	var data = message.data;
                	data.display ? $('.ruler').css({'display':'block'}) : $('.ruler').css({'display':'none'}); 
                	break;
            }
        };
    };
    var menuListener = new com.hoperun.event.MenuListener();

    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CONTEXT_BLUR, menuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, menuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.UNDO, menuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.REDO, menuListener);   
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.RULER_DISPLAY, menuListener);
}

