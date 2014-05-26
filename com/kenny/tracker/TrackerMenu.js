/**
 * Tracker menu class
 * 
 * @package com.kenny.node
 * @import com.kenny.util.BaseTool,com.kenny.util.NodeCache,com.kenny.event.MouseEvent
 * @author lu_feng
 */
com.kenny.tracker.TrackerMenu = {
	hideAll : function(){
		$('.tracker-menu').hide();
	}
};

$(document).bind('click',function(evt){
	var targetObj = com.kenny.util.BaseTool.findEventTarget(evt);
	if(!$(targetObj).hasClass('tracker-menu')){
		com.kenny.tracker.TrackerMenu.hideAll();
	}
});