import { useMemo, useState } from "react";


interface FileHandlerReturn {
    attachments: File[];
    fileUrls: { [key: string]: string };
    uploadError: string | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteAttachment: (index: number) => void;
    setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
  }

const useFileHandler = (onUploadComplete?: () => void): FileHandlerReturn => {
    const [attachments, setAttachments] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const fileUrls = useMemo(() => {
        const urls: { [key: string]: string } = {};
        attachments.forEach((file) => {
            urls[file.name] = URL.createObjectURL(file);
        });
        return urls;
    }, [attachments]);

    useMemo(() => {
        return () => {
            Object.values(fileUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [fileUrls]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB limit
            const fileArray = Array.from(files).filter((file) => {
                if (!validTypes.includes(file.type)) {
                    return false;
                }
                if (file.size > maxSizeInBytes) {
                    setUploadError(
                        `File "${file.name}" exceeds the maximum size of 5MB.`
                    );
                    return false;
                }
                return true;
            });

            if (fileArray.length < files.length) {
                if (!uploadError) {
                    setUploadError(
                        'Some files were ignored due to unsupported types. Only images (JPEG, PNG) and PDFs are allowed.'
                    );
                }
            } else {
                setUploadError(null);
            }

            setAttachments((prev) => [...prev, ...fileArray]);
            console.log(
                'Uploaded files:',
                fileArray.map((file) => ({ name: file.name, type: file.type }))
            );
            if (onUploadComplete) {
                onUploadComplete();
            }
        }
    };

    const handleDeleteAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        attachments,
        fileUrls,
        uploadError,
        handleFileChange,
        handleDeleteAttachment,
        setAttachments,
    };
};

export default useFileHandler;