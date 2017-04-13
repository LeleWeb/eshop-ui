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
	// 请求单个商品
	pdtRequest.prototype.getProduct = function(queryParams, productId){
		// url查询参数格式化
		var urlStr = "";
		var paramsStr = "";
		for(var i in queryParams){
			//if (queryParams.hasOwnProperty(i)) { //filter,只输出man的私有属性
				paramsStr += "&" + i + "=" + queryParams[i];
			//};
		}

		if(paramsStr !== ""){
			urlStr = "/api/v1/accounts/1/stores/1/products/" + productId + "?" + paramsStr;
		}else{
			urlStr = "/api/v1/accounts/1/stores/1/products/" + productId;
		}

		return this.doRequest({
			url:urlStr,
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
		datalist = JSON.stringify(datalist)

		return this.doRequest({
			url:"/api/v1/carts",
			method:"post",
			data:datalist,
			headers:params.headers
		});
	}
	pdtRequest.prototype.updateShoppingCartAccount = function(params, id, data){
		data = JSON.stringify(data)

		return this.doRequest({
			url: "/api/v1/carts/" + id,
			method: "put",
			data: data,
			headers: params.headers
		});
	}
	return pdtRequest;
});