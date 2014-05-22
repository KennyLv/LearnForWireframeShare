//Import CSS
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/hoperun\/css\/global.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/hoperun\/css\/tracker.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/hoperun\/css\/popup.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/hoperun\/css\/defaultElementStyle.css\">");
//Import JS library
if(!com) var com = {};
if(!com.hoperun) com.hoperun = {};
if(!com.hoperun.util) com.hoperun.util = {};
if(!com.hoperun.model) com.hoperun.model = {};
if(!com.hoperun.node) com.hoperun.node = {};
if(!com.hoperun.node.chart) com.hoperun.node.chart = {};
if(!com.hoperun.node.shape) com.hoperun.node.shape = {};
if(!com.hoperun.menu) com.hoperun.menu = {};
if(!com.hoperun.event) com.hoperun.event = {};
if(!com.hoperun.tracker) com.hoperun.tracker = {};
if(!com.hoperun.render) com.hoperun.render = {};
if(!com.hoperun.helper) com.hoperun.helper = {};
//Compatible difference between on browsers, and extends some basic function for default JS object
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/BrowserCompatible.js\"><\/script>");

//Third parts library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/Json.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jquery-1.6.2.min.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jquery-ui-1.8.16.custom.min.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jquery.hotkeys.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jquery.form.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jskata.undo.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/encoder.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/jquery.event.extendedclick.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/log4js.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/raphael.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/g.raphael.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/g.pie.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/g.bar.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/g.dot.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/g.line.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/raphael.chart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/3rd\/innerText.js\"><\/script>");

//Basic tool library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/PageSetting.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/Hashtable.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/Observer.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/NodeCache.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/BaseTool.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/CommonUtil.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/ShapeHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/FileHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/TextStyleContainerUtils.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/AlgorithmsParseTools.js\"><\/script>");
//Model library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/LineModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/BasicModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/TableSelection.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/TextSelectionModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/SvgTextSelectionModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/model\/SvgStyle.js\"><\/script>");

//Broad Event library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/MouseEvent.js\"><\/script>");


window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Node.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Cell.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Table.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Image.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Page.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Slide.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Sheet.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Style.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Paragraph.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/Video.js\"><\/script>");

//Shape
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Shape.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Rectangle.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Ellipse.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Polygon.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Star.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Diamond.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Triangle.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Pentagon.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/AbnormityTriangle.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/SingleArrow.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/DoubleArrow.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Rectangle.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/Line.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/ArrowLine.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/shape\/TextBox.js\"><\/script>");

//Chart
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/chart/\/Chart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/chart\/PieChart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/node\/chart\/BarChart.js\"><\/script>");

//Helper
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/helper\/ChartHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/helper\/ShapeHelper.js\"><\/script>");

//Render
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/render\/SvgTextRender.js\"><\/script>");

//Common Method Library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/TextHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/SvgTextHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/SvgSelection.js\"><\/script>");

//Tracker library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/Tracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/TrackerMenu.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/CellButton.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/CellMenu.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/CellTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/TableTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/ImageTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/ShapeTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/LineTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/VideoTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/tracker\/ChartTracker.js\"><\/script>");

//Listener or Handler library
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/CellListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/TableListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/TextListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ZIndexListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ImageListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ShapeListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/SheetListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/PageListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/SlideListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ContextListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/KeyboardHandler.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/KeyboardListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/SvgKeyboardListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ParagraphListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/CursorListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/SvgCursorListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ContextMenuEvent.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/VideoListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/MenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/TextDoActionListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/SvgTextListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ImageMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/TextMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/TableMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/CellMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ShapeMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/event\/ChartListener.js\"><\/script>");

//Animation Plugin
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/Animation.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/AnimationPlugin.js\"><\/script>");

//AOP
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/Aop.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/AopInit.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/hoperun\/util\/Init.js\"><\/script>");

