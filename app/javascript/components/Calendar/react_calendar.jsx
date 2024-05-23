import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { CalendarView } from './calendarView';
import { FormView } from './formView';

const ReactCalendars = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [selectCalendarData, setSelectCalendarData] = useState(null);
  const [formIndex, setFormIndex] = useState(false);
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: "", content: "", calendar_id: 1 });

  const fetchCalendarData = () => {
    axios.get("/calendars/calendar_data")
      .then(response => {
        setCalendarData(response.data.calendar);
        setEventData(response.data.events)
      })
      .catch(error => {
        console.error("Error fetching calendar data:", error);
      });
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const onClickDate = (date) => {
    const event = eventData.find(event => event.date === date);
    if ((event != null)&&(event != undefined)) {
      setSelectCalendarData(date);
      setFormIndex(true);
      setFormData({ ...formData, date: date,content: event.content});
    }else{
      setSelectCalendarData(date);
      setFormIndex(true);
      setFormData({ ...formData, date: date,content: ""});
    }
  };

  const closeForm = () => {
    setFormIndex(false);
  };

  const enterContent = (event) => {
    const { name, value } = event.target; //event.targetの分割代入->nameとvalueをevent.target.nameなどと使用
    setFormData({ ...formData, [name]: value });
  };

  const submitPlan = (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post("/calendars/save_content", { event: formData }, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then(response => {
        console.log('Event saved:', response.data);
        setFormIndex(false);
        fetchCalendarData();
      })
      .catch(error => {
        console.error("Error saving event", error);
      });
  };



  const getEventForDate = (date) => {
    const event = eventData.find(event => event.date === date);
    return event ? event.content : "";
  };

//cssのコンポーネント分離を実施5/21  

  return (
    <div>
      <CalendarView calendarData={calendarData} onClickDate={onClickDate} getEventForDate={getEventForDate} />
      {/* コンポーネントの分離を実施 5/21*/}
      {formIndex && (
        <FormView selectCalendarData={selectCalendarData} submitPlan={submitPlan} formData={formData} enterContent={enterContent} closeForm={closeForm} />
        /* コンポーネントの分離を実施 5/21*/
      )}
    </div>
  );
};

export default ReactCalendars;
