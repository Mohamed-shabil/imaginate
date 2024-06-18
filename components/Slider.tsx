"use client";
import Image from "next/image";
import { useState } from "react";

function Slider() {
    const [sliderPosition, setSliderPosition] = useState<number>(50);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!isDragging) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

        setSliderPosition(percent);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (
        <div
            className="w-full relative flex items-center justify-center"
            onMouseUp={handleMouseUp}
        >
            <div
                className="relative w-full max-w-4xl aspect-[80/45] overflow-hidden select-none rounded-xl"
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                <Image
                    alt="/demo.jpg"
                    className="object-cover bg-slate-600"
                    fill
                    draggable={false}
                    priority
                    src="/rm-demo.png"
                />

                <div
                    className="absolute top-0 left-0 right-0 w-full max-w-4xl aspect-[70/45]  overflow-hidden select-none rounded-xl"
                    style={{
                        clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                >
                    <Image
                        className="object-cover"
                        fill
                        priority
                        draggable={false}
                        alt=""
                        src="/demo.jpg"
                    />
                </div>
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                    style={{
                        left: `calc(${sliderPosition}% - 1px)`,
                    }}
                >
                    <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
                </div>
            </div>
        </div>
    );
}

export default Slider;
