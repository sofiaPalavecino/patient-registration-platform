import { useRef, useState } from 'react';
import ErrorField from './error-field';

interface FileUploadProps {
    label: string;
    name: string;
    onFileSelect: (file: File) => void;
    onRemove?: () => void;
    onError?: (message: string) => void;
    preview?: string | null;
    error?: string;
    accept?: string;
    acceptedTypes?: string[];
    maxSizeInMB?: number;
    required?: boolean;
    placeholder?: {
        main: string;
        secondary: string;
        hint: string;
    };
}

export default function FileUpload({
    label,
    name,
    onFileSelect,
    onRemove,
    onError,
    preview,
    error,
    accept = "image/jpg,image/jpeg",
    acceptedTypes = ['image/jpeg', 'image/jpg'],
    maxSizeInMB = 2,
    required = true,
    placeholder = {
        main: "Drag and drop an image here",
        secondary: "choose a file",
        hint: "JPG or JPEG only. Max weight 2MB"
    }
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    function validateAndHandleFile(file: File) {
        if (!acceptedTypes.includes(file.type)) {
            const typeNames = acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(' or ');
            const errorMessage = `Only ${typeNames} images are allowed`;
            if (onError) {
                onError(errorMessage);
            } else {
                alert(errorMessage);
            }
            return;
        }

        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            const errorMessage = `File size must be less than ${maxSizeInMB}MB`;
            if (onError) {
                onError(errorMessage);
            } else {
                alert(errorMessage);
            }
            return;
        }

        onFileSelect(file);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndHandleFile(file);
        }
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            validateAndHandleFile(file);
        }
    }

    return (
        <div className='c-file-upload'>
            <label className="mb-2 block text-sm font-medium">
                {label}{required && ' *'}
            </label>

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`c-file-upload__container flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-6 text-center relative ${
                    isDragging
                        ? 'border-black bg-gray-50'
                        : error
                            ? 'border-red-500 bg-red-50'
                            : 'border-default'
                }`}
                onClick={() => fileInputRef.current?.click()}
            >
                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-32 w-32 rounded object-cover cursor-pointer"
                        />
                        {onRemove && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                                title="Remove file"
                            >
                                ×
                            </button>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                            Click to replace
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-sm">
                            {placeholder.main}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            or{' '}
                            <span className="underline">
                                {placeholder.secondary}
                            </span>
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            {placeholder.hint}
                        </p>
                    </>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                name={name}
                onChange={onFileChange}
            />

            <ErrorField message={error} />
        </div>
    );
}
