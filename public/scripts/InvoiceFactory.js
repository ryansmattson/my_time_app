angular.module('myTimeApp').factory('InvoiceFactory', function($location, $http, $mdToast, RouteFactory) {

	var currentInvoice = {
		data: {}
	};


	function getInvoice(id) {
		$http.get('/invoices/getInvoice/' + id).then(handleGetInvoiceSucces, handleGetInvoiceFailure);
	}

	function handleGetInvoiceSucces(res) {
		console.log('Successfully found invoice', res);
		currentInvoice.data = res.data;
		currentInvoice.data.invoice_date = null;
		currentInvoice.data.due = null;
		console.log('currentInvoice.data:', currentInvoice.data);
	}

	function handleGetInvoiceFailure(res) {
		console.log('Failed to find invoice', res);
	}



	function updateInvoice(invoice) {
		$http.put('/invoices/updateInvoice', invoice).then(handleUpdateInvoiceSucces, handleUpdateInvoiceFailure);
	}
	function handleUpdateInvoiceSucces(res) {
		console.log('Successfully updated invoice', res);
	}
	function handleUpdateInvoiceFailure(res) {
		console.log('Failed to udpdate invoice', res);
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
		sendData.hours = invoice.hours;
		sendData.invoice_date = invoice.invoiceDate;
		sendData.invoice_number = invoice.invoiceNumber
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


	function deleteInvoice(id) {
		$http.delete('/invoices/deleteInvoice/' + id).then(handleDeleteSucces, handleDeleteFailure);
	}

	function handleDeleteSucces(res) {
		console.log('Successfully deleted invoice:', res);
	}

	function handleDeleteFailure(res) {
		console.log('Could not delete invoice:', res);
	}

	return {
		createNewInvoice: createNewInvoice,
		currentInvoice: currentInvoice,
		deleteInvoice: deleteInvoice,
		getAndEditInvoice: getAndEditInvoice,
		getInvoice: getInvoice,
		updateInvoice: updateInvoice
	}
})
