define(["angular","framework/http"],function(angular,https){
	function pdtRequest($q){
		https.call(this,$q);
	}
	pdtRequest.prototype = new https();
	pdtRequest.prototype.getDataforHome = function(num){
		var id = num || 17;
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products/"+id,
			method:"get"
		});
	}
	pdtRequest.prototype.computes = function(headers,data){
		
		var postData={
			"compute": {
				"category": 2,
				"params": data
			}
		}
		
		return this.doRequest({
			url:"/api/v1/computes",
			method:"post",
			data:JSON.stringify(postData),
			headers:headers
		});
	}
	pdtRequest.prototype.addTobagList = function(params,datalist){
		console.log(datalist)
		datalist = JSON.stringify(datalist)

		return this.doRequest({
			url:"/api/v1/carts",
			method:"post",
			data:datalist,
			headers:params.headers
		});
	}
	return pdtRequest;
});