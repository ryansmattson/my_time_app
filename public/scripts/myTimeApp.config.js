angular.module('myTimeApp').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider){

//Material color palette theme
  $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('grey');


  $routeProvider
  .when('/', {
    templateUrl: '/views/new-job.html',
    controller: 'NewJobController',
    controllerAs: 'newjob'
  })
  .when('/all-jobs', {
    templateUrl: '/views/all-jobs.html',
    controller: "AllJobsController",
    controllerAs: "alljobs"
  })
  .when('/current-job', {
    templateUrl: '/views/current-job.html',
    controller: 'CurrentJobController',
    controllerAs: 'current'
  })
  .when('/edit-job', {
    templateUrl: '/views/edit-job.html',
    controller: 'EditJobController',
    controllerAs: 'editjob'
  })
  .when('/invoices', {
    templateUrl: '/views/invoices.html',
    controller: 'InvoicesController',
    controllerAs: 'invoices'
  })
  .when('/new-invoice', {
    templateUrl: '/views/new-invoice.html',
    controller: 'NewInvoiceController',
    controllerAs: 'newinvoice'
  })
  .when('/new-job', {
    templateUrl: '/views/new-job.html',
    controller: 'NewJobController',
    controllerAs: 'newjob'
  })
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'IndexController',
    controllerAs: 'index'
  })
  .when('/login-fail', {
    templateUrl: '/views/login-fail.html',
    controller: 'IndexController',
    controllerAs: 'index'
  })
  .when('/profile', {
    templateUrl: '/views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })
  .when('/register', {
    templateUrl: '/views/register.html',
    controller: 'IndexController',
    controllerAs: 'index'
  })



  $locationProvider.html5Mode(true);
}]);
