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

    //create empty object to send with http request
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
        })
        .then(function(){
          if (functionService.loggedInUserType() === 'admin') {
            $location.path('/admin/dashboard');
          } else {
            $location.path('/profile');
          }
        });
    };
  }

})();