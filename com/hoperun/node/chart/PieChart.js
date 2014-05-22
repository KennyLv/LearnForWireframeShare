/**
 * Pie chart class defined.
 * 
 * @package com.hoperun.node.chart 
 * @import com.hoperun.util.CommonUtil
 * @import com.hoperun.helper.ChartHelper
 * @author Feng.Lu
 */
com.hoperun.node.chart.PieChart = function() {
    com.hoperun.node.chart.PieChart.superClass.constructor.call(this);
    this.createDomInstance("Chart_PieChart");
};

//Extend based Node
com.hoperun.util.CommonUtil.extend(com.hoperun.node.chart.PieChart, com.hoperun.node.chart.Chart);

/**
 * The prototype for the pie chart.
 */
com.hoperun.util.CommonUtil.augment(com.hoperun.node.chart.PieChart,{
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    //Position
    _centerX : null,
    _centerY : null,
    _labelPosition : null, //Inside, Outside
    
    //Parts of Pie
    _partsOffset : null, //Array, which should be concerning with selection
    
    //Numerical Settings
    _dataSerialNameVisible : null, //Serial Name Visible
    _dataOrigEnable        : null, //Original Enable
    _dataDecimalLen        : null, //Decimal Length
    _dataSepaEnable        : null, //Separator Enable
    _dataPrecentEnable     : null, //Percent Enable
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**
     * Do get data object for this instance.
     * 
     * @returns the data object
     */
    getChartData : function(){
        var data = {};
        data.radius = this._radius;
        data.testData = this._testPieData;
        data.labelPosition = this._labelPosition;
        return data;
    },
    
    /**
     * Do set data object for this instance.
     * 
     * @param data the data
     */
    setChartData : function(data){
        if(data.radius != null){
            this._radius = data.radius;
        }
        if(data.labelPosition != null){
            this._labelPosition = data.labelPosition;
        }
        if(data.testData != null){
            this._testPieData = data.testData;
        }
    },
    
    dbClick : function(){
        this.doPreEdit();
    },
    
    /**
     * Do render pie data to DOM.
     */
    render : function(){
        var c = this,
            id = c.getId(),
            d = c.getDomInstance();
        
        //Render base attributes
        c.renderBaseAttr();
        
        //Clear & Create the paper object to draw chart
        com.hoperun.helper.ChartHelper.reset(id, d);
        
        //Draw the title for chart
        com.hoperun.helper.ChartHelper.drawTitle(c);
        
        //Draw pie chart
        var w = c.getWidth() / 2, 
            h = c.getHeight() / 2, 
            r = (w > h ? h : w) - 40; 
        com.hoperun.helper.ChartHelper.drawPieChart(id, d, {
            cx: w,
            cy: h,
            radius: r,
            position: c.getLabelPosition(),
            data:  com.hoperun.util.CommonUtil.cloneJsObject(c.getPieData()),
            offsets: [{"index": 0, "value": 40}],
            attrs: {
                stroke: "#AAA"
            }
        });
        
        //Draw legends
        com.hoperun.helper.ChartHelper.drawlegend(c);
        
        //Bind Event
        com.hoperun.helper.ChartHelper.bindEventForPie(c);
    },
    
    /**
     * TODO: Do get the pie data.
     * 
     * @returns the pie data
     */
    _testPieData : null, 
    getPieData : function(){
        if(!this._testPieData){
            var colNum = com.hoperun.util.CommonUtil.random(4) + 3;
            
            var randomData = [];
            for(var j=0; j<colNum; j++){
                randomData.push(com.hoperun.util.CommonUtil.random(100));
            }
            
            console.info(JSON.stringify(randomData));
            this._testPieData = randomData;
        }
        return this._testPieData;
    },
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Getter and setter methods of the private properties   ///////////////////////////
    //Position
    getCenterX : function() {
        return this._centerX;
    },
    getCenterY : function() {
        return this._centerY;
    },
    getLabelPosition : function() {
        return this._labelPosition;
    },
    setCenterX : function(centerX) {
        this._centerX = centerX;
    },
    setCenterY : function(centerY) {
        this._centerY = centerY;
    },
    setLabelPosition: function(labelPosition) {
        this._labelPosition = labelPosition;
    },
    
    //Parts of Pie
    getPartsOffset : function() {
        return this._partsOffset;
    },
    setLabelPosition : function(partsOffset) {
        this._partsOffset = partsOffset;
    },
    
    //Numerical Settings
    getDataSerialNameVisible : function() {
        return this._dataSerialNameVisible;
    },
    getDataOrigEnable : function() {
        return this._dataOrigEnable;
    },
    getDataDecimalLen : function() {
        return this._dataDecimalLen;
    },
    getDataSepaEnable : function() {
        return this._dataSepaEnable;
    },
    getDataPrecentEnable : function() {
        return this._dataPrecentEnable;
    },
    setDataSerialNameVisible : function(dataSerialNameVisible) {
        this._dataSerialNameVisible = dataSerialNameVisible;
    },
    setDataOrigEnable : function(dataOrigEnable) {
        this._dataOrigEnable = dataOrigEnable;
    },
    setDataDecimalLen : function(dataDecimalLen) {
        this._dataDecimalLen = dataDecimalLen;
    },
    setDataSepaEnable : function(dataSepaEnable) {
        this._dataSepaEnable = dataSepaEnable;
    },
    setDataPrecentEnable : function(dataPrecentEnable) {
        this._dataPrecentEnable = dataPrecentEnable;
    },
    ///////////////// Getter and setter methods of the private properties   /////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
});