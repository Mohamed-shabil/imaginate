"use client";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { ImageDown, Plus } from "lucide-react";
import { dataUrl, download } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { useState } from "react";
import { Button } from "./ui/button";
import { addImage } from "@/lib/actions/image.actions";
import { redirect } from "next/navigation";
import { updateCredits } from "@/lib/actions/user.actions";
import { creditFee } from "@/constants";
import AlertModal from "./AlertModal";

function MediaUploader({
    userId,
    creditBalance,
}: {
    userId: string;
    creditBalance: number;
}) {
    const { toast } = useToast();

    if (!userId) redirect("/sign-in");
    const [image, setImage] = useState<any>(null);
    const [newImage, setNewImage] = useState<any>(null);
    const [transformationConfig, setTransformationConfig] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const downloadHandler = () => {
        download(
            getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig,
            })
        );
    };
    const onUploadSuccessHandler = async (result: any) => {
        setImage(result);
        console.log(result);
        const transformationURL = getCldImageUrl({
            width: result?.info?.width,
            height: result?.info?.height,
            src: result?.info?.public_id,
            removeBackground: true,
        });
        const imageData = {
            publicId: result?.info?.public_id,
            secureURL: result?.info?.secure_url,
            width: result?.info?.width,
            height: result?.info?.height,
            config: { removeBackground: true },
            transformationURL,
        };
        setTransformationConfig({
            width: result?.info?.width,
            height: result?.info?.height,
            src: result?.info?.public_id,
            removeBackground: true,
        });
        setNewImage(transformationURL);

        try {
            await addImage({ image: imageData, userId: userId, path: "/" });
            await updateCredits(userId, creditFee);
            toast({
                title: "Image uploaded successfully",
                description: "1 credit was deducted from your account",
                duration: 5000,
                className: "bg-green-500/15",
            });
        } catch (error) {
            console.log(error);
        }
    };
    const onUploadErrorHandler = () => {
        toast({
            title: "Something went wront while uploading",
            description: "Please try again",
            duration: 5000,
            className: "error-toast",
        });
    };
    return (
        <CldUploadWidget
            uploadPreset="jsm_imaginate"
            options={{ multiple: false, resourceType: "image" }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    {image && transformationConfig && (
                        <div className="flex w-full flex-row justify-center gap-8">
                            <div className="shadow-lg p-2 border border-gray-200 rounded-md">
                                <h3 className="font-semibold text-xl">
                                    Original
                                </h3>
                                <Image
                                    alt="image"
                                    src={image?.info?.url}
                                    width={500}
                                    height={500}
                                    className="max-w-md object-cover rounded-sm"
                                />
                            </div>
                            <div className="shadow-lg p-2 border border-gray-200 rounded-md ">
                                <h3 className="font-semibold text-xl">
                                    Transformed
                                </h3>
                                <div className="relative">
                                    <CldImage
                                        width={image?.info?.width}
                                        height={image?.info?.height}
                                        alt="Image"
                                        src={image?.info?.public_id}
                                        // sizes={"(max-width:767px) 100vw, 50vw"}
                                        placeholder={
                                            dataUrl as PlaceholderValue
                                        }
                                        className="max-w-md object-cover rounded-sm"
                                        {...transformationConfig}
                                    />
                                    <Button
                                        className="absolute bottom-2 left-2 bg-blue-500/15 hover:bg-blue-500/"
                                        onClick={downloadHandler}
                                    >
                                        <ImageDown className="text-blue-500" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <AlertModal open={openModal} setOpen={setOpenModal} />
                    <div
                        className="w-full h-[20vh] flex flex-col items-center"
                        onClick={() => {
                            if (creditBalance <= 0) {
                                setOpenModal(true);
                            } else {
                                open();
                            }
                        }}
                    >
                        <div className="flex items-center h-full w-full justify-center flex-col p-4 border border-dashed border-gray-300  max-w-md rounded-lg">
                            <Button className="bg-blue-500/15">
                                <Plus className="text-blue-500" />
                            </Button>
                            <p className="text-sm mt-2">
                                {" "}
                                Click here to upload image
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </CldUploadWidget>
    );
}

export default MediaUploader;
