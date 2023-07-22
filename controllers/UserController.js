import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "phone"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, phone, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({
      error: "Password doesn't match",
    });
  }

  if (!password) {
    console.log("no password");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await Users.create({
      name,
      email,
      phone,
      password: hashPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during registration",
    });
  }
};

export const Login = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ msg: "Invalid request body" });
  }
  const { phone, password } = req.body;
  console.log(req.body);

  try {
    if (!phone || !password) {
      return res.status(400).json({ msg: "Phone and password are required" });
    }

    const user = await Users.findAll({
      where: {
        phone: phone,
      },
    });

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const userId = user[0].id;
    const name = user[0].name;
    const userPhone = user[0].phone;

    const accessToken = jwt.sign(
      { userId, name, userPhone },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, userPhone },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);

  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
