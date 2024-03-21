import { createPortal } from "react-dom";
import Button from "../Button";

export default function PurchasePopUp ({ closePurchasePopUp, open }) {
    const purchasePopUp = (
        <div className="h-full">
            <div className="bg-black opacity-50 fixed top-0 bottom-0 w-screen h-screen z-20" onClick={closePurchasePopUp}></div>
            <div className="flex flex-col justify-center w-6/10 h-fit bg-white shadow-2xl fixed rounded-md z-30 mx-auto top-[15%] left-[20%] p-5 ">
                <div className="flex ">
                    <p className="text-center text-black w-full py-3">
                        Quieres comprar este curso?
                    </p>
                </div>
                <div className="flex flex-row justify-between px-6 py-3">
                    <Button additionalClassNamesForButton=" text-center -mt-1.5 -mb-1.5" additionalClassNamesForText=" flex justify-center md:mt-0 mt-3 px-4 py-2 font-amatic text-button-desktop font-bold rounded-md shadow-md bg-var-2 hover:bg-var-2-hovered duration-300 text-white" contentForButton="Si, comprar curso" isDisabled={false} onClickButtonAction={() => console.log("purchase")} />
                    <Button additionalClassNamesForButton=" text-center -mt-1.5 -mb-1.5" additionalClassNamesForText=" flex justify-center md:mt-0 mt-3 px-4 py-2 font-amatic text-button-desktop font-bold rounded-md shadow-md bg-var-3 hover:bg-var-3-hovered duration-300 text-white" contentForButton="No, cancelar" isDisabled={false} onClickButtonAction={closePurchasePopUp} />
                </div>
            </div>
        </div>
    )

    if (open) {
        return createPortal(purchasePopUp, document.body);
    } else {
        return null;
    }
}