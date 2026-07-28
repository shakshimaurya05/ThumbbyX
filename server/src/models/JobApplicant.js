import mongoose from "mongoose";

const jobApplicantSchema = new mongoose.Schema({

  career: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Career", required: true },
    fullName: { type: String, required: true, trim: true },
  
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    trim: true
   },

  phone: { 
    type: String, 
    required: true, 
    trim: true },

  coverLetter: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  resumeUrl: { 
    type: String, 
    required: true 
  },

  resumePublicId: { 
    type: String, 
    required: true 
  },

  resumeName: { 
    type: String, 
    required: true 
  },

  status: { 
    type: String, 
    enum: ["New", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"], 
    default: "New" 
  },
}, { timestamps: true });

jobApplicantSchema.index({ career: 1, email: 1 }, { unique: true });

export default mongoose.model("JobApplicant", jobApplicantSchema);
