angular.module('myTimeApp').controller('AllJobsController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'JobFactory', 'TimesFactory', function($http, $location, $interval, $mdDialog, RouteFactory, JobFactory, TimesFactory) {

	var vm = this;

	vm.allJobsList = {};

	function getAllJobs() {
		$http.get('/jobs/allJobs').then(handleGetJobsSuccess, handleGetJobsFailure);
	}
	function handleGetJobsSuccess(res) {
		console.log('Successfully got all jobs!', res);
		vm.allJobsList = res.data;
	}
	function handleGetJobsFailure(res) {
		console.log('Failure!', res);
	}


	vm.setAsCurrentJob = function(job_id){
		JobFactory.setAsCurrentJob(job_id);
	}


	vm.deleteJob = function(id, ev){
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm =
			$mdDialog.confirm()
			.title('Are you sure you want to delete this job?')
			.textContent('This action cannot be undone.')
			.ariaLabel('Delete job?')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function() {
			JobFactory.deleteJob(id);
			getAllJobs();
		});
	}


	getAllJobs();
	RouteFactory.changeCurrentTab('allJobs');

}]);
