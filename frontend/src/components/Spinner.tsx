
const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div
                className="w-8 h-8 border-4 border-t-4 border-blue-500 border-opacity-20 border-x-gray-500 rounded-full animate-spin"
                role="status"
            >
                <span className="sr-only">Uploading...</span>
            </div>
        </div>
    )
}

export default Spinner