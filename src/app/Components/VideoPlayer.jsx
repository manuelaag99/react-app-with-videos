import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function VideoPlayer ({ additionalClassNames, existingVideoSource, videoSource }) {
    const [videoToPlay, setVideoToPlay] = useState();

    async function fetchVideo () {
        try {
            const { data, error } = await supabase.storage.from("cai-videos").getPublicUrl(videoSource);
            if (error) console.log(error);
            setVideoToPlay(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchVideo();
    }, [videoSource])

    // useEffect(() => {
    //     if (existingVideoSource) {
    //         setVideoToPlay(existingVideoSource);
    //     }
    // }, [existingVideoSource])

    console.log(videoSource)
    console.log(videoToPlay)

    if (!videoToPlay) {
        return null;
    } else {
        return (
            <div className={"flex w-full mx-auto my-5 " + additionalClassNames}>
                <video className="object-cover w-full rounded-md " controls >
                    <source src={videoToPlay} type="video/mp4" />
                    Your browser does not support this video tag.
                </video>
            </div>
        )
    }
}