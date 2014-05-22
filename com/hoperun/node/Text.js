/**
 * The text editor &render.
 * 
 * @package com.hoperun.node
 * @import com.hoperun.util.CommonUtil
 * @author Feng.Lu
 */
com.hoperun.node.Text = function() {
    com.hoperun.node.TextPage.superClass.constructor.call(this);
    this.setType("Text");
    
    this._pageIndent = {
        left : 0,
        right : 0
    };
};

com.hoperun.util.BaseTool.extend(com.hoperun.node.Text, com.hoperun.node.Node);

/**
 * The prototype for the Text.
 */
com.hoperun.util.CommonUtil.augment(com.hoperun.node.Text, {
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ The private properties                                              │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    _pageIndent : null,
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Private Methods                                                     │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Do initialize prepared DOM instance.
     */
    _initPage : function() {
        //TODO: create the page
        var page = this._createPage();
        page.appendTo(this);
        return page;
    },
    
    /**
     * Do create the text page
     */
    _createPage : function() {
        //TODO: create the text page object, and initialize the page DOM's parameters
        // Such as: width, height, left and right padding and so on.
    },
    
    /**
     * Do get the next page.
     * 
     * @param page the page
     */
    _getNextPage : function(page) {
        var children = this.getChildren(),
            idx = this.getChildren().indexOf(page);
        return idx != -1 || children[idx+1];
    },
    
    /**
     * Do get the length of total text
     * 
     * @param data the local JSON data
     */
    _getTextLength : function(data) {
        //TODO: get the total length for the characters from textData.
        return 0;
    },
    
    /**
     * Do pretreat the data.
     * 
     * @param savedData the saved data
     */
    _pretreatData : function(savedData) {
        if(savedData.width != null) this.setWidth(savedData.width);
        if(savedData.height != null) this.setHeight(savedData.height);
        if(savedData._pageIndent != null) {
            //TODO: Take consider to copy its values with one-by-one
            this._pageIndent = savedData.pageIndent;
        }
        /**
        { 
            "width":816,
            "height":1056,
            texts : [
                {
                    "id":"F1072F62B97C48F88E913D50643F2817",
                    "width":816,
                    "type":"Paragraph",
                    "text":"Nanjing Pearl Spring Tourism & Holiday Resort",
                    "style":[
                        {"offset":20, "style":"15EA9F32904343B385E769B2092FDBAB"},
                        {"offset":46, "style":"15EA9F32904343B385E769B2092FDBAC"}
                    ],
                    "pageStart":[],
                    "indent":{"firstLine":20,"left":0,"right":0},
                    "textAlign":"center",
                    "textLineSpacing":1.25,
                    "styleFormat":null
                },
                {
                    ...
                }
            ],
            "pageIndent":{
                "bottom":20,
                "left":54,
                "right":96,
                "top":60
             }
          }
            */
        //TODO: Convert saved data into local JS data
        return null;
    },
    
 // ┌─────────────────────────────────────────────────────────────────────┐ \\
 // │ Public Methods                                                      │ \\
 // └─────────────────────────────────────────────────────────────────────┘ \\
    /**
     * Override, since it seems default not suitable here.
     * @param w
     */
    setWidth : function(w){
        this._width = w;
    },
    
    /**
     * @return available width
     */
    getAvailableWidth : function() {
        return this.getWidth() - this._pageIndent.left - this._pageIndent.right; 
    },
    
    /**
     * Override, since it seems default not suitable here.
     * @param h
     */
    setHeight : function(h) {
        this._height = h;
    },
    
    /**
     * Do get the page indent.
     * 
     * @return the page indent
     */
    getPageIndent : function() {
       return this._pageIndent;
    },
    
    /**
     * Append child node.
     * 
     * @param child the child node
     */
    appendChild : function(child) {
        this.insert(child);
        //TODO: Append to parent node DOM instance.
    },
    
    /**
     * Do get data.
     */
    getData : function() {
        //TODO: Same like setData
    },
    
    /**
     * Do set data.
     * 
     * @param data the local JSON data
     */
    setData : function(data) {
        //TODO: get data with JSON format
        /**
         * It should be supposed as:
           [
               {
                   type: 'Text',
                   children: [
                       {
                           type: 'TextPage',
                           nodes: [
                               {
                                   type: 'Image',
                                   ...
                               }
                           ],
                           children: [
                               type: 'TextLine',
                               children: [
                                   type: 'TextSection'
                               ]
                           ]
                       }
                   ]
               }
           ]
         */
        return null;
    },
    
    /**
     * Do convert saved data to local data, and initialize the objects.
     *  
     * @param origData the original data
     */
    loadData : function(savedData) {
        //Convert original data
        var data = this._pretreatData(savedData);
        this.setData(data);
        this.render();
    },
    
    /**
     * Do render the page.
     * 
     * @param page the page object
     */
    render : function(page) {
        //TODO: Render each page's data
        page = page || this.getChildren()[0];
        
        var lines = null,
            nextPage = this._getNextPage(page);
        
        while(lines = page.render()){
            if(!nextPage){
                nextPage = this._initPage();
            }
            //Insert the extra lines into next line
            for(var i=0; i<lines.length; i++) {
                nextPage.insert(lines[i], i); //TODO: Don't forget to append line's DOM instance into new page DOM instance
            }
            page = nextPage;
            nextPage = this._getNextPage(page);
        }
    }
});