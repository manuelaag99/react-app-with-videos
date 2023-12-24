export default function Button ({ additionalClassNamesForButton, additionalClassNamesForText, contentForButton, isDisabled, onClickButtonAction }) {
    return (
        <button className={"py-1 px-3  " + additionalClassNamesForButton} disabled={isDisabled} onClick={onClickButtonAction}>
            <p className={" " + additionalClassNamesForText}>
                {contentForButton}
            </p>
        </button>
    )
}