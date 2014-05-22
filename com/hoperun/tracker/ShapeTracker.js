/**
 * Shape Tracker class
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool
 * @author Jian.Tao
 */
com.hoperun.tracker.ShapeTracker = function() {
	this.initDefaultDomInstance();
};

com.hoperun.tracker.ShapeTracker.prototype = {

	_domInstance : null,

	_trackerInstance : null,

	_top : null,

	_left : null,

	_width : null,

	_height : null,

	_rotate : null,

	_stroke : null,

	_points : null,

	_exPoints : null,

	_center : null,

	_zoom : null,

	_zIndex : null,
	
	_activeItem : null,

	initDefaultDomInstance : function() {

		var svgns = 'http://www.w3.org/2000/svg';

		var domInstance = document.createElementNS(svgns, 'svg');

		with (domInstance) {
			style.cursor = 'pointer';
			setAttribute('fill', 'none');
		}

		var trackerInstance = document.createElementNS(svgns, 'g');

		var stroke = document.createElementNS(svgns, 'path');
		with (stroke) {
			setAttribute('stroke', 'red');
			setAttribute('stroke-width', '1');
			setAttribute('stroke-opacity', '1');
		}
		trackerInstance.appendChild(stroke);

		var points = [];
		var rectCursor = [ 'nw-resize', 'n-resize', 'ne-resize', 'w-resize',
				'e-resize', 'sw-resize', 's-resize', 'se-resize' ];
		for (var i = 0; i < rectCursor.length; i++) {
			var point = document.createElementNS(svgns, 'path');
			with (point) {
				style.cursor = rectCursor[i];
				setAttribute('fill', '#ffffff');
				setAttribute('fill-opacity', '1');
				setAttribute('stroke', '#000000');
				setAttribute('stroke-opacity', '1');
			}
			points.push(point);
			trackerInstance.appendChild(point);
		}

		domInstance.appendChild(trackerInstance);
		this.setPoints(points);
		this.setStroke(stroke);
		this.setTrackerInstance(trackerInstance);
		this.setDomInstance(domInstance);
	},

	_registerEvent : function() {

		com.hoperun.util.BaseTool.registerDraggable(this);

		var item = this.getActiveItem();
		var self = this;
		for ( var i = 0; i < this.getPoints().length; i++) {
			this.getPoints()[i].onmousedown = function(evt) {
				$(item.getDomInstance()).draggable({
					disabled : true
				});
				evt = evt || window.event;
				var obj = evt.srcElement || evt.target;
				var direction = obj.style.cursor.substring(0, obj.style.cursor.indexOf('-resize'));
				var x0 = evt.pageX, y0 = evt.pageY, w = item.getWidth(), h = item.getHeight(), t = item.getTop(), l = item.getLeft();
				var diffH, diffW;
				item.getDomInstance().parentNode.onmousemove = function(evt) {
					evt = evt || window.event;
					var x = evt.pageX, y = evt.pageY;
					diffH = y0 - y, diffW = x0 - x;

					switch (direction) {
					case 'nw':
						item.setTop(t - diffH);
						item.setHeight(h + diffH);
						item.setLeft(l - diffW);
						item.setWidth(w + diffW);
						break;
					case 'n':
						item.setTop(t - diffH);
						item.setHeight(h + diffH);
						break;
					case 'ne':
						item.setTop(t - diffH);
						item.setHeight(h + diffH);
						item.setWidth(w - diffW);
						break;
					case 'w':
						item.setLeft(l - diffW);
						item.setWidth(w + diffW);
						break;
					case 'e':
						item.setWidth(w - diffW);
						break;
					case 'sw':
						item.setHeight(h - diffH);
						item.setLeft(l - diffW);
						item.setWidth(w + diffW);
						break;
					case 's':
						item.setHeight(h - diffH);
						break;
					case 'se':
						item.setHeight(h - diffH);
						item.setWidth(w - diffW);
						break;
					}

					item.render();
					self._render();
				};

				document.body.onmouseup = function(evt) {
					com.hoperun.util.BaseTool.registerDraggable(item);

					item.getDomInstance().parentNode.onmousemove = null;
					document.body.onmouseup = null;
				};
				return false;
			};
		}
	},

	_createExPoint : function(type) {
		var exPoint = document.createElementNS(svgns, 'path');
		switch (type) {
		case 'rotate':
			// TODO
			// register event
			break;
		case 'a':
			// TODO
			// register event
			break;
		case 'b':
			// TODO
			// register event
			break;
		}
		this.getDomInstance().appendChild(exPoint);
	},

	_render : function() {

		with (this.getDomInstance()) {
			style.zIndex = this.getActiveItem().getZIndex() + 1;
			style.position = 'absolute';
			style.top = this.getActiveItem().getTop();
			style.left = this.getActiveItem().getLeft();
			style.width = this.getActiveItem().getWidth() + 20;
			style.height = this.getActiveItem().getHeight() + 20;
		}

		with (this.getStroke()) {
			setAttribute('d', this.getActiveItem().getTrackerPath().path);
		}

		for ( var i = 0; i < this.getPoints().length; i++) {
			with (this.getPoints()[i]) {
				var x = this.getActiveItem().getTrackerPath().btns[i].x;
				var y = this.getActiveItem().getTrackerPath().btns[i].y;
				var pointPath = "M" + p(x, y);
				pointPath += "L" + p(x + 6, y);
				pointPath += "L" + p(x + 6, y + 6);
				pointPath += "L" + p(x, y + 6);
				pointPath += "Z";

				setAttribute('d', pointPath);

				function p(x, y) {
					return x + ' ' + y + ' ';
				}
			}
		}
	},

	zoom : function(multiple) {
		this.setZoom(multiple);
		this.getDominstace.style.top = this.getTop() * multiple;
		this.getDominstace.style.left = this.getLeft() * multiple;
		this.getDominstace.style.width = this.getWidth() * multiple;
		this.getDominstace.style.height = this.getHeight() * multiple;
	},

	/**
	 * @param {array}
	 *            types, add extra points to tracker
	 */
	addExPoints : function(types) {
		for (var i = 0; i < types.length; i++) {
			this._createExPoint();
		}
	},

	setTop : function(top) {
		this._top = top;
	},

	getTop : function() {
		return this._top;
	},

	setLeft : function(left) {
		this._left = left;
	},

	getLeft : function() {
		return this._left;
	},

	setWidth : function(width) {
		this._width = width;
	},

	getWidth : function() {
		return this._width;
	},

	setHeight : function(height) {
		this._height = height;
	},

	getHeight : function() {
		return this._height;
	},
	
	setRotate : function(rotate) {
		this._rotate = rotate;
	},
	
	getRotate : function() {
		return this._rotate;
	},
	
	setStroke : function(stroke) {
		this._stroke = stroke;
	},

	getStroke : function() {
		return this._stroke;
	},

	setPoints : function(points) {
		this._points = points;
	},

	getPoints : function() {
		return this._points;
	},
	
	setExPoints : function(exPoints) {
		this._exPoints = exPoints;
	},

	getExPoints : function() {
		return this._exPoints;
	},
	
	setCenter : function(center) {
		this._center = center;
	},

	getCenter: function() {
		return this._center;
	},
	
	setZoom : function(zoom) {
		this._zoom = zoom;
	},

	getZoom : function() {
		return this._zoom;
	},
	
	setZIndex : function(zIndex) {
		this._zIndex = zIndex;
	},

	getZIndex : function() {
		return this._zIndex;
	},
	
	setActiveItem : function(item) {
		this._activeItem = item;
		this.getActiveItem().getDomInstance().parentNode.appendChild(this.getDomInstance());
		//this._render();
		this._registerEvent();
	},

	getActiveItem : function() {
		return this._activeItem;
	},

	setTrackerInstance : function(trackerInstance) {
		this._trackerInstance = trackerInstance;
	},

	getTrackerInstance : function() {
		return this._trackerInstance;
	},

	setDomInstance : function(domInstance) {
		this._domInstance = domInstance;
	},

	getDomInstance : function() {
		return this._domInstance;
	},
	
	show : function() {
		this.getDomInstance().style.display = '';
	},
	
	hide : function() {
		this.getDomInstance().style.display = 'none';
	}
};