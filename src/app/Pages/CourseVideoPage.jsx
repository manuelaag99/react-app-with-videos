"use client"
import TopNavigationBar from "../Components/TopNavigationBar";
import VideoPlayer from "../Components/VideoPlayer";
import VideoUpload from "../Components/VideoUpload";

export default function CourseVideoPage ({}) {
    let selectedVideo = ""
    return (
        <div className="flex flex-col justify-center w-4/10 ">
            <TopNavigationBar />
            <VideoUpload />
            <VideoPlayer additionalClassNames="" videoSource={selectedVideo} videoHeight="450" videoWidth="800" />
        </div>
    )
}