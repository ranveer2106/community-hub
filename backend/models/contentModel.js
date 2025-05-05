import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    preview: { type: String, required: true },
    source: { type: String, required: true }, // e.g., "Reddit", "Twitter", "LinkedIn"
    url: { type: String, required: true },
    reported: { type: Boolean, default: false },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
}, { timestamps: true });

const contentModel = mongoose.models.content || mongoose.model("content", contentSchema);
export default contentModel;