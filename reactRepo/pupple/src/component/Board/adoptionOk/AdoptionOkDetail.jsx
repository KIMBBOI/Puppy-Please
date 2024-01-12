import React, { useState, useEffect } from 'react';

const AdoptionOkDetail = ({ match }) => {
  const [dogInfo, setDogInfo] = useState(null);

  useEffect(() => {
    // 유기견 정보를 서버로부터 가져오는 API 호출
    // match.params.id 를 사용하여 특정 유기견 정보를 가져옴
  }, [match.params.id]);

  if (!dogInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>유기견 상세 정보</h2>
      <p>이름: {dogInfo.name}</p>
      {/* 다른 유기견 정보 표시 */}
    </div>
  );
};

export default AdoptionOkDetail;
