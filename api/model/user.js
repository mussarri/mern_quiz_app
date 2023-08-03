import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: { type: String, default: Date.now },
});

const User = mongoose.model("User", UserScheme);

export default User;
