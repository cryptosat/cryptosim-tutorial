import CodeSnippet from '../../CodeSnippet';

const content = (props) => (
  <div>
    <h2>Version</h2>
    <p>
      To obtain the current version of the cryptosat invoke the following
      command:
    </p>
    <CodeSnippet code={`print(cryptosat.version())`} theme={props.theme} />
    <p>
      The returned value contains the <a href="https://semver.org/">
      semantic version</a> of the software running onboard the cryptosat.
      The software version is reported along with the timestamp at which the
      cryptosat last reported its software version.
    </p>
  </div>
);

export default content;
