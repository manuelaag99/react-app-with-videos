"use client"
import { useState } from "react";
import Button from "../Components/Button";
import CreateContentPopUp from "../Components/Portals/CreateContentPopUp";
import TopNavigationBar from "../Components/TopNavigationBar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ItemList from "../Components/ItemList";

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
            <div className="flex flex-col sm:w-85percent w-95percent mx-auto justify-center items-start bg-white rounded-md sm:mt-40 mt-20 mb-28 pb-20 pt-7 px-7 shadow-2xl">

                <div className="flex flex-col w-full mb-8">
                    <div className="flex w-full justify-center">
                        <p className="text-center font-bold font-amatic text-page-title-desktop">
                            Modificar página principal
                        </p>
                        
                    </div>
                    <div className="flex flex-col w-full py-8">
                        <div className="flex flex-col w-full justify-center">
                            <div className="flex flex-row w-full">
                                <div className="flex w-4/10 pr-6">
                                    <p className="">
                                        Mostrar apartado de cursos
                                    </p>
                                </div>
                                <div className="flex w-6/10">
                                    <p className="">
                                        Texto para mostrar en apartado de cursos
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row w-full">
                                <div className="flex w-4/10 pr-6">
                                    <input type="checkbox" />
                                </div>
                                <div className="flex w-6/10">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full justify-center">
                            <div className="flex flex-row w-full">
                                <div className="flex w-4/10 pr-6">
                                    <p className="">
                                        Mostrar apartado de productos
                                    </p>
                                </div>
                                <div className="flex w-6/10">
                                    <p className="">
                                        Texto para mostrar en apartado de productos
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row w-full">
                                <div className="flex w-4/10 pr-6">
                                    <input type="checkbox" />
                                </div>
                                <div className="flex w-6/10">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row w-full">
                    <div className="flex flex-col justify-center sm:w-1/2 w-full items-start">
                        <div className="flex justify-center w-full mx-auto ">
                            <p className="text-center text-black font-bold font-amatic text-page-title-desktop">
                                Cursos
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center w-full mb-4 mx-auto mt-4">
                            <Button contentForButton="Crear un curso" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewCourse}  />
                            <Button contentForButton="Crear un módulo" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewModule}  />
                        </div>

                        <ItemList listCategory="courses" listTitle="Lista de cursos" />
                    </div>

                    <div className="flex flex-col justify-center sm:w-1/2 w-full items-start">
                        <div className="flex justify-center w-full mx-auto ">
                            <p className="text-center text-black font-bold font-amatic text-page-title-desktop">
                                Productos
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center w-full mb-4 mx-auto mt-4">
                            <Button contentForButton="Crear un producto" additionalClassNamesForButton=" w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewCourse}  />
                        </div>

                        <ItemList listCategory="products" listTitle="Lista de productos" />
                    </div>
                </div>
                
                




            </div>

            <CreateContentPopUp content={contentToCreate} onClose={() => setOpenCreatePortal(false)} open={openCreatePortal} />
        </div>
    )
}