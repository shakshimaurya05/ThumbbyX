import mongoose from "mongoose";

const projectUpdateSchema =
  new mongoose.Schema(
    {
      projectId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      progressPercentage: {
        type: Number,
        default: 0,
      },

      nextTask: {
        type: String,
      },

      expectedCompletionDate: {
        type: Date,
      },

      photos: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ProjectUpdate",
  projectUpdateSchema
);