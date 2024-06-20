import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { WandSparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/Checkout";

async function Pricing() {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");
    const user = await getUserById(userId);

    return (
        <section className="container">
            <div className="my-5 text-center">
                <h2 className="font-semibold lg:text-5xl my-2">
                    Pricing Plans
                </h2>
                <p className="text-sm text-secondary-foreground font-medium">
                    Choose a credit package that suits for your need
                </p>
            </div>
            <div className="flex item-center justify-center gap-4">
                <div></div>
                {plans.map((plan, index) => (
                    <div
                        className="w-full max-w-xs rounded-lg shadow-md border border-gray-200"
                        key={index}
                    >
                        <div className="w-full flex items-center justify-center p-4 flex-col">
                            <div className="p-2 bg-blue-500/15 rounded-full">
                                <div className="p-2 rounded-full border shadow-sm bg-white">
                                    <WandSparkles className="text-blue-500" />
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center flex-col">
                                <h4 className="font-medium text-secondary-foreground text-md my-2 capitalize">
                                    {plan.name}
                                </h4>
                                <h2 className="font-semibold text-secondary-foreground text-4xl ">
                                    ₹{plan.price}
                                </h2>
                                <p className="text-gray-400 font-normal my-2">
                                    {plan.credits} Credits
                                </p>
                                {plan.name === "Free" ? (
                                    <Button
                                        className="text-blue-500 bg-blue-500/15"
                                        disabled
                                    >
                                        Free Consumable
                                    </Button>
                                ) : (
                                    <Checkout
                                        amount={plan.price}
                                        credits={plan.credits}
                                        plan={plan.name}
                                        buyerId={user._id}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Pricing;
