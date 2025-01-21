// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    username : z
    .string()
    .min(3,{message:'UserName must be at least 3 characters long!'})
    .max(20,{message:'UserName must be at most 20 characters long!'}),
    email : z.string().email({message:'Invalid email address!'}),
    password : z.string().min(8,{message:'Password must be at least 8 characters long!'}),
    firstName : z.string().min(1,{message:'First Name is Required!'}),
    lastName : z.string().min(1,{message:'Last Name is Required!'}),
    phone : z.string().min(1,{message:'Phone Number is Required!'}),
    addresss : z.string().min(1,{message:'Addresss is Required!'}),
    birthday : z.date({message:'Birthday is Required!'}),
    sex : z.enum(["male", "female"], {message:'Sex is Required!'}),
    img : z.instanceof(File, {message:'Image is Required!'}),
});

const TeacherForm = ({
    type, data
}:{
    type:"create" | "update"; 
    data?:any;
}) => {
    const {
        register, 
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver:zodResolver(schema),
    })

    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-yeoriYellow" : type === "update"? "bg-yeoriSky": "bg-yeoriPurple";

    return (
        <form className='flex flex-col gap-8'>
            <h1 className="text-xl font-semibold">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Infomation</span>
            
            <input type="text" {...register("username")} className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm" />
            {errors.username?.message && <p>{errors.username?.message.toString()}</p>}
            <span className="text-xs text-gray-400 font-medium">Personal Infomation</span>
            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm