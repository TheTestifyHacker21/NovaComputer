import mongoose from "mongoose";

// const db = "Sec-3_Fall-2425";
// mongoose.connect(
//   `mongodb+srv://studentUser:StU_123@cluster0.uqhgnwr.mongodb.net/${db}`
// );

const prodSchema = mongoose.Schema({
  category: {
    type: String,
    default: "Electronics",
  },
  pname: {
    type: String,
  },
  pinformation: {
    type: String,
  },
  pstock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  imgUrl: {
    type: String,
  },
  inStock: {
    type: Boolean, 
    default: true, 
    required: true, 
  },
},
{ versionKey: false });

const prodModel = mongoose.model("Novaproducts", prodSchema, "Novaproducts");
export default prodModel;
