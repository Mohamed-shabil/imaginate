"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Image from "../database/models/images.model";

export async function addImage({ image, userId, path }: AddImageParams) {
    try {
        await connectToDatabase();

        const author = await User.findOne({ clerkId: userId });

        if (!author) {
            throw new Error("User not found");
        }

        const newImage = await Image.create({
            ...image,
            author: author._id,
        });

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error);
    }
}

export async function getUserImages(userId: string) {
    try {
        await connectToDatabase();
        const author = await User.findOne({ clerkId: userId });
        if (!author) {
            throw new Error("User not found");
        }
        const images = await Image.find({ author: author._id });

        return JSON.parse(JSON.stringify(images));
    } catch (error) {
        handleError(error);
    }
}
