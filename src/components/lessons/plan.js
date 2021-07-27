
// These should be removed once there exists a lesson component and valid route
// for each menu item.
const PLACEHOLDER_COMPONENT = 'LessonSatelliteBasics'
const PLACEHOLDER_LINK = '/placeholder'

const plan = [
 {
    name: 'Getting Started',
    lessons: [
      { name: 'Overview', component: 'LessonOverview', path: '/getting-started/overview', disabled: false },
      { name: 'Communication Windows', component: 'LessonCommunication', path: '/getting-started/communication', disabled: false },
    ],
  },
  {
    name: 'Cryptosat API',
    lessons: [
      { name: 'Version', component: 'LessonVersion', path: '/cryptosat-api/version', disabled: false },
      { name: 'Public Keys', component: 'LessonPublicKeys', path: '/cryptosat-api/public-keys', disabled: false },
      { name: 'Timestamp', component: 'LessonTimestamp', path: '/cryptosat-api/timestamp', disabled: false },
      { name: 'Public Randomness', component: 'LessonPublicRandomness', path: '/cryptosat-api/pulic-randomness', disabled: false },
      { name: 'Private Randomness', component: 'LessonPrivateRandomness', path: '/cryptosat-api/private-randomness', disabled: false },
      { name: 'Signature', component: 'LessonSignature', path: '/cryptosat-api/signature', disabled: false },
      { name: 'Next Online', component: 'LessonNextOnline', path: '/cryptosat-api/next-online', disabled: false },
    ],
  },
]
export default plan;