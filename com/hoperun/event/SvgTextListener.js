/**
 * Cursor Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.TextHelper, com.hoperun.util.Observer
 * @author lu_feng
 */
if (!com.hoperun.event.SvgTextListener) {
	com.hoperun.event.SvgTextListener = function() {
		this.update = function(message) {
			this._activeItem = message.sender;
			var validFlag = true;
			
			switch(message.id){
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT:
					this.doInputAction(message.data.valDataArr, message.data.imeModeFlag);
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT_ITEM:
					this.doInputItemAction(message.data.val, message.data.imeModeFlag);
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_DELETE:
					this.doDeleteAction(message.data);
					com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
					validFlag = message.data.onlyDelete && message.data.onlyDelete == false; 
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_BACKSPACE:
					this.doBackspaceAction();
					com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_ENTER:
					this.doEnterAction();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_LEFT:
					this.doLeftAction();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_RIGHT:
					this.doRightAction();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_UP:
					this.doUpAction();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_DOWN:
					this.doDownAction();
					break;
					
				case com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE:
					this.doStyleAction(message.data);
					break;
					
				default: 
					validFlag = false;
					break;
			}
			
			if(validFlag && message.id != com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT){
				this._setKeyBoardActive();
			} 
			else{
				//console.info("Command: "+ message.id);
			}
			
			this.sendTextStyleEvent(this._activeItem.getActiveSelection());
		};
	};
	
	com.hoperun.event.SvgTextListener.prototype = {
		_activeItem: null,
		
		_updateCursor: function(selection, type){
			type = type == null ? com.hoperun.util.Observer.MessageType.SVG_CURSOR_SHOW : type;
			var message = new com.hoperun.util.Observer.Message();
			message.id = type;
			message.sender = selection;
			com.hoperun.util.Observer.sendMessage(message);
			
			//Hide
			com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
		},
		
		_setKeyBoardActive: function(){
			var message = new com.hoperun.util.Observer.Message();
			message.id = com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_ACTIVE;
			com.hoperun.util.Observer.sendMessage(message);
		},
		
		_updateSelection: function(activeItem, selection, offset, paraIdx){
			activeItem.setActiveSelection(selection);
			if(paraIdx!=null) selection.setFrom(paraIdx); 
			if(offset!=null)selection.setFromOffset(offset);
			//Force to refresh from object
			selection.setFromObj(activeItem.getItemWithOffset(selection.getFrom(), offset));
			selection.doCollapse();
		},
		
		doDeleteAction: function(data){
			var onlyDeleteFlag = data.onlyDelete != null ? data.onlyDelete : false; 
			var selectionData = this._activeItem.getActiveSelection().getData();
			var selection = new com.hoperun.model.SvgTextSelectionModel();
			var activeItem = this._activeItem;
			var self = this;
			
			var redo = function(){
				var rel = {
					selection: selection,
					selectionData: selectionData,
					activeItem: activeItem
				};
				
				var offset = -1;
				selection.setData(selectionData); //Recover to the selection expected
				
				if(selection.isCollapsed()){
					//Find next character
					var info = activeItem.findNextCharacterInfo(selection.getFrom(), selection.getFromOffset());
					if(info){
						rel.deleteTexts = activeItem.deleteText(selection.getFrom(), info.paraIdx, selection.getFromOffset(), info.offset);
						offset = selection.getFromOffset();
					}
				}
				//Delete range
				else{
					rel.deleteTexts = activeItem.deleteText(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset());
					offset = selection.getFromOffset();
				}
				
				if(offset!=-1 && onlyDeleteFlag==false){
					//render layout data
					activeItem.render();
					activeItem.setActiveSelection(selection);
					//Reset selection values
					self._updateSelection(activeItem, selection, offset);
					activeItem.setActiveSelection(selection);
					self._updateCursor(selection);
					self._setKeyBoardActive();
					self.sendTextStyleEvent(selection);
				}
				
				rel.offset = offset;
				return rel;
			};
			
			var undo = function(data){
				if(data.offset == -1){
					//console.info("It should be avoideed!");
					return;
				}
				data.selection.setData(data.selectionData);
				data.activeItem.resetTexts(data.deleteTexts);
				
				//render layout data
				data.activeItem.render();
				
				data.selection.setFromObj(data.activeItem.getItemWithOffset(data.selection.getFrom(), data.selection.getFromOffset()));
				data.selection.setToObj(data.activeItem.getItemWithOffset(data.selection.getTo(), data.selection.getToOffset()));
				
				if(data.selection.isCollapsed()){
					self._updateCursor(data.selection);
				}
				else{
					self._updateCursor(data.selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					com.hoperun.util.BaseTool.markSvgTextSelection(data.selection);
				}
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
			};
			
			if(onlyDeleteFlag){
				redo();
			}
			//Do Undo &Redo function
			else{
				jsk.execute(redo, undo);
			}
		},
		doBackspaceAction: function(){
			var selectionData = this._activeItem.getActiveSelection().getData();
			var selection = new com.hoperun.model.SvgTextSelectionModel();
			var activeItem = this._activeItem;
			
			var self = this;
			var redo = function(){
				var rel = {
					selection: selection,
					selectionData: selectionData,
					activeItem: activeItem
				};
				selection.setData(selectionData);
				
				var offset = -1, paraIdx = 0;
				if(selection.isCollapsed()){
					//Find next character
					var info = activeItem.findPreviousCharacterInfo(selection.getFrom(), selection.getFromOffset());
					if(info){
						rel.deleteTexts = activeItem.deleteText(info.paraIdx, selection.getFrom(),  info.offset, selection.getFromOffset());
						offset = info.offset;
						paraIdx = info.paraIdx;
					}
				}
				//Delete range
				else{
					rel.deleteTexts = activeItem.deleteText(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset());
					offset = selection.getFromOffset();
					paraIdx = selection.getFrom();
				}
				if(offset!=-1){
					//render layout data
					activeItem.render();
					//Reset selection values
					self._updateSelection(activeItem, selection, offset, paraIdx);
					activeItem.setActiveSelection(selection);
					self._updateCursor(selection);
					self._setKeyBoardActive();
					self.sendTextStyleEvent(selection);
				}
				rel.offset = offset;
				return rel;
			};
			
			var undo = function(data){
				if(data.offset == -1){
					//console.info("It should be avoideed!");
					return;
				}
				data.activeItem.resetTexts(data.deleteTexts);
				
				//render layout data
				data.activeItem.render();
				
				data.selection.setData(data.selectionData);
				data.selection.setFromObj(data.activeItem.getItemWithOffset(data.selection.getFrom(), data.selection.getFromOffset()));
				data.selection.setToObj(data.activeItem.getItemWithOffset(data.selection.getTo(), data.selection.getToOffset()));
				
				data.activeItem.setActiveSelection(data.selection);
				
				if(data.selection.isCollapsed()){
					self._updateCursor(data.selection);
				}
				else{
					self._updateCursor(data.selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					com.hoperun.util.BaseTool.markSvgTextSelection(data.selection);
				}
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
			};
			
			jsk.execute(redo, undo);
		},
		doEnterAction: function(){
			var selectionData = this._activeItem.getActiveSelection().getData();
			var selection = new com.hoperun.model.SvgTextSelectionModel();
			var activeItem = this._activeItem;
			var val = '\n';
			
			var self = this;
			var redo = function(){
				var rel = {
					selection: selection,
					selectionData: selectionData,
					activeItem: activeItem,
					val: val
				};
				selection.setData(selectionData);
				
				//Delete range
				if(!selection.isCollapsed()){
					rel.deleteTexts = activeItem.deleteText(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset());
				}
				//Append break paragraph character
				activeItem.setTextByOffset(selection.getFrom(), selection.getFromOffset(), val);
				//render layout data
				activeItem.render();
				self._updateSelection(activeItem, selection, 0, selection.getFrom()+1);
				activeItem.setActiveSelection(selection);
				self._updateCursor(selection);
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
				
				return rel;
			};
			var undo = function(data){
				data.selection.setData(data.selectionData);
				var info = activeItem.findNextCharacterInfo(selection.getFrom(), selection.getFromOffset());
                activeItem.deleteText(selection.getFrom(), info.paraIdx, selection.getFromOffset(), info.offset);
                
                if(data.deleteTexts){
                	data.activeItem.resetTexts(data.deleteTexts);
                }

                //render layout data
				data.activeItem.render();
				data.selection.setData(data.selectionData);
				
				data.selection.setFromObj(data.activeItem.getItemWithOffset(data.selection.getFrom(), data.selection.getFromOffset()));
				data.selection.setToObj(data.activeItem.getItemWithOffset(data.selection.getTo(), data.selection.getToOffset()));
				
				data.activeItem.setActiveSelection(data.selection);
				
				if(data.selection.isCollapsed()){
					self._updateCursor(data.selection);
				}
				else{
					self._updateCursor(data.selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					com.hoperun.util.BaseTool.markSvgTextSelection(data.selection);
				}
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
			};
			
			jsk.execute(redo, undo);
		},
		doLeftAction: function(){
			var selection = this._activeItem.getActiveSelection();
			if(selection.isCollapsed()){
				var info = this._activeItem.findPreviousCharacterInfo(selection.getFrom(), selection.getFromOffset());
				if(info){
					//Reset selection values
					this._updateSelection(this._activeItem, selection, info.offset, info.paraIdx);
					this._updateCursor(selection);
				}
			}
			else{
				selection.doCollapse();
				this._updateCursor(selection);
			}
		},
		doUpAction: function(){
			var selection = this._activeItem.getActiveSelection();
			if(selection.isCollapsed()){
			}
			else{
				selection.doCollapse();
				this._updateCursor(selection);
			}
		},
		doRightAction: function(){
			var selection = this._activeItem.getActiveSelection();
			if(selection.isCollapsed()){
				var info = this._activeItem.findNextCharacterInfo(selection.getFrom(), selection.getFromOffset(), false);
				if(info){
					//Reset selection values
					this._updateSelection(this._activeItem, selection, info.offset, info.paraIdx);
					this._updateCursor(selection);
				}
			}
			else{
				selection.doSwap();
				selection.doCollapse();
				this._updateCursor(selection);
			}
		},
		doDownAction: function(){
			var selection = this._activeItem.getActiveSelection();
			if(selection.isCollapsed()){
			}
			else{
				selection.doSwap();
				selection.doCollapse();
				this._updateCursor(selection);
			}
		},
		doInputItemAction: function(val){
			var selection = this._activeItem.getActiveSelection();
			var activeItem = this._activeItem;
			
			if(!selection.isCollapsed()){
				activeItem.deleteText(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset());
			}
			
			//Append break paragraph character
			activeItem.setTextByOffset(selection.getFrom(), selection.getFromOffset(), val);
			//render layout data
			activeItem.render();
			this._updateSelection(activeItem, selection, selection.getFromOffset() + val.length);
			//activeItem.setActiveSelection(selection);
			this._updateCursor(selection);
			this._setKeyBoardActive();
			this.sendTextStyleEvent(selection);
		},
		doInputAction: function(valDataArr, imeModeFlag){			
			var selectionData = this._activeItem.getActiveSelection().getData();
			var selection = new com.hoperun.model.SvgTextSelectionModel();
			var activeItem = this._activeItem;
			var valArr = valDataArr;
			var self = this;
			var redo = function(){
				var rel = {
					selection: selection,
					selectionData: selectionData,
					activeItem: activeItem,
					valArr: valArr
				};
				var val = valArr.join('');
				
				selection.setData(selectionData);
				
				//Delete range
				if(!selection.isCollapsed()){
					rel.deleteTexts = activeItem.deleteText(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset());
				}
				//Append break paragraph character
				activeItem.setTextByOffset(selection.getFrom(), selection.getFromOffset(), val);
				//render layout data
				activeItem.render();
				self._updateSelection(activeItem, selection, selection.getFromOffset() + val.length);
				activeItem.setActiveSelection(selection);
				self._updateCursor(selection);
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
				
				return rel;
			};
			var undo = function(data){
				var val = data.valArr.join('');
				
				data.selection.setData(data.selectionData);
                activeItem.deleteText(data.selection.getFrom(), data.selection.getFrom(), data.selection.getFromOffset(), data.selection.getFromOffset() + val.length );
                
                if(data.deleteTexts){
                	data.activeItem.resetTexts(data.deleteTexts);
                }

                //render layout data
				data.activeItem.render();
				data.selection.setData(data.selectionData);
				
				data.selection.setFromObj(data.activeItem.getItemWithOffset(data.selection.getFrom(), data.selection.getFromOffset()));
				data.selection.setToObj(data.activeItem.getItemWithOffset(data.selection.getTo(), data.selection.getToOffset()));
				
				data.activeItem.setActiveSelection(data.selection);
				
				if(data.selection.isCollapsed()){
					self._updateCursor(data.selection);
				}
				else{
					self._updateCursor(data.selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					com.hoperun.util.BaseTool.markSvgTextSelection(data.selection);
				}
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
			};

			jsk.execute(redo, undo);
		},
		doStyleAction: function(styleDataPara){
			var selectionData = this._activeItem.getActiveSelection().getData();
			var selection = new com.hoperun.model.SvgTextSelectionModel();
			var activeItem = this._activeItem;
			var styleData = styleDataPara;
			var self = this;
			var redo = function(){
				var backupData = {};
				var rel = {
					selection: selection,
					selectionData: selectionData,
					activeItem: activeItem,
					styleData: styleData,
					backupData: backupData
				};
				selection.setData(selectionData);
				
				backupData.updateStyles = activeItem.changeStyle(selection.getFrom(), selection.getTo(), selection.getFromOffset(), selection.getToOffset(), styleData);
				if(styleData.textAlign){
					backupData.textAlign = activeItem.getTextAlign();
					activeItem.setTextAlign(styleData.textAlign);
				}
				if(styleData.shapeTextParagraphStyle){
					backupData.historyAllStyle = activeItem.getAllStyleData(style);
					var style = {};
					switch (styleData.shapeTextParagraphStyle) {
						case "title":
							style.fontSize = 30;
							break;
						case "head1":
							style.fontSize = 28;
							break;
						case "head2":
							style.fontSize = 24;
							break;
						case "body1":
							style.fontSize = 22;
							break;
						case "body2":
							style.fontSize = 20;
							break;
						case "bullet":
							style.fontSize = 18;
							break;
						case "caption":
							style.fontSize = 18;
							break;
						case "headerfooter":
							style.fontSize = 16;
							break;
						case "lable":
							style.fontSize = 16;
							break;
						case "labledark":
							style.fontSize = 15;
							break;
					}
					activeItem.changeAllStyle(style);
				}
				//render layout data
				activeItem.render();
				
				activeItem.setActiveSelection(selection);
				//Force to refresh from object
				selection.setFromObj(activeItem.getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
				selection.setToObj(activeItem.getItemWithOffset(selection.getTo(), selection.getToOffset()));
				
				if(selection.isCollapsed()){
					self._updateCursor(selection);
				}
				else{
					com.hoperun.util.BaseTool.markSvgTextSelection(selection);
				}
				
				self._setKeyBoardActive();
				self.sendTextStyleEvent(selection);
				
				return rel;
			};
			var undo = function(data){
				data.selection.setData(data.selectionData);
				
				//When there is shape Text paragraph style
				if(data.styleData.shapeTextParagraphStyle){
					var historyAllStyle = data.backupData.historyAllStyle;
					data.activeItem.recoverAllStyle(historyAllStyle);
				}
				
				//When there is text align
				if(data.styleData.textAlign){
					var textAlign = data.backupData.textAlign;
					data.activeItem.setTextAlign(textAlign);
				}
				
				//Recover styles
				data.activeItem.recoverStyle(data.selection.getFrom(), data.selection.getTo(), data.selection.getFromOffset(), data.selection.getToOffset(), data.backupData.updateStyles);

				//render layout data
				data.activeItem.render();
				
				data.activeItem.setActiveSelection(data.selection);
				//Force to refresh from object
				data.selection.setFromObj(data.activeItem.getItemWithOffset(data.selection.getFrom(), data.selection.getFromOffset()));
				data.selection.setToObj(data.activeItem.getItemWithOffset(data.selection.getTo(), data.selection.getToOffset()));
				
				if(data.selection.isCollapsed()){
					self._updateCursor(data.selection);
				}
				else{
					com.hoperun.util.BaseTool.markSvgTextSelection(data.selection);
				}
				
				self._setKeyBoardActive();
				self.sendTextStyleEvent(data.selection);
			};
			
			jsk.execute(redo, undo);
		},
		sendTextStyleEvent: function(selection){
			var msg = new com.hoperun.util.Observer.Message();
		    msg.id = com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE_NOTIFY;
		    msg.sender = selection.getActiveItem();
		    var style = null, paragraphStyleData = {};
		    if(selection.isCollapsed()){
		    	style = selection.getActiveItem().getStyleWithOffset(selection.getFrom(), selection.getFromOffset());
		    }
		    else{
		    	style = selection.getActiveItem().getStyleWithOffset(selection.getFrom(), selection.getFromOffset()+1);
		    }
		    paragraphStyleData.textAlign = selection.getActiveItem().getTextAlign();
		    msg.data = {
	    		style: style,
	    		paragraphStyleData: paragraphStyleData
		    };
		    com.hoperun.util.Observer.sendMessage(msg);
		}
	};
	
	(function(){
		var listener = new com.hoperun.event.SvgTextListener();
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_DELETE, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_BACKSPACE, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_ENTER, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_LEFT, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_RIGHT, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_UP, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_DOWN, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT_ITEM, listener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_TEXT_STYLE, listener);
	})();
}
