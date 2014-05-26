/**
* Cell Menu Listener class
* 
* @package com.kenny.event
* @author Haipei ZHANG
*/
if (!com.kenny.event.CellMenuListener) {
    com.kenny.event.CellMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
		        case com.kenny.util.Observer.MessageType.CELL_CLICK: /////
                    currentSelectedObj = message.sender;
                    break;
                case com.kenny.util.Observer.MessageType.CELL_DBLCLICK: //////////
                    currentSelectedObj = message.sender;
                    sheet_editFunctionMenu(currentSelectedObj);
                    break;
                case com.kenny.util.Observer.MessageType.POPU_MENU:
		        	if(currentSelectedObj && currentSelectedObj.getType()=="Cell"){
		        		updateCellMenu(currentSelectedObj.getData());
		        		showMenu("CELL", message.data);
		        	}
		        break;
        	} 
        	$('.menu-toolbar-text').hide();
         }
    };
    var cellMenuListener = new com.kenny.event.CellMenuListener();

    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CELL_CLICK, cellMenuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CELL_DBLCLICK, cellMenuListener);
    com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.POPU_MENU, cellMenuListener);
}

