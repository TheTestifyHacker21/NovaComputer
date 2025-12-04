import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    admincode: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const adminModel = mongoose.model("Novaadmin", adminSchema, "Novaadmin");

export default adminModel;
