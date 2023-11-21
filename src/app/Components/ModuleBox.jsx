import { useEffect, useState } from "react"
import Thumbnail from "./Thumbnail";
import Link from "next/link";
import { supabase } from "../supabase/client";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ModuleBox ({ index, moduleId }) {
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

    console.log(moduleInfo)
    console.log(moduleId)
    if (!moduleInfo) {
        return null;
    } else {
        return (
            <Link className="flex flex-row justify-center w-full py-5 px-6 hover:bg-gray-300 shadow-lg duration-300" href={"/courses/modules/" + module.module_id} key={index}>
                <div className="flex justify-center items-center w-2/10 h-24">
                    <Thumbnail thumbnailImageId={module.module_image_path} />
                </div>
                <div className="flex flex-col justify-start items-start w-7/10 pl-6">
                    <div className="flex w-full">
                        <p className="text-left font-bold">
                            Módulo {index}: {module.module_title}
                        </p>
                    </div>
                    <div className="flex w-full">
                        <p className="text-left">
                            {module.module_description}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end items-center w-1/10 ">
                    <button>
                        <MoreVertIcon />
                    </button>
                </div>
            </Link>
        )
    }
}