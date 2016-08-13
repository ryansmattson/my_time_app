angular.module('myTimeApp').factory('RouteFactory', function($location) {

var currentTab = {
  currentJob : '',
	allJobs : '',
	invoices : ''
};

function changeCurrentTab(tab){
  currentTab.currentJob = '';
  currentTab.allJobs = '';
  currentTab.invoices = '';

  currentTab[tab] = 'current-tab';
}

	function allJobsRoute() {
		$location.path('/all-jobs');
	}

	function currentJobRoute() {
		$location.path('/current-job');
	}

	function editInvoiceRoute() {
		$location.path('/edit-invoice');
	}

	function editJobRoute() {
		$location.path('/edit-job');
	}

	function homeRoute() {
		$location.path('/');
	}

	function invoicesRoute() {
		$location.path('/invoices');
	}

	function newInvoiceRoute() {
		$location.path('/new-invoice');
	}

	function newJobRoute() {
		$location.path('/new-job');
	}

	function printInvoiceRoute() {
		$location.path('/print-invoice');
	}

	function profileRoute() {
		$location.path('/profile');
	}

	function registerRoute() {
		$location.path('/register');
	}

	return {
		allJobsRoute: allJobsRoute,
    changeCurrentTab: changeCurrentTab,
		currentJobRoute: currentJobRoute,
    currentTab: currentTab,
		editJobRoute: editJobRoute,
		editInvoiceRoute: editInvoiceRoute,
		homeRoute: homeRoute,
		invoicesRoute: invoicesRoute,
		newInvoiceRoute: newInvoiceRoute,
		newJobRoute: newJobRoute,
		printInvoiceRoute: printInvoiceRoute,
		profileRoute: profileRoute,
		registerRoute: registerRoute
	}
})
