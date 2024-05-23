import React from 'react';
import styled from 'styled-components';

export const FormView = (props) => {
    const {selectCalendarData, submitPlan, formData, enterContent, closeForm} = props;

    return(
        <div>
          <div>
            <SForm onSubmit={submitPlan}>
              <h3> {selectCalendarData} 日の予定を追加</h3>
              <textarea
                type="text"
                name="content"
                className="plan-textarea"
                value={formData.content}
                onChange={enterContent}
                placeholder="予定を入力"
                required
              ></textarea>
              <button type="submit" className="plan-save">保存</button>
            </SForm>
          </div>
          <SButton onClick={closeForm}>×</SButton>
        </div>
    )
};

const SButton = styled.button`
  z-index: 10;
  position: fixed;
  top: 130px;
  right: 310px;
  width: 40px;
`;


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