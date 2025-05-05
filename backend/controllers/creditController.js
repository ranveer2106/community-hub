import transactionModel from "../models/transactionModel.js";
import userModel from "../models/userModel.js";

export const earnCredits = async (req, res) => {
    const { userId, amount, purpose } = req.body;
    try {
        const user = await userModel.findById(userId);
        user.credits += amount;
        await user.save();

        const transaction = new transactionModel({ userId, type: "earn", amount, purpose });
        await transaction.save();

        res.json({ success: true, message: "Credits earned", credits: user.credits });
    } catch (error) {
        res.json({ success: false, message: "Error earning credits" });
    }
};

export const spendCredits = async (req, res) => {
    const { userId, amount, purpose } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (user.credits < amount) return res.json({ success: false, message: "Insufficient credits" });

        user.credits -= amount;
        await user.save();

        const transaction = new transactionModel({ userId, type: "spend", amount, purpose });
        await transaction.save();

        res.json({ success: true, message: "Credits spent", credits: user.credits });
    } catch (error) {
        res.json({ success: false, message: "Error spending credits" });
    }
};

export const getTransactionHistory = async (req, res) => {
    const { userId } = req.body;
    try {
        const transactions = await transactionModel.find({ userId });
        res.json({ success: true, transactions });
    } catch (error) {
        res.json({ success: false, message: "Error fetching transactions" });
    }
};