/**
 * Image Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.Observer,
 *         com.kenny.tracker.ImageTracker
 * @author lu_feng
 */
if (!com.kenny.event.ImageFocusListener) {
    com.kenny.event.ImageFocusListener = function () {
        var tracker = null;
        this.update = function (message) {
            if (!tracker) {
                tracker = new com.kenny.tracker.ImageTracker();
            }
            if(tracker.getIgnoreItemFocusEventFlag() == false){
            	if (message.sender) {
                	//Avoid to send context blur event
                	if(tracker.isHide() || tracker.getActiveItem() != message.sender){
    	                var msg = new com.kenny.util.Observer.Message();
    	                msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
    	                msg.sender = this;
    	                com.kenny.util.Observer.sendMessage(msg);
                	}
                	if(message.data != null && message.data.trackerType != undefined){
                		if (message.data.trackerType == 'resize') {
                			tracker.setTrackerType(true);
                		} else if (message.data.trackerType == 'clip') {
                			tracker.setTrackerType(false);
                		}
                	} else {
            			tracker.setTrackerType(false);
            		}
                	if(message.data != null && message.data.fliparea != undefined){
                		// TODO
                		var flip = tracker.getDisplayFlipArea();
                		jsk.execute(
                			function() {
		                		if (message.data.fliparea == 'on') {
		                			tracker.setDisplayFlipArea(true);
		                		} else if (message.data.fliparea == 'off') {
		                			tracker.setDisplayFlipArea(false);
		                		}
		                		return {'flip':flip,'tracker':tracker};
                		    },
                		    function(data) {
                		    	var undoTracker = data.tracker;
                		    	undoTracker.setDisplayFlipArea(data.flip);
                		    }
                		);
                	}
                    tracker.setActiveItem(message.sender);
                    tracker.show();
                } else {
                    tracker.hide();
                }
            }
        };
    };

	com.kenny.event.ImageInsertListener = function() {
		this.update = function(message) {
			var src = message.data.src;
			var container = getActiveContainer();
			var image = new com.kenny.node.Image();
			
			var w = message.data.width, h = message.data.height;
			w = !isNaN(w)? parseInt(w, 10): 100;
			h = !isNaN(h)? parseInt(h, 10): 100;
			image.setOrigWidth(w);
			image.setOrigHeight(h);
			image.setSrc(src);
			if(container.getCursorPosition && container.getCursorPosition()){
				image.setTop(container.getCursorPosition().y);
				image.setLeft(container.getCursorPosition().x);
			}
			jsk.execute(
				function() {
					if (container.getType()=="Slide") {
						setCurrSlide(container);
					} else if (container.getType()=="Sheet") {
						setCurrSheet(container);
					}
					image.appendTo(container);
					
					var imgResizeMsg = new com.kenny.util.Observer.Message();
					imgResizeMsg.id = com.kenny.util.Observer.MessageType.IMAGE_LAYOUT;
					imgResizeMsg.sender = image;
					imgResizeMsg.data = {};
					com.kenny.util.Observer.sendMessage(imgResizeMsg);
					
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
					message.sender = image;
					message.data = {};
					com.kenny.util.Observer.sendMessage(message);
					return {"container":container,"image":image};
				},
				function(data) {
					// from jsk.execute dofunction
					var container = data.container;
					if(container.getType()=="Slide")
						setCurrSlide(container);
					else if(container.getType()=="Sheet")
						setCurrSheet(container);
					// from jsk.execute dofunction
					var image = data.image;
					image.removeFrom(container);
					
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					message.sender = null;
					message.data = {};
					
					com.kenny.util.Observer.sendMessage(message);
					var msg = new com.kenny.util.Observer.Message();
					msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
					msg.sender = container;
					com.kenny.util.Observer.sendMessage(msg);
			});
		};
	};

	com.kenny.event.ImageResizeListener = function() {
		this.update = function(message) {
			var tracker = message.sender;
			var imgItem = tracker.getActiveItem();
			
			var x = message.data.x;
			var y = message.data.y;
			var w = message.data.w;
			var h = message.data.h;
			
			var dx = message.data.dx;
			var dy = message.data.dy;
			jsk.execute(
				function() {
					var undoLeft = imgItem.getLeft();
					var undoTop = imgItem.getTop();
					var undoWidth = imgItem.getWidth();
					var undoHeight = imgItem.getHeight();
					var undoOrigHeight = imgItem.getOrigHeight();
					var undoOrigWidth = imgItem.getOrigWidth();
					
					imgItem.doResize(x, y, w, h);
					imgItem.moveTo(dx, dy);
					tracker.setActiveItem(imgItem);
					
					//Focus Page
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = imgItem;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					message.sender = imgItem;
					message.data = {};
					com.kenny.util.Observer.sendMessage(message);
					return {'trackerId':tracker.getId(),"image":imgItem,
						   'undoLeft':undoLeft,'undoTop':undoTop,'undoWidth':undoWidth,'undoHeight':undoHeight,'dx':dx,'dy':dy,
						   'undoOrigHeight':undoOrigHeight,'undoOrigWidth':undoOrigWidth};
				},
				function(data) {
					// from jsk.execute dofunction
					var image = data.image;
//					image.setWidth(image.getWidth() / zoomW);
//					image.setHeight(image.getHeight() / zoomH);
//					image.setTop(image.getTop() - moveT);
//					image.setLeft(image.getLeft() - moveL);
					image.unDoResize(data.undoLeft,data.undoTop,data.undoWidth,data.undoHeight,data.undoOrigWidth,data.undoOrigHeight);
					image.unMoveTo(data.dx,data.dy);
					tracker.setActiveItem(image);
					
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = image;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					message.sender = image;
					message.data = {};
					com.kenny.util.Observer.sendMessage(message);
				}
			);
		};
	};

	com.kenny.event.ImageClipListener = function() {
		this.update = function(message) {
			var tracker = message.sender;
			var imgItem = tracker.getActiveItem();
			
			var x = message.data.x;
			var y = message.data.y;
			var w = message.data.w;
			var h = message.data.h;
			var dx = message.data.dx;
			var dy = message.data.dy;
			jsk.execute(
				function() {
					var undoLeft = imgItem.getLeft();
					var undoTop = imgItem.getTop();
					var undoWidth = imgItem.getWidth();
					var undoHeight = imgItem.getHeight();
					var undoClipX = imgItem.getClip().x;
					var undoClipY = imgItem.getClip().y;
					//console.info("" + undoClipX + " , "+undoClipY);
					
					imgItem.doClip(x, y, w, h);
					imgItem.moveTo(dx, dy);
					tracker.setActiveItem(imgItem);
					
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = imgItem;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var message = new com.kenny.util.Observer.Message();
					message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					message.sender = imgItem;
					message.data = {};
					com.kenny.util.Observer.sendMessage(message);
					
					return {'tracker':tracker,"image":imgItem,
						'undoLeft':undoLeft,'undoTop':undoTop,'undoWidth':undoWidth,'undoHeight':undoHeight,'dx':dx,'dy':dy,
						'undoClipX':undoClipX,'undoClipY':undoClipY};
				},
				function(data) {
					// from jsk.execute dofunction
					var image = data.image;
					var undoTracker = data.tracker;
					//console.info(data.undoClipX+" , "+data.undoClipY);
					image.undoClip(data.undoLeft,data.undoTop,data.undoWidth,data.undoHeight,data.undoClipX,data.undoClipY);
					image.unMoveTo(data.dx,data.dy);
					undoTracker.setActiveItem(image);
					
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = image;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var slideMessage = new com.kenny.util.Observer.Message();
					slideMessage.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					slideMessage.sender = image;
					slideMessage.data = {};
					com.kenny.util.Observer.sendMessage(slideMessage);
				}
			);
		};
	};

	com.kenny.event.ImageStyleListener = function() {
		this.update = function(message) {
			var image = message.sender;
			var undoData=image.getData();
			//console.info("get before do:"+undoData.rotation);
			
			jsk.execute(
				function() {
					if (message.data.opacity != undefined) {
						message.sender.setOpacity(message.data.opacity/100);
					}
					if(message.data.shadow){
						message.sender.setShadow(message.data.shadow);
					}
					// set image border width
					if (message.data.borderWidth != undefined) {
						//if(message.sender.getBorderStyle() == null) message.sender.setBorderStyle('solid');
						message.sender.setBorderWidth(message.data.borderWidth);
					}
					// set image reflection TODO
					if (message.data.reflection != undefined) {
						message.sender.setReflection(message.data.reflection);
					}
//					if (message.data.effOpacity != undefined) {
//						message.sender.setOpacity(message.data.effOpacity/100);
//					}
		            if (message.data.rotation != undefined) {
						message.sender.setRotation(message.data.rotation);
					}
		            if (message.data.flip != undefined) {
						message.sender.setFlip(message.data.flip);						
					}
					if (message.data.maskReset != undefined) {
						// 
					}
					if (message.data.maskEdit != undefined) {
						// 
					}
					if (message.data.borderImage != undefined) {
						message.sender.setBorderImage(message.data.borderImage);
					}
					if (message.data.borderStyle != undefined) {
						switch(message.data.borderStyle){
						    case 'solid':
						    	message.sender.setBorderStyle('solid');
//						    	if(message.sender.getBorderWidth() == null){message.sender.setBorderWidth("1px");}
//						    	if(message.sender.getBorderColor() == null){message.sender.setBorderColor("black");}
						    	break;
						    case 'dotted':
						    	message.sender.setBorderStyle('dotted');
//						    	if(message.sender.getBorderWidth() == null){message.sender.setBorderWidth("1px");}
//						    	if(message.sender.getBorderColor() == null){message.sender.setBorderColor("black");}
						    	break;
						    case 'dashed':
						    	message.sender.setBorderStyle('dashed');
//						    	if(message.sender.getBorderWidth() == null){message.sender.setBorderWidth("1px");}
//						    	if(message.sender.getBorderColor() == null){message.sender.setBorderColor("black");}
						    	break;
						    case 'halfdashed':
						    	message.sender.setBorderStyle('halfdashed');
//						    	if(message.sender.getBorderWidth() == null){message.sender.setBorderWidth("2px");}
//						    	if(message.sender.getBorderColor() == null){message.sender.setBorderColor("black");}
						    	break;
						    case 'halfdotted':
						    	message.sender.setBorderStyle('halfdotted');
//						    	if(message.sender.getBorderWidth() == null){message.sender.setBorderWidth("1px");}
//						    	if(message.sender.getBorderColor() == null){message.sender.setBorderColor("black");}
						    	break;
						    case 'xsolid':
						    	message.sender.setBorderStyle('xsolid');
						    	break;
		//				    case 'Img_borderStyle1':
		//				    	//alert(message.data.borderStyle);
		//				    	message.sender.setClassName("menu_image_border_line_back1");
		//				    	break;
						}
					}
					if (message.data.borderColor != undefined) {
						if(message.sender.getBorderStyle() == null) message.sender.setBorderStyle('solid');
						message.sender.setBorderColor(message.data.borderColor);
					}
					
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = image;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var msg = new com.kenny.util.Observer.Message();
					msg.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					msg.sender = image;
					msg.data = {};
					com.kenny.util.Observer.sendMessage(msg);
					
					return {'data':undoData,'image':image};
				},
				function(data) {
					// from jsk.execute dofunction
					var uodoImage = data.image;
					var data = data.data;
					if(data.opacity == null){
						uodoImage.setOpacity(1);
					} else if (data.opacity != undefined) {
						uodoImage.setOpacity(data.opacity);
					}
					if(data.shadow == null){
						uodoImage.setShadow('');
					}else if (data.shadow != undefined){
						uodoImage.setShadow(data.shadow);
					}
					// set image border width
					if(data.borderWidth == null){
						uodoImage.setBorderWidth(0);
					}else if (data.borderWidth != undefined) {
						uodoImage.setBorderWidth(data.borderWidth);
					}
					// set image reflection
//					if(undoData.reflection == null){
//						//TODO
//					} else if (undoData.reflection != undefined) {
//						uodoImage.setReflection(undoData.reflection);
//					}
		            if (data.flip != undefined) {//TODO 不知道为什么要用message.data？
		            	//console.info("undo:"+data.flip.x+" , "+data.flip.y);
		            	uodoImage.setFlip(data.flip);
					}
		            if (data.rotation != undefined) {
		            	//console.info("get undo:"+data.rotation);
		            	uodoImage.setRotation(data.rotation);
					}
					if (message.data.maskReset != undefined) {
						// 
					}
					if (message.data.maskEdit != undefined) {
						// 
					}
					if (message.data.borderImage != undefined) {
						uodoImage.setBorderImage(data.borderImage);
					}
					if(undoData.borderStyle == null || undoData.borderStyle == 'none'){
						uodoImage.setBorderStyle('solid');
					} else if (undoData.borderStyle != undefined) {
						switch(undoData.borderStyle){
						    case 'solid':
						    	uodoImage.setBorderStyle('solid');
						    	break;
						    case 'dotted':
						    	uodoImage.setBorderStyle('dotted');
						    	break;
						    case 'dashed':
						    	uodoImage.setBorderStyle('dashed');
						    	break;
						    case 'halfdotted':
						    	uodoImage.setBorderStyle('halfdotted');
						    	break;
						    case 'halfdashed':
						    	uodoImage.setBorderStyle('halfdashed');
						    	break;
						    case 'xsolid':
						    	
						    	break;
		//				    case 'Img_borderStyle1':
		//				    	break;
						}
					}
					if(undoData.borderColor == null || undoData.borderColor == 'none'){
						uodoImage.setBorderColor(undoData.borderColor);
					} else if (undoData.borderColor != undefined) {
						if(uodoImage.getBorderStyle() == null) uodoImage.setBorderStyle('solid');
						uodoImage.setBorderColor(undoData.borderColor);
					}
					
					var focusMsg = new com.kenny.util.Observer.Message();
					focusMsg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
					focusMsg.sender = image;
					com.kenny.util.Observer.sendMessage(focusMsg);
					
					var msg = new com.kenny.util.Observer.Message();
					msg.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					msg.sender = uodoImage;//message.sender;
					msg.data = {};
					com.kenny.util.Observer.sendMessage(msg);
				}
			);
		};
	};
	
	com.kenny.event.ImageMoveListner = function(){
		this.update = function(message) {
			var image = message.sender;
			
			var top = image.getTop();
			var left = image.getLeft();
			
			image.setLeft(message.data.left); 
			image.setTop(message.data.top);
			if(message.data.rect){
				com.kenny.util.BaseTool.doValidPositionWidthRect(message.data.rect, image);
			}
			else{
				com.kenny.util.BaseTool.doValidPosition(message.data.self, image);
			}
			
			var targetLeft = image.getLeft(), targetTop = image.getTop();
			
			jsk.execute( function () {
				image.setLeft(targetLeft); 
				image.setTop(targetTop);

				var updateMsg = new com.kenny.util.Observer.Message();
				updateMsg.id = com.kenny.util.Observer.MessageType.IMAGE_LAYOUT;
				updateMsg.sender = image;
				updateMsg.data = {};
				com.kenny.util.Observer.sendMessage(updateMsg);
				
			    //Notify image blur event
		        var msg = new com.kenny.util.Observer.Message();
		        msg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
		        msg.sender = image;
		        com.kenny.util.Observer.sendMessage(msg);
				return {
					"top": top ,"left": left, 'image':image
				};
			}, function (data) {
				image.setLeft(data.left); 
				image.setTop(data.top);
			    
				var updateMsg = new com.kenny.util.Observer.Message();
				updateMsg.id = com.kenny.util.Observer.MessageType.IMAGE_LAYOUT;
				updateMsg.sender = data.image;
				updateMsg.data = {};
				com.kenny.util.Observer.sendMessage(updateMsg);
				
			    //Notify image blur event
		        var msg = new com.kenny.util.Observer.Message();
		        msg.id = com.kenny.util.Observer.MessageType.IMAGE_FOCUS;
		        msg.sender = data.image;
		        com.kenny.util.Observer.sendMessage(msg);
			});
		};
	};

	com.kenny.util.Observer.register(
			com.kenny.util.Observer.MessageType.IMAGE_INSERT,
			new com.kenny.event.ImageInsertListener());

	com.kenny.util.Observer.register(
			com.kenny.util.Observer.MessageType.IMAGE_SETSTYLE,
			new com.kenny.event.ImageStyleListener());

	// Register this into Observer container.
	var ImageFocusListener = new com.kenny.event.ImageFocusListener();
	com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.IMAGE_FOCUS, ImageFocusListener);
	com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.IMAGE_RIGHTCLICK, ImageFocusListener);

	com.kenny.util.Observer.register(
			com.kenny.util.Observer.MessageType.IMAGE_RESIZE,
			new com.kenny.event.ImageResizeListener());
	com.kenny.util.Observer.register(
			com.kenny.util.Observer.MessageType.IMAGE_POSITION,
			new com.kenny.event.ImageMoveListner());
	com.kenny.util.Observer.register(
			com.kenny.util.Observer.MessageType.IMAGE_CLIP,
			new com.kenny.event.ImageClipListener());
}