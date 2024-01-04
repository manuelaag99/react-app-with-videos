import { createPortal } from "react-dom"
import Button from "../Button";

export default function GeneralPopUp ({ onClose, open, textForButtonOne, textForButtonTwo, textForPopUp }) {

    const generalPopUp = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-40" onClick={onClose}></div>
            <div className="flex flex-col justify-center fixed w-7/10 sm:w-5/10 h-fit bg-white rounded-md shadow-2xl left-[15%] sm:left-[25%] top-[25%] z-50 p-4 sm:p-9 ">
                <div className="flex flex-col w-full px-6 justify-center items-center h-fit">
                    <div className="flex w-full">
                        <p>{textForPopUp}</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <Button additionalClassNamesForText=" text-center" additionalClassNamesForButton=" bg-var-1 text-white bg-var-1-hovered duration-200" contentForButton={textForButtonOne} onClickButtonAction={() => console.log("click")} />
                        <Button additionalClassNamesForText=" text-center" additionalClassNamesForButton=" bg-var-1 text-white bg-var-1-hovered duration-200" contentForButton={textForButtonTwo} onClickButtonAction={() => console.log("click")} />
                    </div>
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(generalPopUp, document.body);
    } else {
        return null;
    }
}