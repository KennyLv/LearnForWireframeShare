/**
 * Mouse Event class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author xuliyu
 */
if (!com.hoperun.event.MouseEvent) {
	com.hoperun.event.MouseEvent = {
		needToIgnoreMouseDown : false,
		mouseDown : function(evt) {
			// Hold cursor flash
			var message = new com.hoperun.util.Observer.Message();
			message.id = com.hoperun.util.Observer.MessageType.CURSOR_HIDE;
			com.hoperun.util.Observer.sendMessage(message);

			// Clear selection
			if (!evt.shiftKey) {
				window.getSelection().removeAllRanges();
				com.hoperun.util.BaseTool.hiddenOverWordDiv();
			}

			// Only when event target is below to Text or relation container.
			var obj = com.hoperun.util.BaseTool.findEventElement(evt);
			var isValidEvent = com.hoperun.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN,Slide");
			if (!isValidEvent) return;

			// Avoid to send message when event on tracker
			if (com.hoperun.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
				var msg = new com.hoperun.util.Observer.Message();
				msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
				msg.sender = this;
				com.hoperun.util.Observer.sendMessage(msg);
			}
		},
		
		mouseUp : function(evt) {
			evt.preventDefault();
			var obj = com.hoperun.util.BaseTool.findEventElement(evt);
			var isValidEvent = com.hoperun.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN,Slide");
			if (!isValidEvent) {
				// Avoid to send message when event on tracker
				if (com.hoperun.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
					// Hold cursor flash
					var message = new com.hoperun.util.Observer.Message();
					message.id = com.hoperun.util.Observer.MessageType.CURSOR_HIDE;
					com.hoperun.util.Observer.sendMessage(message);
				}
				return;
			}
			// Avoid to send message when event on tracker
			if (com.hoperun.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
				setTimeout(
					function() {
						try {
							var container = getActiveContainer();
							var winSelection = window.getSelection();
							var selection = com.hoperun.model.TextSelectionModelHelper.parseWindowSelection(winSelection, evt, evt.shiftKey);

							if (evt.shiftKey) {
								var oldSelection = container.getActiveSelection();
								selection.setFrom(oldSelection.getFrom());
								selection.setFromObj(oldSelection.getFromObj());
								selection.setFromOffset(oldSelection.getFromOffset());
							}
							if (selection) {
								// Reset selection
								container.setActiveSelection(selection);

								var paraObj = selection.getTo();
								var offset = selection.getToOffset();
								var style = null;

								style = paraObj.getTextContainerByOffset(offset).style;

								// Reset active style
								container.setActiveStyle(style);

								// Send text selection event.
								var message = new com.hoperun.util.Observer.Message();
								message.sender = container;
								message.id = com.hoperun.util.Observer.MessageType.TEXT_SELECT;
								com.hoperun.util.Observer.sendMessage(message);

								if (!selection.isCollapsed()) {
									com.hoperun.util.BaseTool.markTextSelection(selection);

									var cursorMsg = new com.hoperun.util.Observer.Message();
									cursorMsg.id = com.hoperun.util.Observer.MessageType.CURSOR_UNDISPLAY;
									com.hoperun.util.Observer.sendMessage(cursorMsg);
								}
							}
						} catch (e) { }
					}, 0);
			}
			return true;
		},
		
		click : function(evt, nodeObj) {
			if (nodeObj == null) return;
			
			var message = new com.hoperun.util.Observer.Message();
			message.sender = nodeObj;
			message.data = {};

			if (nodeObj.getType() == 'Cell') {
				message.id = com.hoperun.util.Observer.MessageType.CELL_CLICK;
			} else if (nodeObj.getType() == 'Image') {
				message.id = com.hoperun.util.Observer.MessageType.IMAGE_FOCUS;
				message.data = { trackerType : 'clip' };
			} else if (nodeObj.getType() == 'Video') {
				message.id = com.hoperun.util.Observer.MessageType.VIDEO_FOCUS;
			} else if (nodeObj.getBaseType() == 'Shape') {
				message.id = com.hoperun.util.Observer.MessageType.SHAPE_FOCUS;
			}
			message.data.type = nodeObj.getType();
			com.hoperun.util.Observer.sendMessage(message);
		},
		
		dblclick : function(evt, nodeObj) {
			if (nodeObj == null) return;
			
			var message = new com.hoperun.util.Observer.Message();
			message.sender = nodeObj;
			message.data = {};
			if (nodeObj.getType() == 'Cell') {
				message.id = com.hoperun.util.Observer.MessageType.CELL_DBLCLICK;
			} else if (nodeObj.getType() == 'Image') {
				message.id = com.hoperun.util.Observer.MessageType.IMAGE_FOCUS;
				message.data = { trackerType : 'resize' };
			} else if (nodeObj.getBaseType() == 'Shape') {
				message.id = com.hoperun.util.Observer.MessageType.SHAPE_EDIT;
			}
			com.hoperun.util.Observer.sendMessage(message);
		},

		contextmenu : function(evt, nodeObj) {
			if (nodeObj != null && nodeObj.getType() != 'Cell') {
            	//Send tracker focus
                var msg = new com.hoperun.util.Observer.Message();
                msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
                msg.sender = nodeObj;
                com.hoperun.util.Observer.sendMessage(msg);	
            }

            if (nodeObj != null) {
                if (nodeObj.getType() == 'Image') {
                    com.hoperun.event.ContextMenuEvent.show(nodeObj);
                }
                else if(message.sender.getType().indexOf("Chart_") == 0){
                    com.hoperun.event.ContextMenuEvent.show(nodeObj);
                }
                else if (message.sender.getType().indexOf("Shape_") == 0) {
                    //mouseRightClickMenu(nodeObj);
                    com.hoperun.event.ContextMenuEvent.show(nodeObj);
                }
            }
		}
	};
}