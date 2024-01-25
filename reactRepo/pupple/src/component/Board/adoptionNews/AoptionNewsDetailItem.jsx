import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNewsDetatilDiv = styled.div`
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    background-color: #e5d8fd44;
    text-align: center;

    img {
        width: 550px;
        height: 500px;
        padding: 30px;
    }

    .tit {
        font-size: 17px;
        font-weight: 550;
        text-align: start;
        padding-left: 75px;
    }

    .con {
        font-size: 14px;
        margin: 0 20px 45px 20px;
    }

    .date {
        margin-right: 250px; /* 원하는 간격 조절 */
    }

    .date, .writer {
        font-size: 13px;
        margin-bottom: 9px;
        display: inline-block;
    }


`;

const AoptionNewsDetailItem = ( {vo} ) => {
    let currentUser = false;

    //게시글 작성자 판단 (수정/삭제)
    if (sessionStorage.getItem("loginMemberVo") != null)  {
        const str = sessionStorage.getItem("loginMemberVo");
        const sesssionVo = JSON.parse(str);
        const loginMemberVo = sesssionVo.memberNo;
        currentUser = vo.memberNo === loginMemberVo;
    }

    const navigate = useNavigate();
    
    //수정
    const handleEdit = (vo) => {
        console.log('vo ::: ' , vo);
        navigate("/board/adoptionNews/write" , {state: {vo}});
    };

    //삭제
    const handleDelete = (vo) => {
        fetch("http://127.0.0.1:8080/app/adoptionNews" ,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.msg === 'good') {
                alert("게시글을 삭제하였습니다.");
                navigate("/board/adoptionNews/list");
            } else {
                alert('게시글 삭제에 실패하였습니다.');
                navigate(-1);
            }
        })
        ;
    };

    return (
        <StyledNewsDetatilDiv>
            <div className='detailArea'>
                <div className='tit'><h2>{vo.title}</h2></div>
                <div className='date'>{vo.enrollDate}</div>
                <div className='writer'>작성자 　{vo.writerNick}</div>
                <img 
                    src={vo.imagePath} 
                    alt={'imageNo' + vo.imageNo} />
                <div className='con'><p>{vo.content}</p></div>
            </div>
            <div>
                {currentUser && (
                    <div className='controlArea'>
                        <button className='editBtn' onClick={ () => handleEdit(vo) }>수정</button>
                        <button className='deleteBtn' onClick={ () => handleDelete(vo) } >삭제</button>
                    </div>
                )}
            </div>
        </StyledNewsDetatilDiv>
    );
};

export default AoptionNewsDetailItem;