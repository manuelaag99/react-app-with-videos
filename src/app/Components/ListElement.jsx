import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ListElement ({ elementClassNames, elementName }) {
    return (
        <div className={"flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer " + elementClassNames}>
            <div className="flex w-full sm:w-8/10 py-1">
                {elementName}
            </div>
            <div className="flex flex-row w-full sm:w-2/10">
                <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                    <EditIcon color="black" />
                </button>
                <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                    <DeleteIcon color="black" />
                </button>
            </div>
        </div>
    )
}