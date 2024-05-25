import React from 'react';
import styled from 'styled-components';

export const ChangeCalendar = (props) => {
    const {changeLastMonth, changeNextMonth} = props

    return(
        <SDiv>
            <button onClick={changeLastMonth}>先月へ</button>
            <button onClick={changeNextMonth}>来月へ</button>
        </SDiv>
    )
}


const SDiv = styled.div`
    position:absolute;
    top:150px;
    left:300px;
`;