/**
 * PageListener Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.PageListener) {
	com.kenny.event.PageListener = function() {
		this.update = function(message) {
			switch (message.id) {
				case com.kenny.util.Observer.MessageType.DOCUMENT_CREATE:
				    
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.TEXT_SELECT, this);
					
					//Register image resize &layout event
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.IMAGE_LAYOUT, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.IMAGE_RESIZE, this);
					
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SHAPE_LAYOUT, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.SHAPE_RESIZE, this);
					
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.TABLE_LAYOUT, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.TABLE_RESIZE, this);
					
					//Cut & Copy & Delete &Parse
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.CUT_ITEM, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.COPY_ITEM, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.PASTE_ITEM, this);
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.DELETE_ITEM, this);
			 
					//Register document style
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.DOCUMENT_STYLE, this);
					
					//Save Paper
					com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.DOCUMENT_SAVE, this);
					
					break;
				//
				case com.kenny.util.Observer.MessageType.TEXT_SELECT:
					var container = message.sender;
					var selection = container.getActiveSelection();
					var isCollapsed = selection.isCollapsed();
					var cursorMsg = new com.kenny.util.Observer.Message();
					
					cursorMsg.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
					cursorMsg.sender = selection;
					//TODO: consider whether cursor is needed
					if(isCollapsed){
						cursorMsg.data = {
							style: container.getActiveStyle()
						};
						
						var keyBoardMsg = new com.kenny.util.Observer.Message();
						keyBoardMsg.id = com.kenny.util.Observer.MessageType.KEYBOARD_ADD;
						com.kenny.util.Observer.sendMessage(keyBoardMsg);
					}
					com.kenny.util.Observer.sendMessage(cursorMsg);
					break;
				//Layout for Image & Shape
				case com.kenny.util.Observer.MessageType.IMAGE_LAYOUT:
				case com.kenny.util.Observer.MessageType.SHAPE_LAYOUT:
				case com.kenny.util.Observer.MessageType.TABLE_LAYOUT:
					var container = getActiveContainer();
					var item = message.sender;
					var top = item.getTop();
					var pageDivObj = item.getDomInstance().parentNode;
					container.refreshPage(pageDivObj, top);
					break;
				
				//resize for Image & Shape
				case com.kenny.util.Observer.MessageType.IMAGE_RESIZE:
				case com.kenny.util.Observer.MessageType.SHAPE_RESIZE:
				case com.kenny.util.Observer.MessageType.TABLE_RESIZE:
					var container = getActiveContainer();
					var tracker = message.sender;
					var item = tracker.getActiveItem();
					var pageDivObj = item.getDomInstance().parentNode;
					container.refreshPage(pageDivObj, item.getTop());
					break;
				case com.kenny.util.Observer.MessageType.DOCUMENT_STYLE:
					var data = message.data;
					var container = getActiveContainer();
					var contentPadding = container.getContentPadding();
					if(data.rulerLeftIndent){
						contentPadding.left = data.rulerLeftIndent;
						container.refreshAllPage();
					}
					else if(data.rulerRightIndent){
						contentPadding.right = data.rulerRightIndent;
						container.refreshAllPage();
					}
					else if(data.documentSettings){
						container.setPageSetting(data.documentSettings);
						//container.refreshAllPage();
					}
					
					//Notify table blur event
					var cursorMsg = new com.kenny.util.Observer.Message();
					cursorMsg.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
					com.kenny.util.Observer.sendMessage(cursorMsg);
					break;
				case com.kenny.util.Observer.MessageType.COPY_ITEM:
					 var item = message.sender;
					 com.kenny.util.clipboard = item;
	                 break;
				case com.kenny.util.Observer.MessageType.PASTE_ITEM:
					 var container = getActiveContainer();
					 
					 if (com.kenny.util.clipboard == null){
						 return;
					 }
					 
				     var item = com.kenny.util.clipboard.clone();
				     
					 jsk.execute(
						function(){
							
							if (item.getType() == 'Text'){
								 var currSelection = container.getActiveSelection();
								 
								 var undoData;
								 if (!currSelection.isCollapsed()){
									 undoData = container.getDataBySelection(currSelection);
										
										//Remvoe selected texts
									 var rel = container.deleteSelection(currSelection.clone());
									 
									 
								 }
								 
									var offset = currSelection.getFromOffset();
									var from = currSelection.getFrom();
									
									item.paragraphs = [];
									
									//paste must clone
									for (var i = 0; i < com.kenny.util.clipboard.paragraphs.length ; i++){
										item.paragraphs.push(com.kenny.util.clipboard.paragraphs[i].clone());
									}
									var newSelection = from.insertTextBySelection(offset,item);
									from.refreshLineData();
									from.updatePage(true);
									
									newSelection.setFromObj(newSelection.getFrom().getSpanItem(newSelection.getFromOffset()));
									newSelection.doCollapse();
									
									container.setActiveSelection(newSelection);
									
									var flushMessage = new com.kenny.util.Observer.Message();
									flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
									flushMessage.sender = newSelection;
									var data = {
										onlyUpdateCursor: true 
									};
									flushMessage.data = data;
									com.kenny.util.Observer.sendMessage(flushMessage);
									
									return {
										"container" : container,
										"item": currSelection,
										"currSelection": currSelection,
										"newSelection" : newSelection,
										"undoData": undoData
									};
							}else{
								
								if (container.getCursorPosition && container.getCursorPosition()) {
									item.setTop(container.getCursorPosition().y);
									item.setLeft(container.getCursorPosition().x);
								} 
							   
								item.appendTo(container);
								var updateMsg = new com.kenny.util.Observer.Message();
								updateMsg.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
								updateMsg.sender = item;
								updateMsg.data = {};
								com.kenny.util.Observer.sendMessage(updateMsg);

								var message = new com.kenny.util.Observer.Message();
								message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								message.sender = item;
								message.data = {};
								com.kenny.util.Observer.sendMessage(message);

								var message = new com.kenny.util.Observer.Message();
								message.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
								message.sender = item;
								message.data = {};
								com.kenny.util.Observer.sendMessage(message);
								return {
									"container" : container,
									"item" : item
								};
							}
							
						}, 
						function(data){
							var item = data.item;
							var container = data.container;
							
							if (item.getType() == 'Text'){
								var newSelection = data.newSelection;
								var currSelection = data.currSelection;
								
								newSelection.setFrom(currSelection.getFrom());
								newSelection.setFromOffset(currSelection.getFromOffset());
								newSelection.setFromObj(currSelection.getFromObj());
								
								var rel = container.deleteSelection(newSelection);
								
								newSelection.setTo(rel.obj);
								newSelection.setToOffset(rel.offset);
								newSelection.setToObj(rel.divObj);
								
								if (data.undoData){
									container.recoverSelection(data.undoData);
									
									 com.kenny.util.BaseTool.markTextSelection(currSelection);
		                                
		                             var cursorMsg = new com.kenny.util.Observer.Message();
		                             cursorMsg.id = com.kenny.util.Observer.MessageType.CURSOR_UNDISPLAY;
		                             com.kenny.util.Observer.sendMessage(cursorMsg);
								}else{
									var flushMessage = new com.kenny.util.Observer.Message();
									flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
									flushMessage.sender = newSelection;
									var data = {
										onlyUpdateCursor: true 
									};
									flushMessage.data = data;
									com.kenny.util.Observer.sendMessage(flushMessage);
								}
								
							}else{
								if(container && item){
									com.kenny.util.clipboard = item;
									var top = item.getTop();
									var pageDivObj = item.getDomInstance().parentNode;
									container.removeChild(item);
									container.refreshPage(pageDivObj, top);
									
						            var upZIndexMsg = new com.kenny.util.Observer.Message();
						            upZIndexMsg.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
						            upZIndexMsg.sender = item;
						            upZIndexMsg.data = {
										'remove' : true,
										'criticalZIndex' : item.getZIndex()
									};
									com.kenny.util.Observer.sendMessage(upZIndexMsg);
									
									//Notify table blur event
									var contextMsg = new com.kenny.util.Observer.Message();
									contextMsg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
									contextMsg.sender = null;
						            com.kenny.util.Observer.sendMessage(contextMsg);
								}
							}
						}
					 );
			         break;
				case com.kenny.util.Observer.MessageType.CUT_ITEM:
					var container = getActiveContainer();
					var item = message.sender;
					jsk.execute(
						function () {
							if(container && item){
								com.kenny.util.clipboard = item;
								var top = item.getTop();
								var pageDivObj = item.getDomInstance().parentNode;
								container.removeChild(item);
								container.refreshPage(pageDivObj, top);
								
					            var upZIndexMsg = new com.kenny.util.Observer.Message();
					            upZIndexMsg.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
					            upZIndexMsg.sender = item;
					            upZIndexMsg.data = {
									'remove' : true,
									'criticalZIndex' : item.getZIndex()
								};
								com.kenny.util.Observer.sendMessage(upZIndexMsg);
								
								//Notify table blur event
								var contextMsg = new com.kenny.util.Observer.Message();
								contextMsg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
								contextMsg.sender = null;
					            com.kenny.util.Observer.sendMessage(contextMsg);
					            return { "page": container, "item": item };
							}
						},
						function (data) {
							var container = data.page;
						    var item = data.item;
						    //setCurrSheet(page);
						    item.appendTo(container);
							var updateMsg = new com.kenny.util.Observer.Message();
							updateMsg.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
							updateMsg.sender = item;
							updateMsg.data = {};
							com.kenny.util.Observer.sendMessage(updateMsg);

							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
							message.sender = item;
							message.data = {};
							com.kenny.util.Observer.sendMessage(message);

							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
							message.sender = item;
							message.data = {};
							com.kenny.util.Observer.sendMessage(message);
						}
					);
					break;
				case com.kenny.util.Observer.MessageType.DELETE_ITEM:
					var container = getActiveContainer();
					var item = message.sender;
					jsk.execute(
						function () {
							if(container && item){
								var top = item.getTop();
								var pageDivObj = item.getDomInstance().parentNode;
								container.removeChild(item);
								container.refreshPage(pageDivObj, top);
								
					            var upZIndexMsg = new com.kenny.util.Observer.Message();
					            upZIndexMsg.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
					            upZIndexMsg.sender = item;
					            upZIndexMsg.data = {
									'remove' : true,
									'criticalZIndex' : item.getZIndex()
								};
								com.kenny.util.Observer.sendMessage(upZIndexMsg);
								
								//Notify table blur event
								var contextMsg = new com.kenny.util.Observer.Message();
								contextMsg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
								contextMsg.sender = null;
					            com.kenny.util.Observer.sendMessage(contextMsg);
					            return { "page": container, "item": item };
							}
						},
						function (data) {
							com.kenny.util.clipboard = null;
							var container = data.page;
						    var item = data.item;
						    
						    item.appendTo(container);
							var updateMsg = new com.kenny.util.Observer.Message();
							updateMsg.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
							updateMsg.sender = item;
							updateMsg.data = {};
							com.kenny.util.Observer.sendMessage(updateMsg);

							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
							message.sender = item;
							message.data = {};
							com.kenny.util.Observer.sendMessage(message);

							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
							message.sender = item;
							message.data = {};
							com.kenny.util.Observer.sendMessage(message);
						}
					);
					
					break;
				case com.kenny.util.Observer.MessageType.DOCUMENT_SAVE:
					var container = getActiveContainer();
					var pageInfo = message.sender;
					com.kenny.util.FileHelper.save(container.getData(), pageInfo);
					break;
					

			}
		};
	};

	var pageListener = new com.kenny.event.PageListener();
	com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.DOCUMENT_CREATE, pageListener);

}