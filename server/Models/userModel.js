import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: { type: String, required: false },
});

const UserModel = mongoose.model("users", UserSchema, "users");

export default UserModel;
