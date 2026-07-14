import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/HomePage";
import HowItWorks from "./pages/HowItWorks";
import FindContractors from "./pages/FindContractors";
import Projects from "./pages/Projects";
import JoinUs from "./pages/JoinUs";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import CostEstimator from "./pages/CostEstimator";
import LiveTracking from "./pages/LiveTracking";
import Reviews from "./pages/Reviews";
import Blogs from "./pages/BlogsArticles";
import TalkToExpertPage from "./pages/TalkToExpertPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerSignupPage from "./pages/auth/CustomerSignupPage";
import ContractorSignupPage from "./pages/auth/ContractorSignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import ResetPasswordPage
  from "./pages/auth/ResetPasswordPage";
import ContractorDashboard from "./pages/ContractorDashboard";
import ContractorsPage from "./pages/admin/ContractorsPage";
import AdminDashboard from "./pages/AdminDashboard";
import ContractorDetailsPage
from "./pages/admin/ContractorDetailPage";
import ContractorPublicProfile
from "./pages/ContractorPublicProfile";
import LeadsPage
from "./pages/admin/LeadsPage";
import MyLeadsPage
from "./pages/contractor/MyLeadsPage";
import ProjectsPage
from "./pages/admin/ProjectsPage";
import ProjectDetailsPage
from "./pages/admin/ProjectDetailsPage";
import InquiriesPage
from "./pages/admin/InquiriesPage";
import MyProjectsPage
from "./pages/contractor/MyProjectPage";
import ContractorProjectDetailsPage
from "./pages/contractor/ContractorProjectDetailsPage";
import MyProjectsPages
from "./pages/customer/MyProjectsPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProjectDetailsPage
from "./pages/customer/CustomerProjectDetailsPage";
import VideoReviewsPage from "./pages/admin/VideoReviewsPage";
import PaymentDashboard from "./pages/customer/paymentDashboard";
import PaymentProjects from "./pages/customer/PaymentProjects";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import ContractorEarningsPage from "./pages/contractor/ContractorEarningPage";
import EditProfile from "./pages/contractor/EditProfile";
import ShowcaseProjectsPage from "./pages/admin/ShowcaseProjectsPage";
import AdminManagementPage from "./pages/admin/AdminManagementPage";
import ActivityLogsPage from "./pages/admin/ActivityLogsPage";
function App() {
  useEffect(() => {
    const originalAlert = window.alert;

    window.alert = (msg) => {
      try {
        if (typeof msg === "string") {
          const lower = msg.toLowerCase();
          if (/fail|failed|error|something went wrong|required|please accept|please|invalid|not match|must be|upload|failed to/i.test(lower)) {
            toast.error(String(msg));
          } else {
            toast.success(String(msg));
          }
        } else if (typeof msg === "object") {
          toast.error(JSON.stringify(msg));
        } else {
          toast(String(msg));
        }
      } catch (e) {
        originalAlert(msg);
      }
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={4000} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contractors" element={<FindContractors />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cost-estimator" element={<CostEstimator />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/talk-to-expert" element={<TalkToExpertPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/customer" element={<CustomerSignupPage />} />
        <Route path="/signup/contractor" element={<ContractorSignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/contractor/dashboard"
          element={<ContractorDashboard />}
        />

     <Route path="/contractor/edit-profile" element={<EditProfile />} />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/video-reviews"
  element={<VideoReviewsPage />}
/>
<Route
  path="/admin/contractors"
  element={<ContractorsPage />}
/>
<Route
  path="/contractor/project/:id"
  element={
    <ContractorProjectDetailsPage />
  }
/>
<Route
  path="/admin/contractors/:id"
  element={
    <ContractorDetailsPage />
  }
/>
<Route
  path="/contractors/:id"
  element={
    <ContractorPublicProfile />
  }
/>
<Route
  path="/admin/leads"
  element={<LeadsPage />}
/>
<Route
  path="/contractor/my-leads"
  element={<MyLeadsPage />}
/>
<Route
  path="/admin/projects"
  element={<ProjectsPage />}
/>
<Route
  path="/admin/projects/:id"
  element={<ProjectDetailsPage />}
/>
<Route
  path="/admin/add-projects"
  element={<ShowcaseProjectsPage />}
/>
<Route
  path="/admin/admin-management"
  element={<AdminManagementPage />}
/>
<Route
  path="/admin/activity-logs"
  element={<ActivityLogsPage />}
/>
<Route
  path="/admin/inquiries"
  element={<InquiriesPage />}
/>
<Route
  path="/contractor/my-projects"
  element={<MyProjectsPage />}
/>
<Route
  path="/customer/dashboard"
  element={<CustomerDashboard />}
/>
<Route
  path="/customer/my-projects"
  element={<MyProjectsPages />}
/>
<Route
  path="/customer/project/:id"
  element={
    <CustomerProjectDetailsPage />
  }
/>
<Route path="/customer/payments" element={<PaymentProjects />} />
   <Route path="/customer/paymentDashboard/:id" element={<PaymentDashboard />} />
<Route path="/admin/payments" element={<AdminPaymentsPage />} />

<Route path="/contractor/earnings" element={<ContractorEarningsPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
