// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";



const FormModal = ({
    table, type, data, id
} :{
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "event"| "announcement" ;
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
} ) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-yeoriYellow" : type === "update"? "bg-yeoriSky": "bg-yeoriPurple";

    const [open, setOpen] = useState(false);

    const Form = ()=>{
        return (
            type === "delete" && id ? (
                <form action="" className="p-4 flex flex-col gap-4">
                    <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table}?</span>
                    <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
                </form>
            ) : (
                <TeacherForm type="create"/>
            )
        );
    }
    return (
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={()=>setOpen(true)}>
                <Image src={`/${type}.png`} alt='' width={16} height={16} className=''/>
            </button>
            {open && <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 flex z-50 items-center justify-center'>
                <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
                    <Form/>
                    <div className='absolute top-4 right-4 cursor-pointer' onClick={()=>setOpen(false)}>
                        <Image src='/close.png' alt='' width={14} height={14} className=''/>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default FormModal