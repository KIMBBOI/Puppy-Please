import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledDetailItem = styled.div`
    width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e5d8fd44;
    text-align: center;
    align-items: center;
    padding: 40px;

    div {
        padding: 7px;
        margin: 0 0 30px 20px;
        font-size: 24px;
        color: #333;
    }

    img {
        width: 600px;
        height: 550px;
        margin-bottom: 20px;
    }

    th,
    td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    h4 {
        padding: 0;
        margin: 0 0 2px 0;
        font-size: 21px;
    }

    form {
        width: 73%;
        padding: 10px 20px 15px 20px;
        background-color: #fff;
        border: 1px solid #e5d8fd;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
    }

    form tr {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    form td {
        flex: 1;
        padding: 10px;
        border-bottom: 1px solid #e5d8fd;
        text-align: left;
        word-break: break-word;
    }

    form th {
        flex-basis: 30%;
        font-weight: bold;
        color: #cfb7fd;
        text-align: left;
    }

`;

const AoptionOkDetailItem = ( {vo} ) => {

    return (
        <StyledDetailItem>
            <div>입양완료된 유기견</div>
            <img 
                src={vo.imagePath} 
                alt={'imageNo' + vo.imageNo}
            />
            <form>
                <tr>
                    <td><h4>{vo.dogName}</h4></td>
                </tr>
                <tr>
                    <td>견종</td>
                    <td>{vo.breed}</td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>{vo.genderMf}</td>
                </tr>
                <tr>
                    <td>중성화</td>
                    <td>{vo.neuteringOx}</td>
                </tr>
                <tr>
                    <td>나이</td>
                    <td>{vo.age}살 추정</td>
                </tr>
                <tr>
                    <td>몸무게</td>
                    <td>{vo.weight}kg</td>
                </tr>
            </form>
        </StyledDetailItem>
    );
};

export default AoptionOkDetailItem;