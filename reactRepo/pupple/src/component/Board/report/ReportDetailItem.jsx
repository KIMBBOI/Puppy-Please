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
    let currentUser = false



    // 게시글 작성자 판단 ( 수정/삭제 )
    if (sessionStorage.getItem("loginMemberVo") !== null) {
        const str = sessionStorage.getItem("loginMemberVo");
        const sessionVo = JSON.parse(str);
        const loginMemberNo = sessionVo.memberNo;
        currentUser = vo.memberNo === loginMemberNo
    }



    const navigate = useNavigate();
    const handleEdit = (vo) => {
        console.log('vo :::',vo);
        navigate("/board/report/write", {state: {vo}} );
    }
    const handleDelete = (vo) => {
        fetch("http://127.0.0.1:8080/app/report" , {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.msg === 'success') {
                alert('게시글 삭제 성공 !');
                navigate("/board/report/list");
            } else {
                alert('게시글 삭제 실패 ...');
                navigate(-1)
            }
            
        } )
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
                    <button onClick={ () => handleDelete(vo) }>삭제</button>
                </div>
            )}
        </StyeldDitailDiv>
    );
};

export default ReportDetailItem;