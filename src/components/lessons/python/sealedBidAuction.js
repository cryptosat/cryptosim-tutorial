import CodeSnippet from '../../CodeSnippet';

const content = (
    <div>
        <h2>Sealed-bid Auction using Delay Encryption</h2>
        <p>
            A sealed-bid auction is one in which all bidders submit sealed bids to the auctioneer so that no bidder knows how much 
            another auction participants have bid. Sealed bid refers to a written bid placed in a sealed envelope.
            This tutorial shows how a sealed bid auction can be implemented programmatically using Cryptosat's Delay Encryption.
        </p>

        <p>
            We first generate a "delayed" key-pair as in the <a href="#/cryptosat-api/delay_encryption">previous tutorial</a>:
        </p>
        <CodeSnippet code={`const time_to_release_in_secs = 10;\nlet keypair_id_req = cryptosat.createDelayedKeypair(time_to_release_in_secs);
keypair_id = keypair_id_req.result().keypair_id;`} />

        <p>
            The result of the function will be the id of the keypair on the satellite and the public key.
            To fetch the public key a user can use the next function:
        </p>
        <CodeSnippet code={`pub_key_req = cryptosat.fetchDelayedPubKey(keypair_id);\nauctioneer_pub_key = pub_key_req.result().public_key;`} />

        <p>
            Bidders encrypt their bids using to the public-key.
        </p>
        <CodeSnippet code={`const bidder1_ephemeral_keyPair = nacl.box.keyPair();\nconst bid1 = "10";
const nonce1 = nacl.randomBytes(nacl.box.nonceLength);
const sealed_bid_1 = nacl.box(util.decodeUTF8(bid1), 
                              nonce1,
                              auctioneer_pub_key, 
                              bidder1_ephemeral_keyPair.secretKey);`} />

        <p>
            After `time_to_release_in_secs` seconds, we request the private key and decrypt the bids:
        </p>
        <CodeSnippet code={`priv_key_req = cryptosat.fetchDelayedPrivKey(keypair_id);
auctioneer_priv_key = priv_key_req.result().payload;
unsealed_bid_1 = util.encodeUTF8(nacl.box.open(sealed_bid_1,
                                               nonce1, 
                                               bidder1_ephemeral_keyPair.publicKey,
                                               auctioneer_priv_key));
`} />
        
        <p>at which point the results of the auction are disclosed.</p>

    </div>
)

export default content;
