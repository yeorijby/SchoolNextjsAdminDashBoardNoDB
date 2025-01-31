// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import { ITEM_PER_PAGE } from "@/lib/settings"
import { useRouter } from "next/navigation";

const Pagination = ({page, count} : {page:number, count:number}) => {
  const router = useRouter()

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage:number)=>{
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <div className='p-4 flex items-center justify-between text-gray-500'>
        <button 
          disabled={!hasPrev} 
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={()=>{changePage(page - 1)}}
        >
          Prev
        </button>
        <div className='flex items-center gap-2 text-sm'>
          { Array.from({length:Math.ceil(count/ITEM_PER_PAGE)}, (_,index)=>{
            const pageIndex = index + 1;
            return (
            <button 
              key={pageIndex} 
              className={`px-2 rounded-sm ${page === pageIndex ? "bg-yeoriSky":""}`}
              onClick={()=>{changePage(pageIndex)}}
            >
              {pageIndex}
            </button>)
          })}
        </div>
        <button 
          disabled={!hasNext} 
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={()=>{changePage(page + 1)}}
        >
          Next
        </button>
    </div>
  )
}

export default Pagination