import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionDetailItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e5d8fd44;
    text-align: center;
    padding-bottom: 20px;

    div {
        padding: 7px;
    }

    img {
        width: 450px;
        height: 550px;
        padding: 30px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
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

    .controlArea {
        /* margin-top: 20px; */
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
    }
    .editBtn {
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #cfb7fd;
        color: #fff;
    }

    .okBtn {
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #cfb7fd;
        color: #fff;
    }
    

    form {
        width: 100%;
        padding: 20px;
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

    
    const loginAdminVo = JSON.parse(sessionStorage.getItem("loginAdminVo"));
    const adminNo = loginAdminVo ? loginAdminVo.adminNo : null;
    const loginMemberVo = loginAdminVo ? loginAdminVo.loginMemberVo : null;
    const memberNo = loginMemberVo ? loginMemberVo.memberNo : null;
    const showWriteButton = !!loginAdminVo && memberNo !== 1;
    
    
    const handleEdit = (vo) => {
        console.log("edit vo ::: ", vo);
        navigate("/board/adoption/write", { state: { vo } });
    };

  

    const handleAdoptionOk = () => {
        // 입양완료 버튼 클릭 시 실행되는 로직
        // 서버에 해당 게시글을 입양완료 상태로 업데이트하는 요청을 보낼 수 있습니다.
        // 이후 입양완료 게시판으로 이동
        // 아래는 예시 코드
        console.log("complete vo 확인 : ", vo);
        // const adoptionCompleteYn = 'Y';
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

    

    return (
        <>
            <StyledAdoptionDetailItem>
                <div className='detailArea'>
                    <div>
                        {currentAdmin && (
                            // <div className='controlArea'>
                                <button className='eidtBtn' onClick={() => handleEdit(vo)}>수정</button>
                            // </div>
                        )}
                        {showWriteButton && (
                            <button className='okBtn' onClick={handleAdoptionOk}>입양완료</button>
                        )}
                        <img
                            src={vo.imagePath}
                            alt={'imageNo' + vo.imageNo}
                        />
                         <form>
                            <tr>
                                <td>입소일</td>
                                <td>{vo.admissionDate}</td>
                            </tr>
                            <tr>
                                <td>{vo.dogName}</td>
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
                                <td>접종</td>
                                <td>{vo.inoculationOx}</td>
                            </tr>
                            <tr>
                                <td>나이</td>
                                <td>{vo.age}</td>
                            </tr>
                            <tr>
                                <td>몸무게</td>
                                <td>{vo.weight}</td>
                            </tr>
                         </form>
                    </div>
                </div>
                
            </StyledAdoptionDetailItem>
        </>
    );
};

export default AdoptionDetailItem;
