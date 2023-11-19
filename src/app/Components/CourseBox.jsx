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
            <div className="flex flex-col h-fit px-6 py-6 my-4 bg-white w-85percent rounded-lg">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row justify-start items-center w-8/10">
                        <div className="flex justify-center items-center w-2/10">
                            {courseInfo.course_image_path && <Image imageSource={courseInfo.course_image_path} />}
                        </div>
                        <div className="flex flex-col justify-start w-fit pl-6">
                            <div className="w-fit float-left my-2">
                                <p className="text-left">
                                    {courseInfo.course_title}
                                </p>
                            </div>
                            <div className="flex flex-row my-2">
                                <Button additionalClassNamesForButton=" rounded-md bg-var-3 text-white mr-6" contentForButton="Ver detalles" onClickButtonAction={() => router.push("/courses/" + courseId)}  />
                                <Button additionalClassNamesForButton=" rounded-md bg-var-2 text-white" contentForButton="Agregar a canasta" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-row justify-end h-fit w-2/10">
                        <div className="flex flex-row items-start justify-between h-fit mx-2">
                            <div className="w-fit h-fit">
                                <p><AccessTimeIcon color="#ddd" fontSize="medium"/></p>
                            </div>
                            <div className="w-fit h-fit">
                                {courseInfo.course_length && <p>{courseInfo.course_length}</p>}
                            </div>
                        </div>
                        <MoreVertIcon fontSize="medium" />
                    </div>
                </div>
            </div>
        )
    }
}