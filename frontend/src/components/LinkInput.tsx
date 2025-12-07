import { uploadLink } from "../../services/api"
import { useState } from "react"

interface LinkInputProps {
    uploadedLink: (link: string) => void
}
const LinkInput = ({ uploadedLink }: LinkInputProps) => {
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        if (!(link.trim().length > 0)) {
            return;
        }
        setLoading(true)
        try {
            const response = await uploadLink(link);
            uploadedLink(link);
        } catch (error) {
            console.log(error)
        } finally {

            setLoading(false)
        }
    }
    return (
        <div className='max-w-lg mx-auto rounded-2xl gap-2 text-white bg-neutral-900 flex justify-between items-center h-fit p-2'>
            <input onChange={(e) => setLink(e.target.value)} className='pl-4 flex-1 text-xl  focus:border-0  focus:outline-none' type='text' placeholder='https://www.youtube.com/watch?v=' />
            <button onClick={handleSubmit} className={`${!(link.trim().length > 0) ? 'bg-blue-400' : 'bg-blue-600'} rounded-2xl  cursor-pointer px-3 py-2 text-xl font-semibold`}>{`${loading ? "Analyzing Video" : "Analyze Video"}`}</button>
        </div>
    )
}

export default LinkInput