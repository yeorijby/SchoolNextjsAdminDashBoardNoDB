// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 100,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 45,
    fill: '#FAE27C',
  },
  {
    name: 'Boys',
    count: 55,
    fill: '#C3EBFA',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image src='/moreDark.png' alt='' width={20} height={20} className=''/>
        </div>
        {/* CHART */}
        <div className='relative w-full h-[75%]'>
            <ResponsiveContainer>
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        background
                        dataKey="count"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src='/maleFemale.png' alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
        </div>
        {/* BOTTOM */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-yeoriSky rounded-full'/>
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-300'>Boy(55%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-yeoriYellow rounded-full'/>
                <h1 className='font-bold'>1,234</h1>
                <h2 className='text-xs text-gray-300'>Girl(45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart