
//当前选中的li
var currentLi='none';
// 开始过渡选项(清按时，上个过渡之后)
var selectedTransition=null;
// 选择的下拉框值
var selectedCombox=null;
// 延迟时间
var laterTime=null;
// 过渡时间
var selectedTime=null;

function transitionReady(){
	// 过渡效果,过渡选项
	$("#menu-text-style-slide").selectable();
    $("#selectButton").tabs();
    
    $("#menu-text-style-slide > li").each(function () {
        $(this).click(function () {
            var data = null;
            var value = $(this).text().toLowerCase();
            currentLi = value;
            data = { 'transitions': currentLi,'selectedTransition':selectedTransition,'selectedCombox':selectedCombox,'selectedTime':selectedTime,
            		'laterTime':laterTime };
            if(document.getElementById("parentDivId") && document.getElementById(document.getElementById("parentDivId").innerHTML)){
	            var parentTransitionTypeDiv = document.getElementById(document.getElementById("parentDivId").innerHTML);
	            if($(this).text() != "None"){
	            	var transitionType = $(this).text();
	            	parentTransitionTypeDiv.style.background = "URL('images/05 Menus/Graphics/cam_roll/sub_2_header_sml.png')";
	            	parentTransitionTypeDiv.innerHTML = "<img src='images/03 Main Nav/Nav Bar/transition-type-on.png' style='float:left;margin:5px;'/>" + transitionType;
	            } else {
	            	parentTransitionTypeDiv.style.background = "";
	            	parentTransitionTypeDiv.innerHTML = "<img src='images/03 Main Nav/Nav Bar/transition-type-off.png' style='float:left;margin:5px;'/>";
	            }
	            //alert(currentLi);
	        	var currentSlideId = document.getElementById("currentSlideId").innerHTML;
	        	var currentSlide = com.kenny.util.BaseTool.findObjWithId(currentSlideId);
	            sendMessage(com.kenny.util.Observer.MessageType.SLIDE_ADD_TRANSITION,
	            		currentSlide,
	                    data);
	            com.kenny.util.BaseTool.closeMenuPopup();
            }
        });
    });

    $("#text-style-transition > li").each(function () {
        $(this).click(function () {
            var data = null;
            var value = $(this).text();
            selectedTransition = value;
            //alert(selectedTransition);
        });
    });
}