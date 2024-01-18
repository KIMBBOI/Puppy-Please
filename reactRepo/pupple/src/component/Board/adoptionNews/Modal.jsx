import React from 'react';
import Modal from 'react-modal';

const modal = ( { isOpen, onRequestClose, content } ) => {
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Custom Modal"
            >
            <div>{content}</div>
            <button onClick={onRequestClose}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default modal;