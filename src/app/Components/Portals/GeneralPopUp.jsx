import { createPortal } from "react-dom"

export default function GeneralPopUp ({}) {

    const generalPopUp = (
        <div>

        </div>
    )

    if (open) {
        return createPortal(generalPopUp, document.body);
    } else {
        return null;
    }
}