define(["angular","framework/http"],function(angular,https){
	function homePage($q){
		https.call(this,$q);
	}
	homePage.prototype = new https();


	homePage.prototype.categoryData= function(query){

		var str="?";
		for(var i in query){
			str+=i+"="+query[i]+"&"
		}
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products"+str,
			method:"get"
		});
	}
	homePage.prototype.getAdvert = function(id){
		return this.doRequest({
			url:"/api/v1/adverts/"+id,
			method:"get"
		});
	}
	homePage.prototype.panic_buyings = function(id){
		return this.doRequest({
			url:"/api/v1/panic_buyings/"+id,
			method:"get"
		});
	}	
	return homePage;
});
