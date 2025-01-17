// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"


import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const START_TIME=8;
const END_TIME=17;


const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [curDT, SetCurDT] = useState<Date>(new Date());
  const [curYear, SetCurYear] = useState(curDT.getFullYear());
  const [curMonth, SetCurMonth] = useState(curDT.getMonth());

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  }

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(curYear,curMonth,0,START_TIME,0,0)}
      max={new Date(curYear,curMonth,0,END_TIME,0,0)}
    />
  )
}

export default BigCalendar