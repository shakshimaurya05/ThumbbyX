import ShowcaseProject from "../models/ShowcaseProject.js";
import uploadToCloudinary from "../utils/upload.js";
import { logActivity } from "../utils/activityLogger.js";

const normalizeFeatures = (features) => {
  if (Array.isArray(features)) {
    return features.map((feature) => String(feature).trim()).filter(Boolean);
  }

  if (typeof features === "string") {
    return features
      .split(/\r?\n|,/)
      .map((feature) => feature.trim())
      .filter(Boolean);
  }

  return [];
};

const buildProjectPayload = async (body, file, existingImage = "") => {
  let image = body.image || existingImage || "";

  if (file?.buffer) {
    const result = await uploadToCloudinary(file.buffer, "thumbbyx/showcase-projects");
    image = result.secure_url;
  }

  return {
    title: body.title,
    location: body.location,
    status: body.status,
    type: body.type,
    year: body.year,
    client: body.client,
    area: body.area,
    image,
    tone: body.tone,
    intro: body.intro,
    detail: body.detail,
    features: normalizeFeatures(body.features),
  };
};

export const getShowcaseProjects = async (req, res) => {
  try {
    const projects = await ShowcaseProject.find().sort({ createdAt: -1 });

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

export const getShowcaseProjectById = async (req, res) => {
  try {
    const project = await ShowcaseProject.findById(req.params.id);

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

export const createShowcaseProject = async (req, res) => {
  try {
    const payload = await buildProjectPayload(req.body, req.file);
    const project = await ShowcaseProject.create(payload);

    await logActivity({
      req,
      action: "Add Project",
      module: "Showcase Projects",
      targetId: project._id,
      targetType: "ShowcaseProject",
      description: `Added showcase project ${project.title}`,
    });

    return res.status(201).json({
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

export const updateShowcaseProject = async (req, res) => {
  try {
    const project = await ShowcaseProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const payload = await buildProjectPayload(req.body, req.file, project.image);
    Object.assign(project, payload);
    await project.save();

    await logActivity({
      req,
      action: "Update Project",
      module: "Showcase Projects",
      targetId: project._id,
      targetType: "ShowcaseProject",
      description: `Updated showcase project ${project.title}`,
    });

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

export const deleteShowcaseProject = async (req, res) => {
  try {
    const project = await ShowcaseProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    await logActivity({
      req,
      action: "Delete Project",
      module: "Showcase Projects",
      targetId: project._id,
      targetType: "ShowcaseProject",
      description: `Deleted showcase project ${project.title}`,
    });

    return res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
