(function () {

  angular.module('packageDelivery', ['ngRoute', 'toastr', 'ngMap']);

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
        .when('/label/:orderID', {
        templateUrl: '/orders/label.view.html',
        controller: 'labelCtrl',
        controllerAs: 'vm'
      })
			.when('/update/details', {
				templateUrl: 'auth/update/details/user.view.html',
				controller: 'updateUserCtrl',
				controllerAs: 'vm'
			})
			.when('/admin/dashboard', {
				templateUrl: '/admin/dashboard/dashboard.view.html',
				controller: 'DashBoardCtrl',
				controllerAs: 'vm'
			})
			.when('/admin/dashboard/item', {
				templateUrl: '/admin/dashboard/individual-item/individual-item.view.html',
				controller: 'ItemDashBoardCtrl',
				controllerAs: 'vm'
			})
      .otherwise({redirectTo: '/login'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

  }

  function run($rootScope, $location, $window, functionService) {
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
						// $location.path('/');
						break;

					case '/orders/new':
						console.log('login to make an order');
						// $location.path('/');
						break;
				}
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
    .module('packageDelivery', ['ngRoute', 'toastr', 'ngMap'])
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', '$window', 'functionService', run]);

})();