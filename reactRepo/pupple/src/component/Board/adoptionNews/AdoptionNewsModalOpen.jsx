import React, { useState } from 'react';
import styled from 'styled-components';
import AdoptionNewsModal from './AdoptionNewsModal';

const StyledModalOpen = styled.div`

`;

const AdoptionNewsModalOpen = () => {
    
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (vo) => {
        setModalOpen(true);
    };

    return (
        <StyledModalOpen>
            <button onClick={showModal}>모달띄우기</button>
            {modalOpen && <AdoptionNewsModal setModalOpen = {setModalOpen} />}
        </StyledModalOpen>
    );
};

export default AdoptionNewsModalOpen;