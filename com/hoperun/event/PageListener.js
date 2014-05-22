/**
 * PageListener Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author lu_feng
 */
if (!com.hoperun.event.PageListener) {
	com.hoperun.event.PageListener = function() {
		this.update = function(message) {
			switch (message.id) {
				case com.hoperun.util.Observer.MessageType.DOCUMENT_CREATE:
				    
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TEXT_SELECT, this);
					
					//Register image resize &layout event
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.IMAGE_RESIZE, this);
					
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHAPE_RESIZE, this);
					
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_LAYOUT, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_RESIZE, this);
					
					//Cut & Copy & Delete &Parse
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CUT_ITEM, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.COPY_ITEM, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.PASTE_ITEM, this);
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DELETE_ITEM, this);
			 
					//Register document style
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DOCUMENT_STYLE, this);
					
					//Save Paper
					com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DOCUMENT_SAVE, this);
					
					break;
				//
				case com.hoperun.util.Observer.MessageType.TEXT_SELECT:
					var container = message.sender;
					var selection = container.getActiveSelection();
					var isCollapsed = selection.isCollapsed();
					var cursorMsg = new com.hoperun.util.Observer.Message();
					
					cursorMsg.id = com.hoperun.util.Observer.MessageType.CURSOR_SHOW;
					cursorMsg.sender = selection;
					//TODO: consider whether cursor is needed
					if(isCollapsed){
						cursorMsg.data = {
							style: container.getActiveStyle()
						};
						
						var keyBoardMsg = new com.hoperun.util.Observer.Message();
						keyBoardMsg.id = com.hoperun.util.Observer.MessageType.KEYBOARD_ADD;
						com.hoperun.util.Observer.sendMessage(keyBoardMsg);
					}
					com.hoperun.util.Observer.sendMessage(cursorMsg);
					break;
				//Layout for Image & Shape
				case com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT:
				case com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT:
				case com.hoperun.util.Observer.MessageType.TABLE_LAYOUT:
					var container = getActiveContainer();
					var item = message.sender;
					var top = item.getTop();
					var pageDivObj = item.getDomInstance().parentNode;
					container.refreshPage(pageDivObj, top);
					break;
				
				//resize for Image & Shape
				case com.hoperun.util.Observer.MessageType.IMAGE_RESIZE:
				case com.hoperun.util.Observer.MessageType.SHAPE_RESIZE:
				case com.hoperun.util.Observer.MessageType.TABLE_RESIZE:
					var container = getActiveContainer();
					var tracker = message.sender;
					var item = tracker.getActiveItem();
					var pageDivObj = item.getDomInstance().parentNode;
					container.refreshPage(pageDivObj, item.getTop());
					break;
				case com.hoperun.util.Observer.MessageType.DOCUMENT_STYLE:
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
					var cursorMsg = new com.hoperun.util.Observer.Message();
					cursorMsg.id = com.hoperun.util.Observer.MessageType.CURSOR_HIDE;
					com.hoperun.util.Observer.sendMessage(cursorMsg);
					break;
				case com.hoperun.util.Observer.MessageType.COPY_ITEM:
					 var item = message.sender;
					 com.hoperun.util.clipboard = item;
	                 break;
				case com.hoperun.util.Observer.MessageType.PASTE_ITEM:
					 var container = getActiveContainer();
					 
					 if (com.hoperun.util.clipboard == null){
						 return;
					 }
					 
				     var item = com.hoperun.util.clipboard.clone();
				     
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
									for (var i = 0; i < com.hoperun.util.clipboard.paragraphs.length ; i++){
										item.paragraphs.push(com.hoperun.util.clipboard.paragraphs[i].clone());
									}
									var newSelection = from.insertTextBySelection(offset,item);
									from.refreshLineData();
									from.updatePage(true);
									
									newSelection.setFromObj(newSelection.getFrom().getSpanItem(newSelection.getFromOffset()));
									newSelection.doCollapse();
									
									container.setActiveSelection(newSelection);
									
									var flushMessage = new com.hoperun.util.Observer.Message();
									flushMessage.id = com.hoperun.util.Observer.MessageType.CURSOR_SHOW;
									flushMessage.sender = newSelection;
									var data = {
										onlyUpdateCursor: true 
									};
									flushMessage.data = data;
									com.hoperun.util.Observer.sendMessage(flushMessage);
									
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
								var updateMsg = new com.hoperun.util.Observer.Message();
								updateMsg.id = com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT;
								updateMsg.sender = item;
								updateMsg.data = {};
								com.hoperun.util.Observer.sendMessage(updateMsg);

								var message = new com.hoperun.util.Observer.Message();
								message.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
								message.sender = item;
								message.data = {};
								com.hoperun.util.Observer.sendMessage(message);

								var message = new com.hoperun.util.Observer.Message();
								message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
								message.sender = item;
								message.data = {};
								com.hoperun.util.Observer.sendMessage(message);
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
									
									 com.hoperun.util.BaseTool.markTextSelection(currSelection);
		                                
		                             var cursorMsg = new com.hoperun.util.Observer.Message();
		                             cursorMsg.id = com.hoperun.util.Observer.MessageType.CURSOR_UNDISPLAY;
		                             com.hoperun.util.Observer.sendMessage(cursorMsg);
								}else{
									var flushMessage = new com.hoperun.util.Observer.Message();
									flushMessage.id = com.hoperun.util.Observer.MessageType.CURSOR_SHOW;
									flushMessage.sender = newSelection;
									var data = {
										onlyUpdateCursor: true 
									};
									flushMessage.data = data;
									com.hoperun.util.Observer.sendMessage(flushMessage);
								}
								
							}else{
								if(container && item){
									com.hoperun.util.clipboard = item;
									var top = item.getTop();
									var pageDivObj = item.getDomInstance().parentNode;
									container.removeChild(item);
									container.refreshPage(pageDivObj, top);
									
						            var upZIndexMsg = new com.hoperun.util.Observer.Message();
						            upZIndexMsg.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
						            upZIndexMsg.sender = item;
						            upZIndexMsg.data = {
										'remove' : true,
										'criticalZIndex' : item.getZIndex()
									};
									com.hoperun.util.Observer.sendMessage(upZIndexMsg);
									
									//Notify table blur event
									var contextMsg = new com.hoperun.util.Observer.Message();
									contextMsg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
									contextMsg.sender = null;
						            com.hoperun.util.Observer.sendMessage(contextMsg);
								}
							}
						}
					 );
			         break;
				case com.hoperun.util.Observer.MessageType.CUT_ITEM:
					var container = getActiveContainer();
					var item = message.sender;
					jsk.execute(
						function () {
							if(container && item){
								com.hoperun.util.clipboard = item;
								var top = item.getTop();
								var pageDivObj = item.getDomInstance().parentNode;
								container.removeChild(item);
								container.refreshPage(pageDivObj, top);
								
					            var upZIndexMsg = new com.hoperun.util.Observer.Message();
					            upZIndexMsg.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
					            upZIndexMsg.sender = item;
					            upZIndexMsg.data = {
									'remove' : true,
									'criticalZIndex' : item.getZIndex()
								};
								com.hoperun.util.Observer.sendMessage(upZIndexMsg);
								
								//Notify table blur event
								var contextMsg = new com.hoperun.util.Observer.Message();
								contextMsg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
								contextMsg.sender = null;
					            com.hoperun.util.Observer.sendMessage(contextMsg);
					            return { "page": container, "item": item };
							}
						},
						function (data) {
							var container = data.page;
						    var item = data.item;
						    //setCurrSheet(page);
						    item.appendTo(container);
							var updateMsg = new com.hoperun.util.Observer.Message();
							updateMsg.id = com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT;
							updateMsg.sender = item;
							updateMsg.data = {};
							com.hoperun.util.Observer.sendMessage(updateMsg);

							var message = new com.hoperun.util.Observer.Message();
							message.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
							message.sender = item;
							message.data = {};
							com.hoperun.util.Observer.sendMessage(message);

							var message = new com.hoperun.util.Observer.Message();
							message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
							message.sender = item;
							message.data = {};
							com.hoperun.util.Observer.sendMessage(message);
						}
					);
					break;
				case com.hoperun.util.Observer.MessageType.DELETE_ITEM:
					var container = getActiveContainer();
					var item = message.sender;
					jsk.execute(
						function () {
							if(container && item){
								var top = item.getTop();
								var pageDivObj = item.getDomInstance().parentNode;
								container.removeChild(item);
								container.refreshPage(pageDivObj, top);
								
					            var upZIndexMsg = new com.hoperun.util.Observer.Message();
					            upZIndexMsg.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
					            upZIndexMsg.sender = item;
					            upZIndexMsg.data = {
									'remove' : true,
									'criticalZIndex' : item.getZIndex()
								};
								com.hoperun.util.Observer.sendMessage(upZIndexMsg);
								
								//Notify table blur event
								var contextMsg = new com.hoperun.util.Observer.Message();
								contextMsg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
								contextMsg.sender = null;
					            com.hoperun.util.Observer.sendMessage(contextMsg);
					            return { "page": container, "item": item };
							}
						},
						function (data) {
							com.hoperun.util.clipboard = null;
							var container = data.page;
						    var item = data.item;
						    
						    item.appendTo(container);
							var updateMsg = new com.hoperun.util.Observer.Message();
							updateMsg.id = com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT;
							updateMsg.sender = item;
							updateMsg.data = {};
							com.hoperun.util.Observer.sendMessage(updateMsg);

							var message = new com.hoperun.util.Observer.Message();
							message.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
							message.sender = item;
							message.data = {};
							com.hoperun.util.Observer.sendMessage(message);

							var message = new com.hoperun.util.Observer.Message();
							message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
							message.sender = item;
							message.data = {};
							com.hoperun.util.Observer.sendMessage(message);
						}
					);
					
					break;
				case com.hoperun.util.Observer.MessageType.DOCUMENT_SAVE:
					var container = getActiveContainer();
					var pageInfo = message.sender;
					com.hoperun.util.FileHelper.save(container.getData(), pageInfo);
					break;
					

			}
		};
	};

	var pageListener = new com.hoperun.event.PageListener();
	com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DOCUMENT_CREATE, pageListener);

}