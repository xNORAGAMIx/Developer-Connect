import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      deafult: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    amount: {
      type: Number,
      default: 0,
    },
    // monthlyRequestCount: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);
export const Payment = mongoose.model("Payment", paymentSchema);
