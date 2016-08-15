//Controller for:
//invoices.html
//print-invoice.html
//new-invoice.html

angular.module('myTimeApp').controller('InvoicesController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'JobFactory', 'TimesFactory', 'InvoiceFactory', 'DateTimeFactory', function($http, $location, $interval, $mdDialog, RouteFactory, JobFactory, TimesFactory, InvoiceFactory, DateTimeFactory) {

	var vm = this;

	vm.allInvoicesList = {};


	vm.getAndEditInvoice = function(id) {
		InvoiceFactory.getAndEditInvoice(id);
	}

	vm.deleteInvoice = function(id, ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm =
			$mdDialog.confirm()
			.title('Are you sure you want to delete this invoice?')
			.textContent('This action cannot be undone.')
			.ariaLabel('Delete invoice?')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function() {
			InvoiceFactory.deleteInvoice(id);
			getAllInvoices();
		});
	}

	vm.editInvoiceRoute = function() {
		RouteFactory.editInvoiceRoute();
	}


	function getAllInvoices() {
		$http.get('/invoices/allInvoices').then(handleGetInvoicesSuccess, handleGetInvoicesFailure);
	}

	function handleGetInvoicesSuccess(res) {
		console.log('Successf!', res);
		vm.allInvoicesList = res.data;
		console.log('vm.allInvoicesList', vm.allInvoicesList);
		for (var i = 0; i < vm.allInvoicesList.length; i++) {
			vm.allInvoicesList[i].invoice_date = DateTimeFactory.formatForDate(vm.allInvoicesList[i].invoice_date);
		}
	}

	function handleGetInvoicesFailure(res) {
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
	RouteFactory.changeCurrentTab('invoices');
}]);
