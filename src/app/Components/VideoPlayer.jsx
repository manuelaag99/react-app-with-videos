export default function VideoPlayer ({ additionalClassNames, videoSource, videoWidth }) {
    return (
        <div className={"w-full" + additionalClassNames}>
            <video controls width={videoWidth} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support this video tag.
            </video>
        </div>
    )
}