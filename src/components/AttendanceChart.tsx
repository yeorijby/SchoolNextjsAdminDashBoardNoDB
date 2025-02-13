// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// const data = [
//   {
//     name: 'Mon',
//     present: 60,
//     absent: 40,
//   },
//   {
//     name: 'Tue',
//     present: 80,
//     absent: 65,
//   },
//   {
//     name: 'Wed',
//     present: 75,
//     absent: 95,
//   },
//   {
//     name: 'Thu',
//     present: 80,
//     absent: 60,
//   },
//   {
//     name: 'Fri',
//     present: 60,
//     absent: 45,
//   },
// ];
const AttendanceChart = ({data}:{data:{name:string, present:number, absent:number}[];}) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
        <BarChart
        width={500}
        height={300}
        data={data}
        barSize={20}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
            <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
            <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
            <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightgra"}}/>
            <Legend 
                align='left' 
                verticalAlign='top' 
                wrapperStyle={{paddingTop:"20px", paddingBottom:"40px",}}
            />
            <Bar 
                dataKey="present" 
                fill="#FAE27C" 
                legendType='circle'
                radius={[10,10,0,0]}
            />
            <Bar 
                dataKey="absent" 
                fill="#C3EBFA" 
                legendType='circle' 
                radius={[10,10,0,0]}
            />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default AttendanceChart