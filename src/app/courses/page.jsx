"use client"
import { useEffect, useState } from 'react';
import TopNavigationBar from '../Components/TopNavigationBar';
import { supabase } from '../supabase/client';
import CourseBox from '../Components/CourseBox';
import { useAuthContext } from '../utils/AuthContext';

export default function CoursePage () {
    const auth = useAuthContext();
    const [courseIds, setCourseIds] = useState();
    async function fetchCourses () {
        try {
            const { data } = await supabase.from("cai-courses").select("id");
            setCourseIds(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [])

    if (!courseIds) {
        return null;
    } else {
        return (
            <div className="flex w-screen relative">
                <div className="fixed w-full h-full z-0 top-0 right-0 ">
                    <img className="w-full object-cover opacity-40" src="https://scontent.fntr10-2.fna.fbcdn.net/v/t39.30808-6/275240294_490166745909279_5984652615343883473_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHRi81XcFxHl9k3tsGmTcCLpMmBPlSjxo6kyYE-VKPGjsYTSOHz4F4PaYDemycJ7oQ&_nc_ohc=6nAq2vpj0nwAX9ENoia&_nc_ht=scontent.fntr10-2.fna&oh=00_AfC08RUDLMHDIwFwWcbT81jCDoHDPmr_6rg0ujtD5JUbNw&oe=6566D27A" alt="" />
                </div>

                <div className="flex flex-col justify-center w-full z-10">
                    <TopNavigationBar />
                    <div className="flex justify-center w-full mt-32">
                        <p className="font-amatic text-section-title-desktop font-bold text-white drop-shadow-2xl">Cursos</p>
                    </div>
                    <div className="flex flex-col justify-center w-full mt-8 mb-24">
                        <div className="flex flex-col justify-center w-full items-start mx-auto">
                            {courseIds && courseIds.map((courseId, index) => {
                                return <CourseBox courseId={courseId.id} index={index} key={index} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}