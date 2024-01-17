import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';
import AoptionNewsDetail from './AoptionNewsDetail';

const AdoptionNewsMain = () => {
    const jsonStr1 = sessionStorage.getItem("loginMemberVo");
    const sessionLoginMemberVo = JSON.parse(jsonStr1);

    // memberNo와 imageNo를 session storage에서 가져와서 React 상태로 설정합니다.
    const [memberNo, setMemberNo] = useState();
    const [imageNo, setImageNo] = useState(); // imageNo 상태 추가

    // const handleClick = () => {
    //     setMemberNo("새로운 값");
    // };

    useEffect(() => {
        if(sessionLoginMemberVo) {
            setMemberNo(sessionLoginMemberVo.memberNo);
            setImageNo(sessionLoginMemberVo.imageNo); // 이미지 번호를 설정합니다.
        }
    }, [sessionLoginMemberVo]);

    return (
        <div>
            {/* <button onClick={handleClick}>클릭하여 memberNo 변경</button> */}
            <Routes>
                <Route path='/write' element={<AdoptionNewsWrite memberNo={memberNo} imageNo={imageNo} />} />
                <Route path='/list' element={<AdoptionNewsList />} />
                <Route path='/detail' element={<AoptionNewsDetail />} />
            </Routes>
        </div>
    );
};

export default AdoptionNewsMain;
