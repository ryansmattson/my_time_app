var router = require('express').Router();

var Invoice = require('../models/invoice.js');

router.post('/', function(req, res) {

	var data = req.body;

	var userId = req.user.id;

	Invoice.createInvoice(data.address, data.balance_due, data.bill_to, data.description, data.due_date, data.email, data.from_name, data.hours, data.invoice_date, data.invoice_number, data.invoice_to, data.notes, data.phone, data.rate, data.terms, userId, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.redirect('/');
		};
	});
});



router.get('/allInvoices', function(req, res) {
	var user = req.user;

	Invoice.findAllUserInvoices(user.id, function(err, invoices) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(invoices);
		}
	});
});


router.get('/getInvoice/:id', function(req, res) {
	var invoice_id = req.params.id;

	Invoice.findInvoiceById(invoice_id, function(err, invoice) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.send(invoice);
		}
	});
});

router.put('/updateInvoice', function(req, res) {
	var data = req.body;

	Invoice.updateInvoice(data.id, data.address, data.balance_due, data.bill_to, data.description, data.due_date, data.email, data.from_name, data.hours, data.invoice_date, data.invoice_number, data.invoice_to, data.notes, data.phone, data.rate, data.terms, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


router.delete('/deleteInvoice/:id', function(req, res) {
	var invoice_id = req.params.id;

	Invoice.deleteInvoice(invoice_id, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});


module.exports = router;
