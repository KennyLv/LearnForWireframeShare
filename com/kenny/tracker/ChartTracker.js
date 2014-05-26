/**
 * Chart Tracker class
 * 
 * @package com.kenny.tracker
 * @import com.kenny.util.BaseTool,com.kenny.tracker.Tracker
 * @author feng.lu
 */
com.kenny.tracker.ChartTracker = function() {
    com.kenny.node.chart.BarChart.superClass.constructor.call(this);
    this.createDomInstance("ChartTracker");
};

//Extend based Node
com.kenny.util.BaseTool.extend(com.kenny.tracker.ChartTracker, com.kenny.tracker.Tracker);

/**
 * The prototype for the pie chart.
 */
com.kenny.util.BaseTool.augment(com.kenny.tracker.ChartTracker,{

});
