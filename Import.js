//Import CSS
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/kenny\/css\/global.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/kenny\/css\/tracker.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/kenny\/css\/popup.css\">");
window.document.write("<link rel=\"stylesheet\" type=\"text\/css\" href=\"com\/kenny\/css\/defaultElementStyle.css\">");
//Import JS library
if(!com) var com = {};
if(!com.kenny) com.kenny = {};
if(!com.kenny.util) com.kenny.util = {};
if(!com.kenny.model) com.kenny.model = {};
if(!com.kenny.node) com.kenny.node = {};
if(!com.kenny.node.chart) com.kenny.node.chart = {};
if(!com.kenny.node.shape) com.kenny.node.shape = {};
if(!com.kenny.menu) com.kenny.menu = {};
if(!com.kenny.event) com.kenny.event = {};
if(!com.kenny.tracker) com.kenny.tracker = {};
if(!com.kenny.render) com.kenny.render = {};
if(!com.kenny.helper) com.kenny.helper = {};
//Compatible difference between on browsers, and extends some basic function for default JS object
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/BrowserCompatible.js\"><\/script>");

//Third parts library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/Json.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jquery-1.6.2.min.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jquery-ui-1.8.16.custom.min.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jquery.hotkeys.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jquery.form.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jskata.undo.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/encoder.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/jquery.event.extendedclick.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/log4js.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/raphael.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/g.raphael.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/g.pie.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/g.bar.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/g.dot.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/g.line.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/raphael.chart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/3rd\/innerText.js\"><\/script>");

//Basic tool library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/PageSetting.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/Hashtable.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/Observer.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/NodeCache.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/BaseTool.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/CommonUtil.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/ShapeHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/FileHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/TextStyleContainerUtils.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/AlgorithmsParseTools.js\"><\/script>");
//Model library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/LineModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/BasicModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/TableSelection.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/TextSelectionModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/SvgTextSelectionModel.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/model\/SvgStyle.js\"><\/script>");

//Broad Event library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/MouseEvent.js\"><\/script>");


window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Node.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Cell.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Table.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Image.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Page.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Slide.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Sheet.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Style.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Paragraph.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/Video.js\"><\/script>");

//Shape
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Shape.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Rectangle.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Ellipse.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Polygon.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Star.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Diamond.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Triangle.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Pentagon.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/AbnormityTriangle.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/SingleArrow.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/DoubleArrow.js\"><\/script>");
//window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Rectangle.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/Line.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/ArrowLine.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/shape\/TextBox.js\"><\/script>");

//Chart
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/chart/\/Chart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/chart\/PieChart.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/node\/chart\/BarChart.js\"><\/script>");

//Helper
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/helper\/ChartHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/helper\/ShapeHelper.js\"><\/script>");

//Render
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/render\/SvgTextRender.js\"><\/script>");

//Common Method Library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/TextHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/SvgTextHelper.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/SvgSelection.js\"><\/script>");

//Tracker library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/Tracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/TrackerMenu.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/CellButton.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/CellMenu.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/CellTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/TableTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/ImageTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/ShapeTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/LineTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/VideoTracker.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/tracker\/ChartTracker.js\"><\/script>");

//Listener or Handler library
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/CellListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/TableListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/TextListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ZIndexListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ImageListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ShapeListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/SheetListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/PageListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/SlideListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ContextListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/KeyboardHandler.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/KeyboardListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/SvgKeyboardListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ParagraphListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/CursorListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/SvgCursorListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ContextMenuEvent.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/VideoListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/MenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/TextDoActionListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/SvgTextListener.js\"><\/script>");

window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ImageMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/TextMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/TableMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/CellMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ShapeMenuListener.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/event\/ChartListener.js\"><\/script>");

//Animation Plugin
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/Animation.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/AnimationPlugin.js\"><\/script>");

//AOP
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/Aop.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/AopInit.js\"><\/script>");
window.document.write("<script type=\"text\/javascript\" src=\"com\/kenny\/util\/Init.js\"><\/script>");

