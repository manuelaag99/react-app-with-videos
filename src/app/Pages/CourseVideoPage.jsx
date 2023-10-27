"use client"
import VideoPlayer from "../Components/VideoPlayer";
import VideoUpload from "../Components/VideoUpload";

export default function CourseVideoPage ({}) {
    let selectedVideo = ""
    return (
        <div className="w-full ">
            <VideoUpload />
            <VideoPlayer additionalClassNames="h-96" videoSource={selectedVideo} videoWidth="400" />
        </div>
    )
}