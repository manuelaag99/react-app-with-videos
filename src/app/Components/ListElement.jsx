import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import CreateContentPopUp from './Portals/CreateContentPopUp';

export default function ListElement ({ element, elementClassNames, elementType, onClickFunction }) {
    const [openWindowForEdit, setOpenWindowForEdit] = useState(false);

    return (
        <div className={"flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer h-fit " + elementClassNames} onClick={onClickFunction}>
            <div className="flex justify-center sm:justify-start w-full sm:w-8/10 py-1">
                <p className="text-center sm:text-left">
                    {element.title}
                </p>
            </div>
            <div className="flex flex-row w-full sm:w-2/10 my-1 sm:my-0">
                <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer" onClick={() => setOpenWindowForEdit(true)}>
                    <EditIcon color="black" />
                </button>
                <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                    <DeleteIcon color="black" />
                </button>
            </div>

            <CreateContentPopUp content={elementType} existingElementToEdit={element} isCreate={false} onClose={() => setOpenWindowForEdit(false)} open={openWindowForEdit} />
        </div>
    )
}