"use client";

import GlassWrapper from "@/components/molecules/GlassWrapper";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface UspItem {
    title: string;
    description: string;
    icon: string;
    icon_url?: string;
}



export default function UspSlider({ uspData }: { uspData: UspItem[] }) {
    const [items, setItems] = useState<UspItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // console.log(uspData);
    // Duplicate the data for seamless loop
    useEffect(() => {
        setItems([...uspData, ...uspData, ...uspData]);
    }, []);

    // Auto-play animation
    useEffect(() => {
        if (items.length === 0) return;
        const totalWidth = containerRef.current?.scrollWidth ?? 0;
        const speed = 50; // px/sec
        const controls = animate(x, -totalWidth / 3, {
            ease: "linear",
            duration: totalWidth / (3 * speed),
            repeat: Infinity,
        });
        return () => controls.stop();
    }, [items, x]);

    return (
        <section className="usp__slider w-full px-4 mt-8">
            <h1 className="text-lg md:text-xl font-semibold mb-4">
                Top 10 Trending Games
            </h1>

            <div className="relative w-full overflow-hidden">
                <motion.div
                    ref={containerRef}
                    className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -((containerRef.current?.scrollWidth ?? 0) / 3), right: 0 }}
                    dragElastic={0.1}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                        // style={{
                        //     background: "rgba(255, 255, 255, 0.15)",
                        //     backdropFilter: "blur(8px)",
                        // }}
                        // whileHover={{ scale: 1.05 }}
                        >
                            <GlassWrapper
                                className="flex-shrink-0 w-[220px] md:w-[260px] lg:w-[280px] py-4 px-5 flex items-center gap-3 rounded-2xl"

                            >
                                <Image
                                    src={item.icon_url || "/assets/images/fallback.png"}
                                    alt={item.title}
                                    width={66}
                                    height={66}
                                    className="rounded-full"
                                />
                                <div className="content">
                                    <strong className="text-sm font-bold block mb-1">
                                        {item.title}
                                    </strong>
                                    <p className="text-xs opacity-80">{item.description}</p>
                                </div>
                            </GlassWrapper>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Optional gradient fade edges for nice look */}
                <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[#11011E] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[#11011E] to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
