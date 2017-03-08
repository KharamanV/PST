angular
  .module('stats')
  .component('stats', {
    templateUrl: 'stats/stats.html',
    controller: ['Stat',
      class StatsController {
        constructor(Stat) {
          this.stats = Stat.query();
          this.stat = new Stat();
        }

        addStat() {
          return this.stat.$save()
            .then(stat => {
              return this.stats.push(stat);
            })
            .catch(console.log)
        }

        deleteStat(stat) {
          return stat.$delete()
            .then(stat => this.stats.splice(this.stats.indexOf(stat), 1))
            .catch(console.log);
        }
      }
    ]
  });
  