import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"
import FormModal from "@/components/FormModal"
import Performance from "@/components/Performance"
import Image from "next/image"
import Link from "next/link"

const SingleStudentPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
        {/* LEFT */}
        <div className='w-full xl:w-2/3'>
            {/* TOP */}
            <div className='flex flex-col lg:flex-row gap-4'>
                {/* USER INFO CARD */}
                <div className='bg-yeoriSky py-6 px-4 rounded-md flex-1 flex gap-4'>
                    <div className='w-1/3'>
                        <Image 
                            src='https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200' 
                            alt=''
                            width={144} 
                            height={144} 
                            className='w-36 h-36 rounded-full object-cover'
                        />
                    </div>
                    <div className='w-2/3 flex flex-col justify-between gap-4'>
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-semibold">Cameron Moran</h1>
                            <FormModal table="student" type="update" data={{
                                id: 1,
                                username: "deanguerrero",
                                email: "deanguerrero@gmail.com",
                                password: "password",
                                firstName: "Dean",
                                lastName: "Guerrero",
                                phone: "+1 234 567 89",
                                address: "1234 Main St, Anytown, USA",
                                bloodType: "A+",
                                dateOfBirth: "2000-01-01",
                                sex: "male",
                                img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                            }}/>
                        </div>
                        <p className="text-sm text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                        <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/blood.png' alt='' width={14} height={14} className=''/>
                                <span>A+</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/date.png' alt='' width={14} height={14} className=''/>
                                <span>January 2025</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/mail.png' alt='' width={14} height={14} className=''/>
                                <span>user@gmail.com</span>
                            </div>
                            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                <Image src='/phone.png' alt='' width={14} height={14} className=''/>
                                <span>010-1234-5678</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SMALL CARD */}
                <div className='flex-1 flex gap-4 justify-between flex-wrap'>
                    {/* CARD */}
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:2-[48%]'>
                        <Image src='/singleAttendance.png' alt='' width={24} height={24} className='w-6 h-6'/>
                        <div className=''>
                            <h1 className="text-xl font-semibold">90%</h1>
                            <span className="text-sm text-gray-400">Attendance</span>
                        </div>
                    </div>
                    {/* CARD */}
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:2-[48%]'>
                        <Image src='/singleBranch.png' alt='' width={24} height={24} className='w-6 h-6'/>
                        <div className=''>
                            <h1 className="text-xl font-semibold">6th</h1>
                            <span className="text-sm text-gray-400">Grade</span>
                        </div>
                    </div>
                    {/* CARD */}
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:2-[48%]'>
                        <Image src='/singleLesson.png' alt='' width={24} height={24} className='w-6 h-6'/>
                        <div className=''> 
                            <h1 className="text-xl font-semibold">18</h1>
                            <span className="text-sm text-gray-400">Lessons</span>
                        </div>
                    </div>
                    {/* CARD */}
                    <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:2-[48%]'>
                        <Image src='/singleClass.png' alt='' width={24} height={24} className='w-6 h-6'/>
                        <div className=''>
                            <h1 className="text-xl font-semibold">6A</h1>
                            <span className="text-sm text-gray-400">Class</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* BOTTOM */}
            <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
                <h1>Student&apos;s Schedule</h1>
                <BigCalendar/>
            </div>
        </div>
        {/* RIGHT */}
        <div className='w-full xl:w-1/3 flex flex-col gap-4'>
            <div className='bg-white p-4 rounded-md'>
                <h1 className="text-xl font-semibold">Shortcuts</h1>
                <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
                    <Link className="p-3 rounded-md bg-yeoriSkyLight" href="/">Student&apos;s Lessons</Link>
                    <Link className="p-3 rounded-md bg-yeoriPurpleLight" href="/">Student&apos;s Teachers</Link>
                    <Link className="p-3 rounded-md bg-pink-50" href="/">Student&apos;s Exams</Link>
                    <Link className="p-3 rounded-md bg-yeoriSkyLight" href="/">Student&apos;s Assignments</Link>
                    <Link className="p-3 rounded-md bg-yeoriYellowLight" href="/">Student&apos;s Results</Link>
                </div>
            </div>
            <Performance/>
            <Announcements/>
        </div>
    </div>
  )
}

export default SingleStudentPage