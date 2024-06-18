import { Schema, model, models, InferSchemaType } from "mongoose";

const ImageSchema = new Schema({
    publicId: { type: String, required: true },
    secureURL: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
type Imagetype = InferSchemaType<typeof ImageSchema>;

const Image = models?.Image || model<Imagetype>("Image", ImageSchema);

export default Image;
