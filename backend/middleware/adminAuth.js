import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please login again." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.json({ success: false, message: "Not authorized as admin" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Not authorized. Please login again." });
    }
};

export default adminAuth;
