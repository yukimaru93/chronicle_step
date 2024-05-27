import React from 'react';
import styled from 'styled-components';

export const ChangeCalendar = (props) => {
    const {changeLastMonth, changeNextMonth} = props

    return(
        <SDiv>
            <SButton onClick={changeLastMonth}>先月へ</SButton>
            <SButton onClick={changeNextMonth}>来月へ</SButton>
        </SDiv>
    )
}

const SButton = styled.button`
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    color: #000000;
    border: 1px solid black;
    border-radius: 10px;
    margin-right:10px;
`


const SDiv = styled.div`
    position:absolute;
    top:150px;
    left:300px;
    @media screen and (max-width:500px){
        position:absolute;
        top:120px;
        left:230px;
    }
`;