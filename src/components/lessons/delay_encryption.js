import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Delay encryption</h2>
    <p>
    One of the features of cryptosat is Delay Encryption.
    Delay Encryption allows the user to generate a keypair that is stored on the satellite, and the keypair will be released in the future.
    To generate a delayed keypair a user can use the following function:
    </p>
    <CodeSnippet code={`const time_to_release_in_secs = 10;\nlet keypair_id_req = await cryptosat.createDelayedKeypair(time_to_release_in_secs);`} />
    <CodeSnippet code={`await keypair_id_req.status();`} />
    <CodeSnippet code={`result = await keypair_id_req.result();\nkeypair_id=result.keypair_id`} />
    <p>
        The result of the function will be the id of the keypair on the satellite and the public key.
        To fetch the public key a user can use the next function:
    </p>
    <CodeSnippet code={'pub_key_req = await cryptosat.fetchDelayedPubKey(keypair_id);'} />
    <CodeSnippet code={`await pub_key_req.status();`} />
    <CodeSnippet code={'pub_key = await pub_key_req.result();'} />
    <p>
        After the specified time we can also fetch the private key using the following function:
    </p>
    <CodeSnippet code={'priv_key_req = await cryptosat.fetchDelayedPrivKey(keypair_id);'} />
    <CodeSnippet code={`await priv_key_req.status();`} />
    <CodeSnippet code={'priv_key = await priv_key_req.result();'} />
    <p>
        If user will try to fetch the private key before the specified time, it will resolve in an error.
    </p>
  </div>
);

export default content;
