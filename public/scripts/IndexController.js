//This controller handles Login and Registration

angular.module('myTimeApp').controller('IndexController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory, JobFactory, UserFactory) {

	var vm = this;

	vm.allJobsRoute = function() {
		RouteFactory.allJobsRoute();
	}
	vm.currentJobRoute = function() {
		RouteFactory.currentJobRoute();
	}
	vm.invoicesRoute = function() {
		RouteFactory.invoicesRoute();
	}
	vm.newInvoiceRoute = function() {
		RouteFactory.newInvoiceRoute();
	}
	vm.newJobRoute = function() {
		RouteFactory.newJobRoute();
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
	}

	function handleLoginFailure(res) {
		console.log('Failure', res);
		vm.showFailedLogin();
	}


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
		// $location.path('/register');
		RouteFactory.registerRoute();
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


}]);
