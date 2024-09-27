import jwt from "jsonwebtoken"

const generateTokenAndsetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });  //create jwt token, userId is the payload

    res.cookie("");
}

export default generateTokenAndsetCookie;