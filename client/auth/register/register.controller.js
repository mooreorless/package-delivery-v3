(function () {

  angular
    .module('packageDelivery')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'functionService'];
  function registerCtrl($location, functionService) {
    var vm = this;

    vm.credentials = {
      firstName : "",
      lastName : "",
      email : "",
      password: "",
      streetNumber: "",
      streetName: "",
      suburb: "",
      postCode: ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      console.log(vm.credentials);
      functionService
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();