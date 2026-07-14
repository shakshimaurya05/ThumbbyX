import mongoose from "mongoose";

const projectReviewSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
      unique: true,
    },
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractorProfile",
      required: [true, "Contractor is required"],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },
    customerName: {
      type: String,
      trim: true,
    },
    contractorName: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    reviewerRole: {
  type: String,
  enum: ["customer", "contractor"],
  default: "customer",
},
reviewerName: {
  type: String,
},
reviewerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
  },
  
  {
    timestamps: true,
  }
);

export default mongoose.model("ProjectReview", projectReviewSchema);
