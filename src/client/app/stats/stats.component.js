angular
  .module('stats')
  .component('stats', {
    templateUrl: '/src/client/app/stats/stats.html',
    controller: function StatsController() {
      this.stats = [
        {
          arm: 40,
          waist: 103.5,
          weight: 88.5
        },
        {
          arm: 42,
          waist: 93.5,
          weight: 82.5
        }
      ];
    }
  });