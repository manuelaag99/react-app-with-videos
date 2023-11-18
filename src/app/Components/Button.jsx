export default function Button ({ additionalClassNamesForButton, additionalClassNamesForText, onClickButtonAction, contentForButton }) {
    return (
        <button className={"py-1 px-3  " + additionalClassNamesForButton} onClick={onClickButtonAction}>
            <p className={" " + additionalClassNamesForText}>
                {contentForButton}
            </p>
        </button>
    )
}