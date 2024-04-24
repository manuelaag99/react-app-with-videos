export default function ElementForPeopleList ({}) {
    return (
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
    )
}