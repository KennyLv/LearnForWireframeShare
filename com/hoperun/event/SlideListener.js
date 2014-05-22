/**
 * SlideListener Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool,com.hoperun.util.Observer
 * @author Jian.T
 */
if (!com.hoperun.event.SlideListener) {
    com.hoperun.event.SlideListener = function () {
        this._slideObj = null;
        this.update = function (message) {
            switch (message.id) {
                case com.hoperun.util.Observer.MessageType.SLIDES_CREATE:
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_CREATE, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDES_SAVE, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TABLE_LAYOUT, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_CUT, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_COPY, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_PASTE, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_REMOVE, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_ADD_TRANSITION, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.SLIDE_SET_BACKGROUND, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DELETE_ITEM, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.COPY_ITEM, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CUT_ITEM, this);
                    com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE, this);

                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_CREATE:
                    var templateId = message.data.templateId;
                    if (templateId == null || templateId.length == 0 || templateId == "template_0") {
                        var slide = new com.hoperun.node.Slide();
                        slide.setWidth(760);
                        slide.setHeight(570);
                        //slide.setBackground({color:'red', image:'url(images/slide_template_bg.gif)', repeat:'repeat'});
                        var obj = message.data.objData;
                        if (obj) {
                            slide.setData(obj);
                        }
                        appendToLeftSide(slide);
                        var isNotFirst = message.data.isNotFirst;
                        if(!isNotFirst){
                        	setCurrSlide(slide);
                        }
                        //setCurrSlide(slide);
                        slides.add(slide); 
                        //return slide;
                    } else {
                        alert("Create slide from this template hasn't been implemented !");
                    }
//                    var obj = message.data.objData;
//                    if (obj) {
//                        var slide = new com.hoperun.node.Slide();
//                        slide.setData(obj);
//                        appendToLeftSide(slide);
//                        slides.add(slide);
//                    }
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDES_SAVE:
                    com.hoperun.util.FileHelper.save(message.sender, message.data);
                    break;
                case com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE:
                    try {
                    	
                    } catch (e) { }
                    break;
                case com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT:
                case com.hoperun.util.Observer.MessageType.TABLE_LAYOUT:
                case com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT:
                    var msg = new com.hoperun.util.Observer.Message();
                    msg.id = com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
                    msg.sender = message.sender;
                    msg.data = {};
                    com.hoperun.util.Observer.sendMessage(msg);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_CUT:
                    cutSlide(message.sender);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_COPY:
                    copySlide(message.sender);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_PASTE:
                    pasteSlide(message.sender);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_REMOVE:
                    removeSlide(message.sender);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_ADD_TRANSITION:
                    message.sender.setTransitions(message.data.transitions);
                    break;
                case com.hoperun.util.Observer.MessageType.SLIDE_SET_BACKGROUND:
                    if (message.data.src != null) {
                        message.sender.setBackground({ 'image': 'url(' + message.data.src + ')' });
                    } else if (message.data.color != null) {
                        message.sender.setBackground({ 'color': message.data.color });
                    } else if (message.data.repeat != null) {
                        message.sender.setBackground({ 'repeat': message.data.repeat });
                    }
                    var msg = new com.hoperun.util.Observer.Message();
                    msg.id = com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
                    msg.sender = message.sender;
                    msg.data = {};
                    com.hoperun.util.Observer.sendMessage(msg);
                    break;
                case com.hoperun.util.Observer.MessageType.DELETE_ITEM:
                    var slide = currSlide;
                    var item = message.sender;
                    jsk.execute(
					function () {
						item.removeFrom(slide);
					    var message = new com.hoperun.util.Observer.Message();
					    message.id = com.hoperun.util.Observer.MessageType.UPDATE_ZINDEX;
					    message.sender = item;
					    message.data = {
					        'remove': true,
					        'criticalZIndex': item.getZIndex()
					    };
					    com.hoperun.util.Observer.sendMessage(message);

					    var contextMsg = new com.hoperun.util.Observer.Message();
					    contextMsg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
					    contextMsg.sender = null;
					    com.hoperun.util.Observer.sendMessage(contextMsg);

					    var msg = new com.hoperun.util.Observer.Message();
					    msg.id = com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					    msg.sender = item;
					    msg.data = {};
					    com.hoperun.util.Observer.sendMessage(msg);
					    return { "slide": slide, "item": item };
					},
					function (data) {
					    var slide = data.slide;
					    var item = data.item;
					    setCurrSlide(slide);
					    item.appendTo(slide);

					    var msg = new com.hoperun.util.Observer.Message();
					    msg.id = com.hoperun.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
					    msg.sender = item;
					    msg.data = {};
					    com.hoperun.util.Observer.sendMessage(msg);

					});
                    break;
                case com.hoperun.util.Observer.MessageType.COPY_ITEM:
                    var msg = new com.hoperun.util.Observer.Message();
                    msg.sender = message.sender;
                    msg.id = com.hoperun.util.Observer.MessageType.SHAPE_INSERT;
                    com.hoperun.util.Observer.sendMessage(msg);
                    break;
                case com.hoperun.util.Observer.MessageType.CUT_ITEM:
                    var msg = new com.hoperun.util.Observer.Message();
                    msg.sender = message.sender;
                    msg.id = com.hoperun.util.Observer.MessageType.COPY_ITEM;
                    com.hoperun.util.Observer.sendMessage(msg);

                    var msg = new com.hoperun.util.Observer.Message();
                    msg.sender = message.sender;
                    msg.id = com.hoperun.util.Observer.MessageType.DELETE_ITEM;
                    com.hoperun.util.Observer.sendMessage(msg);

                    break;
            }
        };
    };

	com.hoperun.util.Observer.register(
			com.hoperun.util.Observer.MessageType.SLIDES_CREATE,
			new com.hoperun.event.SlideListener());
};