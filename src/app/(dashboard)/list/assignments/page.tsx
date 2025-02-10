import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
// import { role, assignmentsData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { currentUserId, role } from "@/lib/utils"
// import { auth } from "@clerk/nextjs/server"
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

// type Assignment = {
//   id:number;
//   subject:string;
//   class:string;
//   teacher:string;
//   dueDate:string;
// };

type AssignmentList  = Assignment & { lesson : {
  teacher:Teacher,    
  class:Class, 
  subject:Subject,
  // date:Date,
}}

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
  ...((role === "admin" || role === "teacher") 
  ? [{
    header : "Actions", 
    accessor : "actions",
  }]:[]),
]

const renderRow = ( item:AssignmentList ) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
  <td className="">{item.lesson.class.name}</td>
  <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
  {/* <td className="hidden md:table-cell">{item.dueDate}</td> */}
  <td className="hidden md:table-cell">{new Intl.DateTimeFormat("ko-KR").format(item.dueDate)}</td>
  <td>
    <div className='flex items-center gap-2'>
      { (role === "admin" || role === "teacher") && (
        <>
          <FormModal table="assignment" type="update" data={item}/>
          <FormModal table="assignment" type="delete" id={item.id}/>
        </>
      )}
    </div>
  </td>
</tr>
)

const AssignmentListPage = async ({
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

  const query : Prisma.AssignmentWhereInput = {};
  // URL PARAMS CONDITION
  query.lesson = {};
  if (queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if (value !== undefined){
        switch(key){
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "subjectId":
            query.lesson={subjectId : parseInt(value)};
            break;
          case "search":
            // query.name = {contains:value, mode:"insensitive"}
            // query.OR = [
            //   {subject:{name:{contains:value, mode:"insensitive"}}},
            //   {teacher:{name:{contains:value, mode:"insensitive"}}},
            // ]
            query.lesson.subject = {
                name : {contains:value, mode:"insensitive"},
              }
            break;
          default:
            break;
        }
      }  
    }
  }

  // console.log(query);
  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
    break;
    case "student":
      query.lesson.class = {
        students:{
          some:{
            id:currentUserId!,
          }
        }
      };
    break;
    case "parent":
      query.lesson.class = {
        students:{
          some:{
            parentId:currentUserId!,
          }
        }
      };
    break;
    
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
     prisma.assignment.findMany({
      where : query,
      include : {
        lesson : {
          select: {
            teacher : {select:{name:true, surname:true}},
            class : {select:{name:true}},
            subject : {select:{name:true}},
          }
        }
      },
      take : ITEM_PER_PAGE,
      skip : ITEM_PER_PAGE * (p - 1),
    }),
     prisma.assignment.count({where:query}),
  ])
 
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
            {role === "admin" && (<FormModal table="assignment" type="create"/>)}
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

export default AssignmentListPage