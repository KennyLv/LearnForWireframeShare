/**
* Table Menu Listener class
* 
* @package com.hoperun.event
* @author Haipei ZHANG
*/
if (!com.hoperun.event.TableMenuListener) {
    com.hoperun.event.TableMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
	        	case com.hoperun.util.Observer.MessageType.TABLE_SELECTED: ////////
	            case com.hoperun.util.Observer.MessageType.TABLE_FOCUS:
	                currentSelectedObj = message.sender;
	                break;
		        case com.hoperun.util.Observer.MessageType.POPU_MENU:
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
    var tableMenuListener = new com.hoperun.event.TableMenuListener();

    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_SELECTED, tableMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_FOCUS, tableMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, tableMenuListener);
}

