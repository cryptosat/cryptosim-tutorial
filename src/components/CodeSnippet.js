import React, { useState } from "react";
import "./CodeSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCopy, faPaste } from "@fortawesome/pro-light-svg-icons";
import SnippetModal from "./SnippetModal";

const textarea = document.querySelector(".cli");
function copyToConsole(text) {
  if (textarea) {
    textarea.value = text;
    textarea.focus();
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}

class CodeSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.setShowModal = this.setShowModal.bind(this);
    this.pasteToConsole = this.pasteToConsole.bind(this);
  }

  setShowModal(modalState) {
    this.setState({
      showModal: modalState,
    });
  }

  pasteToConsole() {
    copyToConsole(this.props.code);
  }

  render() {
    return (
      <div className="code-snippet">
        <pre>
          <code>{this.props.code}</code>
          <div className="icon-container">
            <button onClick={() => this.setShowModal(!this.state.showModal)}>
              <FontAwesomeIcon color="#ffffff" icon={faExpandAlt} />
            </button>
            <button onClick={this.pasteToConsole.bind(this)}>
              <FontAwesomeIcon color="#ffffff" icon={faPaste} />
            </button>
          </div>
        </pre>
        {this.state.showModal && (
          <SnippetModal
            pasteToConsole={this.pasteToConsole}
            code={this.props.code}
            setShow={this.setShowModal}
          />
        )}
      </div>
    );
  }
}

export default CodeSnippet;
