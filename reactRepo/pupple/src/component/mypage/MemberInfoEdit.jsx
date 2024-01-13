import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MemberInfoEdit = () => {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [vo, setVo] = useState({
    memberNo: '',
    pwd: '',
    pwd2: '',
    nick: '',
    phoneNumber: '',
    email: '',
    birthday: '',
  });
  const originalNick = ''; // 이전 닉네임을 여기에 설정하세요
  const originalPhoneNumber = ''; // 이전 전화번호를 여기에 설정하세요
  const originalEmail = ''; // 이전 이메일을 여기에 설정하세요
  const originalBirthday = ''; // 이전 생년월일을 여기에 설정하세요

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVo({
      ...vo,
      [name]: value,
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const updatedFields = {};

    if (vo.pwd !== vo.pwd2) {
      setPasswordMatchError(true);
      setIsFetching(false);
      return;
    }

    if (vo.nick !== originalNick) {
      updatedFields.nick = vo.nick;
    }

    if (vo.phoneNumber !== originalPhoneNumber) {
      updatedFields.phoneNumber = vo.phoneNumber;
    }

    if (vo.email !== originalEmail) {
      updatedFields.email = vo.email;
    }

    if (vo.birthday !== originalBirthday) {
      updatedFields.birthday = vo.birthday;
    }

    if (Object.keys(updatedFields).length === 0) {
      setIsFetching(false);
      return;
    }

    const requestBody = {
      ...vo,
      ...updatedFields,
    };

    fetch('http://127.0.0.1:8080/app/mypage/memberInfoEdit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('회원정보수정 fetch 실패');
        }
        return resp.json();
      })
      .then((data) => {
        if (data.msg === 'good') {
          alert('회원정보수정 성공');
          navigate('/mypage');
        } else {
          alert('회원정보수정 실패');
        }
      })
      .catch((e) => {
        console.log(e);
        alert('회원정보 수정 실패');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleComparePwd = () => {
    if (vo.pwd !== vo.pwd2) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="memberNo"
                  value={vo.memberNo}
                  onChange={handleInputChange}
                  hidden
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input type="password" name="pwd" onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input
                  type="password"
                  name="pwd2"
                  value={vo.pwd2}
                  onChange={handleInputChange}
                  onBlur={handleComparePwd}
                />
                {passwordMatchError && (
                  <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>닉네임</td>
              <td>
                <input type="text" name="nick" onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input type="text" name="phoneNumber" onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input type="email" name="email" onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>생년월일</td>
              <td>
                <input type="text" name="birthday" onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="정보 수정" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default MemberInfoEdit;
