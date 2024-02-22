import { useEffect, useState } from "react";
import ListElement from "./ListElement";
import { supabase } from "../supabase/client";

export default function ItemList ({ listCategory, listTitle }) {
    const [itemsForList, setItemsForList] = useState();
    async function fetchItems () {
        try {
            const { data, error } = await supabase.from("cai-" + listCategory).select();
            if (error) console.log (error);
            setItemsForList(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchItems();
        if (listCategory === "courses") {
            fetchModules();
        }
    }, [])

    const [modules, setModules] = useState();
    async function fetchModules () {
        try {
            const { data, error } = await supabase.from("cai-modules").select();
            if (error) console.log (error);
            setModules(data);
        } catch (err) {
            console.log(err);
        }
    }

    const [idOfModulesListToShow, setIdOfModulesListToShow] = useState();
    function toggleSmallListVisibility (item) {
        if (idOfModulesListToShow !== item.id) {
            setIdOfModulesListToShow(item.id);
        } else if (idOfModulesListToShow === item.id) {
            setIdOfModulesListToShow();
        }
    }
    return (

        <div className="flex flex-col w-full mb-4 h-fit">
            {!itemsForList && <p className="text-center font-bold mt-2">No hay nada que mostrar.</p>}
            {itemsForList && (itemsForList.length > 0) && <div className="flex flex-col w-full max-h-64">
                <div className="flex w-full mt-2 mb-1 justify-center items-center">
                    <p className="text-center font-bold font-rubik">{listTitle}</p>
                </div>
                <div className="flex flex-col justify-center items-start w-9/10 overflow-y-scroll my-2 mx-auto font-rubik h-fit">
                        
                        {itemsForList && (itemsForList.length > 0) && itemsForList.map((item, index) => {
                            return (
                                <div className="flex flex-col w-full h-fit">
                                    <ListElement element={item} elementClassNames="" elementType={listCategory} key={index} index={index} onClickFunction={() => toggleSmallListVisibility(item)} />
                                    {(listCategory === "courses") && (idOfModulesListToShow === item.id) && <div className="flex flex-col justify-center items-start w-full h-fit">
                                        {modules.map((module, index) => {
                                            if (module.course_id === item.id) {
                                                return (
                                                    <ListElement element={module} elementClassNames=" pl-6" elementType="modules" elementName="Nombre de artículo" key={index} />
                                                )
                                            }
                                        })}
                                    </div>}
                                </div>
                            )
                        })}
                        
                </div>
            </div>}
        </div>
    )
}