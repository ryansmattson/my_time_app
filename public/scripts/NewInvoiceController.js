angular.module('myTimeApp').controller('NewInvoiceController', ['$http', '$location', '$interval', '$mdDialog', '$mdToast', 'RouteFactory', 'TimesFactory', 'JobFactory', 'UserFactory', 'DateTimeFactory', 'InvoiceFactory', function($http, $location, $interval, $mdDialog, $mdToast, RouteFactory, TimesFactory, JobFactory, UserFactory, DateTimeFactory, InvoiceFactory) {

	var vm = this;

	vm.invoice = {};
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

	vm.currentJobRoute = function() {
		RouteFactory.currentJobRoute();
	}

	vm.invoicesRoute = function() {
		RouteFactory.invoicesRoute();
	}

	vm.createNewInvoice = function(invoice) {
		InvoiceFactory.createNewInvoice(invoice);
	}


	vm.createAndPrintNewInvoice = function(invoice) {
		vm.createNewInvoice(invoice);
		RouteFactory.printInvoiceRoute();
	}


	function buildInvoice() {
		vm.invoice.address = vm.currentUser.address;
		vm.invoice.balanceDue = vm.totalJobBalance;
		vm.invoice.billTo = vm.currentJob.bill_organization
		vm.invoice.description = vm.currentJob.name;
		vm.invoice.dueDate;
		vm.invoice.email = vm.currentUser.email;
		vm.invoice.from = vm.currentUser.full_name;
		vm.invoice.hours = vm.totalJobTime.hours
		vm.invoice.invoiceDate;
		vm.invoice.invoiceNumber;
		vm.invoice.invoiceTo = vm.currentJob.bill_individual
		vm.invoice.notes = vm.currentJob.notes;
		vm.invoice.phone = vm.currentUser.phone;
		vm.invoice.rate = vm.finalRate;
		vm.invoice.terms;
	}


	vm.turnOnEditField = function(fieldName) {
		vm.editableField[fieldName] = false;
	}

	vm.submitEditField = function(fieldName, input) {
		vm.editableField[fieldName] = true;
		vm.invoice[fieldName] = input;
	}


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

	vm.print = function(){
		print();
	}


	calcFinalRate();
	calcTotalJobBalance();
	buildInvoice();
	RouteFactory.changeCurrentTab('invoices');

}]);
