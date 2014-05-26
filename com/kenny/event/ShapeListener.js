/**
 * Shape Listener class
 * 
 * @package com.kenny.event
 * @import com.kenny.util.BaseTool, com.kenny.util.Observer, com.kenny.tracker.shapeTracker
 * @author Jian.Tao
 */
if (!com.kenny.event.ShapeInsertListener) {

	com.kenny.event.ShapeInsertListener = function() {
		this.update = function(message) {
			var item = message.sender;
			var container = getActiveContainer();
			var type = item.objectType || item.getType();
			var shape = eval('new com.kenny.node.shape.' + type + '();');
			if (container == null || shape == null)
				return;

			for ( var key in item) {
				if (key != 'objectType') {
					var value = typeof (item[key]) == 'string' ? '("' + item[key] + '")' : '(' + item[key] + ')';
					try {
						eval('shape.set' + key.substring(0, 1).toUpperCase() + key.substring(1) + value);
					} catch(e) {
						alert("The shape doesn't has '" + key + "' this property!");
					}
				}
			}
			if (container.getCursorPosition && container.getCursorPosition()) {
				shape.setTop(container.getCursorPosition().y);
				shape.setLeft(container.getCursorPosition().x);
			}
			shape.render();
			jsk.execute(
				function() {
					shape.appendTo(container);
					com.kenny.util.Observer.send(com.kenny.util.Observer.MessageType.SHAPE_LAYOUT, shape, {});
					com.kenny.util.Observer.send(com.kenny.util.Observer.MessageType.SHAPE_FOCUS, shape, {});
					com.kenny.util.Observer.send(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, shape, {});
					return { "container" : container, "shape" : shape };
				},
				function(data) {
					var container = data.container;
					container.getType() == "Slide" ? setCurrSlide(container) : container.getType() == "Sheet" ? container.getType() == "Sheet" : null;
					data.shape.removeFrom(container);
					com.kenny.util.Observer.send(com.kenny.util.Observer.MessageType.CONTEXT_BLUR, container, {});
				}
			);
		};
	};

	com.kenny.event.ShapeFocusListener = function() {
		var tracker = null;
		var shapeTracker = null;
		this.update = function(message) {
			switch (message.id) {
			case com.kenny.util.Observer.MessageType.SHAPE_FOCUS:
				if (!tracker) {
					tracker = new com.kenny.tracker.ShapeTracker();
				}
				tracker.setActiveItem(message.sender);
				com.kenny.util.Observer.send(com.kenny.util.Observer.MessageType.CONTEXT_FOCUS, message.sender, {});
				break;
			case com.kenny.util.Observer.MessageType.SHAPE_TRACKER_HIDE:
				var item = message.sender;
				if (shapeTracker && item == shapeTracker.getActiveItem()) {
					shapeTracker.hideTrackerOnly();
				}
				break;
			case com.kenny.util.Observer.MessageType.SHAPE_TRACKER_FIX:
				var item = message.sender;
				if (shapeTracker && item == shapeTracker.getActiveItem()) {
					message.data.fix ? shapeTracker.trackerFix(true) : shapeTracker.trackerFix(false);
				}
				break;
			}
		};
	};
	
	com.kenny.event.ShapeBlurListener = function() {
		this.update = function(message) {
			//message.sender.trackerHide();
		};
	};

	com.kenny.event.ShapeResizeListener = function() {
		this.update = function(message) {
			var shapeItem = message.sender;
			var moveTop = message.data.moveTop;
			var moveLeft = message.data.moveLeft;
			var zoomX = message.data.zoomX;
			var zoomY = message.data.zoomY;
			var x1 = message.data.x1;
			var y1 = message.data.y1;
			var x2 = message.data.x2;
			var y2 = message.data.y2;
			jsk
					.execute(
							function() {
								if (shapeItem.getType() == 'Square'
										|| shapeItem.getType() == 'Rectangle'
										|| shapeItem.getType() == 'TextBox'
										|| shapeItem.getType() == 'SingleArrow'
										|| shapeItem.getType() == 'DoubleArrow') {
									shapeItem.setTop(shapeItem.getTop()
											+ moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											+ moveLeft);
									shapeItem.setWidth(shapeItem.getWidth()
											* zoomX);
									shapeItem.setHeight(shapeItem.getHeight()
											* zoomY);
								} else if (shapeItem.getType() == 'Ellipse') {
									shapeItem.setRx(shapeItem.getRx() * zoomX);
									shapeItem.setRy(shapeItem.getRy() * zoomY);
									shapeItem.setTop(shapeItem.getTop()
											+ moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											+ moveLeft);
								} else if (shapeItem.getType() == 'Line'
										|| shapeItem.getType() == 'ArrowLine') {
									if (message.data.x1 != null
											&& message.data.y1 != null) {
										shapeItem.setX1(shapeItem.getX1() + x1);
										shapeItem.setY1(shapeItem.getY1() + y1);
									}
									if (message.data.x2 != null
											&& message.data.y2 != null) {
										shapeItem.setX2(shapeItem.getX2() + x2);
										shapeItem.setY2(shapeItem.getY2() + y2);
									}
									var x = shapeItem._x1 > shapeItem._x2 ? shapeItem._x2
											: shapeItem._x1;
									var y = shapeItem._y1 > shapeItem._y2 ? shapeItem._y2
											: shapeItem._y1;
									shapeItem._x1 -= x, shapeItem._x2 -= x,
											shapeItem._y1 -= y,
											shapeItem._y2 -= y;
									shapeItem.setTop(shapeItem.getTop() + y);
									shapeItem.setLeft(shapeItem.getLeft() + x);
								} else if (shapeItem.getType() == 'AbnormityTriangle') {
									shapeItem.setTop(shapeItem.getTop()
											+ moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											+ moveLeft);
									shapeItem.setSideLength(shapeItem
											.getSideLength()
											* zoomY);
									shapeItem.setSideLength2(shapeItem
											.getSideLength2()
											* zoomX);
								} else {
									shapeItem.setTop(shapeItem.getTop()
											+ moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											+ moveLeft);
									shapeItem.setZoomX(shapeItem.getZoomX()
											* zoomX);
									shapeItem.setZoomY(shapeItem.getZoomY()
											* zoomY);
								}
								shapeItem.render();
								//tracker.setActiveItem(shapeItem);
								var message = new com.kenny.util.Observer.Message();
								message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
								message.sender = shapeItem;
								message.data = {};
								com.kenny.util.Observer.sendMessage(message);
								return {
									"shapeItem" : shapeItem.getId()
								};
							},
							function(data) {
								// TODO
								if (shapeItem.getType() == 'Square'
										|| shapeItem.getType() == 'Rectangle'
										|| shapeItem.getType() == 'TextBox'
										|| shapeItem.getType() == 'SingleArrow'
										|| shapeItem.getType() == 'DoubleArrow') {
									shapeItem.setTop(shapeItem.getTop()
											- moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											- moveLeft);
									shapeItem.setWidth(shapeItem.getWidth()
											/ zoomX);
									shapeItem.setHeight(shapeItem.getHeight()
											/ zoomY);
								} else if (shapeItem.getType() == 'Ellipse') {
									shapeItem.setRx(shapeItem.getRx() / zoomX);
									shapeItem.setRy(shapeItem.getRy() / zoomY);
									shapeItem.setTop(shapeItem.getTop()
											- moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											- moveLeft);
								} else if (shapeItem.getType() == 'Line'
										|| shapeItem.getType() == 'ArrowLine') {
									if (message.data.x1 != null
											&& message.data.y1 != null) {
										shapeItem.setX1(shapeItem.getX1() - x1);
										shapeItem.setY1(shapeItem.getY1() - y1);
									}
									if (message.data.x2 != null
											&& message.data.y2 != null) {
										shapeItem.setX2(shapeItem.getX2() - x2);
										shapeItem.setY2(shapeItem.getY2() - y2);
									}
									var x = shapeItem._x1 > shapeItem._x2 ? shapeItem._x2
											: shapeItem._x1;
									var y = shapeItem._y1 > shapeItem._y2 ? shapeItem._y2
											: shapeItem._y1;
									shapeItem._x1 += x, shapeItem._x2 += x,
											shapeItem._y1 += y,
											shapeItem._y2 += y;
									shapeItem.setTop(shapeItem.getTop() - y);
									shapeItem.setLeft(shapeItem.getLeft() - x);
								} else if (shapeItem.getType() == 'AbnormityTriangle') {
									shapeItem.setTop(shapeItem.getTop()
											- moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											- moveLeft);
									shapeItem.setSideLength(shapeItem
											.getSideLength()
											/ zoomY);
									shapeItem.setSideLength2(shapeItem
											.getSideLength2()
											/ zoomX);
								} else {
									shapeItem.setTop(shapeItem.getTop()
											- moveTop);
									shapeItem.setLeft(shapeItem.getLeft()
											- moveLeft);
									shapeItem.setZoomX(shapeItem.getZoomX()
											/ zoomX);
									shapeItem.setZoomY(shapeItem.getZoomY()
											/ zoomY);
								}
								var message = new com.kenny.util.Observer.Message();
								message.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
								message.sender = shapeItem;
								message.data = {};
								com.kenny.util.Observer.sendMessage(message);
							});
		};
	};

	com.kenny.event.ShapeEditListener = function() {
		this.update = function(message) {
			message.sender.edit();
		};
	};

	com.kenny.event.ShapeSetStyleListener = function() {
		this.update = function(message) {
			var shape = message.sender;
			var msgData = message.data;
			var undoData = shape.getData();

			jsk
					.execute(
							function() {
								shape.getDomInstance().display = 'none';
								if (msgData.imageLineStyle != undefined) {
									switch (msgData.imageLineStyle) {
									case 'solid':
										shape.setBorderStyle("0,0");
										break;
									case 'dashed':
										shape.setBorderStyle("1,1");
										break;
									case 'halfDashed':
										shape.setBorderStyle("2,2");
										break;
									case 'thickDashed':
										shape.setBorderStyle("4,4");
										break;
									case 'pointDashed':
										shape.setBorderStyle("3,3");
										break;
									case 'thinSolid':
										shape.setBorderStyle("0,0");
										break;
									}
								} else if (msgData.shapeBorderColor != null) {
									shape
											.setBorderColor(msgData.shapeBorderColor);
								} else if (msgData.shapeFillColor != undefined) {
									shape.setColor(msgData.shapeFillColor);
								} else if (msgData.shapeEffectShadowImage != undefined) {

								} else if (msgData.wrapAutomaticStyle != undefined) {

								} else if (msgData.SelectSlider != undefined) {

								} else if (msgData.InsetMarginSlider != undefined) {

								} else if (msgData.extraSpaceMarginSlider != undefined) {
									// shape.setTop(msgData.extraSpaceMarginSlider);
									// shape.setLeft(msgData.extraSpaceMarginSlider);
								} else if (msgData.StyleOptionMarginSlider != undefined) {
									shape
											.setBorderWidth(msgData.StyleOptionMarginSlider);

								} else if (msgData.EffectsMarginSlider != undefined) {
									shape
											.setOpacity(msgData.EffectsMarginSlider / 100);
								} else if (msgData.shapeImgStyle != undefined) {
									switch (msgData.shapeImgStyle) {
									case "Menu_Edit_ShapeImages_Img_Style_Div_Green":
										shape.setColor('#68A22F');
										shape.setBorderWidth(0);
										shape.setBorderColor(null);
										shape.setBorderStyle('0,0');
										break;
									case "Menu_Edit_ShapeImages_Img_Style_Div_Blue":
										shape.setColor('#2B6991');
										shape.setBorderWidth(8);
										shape.setBorderColor('#EBEBEB');
										shape.setBorderStyle('0,0');
										break;
									case "Menu_Edit_ShapeImages_Img_Style_Div_Red":
										shape.setColor('#C10C21');
										shape.setBorderWidth(0);
										shape.setBorderColor(null);
										shape.setBorderStyle('0,0');
										break;
									case "Menu_Edit_ShapeImages_Img_Style_Div_Yellow":
										shape.setColor('#EDC926');
										shape.setBorderWidth(0);
										shape.setBorderColor(null);
										shape.setBorderStyle('0,0');
										break;
									case "Menu_Edit_ShapeImages_Img_Style_Div_Purple":
										shape.setColor('#782274', '#611878',
												'#5B1571');
										shape.setBorderWidth(0);
										shape.setBorderColor(null);
										shape.setBorderStyle('0,0');
										break;
									case "Menu_Edit_ShapeImages_Img_Style_Div_Gray":
										shape.setColor('#D6D8DE');
										shape.setBorderWidth(0);
										shape.setBorderColor(null);
										shape.setBorderStyle('0,0');
										break;
									}
								}
								if (msgData.MenuEditLinestylebox != null) {
									// alert('msgData.MenuEditLinestylebox'+msgData.MenuEditLinestylebox);
									switch (msgData.MenuEditLinestylebox) {
									case "Menu_Edit_ShapeArrowSet_Black":
										shape.setBorderColor("Black");
										shape.setBorderStyle("0,0");
										break;
									case "Menu_Edit_ShapeArrowSet_Green":
										shape.setBorderColor("#2B6991");
										shape.setBorderStyle("0,0");
										break;
									case "Menu_Edit_ShapeArrowSet_Red":
										shape.setBorderColor("Red");
										shape.setBorderStyle("0,0");
										break;
									case "Menu_Edit_ShapeArrowSet_Yellow":
										shape.setBorderColor("Yellow");
										shape.setBorderStyle("0,0");
										break;
									case "Menu_Edit_ShapeArrowSet_Purple_Dash":
										shape.setBorderColor("Purple");
										shape.setBorderStyle("1,1");
										break;
									case "Menu_Edit_ShapeArrowSet_Black_Dash":
										shape.setBorderColor("Black");
										shape.setBorderStyle("1,1");
										break;
									}
								}
								if (msgData.MenuStyleOptionLineStyle != null) {
									switch (msgData.MenuStyleOptionLineStyle) {
									case "solid":
										shape.setBorderStyle("0,0");
										break;
									case "dashed":
										shape.setBorderStyle("1,1");
										break;
									case "halfDashed":
										shape.setBorderStyle("2,2");
										break;
									case "thickDashed":
										shape.setBorderStyle("4,4");
										break;
									case "pointDashed":
										shape.setBorderStyle("3,3");
										break;
									case "thinSolid":
										shape.setBorderStyle("0,0");
										break;
									}
								}
								if (msgData.MenuEditLinecolor != null) {
									tracker
											.setBorderColor(msgData.MenuEditLinecolor);
								}
								if (msgData.MenuEditStyleOptionLineWidthSlider != null) {
									shape
											.setBorderWidth(msgData.MenuEditStyleOptionLineWidthSlider);
								}
								if (msgData.MenuEditLineShadowOpacitySlider != null) {
									tracker
											.setStrokeOpacity(msgData.MenuEditLineShadowOpacitySlider / 100);
								}
								if (msgData.MenuEditLineStyleLineColorTwo != null) {
									var tracker = shape;
									tracker
											.setBorderColor(msgData.MenuEditLineStyleLineColorTwo);
								}

								shape.getDomInstance().display = '';
								shape.render();

								var focusMsg = new com.kenny.util.Observer.Message();
								focusMsg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								focusMsg.sender = shape;
								focusMsg.data = {};
								com.kenny.util.Observer.sendMessage(focusMsg);

								var updateMenuMsg = new com.kenny.util.Observer.Message();
								updateMenuMsg.id = com.kenny.util.Observer.MessageType.SVG_STYLE_NOTIFY;
								updateMenuMsg.sender = shape;
								updateMenuMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMenuMsg);

								var msg = new com.kenny.util.Observer.Message();
								msg.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
								msg.sender = shape;
								msg.data = {};
								com.kenny.util.Observer.sendMessage(msg);

								return {
									"data" : undoData,
									"shape" : shape
								};
							},
							function(data) {
								// TODO start
								var uodoShape = data.shape;
								var data = data.data;
								if (data.strokeDasharray != undefined) {
									uodoShape
											.setBorderStyle(data.strokeDasharray);
								}
								if (data.strokeColor != undefined) {
									uodoShape.setBorderColor(data.strokeColor);
									if (data.strokeColor == null) {
										uodoShape.setBorderColor('none');
									}
								}
								if (data.color != undefined) {
									uodoShape.setColor(data.color);
								}
								// if (data.setTop != undefined) { TODO
								// 现在（7/21）实现有bug
								// uodoShape.setTop(data.setTop);
								// uodoShape.setLeft(data.extraSpaceMarginSlider);
								// }
								if (data.strokeWidth != undefined) {
									uodoShape.setBorderWidth(data.strokeWidth);
									if (data.strokeWidth == null) {
										uodoShape.setBorderWidth(0);
									}
								}
								if (data.opacity != undefined) {
									if (data.opacity == 'NaN') {
										uodoShape.setOpacity(1);
									} else {
										uodoShape.setOpacity(data.opacity);
									}
								}
								// shapeArrow
								if (data.strokeOpacity != undefined) {
									if (data.strokeOpacity == 'NaN') {
										uodoShape.setStrokeOpacity(1);
									} else {
										uodoShape
												.setStrokeOpacity(data.strokeOpacity);
									}
								}
								// TODO end
								var focusMsg = new com.kenny.util.Observer.Message();
								focusMsg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								focusMsg.sender = uodoShape;
								focusMsg.data = {};
								com.kenny.util.Observer.sendMessage(focusMsg);

								var updateMenuMsg = new com.kenny.util.Observer.Message();
								updateMenuMsg.id = com.kenny.util.Observer.MessageType.SVG_STYLE_NOTIFY;
								updateMenuMsg.sender = uodoShape;
								updateMenuMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMenuMsg);

								var msg = new com.kenny.util.Observer.Message();
								msg.id = com.kenny.util.Observer.MessageType.UPDATE_SLIDE_LEFTSIDE;
								msg.sender = uodoShape;
								msg.data = {};
								com.kenny.util.Observer.sendMessage(msg);
							});
		};
	};

	com.kenny.event.ShapeSetTextStyleListener = function() {
		this.update = function(message) {
			var undoData = message.sender.getData();
			var shapeText = message.sender;
			var msgData = message.data;
			jsk
					.execute(
							function() { // TODO
								if (message.data.fontContent != undefined) {
									message.sender
											.setFontContent(message.data.fontContent);
								} else if (message.data.shapeTextParagraphStyle != undefined) {
									switch (message.data.shapeTextParagraphStyle) {
									case "title":
										message.sender.setFontSize(30);
										message.sender.setFontWeight('bold');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#b98215');
										break;
									case "title-small":
										message.sender.setFontSize(26);
										message.sender.setFontWeight('bold');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#ff0f1b');
										break;
									case "subtitle":
										message.sender.setFontSize(20);
										message.sender.setFontWeight('bold');
										message.sender.setFontStyle('italic');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#ffffff');
										break;
									case "body":
										message.sender.setFontSize(16);
										message.sender.setFontWeight('normal');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#ffffff');
										break;
									case "body-small":
										message.sender.setFontSize(14);
										message.sender.setFontWeight('normal');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#ffffff');
										break;
									case "lable":
										message.sender.setFontSize(12);
										message.sender.setFontWeight('normal');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#ffffff');
										break;
									case "lable-dark":
										message.sender.setFontSize(12);
										message.sender.setFontWeight('normal');
										message.sender.setFontStyle('normal');
										message.sender.setFontUnderline(false);
										message.sender
												.setFontLinethrough(false);
										message.sender.setFontColor('#000000');
										break;
									}
								} else if (message.data.shapeTextFontStyle != undefined) {
									switch (message.data.shapeTextFontStyle) {
									case "Arial":
										message.sender.setFontFamily("Arial");
										break;
									case "Courier New":
										message.sender
												.setFontFamily("Courier New");
										break;
									case "Times New Roman":
										message.sender
												.setFontFamily("Times New Roman");
										break;
									case "Georgia":
										message.sender.setFontFamily("Georgia");
										break;
									case "Verdana":
										message.sender.setFontFamily("Verdana");
										break;
									}
								} else if (message.data.color != undefined) {
									message.sender
											.setFontColor(message.data.color);
								} else if (message.data.shapeParaAlignStyle != undefined) {

								} else if (message.data.ShapeTextStyle != undefined) {
									switch (message.data.ShapeTextStyle) {
									case 'Menu_Edit_ShapeTextSet_Style_Noborder':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#FFFFFF');
										message.sender.setBorderStyle("0,0");
										break;
									case 'Menu_Edit_ShapeTextSet_Style_RedBorder':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#2E6B98');
										message.sender.setBorderStyle("0,0");
										break;
									case 'Menu_Edit_ShapeTextSet_Style_DeepRedBorder':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#C10C21');
										message.sender.setBorderStyle("0,0");
										break;
									case 'Menu_Edit_ShapeTextSet_Style_BlackBorder':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#EDC926');
										message.sender.setBorderStyle("0,0");
										break;
									case 'Menu_Edit_ShapeTextSet_Style_BlackBorderOne':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#8A2AAA');
										message.sender.setBorderStyle("0,0");
										break;
									case 'Menu_Edit_ShapeTextSet_Style_BlackGround':
										message.sender.setColor('#FFFFFF');
										message.sender.setBorderWidth(1);
										message.sender
												.setBorderColor('#000000');
										message.sender.setBorderStyle("0,0");
										break;
									}
								} else if (message.data.TextFontSize != undefined) {
									message.sender
											.setFontSize(message.data.TextFontSize);
								}
								switch (message.id) {
								case com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE:
									var fontStyle = "";
									if (message.data.fontWeight != null) {
										fontStyle = message.data.fontWeight;
										message.sender.setFontWeight(fontStyle);
									}
									if (message.data.fontStyle != null) {
										fontStyle = message.data.fontStyle;
										message.sender.setFontStyle(fontStyle);
									}
									if (message.data.underline != null) {
										fontStyle = message.data.underline;
										message.sender
												.setFontUnderline(fontStyle);
									}
									if (message.data.linethrough != null) {
										fontStyle = message.data.linethrough;
										message.sender
												.setFontLinethrough(fontStyle);
									}
									break;
								}

								var focusMsg = new com.kenny.util.Observer.Message();
								focusMsg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								focusMsg.sender = message.sender;
								focusMsg.data = {};
								com.kenny.util.Observer.sendMessage(focusMsg);

								var updateMenuMsg = new com.kenny.util.Observer.Message();
								updateMenuMsg.id = com.kenny.util.Observer.MessageType.SVG_STYLE_NOTIFY;
								updateMenuMsg.sender = message.sender;
								updateMenuMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMenuMsg);

								return {
									'shapeText' : shapeText,
									'undoData' : undoData
								};
							},
							function(data) {
								var useData = data.undoData;
								// if(useData.fontUnderLine == undefined){
								// useData.fontUnderLine = false;
								// }
								// if(useData.fontLineThrough == undefined){
								// useData.fontLineThrough = false;
								// }
								if (useData.textDecoration == 'normal') {
									useData.textDecoration = null;
								}
								var undoObj = data.shapeText;
								// console.info("before"+undoObj.toJSON());
								undoObj.setData(useData);

								var focusMsg = new com.kenny.util.Observer.Message();
								focusMsg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								// focusMsg.sender = data.shapeText.sender;
								focusMsg.sender = data.shapeText;
								focusMsg.data = {};
								com.kenny.util.Observer.sendMessage(focusMsg);

								var updateMenuMsg = new com.kenny.util.Observer.Message();
								updateMenuMsg.id = com.kenny.util.Observer.MessageType.SVG_STYLE_NOTIFY;
								// updateMenuMsg.sender = data.shapeText.sender;
								updateMenuMsg.sender = data.shapeText;
								updateMenuMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMenuMsg);
								// console.info("after"+undoObj.toJSON());
							});
		};
	};

	com.kenny.event.ShapeArrangeListener = function() {
		this.update = function(message) {
			if (message.data.MenuEditLineWrapStyle != null) {

			}
			if (message.data.MenuEditLineWrapShadowOff != null) {

			}
			if (message.data.MenuEditLineWrapShadowOn != null) {

			}
			if (message.data.MenuEditLineWrapExtraSpaceSlider != null) {
				var tracker = message.sender;
				tracker.setTop(message.data.MenuEditLineWrapExtraSpaceSlider);
				tracker.setLeft(message.data.MenuEditLineWrapExtraSpaceSlider);
			}
			if (message.data.MenuEditLineArrangeMovetoBackFrontSlider != null) {

			}
		};
	};

	com.kenny.event.ShapeMoveListner = function() {
		this.update = function(message) {
			var shape = message.sender;
			var top = shape.getTop();
			var left = shape.getLeft();

			shape.setLeft(message.data.left);
			shape.setTop(message.data.top);
			if (message.data.rect) {
				com.kenny.util.BaseTool.doValidPositionWidthRect(
						message.data.rect, shape);
			} else {
				com.kenny.util.BaseTool.doValidPosition(message.data.self,
						shape);
			}

			var targetLeft = shape.getLeft(), targetTop = shape.getTop();

			jsk
					.execute(
							function() {
								shape.setLeft(targetLeft);
								shape.setTop(targetTop);
								shape.render();

								var updateMsg = new com.kenny.util.Observer.Message();
								updateMsg.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
								updateMsg.sender = shape;
								updateMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMsg);

								// Notify shape blur event
								var msg = new com.kenny.util.Observer.Message();
								msg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								msg.sender = shape;
								com.kenny.util.Observer.sendMessage(msg);
								return {
									"top" : top,
									"left" : left,
									'shape' : shape
								};
							},
							function(data) {
								shape.setLeft(data.left);
								shape.setTop(data.top);

								var updateMsg = new com.kenny.util.Observer.Message();
								updateMsg.id = com.kenny.util.Observer.MessageType.SHAPE_LAYOUT;
								updateMsg.sender = data.shape;
								updateMsg.data = {};
								com.kenny.util.Observer
										.sendMessage(updateMsg);

								// Notify shape blur event
								var msg = new com.kenny.util.Observer.Message();
								msg.id = com.kenny.util.Observer.MessageType.SHAPE_FOCUS;
								msg.sender = data.shape;
								com.kenny.util.Observer.sendMessage(msg);
							});
		};
	};

	(function() {
		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_INSERT,
				new com.kenny.event.ShapeInsertListener());

		var focusListener = new com.kenny.event.ShapeFocusListener();
		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_FOCUS,
				focusListener);
		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_TRACKER_HIDE,
				focusListener);
		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_TRACKER_FIX,
				focusListener);
		
		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_BLUR,
				new com.kenny.event.ShapeBlurListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_RESIZE,
				new com.kenny.event.ShapeResizeListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_EDIT,
				new com.kenny.event.ShapeEditListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_STYLE,
				new com.kenny.event.ShapeSetStyleListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_TEXT_STYLE,
				new com.kenny.event.ShapeSetTextStyleListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_ARRANGE,
				new com.kenny.event.ShapeArrangeListener());

		com.kenny.util.Observer.register(
				com.kenny.util.Observer.MessageType.SHAPE_POSITION,
				new com.kenny.event.ShapeMoveListner());
	})();
}