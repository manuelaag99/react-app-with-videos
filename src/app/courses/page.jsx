"use client"
import { useEffect, useState } from 'react';
import TopNavigationBar from '../Components/TopNavigationBar';
import { supabase } from '../supabase/client';
import CourseBox from '../Components/CourseBox';

export default function CoursePage () {
    const [courseIds, setCourseIds] = useState();
    async function fetchCourses () {
        try {
            const { data, error } = await supabase.from("cai-courses").select();
            if (error) console.log(error);
            console.log(data)
            setCourseIds(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [])

    console.log(courseIds)
    if (!courseIds) {
        return null;
    } else {
        return (
            <div className="flex flex-col justify-center w-full">
                <TopNavigationBar />
                <div className="flex justify-center mt-20 w-full">
                    Cursos
                </div>
                
                {courseIds && courseIds.map((courseId, index) => {
                    return <CourseBox courseId={courseId} key={index} />
                })}
            </div>
        )
    }
}