import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import quizRouter from "./route/quiz.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
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
app.use("/upload", express.static(__dirname + "/upload"));

app.use("/quiz", quizRouter);

app.listen(4000, () => {
  console.log(`app listening on port ${4000}`);
});
