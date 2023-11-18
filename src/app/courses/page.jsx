"use client"
import { useEffect, useState } from 'react';
import TopNavigationBar from '../Components/TopNavigationBar';
import { supabase } from '../supabase/client';
import CourseBox from '../Components/CourseBox';

export default function CoursePage () {
    const [courseIds, setCourseIds] = useState();
    async function fetchCourses () {
        try {
            const { data } = await supabase.from("cai-courses").select("course_id");
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
            <div className="flex flex-col justify-center w-full">
                <TopNavigationBar />
                <div className="flex justify-center mt-20 w-full">
                    Cursos
                </div>
                <div className="flex justify-center w-full mt-8">
                    {courseIds && courseIds.map((courseId, index) => {
                        return <CourseBox courseId={courseId.course_id} index={index} key={index} />
                    })}
                </div>
            </div>
        )
    }
}