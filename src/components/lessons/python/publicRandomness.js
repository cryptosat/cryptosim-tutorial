import CodeSnippet from '../../CodeSnippet';

const content = (
  <div>
    <h2>Public Randomness</h2>
    <p>
      The cryptosat periodically generates random bits and transmits them back
      to earth. The public random values are signed by the cryptosat's public
      signing key. The random values and the corresponding signature can be
      obtained using the following API call:
    </p>
    <CodeSnippet code={`result = cryptosat.get_public_random()`} />
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
public_random = str(result.randomness).encode()
signature_data = result.signature.encode()
public_key.verify(public_random,signature_data)
`} />
  </div>
);

export default content;
