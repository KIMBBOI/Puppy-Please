import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyeldDitailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    text-align: center;
    

    & > div {
        width: 100%;
        height: 100%;
    }

    img {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }

    .controllArea {
        display: flex;
        justify-content: right;
        margin: 10px 0 10px 0 ;
    }

    button {
        width: 10%;
        height: 100%;
        margin-left: 10px;
    }

`;



const ReportDetailItem = ( {vo} ) => {



    // 게시글 작성자 판단 ( 수정/삭제 )
    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);
    const loginMemberNo = sessionVo.memberNo;
    const currentUser = vo.memberNo === loginMemberNo


    const navigate = useNavigate();
    const handleEdit = () => {
        navigate("/board/report/write", {state: {vo}} );
    }




    return (
        <StyeldDitailDiv>
            <div className='boardArea'>
                <div><h1>{vo.title}</h1></div>
                <img 
                    src={vo.imagePath}
                    alt={'imageNo' + vo.imageNo}
                />
                <div><h3>{vo.content}</h3></div>
            </div>
            {currentUser && (
                <div className='controllArea'>
                    <button onClick={ () => handleEdit(vo) }>수정</button>
                    <button>삭제</button>
                </div>
            )}
        </StyeldDitailDiv>
    );
};

export default ReportDetailItem;