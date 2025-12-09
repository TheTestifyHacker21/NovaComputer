import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    adminemail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const adminModel = mongoose.model("Novaalladmin", adminSchema, "Novaalladmin");

export default adminModel;
