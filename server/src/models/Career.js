import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },

  department: { 
    type: String, 
    required: true, 
    trim: true 
  },

  employmentType: { 
    type: String, 
    required: true, 
    enum: ["Internship", "Full Time", "Part Time", "Contract", "Freelance"] 
  },

  workMode: { 
    type: String, 
    required: true, 
    enum: ["Remote", "Hybrid", "Onsite"] 
  },

  location: { 
    type: String, 
    required: true, 
    trim: true 
  },

  experience: { 
    type: String, 
    required: true, 
    trim: true 
  },

  salary: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  duration: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  openings: { 
    type: Number, 
    required: true, 
    min: 1 
  },

  skills: { 
    type: [String], 
    default: [] 
  },

  responsibilities: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  qualifications: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  description: { 
    type: String, 
    required: true, 
    trim: true 
  },

  status: { 
    type: String, 
    enum: ["Open", "Closed"], 
    default: "Open" 
  },

  lastDateToApply: { 
    type: Date, 
    default: null 
  },

  featured: { 
    type: Boolean, 
    default: false 
  },
  
}, { timestamps: true });

export default mongoose.model("Career", careerSchema);
