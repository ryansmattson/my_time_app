var pg = require('pg');

var config = {
	database: 'mytime',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000
};

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


module.exports = {
  createJob : createJob,
	findAllUserJobs : findAllUserJobs,
	findCurrentJob : findCurrentJob,
	setCurrentJobTrue : setCurrentJobTrue,
	setCurrentJobFalse : setCurrentJobFalse
};
