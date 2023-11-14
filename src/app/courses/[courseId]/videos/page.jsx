"use client"
import { useState } from "react";
import TopNavigationBar from "../../../Components/TopNavigationBar";
import VideoPlayer from "../../../Components/VideoPlayer";

export default function CourseVideoPage ({}) {
    let selectedVideo = ""
    let courseVideoTitle = "Curso de preparación de Macaronis: Módulo 1"
    let courseVideoDescription = "Lorem ipsum"

    const [videoComments, setVideoComments] = useState([]);

    return (
        <div className="flex flex-col justify-center w-full ">
            <TopNavigationBar />
            <div className="flex flex-col justify-center w-9/10 mx-auto bg-white rounded-md my-24 shadow-lg ">
                <div className="flex flex-col w-full px-5 py-7">
                    <div className="flex w-full py-2 font-bold">{courseVideoTitle}</div>
                    <div className="flex w-full py-2">{courseVideoDescription}</div>
                </div>
                <div className="flex flex-col w-9/10 mx-auto mb-10 ">
                    <VideoPlayer additionalClassNames="" videoSource={selectedVideo} videoHeight="1080" videoWidth="1920" />
                </div>
                <div className="flex flex-col w-full px-5 py-3 h-fit mb-7">
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