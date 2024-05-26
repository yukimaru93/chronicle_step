import React from 'react';
import styled from 'styled-components';

export const FormView = (props) => {
    const {selectCalendarData, submitPlan, formData, enterContent, closeForm, clearForm} = props;

    return(
        <div>
          <div>
            <SForm onSubmit={submitPlan}>
              <SDiv>
                <h3>{selectCalendarData.month}月 {selectCalendarData.date}日の予定を追加</h3>
                <SClearButton onClick={clearForm}>予定を削除する</SClearButton>
              </SDiv>
              <STextarea
                type="text"
                name="content"
                className="plan-textarea"
                value={formData.content}
                onChange={enterContent}
                placeholder="予定を入力"
                required
              ></STextarea>
              <SSubmitButton type="submit" className="plan-save">保存</SSubmitButton>
            </SForm>
          </div>
          <SButton onClick={closeForm}>×</SButton>
        </div>
    )
};

const STextarea = styled.textarea`
  display: inline-block;
  width: 90%;
  height: 150px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  line-height: 1.5em;
  margin: 10px 0 10px 0;
  @media screen and (max-width:500px){
    height: 130px;
  }
`

const SSubmitButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 45%;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black;
  box-shadow: 0 3px #808080;
  letter-spacing: 10px;
  font-size: 18px;
  background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
  @media screen and (max-width:500px){
    height: 30px;
    font-size: 16px;
  }
`

const SButton = styled.button`
  z-index: 10;
  position: fixed;
  top: 130px;
  right: 310px;
  width: 40px;
  background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
  box-shadow: 0 3px #808080;
  border-radius: 10px;
  border: 1px solid black;
  @media screen and (max-width:500px){
    position: fixed;
    top: 130px;
    right: 10px;
  }
`;

const SDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-item:center;
  padding-right:40px;
  padding-left:50px;
  @media screen and (max-width:500px){
    padding-right:10px;
    padding-left:20px;
  }
`;

const SClearButton = styled.button`
  background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
  box-shadow: 0 3px #808080;
  border-radius: 10px;
  border: 1px solid black;
  font-weight:bold;
`

const SForm = styled.form`
  z-index: 10;
  width: 60%;
  height: 50%;
  position: fixed;
  top: 150px;
  left: 150px;
  background-color: rgba(192, 192, 192, 0.9);
  padding-top: 20px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
`;