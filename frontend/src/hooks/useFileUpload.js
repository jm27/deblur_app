import { useState } from 'react';

export const useFileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);

    const handleFileUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setFile(file);
    }

    return { file, fileError, handleFileUpload };
}