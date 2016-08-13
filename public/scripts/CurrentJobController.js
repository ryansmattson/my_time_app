angular.module('myTimeApp').controller('CurrentJobController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', 'TimesFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory, TimesFactory, JobFactory, UserFactory) {

	var vm = this;


	//Needs to be object, only changing keys triggers update
	vm.currentUser = UserFactory.currentUser;
	vm.currentJobTimes = TimesFactory.currentJobTimes;
	vm.currentJob = JobFactory.currentJob;
	vm.totalJobTime = TimesFactory.totalJobTime;

	vm.seconds = '00';
	vm.minutes = '00';
	vm.hours = '00';

	vm.allTimes = [];

	var intervalId;
	var isTimerRunning = false;
	var clockIn;
	var clockOut;

	vm.newInvoiceRoute = function() {
		RouteFactory.newInvoiceRoute();
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


	JobFactory.getCurrentJob();
	RouteFactory.changeCurrentTab('currentJob');
}]);
