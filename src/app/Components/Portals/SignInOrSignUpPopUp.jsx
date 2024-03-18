import { AuthContext } from "@/app/context/AuthContext";
import { supabase } from "@/app/supabase/client";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import GeneralPopUp from "./GeneralPopUp";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignInOrSignUpPopUp ({ onClose, open, openSignUp }) {
    const auth = useContext(AuthContext);

    const [errorWithSignInOrSignUp, setErrorWithSignInOrSignUp] = useState();
    const [openGeneralPopUp, setOpenGeneralPopUp] = useState(false);
    const [generalPopUp, setGeneralPopUp] = useState({ message: "", textForButtonOne: "", textForButtonTwo: ""});

    const [isSignUp, setIsSignUp] = useState();
    useEffect(() => {
        if (openSignUp) {
            setIsSignUp(true);
        } else if (!openSignUp) {
            setIsSignUp(false);
        }
    }, [openSignUp])

    const [signInOrSignUpInputs, setSignInOrSignUpInputs] = useState();
    function inputChangeHandle (e) {
        let inputField = e.target.name;
        let inputValue = e.target.value;
        setSignInOrSignUpInputs({ ...signInOrSignUpInputs, [inputField]: inputValue });
    }

    const [signUpData, setSignUpData] = useState();
    async function signUp () {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: signInOrSignUpInputs.email,
                password: signInOrSignUpInputs.password 
            })
            if (error) console.log(error);
            if (!error) setSignUpData(data);
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    }
    async function createUserInDatabase () {
        try {
            const { error } = await supabase.from("cai-users").insert({ user_id: signUpData.user.id, username: signInOrSignUpInputs.userName, displayName: signInOrSignUpInputs.displayName, email: signInOrSignUpInputs.email, password: signInOrSignUpInputs.password });
            if (error) setErrorWithSignInOrSignUp(error);
        } catch (err) {
            setErrorWithSignInOrSignUp(err);
        }
        if (!errorWithSignInOrSignUp) {
            setGeneralPopUp({ message: "Exitosamente se creó tu cuenta." , textForButtonOne: "Aceptar", textForButtonTwo: "" });
            setOpenGeneralPopUp(true);
            auth.login(signUpData.user.id, signUpData.session.access_token);
        }
    }
    useEffect(() => {
        if (signUpData) {
            createUserInDatabase();
        }
    }, [signUpData])

    console.log(signUpData)
    async function signIn () {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: signInOrSignUpInputs.email,
                password: signInOrSignUpInputs.password 
            })
            if (error) console.log(error);
        } catch (err) {
            console.log(err);
        }
    }
    
    function actionButton () {
        if (isSignUp) {
            signUp();
        } else if (!isSignUp) {
            signIn();
        }
    }

    function closeGeneralPopUp () {
        setSignInOrSignUpInputs();
        setGeneralPopUp(false);
        if (!errorWithSignInOrSignUp) onClose();
    }

    const [passwordInputType, setPasswordInputType] = useState("password");
    function togglePasswordVisibility () {
        if (passwordInputType === "password") {
            setPasswordInputType("text")
        } else if (passwordInputType === "text") {
            setPasswordInputType("password")
        }
    }

    const signInOrSignUpPopUp = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-60" onClick={onClose}></div>
            <div className={"flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-6/10 bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] z-70 p-4 sm:p-9 " + (isSignUp ? " top-[5%] " : " top-[18%] ")}>
                <div className="flex justify-center w-95percent mb-3 mx-auto">
                    <p className="text-center text-black font-amatic font-bold text-sign-in-or-sign-up-title-desktop">
                        {isSignUp && "Registrarse"}
                        {!isSignUp && "Iniciar sesión"}
                    </p>
                </div>
                <div className="flex flex-col justify-center w-95percent mx-auto">
                    {isSignUp && <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Nombre de usuario:</label>}
                    {isSignUp && <input className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mb-3 mx-auto" type="text" placeholder="Escribe..." name="userName" onChange={(e) => inputChangeHandle(e)}  />}
                    {isSignUp && <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Nombre:</label>}
                    {isSignUp && <input className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mb-3 mx-auto" type="text" placeholder="Escribe..." name="displayName" onChange={(e) => inputChangeHandle(e)} autoCapitalize="on" />}
                    <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Correo electrónico:</label>
                    <input className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mb-3 mx-auto" type="text" placeholder="Escribe..."  name="email" onChange={(e) => inputChangeHandle(e)} />
                    
                    <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Contraseña:</label>
                    <div className="flex flex-row w-full rounded-sm bg-gray-200 mb-3 justify-between">
                        <input className="w-8/10 rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mx-auto float-left" type={passwordInputType} placeholder="Escribe..."  name="password" onChange={(e) => inputChangeHandle(e)} autoComplete="off"  />
                        <button className="flex justify-end w-2/10 rounded-sm bg-gray-200 items-center pr-2 sm:pr-4" onClick={togglePasswordVisibility}>
                            {(passwordInputType === "password") && <VisibilityIcon className="text-black hover:text-white duration-200 float-right" fontSize="medium" />}
                            {(passwordInputType === "text") && <VisibilityOffIcon className="text-black hover:text-white duration-200 float-right" fontSize="medium" />}
                        </button>
                    </div>
                    <button className="bg-var-2 hover:bg-var-2-hovered duration-200 w-full rounded-sm py-3 mx-auto mt-5 mb-3 text-white font-amatic font-bold text-sign-in-or-sign-up-button-desktop" onClick={actionButton}>
                        {isSignUp && "Registrarse"}
                        {!isSignUp && "Iniciar sesión"}
                    </button>
                    {isSignUp && <p className="text-black hover:text-var-2 duration-200 text-center w-full cursor-pointer mb-3 sm:mb-0 mt-2" onClick={() => setIsSignUp(false)}>
                        o iniciar sesión
                    </p>}
                    {!isSignUp && <p className="text-black hover:text-var-2 duration-200 text-center w-full cursor-pointer mb-3 sm:mb-0 mt-2" onClick={() => setIsSignUp(true)}>
                        o regístrate
                    </p>}
                </div>
            </div>
            <GeneralPopUp infoForPopUp={generalPopUp} onClose={closeGeneralPopUp} open={openGeneralPopUp} />
        </div>
    )
    
    if (open) {
        return createPortal(signInOrSignUpPopUp, document.body);
    } else {
        return null;
    }
}