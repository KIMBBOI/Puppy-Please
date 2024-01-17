import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';

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
        setMemberNo(sessionLoginMemberVo.memberNo);
        setImageNo(sessionLoginMemberVo.imageNo); // 이미지 번호를 설정합니다.
    }, [sessionLoginMemberVo.memberNo, sessionLoginMemberVo.imageNo]);

    return (
        <div>
            {/* <button onClick={handleClick}>클릭하여 memberNo 변경</button> */}
            <Routes>
                <Route
                    path='/write'
                    element={<AdoptionNewsWrite memberNo={memberNo} imageNo={imageNo} />} // imageNo를 AdoptionNewsWrite 컴포넌트로 전달합니다.
                />
                <Route path='/list' element={<AdoptionNewsList />} />
            </Routes>
        </div>
    );
};

export default AdoptionNewsMain;
