import { useState } from "react"

export default function VideoPlayer ({ additionalClassNames, videoSource, videoWidth }) {
    const [videoToPlay, setVideoToPlay] = useState();

    if (!videoToPlay) {
        return null;
    } else {
        return (
            <div className={"w-full" + additionalClassNames}>
                <video controls width={videoWidth} >
                    <source src={videoToPlay} type="video/mp4" />
                    Your browser does not support this video tag.
                </video>
            </div>
        )
    }
}