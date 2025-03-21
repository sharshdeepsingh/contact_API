import bcrypt from "bcryptjs";
import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken' 

// signin api 
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(500).json({ message: "Enter the details" });
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    return res
      .status(502)
      .json({ message: "User already exsists", Success: false });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashPassword });

  console.log(`printing the data: `, req.body);
  res
    .status(200)
    .json({ message: `User is crreated Successfully`, Success: true, newUser });
};

//login api
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "Enter the details" });
  }

  const searchUser = await User.findOne({ email });

  if (!searchUser) {
    return res
      .status(500)
      .json({ message: "username or password is incoorect" ,Success:false});
  }

  const matchPassword= await bcrypt.compare(password,searchUser.password)
  if(!matchPassword){
    return res.status(401).json({message:'Username or password is incorrect ',Success:false})
  }
  const token = jwt.sign({ user: searchUser },process.env.JWT,{
    expiresIn:"15d"
  });
  return res.status(200).json({Message:'User is logged in ', Success:true, name:searchUser.name,token,email:searchUser.eamil})
};
