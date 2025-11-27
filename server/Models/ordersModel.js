import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    Useremail: { type: String, required: true },
    prodName: { type: String, required: true },
    OrderDate: { type: Date, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { versionKey: false }
);

const ordersModel = mongoose.model('orders', ordersSchema , 'orders');

export default ordersModel;
