import Project from "../models/Project.js";
import ProjectUpdate from "../models/ProjectUpdate.js";
import ContractorProfile from "../models/ContractorProfile.js";
import uploadToCloudinary
from "../utils/upload.js";
import { logActivity } from "../utils/activityLogger.js";
const MILESTONES = [
  { name: "Booking + Foundation",           pct: 15, threshold: 15  },
  { name: "Ground Floor Structure",         pct: 30, threshold: 45  },
  { name: "First Floor + Roof Slab",        pct: 25, threshold: 70  },
  { name: "Plaster, Electrical & Plumbing", pct: 18, threshold: 88  },
  { name: "Final Finishing + Handover",     pct: 12, threshold: 100 },
];

export const addProjectUpdate = async (req, res) => {
  try {
    const update = await ProjectUpdate.create({
      projectId:              req.params.id,
      title:                  req.body.title,
      description:            req.body.description,
      progressPercentage:     req.body.progressPercentage,
      nextTask:               req.body.nextTask,
      expectedCompletionDate: req.body.expectedCompletionDate,
      photos:                 req.body.photos || [],
    });

    const newPct = Number(req.body.progressPercentage);

    const project = await Project.findById(req.params.id);

   
    if (project.milestones.length !== MILESTONES.length) {
      project.milestones = MILESTONES.map(m => ({
        name:   m.name,
        pct:    m.pct,
        status: "upcoming",
        date:   null,
        utr:    null,
      }));
    }

    project.milestones = project.milestones.map((m, i) => {
      const template = MILESTONES[i];
      if (m.status === "paid") return m;
      if (template && newPct >= template.threshold && m.status === "upcoming") {
        return { ...m.toObject(), status: "due" };
      }
      return m;
    });

    project.progressPercentage = newPct;
    await project.save();

    return res.status(201).json({ success: true, update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getProjectUpdates =
  async (req, res) => {
    try {
      const updates =
        await ProjectUpdate.find({
          projectId:
            req.params.id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        updates,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

export const getMyProjects =
  async (req, res) => {
    try {
      const contractor =
        await ContractorProfile.findOne({
          userId: req.user._id,
        });

      if (!contractor) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor profile not found",
        });
      }

      const projects =
        await Project.find({
          contractorId:
            contractor._id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };
  export const getProjectById =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const uploadProjectPhoto =
  async (req, res) => {
    try {
      const result =
        await uploadToCloudinary(
          req.file.buffer,
          "thumbbyx/project-updates"
        );

      return res.status(200).json({
        success: true,
        url:
          result.secure_url,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
      });
    }
  };
  export const submitMilestoneUtr = async (req, res) => {
  try {
    const { milestoneId, utr } = req.body;
    const project = await Project.findById(req.params.id);
    const milestone = project.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });
    milestone.submittedUtr = utr;
    await project.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const confirmMilestonePayment = async (req, res) => {
  try {
    const { milestoneId } = req.body;
    const project = await Project.findById(req.params.id);
    const milestone = project.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });

    milestone.status = "paid";
    milestone.utr = milestone.submittedUtr;
    milestone.date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

    // Add to contractor earnings
    const budget = parseInt(project.budget) || 0;
    const amount = Math.round((milestone.pct / 100) * budget);
    project.contractorEarnings.push({
      milestoneName: milestone.name,
      amount,
      status: "processing",
      customerPaidDate: milestone.date,
    });

    await project.save();
    await logActivity({
      req,
      action: "Payment Approval",
      module: "Payments",
      targetId: project._id,
      targetType: "Project",
      description: `Confirmed milestone payment for ${milestone.name}`,
    });
    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
  export const getCustomerProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          customerId:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        projects,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
      });
    }
  };
  export const payContractor = async (req, res) => {
  try {
    const { earningId, utr, note, commissionAmt, payableAmt, commissionPct } = req.body;
    const project = await Project.findById(req.params.id);
    const earning = project.contractorEarnings.id(earningId);
    if (!earning) return res.status(404).json({ message: "Earning not found" });

    earning.status             = "paid";
    earning.contractorUtr      = utr;
    earning.contractorPaidDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    earning.adminNote          = note || "";
    earning.commissionAmt      = commissionAmt || 0;
    earning.commissionPct      = commissionPct || 0;
    earning.payableAmt         = payableAmt || earning.amount;

    await project.save();
    await logActivity({
      req,
      action: "Payment Approval",
      module: "Payments",
      targetId: project._id,
      targetType: "Project",
      description: `Paid contractor earning ${earningId}`,
    });
    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
