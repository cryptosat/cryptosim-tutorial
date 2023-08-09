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
    <CodeSnippet code={`req = await cryptosat.sign('your message here');`} />
    <p>
      The API call returns a request object allowing the user to track
      its status. The status of the request can be obtained by
      invoking the status method:
    </p>
    <CodeSnippet code={`await req.status();`} />
    <p>
      After the cryptosat signed the message and transmits the signature back to
      earth, the status of the message will change to <i>Ready</i> and the result of
      the request can be obtained by invoking the result method:
    </p>
    <CodeSnippet code={`result = await req.result();`} />
    <p>
      You can then verify that the signature is valid using
      the <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown
      in the following snippet:
    </p>
    <CodeSnippet code={`key = await cryptosat.getPublicSigningKey();
msg = binary.str2ab('your message here');
nacl.sign.detached.verify(
  msg, 
  result.signature, 
  binary.pem2ab(key)
);`} />
  </div>
);

export default content;
