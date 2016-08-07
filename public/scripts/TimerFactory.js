// angular.module('myTimeApp').factory('TimerFactory', function($location) {
//
//
// 	//Increments hours and keeps 2 digit formatting.
// 	function incrementHours() {
// 		if (vm.hours >= 0 && vm.hours < 9) {
// 			vm.hours++;
// 			vm.hours = DateTimeFactory.addZeroToSingleDigit(vm.hours);
// 		} else {
// 			vm.hours++;
// 		}
// 	}
//
// 	//Increments minutes and keeps 2 digit formatting.
// 	function incrementMinutes() {
// 		if (vm.minutes == 59) {
// 			vm.minutes = DateTimeFactory.addZeroToSingleDigit(0);
// 			incrementHours();
// 		} else {
// 			if (vm.minutes >= 0 && vm.minutes < 9) {
// 				vm.minutes++;
// 				vm.minutes = DateTimeFactory.addZeroToSingleDigit(vm.minutes);
// 			} else {
// 				vm.minutes++;
// 			}
// 		}
// 	}
//
//
// 	//Increments seconds and keeps 2 digit formatting.
// 	function incrementSeconds() {
// 		if (vm.seconds == 59) {
// 			vm.seconds = DateTimeFactory.addZeroToSingleDigit(0);
// 			incrementMinutes();
// 		} else {
// 			if (vm.seconds >= 0 && vm.seconds < 9) {
// 				vm.seconds++;
// 				vm.seconds = DateTimeFactory.addZeroToSingleDigit(vm.seconds);
// 			} else {
// 				vm.seconds++;
// 			}
// 		}
// 	}
//
// 	//Starts timer running when Clock In button is clicked.
// 	function startTimer(job_id) {
// 		if (isTimerRunning) {
// 			return
// 		} else {
// 			var clockInTime = new Date();
// 			isTimerRunning = true;
// 			intervalId = $interval(incrementSeconds, 1000);
// 			// clockIn = new Date();
// 			setClockIn(job_id, clockInTime);
// 		}
// 	}
//
// 	//Stops timer, resets to 00:00:00 on Clock Out button click.
// 	function stopTimer(job_id) {
// 		var clockOutTime = new Date();
// 		$interval.cancel(intervalId);
// 		vm.seconds = '00';
// 		vm.minutes = '00';
// 		vm.hours = '00';
// 		isTimerRunning = false;
// 		// clockOut = new Date();
// 		setClockOut(job_id, clockOutTime);
// 		console.log('clockOutTime:', clockOutTime);
// 		// formatClockedHours(clockIn, clockOut);
// 	}
//
//
//
//
//
//
// 	return {
// 		incrementHours: incrementHours,
// 		incrementMinutes: incrementMinutes,
// 		incrementSeconds: incrementSeconds,
// 		startTimer: startTimer,
// 		stopTimer: stopTimer
// 	}
// })
