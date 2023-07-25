import Users from "../models/user.js";
import jwt from "jsonwebtoken";
import process from "process";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const name = user[0].name;
      const phone = user[0].phone;
      const accessToken = jwt.sign(
        { userId, name, phone },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "3d",
        }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
