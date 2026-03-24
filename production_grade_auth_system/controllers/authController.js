import bcrypt from 'bcrypt';
import { db } from "../configs/db.js";
import { users } from "../schemas/user.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.insert(users).values({
      email: email,
      name: name,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while signup",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "fill up credentials",
    });
  }

  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    const user = result[0];

    const match = bcrypt.compare(user.password, password);

    if (!match) {
      return res.status(403).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return res.staus(200).json({
      message: "user login successfull",
      token
    });
  } catch (error) {
    if (!match) {
      return res.status(403).json({
        message: "invalid password",
      });
    }
  }
};
