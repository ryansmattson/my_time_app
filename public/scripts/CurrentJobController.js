angular.module('myTimeApp').controller('CurrentJobController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', function($http, $location, $interval, $mdDialog, RouteFactory) {

	var vm = this;



	vm.seconds = '00';
	vm.minutes = '00';
	vm.hours = '00';

	vm.listOfClockedTimes = [];
	vm.currentJob = {};

	var intervalId;
	var isTimerRunning = false;
	var clockIn;
	var clockOut;

	function getCurrentJob() {
		$http.get('/jobs/currentJob').then(handleGetCurrentSuccess, handleGetCurrentFailure);
	}
	function handleGetCurrentSuccess(res) {
		console.log('Success!', res);
		vm.currentJob = res.data;
	}
	function handleGetCurrentFailure(res) {
		console.log('Failure!', res);
	}


		vm.startTimer = function() {
			if (isTimerRunning) {
				return
			} else {
				isTimerRunning = true;
				intervalId = $interval(incrementSeconds, 1000);
				clockIn = new Date();
				console.log('clockIn:', clockIn);
			}
		}

		vm.stopTimer = function() {
			$interval.cancel(intervalId);
			vm.seconds = '00';
			vm.minutes = '00';
			vm.hours = '00';
			isTimerRunning = false;
			clockOut = new Date();
			console.log('clockOut:', clockOut);
			formatClockedHours(clockIn, clockOut);
		}


		function incrementSeconds() {
			if (vm.seconds == 59) {
				vm.seconds = addZeroToSingleDigit(0);
				incrementMinutes();
			} else {
				if (vm.seconds >= 0 && vm.seconds < 9) {
					vm.seconds++;
					vm.seconds = addZeroToSingleDigit(vm.seconds);
				} else {
					vm.seconds++;
				}
			}
		}


		function incrementMinutes() {
			if (vm.minutes == 59) {
				vm.minutes = addZeroToSingleDigit(0);
				incrementHours();
			} else {
				if (vm.minutes >= 0 && vm.minutes < 9) {
					vm.minutes++;
					vm.minutes = addZeroToSingleDigit(vm.minutes);
				} else {
					vm.minutes++;
				}
			}
		}

		function incrementHours() {
			if (vm.hours >= 0 && vm.hours < 9) {
				vm.hours++;
				vm.hours = addZeroToSingleDigit(vm.hours);
			} else {
				vm.hours++;
			}
		}


		function addZeroToSingleDigit(number) {
			if (number == 0) {
				return '00'
			} else {
				return '0' + number;
			}
		}


	function clockedTime(date, startTime, endTime, totalTime) {
		this.date = date,
			this.startTime = startTime,
			this.endTime = endTime,
			this.totalTime = totalTime
	}

	function formatClockedHours(clockIn, clockOut) {
		var startAmpm = isAmPm(clockIn.getHours());
		var startHours = formatHours(clockOut.getHours());
		var endAmpm = isAmPm(clockOut.getHours());
		var endHours = formatHours(clockOut.getHours());

		var tempDate = clockIn.getDate() + '/' + clockIn.getMonth() + '/' + clockIn.getFullYear();

		var tempStartTime = startHours + ':' + clockIn.getMinutes() + ':' + clockIn.getSeconds() + ' ' + startAmpm;

		var tempEndTime = endHours + ':' + clockOut.getMinutes() + ':' + clockOut.getSeconds() + ' ' + endAmpm;

		var tempTotalTime = msToTime((clockOut - clockIn));

		vm.listOfClockedTimes.push(new clockedTime(tempDate, tempStartTime, tempEndTime, tempTotalTime));

	}

	function isAmPm(hours) {
		if (hours > 12) {
			return 'pm';
		} else {
			return 'am';
		}
	};

	function formatHours(hours) {
		if (hours > 12) {
			hours = hours - 12;
		}
		return hours;
	}


	function msToTime(duration) {
		var milliseconds = parseInt((duration % 1000) / 100);
		var seconds = parseInt((duration / 1000) % 60);
		var minutes = parseInt((duration / (1000 * 60)) % 60);
		var hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	}

	vm.allJobs = function() {
		$location.path('/all-jobs')
	};


getCurrentJob();


}]);