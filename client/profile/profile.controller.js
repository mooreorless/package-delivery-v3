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

      $('[data-toggle="tooltip"]').tooltip();

	  vm.view = "Account";

	  if(window.location.hash == '#FAQ'){
	  		document.getElementById('help').className = "active";
			document.getElementById('account').className = "";
			document.getElementById('billing').className = "";
			vm.view = "Help";
	  } 

	  vm.setView = function(view) {

	  	switch (view) {
			  case 'Account':
				  document.getElementById('account').className = "active";
				  document.getElementById('billing').className = "";
				  document.getElementById('help').className = "";
				  break;
			  case 'Billing':
				  document.getElementById('billing').className = "active";
				  document.getElementById('account').className = "";
				  document.getElementById('help').className = "";
				  break;
			  case 'Help':
				  document.getElementById('help').className = "active";
				  document.getElementById('account').className = "";
				  document.getElementById('billing').className = "";
				  break;
		  }
		  vm.view = view;
	  }
  }

})();