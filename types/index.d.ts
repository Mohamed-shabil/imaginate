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

declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";

// ====== URL QUERY PARAMS
declare type FormUrlQueryParams = {
    searchParams: string;
    key: string;
    value: string | number | null;
};

declare type UrlQueryParams = {
    params: string;
    key: string;
    value: string | null;
};

declare type RemoveUrlQueryParams = {
    searchParams: string;
    keysToRemove: string[];
};

declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type TransformationFormProps = {
    action: "Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?: IImage | null;
    config?: Transformations | null;
};

declare type TransformedImageProps = {
    image: any;
    type: string;
    title: string;
    transformationConfig: Transformations | null;
    isTransforming: boolean;
    hasDownload?: boolean;
    setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};
