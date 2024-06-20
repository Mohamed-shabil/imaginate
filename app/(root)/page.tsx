import Slider from "@/components/Slider";
import AnimatedGradientText from "@/components/ui/animationGradientText";
import RetroGrid from "@/components/ui/retro-grid";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import MediaUploader from "@/components/MediaUploader";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserById } from "@/lib/actions/user.actions";

export default async function Home() {
    const { userId } = auth();
    if (!userId) {
        return (
            <div className="flex items-center justify-center">
                <h2>Please Sign-in to continue</h2>
                <Link href={"/sign-in"}>
                    <Button>Sign-in</Button>
                </Link>
            </div>
        );
    }

    const user = await getUserById(userId);
    console.log(user);
    return (
        <section className="container">
            <div className="md:mt-20 mb-5 text-2xl sm:text-3xl md:text-6xl font-bold flex gap-6 flex-col items-center justify-center">
                <h2 className="text-center py-2 px-4 max-w-3xl">
                    Remove the background from images 100% automatically
                </h2>
                <AnimatedGradientText>
                    🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                        )}
                    >
                        Get Started
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
                <RetroGrid />
            </div>
            <div className="mb-5">
                <Slider />
            </div>
            <div className="h-[80vh] my-20">
                <div className="flex items-center justify-center my-10">
                    <h2 className="text-center py-2 px-4 max-w-3xl md:text-4xl font-semibold">
                        Transform your Images
                    </h2>
                </div>
                <MediaUploader
                    userId={userId}
                    creditBalance={user.creditBalance}
                />
            </div>
        </section>
    );
}
