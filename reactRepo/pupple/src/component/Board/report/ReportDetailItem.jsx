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

    & > div:nth-of-type(2) {
        width: 600px;
        display: flex;
        justify-content: right;
        margin-top: 20px;
        
        & > button {
            margin-left: 10px;
            width: 100px;
            height: 40px;
            border-radius: 5px;
            background-color: #C8ADFF;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            border: none;

            &:hover {
                background-color: #A080FF;
            }
        }
    }
    
    
    .boardArea {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 600px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);

        & > div:nth-of-type(2) {
            width: 50%;
            padding: 20px 0 30px 0;
        }
    }

    & > div {
        width: 100%;
        height: 100%;
    }

    img {
        width: 80%;
        height: auto;
        margin: 0 auto;
    }

    .controllArea {
        width: 600px;
        display: flex;
        margin: 20px 0 10px 0 ;
        
        & > button {
            margin-left: 10px;
            width: 100px;
            height: 40px;
            border-radius: 5px;
            background-color: #C8ADFF;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            border: none;

            &:hover {
                background-color: #A080FF;
            }
        }

        & > button:nth-of-type(3) {
            margin-left: 280px;
        }
    }


`;



const ReportDetailItem = ( {vo} ) => {
    let currentUser = false
    const navigate = useNavigate();



    // 게시글 작성자 판단 ( 수정/삭제 )
    if (sessionStorage.getItem("loginMemberVo") !== null) {
        const str = sessionStorage.getItem("loginMemberVo");
        const sessionVo = JSON.parse(str);
        const loginMemberNo = sessionVo.memberNo;
        currentUser = vo.memberNo === loginMemberNo
    }



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
                <div>
                    <h2>{vo.title}</h2>
                </div>
                <img 
                    src={vo.imagePath}
                    alt={'imageNo' + vo.imageNo}
                />
                <div>
                    {vo.content}
                </div>
            </div>
            {currentUser 
                ?
                    (
                    <div className='controllArea'>
                        <button onClick={ () => handleEdit(vo) }>수정</button>
                        <button onClick={ () => handleDelete(vo) }>삭제</button>
                        <button onClick={ () => navigate(-1) }>목록</button>
                    </div>
                    )
                :
                    <div><button onClick={ () => navigate(-1) }>목록</button></div>
            }
        </StyeldDitailDiv>
    );
};

export default ReportDetailItem;