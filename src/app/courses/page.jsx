"use client"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TopNavigationBar from '../Components/TopNavigationBar';
import { useState } from 'react';

export default function CoursePage ({}) {
    const [courseModules, setCourseModules] = useState();

    return (
        <div className="flex flex-col justify-center w-full">
            <TopNavigationBar />
            <div className="flex w-9/10 mx-auto justify-center bg-white rounded-md mt-14">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 px-5 py-7 items-center">
                        <div className="flex">
                            <div className="flex w-full py-2 font-bold">{courseTitle}</div>
                            <div className="flex w-full py-2">{courseDescription}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="flex justify-start">
                                <p className="text-left opacity-40">
                                    <AccessTimeIcon fontSize="large" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2">
                        <img src="" alt="" />
                    </div>
                </div>
                {courseModules && <div className="flex flex-col justify-center w-full">
                    {courseModules.map((index, module) => {
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
                    })}
                </div>}
            </div>
        </div>
    )
}