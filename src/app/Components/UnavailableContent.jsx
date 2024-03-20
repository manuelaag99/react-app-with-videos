import { useRouter } from "next/navigation"

export default function UnavailableContent () {
    const router = useRouter();

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col sm:w-85percent w-95percent mx-auto justify-center items-start bg-white rounded-md mt-14 mb-28 py-7 px-7 shadow-2xl">
                <p className="text-center w-full">
                    Lo siento, no puedes ver esta página.
                </p>
                <div className="text-center w-full mt-6 hover:text-var-1 duration-200 cursor-pointer" onClick={() => router.push("/")}>
                    Regresar a la página principal.
                </div>
            </div>
        </div>
    )
}