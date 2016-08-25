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

function createJob(name, rate, date_created, company, individual, notes, id, callback) {
	pool.connect(function(err, client, done) {
		if (err) {
			done();
			return callback(err);
		}

		client.query('INSERT INTO jobs (name, hourly_rate, date_created, bill_organization, bill_individual, notes, user_id)' +
			'VALUES ($1, $2, $3, $4, $5, $6, $7);', [name, rate, date_created, company, individual, notes, id],
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


function findAllUserJobs(id, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      done();
      return callback(err);
    }

    client.query('SELECT * FROM jobs WHERE user_id=$1;', [id], function(err, result){
      if(err) {
        done();
        return callback(err);
      }
			console.log('Result in findAllUserJobs query', result);
      callback(null, result.rows);
      done();
    });
  });
}


function setCurrentJobFalse(id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('UPDATE jobs SET current_job = false WHERE user_id = $1 AND current_job = true;', [id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null, result.rows[0]);
			done();
		});
	});
}

function setCurrentJobTrue(user_id, job_id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('UPDATE jobs SET current_job = true WHERE user_id = $1 AND id = $2', [user_id, job_id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null, result.rows);
			done();
		});
	});
}


function findCurrentJob(user_id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('SELECT * FROM jobs WHERE user_id = $1 AND current_job = true;', [user_id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null, result.rows);
			done();
		});
	});
}


function deleteJob(id, callback){
	console.log("Job 111");

	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('DELETE FROM jobs WHERE id = $1;', [id], function(err, result){
			if(err){
				done();
				return callback(err);
			}
			callback(null);
			done();
		});
	});
}

module.exports = {
  createJob: createJob,
	deleteJob: deleteJob,
	findAllUserJobs: findAllUserJobs,
	findCurrentJob: findCurrentJob,
	setCurrentJobTrue: setCurrentJobTrue,
	setCurrentJobFalse: setCurrentJobFalse
};
