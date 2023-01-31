import React, { useState } from "react";
import "./CodeSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCopy } from "@fortawesome/pro-light-svg-icons";
import SnippetModal from "./SnippetModal";

function copyToConsole(text) {
  const textarea = document.querySelector(".cli");
  if (textarea) {
    textarea.value = text;
    textarea.focus();
  }
}

// class CodeSnippet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//     };
//     this.setShowModal = this.setShowModal.bind(this);
//     this.copy = this.copy.bind(this);
//   }

//   setShowModal(modalState) {
//     this.setState({
//       showModal: modalState,
//     });
//   }

//   copy() {
//     copyToClipboard(this.props.code);
//   }

//   render() {
//     return (
//       <div className="code-snippet">
//         <pre>
//           <code>{this.props.code}</code>
//           <div className="icon-container">
//             <button onClick={() => this.setShowModal(!this.state.showModal)}>
//               <FontAwesomeIcon icon={faExpandAlt} />
//             </button>
//             <button onClick={this.copy.bind(this)}>
//               <FontAwesomeIcon icon={faCopy} /> Copy
//             </button>
//           </div>
//         </pre>
//         {this.state.showModal && (
//           <SnippetModal
//             copy={this.copy}
//             code={this.props.code}
//             setShow={this.setShowModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

class CodeSnippet extends React.Component {
  copy() {
    copyToConsole(this.props.code);
  }

  render() {
    return (
      <div className="code-snippet">
        <pre>
          <code>{this.props.code}</code>
          <div className="icon-container">
            <button onClick={this.copy.bind(this)}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </pre>
      </div>
    );
  }
}

export default CodeSnippet;
