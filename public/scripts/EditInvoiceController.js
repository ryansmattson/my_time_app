angular.module('myTimeApp').controller('EditInvoiceController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'TimesFactory', 'JobFactory', 'UserFactory', 'DateTimeFactory', 'InvoiceFactory', function($http, $location, $interval, $mdDialog, RouteFactory, TimesFactory, JobFactory, UserFactory, DateTimeFactory, InvoiceFactory) {

	var vm = this;

  vm.invoice = InvoiceFactory.currentInvoice.data;
	vm.invoiceDate = new Date(vm.invoice.invoice_date);
	vm.dueDate = new Date(vm.invoice.due_date);
	vm.invoiceDatePretty = DateTimeFactory.formatForDate(vm.invoice.invoice_date);
	vm.dueDatePretty = DateTimeFactory.formatForDate(vm.invoice.due_date);

	vm.invoicesRoute = function(){
		RouteFactory.invoicesRoute();
	}

	//shows/hides the calendar to edit
	vm.editableField = {
		invoiceDate: false,
		dueDate: false
	}

	vm.editField = function(field){
		// vm.invoiceDate = new Date(vm.invoiceDatePretty);
		// vm.dueDate = new Date(vm.dueDatePretty);
		vm.editableField[field] = true;
	}

	vm.doneEditing = function(field){
		vm.invoiceDatePretty = DateTimeFactory.formatForDate(vm.invoiceDate);
		vm.dueDatePretty = DateTimeFactory.formatForDate(vm.dueDate);
		vm.editableField[field] = false;
	}

  vm.updateInvoice = function(invoice){
		invoice.invoice_date = vm.invoiceDate;
		invoice.due_date = vm.dueDate;
		InvoiceFactory.updateInvoice(invoice);
  }

	vm.print = function(){
		print();
	}


	RouteFactory.changeCurrentTab('invoices');
}]);
