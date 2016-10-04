(function() {
  
  angular
    .module('packageDelivery')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl () {
      console.log('Home controller is running');
    }

})();