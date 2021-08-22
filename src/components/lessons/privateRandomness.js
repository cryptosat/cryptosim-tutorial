import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Private Randomness</h2>
    <p>
      The cryptosat can serve private randomness to users. Users can
      supply their own public key and the cryptosat service will generate
      random bits and encrypt them with the user-provided key. The cryptosat
      also signs the message using its signature key.
    </p>
    <p>
      To obtain private bits from the cryptosat first generate a local
      key pair and a nonce:
    </p>
    <CodeSnippet code={`clientKey = nacl.box.keyPair();
nonce = nacl.randomBytes(nacl.box.nonceLength);`} />
    <p>
      Then invoke the Cryptosat API call:
    </p>
    <CodeSnippet code={`request = cryptosat.getPrivateRandom(clientKey.publicKey, nonce);`} />
    <p>
      The API call returns a request object allowing the user to track its
      status. The status can be obtained by invoking the status method:
    </p>
    <CodeSnippet code={`request.status();`} />
    <p>
      After the cryptosat signed the message and transmits the signature back
      to earth, the status of the message will change to <i>Ready</i> and the result
      of the request can be obtained by invoking the result method:
    </p>
    <CodeSnippet code={`result = request.result();`} />
    <p>You can then decrypt the message using the following snippet:</p>
    <CodeSnippet code={`encryptionKey = cryptosat.getPublicEncryptionKey();
plain = nacl.box.open(result.encryptedRandom, nonce, encryptionKey, clientKey.secretKey);`} />
    <p>And verify that the signature is valid using the this snippet:</p>
    <CodeSnippet code={`signingKey = cryptosat.getPublicSigningKey();
nacl.sign.detached.verify(result.encryptedRandom, result.signature, signingKey)`} />
  </div>
);

export default content;
