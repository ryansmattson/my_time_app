angular.module('myTimeApp').factory('UserFactory', function($location, $http, TimesFactory, DateTimeFactory) {

  var currentUser = {};

  function clearUser(){
    console.log('Trying to clear user');
    currentUser = {something: null};
    console.log('currentUser after clear:', currentUser);
  };

  //Retrieves the current job and all its details and adds them to the currentJob object.
    function getCurrentUser() {
      $http.get('/users/currentUser').then(handleSuccess, handleFailure);
    }

    function handleSuccess(res) {
      console.log('Success!', res);
      var data = res.data;

      currentUser.id = data.id;
      currentUser.first_name = data.first_name;
      currentUser.last_name = data.last_name;
      currentUser.full_name = concatFirstAndLastName(data.first_name, data.last_name);
      currentUser.username = data.username;
      currentUser.email = data.email;
      currentUser.phone = data.phone;
      currentUser.address = data.address;
      currentUser.hourly_rate = data.hourly_rate;

      console.log('handleGetCurrentUserSuccess data:', data);
    }
    function handleFailure(res) {
      console.log('Failure!', res);
    }


    function concatFirstAndLastName(first, last){
      return first + ' ' + last;
    }


	return {
		getCurrentUser : getCurrentUser,
    clearUser: clearUser,
    currentUser : currentUser
	}
})
