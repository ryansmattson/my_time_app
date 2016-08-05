angular.module('myTimeApp').controller('AllJobsController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', function($http, $location, $interval, $mdDialog, RouteFactory) {

	var vm = this;

	vm.allJobsList = {};


	function getAllJobs() {
		$http.get('/jobs/allJobs').then(handleGetJobsSuccess, handleGetJobsFailure);
	}

	function handleGetJobsSuccess(res) {
		console.log('Successf!', res);
		vm.allJobsList = res.data;
	}

	function handleGetJobsFailure(res) {
		console.log('Failure!', res);
	}


	vm.setAsCurrentJob = function(job_id) {
		var sendData = {};
		sendData.job_id = job_id;

		$http.put('/jobs/changeCurrentJob', sendData).then(handleSetAsCurrentSucces, handleSetAsCurrentFailure);
	}

	function handleSetAsCurrentSucces(res) {
		console.log('Successfully set as current job', res);
    RouteFactory.currentJobRoute();
	}

	function handleSetAsCurrentFailure(res) {
		console.log('Failure', res);
	}



	getAllJobs();

}]);
