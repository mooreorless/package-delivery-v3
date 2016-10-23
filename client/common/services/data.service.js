(function() {

  angular
    .module('packageDelivery')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'functionService'];
  function meanData ($http, functionService) {

    //query user from database
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