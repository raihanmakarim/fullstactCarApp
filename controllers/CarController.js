import Cars from "../models/car.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import NodeCache from "node-cache";
import { Op } from "sequelize";
import CarComment from "../models/carComment.js";
import Sequelize from "sequelize";

const cache = new NodeCache({ stdTTL: 2 });

export const getCars = async (req, res) => {
  try {
    const { page, pageSize, search, minPrice, maxPrice } = req.query;
    const offset = (page - 1) * pageSize;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { car_name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { address: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    if (minPrice && maxPrice) {
      whereClause = {
        ...whereClause,
        price: {
          [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
        },
      };
    }

    const cacheKey = `getCars:${page}:${pageSize}:${search}:${minPrice}:${maxPrice}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.json(cachedData);
    } else {
      const cars = await Cars.findAll({
        where: whereClause,
        attributes: [
          "id",
          "user_id",
          "car_name",
          "promotion_end_date",
          "description",
          "price",
          "address",
          "mileage",
          "car_picture",
          "promotion_status",
        ],
        order: [
          [Sequelize.literal("promotion_status DESC")],
          ["promotion_end_date", "DESC"],
        ],
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });

      cache.set(cacheKey, cars);
      res.json(cars);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const createCar = async (req, res) => {
  if (!req.files) {
    return res.status(422).json({ msg: "No image provided" });
  }

  const id = uuidv4();

  const {
    user_id,
    car_name,
    promotion_end_date,
    description,
    price,
    address,
    mileage,
  } = req.body;
  const car_picture = req.files.car_picture;

  try {
    const fileSize = car_picture.data.lengt;
    const ext = path.extname(car_picture.name);
    const fileName = car_picture.md5 + id + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid image format" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    car_picture.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Failed to upload image" });
      }
      const currentDate = new Date();
      const promoStatus = new Date(promotion_end_date) > currentDate;
      try {
        await Cars.create({
          id: id,
          user_id: user_id,
          car_name,
          promotion_end_date,
          description,
          price,
          address,
          mileage,
          car_picture: url,
          promotion_status: promoStatus,
        });

        res.status(201).json({ msg: "Car created successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: `Failed to create car ${error.message}` });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: `An error occurred while creating the car ${error.message}`,
    });
  }
};

export const updateCar = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const {
    user_id,
    car_name,
    promotion_end_date,
    description,
    price,
    address,
    mileage,
  } = req.body;

  const car = await Cars.findByPk(id);
  if (!car) {
    return res.status(404).json({ msg: "Car not found" });
  }

  let fileName = "";
  if (req.files === null) {
    fileName = car.car_image;
  } else {
    const car_picture = req.files.car_picture;

    const fileSize = car_picture.data.length;
    const ext = path.extname(car_picture.name);
    fileName = car_picture.md5 + id + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid image format" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    car_picture.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Failed to upload image" });
      }
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Cars.update(
      {
        user_id: user_id,
        car_name: car_name,
        promotion_end_date: promotion_end_date,
        description: description,
        price: price,
        address: address,
        mileage: mileage,
        car_picture: req.files ? url : fileName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: "Car updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while updating the car" });
  }
};

export const findCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Cars.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while finding the car" });
  }
};

export const findCarByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await Cars.findAll({
      where: {
        user_id: id,
      },
    });

    if (!id) {
      return res.status(404).json({ message: "USER not found" });
    }

    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while finding the cars" });
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;

  const product = await Cars.findByPk(id);
  const fullUrl = product.dataValues.car_picture;
  const filename = fullUrl.substring(fullUrl.lastIndexOf("/") + 1);
  console.log(filename); // Output: 821e5f5aed06510b032c09a19d1ce444.png

  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${filename}`;
    await CarComment.destroy({
      where: { car_id: req.params.id },
    });
    await Cars.destroy({
      where: {
        id: req.params.id,
      },
    });
    fs.unlinkSync(filepath);

    res.status(200).json({ msg: "Cars Deleted Successfuly" });
    console.log("Cars Deleted Successfuly");
  } catch (error) {
    console.log(error.message);
  }
};

export const getPromoCars = async (req, res) => {
  try {
    const promoCars = await Cars.findAll({
      where: {
        promotion_status: true,
      },
    });

    res.json(promoCars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching promo cars" });
  }
};
