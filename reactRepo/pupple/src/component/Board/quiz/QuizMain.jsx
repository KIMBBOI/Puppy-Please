import React, { useState } from 'react';
import styled from 'styled-components';
import QuizData from './QuizData';

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
        width: 30%; /* 너비를 30%로 고정 */
        padding: 12px 0;
        border: none;
        border-radius: 5px;
        background-color: #C8ADFF;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px;
        display: block; /* 블록 레벨 요소로 변경 */
        margin: 0 auto; /* 가운데 정렬 추가 */
    }


    & button[type="submit"]:hover {
        background-color: #A080FF;
    }

`;

const QuizMain = () => {
  const quizData = QuizData;

  // 현재 질문의 인덱스와 사용자의 선택을 관리하는 상태 변수를 설정합니다.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  // 다음 질문으로 이동하는 함수를 정의합니다.
  const moveToNextQuestion = () => {
    // 다음 질문이 있는지 확인하고, 마지막 질문이 아니라면 다음 질문으로 이동합니다.
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
    } else {
      // 마지막 질문일 경우, 결과 페이지로 이동하거나 다른 작업을 수행할 수 있습니다.
      // 예를 들어, 점수를 계산하고 결과를 표시할 수 있습니다.
      alert('퀴즈가 종료되었습니다.');
    }
  };

  // 사용자의 답변을 처리하는 함수를 정의합니다.
  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    // 여기에서 사용자의 답변을 확인하고 적절한 처리를 수행합니다.
    // 예를 들어, 정답을 확인하고 점수를 업데이트할 수 있습니다.
    alert(`사용자의 답변은: ${userAnswer}`);
    moveToNextQuestion();
  };

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
                      value={quizData[currentQuestionIndex].select1}
                      checked={userAnswer === quizData[currentQuestionIndex].select1}
                      onChange={() =>
                        setUserAnswer(quizData[currentQuestionIndex].select1)
                      }
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
                      value={quizData[currentQuestionIndex].select2}
                      checked={userAnswer === quizData[currentQuestionIndex].select2}
                      onChange={() =>
                        setUserAnswer(quizData[currentQuestionIndex].select2)
                      }
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
                      value={quizData[currentQuestionIndex].select3}
                      checked={userAnswer === quizData[currentQuestionIndex].select3}
                      onChange={() =>
                        setUserAnswer(quizData[currentQuestionIndex].select3)
                      }
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
                      value={quizData[currentQuestionIndex].select4}
                      checked={userAnswer === quizData[currentQuestionIndex].select4}
                      onChange={() =>
                        setUserAnswer(quizData[currentQuestionIndex].select4)
                      }
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
    </StyledQuizDiv>
  );
};

export default QuizMain;
