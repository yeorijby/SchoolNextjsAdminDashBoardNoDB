// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
    {
      id: 1,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());  
    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar locale='ko' onChange={onChange} value={value} />
            <div className='flex items-center justify-between'>
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} className=''/>
            </div>
            <div className='flex flex-col gap-4'>
                {events.map(event=>(
                    <div 
                        className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-yeoriSky even:border-t-yeoriPurple' 
                        key={event.id}
                    >
                        <div className='flex items-center justify-between'>
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300 text-xs">{event.time}</span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCalendar