import MenuIcon from '@mui/icons-material/Menu';

export default function TopNavigationBar ({}) {
    return (
        <div className="flex flex-col w-full h-fit px-3 py-2 bg-var-1 fixed top-0 shadow-xl">
            <div className="flex flex-row justify-between w-full h-fit">
                <div className="flex justify-start items-center w-fit sm:hidden ">
                    <button className="text-white hover:text-var-1-hovered duration-200 cursor-pointer">
                        <MenuIcon color="#fff" fontSize='large' />
                    </button>
                </div>
                <div className="flex justify-start sm:justify-center w-4/10 sm:w-6/10">
                    <img src="" alt="" />
                </div>
                <div className="sm:flex flex-row w-fit hidden">
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap">
                            Hacer un pedido
                        </p>
                    </button>
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200 whitespace-nowrap">
                            Cursos
                        </p>
                    </button>
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