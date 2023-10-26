export default function Image ({ additionalClassNames, imageAlt, imageSource }) {
    return (
        <div className={"" + additionalClassNames}>
            <img className="h-full w-full object-cover cursor-pointer hover:opacity-40 duration-200 " src={imageSource} alt={imageAlt} />
        </div>
    )
}