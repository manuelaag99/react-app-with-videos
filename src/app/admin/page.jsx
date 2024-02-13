"use client"
import { useEffect, useState } from "react";
import Button from "../Components/Button";
import CreateContentPopUp from "../Components/Portals/CreateContentPopUp";
import TopNavigationBar from "../Components/TopNavigationBar";
import ItemList from "../Components/ItemList";
import { supabase } from "../supabase/client";

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

    function createNewProduct () {
        setContentToCreate("product");
        setOpenCreatePortal(true);
    }

    const [sectionForHomePage, setSectionForHomePage] = useState({ showCourses: null, contentCourses: "", showProducts: null, contentProducts: "" });
    function inputsForSectionsChangeHandle (e) {
        console.log("click")
        let field = e.target.name;
        let newValue = e.target.value;
        if (e.target.type === "checkbox") {
            setSectionForHomePage({ ...sectionForHomePage, [field]: !sectionForHomePage[field] });
        } else {
            setSectionForHomePage({ ...sectionForHomePage, [field]: newValue });
        }
    }

    const [homeInfo, setHomeInfo] = useState();
    async function fetchHomeInfo () {
		try {
			const { data, error } = await supabase.from("cai-home-info").select();
			if (error) console.log (error);
			setHomeInfo(data[0]);
		} catch (err) {
			console.log(err);
		}
	}
    useEffect(() => {
        fetchHomeInfo();
    }, [])

    console.log(sectionForHomePage)
    useEffect(() => {
        if (homeInfo) {
            setSectionForHomePage({ ...sectionForHomePage, contentCourses: homeInfo.coursesInfo, showCourses: homeInfo.showCourses, contentProducts: homeInfo.productsInfo, showProducts: homeInfo.showProducts });
        }
    }, [homeInfo])

    async function updateHomeInfo () {
        try {
            if (!homeInfo) {
                const { error } = await supabase.from("cai-home-info").insert({ id: "1", coursesInfo: sectionForHomePage.contentCourses, showCourses: sectionForHomePage.showCourses, productsInfo: sectionForHomePage.contentProducts, showProducts: sectionForHomePage.showProducts });
                if (error) console.log (error);
            } else {
                const { error } = await supabase.from("cai-home-info").update({ coursesInfo: sectionForHomePage.contentCourses, showCourses: sectionForHomePage.showCourses, productsInfo: sectionForHomePage.contentProducts, showProducts: sectionForHomePage.showProducts }).eq("id", "1");
                if (error) console.log (error);
            }
        } catch (err) {
            console.log(err);
        }
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
                    <div className="flex flex-col w-full py-6">
                        <div className="flex flex-col w-full justify-center sm:mb-3">
                            <div className="flex flex-row w-full">
                                <div className="flex w-full">
                                    <p className="font-bold text-left">
                                        Apartado de cursos
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full">
                                <div className="flex w-full sm:w-4/10 sm:pr-6 items-start py-2">
                                    <div>
                                        <input id="showCourses" name="showCourses" type="checkbox" defaultChecked={sectionForHomePage.showCourses} onClick={(e) => inputsForSectionsChangeHandle(e)} onChange={(e) => inputsForSectionsChangeHandle(e)} />
                                        <label className="text-left pl-1" htmlFor="showCourses">Mostrar apartado de cursos</label>
                                    </div>
                                </div>
                                <div className="flex w-full sm:w-6/10">
                                    <textarea value={sectionForHomePage.contentCourses} disabled={!sectionForHomePage.showCourses} className="w-full px-2 py-2 bg-gray-200 disabled:text-gray-500" name="contentCourses" id="contentCourses" rows="2" placeholder="Escribe aquí el texto para que aparezca en el apartado de cursos..." onChange={(e) => inputsForSectionsChangeHandle(e)}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full justify-center sm:mb-3 sm:mt-0 mt-6">
                            <div className="flex flex-row w-full">
                                <div className="flex w-full">
                                    <p className="font-bold text-left">
                                        Apartado de productos
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full">
                                <div className="flex w-full sm:w-4/10 sm:pr-6 items-start py-2">
                                    <div>
                                        <input id="showProducts" name="showProducts" type="checkbox" defaultChecked={sectionForHomePage.showProducts} onClick={(e) => inputsForSectionsChangeHandle(e)} onChange={(e) => inputsForSectionsChangeHandle(e)} />
                                        <label className="text-left pl-1" htmlFor="showProducts">Mostrar apartado de productos</label>
                                    </div>
                                </div>
                                <div className="flex w-full sm:w-6/10">
                                    <textarea value={sectionForHomePage.contentProducts} disabled={!sectionForHomePage.showProducts} className="w-full px-2 py-2 bg-gray-200 disabled:text-gray-500" name="contentProducts" id="contentProducts" rows="2" placeholder="Escribe aquí el texto para que aparezca en el apartado de productos..." onChange={(e) => inputsForSectionsChangeHandle(e)}></textarea>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col w-full justify-center mt-8">
                            <Button additionalClassNamesForButton=" flex justify-center items-center bg-var-1 hover:bg-var-1-hovered duration-200 rounded-md shadow-md w-full" additionalClassNamesForText=" text-center text-button-desktop text-white font-amatic font-bold" contentForButton="Actualizar información" onClickButtonAction={updateHomeInfo} />
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
                            <Button contentForButton="Crear un curso" additionalClassNamesForButton=" flex justify-center w-full sm:w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold text-center " onClickButtonAction={createNewCourse}  />
                            <Button contentForButton="Crear un módulo" additionalClassNamesForButton=" flex justify-center w-full sm:w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold text-center " onClickButtonAction={createNewModule}  />
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
                            <Button contentForButton="Crear un producto" additionalClassNamesForButton=" flex justify-center w-full sm:w-fit bg-var-2 hover:bg-var-2-hovered duration-200 mx-auto my-3 shadow-md rounded-md " additionalClassNamesForText=" text-button-desktop text-white font-amatic font-bold text-center " onClickButtonAction={createNewProduct}  />
                        </div>
                        <ItemList listCategory="products" listTitle="Lista de productos" />
                    </div>
                </div>
                
            </div>

            <CreateContentPopUp content={contentToCreate} onClose={() => setOpenCreatePortal(false)} open={openCreatePortal} />
        </div>
    )
}