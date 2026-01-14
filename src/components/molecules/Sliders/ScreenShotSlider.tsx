"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScreenShotSliderProps {
    screenshots: string[];
    className?: string;
    speed?: number; // px per second
}

export default function ScreenShotSlider({
    screenshots,
    className = "",
    speed = 50,
}: ScreenShotSliderProps) {
    const [images, setImages] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (screenshots.length === 0) return;
        // Triple the array for seamless infinite scroll
        setImages([...screenshots, ...screenshots, ...screenshots]);
    }, [screenshots]);

    if (images.length === 0) return null;

    const itemWidth = 220; // 212px width + 8px margin
    const totalWidth = screenshots.length * itemWidth;
    const duration = totalWidth / speed;

    return (
        <div
            ref={containerRef}
            className={`relative w-full mx-auto overflow-hidden ${className}`}
            style={{ height: "120px" }}
        >
            <motion.div
                className="flex"
                style={{
                    width: `${images.length * itemWidth}px`,
                }}
                initial={{ x: 0 }}
                animate={{
                    x: -totalWidth
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        duration: duration,
                    },
                }}
            >
                {images.map((src, index) => (
                    <motion.div
                        key={`${index}-${src}`}
                        className="flex-shrink-0"
                        style={{
                            width: "212px",
                            height: "120px",
                            marginRight: "8px"
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img
                            src={src}
                            alt={`Screenshot ${(index % screenshots.length) + 1}`}
                            className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                            draggable={false}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.src = "/assets/images/fallback.png";
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Optional gradient overlays for smooth edges */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#11011E] to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#11011E] to-transparent pointer-events-none z-10" />

        </div>
    );
}