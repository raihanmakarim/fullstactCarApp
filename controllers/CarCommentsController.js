// carCommentController.js

import { CarComment } from "../models/carComment.js";
import { Cars } from "../models/car.js";

export const getCarComments = async (req, res) => {
  const { carId } = req.params;

  try {
    const carComments = await CarComment.findAll({
      where: { car_id: carId },
      attributes: ["id", "car_id", "user_id", "text", "createdat"],
    });

    res.json(carComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching car comments",
    });
  }
};

export const addCarComment = async (req, res) => {
  const { carId } = req.params;
  const { user_id, text } = req.body;

  try {
    const car = await Cars.findByPk(carId);
    if (!car) {
      return res.status(404).json({
        error: "Car not found",
      });
    }

    const newComment = await CarComment.create({
      car_id: carId,
      user_id,
      text,
    });

    res.status(201).json({
      message: "Car comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the car comment",
    });
  }
};

export const updateCarComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await CarComment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({
        error: "Car comment not found",
      });
    }

    await CarComment.update({ text }, { where: { id: commentId } });

    res.json({
      message: "Car comment updated successfully",
      comment: { ...comment, text },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the car comment",
    });
  }
};

export const deleteCarComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await CarComment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({
        error: "Car comment not found",
      });
    }

    await comment.destroy();

    res.json({
      message: "Car comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the car comment",
    });
  }
};
