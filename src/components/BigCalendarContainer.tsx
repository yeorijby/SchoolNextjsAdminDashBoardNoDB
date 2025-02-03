import prisma from "@/lib/prisma"
import BigCalendar from "./BigCalendar"

const BigCalendarContainer = async ({
  type, id
}:{
  type:"teacherId" | "classId", 
  id:string | number
}) => {

  const data =await prisma.lesson.findMany({
    where:{
      ...(type === "teacherId" ? {teacherId:id as string} : {classId:id as number}),
    }
  })
  return (
    <div className=''><BigCalendar data={data}/></div>
  )
}

export default BigCalendarContainer