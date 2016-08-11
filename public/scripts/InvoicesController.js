//Controller for:
//invoices.html
//print-invoice.html
//new-invoice.html

angular.module('myTimeApp').controller('InvoicesController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'JobFactory', 'TimesFactory', 'InvoiceFactory', function($http, $location, $interval, $mdDialog, RouteFactory, JobFactory, TimesFactory, InvoiceFactory) {

	var vm = this;

	vm.allInvoicesList = {};


	vm.getAndEditInvoice = function(id) {
		InvoiceFactory.getAndEditInvoice(id);
	}


	vm.editInvoiceRoute = function(){
		RouteFactory.editInvoiceRoute();
	}


	function getAllInvoices() {
		$http.get('/invoices/allInvoices').then(handleGetJobsSuccess, handleGetJobsFailure);
	}

	function handleGetJobsSuccess(res) {
		console.log('Successf!', res);
		vm.allInvoicesList = res.data;
	}

	function handleGetJobsFailure(res) {
		console.log('Failure!', res);
	}

	//
	// vm.setAsCurrentJob = function(job_id) {
	// 	var sendData = {};
	// 	sendData.job_id = job_id;
	// 	$http.put('/jobs/changeCurrentJob', sendData).then(handleSetAsCurrentSucces, handleSetAsCurrentFailure);
	// }
	//
	// function handleSetAsCurrentSucces(res) {
	// 	console.log('Successfully set as current job', res);
	// 	// JobFactory.getCurrentJob();
	// 	// TimesFactory.getAllTimes();
	//   RouteFactory.currentJobRoute();
	// }
	//
	// function handleSetAsCurrentFailure(res) {
	// 	console.log('Failure', res);
	// }
	//


	getAllInvoices();

}]);
