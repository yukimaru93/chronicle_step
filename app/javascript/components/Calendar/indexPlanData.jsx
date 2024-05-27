import React from 'react';
import styled from 'styled-components';

export const IndexPlanData = (props) => {
    const {onClickDate, fullEventData} = props

    return(
        <SDiv>
          {fullEventData.map((plan,index) => (
            <DivPlan key={index} onClick={() => onClickDate(plan.year,plan.month,plan.date)}>
              <DivDate>
                {plan.year}年 {plan.month}月 {plan.date}日
              </DivDate>
              <DivContent>
                {plan.content}
              </DivContent>
            </DivPlan>
          ))}
        </SDiv>
    )
}

const DivContent = styled.div`
  font-size:16px;
  margin:0 0 0 20px;
  @media screen and (max-width:500px){
    font-size:14px;
  }
`

const DivDate = styled.div`
  font-size:10px;
  margin-left:10px;
`

const DivPlan = styled.div`
  width:96%;
  height:30%;
  background-color:#ffffff;
  color:#000000;
  margin: 10px 20px;
  overflow: auto;
  white-space: pre-wrap;
  @media screen and (max-width:500px){
    width:100%;
    margin:10px 0
  }
`



const SDiv = styled.div`
  width:100%;
  background-color:#000000;
  height: 40%;
  position: fixed;
  bottom:0;
  overflow: auto;
  z-index:30;
  opacity: 0.8;
`