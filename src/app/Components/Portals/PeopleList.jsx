import { createPortal } from "react-dom"

export default function PeopleList ({ onClose, open }) {
    const peopleList = (
        <>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={onClose}></div>
            <div className="flex justify-center items-center w-9/10 sm:w-6/10 bg-white rounded-md shadow-2xl fixed left-[5%] sm:left-[20%] top-[10%] h-fit z-30 p-5">
                <div className="w-9/10 flex justify-center h-3/5">
                    <div className="flex flex-row w-full px-4 py-3 bg-white hover:bg-gray-300 duration-200 cursor-pointer">
                        <div className="flex flex-col w-4/10">
                            <div>
                                <p className="text-black font-bold">
                                    Name
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">
                                    User
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col w-6/10 items-center justify-center">
                            <div className="flex flex-row">
                                <input className="mr-2" type="checkbox" />
                                <p>
                                    dar acceso a este curso
                                </p>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </>
    )

    if (open) {
        return createPortal(peopleList, document.body);
    } else {
        return null;
    }
}