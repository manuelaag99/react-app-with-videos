import { createPortal } from "react-dom"
import SearchIcon from '@mui/icons-material/Search';

export default function PeopleList ({ onClose, open }) {
    const peopleList = (
        <>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={onClose}></div>
            <div className="flex flex-col justify-center items-center w-9/10 sm:w-6/10 bg-white rounded-md shadow-2xl fixed left-[5%] sm:left-[20%] top-[10%] h-fit z-30 px-5 py-6">
                <div className="flex w-9/10 justify-center h/fit my-4">
                    <div className="flex w-full justify-center bg-gray-300 rounded-2xl py-4">
                        <input className="w-9/10 bg-gray-300 outline-none border-none" />
                        <button>
                            <SearchIcon />
                        </button>
                    </div>
                </div>
                
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
                                <input className="mr-2 cursor-pointer" type="checkbox" />
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