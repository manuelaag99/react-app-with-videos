import { createPortal } from "react-dom"
import Button from "../Button";

export default function GeneralPopUp ({ infoForPopUp, onClose, open }) {
    const generalPopUp = (
        <div>
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-80" onClick={onClose}></div>
            <div className="flex flex-col justify-center fixed w-7/10 sm:w-5/10 h-fit bg-white rounded-md shadow-2xl left-[15%] sm:left-[25%] top-[25%] z-90 px-4 py-6 sm:px-9 ">
                <div className="flex flex-col w-full px-6 justify-center items-center h-fit">
                    <div className="flex w-full mb-4 justify-center">
                        <p className="text-center">{infoForPopUp.message}</p>
                    </div>
                    <div className={"flex flex-col sm:flex-row w-full " + ((infoForPopUp.textForButtonTwo !== "") ? " justify-between" : " justify-center" )}>
                        {(infoForPopUp.textForButtonOne !== "") && <Button additionalClassNamesForText=" text-center" additionalClassNamesForButton=" flex justify-center py-2 bg-var-1 text-white hover:bg-var-1-hovered duration-200 rounded-md shadow-md sm:mt-0" contentForButton={infoForPopUp.textForButtonOne} onClickButtonAction={onClose} />}
                        {(infoForPopUp.textForButtonTwo !== "") && <Button additionalClassNamesForText=" text-center" additionalClassNamesForButton=" flex justify-center py-2 bg-var-1 text-white hover:bg-var-1-hovered duration-200 rounded-md shadow-md sm:mt-0 mt-4" contentForButton={infoForPopUp.textForButtonTwo} onClickButtonAction={() => console.log("click")} />}
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