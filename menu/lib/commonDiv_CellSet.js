function loadMenuEditCellReady(paramDoc) {
    // paging
    commonControl_PageTurnning("Menu_Edit_Text_Color_Paging");
    commonControl_PageTurnning("Menu_Edit_Cell_Color");

    if (paramDoc != "sheet") {
        // hide some elements
        hideCellElementByCondition();
    }

    // set Text Size Option Element
    for (var i = 9; i < 289; i++) {
        $('#Menu_Edit_Cell_Text_Size').append('<option value = ' + i + '>' + i + 'pt </option>');
    }

    $("#Menu_Edit_Cell_Content").tabs();
    $("#Menu_Edit_Cell_Table_01_Option_Item_TextSize_Checkbox").selectable();
    $("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_Checkbox").selectable();
    $("#Menu_Edit_Cell_Cells_01_TextSize_Border_Style").selectable();
    $("#Menu_Edit_Cell_Format_NumberOptions_Fraction_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_NumberOptions_Number_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_CurrencyOptions_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_CurrencySymbol_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_percentageOptions_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_DateOptions_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_TimeOptions_Checkbox").selectable();
    $("#Menu_Edit_Cell_Format_DurationOptions_Checkbox").selectable();
    $("#Menu_Edit_Cell_Text_Option_Text_Font_Checkbox").selectable();
    $("#Menu_Edit_Cell_Table_Option_TableName_Radio").buttonset();
    $("#Menu_Edit_Cell_Table_Option_TableBorder_Radio").buttonset();
    $("#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio").buttonset();
    $("#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio").buttonset();
    $("#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio").buttonset();
    $("#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio").buttonset();
    $("#Menu_Edit_Cell_Headers_Freeze_Rows").buttonset();
    $("#Menu_Edit_Cell_Headers_Freeze_Columns").buttonset();
    $("#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton").buttonset();
    $("#Menu_Edit_Cell_Cells_Align_Left_Radio_Button").buttonset();
    $("#Menu_Edit_Cell_Cells_Align_Right_Radio_Button").buttonset();
    $("#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell").buttonset();
    $("#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator").buttonset();
    $("#Menu_Edit_Cell_Format_NumberOptioin_Scientific_Separator").buttonset();
    $("#Menu_Edit_Cell_Format_CurrencyOptions_Separator").buttonset();
    $("#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle").buttonset();
    $("#Menu_Edit_Cell_Format_Percentage_Options_Separator").buttonset();
    $("#Menu_Edit_Cell_GridOption_HeaderRowLines_Radio").buttonset();
    $("#Menu_Edit_Cell_GridOption_FooterRowLines_Radio").buttonset();

    // $("#insert-table-cell").click(function (e) {
    // $(document.body).append('<div id="hidden" style="width:100%; height:100%;
    // top:0; left:0; position:absolute;"></div>');
    // $("#Menu_Edit_Cell").css("top", e.pageY + 20).css("left", e.pageX -
    // 200).css('display', 'block');
    // $("#hidden").click(function () {
    // cellclosePopup();
    // });
    // $("#Menu_Edit_Cell_Table_Box").css('display', 'block');
    // $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
    // $("#Menu_Edit_Cell_Table_01_Option_01").css('display', 'block');
    // });
    $("#To_Menu_Edit_Cell_Number_Panel").click(function () {
        $(".Format").css('display', 'none');
        $("#Menu_Edit_Cell_Number_Panel").css('display', 'block');
    });
    $("#Menu_Edit_Cell_Back_To__Format_Panel").click(function () {
        $("#Menu_Edit_Cell_Number_Panel").css('display', 'none');
        $(".Format").css('display', 'block');
    });
    $("#To_Menu_Edit_Cell_Currency_Options").click(function () {
        $(".Format").css('display', 'none');
        $("#Menu_Edit_Cell_Currency_Options").css('display', 'block');
        $("#Menu_Edit_Cell_Currency_Options_Symbol").css('display', 'none');
    });
    $("#Menu_Edit_Cell_Back_To__Format_PanelFromCurrency").click(function () {
        $("#Menu_Edit_Cell_Currency_Options").css('display', 'none');
        $(".Format").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Currency_Symbol").click(function () {
        $("#Menu_Edit_Cell_Currency_Options").css('display', 'none');
        $("#Menu_Edit_Cell_Currency_Options_Symbol").css('display', 'block');
    });

    $("#Menu_Edit_Cell_Back_To_Currency_Options").click(function () {
        $("#Menu_Edit_Cell_Currency_Options").css('display', 'block');
        $("#Menu_Edit_Cell_Currency_Options_Symbol").css('display', 'none');
    });
    $("#Menu_Edit_Cell_To_Percentage_Options").click(function () {
        $(".Format").css('display', 'none');
        $("#Menu_Edit_Cell_Percentage_Options").css('display', 'block');
    });
    $("#Menu_Edit_Cell_Back_To_Currency_Options_From_Percentage").click(function () {
        $(".Format").css('display', 'block');
        $("#Menu_Edit_Cell_Percentage_Options").css('display', 'none');
    });
    $("#To_Menu_Edit_Cell_Date_Time_Options").click(function () {
        $(".Format").css('display', 'none');
        $("#Menu_Edit_Cell_Date_Time_Options").css('display', 'block');
    });
    $("#Menu_Edit_Cell_Back_To_Currency_OptionsFromDateTime").click(function () {
        $(".Format").css('display', 'block');
        $("#Menu_Edit_Cell_Date_Time_Options").css('display', 'none');
    });
    $("#To_Menu_Edit_Cell_Duration_Options").click(function () {
        $(".Format").css('display', 'none');
        $("#Menu_Edit_Cell_Duration_Options").css('display', 'block');
    });
    $("#Menu_Edit_Cell_BackTo_Currency_OptionsFromDuration").click(function () {
        $(".Format").css('display', 'block');
        $("#Menu_Edit_Cell_Duration_Options").css('display', 'none');
    });
    $("#To_Menu_Edit_Cell_Border_Style").click(function () {
        $(".Menu_Edit_Cell_Table_01_Option").css('display', 'none');
        $("#Menu_Edit_Cell_Border_Style").css('display', 'block');
        $("#Menu_Edit_Cell_Border_Style_Option").css('display', 'block');
    });
    $("#Back_to_Menu_Edit_Cell_Option_From_Border").click(function () {
        $(".Menu_Edit_Cell_Table_01_Option").css('display', 'block');
        $("#Menu_Edit_Cell_Border_Style").css('display', 'none');
        $("#Menu_Edit_Cell_Border_Style_Option").css('display', 'none');
    });

    $("#cell_newTable").click(function () {
        $("#Menu_Edit_Cell_Headers").css('display', 'block');
    });
    $("#To_Menu_Edit_Cell_Text_Options").click(function () {
        $(".Menu_Edit_Cell_Table_01_Option").css('display', 'none');
        $("#Menu_Edit_Cell_Text_Options").css('display', 'block');
        $("#Menu_Edit_Cell_Text_Options_Opn").css('display', 'block');
    });
    $("#Back_to_Menu_Edit_Cell_Option_From_Text").click(function () {
        $(".Menu_Edit_Cell_Table_01_Option").css('display', 'block');
        $("#Menu_Edit_Cell_Text_Options").css('display', 'none');
        $("#Menu_Edit_Cell_Text_Options_Opn").css('display', 'none');
    });

    $("#To_Menu_Edit_Cell_Property_Option_Text_Font").click(function () {
        $("#Menu_Edit_Cell_Text_Options").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option_Text_Font_Body").css('display', 'block');
        $("#Menu_Edit_Cell_Property_Option_Text_Font").css('display', 'block');
    });
    $("#backToCellOptionFromFont").click(function () {
        $("#Menu_Edit_Cell_Text_Options").css('display', 'block');
        $("#Menu_Edit_Cell_Property_Option_Text_Font").css('display', 'none');
    });

    $("#To_Menu_Edit_Cell_Text_Color_Options").click(function () {
        $("#Menu_Edit_Cell_Text_Options").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option_Text_Color").css('display', 'block');
        $("#Menu_Edit_Cell_Text_Color_One").css('display', 'block');
        $("#Menu_Edit_Cell_Text_Color_Two").css('display', 'none');
    });
    $("#backToCellOptionFromColor").click(function () {
        $("#Menu_Edit_Cell_Text_Options").css('display', 'block');
        $("#Menu_Edit_Cell_Property_Option_Text_Color").css('display', 'none');
        $("#Menu_Edit_Cell_Text_Color_One").css('display', 'none');
    });
    $("#To_Menu_Edit_Cell_Text_Color_One").click(function () {
        $("#Menu_Edit_Cell_Text_Color_Two").css('display', 'none');
        $("#Menu_Edit_Cell_Text_Color_One").css('display', 'block');
    });
    $("#To_Menu_Edit_Cell_Text_Color_Two").click(function () {
        $("#Menu_Edit_Cell_Text_Color_One").css('display', 'none');
        $("#Menu_Edit_Cell_Text_Color_Two").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Table_Box").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_01").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Table_Box").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_01").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Menu_Edit_Cell_Property_Option_01").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_01_bak").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_02").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option_02").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_02_bak").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_03").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option_03").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Table_Option_03_bak").click(function () {
        $(".Menu_Edit_Cell_ToolBar").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option").css('display', 'block');
    });
    $("#Menu_Edit_Cell_To_Color_Option").click(function () {
        $("#Menu_Edit_Cell_Panel_Color_One").click(function () {
            $("#Menu_Edit_Cell_Table_01_Option_02").css('display', 'none');
            $("#Menu_Edit_Cell_Table_01_Option_01").css('display', 'block');
        });
        $("#Menu_Edit_Cell_Panel_Color_Two").click(function () {
            $("#Menu_Edit_Cell_Table_01_Option_01").css('display', 'none');
            $("#Menu_Edit_Cell_Table_01_Option_02").css('display', 'block');
        });
        $("#Menu_Edit_Cell_To_Table_Option_04_bak").click(function () {
            $(".Menu_Edit_Cell_Table_01_Option").css('display', 'block');
            $("#Menu_Edit_Cell_Property_Option_Table_Color").css('display', 'none');
        });
        $("#Menu_Edit_Cell_Table_01_Option_01").css('display', 'block');
        $(".Menu_Edit_Cell_Table_01_Option").css('display', 'none');
        $("#Menu_Edit_Cell_Property_Option_Table_Color").css('display', 'block');
        $("#Menu_Edit_Cell_Table_01_Option_01").css('display', 'block');
    });
    $("#Menu_Edit_Cell_Number_Panel").css('display', 'none');
    $("#Menu_Edit_Cell_Currency_Options").css('display', 'none');
    $("#Menu_Edit_Cell_Currency_Options_Symbol").css('display', 'none');
    $("#Menu_Edit_Cell_Percentage_Options").css('display', 'none');
    $("#Menu_Edit_Cell_Date_Time_Options").css('display', 'none');
    $("#Menu_Edit_Cell_Duration_Options").css('display', 'none');
    $("#Menu_Edit_Cell_Border_Style").css('display', 'none');
    $("#Menu_Edit_Cell_Text_Options").css('display', 'none');
    $("#Menu_Edit_Cell_Property_Option_Text_Color").css('display', 'none');

    registerCellListener();
}

// regist listener
function registerCellListener() {

    // add table style`s click function
    $('#Menu_Edit_Cell_Table_Box .table_insert_tableDivStyle img').click(function () {
        var data = {};
        data.flag = "table";
        data.src = $(this).attr('src');
        // alert(data.src);
        // $('#Menu_Edit_Cell_Table_Box div
        // .table_insert_tableDivStyle').css('border','2px solid
        // #eeeeee');
        // $(this).parent().css('border','2px solid #8DDF48');
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // add table name`s click function
    $('#Menu_Edit_Cell_Table_Option_TableName_Radio .ui-button').click(function () {
        var data = {};
        data.flag = "table";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.tableName = true;
            } else {
                data.tableName = false;
            }
            // alert("Table Name :"+data.tableName);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // add table border`s click function
    $('#Menu_Edit_Cell_Table_Option_TableBorder_Radio .ui-button').click(function () {
        var data = {};
        data.flag = "table";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.tableBorder = true;
            } else {
                data.tableBorder = false;
            }
            // alert("Table Border :"+data.tableBorder);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // add alternating rows`s click function
    $('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio .ui-button').click(function () {
        var data = {};
        data.flag = "table";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.alternatingRows = true;
            } else {
                data.alternatingRows = false;
            }
            // alert("Alternating Rows :"+data.alternatingRows);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // add horizontal lines`s click function
    $('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio .ui-button').click(function () {
        var data = {};
        data.flag = "table";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.horizontalLines = true;
            } else {
                data.horizontalLines = false;
            }
            // alert("Horizontal Lines :"+data.horizontalLines);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // add header column lines`s click function
    $('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio .ui-button').click(
			function () {
			    var data = {};
			    data.flag = "table";
			    var cmd = $(this).attr('for');
			    if (cmd) {
			        if (cmd.indexOf("-shadow-off") == -1) {
			            data.headerColumnLines = true;
			        } else {
			            data.headerColumnLines = false;
			        }
			        // alert("Header Column Lines :"+data.headerColumnLines);
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			    }
			});

    // add vertical lines`s click function
    $('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio .ui-button').click(
			function () {
			    var data = {};
			    data.flag = "table";
			    var cmd = $(this).attr('for');
			    if (cmd) {
			        if (cmd.indexOf("-shadow-off") == -1) {
			            data.verticalLines = true;
			        } else {
			            data.verticalLines = false;
			        }
			        // alert("Vertical Lines :"+data.verticalLines);
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			    }
			});

    // add header rows`s change function
    $('#Menu_Edit_Cell_Header_HeaderRows_Size')
			.change(function () {
			    if (currentSelectedObj) {

			        // get parent node
			        parentNodeElement = com.kenny.util.NodeCache
							.items(currentSelectedObj.getDomInstance().parentNode.id);
			        if (parentNodeElement.getRows()) {
			            $('#Menu_Edit_Cell_Header_FooterRows_Size').children()
								.remove();

			            if (Number(this.value) > 0
								&& Number(parentNodeElement.getFooterRows()) > 0) {
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'display', 'block');
			                $('#Menu_Edit_TableAll_Table_HeaderRowLines').css(
									'border-bottom', '1px solid #b2b2b2');
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', '1px solid #b2b2b2');
			            } else if (Number(this.value) > 0
								&& Number(parentNodeElement.getFooterRows()) == 0) {
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'display', 'block');
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'border-bottom', 'none');
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', '1px solid #b2b2b2');
			            } else if (Number(this.value) == 0
								&& Number(parentNodeElement.getFooterRows()) > 0) {
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'display', 'none');
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'border-bottom', 'none');
			                $('#Menu_Edit_Cell_Table_FooterRowLines').css(
									'display', 'block');
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', '1px solid #b2b2b2');
			            } else if (Number(this.value) == 0
								&& Number(parentNodeElement.getFooterRows()) == 0) {
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'display', 'none');
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'border-bottom', 'none');
			                $('#Menu_Edit_Cell_Table_FooterRowLines').css(
									'display', 'none');
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', 'none');
			            }

			            if ((Number(parentNodeElement.getRows())
								- Number(parentNodeElement.getHeaderRows()) - Number(parentNodeElement
								.getFooterRows())) > 5) {
			                for (var i = 0; i < 6; i++) {
			                    $('#Menu_Edit_Cell_Header_FooterRows_Size')
										.append(
												'<option value = ' + i + '>'
														+ i + ' </option>');
			                }
			            } else {
			                var j = (Number(parentNodeElement.getRows()) - Number(this.value));
			                if (j > 5) {
			                    j = 6;
			                }
			                for (var i = 0; i < j; i++) {
			                    $('#Menu_Edit_Cell_Header_FooterRows_Size')
										.append(
												'<option value = ' + i + '>'
														+ i + ' </option>');
			                }
			            }

			            $('#Menu_Edit_Cell_Header_FooterRows_Size').attr(
								'value', parentNodeElement.getFooterRows());
			        }
			        var data = {};
			        data.flag = "headers";
			        data.headerRows = Number(this.value);
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							parentNodeElement, data);

			    }

			});

    // add freeze rows`s click function
    $('#Menu_Edit_Cell_Headers_Freeze_Rows .ui-button').click(function () {
        var data = {};
        data.flag = "headers";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.freezeRows = true;
            } else {
                data.freezeRows = false;
            }
            // alert("Freeze Rows :"+data.freezeRows);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
        }
    });

    // add header columns`s change function
    $('#Menu_Edit_Cell_Header_HeaderColumns_Size').change(
			function () {

			    if (Number(this.value) == 0) {
			        $('#Menu_Edit_Cell_HeaderColumnLines').css('display',
							'none');
			        $('#Menu_Edit_Cell_HorizontalLines').css('border-bottom',
							'none');
			    }
			    if (Number(this.value) > 0) {
			        $('#Menu_Edit_Cell_HeaderColumnLines').css('display',
							'block');
			        $('#Menu_Edit_Cell_HorizontalLines').css('border-bottom',
							'1px solid #b2b2b2');
			    }
			    var data = {};
			    data.flag = "headers";
			    data.headerColumns = Number(this.value);
			    sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
						currentSelectedObj, data);
			});

    // add freeze columns`s click function
    $('#Menu_Edit_Cell_Headers_Freeze_Columns .ui-button').click(function () {
        var data = {};
        data.flag = "headers";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.freezeColumns = true;
            } else {
                data.freezeColumns = false;
            }
            // alert("Freeze Columns :"+data.freezeColumns);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
        }
    });

    // add footer rows`s change function
    $('#Menu_Edit_Cell_Header_FooterRows_Size')
			.change(function () {
			    if (currentSelectedObj) {
			        // get parent node
			        parentNodeElement = com.kenny.util.NodeCache
							.items(currentSelectedObj.getDomInstance().parentNode.id);
			        if (parentNodeElement.getRows()) {
			            $('#Menu_Edit_Cell_Header_HeaderRows_Size').children()
								.remove();

			            if (Number(this.value) > 0) {
			                $('#Menu_Edit_Cell_Table_FooterRowLines').css(
									'display', 'block');
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'border-bottom', '1px solid #b2b2b2');
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', '1px solid #b2b2b2');
			            } else {
			                $('#Menu_Edit_Cell_Table_FooterRowLines').css(
									'display', 'none');
			                $('#Menu_Edit_Cell_Table_HeaderRowLines').css(
									'border-bottom', 'none');
			            }
			            if (Number(this.value) == 0
								&& Number(parentNodeElement.getHeaderRows()) == 0) {
			                $('#Menu_Edit_Cell_Table_01_Option_Item_to_grid')
									.css('border-bottom', 'none');
			            }

			            if ((Number(parentNodeElement.getRows())
								- Number(parentNodeElement.getHeaderRows()) - Number(parentNodeElement
								.getFooterRows())) > 5) {
			                for (var i = 0; i < 6; i++) {
			                    $('#Menu_Edit_Cell_Header_HeaderRows_Size')
										.append(
												'<option value = ' + i + '>'
														+ i + ' </option>');
			                }
			            } else {
			                var j = ((Number(parentNodeElement.getRows()) - Number(this.value)));
			                if (j > 5) {
			                    j = 6;
			                }
			                for (var i = 0; i < j; i++) {
			                    $('#Menu_Edit_Cell_Header_HeaderRows_Size')
										.append(
												'<option value = ' + i + '>'
														+ i + ' </option>');
			                }
			            }
			            $('#Menu_Edit_Cell_Header_HeaderRows_Size').attr(
								'value', parentNodeElement.getHeaderRows());
			        }
			        var data = {};
			        data.flag = "headers";
			        data.footerRows = Number(this.value);
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							parentNodeElement, data);
			    }

			});

    // add text size`s click function
    $(
			'#Menu_Edit_Cell_Table_01_Option_Item_TextSize_Checkbox .ui-widget-content')
			.click(function () {
			    var data = {};
			    data.flag = "table";
			    data.textSize = $(this).attr('propertyName');
			    // alert("Text Size :"+data.textSize);
			    $('#Menu_Cell_TextSize').text(data.textSize + ' >');
			    $(".Item_Property").children('img').remove();
			    // $(this).children(".Item_Property").append('<input
			    // type="checkbox" class="item_selected" checked="true"
			    // disabled="true">');
			    $(this)
							.children(".Item_Property")
							.append(
									'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // add table font`s click function
    $(
			'#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox .ui-widget-content')
			.click(function () {
			    var data = {};
			    data.flag = "table";
			    data.tableFont = $(this).attr('propertyName');
			    // alert("Table Font :"+data.tableFont);
			    $('#Menu_Cell_TableFont').text(data.tableFont + ' >');
			    $(".Item_Property").children('img').remove();
			    // $(this).children(".Item_Property").append('<input
			    // type="checkbox" class="item_selected" checked="true"
			    // disabled="true">');
			    $(this)
							.children(".Item_Property")
							.append(
									'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // -----------------------------------bind table cell click
    // function---------------------------------------------------------
    // add cell`s text style click function
    $('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton .ui-button').click(
			function () {
			    var data = {};
			    data.flag = "cell";
			    var cmd = $(this).attr('commamd');
			    if (cmd) {
			        var isChecked = false;
			        if ($(this).attr('aria-pressed') != "true") {
			            isChecked = true;
			        }
			        switch (cmd) {
			            case 'bold':
			                data.bold = isChecked;
			                refreshRulerMenuSelectedBIU(cmd, isChecked);
			                break;
			            case 'italic':
			                data.italic = isChecked;
			                refreshRulerMenuSelectedBIU(cmd, isChecked);
			                break;
			            case 'underscore':
			                data.underscore = isChecked;
			                refreshRulerMenuSelectedBIU('underline', isChecked);
			                break;
			            case 'deleteLine':
			                data.deleteLine = isChecked;
			                break;
			        }
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			    }
			});

    // add test size change function
    $('#Menu_Edit_Cell_Text_Size').change(function () {
        var data = {};
        data.flag = "cell";
        data.textSize = Number(this.value);
        // alert("data.textSize :"+data.textSize);
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
    });

    // add cell`s text option`s color click function
    $('#Menu_Edit_Cell_Property_Option_Text_Color div .color_box_text')
			.click(function () {
			    var data = {};
			    data.flag = "cell";
			    var cmd = $(this).attr('colorvalue');
			    // $('.color_is_picked').css('background', 'none');
			    $(".color_is_picked").children('img').remove();
			    // $(this).children(".color_is_picked").append('<input
			    // type="checkbox" checked="true" disabled="true">');
			    $(this)
							.children(".color_is_picked")
							.append(
									'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');

			    data.textColor = cmd;
			    // alert("data.textColor :"+data.textColor);
			    $('#To_Menu_Edit_Cell_Text_Color_Options').css(
							'background', data.textColor).css('border',
							'1px solid #b2b2b2');

			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // add table cell font`s click function
    $('#Menu_Edit_Cell_Text_Option_Text_Font_Checkbox .ui-widget-content')
			.click(function () {
			    var data = {};
			    data.flag = "cell";
			    var property = $(this).attr('propertyname');
			    data.textFont = property;
			    // alert("data.textFont :"+data.textFont );
			    $('#cell_text_font_family').text(data.textFont + ' >');
			    $(".Item_Property").children('img').remove();
			    // $(this).children(".Item_Property").append('<input
			    // type="checkbox" class="item_selected" checked="true"
			    // disabled="true">');
			    $(this)
							.children(".Item_Property")
							.append(
									'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // add cell`s horizontal align click function
    $('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button .ui-button').click(
			function () {
			    var cmd = $(this).attr('commamd');
			    if (cmd) {
			        refreshRulerMenuAlign(cmd);
			        var data = {
			            'flag': "cell",
			            'horizontalAlign': cmd
			        }
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			    }
			    /*
			    * var data = {}; data.flag = "cell"; var cmd =
			    * $(this).attr('commamd'); if (cmd) { var isChecked = false; if
			    * ($(this).attr('aria-pressed') == "true") { isChecked = true; }
			    * switch (cmd) { case 'left': data.horizontalAlign="left";
			    * //data.horizontalAlignLeft = isChecked;
			    * refreshRulerMenuAlign(cmd); break; case 'center':
			    * data.horizontalAlign="center"; //data.horizontalAlignCenter =
			    * isChecked; refreshRulerMenuAlign(cmd); break; case 'right':
			    * data.horizontalAlign="right"; //data.horizontalAlignRight =
			    * isChecked; refreshRulerMenuAlign(cmd); break; case
			    * 'ajustment': data.horizontalAlign="justify";
			    * //data.horizontalAlignAjustment = isChecked;
			    * refreshRulerMenuAlign('justify'); break; }
			    * sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
			    * currentSelectedObj, data); }
			    */
			});

    // add cell`s vertical align click function
    $('#Menu_Edit_Cell_Cells_Align_Right_Radio_Button .ui-button').click(
			function () {
			    var data = {};
			    data.flag = "cell";
			    var cmd = $(this).attr('commamd');
			    if (cmd) {
			        var isChecked = false;
			        if ($(this).attr('aria-pressed') == "true") {
			            isChecked = true;
			        }
			        switch (cmd) {
			            case 'top':
			                data.verticalAlignTop = isChecked;
			                // alert(" data.verticalAlignTop: "+
			                // data.verticalAlignTop);
			                break;
			            case 'center':
			                data.verticalAlignCenter = isChecked;
			                // alert(" data.verticalAlignCenter: "+
			                // data.verticalAlignCenter);
			                break;
			            case 'down':
			                data.verticalAlignDown = isChecked;
			                // alert(" data.verticalAlignDown: "+
			                // data.verticalAlignDown);
			                break;
			        }
			        sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			    }
			});

    // add cell`s cell option`s color click function
    $('#Menu_Edit_Cell_Property_Option_Table_Color div .color_box_cell')
			.click(function () {
			    var fillColor = $(this).attr('colorvalue');
			    // $('.color_is_picked').css('background', 'none');
			    // $(this).children(".color_is_picked").css('background',
			    // '#ff6600');
			    $(".color_is_picked").children('img').remove();
			    // $(this).children(".color_is_picked").append('<input
			    // type="checkbox" checked="true" disabled="true">');
			    $(this)
							.children(".color_is_picked")
							.append(
									'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');
			    if (fillColor) {
			        // edit_menu_table_cell_property.cell.fillColor = cmd;
			        var data = {
			            'fillColor': fillColor
			        };
			        $('#Menu_Edit_Cell_To_Color_Option').css('background',
								fillColor).css('border', '1px solid #b2b2b2');
			        sendMessage(
								com.kenny.util.Observer.MessageType.CELL_CHANGED,
								currentSelectedObj, data);
			    }
			});

    // Fill Color Option`s No Fill function
    $('#Menu_Edit_FillColor_No_Fill')
			.click(function () {
			    var fillColor = '#ffffff';
			    // $('.color_is_picked').css('background', 'none');
			    // $(this).children(".color_is_picked").css('background',
			    // '#ff6600');
			    $(".color_is_picked").children('img').remove();
			    // $(this).children(".color_is_picked").append('<input
			    // type="checkbox" checked="true" disabled="true">');
			    $(this)
							.children(".color_is_picked")
							.append(
									'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');
			    var data = {
			        'fillColor': 'fillColor'
			    };
			    $('#Menu_Edit_Cell_To_Color_Option').css('background',
							fillColor).css('border', '1px solid #b2b2b2');
			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // Fill Color Option`s Reset to Style function
    $('#Menu_Edit_FillColor_Reset_To_Style').click(function () {
        var fillColor = '#ffffff';
        $(".color_is_picked").children('input').remove();
        // $('.color_is_picked').css('background', 'none');
        // $(this).children(".color_is_picked").css('background',
        // '#ff6600');
        var data = {
            'fillColor': 'fillColor'
        };
        $('#Menu_Edit_Cell_To_Color_Option').css('background', fillColor)
					.css('border', '1px solid #b2b2b2');
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
    });

    // Cell Border Style
    $('#Menu_Edit_Cell_Cells_01_TextSize_Border_Style li')
			.click(function () {
			    var property = $(this).attr('stylename');
			    var data = {};
			    if (property) {
			        data.borderStyle = property;
			    }
			    $(".Item_Property").children('img').remove();
			    // $(this).children(".Item_Property").append('<input
			    // type="checkbox" class="item_selected" checked="true"
			    // disabled="true">');
			    $(this)
							.children(".Item_Property")
							.append(
									'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
			    // var currentStyle=
			    // $(this).children(".Item_Title").children('div').attr("class");
			    $('#border_option').addClass(
							$(this).children(".Item_Title").children('div')
									.attr("class"));
			    // alert(currentStyle);
			    sendMessage(
							com.kenny.util.Observer.MessageType.CELL_CHANGED,
							currentSelectedObj, data);
			});

    // set Wrap Text in Cell click function
    $('#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell .ui-button').click(function () {
        var data = {};
        data.flag = "cell";
        var cmd = $(this).attr('for');
        if (cmd) {
            if (cmd.indexOf("-shadow-off") == -1) {
                data.wrapTextInCell = true;
            } else {
                data.wrapTextInCell = false;
            }
            // alert("data.wrapTextInCell :"+data.wrapTextInCell);
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
        }
    });

    // =======1704 cell format setting (CELL_CHANGED)=================
    $('#Menu_Edit_Cell_Format_Checkbox li').click(function () {
        var formatName = $(this).attr("formatName");
        var currentText = currentSelectedObj._domInstance.children[0].innerHTML;
        var currentND;
        var currentSP;
        //console.info(currentSelectedObj.getFormat());
        $(".isCheckedFlg").children('img').remove();
        $(this).children(".format_title_left").children(".isCheckedFlg").append('<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');
        if (!currentSelectedObj.getFormat()) {
            if (currentText.indexOf(".") != -1) {
                if (currentText.indexOf("E") == -1) {
                    currentND = currentText.length - currentText.indexOf(".") - 1;
                } else {
                    currentND = currentText.indexOf("E") - currentText.indexOf(".") - 1;
                }
            } else {
                currentND = 2;
            }
        } else {
            var name = currentSelectedObj.getFormat().name;
            switch (name) {
                case "Number":
                    currentND = currentSelectedObj.getFormat().formatOptions.numDecimal;
                    var currentDecimal;
                    if (currentSelectedObj.getFormat().formatOptions.numDecimal) {
                        currentND = currentSelectedObj.getFormat().formatOptions.numDecimal;
                    } else {
                        currentND = currentSelectedObj.getFormat().formatOptions.sciDecimal;
                    }
            }
        }
        if (null == currentSelectedObj.getFormat()) {
            currentSP = false;
        } else {
            if (currentSelectedObj.getFormat().formatOptions) {
                currentSP = currentSelectedObj.getFormat().formatOptions.separator;
            } else {
                currentSP = false;
            }
        }

        if (formatName) {
            var data = {};
            switch (formatName) {
                case "Number":
                    data = {
                        'name': 'Number',
                        'formatOptions': {
                            'numDecimal': currentND,
                            'separator': currentSP,
                            'minusStyle': 'MBN', // None-Red-None Minus-Black-None None-Black-Bracket None-Red-Bracket
                            'sciDecimal': null,
                            'stylename': null  // FractionOne FractionTwo FractionThree Halves Quarters Eighths Sixteenths Tenths Hundredths
                        }
                    };
                    $('#Menu_Edit_Cell_Table_01_Option_Decimals')[0].options.selectedIndex = currentND;
                    $('#Menu_Edit_Cell_Table_01_Option_Scientific_Decimals')[0].options.selectedIndex = currentND;
                    if (true == currentSP) {
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[1].attributes[1].nodeValue = 'true';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[3].attributes[1].nodeValue = 'false';
                    } else {
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[1].attributes[1].nodeValue = 'false';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_NumberOptioin_Number_Separator')[0].children[3].attributes[1].nodeValue = 'true';
                    }
                    break;
                case "Currency":
                    data = {
                        'name': 'Currency',
                        'formatOptions': {
                            'curDecimal': 2,
                            'separator': currentSP,
                            'accountstyle': false,
                            'minusStyle': 'MBN', // None-Red-None Minus-Black-None None-Black-Bracket None-Red-Bracket
                            'dollorType': 'ChineseRMB'
                        }
                    };
                    if (true == currentSP) {
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[1].attributes[1].nodeValue = 'true';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[3].attributes[1].nodeValue = 'false';
                    } else {
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[1].attributes[1].nodeValue = 'false';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_Separator')[0].children[3].attributes[1].nodeValue = 'true';
                    }
                    if (null != currentSelectedObj.getFormat()) {
                        if (true == currentSelectedObj.getFormat().formatOptions.accountstyle) {
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only ui-state-active';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].attributes[1].nodeValue = 'true';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].attributes[1].nodeValue = 'false';
                        } else {
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].attributes[1].nodeValue = 'false';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only ui-state-active';
                            $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].attributes[1].nodeValue = 'true';
                        }
                    } else {
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[1].attributes[1].nodeValue = 'false';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_CurrencyOptions_AccountingStyle')[0].children[3].attributes[1].nodeValue = 'true';
                    }
                    break;
                case "Percentage":
                    data = {
                        'name': 'Percentage',
                        'formatOptions': {
                            'perDecimal': 2,
                            'separator': currentSP,
                            'minusStyle': null  // None-Red-None Minus-Black-None None-Black-Bracket None-Red-Bracket
                        }
                    };
                    if (true == currentSP) {
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[1].attributes[1].nodeValue = 'true';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[3].attributes[1].nodeValue = 'false';
                    } else {
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[1].className = 'ui-button ui-widget ui-state-default ui-corner-left ui-button-text-only';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[1].attributes[1].nodeValue = 'false';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[3].className = 'ui-button ui-widget ui-state-default ui-corner-right ui-button-text-only ui-state-active';
                        $('#Menu_Edit_Cell_Format_Percentage_Options_Separator')[0].children[3].attributes[1].nodeValue = 'true';
                    }
                    break;
                case "DateTime":
                    data = {
                        'name': 'DateTime',
                        'formatOptions': {
                            'dateStyle': 'None',
                            'timeStyle': null  // Long_ Short_ Local_ ...
                        }
                    };
                    break;
                case "Duration":
                    data = {
                        'name': 'Duration',
                        'formatOptions': {
                            'durStyle': 'H', // Wk-Day-Hr-Min-Sec-Ms Day-Hr-Min
                            'durType': 'None' // None Short Long
                        }
                    };
                    break;
                case "CheckBox":
                    data = {
                        'name': 'CheckBox',
                        'formatOptions': null
                    };
                    break;

                case "StarRating":
                    data = {
                        'name': 'StarRating',
                        'formatOptions': null
                    };
                    break;

                case "Text":
                    data = {
                        'name': 'Text',
                        'formatOptions': null
                    };
                    break;
            }
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // ------------------------------Number--------------------------------

    // Number Decimal
    $('#Menu_Edit_Cell_Table_01_Option_Decimals').change(function () {
        var numDecimal = $(this).attr('value');
        $('#Menu_Edit_Cell_Table_01_Option_Scientific_Decimals')[0].options.selectedIndex = numDecimal;
        if (numDecimal) {
            var data = {
                'name': 'Number',
                'formatOptions': {
                    'numDecimal': numDecimal
                }
            };
            // alert("decimalsFormat" + "({'value': '-14.001',
            // 'decimal':'" + decimal + "')");
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // Number Separator ON
    $('#menu-tablecell-format-numberoptioin-number-separator-shadow-on').click(function () {
        var data = {
            'name': 'Number',
            'formatOptions': {
                'separator': true
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        // alert("formatSeparator" + "({'value':
        // 'parseFloat(15.777)')");
    });

    // Number Separator OFF
    $('#menu-tablecell-format-numberoptioin-number-separator-shadow-off').click(function () {
        var data = {
            'name': 'Number',
            'formatOptions': {
                'separator': false
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        // alert("formatNotSeparator" + "({'value':
        // 'parseFloat(16.777)')");
    });

    // Number Display formate (negative)
    $('#Menu_Edit_Cell_Format_NumberOptions_Number_Checkbox li').click(function () {
        var minusStyle = $(this).attr('minusStyle');
        if (minusStyle) {
            var data = {
                'name': 'Number',
                'formatOptions': {
                    'minusStyle': minusStyle
                }
            };
            $(".Item_Property").children('img').remove();
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // Number Scientific Decimal
    $('#Menu_Edit_Cell_Table_01_Option_Scientific_Decimals').change(function () {
        var sciDecimal = $(this).attr('value');
        $('#Menu_Edit_Cell_Table_01_Option_Decimals')[0].options.selectedIndex = sciDecimal;
        if (sciDecimal) {
            // scientificTabFormat" + "({'value': '-18.001',
            // 'sciDecimal':'" + sciDecimal + "')")
            var data = {
                'name': 'Number',
                'formatOptions': {
                    'sciDecimal': sciDecimal
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // Number Fraction Transaction
    $('#Menu_Edit_Cell_Format_NumberOptions_Fraction_Checkbox li').click(function () {
        // test
        var styleName = $(this).attr('styleName');
        if (styleName) {
            // alert("StartFractionFormat" + "({'value': '-19.3',
            // 'styleName':'" + stylename + "')");
            var data = {
                'name': 'Number',
                'formatOptions': {
                    'styleName': styleName
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            // $(this).children(".Item_Property").append('<input
            // type="checkbox" class="item_selected" checked="true"
            // disabled="true">');
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });

    // --------------------------------- Currency -----------------------------------
    // Currency Decimal
    $('#Menu_Edit_Cell_CurrencyOptions_Decimals_Options').change(function () {
        var curDecimal = $(this).attr('value');
        if (curDecimal) {
            var data = {
                'name': "Currency",
                'formatOptions': {
                    'curDecimal': curDecimal
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // Currency Separator ON
    $('#menu-tablecell-format-currencyoptions-separator-shadow-on').click(function () {
        var data = {
            'name': "Currency",
            'formatOptions': {
                'separator': true
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Currency Separator OFF
    $('#menu-tablecell-format-currencyoptions-separator-shadow-off').click(function () {
        var data = {
            'name': "Currency",
            'formatOptions': {
                'separator': false
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Currency AccountStyle ON
    $("#menu-tablecell-format-currencyoptions-accountingstyle-shadow-on").click(function (e) {
        $('#Menu_Edit_Cell_Format_AccountingStyle').slideUp("slow");
        var data = {
            'name': "Currency",
            'formatOptions': {
                'accountstyle': true
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Currency AccountStyle OFF
    $("#menu-tablecell-format-currencyoptions-accountingstyle-shadow-off").click(function (e) {
        $('#Menu_Edit_Cell_Format_AccountingStyle').slideDown("slow");
        var data = {
            'name': "Currency",
            'formatOptions': {
                'accountstyle': false
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Currency Symbol
    $('#Menu_Edit_Cell_Format_CurrencySymbol_Checkbox .ui-widget-content').click(function () {
        var dollorType = $(this).attr("dollorType");
        if (dollorType) {
            var data = {
                'name': "Currency",
                'formatOptions': {
                    'dollorType': dollorType
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            // $(this).children(".Item_Property").append('<input
            // type="checkbox" class="item_selected"
            // checked="true" disabled="true">');
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
            $('#Menu_Edit_Cell_To_Currency_Symbol').text($(this).find("span:first").text() + '  >');
        }
    });
    // Currency minusStyle
    $('#Menu_Edit_Cell_Format_CurrencyOptions_Checkbox .ui-widget-content').click(function () {
        var minusStyle = $(this).attr('minusStyle');
        if (minusStyle) {
            var data = {
                'name': "Currency",
                'formatOptions': {
                    'minusStyle': minusStyle
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });

    // ---------------------------------Percentage-----------------------------------
    // Percentage perDecimal
    $('#Menu_Edit_Cell_Percentage_Options_Size').change(function () {
        var perDecimal = $(this).attr('value');
        if (perDecimal) {
            var data = {
                'name': "Percentage",
                'formatOptions': {
                    'perDecimal': perDecimal
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
        }
    });

    // Percentage Separator ON
    $('#menu-tablecell-format-percentageoptions-separator-shadow-on').click(function () {
        var data = {
            'name': "Percentage",
            'formatOptions': {
                'separator': true
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Percentage Separator OFF
    $('#menu-tablecell-format-percentageoptions-separator-shadow-off').click(function () {
        var data = {
            'name': "Percentage",
            'formatOptions': {
                'separator': false
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);
    });

    // Percentage Foramt style
    $('#Menu_Edit_Cell_Format_percentageOptions_Checkbox .ui-widget-content').click(function () {
        var minusStyle = $(this).attr('minusStyle');
        if (minusStyle) {
            var data = {
                'name': "Percentage",
                'formatOptions': {
                    'minusStyle': minusStyle
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });

    // ---------------------------------DateTime-----------------------------------
    // add Date & Time Options click function
    $('#Menu_Edit_Cell_Format_DateOptions_Checkbox li').click(function () {
        var dateStyle = $(this).attr('dateStyle');
        if (dateStyle) {
            var data = {
                'name': "DateTime",
                'formatOptions': {
                    'dateStyle': dateStyle
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            // $(this).children(".Item_Property").append('<input
            // type="checkbox" class="item_selected"
            // checked="true" disabled="true">');
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });

    $('#Menu_Edit_Cell_Format_TimeOptions_Checkbox li').click(function () {
        var timeStyle = $(this).attr('timeStyle');
        if (timeStyle) {
            var data = {
                'name': "DateTime",
                'formatOptions': {
                    'timeStyle': timeStyle
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            // $(this).children(".Item_Property").append('<input
            // type="checkbox" class="item_selected"
            // checked="true" disabled="true">');
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });

    // ---------------------------------Duration-----------------------------------
    // //
    $('#Menu_Edit_Cell_Format_DurationOptions_Checkbox li').click(function () {
        var durType = $(this).attr("durType");
        if (durType != null) {
            var data = {
                'name': "Duration",
                'formatOptions': {
                    'durType': durType
                }
            };
            sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

            $(".Item_Property").children('img').remove();
            // $(this).children(".Item_Property").append('<input
            // type="checkbox" class="item_selected"
            // checked="checked" disabled="disabled">');
            $(this).children(".Item_Property").append('<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
        }
    });
    //
    $("#Menu_Edit_Cell_Table_Format_Duration_Right,#Menu_Edit_Cell_Table_Format_Duration_Left").mousedown(function (e) {
        var initPositionX = e.pageX;
        var initLeft = com.kenny.util.BaseTool.convertPixelToNumber($("#Menu_Edit_Cell_Table_Format_Duration_Left").css('left'));
        var initRight = com.kenny.util.BaseTool.convertPixelToNumber($("#Menu_Edit_Cell_Table_Format_Duration_Right").css('left'));
        var initWidth = com.kenny.util.BaseTool.convertPixelToNumber($("#Menu_Edit_Cell_Table_Format_Duration_Top").css('width'));
        var moveDistance = 0;
        var moveObj = $(this);
        $("#Menu_Edit_Cell_Table_Format_Duration_SettingPannel").bind('mousemove', function mouseMove(e) {
            moveDistance = e.pageX - initPositionX;
            if (moveObj.attr("id") == "Menu_Edit_Cell_Table_Format_Duration_Right") {
                if ((initRight + moveDistance) < 250 && (initRight + moveDistance - initLeft) > 40) {
                    moveObj.css('left', initRight + moveDistance);
                    $("#Menu_Edit_Cell_Table_Format_Duration_Top,#Menu_Edit_Cell_Table_Format_Duration_Bottom").css('width', initWidth + moveDistance).css('left', initLeft);
                }
            } else {
                if ((initLeft + moveDistance) > -1 && (initRight - (initLeft + moveDistance)) > 40) {
                    moveObj.css('left', initLeft + moveDistance);
                    $("#Menu_Edit_Cell_Table_Format_Duration_Top,#Menu_Edit_Cell_Table_Format_Duration_Bottom").css('width', initWidth - moveDistance).css('left', initLeft + moveDistance);
                }
            }
        });
    }).mouseup(function () {
        $("#Menu_Edit_Cell_Table_Format_Duration_SettingPannel").unbind('mousemove');
        var durationStyleArray = ['Wk', 'Day', 'Hr', 'Min', 'Sec', 'Ms'];
        var durStyle = ['W', 'D', 'H', 'M', 'S', 'MS'];
        var currLeft = com.kenny.util.BaseTool.convertPixelToNumber($("#Menu_Edit_Cell_Table_Format_Duration_Left").css('left'));
        var currRight = com.kenny.util.BaseTool.convertPixelToNumber($("#Menu_Edit_Cell_Table_Format_Duration_Right").css('left'));
        // 取整
        var newLeftIndex = Math.round(currLeft / 40);
        var newRightIndex = Math.round(currRight / 40);
        $("#Menu_Edit_Cell_Table_Format_Duration_Left").css('left', newLeftIndex * 40);
        $("#Menu_Edit_Cell_Table_Format_Duration_Right").css('left', newRightIndex * 40);
        $("#Menu_Edit_Cell_Table_Format_Duration_Top,#Menu_Edit_Cell_Table_Format_Duration_Bottom").css('width', (newRightIndex - newLeftIndex) * 40).css('left', newLeftIndex * 40);
        var durationStyleShow = "";
        var durStyleStr = "";
        for (var index = newLeftIndex; index < newRightIndex; index++) {
            durationStyleShow += " 0 " + durationStyleArray[index];
            durStyleStr += "-" + durStyle[index];
        }
        var data = {
            'name': "Duration",
            'formatOptions': {
                'durStyle': durStyleStr.substring(1, durStyleStr.length)
            }
        };
        sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED, currentSelectedObj, data);

        $('#Menu_Edit_Cell_Table_Format_Duration_Result').text(durationStyleShow);
    });
}
// /===================================================================

function tabChange(obj, id) {
	var tabLi = obj.parentNode.getElementsByTagName("li");
	var Menu_Edit_Cell_Tab_Contents = document.getElementById(id)
			.getElementsByTagName("ul");
	var tabId = 0;
	for ( var i = 0; i < Menu_Edit_Cell_Tab_Contents.length; i++) {
		if (obj == tabLi[i]) {
			tabLi[i].className = "cli";
			Menu_Edit_Cell_Tab_Contents[i].className = "";
			tabId = i;
			var data;
			if (tabId == 0) {
				data = {
					'name' :'Number',
					'formatOptions' : {
						'numDecimal' :$(
								"#Menu_Edit_Cell_Table_01_Option_Decimals")
								.attr('value')
					}
				};
			}
			if (tabId == 1) {
				data = {
					'name' :'Number',
					'formatOptions' : {
						'sciDecimal' :$(
								"#Menu_Edit_Cell_Table_01_Option_Scientific_Decimals")
								.attr('value')
					}
				};
			}
			if (tabId == 2) {
				data = {
					'name' :'Number',
					'formatOptions' : {
						'styleName' :'Hundredths'
					}
				};
			}
			sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
					currentSelectedObj, data);
		} else {
			tabLi[i].className = "";
			Menu_Edit_Cell_Tab_Contents[i].className = "hidden";
		}
	}
	// For format change.
	// formatTabChange(tabId);
}

/* update the menu state when a cell focused */
function updateCellMenu(objData) {
	if (currentSelectedObj) {

		// // get parent node
		parentNodeElement = com.kenny.util.BaseTool.findObjWithId(currentSelectedObj
				.getDomInstance().parentNode.id);
		// 
		// //alert("parentParentElement"+parentParentElement.getType());
		// $('#newShape').css('display','none');
		// $('#Menu_Edit_Cell_Format').css('display','none');
		// $('#Menu_Edit_Cell_TableName').css('display','none');
		// $('#Menu_Edit_Cell_FreezeRows').css('display','none');
		// $('#Menu_Edit_Cell_FreezeColumns').css('display','none');
		// $('#Menu_Edit_Cell_HeaderRows').css('border','none');
		// $('#Menu_Edit_Cell_HeaderColumns').css('border','none');

		$(".Item_Property").children('img').remove();
		$(".color_is_picked").children('img').remove();
		// set headers
		$('#Menu_Edit_Cell_Header_HeaderRows_Size').children().remove();
		$('#Menu_Edit_Cell_Header_HeaderColumns_Size').children().remove();
		$('#Menu_Edit_Cell_Header_FooterRows_Size').children().remove();

		if (Number(parentNodeElement.getHeaderCols()) > 0) {
			$('#Menu_Edit_Cell_HeaderColumnLines').css('display', 'block');
			$('#Menu_Edit_Cell_HorizontalLines').css('border-bottom',
					'1px solid #b2b2b2');
		} else {
			$('#Menu_Edit_Cell_HeaderColumnLines').css('display', 'none');
			$('#Menu_Edit_Cell_HorizontalLines').css('border-bottom', 'none');
		}

		if (Number(parentNodeElement.getHeaderRows()) > 0) {
			$('#Menu_Edit_Cell_Table_HeaderRowLines').css('display', 'block');
			$('#Menu_Edit_Cell_Table_01_Option_Item_to_grid').css(
					'border-bottom', '1px solid #b2b2b2');
			$('#Menu_Edit_Cell_Table_HeaderRowLines').css('border-bottom',
					'none');
		} else {
			$('#Menu_Edit_Cell_Table_HeaderRowLines').css('display', 'none');
		}

		if (Number(parentNodeElement.getFooterRows()) > 0) {
			$('#Menu_Edit_Cell_Table_FooterRowLines').css('display', 'block');
			$('#Menu_Edit_Cell_Table_FooterRowLines').css('border-bottom',
					'none');
			$('#Menu_Edit_Cell_Table_HeaderRowLines').css('border-bottom',
					'1px solid #b2b2b2');
		} else {
			$('#Menu_Edit_Cell_Table_FooterRowLines').css('display', 'none');
		}
		if (Number(parentNodeElement.getFooterRows()) == 0
				&& Number(parentNodeElement.getHeaderRows()) == 0) {
			$('#Menu_Edit_Cell_Table_01_Option_Item_to_grid').css(
					'border-bottom', 'none');
		}

		if (parentNodeElement.getRows()) {
			if ((Number(parentNodeElement.getRows())
					- Number(parentNodeElement.getHeaderRows()) - Number(parentNodeElement
					.getFooterRows())) > 5) {
				for ( var i = 0; i < 6; i++) {
					$('#Menu_Edit_Cell_Header_HeaderRows_Size').append(
							'<option value = ' + i + '>' + i + ' </option>');
					$('#Menu_Edit_Cell_Header_FooterRows_Size').append(
							'<option value = ' + i + '>' + i + ' </option>');
				}
			} else {
				var j = Number(parentNodeElement.getRows())
						- Number(parentNodeElement.getFooterRows());
				var k = Number(parentNodeElement.getRows())
						- Number(parentNodeElement.getHeaderRows());
				if (j > 5) {
					j = 6;
				}
				if (k > 5) {
					k = 6;
				}

				// create elements
				for ( var i = 0; i < j; i++) {
					$('#Menu_Edit_Cell_Header_HeaderRows_Size').append(
							'<option value = ' + i + '>' + i + ' </option>');
				}
				for ( var i = 0; i < k; i++) {
					$('#Menu_Edit_Cell_Header_FooterRows_Size').append(
							'<option value = ' + i + '>' + i + ' </option>');
				}

			}
		}

		if (parentNodeElement.getCols()) {
			var closCount = 0;
			if (Number(parentNodeElement.getCols() > 4)) {
				closCount = 5;
			} else {
				closCount = Number(parentNodeElement.getCols());
			}
			for ( var i = 0; i < closCount; i++) {
				$('#Menu_Edit_Cell_Header_HeaderColumns_Size').append(
						'<option value = ' + i + '>' + i + ' </option>');
			}
		}
		$('#Menu_Edit_Cell_Header_HeaderRows_Size').attr('value',
				parentNodeElement.getHeaderRows());
		$('#Menu_Edit_Cell_Header_HeaderColumns_Size').attr('value',
				parentNodeElement.getHeaderCols());
		$('#Menu_Edit_Cell_Header_FooterRows_Size').attr('value',
				parentNodeElement.getFooterRows());

		// set Table Name
		if (parentNodeElement.getTableName()) {
			alert("parentNodeElement.getTableName()"
					+ parentNodeElement.getTableName());
		}

		// set Table Border

		// alert("Table Border: "+parentNodeElement.getTableBorder())
		$("#Menu_Edit_Cell_Table_Option_TableBorder_Radio").children().each(
				function(i) {
					$(this).removeClass('ui-state-active');
				});
		if (parentNodeElement.getTableBorder()) {
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(1).removeClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_TableBorder_Radio').children(
					'label').eq(0).removeClass('ui-state-active');
		}

		// set Alternating Rows
		// alert("parentNodeElement.getAlternatingRows()
		// :"+parentNodeElement.getAlternatingRows());
		// alert(typeof parentNodeElement.getAlternatingRows());
		$("#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio").children()
				.each( function(i) {
					$(this).removeClass('ui-state-active');
				});
		if (parentNodeElement.getAlternatingRows()) {
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(1).removeClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_AlternatingRows_Radio').children(
					'label').eq(0).removeClass('ui-state-active');
		}

		// set Horizontal Lines
		// alert("currentSelectedObj.getHorizontalLines():"+currentSelectedObj.getHorizontalLines());
		$("#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio").children()
				.each( function(i) {
					$(this).removeClass('ui-state-active');
				});
		if (parentNodeElement.getHorizontalLines()) {
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(1).removeClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_HorizontalLines_Radio').children(
					'label').eq(0).removeClass('ui-state-active');
		}

		// set Header Column Lines
		$("#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio").children()
				.each( function(i) {
					$(this).removeClass('ui-state-active');
				});
		if (parentNodeElement.getHeaderColumnLines()) {
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(1).removeClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_HeaderColumnLines_Radio').children(
					'label').eq(0).removeClass('ui-state-active');
		}
		// 
		// set Vertical Lines

		// alert("currentSelectedObj.getVerticalLines():"+currentSelectedObj.getVerticalLines());
		$("#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio").children().each(
				function(i) {
					$(this).removeClass('ui-state-active');
				});
		if (parentNodeElement.getVerticalLines()) {
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(0).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(1).removeClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(1).addClass('ui-state-active');
			$('#Menu_Edit_Cell_Table_Option_Vertical_Lines_Radio').children(
					'label').eq(0).removeClass('ui-state-active');
		}

		// set Table Font
		if (parentNodeElement.getFontFamily()) {
			// alert(parentNodeElement.getFontFamily());
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox")
					.children()
					.each(
							function(i) {
								if ($(this).attr('propertyName') == parentNodeElement
										.getFontFamily()) {
									$(this)
											.addClass(
													'ui-widget-content ui-selectee ui-selected');
								}
							});
		}

		// set table Text size
		// $("#Menu_Edit_Cell_Table_01_Option_Item_TextSize_Checkbox").children().each(
		// function(i) {
		// if($(this).attr('propertyname') == 'Medium') {
		// $(this).addClass('ui-widget-content ui-selectee ui-selected');
		// }
		// });

		$("#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton").children('label')
				.each( function() {
					// alert("this :"+$(this).attr('commamd'));
						$(this).removeClass('ui-state-active');
						// $(this).addClass('ui-state-default');
					});

		// set cell align
		if (currentSelectedObj.getFontWeight()) {
			// alert("currentSelectedObj.getFontWeight()"
			// +currentSelectedObj.getFontWeight());
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(0).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(0).attr('aria-pressed', 'false');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(0).addClass('ui-state-default');
		}

		if (currentSelectedObj.getFontStyle()) {
			// alert("currentSelectedObj.getFontStyle()"
			// +currentSelectedObj.getFontStyle());
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(1).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(1).attr('aria-pressed', 'false');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(1).addClass('ui-state-default');
		}

		if (currentSelectedObj.getUnderline()) {
			// alert("currentSelectedObj.getUnderline()"
			// +currentSelectedObj.getUnderline());
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(2).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(2).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(2).attr('aria-pressed', 'false');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(2).addClass('ui-state-default');
		}

		if (currentSelectedObj.getLineThrough()) {
			// alert("currentSelectedObj.getLineThrough()"
			// +currentSelectedObj.getLineThrough());
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).attr('aria-pressed', 'false');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).addClass('ui-state-default');
		}

		// set horizontal align
		$("#Menu_Edit_Cell_Cells_Align_Left_Radio_Button").children('label')
				.each( function() {
					// alert("this :"+$(this).attr('commamd'));
						$(this).removeClass('ui-state-active');
						// $(this).addClass('ui-state-default');
					});
		if (currentSelectedObj.getTextAlign()) {
			// alert("currentSelectedObj.getTextAlign()"
			// +currentSelectedObj.getTextAlign());
			if (currentSelectedObj.getTextAlign() == "left") {
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(0).attr('aria-pressed', 'true');
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(0).addClass('ui-state-active');
			} else if (currentSelectedObj.getTextAlign() == "center") {
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(1).attr('aria-pressed', 'true');
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(1).addClass('ui-state-active');
			} else if (currentSelectedObj.getTextAlign() == "right") {
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(2).attr('aria-pressed', 'true');
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(2).addClass('ui-state-active');
			} else if (currentSelectedObj.getTextAlign() == "justify") {
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(3).attr('aria-pressed', 'true');
				$('#Menu_Edit_Cell_Cells_Align_Left_Radio_Button').children(
						'label').eq(3).addClass('ui-state-active');
			}

			// $('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children('label').eq(3).attr('aria-pressed','true');
			// $('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children('label').eq(3).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).attr('aria-pressed', 'false');
			$('#Menu_Edit_Cell_Cells_FontStyle_MutiSelectButton').children(
					'label').eq(3).addClass('ui-state-default');
		}

		// set cell text size
		if (currentSelectedObj.getFontSize()) {
			// alert("currentSelectedObj.getFontSize()
			// :"+currentSelectedObj.getFontSize())
			$('#Menu_Edit_Cell_Text_Size').attr('value',
					currentSelectedObj.getFontSize());
		}

		// set text color
		if (currentSelectedObj.getColor()) {

			// alert("currentSelectedObj.getColor()
			// 111==============:"+currentSelectedObj.getColor())
			$('.color_box_text')
					.each(
							function() {
								if ($(this).attr('colorvalue') == currentSelectedObj
										.getColor()) {
									// $(this).children(".color_is_picked").append('<input
									// type="checkbox" checked="true"
									// disabled="true">');
									$(this)
											.children(".color_is_picked")
											.append(
													'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');
								}
							});

			$('#To_Menu_Edit_Cell_Text_Color_Options').css('background',
					 currentSelectedObj.getColor()).css('border',
					'1px solid ' + currentSelectedObj.getColor());
		} else {
			$(
					'#Menu_Edit_Cell_Property_Option_Text_Color div .color_box_text[colorValue="#000000"]')
					.trigger("click");
		}

		// set Table Font
		if (currentSelectedObj.getFontFamily()) {
			// alert("currentSelectedObj.getFontFamily()
			// :"+currentSelectedObj.getFontFamily());
			$("#Menu_Edit_Cell_Text_Option_Text_Font_Checkbox li").removeClass(
					"ui-widget-content ui-selectee ui-selected");
			$("#Menu_Edit_Cell_Text_Option_Text_Font_Checkbox li").addClass(
					'ui-widget-content ui-selectee');
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox li")
					.removeClass("ui-widget-content ui-selectee ui-selected");
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox li")
					.addClass('ui-widget-content ui-selectee');
			$("#Menu_Edit_Cell_Text_Option_Text_Font_Checkbox")
					.children()
					.each( function(i) {
						// alert("===="+$(this).attr('propertyName'));
							if ($(this).attr('propertyName') == currentSelectedObj
									.getFontFamily()) {
								// alert("===="+parentNodeElement.getFontFamily());
								// $(this).addClass('ui-widget-content
								// ui-selectee ui-selected');
								// $(this).children(".Item_Property").append('<input
								// type="checkbox" class="item_selected"
								// checked="true" disabled="true">');
								$(this)
										.children(".Item_Property")
										.append(
												'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
							}
						});
			// alert("current font: "+currentSelectedObj.getFontFamily());
			$('#cell_text_font_family').text(
					currentSelectedObj.getFontFamily() + ' >');
			$('#Menu_Cell_TableFont').text(
					currentSelectedObj.getFontFamily() + ' >');

		} else {
			$('#cell_text_font_family').text('None >');
		}

		// set table font
		if (parentNodeElement.getFontFamily()) {
			// alert("parentNodeElement.getFontFamily()
			// :"+parentNodeElement.getFontFamily());
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox li")
					.removeClass("ui-widget-content ui-selectee ui-selected");
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox li")
					.addClass('ui-widget-content ui-selectee');
			$("#Menu_Edit_Cell_Table_01_Option_Item_Table_Font_Checkbox")
					.children()
					.each( function(i) {
						// alert("===="+$(this).attr('propertyName'));
							if ($(this).attr('propertyName') == parentNodeElement
									.getFontFamily()) {
								// alert("===="+parentNodeElement.getFontFamily());
								// $(this).addClass('ui-widget-content
								// ui-selectee ui-selected');
								// $(this).children(".Item_Property").append('<input
								// type="checkbox" class="item_selected"
								// checked="true" disabled="true">');
								$(this)
										.children(".Item_Property")
										.append(
												'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
							}
						});
			$('#Menu_Cell_TableFont').text(
					parentNodeElement.getFontFamily() + ' >');

		} else {
			$('#Menu_Cell_TableFont').text('None >');
		}

		// set fill color
		if (currentSelectedObj.getBackgroundColor()) {
			// alert("currentSelectedObj.getBackgroundColor()
			// :"+currentSelectedObj.getBackgroundColor());
			$('.color_box_cell')
					.each(
							function() {
								if ($(this).attr('colorvalue') == currentSelectedObj
										.getBackgroundColor()) {
									// $(this).children(".color_is_picked").append('<input
									// type="checkbox" checked="true"
									// disabled="true">');
									$(this)
											.children(".color_is_picked")
											.append(
													'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');
								}
							});

			if (currentSelectedObj.getBackgroundColor() == "#FFFFFF") {
				$('#Menu_Edit_Cell_To_Color_Option').css('background', '#fff')
						.css('border', '1px solid #b2b2b2');
			} else {
				$('#Menu_Edit_Cell_To_Color_Option').css('background',
						currentSelectedObj.getBackgroundColor()).css('border',
						'1px solid ' + currentSelectedObj.getBackgroundColor());
			}
		} else {
			$('#Menu_Edit_Cell_To_Color_Option').css('background', '#fff').css(
					'border', '1px solid #b2b2b2');
		}

		$("#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell").children('label').each(
				function() {
					// alert("this :"+$(this).attr('commamd'));
					$(this).removeClass('ui-state-active');
					// $(this).addClass('ui-state-default');
				});
		// set Wrap Text
		if (currentSelectedObj.getWrapText()) {
			$('#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell').children('label')
					.eq(0).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell').children('label')
					.eq(0).addClass('ui-state-active');
		} else {
			$('#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell').children('label')
					.eq(1).attr('aria-pressed', 'true');
			$('#Menu_Edit_Cell_Cells_Wrap_Text_In_Cell').children('label')
					.eq(1).addClass('ui-state-active');
		}

		// set BorderStyle parentNodeElement.getActiveSelection().getBorderType()
		if (currentSelectedObj.getBorderStyle()) {
			$("#border_option").removeAttr("class");
			$("#Menu_Edit_Cell_Cells_01_TextSize_Border_Style")
					.children()
					.each(
							function(i) {
								$(this).children(".Item_Property").children(
										'img').remove();
								
								/**
								 * $(this).attr('stylename') ==
								 * parentNodeElement
								 * .getActiveSelection().getBorderType()
								 */
								if ($(this).attr('stylename') == currentSelectedObj.getBorderStyle()) {
									// $(this).children(".Item_Property").append('<input
									// type="checkbox" class="item_selected"
									// checked="true" disabled="true">');
									$(this)
											.children(".Item_Property")
											.append(
													'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
									$('#border_option').addClass(
											$(this).children(".Item_Title")
													.children('div').attr(
															"class"));
								}
							});
		} else {
			$("#border_option").removeAttr("class");
			$("#Menu_Edit_Cell_Cells_01_TextSize_Border_Style")
					.children()
					.each(
							function(i) {
								if ($(this).attr('stylename') == 'Default') {
									$(this).children(".Item_Property")
											.children('img').remove();
									// $(this).children(".Item_Property").append('<input
									// type="checkbox" class="item_selected"
									// checked="true" disabled="true">');
									$(this)
											.children(".Item_Property")
											.append(
													'<img src="./images/icon_choosed.png" class="item_selected" style="height:13px;width:13px;"/>');
									$('#border_option').addClass(
											$(this).children(".Item_Title")
													.children('div').attr(
															"class"));
								}
							});
		}

		// set format
		if (currentSelectedObj.getFormat()) {
			var name = currentSelectedObj.getFormat().name;
			$("#Menu_Edit_Cell_Format_Checkbox li[formatname='" + name + "']")
					.trigger("click");
		} else {
			if (currentSelectedObj.getText() == "") {
				$("#Menu_Edit_Cell_Format_Checkbox li .isCheckedFlg").children(
						'img').remove();
			} else if (!isNaN(currentSelectedObj.getText())) {
				$("#Menu_Edit_Cell_Format_Checkbox li .isCheckedFlg").children(
						'img').remove();
				$("#Menu_Edit_Cell_Format_Checkbox li[formatname='Number']")
						.children(".format_title_left")
						.children(".isCheckedFlg")
						// .append('<input type="checkbox"
						// class="item_format_selected" checked="true"
						// disabled="true">');
						.append(
								'<img src="./images/icon_choosed.png" style="height:13px;width:13px;"/>');

				var currentND;
				var currentText = currentSelectedObj._domInstance.children[0].innerHTML;
				if (currentText.indexOf(".") != -1) {
					if (currentText.indexOf("E") == -1) {
						currentND = currentText.length
								- currentText.indexOf(".") - 1;
					} else {
						currentND = currentText.indexOf("E")
								- currentText.indexOf(".") - 1;
					}
				} else {
					currentND = 0;
				}
				$('#Menu_Edit_Cell_Table_01_Option_Decimals')[0].options.selectedIndex = currentND;
				$('#Menu_Edit_Cell_Table_01_Option_Scientific_Decimals')[0].options.selectedIndex = currentND;
			} else {
				$("#Menu_Edit_Cell_Format_Checkbox li[formatname='Text']")
						.trigger("click");
			}

		}
	}
}

function hideCellElementByCondition() {
	$('#newShape').css('display', 'none');
	$('#Menu_Edit_Cell_Format').css('display', 'none');
	$('#Menu_Edit_Cell_TableName').css('display', 'none');
	$('#Menu_Edit_Cell_FreezeRows').css('display', 'none');
	$('#Menu_Edit_Cell_FreezeColumns').css('display', 'none');
	$('#Menu_Edit_Cell_HeaderRows').css('border', 'none');
	$('#Menu_Edit_Cell_HeaderColumns').css('border', 'none');
}

// ----------- 1704 ----- Format ---------------
function FormatToNumber(cell) {
    removeCheckBox(cell);
    var formateValue = cell.getText();
    if (formateValue != "") {
        var objectForFormat = cell.getFormat().formatOptions;
        if (!isNaN(formateValue)) {
            // decimal & sciDecimal
            if (objectForFormat.numDecimal != null) {
                formateValue = Number(formateValue).toFixed(
					objectForFormat.numDecimal);
            } else if (objectForFormat.sciDecimal != null) {
                if (formateValue.toString().indexOf('.') == -1) {
                    formateValue = formateValue.toString() + '.';
                }
                var dd = formateValue > 0 ? formateValue.toString().indexOf('.') - 1
					: formateValue.toString().indexOf('.') - 2;
                formateValue = formateValue / (Math.pow(10, dd));
                formateValue = Number(formateValue).toFixed(
					objectForFormat.sciDecimal);
                return formateValue + "E+0" + dd.toString();
                // 1704BUG change scitific format to 2.0000E+00
            } else {
                formateValue = Number(formateValue).toFixed(2);
            }
            // 1704BUG Fraction
            if (!isNaN(cell.getText()) && objectForFormat.styleName != null) {
                var dd = cell.getText();
                var index = dd.indexOf('.');
                if (index != -1 && Number(dd.substring(index, dd.length)) < 1) {
                    var operator = 1;
                    switch (objectForFormat.styleName) {
                        case 'FractionOne':
                            // formateValue = toFraction(objectForFormat.value, 1);
                            break;
                        case 'FractionTwo':
                            // formateValue = toFraction(objectForFormat.value, 2);
                            break;
                        case 'FractionThree':
                            // formateValue = toFraction(objectForFormat.value, 3);
                            break;
                        case 'Halves':
                            operator = 2;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 2);
                            break;
                        case 'Quarters':
                            operator = 4;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 4);
                            break;
                        case 'Eighths':
                            operator = 8;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 8);
                            break;
                        case 'Sixteenths':
                            operator = 16;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 16);
                            break;
                        case 'Tenths':
                            operator = 10;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 10);
                            break;
                        case 'Hundredths':
                            operator = 100;
                            // formateValue = fractionCalculate(mathematics[0],
                            // decimalValue, 100);
                            break;
                    }
                    if (Math.round(Number(dd.substring(index, dd.length))
						* operator) == 0) {
                        formateValue = dd.substring(0, index);
                    } else {
                        var minusFlag = "";
                        if (dd.substring(0, 1) == "-") {
                            minusFlag = "-";
                        }
                        var sd = Number(dd.substring(0, index)) == 0 ? minusFlag
							: dd.substring(0, index);
                        formateValue = sd
							+ "  "
							+ Math.round(
									Number(dd.substring(index, dd.length))
											* operator).toString() + "/"
							+ operator.toString();
                    }
                } // END IF <1
            } // END STYLENAME
            // separator
            if (objectForFormat.separator) {
                if (formateValue < 0) {
                    formateValue = "-"
						+ formatSeparator(formateValue.toString().substring(1,
								formateValue.toString().length));
                } else {
                    formateValue = formatSeparator(formateValue);
                }
            }
            // minus//cell.setColor("Black"); // 1704BUG separator redo undo
            // preColor
            if (cell.getText() < 0 && objectForFormat.minusStyle != null) {
                var result = formatMinus(formateValue, objectForFormat.minusStyle);
                formateValue = result.value;
                $("#" + cell.getId()).css('color', result.color);
                cell.setColor(result.color);
                // sendMessage(com.kenny.util.Observer.MessageType.CELL_CHANGED,
                // currentSelectedObj, { 'flag': "cell", 'textColor': result.color
                // });
            }
        } // END IF NaN
    }
    return formateValue;
}
function FormatToCurrency(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	var objectForFormat = cell.getFormat().formatOptions;
	if (formateValue != "") {
		if (!isNaN(formateValue)) {
			// curDecimal
			if (objectForFormat.curDecimal) {
				formateValue = Number(formateValue).toFixed(objectForFormat.curDecimal);
			} else {
				formateValue = Number(formateValue).toFixed(0);
			}
			// separator
			if (objectForFormat.separator) {
				if (formateValue < 0) {
					formateValue = "-"+ formatSeparator(formateValue.toString().substring(1,formateValue.toString().length));
				} else {
					formateValue = formatSeparator(formateValue);
				}
			}
			var formatType = "&yen;";
			if (objectForFormat.dollorType) {
				switch (objectForFormat.dollorType) {
				case 'AustralianDollar':
					formatType = "AU$";
					break;
				case 'CanadianDollar':
					formatType = "CA$";
					break;
				case 'HongKongDollar':
					formatType = "HK$";
					break;
				case 'SingaporeDollar':
					formatType = "S$";
					break;
				case 'NewTaiwanDollar':
					formatType = "NT$";
					break;
				case 'USDollar':
					formatType = "US$";
					break;
				case 'Euro':
					formatType = "&euro;";
					break;
				case 'SwissFranc':
					formatType = "CFH";
					break;
				case 'SwedishKrona':
					formatType = "Skr";
					break;
				case 'DanishKrone':
					formatType = "Dkr";
					break;
				case 'NorwegianKrone':
					formatType = "Nkr";
					break;
				case 'MexicanPeso':
					formatType = "MX$";
					break;
				case 'BritishPoundSterling':
					formatType = "&pound;";
					break;
				case 'BrazilianReal':
					formatType = "R$";
					break;
				case 'IndianRupee':
					formatType = "Rs";
					break;
				case 'SouthKoreanWon':
					formatType = "W";
					break;
				case 'JapaneseYen':
					formatType = "JP&yen;";
					break;
				case 'ChineseRMB':
					formatType = "&yen;";
					break;
				case 'IndonesianRupiah':
					formatType = "Rp";
					break;
				case 'RussianRuble':
					formatType = "RUB";
					break;
				case 'TurkishLira':
					formatType = "TL";
					break;
				case 'ThaiBaht':
					formatType = "THB";
					break;
				case 'PolishZloty':
					formatType = "PLZ";
					break;
				case 'SouthAfricanRand':
					formatType = "R";
					break;
				case 'ArgentinePeso':
					formatType = "AR$";
					break;
				}
				if (cell.getText() < 0) {
					if (objectForFormat.accountstyle) {
						// accountStyle // 1704BUG ON
						formateValue = formatType
								+ " ("
								+ formateValue
										.substring(1, formateValue.length)
								+ ")";
					} else {
						formateValue = "-"
								+ formatType
								+ formateValue
										.substring(1, formateValue.length);
						if (objectForFormat.minusStyle != null) {
							// //minus Style// 1704BUG separator redo undo
							var result = formatMinus(formateValue,
									objectForFormat.minusStyle);
							formateValue = result.value;
							$("#" + cell.getId()).css('color', result.color);
							cell.setColor(result.color);
						}
					}
				} else {
					formateValue = formatType + formateValue;
				}
			}else{
				formateValue = formatType + formateValue;
			}// end dollar type
		}// END IF NaN
	}
	return formateValue;
}

function FormatToPercentage(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	if (formateValue != "") {
		var objectForFormat = cell.getFormat().formatOptions;
		if (!isNaN(formateValue)) {
			if (objectForFormat.perDecimal != null) {
				formateValue = Number(formateValue * 100).toFixed(
						objectForFormat.perDecimal);
			} else {
				formateValue = Number(formateValue * 100).toFixed(0);
			}
			// separator
			if (objectForFormat.separator) {
				if (formateValue < 0) {
					formateValue = "-"
							+ formatSeparator(formateValue.toString()
									.substring(1,
											formateValue.toString().length));
				} else {
					formateValue = formatSeparator(formateValue);
				}
			}
			formateValue = formateValue + '%';
			// //minus Style// 1704BUG separator redo undo
			if (cell.getText() < 0 && objectForFormat.minusStyle != null) {
				var result = formatMinus(formateValue,
						objectForFormat.minusStyle);
				formateValue = result.value;
				$("#" + cell.getId()).css('color', result.color);
				cell.setColor(result.color);
			}
		} // END IF NaN
	}
	return formateValue;
}

function FormatToDateTime(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	if(formateValue!=""){
		var objectForFormat = cell.getFormat().formatOptions;
		// alert(objectForFormat.dateStyle);
		// alert(objectForFormat.timeStyle);
	}
	return formateValue;
}

function FormatToDuration(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	if(formateValue!=""){
		var objectForFormat = cell.getFormat().formatOptions;
		// alert(objectForFormat.durStyle);
		// alert(objectForFormat.durType);
	}
	return formateValue;
}

function FormatToCheckBox(cell) {
	removeCheckBox(cell);
	var id = cell.getId();
	var checkCol = cell.getCol();
	var formateValue = cell.getText();
	if (!isNaN(formateValue) && Number(formateValue) == 0) {
		$(cell.getDomInstance()).append("<input type='checkbox' name='checkbox_" + checkCol + "'/>");
		//$("#" + id).append("<input type='checkbox' name='checkbox_" + checkCol + "'/>");
	} else {
		//console.info(id+"="+formateValue);
		$(cell.getDomInstance()).append("<input type='checkbox' checked='checked' name='checkbox_"+ checkCol + "'/>");
	}
	return '';
}

function FormatToStarRating(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	var returnValue = "";
	if (!isNaN(formateValue) && Number(formateValue) < 6
			&& Number(formateValue) > 0) {
		for ( var i = 0; i < 5; i++) {
			if (i < Math.floor(Number(formateValue))) {
				returnValue += "* ";
			} else {
				returnValue += ". ";
			}
		}
	} else {
		returnValue = " . . . . . ";
	}
	return returnValue;
}

function FormatToText(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	// if (cell.getText() == "- !! -") {
	// formateValue = cell.getFunctions();
	// }
	return formateValue;
}

function FormatToNull(cell) {
	removeCheckBox(cell);
	var formateValue = cell.getText();
	// if (cell.getText() == "- !! -") {
	// formateValue = cell.getFunctions();
	// }
	return formateValue;
}

// //// functions for format 1704
function removeCheckBox(cell) {
	var id = cell.getId();
	if ($("#" + id + ":has(input)").length != 0) {
		$("#" + id + " input").remove();
	}
}
function formatSeparator(parameter) {
	var formateValue;
	if (!isNaN(parameter)) {
		var intNumber = "";
		var floatNumber = "";
		var index = parameter.toString().indexOf('.');
		if (index == -1) {
			intNumber = parameter;
		} else {
			var intNumber = parameter.toString().substring(0, index);
			var floatNumber = "."
					+ parameter.toString().substring(index + 1,
							parameter.toString().length);
		}
		for ( var i = 0; i < Math.floor((intNumber.length - (1 + i)) / 3); i++) {
			intNumber = intNumber.substring(0, intNumber.length - (4 * i + 3))
					+ ',' + intNumber.substring(intNumber.length - (4 * i + 3));
		}
		formateValue = intNumber + floatNumber;
	} else {
		formateValue = parameter;
	}
	return formateValue;
}

function formatMinus(formateValue, minusStyle) {
	var formatColor;
	switch (minusStyle) {
	case "NRN":
		formateValue = formateValue.substring(1, formateValue.length);
		formatColor = "Red"; // 1704BUG separator redo undo
		break;
	case "MBN":
		formatColor = "Black"; // 1704BUG separator redo undo
		break;
	case "NBB":
		formateValue = '( ' + formateValue.substring(1, formateValue.length) + ' )';
		formatColor = "Black"; // 1704BUG separator redo undo
		break;
	case "NRB":
		formateValue = '( ' + formateValue.substring(1, formateValue.length) + ' )';
		formatColor = "Red"; // 1704BUG separator redo undo
		break;
	}
	return {
		'value' :formateValue,
		'color' :formatColor
	};
}

/*
 * function StartFractionFormat(objectForFormat) { var formateValue =
 * objectForFormat.value; if
 * (!isNaN(formateValue)&&Math.abs(Number(formateValue))<1) { switch
 * (objectForFormat.styleName) { case 'UpToOneDigit': //formateValue =
 * toFraction(objectForFormat.value, 1); break; case 'UpToTwoDigit':
 * //formateValue = toFraction(objectForFormat.value, 2); break; case
 * 'UpToThreeDigit': //formateValue = toFraction(objectForFormat.value, 3);
 * break; case 'Halves': formateValue = Math.round(formateValue * 2).toString() +
 * "/2"; //formateValue = fractionCalculate(mathematics[0], decimalValue, 2);
 * break; case 'Quarters': //formateValue = fractionCalculate(mathematics[0],
 * decimalValue, 4); formateValue = Math.round(formateValue * 4).toString() +
 * "/4"; break; case 'Eighths': //formateValue =
 * fractionCalculate(mathematics[0], decimalValue, 8); formateValue =
 * Math.round(formateValue * 8).toString() + "/8"; break; case 'Sixteenths':
 * //formateValue = fractionCalculate(mathematics[0], decimalValue, 16);
 * formateValue = Math.round(formateValue * 16).toString() + "/16"; break; case
 * 'Tenths': //formateValue = fractionCalculate(mathematics[0], decimalValue,
 * 10); formateValue = Math.round(formateValue * 10).toString() + "/10"; break;
 * case 'Hundredths': //formateValue = fractionCalculate(mathematics[0],
 * decimalValue, 100); formateValue = Math.round(formateValue * 100).toString() +
 * "/100"; break; } } var formatObject = { "formate": formateValue, "style":
 * formateStyle, "value": objectForFormat.value }; return formatObject; }
 */
function fractionCalculate(integerValueForFormat, decimalValueForFormat,
		denominator) {
	var returnValue;
	var numerator = Math.round(decimalValueForFormat * denominator);
	if (numerator <= 0) {
		returnValue = integerValueForFormat;
	} else {
		if (numerator / denominator == 1) {
			if (Number(integerValueForFormat) < 0) {
				returnValue = Number(integerValueForFormat) - 1;
			} else {
				returnValue = Number(integerValueForFormat) + 1;
			}

		} else {
			returnValue = integerValueForFormat + " " + numerator + "/"
					+ denominator;
		}
	}
	return returnValue;
}

function toFraction() {
	// The first
	var account = arguments[0];
	if (isNaN(account)) {
		return "Err.";
	}
	// the second
	var digit = arguments[1];
	// the third
	var holdValue = "", tempObject;
	if (arguments.length > 2) {
		holdValue = arguments[2];
		// the forth
		tempObject = arguments[3];
	}

	holdValue = holdValue + "," + (parseInt(account / 1));
	account = Math.abs(account) % 1.0;
	var returnValue = accountFx(holdValue);
	if (returnValue.denominator.toString().length > digit) {
		return tempObject.intnum + " " + tempObject.numerator + "/"
				+ tempObject.denominator;
	} else if (account == 0 && returnValue.numerator == 0) {
		return returnValue.intnum;
	} else if (account == 0) {
		return returnValue.intnum + " " + returnValue.numerator + "/"
				+ returnValue.denominator;
	}
	return toFraction(1 / account, digit, holdValue, returnValue);
}

function accountFx(holdValue) {
	holdValue = holdValue.replace(",", "");
	var numArr = holdValue.split(",");

	for (i = numArr.length - 1; i >= 0; i--) {
		numArr[i] = parseInt(numArr[i]);
	}
	for (i = numArr.length - 1; i > 1; i--) {
		numArr[i - 1] = numArr[i - 1] * numArr[i]
				+ (i == numArr.length - 1 ? 1 : numArr[i + 1]);
	}

	var ob = new Object();
	ob.intnum = numArr[0];
	if (numArr.length == 1) {
		ob.denominator = 1;
		ob.numerator = 0;
		return ob;
	}
	ob.denominator = numArr[1];
	ob.numerator = numArr.length == 2 ? 1 : numArr[2];
	return ob;

}

// the number's tab click formate
function formatTabChange(tabId) {
	// alert(tabId);
	var formatObject = {
		"value" :"-12350100000.3",
		"decimal" :"2",
		"styleName" :"FractionOne"
	};
	var returnObject = {};
	// test
	if (0 == tabId) {
		returnObject = numberTabFormat(formatObject);
	} else if (1 == tabId) {
		returnObject = scientificTabFormat(formatObject);
	} else if (2 == tabId) {
		returnObject = StartFractionFormat(formatObject);
	}
	// alert(returnObject.formate);
	// alert(returnObject.style);
	// alert(returnObject.value);
}
/* the number's scientific formate */
function scientificTabFormat(objectForFormat) {
	// Check if the inputed value is negative
	var formateValue = objectForFormat.value;
	var formateStyle = "";
	if (!isNaN(objectForFormat.value)) {
		var beforeFormateValue = Number(objectForFormat.value);
		var afterFormateValue = beforeFormateValue
				.toExponential(Number(objectForFormat.decimal));
		var precision = afterFormateValue.substring(afterFormateValue
				.indexOf("e") + 2);
		if (precision.length == 1) {
			precision = "0" + precision;
		}
		afterFormateValue = afterFormateValue.substring(0, afterFormateValue
				.indexOf("e") + 2)
				+ precision;
		formateValue = afterFormateValue.replace("e", "E");
	}
	var formatObject = {
		"formate" :formateValue,
		"style" :formateStyle,
		"value" :objectForFormat.value,
		"decimal" :objectForFormat.decimal
	};
	return formatObject;
}

// ////////////////////////////////////////////////////////////////////////////////////////////
// add by sunwei
function deleteCell(activeTableObj, activeSelection) {
	var delectionId = [];
	var minRow = activeSelection.getRow();
	var minCol = activeSelection.getCol();
	var rowNumber = activeSelection.getRowNumber();
	var colNumber = activeSelection.getColNumber();
	var maxRow = minRow + rowNumber - 1;
	var maxCol = minCol + colNumber - 1;
	var cells = activeTableObj.getCells();
	for ( var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var row = cell.getRow(), col = cell.getCol();
		var width = cell.getWidth(), height = cell.getHeight();
		if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
			var newCellData = {
				'row' :row,
				'col' :col,
				'format' :null,
				'width' :width,
				'height' :height,
				'backgroundColor' :null,
				'text' :null,
				'lineHeight' :null,
				'fontSize' :null,
				'fontWeight' :null,
				'fontStyle' :null,
				'underline' :null,
				'lineThrough' :null,
				'fontFamily' :null,
				'textAlign' :null,
				'color' :null,
				'wrapText' :null,
				'borderTop' :null,
				'borderBottom' :null,
				'borderLeft' :null,
				'borderRight' :null,
				'functions' :null
			};
			cell.setData(newCellData);

			var tempTableSelectionModel = new com.kenny.model.TableSelection(
					row, col, 1, 1);
			tempTableSelectionModel.setBorderType("default");
			tempTableSelectionModel.setBackgroundColor("transparent");
			// var
			// data={"row":row,"col":col,"rowNumber":1,"colNumber":1,"format":null,"borderType":'default',"backgroundColor":"default","color":null,"bold":null,"italic":null,"underline":null,"lineThrough":null,"textSize":null,"textFont":null,"horizontalAlignLeft":null,"horizontalAlignCenter":null,"horizontalAlignRight":null,"horizontalAlignAjustment":null,"wrapTextInCell":null};
			// tempTableSelectionModel.setData(data);
			activeTableObj.addSelection(tempTableSelectionModel, true);
			delectionId.push(tempTableSelectionModel.getId());
		}
	}
	// activeTableObj.setStyle();
	activeTableObj.setCellStyle();
	return delectionId;
}

function copyCellValue(activeSelection, activeTableObj, tempCellArray) {

	var minRow = activeSelection.getRow();
	var minCol = activeSelection.getCol();
	var rowNumber = activeSelection.getRowNumber();
	var colNumber = activeSelection.getColNumber();
	var maxRow = minRow + rowNumber - 1;
	var maxCol = minCol + colNumber - 1;
	var cells = activeTableObj.getCells();

	// 把选中的单元格塞入tempCellArray
	for ( var i = 0; i < cells.length; i++) {
		var copyCell = cells[i];
		var row = copyCell.getRow(), col = copyCell.getCol();
		var width = copyCell.getWidth(), height = copyCell.getHeight();
		// 选择区域内的单元??
		if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
			var pasteCell = new com.kenny.node.Cell();
			var coptData = copyCell.getData();
			pasteCell.setData(coptData);// cell set
			tempCellArray.push(pasteCell);
		}
	}
}
// undo use
function pasteCellOnlyCellValue(activeSelection, activeTableObj, tempCellArray,
		isNewRowOrCol, pasteValueOrFormulas) {
	var minRow = activeSelection.getRow();
	var minCol = activeSelection.getCol();
	var rowNumber = activeSelection.getRowNumber();
	var colNumber = activeSelection.getColNumber();
	var tableRows = activeTableObj.getRows();

	var tableCols = activeTableObj.getCols();
	var maxRow = minRow + rowNumber - 1;
	var maxCol = minCol + colNumber - 1;
	var cells = activeTableObj.getCells();
	var tempCellSrc = [];
	for ( var i = 0; i < cells.length; i++) {
		var copyCell = cells[i];
		var row = copyCell.getRow(), col = copyCell.getCol();
		var width = copyCell.getWidth(), height = copyCell.getHeight();
		if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
			copyCell.setFunctions(null);
			tempCellSrc.push(copyCell);
		}
	}

	for ( var j = 0; j < tempCellSrc.length; j++) {
		var copyToCell = tempCellSrc[j];
		var copyFromCell = tempCellArray[j];
		if (copyFromCell.getFunctions() == null
				|| copyFromCell.getFunctions() == '') {// copy value TODO
			var cloneCell = copyFromCell.clone();
			cloneCell.setRow(copyToCell.getRow());
			cloneCell.setCol(copyToCell.getCol());
			copyToCell.setData(cloneCell.getData());
		} else {
			if (pasteValueOrFormulas == true) {// Formulas
				// 行间??
				var rowSpace = copyToCell.getRow() - copyFromCell.getRow();
				// 列间??
				var colSpace = copyToCell.getCol() - copyFromCell.getCol();
				var cloneCell = copyFromCell.clone();
				cloneCell.setRow(copyToCell.getRow());
				cloneCell.setCol(copyToCell.getCol());
				cloneCell.setText('');
				copyToCell.setData(cloneCell.getData());
				var cellFunction = copyFromCell.getFunctions();
				var newCellFunction = refreshCellFunction(cellFunction,
						rowSpace, colSpace);
				copyToCell.setFunctions(newCellFunction);
			} else {
				var cellData = copyFromCell.getData();
				cellData.row = copyToCell.getRow();
				cellData.col = copyToCell.getCol();
				cellData.functions = null;
				copyToCell.setData(cellData);
			}
		}
	}
	activeTableObj.refreshCellValue();
}

function pasteCells(activeSelection, activeTableObj, tempCellArray,
		isNewRowOrCol, pasteValueOrFormulas) {

	var minRow = activeSelection.getRow();
	var minCol = activeSelection.getCol();
	var rowNumber = activeSelection.getRowNumber();
	var colNumber = activeSelection.getColNumber();
	var tableRows = activeTableObj.getRows();

	var tableCols = activeTableObj.getCols();
	var addRows = 0, addCols = 0;
	var addRowColsAndSelectionId = [];
	if ((minRow + rowNumber) > tableRows && isNewRowOrCol) {
		for ( var iRow = 0; iRow < ((minRow + rowNumber) - tableRows - 1); iRow++) {
			var rowNo = activeTableObj.getRows();
			if (activeTableObj.getFooterRows()) {
				rowNo = rowNo - activeTableObj.getFooterRows();
			}
			activeTableObj.addRow(rowNo + 1);
			addRows++;
		}
	}
	addRowColsAndSelectionId.push(addRows);
	if ((minCol + colNumber) > tableCols && isNewRowOrCol) {
		for ( var iCol = 0; iCol < ((minCol + colNumber) - tableCols - 1); iCol++) {
			activeTableObj.addCol(activeTableObj.getCols() + 1);
			addCols++;
		}
	}
	addRowColsAndSelectionId.push(addCols);
	var maxRow = minRow + rowNumber - 1;
	var maxCol = minCol + colNumber - 1;
	var cells = activeTableObj.getCells();
	var tempCellSrc = [];
	for ( var i = 0; i < cells.length; i++) {
		var copyCell = cells[i];
		var row = copyCell.getRow(), col = copyCell.getCol();
		var width = copyCell.getWidth(), height = copyCell.getHeight();
		if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {
			copyCell.setFunctions(null);
			tempCellSrc.push(copyCell);
		}
	}

	for ( var j = 0; j < tempCellSrc.length; j++) {
		var copyToCell = tempCellSrc[j];
		var copyFromCell = tempCellArray[j];
		if (copyFromCell.getFunctions() == null
				|| copyFromCell.getFunctions() == '') {// copy value TODO
			var cloneCell = copyFromCell.clone();
			cloneCell.setRow(copyToCell.getRow());
			cloneCell.setCol(copyToCell.getCol());
			copyToCell.setData(cloneCell.getData());
			// console.info('after copy value='+copyToCell.toJSON());
		} else {
			if (pasteValueOrFormulas == true) {// Formulas
				// 行间??
				var rowSpace = copyToCell.getRow() - copyFromCell.getRow();
				// 列间??
				var colSpace = copyToCell.getCol() - copyFromCell.getCol();
				var cloneCell = copyFromCell.clone();
				cloneCell.setRow(copyToCell.getRow());
				cloneCell.setCol(copyToCell.getCol());
				cloneCell.setText('');
				copyToCell.setData(cloneCell.getData());
				var cellFunction = copyFromCell.getFunctions();
				var newCellFunction = refreshCellFunction(cellFunction,
						rowSpace, colSpace);
				copyToCell.setFunctions(newCellFunction);
				// console.info('after copy function='+copyToCell.toJSON());
			} else {
				var cellData = copyFromCell.getData();
				cellData.row = copyToCell.getRow();
				cellData.col = copyToCell.getCol();
				cellData.functions = null;
				copyToCell.setData(cellData);
				// console.info(copyFromCell.toJSON());
				// console.info('粘贴后Cell:'+copyToCell.toJSON());
			}
		}
		// 新建selectModel，把cell的属性赋给selectModel，一个selectModel ==
		// 一个Cell,selectModel的行??== Cell的行列号
		var tempTableSelectionModel = new com.kenny.model.TableSelection(
				copyToCell.getRow(), copyToCell.getCol(), 1, 1);
		var cellTextAlign = copyFromCell.getTextAlign();
		if (cellTextAlign == 'left') {
			tempTableSelectionModel.setHorizontalAlignLeft(cellTextAlign);
		} else if (cellTextAlign == 'right') {
			tempTableSelectionModel.setHorizontalAlignRight(cellTextAlign);
		} else if (cellTextAlign == 'center') {
			tempTableSelectionModel.setHorizontalAlignCenter(cellTextAlign);
		} else if (cellTextAlign == 'justify') {
			tempTableSelectionModel.setHorizontalAlignAjustment(cellTextAlign);
		}
		tempTableSelectionModel.setBackgroundColor(copyFromCell
				.getBackgroundColor());
		// alert(copyFromCell.getBackgroundColor());
		tempTableSelectionModel.setFormat(copyFromCell.getFormat());
		tempTableSelectionModel.setColor(copyFromCell.getColor());
		tempTableSelectionModel.setBold(copyFromCell.getFontWeight());// bold
		tempTableSelectionModel.setItalic(copyFromCell.getFontStyle());// italic
		tempTableSelectionModel.setUnderline(copyFromCell.getUnderline());
		tempTableSelectionModel.setLineThrough(copyFromCell.getLineThrough());
		tempTableSelectionModel.setTextSize(copyFromCell.getFontSize());// fontSize
		tempTableSelectionModel.setTextFont(copyFromCell.getFontFamily());// fontFamily

		tempTableSelectionModel
				.setWrapTextInCell(copyFromCell.getWrapTextInCell);
		// var borderTop = copyFromCell.getBorderTop();设border??
		tempTableSelectionModel.setBorderType('default');
		// tempTableSelectionModel.
		// tempTableSelectionModel.
		// tempTableSelectionModel.

		activeTableObj.addSelection(tempTableSelectionModel, true);
		addRowColsAndSelectionId.push(tempTableSelectionModel.getId());
	}
	// activeTableObj.refreshCellValue();

	// activeTableObj.setStyle();
	activeTableObj.setCellStyle();
	activeTableObj.refreshCellValue();
	return addRowColsAndSelectionId;
}

function refreshCellFunction(cellFunction, rowSpace, colSpace) {
	var cellRegExp = new RegExp("[a-zA-Z]{1,20}[0-9]{1,20}", "g");
	var cells = cellFunction.match(cellRegExp);// sum(C3,C4)==>{C3,C4}
	if (cells != null) {
		for ( var i = 0; i < cells.length; i++) {
			var index = cells[i].search("[0-9]");
			var col = com.kenny.util.BaseTool.CellIndex_StrToNum(cells[i]
					.substring(0, index));
			var row = parseInt(cells[i].substring(index, cells[i].length));
			var newCol = col + colSpace;
			var newRow = row + rowSpace;
			cellFunction = cellFunction.replace(cells[i],
					com.kenny.util.BaseTool.CellIndex_NumToStr(newCol, '')
							+ newRow);
		}
	}
	return cellFunction;
}

function getSelectionCell(table, activeSelection) {
	var minRow = activeSelection.getRow();
	var minCol = activeSelection.getCol();
	var rowNumber = activeSelection.getRowNumber();
	var colNumber = activeSelection.getColNumber();
	var maxRow = minRow + rowNumber - 1;
	var maxCol = minCol + colNumber - 1;
	var cells = table.getCells();

	var beforePasteCellArray = [];
	for ( var i = 0; i < cells.length; i++) {
		var copyCell = cells[i];
		var row = copyCell.getRow(), col = copyCell.getCol();
		// 粘贴前的单元??
		if (row >= minRow && col >= minCol && row <= maxRow && col <= maxCol) {

			var beforePasteCell = new com.kenny.node.Cell();
			beforePasteCell.setData(copyCell.getData());
			beforePasteCellArray.push(beforePasteCell);
			// console.info('粘贴前的单元格beforePasteCell='+beforePasteCell.toJSON());
		}
	}
	return beforePasteCellArray;
}
// end by sunwei

// Change selected item's background image
function selectCellChart(obj) {
	$("#Menu_Edit_Cell_Option img").css("background-image", "none");
	obj.style.background = 'url("./images/04 Numbers/charts/btn_on.png")';
}

function selectCellHeader(obj) {
	$("#Menu_Edit_Cell_Option img").css("background-image", "none");
	obj.style.background = 'url("./images/04 Numbers/charts/btn_on.png")';
}

function selectCellCells(obj) {
	$("#Menu_Edit_Cell_Option img").css("background-image", "none");
	obj.style.background = 'url("./images/04 Numbers/charts/btn_on.png")';
}

function selectCellFormat(obj) {
	$("#Menu_Edit_Cell_Option img").css("background-image", "none");
	obj.style.background = 'url("./images/04 Numbers/charts/btn_on.png")';
}