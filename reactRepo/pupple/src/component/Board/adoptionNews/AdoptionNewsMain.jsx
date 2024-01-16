import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';

const AdoptionNewsMain = () => {
    const [memberNo, setMemberNo] = useState(null);
    const [imageNo, setImageNo] = useState(null);

    useEffect(() => {
        // 서버에서 memberNo와 imageNo 값을 받아옴 (예: API 호출)
        // 예를 들어 fetch 또는 axios를 사용하여 서버에서 데이터를 가져올 수 있습니다.
        // 데이터를 가져오는 로직을 여기에 작성하세요.
        fetch('http://127.0.0.1:8080/app/adoptionNews')
            .then((response) => response.json())
            .then((data) => {
                setMemberNo(data.memberNo);
                setImageNo(data.imageNo);
            })
            .catch((error) => {
                console.error('데이터를 가져오는 중에 오류가 발생했습니다.', error);
            });
    }, []);

    return (
        <Routes>
            <Route
                path='/write'
                element={<AdoptionNewsWrite memberNo={memberNo} imageNo={imageNo} />}
            />
            <Route path='/list' element={<AdoptionNewsList />} />
        </Routes>
    );
};

export default AdoptionNewsMain;
