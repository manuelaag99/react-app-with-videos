import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function VideoUpload ({}) {
    const [file, setFile] = useState();
    const [previewVideo, setPreviewVideo] = useState();

    useEffect(() => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => setPreviewVideo(fileReader.result);
        fileReader.readAsDataURL(file);
    }, [file])

    function uploadImage (e) {
        setPreviewVideo(e.target.file[0])
        setFile(e.target.file[0]);
    }

    return (
        <div className="w-full my-5 ">
            <input onChange={(e) => uploadImage(e)} type="file" />
        </div>
    )
}