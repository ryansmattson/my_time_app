angular.module('myTimeApp').controller('MainController', ['$http', '$location', '$interval', '$mdDialog', function($http, $location, $interval, $mdDialog) {

	var vm = this;

	vm.seconds = '57';
	vm.minutes = '59';
	vm.hours = '09';
	var intervalId;
	var isTimerRunning = false;



	vm.allJobs = function() {
		$location.path('/all-jobs')
	};

	vm.register = function() {
		$location.path('/register');
	};


	vm.registerSubmit = function(first, last, username, password, email, phone, address, rate) {
		var sendData = {};

		sendData.first_name = first;
		sendData.last_name = last;
		sendData.username = username;
		sendData.password = password;
		sendData.email = email;
		sendData.phone = phone;
		sendData.address = address;
		sendData.hourly_rate = rate;

		$http.post('/register', sendData).then(handleRegisterSuccess, handleRegisterFailure);
	}

	function handleRegisterSuccess(res) {
		console.log('Successful posting of user info', res);
	}

	function handleRegisterFailure(res) {
		console.log('Failure posting of user info', res);
	}




	vm.loginSubmit = function(username, password) {
		var sendData = {};

		sendData.username = username;
		sendData.password = password;

		$http.post('/login', sendData).then(handleLoginSuccess, handleLoginFailure)
	};

	function handleLoginSuccess(res) {
    $mdDialog.hide();
		console.log('Success!', res);
		$location.path('/current-job');
	}

	function handleLoginFailure(res) {
		console.log('Failure', res);
    vm.showFailedLogin();
	}


	vm.showLogin = function() {
		$mdDialog.show({
			templateUrl: '/views/login.html',
			clickOutsideToClose: true,
			controller: 'MainController',
			controllerAs: 'main',
			onComplete: afterShowAnimation
		});

		function afterShowAnimation(scope, element, options) {
			// post-show code here: DOM element focus, etc.
		}
	}

  vm.showFailedLogin = function() {
		$mdDialog.show({
			templateUrl: '/views/fail-login.html',
			clickOutsideToClose: true,
			controller: 'MainController',
			controllerAs: 'main',
			onComplete: afterShowAnimation
		});

		function afterShowAnimation(scope, element, options) {
			// post-show code here: DOM element focus, etc.
		}
	}





	vm.startTimer = function() {
		if (isTimerRunning) {
			return
		} else {
			isTimerRunning = true;
			intervalId = $interval(incrementSeconds, 1000);
			console.log(intervalId);
		}
	}

	// vm.pauseTimer = function() {
	//     $interval.cancel(intervalId);
	//     isTimerRunning = false;
	// }

	vm.stopTimer = function() {
		$interval.cancel(intervalId);
		vm.seconds = '00';
		vm.minutes = '00';
		vm.hours = '00';
		isTimerRunning = false;
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
