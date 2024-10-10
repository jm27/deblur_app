export const validateFileType = (file) => {
    const acceptedFileTyper = ["image/jpeg", "image/png"];
    return acceptedFileTyper.includes(file.type);
}

export const validateFileSize = (file) => {
    const maxFileSize = 5242880; // 5MB
    return file.size <= maxFileSize;
}