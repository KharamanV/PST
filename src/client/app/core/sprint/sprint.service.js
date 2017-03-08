angular
	.module('core.sprint')
	.factory('Sprint', ['$resource',
		function($resource) {
			return $resource('/api/sprints/:id', {id: '@_id'}, {
				update: {
					method: 'PUT'
				}
			});
	}]);