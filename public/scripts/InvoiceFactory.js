angular.module('myTimeApp').factory('InvoiceFactory', function($location, $http, RouteFactory) {

	var currentInvoice = {
		data: {}
	};


	function getInvoice(id) {
		$http.get('/invoices/getInvoice/' + id).then(handleGetInvoiceSucces, handleGetInvoiceFailure);
	}

	function handleGetInvoiceSucces(res) {
		console.log('Successfully found invoice', res);
		currentInvoice.data = res.data;
	}

	function handleGetInvoiceFailure(res) {
		console.log('Failed to find invoice', res);
	}



	function getAndEditInvoice(id) {
		$http.get('/invoices/getInvoice/' + id).then(handleGetAndEditSucces, handleGetAndEditFailure);
	}

	function handleGetAndEditSucces(res) {
		console.log('Successfully found invoice', res);
		currentInvoice.data = res.data;
		RouteFactory.editInvoiceRoute();
	}

	function handleGetAndEditFailure(res) {
		console.log('Failed to find invoice', res);
	}


	var createNewInvoice = function(invoice) {
		var sendData = {};

		sendData.address = invoice.address;
		sendData.balance_due = invoice.balanceDue;
		sendData.bill_to = invoice.billTo;
		sendData.description = invoice.description;
		sendData.due_date = invoice.dueDate;
		sendData.email = invoice.email;
		sendData.from_name = invoice.from;
		sendData.invoice_date = invoice.invoiceDate;
		sendData.invoice_to = invoice.invoiceTo;
		sendData.notes = invoice.notes;
		sendData.phone = invoice.phone;
		sendData.rate = invoice.rate;
		sendData.terms = invoice.terms;

		$http.post('/invoices', sendData).then(handleNewInvoiceSuccess, handleNewInvoicesFailure);
	}

	function handleNewInvoiceSuccess(res) {
		console.log('Succesfully created new invoice!', res);
	}

	function handleNewInvoicesFailure(res) {
		console.log('Failed to creat a new invoice!', res);
	}

	return {
		createNewInvoice: createNewInvoice,
		currentInvoice: currentInvoice,
		getAndEditInvoice: getAndEditInvoice,
		getInvoice: getInvoice
	}
})
