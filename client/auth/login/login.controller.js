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
      functionService
        .login(vm.credentials)
        .error(function(err){
        	document.getElementById('login-error-msg').style.display = 'block';
        })
        .then(function(){
          $location.path('/profile');
        });
    };
  }

})();