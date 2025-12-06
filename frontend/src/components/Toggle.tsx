import React from 'react'

interface ToggleProps {
    tab: 'pdf' | 'youtube';
    setTab: (tab: 'pdf' | 'youtube') => void;
}
const Toggle = (props: ToggleProps) => {
    const handleToggle = () => {
        if (props.tab === 'pdf') {
            props.setTab('youtube')
        } else {
            props.setTab('pdf')
        }
    }
    return (
        <button
            onClick={handleToggle}
            className='relative text-white inline-flex items-center w-40 h-12 bg-transparent border border-neutral-200 rounded-lg p-1 transition-colors hover:bg-black/30'
            role="switch"
            aria-checked={props.tab === 'youtube'}
        >


            <span className={`absolute   left-2 text-xl font-medium transition-opacity ${props.tab === 'pdf' ? 'opacity-100' : 'opacity-50  cursor-pointer'}`}>PDF</span>
            <span className={`absolute  right-2 text-xl font-medium transition-opacity ${props.tab === 'youtube' ? 'opacity-100  ' : 'opacity-50 cursor-pointer'}`}>YouTube</span>
        </button>
    )
}

export default Toggle   