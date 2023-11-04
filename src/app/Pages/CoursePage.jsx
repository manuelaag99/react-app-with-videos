import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function CoursePage ({}) {
    return (
        <div className="flex flex-col justify-center w-full">
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
                <div className="">
                </div>
            </div>
        </div>
    )
}