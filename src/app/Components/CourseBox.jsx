import Button from "./Button";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Image from "./Image";
import { useRouter } from "next/navigation";

export default function CourseBox ({ courseId, index }) {
    const router = useRouter();
    const [courseInfo, setCourseInfo] = useState ();
    async function fetchCourseInfo () {
        try {
            const { data, error } = await supabase.from("cai-courses").select().eq("course_id", courseId);
            if (error) console.log (error);
            console.log(data)
            setCourseInfo (data[0]);
        } catch (err) {
            console.log (err)
        }
    }
    useEffect(() => {
        fetchCourseInfo();
    }, [])

    console.log(courseId)
    console.log(courseInfo)

    return (
        <div className="flex flex-col sm:flex-row h-fit px-6 py-6 my-4 bg-white  hover:bg-gray-300 duration-300 w-85percent shadow-lg rounded-lg cursor-pointer">

            <div className="flex w-full sm:w-2/10 justify-center sm:mb-0 mb-5">
                {courseInfo && courseInfo.course_image_path && <Image additionalClassNames="w-full" imageSource={courseInfo.course_image_path} />}
            </div>

            <div className="flex flex-col justify-between w-full sm:w-8/10">

                <div className="flex w-full justify-between">

                    <div className="flex sm:w-fit w-full float-left mr-4">
                        {courseInfo && courseInfo.course_title && <p className="font-bold sm:text-left font-amatic text-course-box-title-desktop text-black sm:pl-5 -mt-1 ">{courseInfo.course_title}</p>}
                        {courseInfo && !courseInfo.course_title && <div className="bg-gray-700 rounded-2xl w-9/10 h-9 my-2 sm:pl-5"></div>}
                    </div>

                    <div className="flex w-fit float-right">
                        <div className="flex">
                            <div className="w-fit h-fit">
                                <p><AccessTimeIcon color="#ddd" fontSize="small"/></p>
                            </div>
                            <div className="w-fit h-fit">
                                {courseInfo && courseInfo.course_length && <p className="font-amatic font-bold text-gray-500 ml-2">{courseInfo.course_length}</p>}
                            </div>
                        </div>
                        
                        <button className="w-fit h-fit text-black hover:text-gray-100 duration-300 ml-2"><MoreVertIcon fontSize="small" /></button>
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col w-full sm:w-fit justify-center sm:justify-between sm:pl-5">
                        <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" sm:mt-0 mt-3 py-2 font-amatic text-button-desktop font-bold rounded-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white sm:mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                        <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" sm:mt-0 mt-3 py-2 font-amatic text-button-desktop font-bold rounded-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white" contentForButton="Agregar a canasta" />
                </div>


            </div>
            



            {/* <div className="sm:flex hidden sm:w-8/10">

                <div className="sm:flex hidden w-9/10 float-left">
                    {courseInfo && courseInfo.course_title && <p className="font-bold sm:text-left text-center font-amatic text-course-box-title-desktop text-black">{courseInfo.course_title}</p>}
                    {courseInfo && !courseInfo.course_title && <div className="bg-gray-700 rounded-2xl w-9/10 h-9 my-2"></div>}
                </div>

                <div className="sm:flex hidden w-1/10 float-right">
                    <div className="flex">
                        <div className="w-fit h-fit">
                            <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                        </div>
                        <div className="w-fit h-fit">
                            {courseInfo && courseInfo.course_length && <p className="font-amatic font-bold text-gray-500 ml-2">{courseInfo.course_length}</p>}
                        </div>
                    </div>
                    
                    <button className="w-fit h-fit text-black hover:text-gray-100 duration-300 ml-2"><MoreVertIcon /></button>
                </div>

            </div> */}




            {/* <div className="flex sm:flex-row flex-col sm:justify-between justify-center w-full">

                <div className="sm:hidden flex w-full justify-center mb-6">
                    {courseInfo && courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                </div>

                <div className="flex flex-row justify-start items-center sm:w-8/10 w-full"> //
                    
                    <div className="sm:flex hidden justify-center items-center sm:w-2/10 sm:mr-6">
                        {courseInfo && courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                    </div>
                    
                    <div className="flex flex-col justify-start w-7/10">
                        <div className="w-9/10 float-left -mt-2 mb-2">
                            {courseInfo && courseInfo.course_title && <p className="font-bold text-left font-amatic text-course-box-title-desktop text-black">{courseInfo.course_title}</p>}
                            {courseInfo && !courseInfo.course_title && <div className="bg-gray-700 rounded-2xl w-9/10 h-9 my-2"></div>}
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" font-amatic text-button-desktop font-bold rounded-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white mr-2 sm:mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                            <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" font-amatic text-button-desktop font-bold rounded-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white" contentForButton="Agregar a canasta" />
                        </div>
                    </div>

                    <div className="sm:hidden flex flex-row items-start justify-between h-fit mx-2 w-2/10">
                        <div className="w-fit h-fit">
                            <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                        </div>
                        <div className="w-fit h-fit">
                            {courseInfo && courseInfo.course_length && <p className="font-amatic font-bold text-gray-500">{courseInfo.course_length}</p>}
                        </div>
                        <button className="w-fit h-fit text-black hover:text-gray-100 duration-300 ml-2"><MoreVertIcon /></button>
                    </div>
                </div>
                

                <div className="flex flex-col justify-start items-center sm:w-8/10 w-full">

                    <div className="sm:flex hidden justify-center items-center sm:w-2/10 sm:mr-6">
                        {courseInfo && courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                    </div>

                    <div className="flex flex-col justify-start w-7/10">
                        <div className="w-9/10 float-left -mt-2 mb-2">
                            {courseInfo && courseInfo.course_title && <p className="font-bold text-left font-amatic text-course-box-title-desktop text-black">{courseInfo.course_title}</p>}
                            {courseInfo && !courseInfo.course_title && <div className="bg-gray-700 rounded-2xl w-9/10 h-9 my-2"></div>}
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" font-amatic text-button-desktop font-bold rounded-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white mr-2 sm:mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                            <Button additionalClassNamesForText="mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" font-amatic text-button-desktop font-bold rounded-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white" contentForButton="Agregar a canasta" />
                        </div>
                    </div>

                    <div className="sm:hidden flex flex-row items-start justify-between h-fit mx-2 w-2/10">
                        <div className="w-fit h-fit">
                            <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                        </div>
                        <div className="w-fit h-fit">
                            {courseInfo && courseInfo.course_length && <p className="font-amatic font-bold text-gray-500">{courseInfo.course_length}</p>}
                        </div>
                        <button className="w-fit h-fit text-black hover:text-gray-100 duration-300 ml-2"><MoreVertIcon /></button>
                    </div>

                </div>

            </div> */}
        </div>
    )
}