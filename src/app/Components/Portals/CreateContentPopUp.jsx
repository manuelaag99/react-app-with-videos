import { createPortal } from "react-dom";

export default function CreateContentPopUp ({ open }) {
    const createContentPopUp = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-30" onClick={onClose}></div>
            <div className={"flex flex-col justify-center fixed w-9/10 sm:w-6/10 h-6/10 bg-white rounded-md shadow-2xl left-[5%] sm:left-[20%] z-40 p-4 sm:p-9 " + (isSignUp ? " top-[10%] " : " top-[18%] ")}>
                
            </div>
        </div>
    );

    if (open) {
        return createPortal(createContentPopUp, document.body);
    } else {
        return null;
    }
}