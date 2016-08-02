angular.module('myTimeApp').controller('MainController', ['$http', '$location', '$interval', '$mdDialog', function($http, $location, $interval, $mdDialog) {

    var vm = this;

    vm.seconds = '57';
    vm.minutes = '01';
    vm.hours = '05';
    var intervalId;
    var isTimerRunning = false;



    vm.allJobs = function() {
        $location.path('/all-jobs')
    };

    vm.register = function() {
        $location.path('/register')
    };




vm.loginSubmit = function(username, password){
  console.log(username, password);
};



    vm.showLogin = function($event){
      $mdDialog.show({
        targetEvent: $event,
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






    vm.startTimer = function() {
      if (isTimerRunning){
        return
      } else {
        isTimerRunning = true;
        intervalId = $interval(incrementSeconds, 1000);
        console.log(intervalId);
      }
    }

    vm.pauseTimer = function() {
        $interval.cancel(intervalId);
        isTimerRunning = false;
    }

    vm.stopTimer = function() {
        $interval.cancel(intervalId);
        vm.seconds = '00';
        vm.minutes = '00';
        vm.hours = '00';
        isTimerRunning = false;
    }

    function incrementSeconds() {
        if (vm.seconds == 59){
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
  if (vm.minutes == 59){
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


function convertOneToNine(number){
  if(number == 0){
    return '00'
  } else {
    return '0' + number;
  }
}


}]);
