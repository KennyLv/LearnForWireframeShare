/**
 * TextDoAction Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author zhang_zhiyuan
 */
 
 if (!com.hoperun.event.TextDoActionListener) {
	com.hoperun.event.TextDoActionListener = function() {
		
		this.sendCursorMessage = function(selection){
			var flushMessage = new com.hoperun.util.Observer.Message();
			flushMessage.id = com.hoperun.util.Observer.MessageType.CURSOR_SHOW;
			flushMessage.sender = selection;
			var data = {
				onlyUpdateCursor: true 
			};
			flushMessage.data = data;
			com.hoperun.util.Observer.sendMessage(flushMessage);
		};
		
		this.update = function(message) {
			var container = getActiveContainer();
			
			var selectionData = container.getActiveSelection().getData(); //Backup the current selection data.
			var selection = new com.hoperun.model.TextSelectionModel(); //New selection		
			
			var isValidActionFlag = true;
			switch (message.id) {
				case com.hoperun.util.Observer.MessageType.TEXT_ACTION_BACKSPACE_DELETE:
					this.doDeleteCharacter(container, selection, selectionData, message.data);
					break;
				case com.hoperun.util.Observer.MessageType.TEXT_ACTION_ENTER:
					this.doEnter(container, selection, selectionData, message.data);
					break;
				case com.hoperun.util.Observer.MessageType.PARAGRAPH_ACTION_DELETE:
					this.doCombineNextParagraph(container, selection, selectionData, message.data);
					break;	
				case com.hoperun.util.Observer.MessageType.PARAGRAPH_ACTION_BACKSPACE:
					this.doCombinePreviousParagraph(container, selection, selectionData, message.data);
					break;
				case com.hoperun.util.Observer.MessageType.TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE:
					this.doDeleteSelection(container, selection, selectionData, message.data);
					break;
				case com.hoperun.util.Observer.MessageType.TEXT_ACTION_INPUT:
					this.doInput(container, selection, selectionData, message.data);
					break;
				case com.hoperun.util.Observer.MessageType.TEXT_ACTION_REPLACE:
					this.doReplace(container, selection, selectionData, message.data);
					break;
				default:
					isValidActionFlag = false;
					break;
			}
			
			if(isValidActionFlag){
				var keyBoardFocus = new com.hoperun.util.Observer.Message();
				keyBoardFocus.id = com.hoperun.util.Observer.MessageType.KEYBOARD_FOCUS;
	            com.hoperun.util.Observer.sendMessage(keyBoardFocus);
			}
		};
	};
	com.hoperun.event.TextDoActionListener.prototype = {
		resetActiveStyle: function(selection, container){
			var paraObj = selection.getFrom();
			var offset = selection.getFromOffset();
			var styleItemObj = paraObj.getTextContainerByOffset(offset);
			if(styleItemObj.style){
				container.setActiveStyle(styleItemObj.style);
			}
		},
		resetBackActiveStyle: function(style, container){
			if(style){
				container.setActiveStyle(style);
			}
		},
		doInput: function(backupContainer, newSelection, backupSelectionData, backupData){
			var container = backupContainer;
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var activeStyle = container.getActiveStyle().clone();
			var data = backupData;
			var self = this;
			jsk.execute(
				//Redo
				function () {
					selection.setData(selectionData); //Reset selection to original values
					container.setActiveStyle(activeStyle);
					
					var offset = data.offset;
					var text = data.textData.join('');

					var newOffset = selection.getFrom().setTextByOffset(offset, text);
					selection.getFrom().refreshLineData();
			    	selection.getFrom().updatePage(true);
			    	
					selection.setFromObj(selection.getFrom().getSpanItem(newOffset));
			    	selection.setFromOffset(newOffset);
			    	selection.doCollapse();

			    	container.setActiveSelection(selection);
			    	self.resetActiveStyle(selection, container);
			    	
					self.sendCursorMessage(selection);
					container.sendSelectionChangeNotify();
					
					return { "offset": offset, "textData": data.textData, "selectionData":selectionData, "selection":selection, "activeStyle":activeStyle };
				},
				//Undo
				function (data) {
					
					var offset = data.offset;
					var text = data.textData.join('');
					var selection = data.selection;
					
					selection.setData(data.selectionData); //Reset selection to original values
					selection.setFromOffset(offset);
					selection.setFromObj(selection.getFrom().getSpanItem(offset));
					selection.doCollapse();
			    	
					selection.setToOffset(offset + text.length);
					selection.setToObj(selection.getTo().getSpanItem(offset + text.length));
					
					var rel = container.deleteSelection(selection);
					selection.setFrom(rel.obj);
			    	selection.setFromObj(rel.divObj);
			    	selection.setFromOffset(rel.offset);
			    	selection.doCollapse();
			    	container.setActiveSelection(selection);
			    	self.resetBackActiveStyle(data.activeStyle, container);
			    	
			    	self.sendCursorMessage(selection);
			    	container.sendSelectionChangeNotify();
				}
			);
			
		},
		doReplace : function (backupContainer, newSelection, backupSelectionData, backupData){
			var self = this;
			
			var container = backupContainer;
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var activeStyle = container.getActiveStyle().clone();
			var data = backupData;
			
			selection.setData(selectionData);
			
			if (selection.isReverse()){
				selection.doSwap()
			}
			var undoData = container.getDataBySelection(selection);
			
			//Remvoe selected texts
			var rel = container.deleteSelection(selection);
		    
			jsk.execute(
				//Redo
				function(){
					container.setActiveStyle(activeStyle);
					
					var offset = data.offset;
					var text = data.textData.join('');

					var newOffset = selection.getFrom().setTextByOffset(offset, text);
					selection.getFrom().refreshLineData();
			    	selection.getFrom().updatePage(true);
			    	
					selection.setFromObj(selection.getFrom().getSpanItem(newOffset));
			    	selection.setFromOffset(newOffset);
			    	selection.doCollapse();
			    	
			    	container.setActiveSelection(selection);
			    	self.resetActiveStyle(selection, container);
			    	
					self.sendCursorMessage(selection);
					container.sendSelectionChangeNotify();
					
				},
				//Undo
				function(){
					
					var offset = data.offset;
					var text = data.textData.join('');
					
					selection.setData(selectionData); //Reset selection to original values
					selection.setFromOffset(offset);
					selection.setFromObj(selection.getFrom().getSpanItem(offset));
					selection.doCollapse();
			    	
					selection.setToOffset(offset + text.length);
					selection.setToObj(selection.getTo().getSpanItem(offset + text.length));
					
					var rel = container.deleteSelection(selection);
				
					container.recoverSelection(undoData);
					
					
					selection.setData(selectionData);
					com.hoperun.util.BaseTool.markTextSelection(selection);
					
					var message = new com.hoperun.util.Observer.Message();
                    message.id = com.hoperun.util.Observer.MessageType.CURSOR_HIDE;
                    com.hoperun.util.Observer.sendMessage(message);
				}
			);
		},
		doDeleteCharacter: function(container, newSelection, backupSelectionData, backupData){
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var data = backupData;
			var textActionFlag = data.textActionFlag;
			var activeStyle = container.getActiveStyle().clone();
			var self = this;
			jsk.execute(
				//Redo
				function () {
					selection.setData(selectionData); //Reset selection to original values
					
					var offset = selection.getFromOffset();
					var oldValue = null;
					var removeOffset = -1;
					// Backspace
					if(textActionFlag == '1'){	
						oldValue = selection.getFrom().removeTextByOffset(offset);
						removeOffset = offset - 1;
						selection.setFromOffset(removeOffset);
					}else if(textActionFlag == '2'){
						// Delete
						oldValue =selection.getFrom().removeTextByOffset(offset, offset + 1);
						removeOffset = offset;
					}							
					selection.getFrom().refreshLineData();
					selection.getFrom().updatePage(true);
					selection.setFromObj(selection.getFrom().getSpanItem(removeOffset));
					selection.doCollapse();
					container.setActiveSelection(selection);
					self.resetActiveStyle(selection, container);
					self.sendCursorMessage(selection);
					container.sendSelectionChangeNotify();
					return { "oldOffset": removeOffset,"oldValue": oldValue, "activeStyle":activeStyle };
				},
				//Undo
				function (data) {
					selection.getFrom().setTextByOffset(data.oldOffset, data.oldValue);
					selection.getFrom().refreshLineData();
					selection.getFrom().updatePage(true);
					selection.setFromObj(selection.getFrom().getSpanItem(data.oldOffset));
					// Backspace
					if(textActionFlag == '1'){
						selection.setFromOffset(data.oldOffset + 1);
					}else if(textActionFlag == '2'){
						// Delete
						selection.setFromOffset(data.oldOffset);
					}
					selection.doCollapse();
					container.setActiveSelection(selection);
					self.resetBackActiveStyle(data.activeStyle, container);
					self.sendCursorMessage(selection);
					container.sendSelectionChangeNotify();
				}
			);
		},
		
		doEnter:  function(container, newSelection, backupSelectionData, backupData){
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var activeStyle = container.getActiveStyle().clone();
			var self = this;
			
			var newParagraphObj = null;
			jsk.execute(
				function () {							
					selection.setData(selectionData);
					
					var oldParagraphFlag = true;
					// Enter
					var rel = selection.getFrom().breakParagraph(selection.getFromOffset(), newParagraphObj);
					newParagraphObj = rel.obj;
					selection.setFrom(rel.obj);
					selection.setFromObj(rel.divObj);
					selection.setFromOffset(0);
					selection.doCollapse();
					container.setActiveSelection(selection);
					self.resetActiveStyle(selection, container);
					self.sendCursorMessage(selection);
					container.sendSelectionChangeNotify();
					return { "oldParagraphFlag": oldParagraphFlag, "activeStyle":activeStyle };
				},
				function (data) {
					var rel = selection.getFrom().conbineParagraph(data.oldParagraphFlag);
					if(rel){
						selection.setFrom(rel.obj);
						selection.setFromObj(rel.divObj);
						selection.setFromOffset(rel.offset);
						selection.doCollapse();
						container.setActiveSelection(selection);
						self.resetBackActiveStyle(data.activeStyle, container);
						self.sendCursorMessage(selection);
						container.sendSelectionChangeNotify();
					}
				}
			);	
		},
		
		doCombinePreviousParagraph: function(container, newSelection, backupSelectionData, backupData){
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var self = this;
			var activeStyle = container.getActiveStyle().clone();
			jsk.execute(
				function () {
					selection.setData(selectionData);
					
					var paragraphObj = selection.getFrom(), offset = selection.getFromOffset();
					// Backspace in the first place
					var rel = selection.getFrom().conbineParagraph(true);
							
			    	selection.setFrom(rel.obj);
			    	selection.setFromObj(rel.divObj);
			    	selection.setFromOffset(rel.offset);
			    	selection.doCollapse();
			    	container.setActiveSelection(selection);
			    	self.resetActiveStyle(selection, container);
			    	self.sendCursorMessage(selection);
			    	container.sendSelectionChangeNotify();
					return {"paragraphObj": paragraphObj, 'offset':offset, 'breakOffset':rel.offset, "activeStyle":activeStyle };
				},
				function (data) {
					selection.getFrom().breakParagraph(data.breakOffset, data.paragraphObj);
					
					selection.setFrom(data.paragraphObj);
					selection.setFromOffset(0);
			    	selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
			    	selection.doCollapse();
			    	container.setActiveSelection(selection);
			    	self.resetBackActiveStyle(data.activeStyle, container);
			    	self.sendCursorMessage(selection);
			    	container.sendSelectionChangeNotify();
				}
			);	
		},
		
		doCombineNextParagraph: function(container, newSelection, backupSelectionData, backupData){
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var activeStyle = container.getActiveStyle().clone();
			var self = this;
			var nextParaObj = data.nextParaObj;
			
			jsk.execute(
				function () {
					selection.setData(selectionData);
					
					var rel = null;
					var offset = selection.getFromOffset();
					// Delete in the last place
					rel = selection.getFrom().conbineParagraph(false);

			    	selection.setFrom(rel.obj);
			    	selection.setFromObj(rel.divObj);
			    	selection.setFromOffset(rel.offset);
			    	selection.doCollapse();
			    	container.setActiveSelection(selection);
			    	self.resetActiveStyle(selection, container);
			    	self.sendCursorMessage(selection);
			    	container.sendSelectionChangeNotify();
					return {"nextParaObj": nextParaObj, 'breakOffset':rel.offset, "activeStyle":activeStyle };

				},
				function (data) {
					selection.getFrom().breakParagraph(data.breakOffset, data.nextParaObj);
			    	selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
			    	selection.doCollapse();
			    	container.setActiveSelection(selection);
			    	self.resetBackActiveStyle(data.activeStyle, container);
			    	self.sendCursorMessage(selection);
			    	container.sendSelectionChangeNotify();
				}
			);
		},
		doDeleteSelection:function(container, newSelection, backupSelectionData, backupData){
			var selection = newSelection;
			var selectionData = backupSelectionData;
			var self = this;
			var activeStyle = container.getActiveStyle().clone();
			selection.setData(selectionData);
			var undoData = container.getDataBySelection(selection);
			var paragraphObj = selection.getTo(), offset = selection.getToOffset();
			
			var onlyDeleteFlag = backupData.onlyDelete ? backupData.onlyDelete : false; 
			if(onlyDeleteFlag){
				var rel = container.deleteSelection(selection);
				selection.setFrom(rel.obj);
		    	selection.setFromObj(rel.divObj);
		    	selection.setFromOffset(rel.offset);
		    	selection.doCollapse();
		    	container.sendSelectionChangeNotify();
			}
			else{
				jsk.execute(
					function () {
						selection.setData(selectionData);
						
						var rel = container.deleteSelection(selection);
						selection.setFrom(rel.obj);
				    	selection.setFromObj(rel.divObj);
				    	selection.setFromOffset(rel.offset);
				    	selection.doCollapse();
				    	container.setActiveSelection(selection);
				    	self.resetActiveStyle(selection, container);
				    	self.sendCursorMessage(selection);
				    	container.sendSelectionChangeNotify();
						return { 'undoData':undoData, paragraphObj: paragraphObj, offset:offset, "activeStyle":activeStyle };
					},
					function (data) {						
						container.recoverSelection(data.undoData);
						
						selection.setFrom(data.paragraphObj);
						selection.setFromOffset(data.offset);
				    	selection.setFromObj(selection.getFrom().getSpanItem(selection.getFromOffset()));
				    	selection.doCollapse();
				    	container.setActiveSelection(selection);
				    	self.resetBackActiveStyle(data.activeStyle, container);
				    	self.sendCursorMessage(selection);
				    	container.sendSelectionChangeNotify();
					}
				);
			}
		}
	};
	var textDoActionListener = new com.hoperun.event.TextDoActionListener();
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_ACTION_BACKSPACE_DELETE,
			textDoActionListener);
			
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_ACTION_ENTER,
			textDoActionListener);		
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.PARAGRAPH_ACTION_DELETE,
			textDoActionListener);		
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.PARAGRAPH_ACTION_BACKSPACE,
			textDoActionListener);		
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE,
			textDoActionListener);
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_ACTION_INPUT,
			textDoActionListener);
	
	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.TEXT_ACTION_REPLACE,
			textDoActionListener);
	
}