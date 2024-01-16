import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';

const AdoptionNewsMain = () => {

    const jsonStr1 = sessionStorage.getItem("loginMemberVo");
    const sessionLoginMemberVo = JSON.parse(jsonStr1);

    // const jsonStr2 = sessionStorage.getItem("imagePath");
    // const sessionImagePath = JSON.parse(jsonStr2);
    // const [imagePath, setImagePath] = useState(sessionImagePath);
    

    // memberNo와 imageNo를 session storage에서 가져와서 React 상태로 설정합니다.
    const [memberNo, setMemberNo] = useState();
    const [imageNo, setImageNo] = useState();

    const handleChangeInput = (e) => {
        setMemberNo(e.target.value)
        setImageNo(e.target.value);
      };
      
    useEffect(() => {
        // fetch('http://127.0.0.1:8080/app/adoptionNews',{
        //     method: "post",
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then( resp => resp.json() )
        // .then( data => {
        //     setMemberNo(data.memberNo)
        //     setImageNo(data.imageNo);
        // } )
        // .catch( error => {
        //     console.error('데이터 가져오는 중에 오류 발생 : ' , error);
        // } );

        // session storage에서 데이터를 가져옵니다.
        // const memberNoFromStorage = sessionStorage.getItem("memberNo");
        // const imageNoFromStorage = sessionStorage.getItem("imageNo");

        // 가져온 데이터를 React 상태로 설정합니다.
        setMemberNo(sessionLoginMemberVo.memberNo);
        // setImageNo(sessionImagePath.imageNo);
    }, [sessionLoginMemberVo.memberNo]);

    return (
        <Routes>
            <Route
                path='/write'
                element={<AdoptionNewsWrite memberNo={memberNo} imageNo={imageNo} onClick={handleChangeInput} />}
               
                />
            <Route path='/list' element={<AdoptionNewsList />} />
        </Routes>
    );
};

export default AdoptionNewsMain;
