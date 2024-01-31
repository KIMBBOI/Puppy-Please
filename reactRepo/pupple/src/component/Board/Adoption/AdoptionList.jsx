import React, { useState, useEffect } from 'react';
import AdoptionListItem from './AdoptionListItem';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdoptionPageItem from './AdoptionPageItem';

const StyledAdoptionListDiv = styled.div`
    width: 100%;
    padding: 40px 0;
    /* background-color: #f2f2f2; */

    .tit {
        margin: 0 0 20px 20px;
        font-size: 24px;
        color: #333;
    }

    button {
        width: 110px;
        height: 36px;
        font-size: 14px;
        font-weight: 545;
        border: 1.5px solid #d1b8ffe9;
        border-radius: 20px;
        color: #ffff;
        background-color: #d1b8ffe9;
        cursor: pointer;
    }

    .writeBtn {
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
    }

    .wrap {
        display: grid;
        gap: 50px;
        padding: 20px;
        grid-template-columns: repeat(3, 1fr);

    }

    .wrap > div {
        border: 1px solid #dddddd;
        border-radius: 4px;
        box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2);
    }
`;

const AdoptionList = () => {
    const navigate = useNavigate();
    const loginAdminVo = JSON.parse(sessionStorage.getItem("loginAdminVo"));
    const adminNo = loginAdminVo ? loginAdminVo.adminNo : null;
    const loginMemberVo = loginAdminVo ? loginAdminVo.loginMemberVo : null;
    const memberNo = loginMemberVo ? loginMemberVo.memberNo : null;
    const showWriteButton = !!loginAdminVo && memberNo !== 1;

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const queryParams = new URLSearchParams(url.search);
    let pno = queryParams.get('pno');
    if (pno === null) {
        pno = 1;
    }

    let [arr, setArr] = useState([]);
    let [pvo, setPvo] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/app/adoption/list?pno=${pno}`)
            .then((resp) => resp.json())
            .then((data) => {
                setArr(data.voList);
                setPvo(data.pvo);
            });
    }, [pno]);

    return (
        <>
            <StyledAdoptionListDiv className="adoptionList">
                <div className='tit'>입양신청 페이지</div>
                <div className='writeBtn'>
                    {showWriteButton && (
                        <button onClick={() => {
                            navigate("/board/adoption/write");
                        }}>등록하기</button>
                    )}
                </div>
                <div className='wrap'>
                    {arr.map((vo) => {
                        return (
                            <AdoptionListItem
                                key={vo.adoptionBoardNo}
                                a={vo.imagePath}
                                b={vo.dogName}
                                c={vo.breed}
                                d={vo.genderMf}
                                e={vo.neuteringOx}
                                f={vo.age}
                                g={vo.weight}
                                h={vo.adoptionBoardNo}
                                vo={vo}
                            />
                        )
                    })}
                </div>
                <div className='footer'>
                    <AdoptionPageItem pvo={pvo} />
                </div>
            </StyledAdoptionListDiv>
        </>
    );
};

export default AdoptionList;
