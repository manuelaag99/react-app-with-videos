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

    if (!courseInfo) {
        return null;
    } else {
        return (
            <div className="flex flex-col h-fit px-6 py-6 my-4 bg-white w-85percent shadow-lg rounded-lg">
                <div className="flex sm:flex-row flex-col sm:justify-between justify-center w-full">

                    <div className="sm:hidden flex w-full justify-center">
                        {courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                    </div>

                    <div className="flex flex-row justify-start items-center sm:w-8/10 w-full">
                        
                        <div className="sm:flex hidden justify-center items-center sm:w-2/10 sm:mr-6">
                            {courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                        </div>
                        
                        <div className="flex flex-col justify-start sm:w-fit w-8/10">
                            <div className="w-fit float-left my-2">
                                <p className="font-bold text-left">
                                    {courseInfo.course_title}
                                </p>
                            </div>
                            <div className="flex flex-row my-2">
                                <Button additionalClassNamesForButton=" rounded-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white mr-2 sm:mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                                <Button additionalClassNamesForButton=" rounded-md bg-var-2 text-white" contentForButton="Agregar a canasta" />
                            </div>
                        </div>

                        <div className="sm:hidden flex flex-row items-start justify-between h-fit mx-2 w-2/10">
                            <div className="w-fit h-fit">
                                <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                            </div>
                            <div className="w-fit h-fit">
                                {courseInfo.course_length && <p>{courseInfo.course_length}</p>}
                            </div>
                            <div className="w-fit h-fit">
                                <MoreVertIcon className="ml-2" fontSize="medium" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="hidden sm:flex flex-row justify-end h-fit w-2/10">
                        <div className="flex flex-row items-start justify-between h-fit mx-2">
                            <div className="w-fit h-fit">
                                <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                            </div>
                            <div className="w-fit h-fit">
                                {courseInfo.course_length && <p>{courseInfo.course_length}</p>}
                            </div>
                            <div className="w-fit h-fit">
                                <MoreVertIcon className="ml-2" fontSize="medium" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}