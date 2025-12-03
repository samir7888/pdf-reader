import { useState } from 'react';
import { UploadSection } from './components/UploadSection';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleReset = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!uploadedFile ? (
        <UploadSection onFileUpload={handleFileUpload} />
      ) : (
        <ChatInterface fileName={uploadedFile.name} onReset={handleReset} />
      )}
    </div>
  );
}
