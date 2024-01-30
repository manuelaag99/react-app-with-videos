import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Link from 'next/link';
import MobileMenu from './Portals/MobileMenu';
import SignInOrSignUpPopUp from './Portals/SignInOrSignUpPopUp';
import { AuthContext } from '../context/AuthContext';

export default function TopNavigationBar ({}) {
    const auth = useContext(AuthContext);
    const [caiLogo, setCaiLogo] = useState();
    async function fetchLogo () {
        try {
            const { data, error } = await supabase.storage.from("cai-images").getPublicUrl("generalPics/cai bakery logo.png");
            if (error) console.log (error);
            setCaiLogo(data.publicUrl);
        } catch (err) {
            console.log (err);
        }
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
        fetchLogo();
        fetchAdmins();
    }, [])

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState();

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

    return (
        <div className="flex flex-col w-full h-fit px-3 py-2 bg-var-1 fixed top-0 shadow-xl z-20">
            <div className="flex flex-row justify-between w-full h-fit">
                <Link className="flex justify-start w-fit sm:ml-3 h-fit" href="/">
                    {caiLogo && <img className='h-14 w-full' src={caiLogo} alt="cai-logo" />}
                </Link>
                <div className="flex justify-start items-center w-fit sm:hidden ">
                    <button className="text-white hover:text-var-1-hovered duration-200 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
                        <MenuIcon color="#fff" fontSize='large' />
                    </button>
                </div>
                <div className="sm:flex flex-row w-fit hidden font-amatic text-navbar-desktop">
                    <Link className="px-3 cursor-pointer pt-2" href="">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Hacer un pedido
                        </p>
                    </Link>
                    <Link className="px-3 cursor-pointer pt-2" href="/courses/">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Cursos
                        </p>
                    </Link>
                    {!auth.isLoggedIn && <div className="px-3 cursor-pointer pt-2" onClick={openSignUpWindow}>
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Registrarse
                        </p>
                    </div>}
                    {!auth.isLoggedIn && <div className="px-3 cursor-pointer pt-2" onClick={openSignInWindow}>
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Iniciar sesión
                        </p>
                    </div>}
                    {admins && (admins.length > 0) && admins.includes(auth.uId) && <Link className="px-3 cursor-pointer pt-2" href="/admin/">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Administrar
                        </p>
                    </Link>}
                    {auth.isLoggedIn && <div className="px-3 cursor-pointer pt-2">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Cerrar sesión
                        </p>
                    </div>}
                </div>
            </div>
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} open={isMobileMenuOpen} />
            <SignInOrSignUpPopUp onClose={() => setOpenSignInOrSignUpWindow(false)} open={openSignInOrSignUpWindow} openSignUp={isItSignUp} />
        </div>
    )
}