define(["framework/ajaxServer"],function(ajax){
	function http($q){
		this.$q = $q;
		this.ajax = new ajax($q);
	}

	http.prototype.doRequest = function(options){
		var $q = this.$q;
		var def = $q.defer();
		this.ajax[options.method](options).then(function(data){
			$(".loading").hide();	
			def.resolve(data);
		},function(err){
			def.reject(err);
		});
		return def.promise;
	}
	return http;
});