import { createPortal } from "react-dom";
import Button from "../Button";
import VideoUpload from "../VideoUpload";
import { supabase } from "@/app/supabase/client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GeneralPopUp from "./GeneralPopUp";

export default function CreateContentPopUp ({ content, onClose, open }) {
    const [error, setError] = useState();
    const [openGeneralPopUp, setOpenGeneralPopUp] = useState(false);
    const [messageForGeneralPopUp, setMessageForGeneralPopUp] = useState("");

    const [newContent, setNewContent] = useState({ title: '', description: '', thumbnail: '', video: '' });

    function inputChangeHandle (e) {
        console.log(e.target.name);
        let field = e.target.name;
        let value = e.target.value;
        setNewContent({ ...newContent, [field]: value });
    }

    let newCourseId;
    async function createCourse () {
        newCourseId = uuidv4();
        try {
            const { error } = await supabase.from("cai-courses").insert({ course_id: newCourseId, course_title: newContent.title, course_description: newContent.description, course_image_path: "courseThumbnails/" + newContent.thumbnail.name, course_video_path: "coursePreviewVideos/" + newContent.video.name });
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        try {
            const { error } = await supabase.storage.from("cai-images").upload("courseThumbnails/" + newContent.thumbnail.name, newContent.thumbnail);
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        try {
            const { error } = await supabase.storage.from("cai-videos").upload("coursePreviewVideos/" + newContent.video.name, newContent.video);
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        if (error) {
            setMessageForGeneralPopUp("There was an error, please try again.")
            setOpenGeneralPopUp(true);
        } else if (!error) {
            setMessageForGeneralPopUp("Successfully created new content!")
            setOpenGeneralPopUp(true);
        }
    }

    let newModuleId;
    async function createModule () {
        newModuleId = uuidv4();
        try {
            const { error } = await supabase.from("cai-modules").insert({ course_id: newContent.course, module_id: newModuleId, module_title: newContent.title, module_description: newContent.description, module_image_path: "moduleThumbnails/" + newContent.thumbnail.name, module_video_path: "moduleVideos/" + newContent.video.name  });
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        try {
            const { error } = await supabase.storage.from("cai-images").upload("moduleThumbnails/" + newContent.thumbnail.name, newContent.thumbnail);
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        try {
            const { error } = await supabase.storage.from("cai-videos").upload("moduleVideos/" + newContent.video.name, newContent.video);
            if (error) setError(error);
        } catch (err) {
            setError(err);
        }
        if (error) {
            setMessageForGeneralPopUp("There was an error, please try again.")
            setOpenGeneralPopUp(true);
        } else if (!error) {
            setMessageForGeneralPopUp("Successfully created new content!")
            setOpenGeneralPopUp(true);
        }
    }

    function createButtonAction () {
        if (content === "module") {
            createModule();
        } else if (content === "course") {
            createCourse();
        }
    }

    const [courses, setCourses] = useState();
    async function fetchCourses () {
        try {
            const { data, error } = await supabase.from("cai-courses").select();
            if (error) console.log(error);
            setCourses(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [])

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        if (content === "module") {
            if (!newContent.course) {
                setIsButtonDisabled(true);
            } else if (newContent.course === 'select') {
                setIsButtonDisabled(true);
            } else if ((newContent.title !== '') && (newContent.description !== '') && (newContent.course !== '') && (newContent.thumbnail !== '') && (newContent.video !== '')) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else if (content === "course") {
            if ((newContent.title !== '') && (newContent.description !== '') && (newContent.thumbnail !== '') && (newContent.video !== '')) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    }, [newContent])

    function closePopUp () {
        setNewContent({ title: '', description: '', thumbnail: '', video: '' });
        onClose();
    }

    console.log(courses)
    console.log(newContent)

    const createContentPopUp = (
        <div className="h-full">
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={closePopUp}></div>
            <div className="flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-fit bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] top-[6%] z-30 p-4 sm:p-9 ">
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

                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Curso al que pertenece</label>}
                    {(content === "module") && <select className="w-full py-4 px-2 mb-3 bg-gray-200 rounded-sm" defaultValue="" name="course" onChange={inputChangeHandle} onSelect={inputChangeHandle} placeholder="Nombre del curso..." >
                        <option className="w-full bg-gray-200 " value="select">--Selecciona un curso--</option>
                        {courses && courses.length > 0 && courses.map((course, index) => {
                            return (<option className="w-full bg-gray-200 " key={index} value={course.id}>{course.title}</option>)
                        })}
                    </select>}


                </div>

                <div className="flex flex-col w-95percent mx-auto">
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un curso, se recomienda agregar un video con un pequeño fragmento de algún modulo. Asimismo, para que el curso tenga una miniatura, puedes subir una imagen, de dimensiones 16:9.</label>}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un módulo, tienes que subir a continuación el video corespondiente, así como una miniatura del mismo, de dimensiones 16:9.</label>}
                    <div className="flex flex-row justify-between w-full mx-auto h-28 mb-3">
                        {(content === "course") && <div className="flex w-46percent h-full">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el curso" sendFile={(file) => setNewContent({...newContent, thumbnail: file})} typeOfFile="image" />
                        </div>}
                        {(content === "course") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video de fragmento del curso" sendFile={(file) => setNewContent({...newContent, video: file})} typeOfFile="video" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el módulo" sendFile={(file) => setNewContent({...newContent, thumbnail: file})} typeOfFile="image" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video correspondiente al módulo" sendFile={(file) => setNewContent({...newContent, video: file})} typeOfFile="video" />
                        </div>}
                    </div>
                </div>

                <Button additionalClassNamesForButton=" w-95percent py-3 bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto rounded-sm my-3 disabled:bg-slate-500 justify-center " additionalClassNamesForText=" text-white text-button-desktop font-amatic font-bold text-center " contentForButton="Crear" isDisabled={isButtonDisabled} onClickButtonAction={createButtonAction} />
            </div>
            <GeneralPopUp onClose={() => setOpenGeneralPopUp(false)} open={openGeneralPopUp} textForPopUp={messageForGeneralPopUp} />
        </div>
    );

    if (open) {
        return createPortal(createContentPopUp, document.body);
    } else {
        return null;
    }
}