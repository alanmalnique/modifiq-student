var ModifiQAppServices = angular.module('ModifiQApp.services', []);

ModifiQAppServices.service('webRequest', function(ajaxRequest){

	this.get = function(action, $data, successCallback, errorCallback){
		ajaxRequest.new("GET", ModifiQApiUrl+"/api/"+action, $data, successCallback, errorCallback);
	}

	this.post = function(action, $data, successCallback, errorCallback){
		ajaxRequest.new("POST", ModifiQApiUrl+"/api/"+action, $data, successCallback, errorCallback);
	}

	this.put = function(action, $data, successCallback, errorCallback){
		ajaxRequest.new("PUT", ModifiQApiUrl+"/api/"+action, $data, successCallback, errorCallback);
	}

	this.delete = function(action, $data, successCallback, errorCallback){
		ajaxRequest.new("DELETE", ModifiQApiUrl+"/api/"+action, $data, successCallback, errorCallback);
	}

	this.upload = function(action, $data, successCallback, errorCallback){
		ajaxRequest.new("UPLOAD", ModifiQApiUrl+"/api/"+action, $data, successCallback, errorCallback);
	}
});

ModifiQAppServices.service('ajaxRequest', function($http, $rootScope, alerta, $location, loading){
	this.new = function($method, $url, $data, $successCallback, $errorCallback){
		var headers = {};
		if($rootScope.loginToken != undefined){
			if($method == "UPLOAD"){
				headers = {
		            'Content-Type': undefined,
					'Authorization': 'Bearer ' + $rootScope.loginToken,
					'X-Api-Version': 'v'+ModifiQApiVersion
		        };
			}else{
				headers = {
		            'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + $rootScope.loginToken,
					'X-Api-Version': 'v'+ModifiQApiVersion
		        };
			}
		}else{
			headers = {
	            'Content-Type': 'application/json',
				'X-Api-Version': 'v'+ModifiQApiVersion
	        };
		}
		if($method == "POST"){
			$http({
				method: "POST",
				url: $url,
				data: $data,
				withCredentials: false,
		        headers: headers
			}).then($successCallback, function(err){
				if(err.status == 401){
					loading.hide();
					alerta.show('warning', 'Atenção', 'A sua sessão expirou. Realize o login novamente!', false, function(){
						$location.path("/logout");
					});
				}else{
					$errorCallback(err);
				}
			});
		}else if($method == "GET"){
			$http({
				method: "GET",
				url: $url,
				withCredentials: false,
		        headers: headers,
				params: $data
			}).then($successCallback, function(err){
				if(err.status == 401){
					loading.hide();
					alerta.show('warning', 'Atenção', 'A sua sessão expirou. Realize o login novamente!', false, function(){
						$location.path("/logout");
					});
				}else{
					$errorCallback(err);
				}
			});
		}else if($method == "PUT"){
			$http({
				method: "PUT",
				url: $url,
				data: $data,
				withCredentials: false,
		        headers: headers
			}).then($successCallback, function(err){
				if(err.status == 401){
					loading.hide();
					alerta.show('warning', 'Atenção', 'A sua sessão expirou. Realize o login novamente!', false, function(){
						$location.path("/logout");
					})
				}else{
					$errorCallback(err);
				}
			});
		}else if($method == "DELETE"){
			$http({
				method: "DELETE",
				url: $url,
				data: $data,
				withCredentials: false,
		        headers: headers
			}).then($successCallback, function(err){
				if(err.status == 401){
					loading.hide();
					alerta.show('warning', 'Atenção', 'A sua sessão expirou. Realize o login novamente!', false, function(){
						$location.path("/logout");
					})
				}else{
					$errorCallback(err);
				}
			});
		}if($method == "UPLOAD"){
			$http({
				method: "POST",
				url: $url,
				data: $data,
				withCredentials: false,
		        headers: headers
			}).then($successCallback, function(err){
				if(err.status == 401){
					loading.hide();
					alerta.show('warning', 'Atenção', 'A sua sessão expirou. Realize o login novamente!', false, function(){
						$location.path("/logout");
					});
				}else{
					$errorCallback(err);
				}
			});
		}
	}
})

ModifiQAppServices.factory('localService', ['$http',function($http){
	return {
		set:function(key,value){
	    	return localStorage.setItem(key,JSON.stringify(value));
		},
		get:function(key){
	    	return JSON.parse(localStorage.getItem(key));
		},
		destroy:function(key){
	    	return localStorage.removeItem(key);
		},
	};
}])

ModifiQAppServices.factory('sessionService', ['$http',function($http){
	return {
		set:function(key,value){
	    	return sessionStorage.setItem(key,JSON.stringify(value));
		},
		get:function(key){
	    	return JSON.parse(sessionStorage.getItem(key));
		},
		destroy:function(key){
	    	return sessionStorage.removeItem(key);
		},
	};
}])

ModifiQAppServices.factory('loading', ['$http',function($http){
	return {
		show:function(){
	    	$(".loading").fadeIn("normal");
		},
		hide:function(){
	    	$(".loading").fadeOut("normal");
		}
	};
}])

ModifiQAppServices.factory('alerta', ['SweetAlert',function(SweetAlert){
	return {
		show:function(tipo, titulo, texto, cancelar, callbackok, callbackcancelar){
			if(tipo == undefined){
				tipo = 'warning';
			}
	    	SweetAlert.swal({
	            title: titulo, //Bold text
	            text: texto, //light text
	            type: tipo, //type -- adds appropiriate icon
	            showCancelButton: cancelar, // displays cancel btton
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "OK",
	            cancelButtonText: "Cancelar",
	            closeOnConfirm: true, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
	            closeOnCancel: true
	        },
	        function(isConfirm){ //Function that triggers on user action.
	            if(isConfirm){
	                if(callbackok != undefined){
	                	callbackok();
	                }
	            } else {
	                if(callbackcancelar != undefined){
	                	callbackcancelar();
	                }
	            }
	        });
		}
	};
}])

ModifiQAppServices.service('creditCard', ['$rootScope', 'webRequest', function($rootScope, webRequest){
	this.bandeiras = {};
	this.bandeiras["elo"] = {
	    regexpBin: /^401178|^401179|^431274|^438935|^451416|^457393|^457631|^457632|^504175|^627780|^636297|^636368|^(506699|5067[0-6]\d|50677[0-8])|^(50900\d|5090[1-9]\d|509[1-9]\d{2})|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053     [0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])/,
	    regexpFull: /^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368|(506699|5067[0-6]\d|50677[0-8])|(50900\d|5090[1-9]\d|509[1-9]\d{2})|65003[1-3]|(65003[5-9]|65004\d|65005[0-1])|(65040[5-9]|6504[1-3]\d)|(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|(65054[1-9]| 6505[5-8]\d|65059[0-8])|(65070\d|65071[0-8])|65072[0-7]|(65090[1-9]|65091\d|650920)|(65165[2-9]|6516[6-7]\d)|(65500\d|65501\d)|(65502[1-9]|6550[3-4]\d|65505[0-8]))[0-9]{10,12}/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["dinners"] = {
	    regexpBin: /^3(?:0[0-5]|[68][0-9])/,
	    regexpFull: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["discover"] = {
	    regexpBin: /^6(?:011|5[0-9]{2})/,
	    regexpFull: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["hipercard"] = {
	    regexpBin: /^3841[046]0|^60/,
	    regexpFull: /^(38[0-9]{17}|60[0-9]{14})$/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["american"] = {
	    regexpBin: /^34|^37/,
	    regexpFull: /^3[47][0-9]{13}$/,
	    regexpCvv: /^\d{3,4}$/
	};
	this.bandeiras["aura"] = {
	    regexpBin: /^50[0-9]/,
	    regexpFull: /^50[0-9]{14,17}$/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["mastercard"] = {
	    regexpBin: /^5[1-5][0-9][0-9]/,
	    regexpFull: /^5[1-5][0-9]{14}$/,
	    regexpCvv: /^\d{3}$/
	};
	this.bandeiras["visa"] = {
	    regexpBin: /^4/,
	    regexpFull: /^4[0-9]{12}(?:[0-9]{3})?$/,
	    regexpCvv: /^\d{3}$/
	};
	this.ValidarBin = function(card, num){
	    return this.bandeiras[card].regexpBin.test(Number(num));
	};
	this.ValidarNumero = function(card, num, cvv){
	    return this.bandeiras[card].regexpFull.test(Number(num));
	};
	this.ValidarCVV = function(card, cvv){
	    return this.bandeiras[card].regexpCvv.test(Number(cvv));
	};
	this.ObterNome = function(num){
	    var results = new Array();
	    if(this.ValidarBin('mastercard', num)){
			results.push(2);
		}else if(this.ValidarBin('elo', num)){
			results.push(4);
		}else if(this.ValidarBin('visa', num)){
			results.push(1);
		}else if(this.ValidarBin('american', num)){
			results.push(5);
		}else if(this.ValidarBin('dinners', num)){
			results.push(3);
		}/*else if(this.ValidarBin('discover', num)){
			results.push('discover');
		}else if(this.ValidarBin('aura', num)){
			results.push('aura');
		}*/else if(this.ValidarBin('hipercard', num)){
			results.push('hipercard');
		}

	    if(results.length==1) return results[0];
	    return null;
	}
}]);