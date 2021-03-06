angular.module('myTimeApp').controller('HomeController', ['$http', '$location', '$interval', '$mdDialog', function($http, $location, $interval, $mdDialog) {

	var vm = this;

	vm.seconds = '00';
	vm.minutes = '00';
	vm.hours = '00';
	vm.listOfClockedTimes = [];
	vm.areClockedTimes = false;
	var intervalId;
	var isTimerRunning = false;
	var clockIn;
	var clockOut;


	vm.allJobs = function() {
		RouteFactory.allJobsRoute();
	};

	//constructor for a clocked time
	function clockedTime(index, date, startTime, endTime, totalTime) {
		this.index = index,
			this.date = date,
			this.startTime = startTime,
			this.endTime = endTime,
			this.totalTime = totalTime
	}

	//makes the clocked hours pretty print
	function formatClockedHours(clockIn, clockOut) {
		var startAmpm = isAmPm(clockIn.getHours());
		var startHours = formatHours(clockOut.getHours());
		var endAmpm = isAmPm(clockOut.getHours());
		var endHours = formatHours(clockOut.getHours());
		var tempIndex = vm.listOfClockedTimes.length;

		var tempDate = clockIn.getMonth() + '/' + clockIn.getDate() + '/' + clockIn.getFullYear();
		var tempStartTime = startHours + ':' + clockIn.getMinutes() + ':' + clockIn.getSeconds() + ' ' + startAmpm;
		var tempEndTime = endHours + ':' + clockOut.getMinutes() + ':' + clockOut.getSeconds() + ' ' + endAmpm;
		var tempTotalTime = msToTime((clockOut - clockIn));

		vm.listOfClockedTimes.push(new clockedTime(tempIndex, tempDate, tempStartTime, tempEndTime, tempTotalTime));
	}

	//figures out if the datestamp is am or pm
	function isAmPm(hours) {
		if (hours > 12) {
			return 'pm';
		} else {
			return 'am';
		}
	};

	//changes from 24 hour clock to 12
	function formatHours(hours) {
		if (hours > 12) {
			hours = hours - 12;
		}
		return hours;
	}

	//changes millis to pretty printed time
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


	vm.startTimer = function() {
		if (isTimerRunning) {
			return
		} else {
			isTimerRunning = true;
			intervalId = $interval(incrementSeconds, 1000);
			clockIn = new Date();
		}
	}

	vm.stopTimer = function() {
		if (!vm.areClockedTimes) {
			vm.areClockedTimes = true;
		}
		$interval.cancel(intervalId);
		vm.seconds = '00';
		vm.minutes = '00';
		vm.hours = '00';
		isTimerRunning = false;
		clockOut = new Date();
		formatClockedHours(clockIn, clockOut);
	}

	function incrementSeconds() {
		if (vm.seconds == 59) {
			vm.seconds = convertOneToNine(0);
			incrementMinutes();
		} else {
			if (vm.seconds >= 0 && vm.seconds < 9) {
				vm.seconds++;
				vm.seconds = convertOneToNine(vm.seconds);
			} else {
				vm.seconds++;
			}
		}
	}


	function incrementMinutes() {
		if (vm.minutes == 59) {
			vm.minutes = convertOneToNine(0);
			incrementHours();
		} else {
			if (vm.minutes >= 0 && vm.minutes < 9) {
				vm.minutes++;
				vm.minutes = convertOneToNine(vm.minutes);
			} else {
				vm.minutes++;
			}
		}
	}

	function incrementHours() {
		if (vm.hours >= 0 && vm.hours < 9) {
			vm.hours++;
			vm.hours = convertOneToNine(vm.hours);
		} else {
			vm.hours++;
		}
	}

	function convertOneToNine(number) {
		if (number == 0) {
			return '00'
		} else {
			return '0' + number;
		}
	}

}]);
