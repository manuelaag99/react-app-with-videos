import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ItemList ({ listCategory, listTitle }) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full mt-2 mb-1 justify-center items-center">
                <p className="text-center font-bold font-rubik">{listTitle}</p>
            </div>
            <div className="flex flex-col justify-center w-9/10 overflow-y-scroll my-2 mx-auto font-rubik max-h-64">
                <div className="flex flex-col w-full h-fit">
                    <div className="flex flex-col sm:flex-row w-full py-3 px-2 hover:bg-gray-300 duration-200 cursor-pointer">
                        <div className="flex w-full sm:w-8/10">
                            Nombre de artículo
                        </div>
                        <div className="flex flex-row w-2/10">
                            <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                <EditIcon color="black" />
                            </button>
                            <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                <DeleteIcon color="black" />
                            </button>
                        </div>
                    </div>

                    {listCategory === "courses" && <div className="flex flex-col w-full">
                        <div className="flex flex-col w-full">
                            
                            <div className='flex flex-col sm:flex-row w-full py-3 pl-8 pr-2 hover:bg-gray-300 duration-200 cursor-pointer'>
                                <div className="flex w-full sm:w-8/10">
                                    Nombre de artículo
                                </div>
                                <div className="flex flex-row w-2/10">
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <EditIcon color="black" />
                                    </button>
                                    <button className="w-1/2 justify-center text-center text-black hover:text-white duration-200 cursor-pointer">
                                        <DeleteIcon color="black" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>}

                </div>
            </div>

            
        </div>
    )
}