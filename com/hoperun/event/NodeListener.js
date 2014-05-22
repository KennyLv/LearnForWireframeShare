/**
 * ZIndex Listener class
 * @package com.hoperun.event
 * @import com.hoperun.util.BaseTool, com.hoperun.util.Observer
 * @author Jian.T
 */
if (!com.hoperun.event.NodeListener) {
    with(com.hoperun.util.Observer.CommonMessageType){
        com.hoperun.event.NodeListener = function() {
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
                        msgType = com.hoperun.util.Observer.MessageType.IMAGE_RESIZE;
                        break;
                    case 'Table':
                        msgType = com.hoperun.util.Observer.MessageType.TABLE_RESIZE;
                        break;
                    default:
                        if(this.getType().indexOf("Chart")!=-1){
                            msgType = com.hoperun.util.Observer.MessageType.CHART_RESIZE;
                        }
                        else{
                            msgType = com.hoperun.util.Observer.MessageType.SHAPE_RESIZE;
                        }
                }
                return msgType;
            };
            this.typeForLayout = function(type){
                var msgType = null;
                switch(this.getType()){
                    case 'Image':
                        msgType = com.hoperun.util.Observer.MessageType.IMAGE_LAYOUT;
                        break;
                    case 'Table':
                        msgType = com.hoperun.util.Observer.MessageType.TABLE_LAYOUT;
                        break;
                    default:
                        if(this.getType().indexOf("Chart")!=-1){
                            msgType = com.hoperun.util.Observer.MessageType.CHART_LAYOUT;
                        }
                        else{
                            msgType = com.hoperun.util.Observer.MessageType.SHAPE_LAYOUT;
                        }
                }
                return msgType;
            };
        };
        
        (function(){
            var listener = new com.hoperun.event.NodeListener();
            com.hoperun.util.Observer.register(Node.INSERT, listener);
            com.hoperun.util.Observer.register(Node.FOCUS, listener);
            com.hoperun.util.Observer.register(Node.RESIZE, listener);
            com.hoperun.util.Observer.register(Node.LAYOUT, listener);
        })();
    }
}