(function () {

  angular
  .module('packageDelivery')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log("submitting login");
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(err);
          console.log(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

    function test(){
      console.log("hi");
    }

  }

})();