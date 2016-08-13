angular.module('myTimeApp').controller('EditJobController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', function($http, $location, $interval, $mdDialog, RouteFactory) {


  RouteFactory.changeCurrentTab('allJobs');

  }]);
