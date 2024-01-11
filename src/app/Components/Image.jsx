import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function Image ({ additionalClassNames, imageAlt, imageSource }) {
    const [image, setImage] = useState ();
    async function fetchImage () {
        try {
            const { data, error } = await supabase.storage.from("cai-images").getPublicUrl(imageSource);
            if (error) console.log (error);
            setImage(data.publicUrl);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchImage();
    }, [])
    
    return (
        <div className={"" + additionalClassNames}>
            {image && <img className="h-full w-full object-cover cursor-pointer hover:opacity-40 duration-200 rounded-md " src={image} alt={imageAlt || null} />}
            {!image && <div className="h-full w-full bg-gray-400 cursor-pointer"></div>}
        </div>
    )
}