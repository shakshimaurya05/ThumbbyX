import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const contractorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    profilePhoto: fileSchema,

    experienceYears: {
      type: Number,
      default: 0,
    },

    completedHouses: {
      type: Number,
      default: 0,
    },

    largestProjectSqFt: {
      type: Number,
      default: 0,
    },

    verification: {
      aadhaarNumber: {
        type: String,
        default: "",
      },

      aadhaarDocument: fileSchema,

      panNumber: {
        type: String,
        default: "",
      },

      panDocument: fileSchema,

      gstNumber: {
        type: String,
        default: "",
      },

      gstDocument: fileSchema,

      udyamNumber: {
        type: String,
        default: "",
      },

      udyamDocument: fileSchema,

      policeVerificationDocument:
        fileSchema,
    },

    banking: {
      accountHolderName: {
        type: String,
        default: "",
      },

      accountNumber: {
        type: String,
        default: "",
      },

      ifscCode: {
        type: String,
        default: "",
      },
    },

    verificationSubmitted: {
      type: Boolean,
      default: false,
    },

    verificationStatus: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "approved",
        "rejected",
      ],
      default: "pending",
    },
    onboardingStatus: {
  type: String,
  enum: [
    "profile_pending",
    "documents_pending",
    "submitted",
    "approved",
  ],
  default: "profile_pending",
},

    profileCompletionPercentage: {
      type: Number,
      default: 0,
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ContractorProfile = mongoose.model(
  "ContractorProfile",
  contractorProfileSchema
);

export default ContractorProfile;