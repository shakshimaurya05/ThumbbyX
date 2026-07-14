import Project from "../models/Project.js";
import ContractorProfile from "../models/ContractorProfile.js";
import User from "../models/User.js";
import VideoReview from "../models/VideoReview.js";
import ProjectReview from "../models/ProjectReview.js";
import AppReview from "../models/AppReview.js";
const extractYouTubeVideoId = (url) => {
  if (!url) return null;

  const pattern =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(pattern);
  return match ? match[1] : null;
};
export const getReviews = async (req, res) => {
  try {
    const [videoReviews, projectReviews, appReviews] = await Promise.all([
      VideoReview.find().sort({ createdAt: -1 }),
      ProjectReview.find().sort({ createdAt: -1 }),
      AppReview.find().sort({ createdAt: -1 }),
    ]);

    const writtenReviews = [
      ...appReviews.map((r) => ({
         _id: r._id,
        name: r.reviewerName,
        city: r.city,
        review: r.review,
        rating: r.rating,
        createdAt: r.createdAt,
        type: "app",
      })),
      ...projectReviews.map((r) => ({
         _id: r._id,
        name: r.reviewerName,
        city: r.city,
        review: r.review,
        rating: r.rating,
        createdAt: r.createdAt,
        type: "contractor",
        targetName: r.reviewerRole === "customer" ? r.contractorName : r.customerName,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      videoReviews,
      writtenReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getVideoReviews = async (req, res) => {
  try {
    const videoReviews = await VideoReview.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, videoReviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createVideoReview = async (req, res) => {
  try {
    const { name, city, youtube, image, featured } = req.body;

    if (!name || !city || !youtube) {
      return res.status(400).json({
        success: false,
        message: "Name, city, and Youtube URL are required",
      });
    }
    let thumbnail = image?.trim();

    if (!thumbnail) {
      const videoId = extractYouTubeVideoId(youtube);

      if (!videoId) {
        return res.status(400).json({
          success: false,
          message:
            "Could not extract a video ID from the YouTube URL — please check the link or provide a custom image",
        });
      }

      thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    const review = await VideoReview.create({
      name,
      city,
      youtube,
      image: thumbnail,
      featured: featured || false,
    });

    return res.status(201).json({
      success: true,
      videoReview: review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteVideoReview = async (req, res) => {
  try {
    const review = await VideoReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Video review not found",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Video review removed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteProjectReview = async (req, res) => {
  try {
    const review = await ProjectReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Project review not found",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Project review removed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteAppReview = async (req, res) => {
  try {
    const review = await AppReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "App review not found",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "App review removed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getProjectReview = async (req, res) => {
  try {
    const review = await ProjectReview.findOne({
      projectId: req.params.projectId,
      reviewerId: req.user?._id,
    });

    return res.status(200).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createProjectReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Rating and review text are required",
      });
    }

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.status !== "completed" && project.progressPercentage !== 100) {
      return res.status(400).json({
        success: false,
        message: "Reviews can only be submitted for completed projects",
      });
    }

    const role = req.user.role; // "customer" or "contractor"
    let reviewerName, contractorIdForRecord, customerIdForRecord;

    if (role === "customer") {
      if (project.customerId?.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You can only review your own projects",
        });
      }
      reviewerName = project.customerName || req.user.fullName;
      const contractor = await ContractorProfile.findById(project.contractorId).populate("userId", "fullName");
      customerIdForRecord = req.user._id;
      contractorIdForRecord = project.contractorId;
      var contractorNameForRecord = contractor?.userId?.fullName || project.contractorName;
    } else if (role === "contractor") {
      const contractorProfile = await ContractorProfile.findById(project.contractorId);
      if (!contractorProfile || contractorProfile.userId?.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You can only review your own projects",
        });
      }
      reviewerName = req.user.fullName;
      contractorIdForRecord = project.contractorId;
      customerIdForRecord = project.customerId;
      var contractorNameForRecordB = project.contractorName;
    } else {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const existing = await ProjectReview.findOne({ projectId: project._id, reviewerRole: role });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this project",
      });
    }

    const createdReview = await ProjectReview.create({
      projectId: project._id,
      contractorId: contractorIdForRecord,
      customerId: customerIdForRecord,
      customerName: project.customerName,
      contractorName: role === "customer" ? contractorNameForRecord : contractorNameForRecordB,
      reviewerRole: role,
      reviewerName,
      reviewerId: req.user._id,
      city: project.city,
      rating,
      review,
    });

    return res.status(201).json({
      success: true,
      review: createdReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCustomerPendingReviews = async (req, res) => {
  try {
    const completedProjects = await Project.find({
      customerId: req.user._id,
      status: "completed",
    }).lean();

    const projectIds = completedProjects.map((project) => project._id);
    const existingReviews = await ProjectReview.find({
      projectId: { $in: projectIds },
    }).lean();

    const reviewMap = new Map(existingReviews.map((item) => [item.projectId.toString(), item]));

    const pendingReviews = completedProjects
      .filter((project) => !reviewMap.has(project._id.toString()))
      .map((project) => ({
        projectId: project._id,
        projectName: project.projectName,
        contractorName: project.contractorName,
        status: project.status,
      }));

    return res.status(200).json({
      success: true,
      pendingReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getContractorReviewsMe = async (req, res) => {
  try {
    const contractor = await ContractorProfile.findOne({
      userId: req.user._id,
    });

    if (!contractor) {
      return res.status(404).json({
        success: false,
        message: "Contractor profile not found",
      });
    }

    const reviews = await ProjectReview.find({
      contractorId: contractor._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getContractorReviewsById = async (req, res) => {
  try {
    const reviews = await ProjectReview.find({
      contractorId: req.params.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const createAppReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Rating and review text are required",
      });
    }

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const role = req.user.role;
    const existing = await AppReview.findOne({ projectId: project._id, reviewerId: req.user._id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted an app review for this project",
      });
    }

    const reviewerName = role === "contractor" ? req.user.fullName : (project.customerName || req.user.fullName);

    const createdReview = await AppReview.create({
      projectId: project._id,
      reviewerId: req.user._id,
      reviewerRole: role,
      reviewerName,
      city: project.city,
      rating,
      review,
    });

    return res.status(201).json({ success: true, review: createdReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAppReview = async (req, res) => {
  try {
    const review = await AppReview.findOne({
      projectId: req.params.projectId,
      reviewerId: req.user._id,
    });
    return res.status(200).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};