"use client";

import { InputLabel, OutlinedInput } from "@mui/material";
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import React, { useEffect, useMemo } from "react";

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
    /* =========================
       Helpers
    ========================== */

    const isVideoFile = (file: File) => file.type.startsWith("video/");
    const isVideoUrl = (url: string) =>
        /\.(mp4|webm|ogg|mov)$/i.test(url);

    /* =========================
       File Change Handler
    ========================== */

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (multiple) {
            onChange(Array.from(files));
        } else {
            onChange(files[0]);
        }

        // reset input
        e.target.value = "";
    };

    const handleRemoveFile = (fileToRemove: File) => {
        if (!Array.isArray(value)) return;

        const updatedFiles = value.filter((f) => f !== fileToRemove);
        onChange(updatedFiles.length ? updatedFiles : null);
    };

    /* =========================
       Generate Preview URLs
    ========================== */

    const previewFiles = useMemo(() => {
        if (!value) return [];

        if (Array.isArray(value)) {
            return value.map((file) => ({
                file,
                url: URL.createObjectURL(file),
                isVideo: isVideoFile(file),
            }));
        }

        return [
            {
                file: value,
                url: URL.createObjectURL(value),
                isVideo: isVideoFile(value),
            },
        ];
    }, [value]);

    /* =========================
       Cleanup Object URLs
    ========================== */

    useEffect(() => {
        return () => {
            previewFiles.forEach((item) => {
                URL.revokeObjectURL(item.url);
            });
        };
    }, [previewFiles]);

    /* =========================
       Render
    ========================== */

    return (
        <div className="input__field">
            <InputLabel
                htmlFor={name}
                className="block text-sm font-semibold mb-2"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </InputLabel>

            {/* Clickable Input */}
            <div className="input_box relative">
                <OutlinedInput
                    fullWidth
                    id={name}
                    name={name}
                    type="text"
                    readOnly
                    onClick={() =>
                        document.getElementById(`${name}-file`)?.click()
                    }
                    error={Boolean(touched && error)}
                    sx={{ cursor: "pointer" }}
                />

                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-title bg-[#D8D8DD] inline-block py-1 px-2 z-[-1] rounded-sm">
                    Choose File
                </span>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                id={`${name}-file`}
                name={name}
                accept={accept}
                hidden
                multiple={multiple}
                onChange={handleFileChange}
                onBlur={onBlur}
            />

            {/* Preview Section */}
            <div className="flex gap-3 flex-wrap mt-3">

                {/* Local File Preview */}
                {previewFiles.map(({ file, url, isVideo }) => (
                    <div
                        key={file.name + url}
                        className="relative w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200"
                    >
                        {isVideo ? (
                            <video
                                src={url}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                            />
                        )}

                        <CloseCircle
                            size={18}
                            className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500 drop-shadow"
                            onClick={() =>
                                Array.isArray(value)
                                    ? handleRemoveFile(file)
                                    : onChange(null)
                            }
                        />
                    </div>
                ))}

                {/* Server File Preview */}
                {serverFile &&
                    (Array.isArray(serverFile)
                        ? serverFile.map((url) => (
                            <div
                                key={url}
                                className="relative w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200"
                            >
                                {isVideoUrl(url) ? (
                                    <video
                                        src={url}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={url}
                                        alt={url}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <CloseCircle
                                    size={18}
                                    className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500 drop-shadow"
                                    onClick={() =>
                                        onRemoveServerFile?.(url)
                                    }
                                />
                            </div>
                        ))
                        : (
                            <div
                                key={serverFile}
                                className="relative w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200"
                            >
                                {isVideoUrl(serverFile) ? (
                                    <video
                                        src={serverFile}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={serverFile}
                                        alt={serverFile}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                <CloseCircle
                                    size={18}
                                    className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500 drop-shadow"
                                    onClick={() =>
                                        onRemoveServerFile?.(serverFile)
                                    }
                                />
                            </div>
                        ))}
            </div>

            {/* Error */}
            {touched && error && (
                <span className="text-red-500 text-xs mt-1 block">
                    {error}
                </span>
            )}
        </div>
    );
}
