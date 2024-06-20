declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string;
};

declare type UpdateUserParams = {
    firstName: string | null;
    lastName: string | null;
    username: string;
    avatar: string;
};

declare type AddImageParams = {
    image: {
        publicId: string;
        width: number;
        height: number;
        config: any;
        secureURL: string;
        transformationURL: string;
    };
    userId: string;
    path: string;
};

declare type IImage = {
    publicId: string;
    secureURL: string;
    width: number;
    height: number;
    config: object;
    transformationUrl: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
};

// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
};

declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
};
