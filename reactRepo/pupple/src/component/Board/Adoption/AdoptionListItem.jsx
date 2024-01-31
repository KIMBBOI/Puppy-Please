import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledItemDiv = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .imgDiv{
        overflow: hidden;
    }

    img {
        width: 330px;
        height: 300px;
        margin-bottom: 5px;
        transition: all 0.3s ease-in;
    }

    .adoptionBtn {
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 2px;
        font-size: 16.5px;
        font-weight: 450;
        color: #ffff;
        background-color: #cfb7fd;
        cursor: pointer;
        margin-top: 7px;
    }

    /* form tr { padding: 5px; } */

    &:hover {
        img {
            transform: scale(1.05);
        }
    }

    h3{
        padding: 0;
        margin: 0 0 2px 0;
        font-size: 18px;
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

const AdoptionListItem = ( {a, b, c, d, e, f, g, h, vo } ) => {

    const navigate = useNavigate();

    const handleDetail = (vo) => {
        navigate("/board/adoption/detail" , {state: {vo}});
    }
    const handleAdoption = () => {
        console.log(vo);
        navigate("/board/adoption/survey", {state: {vo}});
    }
    return (
        <>
            <StyledItemDiv>
                <div className="imgDiv">
                    <img 
                        src={a}
                        alt='사진'
                        value={h}
                        onClick={ () => handleDetail(vo) }
                        width='300px'
                        height='200px'
                    />
                </div>
                <form>
                    <tr>
                        <td><h3>{b}</h3></td>
                    </tr>
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
                        <td>{g}kg</td>
                    </tr>
                </form>
                <button className='adoptionBtn' onClick={ handleAdoption }>입양신청</button>
            </StyledItemDiv>
        </>
    );
};

export default AdoptionListItem;