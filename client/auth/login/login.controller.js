(function () {

  angular
  .module('packageDelivery')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'functionService'];
  function loginCtrl($location, functionService) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log("submitting login");
      functionService
        .login(vm.credentials)
        .error(function(err){
          alert(err);
          console.log(err);
        })
        .then(function(){
          $location.path('/profile');
        });
    };
  }

})();