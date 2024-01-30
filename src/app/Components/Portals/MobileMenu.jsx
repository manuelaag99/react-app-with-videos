import Link from "next/link"
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom"
import SignInOrSignUpPopUp from "./SignInOrSignUpPopUp";
import { AuthContext } from "@/app/context/AuthContext";
import { supabase } from "@/app/supabase/client";

export default function MobileMenu ({ onClose, open }) {
    const auth = useContext(AuthContext);
    const [openSignInOrSignUpWindow, setOpenSignInOrSignUpWindow] = useState();
    const [isItSignUp, setIsItSignUp] = useState();

    function openSignUpWindow () {
        setIsItSignUp(true);
        setOpenSignInOrSignUpWindow(true);
    }
    function openSignInWindow () {
        setIsItSignUp(false);
        setOpenSignInOrSignUpWindow(true);
    }

    const [admins, setAdmins] = useState()
    async function fetchAdmins () {
        try {
            const { data, error } = await supabase.from("cai-admins").select().eq("user_id", auth.uId);
            if (error) console.log(error);
            if (data) setAdmins(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchAdmins();
    }, [])

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
                    {!auth.isLoggedIn && <div className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " onClick={openSignUpWindow}>
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Registrarse
                        </p>
                    </div>}
                    {!auth.isLoggedIn && <div className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " onClick={openSignInWindow}>
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Iniciar sesión
                        </p>
                    </div>}
                    {admins && (admins.length > 0) && admins.includes(auth.uId) && <Link className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " href="/admin/">
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Administrar
                        </p>
                    </Link>}
                    {auth.isLoggedIn && <button className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " onClick={onClose}>
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Cerrar sesión
                        </p>
                    </button>}
                    <button className="flex justify-center py-6 px-3 text-white hover:text-var-1-hovered hover:bg-white duration-200 " onClick={onClose}>
                        <p className="text-left w-8/10 whitespace-nowrap">
                            Cerrar menú
                        </p>
                    </button>
                </div>
            </div>
            <SignInOrSignUpPopUp onClose={() => setOpenSignInOrSignUpWindow(false)} open={openSignInOrSignUpWindow} openSignUp={isItSignUp} />
        </div>
    )

    if (open) {
        return createPortal(mobileMenu, document.body)
    } else {
        null
    }
}