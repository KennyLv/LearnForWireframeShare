/**
 * Keyboard Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.KeyboardListener) {
	com.kenny.event.KeyboardListener = function(appviewEditor) {
		this.spanObj = this.paragraphObj = this.anchorOffset = null;
		var self = this;
		this.isBindFlag = false;
		this.appviewEditor = appviewEditor;
		
		this._maxWidthForCursoMove = -1;
		this._textInputData = [];
		
		this._countNumber = 20;
		var recoverTextInputFunc = function(){
			if(self._textInputData.length > 10){
				self._textInputData = [];
			}
			else{
				self._countNumber--;
				if(self._countNumber == 0){
					if(self._textInputData.length != 0 && !self._imeModeFlag) self._textInputData = [];
					self._countNumber = 10;
				}
			}
			setTimeout(recoverTextInputFunc, 300);
		};
		recoverTextInputFunc();
		
		//////////////////////////////////////////////////////////////////////////////////////////
		///////////// Begin
		this._keyboardHandler = null;
		this.init = function(){
			if(!this._keyboardHandler) this._keyboardHandler = new com.kenny.event.KeyboardHandler();
		};
		
		this._keyeditor;
		this._imeModeFlag = false;
		
		this._keyEditorFocusFlag = false;
		
		this.resetEditorData = function(){
			//Reset to non-ime mode
			this._imeModeFlag = false;
			//Clear last input value;
			this._prevEditorValue = "";
			//Clear text input value
			this.getKeyEditor().val('');
			
			var cursor = $('.hr-cursor');
			this.getKeyEditor().removeClass('text-ime-input').removeClass('text-ime-input-begin').css({
				left: '-5000px',
				top: cursor.css('top')
			}).focus();
			
			this._keyEditorFocusFlag = true;
		};
		
		this.resetImeStatusData = function(){
			this.resetEditorData();
			this._textInputData = [];
		};
		this.getKeyEditor = function(){
			if(this._keyeditor == null){
				var inputObj = $("<input/>");
				inputObj.attr('type', 'text');
				inputObj.css('width', '1px');
				inputObj.addClass('no-page-item');
				inputObj.css({
					left: '-5000px',
					top: '-5000px',
					position: 'absolute',
					opacity: 0,
					'border': '0px solid'
				});
				this._keyeditor = inputObj;
				
				var bind_name = 'input';
				if(navigator.userAgent.indexOf("MSIE") != -1){
					bind_name = 'propertychange';
				}
				
				var self = this;
				inputObj.bind(bind_name, function(){
					if(inputObj.hasClass('text-ime-input')){
						var isFirstFlag = inputObj.hasClass('text-ime-input-begin');
						if(isFirstFlag){
							inputObj.removeClass('text-ime-input-begin');
						}

						self.parseImeData(inputObj, isFirstFlag==false);
					}
				}).bind('blur', function(){
					self._keyEditorFocusFlag = false;
					var message = new com.kenny.util.Observer.Message();
		            message.id = com.kenny.util.Observer.MessageType.CURSOR_PAUSE;
		            com.kenny.util.Observer.sendMessage(message);
				});
			}
			return this._keyeditor;
		};
		
		this.releaseListener = function(){
			this.doImeEndAction();
			if(this.appviewEditor!=null){
				//Release the event
				$(this.appviewEditor).unbind('keydown.keyboard').unbind('keypress.keyboard');
				this.appviewEditor = null;
				//Hide svg selection background
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}
		};
		
		this.registerListener = function(message){
			this.init();
			this.appviewEditor = getActiveContainer().getDomInstance();
			
			//TODO: append to the page
			//$(this.appviewEditor).append(this.getKeyEditor());
			this.appviewEditor.insertAdjacentElement('afterBegin', this.getKeyEditor()[0]);
			
			//Bind event
			var self = this;
			$(self.appviewEditor).unbind('keydown.keyboard').unbind('keypress.keyboard').unbind('focus.keyboard').bind('keydown.keyboard', function(evt){
				var obj = com.kenny.util.BaseTool.findEventElement(evt); 
				var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN");
	        	if(isValidEvent){
	        		self._keyboardHandler.keydownHandler(evt);
	        	}
	        	else{
	        		self._keyboardHandler.isHandlerFlag = true;
	        	}
			}).bind('keypress.keyboard', function(evt){
				self._keyboardHandler.keypressHandler(evt);
			}).bind('focus.keyboard', function(evt){
				var obj = com.kenny.util.BaseTool.findEventElement(evt);
				var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Page,Paragraph,Line,SPAN,Slide");
	            if (!isValidEvent && com.kenny.util.BaseTool.findNearestValueWithAttribute(obj, 'trackerType') == null){
	                return;
	            }
				message = new com.kenny.util.Observer.Message();
                message.id = com.kenny.util.Observer.MessageType.CURSOR_RECOVER;
                com.kenny.util.Observer.sendMessage(message);
			});
			
			this.resetImeStatusData();
		};
		///////////// End
		//////////////////////////////////////////////////////////////////////////////////////////
		this.update = function(message) {
			var isImeAction = false;
			switch(message.id){
				case com.kenny.util.Observer.MessageType.KEYBOARD_FOCUS:
					if(this._keyEditorFocusFlag == false){
						this.resetImeStatusData();
					}
					return;
					break;
				case com.kenny.util.Observer.MessageType.KEYBOARD_ADD:
					if(this._keyEditorFocusFlag == false){
						this.releaseListener();
						this.registerListener(message);
					}
					return;
					break;
				case com.kenny.util.Observer.MessageType.KEYBOARD_REMOVE:
					this.releaseListener();
					break;
					
				case com.kenny.util.Observer.MessageType.KEYBOARD_COMMAND:
					if(message.sender != this._keyboardHandler){
						return;
					}
					var container = getActiveContainer();
					var selection = container.getActiveSelection();
					cmd = message.data.cmd;
					switch(cmd){
						case 'DELETE':
							this.doDeleteAction(container, selection);
							break;
						case 'BACKSPACE':
							this.doBackspaceAction(container, selection);
							break;
						case 'ENTER':
							if(selection) this.doEnterAction(container, selection);
							break;
						case 'LEFT':
							if(selection) this.doLeftAction(container, selection);
							break;
						case 'UP':
							if(selection) this.doUpAction(container, selection);
							break;
						case 'RIGHT':
							if(selection) this.doRightAction(container, selection);
							break;
						case 'DOWN':
							if(selection) this.doDownAction(container, selection);
							break;	
						case 'IME_INIT':
							isImeAction = true;
							if(selection && !this._imeModeFlag) this.doImeBeginAction(container, selection);
							break;
						case 'RIGHT_SELECT':
							if(selection) this.doRightSelectAction(container, selection);
							break;
						case 'LEFT_SELECT':
							if(selection) this.doLeftSelectAction(container, selection);
							break;
						case 'UP_SELECT':
							if(selection) this.doUpSelectAction(container, selection);
							break;
						case 'DOWN_SELECT':
							if(selection) this.doDownSelectAction(container, selection);
							break;
						case 'COPY':
							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.COPY_ITEM;
							
							if (currentSelectedObj.getType() == 'Page' && !selection.isCollapsed()){
								
								if (selection.isReverse()){
									selection.doSwap();
								}
								
								
								message.sender = selection;
								
								var nextParagraph = selection.getFrom() ;
								var copyParagraph = [];
								
								//copy should clone
								if (selection.getFrom() !== selection.getTo()){
									do{
										copyParagraph.push(nextParagraph.clone());
									}while((nextParagraph = nextParagraph.getNextParagraph()) != selection.getTo());
								}
			
								copyParagraph.push(nextParagraph.clone());
								
								selection.paragraphs = copyParagraph;
									
							}else{
								message.sender = com.kenny.util.BaseTool.findObjWithId(currentSelectedObj.getId());
							}
							
				        	com.kenny.util.Observer.sendMessage(message);
							break;
						case 'PASTE':
							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.PASTE_ITEM;
				        	com.kenny.util.Observer.sendMessage(message);
							break;
						case 'CUT':
							var contextItem = com.kenny.util.BaseTool.findObjWithId(currentSelectedObj.getId());
							var message = new com.kenny.util.Observer.Message();
							message.id = com.kenny.util.Observer.MessageType.CUT_ITEM;
							message.sender = contextItem;
				        	com.kenny.util.Observer.sendMessage(message);
							break;
						case 'UNDO':
							if(document.getElementById("Menu_Drawing_Undo").getAttribute("canUndo")=="true")
								sendMessage(com.kenny.util.Observer.MessageType.UNDO, null, {});
							break;
						case 'REDO':
							if(document.getElementById("Menu_Drawing_Redo").getAttribute("canRedo")=="true")
								sendMessage(com.kenny.util.Observer.MessageType.REDO, null, {});
							break;
					}
					
			    	//When event keyboard is not for Up or Down
			    	if(cmd != 'UP' || cmd != 'DOWN'){
			    		self._maxWidthForCursoMove = -1;
			    	}
					break;
				case com.kenny.util.Observer.MessageType.KEYBOARD_INPUT:
					if(message.sender != this._keyboardHandler ){
						return;
					}
					var container = getActiveContainer();
					var selection = container.getActiveSelection();
					if(selection && selection.isCollapsed()) {
						this.doInputAction(container, selection, message.data.value);
					}else{
						this.doReplaceAction(container, selection, message.data.value);
					}
					break;
				
			}

			//Since keyboard focus would be frequently invoked, ignore it
			if(isImeAction == false){
				this.doImeEndAction();
			}
		};
	};
	
	
	com.kenny.event.KeyboardListener.prototype = {
		_keyboardHandler: null,
		_debug: false,
		
		_prevEditorValue: '',
		
		sendKeyboardAction: function(sender, msgType, data){
			var message = new com.kenny.util.Observer.Message();
			message.id = msgType;
			message.sender = sender;
			message.data = data;
			com.kenny.util.Observer.sendMessage(message);
		},
		
		parseImeData: function(inputObj, isNotFirstFlag){
			var container = getActiveContainer();
			var selection = container.getActiveSelection(); 
			var lastKeyEditorValue = inputObj.val();
			
			if (lastKeyEditorValue === '' || this._prevEditorValue == lastKeyEditorValue){
				return;
			}
				
			var oldSelection = selection.clone();
			if (this._prevEditorValue!=''){
				selection.setFromOffset(this._prevOffset);
				selection.setToOffset(this._prevOffset + this._prevEditorValue.length);
				this.doDeleteAction(container, selection, true);
			}
			if (oldSelection.isCollapsed()){
				selection.setFromOffset(this._prevOffset);
				selection.doCollapse();
				this.doInputAction(container, selection, lastKeyEditorValue, isNotFirstFlag);
				this._prevEditorValue = lastKeyEditorValue;
			}else{
				this.doReplaceAction(container, selection, lastKeyEditorValue, isNotFirstFlag);
				this._prevEditorValue = lastKeyEditorValue;
			}
		},
		
		doImeBeginAction: function(container, selection){
			var editorObj = this.getKeyEditor();
			var cursor = $('.hr-cursor');
			editorObj.css({
				left: cursor.css('left'),
				top: cursor.css('top')
			}).addClass('text-ime-input').addClass('text-ime-input-begin');
			
			if(this._imeModeFlag == false){
				//console.info('Begin do IME')
				this._imeModeFlag = true;
				editorObj.css({
					height: cursor.height()+8
				}).addClass('text-ime-input');
				//remember last offset
				var selection = getActiveContainer().getActiveSelection();
				this._prevOffset = selection.getFromOffset();
			}
		},
		doImeEndAction: function(container, selection){
			this.resetImeStatusData();
		},
		doDeleteAction: function(container, selection, flag){
			flag = flag == null ? false : flag; 
			if(selection && !selection.isCollapsed()){
				var textCollapsedBackspaceDeleteMessage = new com.kenny.util.Observer.Message();
				textCollapsedBackspaceDeleteMessage.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE;
				textCollapsedBackspaceDeleteMessage.data = {'nextParaObj': nextParaObj, 'onlyDelete':flag };
				com.kenny.util.Observer.sendMessage(textCollapsedBackspaceDeleteMessage);
			}
			else{
				if(selection.getFrom()._text.length == selection.getFromOffset()){
		    		var nextParaObj = selection.getFrom().getNextParagraph();
		    		if(nextParaObj){
		    			var paragraphDeleteMessage = new com.kenny.util.Observer.Message();
		    			paragraphDeleteMessage.id = com.kenny.util.Observer.MessageType.PARAGRAPH_ACTION_DELETE;
		    			paragraphDeleteMessage.data = {'nextParaObj': nextParaObj, 'onlyDelete':flag };
						com.kenny.util.Observer.sendMessage(paragraphDeleteMessage);
		    		}
		    	}
		    	else{
					var textDeleteMessage = new com.kenny.util.Observer.Message();
					textDeleteMessage.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_BACKSPACE_DELETE;
					textDeleteMessage.data = {'textActionFlag': '2', 'onlyDelete':flag };
					com.kenny.util.Observer.sendMessage(textDeleteMessage);
		    	}
			}
		},
		doBackspaceAction: function(container, selection){
			if(selection && !selection.isCollapsed()){
				var textCollapsedBackspaceDeleteMessage = new com.kenny.util.Observer.Message();
				textCollapsedBackspaceDeleteMessage.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_COLLAPSED_BACKSPACE_DELETE;
				textCollapsedBackspaceDeleteMessage.data = {'nextParaObj': nextParaObj};
				com.kenny.util.Observer.sendMessage(textCollapsedBackspaceDeleteMessage);
			}
			else{
				if(selection.getFromOffset() == 0){
		    		var nextParaObj = selection.getFrom().getPrevParagraph();
					if(nextParaObj){
						var paragraphBackspaceMessage = new com.kenny.util.Observer.Message();
						paragraphBackspaceMessage.id = com.kenny.util.Observer.MessageType.PARAGRAPH_ACTION_BACKSPACE;
						paragraphBackspaceMessage.data = {'nextParaObj': nextParaObj};
						com.kenny.util.Observer.sendMessage(paragraphBackspaceMessage);
		    		}
		    	}
		    	else{
					var textBackSpaceMessage = new com.kenny.util.Observer.Message();
					textBackSpaceMessage.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_BACKSPACE_DELETE;
					textBackSpaceMessage.data = {'textActionFlag': '1'};
					com.kenny.util.Observer.sendMessage(textBackSpaceMessage);
		    	}
			}
		},
		doEnterAction: function(container, selection){
			var textEnterMessage = new com.kenny.util.Observer.Message();
			textEnterMessage.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_ENTER;
			textEnterMessage.data = {'textActionFlag': '5'};
			com.kenny.util.Observer.sendMessage(textEnterMessage);
		},
		doLeftAction: function(container, selection){
			if (!selection.isCollapsed()){
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}
			
			selection.setFrom(selection.getTo());
			
			var offset = selection.getToOffset();
			
			if(offset == 0){
	    		var prevParaObj = selection.getTo().getPrevParagraph();
				if(prevParaObj){
					offset = prevParaObj._text.length;
					selection.setTo(prevParaObj);
	    		}
	    	}
	    	else{
	    		offset -= 1;
	    	}
			
	    	selection.setFromObj(selection.getTo().getSpanItem(offset));
	    	selection.setFromOffset(offset);
	    	selection.doCollapse();
	    	
			var styleItemObj = selection.getFrom().getTextContainerByOffset(selection.getFromOffset());
			if(styleItemObj.style){
				container.setActiveStyle(styleItemObj.style);
			}
			
			var flushMessage = new com.kenny.util.Observer.Message();
			flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
			flushMessage.sender = selection;
			com.kenny.util.Observer.sendMessage(flushMessage);
		},
		doUpAction: function(container, selection){
			if (!selection.isCollapsed()){
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}
			
			var paragraphObj = selection.getTo();
			var anchorOffset = selection.getToOffset();
			var spanObj = selection.getToObj();
			var textOffset = selection.getAnchorOffset();
			var paddingLeft = spanObj.style.paddingLeft ? com.kenny.util.BaseTool.convertPixelToNumber(spanObj.style.paddingLeft) : 0;
			var posSpan = com.kenny.util.BaseTool.getAbsPostionInContainer(spanObj);
			var rect = paragraphObj.getWidthWithOffset(anchorOffset, textOffset);
			
			var width = posSpan.x + rect.width + paddingLeft;
			if(width < this._maxWidthForCursoMove){
				width = this._maxWidthForCursoMove;
			}
			else{
				this._maxWidthForCursoMove = width;
			}
	    	var nextLineDivObj = com.kenny.util.BaseTool.getLineDivWithDirection(spanObj.parentNode, false);
	    	if(nextLineDivObj){
	    		selection = com.kenny.model.TextSelectionModelHelper.parseWithLineAndWidth(nextLineDivObj, width);
		    	container.setActiveSelection(selection);
	    	}
	    	
	    	var styleItemObj = selection.getFrom().getTextContainerByOffset(selection.getFromOffset());
			if(styleItemObj.style){
				container.setActiveStyle(styleItemObj.style);
			}
			
	    	var flushMessage = new com.kenny.util.Observer.Message();
			flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
			flushMessage.sender = selection;
			com.kenny.util.Observer.sendMessage(flushMessage);
		},
		doRightAction: function(container, selection){
			if (!selection.isCollapsed()){
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}
			selection.setFrom(selection.getTo());
			var offset = selection.getToOffset();
			if(selection.getTo()._text.length == offset){
	    		var nextParaObj = selection.getTo().getNextParagraph();
	    		if(nextParaObj){
	    			offset = 0;
	    			selection.setTo(nextParaObj);
	    		}
	    	}
	    	else{
	    		offset += 1;
	    	}
	    	selection.setFromObj(selection.getTo().getSpanItem(offset));
	    	selection.setFromOffset(offset);
	    	selection.doCollapse();
	    	
	    	var styleItemObj = selection.getFrom().getTextContainerByOffset(selection.getFromOffset());
			if(styleItemObj.style){
				container.setActiveStyle(styleItemObj.style);
			}
			
	    	var flushMessage = new com.kenny.util.Observer.Message();
			flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
			flushMessage.sender = selection;
			com.kenny.util.Observer.sendMessage(flushMessage);
		},
		doDownAction: function(container, selection){
			if (!selection.isCollapsed()){
				com.kenny.util.BaseTool.hiddenOverWordDiv();
			}
			
			var paragraphObj = selection.getTo();
			var anchorOffset = selection.getToOffset();
			var spanObj = selection.getToObj();
			var textOffset = selection.getAnchorOffset();
			var paddingLeft = spanObj.style.paddingLeft ? com.kenny.util.BaseTool.convertPixelToNumber(spanObj.style.paddingLeft) : 0;
			var posSpan = com.kenny.util.BaseTool.getAbsPostionInContainer(spanObj);
			var rect = paragraphObj.getWidthWithOffset(anchorOffset, textOffset);
			
			var width = posSpan.x + rect.width + paddingLeft;
			if(width < this._maxWidthForCursoMove){
				width = this._maxWidthForCursoMove;
			}
			else{
				this._maxWidthForCursoMove = width;
			}
	    	var nextLineDivObj = com.kenny.util.BaseTool.getLineDivWithDirection(spanObj.parentNode, true);
	    	if(nextLineDivObj){
	    		selection = com.kenny.model.TextSelectionModelHelper.parseWithLineAndWidth(nextLineDivObj, width);
		    	container.setActiveSelection(selection);
	    	}
	    	
	    	var styleItemObj = selection.getFrom().getTextContainerByOffset(selection.getFromOffset());
			if(styleItemObj.style){
				container.setActiveStyle(styleItemObj.style);
			}
			
	    	var flushMessage = new com.kenny.util.Observer.Message();
			flushMessage.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
			flushMessage.sender = selection;
			com.kenny.util.Observer.sendMessage(flushMessage);
		},
		doInputAction: function(container, selection, val, isImeInputFlag){
			isImeInputFlag = isImeInputFlag == null ? false : isImeInputFlag;
			var offset = selection.getFromOffset();

			if(this._textInputData.length == 0){

	    		this._textInputData.push(val);
	    		
	    		var data = {};
		    	data.offset = offset;
		    	data.textData = this._textInputData;
		    	
		    	var inputTextMsg = new com.kenny.util.Observer.Message();
		    	inputTextMsg.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_INPUT;
		    	inputTextMsg.data = data;
				com.kenny.util.Observer.sendMessage(inputTextMsg);
	    	}
	    	else{
	    		if(isImeInputFlag){

	    			this._textInputData[this._textInputData.length-1] = val;
	    		}
	    		else{

	    			this._textInputData.push(val);
	    		}
	    		offset = selection.getFrom().setTextByOffset(offset, val);
	    		
		    	selection.getFrom().refreshLineData();
		    	selection.getFrom().updatePage(true);
		    	
		    	selection.setFromObj(selection.getFrom().getSpanItem(offset));
		    	selection.setFromOffset(offset);
		    	selection.doCollapse();
		    	
		    	container.setActiveSelection(selection);
		    	
		    	var message = new com.kenny.util.Observer.Message();
				message.id = com.kenny.util.Observer.MessageType.CURSOR_SHOW;
				message.sender = selection;
				var data = {
					onlyUpdateCursor: true 
				};
				message.data = data;
				com.kenny.util.Observer.sendMessage(message);
	    	}
		},
		doRightSelectAction: function(container, selection){
			var offset = selection.getToOffset();
			if(selection.getTo()._text.length == offset){
	    		var nextParaObj = selection.getTo().getNextParagraph();
	    		if(nextParaObj){
	    			offset = 0;
	    			selection.setTo(nextParaObj);
	    		}
	    	}
	    	else{
	    		offset += 1;
	    	}
	    	selection.setToObj(selection.getTo().getSpanItem(offset));
	    	selection.setToOffset(offset);
	    	com.kenny.util.BaseTool.markTextSelection(selection);
	    	
	    	var hideMessage = new com.kenny.util.Observer.Message();
			hideMessage.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
			com.kenny.util.Observer.sendMessage(hideMessage);
		},
		doLeftSelectAction: function(container, selection){
			var offset = selection.getToOffset();
			if(offset == 0){
	    		var prevParaObj = selection.getTo().getPrevParagraph();
	    		if(prevParaObj){
	    			offset = prevParaObj._text.length;
	    			selection.setTo(prevParaObj);
	    		}
	    	}
	    	else{
	    		offset -= 1;
	    	}
	    	selection.setToObj(selection.getTo().getSpanItem(offset));
	    	selection.setToOffset(offset);
	    	com.kenny.util.BaseTool.markTextSelection(selection);
	    	
	    	var hideMessage = new com.kenny.util.Observer.Message();
			hideMessage.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
			com.kenny.util.Observer.sendMessage(hideMessage);
		},
		doUpSelectAction: function(container, selection){
			var paragraphObj = selection.getTo();
			var anchorOffset = selection.getToOffset();
			var spanObj = selection.getToObj();
			var textOffset = selection.getAnchorOffset();
			var paddingLeft = spanObj.style.paddingLeft ? com.kenny.util.BaseTool.convertPixelToNumber(spanObj.style.paddingLeft) : 0;
			var posSpan = com.kenny.util.BaseTool.getAbsPostionInContainer(spanObj);
			var rect = paragraphObj.getWidthWithOffset(anchorOffset, textOffset);
			
			var width = posSpan.x + rect.width + paddingLeft;
			if(width < this._maxWidthForCursoMove){
				width = this._maxWidthForCursoMove;
			}
			else{
				this._maxWidthForCursoMove = width;
			}
	    	var nextLineDivObj = com.kenny.util.BaseTool.getLineDivWithDirection(spanObj.parentNode, false);
	    	if(nextLineDivObj){
	    		var nextSelection = com.kenny.model.TextSelectionModelHelper.parseWithLineAndWidth(nextLineDivObj, width);
		    	selection.setTo(nextSelection.getTo());
		    	selection.setToOffset(nextSelection.getToOffset());
		    	selection.setToObj(nextSelection.getToObj());
		    	container.setActiveSelection(selection);
	    	}
	    	
	    	com.kenny.util.BaseTool.markTextSelection(selection);
	    	
	    	var hideMessage = new com.kenny.util.Observer.Message();
			hideMessage.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
			com.kenny.util.Observer.sendMessage(hideMessage);
		},
		doDownSelectAction: function(container, selection){
			var paragraphObj = selection.getTo();
			var anchorOffset = selection.getToOffset();
			var spanObj = selection.getToObj();
			var textOffset = selection.getAnchorOffset();
			var paddingLeft = spanObj.style.paddingLeft ? com.kenny.util.BaseTool.convertPixelToNumber(spanObj.style.paddingLeft) : 0;
			var posSpan = com.kenny.util.BaseTool.getAbsPostionInContainer(spanObj);
			var rect = paragraphObj.getWidthWithOffset(anchorOffset, textOffset);
			
			var width = posSpan.x + rect.width + paddingLeft;
			if(width < this._maxWidthForCursoMove){
				width = this._maxWidthForCursoMove;
			}
			else{
				this._maxWidthForCursoMove = width;
			}
	    	var nextLineDivObj = com.kenny.util.BaseTool.getLineDivWithDirection(spanObj.parentNode, true);
	    	if(nextLineDivObj){
	    		var nextSelection = com.kenny.model.TextSelectionModelHelper.parseWithLineAndWidth(nextLineDivObj, width);
	    		selection.setTo(nextSelection.getTo());
		    	selection.setToOffset(nextSelection.getToOffset());
		    	selection.setToObj(nextSelection.getToObj());
		    	container.setActiveSelection(selection);
	    	}
			
	    	com.kenny.util.BaseTool.markTextSelection(selection);
	    	
	    	var hideMessage = new com.kenny.util.Observer.Message();
			hideMessage.id = com.kenny.util.Observer.MessageType.CURSOR_HIDE;
			com.kenny.util.Observer.sendMessage(hideMessage);
		},
		doReplaceAction:  function(container, selection, val, isImeInputFlag){
			var data = {};
			
			var from = selection.getFrom(), to = selection.getTo();
			var fromOffset = selection.getFromOffset(), toOffset = selection.getToOffset();
		
			if ( selection.isReverse()){
	        	var temp = from;
	        	from = to;
	        	to = temp;
	        	fromOffset = toOffset;
			}
        
			data.offset = fromOffset;
				
			this._textInputData = [];
			
			if(isImeInputFlag){
    			this._textInputData[this._textInputData.length-1] = val;
    		}else{
    			this._textInputData.push(val);
    		}
	    	
	    	data.textData = this._textInputData;
	    		
	    	var inputTextMsg = new com.kenny.util.Observer.Message();
		    inputTextMsg.id = com.kenny.util.Observer.MessageType.TEXT_ACTION_REPLACE;
		    inputTextMsg.data = data;
			com.kenny.util.Observer.sendMessage(inputTextMsg);
		}
	};
	
	(function(){
		var keyboardListener = new com.kenny.event.KeyboardListener();
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.KEYBOARD_FOCUS, keyboardListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.KEYBOARD_ADD, keyboardListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.KEYBOARD_REMOVE, keyboardListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.KEYBOARD_COMMAND, keyboardListener);
		com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.KEYBOARD_INPUT, keyboardListener);
	})();
}
