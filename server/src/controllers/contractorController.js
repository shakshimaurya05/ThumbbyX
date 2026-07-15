import User from "../models/User.js";
import ContractorProfile from "../models/ContractorProfile.js";
import Lead from "../models/Lead.js";
import uploadToCloudinary from "../utils/upload.js";
import Project from "../models/Project.js";
import ProjectUpdate from "../models/ProjectUpdate.js";
export const getContractorProfile =
  async (req, res) => {
    try {
      const profile =
        await ContractorProfile.findOne({
          userId: req.user._id,
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor profile not found",
        });
      }

      return res.status(200).json({
        success: true,

        user: {
          id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          phone: req.user.phone,
          role: req.user.role,
        },

        profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const updateContractorProfile =
  async (req, res) => {
    try {
      const {
        companyName,
        experienceYears,
        completedHouses,
        largestProjectSqFt,

        accountHolderName,
        accountNumber,
        ifscCode,
      } = req.body;

      const profile =
        await ContractorProfile.findOne({
          userId: req.user._id,
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message:
            "Contractor profile not found",
        });
      }

      if (companyName !== undefined)
        profile.companyName =
          companyName;

      if (experienceYears !== undefined)
        profile.experienceYears =
          experienceYears;

      if (completedHouses !== undefined)
        profile.completedHouses =
          completedHouses;

      if (
        largestProjectSqFt !==
        undefined
      )
        profile.largestProjectSqFt =
          largestProjectSqFt;

      if (
        accountHolderName !==
        undefined
      )
        profile.banking.accountHolderName =
          accountHolderName;

      if (accountNumber !== undefined)
        profile.banking.accountNumber =
          accountNumber;

      if (ifscCode !== undefined)
        profile.banking.ifscCode =
          ifscCode;
      if (
  profile.companyName &&
  profile.experienceYears > 0 &&
  profile.completedHouses > 0 &&
  profile.largestProjectSqFt > 0 &&
  profile.banking.accountHolderName &&
  profile.banking.accountNumber &&
  profile.banking.ifscCode
) {
  profile.onboardingStatus =
    "documents_pending";
}
      await profile.save();

      return res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

 export const uploadDocuments =
  async (req, res) => {
    try {
      const profile =
        await ContractorProfile.findOne({
          userId: req.user._id,
        });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message:
            "Profile not found",
        });
      }

      const files = req.files;

      if (
        files.profilePhoto?.[0]
      ) {
        const result =
          await uploadToCloudinary(
            files.profilePhoto[0]
              .buffer,
            "thumbbyx/profile-photos"
          );

        profile.profilePhoto = {
          publicId:
            result.public_id,
          url: result.secure_url,
        };
      }
if (files.aadhaarDocument?.[0]) {

  console.log("====== Aadhaar File ======");
  console.log(files.aadhaarDocument[0].originalname);
  console.log(files.aadhaarDocument[0].mimetype);
  console.log(files.aadhaarDocument[0].size);
  console.log(files.aadhaarDocument[0].buffer.length);

  const result =
    await uploadToCloudinary(
      files.aadhaarDocument[0].buffer,
      "thumbbyx/aadhaar"
    );

  console.log("====== Cloudinary Result ======");
  console.log(result);

  profile.verification.aadhaarDocument = {
    publicId: result.public_id,
    url: result.secure_url,
  };
}

      if (
        files.panDocument?.[0]
      ) {
        const result =
          await uploadToCloudinary(
            files.panDocument[0]
              .buffer,
            "thumbbyx/pan"
          );

        profile.verification.panDocument =
          {
            publicId:
              result.public_id,
            url:
              result.secure_url,
          };
      }

      if (
        files.gstDocument?.[0]
      ) {
        const result =
          await uploadToCloudinary(
            files.gstDocument[0]
              .buffer,
            "thumbbyx/gst"
          );

        profile.verification.gstDocument =
          {
            publicId:
              result.public_id,
            url:
              result.secure_url,
          };
      }

      if (
        files.udyamDocument?.[0]
      ) {
        const result =
          await uploadToCloudinary(
            files
              .udyamDocument[0]
              .buffer,
            "thumbbyx/udyam"
          );

        profile.verification.udyamDocument =
          {
            publicId:
              result.public_id,
            url:
              result.secure_url,
          };
      }

      if (
        files
          .policeVerificationDocument?.[0]
      ) {
        const result =
          await uploadToCloudinary(
            files
              .policeVerificationDocument[0]
              .buffer,
            "thumbbyx/police"
          );

        profile.verification.policeVerificationDocument =
          {
            publicId:
              result.public_id,
            url:
              result.secure_url,
          };
      }

    profile.verificationSubmitted = true;

if (profile.verificationStatus !== "approved") {
  profile.verificationStatus = "under_review";
  profile.onboardingStatus = "submitted";
}

      await profile.save();

      return res.status(200).json({
        success: true,
        message:
          "Documents uploaded successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Upload failed",
      });
    }
  };
  export const submitApplication =
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

      contractor.companyName =
        req.body.companyName;

      contractor.experienceYears =
        req.body.experienceYears;

      contractor.completedHouses =
  Number(
    req.body.completedHouses
  );

contractor.largestProjectSqFt =
  Number(
    req.body.largestProjectSqFt
  );
  contractor.verification.gstNumber =
  req.body.gstNumber;

      contractor.banking.accountHolderName =
        req.body.accountHolderName;

      contractor.banking.accountNumber =
        req.body.accountNumber;

      contractor.banking.ifscCode =
        req.body.ifscCode;

      contractor.verificationStatus =
        "under_review";
      contractor.onboardingStatus =
  "submitted";
      await contractor.save();

req.user.onboardingCompleted =
  true;

await req.user.save({
  validateBeforeSave: false,
});

return res.status(200).json({
        success: true,
        message:
          "Application submitted successfully",
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
  export const getApprovedContractors =
  async (req, res) => {
    try {
      const contractors =
        await ContractorProfile.find({
          verificationStatus:
            "approved",
        }).populate(
          "userId",
          "fullName"
        );

      res.status(200).json({
        success: true,
        contractors,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const getApprovedContractorById =
  async (req, res) => {
    try {
      const contractor =
        await ContractorProfile.findOne({
          _id: req.params.id,
          verificationStatus:
            "approved",
        }).populate(
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
  export const getMyLeads =
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

      const leads =
        await Lead.find({
          contractorId:
            contractor._id,
        }).sort({
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
  export const addProjectUpdate =
  async (req, res) => {
    try {
      const update =
        await ProjectUpdate.create({
          projectId:
            req.params.id,

          title:
            req.body.title,

          description:
            req.body.description,

          progressPercentage:
            req.body.progressPercentage,

          nextTask:
            req.body.nextTask,

          expectedCompletionDate:
            req.body.expectedCompletionDate,
        });

      await Project.findByIdAndUpdate(
        req.params.id,
        {
          progressPercentage:
            req.body.progressPercentage,
        }
      );

      return res.status(201).json({
        success: true,
        update,
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