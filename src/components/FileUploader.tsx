import React, { useState, useCallback } from 'react';

interface FileItem {
  id: string;
  name: string;
  content: string;
  type: 'code' | 'text';
  language?: string;
}

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      processFiles(Array.from(fileList));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const fileList = e.dataTransfer.files;
    if (fileList.length > 0) {
      processFiles(Array.from(fileList));
    }
  };

  const processFiles = async (fileList: File[]) => {
    const newFiles = await Promise.all(
      fileList.map(async (file) => {
        const content = await readFileAsText(file);
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        const isCode = ['py', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'json'].includes(extension);
        
        return {
          id: crypto.randomUUID(),
          name: file.name,
          content,
          type: isCode ? 'code' as const : 'text' as const,
          language: isCode ? extension : undefined,
        };
      })
    );

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    if (newFiles.length > 0 && !activeFile) {
      setActiveFile(newFiles[0].id);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    if (activeFile === id) {
      setActiveFile(files.length > 1 ? files[0].id : null);
    }
  };

  const activeFileContent = files.find(file => file.id === activeFile)?.content || '';
  const activeFileLanguage = files.find(file => file.id === activeFile)?.language || '';

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            Upload Python, JavaScript, or text files up to 10MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {files.map((file) => (
              <button
                key={file.id}
                className={`px-4 py-2 text-sm font-medium ${
                  activeFile === file.id
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveFile(file.id)}
              >
                {file.name}
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                >
                  ×
                </button>
              </button>
            ))}
          </div>

          <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {activeFile ? (
                <div className="relative
                ">
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                    <code className={`language-${activeFileLanguage}`}>
                      {activeFileContent}
                    </code>
                  </pre>
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      navigator.clipboard.writeText(activeFileContent);
                    }}
                    title="Copy to clipboard"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Select a file to view its content</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
