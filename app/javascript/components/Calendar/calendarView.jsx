import React from 'react';
import styled from 'styled-components';

export const CalendarView = (props) => {
    const {calendarData, onClickDate, getEventForDate} = props

    return (
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <Std key={dayIndex} onClick={() => onClickDate(day.year,day.month,day.date)}>
                  {day.date}
                  <Sp>{getEventForDate(day.year,day.month,day.date)}</Sp>
                </Std>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
};

const Std = styled.td`
    border: 1px solid black;
    vertical-align: top;
    font-size: 2vw;
    padding: 5px 0 0 5px;
    cursor: pointer;
    width: calc(100% / 7);
    height: calc(100% / 6);
`;

const Sp = styled.p`
  height:70%;
  overflow: auto;
  white-space: pre-wrap;
  font-size: calc(12px + 0.5vw);
  line-height: 1.2;
  @media screen and (max-width:500px){
    font-size:8px;
  }
`;