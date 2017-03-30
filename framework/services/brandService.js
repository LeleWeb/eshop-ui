define(["angular","framework/http"],function(angular,https){
	function pdtRequest($q){
		https.call(this,$q);
	}
	pdtRequest.prototype = new https();
	pdtRequest.prototype.getName = function(){
		return this.doRequest({
			url:"test.json",
			method:"get"
		});
	}
	return pdtRequest;
});