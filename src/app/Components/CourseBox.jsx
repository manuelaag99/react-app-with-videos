import Button from "./Button";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Image from "./Image";

export default function CourseBox ({ courseId }) {
    const [courseInfo, setCourseInfo] = useState ();
    async function fetchCourseInfo () {
        try {
            const { data, error } = await supabase.from("jk-courses").select().eq("course_id", courseId);
            if (error) console.log (error);
            setCourseInfo (data[0]);
        } catch (err) {
            console.log (err)
        }
    }
    useEffect(() => {
        fetchCourseInfo();
    }, [])

    return (
        <div className="flex flex-col h-fit px-4 py-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex justify-center items-center w-3/10">
                    <Image imageSource={courseInfo.course_image_path} />
                </div>
                <div className="flex flex-col justify-start items-center w-4/10">
                    <div className="">
                        <p className="text-left">
                            {courseInfo.course_title}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <Button />
                        <Button />
                    </div>
                </div>
                <div className="flex flex-row justify-end items-start w-3/10">
                    <div className="flex flex-row justify-between mx-2">
                        <div className="w-fit">
                            <p><AccessTimeIcon fontSize="large"/></p>
                        </div>
                        <div className="w-fit">
                            <p>{courseInfo.course_length}</p>
                        </div>
                    </div>
                    <MoreVertIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}