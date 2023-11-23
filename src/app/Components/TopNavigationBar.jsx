import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Link from 'next/link';

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

    console.log(caiLogo)

    return (
        <div className="flex flex-col w-full h-fit px-3 py-2 bg-var-1 fixed top-0 shadow-xl">
            <div className="flex flex-row justify-between w-full h-fit">
                <Link className="flex justify-start w-4/10 sm:w-6/10 sm:ml-3 h-fit" href="/">
                    {caiLogo && <img className='h-14' src={caiLogo} alt="cai-logo" />}
                </Link>
                <div className="flex justify-start items-center w-fit sm:hidden ">
                    <button className="text-white hover:text-var-1-hovered duration-200 cursor-pointer">
                        <MenuIcon color="#fff" fontSize='large' />
                    </button>
                </div>
                <div className="sm:flex flex-row w-fit hidden">
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap">
                            Hacer un pedido
                        </p>
                    </button>
                    <Link className="p-3 " href="/courses/">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap mt-1">
                            Cursos
                        </p>
                    </Link>
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap">
                            Registrarse
                        </p>
                    </button>
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap">
                            Iniciar sesión
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}