import { useState } from 'react';
import { UploadSection } from './components/UploadSection';
import { ChatInterface } from './components/ChatInterface';
import Toggle from './components/Toggle';
import { Heading } from './components/Heading';
import LinkInput from './components/LinkInput';

export default function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [tab, setTab] = useState<'pdf' | 'youtube'>('pdf')

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleReset = () => {
    setUploadedFile(null);
  };



  return (





    <div className="min-h-screen py-12 w-full  relative">
      {/* Black Grid with White Dots Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: "#000000",
          backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px, 20px 20px, 20px 20px",
          backgroundPosition: "0 0, 0 0, 0 0",
        }}
      />
      {/* Your Content/Components */}
      <div className='max-w-4xl bg-black/40 space-y-4 m-auto flex flex-col items-center justify-center'>
        <Toggle tab={tab} setTab={setTab} />
        {
          tab === 'pdf' && (
            !uploadedFile ? (
              <UploadSection onFileUpload={handleFileUpload} type={tab} />
            ) : (
              <ChatInterface fileName={uploadedFile.name} onReset={handleReset} />
            )
          )
        }

        {
          tab === 'youtube' && (
            <div className='flex items-center justify-center px-4'>
              <div className="w-full max-w-4xl space-y-24">
                <Heading type={tab} />
                <LinkInput />
              </div>
            </div>
          )
        }

      </div>

    </div>


  )

}



