/**
* Menu Listener class
* 
* @package menu.lib
* @import null
* @author chenpeng
* @crtdate 2011-06-30
* @upddate 2011-06-30
*/

/**
* to init ruler menu.
*/
	/**
	 * 
			hr-ruler-inner 起始位置 页宽度 !
			
			hr-ruler-background 页宽度 !
			hr-ruler-background-inner 段落偏移位置，段宽度
			
			hr-ruler-face 宽度 
			hr-ruler-face-inner 总宽度， 起始位置（左端有隐藏的部分）
			
			hr-ruler-mask 页宽度
			
			hr-ruler-margin-left 页左偏移， 拖拽事件
			hr-ruler-margin-right 页右偏移， 拖拽事件
			
			hr-ruler-indent-first-line 段首行左偏移位置， 拖拽事件
			hr-ruler-indent-left 段左偏移位置， 拖拽事件
			hr-ruler-indent-right 段右偏移位置， 拖拽事件
	 * 
	 */
var paperEditorToolbarRuler = null; 
$(document).ready(function(){
	$('.hr-ruler-face-inner').children().each(function(idx){
		$(this).css('position','absolute');
		$(this).css('left', idx*12+'px');
	});
	
	paperEditorToolbarRuler = new function(){
		var rulerInner = $('.hr-ruler-inner');
		var rulerBackground = $('.hr-ruler-background'),  rulerBackgroundInner = $('.hr-ruler-background-inner');
		var rulerFace = $('.hr-ruler-face'),  rulerFaceInner = $('.hr-ruler-face-inner');
		var rulerMask = $('.hr-ruler-mask');
		var rulerMarginLeft = $('.hr-ruler-margin-left'),  rulerMarginRight = $('.hr-ruler-margin-right');
		var rulerIndentFirstLine = $('.hr-ruler-indent-first-line'),  rulerIndentLeft = $('.hr-ruler-indent-left'),  rulerIndentRight = $('.hr-ruler-indent-right');
		
		this.width = null;
		this.left = null;
		this.indentLeft = null;
		this.indentRight = null;
		
		this.paragraphObj;
		
		this.paraIndentFirstLine = null;
		this.paraIndentLeft = null;
		this.paraIndentRight = null;
		//Method defined
		this.pageInit = function(width, left, indentLeft, indentRight){
			this.width = width;
			this.left = left;
			this.indentLeft = indentLeft;
			this.indentRight = indentRight;
			
			rulerInner.css('left', left-$('.hr-ruler').offset().left+'px').css('width',width+'px');
			
			rulerBackground.css('width', width+'px');
			rulerBackgroundInner.css('left', indentLeft).css('width', width-indentLeft-indentRight+'px');
			
			rulerFace.css('width',width+'px');
			rulerFaceInner.css('left',-864+indentLeft+'px');
			
			rulerMask.css('width', width+'px');
			
			rulerMarginLeft.css('width', indentLeft+'px');
			rulerMarginRight.css('left', width-indentRight+'px').css('width', indentRight+'px');
			
			//Need to disable paragraph ruler buttons
		};
		
		this.paragraphRulerLeft = -1; 
		this.paragraphRulerRight = -1; 
		this.paragraphRulerFirstLine = -1; 
		
		this.paragraphInit = function(firstLine, left, right){
			this.paraIndentFirstLine = firstLine;
			this.paraIndentLeft = left;
			this.paraIndentRight = right;
			
			this.paragraphRulerLeft = this.indentLeft + this.paraIndentLeft - 5;
			this.paragraphRulerRight = this.width - this.paraIndentRight - this.indentRight - 5;
			this.paragraphRulerFirstLine = this.paragraphRulerLeft + this.paraIndentFirstLine;
			
			rulerIndentFirstLine.css('left', this.paragraphRulerFirstLine +'px');
			rulerIndentLeft.css('left', this.paragraphRulerLeft +'px');
			rulerIndentRight.css('left', this.paragraphRulerRight +'px');
		};
		
		this.getParagraphIndent = function(){
			return {
				firstLine: this.paraIndentFirstLine,
				left: this.paraIndentLeft,
				right: this.paraIndentRight
			};
		};
		
		this.sendPageIndentChange = function(indentData){
		    sendMessage(com.hoperun.util.Observer.MessageType.DOCUMENT_STYLE, null, indentData);
		};
		
		this.sendParagraphIndentChange = function(){
			if(!this.paragraphObj){
				return;
			}
			var style = {
				indentation: this.getParagraphIndent()
			};
		    sendMessage(com.hoperun.util.Observer.MessageType.PARAGRAPH_STYLE, this.paragraphObj, style);
		};
		
		this.setParagraphRulerFirstLine = function(left){
			rulerIndentFirstLine.css('left', left +'px');
			this.paragraphRulerFirstLine = left;
			
			this.paraIndentFirstLine = this.paragraphRulerFirstLine - this.paragraphRulerLeft;
		};
		this.setParagraphRulerLeft = function(left){
			rulerIndentLeft.css('left', left +'px');
			this.paragraphRulerLeft = left;
			this.paraIndentLeft = this.paragraphRulerLeft - this.indentLeft + 5;
			
			//Update paragraph first line indent
			this.setParagraphRulerFirstLine(this.paragraphRulerLeft + this.paraIndentFirstLine);
		};
		this.setParagraphRulerRight = function(left){
			rulerIndentRight.css('left', left +'px');
			this.paragraphRulerRight = left;
			this.paraIndentRight = this.width - this.paragraphRulerRight - this.indentRight - 5;
		};
		
		var self = this;
		this.paragraphRulerLeftOption = {
			axis: 'x',
	        containment: '.hr-ruler-inner',
	        distance: 5,
	        drag: function (e, ui) {
	        	var isValid = (ui.position.left < self.paragraphRulerRight - 50) 
	        		&& (ui.position.left + self.paraIndentFirstLine < self.paragraphRulerRight - 50)
	        		&& (ui.position.left + self.paraIndentFirstLine > 0); 
	        	if(isValid){
	        		self.setParagraphRulerLeft(ui.position.left);
	        	}
	            return isValid;
	        },
	        stop: function (e, ui) {
	        	self.sendParagraphIndentChange();
	        },
			disabled:false
		};
		
		this.paragraphRulerRightOption = {
			axis: 'x',
			containment: '.hr-ruler-inner',
			distance: 5,
	        drag: function (e, ui) {
	            var isValid = ui.position.left > self.paragraphRulerLeft + 50;
	        	if(isValid){
	        		self.setParagraphRulerRight(ui.position.left);
	        	}
	            return isValid;
	        },
	        stop: function (e, ui) {
	        	self.sendParagraphIndentChange();
	        },
			disabled:false
		};
		
		this.paragraphRulerFirstLineOption = {
			axis: 'x',
	        containment: '.hr-ruler-inner',
	        distance: 5,
	        drag: function (e, ui) {
	        	var isValid = ui.position.left < self.paragraphRulerRight - 50; 
	        	if(isValid){
	        		self.setParagraphRulerFirstLine(ui.position.left);
	        	}
	            return isValid;
	        },
	        stop: function (e, ui) {
	        	self.sendParagraphIndentChange();
	        },
			disabled:false
		};
		
		var rulerMarginLeft = $('.hr-ruler-margin-left'),  rulerMarginRight = $('.hr-ruler-margin-right');
		
		rulerMarginLeft.draggable({
			axis: 'x',
	        containment: '.hr-ruler-face-inner',
	        distance: 5,
	        drag: function (e, ui) {
	        	var distance = ui.position.left - ui.originalPosition.left;
	        	var tempIndentLeft = self.indentLeft + distance;
	        	
	        	if(tempIndentLeft > 10 && tempIndentLeft + self.indentRight < self.width - 100){
					rulerFaceInner.css('left',-864+tempIndentLeft+'px');
					rulerMarginLeft.css('left', '-4px').css('width', tempIndentLeft+'px');
					rulerBackgroundInner.css('left', tempIndentLeft + 'px').css('width', self.width - tempIndentLeft - self.indentRight+'px');
					
					self.paragraphRulerLeft = tempIndentLeft + self.paraIndentLeft - 5;
					self.paragraphRulerRight = self.width - self.paraIndentRight - self.indentRight - 5;
					self.paragraphRulerFirstLine = self.paragraphRulerLeft + self.paraIndentFirstLine;
					
					rulerIndentFirstLine.css('left', self.paragraphRulerFirstLine +'px');
					rulerIndentLeft.css('left', self.paragraphRulerLeft +'px');

					return true;
	        	}
	        	return false;
	        },
	        stop: function (e, ui) {
	        	var distance = ui.position.left - ui.originalPosition.left;
	        	self.indentLeft += distance;
	        	rulerFaceInner.css('left',-864 + self.indentLeft+'px');
				rulerMarginLeft.css('left', '-4px').css('width', self.indentLeft+'px');
				rulerBackgroundInner.css('left', self.indentLeft + 'px').css('width', self.width - self.indentLeft - self.indentRight+'px');
				
				
				self.paragraphRulerLeft = self.indentLeft + self.paraIndentLeft - 5;
				self.paragraphRulerRight = self.width - self.paraIndentRight - self.indentRight - 5;
				self.paragraphRulerFirstLine = self.paragraphRulerLeft + self.paraIndentFirstLine;
				
				rulerIndentFirstLine.css('left', self.paragraphRulerFirstLine +'px');
				rulerIndentLeft.css('left', self.paragraphRulerLeft +'px');
				
				if(distance!=0){
					self.sendPageIndentChange({rulerLeftIndent:self.indentLeft});
				}
	        }
		});
		rulerMarginRight.draggable({
			axis: 'x',
	        containment: '.hr-ruler-face-inner',
	        start: function(e, ui){
	        	rulerMarginRight.css('width', '1px');
	        },
	        distance: 5,
	        drag: function (e, ui) {
	        	var distance = - ui.position.left + ui.originalPosition.left;
	        	var tempIndentRight = distance + self.indentRight;
	        	var tempRightLeft = self.width - tempIndentRight - 5;
	        	if(tempRightLeft < self.width - 10 && tempIndentRight + self.indentLeft < self.width - 100 ){
					rulerMarginRight.css('left', self.width - tempIndentRight +'px');
					rulerBackgroundInner.css('left', self.indentLeft + 'px').css('width', self.width - self.indentLeft - tempIndentRight+'px');
					self.paragraphRulerRight = self.width - self.paraIndentRight - tempIndentRight - 5;
					rulerIndentRight.css('left', self.paragraphRulerRight +'px');
	        		return true;
	        	}
	        	return false;
	        },
	        stop: function (e, ui) {
	        	var distance = - ui.position.left + ui.originalPosition.left;
	        	self.indentRight += distance;
				rulerMarginRight.css('left', self.width - self.indentRight +'px').css('width', self.indentRight +'px');
				rulerBackgroundInner.css('left', self.indentLeft + 'px').css('width', self.width - self.indentLeft - self.indentRight+'px');
				self.paragraphRulerRight = self.width - self.paraIndentRight - self.indentRight - 5;
				rulerIndentRight.css('left', self.paragraphRulerRight +'px');
				
				if(distance!=0){
					self.sendPageIndentChange({rulerRightIndent:self.indentRight});
				}
	        }
		});
		
		this.disableParagraphButton = function(){
			this.paragraphObj = null;
			
			this.paragraphRulerFirstLineOption.disabled = true;
			this.paragraphRulerLeftOption.disabled = true;
			this.paragraphRulerRightOption.disabled = true;

			rulerIndentFirstLine.draggable(this.paragraphRulerFirstLineOption);
			rulerIndentLeft.draggable(this.paragraphRulerLeftOption);
			rulerIndentRight.draggable(this.paragraphRulerRightOption);
		};
		
		this.enableParagraphButton = function(paragraphObj){
			this.paragraphObj = paragraphObj;
			
			this.paragraphRulerFirstLineOption.disabled = false;
			this.paragraphRulerLeftOption.disabled = false;
			this.paragraphRulerRightOption.disabled = false;
			
			rulerIndentFirstLine.draggable(this.paragraphRulerFirstLineOption);
			rulerIndentLeft.draggable(this.paragraphRulerLeftOption);
			rulerIndentRight.draggable(this.paragraphRulerRightOption);
		};
		
		rulerIndentFirstLine.draggable(this.paragraphRulerFirstLineOption);
		rulerIndentLeft.draggable(this.paragraphRulerLeftOption);
		
//		self.pageInit(816, 543, 96, 96);
//		self.paragraphInit(20, 0, 0);
		var rulerEventListener = new function(){
			this.update = function (message) {
	            switch (message.id) {
	                case com.hoperun.util.Observer.MessageType.CONTEXT_BLUR:
	                	self.disableParagraphButton();
	                    break;
	                case com.hoperun.util.Observer.MessageType.TEXT_SELECT:
	                	var container = message.sender;
	                	var paragraphObj = container.getActiveSelection().getFrom();
	                	self.paragraphInit(paragraphObj.getIndent('firstLine'), paragraphObj.getIndent('left'), paragraphObj.getIndent('right'));
	                	self.enableParagraphButton(paragraphObj);
	                	break;
	                case com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION:
	                	var data = message.data;
	                	self.pageInit(data.position.width, data.position.left, data.indent.left, data.indent.right);
	                	self.paragraphInit(0, 0, 0);
	                	break;
	            }
			};
		};
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.DOCUMENT_CONFIGURATION, rulerEventListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.CONTEXT_BLUR, rulerEventListener);
		com.hoperun.util.Observer.register(com.hoperun.util.Observer.MessageType.TEXT_SELECT, rulerEventListener);
	};
});

function initRulerMenu(){
	
    initRadio();
    //show ruler
    $('#editRuler').css('display','block');
    $(window).resize();
    //set draggable : false
    $('#Paper_Edit_Toolbar_Format_Align').disableSelection();
	
	$("#Paper_Edit_Toolbar_Format_Title_Menu").attr('disabled', true);
	$("#Paper_Edit_Toolbar_Format_List_Menu").attr('disabled', true);
 
    //bind the element-selected event with method[registerTextAlignListener];
	$('#Paper_Edit_Toolbar_Format_Align img').unbind('click.toolbar');

    //
    registerRulerMenuBIUListener();	
} 

function getPaperEditToolbarFormatAlignDisable(){
        $('#Paper_Edit_Toolbar_Format_Align img').removeClass('ui-selected');
        var currentObj = $(this);
        currentObj.addClass('ui-selected');
        var cmd = currentObj.attr('command');
        registerTextAlignListener(cmd);
    }


/**
* to change radio button's style into a button style. 
*/
function initRadio(){
        $('#popup-menu-tool-setting-content-radio-Check').buttonset();
        $('#popup-menu-tool-setting-content-radio-Word').buttonset();
        $('#popup-menu-tool-setting-content-radio-Center').buttonset();
        $('#popup-menu-tool-setting-content-radio-Edge').buttonset();
        $('#popup-menu-document-setup-content-radio-PageHeader').buttonset();
        $('#popup-menu-document-setup-content-radio-PageFooter').buttonset();
}

/**
* to registe the page-header and page-footer setup's event.
*/
function registerDocSetupListener(){
        var phalign;
        var phtext;
        var pfalign;
        var pftext;
        var data;
        $('#popup-menu-document-setup-content-radio-PageHeader input:checked').each(function() {
            phalign=$(this).attr('value');
        });
        $('#popup-menu-document-setup-content-radio-PageFooter input:checked').each(function() {
            pfalign=$(this).attr('value');
        });
        phtext=$('#popup-menu-tool-setting-content-text-PageHeader-text').val();
        pftext=$('#popup-menu-tool-setting-content-text-PageFooter-text').val();
        data = {
        	documentSettings: {
        		footer: {
        			'align': pfalign, 
            		'text': pftext
        		},
        		header: {
        			'align': phalign, 
            		'text': phtext
        		}
        	}
        };
        //alert(phvalue);
        //alert(phtext);
        //alert(pfvalue);
        //alert(pftext);
        sendMessage(com.hoperun.util.Observer.MessageType.DOCUMENT_STYLE,
                        null,data);
}

/**
* to registe the text-align setup's event.
* @param cmd
*/
function registerTextAlignListener(cmd){
    var data;
    if(currentSelectedObj){
        data = currentSelectedObj.data;
        if(cmd){
            switch (cmd) {
                    case 'justify':
                        data.style= { 'textAlign' : 'justify' };
                        break;
                    case 'left':
                        data.style= { 'textAlign' : 'left' };
                        break;
                    case 'center':
                        data.style= { 'textAlign' : 'center' };
                        break;
                    case 'right':
                        data.style= { 'textAlign' : 'right' };
                        break;
                }
                sendMessage(com.hoperun.util.Observer.MessageType.PARAGRAPH_STYLE,
                            com.hoperun.util.BaseTool.findObjWithId(currentSelectedObj.sender.getId()),
                            data);
        }
    }
}

/**
* to registe the left-ruler setup's event. 
* @param leftPosition
*/
function registerRulerLeftListener(leftPosition){
 
}

/**
* to registe the right-ruler setup's event. 
* @param rightPosition
*/
function registerRulerRightListener(rightPosition){
 
}

/**
* to registe the text-BIU setup's event.
*/
function registerRulerMenuBIUListener() {
    $('#Paper_Edit_Toolbar_Format_BIU .Text_Style_BIU_Model').click(function () {//added by chenpeng 20110630
        if(currentSelectedObj){
            var cmd = $(this).attr('command');
            if (cmd) {
                var checked = $(this).attr('checked');
                checked = checked ? checked == 'checked' : false;
                var data = currentSelectedObj.data;
                switch (cmd) {
                    case 'bold':
                        data.style = { 'bold': checked };
                        break;
                    case 'italic':
                        data.style = { 'italic': checked };
                        break;
                    case 'underline':
                        data.style = { 'textDecoration': checked };
                        break;
                    case 'linethrough':
                        data.style = { 'lineThrough': checked };
                        break;
                }
                sendMessage(com.hoperun.util.Observer.MessageType.TEXT_STYLE,
                            com.hoperun.util.BaseTool.findObjWithId(currentSelectedObj.sender.getId()),
                            data);
            }
        }
    });
}

/**
* to update the state of items on ruler menu by the type of text being selected.
* @param obj
*/
function refreshRulerMenu(obj){
    var currentSelectedObj = obj;
    if(currentSelectedObj){
        var currentSelectedType = currentSelectedObj.data.type;
        var styleItem = currentSelectedObj.sender.getTextContainerByOffset(currentSelectedObj.data.fromOffset, currentSelectedObj.data.isCollapsed);

		var currentSelectedObjData = styleItem.style;
        switch (currentSelectedType) {
            case 'Text':
                refreshRulerMenuBIU(currentSelectedObjData);
                break;
            default:
                break;
        }
        
        var paragraphObj = currentSelectedObj.sender;
        var align = paragraphObj.getTextAlign();
        refreshRulerMenuAlign(align);
        
        /**
        var container = getActiveContainer();
        var top = currentSelectedObj.getTop();
        var pageDivObj = currentSelectedObj.getDomInstance().parentNode;
        var pos = com.hoperun.util.BaseTool.getAbsPostion(pageDivObj);
        
        leftIndent = page.getContentPadding().left, rightIndent =  page.getContentPadding().right
        container.refreshPage(pageDivObj, top);*/
        
    }
    
}

// add by ZhangZhiyuan start

/**
* to update the state of items on ruler menu by the type of text being selected.
* @param obj
*/
function refreshTextLineSpacingMenu(container){
    if(container){
        var paragraphObj = container.getActiveSelection().getFrom();
        var paraStyleObj = paragraphObj.getParagraphStyle();
    	refreshTextMenuLine(paragraphObj, paraStyleObj);
    }
    
}

function refreshTextMenuLine(paragraphObj,styleItem) {
	$("#text-style-line-spacing").each(function () {
		$('#text-style-line-spacing').val(styleItem.textLineSpacing);
	});
	
	$("#Menu_Edit_Text_Layout_Align .Menu_Edit_Text_Layout_Align_Model").each(function () {
		var paraAlignStyle = $(this).attr('paraAlignStyle');
		if (paraAlignStyle == styleItem.textAlign) {
            $(this).attr('checked', true);
			$(this).button('refresh');
        }
	});
	
	$("#Menu_Edit_TextStyleListFormat_is_picked").remove();
	$("#Menu_Edit_TextSet_Style_Format .Menu_Edit_Text_Style_Format_ParagraphStyle").each(function () {
		var paraStyle = $(this).attr('paraStyle');
		if (paraStyle == styleItem.styleFormat.value) {
			 $(this).children("span").before('<div id="Menu_Edit_TextStyleListFormat_is_picked" style="float:right;border:0px;margin-right:25px;margin-top:10px;">' +
	    		'<input type="checkbox" disabled="true" checked="true"></div>');
        }else{
			$(this).children('div').remove();
		}
	});
}


function refreshTextMenuEnableOrDisable(obj){

	if(obj.data.type == 'Text'){
		$("#Paper_Edit_Toolbar_Format_Title_Menu").attr('disabled', false);
		$("#Paper_Edit_Toolbar_Format_BIU input").attr('disabled', false);
		$("#Paper_Edit_Toolbar_Format_List_Menu").attr('disabled', false);
		$('#Paper_Edit_Toolbar_Format_Align img').unbind('click.toolbar');
		$('#Paper_Edit_Toolbar_Format_Align img').bind('click.toolbar',getPaperEditToolbarFormatAlignDisable);
	}

}

function refreshImageMenuEnableOrDisable(obj){
	if(obj.getType() == 'Image'){
		$("#Paper_Edit_Toolbar_Format_Title_Menu").attr('disabled', true);
		$("#Paper_Edit_Toolbar_Format_BIU input").attr('disabled', true);
		refreshRulerMenuUnSelectedBIU();
		$("#Paper_Edit_Toolbar_Format_List_Menu").attr('disabled', true);
		$('#Paper_Edit_Toolbar_Format_Align img').removeClass('ui-selected');
		$('#Paper_Edit_Toolbar_Format_Align img').unbind('click.toolbar');
	}
}

function refreshCellDbClickEnableOrDisable(obj){
	if(currDocType!='paper'){
		return;
	}
	if(obj.getType() == 'Cell'){
		
		$("#Paper_Edit_Toolbar_Format_Title_Menu").attr('disabled', true);
		$("#Paper_Edit_Toolbar_Format_List_Menu").attr('disabled', true);

		if(obj.getTextAlign()){
			refreshRulerMenuAlign(obj.getTextAlign());
		}else{	
			$('#Paper_Edit_Toolbar_Format_Align img').removeClass('ui-selected');	
		}

		if(obj.getFontWeight()){
			refreshRulerMenuSelectedBIU(obj.getFontWeight(),true);
		}else{
			refreshRulerMenuUnSelectedBIU(obj.getFontWeight(),false);
		}
		
		if(obj.getFontStyle()){
			refreshRulerMenuSelectedBIU(obj.getFontStyle(),true);
		}else{
			refreshRulerMenuUnSelectedBIU(obj.getFontStyle(),false);
		}
		
		if(obj.getUnderline()){
			refreshRulerMenuSelectedBIU('underline',obj.getUnderline());
		}else{
			refreshRulerMenuUnSelectedBIU(obj.getUnderline(),false);
		}
	}
	
}


function refreshRulerMenuUnSelectedBIU() {
    $('#Paper_Edit_Toolbar_Format_BIU .Text_Style_BIU_Model').each(function () {
        var cmd = $(this).attr('command');
        if (cmd) {
            switch (cmd) {
                case 'bold':
                    $(this).attr('checked', false);
                    break;
                case 'italic':
                    $(this).attr('checked', false);
                    break;
                case 'underline':
                    $(this).attr('checked', false);
                    break;
                default:
                    break;
            }
            $(this).button('refresh');
        }
    });
};


function refreshRulerMenuSelectedBIU(menuType,menuBoolean) {
    $('#Paper_Edit_Toolbar_Format_BIU .Text_Style_BIU_Model').each(function () {
        var cmd = $(this).attr('command');
        if (cmd) {
           if(cmd==menuType){
				$(this).attr('checked', menuBoolean);
		   }
            $(this).button('refresh');
        }
    });
};



// add by ZhangZhiyuan end

/**
* to update the state of text-BIU on the ruler menu by the type of text being selected.
* @param style
*/
function refreshRulerMenuBIU(style) {
    $('#Paper_Edit_Toolbar_Format_BIU .Text_Style_BIU_Model').each(function () {//added by chenpeng 20110630
        var cmd = $(this).attr('command');
        if (cmd) {
            switch (cmd) {
                case 'bold':
                    $(this).attr('checked', (style.getBold() ? style.getBold() : false));
                    break;
                case 'italic':
                    $(this).attr('checked', (style.getItalic() ? style.getItalic() : false));
                    break;
                case 'underline':
                    $(this).attr('checked', style.getTextDecoration() != null && style.getTextDecoration());
                    break;
                default:
                    break;
            }
            $(this).button('refresh');
        }
    });
};

/**
* to update the state of text-align on the ruler menu by the type of paragraph being selected.
* @param align 
*/
function refreshRulerMenuAlign(align) {
    $('#Paper_Edit_Toolbar_Format_Align img').each(function() {
        var currentObj = $(this);
        var cmd = currentObj.attr('command');
        if(cmd && align){
            if(cmd == align){
            $('#Paper_Edit_Toolbar_Format_Align img').removeClass('ui-selected');
            currentObj.addClass('ui-selected');
            }
        }
    });
}

/**
* to update the state of ruler layer on ruler menu.
*/
function refreshRulerMenuIndent(leftIndent, rightIndent){
    $('#Paper_Edit_Toolbar_RulerLayer_Left_Init').css('left',leftIndent);
    $('#Paper_Edit_Toolbar_RulerLayer_Left_Init').css('left',rightIndent);
    $('#Paper_Edit_Toolbar_RulerLayer_Left_Init').attr('value',leftIndent);
    $('#Paper_Edit_Toolbar_RulerLayer_Right_Init').attr('value',rightIndent);
}