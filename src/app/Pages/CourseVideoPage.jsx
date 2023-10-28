"use client"
import TopNavigationBar from "../Components/TopNavigationBar";
import VideoPlayer from "../Components/VideoPlayer";
import VideoUpload from "../Components/VideoUpload";

export default function CourseVideoPage ({}) {
    let selectedVideo = ""
    return (
        <div className="flex flex-col justify-center w-4/10 ">
            <TopNavigationBar />
            <div className="flex flex-col w-full mt-12">
                <VideoUpload />
                <VideoPlayer additionalClassNames="" videoSource={selectedVideo} videoHeight="450" videoWidth="800" />
            </div>
        </div>
    )
}