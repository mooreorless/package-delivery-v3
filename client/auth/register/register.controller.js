(function () {

  angular
    .module('packageDelivery')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'functionService', 'toastr'];
  function registerCtrl($location, functionService, toastr) {
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
        	toastr.error('Something went wrong, please try again', 'Error');
					console.log(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }

})();