/**
 * Mouse Event class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author xuliyu
 */
if (!com.kenny.event.MouseEvent) {
	com.kenny.event.MouseEvent = {
		needToIgnoreMouseDown : false,
		mouseDown : function(evt) {
			// Hold cursor flash
			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
			com.kenny.util.Observer.sendMessage(message);

			// Clear selection
			if (!evt.shiftKey) {
				window.getSelection().removeAllRanges();
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}

			// Only when event target is below to Text or relation container.
			var obj = com.kenny.util.BaseTool.findEventElement(evt);
			var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN,Slide");
			if (!isValidEvent) return;

			// Avoid to send message when event on tracker
			if (com.kenny.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
				var msg = new com.kenny.util.Observer.Message();
				msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
				msg.sender = this;
				com.kenny.util.Observer.sendMessage(msg);
			}
		},
		
		mouseUp : function(evt) {
			evt.preventDefault();
			var obj = com.kenny.util.BaseTool.findEventElement(evt);
			var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN,Slide");
			if (!isValidEvent) {
				// Avoid to send message when event on tracker
				if (com.kenny.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
					// Hold cursor flash
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
					com.kenny.util.Observer.sendMessage(message);
				}
				return;
			}
			// Avoid to send message when event on tracker
			if (com.kenny.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null) {
				setTimeout(
					function() {
						try {
							var container = getActiveContainer();
							var winSelection = window.getSelection();
							var selection = com.kenny.model.TextSelectionModelHelper.parseWindowSelection(winSelection, evt, evt.shiftKey);

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
								var message = new com.kenny.util.Observer.Message();
								message.sender = container;
								message.id = com.kenny.util.Observer.MessageType.TEXT_SELECT;
								com.kenny.util.Observer.sendMessage(message);

								if (!selection.isCollapsed()) {
									com.kenny.util.BaseTool.markTextSelection(selection);

									var cursorMsg = new com.kenny.util.Observer.Message();
									cursorMsg.id = com.kenny.util.Observer.MessageType.CURSOR_UNDISPLAY;
									com.kenny.util.Observer.sendMessage(cursorMsg);
								}
							}
						} catch (e) { }
					}, 0);
			}
			return true;
		},
		
		click : function(evt, nodeObj) {
			if (nodeObj == null) return;
			
			var message = new com.kenny.util.Observer.Message();
			message.sender = nodeObj;
			message.data = {};

			if (nodeObj.getType() == 'Cell') {
				message.id = com.kenny.util.Observer.MessageType.CELL_CLICK;
			} else if (nodeObj.getType() == 'Image') {
				message.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
				message.data = { trackerType : 'clip' };
			} else if (nodeObj.getType() == 'Video') {
				message.id = com.kenny.util.Observer.MessageType.VIDEO_FOCUS;
			} else if (nodeObj.getBaseType() == 'Shape') {
				message.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
			}
			message.data.type = nodeObj.getType();
			com.kenny.util.Observer.sendMessage(message);
		},
		
		dblclick : function(evt, nodeObj) {
			if (nodeObj == null) return;
			
			var message = new com.kenny.util.Observer.Message();
			message.sender = nodeObj;
			message.data = {};
			if (nodeObj.getType() == 'Cell') {
				message.id = com.kenny.util.Observer.MessageType.CELL_DBLCLICK;
			} else if (nodeObj.getType() == 'Image') {
				message.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
				message.data = { trackerType : 'resize' };
			} else if (nodeObj.getBaseType() == 'Shape') {
				message.id = com.kenny.util.Observer.MessageType.SHAPE_EDIT;
			}
			com.kenny.util.Observer.sendMessage(message);
		},

		contextmenu : function(evt, nodeObj) {
			if (nodeObj != null && nodeObj.getType() != 'Cell') {
            	//Send tracker focus
                var msg = new com.kenny.util.Observer.Message();
                msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
                msg.sender = nodeObj;
                com.kenny.util.Observer.sendMessage(msg);	
            }

            if (nodeObj != null) {
                if (nodeObj.getType() == 'Image') {
                    com.kenny.event.ContextMenuEvent.show(nodeObj);
                }
                else if(message.sender.getType().indexOf("Chart_") == 0){
                    com.kenny.event.ContextMenuEvent.show(nodeObj);
                }
                else if (message.sender.getType().indexOf("Shape_") == 0) {
                    //mouseRightClickMenu(nodeObj);
                    com.kenny.event.ContextMenuEvent.show(nodeObj);
                }
            }
		}
	};
}