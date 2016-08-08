angular.module('myTimeApp').factory('TimesFactory', function($location, $http, DateTimeFactory) {


	var currentJobTimes = {};
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
		//Put call below in Service (any) and call from here

		//Variables should be set above in the following format:

		//vm.currentJob = JobService.currentJob

		$http.get('/times/allTimes/' + id).then(handleGetAllTimesSuccess, handleGetAllTimesFailure);
	}

	function handleGetAllTimesSuccess(res) {
		var timesData = res.data;
		buildCurrentTimesObject(timesData);
	}

	function handleGetAllTimesFailure(res) {
		console.log('Failed to get all times', res);
	}


	function buildCurrentTimesObject(timesData) {
		var tempTotalJobTime = 0;
		// currentJobTimes = {};
		console.log('timesData:', timesData);

		for (var i = timesData.length - 1; i >= 0; i--) {

			var forTime = 'time_' + i;

			// console.log('currentJobTimes:', currentJobTimes);
			// console.log('currentJobTimes.forTime:', currentJobTimes.forTime);

			// currentJobTimes.forTime.id = timesData[i].id;
			// // currentJobTimes['time_' + i];

			// currentJobTimes.forTime.jobId = timesData[i].job_id;
			// currentJobTimes.forTime.date = timesData[i].clock_in;
			// currentJobTimes.forTime.startTime = timesData[i].clock_in;
			// currentJobTimes.forTime.endTime = timesData[i].clock_out;
			// currentJobTimes.forTime.elapsedTimeMillis = DateTimeFactory.calcElapsedTime(timesData[i].clock_in, timesData[i].clock_out);
			// currentJobTimes.forTime.datePretty = timesData[i].DateTimeFactory.formatForDate(timesData[i].clock_in);
			// currentJobTimes.forTime.startPretty = DateTimeFactory.formatForTime(timesData[i].clock_in);
			// currentJobTimes.forTime.endPretty = DateTimeFactory.formatForTime(timesData[i].clock_out);
			// currentJobTimes.forTime.elapsedTimePretty = DateTimeFactory.msToTime(elapsedTimeMillis);


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
			currentJobTimes['time_' + i] = (new clockedTime(id, jobId, date, startTime, endTime, elapsedTimeMillis, datePretty, startPretty, endPretty, elapsedTimePretty));
			console.log('currentJobTimes: ', currentJobTimes);
		}

		totalJobTime.millis = tempTotalJobTime;
		totalJobTime.pretty = DateTimeFactory.msToTime(tempTotalJobTime);
	}




	return {
		currentJobTimes: currentJobTimes,
		totalJobTime: totalJobTime,
		getAllTimes: getAllTimes
	}
})
