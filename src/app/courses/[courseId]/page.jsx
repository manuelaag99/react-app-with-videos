"use client"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TopNavigationBar from '@/app/Components/TopNavigationBar';
import { useEffect, useState } from 'react';
import ModuleBox from '@/app/Components/ModuleBox';
import { supabase } from '@/app/supabase/client';

export default function CoursePage ({ params }) {
    const [courseInfo, setCourseInfo] = useState();
    async function fetchCourseInfo () {
        try {
            const { data, error } = await supabase.from("cai-courses").select().eq("course_id", params.courseId);
            if (error) console.log (error);
            setCourseInfo(data[0]);
        } catch (err) {
            console.log (err);
        }
    }

    const [courseModules, setCourseModules] = useState();
    async function fetchModuleIds () {
        try {
            const { data, error } = await supabase.from("cai-modules").select("module_id").eq("course_id", params.courseId);
            if (error) console.log (error);
            setCourseModules(data);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchCourseInfo();
        fetchModuleIds();
    }, [])

    return (
        <div className="flex flex-col justify-center w-full">
            <TopNavigationBar />
            <div className="flex flex-col w-85percent mx-auto justify-center bg-white rounded-md mt-40 mb-28 pb-16 shadow-2xl">
                
                <div className="flex sm:flex-row flex-col-reverse sm:justify-between justify-center w-full p-6">
                    <div className="flex flex-col sm:w-46percent w-full items-center mb-14">
                        <div className="flex flex-col w-full justify-start mb-10">
                            <div className="flex w-full mb-6">
                                {!courseInfo && <div className="rounded-2xl bg-gray-700 w-4/10 h-7 mt-1"></div>}
                                {courseInfo && <p className="font-bold text-left pr-6">{courseInfo.course_title}</p>}
                            </div>
                            <div className="flex w-full mb-6">
                                {!courseInfo && <div className="rounded-lg bg-gray-400 w-7/10 h-5 mt-1"></div>}
                                {courseInfo && <p className="text-left pr-6">{courseInfo.course_description}</p>}
                            </div>
                        </div>
                        <div className="flex w-full justify-start">
                            <div className="flex flex-row w-full justify-start">
                                <p className="text-left text-gray-400 mr-2"><AccessTimeIcon fontSize="medium" /></p>
                                {!courseInfo && <div className="rounded-lg bg-gray-300 w-3/10 h-5 mt-1"></div>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:w-46percent w-full">
                        <img src="" alt="" />
                    </div>
                </div>

                {courseModules && (courseModules.length > 0) && <div className="flex flex-col justify-center w-full">
                    {courseModules.map((module, index) => {
                        return (
                            <ModuleBox index={index} key={index} moduleId={module.module_id} />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}