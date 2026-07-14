import mongoose from "mongoose";

const projectSchema =
  new mongoose.Schema(
    {
      leadId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Lead",
      },

      contractorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "ContractorProfile",
      },
contractorName: {
  type: String,
},

contractorPhone: {
  type: String,
},

projectName: {
  type: String,
},

expectedDuration: {
  type: String,
},

startDate: {
  type: Date,
},
      customerId: {
  type:
    mongoose.Schema.Types.ObjectId,
  ref: "User",
},
      customerName: {
        type: String,
      },

      customerPhone: {
        type: String,
      },

      customerEmail: {
        type: String,
      },

      city: {
        type: String,
      },

      projectType: {
        type: String,
      },

      plotArea: {
        type: Number,
      },

      budget: {
        type: String,
      },
      contractorEarnings: [
  {
    milestoneName: { type: String },
    amount: { type: Number },
    status: { type: String, enum: ["processing", "paid"], default: "processing" },
    customerPaidDate: { type: String },
    contractorPaidDate: { type: String, default: null },
    contractorUtr: { type: String, default: null },
    adminNote:     { type: String, default: "" },
commissionAmt: { type: Number, default: 0 },
commissionPct: { type: Number, default: 0 },
payableAmt:    { type: Number, default: 0 },
  }
],
milestones: [
  {
    name: { type: String },
    pct: { type: Number },
    status: { type: String, enum: ["upcoming", "due", "paid"], default: "upcoming" },
    date: { type: String },
    utr: { type: String, default: null },
    submittedUtr: { type: String, default: null },
  }
],
      totalProjectCost: {
        type: Number,
        min: 0,
        default: 0,
      },

      message: {
        type: String,
      },

      status: {
        type: String,
        enum: [
          "planning",
          "in_progress",
          "completed",
          "paused",
        ],
        default: "planning",
      },

      progressPercentage: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Project",
  projectSchema
);
