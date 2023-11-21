import React, { useState } from "react";
import "./CodeSnippet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCopy, faPaste } from "@fortawesome/pro-light-svg-icons";
import SnippetModal from "./SnippetModal";

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
    const textarea = document.querySelector(".cli");
    if (textarea) {
      textarea.value = this.props.code;
      textarea.focus();
      let event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);

//      textarea.style.height = "auto";
//      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  render() {
    let expandIcon = null;
    if (this.props.code.split("\n").length > 2) {
      expandIcon = (
        <button onClick={() => this.setShowModal(!this.state.showModal)}>
          <FontAwesomeIcon color={ this.props.theme === 'light' ? '#000' : "#ffffff" } icon={faExpandAlt} />
        </button>
      );
    }

    return (
      <div className={'code-snippet '+this.props.theme}>
        <pre>
          <code>{this.props.code}</code>
          <div className="icon-container">
            <div>{expandIcon}</div>
            <div>
              <button onClick={() => this.pasteToConsole()}>
                <FontAwesomeIcon color={ this.props.theme === 'light' ? '#000' : "#ffffff" } icon={faPaste} />
              </button>
            </div>
          </div>
        </pre>
        {this.state.showModal && (
          <SnippetModal
            pasteToConsole={this.pasteToConsole}
            code={this.props.code}
            setShow={this.setShowModal}
            theme={this.props.theme}
          />
        )}
      </div>
    );
  }
}

export default CodeSnippet;
