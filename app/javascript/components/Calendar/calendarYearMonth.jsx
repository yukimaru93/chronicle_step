import React from 'react';
import styled from 'styled-components';

export const CalendarYearMonth = (props) => {
    const {monthYearData} = props

    return (
        <SH2>{monthYearData.year}年{monthYearData.month}月</SH2>
    )

};

const SH2 = styled.h2`
  position: absolute;
  top: 130px;
  left: 70px;
  font-size: 40px;
  color: aliceblue;
  font-family: 'Sacramento', cursive;
  @media screen and (max-width:500px){
    position: absolute;
    top: 110px;
    left: 30px;
    font-size: 30px;
  }
`