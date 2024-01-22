import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionApply = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 10px;
  }

  input[type='text'],
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type='checkbox'] {
    margin-right: 5px;
  }

  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }

  button:hover {
    background-color: #45a049;
  }

  h1, h2 {
    color: #333;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.6;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  ul li {
    padding-left: 20px;
    text-indent: -20px;
  }

  ul li:before {
    content: '•';
    padding-right: 10px;
    color: #4CAF50;
  }
`;


const AdoptionApply = () => {

    const navigate = useNavigate();
    const location = useLocation();

    let rescueDogVo = location.state.rescueDogVo;
    const [formData, setFormData] = useState({
        memberNo: JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo,
        rescueDogNo: rescueDogVo.rescueDogNo,
        decisionTime: '',
        mainReason: '', 
        familyMembers: '', 
        currentPets: '',
        landlordPermissionYN: '', 
        conflictResolution: '',
    });

    const handleChange = (event) => {
        const {name, type, value, checked} = event.target;
        if(type === 'radio'){
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }else{
            setFormData(prevState => ({
                ...prevState,
                [name] : type === 'checkbox' ? checked : value
            }));
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://127.0.0.1:8080/app/board/adoption/apply', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(resp => resp.json()) 
        .then((data) => {
            if(data.msg === "good"){
                alert("입양신청이 완료됐습니다.");
                navigate("/");
            }
        })
    }

    

    return (
        <StyledAdoptionApply>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>개인정보 수집 및 이용에 대한 동의</label>
                    <div>
                        <ul>
                            <li>
                                수집하는 개인정보의 항목: 성명, 주소, 이메일, 휴대전화번호
                            </li>
                            <li>
                                개인정보의 수집, 이용 목적 : 본 서명의 목적에 맞는 퍼플의 캠페인에 활용하고, 추후 전개되는 바에 대한 소식을 전달하기 위함
                            </li>
                            <li>
                                개인정보의 보유 및 이용기간: 5년(관계법령에서 정한 일정한 기간)
                            </li>
                        </ul>
                    </div>
                    <p>
                        카라는 법률에서 정하는 경우를 제외하고는 귀하의 동의 없어 개인정보을 제3자에게 제공하지 않습니다. 
                        <br />
                        문의 : 02-3482-0999 / info@epupple.org
                    </p>
                    <label>
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                    /> 개인정보 이용에 동의합니다
                    </label>
                    <br />
                    <hr />
                    <br />
                    <label>
                    1. 입양을 희망하는 동물의 이름을 적어주세요.
                    <input 
                        type="text" 
                        name="petName" 
                        value={formData.petName} 
                        onChange={handleChange} 
                    />
                    </label>

                    <label>
                    2. 입양을 결정하시기 까지 얼마나 오랜 시간을 고민하셨나요?
                    <input 
                        type="text" 
                        name="decisionTime" 
                        value={formData.decisionTime} 
                        onChange={handleChange} 
                    />
                    </label>

                    <label>
                    3. 입양을 원하시는 가장 큰 이유는 무엇인가요?
                    <textarea 
                        name="mainReason" 
                        value={formData.mainReason} 
                        onChange={handleChange} 
                    />
                    </label>

                    <label>
                    4. 가족 구성원은 몇 명인가요? 구성원을 소개해주세요.
                    <textarea 
                        name="familyMembers" 
                        value={formData.familyMembers} 
                        onChange={handleChange} 
                    />
                    </label>

                    <label>
                    5. 키우고 계신 반려동물이 있나요? 있다면 소개해주세요.
                    <textarea 
                        name="currentPets" 
                        value={formData.currentPets} 
                        onChange={handleChange} 
                    />
                    </label>

                    <label>
                    6. 임대한 주택의 경우 집주인의 동의를 얻으셨나요?
                    <div>
                        <label>
                        <input
                            type="radio"
                            name="landlordPermissionYN"
                            value="Y"
                            checked={formData.landlordPermissionYN === 'Y'}
                            onChange={handleChange}
                        />
                        예
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="landlordPermissionYN"
                            value="N"
                            checked={formData.landlordPermissionYN === 'N'}
                            onChange={handleChange}
                        />
                        아니오
                        </label>
                    </div>
                    </label>
                    <br />
                    <label>
                    7. 소음이나 위생 등으로 인한 이웃과의 마찰로 입양동물의 양육이 불가능해질 경우 어떻게 하실건가요?
                    <textarea 
                        name="conflictResolution" 
                        value={formData.conflictResolution} 
                        onChange={handleChange} 
                    />
                    </label>
                </section>
                <section>
                <h2>입양동의</h2>
                
                <p>
                    본인(이하 '입양인'이라 합니다.)은 '동물권행동' 카라 (이하 '단체'라 합니다.)를 통하여 반려동물(이하 '입양동물'이라 합니다.)을 입양함에 있어 입양동물이 자연사하는 시점까지 책임 있는 보호자로서 입양동물에게 최적의 환경과 보살핌을 제공할 것이며 최선을 다하여 입양동물을 보호할 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement1"
                    checked={formData.agreement1}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>
                
                <p>
                    입양인은 입양인이나 혹은 가족을 포함한 제 3자의 고의 또는 과실로 인하여 입양동물에 대한 학대행위가 발생하거나 입양동물이 양도, 매매, 유기, 유실된 경우에는 단체로부터의 어떠한 민, 형사상의 처벌에도 이의를 제기하지 않고 따르는데 동의합니다. 입양인은 입양동물이 양도, 매매, 유기, 유실된 경우에 그 즉시로 단체에 통지할 의무를 지니며 입양동물을 되찾기 위한 노력에 최선을 다하여 협조할 의무가 있습니다.
                </p>
                <label>
                <input
                    type="checkbox"
                    name="agreement2"
                    checked={formData.agreement2}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>

                <p>
                    입양인은 입양동물에게 양질의 사료와 깨끗한 물을 공급할 의무가 있습니다.
                    동의합니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement3"
                    checked={formData.agreement3}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>

                <p>
                    만일 입양동물이 질병에 걸렸을 때 입양인은 신속하게 필요한 수의학적 치료를 받게 하고 성실하게 그 치료에 임할 것이며 만일 입양동물의 완치가 불가능하고 그 고통이 극심한 경우에는 이를 단체에 통지하고 단체와의 협의 하에 대안을 강구하여야 하며 임의로 처리해서는 안 됩니다. 입양인은 입양동물이 자연사한 경우에도 즉시 이 사실을 단체에 통지할 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement4"
                    checked={formData.agreement4}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>

                <p>
                    입양인은 상시 입양동물에게 입양인의 연락처가 기재된 이름표를 반드시 착용시켜야 하며 만일 입양인의 연락처가 변경되거나 주거지의 변동사항이 있을 시에는 즉시 단체에 이에 대한 정보를 통지할 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement5"
                    checked={formData.agreement5}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>

                <p>
                    입양인은 입양 후 단체에서 시행하는 입양동물의 모니터링을 위한 전화 또는 방문에 응할 것이며 단체가 입양동물의 면회나 사진을 요구할 시 언제든지 이에 협조할 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement6"
                    checked={formData.agreement6}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>

                <p>
                    입양인은 단체의 입양동물 중성화수술 방침에 동의하며, 입양 전에 미리 중성화수술이 시행될 수 없는 경우에는 입양동물의 건강상태가 양호하고 그 연령이 수술하기에 적합한 조건이 갖추어지는 즉시로 중성화수술을 시행하고 이에 대한 사실을 즉시 단체에 통지하며 중성화수술 전이라 할지라도 그 어떠한 경우에도 입양동물을 교배하지 않을 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement7"
                    checked={formData.agreement7}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>
                <p>
                    입양인은 개인적인 사유로 파양을 하는 경우에는, 반드시 단체에게 통보해야 하며 임의대로 재입양할 수 없습니다. 또한, 단체에게 입양비 반환을 청구할 수 없습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement8"
                    checked={formData.agreement8}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>
                <p>
                    입양인은 입양 후에도, 만일 단체에서 입양인이 입양동물을 돌볼 여건과 환경이 적합하지 않다고 판단하여 입양동물의 반환을 요구하는 경우에는 이에 이의를 제기하지 않고 적극 협조할 의무가 있습니다.
                </p>
                <label>
                    <input
                    type="checkbox"
                    name="agreement9"
                    checked={formData.agreement9}
                    onChange={handleChange}
                    />
                    동의합니다.
                </label>
                <p>
                    입양인은 이하에 서명함으로써 상기의 조항에 동의하며, 입양인이 상기의 조항을 위반 시에는 단체의 어떠한 처벌조치에도 이의를 제기함이 없이 따를 것을 서약합니다.
                </p>
                </section>
                <button type="submit">등록</button>
        </form>
        </StyledAdoptionApply>
    );
};

export default AdoptionApply;
