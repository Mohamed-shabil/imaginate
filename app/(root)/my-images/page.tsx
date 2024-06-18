import ImageCard from "@/components/ImageCard";
import { getUserImages } from "@/lib/actions/image.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MyImages() {
    const { userId } = auth();
    if (!userId) redirect("/sign-up");
    const images = (await getUserImages(userId)) as IImage[];
    return (
        <section className="container">
            <h2 className="font-semibold text-2xl my-10 ">My Images</h2>
            <div className="flex items-center gap-5 flex-wrap">
                {images.map((image) => (
                    <ImageCard image={image} />
                ))}
            </div>
        </section>
    );
}
