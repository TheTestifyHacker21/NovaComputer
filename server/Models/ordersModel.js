import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    OrderDate: { type: Date, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    productInfo: { type: [Object], required: true },
  },
  { versionKey: false }
);

const ordersModel = mongoose.model('Novauserorders', ordersSchema , 'Novauserorders');

export default ordersModel;
