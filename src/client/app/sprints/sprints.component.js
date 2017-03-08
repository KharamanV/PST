angular
  .module('sprints')
  .component('sprints', {
    templateUrl: 'sprints/sprints.html',
    controller: ['Sprint',
      function SprintsController(Sprint) {
        this.sprints = Sprint.query();
        this.sprint = new Sprint();
        this.sprint.start_date = new Date();
        this.sprint.end_date = new Date();

        this.addSprint = () => {
          return this.sprint.$save()
            .then(sprint => {
              this.sprint = new Sprint();
              
              return this.sprints.push(sprint);
            })
            .catch(console.log);
        };

        this.deleteSprint = sprint => {
          return sprint.$delete()
            .then(sprint => this.sprints.splice(this.sprints.indexOf(sprint), 1))
            .catch(console.log);
        };
      }
    ]
  });
  