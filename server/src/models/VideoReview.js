import mongoose from "mongoose";

const videoReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    youtube: {
      type: String,
      required: [true, "YouTube URL is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("VideoReview", videoReviewSchema);
