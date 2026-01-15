"use client";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

interface CustomLightGalleryProps {
    images: string[];
    aspectRatio?: string;
    column?: string | number;
}

export default function CustomLightGallery({
    images,
    aspectRatio,
    column
}: CustomLightGalleryProps) {
    const baseGrid = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2";

    const gridClass = column
        ? `${baseGrid} lg:grid-cols-7`
        : `${baseGrid} lg:grid-cols-5`;
    return (
        <LightGallery
            speed={500}
            plugins={[lgZoom, lgThumbnail]}
            elementClassNames={`${gridClass}`}
        >
            {images.map((img, index) => (
                <a
                    key={index}
                    href={img}
                    className={`relative w-full ${aspectRatio || "aspect-[210/120]"} block`}
                >
                    <Image
                        src={img}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                    />
                </a>
            ))}
        </LightGallery>
    );
}
