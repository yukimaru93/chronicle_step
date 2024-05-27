import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { CalendarView } from './calendarView';
import { FormView } from './formView';
import { ChangeCalendar } from './changeCalendar';
import { CalendarYearMonth } from './calendarYearMonth';
import { ChangeIndex } from './changeIndex';
import { IndexPlanData } from './indexPlanData';

const ReactCalendars = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [fullEventData, setFullEventData] = useState([]);
  const [selectCalendarData, setSelectCalendarData] = useState(null);
  const [formIndex, setFormIndex] = useState(false);
  const [planIndex, setPlanIndex] = useState(true);
  const [formData, setFormData] = useState({ year: "", month: "", date: "", content: "", calendar_id: 1 });
  const [monthYearData, setMonthYearData] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1});

  const fetchCalendarData = (year, month) => {
    axios.get("/calendars/calendar_data", {
      params: { year: year, month: month }
    })
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
    indexPlan();
  }, []);

  const onClickDate = (year, month, date) => {
    const event = eventData.find(event => (event.date === date) && (event.year === year) && (event.month === month));
    setSelectCalendarData({month:month,date:date});
    setFormIndex(true);
    setFormData({ ...formData, year, month, date, content: event ? event.content : "" });
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
        fetchCalendarData(monthYearData.year, monthYearData.month);
        indexPlan();
      })
      .catch(error => {
        console.error("Error saving event", error);
      });
  };



  const getEventForDate = (year,month,date) => {
    const event = eventData.find(event => (event.date === date) && (event.year === year) && (event.month === month) );
    return event ? event.content : "";
  };


  //カレンダーで先月と来月に行き来できる機能の実装5/24
  const changeNextMonth = () => {
    let newMonth = monthYearData.month + 1;
    let newYear = monthYearData.year;
    if (newMonth > 12){
      newMonth = 1
      newYear = newYear + 1
    };
    setMonthYearData({year: newYear, month: newMonth});
    fetchCalendarData(newYear, newMonth);
  };

  const changeLastMonth = () => {
    let newMonth = monthYearData.month - 1;
    let newYear = monthYearData.year;
    if (newMonth < 1){
      newMonth = 12
      newYear = newYear - 1
    };
    setMonthYearData({year: newYear, month: newMonth});
    fetchCalendarData(newYear, newMonth);
  }

  //登録データの削除機能の実装5/26
  const clearForm = (event) => {
    event.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post("/calendars/delete_content", { event: formData }, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then(response => {
        console.log('Event deleted:', response.data);
        setFormIndex(false);
        fetchCalendarData(monthYearData.year, monthYearData.month);
        indexPlan();
      })
      .catch(error => {
        console.error("Error deleting event", error);
      });
  }

  //最新の予定の表示・非表示機能の実装5/27
  const planIndexChange = () => {
    if (planIndex){
      setPlanIndex(false);
    }else{
      setPlanIndex(true);
    };
  }

  const indexPlan = () => {
    axios.get("/calendars/full_plan")
      .then(response => {
        setFullEventData(response.data.events)
      })
      .catch(error => {
        console.error("Error fetching event data", error);
      })
  }




//cssのコンポーネント分離を実施5/21  

  return (
    <div>
      <CalendarYearMonth monthYearData={monthYearData} />
      {/*コンポーネントの分離を実施5/26*/}
      <ChangeCalendar changeLastMonth={changeLastMonth} changeNextMonth={changeNextMonth} />
      {/*コンポーネントの分離を実施5/24*/}
      <ChangeIndex planIndexChange={planIndexChange} />
      {/*コンポーネントの分離を実施5/27*/}
      <div>
        <CalendarView calendarData={calendarData} onClickDate={onClickDate} getEventForDate={getEventForDate} />
        {/* コンポーネントの分離を実施 5/21*/}
        {formIndex && (
          <FormView selectCalendarData={selectCalendarData} submitPlan={submitPlan} formData={formData} enterContent={enterContent} closeForm={closeForm} clearForm={clearForm} />
          /* コンポーネントの分離を実施 5/21*/
        )}
      </div>
      {planIndex && (
        <IndexPlanData onClickDate={onClickDate} fullEventData={fullEventData} />
        /*コンポーネントの分離を実施5/27*/
      )}
    </div>
  );
};

/* cssをコンポーネントへ移動（変更に基づきimportを一部編集） */

export default ReactCalendars;
