//This controller handles Login and Registration

angular.module('myTimeApp').controller('IndexController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory, JobFactory, UserFactory) {

	var vm = this;

	vm.currentTab = RouteFactory.currentTab;
	vm.currentUser = UserFactory.currentUser;
	vm.allUsernames = UserFactory.allUsernames.usernames;

	function updateCurrentUser() {
		vm.currentUser = UserFactory.currentUser;
	}

	vm.allJobsRoute = function() {
		RouteFactory.allJobsRoute();
	}
	vm.currentJobRoute = function() {
		RouteFactory.currentJobRoute();
	}
	vm.invoicesRoute = function() {
		RouteFactory.invoicesRoute();
	}
	vm.newJobRoute = function() {
		RouteFactory.newJobRoute();
	}
	vm.profileRoute = function() {
		RouteFactory.profileRoute();
	}
	vm.homeRoute = function() {
		console.log('clicked cancel');
		RouteFactory.homeRoute();
	}



	vm.logout = function() {
		$http.get('/logout').then(handleLogoutSucess, handleLogoutFailure);
	}

	function handleLogoutSucess(res) {
		UserFactory.currentUser = {};
		updateCurrentUser()
		RouteFactory.homeRoute();
	}
	function handleLogoutFailure(res) {
		console.log('Logout unsuccessful:', res);
	}


	//   **LOGIN**
	vm.loginSubmit = function(username, password) {
		var sendData = {};

		sendData.username = username;
		sendData.password = password;

		$http.post('/login', sendData).then(handleLoginSuccess, handleLoginFailure);
	};

	function handleLoginSuccess(res) {
		$mdDialog.hide();

		console.log('Success!', res);
		// $location.path('/current-job');
		UserFactory.getCurrentUser();
		JobFactory.getCurrentJob();
		RouteFactory.currentJobRoute();
		// vm.currentUser = UserFactory.currentUser;
		updateCurrentUser()
	}

	function handleLoginFailure(res) {
		console.log('Failure', res);
		vm.showFailedLogin();
	}


	//Login Modal
	vm.showLogin = function() {
		$mdDialog.show({
			templateUrl: '/views/login.html',
			clickOutsideToClose: true,
			controller: 'IndexController',
			controllerAs: 'index',
			onComplete: afterShowAnimation
		});

		function afterShowAnimation(scope, element, options) {
			// post-show code here: DOM element focus, etc.
		}
	}

	//Failed Login Modal
	vm.showFailedLogin = function() {
		$mdDialog.show({
			templateUrl: '/views/login-fail.html',
			clickOutsideToClose: true,
			controller: 'IndexController',
			controllerAs: 'index',
			onComplete: afterShowAnimation
		});

		function afterShowAnimation(scope, element, options) {
			// post-show code here: DOM element focus, etc.
		}
	}


	//   **REGISTER**
	vm.register = function() {
		RouteFactory.registerRoute();
	};


	//Logic to handle submitting on login.  Required fields, password matching, unused username.
	vm.registerSubmit = function(first, last, username, password, confirmPassword, email, phone, address, rate, ev) {
		var usernameIsTaken = false;

		for (var i = 0; i < vm.allUsernames.length; i++) {
			if (usernameIsTaken == true) {
				//do nothing
			} else {
				if (username == vm.allUsernames[i].username) {
					usernameIsTaken = true;
				}
			}
		}

		if (!username || !password || !confirmPassword) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Attention')
				.textContent('Please fill in all required fields.')
				.ariaLabel('Fill in all required fields')
				.ok('Close')
				.targetEvent(ev)
			);
		} else if (usernameIsTaken) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Attention')
				.textContent('Username is taken, please try another.')
				.ariaLabel('Username is taken')
				.ok('Close')
				.targetEvent(ev)
			);
		} else if (password !== confirmPassword) {
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Attention')
				.textContent('Passwords do not match.')
				.ariaLabel('Passwords do not match.')
				.ok('Close')
				.targetEvent(ev)
			);
		} else {
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
	}

	function handleRegisterSuccess(res) {
		console.log('Successful posting of user info', res);
		UserFactory.getCurrentUser();
		JobFactory.getCurrentJob();
		RouteFactory.homeRoute();
		updateCurrentUser()
	}

	function handleRegisterFailure(res) {
		console.log('Failure posting of user info', res);
	}


	updateCurrentUser()
}]);
