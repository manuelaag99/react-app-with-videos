import { useEffect, useState } from "react"
import Image from "./Image";
import { supabase } from "../supabase/client";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from "next/navigation";

export default function ModuleBox ({ index, moduleId }) {
    const router = useRouter();

    console.log(moduleId)
    const [moduleInfo, setModuleInfo] = useState();
    async function fetchModuleInfo () {
        try {
            const { data, error } = await supabase.from("cai-modules").select().eq("id", moduleId);
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
        <div className="flex md:flex-row flex-col justify-center w-full py-5 px-6 hover:bg-gray-300 hover:shadow-lg duration-300 cursor-pointer" onClick={() => router.push("/courses/" + moduleInfo.course_id + "/" + moduleInfo.id)} key={index}>
            <div className="flex justify-center w-full md:w-2/10 mb-4 md:mb-0 mt-2 md:mt-0 md:h-28">
                {moduleInfo && moduleInfo.module_image_path && <Image additionalClassNames="w-full" imageSource={moduleInfo.module_image_path} />}
                {!moduleInfo || !moduleInfo.module_image_path && <div className="w-full bg-gray-300 rounded-md"></div>}
            </div>
            <div className="flex flex-row md:flex-col justify-center w-full md:w-8/10 md:pl-6">
                
                <div className="flex flex-col w-full md:pr-6 ">
                    <div className="flex w-full mb-1">
                        {moduleInfo && <p className="text-left text-black text-module-box-title-desktop font-bold font-amatic">Módulo {index + 1}: {moduleInfo.title}</p>}
                        {!moduleInfo && <div className="bg-gray-800 w-5/10 h-5 rounded-2xl mt-1"></div>}
                    </div>
                    <div className="flex w-full mt-1">
                        {moduleInfo && <p className="text-left text-gray-400 font-rubik">{moduleInfo.description.slice(0,80)}...</p>}
                        {!moduleInfo && <div className="bg-gray-400 w-9/10 h-5 rounded-2xl mt-1"></div>}
                    </div>
                </div>

            </div>
        </div>
    )
}