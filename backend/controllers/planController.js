import asyncHandler from "express-async-handler";
import Plan from "../models/Plan/Plan.js";

export const createPlan = asyncHandler(async (req, res) => {
  const { planName, features, price, limitations } = req.body;
  //check if plan already exists
  const planExists = await Plan.findOne({ planName });
  if (planExists) {
    res.status(400);
    throw new Error("Plan already exists");
  }
  // check if total plans are two
  const planCount = await Plan.countDocuments();
  if (planCount >= 2) {
    res.status(400);
    throw new Error("Only two plans are allowed");
  }
  //create plan
  const plan = await Plan.create({
    planName,
    features,
    price,
    limitations,
    user: req.user,
  });
  res.json({
    status: "success",
    message: "Plan created successfully",
    plan,
  });
});

export const listPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({});
  res.json({
    status: "success",
    message: "Plans fetched successfully",
    plans,
  });
});

export const getPlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (plan) {
    res.json({
      status: "success",
      message: "Plan fetched successfully",
      plan,
    });
  } else {
    res.status(404);
    throw new Error("Plan not found");
  }
});

export const deletePlan = asyncHandler(async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Plan deleted successfully",
  });
});

export const updatePlan = asyncHandler(async (req, res) => {
  const planFound = await Plan.findById(req.params.id);
  if (!planFound) {
    res.status(404);
    throw new Error("Plan not found");
  }
  //update plan
  const plan = await Plan.findByIdAndUpdate(
    req.params.id,
    {
      planName: req.body.planName,
      features: req.body.features,
      price: req.body.price,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Plan updated successfully",
    plan,
  });
});
