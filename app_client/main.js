(function () {

  angular.module('packageDelivery', ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/orders', {
        templateUrl: '/orders/orders.view.html',
        controller: 'OrderCtrl',
        controllerAs: 'vm'
      })
      .when('/orders/new', {
        templateUrl: '/orders/newOrder.view.html',
        controller: 'OrderCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/login'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, functionService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !functionService.isLoggedIn()) {
        $location.path('/');
      }
    });
  }
  
  angular
    .module('packageDelivery')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'functionService', run]);

})();