// 클라이언트 사이드 렌더링 (CSR): use client 지시문을 사용하는 컴포넌트는 브라우저에서 동적으로 렌더링된다.
// 이는 사용자 상호작용에 의존하는 동적인 기능을 구현할 때 유용하다.
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

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
    address : z.string().min(1,{message:'Address is Required!'}),
    bloodType : z.string().min(1,{message:'Blood Type is Required!'}),
    birthday : z.date({message:'Birthday is Required!'}),
    sex : z.enum(["male", "female"], {message:'Sex is Required!'}),
    img : z.instanceof(File, {message:'Image is Required!'}),
});

type Inputs = z.infer<typeof schema>;

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
    } = useForm<Inputs>({
        resolver:zodResolver(schema),
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data);
      });

    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium ">Authentication Infomation</span>
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField 
                    label="Username"
                    name="username"
                    defaultValue={data?.username}
                    register={register}
                    error={errors?.username}
                /> 
                <InputField 
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email}
                /> 
                <InputField 
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue={data?.password}
                    register={register}
                    error={errors?.password}
                /> 
            </div>
            <span className="text-xs text-gray-400 font-medium">Personal Infomation</span>            
            <div className='flex justify-between flex-wrap gap-4'>
                <InputField 
                    label="First Name"
                    name="firstName"
                    defaultValue={data?.firstName}
                    register={register}
                    error={errors.firstName}
                /> 
                <InputField 
                    label="Last Name"
                    name="lastName"
                    defaultValue={data?.lastName}
                    register={register}
                    error={errors.lastName}
                /> 
                <InputField 
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors.phone}
                /> 
                <InputField 
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors.address}
                /> 
                <InputField 
                    label="Blood Type"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors.bloodType}
                /> 
                <InputField 
                    label="Birthday"
                    name="birthday"
                    defaultValue={data?.birthday}
                    register={register}
                    error={errors.birthday}
                    type="date"
                /> 
            </div>
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
                <label htmlFor="" className="text-xs text-gray-500">Sex</label>
                <select 
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    {...register("sex")}
                    defaultValue={data?.sex}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>}
            </div>

            <button className='bg-blue-400 text-white p-2 rounded-md'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm