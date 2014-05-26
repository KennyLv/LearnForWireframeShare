/**
 * The base class defined for chart.
 * 
 * @package com.kenny.node.chart 
 * @import com.kenny.util.BaseTool
 * @author Feng.Lu
 */
com.kenny.node.chart.Chart = function() {
    com.kenny.node.chart.Chart.superClass.constructor.call(this);
};

//Extend based Node
com.kenny.util.BaseTool.extend(com.kenny.node.chart.Chart, com.kenny.node.Node);

/**
 * The prototype for Base Chart.
 */
com.kenny.util.BaseTool.augment(com.kenny.node.chart.Chart,{
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ The private properties                                              │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    //Title
    _titleVisible : null,
    _titleText    : null,
    
    //Legend
    _legendLeft    : null,
    _legendTop     : null,
    _legendVisible : null,
    _legendWidth   : null,
    
    //Border
    _borderVisible: null,
    
    //Font
    _fontSize   : null,
    _fontFamily : null,
    
    //Style
    _templateStyle : null,
    
    //Selection
    /***
     * The Array for selections
     *      id, serial ID.
     *      unselectedCols, Array. the index number of un-selected column
     *      orientation, contains: horizon, vertical
     */
    _selections : null,
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Abstract Method to be implemented                                   │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Abstract double click.
     */
    dbClick : null,
    
    /**
     * Abstract click.
     */
    click : null,
    
    /**
     * Abstract method to set chart data.
     * 
     * @param data the data
     */
    setChartData : function(data) {
        com.kenny.util.BaseTool.throwImplementException(this, "setChartData");
    },
    
    /**
     * Abstract method to get chart data.
     * 
     * @returns the data
     */
    getChartData : function() {
        com.kenny.util.BaseTool.throwImplementException(this, "getChartData");
    },
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Public Methods                                                      │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * 
     * @param c the chart object
     */
    renderBaseAttr : function() {
        var c = this,
            s = c.getDomInstance().style,
            z = c.getZoom();
        
        s.top = c.getTop() * z;
        s.left = c.getLeft() * z;
        s.width = c.getWidth() * z;
        s.height = c.getHeight() * z;
        s.zIndex = c.getZIndex();
    },
    
    /**
     * Do zoom the data.
     * 
     * @param mul the multiple
     */
    zoom : function(mul) {
        var c = this,
            d = c.getDomInstance(),
            s = d.style,
            z = c.getZoom();
        
        c.setZoom(mul);
        
        s.top = c.getTop() * z;
        s.left = c.getLeft() * z;
        s.width = c.getWidth() * z;
        s.height = c.getHeight() * z;
        
        c.render();
        
        var svgcanv = d.getElementsByTagName('svg')[0];
        var g = document.createElementNS("http://www.w3.org/2000/svg","g");
        svgcanv.appendChild(g);
        for(var i=svgcanv.childNodes.length -1; i>-1; i--){
            if(svgcanv.childNodes[i] != g){
                g.appendChild(svgcanv.childNodes[i]);
            }
        }
        if(z != 1){
            g.setAttribute("transform", "scale("+z+", "+z+")");
        }
    },
    
    /**
     * Do render the title.
     */
    _titleRaphael : null,
    renderTitle : function(raphael) {
        if(this._titleVisible){
            raphael.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";
            this._titleRaphael = raphael.g.text(this.getWidth() / 2, 0, this._titleText).attr({"font-size": 20});
            //Adjust the position
            this._titleRaphael.attr({
                "y": this._titleRaphael.getBBox().height / 2
            });
        }
    },
    
    /**
     * Do create the DOM instance.
     * 
     * @param chartType the chart type
     */
    createDomInstance : function(chartType) {
        this.setType(chartType);
        this.setDomInstance(document.createElement("div"));
        this.initDefaultDomInstance();
        
        this._imgInstanceDot = document.createElement("img");
        this._imgInstanceDot.src = "images/cleardot.gif";
        this._imgInstanceDot.className = "hr-embeddedobjectview-handle";
        this._imgInstanceDot.style.width = "100%";
        this._imgInstanceDot.style.height = "100%";
        this.getDomInstance().appendChild(this._imgInstanceDot);
        
        //Forbidden all propagation.
        com.kenny.util.BaseTool.addForbiddenPropagation(this.getDomInstance());
        
        //Register base listener
        this._registerBaseListener();
    },
    
    /**
     * Do prepared for edit mode.
     */
    doPreEdit : function() {
        $(this._imgInstanceDot).hide();
        $(this.getDomInstance()).draggable("destroy").removeClass("node-moveable");
    },
    
    /**
     * Do end for edit mode.
     */
    doEndEdit : function() {
        $(this._imgInstanceDot).show();
    },
    
    /**
     * Do blur the object.
     */
    doBlur : function() {
        this.doEndEdit();
    },
    
    /**
     * Do register base listener.
     */
    _registerBaseListener : function() {
        var self = this;
        $(this._imgInstanceDot).bind('click', function(e){
            var obj = $(this);
            setTimeout(function(evt){
                if(!obj.hasClass('noClick')){
                    var message = new com.kenny.util.Observer.Message();
                    message.sender = self;
                    message.data = {type: self.getType()};
                    message.id = com.kenny.util.Observer.MessageType.CHART_FOCUS;
                    com.kenny.util.Observer.sendMessage(message);
                    
                    self._imgInstanceDot.style.cursor = 'move';
                }
                setTimeout(function(){
                    obj.removeClass('noClick');
                }, 200);
            }, 200);
        }).bind('dblclick', function(e){
            $(this).addClass('noClick');
            if(self.dbClick){
                self.dbClick(e);
            }
        }).bind('contextmenu', function(e){com.kenny.event.MouseEvent.rightclick(e, self);});
    },
    
    /**
     * Add the selection into selections.
     * 
     * @param selection the selection
     */
    addSelections : function(selection) {
        if(this._selections == null){
            this._selections = {};
        }
        this._selections.push(selection);
    },
    
    /**
     * Remove the selection from selections.
     * 
     * @param selection the selection
     */
    removeSelection : function(selection) {
        var idx = -1;
        if(this._selections && selection && (idx = this._selections.indexOf(selection)) != -1){
            this._selections.removeAt(idx);
        }
    },
    
    /**
     * Do set data.
     */
    setData : function(data) {
        if(data.top != null){
            this.setTop(data.top);
        }
        if(data.left != null){
            this.setLeft(data.left);
        }
        if(data.width != null){
            this.setWidth(data.width);
        }
        if(data.height != null){
            this.setHeight(data.height);
        }
        if(data.titleVisible != null){
            this._titleVisible = data.titleVisible;
        }
        if(data.titleText != null){
            this._titleText = data.titleText;
        }
        if(data.legendLeft != null){
            this._legendLeft = data.legendLeft;
        }
        if(data.legendTop != null){
            this._legendTop = data.legendTop;
        }
        if(data.legendVisible != null){
            this._legendVisible = data.legendVisible;
        }
        if(data.legendWidth != null){
            this._legendWidth = data.legendWidth;
        }
        if(data.borderVisible != null){
            this._borderVisible = data.borderVisible;
        }
        if(data.fontSize != null){
            this._fontSize = data.fontSize;
        }
        if(data.fontFamily != null){
            this._fontFamily = data.fontFamily;
        }
        if(data.templateStyle != null){
            this._templateStyle = data.templateStyle;
        }
        if(data.zIndex != null){
            this._zIndex = data.zIndex;
        }
        this.setChartData(data);
        
        if(this.getDomInstance()) this.render();
    },
    
    /**
     * Do get data for the instance.
     * This method should be implemented by sub class.
     */
    getData : function() {
        var data = this.getChartData();
        data.type = this.getType();
        data.top = this._top;
        data.left = this._left;
        data.width = this._width;
        data.height = this._height;
        data.titleVisible = this._titleVisible;
        data.titleText = this._titleText;
        data.legendLeft = this._legendLeft;
        data.legendTop = this._legendTop;
        data.legendVisible = this._legendVisible;
        data.legendWidth = this._legendWidth;
        data.borderVisible = this._borderVisible;
        data.fontSize = this._fontSize;
        data.fontFamily = this._fontFamily;
        data.templateStyle = this._templateStyle;
        data.zIndex = this._zIndex;
        return data;
    },
    
    /**
     * Do get raphael object.
     * 
     * @returns the raphael
     */
    _raphael : null,
    getRaphael : function() {
        if(this._raphael){
            this._raphael.clear(); 
            this.getDomInstance().removeChild(this.getDomInstance().getElementsByTagName("svg")[0]);
        } 
        this._raphael = Raphael(this.getDomInstance());
        //this._makeGroup();
        //this._raphael.rect(0, 0, this.getWidth(), this.getHeight()).attr({fill:"FFF", "stroke": "FFF", "stroke-opacity": 0});
        return this._raphael;  
    },
    
    
    
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Getter &Setter Methods for private properties                       │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
    //Title
    getTitleVisible : function(){
        return this._titleVisible;
    },
    getTitleText : function(){
        return this._titleText;
    },
    setTitleVisible : function(titleVisible){
        this._titleVisible = titleVisible;
    },
    
    setTitleText : function(titleText){
        this._titleText = titleText;
    },
    
    //Legend
    getLegendLeft : function(){
        return this._legendLeft;
    },
    getLegendTop : function(){
        return this._legendTop;
    },
    getLegendVisible : function(){
        return this._legendVisible;
    },
    getLegendWidth : function(){
        return this._legendWidth;
    },
    setLegendLeft : function(legendLeft){
        this._legendLeft = legendLeft;
    },
    setLegendTop : function(legendTop){
        this._legendTop = legendTop;
    },
    setLegendVisible : function(legendVisible){
        this._legendVisible = legendVisible;
    },
    setLegendWidth : function(legendWidth){
        this._legendWidth = legendWidth;
    },
    
    //Border
    getBorderVisible : function() {
        return this._borderVisible;
    },
    setBorderVisible : function(borderVisible) {
        this._borderVisible = borderVisible;
    },
    
    //Font
    getFontSize : function() {
        return this._fontSize;
    },
    getFontFamily : function() {
        return this._fontFamily;
    },
    setFontSize : function(fontSize) {
        this._fontSize = fontSize;
    },
    setFontFamily : function(fontFamily) {
        this._fontFamily = fontFamily;
    },
    
    //Selection
    getSelections : function() {
        return this._selections;
    },
    setSelections : function(selections) {
        this._selections = selections;
    }
});