import { createPortal } from "react-dom"
import SearchIcon from '@mui/icons-material/Search';
import ElementForPeopleList from "../ElementForPeopleList";
import { supabase } from "@/app/supabase/client";
import { useEffect, useState } from "react";

export default function PeopleList ({ item, onClose, open }) {
    const [purchasedCourses, setPurchasedCourses] = useState();
    async function fetchPurchasedCourses () {
        try {
            const { data, error } = await supabase.from("cai-purchased-courses").select().eq("course_id", item.id);
            console.log(data)
            if (error) console.log(error);
            setPurchasedCourses(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPurchasedCourses();
    }, [])

    const [searchQuery, setSearchQuery] = useState();
    function searchInputHandler (e) {
        let value = e.target.value;
        setSearchQuery(value);
    }


    const peopleList = (
        <>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={onClose}></div>
            <div className="flex flex-col justify-center items-center w-9/10 sm:w-6/10 bg-white rounded-md shadow-2xl fixed left-[5%] sm:left-[20%] top-[10%] h-7/10 z-30 p-6">
                
                <div className="flex w-9/10 justify-center h-1/10 my-2">
                    <div className="flex w-full justify-center items-center bg-gray-300 rounded-2xl py-4 px-2">
                        <input className="w-9/10 bg-gray-300 outline-none border-none px-2" onChange={(e) => searchInputHandler(e)} />
                        <button>
                            <p className="text-black hover:text-gray-500 duration-200">
                                <SearchIcon />
                            </p>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center w-9/10 my-2">
                    <div className=" h-0.5 bg-gray-200 w-1/4"></div>
                    <div className="w-4/10">
                        <p className="text-center text-gray-200 text-xs">
                            Personas que compraron este curso
                        </p>
                    </div>
                    <div className=" h-0.5 bg-gray-200 w-1/4"></div>
                </div>

                <div className="flex flex-col w-9/10 justify-start items-center h-9/10 my-2 overflow-y-auto">
                    {purchasedCourses && (purchasedCourses.length > 0) && purchasedCourses.map((purchase, index) => {
                        return (<ElementForPeopleList courseId={item.id} elementInfo={purchase} index={index} key={index} searchQuery={searchQuery} />)
                    })}
                    {purchasedCourses && (purchasedCourses.length < 1) && <div className="flex justify-center w-full">
                        <p className="text-center text-black">
                            No hay personas registradas en este curso.
                        </p>
                    </div> }
                    {!purchasedCourses && <div className="flex justify-center w-full">
                        <p className="text-center text-black">
                            No se obtuvieron los datos.
                        </p>
                    </div> }
                </div>
            </div>
        </>
    )

    if (open) {
        return createPortal(peopleList, document.body);
    } else {
        return null;
    }
}