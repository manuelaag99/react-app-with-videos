"use client"
import { useState } from "react";
import Button from "../Components/Button";
import CreateContentPopUp from "../Components/Portals/CreateContentPopUp";
import TopNavigationBar from "../Components/TopNavigationBar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AdminPage () {

    const [contentToCreate, setContentToCreate] = useState();
    const [openCreatePortal, setOpenCreatePortal] = useState();

    function createNewCourse () {
        setContentToCreate("course");
        setOpenCreatePortal(true);
    }

    function createNewModule () {
        setContentToCreate("module");
        setOpenCreatePortal(true);
    }
    return (
        <div>
            <TopNavigationBar />
            <div className="flex flex-col sm:flex-row sm:w-85percent w-95percent mx-auto justify-center items-start bg-white rounded-md sm:mt-40 mt-20 mb-28 pb-20 pt-7 px-7 shadow-2xl">

                <div className="flex flex-col justify-center sm:w-1/2 w-full">
                    <div className="flex justify-center w-full mx-auto ">
                        <p className="text-center text-black font-bold font-amatic text-page-title-desktop">
                            Cursos
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center w-full mb-4 mx-auto mt-4">
                        <Button contentForButton="Crear un curso" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewCourse}  />
                        <Button contentForButton="Crear un módulo" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewModule}  />
                    </div>

                    <div className="flex w-full mt-2 mb-1 justify-center items-center">
                        <p className="text-center font-bold font-rubik">Lista de cursos</p>
                    </div>
                    <div className="flex flex-col justify-center w-9/10 overflow-y-scroll my-2 mx-auto font-rubik max-h-64">
                        <div className="flex w-full h-fit">
                            <div className="flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer">
                                <div className="flex w-full sm:w-8/10">
                                    Nombre de artículo
                                </div>
                                <div className="flex flex-row w-2/10">
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <EditIcon color="black" />
                                    </button>
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <DeleteIcon color="black" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-center sm:w-1/2 w-full">
                    <div className="flex justify-center w-full mx-auto ">
                        <p className="text-center text-black font-bold font-amatic text-page-title-desktop">
                            Productos
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center w-full mb-4 mx-auto mt-4">
                        <Button contentForButton="Crear un producto" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewCourse}  />
                    </div>

                    <div className="flex w-full mt-2 mb-1 justify-center items-center">
                        <p className="text-center font-bold font-rubik">Lista de productos</p>
                    </div>
                    <div className="flex flex-col justify-center w-9/10 overflow-y-scroll my-2 mx-auto font-rubik max-h-64">
                        <div className="flex w-full h-fit">
                            <div className="flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer">
                                <div className="flex w-full sm:w-8/10">
                                    Nombre de artículo
                                </div>
                                <div className="flex flex-row w-2/10">
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <EditIcon color="black" />
                                    </button>
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <DeleteIcon color="black" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <CreateContentPopUp content={contentToCreate} onClose={() => setOpenCreatePortal(false)} open={openCreatePortal} />
        </div>
    )
}