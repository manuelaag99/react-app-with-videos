import { createPortal } from "react-dom";
import Button from "../Button";
import VideoUpload from "../VideoUpload";

export default function CreateContentPopUp ({ content, onClose, open }) {
    const createContentPopUp = (
        <div className="h-full">
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-30" onClick={onClose}></div>
            <div className="flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-fit bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] top-[10%] z-40 p-4 sm:p-9 ">
                <div className="flex justify-center mx-auto w-95percent ">
                    <p className="font-amatic font-bold text-sign-in-or-sign-up-title-desktop">
                        {(content === "course") && "Crear curso"}
                        {(content === "module") && "Crear módulo"}
                    </p>
                </div>

                <div className="flex flex-col mx-auto w-95percent my-3">
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Nombre del curso</label>}
                    {(content === "course") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" placeholder="Nombre del curso..." type="text" />}
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Descripción del curso</label>}
                    {(content === "course") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" placeholder="Descripción del curso..." type="text" />}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Nombre del módulo</label>}
                    {(content === "module") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" placeholder="Nombre del módulo..." type="text" />}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold" htmlFor="">Descripción del módulo</label>}
                    {(content === "module") && <input className="w-full py-3 px-2 mb-3 bg-gray-200 rounded-sm" placeholder="Descripción del módulo..." type="text" />}

                </div>

                <div className="flex flex-col w-95percent mx-auto">
                    {(content === "course") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un curso, se recomienda agregar un video con un pequeño fragmento de algún modulo. Asimismo, para que el curso tenga una miniatura, puedes subir una imagen, de dimensiones 16:9.</label>}
                    {(content === "module") && <label className="text-sign-in-or-sign-up-labels-desktop font-bold w-full text-left" htmlFor="">Si vas a crear un módulo, tienes que subir a continuación el video corespondiente, así como una miniatura del mismo, de dimensiones 16:9.</label>}
                    <div className="flex flex-row justify-between w-full mx-auto h-28 mb-3">
                        {(content === "course") && <div className="flex w-46percent h-full">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el curso" typeOfFile="image" />
                        </div>}
                        {(content === "course") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video de fragmento del curso" typeOfFile="video" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Miniatura para el módulo" typeOfFile="image" />
                        </div>}
                        {(content === "module") && <div className="flex w-46percent">
                            <VideoUpload additionalClassnames=" h-full" instructionForUpload="Video correspondiente al módulo" typeOfFile="video" />
                        </div>}
                    </div>
                </div>

                <Button additionalClassNamesForButton=" w-95percent py-3 bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto rounded-sm my-3" additionalClassNamesForText=" text-white text-button-desktop font-amatic font-bold" contentForButton="Crear" onClickButtonAction={() => console.log("click")} />
            </div>
        </div>
    );

    if (open) {
        return createPortal(createContentPopUp, document.body);
    } else {
        return null;
    }
}