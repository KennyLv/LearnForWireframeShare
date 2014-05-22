/**
* Image Menu Listener class
* 
* @package com.hoperun.event
* @author Haipei ZHANG
*/
if (!com.hoperun.event.ImageMenuListener) {
    com.hoperun.event.ImageMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
		        case com.hoperun.util.Observer.MessageType.IMAGE_FOCUS:
		            currentSelectedObj = message.sender;
		            try {
		                refreshImageMenuEnableOrDisable(currentSelectedObj); // Page use this only, should be send message
		            } catch (e) { }
		            break;
		        case com.hoperun.util.Observer.MessageType.POPU_MENU:
		        	if(currentSelectedObj && currentSelectedObj.getType()=="Image"){
		        		updateImageMenu(currentSelectedObj.getData());
	                    initImageMenu();
		        		showMenu("IMAGE", message.data);
		        	}
		        break;
        	} 
        	$('.menu-toolbar-text').hide();
         }
    };
    var imageMenuListener = new com.hoperun.event.ImageMenuListener();

    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.IMAGE_FOCUS, imageMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, imageMenuListener);
}

