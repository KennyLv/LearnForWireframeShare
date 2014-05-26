/**
 * Chart Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.Observer,
 *         
 * @author Feng.Lu
 */
if (!com.kenny.event.ChartListener) {
	com.kenny.event.ChartListener = function() {
        var activeItem = null;
		this.update = function(message) {
		    if (!activeItem) {
		        activeItem = new com.kenny.tracker.ChartTracker();
                ($('.docs-editor').length > 0) ? $('.docs-editor').append(activeItem.getDomInstance()):document.body.appendChild(activeItem.getDomInstance());
            }
		    if (message.sender) {
                if (activeItem.isHide() || activeItem.getActiveItem() != message.sender) {
                    var msg = new com.kenny.util.Observer.Message();
                    msg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
                    msg.sender = this;
                    com.kenny.util.Observer.sendMessage(msg);
                }
                activeItem.show();
                activeItem.setActiveItem(message.sender);
            } 
		    else {
                activeItem.hide();
            }
		};
	};

	com.kenny.event.ChartInsertListener = function(){
	    this.update = function(message) {
	        var container = getActiveContainer();
            if (container == null) return;
            var chart = eval('new com.kenny.node.chart.' + message.sender.type + '()');
            if(container.getCursorPosition && container.getCursorPosition()) {
                chart.setTop(container.getCursorPosition().y);
                chart.setLeft(container.getCursorPosition().x);
            }
            if (chart){
                //Default value settings
                chart.setData({
                    width: 440,
                    height: 340,
                    titleText: "Title -- Double to Edit",
                    labelPosition: "Outside",
                    titleVisible: true
                });
                
                jsk.execute(
                    function() {
                        chart.appendTo(container);
                        chart.render();
                        
                        var layoutMsg = new com.kenny.util.Observer.Message();
                        layoutMsg.id = com.kenny.util.Observer.MessageType.CHART_LAYOUT;
                        layoutMsg.sender = chart;
                        layoutMsg.data = {};
                        com.kenny.util.Observer.sendMessage(layoutMsg);

                        var zindexMsg = new com.kenny.util.Observer.Message();
                        zindexMsg.id = com.kenny.util.Observer.MessageType.UPDATE_ZINDEX;
                        zindexMsg.sender = chart;
                        zindexMsg.data = {};
                        com.kenny.util.Observer.sendMessage(zindexMsg);
                        
                        return {
                            "container" : container,
                            "item" : chart
                        };
                    },
                    function(data) {
                        var container = data.container;
                        if (container.getType() == "Slide"){
                            setCurrSlide(container);
                        }
                        else if (container.getType() == "Sheet"){
                            setCurrSheet(container);
                        }
                        var chart = data.item;
                        chart.removeFrom(container);

                        com.kenny.util.Observer.sendMessage(message);
                        var blurMsg = new com.kenny.util.Observer.Message();
                        blurMsg.id = com.kenny.util.Observer.MessageType.CONTEXT_BLUR;
                        blurMsg.sender = container;
                        com.kenny.util.Observer.sendMessage(blurMsg);
                    }
                 );
            }
        };
	};
	
    com.kenny.event.ChartResizeListener = function () {
        this.update = function (message) {
            var tracker = message.sender;
            jsk.execute(
                function() {
                    var chartItem = tracker.getActiveItem();
                    var oldWidth = chartItem.getWidth();
                    var oldHeight = chartItem.getHeight();
                    var oldLeft =  chartItem.getLeft();
                    var oldTop =  chartItem.getTop();
                    
                    chartItem.setWidth(message.data.zoomX * oldWidth);
                    chartItem.setHeight(message.data.zoomY * oldHeight);
                    chartItem.setLeft(oldLeft + message.data.moveLeft);
                    chartItem.setTop(oldTop + message.data.moveTop);
                    
                    chartItem.render(); //render the new size
                    tracker.setActiveItem(chartItem);
                    return { "chartItem": chartItem, position:{
                        left: oldLeft,
                        top: oldTop,
                        width: oldWidth,
                        height: oldHeight
                    }};
                },
                function(data) {
                    var chartItem = data.chartItem;
                    chartItem.setWidth(data.position.width);
                    chartItem.setHeight(data.position.height);
                    chartItem.setLeft(data.position.left);
                    chartItem.setTop(data.position.top);
                    chartItem.render(); //render the new size
                    tracker.setActiveItem(chartItem);
                }
            );
        };
    };
    
    com.kenny.event.ChartMoveListner = function(){
        this.update = function(message) {
            var chart = message.sender;
            var top = chart.getTop();
            var left = chart.getLeft();
            
            chart.setLeft(message.data.left); 
            chart.setTop(message.data.top);
            if(message.data.rect){
                com.kenny.util.BaseTool.doValidPositionWidthRect(message.data.rect, chart);
            }
            else{
                com.kenny.util.BaseTool.doValidPosition(message.data.self, chart);
            }
            
            var targetLeft = chart.getLeft(), targetTop = chart.getTop();
            
            jsk.execute( function () {
                chart.setLeft(targetLeft); 
                chart.setTop(targetTop);
                
                var updateMsg = new com.kenny.util.Observer.Message();
                updateMsg.id = com.kenny.util.Observer.MessageType.CHART_LAYOUT;
                updateMsg.sender = chart;
                updateMsg.data = {};
                com.kenny.util.Observer.sendMessage(updateMsg);
                
                //Notify shape blur event
                var msg = new com.kenny.util.Observer.Message();
                msg.id = com.kenny.util.Observer.MessageType.CHART_FOCUS;
                msg.sender = chart;
                com.kenny.util.Observer.sendMessage(msg);
                return {
                    "top": top ,"left": left, 'shape':chart
                };
            }, function (data) {
                chart.setLeft(data.left); 
                chart.setTop(data.top);
                
                var updateMsg = new com.kenny.util.Observer.Message();
                updateMsg.id = com.kenny.util.Observer.MessageType.CHART_LAYOUT;
                updateMsg.sender = data.shape;
                updateMsg.data = {};
                com.kenny.util.Observer.sendMessage(updateMsg);
                
                //Notify shape blur event
                var msg = new com.kenny.util.Observer.Message();
                msg.id = com.kenny.util.Observer.MessageType.CHART_FOCUS;
                msg.sender = data.shape;
                com.kenny.util.Observer.sendMessage(msg);
            });
        };
    };
	(function(){
	    with(com.kenny.util.Observer){
	        with(com.kenny.event){
	            register(MessageType.CHART_FOCUS,  new ChartListener());
	            register(MessageType.CHART_INSERT, new ChartInsertListener());
	            register(MessageType.CHART_RESIZE, new ChartResizeListener());
	            register(MessageType.CHART_POSITION, new ChartMoveListner());
	            
	        }
	    }
	})();
}