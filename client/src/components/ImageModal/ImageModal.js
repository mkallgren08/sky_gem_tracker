import React from 'react';
import { Modal} from 'react-bootstrap';
import './ImageModal.css';

const ImageModal = (props) =>{
console.log(props)

let cleanUpText = (txt) => {
  let ftxt=txt.charAt(0).toUpperCase() + txt.slice(1);
  if (ftxt.charAt(ftxt.length-1)==='s'){ftxt = ftxt.slice(0,ftxt.length-1)}
  return ftxt
}


return(
  <Modal show={props.showThis} onHide={props.hideThis} className="imageModal">
    <Modal.Header closeButton>
      <Modal.Title>
        {cleanUpText(props.activeTable)} #{props.imageNumber} - {props.imageLocation}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.imageDescription}
      <div style={{backgroundImage: `url(${window.location.origin}/images/${props.activeTable}/${props.imageNumber}.png)`}} className="imageModal-closeup-image" >
      </div>
    </Modal.Body>
  </Modal>
)
}

export default ImageModal;