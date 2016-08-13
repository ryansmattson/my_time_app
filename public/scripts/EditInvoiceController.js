angular.module('myTimeApp').controller('EditInvoiceController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'TimesFactory', 'JobFactory', 'UserFactory', 'DateTimeFactory', 'InvoiceFactory', function($http, $location, $interval, $mdDialog, RouteFactory, TimesFactory, JobFactory, UserFactory, DateTimeFactory, InvoiceFactory) {

	var vm = this;

  vm.invoice = InvoiceFactory.currentInvoice.data;

	// vm.totalJobBalance;
	// vm.finalRate;
	vm.editableField = {
		invoice: false, description: false, invoiceDate: false,	dueDate: false,	from: false, address: false,	phone: false,	email: false,	billTo: false, invoiceTo: false, hours: false, rate: false, balanceDue: false, notes: false, terms: false
	}

	vm.createNewInvoice = function(invoice){
		InvoiceFactory.createNewInvoice(invoice);
	}

  vm.updateInvoice = function(invoice){
    console.log('invoice:', invoice);
    InvoiceFactory.updateInvoice(invoice);
  }

  vm.saveAndPrintInvoice = function(){
  }

	vm.invoicesRoute = function(){
		RouteFactory.invoicesRoute();
	}

  //
	// vm.invoice = {};
	// //terms


	// vm.currentJobTimes = TimesFactory.currentJobTimes;
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
	// vm.currentJob = JobFactory.currentJob;
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
	// vm.totalJobTime = TimesFactory.totalJobTime;
	// millis
	// hours
	// seconds
	// vm.currentUser = UserFactory.currentUser;
	// id
	// first_name
	// last_name
	// full_name
	// username
	// email
	// phone
	// address
	// hourly_rate


// vm.createAndPrintNewInvoice(invoice){
// 	vm.createNewInvoice(invoice);
// 	RouteFactory.printInvoiceRoute();
// }


	// function buildInvoice() {
	// 	vm.invoice.address = vm.currentUser.address;
	// 	vm.invoice.balanceDue = vm.totalJobBalance;
	// 	vm.invoice.billTo = vm.currentJob.bill_organization
	// 	vm.invoice.description = vm.currentJob.name;
	// 	// vm.invoice.dueDate =
	// 	vm.invoice.email = vm.currentUser.email;
	// 	vm.invoice.from = vm.currentUser.full_name;
	// 	vm.invoice.hours = vm.totalJobTime.hours
	// 	vm.invoice.invoiceDate = new Date();
	// 	vm.invoice.invoiceTo = vm.currentJob.bill_individual
	// 	vm.invoice.notes = vm.currentJob.notes;
	// 	vm.invoice.phone = vm.currentUser.phone;
	// 	vm.invoice.rate = vm.finalRate;
	// }


	vm.turnOnEditField = function(fieldName) {
		vm.editableField[fieldName] = false;

		console.log('editFieldOn field:', fieldName);
	}
  //
	// vm.submitEditField = function(fieldName, input) {
	// 	vm.editableField[fieldName] = true;
	// 	vm.invoice[fieldName] = input;
	// 	console.log('editFieldOff fieldName:', fieldName);
	// 	console.log('editFieldOff input:', input);
	// 	console.log('editableField:', vm.editableField);
	// }

	// vm.turnOffAllEditFields = function() {
	// 	console.log('turnOffAllEditFields');
	// 	for (field in vm.editableField) {
	// 		if (field == true) {
	// 			field = false;
	// 		}
	// 	}
	// }

	// function calcFinalRate() {
	// 	if (vm.currentJob.hourly_rate !== null) {
	// 		vm.finalRate = vm.currentJob.hourly_rate;
	// 	} else {
	// 		vm.finalRate = vm.currentUser.hourly_rate;
	// 	}
	// }

  //
	// function calcTotalJobBalance() {
	// 	var time = vm.totalJobTime.hours;
	// 	var rate = vm.finalRate;
	// 	var total = (time * rate).toFixed(2);
  //
	// 	vm.totalJobBalance = parseFloat(total);
	// 	console.log(vm.totalJobBalance);
	// }


	// calcFinalRate();
	// calcTotalJobBalance();
	// buildInvoice();

	RouteFactory.changeCurrentTab('invoices');

}]);
