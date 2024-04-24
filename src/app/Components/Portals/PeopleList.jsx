import { createPortal } from "react-dom"
import SearchIcon from '@mui/icons-material/Search';
import ElementForPeopleList from "../ElementForPeopleList";

export default function PeopleList ({ onClose, open }) {
    const peopleList = (
        <>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={onClose}></div>
            <div className="flex flex-col justify-center items-center w-9/10 sm:w-6/10 bg-white rounded-md shadow-2xl fixed left-[5%] sm:left-[20%] top-[10%] h-7/10 z-30 p-6">
                <div className="flex w-9/10 justify-center h-1/10 my-4">
                    <div className="flex w-full justify-center bg-gray-300 rounded-2xl py-4">
                        <input className="w-9/10 bg-gray-300 outline-none border-none" />
                        <button>
                            <SearchIcon />
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-col w-9/10 justify-start items-center h-9/10 my-4 overflow-y-auto">
                    
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />
                    <ElementForPeopleList />

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