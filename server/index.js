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
        const user = await UserModel.findOne({email:req.body.email});
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




myApp.get("/unsetpcode", async (req, res) => {
  try {
    const products = await prodModel.updateMany({}, { $unset: { pcode: "" } });
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});




myApp.get("/allusers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});



myApp.get("/alladmin", async (req, res) => {
  try {
    const users = await adminModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});





myApp.post("/adminlogin",async(req,res)=>{
    try{
        const admin = await adminModel.findOne({adminemail:req.body.adminemail});
        if(!admin)
            res.status(500).json({message:"Admin not found"});
        else{
            const pass_valid = await bcrypt.compare(req.body.password , admin.password);
            if(pass_valid)
                res.status(200).json({admin:admin,message:"success"});
            else
                res.status(401).json({message:"Unauthorized admin"});
        }
    }
    catch(error)
    {
        res.send({message:"An error occurred" , theerror:error});
    }
});






myApp.post("/adminregister",async(req,res)=>{
    try{
        const user=await adminModel.findOne({adminemail:req.body.adminemail});
        if(user)
            res.status(401).json({message:"admin already exists"});
        else{
            const hpass = await bcrypt.hash(req.body.password,10);
            const newuser = new adminModel({
                adminemail:req.body.adminemail,
                password:hpass,
            });
            await newuser.save();
            res.send({message:"Admin Registered.."});
        }
        
    }
    catch(error){
       res.send({message:"An error occurred" , theerror:error});
    }
});










myApp.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await prodModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully!", product: updatedProduct  });

  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
});



myApp.post("/addProduct", async (req, res) => {
  try {

    const newProduct = new prodModel({
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
      console.log(`Product updated:`);
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




myApp.listen(4040, () => {
  console.log("Server started at 4040.. ✅✅");
});




