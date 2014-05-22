/**
 * Video Listener class
 * 
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.Observer,
 *         com.hoperun.tracker.VideoTracker
 * @author Jian.T
 */
if (!com.hoperun.event.VideoFocusListener) {
    com.hoperun.event.VideoFocusListener = function () {
        var VideoTracker = null;
        this.update = function (message) {
            if (!VideoTracker) {
                VideoTracker = new com.hoperun.tracker.VideoTracker();
                ($('.docs-editor').length > 0) ? $('.docs-editor').append(VideoTracker.getDomInstance()):document.body.appendChild(VideoTracker.getDomInstance());
            }
            if (message.sender) {
                if (VideoTracker.isHide() || VideoTracker.getActiveItem() != message.sender) {
                    var msg = new com.hoperun.util.Observer.Message();
                    msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
                    msg.sender = this;
                    com.hoperun.util.Observer.sendMessage(msg);
                }
                VideoTracker.show();
                VideoTracker.setActiveItem(message.sender);
                VideoTracker.setZIndex(message.sender.getZIndex() - 1);
            } else {
                VideoTracker.hide();
            }
        };
    };

    com.hoperun.event.VideoResizeListener = function () {
        this.update = function (message) {
            var tracker = message.sender;
            jsk.execute(
				function () {
					var VideoItem = tracker.getActiveItem();
					var oldWidth=VideoItem.getWidth();
					var oldHeight=VideoItem.getHeight();
					VideoItem.setWidth(message.data.newWidth);
				    VideoItem.setHeight(message.data.newHeight);
				    tracker.setActiveItem(VideoItem);
				    return { 'trackerId': tracker.getId(), "VideoItem": VideoItem,"oldWidth":oldWidth,"oldHeight": oldHeight};
				},
				function (data) {
					var VideoItem = data.VideoItem;
					VideoItem.setWidth(data.oldWidth);
				    VideoItem.setHeight(data.oldHeight);
				    tracker.setActiveItem(VideoItem);
				}
		    );
        };
    };
    
    com.hoperun.event.VideoMoveListner = function () {
        this.update = function (message) {
            var tracker = message.sender;            
            jsk.execute(function () {
                var VideoItem = message.sender.getActiveItem();
                var top = VideoItem.getTop();
                var left = VideoItem.getLeft();
                VideoItem.setLeft(left+message.data.moveLeft);
                VideoItem.setTop(top+message.data.moveTop);
                tracker.setActiveItem(VideoItem);
                return {
                    "top": top, "left": left, 'Video': VideoItem
                };
            }, function (data) {
                data.Video.setLeft(data.left);
                data.Video.setTop(data.top);
                tracker.setActiveItem(data.Video);
            });
        };
    };
    


com.hoperun.event.VideoInsertListener = function () {
        this.update = function (message) {
            var VideoItem = new com.hoperun.node.Video();
            VideoItem.setSrc(message.data.src);
            VideoItem.setWidth(message.data.width);
            VideoItem.setHeight(message.data.height);
            VideoItem.setZIndex(message.data.zindex);
            //VideoItem.setWidth(320);
            //VideoItem.setHeight(240);
            //VideoItem.setZIndex(1000);

            var container = getActiveContainer();
            if (container != null && VideoItem) {
                if (container.getCursorPosition && container.getCursorPosition()) {
                    VideoItem.setTop(container.getCursorPosition().y);
                    VideoItem.setLeft(container.getCursorPosition().x);
                }
                jsk.execute(
					function () {

					    if (container.getType() == "Slide") {
					        setCurrSlide(container);
					    }
					    else if (container.getType() == "Sheet") {
					        setCurrSheet(container);
					    }
					    VideoItem.appendTo(container);
					    					    
					    var message = new com.hoperun.util.Observer.Message();
					    message.id = com.hoperun.util.Observer.MessageType.VIDEO_FOCUS;
					    message.sender = VideoItem;
					    message.data = {};
					    com.hoperun.util.Observer.sendMessage(message);
					    
					    return { "container": container, "VideoItem": VideoItem };
					},
					function (data) {

					    var container = data.container;
					    if (container.getType() == "Slide") {
					        setCurrSlide(container);
					    }
					    else if (container.getType() == "Sheet") {
					        setCurrSheet(container);
					    }
					    
					    var VideoItem = data.VideoItem;
					    
					    VideoItem.removeFrom(container);
					    
					    var msg = new com.hoperun.util.Observer.Message();
					    msg.id = com.hoperun.util.Observer.MessageType.CONTEXT_BLUR;
					    msg.sender = container;
					    com.hoperun.util.Observer.sendMessage(msg);
					});
            }
        };
    };


    com.hoperun.event.VideoArrangeListener = function () {
        this.update = function (message) {
            
        };
    };

    (function () {
        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.VIDEO_FOCUS, new com.hoperun.event.VideoFocusListener());
        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.VIDEO_RESIZE, new com.hoperun.event.VideoResizeListener());
        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.VIDEO_INSERT, new com.hoperun.event.VideoInsertListener());
        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.VIDEO_ARRANGE, new com.hoperun.event.VideoArrangeListener());
        com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.VIDEO_POSITION, new com.hoperun.event.VideoMoveListner());
    })();
}