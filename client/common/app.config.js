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
        controller: 'newOrderCtrl',
        controllerAs: 'vm'
      })
      .when('/order/:orderID', {
        templateUrl: '/orders/singleOrder.view.html',
        controller: 'singleOrderCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/login'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, $window, functionService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !functionService.isLoggedIn()) {
        $location.path('/');
      }
    });
    // $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute){
    //   if(currentRoute){
    //     currURL = (nextRoute.$$route.originalPath);
    //     prevURL = (currentRoute.$$route.originalPath);
    //     if (currURL == '/login' || prevURL == '/login'){
    //       console.log('force refresh!');
    //       // $window.location.reload();
    //       // $scope.$apply();
    //     }
    //   }
    // });
  }
  
  angular
    .module('packageDelivery')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', '$window', 'functionService', run]);

})();