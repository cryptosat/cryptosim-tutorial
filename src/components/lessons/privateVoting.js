import CodeSnippet from "../CodeSnippet";

const content = (
    <div>
        <h2>Private Ballot API</h2>
        <p>
            Privacy-preserving voting has many applications in online elections, 
            decentralized governance (DAOs), voting on community funding and more.
            Private ballots provide secrecy for individual voters, such that their votes are not 
            disclosed, while guaranteeing correct tallying of the votes.
        </p>

        <p>
            Cryptosat provides a solution for running private ballots using simple 
            public-key encryption. Cryptosat publishes a public key to which voters can encrypt
            their votes, tallies the votes and reveals the result.
        </p>

        <p>First, an operator requests Cryptosat to initialize a new ballot with a certain mininmum of 
            participants to guarantee k-anonimity. The public key is timestamped and signed, and 
            its authenticity can be verified using Cryptosat's public verification key.
        </p>
        <CodeSnippet code={`k = 10; // minimal number of participants
pubkey = cryptosat.ballot.init(k);`} />

        <p>The users then encrypt and sumbit their votes</p>
        <CodeSnippet code={`encrypted_vote = utils.encrypt(pubkey, "candidate-1");
req = cryptosat.ballot.vote(encrypted_vote);`} />

        <p>And finally, the operator finalizes the ballot by calling</p>
        <CodeSnippet code={`req = cryptosat.ballot.finalize();
req.status();
req.result()`} />
    </div>
)

export default content;