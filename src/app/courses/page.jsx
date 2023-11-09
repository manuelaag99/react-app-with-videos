"use client"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TopNavigationBar from '../Components/TopNavigationBar';
import { useEffect, useState } from 'react';
import ModuleBox from '../Components/ModuleBox';
import { supabase } from '@supabase/auth-ui-shared';

export default function CoursePage ({}) {
    const [courseModules, setCourseModules] = useState();
    async function fetchModuleIds () {
        try {
            const { data, error } = await supabase.from("jk-modules").select("module_id").eq("course_id", courseId);
            if (error) console.log (error);
            setCourseModules(data);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchModuleIds();
    }, [])

    return (
        <div className="flex flex-col justify-center w-full">
            <TopNavigationBar />
            <div className="flex w-9/10 mx-auto justify-center bg-white rounded-md mt-14">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 px-5 py-7 items-center">
                        <div className="flex">
                            <div className="flex w-full py-2 font-bold">{courseTitle}</div>
                            <div className="flex w-full py-2">{courseDescription}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="flex justify-start">
                                <p className="text-left opacity-40">
                                    <AccessTimeIcon fontSize="large" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                        <img src="" alt="" />
                    </div>
                </div>
                {courseModules && <div className="flex flex-col justify-center w-full">
                    {courseModules.map((index, module) => {
                        return (
                            <ModuleBox key={index} moduleId={module.module_id} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}