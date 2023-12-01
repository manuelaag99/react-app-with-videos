import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Link from 'next/link';
import MobileMenu from './Portals/MobileMenu';
import SignInOrSignUpPopUp from './Portals/SignInOrSignUpPopUp';

export default function TopNavigationBar ({}) {
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
    useEffect(() => {
        fetchLogo();
    }, [])

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState();

    const [openSignInOrSignUpWindow, setOpenSignInOrSignUpWindow] = useState();
    const [isItSignUp, setIsItSignUp] = useState();

    function openSignUpWindow () {
        setIsItSignUpOrSignIn(true);
        setOpenSignInOrSignUpWindow(true);
    }
    function openSignInWindow () {
        setIsItSignUpOrSignIn(false);
        setOpenSignInOrSignUpWindow(true);
    }

    return (
        <div className="flex flex-col w-full h-fit px-3 py-2 bg-var-1 fixed top-0 shadow-xl z-20">
            <div className="flex flex-row justify-between w-full h-fit">
                <Link className="flex justify-start w-4/10 sm:w-6/10 sm:ml-3 h-fit" href="/">
                    {caiLogo && <img className='h-14' src={caiLogo} alt="cai-logo" />}
                </Link>
                <div className="flex justify-start items-center w-fit sm:hidden ">
                    <button className="text-white hover:text-var-1-hovered duration-200 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
                        <MenuIcon color="#fff" fontSize='large' />
                    </button>
                </div>
                <div className="sm:flex flex-row w-fit hidden font-amatic text-navbar-desktop">
                    <Link className="px-3 " href="">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Hacer un pedido
                        </p>
                    </Link>
                    <Link className="px-3 " href="/courses/">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Cursos
                        </p>
                    </Link>
                    <Link className="px-3 " href="">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Registrarse
                        </p>
                    </Link>
                    <Link className="px-3 " href="">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Iniciar sesión
                        </p>
                    </Link>
                </div>
            </div>
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} open={isMobileMenuOpen} />
            <SignInOrSignUpPopUp onClose={() => setOpenSignInOrSignUpWindow(false)} open={true} openSignUp={true} />
        </div>
    )
}