import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, required: true }, // "earn" or "spend"
    amount: { type: Number, required: true },
    purpose: { type: String, required: true }, // e.g., "Watched Content"
    timestamp: { type: Date, default: Date.now },
});

const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);
export default transactionModel;