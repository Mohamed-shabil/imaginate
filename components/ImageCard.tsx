"use client";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { Button } from "./ui/button";
import { ImageDown, Trash2 } from "lucide-react";
import { download } from "@/lib/utils";
function ImageCard({ image }: { image: IImage }) {
    const downloadHandler = () => {
        download(
            getCldImageUrl({
                width: image.width,
                height: image.height,
                src: image.publicId,
                ...image.config,
            })
        );
    };
    return (
        <div className="h-full w-full max-w-sm  rounded-[20px] p-2 shadow-sm border border-gray-300 relative my-5">
            <CldImage
                alt="image"
                src={image.publicId}
                width={image.width}
                height={image.height}
                {...image.config}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="max-h-80 w-full rounded-[10px] object-contain"
            />
            <div className="flex gap-2">
                <Button
                    className="bg-blue-500/15 hover:bg-blue-500 group"
                    onClick={downloadHandler}
                >
                    <ImageDown className="text-blue-500 group-hover:text-white" />
                </Button>
            </div>
        </div>
    );
}

export default ImageCard;
