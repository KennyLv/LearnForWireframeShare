/**
 * ZIndex Listener class
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.Observer
 * @author Jian.T
 */
if (!com.kenny.event.NodeListener) {
    with(com.kenny.util.Observer.CommonMessageType){
        com.kenny.event.NodeListener = function() {
            this.update = function(msg) {
                var type = msg.sender && msg.sender.getType && msg.sender.getType();
                if(!type) return;
                
                var msgType = null;
                switch (msg.id) {
                    case Node.INSERT:
                        break;
                    case Node.FOCUS:
                        break;
                    case Node.RESIZE:
                        msgType = this.typeForResize(type);
                        break;
                    case Node.LAYOUT:
                        msgType = this.typeForLayout(type);
                        break;
                }
                
                if(msgType){
                    
                }
            };
            
            this.typeForResize = function(type){
                var msgType = null;
                switch(type){
                    case 'Image':
                        msgType = com.kenny.util.Observer.MessageType.IMAGE_RESIZE;
                        break;
                    case 'Table':
                        msgType = com.kenny.util.Observer.MessageType.TABLE_RESIZE;
                        break;
                    default:
                        if(this.getType().indexOf("Chart")!=-1){
                            msgType = com.kenny.util.Observer.MessageType.CHART_RESIZE;
                        }
                        else{
                            msgType = com.kenny.util.Observer.MessageType.SHAPE_RESIZE;
                        }
                }
                return msgType;
            };
            this.typeForLayout = function(type){
                var msgType = null;
                switch(this.getType()){
                    case 'Image':
                        msgType = com.kenny.util.Observer.MessageType.IMAGE_LAYOUT;
                        break;
                    case 'Table':
                        msgType = com.kenny.util.Observer.MessageType.TABLE_LAYOUT;
                        break;
                    default:
                        if(this.getType().indexOf("Chart")!=-1){
                            msgType = com.kenny.util.Observer.MessageType.CHART_LAYOUT;
                        }
                        else{
                            msgType = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
                        }
                }
                return msgType;
            };
        };
        
        (function(){
            var listener = new com.kenny.event.NodeListener();
            com.kenny.util.Observer.register(Node.INSERT, listener);
            com.kenny.util.Observer.register(Node.FOCUS, listener);
            com.kenny.util.Observer.register(Node.RESIZE, listener);
            com.kenny.util.Observer.register(Node.LAYOUT, listener);
        })();
    }
}