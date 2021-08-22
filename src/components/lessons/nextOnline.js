import CodeSnippet from '../CodeSnippet';

const content = (
  <div>
    <h2>Next Online</h2>
    <p>
      If the cryptosat is offline you can query for the next time it
      will be online use the following API call:
    </p>
    <CodeSnippet code={`cryptosat.nextOnlineTime();`} />
    <p>
      The result will be a javascript <i>Date</i> object of the next
      time the cryptosat will be available. If the cryptosat is currently online
      then the current timestamp will be returned.
    </p>
  </div>
);

export default content;
