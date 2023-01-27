import React from 'react'
import './SnippetModal.css'
import { faCopy} from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/pro-thin-svg-icons'

const SnippetModal = ({copy,code,setShow}) => {
  return (
      <>
          <div id='modal-main' onClick={() => setShow(false)}>
          </div>
          <div className='container' >
                  <div className='exit-icon' onClick={() => setShow(false)} >
                      <FontAwesomeIcon icon={faXmark} size='lg' />
                  </div>
                  <div className='modal-content'>
                      <div className='modal-content-code'>
                          <p>{code}</p>
                      </div>
                      <div className='copy-icon' onClick={() => copy()}>
                        <FontAwesomeIcon icon={faCopy} size='lg' />
                      </div>
                  </div>
            </div>
      </>
  )
}

export default SnippetModal;