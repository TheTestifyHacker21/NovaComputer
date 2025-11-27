import express from "express";
import cors from "cors";
import mongoose from "mongoose";


import adminModel from "./Models/adminModel.js";
import ordersModel from "./Models/ordersModel.js";
import prodModel from "./Models/productModel.js";
import UserModel from "./Models/userModel.js";

import bcrypt from "bcrypt";

const myDB = "NovaComputers";

mongoose.connect(
  "mongodb+srv://admin:admin1234@cluster.0jpgmx8.mongodb.net/NovaComputers?retryWrites=true&w=majority&appName=Cluster"
);

let myApp = express();
myApp.use(cors());
myApp.use(express.json());



myApp.post("/login",async(req,res)=>{
    try{
        const user=await UserModel.findOne({email:req.body.email});
        if(!user)
            res.status(500).json({message:"User not found"});
        else{
            const pass_valid = await bcrypt.compare(req.body.password,user.password);
            if(pass_valid)
                res.status(200).json({user:user,message:"success"});
            else
                res.status(401).json({message:"Unauthorized user"});
        }
    }
    catch(error)
    {
        res.send({message:"An error occurred"});
    }
});




myApp.post("/register",async(req,res)=>{
    try{
        const user=await UserModel.findOne({email:req.body.email});
        if(user)
            res.status(401).json({message:"User already exists"});
        else{
            const hpass = await bcrypt.hash(req.body.password,10);
            const newuser = new UserModel({
                uname:req.body.uname,
                email:req.body.email,
                password:hpass,
                profilepic:req.body.profilepic
            });
            await newuser.save();
            res.send({message:"User Registered.."});
        }
        
    }
    catch(error){
       res.send({message:"An error occurred"});
    }
});






myApp.get("/products", async (req, res) => {
  try {
    const products = await prodModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});



myApp.get("/products/:pcode", async (req, res) => {
  try {
    const pcode = req.params.pcode;
    const product = await prodModel.findOne({ pcode: Number(pcode) });
    if (!product) {
      return res.status(500).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
});



myApp.post("/addProduct", async (req, res) => {
  try {

    const newProduct = new prodModel({
      pcode: req.body.pcode,
      category: req.body.category,
      pname: req.body.pname,
      pinformation: req.body.pinformation,
      pstock: req.body.pstock,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      inStock: req.body.inStock, 
    });

    await newProduct.save();

    console.log(`New product Added ${newProduct}`);
    res.send({message:"Product Saved.. ✅✅"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again" });
  }
});



myApp.delete("/product/:pcode", async (req, res) => {
  try {
    const pcode = req.params.pcode;
    const deletedProduct = await prodModel.findOneAndDelete({
      pcode: Number(pcode),
    });
    if (deletedProduct) {
      console.log(`Product deleted ${deletedProduct}`);
      res
        .status(200)
        .json({ message: "Product deleted successfully"});
    } else {
      res.status(404).json({ message: "Product not Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error, Pleas try again" });
  }
});



myApp.put("/productUpdate/:pcode", async (req, res) => {
  try {
    const pcode = req.params.pcode;
    const updateData = req.body;

    const updatedProduct = await prodModel.findOneAndUpdate(
        pcode,
        updateData,
        { new: true }
    );

    if (updatedProduct) {
      console.log(`Product updated: ${JSON.stringify(updatedProduct)}`);
      res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});



myApp.get("/orders/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const orders = await ordersModel.find({ user: user });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "orders not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again" });
  }
});




myApp.get("/username/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const username = await UserModel.findOne({ username: user });
    if (username) {
      res.json(username);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again" });
  }
});



myApp.post("/basket/add", async (req, res) => {
  try {
    const item = new basketModel(req.body);
    await item.save();
    res.status(201).json({ message: "Product added to basket successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to basket" });
  }
});


myApp.get("/basket", async (req, res) => {
  try {
    const basketItems = await basketModel.find();
    res.json(basketItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching basket items" });
  }
});



myApp.delete("/basket/delete/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    await basketModel.findByIdAndDelete(itemId);
    res.status(200).json({ message: "Basket item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting basket item" });
  }
});



myApp.put("/basket/update/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    await basketModel.findByIdAndUpdate(itemId, { quantity });
    res
      .status(200)
      .json({ message: "Basket item quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating basket item quantity" });
  }
});



myApp.post("/checkout", async (req, res) => {
  try {
    const payment = new checkoutModel(req.body);
    await payment.save();

    const { userId, items } = req.body;

    const basketItems = await basketModel.find({ userId: userId });

    const orders = await Promise.all(
      basketItems.map(async (basketItem) => {
        const product = await prodModel.findOne({
          prodId: basketItem.productId,
        });
        return {
          user: userId,
          orderId: Math.floor(Math.random() * 10000),
          prodName: product.prodName,
          date: new Date(),
          price: product.price,
          amount: basketItem.quantity,
        };
      })
    );

    await ordersModel.insertMany(orders);

    await basketModel.deleteMany({ userId: userId });

    res.status(201).json({ message: "Payment successful and order saved" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing payment and saving order" });
  }
});



myApp.post("/signup", async (req, res) => {
  const { username, password, email, address } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new UserModel({ username, password, email, address });
    await newUser.save();
    res.status(201).json({ message: "User  created successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});



myApp.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User  not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



myApp.post("/loginAdmin", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt for admin:", { username, password });
  try {
    const user = await adminModel.findOne({ username });
    console.log("Admin user found:", user);
    if (!user) {
      return res.status(400).json({ message: "admin  not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



myApp.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email  not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
});



myApp.put("/userProfile/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedInfo = await UserModel.findOneAndUpdate(
      { username: String(user) },
      updateData,
      { new: true }
    );

    if (updatedInfo) {
      console.log(`Info updated: ${JSON.stringify(updatedInfo)}`);
      res
        .status(200)
        .json({ message: "Info updated successfully", updatedInfo });
    } else {
      res.status(404).json({ message: "Info not found" });
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});



myApp.delete("/userProfile/:order", async (req, res) => {
  try {
    const { order } = req.params;
    const deletedOrder = await ordersModel.findOneAndDelete({
      orderId: Number(order),
    });
    if (deletedOrder) {
      console.log(`order deleted ${deletedOrder}`);
      res
        .status(200)
        .json({ message: "Order deleted successfully", deletedOrder });
    } else {
      res.status(404).json({ message: "Order not Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error, Pleas try again" });
  }
});



myApp.listen(4030, () => {
  console.log("Server started at 5000.. ✅✅");
});
