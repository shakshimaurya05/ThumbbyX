import ContractorProfile from "../models/ContractorProfile.js";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import Project from "../models/Project.js";
import { logActivity } from "../utils/activityLogger.js";
export const getAllContractors =
  async (req, res) => {
    try {
      const contractors =
        await ContractorProfile.find()
          .populate(
            "userId",
            "fullName email phone"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        contractors,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const getContractorById =
  async (req, res) => {
    try {
      const contractor =
        await ContractorProfile.findById(
          req.params.id
        ).populate(
          "userId",
          "fullName email phone"
        );

      if (!contractor) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor not found",
        });
      }

      return res.status(200).json({
        success: true,
        contractor,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const approveContractor =
  async (req, res) => {
    try {
      const contractor =
        await ContractorProfile.findById(
          req.params.id
        );

      if (!contractor) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor not found",
        });
      }

      contractor.verificationStatus =
        "approved";

      contractor.onboardingStatus =
        "approved";

      contractor.approvedBy =
        req.user._id;

      contractor.approvedAt =
        new Date();

      await contractor.save();

      await logActivity({
        req,
        action: "Approve Contractor",
        module: "Contractors",
        targetId: contractor._id,
        targetType: "ContractorProfile",
        description: `Approved contractor ${contractor._id}`,
      });

      return res.status(200).json({
        success: true,
        message:
          "Contractor approved successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const rejectContractor =
  async (req, res) => {
    try {
      const { reason } = req.body;

      const contractor =
        await ContractorProfile.findById(
          req.params.id
        );

      if (!contractor) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor not found",
        });
      }

      contractor.verificationStatus =
        "rejected";

      contractor.rejectionReason =
        reason || "Not specified";

      await contractor.save();

      await logActivity({
        req,
        action: "Reject Contractor",
        module: "Contractors",
        targetId: contractor._id,
        targetType: "ContractorProfile",
        description: `Rejected contractor ${contractor._id}`,
      });

      return res.status(200).json({
        success: true,
        message:
          "Contractor rejected",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const getAllLeads =
  async (req, res) => {
    try {
      const leads =
        await Lead.find()
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        leads,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };


export const assignContractor =
  async (req, res) => {
    try {
      const { contractorId } =
        req.body;

      const lead =
        await Lead.findById(
          req.params.id
        );

      if (!lead) {
        return res.status(404).json({
          success: false,
          message:
            "Lead not found",
        });
      }

      lead.contractorId =
        contractorId;

      lead.status =
        "assigned";

      await lead.save();

      return res.status(200).json({
        success: true,
        message:
          "Contractor assigned successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const convertLeadToProject =
  async (req, res) => {
    try {
      const lead =
        await Lead.findById(
          req.params.id
        );

      if (!lead) {
        return res.status(404).json({
          success: false,
          message:
            "Lead not found",
        });
      }

      const {
  projectName,
  budget,
  contractorId =
    lead.contractorId,
  expectedDuration,
  startDate,
} = req.body;

      const contractor =
        await ContractorProfile.findById(
          contractorId
        ).populate(
          "userId",
          "fullName phone"
        );

      if (!contractor) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor not found",
        });
      }
      const customer =
  await User.findOne({
    email:
      lead.customerEmail,
  });

      const project =
        await Project.create({
          leadId: lead._id,
          customerId:
  customer?._id || null,

          contractorId,

          contractorName:
            contractor.userId
              ?.fullName,

          contractorPhone:
            contractor.userId
              ?.phone,

          projectName:
  projectName ||
  `${lead.customerName} Project`,

          customerName:
            lead.customerName,

          customerPhone:
            lead.customerPhone,

          customerEmail:
            lead.customerEmail,

          city: lead.city,

          projectType:
            lead.projectType,

          plotArea:
            lead.plotArea,

         budget:
  budget || lead.budget,

          expectedDuration,

          startDate,

          message:
            lead.message,
        });

      lead.status =
        "converted";

      await lead.save();

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
  export const getAllProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find()
          .sort({
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
        message: "Server Error",
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
          message:
            "Project not found",
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
  

export const markProjectAsCompleted = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.status = "completed";
    await project.save();

    await logActivity({
      req,
      action: "Update Project",
      module: "Projects",
      targetId: project._id,
      targetType: "Project",
      description: `Marked project ${project._id} as completed`,
    });

    return res.status(200).json({
      success: true,
      message: "Project marked as completed",
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
