/**
 * Video Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.Observer,
 *         com.kenny.tracker.VideoTracker
 * @author Jian.T
 */
if (!com.kenny.event.VideoFocusListener) {
    com.kenny.event.VideoFocusListener = function () {
        var VideoTracker = null;
        this.update = function (message) {
            if (!VideoTracker) {
                VideoTracker = new com.kenny.tracker.VideoTracker();
                ($('.docs-editor').length > 0) ? $('.docs-editor').append(VideoTracker.getDomInstance()):document.body.appendChild(VideoTracker.getDomInstance());
            }
            if (message.sender) {
                if (VideoTracker.isHide() || VideoTracker.getActiveItem() != message.sender) {
                    var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
                    msg.sender = this;
                    com.kenny.util.Observer.sendMessage(msg);
                }
                VideoTracker.show();
                VideoTracker.setActiveItem(message.sender);
                VideoTracker.setZIndex(message.sender.getZIndex() - 1);
            } else {
                VideoTracker.hide();
            }
        };
    };

    com.kenny.event.VideoResizeListener = function () {
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
    
    com.kenny.event.VideoMoveListner = function () {
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
    


com.kenny.event.VideoInsertListener = function () {
        this.update = function (message) {
            var VideoItem = new com.kenny.node.Video();
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
					    					    
					    var message = new com.kenny.util.Observer.Message();
					    message.id = com.kenny.util.Observer.MessageType.VIDEO_FOCUS;
					    message.sender = VideoItem;
					    message.data = {};
					    com.kenny.util.Observer.sendMessage(message);
					    
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
					    
					    var msg = new com.kenny.util.Observer.Message();
					    msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
					    msg.sender = container;
					    com.kenny.util.Observer.sendMessage(msg);
					});
            }
        };
    };


    com.kenny.event.VideoArrangeListener = function () {
        this.update = function (message) {
            
        };
    };

    (function () {
        com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.VIDEO_FOCUS, new com.kenny.event.VideoFocusListener());
        com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.VIDEO_RESIZE, new com.kenny.event.VideoResizeListener());
        com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.VIDEO_INSERT, new com.kenny.event.VideoInsertListener());
        com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.VIDEO_ARRANGE, new com.kenny.event.VideoArrangeListener());
        com.kenny.util.Observer.register(com.kenny.util.Observer.MessageType.VIDEO_POSITION, new com.kenny.event.VideoMoveListner());
    })();
}