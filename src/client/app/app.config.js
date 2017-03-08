angular
	.module('pstApp')
	.config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');

			$routeProvider
				.when('/stats', {template: '<stats></stats>'})
				.when('/sprints', {template: '<sprints></sprints>'})
				.otherwise('/stats');
		}
	]);
