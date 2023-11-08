import { supabase } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react"

export default function ModuleBox ({ moduleId }) {
    const [moduleInfo, setModuleInfo] = useState();
    async function fetchModuleInfo () {
        try {
            const { data, error } = await supabase.from("cai-modules").select().eq("module_id", moduleId);
            if (error) console.log (error);
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
            <div className="flex flex-row justify-center w-full py-3" key={index}>
                <div className="flex justify-center items-center w-2/10 h-12">
                    <img className='' src="" alt="" />
                </div>
                <div className="flex flex-col justify-start items-start w-7/10">
                    <div className="flex w-full">
                        <p className="text-left font-bold">
                            Módulo 1: {module.module_name}
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
                        <MoreHorizIcon />
                    </button>
                </div>
            </div>
        )
    }
}