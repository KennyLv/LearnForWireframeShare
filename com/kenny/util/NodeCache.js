/**
 * NodeCache class
 * @package com.kenny.util
 * @import com.kenny.util.Hashtable
 * @author xuliyu
 */
if (!com.kenny.util.NodeCache) {
    com.kenny.util.NodeCache = {
		_nodeTable:new com.kenny.util.Hashtable(),
		
		add:function(id, node){
			com.kenny.util.NodeCache._nodeTable.add(id, node);
		},
		
		remove:function(id){
			com.kenny.util.NodeCache._nodeTable.remove(id);
		},
		
		count:function(){
			return com.kenny.util.NodeCache._nodeTable.count();
		},
		
		items:function(id){
			return com.kenny.util.NodeCache._nodeTable.items(id);
		},
		
		contains:function(id){
			return com.kenny.util.NodeCache._nodeTable.contains(id);
		},
		
		clear:function(){
			com.kenny.util.NodeCache._nodeTable.clear();
		}
		
	};
}
