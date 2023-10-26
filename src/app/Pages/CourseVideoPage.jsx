import VideoPlayer from "../Components/VideoPlayer";

export default function CourseVideoPage ({}) {
    return (
        <div className="w-full ">
            <VideoPlayer additionalClassNames="h-96" videoSource={selectedVideo} videoWidth="400" />
        </div>
    )
}