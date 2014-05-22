// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Chart Helper tool                                                   │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
/**
 * 
 * @package com.hoperun.util
 * @import com.hoperun.util.Hashtable
 * @author Feng.Lu
 */
com.hoperun.helper.ChartHelper = {
    _cache : new com.hoperun.util.Hashtable(),
    
    /**
     * 
     * @param c the chart object
     */
    applyBaseAttr : function(c) {
        var d = c.getDomInstance(),
            zm = c.getZoom();
        d.style.top = c.getTop() * zm;
        d.style.left = c.getLeft() * zm;
        d.style.width = c.getWidth() * zm;
        d.style.height = c.getHeight() * zm;
        d.style.zIndex = c.getZIndex();
    },
    
    /**
     * Get the paper where to draw the chart.
     * 
     * @param id the identified code
     * @param dom the DOM instance, default the DOM instance with ID and it should be existed on document
     * @returns the paper instance
     */
    getPaper : function(id, dom){
        var d = dom || document.getElementById(id),
            r = this._cache.items(id);
        if(!r){
            r =  Raphael(d);
            this._cache.add(id, r);
            r.ui = r.set();
        }
        return r;
    },

    /**
     * Clear the SVG items of chart
     * 
     * @param id the identified code
     * @param domInstance the DOM instance, default the DOM instance with ID and it should be existed on document
     */
    clear : function(id, domInstance) {
        var d = domInstance || document.getElementById(id),
            r = this._cache.items(id);
        if(r){
            r.clear();
            d || d.removeChild(d.getElementsByTagName("svg")[0]);
        }
    },
    
    /**
     * Reset the chart paper.
     * 
     * @param id the identified code
     * @param d the DOM instance, default the DOM instance with ID and it should be existed on document
     * @returns the paper object
     */
    reset : function(id, d) {
        this.clear(id, d);
        return this.getPaper(id, d);
    },
    
    /**
     * Draw the title of the chart.
     * 
     * @param c the chart object
     */
    drawTitle : function(c) {
        var r = this.getPaper(c.getId(), c.getDomInstance()),
            txt = c.getTitleText(),
            x = c.getWidth() / 2,
            y = 0,
            font = "12px 'Fontin Sans', Fontin-Sans, sans-serif",
            t = r.text(x, y, txt).attr({font: font});
        t.attr({
            "y": t.getBBox().height / 2
        });
        r.ui.title = t;
    },
    
    /**
     * Draw the legend of the chart.
     * 
     * @param c the chart object
     */
    drawlegend : function(c) {
        var r = this.getPaper(c.getId(), c.getDomInstance()), 
            pieData = com.hoperun.util.CommonUtil.cloneJsObject(c.getPieData());
        
        var cache = "One Two Three Four Five Six Seven Eight Nine Ten Eleven";
        var colors = [], labels = [];
        var hues = [.6, .2, .05, .1333, .75, 0];
        for (var i = 0; i < pieData.length; i++) {
            if (i < hues.length) {
                colors.push("hsb(" + hues[i] + ", .75, .75)");
            } 
            else {
                colors.push("hsb(" + hues[i - hues.length] + ", 1, .5)");
            }
            labels.push(cache.split(" ")[i]); //com.hoperun.util.CommonUtil.getRandomNum(8)
        }
        
        //x, y, w, labels, colors, mark
        var legends = r.g.drawlegend(10, 10, null, labels, colors, "square");
        
        r.ui.legends = legends;
    },
    
    /**
     * Draw pie chart.
     * 
     * @param id     the identified code
     * @param d      the DOM instance, default the DOM instance with ID and it should be existed on document
     * @param opts   the multiple parameters :
                        cx     the x-center of circle
                        cy     the y-center of circle
                        radius the radius
                        data   the data of pie chart
                        attrs  the attributes
     */
    drawPieChart : function(id, d, opts) {
        var c = this,
            cx = opts.cx,
            cy = opts.cy,
            radius = opts.radius,
            data = opts.data,
            attrs = opts.attrs || {};
            r = c.getPaper(id, d),
            position = opts.position,
            offsets = attrs.offsets || [];
            
        var pie = r.pieChart(cx, cy, radius, data, null, {
                angle: 0, 
                offsets: offsets,
                attrs: attrs,
                position: position
            }
        );
            
        if(false){
            //TODO: these would be added into pie js object
            var legend = ["%%.%%  -", "%%.%%  -", "%%.%%  -", "%%.%%  -", "%%.%%  -", "%%.%%  -", "%%.%%  -", "%%.%%  -"];
            var legendpos = null; //Default is 'east', others: west, north, south
            var pie1 = r.g.piechart(cx, cy, radius, data, {
                legend: legend, 
                legendpos: legendpos,
                legendmark: "square",
                partsOffset: offsets
            });
        }
        
        r.ui.piechart = pie;
    },
    
    /**
     * Bind Pie chart event.
     * 
     * @param c the chart object
     */
    bindEventForPie : function(c) {
        var r = this.getPaper(c.getId(), c.getDomInstance()), 
            legends = r.ui.legends,
            pie = r.ui.piechart;
        
        //TODO: to bind event listener to legends
        legends.item.mousedown(function(evt){
            evt = evt || window.event;
            var x = evt.pageX, y = evt.pageY;
            var x0 = x, y0 = y;
            var dx = 0, dy = 0;
            document.body.onmousemove = function(evt) {
                evt = evt || window.event;
                x0 = evt.pageX, 
                y0 = evt.pageY,
                dx = x0 - x,
                dy = y0 - y;
                legends.position(dx, dy);
            };

            document.body.onmouseup = function(evt) {
                legends.updatePos(dx, dy);
                document.body.onmousemove = null;
                document.body.onmouseup = null;
                try{
                    evt.preventDefault();
                }catch(e){}
                
                return false;
            };
            return false;
        });
        
        //TODO: to bind event listener to the chart
        if(false) pie.hover(
            function () {
                this.sector.stop();
                this.sector.scale(1.1, 1.1, this.cx, this.cy);
                if (this.label) {
                    this.label[0].stop();
                    this.label[0].scale(1.5);
                    this.label[1].attr({"font-weight": 800});
                }
            }, function () {
                this.sector.animate({scale: [1, 1, this.cx, this.cy]}, 500, "bounce");
                if (this.label) {
                    this.label[0].animate({scale: 1}, 500, "bounce");
                    this.label[1].attr({"font-weight": 400});
                }
            }
        );
    }
};