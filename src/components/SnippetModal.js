import React from "react";
import "./SnippetModal.css";
import { faPaste } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-thin-svg-icons";

const SnippetModal = React.memo(({ pasteToConsole, code, setShow, theme }) => {
  const handleOnPaste = () => {
    pasteToConsole();
    setShow(false);
  };
  return (
    <>
      <div id="modal-main" onClick={() => setShow(false)}></div>
      <div className={"container "+theme}>
        <div className="exit-icon" onClick={() => setShow(false)}>
          <FontAwesomeIcon color={ theme === 'light' ? '#000' : "#ffffff" } icon={faXmark} size="lg" />
        </div>
        <div className="modal-content">
          <div className="modal-content-code">
            <pre>{code}</pre>
          </div>
          <div className="copy-icon" onClick={handleOnPaste}>
            <FontAwesomeIcon color={ theme === 'light' ? '#000' : "#ffffff" } icon={faPaste} size="lg" />
          </div>
        </div>
      </div>
    </>
  );
});

export default SnippetModal;
