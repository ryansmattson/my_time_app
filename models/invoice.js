// var pg = require('pg');
//
// var config = {
// 	database: 'mytime',
// 	port: 5432,
// 	max: 10,
// 	idleTimeoutMillis: 30000
// };

var pg = require('pg');
var url = require('url');

var config={};

if(process.env.DATABASE_URL != undefined) {
 // connectionString = process.env.DATABASE_URL + "?ssl=true";
 var params = url.parse(process.env.DATABASE_URL);
 var auth = params.auth ? params.auth.split(':') : [null, null];
   config = {
   user: auth[0],
   password: auth[1],
   host: params.hostname,
   port: params.port,
   database: params.pathname.split('/')[1],
   ssl: process.env.SSL
 };
} else {
 config = {
   database: 'mytime',
   port: 5432,
   max: 10,
   idleTimeoutMillis: 30000
 };
}

var pool = new pg.Pool(config);

function createInvoice(address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms, user_id, callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('INSERT INTO invoices (address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms, user_id)' +
			'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);', [address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms, user_id],
			function(err, result) {
				if (err) {
					done();
					return callback(err);
				}

				callback(null);
				done();
			});
	});
}

function updateInvoice(id, address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms, callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('UPDATE invoices SET (id, address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms) ' +
			'= ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) WHERE id = $1;', [id, address, balance_due, bill_to, description, due_date, email, from_name, hours, invoice_date, invoice_number, invoice_to, notes, phone, rate, terms],
			function(err, result) {
				if (err) {
					done();
					return callback(err);
				}

				callback(null);
				done();
			});
	});
}

function deleteInvoice(id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('DELETE FROM invoices WHERE id = $1;', [id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null);
			done();
		});
	});
}


function findAllUserInvoices(id, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      done();
      return callback(err);
    }

    client.query('SELECT * FROM invoices WHERE user_id=$1;', [id], function(err, result){
      if(err) {
        done();
        return callback(err);
      }
			console.log('Result in findAllUserInvoices query', result);
      callback(null, result.rows);
      done();
    });
  });
}



function findInvoiceById(id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('SELECT * FROM invoices WHERE id = $1;', [id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null, result.rows[0]);
			done();
		});
	});
}


module.exports = {
  createInvoice: createInvoice,
	deleteInvoice: deleteInvoice,
	findAllUserInvoices: findAllUserInvoices,
	findInvoiceById: findInvoiceById,
	updateInvoice: updateInvoice
};
