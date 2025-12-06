import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { uploadPdf } from '../../services/api';
import { AxiosError } from 'axios';
import Spinner from './Spinner';
import { Heading } from './Heading';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  type: 'pdf' | 'youtube';
}

export function UploadSection({ onFileUpload, type }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();


  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploading(true);
      setSelectedFile(file);
      formData.append('file', file);
      try {
        // 🛑 KEY STEP: Pass the progress handler to the API function
        await uploadPdf(formData);

        // Success
        setUploading(false);
        onFileUpload(file);
      } catch (error) {
        // Error handling
        setUploading(false);
        if (error instanceof AxiosError) {
          const errorMessage = error?.response?.data?.message || 'Upload failed. Check console for details.';
          setUploadError(errorMessage);
          console.error('Upload Error:', errorMessage);
          return;
        }
        console.error(error);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-4xl space-y-24">
        {/* Header */}
        <Heading type={type} />

        {
          uploadError && selectedFile && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
              {uploadError}
            </div>
          )
        }
        {/* Upload Area */}
        <div className=" rounded-2xl shadow-sm border border-slate-700 p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${isDragging
              ? 'border-blue-500 '
              : 'border-slate-300  hover:border-slate-400'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />

            {!selectedFile ? (
              <label htmlFor="file-upload">

                <div className="text-center cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-200 rounded-full mb-4">
                    <Upload className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="mb-4">

                    <span className="text-slate-600">   Click to upload or drag and drop</span>
                  </div>
                  <p className="text-slate-500">PDF files only (max 10MB)</p>
                </div>
              </label>
            ) : (
              <div className='flex items-center text-white space-y-4 flex-col justify-center'>
                <div className="flex w-full items-center justify-between bg-black/50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-white">{selectedFile.name}</p>
                      <p className="text-slate-200">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                {uploading && (
                  <Spinner />
                )}
              </div>
            )}
          </div>


        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="text-blue-600 mb-2 text-6xl">🔒</div>
            <p className="text-slate-200  text-2xl  ">Secure</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 mb-2 text-6xl">⚡</div>
            <p className="text-slate-200 text-2xl">Fast</p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 mb-2 text-6xl">🎯</div>
            <p className="text-slate-200 text-2xl">Accurate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
