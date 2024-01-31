import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const AdoptionOkListItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    

    img {
        width: 400px;
        height: 300px;
    }

    .name {
        font-size: 18px;
        font-weight: 550;
        padding-top: 6px;
        align-items: start;
        display: flex;
        justify-content: flex-start;
    }

    div {
        padding-bottom: 6px;
        display: flex; /* 추가 */
        align-items: start; /* 추가 */
        
    }
    
    div > span:nth-child(1) {
        align-items: start;
        padding-right: 150px;
    }

    h4{
        padding: 0;
        margin: 0 0 2px 0;
        font-size: 17.5px;
        padding-top: 25px;

    }

    form {
        display: grid;
        grid-template-columns: 1fr; /* 한 개의 열만 필요 */
        gap: 20px;
        align-items: start;
        padding: 20px;
    }

    form tr {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 두 개의 열 */
        gap: 100px;
    }

    form tr td:first-child {
        margin-right: 20px; /* 첫 번째 td에 margin-right 20px 적용 */
    }

`;

const AdoptionOkListItem = ( {a, b, c, d, e, f, g, h , vo} ) => {

    const navigate = useNavigate();

    const handleDetail = (vo) => {
        navigate("/board/adoptionOk/detail" , {state: {vo}});
    };

    return (
        <AdoptionOkListItemDiv>
            <img 
                src={a}
                alt='사진'
                value={h}
                onClick={ () => handleDetail(vo) }
                width='300px'
                height='200px'
            />
            <div><h4>{b}</h4></div>
            <form>
                <tr>
                    <td>견종</td>
                    <td>{c}</td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>{d}</td>
                </tr>
                <tr>
                    <td>중성화</td>
                    <td>{e}</td>
                </tr>
                <tr>
                    <td>나이</td>
                    <td>{f}</td>
                </tr>
                <tr>
                    <td>몸무게</td>
                    <td>{g}</td>
                </tr>
            </form>
        </AdoptionOkListItemDiv>
    );
};

export default AdoptionOkListItem;