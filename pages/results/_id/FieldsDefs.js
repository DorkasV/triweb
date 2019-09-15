export default [
  {
    title: 'POS',
    name: 'total_place',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Athlete',
    name: '__slot:athlete',
    callback: 'athleteFullName',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Team',
    name: 'team.name',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Distance',
    name: 'distance.name',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Group',
    name: 'group.name',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Swimming Time',
    name: 'swimming_time',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'T1',
    name: 't1',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Biking Time',
    name: 'biking_time',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'T2',
    name: 't2',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Running Time',
    name: 'running_time',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Total Time',
    name: 'total_time',
    callback: 'timeFormat',
    dataClass: 'text-center',
    titleClass: 'text-center'
  }
]