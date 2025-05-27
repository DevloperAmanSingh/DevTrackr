import { Request, Response } from "express";
import { signupUser, loginUser } from "../services/auth.service"

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await signupUser(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
