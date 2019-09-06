export default [
  {
    title: 'Date',
    name: 'event_date',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Event',
    name: 'name',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'City',
    name: 'city',
    callback: 'eventPlace',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Athletes',
    name: 'athlete',
    callback: 'athletesInEvent',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
]