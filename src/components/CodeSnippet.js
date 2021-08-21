import React from 'react';
import './CodeSnippet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy} from '@fortawesome/pro-light-svg-icons'


function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  document.getElementById("dummy_id").value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

class CodeSnippet extends React.Component {

  copy() {
    copyToClipboard(this.props.code);
  }

 render() {
    return(
      <div className='code-snippet'>
        <pre>
          <code>
            {this.props.code}
          </code>
            <div className='icon-container'>
              <button onClick={this.copy.bind(this)}>
                <FontAwesomeIcon icon={faCopy}/>
              </button>
            </div>
        </pre>
      </div>
    )
  }
}

export default CodeSnippet
