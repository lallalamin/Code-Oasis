import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import useShowToast from './useShowToast'
import userAtom from '../atoms/userAtom'

const useFollowUnfollow = (user) => {
    const currentUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
    const [updating, setUpdating] = useState(false);
    const showToast = useShowToast();

    const handleFollowUnfollow = async () => {
        if(!currentUser){
            showToast("Error", "Please login to follow/unfollow users", "error");
            return;
        }
        if(updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            
            if(data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            if(following) {
                showToast("Success", `Unfollowed ${user.name}`, "success");
                //user.followers.pop(); // simulate removing the user from the followers array
                user.followers = user.followers.filter(followerId => followerId !== currentUser?._id); // create a new array without the current user's ID
            } else {
                showToast("Success", `Followed ${user.name}`, "success");
                //user.followers.push(currentUser._id);
                user.followers = [...user.followers, currentUser._id];
            }
            
            setFollowing(!following);

            console.log(data);
        }
            
        catch (error) {
            showToast("Error", data.error, "error");
        }
        finally{
            setUpdating(false);
        }
    };

  return {handleFollowUnfollow, updating, following};
}

export default useFollowUnfollow