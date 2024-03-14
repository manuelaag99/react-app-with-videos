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
            const { data, error } = await supabase.from("cai-courses").select().eq("id", courseId);
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
        <div className="flex flex-col sm:flex-row h-fit px-6 py-6 my-4 bg-white mx-auto hover:bg-gray-300 duration-300 w-85percent shadow-lg rounded-lg cursor-pointer" onClick={() => router.push("/courses/" + courseId)}>

            <div className="flex w-full sm:w-1/10 justify-center sm:mb-0 mb-5 h-44 sm:h-24">
                {courseInfo && courseInfo.course_image_path && <Image additionalClassNames="w-full" imageSource={courseInfo.course_image_path} />}
                {courseInfo && !courseInfo.course_image_path && <div className="w-full bg-gray-300 rounded-md"></div>}
            </div>

            <div className="flex flex-col justify-between w-full sm:w-9/10">

                <div className="flex w-full justify-between">

                    <div className="flex sm:w-fit w-full float-left sm:pl-5 mr-4">
                        {courseInfo && courseInfo.title && <p className="font-bold sm:text-left font-amatic text-course-box-title-desktop text-black -mt-1 ">{courseInfo.title}</p>}
                        {courseInfo && !courseInfo.title && <div className="bg-gray-700 rounded-2xl w-9/10 h-9 my-2 "></div>}
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
                        
                        
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col w-full sm:w-fit justify-center sm:justify-between sm:pl-5">
                        <Button additionalClassNamesForText=" text-center mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" flex justify-center sm:mt-0 mt-3 py-2 font-amatic text-button-desktop font-bold rounded-md shadow-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white sm:mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                        <Button additionalClassNamesForText=" text-center mx-4 -mt-1.5 -mb-1.5" additionalClassNamesForButton=" flex justify-center sm:mt-0 mt-3 py-2 font-amatic text-button-desktop font-bold rounded-md shadow-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white" contentForButton="Agregar a canasta" />
                </div>


            </div>
        </div>
    )
}