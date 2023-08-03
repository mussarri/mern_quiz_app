import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  createdAt: { type: String, default: Date.now },
});

const User = mongoose.model("User", UserScheme);

export default User;
