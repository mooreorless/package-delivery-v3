(function () {

  angular
    .module('packageDelivery')
    .controller('singleOrderCtrl', singleOrderCtrl);

  singleOrderCtrl.$inject = ['$location', '$rootScope', '$routeParams', 'functionService', 'NgMap'];
  function singleOrderCtrl($location, $rootScope, $routeParams, functionService, NgMap) {

    var vm = this;

    //get order ID from route parameters 
    vm.orderID = $routeParams.orderID;

    vm.googleMapsUrl = '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0ZemKOuENUDXYGs4GVAVIbkPs3vyqJXA"></script>';

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
      vm.pickUpAddress = vm.order.pickUpNumber+' '+vm.order.pickUpName+' '+vm.order.pickUpSuburb+' '+vm.order.pickUpPostcode;
      vm.dropOffAddress = vm.order.dropOffNumber+' '+vm.order.dropOffName+' '+vm.order.dropOffSuburb+' '+vm.order.dropOffPostcode;
      console.log(vm.pickUpAddress);
    });

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
  });

  }

})();