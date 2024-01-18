import ListElement from "./ListElement";

export default function ItemList ({ listCategory, listTitle }) {
    return (
        <div className="flex flex-col w-full mb-4">
            <div className="flex w-full mt-2 mb-1 justify-center items-center">
                <p className="text-center font-bold font-rubik">{listTitle}</p>
            </div>
            <div className="flex flex-col justify-center w-9/10 overflow-y-scroll my-2 mx-auto font-rubik max-h-64">
                <div className="flex flex-col w-full h-fit">
                    <ListElement elementClassNames="" elementId="" elementName="Nombre de artículo" />
                    {listCategory === "courses" && <div className="flex flex-col w-full">
                        <div className="flex flex-col w-full">
                            <ListElement elementClassNames=" pl-6" elementId="" elementName="Nombre de artículo" />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}