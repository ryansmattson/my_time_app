var pg = require('pg');

var config = {
	database: 'mytime',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);


function createClockIn(job_id, clock_in, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('INSERT INTO times (job_id, clock_in, clock_out) VALUES ($1, $2, null);', [job_id, clock_in], function(err, result){
      if(err){
        done();
        return callback(err);
      }

      callback(null, result.rows[0]);
      done();
    });
  });
}

function createClockOut(job_id, clock_out, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }
console.log('job_id:', job_id);
console.log('clock_out:', clock_out);

    client.query('UPDATE times SET clock_out = $2 WHERE job_id = $1 AND clock_out IS NULL;', [job_id, clock_out], function(err, result){
      if(err){
        done();
        return callback(err);
      }

      callback(null, result.rows[0]);
      done();
    });
  });
}


function findAllTimes(job_id, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

console.log('findAllTimes job_id:', job_id);
    client.query('SELECT * FROM times WHERE job_id = $1', [job_id], function(err, result){
      if(err){
        done()
        return callback(err)
      }

      callback(null, result.rows);
      done();
    });
  });
}


function findCurrentTime(job_id, time_id, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT * FROM times WHERE job_id = $1 AND time_id = $2', [job_id, time_id], function(err, result){
      if(err){
        done()
        return callback(err)
      }

      callback(null, result.rows[0]);
      done();
    });
  });
}


function deleteTime(id, callback){
	pool.connect(function(err, client, done){
		if(err){
			done();
			return callback(err);
		}

		client.query('DELETE FROM times WHERE id = $1;', [id], function(err, result){
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
  createClockIn : createClockIn,
  createClockOut : createClockOut,
	deleteTime: deleteTime,
  findAllTimes : findAllTimes,
  findCurrentTime : findCurrentTime
}
