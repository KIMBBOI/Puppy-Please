import React from 'react';
import Header from './Header';
import Navi from './Navi';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 1200px;
    display: grid;
    grid-template-rows: 3fr 1.5fr 10fr 2fr;
    grid-template-columns: 1fr;
    place-items: center center;
    /* overflow: auto; */
`;

const Layout = () => {
    return (
        <StyledLayoutDiv>
            <Header />
            <Navi />
            <Main />
            <Footer />
        </StyledLayoutDiv>
    );
};

export default Layout;