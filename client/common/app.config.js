(function () {

  angular.module('packageDelivery', ['ngRoute', 'toastr']);

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
			//change to driver/orders
      .when('/driver/orders', {
        templateUrl: '/driverorders.view.html',
        controller: 'OrderCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/login'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, functionService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

    	if (!functionService.isLoggedIn()) {
				switch ($location.path()) {
					case '/profile':
						console.log('login to view profile');
						// $location.path('/'); added redirect in individual route instead
						break;

					case '/orders':
						console.log('login to view orders');
						console.log('if user is logged in message with watermark here');
						$location.path('/');
						break;

					case '/orders/new':
						console.log('login to make an order');
						$location.path('/');
						break;
				}
			}
    });
  }
  
  angular
    .module('packageDelivery', ['ngRoute', 'toastr'])
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'functionService', run]);

})();