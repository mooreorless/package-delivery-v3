/*
Controller for the login function
 */
(function () {

  angular
  .module('packageDelivery')
  .controller('loginCtrl', loginCtrl);
  //injecting
  loginCtrl.$inject = ['$location', 'functionService', 'toastr'];
  function loginCtrl($location, functionService, toastr) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };
    /*
     When the user submits the, do all validation and login
     */
    vm.onSubmit = function () {
      functionService
        .login(vm.credentials)
        .error(function(err){
        	document.getElementById('login-error-msg').style.display = 'block';
					console.log(err);
        })
        .then(function(){
          $location.path('/profile');
        });
    };
  }

})();