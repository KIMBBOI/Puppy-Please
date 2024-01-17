import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
    width: 300px;
    height: 200px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 8px;

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

const AdoptionNewsModal = ( {setModalOpen , vo} ) => {

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <StyledModal>
            <div className='modal'>
                <button className='close' onClick={closeModal}>
                    X
                </button> 
            </div> 
        </StyledModal>
    );
};

export default AdoptionNewsModal;