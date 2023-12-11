import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideocamIcon from '@mui/icons-material/Videocam';
import Videocam from "@mui/icons-material/Videocam";

export default function VideoUpload ({ additionalClassnames, instructionForUpload, typeOfFile }) {
    const imageSelectorRef = useRef();
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => setPreview(fileReader.result);
        fileReader.readAsDataURL(file);
    }, [file])

    function cancelImageUpload () {
        if (file) {
            setFile();
            setPreview();
        } else {
            setPreview();
        }
    }

    function uploadImage (e) {
        setPreview(e.target.file[0])
        setFile(e.target.file[0]);
    }

    function selectFileHandler (e) {
        imageSelectorRef.current.click(e);
    }



    return (
        <div className={"flex justify-center w-full " + additionalClassnames}>
            <div className="flex justify-center w-full h-full relative aspect-square">
                {/* {preview && isPostPhoto && <div className="absolute top-0 right-0 m-2 z-20">
                    <button className="bg-black hover:bg-gray-600 duration-200 rounded-post px-2 text-white mr-3" onClick={(e) => selectFileHandler(e)}>
                        change
                    </button>
                    <button className="bg-black hover:bg-gray-600 duration-200 rounded-post px-2 text-white" onClick={cancelImageUpload}>
                        <CloseIcon />
                    </button>
                </div>} */}
                {!file && !preview && <button className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 duration-200 w-full h-full z-10 cursor-pointer rounded-sm " onClick={(e) => selectFileHandler(e)}>
                    {(typeOfFile === "image") && <p className="text-gray-600 text-center cursor-pointer z-20 w-85percent mx-auto " onClick={(e) => selectFileHandler(e)}>
                        <InsertPhotoIcon />  {instructionForUpload}
                    </p>}
                    {(typeOfFile === "video") && <p className="text-gray-600 text-center cursor-pointer z-20 w-85percent mx-auto " onClick={(e) => selectFileHandler(e)}>
                        <Videocam />  {instructionForUpload}
                    </p>}
                </button>}
                {preview && <img alt="image" className="object-contain aspect-square w-full z-10 cursor-pointer  " src={preview}  />}
                <input className="w-9/10 text-center hidden" onChange={(e) => uploadImage(e)} ref={imageSelectorRef} type="file" />
            </div>
        </div>
    )
}