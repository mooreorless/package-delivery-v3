(function () {

  angular
    .module('packageDelivery')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','functionService', 'toastr'];
  function navigationCtrl($location, functionService, toastr) {
    var navvm = this;
    var path = $location.path();

    if(path == "/orders"){
      document.getElementById('myOrders').className = "active";
      document.getElementById('newOrder').className = "";
      document.getElementById('myProfile').className = "";
    } else if(path == "/orders/new"){
      document.getElementById('myOrders').className = "";
      document.getElementById('newOrder').className = "active";
      document.getElementById('myProfile').className = "";
    } else if(path == "/profile"){
      document.getElementById('myOrders').className = "";
      document.getElementById('newOrder').className = "";
      document.getElementById('myProfile').className = "active";
    }

    navvm.isLoggedIn = functionService.isLoggedIn();

    navvm.currentUser = functionService.currentUser();

    navvm.logout = function(){
		functionService.logout();
		toastr.warning('You have logged out', 'Warning');
    };
  }

})();