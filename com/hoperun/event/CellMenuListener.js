/**
* Cell Menu Listener class
* 
* @package com.hoperun.event
* @author Haipei ZHANG
*/
if (!com.hoperun.event.CellMenuListener) {
    com.hoperun.event.CellMenuListener = function () {
        this.update = function (message) {
        	switch (message.id) {
		        case com.hoperun.util.Observer.MessageType.CELL_CLICK: /////
                    currentSelectedObj = message.sender;
                    break;
                case com.hoperun.util.Observer.MessageType.CELL_DBLCLICK: //////////
                    currentSelectedObj = message.sender;
                    sheet_editFunctionMenu(currentSelectedObj);
                    break;
                case com.hoperun.util.Observer.MessageType.POPU_MENU:
		        	if(currentSelectedObj && currentSelectedObj.getType()=="Cell"){
		        		updateCellMenu(currentSelectedObj.getData());
		        		showMenu("CELL", message.data);
		        	}
		        break;
        	} 
        	$('.menu-toolbar-text').hide();
         }
    };
    var cellMenuListener = new com.hoperun.event.CellMenuListener();

    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_CLICK, cellMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CELL_DBLCLICK, cellMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, cellMenuListener);
}

