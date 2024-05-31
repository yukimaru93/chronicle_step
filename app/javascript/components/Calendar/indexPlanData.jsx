import React,{useState} from 'react';
import styled from 'styled-components';



export const IndexPlanData = (props) => {
    const {onClickDate, fullEventData, monthYearData} = props
    const [active, setActive] = useState(false)


    return(
      <SWrapper $active={active} >
        <SDivButton onClick={() => setActive(!active)}>
          {active ? '▼' : '▲'}
        </SDivButton>
        <SDiv>
          {fullEventData.map((plan,index) => (
            <SDivPlan
              key={index}
              onClick={() => onClickDate(plan.year,plan.month,plan.date)}
              currentDate={(monthYearData.year == plan.year)&&(monthYearData.month == plan.month)}  
            >
              <SDivDate>
                {plan.year}年 {plan.month}月 {plan.date}日
              </SDivDate>
              <SDivContent>
                {plan.content}
              </SDivContent>
            </SDivPlan>
          ))}
        </SDiv>
      </SWrapper>
    )
}

const SWrapper = styled.div`
  height:${props => props.$active ? "50%" : "20%" };
  width:100%;
  z-index:30;
  position: fixed;
  bottom:0;
  @media screen and (max-width:500px){
    height:${props => props.$active ? "50%" : "25%" };
  }
`

const SDivButton = styled.div`
  height:30px;
  width:40px;
  padding-top:10px;
  text-align:center;
  z-index:30;
  background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
  font-weight:bold;
  cursor: pointer;
`

const SDivContent = styled.div`
  font-size:16px;
  margin:0 0 0 20px;
  @media screen and (max-width:500px){
    font-size:14px;
  }
`

const SDivDate = styled.div`
  font-size:10px;
  margin-left:10px;
`

const SDivPlan = styled.div`
  width:96%;
  height:60px;
  background-color:${props => props.currentDate ? "#CCCC66" : "#ffffff" };
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
  height: calc(100% - 30px);
  overflow: auto;
  z-index:30;
  opacity: 0.8;
`