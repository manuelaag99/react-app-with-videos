"use client"
import TopNavigationBar from '../Components/TopNavigationBar';

export default function CoursePage () {
    return (
        <div className="flex flex-col justify-center w-full">
            <TopNavigationBar />
            <div className="flex w-9/10 mx-auto justify-center bg-white rounded-md mt-14">
                Courses
            </div>
        </div>
    )
}