import contentModel from "../models/contentModel.js";
import userModel from "../models/userModel.js";

export const getReports = async (req, res) => {
    try {
        const reports = await contentModel.find({ reported: true });
        res.json({ success: true, reports });
    } catch (error) {
        res.json({ success: false, message: "Error fetching reports" });
    }
};

export const manageUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: "Error fetching users" });
    }
};

export const getStats = async (req, res) => {
    try {
        const topSavedContent = await contentModel.find().sort({ savedBy: -1 }).limit(5);
        const mostActiveUsers = await userModel.find().sort({ credits: -1 }).limit(5);

        res.json({ success: true, stats: { topSavedContent, mostActiveUsers } });
    } catch (error) {
        res.json({ success: false, message: "Error fetching stats" });
    }
};