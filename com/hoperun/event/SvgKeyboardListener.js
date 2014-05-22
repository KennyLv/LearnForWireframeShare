/**
 * Keyboard Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.event.KeyboardHandler
 * @author lu_feng
 */
if (!com.hoperun.event.SvgKeyboardListener) {
	com.hoperun.event.SvgKeyboardListener = function() {
		this._keyboardHandler = null;
		this._activeItem = null;
		this._activeItemFocusFlag = false;
		this._textInputData = [];
		
		var self = this;
		this._keyEditorFocusFlag = false;
		
		this._countNumber = 20;
		var recoverSvgTextInputFunc = function(){
			if(self._textInputData.length > 10){
				self._textInputData = [];
			}
			else if(self._imeModeFlag == false){
				this._countNumber--;
				if(this._countNumber == 0){
					if(self._textInputData.length != 0) self._textInputData = [];
					this._countNumber = 10;
				}
			}
			setTimeout(recoverSvgTextInputFunc, 300);
		};
		recoverSvgTextInputFunc();
		
		
		this._keyeditor;
		this._imeModeFlag = false;
		
		this.resetEditorData = function(){
			//Reset to non-ime mode
			this._imeModeFlag = false;
			//Clear last input value;
			this._prevEditorValue = "";
			//Clear text input value
			this.getKeyEditor().val('');
			
			var cursor = $('.hr-cursor');
			var top = cursor.css('top');
			if(top == null || top.indexOf('-')!=-1){
				top = '0px';
			}
			this.getKeyEditor().removeClass('text-ime-input').removeClass('text-ime-input-begin').css({
				left: '-5000px',
				top: top
			}).focus();
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
				inputObj.css({
					left: '-5000px',
					top: '0px',
					position: 'absolute',
					opacity: 0,
					'border': '0px solid'
				});
				inputObj.focus(function(){
					self._keyEditorFocusFlag = true;
				}).blur(function(){
					self._keyEditorFocusFlag = false;
					self.sendCursorEvent(null, com.hoperun.util.Observer.MessageType.SVG_CURSOR_PAUSE);
				});
				this._keyeditor = inputObj;
				
				var bind_name = 'input';
				if(navigator.userAgent.indexOf("MSIE") != -1){
					bind_name = 'propertychange';
				}
				
				var self = this;
				inputObj.bind(bind_name, function(){
					if(inputObj.hasClass('svg-ime-input')){
						var isFirstFlag = !inputObj.hasClass('text-ime-input-begin');
						if(isFirstFlag){
							inputObj.removeClass('text-ime-input-begin');
						}
						self.parseImeData(inputObj, isFirstFlag);
					}
				});
			}
			return this._keyeditor;
		};
		
		this.init = function(){
			if(!this._keyboardHandler) this._keyboardHandler = new com.hoperun.event.KeyboardHandler();
		};
		
		this.releaseListener = function(){
			if(this._activeItem!=null){
				//Release the event
				$(this._activeItem.getKeyBoardDomInstance()).unbind('keydown.keyboard').unbind('keypress.keyboard').unbind('mouseup.keyboard');
				this._activeItem = null;
				//Hide SVG cursor
				this.sendCursorEvent(null, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
				//Hide svg selection background
				com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
				//release SVG selection event 
				com.hoperun.util.SvgSelection.releaseListener();
			}
		};
		
		this.registerListener = function(message){
			self._activeItem = message.sender;
			self._type = message.data ? message.data.type : null;
			var evt = message.data ? message.data.evt : null; 
			self.init();
			
			self._activeItem.getKeyBoardDomInstance().appendChild(this.getKeyEditor()[0]);
			
			$(self._activeItem.getKeyBoardDomInstance()).bind('keydown.keyboard', function(evt){
				self._keyboardHandler.keydownHandler(evt);
			}).bind('keypress.keyboard', function(evt){
				self._keyboardHandler.keypressHandler(evt);
			}).unbind('blur.keyboard').bind('blur.keyboard',function(evt){
				return;
				//release event 
				self.sendCursorEvent(null, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
				com.hoperun.util.BaseTool.hiddenSvgOverWordDiv();
				com.hoperun.util.SvgSelection.releaseListener();
				
				var popmenuObj = document.getElementById('textBoxMenuId');
				if(popmenuObj) popmenuObj.style.display = 'none';
				self.releaseListener(); 
			});
			
			if(self._activeItem.getType() == 'TextBox'){
				com.hoperun.util.SvgSelection.registerListener(self._activeItem.getKeyBoardDomInstance(), function(evt){
					self.sendCursorEvent(null, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					var popmenuObj = document.getElementById('textBoxMenuId');
					if(popmenuObj) popmenuObj.style.display = 'none';
				}, function(evt){
					//pop-up menu
					var popmenuObj = document.getElementById('textBoxMenuId');
					
					var svgSelection = com.hoperun.util.SvgSelection.svgSelection;
					var selection = com.hoperun.model.SvgTextSelectionModelHelper.parseWindowSelection(svgSelection, evt);
					//Recalculate span object
					selection.setFromObj(self._activeItem.getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
					selection.setToObj(self._activeItem.getItemWithOffset(selection.getTo(), selection.getToOffset()));
					self._activeItem.setActiveSelection(selection);
					
					//To notify menu change 
					self.sendTextStyleEvent(selection);
					
					selection.setFromObj(self._activeItem.getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
					selection.setToObj(self._activeItem.getItemWithOffset(selection.getTo(), selection.getToOffset()));
					
					if(selection.isCollapsed()){
						if(popmenuObj) popmenuObj.style.display = 'none';
						self.resetImeStatusData();
						self.sendCursorEvent(selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_SHOW);
					}
					else{
						self.resetImeStatusData();
						self.sendCursorEvent(selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_HIDE);
					}
				}, function(evt){
				});
				
				//Show default 
				var selection = null;
				if(evt){
					com.hoperun.util.SvgSelection.getSVGSelection('anchor',evt);
					var svgSelection = com.hoperun.util.SvgSelection.svgSelection;
					selection = com.hoperun.model.SvgTextSelectionModelHelper.parseWindowSelection(svgSelection, evt);
				}
				else{
					selection = new com.hoperun.model.SvgTextSelectionModel(self._activeItem, 0, 0, 0, 0);
				}
				
				selection.setFromObj(this._activeItem.getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
				selection.setToObj(this._activeItem.getItemWithOffset(selection.getTo(), selection.getToOffset()));
				self._activeItem.setActiveSelection(selection);
				
				self.sendTextStyleEvent(selection); //TODO: it should not to modify the fromObj
				
				selection.setFromObj(self._activeItem.getItemWithOffset(selection.getFrom(), selection.getFromOffset()));
				selection.setToObj(self._activeItem.getItemWithOffset(selection.getTo(), selection.getToOffset()));
				self.sendCursorEvent(selection, com.hoperun.util.Observer.MessageType.SVG_CURSOR_SHOW);
				self.resetImeStatusData();
			}
		};
		
		this.update = function(message) {
			var isImeAction = false;
			switch(message.id){
				case com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_FOCUS:
					this.releaseListener();
					this.registerListener(message);
					break;
				case com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_ACTIVE:
					if(this._keyEditorFocusFlag == false){
						this.resetImeStatusData();	
					}
					break;
				case com.hoperun.util.Observer.MessageType.KEYBOARD_BLUR:
					this.releaseListener();
					break;
				case com.hoperun.util.Observer.MessageType.KEYBOARD_COMMAND:
					if(message.sender != this._keyboardHandler){
						return;
					}
					var cmd = message.data.cmd;
					switch(cmd){
						case 'DELETE':
							this.doDeleteAction();
							break;
						case 'BACKSPACE':
							this.doBackspaceAction();
							break;
						case 'ENTER':
							this.doEnterAction();
							break;
						case 'LEFT':
							this.doLeftAction();
							break;
						case 'UP':
							this.doUpAction();
							break;
						case 'RIGHT':
							this.doRightAction();
							break;
						case 'DOWN':
							this.doDownAction();
							break;	
						case 'IME_INIT':
							isImeAction = true;
							this.doImeBeginAction();
							break;
					}
					break;
				case com.hoperun.util.Observer.MessageType.KEYBOARD_INPUT:
					if(message.sender != this._keyboardHandler){
						return;
					}
					this.doInputAction(message.data.value);
					break;
			}
			
			if(message.id == com.hoperun.util.Observer.MessageType.KEYBOARD_INPUT){
				this.resetEditorData();
			}
			//Since keyboard focus would be frequently invoked, ignore it
			else if(isImeAction == false && message.id != com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_ACTIVE){
				this.doImeEndAction();
			}
		};
	};
	com.hoperun.event.SvgKeyboardListener.prototype = {
		_keyboardHandler: null,
		_activeItem: null,
		_debug: false,
		
		_prevEditorValue: '',
	
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
		    paragraphStyleData.textAlign = selection.getActiveItem().getTextAlign;
		    msg.data = {
	    		style: style,
	    		paragraphStyleData: paragraphStyleData
		    };
		    com.hoperun.util.Observer.sendMessage(msg);
		},
		
		sendCursorEvent: function(selection, eventType){
			if(this._debug) console.info("Send cursor event!");
			var message = new com.hoperun.util.Observer.Message();
			message.id = eventType;
			message.sender = selection;
			com.hoperun.util.Observer.sendMessage(message);
		},
		
		sendKeyboardAction: function(sender, msgType, data){
			if(this._debug) console.info("Send event: "+msgType);
			var message = new com.hoperun.util.Observer.Message();
			message.id = msgType;
			message.sender = sender;
			message.data = data;
			com.hoperun.util.Observer.sendMessage(message);
		},
		
		parseImeData: function(inputObj, isNotFirstFlag){
			var selection = this._activeItem.getActiveSelection();
			var lastKeyEditorValue = inputObj.val();
			if(this._prevEditorValue != lastKeyEditorValue && this._prevEditorValue!=''){
				selection.setToOffset(this._prevOffset + this._prevEditorValue.length);
			}
			if(this._prevEditorValue != lastKeyEditorValue){
				selection.setFromOffset(this._prevOffset);
				//selection.doCollapse();
				this.doInputAction(lastKeyEditorValue, isNotFirstFlag);
				this._prevEditorValue = lastKeyEditorValue;
			}
		},
		
		doImeBeginAction: function(){
			var editorObj = this.getKeyEditor();
			var cursor = $('.hr-cursor-svg');
			editorObj.css({
				left: cursor.css('left'),
				top: cursor.css('top')
			}).addClass('svg-ime-input').addClass('text-ime-input-begin');
			
			if(this._imeModeFlag == false){
				//console.info('Begin do IME')
				this._imeModeFlag = true;
				editorObj.css({
					height: cursor.height()+8
				}).addClass('svg-ime-input');
				//remember last offset
				var selection = this._activeItem.getActiveSelection();
				this._prevOffset = selection.getFromOffset();
				if(!selection.isCollapsed()) this.doDeleteAction();
			}
		},
		doImeEndAction: function(){
			this.resetImeStatusData();
		},
		doDeleteAction: function(flag){
			if(this._debug) console.info("Action: doDeleteAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_DELETE;
			this.sendKeyboardAction(this._activeItem, msgId, {onlyDelete: flag});
		},
		doBackspaceAction: function(){
			if(this._debug) console.info("Action: doBackspaceAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_BACKSPACE;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doEnterAction: function(){
			if(this._debug) console.info("Action: doEnterAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_ENTER;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doLeftAction: function(){
			if(this._debug) console.info("Action: doLeftAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_LEFT;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doUpAction: function(){
			if(this._debug) console.info("Action: doUpAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_UP;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doRightAction: function(){
			if(this._debug) console.info("Action: doRightAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_RIGHT;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doDownAction: function(){
			if(this._debug) console.info("Action: doDownAction");
			var msgId = com.hoperun.util.Observer.MessageType.SVG_TEXT_DOWN;
			this.sendKeyboardAction(this._activeItem, msgId);
		},
		doInputAction: function(val, isImeInputFlag){
			if(this._debug) console.info("Hello your input value: "+val);
			var imeModeFlag = isImeInputFlag != null;
			isImeInputFlag = isImeInputFlag == null ? false : isImeInputFlag;

			if(this._textInputData.length == 0){
				//console.info("text input data");
	    		this._textInputData.push(val);
	    		this.sendKeyboardAction(this._activeItem, com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT, {
					valDataArr: this._textInputData,
					imeModeFlag: imeModeFlag
				});
	    	}
	    	else{
	    		//console.info("imeModeFlag: " + imeModeFlag +"   val: " + val);
	    		if(imeModeFlag){
	    			this._textInputData[this._textInputData.length-1] = val;
	    		}
	    		else{
	    			this._textInputData.push(val);
	    		}
	    		this.sendKeyboardAction(this._activeItem, com.hoperun.util.Observer.MessageType.SVG_TEXT_INPUT_ITEM, {
	    			val: val,
	    			imeModeFlag: imeModeFlag
				});
	    	}
		}
	};
	
	(function(){
		var keyboardListener = new com.hoperun.event.SvgKeyboardListener();
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_FOCUS, keyboardListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SVG_KEYBOARD_ACTIVE, keyboardListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.KEYBOARD_BLUR, keyboardListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.KEYBOARD_COMMAND, keyboardListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.KEYBOARD_INPUT, keyboardListener);
	})();
}
