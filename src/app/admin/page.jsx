"use client"
import { useState } from "react";
import Button from "../Components/Button";
import CreateContentPopUp from "../Components/Portals/CreateContentPopUp";
import TopNavigationBar from "../Components/TopNavigationBar";

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
            <div className="flex flex-col sm:w-85percent w-95percent mx-auto justify-center bg-white rounded-md sm:mt-40 mt-20 mb-28 pb-16 pt-7 px-7 shadow-2xl">

                <div className="flex justify-center w-9/10 mx-auto ">
                    <p className="text-center text-black font-bold font-amatic text-page-title-desktop">
                        Cursos
                    </p>
                </div>
                <div className="flex flex-row justify-around w-9/10 mb-4 mx-auto mt-4">
                    <Button contentForButton="Crear un curso" additionalClassNamesForButton=" w-3/10 bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewCourse}  />
                    <Button contentForButton="Crear un módulo" additionalClassNamesForButton=" w-3/10 bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold" onClickButtonAction={createNewModule}  />
                </div>

            </div>
            <CreateContentPopUp content="module" onClose={() => setOpenCreatePortal(false)} open={openCreatePortal} />
        </div>
    )
}