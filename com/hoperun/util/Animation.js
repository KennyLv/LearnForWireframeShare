/**
 * Animation class
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.BaseTool
 * @author Jian.T
 */
com.hoperun.util.Animation = function() {
	this._id = com.hoperun.util.BaseTool.uuid();
	this._type = "Animation";
};

com.hoperun.util.Animation.prototype = {

	_id : null,

	_type : null,
	
	_slide : null,
	
	_lastSlide : null,
	
	_container : null,
	
	setSlide : function(slide) {
		this._slide = slide;
	},

	getSlide : function() {
		return this._slide;
	},
	
	setLastSlide : function(lastSlide) {
		this._lastSlide = lastSlide;
	},

	getLastSlide : function() {
		return this._lastSlide;
	},
	
	setContainer : function(container) {
		this._container = container;
	},

	getContainer : function() {
		return this._container;
	},
	
//	none : function() {
//		var self = this;
//		if(self.getLastSlide() != null) self.getContainer().removeChild(self.getLastSlide().getDomInstance());
//		var tempSlide = self.getSlide().clone();
//		self._resizeContainer(self.getContainer(), 1);
//		self.getContainer().appendChild(tempSlide.getDomInstance());
//		self.setLastSlide(tempSlide);
//	},
//	
//	alpha : function() {
//		var self = this;
//		if(self.getLastSlide() != null) self.getContainer().removeChild(self.getLastSlide().getDomInstance());
//		var tempSlide = self.getSlide().clone();
//		self._resizeContainer(self.getContainer(), 1);
//		$(self.getContainer()).css({'opacity':0});
//		self.getContainer().appendChild(tempSlide.getDomInstance());
//		var i=0;
//		function alpha(){
//			if(i++ < 20){
//				window.setTimeout(alpha, 50);
//				$(self.getContainer()).css({'opacity':0.05*i});
//			}
//		}
//		window.setTimeout(alpha, 50);
//		self.setLastSlide(tempSlide);
//	},
//	
//	translate : function() {
//		var self = this;
//		if(self.getLastSlide() != null) self.getContainer().removeChild(self.getLastSlide().getDomInstance());
//		var tempSlide = self.getSlide().clone();
//		$(self.getContainer()).css({"width":0, "height":770, "margin-right":($("body").width()-1366)/2});
//		$(self.getContainer()).css({"margin-top":($('body').height()-$(self.getContainer()).height())/2});
//		self.getContainer().appendChild(tempSlide.getDomInstance());
//		var i=0;
//		function translate(){
//			if(i++ < 20){
//				window.setTimeout(translate, 50);
//				$(self.getContainer()).css({"width":1366*i/20});
//			}else{
//				$(self.getContainer()).css({"margin":'0 auto'});
//				$(self.getContainer()).css({"margin-top":($('body').height()-$(self.getContainer()).height())/2});
//			}
//		}
//		window.setTimeout(translate, 50);
//		self.setLastSlide(tempSlide);
//	},
//	
//	rotate : function() {
//		var self = this;
//		if(self.getLastSlide() != null) self.getContainer().removeChild(self.getLastSlide().getDomInstance());
//		var tempSlide = self.getSlide().clone();
//		self._resizeContainer(self.getContainer(), 1);
//		self.getContainer().appendChild(tempSlide.getDomInstance());
//		var i=0;
//		var rotateVal = 0;
//		function rotate(){
//			if(i++ < 20){
//				window.setTimeout(rotate, 50);
//				rotateVal = i*18;
//				$(self.getContainer()).css({
//					'transform': 'rotate('+rotateVal+'deg)',
//					'-o-transform': 'rotate('+rotateVal+'deg)',
//					'-moz-transform': 'rotate('+rotateVal+'deg)',
//					'-webkit-transform': 'rotate('+rotateVal+'deg)'
//				}); 
//			}
//		}
//		window.setTimeout(rotate, 50);
//		self.setLastSlide(tempSlide);
//	},
//	
//	scale : function() {
//		var self = this;
//		if(self.getLastSlide() != null) self.getContainer().removeChild(self.getLastSlide().getDomInstance());
//		var tempSlide = null;
//		var i=0;
//		function scale(){
//			if(i++ < 20){
//				window.setTimeout(scale, 50);
//				self._resizeContainer(self.getContainer(), i/20);
//				if(tempSlide!=null) self.getContainer().removeChild(tempSlide.getDomInstance());
//				tempSlide = self.getSlide().clone();
//				tempSlide.zoom(i/20);
//				self.getContainer().appendChild(tempSlide.getDomInstance());
//				self.setLastSlide(tempSlide);
//			}
//		}
//		window.setTimeout(scale, 50);
//		//self.setLastSlide(tempSlide);
//	},
	
	_resizeContainer : function(container, zoom) {
		$(container).css({"width":1366*zoom, "height":770*zoom});
		$(container).css({"margin-top":($('body').height()-$(container).height())/2});
	}

};