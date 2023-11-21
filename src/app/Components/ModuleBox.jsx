import { useEffect, useState } from "react"
import Thumbnail from "./Thumbnail";
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

    if (!moduleInfo) {
        return null;
    } else {
        return (
            <div className="flex flex-row justify-center w-full py-5 px-6 hover:bg-gray-300 shadow-lg duration-300" onClick={() => router.push("/courses/" + moduleInfo.course_id + "/" + moduleInfo.module_id)} key={index}>
                <div className="flex justify-center items-center w-2/10 h-24">
                    {moduleInfo && <Thumbnail thumbnailImageId={moduleInfo.module_image_path} />}
                    {!moduleInfo && <div className="bg-gray-400 w-full h-full"></div>}
                </div>
                <div className="flex flex-col justify-start items-start w-7/10 pl-6">
                    <div className="flex w-full">
                        {moduleInfo && <p className="text-left font-bold">
                            Módulo {index}: {moduleInfo.module_title}
                        </p>}
                        {!moduleInfo && <div className="bg-gray-400 w-5/10 h-16"></div>}
                    </div>
                    <div className="flex w-full">
                        {moduleInfo && <p className="text-left opacity-70">
                            {moduleInfo.module_description.slice(0,80)}...
                        </p>}
                        {!moduleInfo && <div className="bg-gray-400 w-8/10 h-16"></div>}
                    </div>
                </div>
                <div className="flex justify-end items-center w-1/10 ">
                    <button>
                        <MoreVertIcon />
                    </button>
                </div>
            </div>
        )
    }
}