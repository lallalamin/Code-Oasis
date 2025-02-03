import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const getLeaderboard = async (req, res) => {
    try {
        const topUsers = await User.find({}, "name username profilePic xp")
            .sort({ xp: -1 }) // Sort users by XP
            .limit(10); // Get top 10

        const allUsers = await User.find({}, "name username profilePic xp")
            .sort({ xp: -1 }); // Sort all users to determine ranks

        // Find current user's rank
        const currentUserId = req.user?._id; // Ensure authentication
        let userRankData = [];
        let currentUserRank = null;

        if (currentUserId) {
            const userIndex = allUsers.findIndex(user => user._id.toString() === currentUserId.toString());

            if (userIndex !== -1) {
                currentUserRank = userIndex + 1; // Convert 0-based index to rank

                let start = Math.max(0, userIndex - 2); // 2 above
                let end = Math.min(allUsers.length, userIndex + 3); // 2 below

                if (userIndex === 0) {
                    // If user is #1, show 4 below
                    start = 0;
                    end = Math.min(allUsers.length, 5);
                } else if (userIndex === allUsers.length - 1) {
                    // If user is last, show 4 above
                    start = Math.max(0, allUsers.length - 5);
                    end = allUsers.length;
                }

                userRankData = allUsers.slice(start, end);
            }
        }

        console.log("Current User Rank:", currentUserRank);
        console.log("User Rank Data:", userRankData);
        console.log("Top Users:", topUsers);   

        res.status(200).json({
            topUsers,
            userRankData,
            currentUserRank
        });

    } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
        res.status(500).json({ message: "Error fetching leaderboard" });
    }
};

export default {getLeaderboard};