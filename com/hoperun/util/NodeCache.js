/**
 * NodeCache class
 * @package com.hoperun.util
 * @import com.hoperun.util.Hashtable
 * @author xuliyu
 */
if (!com.hoperun.util.NodeCache) {
    com.hoperun.util.NodeCache = {
		_nodeTable:new com.hoperun.util.Hashtable(),
		
		add:function(id, node){
			com.hoperun.util.NodeCache._nodeTable.add(id, node);
		},
		
		remove:function(id){
			com.hoperun.util.NodeCache._nodeTable.remove(id);
		},
		
		count:function(){
			return com.hoperun.util.NodeCache._nodeTable.count();
		},
		
		items:function(id){
			return com.hoperun.util.NodeCache._nodeTable.items(id);
		},
		
		contains:function(id){
			return com.hoperun.util.NodeCache._nodeTable.contains(id);
		},
		
		clear:function(){
			com.hoperun.util.NodeCache._nodeTable.clear();
		}
		
	};
}
