import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: { type: String, required: false },
},
{ versionKey: false }

);

const UserModel = mongoose.model("Novausers", UserSchema, "Novausers");

export default UserModel;
