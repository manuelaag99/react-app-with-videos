import Link from "next/link"
import { createPortal } from "react-dom"

export default function MobileMenu ({ onClose, open }) {
    const mobileMenu = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-30" onClick={onClose}></div>
            <div className="flex flex-row fixed z-50 top-0 left-[20%] w-full h-screen ">
                <div className="flex flex-col w-8/10 bg-var-1 h-full shadow-lg pt-8 font-rubik cursor-pointer">
                    <Link className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " href="">
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Hacer un pedido
                        </p>
                    </Link>
                    <Link className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " href="/courses/">
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Cursos
                        </p>
                    </Link>
                    <Link className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " href="">
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Registrarse
                        </p>
                    </Link>
                    <Link className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " href="">
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Iniciar sesión
                        </p>
                    </Link>
                    <button className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " onClick={onClose}>
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Cerrar menú
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(mobileMenu, document.body)
    } else {
        null
    }
}