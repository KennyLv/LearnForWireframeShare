/**
* Shape Menu Listener class
* 
* @package com.hoperun.event
* @author Haipei ZHANG
*/
if (!com.hoperun.event.ShapeMenuListener) {
    com.hoperun.event.ShapeMenuListener = function () {	
        this.update = function (message) {
            switch (message.id) { 
                case com.hoperun.util.Observer.MessageType.SHAPE_FOCUS:
                    currentSelectedObj = message.sender;
                    break;
                case com.hoperun.util.Observer.MessageType.SVG_STYLE_NOTIFY:
                	var currentType = currentSelectedObj.getType();
                	var currentObject = currentSelectedObj.getData();
                    if (currentType == 'Line' || currentType == 'ArrowLine' || currentType == 'ShapeArrow') {
                    	currentType = 'ShapeArrow';
                        updateShapeArrowMenu(currentObject);
                    } else {
                        if (currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox') {
                            currentType = 'ShapeText';
                            updateShapeImageMenu(currentObject, currentType);
                            //Whether it is editor mode
                            var isEditingFlag = currentSelectedObj.getIsEditingFlag();
                            if(isEditingFlag){
                            	updateShapeTextBoxStyle(currentSelectedObj, currentObject, currentType);
                            }
                            initShapeTextMenu();
                        } else {
                            currentType = 'ShapeImage';
                            updateShapeImageMenu(currentObject, currentType);
                            initShapeImageMenu();
                        }
                    }
                	break;
                case com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY:
                	currentSelectedObj = message.sender;
                	var data = message.data;
                	updateMenuTextStatus(data.style, data.paragraphStyleData);
                    updateShapeImageMenu(message.sender.getData(), message.sender.getType());
                    var isEditingFlag = currentSelectedObj.getIsEditingFlag();
                    if(isEditingFlag){
                    	updateShapeTextBoxStyle(currentSelectedObj, message.sender.getData(), message.sender.getType());
                    }
                    initShapeTextMenu();
                	//needRefreshMenuFlag = true;
                	break; 
                case com.hoperun.util.Observer.MessageType.POPU_MENU:
		        	if (currentSelectedObj && currentSelectedObj.getType() != "Page"
						&& currentSelectedObj.getType() != "Image" && currentSelectedObj.getType() != "Table"
						&& currentSelectedObj.getType() != "Cell" && currentSelectedObj.getType() != "None") {
		        		//Reset shape text menu
                    	$('#Menu_Edit_ShapeImageSet .menu-shape-style-item').css('display', '');
                    	var selected = $('#Menu_Edit_ShapeImageSet').tabs('option','selected');
                    	var currentType = currentSelectedObj.getType();
                    	//$('#Menu_Edit_ShapeImages_Style, #Menu_Edit_ShapeImages_Text, #Menu_Edit_ShapeImages_Arrange').css('display', '');
                        if (currentType == 'Line' || currentType == 'ArrowLine' || currentType == 'ShapeArrow') {
                        	currentType = 'ShapeArrow';
                            updateShapeArrowMenu(currentSelectedObj.getData());
                        } else {
                            if (currentSelectedObj.getType && currentSelectedObj.getType() == 'TextBox') {
                            	currentType = 'ShapeText';
                                updateShapeImageMenu(currentSelectedObj.getData(), currentType);
                                //Whether it is editor mode
                                var isEditingFlag = currentSelectedObj.getIsEditingFlag();
                                if(isEditingFlag){
                                	$('#Menu_Edit_ShapeImageSet .menu-shape-style-item-notext').css('display', 'none');
                                	selected = 1;
                                	updateShapeTextBoxStyle(currentSelectedObj, currentSelectedObj.getData(), currentType);
                                	initShapeTextMenu();
                                	//$('#Menu_Edit_ShapeImages_Style, #Menu_Edit_ShapeImages_Arrange').css('display', 'none');
                                }
                                else{
                                	if(selected == 1){
                                		selected = 0;
                                	};
                                	$('#Menu_Edit_ShapeImageSet .menu-shape-style-item-text').css('display', 'none');
                                }
                                initShapeTextMenu();
                                //initShapeImageMenu();
                            } else {
                                //'Square''Rectangle''Ellipse''Triangle'
                                //'AbnormityTriangle''SingleArrow' 
                                //'DoubleArrow''Diamond''Pentagon''Star'
                            	currentType = 'ShapeImage';
                                updateShapeImageMenu(currentSelectedObj.getData(), currentType);
                                initShapeImageMenu();
                            }
                        }
                        $('#Menu_Edit_ShapeImageSet').tabs({ 'selected': selected });
                        
		        		showMenu(currentType, message.data);
		        	}
		        break;
                
            }
            if (message.id == com.hoperun.util.Observer.MessageType.SHAPE_FOCUS || message.id == com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY) {
            	//When it is for text
                var menuEditButton = $('.menu-toolbar-text');
                var showEditButtonFlag = false;
            	if(message.id == com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY){
            		showEditButtonFlag = currentSelectedObj.getIsEditingFlag();
            	}
            	if(showEditButtonFlag){
                	menuEditButton.show();
                } 
                else{
                	menuEditButton.hide();
                }
        		$(window).resize();
            }
        };
    };
    var shapeMenuListener = new com.hoperun.event.ShapeMenuListener();
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHAPE_FOCUS, shapeMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY, shapeMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_STYLE_NOTIFY, shapeMenuListener);
    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.POPU_MENU, shapeMenuListener);
}

