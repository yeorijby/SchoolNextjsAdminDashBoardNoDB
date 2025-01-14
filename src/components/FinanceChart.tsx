// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 4000,
    expense: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expense: 1398,
  },
  {
    name: 'Mar',
    income: 2000,
    expense: 9800,
  },
  {
    name: 'Apr',
    income: 2780,
    expense: 3908,
  },
  {
    name: 'May',
    income: 1890,
    expense: 4800,
  },
  {
    name: 'Jun',
    income: 2390,
    expense: 3800,
  },
  {
    name: 'Jul',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Aug',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Sep',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Oct',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Nov',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Dec',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Jul',
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */} 
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Finance</h1>
            <Image src='/moreDark.png' alt='' width={20} height={20} className=''/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
                <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} tickMargin={10}/>
                <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} tickMargin={20}/>
                <Tooltip />
                <Legend 
                    align='center' 
                    verticalAlign='top' 
                    wrapperStyle={{paddingTop:"10px", paddingBottom:"30px",}}
                />
                <Line type="monotone" dataKey="income" stroke="#FAE27C" strokeWidth={5} />
                <Line type="monotone" dataKey="expense" stroke="#C3EBFA" strokeWidth={5} />
            </LineChart>
        </ResponsiveContainer>

    </div> 
  )
}

export default FinanceChart