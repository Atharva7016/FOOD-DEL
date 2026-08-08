import express from "express";
import multer from "multer"
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import adminAuth from "../middleware/adminAuth.js";

const foodRouter = express.Router();

//~ image storage engine:
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg"];
    const ext = file.originalname.toLowerCase();
    if (allowedTypes.includes(file.mimetype) && (ext.endsWith(".jpg") || ext.endsWith(".jpeg"))) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG or JPEG images are allowed"), false);
    }
}

const upload = multer({ storage, fileFilter });

foodRouter.post("/add", adminAuth, (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            return res.json({ success: false, message: err.message || "Only JPG or JPEG images are allowed" });
        }
        next();
    });
}, addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", adminAuth, removeFood)

export default foodRouter;