export default function ErrorWindowInInputs ({ textForError }) {
    return (
        <div className="absolute mt-0.5 bg-red-200 border-red-400 border h-fit py-2 px-2 z-90 rounded-sm shadow-2xl text-error-window mx-auto">
            <p className="">
                {textForError}
            </p>
        </div>
    )
}