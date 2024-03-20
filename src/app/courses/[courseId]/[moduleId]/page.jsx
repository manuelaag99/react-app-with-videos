"use client"
import { useEffect, useState } from "react";
import TopNavigationBar from "../../../Components/TopNavigationBar";
import VideoPlayer from "../../../Components/VideoPlayer";
import { supabase } from "@/app/supabase/client";
import { useAuthContext } from "@/app/utils/AuthContext";

export default function CourseVideoPage ({ params }) {
    const auth = useAuthContext();

    const [moduleInfo, setModuleInfo] = useState();
    async function fetchModuleInfo () {
        try {
            const { data, error } = await supabase.from("cai-modules").select().eq("id", params.moduleId);
            if (error) console.log (error);
            setModuleInfo(data[0]);
        } catch (err) {
            console.log (err);
        }
    }
    const [videoComments, setVideoComments] = useState();
    async function fetchVideoComments () {
        try {
            const { data, error } = await supabase.from("cai-comments").select().eq("comment_module_id", params.moduleId);
            if (error) console.log (error);
            setVideoComments(data);
        } catch (err) {
            console.log (err);
        }
    }

    const [coursesThatTheUserHasPurchased, setCoursesThatTheUserHasPurchased] = useState();
    const [hasUserPurchasedThisCourse, setHasUserPurchasedThisCourse] = useState(false);
    async function fetchCoursesThatTheUserHasPurchased () {
        try {
            const { data, error } = await supabase.from("cai-purchased-courses").select().eq("user_id", auth.userId);
            if (error) console.log (error);
            setCoursesThatTheUserHasPurchased(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (coursesThatTheUserHasPurchased) {
            coursesThatTheUserHasPurchased.some((course) => {
                if (course.user_id === auth.userId) {
                    setHasUserPurchasedThisCourse(true);
                } else {
                    setHasUserPurchasedThisCourse(false);
                }
            })
        }
    }, [coursesThatTheUserHasPurchased])

    useEffect(() => {
        fetchModuleInfo();
        fetchVideoComments();
        fetchCoursesThatTheUserHasPurchased();
    }, [])

    if (!moduleInfo || !coursesThatTheUserHasPurchased) {
        return null;
    } else {
        return (
            <div className="flex flex-col justify-center w-full ">
                <TopNavigationBar />
                <div className="flex flex-col justify-center sm:w-85percent w-95percent mx-auto bg-white rounded-md sm:mt-40 mt-20 mb-28 shadow-lg ">
                    {coursesThatTheUserHasPurchased && hasUserPurchasedThisCourse && <div className="flex flex-col w-full px-10 py-7">
                        <div className="flex w-full py-2 font-bold font-amatic text-black text-page-title-desktop -mt-6">{moduleInfo.title}</div>
                        <div className="flex w-full py-2 font-medium font-rubik text-gray-400">{moduleInfo.description}</div>
                    </div>}
                    {coursesThatTheUserHasPurchased && hasUserPurchasedThisCourse && <div className="flex flex-col w-9/10 mx-auto mb-10 ">
                        <VideoPlayer additionalClassNames=" my-5" videoSource={moduleInfo.module_video_path} />
                    </div>}
                    {coursesThatTheUserHasPurchased && !hasUserPurchasedThisCourse && <div>
                        <p className="text-center text-black">
                            Lo sentimos, no tienes acceso a esto porque no has comprado este curso.
                        </p>
                    </div>}
                    <div className="flex flex-col w-full px-10 py-3 h-fit mb-7">
                        <div className="flex w-full py-2">
                            <p className="font-bold">
                                Comentarios
                            </p>
                        </div>
                        {videoComments && <div className="flex flex-col w-full px-10 py-2">
                            {videoComments.map((comment, index) => {
                                return <div className="" key={index} >
                                    <p>
    
                                    </p>
                                </div>
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}