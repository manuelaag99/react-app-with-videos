import { useEffect, useState } from "react";
import ListElement from "./ListElement";
import { supabase } from "../supabase/client";

export default function ItemList ({ listCategory, listTitle }) {
    const [isSmallListOpen, setIsSmallListOpen] = useState(false);

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
    }, [])

    function toggleSmallListVisibility () {
        setIsSmallListOpen(prevValue => !prevValue)
    }
    return (

        <div className="flex flex-col w-full mb-4">
            {!itemsForList && <p className="text-center font-bold mt-2">No hay nada que mostrar.</p>}
            
            {itemsForList && (itemsForList.length > 0) && <div className="flex flex-col w-full">
                <div className="flex w-full mt-2 mb-1 justify-center items-center">
                    <p className="text-center font-bold font-rubik">{listTitle}</p>
                </div>
                <div className="flex flex-col justify-center w-9/10 overflow-y-scroll my-2 mx-auto font-rubik max-h-64">
                    <div className="flex flex-col w-full h-fit">
                        {itemsForList && (itemsForList.length > 0) && itemsForList.map((item, index) => {
                            return (
                                <ListElement element={item} elementClassNames="" elementType={listCategory} key={index} index={index} onClickFunction={toggleSmallListVisibility} />
                            )
                        })}
                        {listCategory === "courses" && isSmallListOpen && <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full">
                                <ListElement elementClassNames=" pl-6" elementId="" elementName="Nombre de artículo" />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>}

        </div>
    )
}