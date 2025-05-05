// import contentModel from "../models/contentModel.js";

// export const getFeeds = async (req, res) => {
//     try {
//         const feeds = await contentModel.find();
//         res.json({ success: true, feeds });
//     } catch (error) {
//         res.json({ success: false, message: "Error fetching feeds" });
//     }
// };

// export const saveContent = async (req, res) => {
//     const { userId, contentId } = req.body;
//     try {
//         const content = await contentModel.findById(contentId);
//         content.savedBy.push(userId);
//         await content.save();

//         res.json({ success: true, message: "Content saved" });
//     } catch (error) {
//         res.json({ success: false, message: "Error saving content" });
//     }
// };

// export const reportContent = async (req, res) => {
//     const { contentId } = req.body;
//     try {
//         await contentModel.findByIdAndUpdate(contentId, { reported: true });
//         res.json({ success: true, message: "Content reported" });
//     } catch (error) {
//         res.json({ success: false, message: "Error reporting content" });
//     }
// }; 

import { fetchRedditPosts } from "../reddit-fetch.js";

export const getFeeds = async (req, res) => {
    try {
        const feeds = await fetchRedditPosts();
        res.json({ success: true, feeds });
    } catch (error) {
        res.json({ success: false, message: "Error fetching feeds", error: error.message });
    }
};