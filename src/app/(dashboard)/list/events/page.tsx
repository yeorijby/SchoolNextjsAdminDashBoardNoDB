import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, eventsData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Event = {
  id:number;
  title:string;
  class:string;
  date:string;
  startTime:string;
  endTime:string;
};

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

const EventListPage = () => {
    const renderRow = ( item:Event ) => (
      <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td >{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/events/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-yeoriSky">
              <Image src='/edit.png' alt='' width={16} height={16} className=''/>
            </button>
          </Link>
          { role === "admin" && (<button className="w-7 h-7 flex items-center justify-center rounded-full bg-yeoriPurple">
            <Image src='/delete.png' alt='' width={16} height={16} className=''/>
          </button>
          )}
        </div>
      </td>
    </tr>
  )
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
            {role === "admin" && (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-yeoriYellow">
              <Image src='/plus.png' alt='' width={14} height={14} className=''/>
            </button>)}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table data={eventsData} columns={columns} renderRow={renderRow} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  )
}

export default EventListPage