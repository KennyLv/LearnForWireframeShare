/**
* Image Menu Listener class
* 
* @package com.kenny.event
* @author Haipei ZHANG
*/
if (!com.kenny.event.ImageMenuListener) {
    com.kenny.event.ImageMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
		        case com.kenny.util.Observer.MessageType.IMAGE_FOCUS:
		            currentSelectedObj = message.sender;
		            try {
		                refreshImageMenuEnableOrDisable(currentSelectedObj); // Page use this only, should be send message
		            } catch (e) { }
		            break;
		        case com.kenny.util.Observer.MessageType.POPU_MENU:
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
    var imageMenuListener = new com.kenny.event.ImageMenuListener();

    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.IMAGE_FOCUS, imageMenuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.POPU_MENU, imageMenuListener);
}

