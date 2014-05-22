var aop = null; 

com.hoperun.util.AopInit = {
	getAop : function() {
		if (aop == null) aop = new com.hoperun.util.Aop();
		return aop;
	}
};