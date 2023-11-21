import { supabase } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react"

export default function Thumbnail ({ thumbnailImageId }) {
    const [imageForThumbnail, setImageForThumbnail] = useState();
    async function fetchImageForThumbnail () {
        try {
            const { data, error } = await supabase.storage.from("cai-thumbnails").getPublicUrl(thumbnailImageId);
            if (error) console.log (error);
            setImageForThumbnail(data.publicUrl);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchImageForThumbnail();
    }, [])

    console.log(imageForThumbnail)

    if (!imageForThumbnail) {
        return null;
    } else {
        return (
            <div className="flex w-full h-full">
                {imageForThumbnail && <img className="h-full w-full object-cover" src={imageForThumbnail} alt="" />}
                {!imageForThumbnail && <div className="flex bg-gray-400 w-full h-full"></div>}
            </div>
        )
    }
}