import { useEffect, useState } from "react"
import Image from "./Image";
import Link from "next/link";
import { supabase } from "../supabase/client";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from "next/navigation";

export default function ModuleBox ({ index, moduleId }) {
    const router = useRouter();

    const [moduleInfo, setModuleInfo] = useState();
    async function fetchModuleInfo () {
        try {
            const { data, error } = await supabase.from("cai-modules").select().eq("module_id", moduleId);
            if (error) console.log (error);
            console.log(data)
            setModuleInfo(data[0]);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchModuleInfo();
    }, [])

    return (
        <div className="flex sm:flex-row flex-col justify-center w-full py-5 px-6 hover:bg-gray-300 hover:shadow-lg duration-300 cursor-pointer" onClick={() => router.push("/courses/" + moduleInfo.course_id + "/" + moduleInfo.module_id)} key={index}>
            <div className="flex justify-center items-center w-full sm:w-2/10 mb-4 sm:mb-0 mt-2 sm:mt-0">
                {moduleInfo && moduleInfo.module_image_path && <Image additionalClassNames="w-full" imageSource={moduleInfo.module_image_path} />}
            </div>
            <div className="flex flex-row sm:flex-col justify-center w-full sm:w-7/10 sm:pl-6">
                
                <div className="flex flex-col w-9/10 pr-6 ">
                    <div className="flex w-full mb-1">
                        {moduleInfo && <p className="text-left text-black text-module-box-title-desktop font-bold font-amatic">Módulo {index + 1}: {moduleInfo.module_title}</p>}
                        {!moduleInfo && <div className="bg-gray-800 w-5/10 h-5 rounded-2xl mt-1"></div>}
                    </div>
                    <div className="flex w-full mt-1">
                        {moduleInfo && <p className="text-left text-gray-400 font-rubik">{moduleInfo.module_description.slice(0,80)}...</p>}
                        {!moduleInfo && <div className="bg-gray-400 w-9/10 h-5 rounded-2xl mt-1"></div>}
                    </div>
                </div>

                <div className="sm:hidden flex justify-end items-center w-1/10 mt-1 ">
                    {moduleInfo && <button className="text-black hover:text-gray-100 duration-300"><MoreVertIcon /></button>}
                </div>

            </div>
            <div className="hidden sm:flex justify-end items-center w-1/10 ">
                {moduleInfo && <button className="text-black hover:text-gray-100 duration-300"><MoreVertIcon /></button>}
            </div>
        </div>
    )
}