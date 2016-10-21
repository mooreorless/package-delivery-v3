(function () {

  angular
    .module('packageDelivery')
    .service('functionService', functionService);

  functionService.$inject = ['$http', '$window', 'toastr', '$location'];
  function functionService ($http, $window, toastr, $location) {

    var orders;
    var order;

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
			toastr.success('Login successful', 'Success');
      console.log(token);
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        // console.log('logged in!');
        return payload.exp > Date.now() / 1000;
      } else {
        console.log('not logged in');
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.firstName,
					lastName: payload.lastName,
					streetNumber: payload.streetNumber,
					streetName : payload.streetName,
					suburb: payload.suburb,
					postCode: payload.postCode
        };
      }
    };

    register = function(user) {
      console.log('register being called');
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

		updateUser = function(user) {
			console.log(user);
			return $http.put('/api/update/details', user).success(function(data, err){
				if (err) {
					console.log('error' + err);
				}
				console.log("Update user fin");
				console.log(data);
				saveToken(data.token);
			});
		};

    logout = function() {
      $window.localStorage.removeItem('mean-token');
      $location.path('/login');
    };

    placeOrder = function(order){
      console.log('calling placeOrder');
      return $http.post('/api/orders/new', order).success(function(data){
        console.log(data);
      });
    };

    getUserOrders = function(user){
      return $http.get('/api/orders', {params: {user : user}}).success(function(data){
        orders = data;
      });
    };

    loadOrders = function(){
      return orders;
    };

    getSingleOrder = function(orderID){
      return $http.get('/api/singleOrder', {params: {orderID: orderID}}).success(function(data){
        order = data;
        // console.log('from client side:' + data);
      });
    };

    loadSingleOrder = function(){
      return order;
    };

    getCurrentOrders = function() {
    	return $http.get('/api/orders/current').success(function(data) {
    		orders = data;
	    });
    };

    getDeliveredOrders = function() {
    	return $http.get('/api/orders/delivered').success(function(data) {
    	  orders = data;
	    });
    };

    getPlacedOrders = function() {
    	return $http.get('/api/order/awaiting').success(function(data) {
    	  orders = data;
	    });
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
			updateUser: updateUser,
      logout : logout,
	    placeOrder: placeOrder,
      getUserOrders: getUserOrders,
      orders: orders,
      loadOrders: loadOrders,
      getSingleOrder: getSingleOrder,
      loadSingleOrder: loadSingleOrder,
	    getCurrentOrders: getCurrentOrders,
	    getDeliveredOrders: getDeliveredOrders,
	    getPlacedOrders: getPlacedOrders,
      order: order
    };
  }


})();