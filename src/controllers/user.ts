import UserModel from "../models/UserModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getAccessToken } from "../utils/getAccessToken";
import { json } from "stream/consumers";
dotenv.config();

const register = async (req: any, res: any) => {
  const body = req.body;
  const { email, name, password } = body;
  try {
    const user: any = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    body.password = hashpassword;

    const newUser: any = new UserModel(body);
    await newUser.save();
	
	delete newUser._doc.password;

    res.status(200).json({
      message: "Register successfully!",
      data: {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: newUser.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const login = async (req: any, res: any) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const user: any = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Account does not exists",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Login failed, please check your Email/Password and try again."
      })
    }

	  delete user._doc.password;

    res.status(200).json({
      message: "Login successfully!",
      data: {
        ...user._doc,
        token: await getAccessToken({
          _id: user._id,
          email: user.email,
          rule: user.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { register, login };
