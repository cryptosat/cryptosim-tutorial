import CodeSnippet from '../../CodeSnippet';

const content = (
  <div>
    <h2>Timestamp</h2>
    <p>
      The cryptosat reports the current timestamp in periodic intervals.
      The timestamp, reported as milliseconds since epoch, is signed by the
      satellite’s public signing key. The timestamp and its signature can be
      obtained using the following API call:
    </p>
    <CodeSnippet code={`result = cryptosat.get_timestamp()`} />
    <p>
      You can verify the signature of the timestamp with
      the 'cryptography' library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

pem_data = cryptosat.get_public_signing_key().encode()
public_key = serialization.load_pem_public_key(pem_data)
timestamp = str(result.timestamp).encode()
signature_data = result.signature.encode()
public_key.verify(timestamp,signature_data)
`} />
  </div>
);

export default content;
