(function() {

  angular
    .module('packageDelivery')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'functionService'];
  /*
  A route so that the profile with auth can be gotten from another part of the application
   */
  function meanData ($http, functionService) {


    // the http request for the profile using the route /api/profile
    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ functionService.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();