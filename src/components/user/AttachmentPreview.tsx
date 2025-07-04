import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FaFilePdf, FaPaperclip } from 'react-icons/fa';


interface IFile {
  url: string;
  fileName: string;
  size: number;
  fileType: string;
  publicId: string;
}


interface AttachmentProp {
  files: File[];
  handleRemoveFile: (index: number) => void;
  taskFiles?: IFile[] | undefined;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const AttachmentPreview: React.FC<AttachmentProp> = ({ files, handleRemoveFile, taskFiles }) => {

  // if (files.length === 0) return null;
  if (files.length === 0 && (!taskFiles || taskFiles.length === 0)) return null;

  const allFiles = [
    ...files.map((file, index) => ({
      url: URL.createObjectURL(file),
      fileName: file.name,
      size: file.size,
      fileType: file.type,
      isLocal: true,
      index, // Used for handleRemoveFile
    })),
    ...(taskFiles || []).map((file) => ({
      url: file.url,
      fileName: file.fileName,
      size: file.size,
      fileType: file.fileType,
      isLocal: false,
      index: -1, // Not used for server files
    })),
  ];

  // console.log("taskFilessssssssssssssssssssssssssssssssss allFiles", allFiles)

  return (
    <div className="text-gray-400">
      <h4 className="text-sm font-semibold">Uploaded Files</h4>
      <ul className="mt-1 flex items-center gap-2">

        {allFiles?.map((file, index) => (
  <li key={index} className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      {file.fileType.startsWith('image/') ? (
        <div className="relative">
          <img
            src={file.url}
            alt={file.fileName}
            className="w-28 h-28 object-cover rounded-sm border border-[#3a3a3a]"
          />
          <div
            className="text-xs truncate max-w-20 cursor-pointer"
            title={file.fileName}
          >
            {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
          </div>
          <button
            className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
            onClick={() => handleRemoveFile(index)}
          >
            <IoMdCloseCircle size={18} />
          </button>
        </div>
      ) : file.fileType === 'application/pdf' ? (
        <div className="relative">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-28 h-28 border border-[#3a3a3a] rounded-sm"
          >
            <FaFilePdf className="text-red-500 w-16 h-16" /> {/* PDF icon */}
          </a>
          <div
            className="text-xs truncate max-w-20 cursor-pointer"
            title={file.fileName}
          >
            {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
          </div>
          <button
            className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
            onClick={() => handleRemoveFile(index)}
          >
            <IoMdCloseCircle size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <FaPaperclip className="text-blue-500 w-28 h-28" />
          <div
            className="text-xs truncate max-w-20 cursor-pointer"
            title={file.fileName}
          >
            {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
          </div>
          <button  
            className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
            onClick={() => handleRemoveFile(index)}
          >
            <IoMdCloseCircle size={18} />
          </button>
        </div>
      )}
    </div>
  </li>
))}
        
        {/* {files.map((file, index) => (
          <li key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {file.type.startsWith('image/') ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-28 h-28 object-cover rounded-sm border border-[#3a3a3a]"
                  />
                  <div
                    className="text-xs truncate max-w-20 cursor-pointer"
                    title={file.name}
                  >
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                  <button
                    className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <IoMdCloseCircle size={18} />
                  </button>
                </div>
              ) : file.type === 'application/pdf' ? (
                <div className="relative">
                  <div className="w-28 h-28 border border-[#3a3a3a] rounded-sm overflow-hidden">
                    <iframe
                      src={URL.createObjectURL(file)}
                      title={file.name}
                      className="w-full h-full"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                    />
                  </div>
                  <div
                    className="text-xs truncate max-w-20 cursor-pointer"
                    title={file.name}
                  >
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                  <button
                    className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <IoMdCloseCircle size={18} />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <FaPaperclip className="text-blue-500 w-28 h-28" />
                  <div
                    className="text-xs truncate max-w-20 cursor-pointer"
                    title={file.name}
                  >
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                  <button
                    className="absolute top-0 right-0 text-gray-500/30 hover:text-gray-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <IoMdCloseCircle size={18} />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default AttachmentPreview;