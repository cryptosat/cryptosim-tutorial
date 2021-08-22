import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Public Randomness</h2>
    <p>
      The cryptosat periodically generates random bits and transmits them back
      to earth. The public random values are signed by the cryptosat's public
      signing key. The random values and the corresponding signature can be
      obtained using the following API call:
    </p>
    <CodeSnippet code={`result = cryptosat.getPublicRandom();`} />
    <p>
      You can verify the signature of the timestamp with
      the <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`key = cryptosat.getPublicSigningKey();
nacl.sign.detached.verify(result.publicRandom, result.signature, key);`} />
  </div>
);

export default content;
