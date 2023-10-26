import { useEffect, useState } from "react"

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
        <div>
            <input onChange={(e) => uploadImage(e)} type="file" />
        </div>
    )
}