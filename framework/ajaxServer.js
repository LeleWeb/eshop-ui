define(["jquery"],function($){
	var serviceIP = "http://www.dangxiaweb.com";
	function ajax($q){
		this.get = function(options){
			var def = $q.defer();
			$.ajax({
				url:serviceIP + options.url,
				type:"get",
				dataType:"json",
				timeout:options.timeout || "",
				data:options.data || "",
				headers:options["headers"]||{},
				beforeSend:function(){
					//mask show 
				},
				success:function(data){
					def.resolve(data)
				},
				error:function(err){
					def.reject(err);
				},
				complete:function(){
					//mask hide
				}
			});
			return def.promise;
		}
		this["post"] = function(options){
			var def = $q.defer();
			$.ajax({
				url: serviceIP + options.url,
				type:"POST",
				// dataType:"json",
				data:options.data,
				headers:options["headers"]||{},
				beforeSend:function(){

				},
				success:function(data){
					def.resolve(data)
				},
				error:function(err){
					def.reject(err);
				},
				complete:function(){

				}
			});
			return def.promise;
		}
		this["delete"] = function(options){
			var def = $q.defer();
			$.ajax({
				url:serviceIP +options.url,
				type:"delete",
				data:options.data,
				headers:options["headers"]||{},
				beforeSend:function(){

				},
				success:function(data){
					def.resolve(data)
				},
				error:function(err){
					def.reject(err);
				},
				complete:function(){

				}
			});
			return def.promise;
		}
		this.update = function(options){
			var def = $q.defer();
			$.ajax({
				url:serviceIP + options.url,
				type:"update",
				data:options.data,
				beforeSend:function(){

				},
				success:function(data){
					def.resolve(data)
				},
				error:function(err){
					def.reject(err);
				},
				complete:function(){

				}
			});
			return def.promise;
		}
		this.put = function(options){
			var def = $q.defer();
			$.ajax({
				url: serviceIP + options.url,
				type:"put",
				data:options.data,
				headers:options["headers"]||{},
				beforeSend:function(){

				},
				success:function(data){
					def.resolve(data)
				},
				error:function(err){
					def.reject(err);
				},
				complete:function(){

				}
			});
			return def.promise;
		}

	}
	return ajax;

});