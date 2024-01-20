export default function Button ({ additionalClassNamesForButton, additionalClassNamesForText, contentForButton, isDisabled, onClickButtonAction }) {
    return (
        <button className={"py-1 px-3  " + additionalClassNamesForButton} disabled={isDisabled} onClick={onClickButtonAction}>
            <p className={" w-fit  " + additionalClassNamesForText}>
                {contentForButton}
            </p>
        </button>
    )
}