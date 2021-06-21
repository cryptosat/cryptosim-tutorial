
// These should be removed once there exists a lesson component and valid route
// for each menu item.
const PLACEHOLDER_COMPONENT = 'LessonSatelliteBasics'
const PLACEHOLDER_LINK = '/placeholder'

const plan = [
 {
    name: 'Getting Started',
    lessons: [
      { name: 'Setup', component: PLACEHOLDER_COMPONENT, path: '/getting-started/setup' },
    ],
  },
  {
    name: 'Satellites',
    lessons: [
      { name: 'Satellite Basics', component: 'LessonSatelliteBasics', path: '/satellites/basics' },
      { name: 'Two Line Element Sets', component: PLACEHOLDER_COMPONENT, path: '/satellites/tle' },
      { name: 'Orbit', component: PLACEHOLDER_COMPONENT, path: '/satellites/orbit' },
      { name: 'Positions', component: PLACEHOLDER_COMPONENT, path: '/satellites/positions' },
    ],
  },
  {
    name: 'Ground Stations',
    lessons: [
      { name: 'Ground Stations Basics', component: 'LessonGroundStationBasics', path: '/ground-stations/basics' },
      { name: 'Line of Sight', component: PLACEHOLDER_COMPONENT, path: '/ground-stations/line-of-sight' },
      { name: 'Transmission Windows', component: PLACEHOLDER_COMPONENT, path: '/ground-stations/communication-windows' },
    ],
  },
  {
    name: 'Ground Station Networks',
    lessons: [
      { name: 'Ground Stations Networks Basics', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Presets', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Line of Sight', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Coverage', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Transmissio Windows', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
    ],
  },
  {
    name: 'Clocks',
    lessons: [
      { name: 'Clock Basics', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Advance', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Play and Pause', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
      { name: 'Playback Speed', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Callbacks', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
    ],
  },
  {
    name: 'Universe',
    lessons: [
      { name: 'Universe Basics', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Satellite Transmission', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Ground Station Transmission', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
    ],
  },
  {
    name: 'Servers',
    lessons: [
      { name: 'Server Basics', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Binding to a Satellite', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Receiving Messages', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
      { name: 'Sending Messages', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
      { name: 'Broadcasting Messages', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
    ],
  },
  {
    name: 'Clients',
    lessons: [
      { name: 'Client Basics', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
      { name: 'Sending Messages', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
      { name: 'Receiving Messages', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
      { name: 'Asynchronous Communication', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK},
    ],
  },
  {
    name: 'Other',
    lessons: [
      { name: 'Serialization', component: PLACEHOLDER_COMPONENT, path: PLACEHOLDER_LINK },
    ],
  },
]
export default plan;