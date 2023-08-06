import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import quizRouter from "./route/quiz.js";
import authRouter from "./route/auth.js"
import adminRouter from "./route/admin.js"
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/',(err)=>{
      cb(null, './uploads/');
   });
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("open", () => console.log("Connected to db"));

const corsOptions = {
  origin: "http://localhost:3000", // Adjust the origin to match your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/quiz", express.static(__dirname + "/uploads"));

app.use("/quiz", quizRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
