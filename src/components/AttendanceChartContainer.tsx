import Image from "next/image"
import AttendanceChart from "./AttendanceChart"
import prisma from "@/lib/prisma"

const AttendanceChartContainer = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();                               // dayOfWeek : 이번주의 몇번째 날인가(월,화,수,목,금금)
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;    // daysSinceMonday : 월요일로 부터 며칠이 지났나?
    const lastMonday = new Date(today);                             // lastMonday : 지난 월요일을 찾기위해서 임의로 오늘 날짜를 넣어놓는다
    lastMonday.setDate(today.getDate() - daysSinceMonday);          // lastMonday : 이렇게 해서 지난 월요일을 찾는다.

    // console.log(daysSinceMonday);

    const resData = await prisma.attendance.findMany({
        where:{
            date:{
                gte:lastMonday
            }
        }
        , select : {
            date:true, 
            present:true,
        },
    });
    // console.log(data);  
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const attendanceMap : {[key:string]:{present:number; absent:number}} = {
        Mon:{present:0, absent:0},
        Tue:{present:0, absent:0},
        Wed:{present:0, absent:0},
        Thu:{present:0, absent:0},
        Fri:{present:0, absent:0},
    }

    resData.forEach(item=>{
        const itemDate = new Date(item.date);

        // 평일일 때
        if (dayOfWeek >= 1 && dayOfWeek <= 5){
            const dayName = daysOfWeek[dayOfWeek-1];        // 배열이니까 0부터 시작함 그래서 -1 해줌

            if (item.present){
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    });

    // console.log(attendanceMap);  
    const data = daysOfWeek.map((day)=>({
        name : day, 
        present : attendanceMap[day].present,
        absent : attendanceMap[day].absent,
    }))

  return (
    <div className='bg-white rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Attendance</h1> 
            <Image src='/moreDark.png' alt='' width={20} height={20} className=''/>
        </div>
        <AttendanceChart data={data}/>
    </div>            
  )
}

export default AttendanceChartContainer