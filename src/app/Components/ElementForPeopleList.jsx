import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function ElementForPeopleList ({ elementInfo, index, searchQuery }) {
    const [userInfo, setUserInfo] = useState();
    async function fetchUserInfo () {
        try {
            const { data, error } = await supabase.from("cai-users").select().eq("user_id", elementInfo.user_id);
            if (error) console.log(error);
            if (!error) setUserInfo(data[0]);
        } catch {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (!userInfo) {
        return null;
    } else if (userInfo) {
        if (!searchQuery || (searchQuery && (searchQuery.trim() === "")) || (searchQuery && (userInfo.displayName.includes(searchQuery)))) {
            return (
                <div className="flex flex-row w-full px-4 py-3 bg-white hover:bg-gray-300 duration-200 cursor-pointer">
                    <div className="flex flex-col w-4/10">
                        <div>
                            <p className="text-black font-bold">
                                {userInfo.displayName}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">
                                {userInfo.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-6/10 items-center justify-center">
                        <div className="flex flex-row">
                            <input className="mr-2 cursor-pointer" type="checkbox" />
                            <p className="text-black">
                                dar acceso a este curso
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}