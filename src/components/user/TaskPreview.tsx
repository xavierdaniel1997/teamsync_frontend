import React from 'react';
import { MdDelete } from 'react-icons/md';

interface TaskPreviewProps {
    attachments: File[];
    fileUrls: { [key: string]: string };
    handleDeleteAttachment: (index: number) => void;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({
    attachments,
    fileUrls,
    handleDeleteAttachment,
}) => {
    return (
        <div className="flex gap-3 flex-wrap">
            {attachments.map((file, index) => {
                const isImage = file.type.startsWith('image/');
                const isPDF = file.type === 'application/pdf';

                return (
                    <div
                        key={index}
                        className="relative w-24 h-24 bg-[#1f1f1f] rounded-sm flex items-center justify-center overflow-hidden border border-gray-700"
                        aria-label={`Attachment: ${file.name}`}
                    >
                        {isImage ? (
                            <img
                                src={fileUrls[file.name]}
                                alt={file.name}
                                className="w-full h-full object-cover"
                            />
                        ) : isPDF ? (
                            <iframe
                                src={fileUrls[file.name]}
                                title={file.name}
                                className="w-full h-full border-none overflow-hidden pointer-events-none origin-top-left"
                            />
                        ) : (
                            <span className="text-xs text-gray-300 text-center px-1 truncate">
                                {file.name}
                            </span>
                        )}
                        <button
                            onClick={() => handleDeleteAttachment(index)}
                            className="absolute top-1 right-1 bg-[#434040b6] rounded-full p-1 text-gray"
                            aria-label={`Delete attachment: ${file.name}`}
                        >
                            <MdDelete size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskPreview;