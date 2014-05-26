/**
 * Keyboard Handler class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool,com.kenny.util.Observer
 * @author lu_feng
 */
if (!com.kenny.event.KeyboardHandler) {
	com.kenny.event.KeyboardHandler = function() {
	};
	
	com.kenny.event.KeyboardHandler.prototype = {
		isHandlerFlag:false,
		_type: null,
		
		parseCommand: function(keyCode,shift,ctrl){
			var cmd = null;
			switch(keyCode){
				case 8:
					cmd = 'BACKSPACE';
					break;
				case 46:
					cmd = 'DELETE';
					break;
				case 13:
					cmd = 'ENTER';
					break;
				case 37:
					if (shift){
						cmd = 'LEFT_SELECT';
					}else{
						cmd = 'LEFT';
					}
					break;
				case 38:
					if (shift){
						cmd = 'UP_SELECT';
					}else{
						cmd = 'UP';
					}
					break;
				case 39:
					if (shift){
						cmd = 'RIGHT_SELECT';
					}else{
						cmd = 'RIGHT';
					}
					
					break;
				case 40:
					if (shift){
						cmd = 'DOWN_SELECT';
					}else{
						cmd = 'DOWN';
					}
					break;	
				case 197:
				case 229:
					cmd = 'IME_INIT';
					break;
				case 116:
					cmd = 'F5';
					break;
				case 67:
					if (ctrl){
						cmd = 'COPY';
					}
					break;
				case 86:
					if (ctrl){
						cmd = 'PASTE';
					}
					break;
				case 88:
					if (ctrl){
						cmd = 'CUT';
					}
					break;
				case 90:
					if (ctrl){
						cmd = 'UNDO';
					}
					break;
				case 89:
					if (ctrl){
						cmd = 'REDO';
					}
					break;
			}
			return cmd;
		},
		
		keydownHandler: function(evt){
			//Default is not handled
			this.isHandlerFlag = false;
			
			//KeyCode value
			evt = evt || window.event;
		    var keyCode = evt.keyCode || evt.which;
		    //console.info(keyCode);
			//Parse keyCode command
			var cmd = this.parseCommand(keyCode,evt.shiftKey,evt.ctrlKey);
			if(cmd){
//				//For input, ignore default 
//				if(cmd != 'IME_INIT'){
//					try{
//						evt.stopPropagation();
//						//evt.preventDefault();
//					}catch(e){}
//					evt.preventDefault();
//				}
//
				this.isHandlerFlag = true;
		    	
				//Send the keyboard command message
				var message = new com.kenny.util.Observer.Message();
				message.id = com.kenny.util.Observer.MessageType.KEYBOARD_COMMAND;
				message.sender = this;
				message.data = { cmd: cmd };
				com.kenny.util.Observer.sendMessage(message);
			}
		},
		
		keypressHandler: function(evt){
			//When event is handled, stop to do this step
			if(this.isHandlerFlag){
				return;
			}
			//Prevent default handler and stop propagation
			try{
				evt.stopPropagation();
				evt.preventDefault();
			}catch(e){}
			
			//Key code value
			evt = evt || window.event;
		    var keyCode = evt.keyCode || evt.which;
		    
		    //Only for valid visiable code
		    if(keyCode>=32 && keyCode<=126){
			    //Input value
			    var value = String.fromCharCode(keyCode);
			    
			    //Send the keyboard input message
			    var message = new com.kenny.util.Observer.Message();
				message.id = com.kenny.util.Observer.MessageType.KEYBOARD_INPUT;
				message.sender = this;
				message.data = { value: value };
				com.kenny.util.Observer.sendMessage(message);
		    }
		}
	};
}