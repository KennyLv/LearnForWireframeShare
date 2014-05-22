/**
 * Tracker menu class
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.BaseTool,com.hoperun.util.NodeCache,com.hoperun.event.MouseEvent
 * @author lu_feng
 */
com.hoperun.tracker.TrackerMenu = {
	hideAll : function(){
		$('.tracker-menu').hide();
	}
};

$(document).bind('click',function(evt){
	var targetObj = com.hoperun.util.BaseTool.findEventTarget(evt);
	if(!$(targetObj).hasClass('tracker-menu')){
		com.hoperun.tracker.TrackerMenu.hideAll();
	}
});