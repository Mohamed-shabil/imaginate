import ImageCard from "@/components/ImageCard";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Coins, Image } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MyImages() {
    const { userId } = auth();
    if (!userId) redirect("/sign-up");
    const images = (await getUserImages(userId)) as IImage[];
    const user = await getUserById(userId);
    return (
        <section className="container h-[90vh]">
            <h2 className="font-semibold text-2xl my-10 ">
                Hi, {user.firstName}
            </h2>
            <div className="flex items-start justify-start flex-wrap gap-4 mb-14">
                <div className="border border-gray-200 w-56 p-4 rounded-md shadow-md">
                    <span className="flex items-center gap-4">
                        <Coins size={"2em"} className="text-blue-500" />{" "}
                        <h2 className="font-medium text-3xl">
                            {user.creditBalance}
                        </h2>
                    </span>
                    <p className="text-slate-600">Credits Available</p>
                </div>
                <div className="border border-gray-200 w-56 p-4 rounded-md shadow-md">
                    <span className="flex items-center gap-4">
                        <Image size={"2em"} className="text-blue-500" />{" "}
                        <h2 className="font-medium text-3xl">
                            {images.length}
                        </h2>
                    </span>
                    <p className="text-slate-600">Total Images</p>
                </div>
            </div>
            <hr />
            {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 h-[30vh] ">
                    <h2 className="font-semibold text-sm">
                        You dont have any images
                    </h2>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-start gap-3 ">
                    {images.map((image) => (
                        <ImageCard image={image} />
                    ))}
                </div>
            )}
        </section>
    );
}
