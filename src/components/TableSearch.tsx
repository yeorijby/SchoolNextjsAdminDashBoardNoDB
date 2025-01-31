// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const TableSearch = () => {
  const router = useRouter()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search)
    params.set("search", value)
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <form 
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
      onSubmit={handleSubmit}
    >
      <Image src="/search.png" alt="" width={14} height={14}/>
      <input type="text" placeholder="Search ..." className="w-[200px] p-2 bg-transparent outline-none"/>
    </form>        
  )
}

export default TableSearch