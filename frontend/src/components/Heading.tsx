import React from 'react'

interface Props {
    type: 'pdf' | 'youtube';
}
export const Heading = ({ type }: Props) => {
    return (
        <div className="text-center mb-12">

            <h1 className="text-slate-200 text-7xl font-bold mb-3">{`Chat with ${type === 'pdf' ? 'your PDF' : 'Youtube Video'}`}</h1>
            <p className="text-slate-300 text-2xl">{`${type === 'pdf' ? 'Upload a PDF document' : 'Paste video link'} and ask questions about its content`}</p>
        </div>
    )
}
