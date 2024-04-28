import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import CreateContentPopUp from './Portals/CreateContentPopUp';
import { PeopleAlt } from '@mui/icons-material';
import PeopleList from './Portals/PeopleList';

export default function ListElement ({ element, elementClassNames, elementType, index, onClickFunction }) {
    const [openWindowForEdit, setOpenWindowForEdit] = useState(false);
    const [openWindowForPeople, setOpenWindowForPeople] = useState(false);


    return (
        <div className={"flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer h-fit " + elementClassNames} onClick={onClickFunction}>
            <div className="flex justify-center sm:justify-start w-full sm:w-6/10 py-1">
                {!(elementType === "modules") && <p className="text-center sm:text-left">
                    {element.title}
                </p>}
                {(elementType === "modules") && <p className="text-center sm:text-left">
                    Modulo {index + 1} : {element.title}
                </p>}
            </div>
            <div className="flex flex-row w-full sm:w-4/10 my-2 sm:my-0">
                <button className="w-1/3 justify-center text-center text-black hover:text-white duration-200 cursor-pointer" onClick={() => setOpenWindowForEdit(true)}>
                    <EditIcon color="black" fontSize='small' />
                </button>
                <button className="w-1/3 justify-center text-center text-black hover:text-white duration-200 cursor-pointer" onClick={() => setOpenWindowForPeople(true)}>
                    <PeopleAlt color="black" fontSize='small' />
                </button>
                <button className="w-1/3 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                    <DeleteIcon color="black" fontSize='small' />
                </button>
            </div>

            <CreateContentPopUp content={elementType} existingElementToEdit={element} isCreate={false} onClose={() => setOpenWindowForEdit(false)} open={openWindowForEdit} />
            <PeopleList item={element} onClose={() => setOpenWindowForPeople(false)} open={openWindowForPeople} />
        </div>
    )
}