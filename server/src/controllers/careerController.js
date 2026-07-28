import Career from "../models/Career.js";
import JobApplicant from "../models/JobApplicant.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/upload.js";
import { logActivity } from "../utils/activityLogger.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,20}$/;
const splitSkills = (value) => Array.isArray(value) ? value : String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
const jobPayload = (body) => ({
  title: body.title, department: body.department, employmentType: body.employmentType,
  workMode: body.workMode, location: body.location, experience: body.experience,
  salary: body.salary, duration: body.duration, openings: Number(body.openings),
  skills: splitSkills(body.skills), responsibilities: body.responsibilities,
  qualifications: body.qualifications, description: body.description, status: body.status,
  lastDateToApply: body.lastDateToApply || null,
  featured: body.featured === true || body.featured === "true",
});

export const getPublicCareers = async (req, res) => {
  try {
    const careers = await Career.find({ status: "Open", $or: [{ lastDateToApply: null }, { lastDateToApply: { $gte: new Date() } }] }).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, careers });
  } catch { res.status(500).json({ success: false, message: "Unable to load openings" }); }
};

export const getPublicCareer = async (req, res) => {
  try {
    const career = await Career.findOne({ _id: req.params.id, status: "Open" });
    if (!career) return res.status(404).json({ success: false, message: "Opening not found" });
    res.json({ success: true, career });
  } catch { res.status(400).json({ success: false, message: "Opening not found" }); }
};

export const applyToCareer = async (req, res) => {
  try {
    const { careerId, fullName, email, phone, coverLetter } = req.body;
    if (!careerId || !fullName?.trim() || !emailPattern.test(email || "") || !phonePattern.test(phone || "") || !req.file) return res.status(400).json({ success: false, message: "Please provide valid required application details and a resume." });
    const career = await Career.findOne({ _id: careerId, status: "Open" });
    if (!career || (career.lastDateToApply && career.lastDateToApply < new Date())) return res.status(400).json({ success: false, message: "This position is no longer accepting applications." });
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(req.file.mimetype)) return res.status(400).json({ success: false, message: "Resume must be a PDF, DOC, or DOCX file." });
    const result = await uploadToCloudinary(req.file.buffer, "thumbbyx/job-resumes");
    const applicant = await JobApplicant.create({ career: career._id, fullName, email, phone, coverLetter, resumeUrl: result.secure_url, resumePublicId: result.public_id, resumeName: req.file.originalname });
    res.status(201).json({ success: true, applicant: { id: applicant._id, fullName: applicant.fullName } });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: "An application for this position already exists with this email." });
    res.status(500).json({ success: false, message: "Unable to submit application" });
  }
};

export const getAdminCareers = async (req, res) => { try { res.json({ success: true, careers: await Career.find().sort({ createdAt: -1 }) }); } catch { res.status(500).json({ success: false, message: "Unable to load hiring posts" }); } };
export const createCareer = async (req, res) => { try { const career = await Career.create(jobPayload(req.body)); await logActivity({ req, action: "Add Hiring", module: "Careers", targetId: career._id, targetType: "Career", description: `Added hiring post ${career.title}` }); res.status(201).json({ success: true, career }); } catch (error) { res.status(400).json({ success: false, message: error.message || "Unable to create hiring post" }); } };
export const updateCareer = async (req, res) => { try { const career = await Career.findByIdAndUpdate(req.params.id, jobPayload(req.body), { returnDocument: "after", runValidators: true }); if (!career) return res.status(404).json({ success: false, message: "Hiring post not found" }); await logActivity({ req, action: "Update Hiring", module: "Careers", targetId: career._id, targetType: "Career", description: `Updated hiring post ${career.title}` }); res.json({ success: true, career }); } catch (error) { res.status(400).json({ success: false, message: error.message || "Unable to update hiring post" }); } };
export const deleteCareer = async (req, res) => { try { const career = await Career.findByIdAndDelete(req.params.id); if (!career) return res.status(404).json({ success: false, message: "Hiring post not found" }); await logActivity({ req, action: "Delete Hiring", module: "Careers", targetId: career._id, targetType: "Career", description: `Deleted hiring post ${career.title}` }); res.json({ success: true, message: "Hiring post deleted" }); } catch { res.status(500).json({ success: false, message: "Unable to delete hiring post" }); } };
export const getApplicants = async (req, res) => { try { res.json({ success: true, applicants: await JobApplicant.find().populate("career", "title department").sort({ createdAt: -1 }) }); } catch { res.status(500).json({ success: false, message: "Unable to load applicants" }); } };
export const updateApplicantStatus = async (req, res) => { try { const applicant = await JobApplicant.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: "after", runValidators: true }); if (!applicant) return res.status(404).json({ success: false, message: "Applicant not found" }); res.json({ success: true, applicant }); } catch { res.status(400).json({ success: false, message: "Unable to update applicant status" }); } };
export const deleteApplicant = async (req, res) => { try { const applicant = await JobApplicant.findById(req.params.id); if (!applicant) return res.status(404).json({ success: false, message: "Applicant not found" }); await cloudinary.uploader.destroy(applicant.resumePublicId, { resource_type: "raw" }); await applicant.deleteOne(); res.json({ success: true, message: "Applicant and resume permanently deleted" }); } catch { res.status(500).json({ success: false, message: "Unable to delete applicant" }); } };
