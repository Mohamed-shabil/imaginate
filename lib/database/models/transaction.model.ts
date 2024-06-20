import { Schema, models, model, InferSchemaType } from "mongoose";
const TransactionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    plan: {
        type: String,
    },
    credits: {
        type: Number,
    },
    buyer: {
        types: Schema.Types.ObjectId,
    },
});
type TransactionType = InferSchemaType<typeof TransactionSchema>;

const Transaction =
    models?.Transaction ||
    model<TransactionType>("Transaction", TransactionSchema);

export default Transaction;
