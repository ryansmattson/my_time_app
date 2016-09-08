angular.module('myTimeApp').factory('DateTimeFactory', function($location) {


	//Formats single digits to have a 0 in front.
	function addZeroToSingleDigit(number) {
		if (number >= 0 && number <= 9) {
			if (number == 0) {
				return '00'
			} else {
				return '0' + number;
			}
		} else {
			return number;
		}
	}

	//Calculates how much time has elapsed between 2 date/times.
	function calcElapsedTime(clockIn, clockOut) {
		clockIn = new Date(clockIn);
		clockOut = new Date(clockOut);

		return (clockOut - clockIn);
	}

	//Changes 24 hour clock format to 12 hour clock format.
	function format24HourClock(hours) {
		if (hours > 12) {
			return hours - 12;
		} else if (hours == 0) {
			return hours = 12;
		} else {
			return hours;
		}
	}

	// mm/dd/yyyy
	function formatForDate(dateStamp) {
		dateStamp = new Date(dateStamp);
		var year = dateStamp.getFullYear();
		var month = dateStamp.getMonth() + 1; //getMonth is zero indexed
		var day = dateStamp.getDate();
		var tempDate = month + '/' + day + '/' + year;

		return tempDate;
	}


	// hh:mm:ss pm/am
	function formatForTime(dateStamp) {
		dateStamp = new Date(dateStamp);

		var hours = addZeroToSingleDigit(format24HourClock(dateStamp.getHours())); //get hours, change to 12 hour clock, add 0 if single digit
		var minutes = addZeroToSingleDigit(dateStamp.getMinutes());
		var seconds = addZeroToSingleDigit(dateStamp.getSeconds());
		var amPm = isAmPm(dateStamp.getHours());

		var tempTime = hours + ':' + minutes + ':' + seconds + ' ' + amPm;

		return tempTime;
	}


	//Returns if a time is am or pm.
	function isAmPm(hours) {
		if (hours >= 12) {
			return 'pm';
		} else {
			return 'am';
		}
	};


	//Calculates milliseconds to a formatted time and returns.
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

	function msToHours(duration){
		var seconds = duration / 1000;
		var minutes = seconds / 60;
		var hours = (minutes / 60).toFixed(2);
		return parseFloat(hours);
	}


	return {
		addZeroToSingleDigit: addZeroToSingleDigit,
		calcElapsedTime: calcElapsedTime,
		format24HourClock: format24HourClock,
		formatForDate: formatForDate,
		formatForTime: formatForTime,
		isAmPm: isAmPm,
		msToHours: msToHours,
		msToTime: msToTime
	}
})
