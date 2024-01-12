import React, { useState } from 'react';

const AdoptionOkWrite = () => {
  const [dogInfo, setDogInfo] = useState({
    name: '',
    breed: '',
    gender: '',
    neutered: false,
    age: '',
    weight: '',
    color: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setDogInfo({
      ...dogInfo,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 데이터를 전송하는 API 호출 구현
    // POST 요청을 사용하여 dogInfo를 서버로 전송
    // 성공 시 처리
  };

  return (
    <div>
      <h2>입양 정보 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dogInfo.name}
            onChange={handleChange}
          />
        </div>
        {/* 다른 유기견 정보 입력 필드들 추가 */}
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default AdoptionOkWrite;
