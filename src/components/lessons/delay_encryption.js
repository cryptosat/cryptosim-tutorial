import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Delay encryption</h2>
    <p>
    One of the features of cryptosat is delay encryption.
    Delay encryption allows the user to generate a keypair that is stored on the satellite, and the keypair will be released in the future.
    To generate a delayed keypair a user can use the following function:
    </p>
    <CodeSnippet code={`const time_to_release_in_secs = 10;\nlet keypair_id_req = cryptosat.createDelayedKeypair(time_to_release_in_secs);
keypair_id = keypair_id_req.result().keypair_id;`} />
    <p>
        The result of the function will be the id of the keypair on the satellite and the public key.
        To fetch the public key a user can use the next function:
    </p>
    <CodeSnippet code={'pub_key_req = cryptosat.fetchDelayedPubKey(keypair_id);\npub_key = pub_key_req.result();'} />
    <p>
        After the specified time we can also fetch the private key using the following function:
    </p>
    <CodeSnippet code={'priv_key_req = cryptosat.fetchDelayedPrivKey(keypair_id);\npriv_key = priv_key_req.result();'} />
    <p>
        If user will try to fetch the private key before the specified time, it will resolve in an error.
    </p>
    <p>
        A user can also fetch a list of all keypairs currently available on the satellite, the list will contain the ids and the public keys.
        A user can fetch the list using the following function:
    </p>
    <CodeSnippet code={'keypair_list_req = cryptosat.fetchKeypairList();\nkeypair_list = keypair_list_req.result();'} />
    <p>
        When the keypair is no longer needed, A user can delete the keypair from the satellite using the following function:
    </p>
    <CodeSnippet code={'delete_keypair_req = cryptosat.deleteDelayedKeypair(keypair_id);\ndelete_keypair_status = delete_keypair_req.result();'} />
  </div>
);

export default content;
