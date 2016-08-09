angular.module('myTimeApp').controller('NewInvoiceController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'TimesFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, TimesFactory, JobFactory, UserFactory) {

	var vm = this;
	vm.totalJobBalance;
	vm.finalRate;

	vm.currentJobTimes = TimesFactory.currentJobTimes;
	// id
	// jobId
	// date
	// startTime
	// endTime
	// elapsedTimeMillis
	// datePretty
	// startPretty
	// endPretty
	// elapsedTimePretty
	vm.currentJob = JobFactory.currentJob;
	// bill_individual
	// bill_organization
	// current_job
	// date_created
	// date_createdPretty
	// hourly_rate
	// id
	// name
	// notes
	// user_id
	vm.totalJobTime = TimesFactory.totalJobTime;
	// millis
	// hours
	// seconds
	vm.currentUser = UserFactory.currentUser;
	// id
	// first_name
	// last_name
	// full_name
	// username
	// email
	// phone
	// address
	// hourly_rate


	function calcFinalRate() {
		if (vm.currentJob.hourly_rate !== null) {
			vm.finalRate = vm.currentJob.hourly_rate;
		} else {
			vm.finalRate = vm.currentUser.hourly_rate;
		}
	}



	function calcTotalJobBalance() {
		var time = vm.totalJobTime.hours;
		var rate = vm.finalRate;
		var total = (time * rate).toFixed(2);

		vm.totalJobBalance = parseFloat(total);
		console.log(vm.totalJobBalance);
	}


	calcFinalRate();
	calcTotalJobBalance();

}]);
