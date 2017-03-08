angular
  .module('stats')
  .component('stats', {
    templateUrl: 'stats/stats.html',
    controller: ['Stat', 'Sprint',
      function StatsController(Stat, Sprint) {
        this.stats = Stat.query();
        this.stat = new Stat();
        this.stat.date = new Date();
        this.sprints = Sprint.query();

        this.addStat = () => {
          return this.stat.$save()
            .then(stat => {
              this.stat = new Stat();
              console.log(stat);
              return this.stats.push(stat);
            })
            .catch(console.log);
        };

        this.deleteStat = stat => {
          return stat.$delete()
            .then(stat => this.stats.splice(this.stats.indexOf(stat), 1))
            .catch(console.log);
        };
      }
    ]
  });
  