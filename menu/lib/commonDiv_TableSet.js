function commonDiv_TableSet_Ready(paramDoc) {
	if(paramDoc == "paper"){
		hideTableElementByCondition();
		//$('.Menu_Edit_TableAll_TableOptions_Style').css('top','-51px');
		//$('.Menu_Edit_TableAll_TableOptions_AllOptions_Title_Style').css('height','39px').css('line-height','39px');
		$('#Menu_Edit_TableAll_Table_TableOptions').css('margin-top','25px')
		
		
	}
	if(paramDoc == "slide"){
		hideTableElementByCondition();
		$('#Menu_Edit_Table_Wrap').css('display','none');
	}
	$("#Menu_Edit_Table_AllTableOption_TableName_Radio").buttonset();
	$("#Menu_Edit_Table_AllTableOption_TableBorder_Radio").buttonset();
	$("#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio").buttonset();
	$("#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio").buttonset();
	$("#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio").buttonset();
	$("#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio").buttonset();
	$("#Menu_Edit_TableAll_Headers_FreezeRows_Radio").buttonset();
	$("#Menu_Edit_TableAll_Headers_FreezeColumns_Radio").buttonset();
	$("#Menu_Edit_Table_TableOption_TextSize_CheckBox").selectable();
	$("#Menu_Edit_Table_TableOption_TableFont_CheckBox").selectable();
	$("#Menu_Edit_Table_AllTableOption_WrapOption_HorizontalLines_Radio").buttonset();
	$("#Menu_Edit_TableAll_Table_HeaderRowLines").buttonset();
    $("#Menu_Edit_TableAll_Table_FooterRowLines").buttonset();
	
    initTableSetImageMenu();
    initTableSetTextMenu();
    initTableSetInsertMenu();
	$("#Menu_Edit_TableAll_Table_TableOptions_Link").click(function () {
		$("#Menu_Edit_TableAll_Table_Table_box").css('display','none');
	});
	$("#Menu_Edit_TableAll_TableOptions_Title").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_Table_Table_box").css('display','block');
	});
	
	$("#Menu_Edit_TableAll_Table_Items_GridOptions").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions_GridOptions").css('display','block');
	});
	
	$("#Menu_Edit_TableAll_Table_Items_WrapOptions").click(function () {
		$("#Menu_Edit_TableAll_Arrange_Option").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions_WrapOptions").css('display','block');
	});
	$("#Menu_Edit_TableAll_TableOptions_WrapOptions_Back").click(function () {
		$("#Menu_Edit_TableAll_TableOptions_WrapOptions").css('display','none');
		$("#Menu_Edit_TableAll_Arrange_Option").css('display','block');
	});
	
	
	$("#Menu_Edit_TableAll_TableOptions_GridOptions_Back").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions").css('display','block');
	});
	$("#Menu_Edit_TableAll_Table_Items_TextSize").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions_TextSize").css('display','block');
	});
	$("#Menu_Edit_TableAll_TableOptions_TextSize_Back").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions").css('display','block');
	});
	$("#Menu_Edit_TableAll_Table_Items_TableFont").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions_TableFont").css('display','block');
	});
	$("#Menu_Edit_TableAll_TableOptions_TableFont_Back").click(function () {
		$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
		$("#Menu_Edit_TableAll_TableOptions").css('display','block');
	});
	$("#Menu_Edit_TableAll_Table_TableOptions_Link").click(function () {
	$(".Menu_Edit_TableAll_TableOptions_Style").css('display','none');
	$("#Menu_Edit_TableAll_TableOptions").css('display','block');
	});
	
	registerTableListener();
}

function initTableSetTextMenu() {
    $("#popup-menu-text-content").tabs();
    $("#text-style-font").buttonset();
    $("#text-style-format").selectable();
    $("#text-list-format").selectable();
    $("#text-layout-align").buttonset();
    $("#text-layout-column").buttonset();
}

function initTableSetImageMenu() {
    $("#popup-menu-image-content").tabs();
    $("#image-style-shadow").buttonset();
    $("#opacity-slider").slider({
        value: 100,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            $("#image-style-opacity").text(ui.value + "%");
        }
    });
    $("#image-style-opacity").text($("#opacity-slider").slider("value") + "%");
    $("#image-style-flip").buttonset();
}

function initTableSetInsertMenu() {
    $("#Menu_Edit_TableAll_Insert_Table_AllContents").tabs();
    $("#opacity-slider").slider({
        value: 100,
        min: 0,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            $("#image-style-opacity").text(ui.value + "%");
        }
    });
}

// regist listener
function registerTableListener() {
	
	    // add table style`s click function
	    $('#Menu_Edit_TableAll_Table_Table_box .table_insert_tableDivStyle img').click(function () {
	    	var data = {};
	    	data.flag = "table";
	    	data.src = $(this).attr('src');
	    	//alert(data.src);
	    //	$('#Menu_Edit_TableAll_Table_Table_box div .table_insert_tableDivStyle').css('border','2px solid #eeeeee');
	    	//$(this).parent().css('border','2px solid #8DDF48');
	        sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
						currentSelectedObj,
						data);
	    });
    
    // add table name`s click function
    $('#Menu_Edit_Table_AllTableOption_TableName_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.tableName = true;
				} else {
					data.tableName = false;
				}
				//alert("Table Name :"+data.tableName);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add table border`s click function
    $('#Menu_Edit_Table_AllTableOption_TableBorder_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.tableBorder = true;
				} else {
					data.tableBorder = false;
				}
				//alert("Table Border  :"+data.tableBorder);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
    
    // add alternating rows`s click function
    $('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.alternatingRows = true;
				} else {
					data.alternatingRows = false;
				}
				//alert("Alternating Rows   :"+data.alternatingRows);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add horizontal lines`s click function
    $('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.horizontalLines = true;
				} else {
					data.horizontalLines = false;
				}
				//alert("Horizontal Lines    :"+data.horizontalLines);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
    // add header column lines`s click function
    $('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.headerColumnLines = true;
				} else {
					data.headerColumnLines = false;
				}
				//alert("Header Column Lines     :"+data.headerColumnLines);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
    
    // add vertical lines`s click function
    $('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.verticalLines = true;
				} else {
					data.verticalLines = false;
				}
				//alert("Vertical Lines  :"+data.verticalLines);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add Header Row Lines click function
    $('#Menu_Edit_Table_AllTableOption_GridOption_HeaderRowLines_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.headerRowLines = true;
				} else {
					data.headerRowLines = false;
				}
				//alert("Header Row Lines  :"+data.headerRowLines);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add Footer Row Lines  click function
    $('#Menu_Edit_Table_AllTableOption_GridOption_FooterRowLines_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "table";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.footerRowLines = true;
				} else {
					data.footerRowLines = false;
				}
				//alert("Footer Row Lines  :"+data.footerRowLines);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	
	// add header rows`s change function
	$('#Menu_Edit_TableAll_Header_HeaderRows_Size').change( function () {
		
		if(currentSelectedObj.getRows()) {
			$('#Menu_Edit_TableAll_Header_FooterRows_Size').children().remove();
			
			if(Number(this.value) > 0 && Number(currentSelectedObj.getFooterRows()) > 0){
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','1px solid #b2b2b2');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','1px solid #b2b2b2');
			}else if(Number(this.value) > 0 && Number(currentSelectedObj.getFooterRows()) == 0){
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','none');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','1px solid #b2b2b2');
			}else if(Number(this.value) == 0 && Number(currentSelectedObj.getFooterRows()) > 0){
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','none');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','none');
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','1px solid #b2b2b2');
			}else if(Number(this.value) == 0 && Number(currentSelectedObj.getFooterRows()) == 0){
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','none');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','none');
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','none');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','none');
			}
			
			if((Number(currentSelectedObj.getRows()) - Number(currentSelectedObj.getHeaderRows()) - Number(currentSelectedObj.getFooterRows())) > 5) {
				for(var i = 0;i < 6;i++) {
					$('#Menu_Edit_TableAll_Header_FooterRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
			 }else{
			 	var j = (Number(currentSelectedObj.getRows()) - Number(this.value));
			 	if(j > 5){
			 	 		j = 6;
			 	 	}
			 	for(var i = 0;i < j;i++) {
					$('#Menu_Edit_TableAll_Header_FooterRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
			 }
			 
			 $('#Menu_Edit_TableAll_Header_FooterRows_Size').attr('value',currentSelectedObj.getFooterRows());
	    }
		var data = {};
		data.flag = "headers";
		data.headerRows = Number(this.value);
		sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
					currentSelectedObj,
					data);
	});
	
	// add freeze rows`s click function
    $('#Menu_Edit_TableAll_Headers_FreezeRows_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "headers";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.freezeRows = true;
				} else {
					data.freezeRows = false;
				}
				//alert("Freeze Rows :"+data.freezeRows);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add header columns`s change function
	$('#Menu_Edit_TableAll_Header_HeaderColumns_Size').change( function () {
			
			if(Number(this.value) == 0){
				$('#Menu_Edit_Table_HeaderColumnLines').css('display','none');
				$('#Menu_Edit_Table_HorizontalLines').css('border-bottom','none');
			}
			if(Number(this.value) > 0){
				$('#Menu_Edit_Table_HeaderColumnLines').css('display','block');
				$('#Menu_Edit_Table_HorizontalLines').css('border-bottom','1px solid #b2b2b2');
			}
			var data = {};
    		data.flag = "headers";
			data.headerColumns = Number(this.value);
			sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
						currentSelectedObj,
						data);
	});
	
	// add freeze columns`s click function
    $('#Menu_Edit_TableAll_Headers_FreezeColumns_Radio .ui-button').click( function () {
    		var data = {};
    		data.flag = "headers";
			var cmd = $(this).attr('for');
			if (cmd) {
				if(cmd.indexOf("_setShadow_Off") == -1) {
					data.freezeColumns = true;
				} else {
					data.freezeColumns = false;
				}
				//alert("Freeze Columns :"+data.freezeColumns);
				sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
							currentSelectedObj,
							data);
			}
	});
	
	// add footer rows`s change function
	$('#Menu_Edit_TableAll_Header_FooterRows_Size').change( function () {
		if(currentSelectedObj.getRows()) {
			$('#Menu_Edit_TableAll_Header_HeaderRows_Size').children().remove();
			
			if(Number(this.value) > 0){
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','1px solid #b2b2b2');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','1px solid #b2b2b2');
			}else{
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','none');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','none');
			}
			if(Number(this.value) == 0 && Number(currentSelectedObj.getHeaderRows()) == 0){
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','none');
			}
			
			if((Number(currentSelectedObj.getRows()) - Number(currentSelectedObj.getHeaderRows()) - Number(currentSelectedObj.getFooterRows())) > 5) {
				for(var i = 0;i < 6;i++) {
					$('#Menu_Edit_TableAll_Header_HeaderRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
			 }else{
			 	var j = ((Number(currentSelectedObj.getRows()) - Number(this.value)));
			 	if(j > 5){
			 	 		j = 6;
			 	 	}
			 	for(var i = 0;i < j;i++) {
					$('#Menu_Edit_TableAll_Header_HeaderRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
			 }
			 $('#Menu_Edit_TableAll_Header_HeaderRows_Size').attr('value',currentSelectedObj.getHeaderRows());
	    }
		var data = {};
		data.flag = "headers";
		data.footerRows = Number(this.value);
		sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
					currentSelectedObj,
					data);
	});
	
    
    // add text size`s click function
	$('#Menu_Edit_Table_TableOption_TextSize_CheckBox .ui-widget-content').click( function () {
			var data = {};
    		data.flag = "table";
			data.textSize = $(this).attr('propertyName');
			//alert("Text Size :"+data.textSize);
			$('#Menu_Table_TextSize').text(data.textSize+' >');
			$(".Item_Property").children('img').remove();
	        //$(this).children(".Item_Property").append('<input type="checkbox" class="item_selected" checked="true" disabled="true">');
			$(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
						currentSelectedObj,
						data);
	});

    // add table font`s click function
   	$('#Menu_Edit_Table_TableOption_TableFont_CheckBox .ui-widget-content').click( function () {
   			var data = {};
    		data.flag = "table";
			data.tableFont = $(this).attr('propertyName');
			//alert("Table Font :"+data.tableFont);
			$('#Menu_Table_TableFont').text(data.tableFont+' >');
			$(".Item_Property").children('img').remove();
			 //$(this).children(".Item_Property").append('<input type="checkbox" class="item_selected" checked="true" disabled="true">');
			$(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			sendMessage(com.kenny.util.Observer.MessageType.TABLE_CHANGED,
						currentSelectedObj,
						data);
	});
	
   	
   	$("#Menu_Edit_TableAll_Arrange_Tab").click(function(e){
//		var initValue = currentSelectedObj.getZIndex();
//		var container = getActiveContainer();
//		var num = container.getAllElements().length < 2 ? 2 : container.getAllElements().length;
//		//alert(num);
//		$("#Menu_Edit_Table_Arrange_mySlider").slider({
//			value : initValue,
//			min: 1001,
//			max: 1000 + num,
//			step: 1,
//			slide: function (event, ui) {
//				$('#Menu_Edit_Table_Arrange_Reduce').removeAttr('disabled');
//				$('#Menu_Edit_Table_Arrange_Add').removeAttr('disabled');
//				if(ui.value == 1001){
//					$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', 'disabled');
//				}
//				else if(ui.value == 1000 + num){
//					$('#Menu_Edit_Table_Arrange_Add').attr('disabled', 'disabled');
//				}
//				var data = {'zindex':ui.value};
//				sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
//			}
//		});
//		$('#Menu_Edit_Table_Arrange_Reduce').removeAttr('disabled');
//		$('#Menu_Edit_Table_Arrange_Add').removeAttr('disabled');
//		if(initValue == 1001){
//			$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', 'disabled');
//		}
//		else if(initValue == 1000 + num){
//			$('#Menu_Edit_Table_Arrange_Add').attr('disabled', 'disabled');
//		}
	});
	
	$('#Menu_Edit_Table_Arrange_Reduce').click(function(e){
		var container = getActiveContainer();
		var num = container.getAllElements().length;
		if(num >= 2){
			var initValue = currentSelectedObj.getZIndex();//1001;
			if(initValue > 1000){
				initValue -= 10;
			}
			
			$("#Menu_Edit_Table_Arrange_mySlider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_Table_Arrange_Add').removeAttr('disabled');
			if(initValue == 1000){
				$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', 'disabled');
			}
		}
	});
	$('#Menu_Edit_Table_Arrange_Add').click(function(e){
		var container = getActiveContainer();
		var num = container.getAllElements().length;
		if(num >= 2){
			var initValue = currentSelectedObj.getZIndex();//1001;
			if(initValue < (1000 + 10*(num - 1))){
				initValue += 10;
			}
			$("#Menu_Edit_Table_Arrange_mySlider").slider({
				value : initValue
			});
			var data = {'zindex':initValue};
			sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
			
			$('#Menu_Edit_Table_Arrange_Reduce').removeAttr('disabled');
			//var container = getActiveContainer();
			//var num = container.getAllElements().length < 2 ? 2 : container.getAllElements().length;
			if(initValue == 1000 + 10*(num - 1)){
				$('#Menu_Edit_Table_Arrange_Add').attr('disabled', 'disabled');
			}
		}
	});
 }

/*update the menu state when a table secleted */
function updateTableMenu(objData) {
	
	if(currentSelectedObj) {
		//parentNodeElement = com.kenny.util.BaseTool.findObjWithId(currentSelectedObj.getDomInstance().parentNode.id);
		// if(!parentNodeElement){
		// 	
		// 	// page
		// 	$('#Menu_Table_TableName').css('display','none');
		// 	$('#Menu_Edit_Table_FreezeRows').css('display','none');
		// 	$('#Menu_Edit_Table_FreezeColumns').css('display','none');
		// 	$('#Menu_Edit_Table_HeaderRows').css('border','none');
		// 	$('#Menu_Edit_Table_HeaderColumns').css('border','none');
		// 	$('#Menu_Edit_Table_Wrap').css('display','block');
		// }else{
		// 	// sheet
		// 	$('#Menu_Table_TableName').css('display','block');
		// 	$('#Menu_Edit_Table_FreezeRows').css('display','block');
		// 	$('#Menu_Edit_Table_FreezeColumns').css('display','block');
		// 	$('#Menu_Edit_Table_FreezeColumns').css('display','block');
		// 	$('#Menu_Edit_Table_HeaderRows').css('border-bottom','1px solid #B2B2B2');
		// 	$('#Menu_Edit_Table_HeaderColumns').css('border-bottom','1px solid #B2B2B2');
		// 	$('#Menu_Edit_Table_Wrap').css('display','none');
		// }
		//alert("parentNodeElement :"+parentNodeElement.getType());
		
		$(".Item_Property").children('input').remove();
		
		$('#Menu_Edit_TableAll_Header_HeaderRows_Size').children().remove();
		$('#Menu_Edit_TableAll_Header_HeaderColumns_Size').children().remove();
		$('#Menu_Edit_TableAll_Header_FooterRows_Size').children().remove();
		
		// set headers 
		if(currentSelectedObj.getRows()) {

			if(Number(currentSelectedObj.getHeaderCols()) > 0) {
				$('#Menu_Edit_Table_HeaderColumnLines').css('display','block');
				$('#Menu_Edit_Table_HorizontalLines').css('border-bottom','1px solid #b2b2b2');
			} else {
				$('#Menu_Edit_Table_HeaderColumnLines').css('display','none');
				$('#Menu_Edit_Table_HorizontalLines').css('border-bottom','none');
			}
			
			if(Number(currentSelectedObj.getHeaderRows()) > 0){
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','1px solid #b2b2b2');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','none');
			}else{
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('display','none');
			}
			
			if(Number(currentSelectedObj.getFooterRows()) > 0){
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','block');
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('border-bottom','none');
				$('#Menu_Edit_TableAll_Table_HeaderRowLines').css('border-bottom','1px solid #b2b2b2');
			}else{
				$('#Menu_Edit_TableAll_Table_FooterRowLines').css('display','none');
			}
			if(Number(currentSelectedObj.getFooterRows()) ==0 && Number(currentSelectedObj.getHeaderRows())==0){
				$('#Menu_Edit_TableAll_Table_VerticalLines').css('border-bottom','none');
			}
			
			if((Number(currentSelectedObj.getRows()) - Number(currentSelectedObj.getHeaderRows()) - Number(currentSelectedObj.getFooterRows())) > 5) {
				for(var i = 0;i < 6;i++) {
					$('#Menu_Edit_TableAll_Header_HeaderRows_Size').append('<option value = '+ i + '>' + i +' </option>');
					$('#Menu_Edit_TableAll_Header_FooterRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
			} else {
				var j = Number(currentSelectedObj.getRows()) - Number(currentSelectedObj.getFooterRows());
				var k = Number(currentSelectedObj.getRows()) - Number(currentSelectedObj.getHeaderRows());
				
				if(j > 5){
			 	 		j = 6;
			 	 	}
			 	 	
			 	if(k > 5){
			 	 		k = 6;
			 	 	}
				// create elements
				for(var i = 0;i < j;i++) {
					$('#Menu_Edit_TableAll_Header_HeaderRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}
				for(var i = 0;i < k;i++) {
					$('#Menu_Edit_TableAll_Header_FooterRows_Size').append('<option value = '+ i + '>' + i +' </option>');
				}

			}
		}
		 
		if(currentSelectedObj.getCols()) {
			var closCount = 0;
			if(Number(currentSelectedObj.getCols() > 4)) {
				closCount = 5;
			} else {
				closCount = Number(currentSelectedObj.getCols())
			}
			for(var i = 0;i < closCount;i++) {
				$('#Menu_Edit_TableAll_Header_HeaderColumns_Size').append('<option value = '+ i + '>' + i +' </option>');
			}
		}
		
		// set styleId
		// $('#Menu_Edit_TableAll_Table_Table_box div .table_insert_tableDivStyle').css('border','2px solid #eeeeee');
		// if(currentSelectedObj.getStyleId()!=null) {
			// switch (currentSelectedObj.getStyleId()) {
				// case 'style2':
					// $('#Menu_Edit_TableAll_Table_TableOptions_Style_Two').parent().css('border','2px solid #8DDF48');
					// break;
				// case 'style3':
					// $('#Menu_Edit_TableAll_Table_TableOptions_Style_Three').parent().css('border','2px solid #8DDF48');
					// break;
				// case 'style4':
					// $('#Menu_Edit_TableAll_Table_TableOptions_Style_Four').parent().css('border','2px solid #8DDF48');
					// break;
				// case 'style5':
					// $('#Menu_Edit_TableAll_Table_TableOptions_Style_Five').parent().css('border','2px solid #8DDF48');
					// break;
				// case 'style6':
					// $('#Menu_Edit_TableAll_Table_TableOptions_Style_Six').parent().css('border','2px solid #8DDF48');
					// break;
			// }
		// } else {
			// $('#Menu_Edit_TableAll_Table_TableOptions_Style_One').parent().css('border','2px solid #8DDF48');
		// }
		
		// set Table Name 
		if(currentSelectedObj.getTableName()){
			//alert("currentSelectedObj.getTableName()"+currentSelectedObj.getTableName());
		}
		
		// set Table Border
			
		//alert("Table Border: "+currentSelectedObj.getTableBorder())
		$("#Menu_Edit_Table_AllTableOption_TableBorder_Radio").children().each( function(i) {
			$(this).removeClass('ui-state-active');
		});
		if(currentSelectedObj.getTableBorder()){
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(0).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(1).removeClass('ui-state-active');
		}else{
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(1).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_TableBorder_Radio').children('label').eq(0).removeClass('ui-state-active');
			
		}
		
		// set Alternating Rows
		
		$("#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio").children().each( function(i) {
			$(this).removeClass('ui-state-active');
		});
		if(currentSelectedObj.getAlternatingRows()){
			//alert("currentSelectedObj.getAlternatingRows(): "+currentSelectedObj.getAlternatingRows());
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(0).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(1).removeClass('ui-state-active');
		}else{
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(1).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(0).removeClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_AlternatingRows_Radio').children('label').eq(1).addClass('ui-state-active');
		}
		
		// set Horizontal Lines
		//alert("currentSelectedObj.getHorizontalLines():"+currentSelectedObj.getHorizontalLines());
		$("#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio").children().each( function(i) {
			$(this).removeClass('ui-state-active');
		});
		if(currentSelectedObj.getHorizontalLines()){
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(0).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(1).removeClass('ui-state-active');
		}else{
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(1).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_HorizontalLines_Radio').children('label').eq(0).removeClass('ui-state-active');
		}
		
		// set Header Column Lines 
		$("#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio").children().each( function(i) {
			$(this).removeClass('ui-state-active');
		});
		if(currentSelectedObj.getHeaderColumnLines()){
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(0).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(1).removeClass('ui-state-active');
		}else{
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(1).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_Header_ColumnLines_Radio').children('label').eq(0).removeClass('ui-state-active');
		}
		
		// set Vertical Lines 
			
		//alert("currentSelectedObj.getVerticalLines():"+currentSelectedObj.getVerticalLines());
		$("#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio").children().each( function(i) {
			$(this).removeClass('ui-state-active');
		});
		if(currentSelectedObj.getVerticalLines()){
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(0).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(1).removeClass('ui-state-active');
		}else{
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(1).attr('aria-pressed','true')
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Table_AllTableOption_GridOption_VerticalLines_Radio').children('label').eq(0).removeClass('ui-state-active');
		}
		
		// set Table Font
		if(currentSelectedObj.getFontFamily()){
			
			$("#Menu_Edit_Table_TableOption_TableFont_CheckBox li").removeClass("ui-widget-content ui-selectee ui-selected");
			$("#Menu_Edit_Table_TableOption_TableFont_CheckBox li").addClass('ui-widget-content ui-selectee');
			
			 $("#Menu_Edit_Table_TableOption_TableFont_CheckBox").children().each(function(i){
			 	if($(this).attr('propertyName') == currentSelectedObj.getFontFamily()){
			 	//	$(this).addClass('ui-widget-content ui-selectee ui-selected');
			 	$(".Item_Property").children('img').remove();
			 		//$(this).children(".Item_Property").append('<input type="checkbox" class="item_selected" checked="true" disabled="true">');
			 		$(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			 	}
			 });
			// alert("字体: " + currentSelectedObj.getFontFamily());
			 $('#Menu_Table_TableFont').text(currentSelectedObj.getFontFamily() + ' >');
		}else{
			 $('#Menu_Table_TableFont').text('None >');
		}
		
		// set Text Size
		
		
	}
	$('#Menu_Edit_TableAll_Header_HeaderRows_Size').attr('value',currentSelectedObj.getHeaderRows());
	$('#Menu_Edit_TableAll_Header_HeaderColumns_Size').attr('value',currentSelectedObj.getHeaderCols());
	$('#Menu_Edit_TableAll_Header_FooterRows_Size').attr('value',currentSelectedObj.getFooterRows());
}

function hideTableElementByCondition(){
	$('#Menu_Table_TableName').css('display','none');
	$('#Menu_Edit_Table_FreezeRows').css('display','none');
	$('#Menu_Edit_Table_FreezeColumns').css('display','none');
	$('#Menu_Edit_Table_HeaderRows').css('border','none');
	$('#Menu_Edit_Table_HeaderColumns').css('border','none');
	$('#Menu_Edit_Table_Wrap').css('display','none');
}

function initTableArrange(){
	var initValue = currentSelectedObj.getZIndex();
	var container = getActiveContainer();
	var num = container.getAllElements().length;// < 2 ? 2 : container.getAllElements().length;
	if(num < 2){
		$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', true);
		$('#Menu_Edit_Table_Arrange_Add').attr('disabled', true);
		$("#Menu_Edit_Table_Arrange_mySlider").slider({ disabled: true });
	} else {
		$("#Menu_Edit_Table_Arrange_mySlider").slider({
				disabled: false,
		        value:initValue,
				min: 1000,
				max: 1000 + 10*(num - 1),
				step: 10,
		        slide: function (event, ui) {
					$('#Menu_Edit_Table_Arrange_Reduce').removeAttr('disabled');
					$('#Menu_Edit_Table_Arrange_Add').removeAttr('disabled');
					if(ui.value == 1000){
						$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', 'disabled');
					}
					else if(ui.value == 1000 + 10*(num - 1)){
						$('#Menu_Edit_Table_Arrange_Add').attr('disabled', 'disabled');
					}
					var data = {'zindex':ui.value};
					sendMessage(com.kenny.util.Observer.MessageType.UPDATE_ZINDEX, currentSelectedObj, data);
		        }
		 });
		$('#Menu_Edit_Table_Arrange_Reduce').removeAttr('disabled');
		$('#Menu_Edit_Table_Arrange_Add').removeAttr('disabled');
		if(initValue == 1000){
			$('#Menu_Edit_Table_Arrange_Reduce').attr('disabled', 'disabled');
		}
		else if(initValue == 1000 + 10*(num - 1)){
			$('#Menu_Edit_Table_Arrange_Add').attr('disabled', 'disabled');
		}
	}
}
