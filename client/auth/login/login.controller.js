(function () {

  angular
  .module('packageDelivery')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'functionService', 'toastr'];
  function loginCtrl($location, functionService, toastr) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Logging in');
      functionService
        .login(vm.credentials)
        .error(function(err){
        	toastr.error('Login failed. Please try again', 'Error');
          console.log(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };
  }

})();