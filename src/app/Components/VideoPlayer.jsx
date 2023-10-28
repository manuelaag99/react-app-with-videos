import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function VideoPlayer ({ additionalClassNames, videoSource, videoWidth }) {
    const [videoToPlay, setVideoToPlay] = useState();

    async function fetchVideo () {
        try {
            const { data, error } = await supabase.storage.from("cai-videos").getPublicUrl("Videos para curso/" + "samplevideo");
            if (error) console.log(error);
            setVideoToPlay(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, [])

    console.log(videoToPlay)
    if (!videoToPlay) {
        return null;
    } else {
        return (
            <div className={"w-full my-5" + additionalClassNames}>
                <video controls width={videoWidth} >
                    <source src={videoToPlay} type="video/mp4" />
                    Your browser does not support this video tag.
                </video>
            </div>
        )
    }
}