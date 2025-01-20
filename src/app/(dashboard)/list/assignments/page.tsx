import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, assignmentsData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Assignment = {
  id:number;
  subject:string;
  class:string;
  teacher:string;
  dueDate:string;
};

const columns = [
  {
    header : "Subject Name", 
    accessor : "name",
  },
  {
    header : "Class", 
    accessor : "class",
  },
  {
    header : "Teacher", 
    accessor : "teacher",
    className : "hidden md:table-cell",
  },
  {
    header : "Due Date", 
    accessor : "dueDate",
    className : "hidden md:table-cell",
  },
  {
    header : "Actions", 
    accessor : "actions",
  }
]

const AssignmentListPage = () => {
    const renderRow = ( item:Assignment ) => (
      <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td className="">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/assignments/${item.id}`}>
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
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
      <Table data={assignmentsData} columns={columns} renderRow={renderRow} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  )
}

export default AssignmentListPage