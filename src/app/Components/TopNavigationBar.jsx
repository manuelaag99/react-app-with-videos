import MenuIcon from '@mui/icons-material/Menu';

export default function TopNavigationBar ({}) {
    return (
        <div className="flex flex-col w-full h-fit px-6 py-2 bg-var-1 fixed top-0 shadow-xl">
            <div className="flex flex-row justify-between w-full h-fit">
                <div className="flex justify-center items-center w-2/10">
                    <p className="text-white hover:text-var-1-hovered duration-200">
                        <MenuIcon color="#fff" fontSize='large' />
                    </p>
                </div>
                <div className="flex justify-start sm:justify-center w-1/10 sm: w-6/10">
                    <img src="" alt="" />
                </div>
                <div className="sm:flex flex-row w-fit hidden">
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200">
                            Hacer un pedido
                        </p>
                    </button>
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200">
                            Cursos
                        </p>
                    </button>
                    <button className="p-3 ">
                        <p className="text-white text-var-1-hovered duration-200">
                            Registrarse
                        </p>
                    </button>
                    <button className="p-3 ">
                        <p className="text-white hover:text-var-1-hovered duration-200">
                            Iniciar sesión
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}