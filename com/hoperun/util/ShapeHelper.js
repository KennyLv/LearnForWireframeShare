/**
 * ShapeHelper class
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.BaseTool
 * @author XinXing.Jiang, Jian.T
 */
com.hoperun.util.ShapeHelper = {
	createDomInstance : function(options, type) {
		options = $.extend(true, { id:null }, options);
		var domInstance = document.createElement("div");
		domInstance.style.textAlign = "left";
		with(domInstance){
			id = options.id;
			style.position = "absolute";
			appendChild(document.createElementNS("http://www.w3.org/2000/svg","svg"));
		}
		with(domInstance.getElementsByTagName("svg")[0]){
			style.position = "absolute";
			setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
			setAttribute("xmlns", "http://www.w3.org/2000/svg");
			setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
			setAttribute("xmlns:inkscape", "http://www.inkscape.org/namespaces/inkscape");
			setAttribute("version", "1.0");
			setAttribute("top", 0);
			setAttribute("left", 0);
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", type));
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "text"));
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "marker"));
			/** prepare for shadow
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "filter"));
			*/
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName(type)[0]){
			style.position = "absolute";
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			style.position = "absolute";
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("marker")[0]){
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
		}
		/** prepare for shadow
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("filter")[0]){
			setAttribute("id", "filter-shadow-"  + domInstance.id);
			setAttribute("height", "130%");
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "feOffset"));
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur"));
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "feMerge"));
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("filter")[0].getElementsByTagName("feOffset")[0]){
			setAttribute("result", "offsetblur");
			setAttribute("dx", "5");
			setAttribute("dy", "5");
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("filter")[0].getElementsByTagName("feGaussianBlur")[0]){
			setAttribute("in", "SourceAlpha");
			setAttribute("stdDeviation", "4");
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("filter")[0].getElementsByTagName("feMerge")[0]){
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode"));
			appendChild(document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode"));
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("filter")[0].getElementsByTagName("feMerge")[0].getElementsByTagName("feMergeNode")[1]){
			setAttribute("in", "SourceGraphic");
		}
		*/
		return domInstance;
	},	
		
	createPolygon : function(options) {
		var domInstance = this.createDomInstance(options, 'polygon');
		return this.updatePolygon(domInstance, options);
	},

	createAbnormityTriangle : function(options){
		var domInstance = this.createDomInstance(options, 'polygon');
		return this.updateAbnormityTriangle(domInstance, options);
	},
	
	createArrow : function(options){
		var domInstance = this.createDomInstance(options, 'polygon');
		return this.updateArrow(domInstance, options);
	},
	
	createTextBox : function(options){
		var domInstance = this.createDomInstance(options, 'rect');
		return this.updateTextBox(domInstance, options);
	}, 
	
	createRectangle : function(options){
		var domInstance = this.createDomInstance(options, 'rect');
		return this.updateRectangle(domInstance, options);
	}, 
	
	createEllipse : function(options){
		var domInstance = this.createDomInstance(options, 'ellipse');
		return this.updateEllipse(domInstance, options);
	},
	
	createLine : function(options){
		var domInstance = this.createDomInstance(options, 'line');
		return this.updateLine(domInstance, options);
	}, 
	
	createArrowLine : function(options){
		var domInstance = this.createDomInstance(options, 'line');
		return this.updateArrowLine(domInstance, options);
	}, 
	
	updatePolygon : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			strokeWidth : 0,
			strokeColor : '#68a22f',
			opacity : 1,
			strokeDasharray : '0, 0',
			vertexNum : 4,
			zoomX : 1,
			zoomY : 1,
			zoomAngle : 0,
			radii : 50,
			radii2 : null,
			color : '#68a22f',
			fontSize : 12,
			fontFamily : 'Verdana',
			fontStyle : 'normal',
			fontWeight : 'normal',
			fontColor : 'black',
			textDecoration : 'normal',
			fontContent : '',
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("polygon")[0]){
			setAttribute('fill', options.color);
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			//setAttribute('filter', "url(#filter-shadow-" + domInstance.id + ")");
			var pointsString = "";
			var minX=null, minY=null, maxX=null, maxY=null;
			var pointsArray = new Array();
			
			var innerAngle = Math.PI / options.vertexNum;
			var outerAngle;
			var _zoomAngle = 180 * Math.PI / 180;
			
			if (options.radii2 == null) {//single				
				innerAngle = 2 * Math.PI / options.vertexNum;				
				for (var i = 0; i < options.vertexNum; i++) {
					var point = {x:null, y:null};
					var thisAngle = i * innerAngle + _zoomAngle;
					
					outerAngle=(Math.PI-innerAngle)/2;
					//var newR=options.radii+(options.strokeWidth/2/Math.cos(angle/2));
					
					point.x=options.radii*(Math.sin(thisAngle))*options.zoomX+(options.strokeWidth/2/Math.cos(innerAngle/2))*(Math.sin(thisAngle));
					point.y=options.radii*(Math.cos(thisAngle))*options.zoomY+(options.strokeWidth/2/Math.cos(innerAngle/2))*(Math.cos(thisAngle));

					//point.x = ((options.radii*(1+Math.sin(thisAngle)))*(options.zoomX*(1+(options.strokeWidth/(2*options.radii)))));
					//point.y = ((options.radii*(1-Math.cos(thisAngle)))*(options.zoomY*(1+(options.strokeWidth/(2*options.radii)))));
					pointsArray.push(point);
					minX = minX == null ? point.x : Math.min(minX, point.x);
					minY = minY == null ? point.y : Math.min(minY, point.y);
					maxX = maxX == null ? point.x : Math.max(maxX, point.x);
					maxY = maxY == null ? point.y : Math.max(maxY, point.y);
				}
			} else {
				//stars
				if (options.radii2 > options.radii){ //20 50
					options.radii2 = options.radii;
				}
				outerAngle=Math.atan(options.radii2*Math.sin(innerAngle)/(options.radii- options.radii2*Math.cos(innerAngle)));
				for (var i = 0; i  < options.vertexNum * 2; i++) {
					var point = {x:null, y:null};
					var thisAngle = i * innerAngle + _zoomAngle;					
					if (i%2 == 0) {
						point.x=(options.strokeWidth/2/Math.sin(outerAngle)+options.radii*options.zoomX)*(Math.sin(thisAngle));
						point.y=(options.strokeWidth/2/Math.sin(outerAngle)+options.radii*options.zoomY)*(Math.cos(thisAngle));

						//point.x = (options.radii*(1+Math.sin(thisAngle)))*(options.zoomX*(1+(options.strokeWidth/(2*options.radii))));
						//point.y = (options.radii*(1-Math.cos(thisAngle)))*(options.zoomY*(1+(options.strokeWidth/(2*options.radii))));

					} else {
						point.x=(options.strokeWidth/2/Math.sin(innerAngle)+options.radii2*options.zoomX)*(Math.sin(thisAngle));
						point.y=(options.strokeWidth/2/Math.sin(innerAngle)+options.radii2*options.zoomY)*(Math.cos(thisAngle));

						//point.x = (options.radii+options.radii2*Math.sin(thisAngle))*(options.zoomX*(1+(options.strokeWidth/(2*options.radii))));
						//point.y = (options.radii-options.radii2*Math.cos(thisAngle))*(options.zoomY*(1+(options.strokeWidth/(2*options.radii))));

					}
					pointsArray.push(point);
					minX = minX == null ? point.x : Math.min(minX, point.x);
					minY = minY == null ? point.y : Math.min(minY, point.y);
					
					maxX = maxX == null ? point.x : Math.max(maxX, point.x);
					maxY = maxY == null ? point.y : Math.max(maxY, point.y);
				}
			}
			//恢复坐标系
			//console.info("=:"+angle*180/Math.PI+"angle cos:"+Math.cos(angle)+"angle sin:"+Math.sin(angle));
			var strokeWidthDis=(options.strokeWidth/2/Math.sin(outerAngle));
			var strokeHeightDis=(options.strokeWidth/2/Math.sin(outerAngle));
			for(var i=0; i < pointsArray.length; i++){
				pointsString += (pointsArray[i].x - minX +strokeWidthDis) +"," + (pointsArray[i].y - minY+strokeHeightDis) + " ";
				//pointsString += (pointsArray[i].x - minX + options.strokeWidth*Math.sin(Math.PI / options.vertexNum)) + "," + (pointsArray[i].y - minY + options.strokeWidth*Math.sin(Math.PI / options.vertexNum)) + " ";
				//pointsString += (pointsArray[i].x - minX) + "," + (pointsArray[i].y - minY+options.strokeWidth*Math.sin(Math.PI / options.vertexNum)) + " ";
			}
			//domInstance.style.width = domInstance.getElementsByTagName("svg")[0].style.width = maxX - minX + options.strokeWidth / Math.sin(Math.PI / options.vertexNum);
			//domInstance.style.height = domInstance.getElementsByTagName("svg")[0].style.height = maxY - minY + options.strokeWidth / Math.sin(Math.PI / options.vertexNum);
			domInstance.style.width = domInstance.getElementsByTagName("svg")[0].style.width = maxX - minX  +2*strokeWidthDis;
			domInstance.style.height = domInstance.getElementsByTagName("svg")[0].style.height = maxY - minY +2*strokeHeightDis;
			
			setAttribute('points', pointsString);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			setAttribute("x", (maxX - minX)/2);
			setAttribute("y", (maxY - minY) * 4 / 7);
			setAttribute("text-anchor", "middle");
			setAttribute("font-style", options.fontStyle);
			setAttribute("font-weight", options.fontWeight);
			setAttribute("fill", options.fontColor);
			style.fontSize = options.fontSize;
			style.fontFamily = options.fontFamily;
			style.textDecoration = options.textDecoration;
			if(childNodes && childNodes.length>0) removeChild(childNodes[0]);
			appendChild(document.createTextNode(options.fontContent));
		}
		return domInstance;
	},
	
	updateAbnormityTriangle : function(domInstance, options) {
		options = $.extend(true, {
			top : 0,
			left : 0,
			strokeWidth : 0,
			strokeColor : '#68a22f',
			opacity : 1,
			strokeDasharray : '0, 0',
			angle : 90,
			zoomX : 1,
			zoomY : 1,
			zoomAngle : 0,
			sideLength : 100,
			sideLength2 : 100,
			color : '#68a22f',
			fontSize : 12,
			fontFamily : 'Verdana',
			fontStyle : 'normal',
			fontWeight : 'normal',
			fontColor : 'black',
			textDecoration : 'normal',
			fontContent : '',
			zIndex : 1000
			//origin point
		}, options);
		
		var _width = options.sideLength > options.sideLength2 ? options.sideLength : options.sideLength2;
		
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("polygon")[0]){
			setAttribute('fill', options.color);
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			
			var pointsArray = new Array();
			var pointsString = "";
			
			var _angle = options.angle * Math.PI / 180;
			var _zoomAngle = options.zoomAngle * Math.PI / 180;
			
			var point1 = {x:null, y:null};
			point1.x = _width;
			point1.y = _width;
			pointsArray.push(point1);
			
			var point2 = {x:null, y:null};
			point2.x = (_width + options.sideLength*Math.sin(_zoomAngle))*options.zoomX;
			point2.y = (_width - options.sideLength*Math.cos(_zoomAngle))*options.zoomY;
			pointsArray.push(point2);
			
			var point3 = {x:null, y:null};
			point3.x = (_width + options.sideLength2*Math.sin(_zoomAngle+_angle))*options.zoomX;
			point3.y = (_width - options.sideLength2*Math.cos(_zoomAngle+_angle))*options.zoomY;
			pointsArray.push(point3);
			
			var minX = Math.min(point1.x, point2.x, point3.x);
			var minY = Math.min(point1.y, point2.y, point3.y);
			var maxX = Math.max(point1.x, point2.x, point3.x);
			var maxY = Math.max(point1.y, point2.y, point3.y);
			
			for(var i=0; i < pointsArray.length; i++){
				pointsString += (pointsArray[i].x - minX) + "," + (pointsArray[i].y - minY) + " ";
			}
			domInstance.style.width = domInstance.getElementsByTagName("svg")[0].style.width = maxX - minX;
			domInstance.style.height =  domInstance.getElementsByTagName("svg")[0].style.height =maxY - minY;
			setAttribute('points', pointsString);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			setAttribute("x", (maxX - minX)/2);
			setAttribute("y", (maxY - minY) * 4 / 7);
			setAttribute("text-anchor", "middle");
			setAttribute("font-style", options.fontStyle);
			setAttribute("font-weight", options.fontWeight);
			setAttribute("fill", options.fontColor);
			style.fontSize = options.fontSize;
			style.fontFamily = options.fontFamily;
			style.textDecoration = options.textDecoration;
			if(childNodes && childNodes.length>0) removeChild(childNodes[0]);
			appendChild(document.createTextNode(options.fontContent));
		}
		return domInstance;
	},
	
	updateArrow : function(domInstance, options){
		options = $.extend(true, {
			arrowType : 'single',
			top : 0,
			left : 0,
			width : 100,
			height : 100,
			strokeWidth : 0,
			strokeColor : '#68a22f',
			opacity : 1,
			strokeDasharray : '0, 0',
			zoomAngle : 0,
			percentX : 0.5,
			percentY : 0.5,
			color : '#68a22f',
			fontSize : 12,
			fontFamily : 'Verdana',
			fontStyle : 'normal',
			fontWeight : 'normal',
			fontColor : 'black',
			textDecoration : 'normal',
			fontContent : '',
			zIndex : 1000
		}, options);
		
		var _width = options.height > options.width ? options.height : options.width;
		
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("polygon")[0]){
			setAttribute('fill', options.color);
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			var single = options.arrowType == 'single';
			var _zoomAngle = options.zoomAngle * Math.PI / 180;
			var pointsString = "";
			var pointsArray = new Array();
			var r1 = options.width;
			var a1 = 90*Math.PI/180;
			var a2 = Math.atan(options.width*options.percentX/options.height);
			var r2 = options.height/Math.cos(a2);
			var a3 = Math.atan(options.width*options.percentX/(options.height*options.percentY));
			var r3 = (options.height*options.percentY)/Math.cos(a3);
			var r4 = options.height*options.percentY;
			var a4 = 0;
			
			pointsArray.push({ //1
				x : r2*Math.sin(a2+_zoomAngle) + _width, 
				y : _width- r2*Math.cos(a2+_zoomAngle)
			});
			pointsArray.push({ //2
				x : r1*Math.sin(a1+_zoomAngle) + _width, 
				y : _width-r1*Math.cos(a1+_zoomAngle)
			});
			pointsArray.push({ //3
				x : r2*Math.sin(Math.PI-a2+_zoomAngle) + _width, 
				y : _width-r2*Math.cos(Math.PI-a2+_zoomAngle)
			});
			pointsArray.push({ //4
				x : r3*Math.sin(Math.PI-a3+_zoomAngle) + _width, 
				y : _width-r3*Math.cos(Math.PI-a3+_zoomAngle)
			});
			
			if(single){
				pointsArray.push({ //5
					x : r4*Math.sin(Math.PI-a4+_zoomAngle) + _width, 
					y : _width - r4*Math.cos(Math.PI-a4+_zoomAngle)
				});
				pointsArray.push({ //6
					x : r4*Math.sin(a4+_zoomAngle) + _width, 
					y : _width - r4*Math.cos(a4+_zoomAngle)
				});
			} else {
				pointsArray.push({ //5
					x : r3*Math.sin(a3+Math.PI+_zoomAngle) + _width, 
					y : _width - r3*Math.cos(a3+Math.PI+_zoomAngle)
				});
				pointsArray.push({ //6
					x : r2*Math.sin(a2+Math.PI+_zoomAngle) + _width, 
					y : _width- r2*Math.cos(a2+Math.PI+_zoomAngle)
				});
				pointsArray.push({ //7
					x : r1*Math.sin(a1+Math.PI+_zoomAngle) + _width, 
					y : _width-r1*Math.cos(a1+Math.PI+_zoomAngle)
				});
				pointsArray.push({ //8
					x : r2*Math.sin(-a2+_zoomAngle) + _width, 
					y : _width-r2*Math.cos(-a2+_zoomAngle)
				});
				pointsArray.push({ //9
					x : r3*Math.sin(-a3+_zoomAngle) + _width, 
					y : _width-r3*Math.cos(-a3+_zoomAngle)
				});
			}
			
			pointsArray.push({ //7 | 10
				x : r3*Math.sin(a3+_zoomAngle) + _width, 
				y : _width - r3*Math.cos(a3+_zoomAngle)
			});
			var minX, minY, maxX, maxY;
			for (var i=0; i < pointsArray.length; i++) {
				minX = minX == null ? pointsArray[i].x : Math.min(minX, pointsArray[i].x);
				minY = minY == null ? pointsArray[i].y : Math.min(minY, pointsArray[i].y);
				maxX = maxX == null ? pointsArray[i].x : Math.max(maxX, pointsArray[i].x);
				maxY = maxY == null ? pointsArray[i].y : Math.max(maxY, pointsArray[i].y);
			}
			
			for (var i=0; i < pointsArray.length; i++){
				pointsString += (pointsArray[i].x - minX) + "," + (pointsArray[i].y - minY) + " ";
			}
			
			domInstance.style.width = maxX - minX;
			domInstance.style.height = maxY - minY;
			setAttribute('points', pointsString);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			setAttribute("x", (maxX - minX) / 2);
			setAttribute("y", (maxY - minY) * 4 / 7);
			setAttribute("text-anchor", "middle");
			setAttribute("font-style", options.fontStyle);
			setAttribute("font-weight", options.fontWeight);
			setAttribute("fill", options.fontColor);
			style.fontSize = options.fontSize;
			style.fontFamily = options.fontFamily;
			style.textDecoration = options.textDecoration;
			if(childNodes && childNodes.length>0) removeChild(childNodes[0]);
			appendChild(document.createTextNode(options.fontContent));
		}
		return domInstance;
	},
	
	updateTextBox : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			width : 100,
			height : 100,
			strokeWidth : 1,
			opacity : 1,
			strokeDasharray : '0, 0',
			radii : 5,
			color : '#FFF',
			fontSize : 12,
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.width = options.width;
			style.height = options.height;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0]) {
			style.width = options.width;
			style.height = options.height;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("rect")[0]){
			if(options.color != null) setAttribute('fill', options.color); else removeAttribute('fill');
			if(options.strokeWidth != null) setAttribute('stroke-width', options.strokeWidth); else  removeAttribute('stroke-width');
			if(options.strokeColor != null) setAttribute('stroke', options.strokeColor); else  removeAttribute('stroke');
			
			if(options.strokeDasharray != null) setAttribute('stroke-dasharray', options.strokeDasharray); else  removeAttribute('stroke-dasharray');
			if(options.radii != null) setAttribute('rx', options.radii); else  removeAttribute('rx');
			if(options.radii != null) setAttribute('ry', options.radii); else  removeAttribute('ry');
			
			setAttribute('x', options.strokeWidth/2.0);
			setAttribute('y', options.strokeWidth/2.0);
			setAttribute('width', options.width - options.strokeWidth);
			setAttribute('height', options.height - options.strokeWidth);
		}
		//Whether to clear text
		if(options.noRefreshText){
			with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
				while(childNodes.length>0){
					removeChild(childNodes[0]);
				}
			}
		}
		return domInstance;
	},
	
	updateRectangle : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			width : 100,
			height : 100,
			strokeWidth : 0,
			strokeColor : '#68a22f',
			strokeDasharray : '0, 0',
			radii : 20,
			color : '#68a22f',
			opacity : 1,
			fontSize : 12,
			fontFamily : "Verdana",
			fontStyle : 'normal',
			fontWeight : 'normal',
			fontColor : 'black',
			textDecoration : 'normal',
			fontContent : '',
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.width = options.width + options.strokeWidth;
			style.height = options.height + options.strokeWidth;
			style.opacity = options.opacity;
			style.zIndex = options.zIndex;
		}
		with(domInstance.getElementsByTagName("svg")[0]){
			style.width = options.width + options.strokeWidth;
			style.height = options.height + options.strokeWidth;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("rect")[0]){
			setAttribute('fill', options.color);
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			setAttribute('x', options.strokeWidth/2);
			setAttribute('y', options.strokeWidth/2);
			setAttribute('width', options.width);
			setAttribute('height', options.height);
			setAttribute('rx', options.radii);
			setAttribute('ry', options.radii);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			setAttribute("x", (options.width + options.strokeWidth) / 2);
			setAttribute("y", (options.height + options.strokeWidth) * 4 / 7);
			setAttribute("text-anchor", "middle");
			setAttribute("font-style", options.fontStyle);
			setAttribute("font-weight", options.fontWeight);
			setAttribute("fill", options.fontColor);
			style.fontSize = options.fontSize;
			style.fontFamily = options.fontFamily;
			style.textDecoration = options.textDecoration;
			if(childNodes && childNodes.length>0) removeChild(childNodes[0]);
			appendChild(document.createTextNode(options.fontContent));
		}
		return domInstance;
	},
	
	updateEllipse : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			strokeWidth : 0,
			strokeColor : '#68a22f',
			opacity : 1,
			strokeDasharray : '0, 0',
			rx : 50,
			ry : 50,
			color : '#68a22f',
			fontSize : 12,
			fontFamily : "Verdana",
			fontStyle : 'normal',
			fontWeight : 'normal',
			fontColor : 'black',
			textDecoration : 'normal',
			fontContent : '',
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.width = options.rx * 2 + options.strokeWidth;
			style.height = options.ry * 2 + options.strokeWidth;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0]) {
			style.width = options.rx * 2 + options.strokeWidth;
			style.height = options.ry * 2 + options.strokeWidth;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("ellipse")[0]){
			setAttribute('fill', options.color);
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			setAttribute('cx', options.rx+options.strokeWidth/2);
			setAttribute('cy', options.ry+options.strokeWidth/2);
			setAttribute('rx', options.rx);
			setAttribute('ry', options.ry);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("text")[0]){
			setAttribute("x", options.rx+options.strokeWidth/2);
			setAttribute("y", (options.ry+options.strokeWidth/2) * 8 / 7);
			setAttribute("text-anchor", "middle");
			setAttribute("font-style", options.fontStyle);
			setAttribute("font-weight", options.fontWeight);
			setAttribute("fill", options.fontColor);
			style.fontSize = options.fontSize;
			style.fontFamily = options.fontFamily;
			style.textDecoration = options.textDecoration;
			if(childNodes && childNodes.length>0) removeChild(childNodes[0]);
			appendChild(document.createTextNode(options.fontContent));
		}
		return domInstance;
	},
	
	updateLine : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			strokeWidth : 1,
			strokeColor : '#68a22f',
			strokeDasharray : '0, 0',
			opacity : 1,
			x1 : 0,
			y2 : 100,
			x2 : 100,
			y2 : 0,
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.width = Math.max(options.x1, options.x2) - Math.min(options.x1, options.x2) + options.strokeWidth;
			style.height = Math.max(options.y1, options.y2) - Math.min(options.y1, options.y2) + options.strokeWidth;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("line")[0]){
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);
			setAttribute('x1', options.x1 - Math.min(options.x1, options.x2) + options.strokeWidth/2);
			setAttribute('x2', options.x2 - Math.min(options.x1, options.x2) + options.strokeWidth/2);
			setAttribute('y1', options.y1 - Math.min(options.y1, options.y2) + options.strokeWidth/2);
			setAttribute('y2', options.y2 - Math.min(options.y1, options.y2) + options.strokeWidth/2);
		}
		return domInstance;
	},
	
	updateArrowLine : function(domInstance, options) {
		options = $.extend(true, {
			top : null,
			left : null,
			strokeWidth : 1,
			strokeColor : '#68a22f',
			strokeDasharray : '0, 0',
			opacity : 1,
			x1 : 0,
			y2 : 100,
			x2 : 100,
			y2 : 0,
			zIndex : 1000
		}, options);
		with(domInstance) {
			style.top = options.top;
			style.left = options.left;
			style.width = Math.max(options.x1, options.x2) - Math.min(options.x1, options.x2) + options.strokeWidth;
			style.height = Math.max(options.y1, options.y2) - Math.min(options.y1, options.y2) + options.strokeWidth;
			style.zIndex = options.zIndex;
			style.opacity = options.opacity;
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("marker")[0]){
			setAttribute('id', "arrow-marker-" + domInstance.id);
			setAttribute('viewBox', "0 0 10 10");
			setAttribute('refX', 0);
			setAttribute('refY', 5);
			setAttribute('markerUnits', "strokeWidth");
			setAttribute('markerWidth', 4);
			setAttribute('markerHeight', 3);
			setAttribute('orient',"auto");
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("marker")[0].getElementsByTagName("path")[0]){
			setAttribute('d', "M 0 0 L 10 5 L 0 10 z");
			setAttribute('fill', options.strokeColor);
			setAttribute('stroke', options.strokeColor);
		}
		with(domInstance.getElementsByTagName("svg")[0].getElementsByTagName("line")[0]){
			setAttribute('stroke', options.strokeColor);
			setAttribute('stroke-width', options.strokeWidth);
			setAttribute('stroke-dasharray', options.strokeDasharray);;
			setAttribute('x1', options.x1 - Math.min(options.x1, options.x2) + options.strokeWidth/2);
			setAttribute('x2', options.x2 - Math.min(options.x1, options.x2) + options.strokeWidth/2);
			setAttribute('y1', options.y1 - Math.min(options.y1, options.y2) + options.strokeWidth/2);
			setAttribute('y2', options.y2 - Math.min(options.y1, options.y2) + options.strokeWidth/2);
			setAttribute('marker-end', "url(#arrow-marker-" + domInstance.id + ")");
		}
		return domInstance;
	}
	
};