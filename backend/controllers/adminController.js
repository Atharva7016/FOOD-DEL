import jwt from "jsonwebtoken"

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@tomato.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }
        return res.json({ success: false, message: "Invalid admin credentials" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

export { adminLogin };
