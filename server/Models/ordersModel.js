import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    pid: { type: String, required: true },
    OrderDate: { type: Date, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

const ordersModel = mongoose.model('Novaorders', ordersSchema , 'Novaorders');

export default ordersModel;
