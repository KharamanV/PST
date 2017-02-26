angular
  .module('stats')
  .component('stats', {
    templateUrl: 'stats/stats.html',
    controller: ['Stat', 
      function StatsController(Stat) {
        this.stats = Stat.query();

        this.showLast = () => {

        }
      }
    ]
  });
  