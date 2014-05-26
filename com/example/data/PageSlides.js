$(document).ready(function(){
	_activePresentationPageDivObj = $('.slides-presentation-page')[0];
	 var bodyResize = function () {
        //Update slide zoom
        layoutPresentationPage();
        resizeSlides();
    };
    $(window).resize(bodyResize);
    $(window).resize();
    
    //Register slide Event listener
    $('.slides-presentation').bind('mousedown', function(e){
    	var x = e.pageX;
    	var self = $(this);
    	if( self.hasClass('pageMoving') ||  self.hasClass('slideMoving') ){
    		return;
    	}
    	self.bind('mousemove', function(e){
    		var distance = e.pageX - x;
    		//When it has been handled by slider, remove the listener
    		if( self.hasClass('slideMoving') ){
    			self.unbind('mousemove').unbind('mouseup');
    		}
    		else{
    			if(Math.abs(distance) > 20){
    				if(!self.hasClass('pageMoving')) self.addClass('pageMoving');
    				var toBeShownSlidePage = null;
                	//Move to right, show the previous slide page
                	if(distance>0){
                		toBeShownSlidePage = findPrevPresentationPage(_activePresentationPageDivObj);
                	}
                	// Move to left, show the next slide page
                	else{
                		toBeShownSlidePage = findNextPresentationPage(_activePresentationPageDivObj);
                	}
                	if(toBeShownSlidePage){
                		self.unbind('mousemove').unbind('mouseup');
                		//console.info("Begin to do move!");
                		//console.info("self.hasClass('slideMoving') = "+ self.hasClass('slideMoving'));
                		_activePresentationPageDivObj = toBeShownSlidePage;
                		var left = '-'+$(toBeShownSlidePage).css('left');
                		self.animate({'left':left}, 1000, function(){
                			//console.info("Done to move page!");
                			//console.info("Done: self.hasClass('slideMoving') = "+ self.hasClass('slideMoving'));
                			self.removeClass('pageMoving');
                		});
                	}
                	else{
                		//Avoid to remove status before slide detect this status
                		setTimeout(function(){
                			self.removeClass('pageMoving');
                		}, 1000);
                	}
                	self.unbind('mousemove').unbind('mouseup');
        		}
    		} 
    	}).bind('mouseup', function(e){
    		$('.slides-presentation').removeClass('pageMoving');
    		self.unbind('mousemove').unbind('mouseup');
    	});
    	 
    });
    
    $('#canvas').bind('mousedown', function(e){
    	var obj = com.kenny.util.BaseTool.findEventElement(e);
        var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'objectType', "Slide");
        var isTrackerHandle = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'trackerType', "image");
        var isBack = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'id', "slides-presentation-template");
        if (!isValidEvent && !isBack || isTrackerHandle) {
            return;
        }
        var x = e.pageX;
    	var self = $(this);
    	self.bind('mousemove', function(e){
    		if(self.hasClass('pageMoving')){
    			return;
    		}
    		var distance = e.pageX - x;
    		//When it has been handled by slider, remove the listener
			if(Math.abs(distance) > 20){
				self.unbind('mousemove').unbind('mouseup');
				if(distance<0 && isValidEvent){
					//Update current slide changes into presentation
		        	updatePresentationSlide();
					var left = '-'+ (SLIDE_WIDTH + 16);
					self.addClass('pageMoving');
            		self.animate({'left':left}, 1000, function(){
            			self.removeClass('pageMoving');
            		});
            		$('#slide-edit-footer-template').show();
            		$('#slide-edit-footer').hide();
            		$("#popup-menu-edit-bar").hide();
            		$('#overflow-button').hide();
				} else if(distance>0 && isBack){
					self.addClass('pageMoving');
					self.animate({'left':0}, 1000, function(){
            			self.removeClass('pageMoving');
            		});
					$('#slide-edit-footer-template').hide();
					$('#slide-edit-footer').show();
					$('#overflow-button').show();
				}
    		}
    	}).bind('mouseup', function(e){
    		//$('.slides-presentation').removeClass('pageMoving');
    		self.unbind('mousemove').unbind('mouseup');
    	});
    	 
    });

    $('#backToPresentation').click(function(){
    	$('#contentId').hide();
    	$('#themesList').show();
		$('#docsList').show();
		$('#docsName').show();
		$('#slide-themes-footer').show();
		$('#slide-edit-footer').hide();
		$('#overflow-button').hide();
		$('#slide-edit-footer-template').hide();
    	//Update current slide changes into presentation
    	updatePresentationSlide();
    	
    	stopAllVideo();
    	
		$(".slides-presentation").show().animate({
		   opacity: 'show'
		}, "slow", "easein");
    });
    
    $('.presentation-slide-button-left').click(function(){
    	var index = slides.indexOf(currSlide, 0);
		var preSlide = slides[index-1];
		if(preSlide != null){
			var canvas = $('#canvas');
			canvas.fadeOut("slow", function(){
				setCurrSlide(preSlide);
				canvas.show();
				//var left = canvas.css('left');
				//canvas.css('left',-canvas.width());
				//canvas.animate({left:left}, 1000);
			});
			$('.presentation-slide-button-right').show();
		}
		else{
			$('.presentation-slide-button-left').hide();
		}
		//Update current slide changes into presentation
    	updatePresentationSlide();
    });
    $('.presentation-slide-button-right').click(function(){
    	var index = slides.indexOf(currSlide, 0);
		var nextSlide = slides[index+1];
		if(nextSlide != null){
			var canvas = $('#canvas');
			canvas.fadeOut("slow", function(){
				setCurrSlide(nextSlide);
				canvas.show();
				//var left = canvas.css('left');
				//canvas.css('left',com.kenny.util.BaseTool.convertPixelToNumber(left)+canvas.width());
				//canvas.animate({left:left}, 1000);
			});
			$('.presentation-slide-button-left').show();
		}
		else{
			$('.presentation-slide-button-right').hide();
		}
    });

    $('#overflow-button').bind('mouseover', function(){
    	$(this).css('height','75px');
    }).bind('mouseout', function(){
    	$(this).css('height','20px');
    });
});

var slides = [];
var currentSelectedSlide = [];
var currentSelectedSlideAbbreviation = [];
var leftSideSlides = [];
var currSlide = null;
var coyiedSlide = null;
var currentSelectedObj = null;
var currentSelectedTemplate = null;

var SLIDE_HEIGHT = 776, SLIDE_WIDTH = 1366, SLIDE_COL_NUMBER = 5, SLIDE_ROW_NUMBER = 4;
var _presetationZoom = 1, _presentationWidth = 100, _presentationHeight = 75, slideZoom = 1, prevSlideZoom = 1, _prevPresentationZoom = 1;
var _indent = {
		top:-4,
		right:58,
		bottom:20,
		left:8
};
var _margin = {
		left:50,
		top:50
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Method to update presentation slide
var _activePresentationPageDivObj = null;
function findPrevPresentationPage(presentationPageDivObj){
	var prevSibling = presentationPageDivObj.previousSibling;
	while(prevSibling){
		if(prevSibling.className && prevSibling.className.indexOf('slides-presentation-page')!=-1){
			break;
		}
		prevSibling = prevSibling.previousSibling;
	}
	return prevSibling;
}
function findNextPresentationPage(presentationPageDivObj){
	var nextSlide = presentationPageDivObj.nextSibling;
	while(nextSlide){
		if(nextSlide.className && nextSlide.className.indexOf('slides-presentation-page')!=-1){
			break;
		}
		nextSlide = nextSlide.nextSibling;
	}
	return nextSlide;
}
function findAndCreateNextPresentationPage(presentationPageDivObj){
	var rel = findNextPresentationPage(presentationPageDivObj);
	if(!rel){
		rel = createPresentationPage(presentationPageDivObj);
	}
	return  rel;
}
//Create presentation page
function createPresentationPage(presentationPageDivObj){
	var newPresentationPageDivObj = document.createElement("div");
	newPresentationPageDivObj.className = "slides-presentation-page";
	presentationPageDivObj.insertAdjacentElement('afterEnd',newPresentationPageDivObj);
	layoutPresentationPage();
	return newPresentationPageDivObj;
}
//Do layout presentation page
function layoutPresentationPage(){
	var width = $("#myContent").width() * 0.98, height =  $("#myContent").height() * 0.97;
	$('.slides-presentation-page').each(function(i){
		$(this).css("width", width).css('left', width * i);
	});
	if(height < 718){
		height = 718;
	}
	else{
		height -= 68;
	}
	$('.slides-presentation').css('height', height).css('width',$('.slides-presentation-page').length * width);
}
//Do layout presentation slide
function layoutSlidesPresetation(presentationPageDivObj){
	var moveNextPageItems = [];
	for(var i=0; i<presentationPageDivObj.children.length; i++){
		var slideObj = presentationPageDivObj.children[i];
		var colIdx = i%SLIDE_COL_NUMBER;
		var rowIdx = (i-i%SLIDE_COL_NUMBER)/SLIDE_COL_NUMBER;
		if(SLIDE_ROW_NUMBER <= rowIdx){
			moveNextPageItems.push(slideObj);
		}
		else{
			var left = colIdx * _presentationWidth + _margin.left + _indent.left;
			var top = rowIdx * _presentationHeight + _margin.top + _indent.top;
			$(slideObj).css('top', top).css('left', left);
		}
	}
	if(moveNextPageItems.length > 0){
		var nextPage = findAndCreateNextPresentationPage(presentationPageDivObj);
		for(var i=moveNextPageItems.length-1; i>-1; i--){
			nextPage.insertAdjacentElement('afterBegin',moveNextPageItems[i]);
		}
		layoutSlidesPresetation(nextPage);
	}
}
//Do resize presentation
function resizePresentations(w, h){
//	for(var i=0; i<leftSideSlides.length; i++){
//		leftSideSlides[i].zoom(_presetationZoom);
//	}
	//Update add slider width
	$('.slide-presentation-add').css('width', _presetationZoom * SLIDE_WIDTH).css('height', _presetationZoom * SLIDE_HEIGHT);
}
//Update presentation slide
function updatePresentationSlide(){ 
	if(slides.indexOf(currSlide,0) != -1){
		var slide = leftSideSlides[slides.indexOf(currSlide,0)];
		slide.setData(currSlide.getData());
		slide.setWidth(SLIDE_WIDTH);
		slide.setHeight(SLIDE_HEIGHT);
		slide.zoom(_presetationZoom);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Method to update the selected slide
//Resize presentation and the selected slide
function resizeSlides(){
	var contentObj = $('#myContent');
	var w = contentObj.width() * 0.98, h = contentObj.height() * 0.97;

	_presentationWidth = (w - _indent.left - _indent.right) / SLIDE_COL_NUMBER;
	_presetationZoom = (_presentationWidth - _margin.left) / SLIDE_WIDTH;
	_presentationHeight = _presetationZoom * SLIDE_HEIGHT + _margin.top;
	//Do set slide size
	resizeSlide(w, h);
	
	//Re-calculate size &position for presentation.
	resizePresentations(w, h);
	layoutSlidesPresetation(_activePresentationPageDivObj); //TODO: this active need be updated when page changes.
}
//Resize the selected slide
function resizeSlide(w, h){
	//Find zoom size for the selected slide
	var wZoom = (w - 40) / SLIDE_WIDTH, hZoom = (h - 30) / SLIDE_HEIGHT;
	slideZoom = wZoom;
	
	if(wZoom > hZoom){
		slideZoom = hZoom;
	}
	//TODO: Leave it to be done!
	slideZoom = 1;
	
	var cw = slideZoom*SLIDE_WIDTH, ch = slideZoom*SLIDE_HEIGHT, left = (w-cw)/2, top = (h-ch)/2;
	//Do set slide size
	if(top<30){
		top = 30;
	}
	if(left<10){
		left = 10;
	}
	//$("#canvas").css("left", left).css("top", top).css('width', cw).css('height', ch);
	$("#canvas").css('width', cw).css('height', ch);
	//$('#canvas').css('height', ch).css('width', ($('.slides-presentation-template').length + 1) * cw);
	$('#overflow-button').css('left', (w-230)/2);
	if(currSlide){
		updateCurrentSlide();
	}
}
function updateCurrentSlide(){
	currSlide.setWidth(SLIDE_WIDTH);
	currSlide.setHeight(SLIDE_HEIGHT);
	currSlide.zoom(slideZoom);
}
function swapPresentationAndSlide(showSlide){
	if(showSlide){
		//templateInitialize(true);
		$('.slides-presentation').hide();
		$('#themesList').hide();
		$('#docsList').hide();
		$('#docsName').hide();
		$('#slide-themes-footer').hide();
		$('#slide-edit-footer').show();
		$('#overflow-button').show();
		$('#slide-edit-footer-template').hide();
		$('#canvas').css("left", 0);
		$("#contentId").show().animate({
		   opacity: 'show'
		}, "slow", "easein");
	}
	else{
		
	}
}

function addPresentationSlide(slide){
	var newSlide = slide.clone();
	newSlide.setWidth(SLIDE_WIDTH);
	//alert(SLIDE_WIDTH);
	newSlide.setHeight(SLIDE_HEIGHT);
	//Make a container to contain new slide, to avoid event
	var parentDiv = document.createElement("div");
	parentDiv.className = "slide-presentation slide-presentation-move";
	var parentTransitionTypeDiv = document.createElement("div");
	var parentTransitionTypeDivId = com.kenny.util.BaseTool.uuid();
	parentTransitionTypeDiv.id = parentTransitionTypeDivId;
	parentTransitionTypeDiv.style.width = SLIDE_WIDTH * _presetationZoom * 0.6;
	parentTransitionTypeDiv.style.height = 24;
	parentTransitionTypeDiv.style.top = -26;
	parentTransitionTypeDiv.style.left = -3;
	parentTransitionTypeDiv.style.position = "absolute";
	parentTransitionTypeDiv.style.textAlign = "left";
	//parentTransitionTypeDiv.style.background = "URL('images/03 Main Nav/Pop Menus/menu_mode_btn_off.png')";
	if("none" == newSlide._transitions||null == newSlide._transitions){
	parentTransitionTypeDiv.innerHTML = "<img src='images/03 Main Nav/Nav Bar/transition-type-off.png' style='float:left;margin:5px;'/>";
	} else {
		parentTransitionTypeDiv.style.background = "URL('images/05 Menus/Graphics/cam_roll/sub_2_header_sml.png')";
		parentTransitionTypeDiv.innerHTML = "<img src='images/03 Main Nav/Nav Bar/transition-type-on.png' style='float:left;margin:5px;'/>" + newSlide._transitions.substr(0,1).toUpperCase() + newSlide._transitions.substr(1);
	}
	parentDiv.appendChild(parentTransitionTypeDiv);
	parentDiv.appendChild(newSlide.getDomInstance());
	var imageDotObj = document.createElement('img');
	imageDotObj.src = "images/cleardot.gif";
	imageDotObj.className = "slide-presentation-dot";
	parentDiv.appendChild(imageDotObj);
	$('.slide-presentation-add')[0].insertAdjacentElement('beforeBegin',parentDiv);
	
	newSlide.zoom(_presetationZoom);
	leftSideSlides.add(newSlide);
	
	//Update position for presentation
	layoutSlidesPresetation($('.slide-presentation-add')[0].parentNode);
	
	var isHandlerFlag = false;
	$(parentDiv).click(function(e){
		var eventObj = $(this);
		var obj = com.kenny.util.BaseTool.findEventElement(e);
		var isValidEvent = com.kenny.util.BaseTool.findNearestParentNodeWithAttributeValues(obj, 'class', "slide-presentation-dot");
        if(isValidEvent){
			isHandlerFlag = false;
			setTimeout(function(){
				//No handled; without noclick class and without page moving on slide-presentation
				if(!isHandlerFlag && !eventObj.hasClass('noclick') && !$('.slides-presentation').hasClass('pageMoving')){
					//The current mode.
					var currentMode = $("#slide-themes-footer-edit").css("display");
					if(currentMode!="block"){
						setCurrSlide(slide);
						swapPresentationAndSlide(true);
					} else {
						setSelectedSlide(parentDiv, slide, newSlide);
					}
				}
				eventObj.removeClass('noclick');
			}, 200);
        } else {
        	if(document.getElementById("currentSlideId")){
	        	com.kenny.util.BaseTool.showMenuShadow();
	            document.getElementById("currentSlideId").innerHTML = slide.getId();
	            document.getElementById("parentDivId").innerHTML = parentTransitionTypeDivId;
	        	$("#popup-menu-transition").css('display', 'block').css("top", e.pageY).css("left", e.pageX);
	        	if (null != e.currentTarget.children[0].firstChild.nextSibling) {
					var currentTransition = e.currentTarget.children[0].firstChild.nextSibling.data;
					if ("None" == currentTransition) {
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee ui-selected";
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
					} else if ("Alpha" == currentTransition) {
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee ui-selected";
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
					} else if ("Translate" == currentTransition) {
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee ui-selected";
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
					} else if ("Rotate" == currentTransition) {
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee ui-selected";
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
					} else if ("Scale" == currentTransition) {
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee ui-selected";
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
					} else {
						$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
						$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
					}
				} else {
					$("#menu-text-style-slide")[0].children[0].className = "li-top-radius ui-widget-content ui-selectee";
					$("#menu-text-style-slide")[0].children[1].className = "ui-widget-content ui-selectee";
					$("#menu-text-style-slide")[0].children[2].className = "ui-widget-content ui-selectee";
					$("#menu-text-style-slide")[0].children[3].className = "ui-widget-content ui-selectee";
					$("#menu-text-style-slide")[0].children[4].className = "li-bottom-radius ui-widget-content ui-selectee";
				}
        	}
        }
	}).draggable({
		zIndex:3000,
		distance: 10,
		delay: 1000,
		opacity: 0.7, 
		helper: 'clone',
		containment: '#myContent',
		appendTo: '#myContent',
		start: function(e, ui){
			$(this).addClass('noclick');
			
			//Detect whether slide-presentation is moving or moved
			if(!$('.slides-presentation').hasClass('pageMoving')){
				$('.slides-presentation').addClass('slideMoving');
			}
			else{
				//console.info("Page is moving, when slide begins to do drag!");
				return false;
			}
		},
		refreshPositions: true,
		drag: function(e, ui){
			//console.log("It is drag with refresh position is true!");
			var eventObj = $(this), slidesObj = $('.slides-presentation');
			if(slidesObj.hasClass('pageMoving')){
				//console.info("Page is moving!");
				return false;
			}
			
			var isPendingFlag = eventObj.hasClass('movePending');
			
			eventObj.removeClass('movePending');
			if(ui.position.left <= 0) { //com.kenny.util.BaseTool.convertPixelToNumber($(_activePresentationPageDivObj).css('left'))){ //
				eventObj.addClass('movePending');
				if(!isPendingFlag) setTimeout(function(){
					if(eventObj.hasClass('movePending')){
						eventObj.removeClass('movePending');
						var toBeShownSlidePage = findPrevPresentationPage(_activePresentationPageDivObj);
		            	if(toBeShownSlidePage){
		            		//ui.helper.css('left', com.kenny.util.BaseTool.convertPixelToNumber(ui.helper.css('left')) - $(_activePresentationPageDivObj).width());
		            		_activePresentationPageDivObj = toBeShownSlidePage;
		            		
		            		var left = '-' + $(toBeShownSlidePage).css('left');
		            		
		            		slidesObj.animate({'left':left}, 1000);
		            	}
					}
				}, 1000);
			}
			else if(ui.position.left + eventObj.width() >= $(_activePresentationPageDivObj).width()){
				eventObj.addClass('movePending');
				if(!isPendingFlag) setTimeout(function(){
					if(eventObj.hasClass('movePending')){
						eventObj.removeClass('movePending');
						var toBeShownSlidePage = findNextPresentationPage(_activePresentationPageDivObj);
		            	if(toBeShownSlidePage){
		            		//ui.helper.css('left', com.kenny.util.BaseTool.convertPixelToNumber(ui.helper.css('left')) - $(_activePresentationPageDivObj).width());
		            		_activePresentationPageDivObj = toBeShownSlidePage;
		            		
		            		var left = '-'+$(toBeShownSlidePage).css('left');
		            		
		            		slidesObj.animate({'left':left}, 1000);
		            	}
					}
				}, 1000);
			}
		},
		stop: function(e, ui){
			//console.log("It is Stop happened First!");
			var eventObj = $(this);
			setTimeout(
				function(){
					eventObj.removeClass('noclick');
					
					$('.slides-presentation').removeClass('slideMoving');
				},
				300
			);
		}
    }).droppable({
    	accept: '.slide-presentation-move',
    	activeClass: 'slide-presentation-droppable-active',
    	over: function(event, ui) { 
    		//console.log("You are is over on me! with id is "+ this.firstChild.id);
    	},
    	activate: function(event, ui) {
    		//console.log("I am activate!");
    	},
    	create: function(event, ui) {
    		//console.log("I am Create!");
    	},
    	drop: function(event, ui) {
    		
    		//var target = $(this);
    		var targetDivObj = this;
    		var originalDivObj = ui.draggable[0];
    		
    		var targetId = this.firstChild.id;
    		var originalId = ui.draggable[0].firstChild.id;
    		
    		var targetObj = com.kenny.util.BaeTool.findObjWithId(targetId);
    		var originalObj = com.kenny.util.BaeTool.findObjWithId(originalId);
    		
    		var targetIndex = leftSideSlides.indexOf(targetObj), originalIndex = leftSideSlides.indexOf(originalObj);

    		var dragposition = ui.draggable.position();
			var dropposition = $(targetDivObj).position();
			
			var withDifference = parseInt(dragposition.left)-parseInt(dropposition.left);
			var heightDifference = parseInt(dragposition.top)-parseInt(dropposition.top);
			
			var targetParentDivObj = targetDivObj.parentNode, originalParentDivObj = originalDivObj.parentNode;
			
			if(targetParentDivObj == originalParentDivObj){
				$(this).animate({
					left:'+='+withDifference,
					top:'+='+heightDifference
				},'slow',function(){
					
				});
			}
			targetDivObj.swapNode(originalDivObj);
			ui.draggable.animate({
				left:'+='+(withDifference*(-1)),
				top:'+='+(heightDifference*(-1))
			},'slow',function(){
				try{
					//Complete
					//targetDivObj.insertAdjacentElement('beforeBegin', originalDivObj);
		    		leftSideSlides.swap(targetIndex, originalIndex);
		    		slides.swap(targetIndex, originalIndex);
		    		if(targetParentDivObj != originalParentDivObj){
		    			layoutSlidesPresetation(originalParentDivObj);
		    		}
		    		layoutSlidesPresetation(targetParentDivObj);
				}catch(e){
					//console.info("Exception: "+e);
				}
			});
    	}
    });
}
	
function setSelectedSlide(currentDiv, slideOfSelected, newSlideOfSelected){
	if(currentDiv){
		var isHasImageDiv = false;
		for(var j = 0; j < currentDiv.childNodes.length; j++){
			if (currentDiv.childNodes[j].className && "slide-edit-selected-image".indexOf(currentDiv.childNodes[j].className) != -1){
				isHasImageDiv = true;
				currentDiv.removeChild(currentDiv.childNodes[j]);
				if(currentSelectedSlide.indexOf(slideOfSelected, 0)!=-1){
					var index = currentSelectedSlide.indexOf(slideOfSelected, 0);
					currentSelectedSlide.removeAt(index);
					currentSelectedSlideAbbreviation.removeAt(index);
				}
			}
		}
		if(!isHasImageDiv){
			var imageDotObj = document.createElement('img');
			imageDotObj.src = "images/02_Text/Colours Pop-down/red_press.png";
			imageDotObj.className = "slide-edit-selected-image";
			imageDotObj.style.height = 51;
			imageDotObj.style.top = -26;
			imageDotObj.style.left = SLIDE_WIDTH * _presetationZoom - 20;
			imageDotObj.style.opacity = 0.5;
			imageDotObj.style.position = "absolute";
			currentDiv.appendChild(imageDotObj);
			currentSelectedSlide.add(slideOfSelected);
			currentSelectedSlideAbbreviation.add(newSlideOfSelected);
		}
	}
}
	
function removePresentationSlide(index){
	var slide = leftSideSlides[index];
	var slideParentDivObj = slide.getDomInstance().parentNode;
	if(slideParentDivObj){
		var presentationPageDivObj = slideParentDivObj.parentNode;
		presentationPageDivObj.removeChild(slideParentDivObj);
		//Update position for presentation
		layoutSlidesPresetation(presentationPageDivObj);
	}
	leftSideSlides.removeAt(index);
}

//set slide to current one
function setCurrSlide(slide){
	if(slide != null){
		if(currSlide != null){
			document.getElementById("canvas").removeChild(currSlide.getDomInstance());
		}
		currSlide = slide;
		updatePresentationSlide();
		document.getElementById("canvas").appendChild(slide.getDomInstance());
		sendMessage(com.kenny.util.Observer.MessageType.CONTEXT_BLUR, null, {});
		
		//Update buttons
		var index = slides.indexOf(currSlide, 0);
        if(index>0){
        	$('.presentation-slide-button-left').show();
        }
        else{
        	$('.presentation-slide-button-left').hide();
        }
        if(index<slides.length-1){
        	$('.presentation-slide-button-right').show();
        }
        else{
        	$('.presentation-slide-button-right').hide();
        }
        
        //
        stopAllVideo();
        var videoLtngth=slide.getDomInstance().getElementsByTagName("video").length;
		if(videoLtngth>0){
			for(var v=0;v<videoLtngth;v++){
				slide.getDomInstance().getElementsByTagName("video")[v].play();
			}
		}
	}
}

function addSlide(templateId){
	with(com.kenny.node)
	with(com.kenny.shape)
	{
		if(templateId==null || templateId.length==0 || templateId=="template_0"){
			var slide = new Slide();
			addPresentationSlide(slide);
			setCurrSlide(slide);
			slides.add(slide);
			
			var contentObj = $('#myContent');
			var w = contentObj.width() * 0.98, h = contentObj.height() * 0.97;
			resizeSlide(w, h);
			
			return slide;
		}else{
			alert("create slide from template hasn't been implemented");
		}
	}
}

// remove slide
function removeSlide(slide){
	if(slide == null){
		return;
	}	
	if(slides.length == 1){
		alert("Should reserve at least one slide");
		return;
	}
	if(currSlide === slide){
		var index = slides.indexOf(slide, 0);
		var nextSlide = slides[index+1];
		var preSlide = slides[index-1];
		if(nextSlide != null){
			setCurrSlide(nextSlide);
		}else if(preSlide != null){
			setCurrSlide(preSlide);
		}
	}
	if(slides.indexOf(slide, 0)!=-1){
		var index = slides.indexOf(slide, 0);
		slides.removeAt(index);
		removePresentationSlide(index);
	}
}

// add elements to current slide
function addObjectToCurrSlide(object){
	if(currSlide != null){
		object.appendTo(currSlide);
	}
}

function stopAllVideo(){
	for(var s=0;s<slides.length;s++){
		var videoLtngth=slides[s].getDomInstance().getElementsByTagName("video").length;
		if(videoLtngth>0){
			for(var v=0;v<videoLtngth;v++){
				slides[s].getDomInstance().getElementsByTagName("video")[v].pause();
				leftSideSlides[s].getDomInstance().getElementsByTagName("video")[v].pause();
			}
		}
	}
}

function cutSlide(){
	copySlide();
	removeSlide(currSlide);
}

function copySlide(){
	coyiedSlide = currSlide.clone();
}

function pasteSlide(){
	var slide = coyiedSlide;
	addPresentationSlide(slide);
	setCurrSlide(slide);
	slides.add(slide);
}

//Get template
function templateInitialize() {
	with(com.kenny.node)
	with(com.kenny.node.shape){
    	var fileInfo = {
				fileType : "slide",
				docid: "template",
				folderName: "01",
				fileFolderName: document.getElementById('folderNameOfFile').innerHTML
	    	};
	    	com.kenny.util.FileHelper.load(fileInfo, function(data){
	    		if(data.fileFolderName){
	    			document.getElementById('folderNameOfFile').innerHTML = data.fileFolderName;
	    		}
	    		if(data.slide){
		    		layoutSlidesTemplate(data.slide);
	    		}
	    	});
	}
}

//Do template layout presentation slide
function layoutSlidesTemplate(presentationTemplateDivObj){
	var moveNextPageItems = [];
	for(var i=0; i<presentationTemplateDivObj.length; i++){
		var newSlide = new com.kenny.node.Slide();
		var templatedata = JSON.parse(presentationTemplateDivObj[i])[0];
		newSlide.setData(templatedata);
		var templateObj= newSlide.clone();
		var colIdx = i%SLIDE_COL_NUMBER;
		var rowIdx = (i-i%SLIDE_COL_NUMBER)/SLIDE_COL_NUMBER;
		if(SLIDE_ROW_NUMBER <= rowIdx){
			moveNextPageItems.push(templateObj);
		}
		else{
			var left = colIdx * _presentationWidth + _margin.left + _indent.left;
			var top = rowIdx * _presentationHeight + _margin.top + _indent.top;
			templateObj.setWidth(SLIDE_WIDTH);
			templateObj.setHeight(SLIDE_HEIGHT);
			templateObj.zoom(_presetationZoom);
			var parentDiv = document.createElement("div");
			parentDiv.className = "slide-presentation slide-presentation-move";
			parentDiv.appendChild(templateObj.getDomInstance());
			var imageDotObj = document.createElement('img');
			imageDotObj.src = "images/cleardot.gif";
			imageDotObj.className = "slide-presentation-dot";
			parentDiv.appendChild(imageDotObj);
			parentDiv.style.top = top;
			parentDiv.style.left = left;
			(function(slide){
				$(parentDiv).click(function(){
					currentSelectedTemplate = slide.clone();
				});	
			})(newSlide);
					
			document.getElementById("slides-presentation-template").appendChild(parentDiv);	
		}
	}
	//add button
	layoutAddTemplate(presentationTemplateDivObj.length);
	//set the template div's style
	layoutPresentationTemplate();
}

function swapTemplateAndSlide(showSlide, isShowCurrentSlide){
	if(showSlide){
		$('.slides-presentation').hide();
		$('#themesList').hide();
		$('#docsList').hide();
		$('#docsName').hide();
		$('#slide-themes-footer').hide();
		$('#slide-edit-footer').show();
		$('#overflow-button').show();
		$('#slide-edit-footer-template').hide();
		$("#contentId").show().animate({
		   opacity: 'show'
		}, "slow", "easein");
		if(!isShowCurrentSlide){
			$('#canvas').css('left', -SLIDE_WIDTH - 16);
			$('#slide-edit-footer-template').show();
			$('#slide-edit-footer').hide();
			$('#overflow-button').hide();
		}
	}
}

//Do layout presentation page
function layoutAddTemplate(countOfTemplate){
	var parentAddDiv = document.createElement("div");
	parentAddDiv.className = "slide-presentation slide-presentation-move";
	var addImageObj = document.createElement('img');
	addImageObj.src = "images/office_slide_addIcon.png";
	addImageObj.className = "slide-template-add";
	parentAddDiv.appendChild(addImageObj);
	var addColIdx = countOfTemplate % SLIDE_COL_NUMBER;
	var addRowIdx = (countOfTemplate - countOfTemplate % SLIDE_COL_NUMBER)/SLIDE_COL_NUMBER;
	parentAddDiv.style.width = SLIDE_WIDTH * _presetationZoom;
	parentAddDiv.style.height = SLIDE_HEIGHT * _presetationZoom;
	parentAddDiv.style.top = addRowIdx * _presentationHeight + _margin.top + _indent.top;
	parentAddDiv.style.left = addColIdx * _presentationWidth + _margin.left + _indent.left;
	document.getElementById("slides-presentation-template").appendChild(parentAddDiv);
	$(parentAddDiv).click(function(){
		if(currentSelectedTemplate){
			addPresentationSlide(currentSelectedTemplate);
			slides.add(currentSelectedTemplate);
			setCurrSlide(currentSelectedTemplate);
			swapTemplateAndSlide(true, true);
			$('#canvas').css("left", 0);
			currentSelectedTemplate = null;
		} else {
			alert("Please select a template!");
		}
	});	
}

//Do layout presentation page
function layoutPresentationTemplate(){
	var width = $("#myContent").width() * 0.98, height =  $("#myContent").height() * 0.97;
	$('.slides-presentation-template').each(function(i){
		$(this).css("width", width).css('left', width * (i + 1));
	});
	if(height < 770){
		height = 770;
	}
	else{
		height -= 68;
	}
	$('#slides-presentation-template').css('height', height).css('width', width).css('left', width).css('top', 0);
}

(function(){
	function pageInitialize() {
		with(com.kenny.node)
		with(com.kenny.node.shape){
			var random = urlParameter.id;
		    var fileInf = {'random': random};
		    var fileInfo;
			if(urlParameter.docid){
				swapTemplateAndSlide(true, true);
				$('#canvas').css("left", 0);
				fileInfo = {
					userName : urlParameter.userName,
					fileType : urlParameter.fileType,
					docid: urlParameter.docid,
					folderName: urlParameter.folderName
		    	};
				document.getElementById("fileName").value = urlParameter.docid;
			}
			com.kenny.util.FileHelper.loadParams(fileInf, function(temp_data){
		    if(temp_data){
		    	if(random){
			    	fileInfo = {
						userName : temp_data.username,
						fileType : temp_data.doctype,
						fileName : temp_data.filename,
						//docid: urlParameter.docid,
						//folderName: urlParameter.folderName,
						version: urlParameter.version,
						fileFolderName: temp_data.uuid
		    	};
			    	document.getElementById("fileName").value = temp_data.filename;
		    	}
		    	com.kenny.util.FileHelper.load(fileInfo, function(data){
		    		if(data.fileFolderName){
		    			document.getElementById('folderNameOfFile').innerHTML = data.fileFolderName;
		    		}
		    		for(var i=0; i<data.slide.length; i++) {
		    			var slideReturn = JSON.parse(data.slide[i]);
		    			
		    			for(var j=0; j<slideReturn.length; j++) {
		    				var slide = new Slide();
		    				var obj = slideReturn[j];
			    			slide.setData(obj);
			    			addPresentationSlide(slide);
			    			if(j==0)setCurrSlide(slide);
			    			slides.add(slide);
			    			templateInitialize();
		    			}
		    		}
		    	});
			} else {
				addSlide();
				for(var i=0; i<15; i++){
			    	addSlide();
			    }
			}
			});
		    sendMessage(com.kenny.util.Observer.MessageType.SLIDES_CREATE, null, {});
		}
	}
	
	$(document).ready(pageInitialize);
})();
