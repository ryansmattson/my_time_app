var router = require('express').Router();

var Invoice = require('../models/invoice.js');

router.post('/', function(req, res) {

	var data = req.body;

	var userId = req.user.id;

	Invoice.createInvoice(data.address, data.balance_due, data.bill_to, data.description, data.due_date, data.email, data.from_name, data.invoice_date, data.invoice_to, data.notes, data.phone, data.rate, data.terms, userId, function(err) {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.redirect('/');
		};
	});
});

// router.put('/changeCurrentJob', function(req, res) {
//
// 	var data = req.body;
//
// 	var userId = req.user.id;
//
// 	Invoice.setCurrentJobFalse(userId, function(err) {
// 		if (err) {
// 			console.log(err);
// 			// res.sendStatus(500);
// 		} else {
//       setJobTrue();
// 			// res.sendStatus(200);
// 		}
// // 	});
//
//   function setJobTrue() {
//     Invoice.setCurrentJobTrue(userId, data.job_id, function(err) {
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//       } else {
//         console.log('newCallback Success');
//         res.sendStatus(200);
//       }
//     });
//   }
//
// });




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


router.get('/getInvoice/:id', function(req, res){
  var invoice_id = req.params.id;

	Invoice.findInvoiceById(invoice_id, function(err, invoice){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(invoice);
    }
  });
});

module.exports = router;
