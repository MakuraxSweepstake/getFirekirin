"use client";

import { InputLabel, OutlinedInput } from "@mui/material";
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import React from "react";

interface InputFileProps {
    name: string;
    label: string;
    value: File | File[] | null;
    onChange: (file: File | File[] | null) => void;
    onBlur?: () => void;
    required?: boolean;
    accept?: string;
    error?: string | boolean;
    touched?: boolean;
    multiple?: boolean;
    serverFile?: string | string[] | null;
    onRemoveServerFile?: (fileUrl?: string) => void;
}

export default function InputFile({
    name,
    label,
    value,
    onChange,
    onBlur,
    required,
    accept,
    error,
    touched,
    multiple = false,
    serverFile,
    onRemoveServerFile,
}: InputFileProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        if (multiple) {
            onChange(Array.from(files));
        } else {
            onChange(files[0]);
        }
    };

    const handleRemoveFile = (fileToRemove: File) => {
        if (!Array.isArray(value)) return;
        const updatedFiles = value.filter((f) => f !== fileToRemove);
        onChange(updatedFiles.length > 0 ? updatedFiles : null);
    };

    // const fileChosen =
    //     (Array.isArray(value) && value.length > 0) || value || serverFile;

    return (
        <div className="input__field">
            <InputLabel htmlFor={name} className="block text-sm font-semibold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </InputLabel>

            <div className="input_box relative">
                <OutlinedInput
                    fullWidth
                    id={name}
                    name={name}
                    type="text"
                    readOnly
                    // value={
                    //     Array.isArray(value)
                    //         ? value.map((f) => f.name).join(", ") || ""
                    //         : value instanceof File
                    //             ? value.name
                    //             : ""
                    // }
                    // placeholder="Choose file"
                    onClick={() => document.getElementById(`${name}-file`)?.click()}
                    error={Boolean(touched && error)}
                    sx={{
                        cursor: "pointer",
                    }}
                />
                <span className=" absolute left-2 top-1/2 translate-y-[-50%] text-[11px] text-title bg-[#D8D8DD] inline-block py-1 px-2 z-[-1] rounded-sm">Choose File</span>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                id={`${name}-file`}
                name={name}
                accept={accept}
                hidden
                multiple={multiple}
                onChange={(e) => {
                    handleFileChange(e);
                    e.target.value = "";
                }}
                onBlur={onBlur}
            />

            {/* Preview thumbnails */}
            <div className="flex gap-3 flex-wrap mt-2">
                {value &&
                    (Array.isArray(value) ? (
                        value.map((f) => (
                            <div
                                key={f.name}
                                className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                            >
                                <img
                                    src={URL.createObjectURL(f)}
                                    alt={f.name}
                                    className="w-full h-full object-cover"
                                />
                                <CloseCircle
                                    size={16}
                                    className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                    onClick={() => handleRemoveFile(f)}
                                />
                            </div>
                        ))
                    ) : (
                        <div
                            key={value.name}
                            className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img
                                src={URL.createObjectURL(value)}
                                alt={value.name}
                                className="w-full h-full object-cover"
                            />
                            <CloseCircle
                                size={16}
                                className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                onClick={() => onChange(null)}
                            />
                        </div>
                    ))}

                {/* Server File preview */}
                {serverFile &&
                    (Array.isArray(serverFile) ? (
                        serverFile.map((f) => (
                            <div
                                key={f}
                                className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                            >
                                <img src={f} alt={f} className="w-full h-full object-cover" />
                                <CloseCircle
                                    size={16}
                                    className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                    onClick={() =>
                                        onRemoveServerFile && onRemoveServerFile(f)
                                    }
                                />
                            </div>
                        ))
                    ) : (
                        <div
                            key={serverFile}
                            className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img
                                src={serverFile}
                                alt={serverFile}
                                className="w-full h-full object-cover"
                            />
                            <CloseCircle
                                size={16}
                                className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                onClick={() =>
                                    onRemoveServerFile && onRemoveServerFile(serverFile)
                                }
                            />
                        </div>
                    ))}
            </div>

            {touched && error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
