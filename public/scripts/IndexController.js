//This controller handles Login and Registration

angular.module('myTimeApp').controller('IndexController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory, JobFactory, UserFactory) {

	var vm = this;

	vm.currentTab = RouteFactory.currentTab;

	vm.currentUser = UserFactory.currentUser;

	function updateCurrentUser(){
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
	vm.profileRoute = function(){
		RouteFactory.profileRoute();
	}
	vm.homeRoute = function() {
		console.log('clicked cancel');
		RouteFactory.homeRoute();
	}


//look at current user from user factory and make sure it's not null.


vm.logout = function(){
	$http.get('/logout').then(handleLogoutSucess, handleLogoutFailure);
}
function handleLogoutSucess(res){
	console.log('Logout successful:', res);
	console.log('UserFactory.currentUser before reset: ', UserFactory.currentUser);
	UserFactory.currentUser = {};
	// vm.currentUser = UserFactory.currentUser;
	updateCurrentUser()

	RouteFactory.homeRoute();
	console.log('UserFactory.currentUser after reset: ', UserFactory.currentUser);
	console.log('vm.currentUser after reset: ', vm.currentUser);
}
function handleLogoutFailure(res){
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

	updateCurrentUser()

}]);
