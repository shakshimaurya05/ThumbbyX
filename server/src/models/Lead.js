import mongoose from "mongoose";

const leadSchema =
  new mongoose.Schema(
    {
   contractorId: {
  type:
    mongoose.Schema.Types.ObjectId,
  ref: "ContractorProfile",
  default: null,
},
contractorName: {
  type: String,
},

contractorCity: {
  type: String,
},

      customerName: {
        type: String,
        required: true,
      },

      customerPhone: {
        type: String,
        required: true,
      },

      customerEmail: {
        type: String,
      },

      city: {
        type: String,
        required: true,
      },

      projectType: {
        type: String,
        required: true,
      },

      expectedStartTime: {
        type: String,
      },

      plotArea: {
        type: Number,
      },

      budget: {
        type: String,
      },

      message: {
        type: String,
      },

      status: {
        type: String,
        enum: [
  "new",
  "contacted",
  "assigned",
  "meeting_scheduled",
  "converted",
  "rejected",
],
        default: "new",
      },
leadType: {
  type: String,
  enum: [
    "general",
    "contractor_specific"
  ],
  default: "general"
},
      assignedProjectId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Project",
      },

      rejectionReason: {
        type: String,
      },

      meetingDate: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Lead",
  leadSchema
);