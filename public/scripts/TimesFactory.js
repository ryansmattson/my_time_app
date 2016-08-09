angular.module('myTimeApp').factory('TimesFactory', function($location, $http, DateTimeFactory) {


	var currentJobTimes = {
		timesArray: []
	};

	var totalJobBalance = {};
	var totalJobTime = {};

	var id;
	var jobId;
	var date;
	var startTime;
	var endTime;
	var elapsedTimeMillis;
	var datePretty;
	var startPretty;
	var endPretty;
	var elapsedTimePretty;


	//Constructor for a clocked time.
	function clockedTime(id, jobId, date, startTime, endTime, elapsedTimeMillis, datePretty, startPretty, endPretty, elapsedTimePretty) {
		this.id = id,
			this.jobId = jobId,
			this.date = date,
			this.startTime = startTime,
			this.endTime = endTime,
			this.elapsedTimeMillis = elapsedTimeMillis,
			this.datePretty = datePretty,
			this.startPretty = startPretty,
			this.endPretty = endPretty,
			this.elapsedTimePretty = elapsedTimePretty
	}


	//Retrieves all clocked times for the current job and pushes them into the allTimes array.  Also adds/formats totalJobTime.
	function getAllTimes(job_id) {
		var id = job_id;
		console.log('getAllTimes id:', id);

		$http.get('/times/allTimes/' + id).then(handleGetAllTimesSuccess, handleGetAllTimesFailure);
	}

	function handleGetAllTimesSuccess(res) {
		var timesData = res.data;
		// var rate = userOrJobRate();

		buildCurrentTimesObject(timesData);

		// totalJobBalance.total = calcTotalJobBalance(totalJobTime.hours, rate);
		// console.log('totalJobBalance.total:', totalJobBalance.total);
	}

	function handleGetAllTimesFailure(res) {
		console.log('Failed to get all times', res);
	}


	function buildCurrentTimesObject(timesData) {
		var tempTotalJobTime = 0;
		currentJobTimes.timesArray = [];
		console.log('timesData:', timesData);

		if (timesData.length > 0) {
			for (var i = 0; i < timesData.length; i++) {

				id = timesData[i].id;
				jobId = timesData[i].job_id;
				date = timesData[i].clock_in;
				startTime = timesData[i].clock_in;
				endTime = timesData[i].clock_out;
				elapsedTimeMillis = DateTimeFactory.calcElapsedTime(timesData[i].clock_in, timesData[i].clock_out);
				datePretty = DateTimeFactory.formatForDate(timesData[i].clock_in);
				startPretty = DateTimeFactory.formatForTime(timesData[i].clock_in);
				endPretty = DateTimeFactory.formatForTime(timesData[i].clock_out);
				elapsedTimePretty = DateTimeFactory.msToTime(elapsedTimeMillis);


				tempTotalJobTime += elapsedTimeMillis;

				currentJobTimes.timesArray.unshift(new clockedTime(id, jobId, date, startTime, endTime, elapsedTimeMillis, datePretty, startPretty, endPretty, elapsedTimePretty));

				console.log('currentJobTimes.timesArray: ', currentJobTimes.timesArray);
			}

			totalJobTime.millis = tempTotalJobTime;
      totalJobTime.hours = DateTimeFactory.msToHours(tempTotalJobTime);
			totalJobTime.pretty = DateTimeFactory.msToTime(tempTotalJobTime);
		}
	}

	// function userOrJobRate() {
	// 	if (JobFactory.currentJob.hourly_rate !== null) {
	// 		return JobFactory.currentJob.hourly_rate;
	// 	} else {
	// 		return UserFactory.currentUser.hourly_rate;
	// 	}
	// }
	//
	// function calcTotalJobBalance(time, rate) {
	// 	var total = (time * rate).toFixed(2);
	//
	// 	return parseFloat(total);
	// }




	return {
		currentJobTimes: currentJobTimes,
		getAllTimes: getAllTimes,
		totalJobTime: totalJobTime,
		totalJobBalance : totalJobBalance
	}
})
