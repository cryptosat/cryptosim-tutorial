import CodeSnippet from '../../CodeSnippet';

const content = (props) => (
  <div>
    <h2>Delay encryption</h2>
    <p>
    One of the features of cryptosat is Delay Encryption.
    Delay Encryption allows the user to generate a keypair that is stored on the satellite, and the keypair will be released in the future.
    To generate a delayed keypair a user can use the following function:
    </p>
    <CodeSnippet code={`const time_to_release_in_secs = 10;
keypair_req = await cryptosat.createDelayedKeypair(
  time_to_release_in_secs
);`} theme={props.theme} />
    <CodeSnippet code={`await keypair_req.status();`} theme={props.theme} />
    <CodeSnippet code={`result = await keypair_req.result();\nkeypair_id = result.keypair_id`} theme={props.theme} />
    <p>
        The result of the function will be the id of the keypair on the satellite and the public key.
        To fetch the public key a user can use the next function:
    </p>
    <CodeSnippet code={`pubkey_req = await cryptosat.fetchDelayedPubKey(
  keypair_id
);`} theme={props.theme} />
    <CodeSnippet code={`await pubkey_req.status();`} theme={props.theme} />
    <CodeSnippet code={'pubkey = await pubkey_req.result();'} theme={props.theme} />
    <p>
        After the specified time we can also fetch the private key using the following function:
    </p>
    <CodeSnippet code={`privkey_req = await cryptosat.fetchDelayedPrivKey(
  keypair_id
);`} theme={props.theme} />
    <CodeSnippet code={`await privkey_req.status();`} theme={props.theme} />
    <CodeSnippet code={'privkey = await privkey_req.result();'} theme={props.theme} />
    <p>
        If user will try to fetch the private key before the specified time, it will resolve in an error.
    </p>
  </div>
);

export default content;
