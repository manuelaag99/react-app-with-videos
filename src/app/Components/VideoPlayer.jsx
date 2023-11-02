import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function VideoPlayer ({ additionalClassNames, videoSource, videoHeight, videoWidth }) {
    const [videoToPlay, setVideoToPlay] = useState();

    async function fetchVideo () {
        try {
            const { data, error } = await supabase.storage.from("cai-videos").getPublicUrl("Videos para curso/" + "samplevideo.mp4");
            if (error) console.log(error);
            setVideoToPlay(data.publicUrl);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchVideo();
    }, [])

    if (!videoToPlay) {
        return null;
    } else {
        return (
            <div className={"flex w-full mx-auto my-5 " + additionalClassNames}>
                {/* <video className="object-cover " controls height={videoHeight} width={videoWidth} > */}
                <video className="object-cover w-full " controls >
                    <source src={videoToPlay} type="video/mp4" />
                    Your browser does not support this video tag.
                </video>
            </div>
        )
    }
}