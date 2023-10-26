import CodeSnippet from '../../CodeSnippet';

const content = (
  <div>
    <h2>Delay encryption</h2>
    <p>
    One of the features of cryptosat is Delay Encryption.
    Delay Encryption allows the user to generate a keypair that is stored on the satellite, and the keypair will be released in the future.
    To generate a delayed keypair a user can use the following function:
    </p>
    <CodeSnippet code={`time_to_release_in_secs = 10;
keypair_req = cryptosat.create_keypair(str(time_to_release_in_secs))`} />
    <CodeSnippet code={`keypair_req.try_fetch_public_key()`} />
    <CodeSnippet code={`result = keypair_req.try_fetch_public_key()\nkeypair_id = keypair_req.keypair_id`} />
    <p>
        The result of the function will be the id of the keypair on the satellite and the public key.
        To fetch the public key a user can use the next function:
    </p>
    <CodeSnippet code={`pubkey = keypair_req.try_fetch_public_key()`} />
    <p>
        After the specified time we can also fetch the private key using the following function:
    </p>
    <CodeSnippet code={'privkey = keypair_req.try_fetch_private_key()'} />
    <p>
        If user will try to fetch the private key before the specified time, it will resolve in an error.
    </p>
  </div>
);

export default content;
