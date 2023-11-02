import Button from "./Button";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

export default function CourseBox ({ courseTitle }) {
    const [courseInfo, setCourseInfo] = useState ();
    const [courseImage, setCourseImage] = useState ();

    
    return (
        <div className="flex flex-col h-fit px-4 py-2">
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex justify-center items-center w-3/10">
                    <img src={courseImage} alt="" />
                </div>
                <div className="flex flex-col justify-start items-center w-4/10">
                    <div className="">
                        <p className="text-left">
                            {courseTitle}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <Button />
                        <Button />
                    </div>
                </div>
                <div className="flex flex-row justify-end items-start w-3/10">
                    <div className="flex flex-row justify-between mx-2">
                        <AccessTimeIcon fontSize="large"/>
                        <p></p>
                    </div>
                    <MoreVertIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}