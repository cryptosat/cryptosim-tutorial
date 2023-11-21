import CodeSnippet from '../../CodeSnippet';

const content = (props) => (
  <div>
    <h2>Signature</h2>
    <p>
      The cryptosat can sign messages sent to it by end users. The cryptosat
      signs the message, along with the current timestamp using its signature
      key. The current timestamp is appended to prevent backdating of
      signatures. The cryptosat service takes care of coordinating the
      transmission of the message to the appropriate ground station when the
      cryptosat is online.
    </p>
    <p>
      To obtain a signature from the cryptosat invoke the following API call:
    </p>
    <CodeSnippet code={`request = cryptosat.sign_message('your message here')`} theme={props.theme} />
    <p>
      The API call returns a request object allowing the user to track
      its status. The status of the request can be obtained by
      invoking the status method:
    </p>
    <CodeSnippet code={`result = request.try_fetch_result()
print(result)`} theme={props.theme} />
    <p>
      After the cryptosat signed the message and transmits the signature back to
      earth, the type of the result will change from <i>None</i> and the result of
      the request can be obtained by invoking the result method:
    </p>
    <CodeSnippet code={`result = request.try_fetch_result()`} theme={props.theme} />
    <p>
      You can then verify that the signature is valid using
      the 'cryptography' library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

pem_data = cryptosat.get_public_signing_key().encode()
public_key = serialization.load_pem_public_key(pem_data)
message = b'your message here'
signature = bytes.fromhex(result.signature)
public_key.verify(signature, message)
`} theme={props.theme} />
  </div>
);

export default content;
