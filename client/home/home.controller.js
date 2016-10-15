(function() {
  
  angular
    .module('packageDelivery')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$location', '$scope', 'functionService'];
    function homeCtrl ($location, $scope, functionService) {
		console.log('Home controller is running');
		$scope.hidden = ($location.path() == '/login');
    }

    
})();