"use client"
import TopNavigationBar from '@/app/Components/TopNavigationBar';
import { useContext, useEffect, useState } from 'react';
import ModuleBox from '@/app/Components/ModuleBox';
import { supabase } from '@/app/supabase/client';
import Image from '@/app/Components/Image';
import { useAuthContext } from '@/app/utils/AuthContext';
import Button from '@/app/Components/Button';
import PurchasePopUp from '@/app/Components/Portals/PurchasePopUp';

export default function CoursePage ({ params }) {
    const auth = useAuthContext();
    const [courseInfo, setCourseInfo] = useState();
    async function fetchCourseInfo () {
        try {
            const { data, error } = await supabase.from("cai-courses").select().eq("id", params.courseId);
            if (error) console.log (error);
            setCourseInfo(data[0]);
        } catch (err) {
            console.log (err);
        }
    }

    const [courseModules, setCourseModules] = useState();
    async function fetchModuleIds () {
        try {
            const { data, error } = await supabase.from("cai-modules").select("id").eq("course_id", params.courseId);
            if (error) console.log (error);
            setCourseModules(data);
        } catch (err) {
            console.log (err);
        }
    }
    useEffect(() => {
        fetchCourseInfo();
        fetchModuleIds();
    }, [])

    const [isPurchasePopUpVisible, setIsPurchasePopUpVisible] = useState(false);
    function purchaseCourse () {
        setIsPurchasePopUpVisible(true);
    }

    return (
        <div className="flex flex-col justify-center w-full">
            <TopNavigationBar />
            <div className="flex flex-col md:w-85percent w-95percent mx-auto justify-center bg-white rounded-md md:mt-40 mt-20 mb-28 pb-16 shadow-2xl">

                <div className="flex md:flex-row flex-col-reverse md:justify-between justify-center w-full p-6">
                    <div className="flex flex-col md:w-1/2 w-full items-center mb-14">
                        <div className="flex flex-col w-full justify-start mb-10">
                            <div className="flex w-full mb-6">
                                {!courseInfo && <div className="rounded-2xl bg-gray-700 w-4/10 h-14 mt-1"></div>}
                                {courseInfo && <div className="font-bold text-left pr-6 text-black font-amatic text-page-title-desktop -mt-3">{courseInfo.title}</div>}
                            </div>
                            <div className="flex w-full mb-6">
                                {!courseInfo && <div className="rounded-lg bg-gray-400 w-full h-5 mt-3"></div>}
                                {courseInfo && <p className="font-medium text-left pr-6 text-gray-400 font-rubik">{courseInfo.description}</p>}
                            </div>
                            <div className="flex w-full mb-6">
                                {!courseInfo && <div className="rounded-lg bg-gray-400 w-full h-5 mt-3"></div>}
                                {courseInfo && <p className="font-medium text-left pr-6 text-black font-rubik">Costo: {courseInfo.price} MXN</p>}
                            </div>
                            <div className="flex w-full justify-start items-start">
                                <Button additionalClassNamesForButton=" text-center -mt-1.5 -mb-1.5" additionalClassNamesForText=" flex justify-center md:mt-0 mt-3 px-4 py-2 font-amatic text-button-desktop font-bold rounded-md shadow-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white" contentForButton="Comprar curso" isDisabled={false} onClickButtonAction={() => purchaseCourse()} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:w-46percent w-full mb-5">
                        {courseInfo && courseInfo.course_image_path && <Image additionalClassNames="w-full" imageSource={courseInfo.course_image_path} />}
                        {!courseInfo || !courseInfo.course_image_path && <div className="w-full bg-gray-300 rounded-md"></div>}
                    </div>
                </div>

                {courseModules && (courseModules.length > 0) && <div className="flex flex-col justify-center w-full">
                    {courseModules.map((module, index) => {
                        return (
                            <ModuleBox index={index} key={index} moduleId={module.id} />
                        )
                    })}
                </div>}
            </div>
            <PurchasePopUp closePurchasePopUp={() => setIsPurchasePopUpVisible(false)} courseId={params.courseId} open={isPurchasePopUpVisible} price={courseInfo.price} userId={auth.user_Id} />
        </div>
    )
}