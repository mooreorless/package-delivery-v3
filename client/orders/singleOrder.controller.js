(function () {

  angular
    .module('packageDelivery')
    .controller('singleOrderCtrl', singleOrderCtrl);

  singleOrderCtrl.$inject = ['$location', '$rootScope', '$routeParams', 'functionService'];
  function singleOrderCtrl($location, $rootScope, $routeParams, functionService) {

    var vm = this;

    //get order ID from route parameters 
    vm.orderID = $routeParams.orderID;

    functionService
    .getSingleOrder(vm.orderID)
    .error(function(err){
      if (err){
      alert(err);
      }
    })
    .then(function(){
      vm.order = functionService.loadSingleOrder();
    }).then(function(){
      console.log(vm.order);
    });



  }

})();