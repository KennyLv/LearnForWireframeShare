/**
* Text Menu Listener class
* 
* @package com.hoperun.event
* @author Haipei ZHANG
*/
if (!com.hoperun.event.TextMenuListener) {
    com.hoperun.event.TextMenuListener = function () {	
        this.update = function (message) {
        	var needRefreshMenuFlag = false; 
            switch (message.id) { 
	           case com.hoperun.util.Observer.MessageType.TEXT_SELECT:
		           	needRefreshMenuFlag = true; 
		           	currentSelectedObj = message.sender;
	                //Added by Feng for new UI parts initialize on 2011_07_26
	                updateMenuTextStatus(currentSelectedObj.getActiveStyle(), message.sender.getActiveSelection().getFrom().getParagraphStyle());
	                updateTextMenu(currentSelectedObj.getActiveStyle());
	                refreshTextMenuLine(message.sender.getActiveSelection().getFrom(),message.sender.getActiveSelection().getFrom().getParagraphStyle());
	                break;     
                //// The beginning of Docs event handler  
                case com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION:
                    var data = message.data;
                    if (data.indent) {
                        refreshRulerMenuIndent(data.indent.left, data.indent.right);
                    }
                    if (data.documentSettings && data.documentSettings.header) {
                        var align = data.documentSettings.header.align, text = data.documentSettings.header.text;
                        $('#popup-menu-document-setup-content-radio-PageHeader input').each(function () {
                            $(this).attr('checked', (align == $(this).val())).button('refresh');
                        });
                        $('#popup-menu-tool-setting-content-text-PageHeader-text').val(text ? text : "");
                    }

                    if (data.documentSettings && data.documentSettings.footer) {
                        var align = data.documentSettings.footer.align, text = data.documentSettings.footer.text;
                        $('#popup-menu-document-setup-content-radio-PageFooter input').each(function () {
                            $(this).attr('checked', (align == $(this).val())).button('refresh');
                        });
                        $('#popup-menu-tool-setting-content-text-PageFooter-text').val(text ? text : "");
                    }
                    break;
                //// The end of Docs event handler  
                case com.hoperun.util.Observer.MessageType.POPU_MENU:
		        	if(currentSelectedObj && currentSelectedObj.getType()=="Page"){
		        		updateTextMenu(currentSelectedObj.getActiveStyle());
                        refreshTextLineSpacingMenu(currentSelectedObj);
                        initTextMenu();
		        		showMenu("Text", message.data);
		        	}
		        break;
                
            }
            
            if(needRefreshMenuFlag){
            	//When it is for text
                var menuEditButton = $('.menu-toolbar-text');
                menuEditButton.show();
                $(window).resize();
            }
        };
    };
    var textMenuListener = new com.hoperun.event.TextMenuListener();
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TEXT_SELECT, textMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION, textMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, textMenuListener);
}

