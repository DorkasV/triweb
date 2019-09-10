export default [
  {
    title: 'Athlete',
    name: '__slot:athlete',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Birth date',
    name: 'birth_date',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'City',
    name: 'city',
    callback: 'teamCity',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Age',
    name: 'age',
    callback: 'countAge',
    dataClass: 'text-center',
    titleClass: 'text-center'
  },
  {
    title: 'Gender',
    name: 'gender',
    dataClass: 'text-center',
    titleClass: 'text-center'
  }
]