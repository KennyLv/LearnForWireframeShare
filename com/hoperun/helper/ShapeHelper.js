// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Shape Helper tool                                                   │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
/**
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.Hashtable
 * @author Jian.Tao
 */
com.hoperun.helper.ShapeHelper = {
	_cache : new com.hoperun.util.Hashtable(),

	/**
	 * 
	 * @param s
	 *            the shape object
	 */
	applyBaseAttr : function(s) {
		with (s.getDomInstance()) {
			var zm = s.getZoom();
			style.top = s.getTop() * zm;
			style.left = s.getLeft() * zm;
			style.width = s.getWidth() * zm;
			style.height = s.getHeight() * zm;
			style.zIndex = s.getZIndex();
		}
		
		with (s.getShapeInstance()) { 
			setAttribute('fill', s.getColor());
			setAttribute('opacity', s.getOpacity());
			setAttribute('stroke', s.getBorderColor());
			setAttribute('stroke-width', s.getBorderWidth());
			setAttribute('stroke-dasharray', s.getBorderStyle());
		}
	},

	/**
	 * Draw Rectangle Shape.
	 * 
	 * @param s
	 *            the shape object
	 */
	drawRectangle : function(s) {
		with (s.getDomInstance()) {
			style.width = s.getWidth() + s.getBorderWidth();
			style.height = s.getHeight() + s.getBorderWidth();
		}
		with (s.getShapeInstance()) {
			setAttribute('x', s.getBorderWidth() / 2);
			setAttribute('y', s.getBorderWidth() / 2);
			setAttribute('width', s.getWidth());
			setAttribute('height', s.getHeight());
			setAttribute('rx', s.getRadii());
			setAttribute('ry', s.getRadii());
		}
	},

	/**
	 * Draw Ellipse Shape.
	 * 
	 * @param s
	 *            the shape object
	 */
	drawEllipse : function(s) {
		with (s.getDomInstance()) {
			style.width = s.getRx() * 2 + s.getBorderWidth();
			style.height = s.getRy() * 2 + s.getBorderWidth();
		}
		with (s.getShapeInstance()) {
			setAttribute('cx', s.getRx() + s.getBorderWidth() / 2);
			setAttribute('cy', s.getRy() + s.getBorderWidth() / 2);
			setAttribute('rx', s.getRx());
			setAttribute('ry', s.getRy());
		}
	},

	/**
	 * Draw Polygon Shape.
	 * 
	 * @param s
	 *            the shape object
	 */
	drawPolygon : function(s) {
		with (s.getShapeInstance()) {
			var pointArray = new Array();
			var a = 2 * Math.PI / s.getVertex();
			var r = s.getRadii();
			var zoomX = s.getZoomX() ? s.getZoomX() : 1;
			var zoomY = s.getZoomY() ? s.getZoomY() : 1;
			var minX = minY = maxX = maxY = null;

			for ( var i = 0; i < s.getVertex(); i++) {
				var point = {
					x : null,
					y : null
				};
				point.x = r * Math.sin(a * i) * zoomX;
				point.y = r * Math.cos(a * i) * zoomY;
				pointArray.push(point);

				minX = minX == null ? point.x : Math.min(minX, point.x);
				minY = minY == null ? point.y : Math.min(minY, point.y);
				maxX = maxX == null ? point.x : Math.max(maxX, point.x);
				maxY = maxY == null ? point.y : Math.max(maxY, point.y);
			}

			var pointStr = '';

			for ( var i = 0; i < pointArray.length; i++) {
				pointStr += (pointArray[i].x - minX) + ', '
						+ (pointArray[i].y - minY) + ' ';
			}

			setAttribute('points', pointStr.trim());
		}
		with (s.getDomInstance()) {
			style.width = maxX * 2 + s.getBorderWidth() / 2 + 20;
			style.height = maxY * 2 + s.getBorderWidth() / 2 + 20;
		}
	},

	/**
	 * Draw Star Shape.
	 * 
	 * @param s
	 *            the shape object
	 */
	drawStar : function(s) {

		with (s.getDomInstance()) {
			style.width = s.getWidth() + s.getBorderWidth() + 200;
			style.height = s.getHeight() + s.getBorderWidth() + 200;
		}
		
		with (s.getShapeInstance()) {
			var pointArray = new Array();
			var a = 2 * Math.PI / (s.getVertex() * 2);
			var r1 = s.getR1();
			var r2 = s.getR2() > r1 ? r1 : s.getR2();
			var zoomX = s.getZoomX() ? s.getZoomX() : 1;
			var zoomY = s.getZoomY() ? s.getZoomY() : 1;
			var minX = minY = maxX = maxY = null;
			
			for (var i = 0; i < s.getVertex() * 2; i++) {
				var point = {x:null, y:null};
				var r = i % 2 == 0 ? r1 : r2;
				point.x = r * Math.sin(a * i) * zoomX;
				point.y = r * Math.cos(a * i) * zoomY;
				pointArray.push(point);
				
				minX = minX == null ? point.x : Math.min(minX, point.x);
				minY = minY == null ? point.y : Math.min(minY, point.y);
				maxX = maxX == null ? point.x : Math.max(maxX, point.x);
				maxY = maxY == null ? point.y : Math.max(maxY, point.y);
			}
			
			var pointStr = '';
			
			for (var i = 0; i < pointArray.length; i++) {
				pointStr += (pointArray[i].x - minX) + ', ' + (pointArray[i].y - minY) + ' ';
			}
		
			setAttribute('points', pointStr.trim());
		}

	},

	/**
	 * Draw Line Shape.
	 * 
	 * @param s
	 *            the shape object
	 */
	drawLine : function(s) {
		
		with (s.getDomInstance()) {
			style.width = s.getWidth() + s.getBorderWidth();
			style.height = s.getHeight() + s.getBorderWidth();
		}
		
		drawLineCommon = function(){
			with (s.getShapeInstance()) { 
				var xx1 = s.getX1();
				var xx2 = s.getX2();
				var yy1 = s.getY1();
				var yy2 = s.getY2();	
		
				setAttribute('x1',xx1);
				setAttribute('x2',xx2);
				setAttribute('y1',yy1);
				setAttribute('y2',yy2);
			}
		};
		
		drawArrow = function(){ 
			with(s.getShapeMarkerInstance()){
				setAttribute('id','Arrow'+s.getId());
				setAttribute('viewBox','0 0 '+s.getHeight()+' '+s.getHeight());
				setAttribute('refX','0');
				setAttribute('refY',s.getHeight()/2);
				setAttribute('markerUnits','strokeWidth');
				setAttribute('markerWidth',s.getHeight()/4);
				setAttribute('markerHeight',s.getHeight()/2);
				setAttribute('orient','auto');
			}
			with(s.getShapeMarkerPathInstance()){
				setAttribute('d','M 0 0 L '+s.getHeight()+' '+s.getHeight()/2+' L 0 '+s.getHeight()+' z');
				setAttribute('fill',s.getBorderColor());
				setAttribute('stroke',s.getBorderColor());
			}
		};
		
		
		with (s.getShapeInstance()) {  //Shape_ArrowLine
			if(s.getType() == 'Shape_Line'){
				drawLineCommon();
			}else if(s.getType() == 'Shape_ArrowLine'){
				drawLineCommon();
				drawArrow();
				setAttribute('marker-end',"url(#Arrow"+s.getId()+")");
			}
		}
	}

};