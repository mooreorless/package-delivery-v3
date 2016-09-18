(function () {

  angular
    .module('packageDelivery')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      firstName : "Chris",
      lastName : "Martin",
      email : "lol@test.com",
      password: "lol",
      streetNumber: "4",
      streetName: "lol street",
      suburb: "lol",
      postCode: "4051"
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      console.log(vm.credentials);
      authentication
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