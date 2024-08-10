import jwt from "jsonwebtoken";

const generateJWT = (userData) => {
    try {
        const token = jwt.sign(userData, process.env.SIGN_TOKEN);
        return token;
    } catch (error) {
        console.log("Error generating JWT:", error.message);
    }
}
export default generateJWT;