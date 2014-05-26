function commonDiv_Insert_Ready() {
	
	$("#MENU_SPEC_3").tabs();

	$(".MENU_SPEC_3_insert_tableDivStyle img").click(function() {
		sendMessage(com.kenny.util.Observer.MessageType.TABLE_INSERT, null, { 'src' : $(this).attr('src') });
	});

	$("#MENU_SPEC_3_SHAPES .MENU_SPEC_3_IMG[objectType]").click(function() {
		var types = ['Rectangle', 'Ellipse', 'Polygon', 'Star','Line','ArrowLine'];
		var item = {};
		item.objectType = $.inArray($(this).attr('objectType'), types) > -1 ? $(this).attr('objectType') : null;
		if (item.objectType) {
			// common attribute
			item = $.extend(true, {
				top : 0, 
				left : 0, 
				zIndex : 1000, 
				color : '#68A22F', 
				opacity : 1, 
				borderColor : '#CCCCCC', 
				borderWidth : 2,
				borderStyle : '0,0'
			}, item);
			
			// private attribute
			switch (item.objectType) {
				case 'Rectangle' : 
					item = $.extend(true, {
						width : 200, 
						height : 200, 
						radii : 30
					}, item);
					break;
				case 'Ellipse' : 
					item = $.extend(true, {
						rx : 50, 
						ry : 50
					}, item);
					break;
				case 'Polygon' : 
					item = $.extend(true, {
						radii : 50, 
						vertex : 3
					}, item);
					break;
				case 'Star' : 
					item = $.extend(true, {
						r1 : 100, 
						r2 : 40, 
						vertex : 5
					}, item);
					break;
				case 'ArrowLine' :
				case 'Line' : 
					item = $.extend(true, {
						width : 220, 
						height : 20,
						x1:0,
						x2:180,
						y1:10,
						y2:10
					}, item);
					break;			
			}
			
			var message = new com.kenny.util.Observer.Message();
			message.id = com.kenny.util.Observer.MessageType.SHAPE_INSERT;
			message.sender = item;
			com.kenny.util.Observer.sendMessage(message);
		} else {
			alert("This shape hasn't done!");
		}
	});

	$("#selectImg_OK").click(function() {
		var options = {
			url : 'http://localhost:8080/test/UploadServlet',
			type : 'post',
			dataType : 'jsonp',
			success : function() { alert('success'); }
		};
		$('#upload-file').ajaxSubmit(options);
	});

	$("#selectImg_Cancel").click(function() {
		$("#mask").fadeOut();
	});

	commonControl_PageTurnning("MENU_SPEC_3_SHAPES_CONTENT");
	commonControl_PageTurnning("MENU_SPEC_3_CHARTS_CONTENT");
	commonControl_PageTurnning("MENU_SPEC_3_TABLES_CONTENT");

	$("#MENU_SPEC_3_CHARTS_CONTENT .MENU_SPEC_3_CHARTS[chartType]").click(function() {
		var type = $(this).attr('chartType');
		var subType = $(this).attr('subChartType');

		var message = new com.kenny.util.Observer.Message();
		message.id = com.kenny.util.Observer.MessageType.CHART_INSERT;
		message.sender = {
			"type" : type,
			"subType" : subType
		};
		com.kenny.util.Observer.sendMessage(message);
	});
}

function fileUpload_MouseUp() {
	var userAgent = navigator.userAgent.toLowerCase();
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	if ($.browser.chrome) {
		$.browser.safari = false;
	}
	if ($.browser.safari) {
		$("#fileUpload").click();
	}
	$("#Menu_Insert_Text_Media_Panel").click();
}

function changeMENUSPEC3BarColor(obj) {
	$(".MENU_SPEC_3_SELECT").css("background", getImageUrl('short_bar_bkgd.png'));
	$(".MENU_SPEC_3_SELECT1").css("background", getImageUrl('short_bar_bkgd.png'));
	obj.style.background = getImageUrl('bar_hg.png');

	sendMessage(com.kenny.util.Observer.MessageType.VIDEO_INSERT, null, {
		'src' : './images/pr6.mp4',
		'width' : 320,
		'height' : 240,
		'zindex' : 1000
	});
}

function changeMENUSPEC3ShapeColor(obj) {
	$(".MENU_SPEC_3_IMG").css("background", getImageUrl('items_bkgd.png'));
	obj.style.background = getImageUrl('item_hg.png');
}

function changeMENUSPEC3ChartColor(obj) {
	$(".MENU_SPEC_3_CHARTS").css("background", getImageUrl('items_bkgd.png'));
	obj.style.background = getImageUrl('item_hg.png');
}

function imgSubmit(url) {
	var options = {
		target : '#',
		url : url,
		type : 'post',
		dataType : 'json',
		success : function(json, statusText, xhr, $form) {
			try {
				if (json.error) {
					alert(json.error);
				} else {
					sendMessage(com.kenny.util.Observer.MessageType.IMAGE_INSERT, [], json);
				}
			} catch (e) { }
		}
	};
	$("form#formDiv").ajaxSubmit(options);
}

function getImageUrl(name) {
	var baseUrl = "./images/05 Menus/Graphics/shapes/background/";
	return "url('" + baseUrl + name + "')";
}
