"use client";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { ImageDown, Trash2 } from "lucide-react";
function ImageCard({ image }: { image: IImage }) {
    return (
        <div className="h-full w-full max-w-sm  rounded-[20px] p-2 shadow-sm border border-gray-300 relative">
            <CldImage
                alt="image"
                src={image.publicId}
                width={image.width}
                height={image.height}
                {...image.config}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className=" w-full rounded-[10px] object-contain"
            />
            <div className="flex gap-2">
                <Button className="bg-blue-500/15 hover:bg-blue-500">
                    <ImageDown className="text-blue-500 hover:text-white" />
                </Button>
                <Button className="bg-rose-500/15 hover:bg-rose-500 group">
                    <Trash2 className="text-rose-500 group-hover:text-white" />
                </Button>
            </div>
        </div>
    );
}

export default ImageCard;
