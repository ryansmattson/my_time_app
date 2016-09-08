angular.module('myTimeApp').controller('ProfileController', ['$http', '$location', '$interval', '$mdDialog', 'RouteFactory', 'DateTimeFactory', 'JobFactory', 'UserFactory', function($http, $location, $interval, $mdDialog, RouteFactory, DateTimeFactory, JobFactory, UserFactory) {

	var vm = this;

	vm.currentUser = UserFactory.currentUser;

	vm.currentJobRoute = function(){
		RouteFactory.currentJobRoute();
	}

	vm.updateUser = function(id, first_name, last_name, phone, email, address, hourly_rate){
		var sendData = {};

		sendData.id = id;
		sendData.first_name = first_name;
		sendData.last_name = last_name;
		sendData.phone = phone;
		sendData.email = email;
		sendData.address = address;
		sendData.hourly_rate = hourly_rate;

		$http.put('/users/updateUser', sendData).then(handleUpdateUserSuccess, handleUpdateUserFailure)
	}
	function handleUpdateUserSuccess(res){
		console.log('Successfully updated user:', res);
	}
	function handleUpdateUserFailure(res){
		console.log('Failed to update user:', res);
	}

}]);
