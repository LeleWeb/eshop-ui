define(["angular","framework/http"],function(angular,https){
	function accountsReq($q){
		https.call(this,$q);
	}
	accountsReq.prototype = new https();
	// accountsReq.prototype.forLogon = function(data){
	// 	return this.doRequest({
	// 		url:"/api/v1/login",
	// 		method:"post",
	// 		data:data,
	// 	});
	// }
	accountsReq.prototype.getUserDetails = function(id){
		
		return this.doRequest({
				url:"/api/v1/accounts/" + id ,
				method:"get"
			});
	}
	accountsReq.prototype.getOrderDetail = function(id){
		
		return this.doRequest({
			url:"/api/v1/orders/"+ id,
			method:"get"
		});
	}

	accountsReq.prototype.getOrderStatus = function(id){
		
		return this.doRequest({
			url:"/api/v1/orders?buyer_type=Customer&buyer_id="+ id,
			method:"get"
		});
	}
	accountsReq.prototype.getPriorityShare = function(id){
		return this.doRequest({
			url:"/api/v1/distributions/authority?store_id=1&owner_type=Customer&owner_id="+id,
			method:"get"
		});
	}
	accountsReq.prototype.creatDistribution = function(para,data){
		data = JSON.stringify(data);

		return this.doRequest({
			url:"/api/v1/distributions",
			method:"post",
			headers:para.headers,
			data:data
		});
	}
	accountsReq.prototype.getDistAmountNum = function(id){
		return this.doRequest({
			url:"/api/v1/distributions/commission?customer_id="+id,
			method:"get"
		});
	}
	accountsReq.prototype.getDistributionQrcode = function(para,data){
		data = JSON.stringify(data);
		return this.doRequest({
			url:"/api/v1/distribution_qrcode",
			method:"post",
			headers:para.headers,
			data:data
		});
	}

	accountsReq.prototype.saveBankAddress = function(para,data){
		data = JSON.stringify(data);
		return this.doRequest({
			url:"/api/v1/bank_accounts",
			method:"post",
			headers:para.headers,
			data:data
		});
	}

	accountsReq.prototype.getBankAddress = function(id){
		
		return this.doRequest({
			url:"/api/v1/bank_accounts?customer_id="+id,
			method:"get",
		});
	}

	accountsReq.prototype.applyTakeOffMoney = function(para,data){
		data = JSON.stringify(data);
		return this.doRequest({
			url:"/api/v1/withdraw_details",
			method:"post",
			headers:para.headers,
			data:data
		});
	}

	accountsReq.prototype.getTakeMoneyDetails = function(id){
		return this.doRequest({
			url:"/api/v1/withdraw_details?customer_id="+id +"&limit=10",
			method:"get",
		});
	}









	return accountsReq;
});