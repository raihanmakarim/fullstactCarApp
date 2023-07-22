import Cars from "../models/car.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const getCars = async (req, res) => {
  try {
    const cars = await Cars.findAll();
    res.json(cars);
  } catch (error) {
    console.log(error);
  }
};

export const createCar = async (req, res) => {
  if (!req.files.car_picture) {
    return res.status(422).json({ msg: "No image provided" });
  }

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
    const fileName = car_picture.md5 + ext;
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

      try {
        await Cars.create({
          id: uuidv4(),
          user_id: user_id,
          car_name,
          promotion_end_date,
          description,
          price,
          address,
          mileage,
          car_picture: url,
        });

        res.status(201).json({ msg: "Car created successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Failed to create car" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while creating the car" });
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
  console.log(req.files);
  if (req.files === null) {
    fileName = car.car_image;
  } else {
    const car_picture = req.files.car_picture;

    const fileSize = car_picture.data.length;
    const ext = path.extname(car_picture.name);
    fileName = car_picture.md5 + ext;
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
        car_picture: url,
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

export const deleteCar = async (req, res) => {
  const product = await Cars.findCarById({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
    await Cars.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Cars Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
