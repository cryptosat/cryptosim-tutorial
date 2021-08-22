import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Timestamp</h2>
    <p>
      The cryptosat reports the current timestamp in periodic intervals.
      The timestamp, reported as milliseconds since epoch, is signed by the
      satellite’s public signing key. The timestamp and its signature can be
      obtained using the following API call:
    </p>
    <CodeSnippet code={`result = cryptosat.getTimestamp();`} />
    <p>
      You can verify the signature of the timestamp with
      the <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`key = cryptosat.getPublicSigningKey();
timestamp = binary.int2ab(result.timestamp);
nacl.sign.detached.verify(timestamp, result.signature, key);`} />
  </div>
);

export default content;
