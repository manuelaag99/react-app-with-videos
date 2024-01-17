export default function Button ({ additionalClassNamesForButton, additionalClassNamesForText, contentForButton, isDisabled, onClickButtonAction }) {
    return (
        <button className={"py-1 px-3 whitespace-nowrap   " + additionalClassNamesForButton} disabled={isDisabled} onClick={onClickButtonAction}>
            <p className={" w-fit whitespace-nowrap " + additionalClassNamesForText}>
                {contentForButton}
            </p>
        </button>
    )
}