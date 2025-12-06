

const LinkInput = () => {
    return (
        <div className='max-w-lg mx-auto rounded-2xl gap-2 text-white bg-neutral-900 flex justify-between items-center h-fit p-2'>
            <input className='pl-4 flex-1 text-xl  focus:border-0  focus:outline-none' type='text' placeholder='https://www.youtube.com/watch?v=' />
            <button className='bg-blue-400 rounded-2xl  cursor-pointer px-3 py-2 text-xl font-semibold'>Analze Video</button>
        </div>
    )
}

export default LinkInput