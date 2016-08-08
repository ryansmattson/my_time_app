angular.module('myTimeApp').factory('JobFactory', function($location, $http, TimesFactory) {

  var currentJob = {};

  // var bill_individual;
  // var bill_organization;
  // var current_job;
  // var date_created;
  // var hourly_rate;
  // var id;
  // var name;
  // var notes;
  // var user_id;

  //Retrieves the current job and all its details and adds them to the currentJob object.
  	function getCurrentJob() {
  		$http.get('/jobs/currentJob').then(handleGetCurrentSuccess, handleGetCurrentFailure);
  	}

  	function handleGetCurrentSuccess(res) {
  		console.log('Success!', res);
  		var data = res.data;

      currentJob.bill_individual = data[0].bill_individual;
      currentJob.bill_organization = data[0].bill_organization;
      currentJob.current_job = data[0].current_job;
      currentJob.date_created = data[0].date_created;
      currentJob.hourly_rate = data[0].hourly_rate;
      currentJob.id = data[0].id;
      currentJob.name = data[0].name;
      currentJob.notes = data[0].notes;
      currentJob.user_id = data[0].user_id;

      console.log('handleGetAllTimesSuccess data:', data);

  		TimesFactory.getAllTimes(currentJob.id);
  	}
  	function handleGetCurrentFailure(res) {
  		console.log('Failure!', res);
  	}




	return {
		getCurrentJob: getCurrentJob,
    currentJob : currentJob

	}
})
