// var pg = require('pg');
// var bcrypt = require('bcrypt');
//
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

var SALT_WORK_FACTOR = 10;


var pool = new pg.Pool(config);

function findByUsername(username, callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('SELECT * FROM users WHERE username=$1;', [username],
			function(err, result) {
				if (err) {
					done();
					return callback(err);
				}

				callback(null, result.rows[0]);
				done();
			});
	});
}

function findAllUsernames(callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('SELECT username FROM users;',
			function(err, result) {
				if (err) {
					done();
					return callback(err);
				}
				callback(null, result.rows);
				done();
			});
	});
}


function findAndComparePassword(username, candidatePassword, callback) {
	//candidatePassword is what we received on the request
	findByUsername(username, function(err, user) {
		if (err) {
			return callback(err);
		}
		if (!user) {
			return callback(null, false);
		}

		bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
			if (err) {
				console.log(err);
				callback(err);
			} else {
				console.log('isMatch', isMatch);
				callback(null, isMatch, user);
			};
		});
	});
}


function findById(id, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      done();
      return callback(err);
    }

    client.query('SELECT * FROM users WHERE id=$1;', [id], function(err, result){
      if(err) {
        done();
        return callback(err);
      }

      callback(null, result.rows[0]);
      done();
    });
  });
}



function createUser(first, last, username, password, email, phone, address, hourlyRate, callback) {

	bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
		pool.connect(function(err, client, done) {
			if (err) {
				done();
				return callback(err);
			}

			client.query('INSERT INTO users (first_name, last_name, username, password, email, phone, address, hourly_rate)' +
				'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username;', [first, last, username, hash, email, phone, address, hourlyRate],
				function(err, result) {
					if (err) {
						done();
						return callback(err);
					}

					callback(null, result.rows[0]);
					done();
				});
		});
	});
}

function updateUser(id, first_name, last_name, phone, email, address, hourly_rate, callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('UPDATE users SET (id, first_name, last_name, phone, email, address, hourly_rate) ' +
			'= ($1, $2, $3, $4, $5, $6, $7) WHERE id = $1;', [id, first_name, last_name, phone, email, address, hourly_rate],
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





module.exports = {
	createUser: createUser,
	findAllUsernames: findAllUsernames,
  findAndComparePassword: findAndComparePassword,
  findById: findById,
  findByUsername:findByUsername,
	updateUser: updateUser
};
