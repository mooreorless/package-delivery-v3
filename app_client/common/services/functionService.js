(function () {

  angular
    .module('packageDelivery')
    .service('functionService', functionService);

  functionService.$inject = ['$http', '$window'];
  function functionService ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
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

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.firstName
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

    logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    placeOrder = function(order){
      console.log('calling placeOrder');
      return $http.post('/api/orders/new', order).success(function(data){
        console.log(data);
        console.log('finished posting to new order');
      });
    };

    getUserOrders = function(user){
      console.log(user);
      console.log('calling get user on the front end');
      return $http.get('/api/orders', {params: {user : user}}).success(function(data){
        console.log(data);
      });
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      placeOrder: placeOrder,
      getUserOrders: getUserOrders
    };
  }


})();