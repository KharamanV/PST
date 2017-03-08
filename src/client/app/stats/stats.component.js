angular
  .module('stats')
  .component('stats', {
    templateUrl: 'stats/stats.html',
    controller: ['Stat',
      function StatsController(Stat) {
        this.stats = Stat.query();
        this.stat = new Stat();
        this.stat.date = new Date();

        this.addStat = () => {
          return this.stat.$save()
            .then(stat => {
              this.stat = new Stat();
              
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
  