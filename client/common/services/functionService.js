(function () {

  angular
    .module('packageDelivery')
    .service('functionService', functionService);

  functionService.$inject = ['$http', '$window', 'toastr', '$location'];
  function functionService ($http, $window, toastr, $location) {

    var orders;
    var order;
    var drivers;

    //save token to hold session data in browser
    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
      console.log(token);
    };

    //retrieve token data
    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    //check if someone is currently logged in
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

    // A getter for the current user
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

    //retrieve logged in user type
    var loggedInUserType = function(){
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        //split logged in email address
        userEmail = payload.email.split('@');
        //if customer is logged in
        if (userEmail[1] != 'onthespot.com'){
          return 'customer';
        }
        //if admin is logged in
        else if (userEmail[0] == 'admin'){
            return 'admin';
        }
        //if driver is logged in
        else{
          return 'driver';
        }
      }
    };

    //send form data to server for registration
    register = function(user) {
      console.log('register being called');
      return $http.post('/api/register', user).success(function(data){
        toastr.success('Account created', 'Success');
        saveToken(data.token);
      });
    };

    //send login form data to check against database
    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
        toastr.success('Login successful', 'Success');
      });
    };

    //allow customer to update their details
		updateUser = function(user) {
			return $http.put('/api/update/details', user).success(function(data){
        toastr.success('Updated profile', 'Success');
				// Forces toastr to show success more than once
				toastr.hidden('Hidden', 'Hidden');
				saveToken(data.token);
			});
		};

    //delete browser session
    logout = function() {
      $window.localStorage.removeItem('mean-token');
      $location.path('/login');
    };

    //send order creation form data off to server
    placeOrder = function(order){
      return $http.post('/api/orders/new', order).success(function(data){
        toastr.success('Order placed', 'Success');
        toastr.hidden('Hidden', 'Hidden');
      });
    };

    //retrieve orders for currently logged in user
    getUserOrders = function(user){
      return $http.get('/api/orders', {params: {user : user}}).success(function(data){
        orders = data;
      });
    };

    //helper function to send order back to client
    loadOrders = function(){
      return orders;
    };

    //retrieve data for individual order
    getSingleOrder = function(orderID){
      return $http.get('/api/singleOrder', {params: {orderID: orderID}}).success(function(data){
        order = data;
      });
    };

    //helper function for retrieving individual order
    loadSingleOrder = function(){
      return order;
    };

    //mark job as 'seen by driver' when a driver opens it for the first time
    markJobAsSeen = function(order){
      return $http.put('/api/update/jobSeen', order).success(function(data){
      });
    };

    //helper function for getting orders into admin panel
    getCurrentOrders = function() {
      return $http.get('/api/orders/current').success(function(data) {
        orders = data;
      });
    };

    //helper function for getting orders into admin panel
    getDeliveredOrders = function() {
      return $http.get('/api/orders/delivered').success(function(data) {
        orders = data;
      });
    };

    //helper function for getting orders into admin panel
    getPlacedOrders = function() {
      return $http.get('/api/orders/awaiting').success(function(data) {
        orders = data;
      });
    };

    //function to change job state in database
    updateJobState = function(update){
      return $http.put('/api/update/jobstate', update).success(function(data){
        toastr.success('Job State Changed', 'Success');
        toastr.hidden('Hidden', 'Hidden');
      });
    };

    //helper function for loading orders 
    loadDrivers = function() {
      return drivers;
    };

    //helper function for getting drivers into admin panel
    getAllDrivers = function() {
      return $http.get('/api/drivers/all').success(function(data) {
				drivers = data;
      });
    };

    //assign driver to unassigned job
    assignDriver = function(driver) {
      return $http.put('/api/orders/assign/driver', driver).success(function(driver) {
        var driverName = driver.driver.charAt(0).toUpperCase() + driver.driver.slice(1);
        toastr.success('Assigned to ' + driverName);
      });
    };

    //get the amount of jobs currently assigned to driver 
    getJobCountForDriver = function(driver) {
      return $http.get('/api/orders/driver', { params: { driverName: driver } }).success(function(driver) {
        orders = driver;
      });
    };

    //export functions and variables to allow them to be used in our controllers
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
      order: order,
      loggedInUserType: loggedInUserType,
      updateJobState: updateJobState,
      drivers: drivers,
      loadDrivers: loadDrivers,
      getAllDrivers: getAllDrivers,
      assignDriver: assignDriver,
      getJobCountForDriver: getJobCountForDriver,
      markJobAsSeen: markJobAsSeen
    };
  }


})();