angular.module('myTimeApp').factory('RouteFactory', function($location){

function allJobsRoute(){
  $location.path('/all-jobs');
}

function currentJobRoute(){
  $location.path('/current-job');
}

function editJobRoute(){
  $location.path('/edit-job');
}

function homeRoute(){
  $location.path('/home');
}

function invoicesRoute(){
  $location.path('/invoices');
}

function newInvoiceRoute(){
  $location.path('/new-invoice');
}

function newJobRoute(){
  $location.path('/new-job');
}

function profileRoute(){
  $location.path('/profile');
}

function registerRoute(){
  $location.path('/register');
}

  return {
    allJobsRoute : allJobsRoute,
    currentJobRoute : currentJobRoute,
    editJobRoute : editJobRoute,
    homeRoute : homeRoute,
    invoicesRoute : invoicesRoute,
    newInvoiceRoute : newInvoiceRoute,
    newJobRoute : newJobRoute,
    profileRoute : profileRoute,
    registerRoute : registerRoute
  }
})
