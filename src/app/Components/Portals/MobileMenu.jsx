import { createPortal } from "react-dom"

export default function MobileMenu ({ open }) {
    const mobileMenu = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20"></div>
            <div className="flex flex-row fixed z-50 top-0 left-[20%] w-full h-screen ">
                <div></div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(menu, document.body)
    } else {
        null
    }
}