angular
	.module('core.stat')
	.factory('Stat', ['$resource',
		function($resource) {
			return $resource('/api/stats/:id');
	}])