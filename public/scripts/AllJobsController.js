angular.module('myTimeApp').controller('AllJobsController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'JobFactory', 'TimesFactory', 'DateTimeFactory', function($http, $location, $interval, $mdDialog, RouteFactory, JobFactory, TimesFactory, DateTimeFactory) {

	var vm = this;

	vm.allJobsList = {};

	function getAllJobs() {
		$http.get('/jobs/allJobs').then(handleGetJobsSuccess, handleGetJobsFailure);
	}
	function handleGetJobsSuccess(res) {
		console.log('Successfully got all jobs!', res);
		vm.allJobsList = res.data;
		for(var i = 0; i < vm.allJobsList.length; i++){
			date = new Date(vm.allJobsList[i].date_created)
			vm.allJobsList[i].dateCreatedPretty = DateTimeFactory.formatForDate(date);
		}
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
