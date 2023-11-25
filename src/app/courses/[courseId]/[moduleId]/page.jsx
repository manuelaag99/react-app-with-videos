"use client"
import { useEffect, useState } from "react";
import TopNavigationBar from "../../../Components/TopNavigationBar";
import VideoPlayer from "../../../Components/VideoPlayer";
import { supabase } from "@/app/supabase/client";

export default function CourseVideoPage ({ params }) {
    let selectedVideo = ""
    let courseVideoTitle = "Curso de preparación de Macaronis: Módulo 1"
    let courseVideoDescription = "Lorem ipsum"

    const [videoComments, setVideoComments] = useState([]);

    console.log(params.moduleId);
    const [moduleInfo, setModuleInfo] = useState();
    async function fetchModuleInfo () {
        try {
            const { data, error } = await supabase.from("cai-modules").select().eq("module_id", params.moduleId);
            if (error) console.log (error);
            setModuleInfo(data[0]);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchModuleInfo();
    }, [])

    if (!moduleInfo) {
        return null;
    } else {
        return (
            <div className="flex flex-col justify-center w-full ">
                <TopNavigationBar />
                <div className="flex flex-col justify-center sm:w-85percent w-95percent mx-auto bg-white rounded-md sm:mt-40 mt-20 mb-28 shadow-lg ">
                    <div className="flex flex-col w-full px-6 py-7">
                        <div className="flex w-full py-2 font-bold font-amatic text-black text-page-title-desktop -mt-6">{moduleInfo.module_title}</div>
                        <div className="flex w-full py-2 font-medium font-rubik text-gray-400">{moduleInfo.module_description}</div>
                    </div>
                    <div className="flex flex-col w-95percent mx-auto mb-10 ">
                        <VideoPlayer additionalClassNames="" videoSource={moduleInfo.module_video_path} videoHeight="1080" videoWidth="1920" />
                    </div>
                    <div className="flex flex-col w-full px-6 py-3 h-fit mb-7">
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