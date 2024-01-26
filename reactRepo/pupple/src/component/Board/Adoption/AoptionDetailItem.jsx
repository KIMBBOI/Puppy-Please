import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionDetailItem = styled.div`
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

    .date {
        margin-right: 250px; /* 원하는 간격 조절 */
        font-size: 13px;
        margin-bottom: 9px;
        display: inline-block;
    }

    .name {
        font-size: 15px;
        font-weight: bold; /* 폰트 굵기 추가 */
    }
`;

const AdoptionDetailItem = ( {vo, onAdoptionComplete} ) => {
    console.log("입양신청 상세페이지 vo :::" , vo);

    let currentAdmin = false;

    // 게시글 작성자 판단 (수정/입양완료)
    if (sessionStorage.getItem("loginAdminVo") != null) {
        const str = sessionStorage.getItem("loginAdminVo");
        const sesssionVo = JSON.parse(str);
        const loginAdminVo = sesssionVo.adminNo;
        currentAdmin = vo.adminNo === loginAdminVo;
    }

    const navigate = useNavigate();

    const handleEdit = (vo) => {
        console.log("edit vo ::: ", vo);
        navigate("/board/adoption/write", { state: { vo } });
    };

    // const handleDelete = (vo) => {
    //     fetch("http://127.0.0.1:8080/app/adoption", {
    //         method: 'delete',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(vo)
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         if (data.msg === 'good') {
    //             alert("게시글을 삭제하였습니다.");
    //             navigate("/board/adoption/list");
    //         } else {
    //             alert('게시글 삭제에 실패하였습니다.');
    //             navigate(-1);
    //         }
    //     });
    // };

    const handleAdoptionOk = () => {
        // 입양완료 버튼 클릭 시 실행되는 로직
        // 서버에 해당 게시글을 입양완료 상태로 업데이트하는 요청을 보낼 수 있습니다.
        // 이후 입양완료 게시판으로 이동
        // 아래는 예시 코드
        console.log("complete vo 확인 : ", vo);
        const adoptionCompleteYn = 'Y';
        fetch('http://127.0.0.1:8080/app/adoption/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vo),
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.msg === 'good') {
                    console.log('complete data : ', data);
                    alert("입양완료 처리가 완료되었습니다.");
                    onAdoptionComplete();
                } else {
                    alert('입양완료 처리에 실패하였습니다.');
                    navigate(-1);
                }
            });
    };

    // // 세션 스토리지에서 로그인된 adminNo 가져오기
    // const adminNoStr = sessionStorage.getItem("loginAdminVo");
    // const adminNo = JSON.parse(adminNoStr);
    // let currentAdmin = false;

    // if (adminNo === vo.adminNo) {
    //     currentAdmin = true;
    // }

    return (
        <StyledAdoptionDetailItem>
            <div className='detailArea'>
                <div>
                    {currentAdmin && (
                        <div className='controlArea'>
                            <button onClick={() => handleEdit(vo)}>수정</button>
                            {/* <button onClick={() => handleDelete(vo)}>삭제</button> */}
                        </div>
                    )}
                    <button onClick={handleAdoptionOk}>입양완료</button>
                </div>
                <div className='date'>등록일 : {vo.enrollDate}</div>
                <img
                    src={vo.imagePath}
                    alt={'imageNo' + vo.imageNo}
                />
                <div className='name'><h4>이름 : {vo.dogName}</h4></div>
                <div className='breed'><h5>종 : {vo.breed}</h5></div>
                <div className='gender'><h5>성별 : {vo.genderMf}</h5></div>
                <div className='neutering'><h5>중성화 : {vo.neuteringOx}</h5></div>
                <div className='age'><h5>나이 : {vo.age}</h5></div>
                <div className='weight'><h5>몸무게 : {vo.weight}</h5></div>
            </div>
            
        </StyledAdoptionDetailItem>
    );
};

export default AdoptionDetailItem;
