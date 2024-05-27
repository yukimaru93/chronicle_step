import React from 'react';
import styled from 'styled-components';

export const ChangeIndex = (props) => {
    const {planIndexChange} = props

    return(
        <SDiv>
            <SButton onClick={planIndexChange}>最新の予定を表示</SButton>
            <SButton onClick={planIndexChange}>最新の予定を非表示</SButton>
        </SDiv>
    )
}

const SDiv = styled.div`
  position:absolute;
  top:150px;
  right:150px;
  @media screen and (max-width:500px){
      position:absolute;
      top:160px;
      right:70px;
  }
`

const SButton = styled.button`
  background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
  color: #000000;
  border: 1px solid black;
  border-radius: 10px;
  margin-right:10px;
`