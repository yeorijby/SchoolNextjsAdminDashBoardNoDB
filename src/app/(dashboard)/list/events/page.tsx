import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, eventsData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Class, Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

// type Event = {
//   id:number;
//   title:string;
//   class:string;
//   date:string;
//   startTime:string;

//   endTime:string;
// };
type EventList  = Event 
                  & {class:Class} 
                  
const columns = [
  {
    header : "Title", 
    accessor : "title",
  },
  {
    header : "Class", 
    accessor : "class",
  },
  {
    header : "Date", 
    accessor : "date",
    className : "hidden md:table-cell",
  },
  {
    header : "Start Time", 
    accessor : "startTime",
    className : "hidden md:table-cell",
  },
  {
    header : "End Time", 
    accessor : "endTime",
    className : "hidden md:table-cell",
  },
  {
    header : "Actions", 
    accessor : "actions",
  }
]

const renderRow = ( item:EventList ) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">{item.title}</td>
  <td >{item.class.name}</td>
  {/* <td className="hidden md:table-cell">{item.date}</td> */}
  <td className="hidden md:table-cell">{new Intl.DateTimeFormat("ko-KR").format(item.startTime)}</td>
  <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("ko-KR",{
    hour:"2-digit",
    minute:"2-digit",
    hour12:false,
  })}</td>
  <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("ko-KR",{
    hour:"2-digit",
    minute:"2-digit",
    hour12:false,
  })}</td>
  <td>
    <div className='flex items-center gap-2'>
      { role === "admin" && (
        <>
          <FormModal table="event" type="update" data={item}/>
          <FormModal table="event" type="delete" id={item.id}/>
        </>
      )}
    </div>
  </td>
</tr>
)

const EventListPage = async ({
  searchParams,
}:{
  searchParams:{[key:string]:string | undefined};
}) => {
  // console.log(searchParams)

  // ✅ 이게 원본
  // const { page, ...queryParams } = searchParams;
  // const p = page ? parseInt(page) : 1;


  // // // // // // URLSearchParams 객체로 변환
  // // // // // const params = new URLSearchParams(searchParams);
  
  // // // // // // 페이지 정보 가져오기
  // // // // // const page = params.get("page");


  // // // // const p = searchParams.page ? parseInt(searchParams.page) || 1 : 1;


  // // // // searchParams.page를 안전하게 변환
  // // // const page = await Promise.resolve(searchParams.page);
  // // // const p = page ? parseInt(page) || 1 : 1;

  // // // searchParams를 안전한 객체로 변환
  // // const params = Object.fromEntries(searchParams !== undefined ? searchParams.entries() : null);

  // // // page 값 변환 (undefined이면 1로 설정)
  // // const p = params.page ? parseInt(params.page) || 1 : 1;

  // // page 값을 안전하게 변환 (없으면 기본값 1)
  // const p = searchParams.page ? parseInt(searchParams.page) || 1 : 1;


  // ✅ searchParams를 비동기적으로 가져오기
  const params = await searchParams;

  // ✅ page 값을 안전하게 변환 (없으면 기본값 `1`)
  // const p = params.page ? parseInt(params.page) || 1 : 1;
  const { page, ...queryParams } = params;
  const p = page ? parseInt(page) || 1 : 1;

  const query : Prisma.EventWhereInput = {};
  // URL PARAMS CONDITION
  if (queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if (value !== undefined){
        switch(key){
          case "search":
            query.title = {contains:value, mode:"insensitive"}
            break;
          default:
            break;

        }
      }  
    }
  }

  const [data, count] = await prisma.$transaction([
     prisma.event.findMany({
      where : query,
      include : {
        class : true,
      },
      take : ITEM_PER_PAGE,
      skip : ITEM_PER_PAGE * (p - 1),
    }),
     prisma.event.count({where:query}),
  ])
    
  return (
    <div className='flex-1 bg-white p-4 rounded-md m-4 mt-0'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yeoriYellow">
              <Image src='/filter.png' alt='' width={14} height={14} className=''/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yeoriYellow">
              <Image src='/sort.png' alt='' width={14} height={14} className=''/>
            </button>
            {role === "admin" && (<FormModal table="event" type="create"/>)}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table data={data} columns={columns} renderRow={renderRow} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  )
}

export default EventListPage