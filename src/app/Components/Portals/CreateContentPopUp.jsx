import { createPortal } from "react-dom";
import Button from "../Button";
import VideoUpload from "../VideoUpload";
import { supabase } from "@/app/supabase/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateContentPopUp ({ content, onClose, open }) {
    const [newContent, setNewContent] = useState({ title: "", description: "", thumbnail: "", video: "" });

    function inputChangeHandle (e) {
        console.log(e.target.name);
        let field = e.target.name;
        let value = e.target.value;
        setNewContent({ ...newContent, [field]: value })
    }

    console.log(newContent)
    let newCourseId;
    async function createCourse () {
        newCourseId = uuidv4();
        try {
            const { error } = await supabase.from("cai-courses").insert({ course_id: newCourseId, course_title: newContent.title, course_description: newContent.description, course_image_path: newContent.thumbnail, course_preview_path: newContent.video });
            if (error) console.log (err)
        } catch (err) {
            console.log (err);
        }
    }

    let newModuleId;
    async function createModule () {
        newModuleId = uuidv4();
        try {
            const { error } = await supabase.from("cai-modules").insert({ course_id: newModuleId, course_title: newContent.title, course_description: newContent.description, course_image_path: newContent.thumbnail, course_preview_path: newContent.video  });
            if (error) console.log (err)
        } catch (err) {
            console.log (err);
        }
    }

    function createButtonAction () {
        if (content === "module") {
            createModule();
        } else if (content === "course") {
            createCourse();
        }
    }

    console.log(uuidv4())

    const createContentPopUp = (
        <div className="h-full">
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-30" onClick={onClose}></div>
            <div className="flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-fit bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] top-[8%] z-40 p-4 sm:p-9 ">
                <div className="flex justify-center mx-auto w-95percent ">
                    <p className="font-amatic font-bold text-sign-in-or-sign-up-title-desktop">
                        {(content === "course") && "Crear curso"}
                        {(content === "module") && "Crear módulo"}
                    </p>
                </div>

                <div className="flex flex-col mx-auto w-95percent my-3">
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Nombre del curso</label>}
                    {(content === "course") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" name="title" onChange={inputChangeHandle} placeholder="Nombre del curso..." type="text" />}
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Descripción del curso</label>}
                    {(content === "course") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" name="description" onChange={inputChangeHandle} placeholder="Descripción del curso..." type="text" />}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Nombre del módulo</label>}
                    {(content === "module") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" name="title" onChange={inputChangeHandle} placeholder="Nombre del módulo..." type="text" />}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Descripción del módulo</label>}
                    {(content === "module") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" name="description" onChange={inputChangeHandle} placeholder="Descripción del módulo..." type="text" />}

                </div>

                <div className="flex flex-col w-95percent mx-auto">
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un curso, se recomienda agregar un video con un pequeño fragmento de algún modulo. Asimismo, para que el curso tenga una miniatura, puedes subir una imagen, de dimensiones 16:9.</label>}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un módulo, tienes que subir a continuación el video corespondiente, así como una miniatura del mismo, de dimensiones 16:9.</label>}
                    <div className="flex flex-row justify-between w-full mx-auto h-28 mb-3">
                        {(content === "course") && <div className="flex w-46percent h-full">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el curso" sendFile={(file) => setNewContent({...newContent, image: file})} typeOfFile="image" />
                        </div>}
                        {(content === "course") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video de fragmento del curso" sendFile={(file) => setNewContent({...newContent, video: file})} typeOfFile="video" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el módulo" sendFile={(file) => setNewContent({...newContent, image: file})} typeOfFile="image" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video correspondiente al módulo" sendFile={(file) => setNewContent({...newContent, video: file})} typeOfFile="video" />
                        </div>}
                    </div>
                </div>

                <Button additionalClassNamesForButton=" w-95percent py-3 bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto rounded-sm my-3" additionalClassNamesForText=" text-white text-button-desktop font-amatic font-bold" contentForButton="Crear" onClickButtonAction={createButtonAction} />
            </div>
        </div>
    );

    if (open) {
        return createPortal(createContentPopUp, document.body);
    } else {
        return null;
    }
}