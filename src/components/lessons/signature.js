import CodeSnippet from '../CodeSnippet';

const content = (
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
    <CodeSnippet code={`sigRequest = cryptosat.sign('your message here');`} />
    <p>
      The API call returns a request object allowing the user to track
      its status. The status of the request can be obtained by
      invoking the status method:
    </p>
    <CodeSnippet code={`sigRequest.status();`} />
    <p>
      After the cryptosat signed the message and transmits the signature back to
      earth, the status of the message will change to <i>Ready</i> and the result of
      the request can be obtained by invoking the result method:
    </p>
    <CodeSnippet code={`result = sigRequest.result();`} />
    <p>
      You can then verify that the signature is valid using 
      the <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`key = cryptosat.getPublicSigningKey();
msg = binary.appendBuffers(
      binary.str2ab('hello, world!'),
      binary.int2ab(result.timestamp));
nacl.sign.detached.verify(msg, result.signature, key);`} />
  </div>
);

export default content;
