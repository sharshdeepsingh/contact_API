import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    res.status(400).json({ Message: "Login First!!!", Success: true });
  }
  const decodedToken = await jwt.verify(token, process.env.JWT);
  const id = decodedToken.userId;

  const user = await User.findById(id);

  if (!user) {
    return res.json({ Message: "user is not found", Success: false });
  }
  req.user = user;
  next();
};
