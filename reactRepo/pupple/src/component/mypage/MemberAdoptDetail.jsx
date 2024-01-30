    import React, { useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import styled from 'styled-components';

    const StyledMemberAdoptDetail = styled.div`
    padding: 20px;
    background-color: #f0f0f0;
    `;

    const Form = styled.form`
    margin: 20px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    `;

    const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    `;

    const InputRow = styled.tr`
    & > td {
        padding: 10px;
        text-align: left;
    }
    `;

    const Input = styled.input`
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    `;

    const SubmitButton = styled.input`
    width: 50%;
    padding: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: #C8ADFF;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #A080FF;
    }
    `;

    const Textarea = styled.textarea`
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    `;

    const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;

    input[type='radio'] {
        margin-right: 5px;
    }
    `;
    const MemberAdoptDetail = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo;
        const adoptVo = location.state.selectedAdopt;
        const surveyVo = location.state.selectedSurveyData;
        const rescueDogNo = adoptVo.rescueDogNo;

        const [vo, setVo] = useState({
            memberNo: memberNo,
            rescueDogNo : rescueDogNo,
            dogName: adoptVo.dogName,
            decisionTime: adoptVo.decisionTime,
            mainReason: adoptVo.mainReason,
            familyMembers: adoptVo.familyMembers,
            currentPets: adoptVo.currentPets,
            landlordPermissionYn: adoptVo.landlordPermissionYn,
            conflictResolution: adoptVo.conflictResolution
        });

        const [vo2, setVo2] = useState({
            memberNo: memberNo,
            rescueDogNo: rescueDogNo,
            residence: surveyVo.residence, 
            job: surveyVo.job,
            housingType: surveyVo.housingType, 
            maritalStatusYn: surveyVo.maritalStatusYn,
        })
        const handleInputChange = (event) => {
            const {name, value}  = event.target;
            setVo({
                ...vo,
                [name] : value,
            });
        };
        const handleInputChange2 = (event) => {
            const { name, value } = event.target;
            setVo2({
                ...vo2,
                [name]: value,
            });
        };

        if(!adoptVo){
            return <div>선택된 입양 정보가 없습니다.</div>
        }
        const handleAdoptSubmit = (event) => {
            event.preventDefault();

            fetch('http://127.0.0.1:8080/app/member/mypage/editApply', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vo),
            })
            .then( resp => resp.json())
            .then( (data)=> {
                if(data.msg === "good"){
                    alert("입양신청서 수정 완료");
                    navigate(-1);
                }else{
                    alert("입양신청서 수정 실패");
                }
            })
        }
        const handleSurveySubmit = (event) => {
                event.preventDefault();

                fetch('http://127.0.0.1:8080/app/member/mypage/editSurvey', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vo2),
                })
                .then( resp => resp.json())
                .then( (data) => {
                    if(data.msg === "good"){
                        alert("설문정보 수정 완료");
                        navigate(-1);
                    }else{
                        alert("설문정보 수정 실패");
                    }
                })

        }
        return (
            <StyledMemberAdoptDetail>
                <Form onSubmit={handleAdoptSubmit}>
                    <Table>
                        <tbody>
                            <InputRow>
                                <td><Input type='text' name = 'memberNo' value={memberNo} hidden onChange={handleInputChange}/></td>
                            </InputRow>
                            <InputRow>
                                <td>입양견 이름</td>
                                </InputRow>
                            <InputRow>
                                <td><Input type='text' name = 'dogName' value={vo.dogName} placeholder={adoptVo.dogName} onChange={handleInputChange} disabled/></td>
                            </InputRow>
                            <InputRow>
                                <td>입양을 결정하시기 까지 얼마나 오랜 시간을 고민하셨나요?</td>
                                </InputRow>
                            <InputRow>
                                <td><Input type='text' name='decisionTime' value={vo.decisionTime} placeholder='고민한 시간' onChange={handleInputChange}/></td>
                            </InputRow>
                            <InputRow>
                                <td>입양을 원하시는 가장 큰 이유는 무엇인가요?</td>
                                </InputRow>
                            <InputRow>
                                <td><Textarea name="mainReason" value={vo.mainReason} onChange={handleInputChange} placeholder='입양을 원하시는 가장 큰 이유' /></td>
                            </InputRow>
                            <InputRow>
                                <td>가족 구성원은 몇 명인가요? 구성원을 소개해주세요.</td>
                                </InputRow>
                            <InputRow>
                                <td><Textarea name="familyMembers" value={vo.familyMembers} onChange={handleInputChange} placeholder='가족 구성원' /></td>
                            </InputRow>
                            <InputRow>
                                <td>키우고 계신 반려동물이 있나요? 있다면 소개해주세요.</td>
                                </InputRow>
                            <InputRow>
                                <td><Textarea name="currentPets" value={vo.currentPets} onChange={handleInputChange} placeholder='키우고 계신 반려동물'/></td>
                            </InputRow>
                            <InputRow>
                                <td>임대한 주택의 경우 집주인의 동의를 얻으셨나요?</td>
                                </InputRow>
                            <InputRow>
                            <td>
                                <RadioLabel>
                                <Input
                                    type='radio'
                                    name='landlordPermissionYn'
                                    value='Y'
                                    onChange={handleInputChange}
                                    checked={vo.landlordPermissionYn === 'Y'} 
                                />
                                예
                                </RadioLabel>
                                <RadioLabel>
                                <Input
                                    type='radio'
                                    name='landlordPermissionYn'
                                    value='N'
                                    onChange={handleInputChange}
                                    checked={vo.landlordPermissionYn === 'N'} 
                                />
                                아니오
                                </RadioLabel>
                            </td>
                            </InputRow>
                            <InputRow>
                                <td>소음이나 위생 등으로 인한 이웃과의 마찰로 입양동물의 양육이 불가능해질 경우 어떻게 하실건가요?</td>
                                </InputRow>
                            <InputRow>
                                <td><Textarea name="conflictResolution" value={vo.conflictResolution} onChange={handleInputChange} placeholder='분쟁 시 해결방안'/></td>
                            </InputRow>
                            <InputRow>
                                <td rowSpan={2}><SubmitButton type='submit' value='수정하기' /></td>
                            </InputRow>
                        </tbody>
                    </Table>
                </Form>
                <Form onSubmit={handleSurveySubmit}>
                    <Table>
                        <tbody>
                            <InputRow>
                                <td><Input type='text' name='memberNo' onChange={handleInputChange2} value={memberNo} hidden/></td>
                                <td><Input type='text' name='rescueDogNo' onChange={handleInputChange2} value={rescueDogNo} hidden/></td>
                            </InputRow>
                            <InputRow>
                                <td>거주지(시, 군, 구)를 작성해 주세요</td>
                                <td><Input type='text' name = 'residence' placeholder='거주지' value={vo2.residence} onChange={handleInputChange2}/></td>
                            </InputRow>
                            <InputRow>
                                <td>직업을 작성해 주세요</td>
                                <td><Input type='text' name='job' placeholder='직업' value={vo2.job} onChange={handleInputChange2}/></td>
                            </InputRow>
                            <InputRow>
                                <td>주거형태를 작성해 주세요</td>
                                <td><Input type='text' name='housingType' placeholder='주택, 빌라, 아파트 등등' value={vo2.housingType} onChange={handleInputChange2}/></td>
                            </InputRow>
                            <InputRow>
                                <td>결혼 여부를 작성해 주세요</td>
                                <td><Input type='text' name='maritalStatusYn' placeholder='Y / N' value={vo2.maritalStatusYn}  onChange={handleInputChange2}/></td>
                            </InputRow>
                            <InputRow>
                                <td rowSpan={2}><SubmitButton type='submit' value='수정하기' /></td>
                            </InputRow>
                        </tbody>
                    </Table>
                </Form>
            </StyledMemberAdoptDetail>
        );
    };

    export default MemberAdoptDetail;