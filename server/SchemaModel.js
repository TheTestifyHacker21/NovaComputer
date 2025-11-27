import mongoose from 'mongoose';

const myDB = 'NovaComputers';

mongoose.connect(`mongodb+srv://admin:1234@cluster.0jpgmx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster${myDB}`);

const prodSchema = mongoose.Schema({
    prodId: {type: Number, required:true},
    prodName: {type: String, required:true},
    category: {type: String, required:true},
    specs: {type: String, required:true},
    price: {type: Number, required:true},
    imgUrl: {type: String, required:true}
},
{versionKey:false}
);

const ordersSchema = mongoose.Schema({
    user: {type: String, required:true},
    orderId: {type: Number, required:true},
    prodName: {type: String, required:true},
    date: {type: Date, required:true},
    price: {type: Number, required:true},
    amount: {type: Number, required:true}
},
{versionKey:false});

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true }
}, { versionKey: false });

const adminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false });

const basketSchema = mongoose.Schema({
    userId: { type: String, required: true },
    productName:{type: String},
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true }
}, { versionKey: false });

const checkoutSchema = mongoose.Schema({
    name: {type: String,required: true},
    cardNum: { type: String, required: true },
    expDate: { type: String, required: true },
    user: { type: String },
}, { versionKey: false });


const prodModel = mongoose.model('products', prodSchema);

const ordersModel = mongoose.model('orders', ordersSchema);

const UserModel = mongoose.model('users', userSchema);

const adminModel = mongoose.model('admin', adminSchema);

const basketModel = mongoose.model('basket', basketSchema);

const checkoutModel = mongoose.model('payments', checkoutSchema);

export {prodModel, ordersModel, UserModel, basketModel, adminModel, checkoutModel,myDB}