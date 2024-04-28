import { supabase } from "@/app/supabase/client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GeneralPopUp from "./GeneralPopUp";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuthContext } from "@/app/utils/AuthContext";
import { areBothTextsTheSame, isTextAPassword, isTextAnEmail, minLengthText, nonEmptyText } from "@/app/validityCheck";
import ErrorWindowInInputs from "../ErrorWindowInInputs";

export default function SignInOrSignUpPopUp ({ onClose, open, openSignUp }) {
    const auth = useAuthContext();
    const [errorWithSignInOrSignUp, setErrorWithSignInOrSignUp] = useState();
    const [openGeneralPopUp, setOpenGeneralPopUp] = useState(false);
    const [generalPopUp, setGeneralPopUp] = useState({ message: "", textForButtonOne: "", textForButtonTwo: "" });

    const [isSignUp, setIsSignUp] = useState();
    useEffect(() => {
        if (openSignUp) {
            setIsSignUp(true);
        } else if (!openSignUp) {
            setIsSignUp(false);
        }
    }, [openSignUp])

    const [signInOrSignUpInputs, setSignInOrSignUpInputs] = useState();
    const [isInputTouched, setIsInputTouched] = useState({ displayName: false, userName: false, email: false, password: false });
    const [isInputBlurred, setIsInputBlurred] = useState({ displayName: false, userName: false, email: false, password: false });
    function inputChangeHandle (e) {
        let inputField = e.target.name;
        let inputValue = e.target.value;
        setSignInOrSignUpInputs({ ...signInOrSignUpInputs, [inputField]: inputValue });
        
        checkUsernameValidity(inputValue, inputField);
    }
    function inputTouchHandle (e) {
        let inputField = e.target.name;
        setIsInputTouched({ ...isInputTouched, [inputField]: true });
    }
    function inputBlurHandle (e) {
        let inputField = e.target.name;
        setIsInputBlurred({ ...isInputBlurred, [inputField]: true });
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
        } else {
            setGeneralPopUp({ message: "Error: " + errorWithSignInOrSignUp, textForButtonOne: "Cerrar", textForButtonTwo: ""  })
            setOpenGeneralPopUp(true);
        }
    }
    useEffect(() => {
        if (signUpData) {
            createUserInDatabase();
        }
    }, [signUpData])

    const [signInData, setSignInData] = useState();
    async function signIn () {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: signInOrSignUpInputs.email,
                password: signInOrSignUpInputs.password 
            })
            if (error) setErrorWithSignInOrSignUp(error);
            setSignInData(data)
        } catch (err) {
            setErrorWithSignInOrSignUp(err);
        }
    }
    function logInExistingUser () {
        if (!errorWithSignInOrSignUp) {
            setGeneralPopUp({ message: "Exitosamente iniciaste sesión." , textForButtonOne: "Aceptar", textForButtonTwo: "" });
            setOpenGeneralPopUp(true);
            auth.login(signInData.user.id, signInData.session.access_token);
        } else {
            setGeneralPopUp({ message: "Error: " + errorWithSignInOrSignUp, textForButtonOne: "Cerrar", textForButtonTwo: ""  })
            setOpenGeneralPopUp(true);
        }
    }
    useEffect(() => {
        if (signInData) {
            logInExistingUser();
        }
    }, [signInData])
    
    function actionButton () {
        if (isSignUp) {
            signUp();
        } else if (!isSignUp) {
            signIn();
        }
    }

    const [passwordInputType, setPasswordInputType] = useState("password");
    function togglePasswordVisibility () {
        if (passwordInputType === "password") {
            setPasswordInputType("text")
        } else if (passwordInputType === "text") {
            setPasswordInputType("password")
        }
    }

    const [errorInInputs, setErrorInInputs] = useState(true);
    const [errorInSpecificInputs, setErrorInSpecificInputs] = useState({ displayName: null, userName: null, email: null, password: null })
    function checkUsernameValidity (enteredValue, field) {
        if (field === "userName" || field === "displayName") {
            if (nonEmptyText && minLengthText(enteredValue, 6)) {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, [field]: null });
            } else {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, [field]: "Escribe al menos 6 caracteres." });
            }
        } else if (field === "email") {
            if (nonEmptyText && isTextAnEmail(enteredValue)) {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, email: null });
            } else {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, email: "Escribe un e-mail válido." })
            }
        } else if (field === "password") {
            if (nonEmptyText && isTextAPassword(enteredValue, 10)) {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, password: null });
            } else {
                setErrorInSpecificInputs({ ...errorInSpecificInputs, password: "Escribe una contraseña válida." });
            }
        }
    }

    useEffect(() => {
        if (isSignUp) {
            if (signInOrSignUpInputs) {
                if ((signInOrSignUpInputs.email && errorInSpecificInputs.email) || (signInOrSignUpInputs.password && errorInSpecificInputs.password) || (signInOrSignUpInputs.displayName && errorInSpecificInputs.displayName) || (signInOrSignUpInputs.userName && errorInSpecificInputs.userName)) {
                    setErrorInInputs(true);
                } else if (!signInOrSignUpInputs.email || !signInOrSignUpInputs.password || !signInOrSignUpInputs.displayName || !signInOrSignUpInputs.userName) {
                    setErrorInInputs(true);
                } else {
                    setErrorInInputs(false);
                }
            }
        } else {
            if (errorInSpecificInputs.email || errorInSpecificInputs.password) {
                setErrorInInputs(true);
            } else {
                setErrorInInputs(false);
            }
        }
    }, [isSignUp, signInOrSignUpInputs])

    
    function closeGeneralPopUp () {        
        setGeneralPopUp({ message: "", textForButtonOne: "", textForButtonTwo: "" });
        setOpenGeneralPopUp(false);
        if (!errorWithSignInOrSignUp) closeSignInOrSignUpPopUp();
    }

    function closeSignInOrSignUpPopUp () {
        setSignInOrSignUpInputs();
        setErrorInInputs();
        setErrorInSpecificInputs({ displayName: null, userName: null, email: null, password: null })   
        setIsInputTouched({ displayName: false, userName: false, email: false, password: false });
        setIsInputBlurred({ displayName: false, userName: false, email: false, password: false });
        onClose();
    }

    const signInOrSignUpPopUp = (
        <div className="w-full">
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-60" onClick={closeSignInOrSignUpPopUp}></div>
            <div className={"flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-fit bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] z-70 p-4 sm:p-9 " + (isSignUp ? " top-[5%] " : " top-[5%] ")}>
                <div className="flex justify-center w-95percent mb-3 mx-auto">
                    <p className="text-center text-black font-amatic font-bold text-sign-in-or-sign-up-title-desktop">
                        {isSignUp && "Registrarse"}
                        {!isSignUp && "Iniciar sesión"}
                    </p>
                </div>
                <div className="flex flex-col justify-center w-95percent mx-auto">
                    {isSignUp && <div className="w-full mb-3">
                        <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Nombre de usuario:</label>
                        <input onBlur={(e) => inputBlurHandle(e)} onFocus={(e) => inputTouchHandle(e)} className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mx-auto" type="text" placeholder="Escribe tu usuario..." name="userName" onChange={(e) => inputChangeHandle(e)}  />
                        {errorInSpecificInputs.userName && isInputTouched.userName && isInputBlurred.userName && <ErrorWindowInInputs textForError="Escribe un nombre de usuario valido" />}
                    </div>}
                    
                    {isSignUp && <div className="w-full mb-3">
                        <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Nombre:</label>
                        <input onBlur={(e) => inputBlurHandle(e)} onFocus={(e) => inputTouchHandle(e)} className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mx-auto" type="text" placeholder="Escribe tu nombre..." name="displayName" onChange={(e) => inputChangeHandle(e)} autoCapitalize="on" />
                        {errorInSpecificInputs.displayName && isInputTouched.displayName && isInputBlurred.displayName && <ErrorWindowInInputs textForError="Escribe un nombre valido" />}
                    </div>}
                    
                    <div className="w-full mb-3">
                        <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Correo electrónico:</label>
                        <input onBlur={(e) => inputBlurHandle(e)} onFocus={(e) => inputTouchHandle(e)} className="w-full rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mx-auto" type="text" placeholder="Escribe tu correo electrónico..."  name="email" onChange={(e) => inputChangeHandle(e)} />
                        {errorInSpecificInputs.email && isInputTouched.email && isInputBlurred.email && <ErrorWindowInInputs textForError="Escribe un correo electrónico valido" />}
                    </div>
                    
                    <div className="w-full mb-3">
                        <label className="text-sign-in-or-sign-up-labels-desktop" htmlFor="">Contraseña:</label>
                        <div className="flex flex-row w-full rounded-sm bg-gray-200 justify-between">
                            <input onBlur={(e) => inputBlurHandle(e)} onFocus={(e) => inputTouchHandle(e)} className="w-8/10 rounded-sm bg-gray-200 py-3 px-2 sm:px-4 mx-auto float-left" type={passwordInputType} placeholder="Escribe tu contraseña..."  name="password" onChange={(e) => inputChangeHandle(e)} autoComplete="off"  />
                            <button className="flex justify-end w-2/10 rounded-sm bg-gray-200 items-center pr-2 sm:pr-4" onClick={togglePasswordVisibility}>
                                {(passwordInputType === "password") && <VisibilityIcon className="text-black hover:text-white duration-200 float-right" fontSize="medium" />}
                                {(passwordInputType === "text") && <VisibilityOffIcon className="text-black hover:text-white duration-200 float-right" fontSize="medium" />}
                            </button>
                        </div>
                        {errorInSpecificInputs.password && isInputTouched.password && isInputBlurred.password && <ErrorWindowInInputs textForError="Escribe una contraseña valida" />}
                    </div>
                    
                    <button disabled={errorInInputs} className="bg-var-2 hover:bg-var-2-hovered disabled:bg-gray-200 duration-200 w-full rounded-sm py-3 mx-auto mt-5 mb-3 text-white font-amatic font-bold text-sign-in-or-sign-up-button-desktop" onClick={actionButton}>
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