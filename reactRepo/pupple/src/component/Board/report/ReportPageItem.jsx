import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledReportPageItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    place-items: center;
    
    .pageNumber {
        padding: 0 5px 0 5px;
        margin: 5px 5px 5px 5px;;
    }
    .selectPage {
        padding: 0 5px 1px 5px;
        margin: 5px 5px 5px 5px;;
        border: 1px solid #ddd;
        color: #000000;
    }
`;

const ReportPageItem = ( {pvo} ) => {

    return (
        <StyledReportPageItemDiv>
            
                {/* 여기는 이전 버튼 !!! */}
                {pvo.startPage !== 1 && (
                    <Link to={`/board/report/list?pno=${pvo.startPage - 1}`}>이전</Link>
                )}
                

                {/* 여기는 페이징~~ */}
                {Array.from({ length: pvo.endPage - pvo.startPage + 1 }, (_, index) => {

                    const pageNumber = pvo.startPage + index;

                    return (

                        <div key={pageNumber}>

                            {
                                pageNumber === pvo.currentPage 
                                ? 
                                    ( <div className='selectPage'>{pageNumber}</div> ) 
                                : 
                                    ( <Link className='pageNumber' to={`/board/report/list?pno=${pageNumber}`}>{pageNumber}</Link> )
                                // 11. 백틱 사용해야 올바름 템플릿 리터럴임. 참고할 것 ************************************************
                            }

                        </div>

                    );
                })}


                {/* 여기는 다음 버튼 !!! */}
                {pvo.endPage !== pvo.maxPage && (
                    <Link to={`/board/report/list?pno=${pvo.endPage + 1}`}>다음</Link>
                )}

                
               
        </StyledReportPageItemDiv>
    );
};

export default ReportPageItem;