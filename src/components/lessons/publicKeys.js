import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Public Keys</h2>
    <p>
      The Cryptosat API reports two public keys. The first is a public key used
      for signatures. It can be obtained using the following API call:
    </p>
    <CodeSnippet code={`cryptosat.getPublicSigningKey();`} />
    <p>
      The second is a public encryption key used for encryption. It can be
      obtained using the following API call:
    </p>
    <CodeSnippet code={`cryptosat.getPublicEncryptionKey();`} />
    <p>
      The keys are generated securely once the cryptosat is in orbit and remain
      constant throughout the lifetime of the cryptosat.
    </p>
  </div>
);

export default content;
