import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionDetailItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    text-align: center;

    img {
        width: 450px;
        height: 400px;
    }
`;

const AoptionDetailItem = ( {vo} ) => {
    let currentAdmin = false;

    //게시글 작성자 판단 (수정/입양완료)
    if (sessionStorage.getItem("loginMemberVo") != null)  {
        const str = sessionStorage.getItem("loginMemberVo");
        const sesssionVo = JSON.parse(str);
        const loginMemberVo = sesssionVo.adminNo;
        currentAdmin = vo.adminNo === loginMemberVo;
    }

    const navigate = useNavigate();

    const handleEdit = (vo) => {
        console.log('vo ::: ' , vo);
        navigate("board/adoption/write" , {state: {vo}});
    };

    const handleDelete = (vo) => {
        fetch("http://127.0.0.1:8080/app/adoption" ,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json () )
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

    //${vo.adoptionBoardNo}
    const handleAdoptionOk = () => {
        // 입양완료 버튼 클릭 시 실행되는 로직
        // 서버에 해당 게시글을 입양완료 상태로 업데이트하는 요청을 보낼 수 있습니다.
        // 이후 입양완료 게시판으로 이동
        // 아래는 예시 코드
        const adoptionCompleteYn = 'Y';
        fetch(`http://127.0.0.1:8080/app/adoptionOk/list?pno=${vo.adoptionBoardNo}&adoptionCompleteYn=${adoptionCompleteYn}`)
            // method: 'POST', // 또는 다른 HTTP 메서드를 사용하십시오.
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify(vo)
        .then(resp => resp.json())
        .then(data => {
            if (data.msg === 'good') {
                alert("입양완료 처리가 완료되었습니다.");
                navigate("/board/adoptionOk/list");
            } else {
                alert('입양완료 처리에 실패하였습니다.');
                navigate(-1);
            }
        })
        ;
    };
    

    return (
        <StyledAdoptionDetailItem>
            <div className='detailArea'>
                <button onClick={() => handleAdoptionOk(vo.pno)}>입양완료</button>
                <img 
                    src={vo.imagePath} 
                    alt={'imageNo' + vo.imageNo}
                />
                <div><h4>이름 : {vo.dogName}</h4></div>
                <div><h5>종 : {vo.breed}</h5></div>
                <div><h5>성별 : {vo.genderMf}</h5></div>
                <div><h5>중성화 : {vo.neuteringOx}</h5></div>
                <div><h5>나이 : {vo.age}</h5></div>
                <div><h5>몸무게 : {vo.weight}</h5></div>
            </div>
            <div>
                {currentAdmin && (
                    <div className='controlArea'>
                        <button onClick={ () => handleEdit(vo) }>수정</button>
                        <button onClick={ () => handleDelete(vo) } >삭제</button>
                    </div>
                )}
            </div>
        </StyledAdoptionDetailItem>
    );
};

export default AoptionDetailItem;