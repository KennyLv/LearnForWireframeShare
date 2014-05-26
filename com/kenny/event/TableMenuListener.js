/**
* Table Menu Listener class
* 
* @package com.kenny.event
* @author Haipei ZHANG
*/
if (!com.kenny.event.TableMenuListener) {
    com.kenny.event.TableMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
	        	case com.kenny.util.Observer.MessageType.TABLE_SELECTED: ////////
	            case com.kenny.util.Observer.MessageType.TABLE_FOCUS:
	                currentSelectedObj = message.sender;
	                break;
		        case com.kenny.util.Observer.MessageType.POPU_MENU:
		        	if(currentSelectedObj && currentSelectedObj.getType()=="Table"){
		        		updateTableMenu(currentSelectedObj.getData());
                        initTableArrange();
		        		showMenu("TABLE", message.data);
		        	}
		        break;
        	} 
        	$('.menu-toolbar-text').hide();
         }
    };
    var tableMenuListener = new com.kenny.event.TableMenuListener();

    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.TABLE_SELECTED, tableMenuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.TABLE_FOCUS, tableMenuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.POPU_MENU, tableMenuListener);
}

