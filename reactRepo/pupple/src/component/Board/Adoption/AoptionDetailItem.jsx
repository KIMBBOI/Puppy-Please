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
    align-items: center;
    padding-bottom: 20px;

    div:nth-child(1){
        font-size: 24px;
        text-align: start;
        color: #333;
        margin: 10px 10px;
    }

    div {
        padding: 7px;
    }

    img {
        width: 500px;
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

    h3 {
        padding: 0;
        margin: 0 0 2px 0;
        font-size: 25px;
    }
    
    button {
        width: 97px;
        height: 30px;
        font-size: 14px;
        font-weight: 500;
        border: 1.5px solid #d1b8ffe9;
        border-radius: 20px;
        color: #ffff;
        cursor: pointer;
        margin: 0 30px 0 0;
    }

    .btnArea { margin: 0; }

    button:first-child {
        margin-right: 255px;
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

    {/* 
        < 예약내역 배열을 새로운 배열("HH:mm")로 만들기>
            1. 배열 생성
            2. 배열에서 문자열 추출
            3. Date 객체로 파싱
            4. "HH:mm" 부분만 추출
            5. 배열에 추가
                * .toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false})
                    - Date 객체에 사용 가능
                    - 반환값은 문자열
                    - 빈 배열은 현지 설정을 사용하겠다는 의미
                    - 시간을 2자리 숫자로, 분을 2자리 숫자로, 24시간 형식으로 표시
                        // ex.) 16시 00분 50초 -> 16:00
                * 날짜를 클릭하지 않았고 
    */}
    const admissionDate = [];
    if (vo) {
        for (let i = 0; i < vo.length; i++) {
          const formattedDate = new Date(vo[i]).toLocaleTimeString([], { 
                                                                                    year: '2-digit', 
                                                                                    month: '2-digit', 
                                                                                    hour12: false 
                                                                                 });
          admissionDate.push(formattedDate);
        }
    }

    

    return (
        <>
            <StyledAdoptionDetailItem>
                <div>입양신청 게시글</div>
                <div className='detailArea'>
                    <div>
                        <div className='btnArea'>
                            {currentAdmin && (
                                    <button className='eidtBtn' onClick={() => handleEdit(vo)}>수정</button>
                            )}
                            {showWriteButton && (
                                <button className='okBtn' onClick={handleAdoptionOk}>입양완료</button>
                            )}
                        </div>
                        <img
                            src={vo.imagePath}
                            alt={'imageNo' + vo.imageNo}
                        />
                    </div>
                    <form>
                        <tr>
                            <td>입소일</td>
                            <td>{vo.admissionDate.split(' ')[0]}</td>
                        </tr>
                        <tr>
                            <td><h3>{vo.dogName}</h3></td>
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
                            <td>{vo.age}살 추정</td>
                        </tr>
                        <tr>
                            <td>몸무게</td>
                            <td>{vo.weight}kg</td>
                        </tr>
                    </form>
                </div>
            </StyledAdoptionDetailItem>
        </>
    );
};

export default AdoptionDetailItem;
