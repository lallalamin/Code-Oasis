import jwt from "jsonwebtoken";

const generateTokenAndsetCookie = (userId, res) => {
    const token = jwt.sign(
        {userId}, 
        process.env.JWT_SECRET, 
        {expiresIn: '15d'}
    );  //create jwt token, userId is the payload

    res.cookie("jwt", token, {
        httpOnly: true,     // This cookie cannot be accessed by the browser to make it more secure
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "strict", // CRSF
    });

    return token;
};

export default generateTokenAndsetCookie;