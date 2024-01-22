import React, { useState } from 'react';
import styled from 'styled-components';
import QuizData from './QuizData';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledQuizDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    padding: 20px;

    & form {
        background: white;
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: left; /* 왼쪽 정렬로 변경 */
    }

    & table {
        width: 100%;
        border-collapse: collapse;
    }

    & span {
        font-size: 20px;
        margin-bottom: 20px;
        display: block;
    }

    & label {
        display: block;
        margin-bottom: 10px;
    }

    & input[type="radio"] {
        margin-right: 5px;
    }

    & button[type="submit"] {
        width: 30%; 
        padding: 12px 0;
        border: none;
        border-radius: 5px;
        background-color: #C8ADFF;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px;
        display: block; 
        margin: 0 auto; 
    }


    & button[type="submit"]:hover {
        background-color: #A080FF;
    }

`;

const QuizMain = () => {
    const navigate = useNavigate();

    //유기견 정보 가져오기
    const location = useLocation();
    let rescueDogVo = location.state?.rescueDogVo;
    //퀴즈 데이터 불러오기
    const quizData = QuizData;
    //현재 퀴즈번호 셋팅하기
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    //유저가 선택한 답안 저장
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(''));
    //점수 변수 설정
    const [score, setScore] = useState(0);
    //합격점수
    const passingScore =70;
    // 다음 질문으로 이동하는 함수를 정의
    const moveToNextQuestion = () => {
        // 다음 질문이 있는지 확인하고, 마지막 질문이 아니라면 다음 질문으로 이동
        if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('퀴즈가 종료되었습니다.');
            const calculatedScore = calculateScore();
            const totalScore = score + calculatedScore;
            setScore(totalScore);
            console.log(totalScore);
            if(totalScore >= passingScore){
                alert("합격");
            }else{
                alert("불합격");
                setCurrentQuestionIndex(0);
                setUserAnswers(Array(quizData.length).fill(''));
                setScore(0); //<- 점수 초기화
            }
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (quizData[i].answer === userAnswers[i]) {
                correctAnswers += 1; // 각 문제당 1점씩
            }
        }
        
        return correctAnswers * 10;//각 문제당 10점으로 변환
    };
    const handleAnswerSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const selectedAnswer = formData.get("answer"); // 사용자가 선택한 답변을 가져옵니다.
        
        let updatedUserAnswers = [...userAnswers]; // 기존의 userAnswers 배열을 복사합니다.
        updatedUserAnswers[currentQuestionIndex] = selectedAnswer; // 현재 질문의 인덱스에 사용자가 선택한 답변을 업데이트합니다.
        setUserAnswers(updatedUserAnswers); // 업데이트된 배열로 userAnswers 상태를 업데이트합니다.
        moveToNextQuestion();
    };

    const saveScoreToDB = (totalScore) => {
        const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));
        if(!loginMemberVo || !loginMemberVo.memberNo){
            alert("로그인 정보를 찾을 수 없습니다.");
            return;
        }

        const dataToSend = {
            memberNo: loginMemberVo.memberNo,
            score: totalScore,
        }
        console.log(dataToSend);
        fetch('http://127.0.0.1:8080/app/board/adoption/quiz',{
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
        .then( (resp) => {
            return resp.json();
        })
        .then((data) => {
            if(data.msg === "pass"){
                navigate("/board/adoption/apply", {state: {rescueDogVo}})
            }
        })

    }

    

    return (
        <StyledQuizDiv>
        {quizData.length > 0 && (
            <form onSubmit={handleAnswerSubmit}>
            <table>
                <tbody>
                <tr>
                    <td>
                    <span
                        dangerouslySetInnerHTML={{
                        __html: quizData[currentQuestionIndex].QuizContent,
                        }}
                    ></span>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                    <input
                        type="radio"
                        name="answer"
                        value={quizData[currentQuestionIndex].select1}
                        checked={userAnswers[currentQuestionIndex] === quizData[currentQuestionIndex].select1}
                        onChange={(e) => {
                            let updatedAnswers = [...userAnswers];
                            updatedAnswers[currentQuestionIndex] = e.target.value;
                            setUserAnswers(updatedAnswers);
                        }}
                        
                    />
                        {quizData[currentQuestionIndex].select1}
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                    <input
                    type="radio"
                    name="answer"
                    value={quizData[currentQuestionIndex].select2}
                    checked={userAnswers[currentQuestionIndex] === quizData[currentQuestionIndex].select2}
                    onChange={(e) => {
                        let updatedAnswers = [...userAnswers];
                        updatedAnswers[currentQuestionIndex] = e.target.value;
                        setUserAnswers(updatedAnswers);
                    }}
                    
                    />              
                        {quizData[currentQuestionIndex].select2}
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                    <input
                        type="radio"
                        name="answer"
                        value={quizData[currentQuestionIndex].select3}
                        checked={userAnswers[currentQuestionIndex] === quizData[currentQuestionIndex].select3}
                        onChange={(e) => {
                            let updatedAnswers = [...userAnswers];
                            updatedAnswers[currentQuestionIndex] = e.target.value;
                            setUserAnswers(updatedAnswers);
                        }}
                        
                    />
                        {quizData[currentQuestionIndex].select3}
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                    <input
                        type="radio"
                        name="answer"
                        value={quizData[currentQuestionIndex].select4}
                        checked={userAnswers[currentQuestionIndex] === quizData[currentQuestionIndex].select4}
                        onChange={(e) => {
                            let updatedAnswers = [...userAnswers];
                            updatedAnswers[currentQuestionIndex] = e.target.value;
                            setUserAnswers(updatedAnswers);
                        }}
                        
                    />
                        {quizData[currentQuestionIndex].select4}
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <button type="submit">다음 질문</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </form>
        )}
         {score > 70 && (
        <div>
          <p>퀴즈 점수: {score}점</p>
          <button onClick={saveScoreToDB(score)}>신청서 작성하기</button>
        </div>
        )}
        </StyledQuizDiv>
    );
};

export default QuizMain;
