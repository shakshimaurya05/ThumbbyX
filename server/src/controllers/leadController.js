import Lead from "../models/Lead.js";
import ContractorProfile from "../models/ContractorProfile.js";

export const createLead =
  async (req, res) => {
    try {
      let contractor = null;

      if (
        req.body.contractorId
      ) {
        contractor =
          await ContractorProfile.findById(
            req.body.contractorId
          ).populate(
            "userId",
            "fullName"
          );

        if (!contractor) {
          return res.status(404).json({
            success: false,
            message:
              "Contractor not found",
          });
        }
      }
console.log("Contractor:", contractor);

console.log(
  "Contractor User:",
  contractor?.userId
);

console.log(
  "Contractor Name:",
  contractor?.userId?.fullName
);
      const lead =
        await Lead.create({
          contractorId:
            contractor?._id || null,

          contractorName:
            contractor?.userId
              ?.fullName || "",

          contractorCity:
            contractor?.city || "",

          leadType:
            req.body.leadType ||
            "general",

          customerName:
            req.body.customerName,

          customerPhone:
            req.body.customerPhone,

          customerEmail:
            req.body.customerEmail,

          city:
            req.body.city,

          projectType:
            req.body.projectType,

          expectedStartTime:
            req.body.expectedStartTime,

          plotArea:
            req.body.plotArea,

          budget:
            req.body.budget,

          message:
            req.body.message,
        });

      return res.status(201).json({
        success: true,
        lead,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

// ── NEW: Cost Estimator Lead ──────────────────────────────────────────────────
export const createCostEstimatorLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      city,
      plotArea,
      floors,
      constructionType,
      ownLand,
      startTime,
      builtupArea,
      estimatedCost,
      rate,
    } = req.body;

    const lead = await Lead.create({
      customerName:     name,
      customerPhone:    phone,
      customerEmail:    email,
      city:             city,
      projectType:      "Cost Estimator",
      plotArea:         plotArea,
      expectedStartTime: startTime,
      leadType:         "general",
      // Store extra estimator data in the message field as a readable summary
      message: `Floors: ${floors} | Type: ${constructionType} | Own Land: ${ownLand} | Built-up Area: ${builtupArea} sqft | Rate: ₹${rate}/sqft | Estimated Cost: ₹${estimatedCost}`,
      budget:           `₹${Number(estimatedCost).toLocaleString()}`,
    });

    return res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
