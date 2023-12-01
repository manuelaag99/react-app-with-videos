import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SignInOrSignUpPopUp ({ onClose, open, openSignUp }) {
    const [isSignUp, setIsSignUp] = useState();

    useEffect(() => {
        if (openSignUp) {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [])

    const signInOrSignUpPopUp = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-30" onClick={onClose}></div>
            <div className={"flex flex-col justify-center fixed w-6/10 h-6/10 bg-white rounded-md shadow-2xl left-[20%] z-40 p-8 " + (isSignUp ? " top-[10%] " : " top-[30%] ")}>
                <div className="flex justify-center w-9/10 mb-3 mx-auto">
                    <p className="text-center text-black font-amatic font-bold text-sign-in-or-sign-up-title-desktop">
                        {isSignUp && "Registrarse"}
                        {!isSignUp && "Iniciar sesión"}
                    </p>
                </div>
                <div className="flex flex-col justify-center w-9/10 mx-auto">
                    {isSignUp && <label htmlFor="">Nombre de usuario:</label>}
                    {isSignUp && <input className="w-full rounded-sm bg-gray-200 py-3 px-2 mb-3 mx-auto" type="text" placeholder="Escribe..." />}
                    {isSignUp && <label htmlFor="">Nombre:</label>}
                    {isSignUp && <input className="w-full rounded-sm bg-gray-200 py-3 px-2 mb-3 mx-auto" type="text" placeholder="Escribe..." />}
                    <label htmlFor="">Correo electrónico:</label>
                    <input className="w-full rounded-sm bg-gray-200 py-3 px-2 mb-3 mx-auto" type="text" placeholder="Escribe..." />
                    <label htmlFor="">Contraseña:</label>
                    <input className="w-full rounded-sm bg-gray-200 py-3 px-2 mb-3 mx-auto" type="text" placeholder="Escribe..." />
                    <button className="bg-var-2 hover:bg-var-2-hovered duration-200 w-full rounded-sm py-3 mx-auto mt-5 mb-3 text-white font-amatic font-bold text-sign-in-or-sign-up-button-desktop">
                        {isSignUp && "Registrarse"}
                        {!isSignUp && "Iniciar sesión"}
                    </button>
                    <p className="text-black hover:text-var-2 duration-200 text-center w-full cursor-pointer">
                        {isSignUp && "o iniciar sesión"}
                        {!isSignUp && "o regístrate"}
                    </p>
                </div>
            </div>
        </div>
    )
    if (open) {
        return createPortal(signInOrSignUpPopUp, document.body);
    } else {
        return null;
    }
}