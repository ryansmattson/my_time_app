angular.module('myTimeApp').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider){

//Material color palette theme
  $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('grey');


  $routeProvider
  .when('/', {
    templateUrl: '/views/home.html',
    controller: 'MainController',
    controllerAs: 'main'
  })
  .when('/alljobs', {
    templateUrl: '/views/all-jobs.html',
    controller: "MainController",
    controllerAs: "main"
  })
  .when('/create-invoice', {
    templateUrl: '/views/create-invoice.html',
    controller: 'CreateController',
    controllerAs: 'create'
  })
  .when('/current-job', {
    templateUrl: '/views/current-job.html',
    controller: 'MainController',
    controllerAs: 'main'
  })
  .when('/edit-job', {
    templateUrl: '/views/edit-job.html',
    controller: 'EditController',
    controllerAs: 'edit'
  })
  .when('/invoices', {
    templateUrl: '/views/invoices.html',
    controller: 'InvoiceController',
    controllerAs: 'invoice'
  })
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/profile', {
    templateUrl: '/views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })
  .when('/register', {
    templateUrl: '/views/register.html',
    controller: 'MainController',
    controllerAs: 'main'
  })



  $locationProvider.html5Mode(true);
}]);
