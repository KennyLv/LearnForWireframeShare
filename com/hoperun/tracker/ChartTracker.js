/**
 * Chart Tracker class
 * 
 * @package com.hoperun.tracker
 * @import com.hoperun.util.BaseTool,com.hoperun.tracker.Tracker
 * @author feng.lu
 */
com.hoperun.tracker.ChartTracker = function() {
    com.hoperun.node.chart.BarChart.superClass.constructor.call(this);
    this.createDomInstance("ChartTracker");
};

//Extend based Node
com.hoperun.util.BaseTool.extend(com.hoperun.tracker.ChartTracker, com.hoperun.tracker.Tracker);

/**
 * The prototype for the pie chart.
 */
com.hoperun.util.BaseTool.augment(com.hoperun.tracker.ChartTracker,{

});
