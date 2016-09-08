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
		currentJobTimes.timesArray = [];

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
			}
				totalJobTime.millis = tempTotalJobTime;
				totalJobTime.hours = DateTimeFactory.msToHours(tempTotalJobTime);
				totalJobTime.pretty = DateTimeFactory.msToTime(tempTotalJobTime);
		} else {
			totalJobTime.millis = 0;
			totalJobTime.hours = 0;
			totalJobTime.pretty = '00:00:00';
		}
	}


	function deleteTime(id){
		$http.delete('/times/deleteTime/' + id).then(handleDeleteSuccess, handleDeleteFailure);
	}
	function handleDeleteSuccess(res){
		console.log('Successfully deleted time.', res);
	}
	function handleDeleteFailure(res){
		console.log('Could not deleted time.', res);
	}



	return {
		currentJobTimes: currentJobTimes,
		deleteTime: deleteTime,
		getAllTimes: getAllTimes,
		totalJobTime: totalJobTime,
		totalJobBalance : totalJobBalance
	}
})
