
const plan = [
 {
    name: 'Getting Started',
    lessons: [
      { name: 'Overview', content: 'overview', path: '/getting-started/overview', disabled: false },
      { name: 'Communication Windows', content: 'communication', path: '/getting-started/communication', disabled: false },
      { name: 'Asynchrony', content: 'asynchrony', path: '/getting-started/asynchrony', disabled: false },
    ],
  },
  {
    name: 'Cryptosat API',
    lessons: [
      { name: 'Version', content: 'version', path: '/cryptosat-api/version', disabled: false },
      { name: 'Public Keys', content: 'publicKeys', path: '/cryptosat-api/public-keys', disabled: false },
      { name: 'Timestamp', content: 'timestamp', path: '/cryptosat-api/timestamp', disabled: false },
      { name: 'Public Randomness', content: 'publicRandomness', path: '/cryptosat-api/pulic-randomness', disabled: false },
      { name: 'Private Randomness', content: 'privateRandomness', path: '/cryptosat-api/private-randomness', disabled: false },
      { name: 'Signature', content: 'signature', path: '/cryptosat-api/signature', disabled: false },
      { name: 'Next Online', content: 'nextOnline', path: '/cryptosat-api/next-online', disabled: false },
      { name: 'Delay Encryption', content: 'DelayEncryption', path: '/cryptosat-api/delay_encryption', disabled: false},
      { name: 'Sealed Bid Auction', content: 'sealedBidAuction', path: '/examples/sealedBidAuction', disabled: false}
    ],
  },
];

export default plan;