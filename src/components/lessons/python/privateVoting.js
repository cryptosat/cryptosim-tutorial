import CodeSnippet from "../../CodeSnippet";

const content = (props) => (
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
      <CodeSnippet code={`k = 1 # minimal number of participants
ballot_req = cryptosat.create_ballot(k)`} theme={props.theme} />
      <CodeSnippet code={`pubkey = ballot_req.try_fetch_public_key()`} theme={props.theme} />

      <p>The users then encrypt and sumbit their votes</p>
      <CodeSnippet code={`encrypted_vote = encrypt_message(
  pubkey, 
  "candidate-1"
)
ballot_req.vote(encrypted_vote)`} theme={props.theme} />

      <p>And finally, the operator finalizes the ballot by calling</p>
      <CodeSnippet code={`ballot_req.finalize()\n`} theme={props.theme} />
      <CodeSnippet code={`result = ballot_req.try_fetch_result()`} theme={props.theme} />
    </div>
)

export default content;
