import React from 'react';
import { Modal} from 'react-bootstrap';
import './ImageModal.css';

const ImageModal = (props) => 
  <Modal show={props.showThis} onHide={props.hideThis} className="imageModal">
    <Modal.Header closeButton>
      <Modal.Title>
       Hi, I'm a Modal Title
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.imageNumber}
    </Modal.Body>
  </Modal>

export default ImageModal;