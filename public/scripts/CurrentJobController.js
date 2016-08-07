angular.module('myTimeApp').controller('CurrentJobController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory) {

	var vm = this;

	vm.seconds = '00';
	vm.minutes = '00';
	vm.hours = '00';

	vm.allTimes = [];
	vm.currentJob = {};
	vm.totalJobTime = 0;

	var intervalId;
	var isTimerRunning = false;
	var clockIn;
	var clockOut;



//Constructor for a clocked time.
	function clockedTime(date, startTime, endTime, elapsedTime) {
		this.date = date,
			this.startTime = startTime,
			this.endTime = endTime,
			this.elapsedTime = elapsedTime
	}

//Retrieves all clocked times for the current job and pushes them into the allTimes array.  Also adds/formats totalJobTime.
	function getAllTimes(job_id) {
		var id = job_id;

		$http.get('/times/allTimes/' + id).then(handleGetAllTimesSuccess, handleGetAllTimesFailure);
	}

	function handleGetAllTimesSuccess(res) {
		var timesData = res.data;
		var tempTotalJobTime = 0;

		for (var i = timesData.length - 1; i >= 0; i--) {
			var date = DateTimeFactory.formatForDate(timesData[i].clock_in);
			var startTime = DateTimeFactory.formatForTime(timesData[i].clock_in);
			var endTime = DateTimeFactory.formatForTime(timesData[i].clock_out);
			var elapsedTimeMillis = DateTimeFactory.calcElapsedTime(timesData[i].clock_in, timesData[i].clock_out);
			var elapsedTimeFormatted = DateTimeFactory.msToTime(elapsedTimeMillis);

			tempTotalJobTime += elapsedTimeMillis;
			vm.allTimes.push(new clockedTime(date, startTime, endTime, elapsedTimeFormatted));
		}

		vm.totalJobTime = DateTimeFactory.msToTime(tempTotalJobTime);
	}
	function handleGetAllTimesFailure(res) {
		console.log('Failed to get all times', res);
	}


//Sends the clock in time to the database and creates a new entry.
	function setClockIn(job_id, clockInTime) {
		var sendData = {};
		sendData.job_id = job_id;
		sendData.clockInTime = clockInTime;

		$http.post('/times/clockIn', sendData).then(handleClockInSuccess, handleClockInFailure);
	}

	function handleClockInSuccess(res) {
		console.log('Clock in success', res);
	}
	function handleClockInFailure(res) {
		console.log('Clock in Failure', res);
	}


//Sends clock out time to the database.
	function setClockOut(job_id, clockOutTime) {
		var sendData = {};
		sendData.job_id = job_id;
		sendData.clockOutTime = clockOutTime;

		$http.put('/times/clockOut', sendData).then(handleClockOutSuccess, handleClockOutFailure);
	}

	function handleClockOutSuccess(res) {
		console.log('Clock out success', res);
	}
	function handleClockOutFailure(res) {
		console.log('Clock out Failure', res);
	}


//Retrieves the current job and all its details and adds them to the currentJob object.
	function getCurrentJob() {
		$http.get('/jobs/currentJob').then(handleGetCurrentSuccess, handleGetCurrentFailure);
	}

	function handleGetCurrentSuccess(res) {
		console.log('Success!', res);
		vm.currentJob = res.data;
		getAllTimes(vm.currentJob[0].id);
	}
	function handleGetCurrentFailure(res) {
		console.log('Failure!', res);
	}


//Starts timer on "Clock In" button click and updates the database with setClockIn()
	vm.startTimer = function(job_id) {
		if (isTimerRunning) {
			return
		} else {
			var clockInTime = new Date();
			isTimerRunning = true;
			intervalId = $interval(incrementSeconds, 1000);
			// clockIn = new Date();
			setClockIn(job_id, clockInTime);
		}
	}

//Stops time on "Clock Out" button click and updates database with setClockOut().  Resets timer to 00:00:00
	vm.stopTimer = function(job_id) {
		var clockOutTime = new Date();
		$interval.cancel(intervalId);
		vm.seconds = '00';
		vm.minutes = '00';
		vm.hours = '00';
		isTimerRunning = false;
		// clockOut = new Date();
		setClockOut(job_id, clockOutTime);
		console.log('clockOutTime:', clockOutTime);
		// formatClockedHours(clockIn, clockOut);
	}


	function incrementSeconds() {
		if (vm.seconds == 59) {
			vm.seconds = DateTimeFactory.addZeroToSingleDigit(0);
			incrementMinutes();
		} else {
			if (vm.seconds >= 0 && vm.seconds < 9) {
				vm.seconds++;
				vm.seconds = DateTimeFactory.addZeroToSingleDigit(vm.seconds);
			} else {
				vm.seconds++;
			}
		}
	}


	function incrementMinutes() {
		if (vm.minutes == 59) {
			vm.minutes = DateTimeFactory.addZeroToSingleDigit(0);
			incrementHours();
		} else {
			if (vm.minutes >= 0 && vm.minutes < 9) {
				vm.minutes++;
				vm.minutes = DateTimeFactory.addZeroToSingleDigit(vm.minutes);
			} else {
				vm.minutes++;
			}
		}
	}


	function incrementHours() {
		if (vm.hours >= 0 && vm.hours < 9) {
			vm.hours++;
			vm.hours = DateTimeFactory.addZeroToSingleDigit(vm.hours);
		} else {
			vm.hours++;
		}
	}


	getCurrentJob();
}]);
