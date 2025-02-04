import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const getLeaderboard = async (req, res) => {
    try {
        const allUsers = await User.find({}, "name username profilePic xp")
            .sort({ xp: -1 }); // Sort all users to determine ranks


        const topUsers = allUsers.slice(0, 10).map((user, index) => ({
            ...user.toObject(),
            rank: index + 1, // Assign rank explicitly
        }));

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

                if (end - start < 5) {
                    // Adjust `start` or `end` to make up for the difference
                    if (start === 0) {
                        end = Math.min(allUsers.length, 5); // Pad below if at the top
                    } else if (end === allUsers.length) {
                        start = Math.max(0, allUsers.length - 5); // Pad above if at the bottom
                    } else {
                        // Dynamically adjust both `start` and `end` if in the middle
                        const extra = 5 - (end - start);
                        start = Math.max(0, start - Math.floor(extra / 2));
                        end = Math.min(allUsers.length, end + Math.ceil(extra / 2));
                    }
                }

                userRankData = allUsers.slice(start, end).map((user, index) => ({
                    ...user.toObject(),
                    rank: start + index + 1,
                }));
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