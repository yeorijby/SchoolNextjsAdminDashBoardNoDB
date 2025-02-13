// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const CountChart = ({boys, girls}:{boys:number; girls:number}) => {
  const data = [
    {
      name: 'Total',
      count: boys + girls,
      fill: 'white',
    },
    {
      name: 'Girls',
      count: girls,
      fill: '#FAE27C',
    },
    {
      name: 'Boys',
      count: boys,
      fill: '#C3EBFA',
    },
  ];
  
  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };
  return (
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
  )
}

export default CountChart