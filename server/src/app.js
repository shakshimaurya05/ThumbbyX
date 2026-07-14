import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import contractorRoutes from "./routes/contractorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import leadRoutes
from "./routes/leadRoutes.js";
import projectRoutes
from "./routes/ProjectRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import showcaseProjectRoutes from "./routes/showcaseProjectRoutes.js";


const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use(
  "/api/admin",
  adminRoutes
);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ThumbbyX API Running",
  });
});
app.use(
  "/api/test",
  testRoutes
);
app.use(
  "/api/contractor",
  contractorRoutes
);
app.use(
  "/api/leads",
  leadRoutes
);
app.use(
  "/api/projects",
  projectRoutes
);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/showcase-projects", showcaseProjectRoutes);

export default app;
