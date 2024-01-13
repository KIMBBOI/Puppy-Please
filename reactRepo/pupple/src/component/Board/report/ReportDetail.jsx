import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReportDetailItem from './ReportDetailItem';

const StyledDetailDiv = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    place-items: center center;
`;



const ReportDetail = () => {

    const [vo , setVo ] = useState();

    let reportNo = 1; // 게시글 번호는 1번으로 고정 ( 받아와야 함 )

    useEffect( ()=>{
        // 여기 - 렌더링 멈춰야함 ************** 

        fetch("http://127.0.0.1:8080/app/report/detail" , {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({"reportNo":reportNo}),
            // 여기 - 객체로 보내야 함 **************
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log(data.msg);
            console.log(data.dbVo);
            setVo(data.dbVo);
        } )
        ;
    } , [reportNo] );
        // 여기 - reportNo 바뀔때 마다 렌더링 **************

    return (
        <StyledDetailDiv>
            {vo ? (
                <ReportDetailItem key={vo.reportNo} a={vo.title} b={vo.imagePath} c={vo.content} />
            ) : (
                <div>Loading...</div>
            )}
        </StyledDetailDiv>
    );
};

export default ReportDetail;
