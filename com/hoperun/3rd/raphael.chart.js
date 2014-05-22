/**
 * @param opts   the multiple parameters :
        attrs      the attribute of the chart
        offsets    the offset position for the parts
        startAngle the begin start angle
        position   the position of the label against the the parts of chart
 */
Raphael.fn.pieChart = function (cx, cy, r, values, labels, opts) {
    opts = opts || {};
    labels = labels || [];
    var paper    = this,
        rad      = Math.PI / 180,
        chart    = this.set(),
        lbls     = this.set(),
        attrs    = opts.attrs || {},
        position = opts.position,
        angle    = opts.startAngle == null ? 0 : opts.startAngle,
        offsets  = [];
    
    opts.offsets || opts.offsets.foreach(function(item){
        offsets[item.index] = item.value;
    });
    
    function getarc(cx, cy, r, startAngle, endAngle) {
        var x2 = cx + r * Math.cos(startAngle),
            x1 = cx + r * Math.cos(endAngle),
            y2 = cy + r * Math.sin(startAngle),
            y1 = cy + r * Math.sin(endAngle);
        return ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180 * rad), 0, x2, y2, "z"];
    }
    
    var total = 0,
    start = 0,
    process = function(j) { 
        var value     = values[j],
            offset    = offsets[j] || 0,
            angleplus = 360 * rad * value / total,
            popangle  = angle + (angleplus / 2),
            color     = paper.g.colors[j], //Raphael.hsb(start, .75, 1),
            bcolor    = paper.g.colors[j], //Raphael.hsb(start, 1, 1),
            tcx       = cx + offset * Math.cos(popangle),
            tcy       = cy + offset * Math.sin(popangle),
            arc       = getarc(tcx, tcy, r, angle, angle + angleplus),
            p         = paper.path(arc).attr({fill: "90-" + bcolor + "-" + color, stroke: attrs.stroke, "stroke-width": 3});
            
        (function(p, index, offset, cx, cy, r, angle, endangle){
            // X' = x * cos(n) + y * sin(n)
            // Y' = -x * sin(n) + y * cos(n)
            var dangle = (angle + endangle) / 2,
                tmpOffset = offset;
            p.drag(
                //Move
                function(dx, dy, x, y){
                    var dx0 =  dx * Math.cos(dangle) + dy * Math.sin(dangle),
                        t0 = offset + dx0,
                        t1 = t0 <= 10 ? 0 : t0 >= r ? r : t0,
                        x = cx + t1 * Math.cos(popangle),
                        y = cy + t1 * Math.sin(popangle);
                    p.node.setAttribute("d", getarc(x, y, r, angle, endangle).join(" "));
                    uplabel(index, dangle, t1);
                    tmpOffset = t1;
                },
                //Start
                null,
                //End
                function(){
                    offset = tmpOffset;
                }
            );
        })(p, j, offset, cx, cy, r, angle, angle + angleplus);
        chart.push(p);
        angle += angleplus;
        start += .1;
    },
    uplabel = function (j, popangle, offset) {
        if(!position) return;
        var label     = labels[j] || (values[i] / total * 100).toFixed(2) + "%",
            delta     = 30;
        if(position == 'Inside'){
            offset += r / 2;
        }
        else if(position == 'Outside'){
            offset += r + delta;
        }
        var cx1 = cx + offset * Math.cos(popangle),
            cy1 = cy + offset * Math.sin(popangle),
            txt = lbls[j];
        if(txt){
            txt.attr({x: cx1, y: cy1});
        }
        else{
            var txt = paper.text(cx1, cy1, label).attr({fill: "#000", stroke: "none", opacity: 1, "font-size": 20});
            lbls.push(txt);
        }
    };
    
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    angle = opts.startAngle == null ? 0 : opts.startAngle;
    for (i = 0; i < ii; i++) {
        var angleplus = 360 * rad * values[i] / total,
            popangle  = angle + (angleplus / 2);
        uplabel(i, popangle, (offsets[i] || 0));
        angle += angleplus;
    }
    return chart;
};