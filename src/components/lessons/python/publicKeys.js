import CodeSnippet from '../../CodeSnippet';

const content = (props) => (
  <div>
    <h2>Public Keys</h2>
    <p>
      The Cryptosat API reports public key used
      for signatures. It can be obtained using the following API call:
    </p>
    <CodeSnippet code={`print(cryptosat.get_public_signing_key())`} theme={props.theme} />
    <p>
      The key is generated securely once the cryptosat is in orbit and remain
      constant throughout the lifetime of the cryptosat.
    </p>
  </div>
);

export default content;
