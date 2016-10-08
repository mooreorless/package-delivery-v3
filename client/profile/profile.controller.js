(function() {
  
  angular
    .module('packageDelivery')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'toastr'];
  function profileCtrl($location, meanData, toastr) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
      	toastr.error('Please sign in or make an account', 'Error');
				$location.path('/');
        console.log(e);
      });
  }

})();