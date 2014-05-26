/**
 * Bar chart class defined.
 * 
 * @package com.kenny.node.chart 
 * @import com.kenny.util.BaseTool
 * @author Feng.Lu
 */
com.kenny.node.chart.BarChart = function() {
    com.kenny.node.chart.BarChart.superClass.constructor.call(this);
    this.createDomInstance("Chart_BarChart");
};

//Extend based Node
com.kenny.util.BaseTool.extend(com.kenny.node.chart.BarChart, com.kenny.node.chart.Chart);

/**
 * The prototype for the pie chart.
 */
com.kenny.util.BaseTool.augment(com.kenny.node.chart.BarChart,{
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    //Position
    _labelPosition: null, //Inside, Outside
    
    //Bar Sub Type
    _barType: null, //Horizon, Vertical
    _stacked: null,
    
    //Axis Settings [X-Y]
    //Axis-X
    _axisXLabelVisible: null,
    _axisXLabelRotation: null,
    
    _axisXDataOrigEnable: null,  //Original Enable
    _axisXDataDecimalLen: null,  //Decimal Length
    _axisXDataSepaEnable: null,  //Decimal Length
    _axisXDataPrefix: null,      //Data Prefix
    _axisXDataSuffix: null,      //Data Suffix
    
    _axisXScaleType: null, //Linearity or Logarithm
    _axisXScaleMaxVal: null,
    _axisXScaleMinVal: null,
    _axisXScale1Step: null,
    _axisXScale2Step: null,
    
    _axisXMeshline1Visible: null,
    _axisXMeshline2Visible: null,
    _axisXMainScaleMarkVisible: null,
    
    _axisXCaptionVisible: null,
    _axisXLineVisible: null,
    
    //Axis-Y
    _axisYLabelVisible: null,
    _axisYLabelRotation: null,
    
    _axisYDataOrigEnable: null,  //Original Enable
    _axisYDataDecimalLen: null,  //Decimal Length
    _axisYDataSepaEnable: null,  //Decimal Length
    _axisYDataPrefix: null,      //Data Prefix
    _axisYDataSuffix: null,      //Data Suffix
    
    _axisYScaleType: null, //Linearity or Logarithm
    _axisYScaleMaxVal: null,
    _axisYScaleMinVal: null,
    _axisYScale1Step: null,
    _axisYScale2Step: null,
    
    _axisYMeshline1Visible: null,
    _axisYMeshline2Visible: null,
    _axisYMainScaleMarkVisible: null,
    
    _axisYCaptionVisible: null,
    _axisYLineVisible: null,
    
    //Numerical Settings
    _dataOrigEnable: null,  //Original Enable
    _dataDecimalLen: null,  //Decimal Length
    _dataSepaEnable: null,  //Decimal Length
    _dataPrefix: null,      //Data Prefix
    _dataSuffix: null,      //Data Suffix
    
    /////////////////////////////// Private Properties   ////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    //TODO: To be removed or changed.
    _gutter: 20,
    _vgutter: 0,

    /**
     * Do get data object for this instance.
     * 
     * @returns the data object
     */
    getChartData: function(){
        var data = {};
        data.stacked = this._stacked;
        return data;
    },
    
    /**
     * Do set data object for this instance.
     * 
     * @param data the data
     */
    setChartData: function(data){
        if(data.stacked != null){
            this._stacked = data.stacked;
        }
    },
    
    /**
     * Do render the header for the bar.
     */
    renderHeader: function(){
        
    },
    
    /**
     * Do render the chart for the bar.
     */
    render: function(){
        com.kenny.helper.ChartHelper.applyBaseAttr(this);
        
        //For test
        this._testBarData = this._testBarData == null ? this.getBarData() : this._testBarData;
        var space = {left: 40, top: 30, right: 20, bottom: 20};
        
        //Prepare the initialize data
        var x = space.left;
        var y = space.top;
        var w = this.getWidth() - space.left - space.right;
        var h = this.getHeight() - space.top - space.bottom;
        var stacked = this.getStacked(), barData = this._testBarData;
        
        var legend = ["Jan.",  "Feb.", "Mat.", "Apr.", "May.",  "Jun.", "Jul.", "Aug.", "Sep."];
        //var legendpos = null; //Default is 'east', others: west, north, south
        
        var r = this.getRaphael();
        
        var fin = function () {
            this.flag = r.g.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        },
        fout = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        };
//        ,
//        fin2 = function () {
//            var y = [], res = [];
//            for (var i = this.bars.length; i--;) {
//                y.push(this.bars[i].y);
//                res.push(this.bars[i].value || "0");
//            }
//            this.flag = r.g.popup(this.bars[0].x, Math.min.apply(Math, y), res.join(", ")).insertBefore(this);
//        },
//        fout2 = function () {
//            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
//        };
            
        this.renderTitle(r);
        
        var dy = h / 10, dx = w / 10;
        for(var i=0; i<10; i++){
            r.g.axis(x, y + h - dy * (i + 1), w, null, null, 10, 2, null, "+", 2, {"stroke-dasharray": "-"}); // For horizon
            r.g.axis(x + dx * (i + 1), y + h, h, null, null, 10, 1, null, "+", 2, {"stroke-dasharray": "-"}); // For vertical line
        }
        
        r.g.barchart(x, y, w, h, barData, {
                gutter: this._gutter,
                vgutter: this._vgutter,
                legend: legend,
                stacked: stacked
            }); //.hover(fin, fout); //.label(this.getBarDataLabel(barData.length, barData[0].length), true, this.getBarLegendStyle());
        
        r.g.axis(x, y + h, w, null, null, 10, 0, null, "+", 2); //For horizon
        r.g.axis(x, y + h, h, 0, 400, 10, 1); //For vertical line
        
        var len = r.raphael.is(barData[0], "array") ? barData[0].length : barData.length;
        var barwidth = w / (len * (100 + this._gutter) + this._gutter) * 100,
        barhgutter = barwidth * this._gutter / 100;
        
        var X = x + barwidth / 2 + barhgutter;
        var midBarWidth = stacked ? barwidth / barData.length / 2 : barwidth / 2; 
        r.g.axis(X, y + h, (barwidth + midBarWidth + barhgutter) * (len -1), null, null, len, 0, legend, "|", 2);
        
//        r.g.hbarchart(330, 10 + moveDownHeight, 300, 220, barData, {stacked: stacked}).hover(fin, fout);
//        r.g.hbarchart(10, 250 + moveDownHeight, 300, 220, barData).hover(fin, fout);
        //var c = 
        //r.g.barchart(330, 250 + moveDownHeight, 300, 220, barData, {stacked: true, type: "soft"}).hoverColumn(fin2, fout2).label(this.getBarDataLabel(barData.length, barData[0].length), true, this.getBarLegendStyle());
        //c.bars[1].attr({stroke: "#000"});
        
        //var axis1 = r.g.axis(350,550,310,null,null,4,2,["Today",  "Yesterday", "Tomorrow", "Future"], "|", 0);
    },
    
    /**
     * Do ge the legend style.
     */
    getBarLegendStyle: function(){
       return {
           "rotation": -30
       };
    },
    
    /**
     * Do get the pie label.
     * 
     * @param _row
     * @param _col
     * @returns {Array}
     */
    getBarDataLabel: function(_row, _col){
        var dataLabel = [];
        for(var i=0; i<_row; i++){
            var rowData = [];
            for(var j=0; j<_col; j++){
                rowData.push("Lb_"+(i*_row+j));
            }
            dataLabel.push(rowData);
        }
        return dataLabel;
    },
    
    /**
     * Do get the pie data.
     * 
     * @returns the pie data
     */
    getBarData: function(){
        var rowNum = com.kenny.util.BaseTool.getRandomNum(2) + 2,
            colNum = com.kenny.util.BaseTool.getRandomNum(2) + 4;
        
        var randomData = [];
        for(var i=0; i<rowNum; i++){
            var rowData = [];
            for(var j=0; j<colNum; j++){
                rowData.push(com.kenny.util.BaseTool.getRandomNum(100));
            }
            randomData.push(rowData);
        }
        
        console.info(JSON.stringify(randomData));
        return randomData;
    },
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Getter and setter methods of the private properties   ///////////////////////////
    //Position
    getLabelPosition: function() {
        return this._labelPosition;
    },
    setLabelPosition: function(labelPosition) {
        this._labelPosition = labelPosition;
    },
    
    //Bar Sub Type
    getBarType: function() {
        return this._barType;
    },
    getStacked: function() {
        return this._stacked;
    },
    setBarType: function(barType) {
        this._barType = barType;
    },
    setStacked: function(stacked) {
        this._stacked = stacked;
    },
    
    //Axis Settings [X-Y]
    getAxisXLabelVisible: function(){
        return this._axisXLabelVisible;
    },
    setAxisXLabelVisible: function(axisXLabelVisible){
        this._axisXLabelVisible = axisXLabelVisible;
    },
    getAxisXLabelRotation: function(){
        return this._axisXLabelRotation;
    },
    setAxisXLabelRotation: function(axisXLabelRotation){
        this._axisXLabelRotation = axisXLabelRotation;
    },
    getAxisXDataOrigEnable: function(){
        return this._axisXDataOrigEnable;
    },
    setAxisXDataOrigEnable: function(axisXDataOrigEnable){
        this._axisXDataOrigEnable = axisXDataOrigEnable;
    },
    getAxisXDataDecimalLen: function(){
        return this._axisXDataDecimalLen;
    },
    setAxisXDataDecimalLen: function(axisXDataDecimalLen){
        this._axisXDataDecimalLen = axisXDataDecimalLen;
    },
    getAxisXDataSepaEnable: function(){
        return this._axisXDataSepaEnable;
    },
    setAxisXDataSepaEnable: function(axisXDataSepaEnable){
        this._axisXDataDecimalLen = axisXDataSepaEnable;
    },
    getAxisXDataPrefix: function(){
        return this._axisXDataPrefix;
    },
    setAxisXDataPrefix: function(axisXDataPrefix){
        this._axisXDataPrefix = axisXDataPrefix;
    },
    getAxisXDataSuffix: function(){
        return this._axisXDataPrefix;
    },
    setAxisXDataSuffix: function(axisXDataSuffix){
        this._axisXDataSuffix = axisXDataSuffix;
    },
    getAxisXScaleType: function(){
        return this._axisXScaleType;
    },
    setAxisXScaleType: function(axisXScaleType){
        this._axisXScaleType = axisXScaleType;
    },
    getAxisXScaleMaxVal: function(){
        return this._axisXScaleMaxVal;
    },
    setAxisXScaleMaxVal: function(axisXScaleMaxVal){
        this._axisXScaleMaxVal = axisXScaleMaxVal;
    },
    getAxisXScaleMinVal: function(){
        return this._axisXScaleMinVal;
    },
    setAxisXScaleMinVal: function(axisXScaleMinVal){
        this._axisXScaleMinVal = axisXScaleMinVal;
    },
    getAxisXScale1Step: function(){
        return this._axisXScale1Step;
    },
    setAxisXScale1Step: function(axisXScale1Step){
        this._axisXScale1Step = axisXScale1Step;
    },
    getAxisXScale2Step: function(){
        return this._axisXScale2Step;
    },
    setAxisXScale2Step: function(axisXScale2Step){
        this._axisXScale2Step = axisXScale2Step;
    },
    getAxisXMeshline1Visible: function(){
        return this._axisXMeshline1Visible;
    },
    setAxisXMeshline1Visible: function(axisXMeshline1Visible){
        this._axisXMeshline1Visible = axisXMeshline1Visible;
    },
    getAxisXMeshline2Visible: function(){
        return this._axisXMeshline2Visible;
    },
    setAxisXMeshline2Visible: function(axisXMeshline2Visible){
        this._axisXMeshline2Visible = axisXMeshline2Visible;
    },
    getAxisXMainScaleMarkVisible: function(){
        return this._axisXMainScaleMarkVisible;
    },
    setAxisXMainScaleMarkVisible: function(axisXMainScaleMarkVisible){
        this._axisXMainScaleMarkVisible = axisXMainScaleMarkVisible;
    },
    getAxisXCaptionVisible: function(){
        return this._axisXCaptionVisible;
    },
    setAxisXCaptionVisible: function(axisXCaptionVisible){
        this._axisXCaptionVisible = axisXCaptionVisible;
    },
    getAxisXLineVisible: function(){
        return this._axisXScale2Step;
    },
    setAxisXLineVisible: function(axisXLineVisible){
        this._axisXLineVisible = axisXLineVisible;
    },
    getAxisYLabelVisible: function(){
        return this._axisYLabelVisible;
    },
    setAxisYLabelVisible: function(axisYLabelVisible){
        this._axisYLabelVisible = axisYLabelVisible;
    },
    getAxisYLabelRotation: function(){
        return this._axisYLabelRotation;
    },
    setAxisYLabelRotation: function(axisYLabelRotation){
        this._axisYLabelRotation = axisYLabelRotation;
    },
    getAxisYDataOrigEnable: function(){
        return this._axisYDataOrigEnable;
    },
    setAxisYDataOrigEnable: function(axisYDataOrigEnable){
        this._axisYDataOrigEnable = axisYDataOrigEnable;
    },
    getAxisYDataDecimalLen: function(){
        return this._axisYDataDecimalLen;
    },
    setAxisYDataDecimalLen: function(axisYDataDecimalLen){
        this._axisYDataDecimalLen = axisYDataDecimalLen;
    },
    getAxisYDataSepaEnable: function(){
        return this._axisYDataSepaEnable;
    },
    setAxisYDataSepaEnable: function(axisYDataSepaEnable){
        this._axisYDataDecimalLen = axisYDataSepaEnable;
    },
    getAxisYDataPrefix: function(){
        return this._axisYDataPrefix;
    },
    setAxisYDataPrefix: function(axisYDataPrefix){
        this._axisYDataPrefix = axisYDataPrefix;
    },
    getAxisYDataSuffix: function(){
        return this._axisYDataPrefix;
    },
    setAxisYDataSuffix: function(axisYDataSuffix){
        this._axisYDataSuffix = axisYDataSuffix;
    },
    getAxisYScaleType: function(){
        return this._axisYScaleType;
    },
    setAxisYScaleType: function(axisYScaleType){
        this._axisYScaleType = axisYScaleType;
    },
    getAxisYScaleMaxVal: function(){
        return this._axisYScaleMaxVal;
    },
    setAxisYScaleMaxVal: function(axisYScaleMaxVal){
        this._axisYScaleMaxVal = axisYScaleMaxVal;
    },
    getAxisYScaleMinVal: function(){
        return this._axisYScaleMinVal;
    },
    setAxisYScaleMinVal: function(axisYScaleMinVal){
        this._axisYScaleMinVal = axisYScaleMinVal;
    },
    getAxisYScale1Step: function(){
        return this._axisYScale1Step;
    },
    setAxisYScale1Step: function(axisYScale1Step){
        this._axisYScale1Step = axisYScale1Step;
    },
    getAxisYScale2Step: function(){
        return this._axisYScale2Step;
    },
    setAxisYScale2Step: function(axisYScale2Step){
        this._axisYScale2Step = axisYScale2Step;
    },
    getAxisYMeshline1Visible: function(){
        return this._axisYMeshline1Visible;
    },
    setAxisYMeshline1Visible: function(axisYMeshline1Visible){
        this._axisYMeshline1Visible = axisYMeshline1Visible;
    },
    getAxisYMeshline2Visible: function(){
        return this._axisYMeshline2Visible;
    },
    setAxisYMeshline2Visible: function(axisYMeshline2Visible){
        this._axisYMeshline2Visible = axisYMeshline2Visible;
    },
    getAxisYMainScaleMarkVisible: function(){
        return this._axisYMainScaleMarkVisible;
    },
    setAxisYMainScaleMarkVisible: function(axisYMainScaleMarkVisible){
        this._axisYMainScaleMarkVisible = axisYMainScaleMarkVisible;
    },
    getAxisYCaptionVisible: function(){
        return this._axisYCaptionVisible;
    },
    setAxisYCaptionVisible: function(axisYCaptionVisible){
        this._axisYCaptionVisible = axisYCaptionVisible;
    },
    getAxisYLineVisible: function(){
        return this._axisYScale2Step;
    },
    setAxisYLineVisible: function(axisYLineVisible){
        this._axisYLineVisible = axisYLineVisible;
    },
    
    //Numerical Settings
    getDataOrigEnable: function() {
        return this._dataOrigEnable;
    },
    getDataDecimalLen: function() {
        return this._dataDecimalLen;
    },
    getDataSepaEnable: function() {
        return this._dataSepaEnable;
    },
    getDataPrefix: function() {
        return this._dataPrefix;
    },
    getDataSuffix: function() {
        return this._dataSuffix;
    },
    setDataOrigEnable: function(dataOrigEnable) {
        this._dataOrigEnable = dataOrigEnable;
    },
    setDataDecimalLen: function(dataDecimalLen) {
        this._dataDecimalLen = dataDecimalLen;
    },
    setDataSepaEnable: function(dataSepaEnable) {
        this._dataSepaEnable = dataSepaEnable;
    },
    setDataPrefix: function(dataPrefix) {
        this._dataPrefix = dataPrefix;
    },
    setDataSuffix: function(dataSuffix) {
        this._dataSuffix = dataSuffix;
    }
    ///////////////// Getter and setter methods of the private properties   /////////////////////////// 
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
});