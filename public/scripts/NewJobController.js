angular.module('myTimeApp').controller('NewJobController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', function($http, $location, $interval, $mdDialog, RouteFactory) {

	var vm = this;

	vm.submitNewJob = function(name, rate, company, individual, notes) {
		var sendData = {};

		sendData.name = name;
		sendData.hourly_rate = rate;
    sendData.date_created = new Date();
		sendData.bill_organization = company;
		sendData.bill_individual = individual;
		sendData.notes = notes;

		$http.post('/jobs', sendData).then(handleSuccess, handleFailure);

	}

	function handleSuccess(res) {
		// $location.path('/current-job');
		console.log('Success!', res);
		RouteFactory.currentJobRoute();
	}

	function handleFailure(res) {
		console.log('Failure!', res);
	}

	RouteFactory.changeCurrentTab('currentJob');
}]);
