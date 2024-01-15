import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledReportPageItemDiv = styled.div`
    grid-column: span 2;
    display: flex;
    flex-direction: row;
`;

const ReportPageItem = ( {pvo} ) => {

    const n = useNavigate();

    return (
        <StyledReportPageItemDiv>
            
                {/* 여기는 이전 버튼 !!! */}
                {pvo.startPage !== 1 && (
                    <Link Link to={`/board/report/list?pno=${pvo.startPage - 1}`}>이전</Link>
                )}
                
                {/* 여기는 페이징~~ */}
                {Array.from({ length: pvo.endPage - pvo.startPage + 1 }, (_, index) => {

                    const pageNumber = pvo.startPage + index;

                    return (

                        <div key={pageNumber}>

                            {pageNumber === pvo.currentPage ? 
                            ( <div>{pageNumber}</div>) : 
                            ( <Link to={`/board/report/list?pno=${pageNumber}`}>{pageNumber}</Link> )
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