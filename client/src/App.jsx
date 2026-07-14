import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
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
import { useAuth } from "./contexts/AuthContext";
import { dashboardPathForRole, isAdminRole, isSuperAdmin } from "./utils/roles";

function RoleRoute({ hasAccess, children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!hasAccess(user.role)) {
    return <Navigate to={dashboardPathForRole(user.role)} replace />;
  }

  return children;
}

const AdminRoute = ({ children }) => <RoleRoute hasAccess={isAdminRole}>{children}</RoleRoute>;
const SuperAdminRoute = ({ children }) => <RoleRoute hasAccess={isSuperAdmin}>{children}</RoleRoute>;
const CustomerRoute = ({ children }) => <RoleRoute hasAccess={(role) => role === "customer"}>{children}</RoleRoute>;
const ContractorRoute = ({ children }) => <RoleRoute hasAccess={(role) => role === "contractor"}>{children}</RoleRoute>;

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
          element={<ContractorRoute><ContractorDashboard /></ContractorRoute>}
        />

     <Route path="/contractor/edit-profile" element={<ContractorRoute><EditProfile /></ContractorRoute>} />

        <Route
          path="/admin/dashboard"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
/>
<Route
  path="/admin/video-reviews"
  element={<AdminRoute><VideoReviewsPage /></AdminRoute>}
/>
<Route
  path="/admin/contractors"
  element={<AdminRoute><ContractorsPage /></AdminRoute>}
/>
<Route
  path="/contractor/project/:id"
  element={
    <ContractorRoute><ContractorProjectDetailsPage /></ContractorRoute>
  }
/>
<Route
  path="/admin/contractors/:id"
  element={
    <AdminRoute><ContractorDetailsPage /></AdminRoute>
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
  element={<AdminRoute><LeadsPage /></AdminRoute>}
/>
<Route
  path="/contractor/my-leads"
  element={<ContractorRoute><MyLeadsPage /></ContractorRoute>}
/>
<Route
  path="/admin/projects"
  element={<AdminRoute><ProjectsPage /></AdminRoute>}
/>
<Route
  path="/admin/projects/:id"
  element={<AdminRoute><ProjectDetailsPage /></AdminRoute>}
/>
<Route
  path="/admin/add-projects"
  element={<AdminRoute><ShowcaseProjectsPage /></AdminRoute>}
/>
<Route
  path="/admin/admin-management"
  element={
    <SuperAdminRoute>
      <AdminManagementPage />
    </SuperAdminRoute>
  }
/>
<Route
  path="/admin/activity-logs"
  element={
    <SuperAdminRoute>
      <ActivityLogsPage />
    </SuperAdminRoute>
  }
/>
<Route
  path="/admin/inquiries"
  element={<AdminRoute><InquiriesPage /></AdminRoute>}
/>
<Route
  path="/contractor/my-projects"
  element={<ContractorRoute><MyProjectsPage /></ContractorRoute>}
/>
<Route
  path="/customer/dashboard"
  element={<CustomerRoute><CustomerDashboard /></CustomerRoute>}
/>
<Route
  path="/customer/my-projects"
  element={<CustomerRoute><MyProjectsPages /></CustomerRoute>}
/>
<Route
  path="/customer/project/:id"
  element={
    <CustomerRoute><CustomerProjectDetailsPage /></CustomerRoute>
  }
/>
<Route path="/customer/payments" element={<CustomerRoute><PaymentProjects /></CustomerRoute>} />
   <Route path="/customer/paymentDashboard/:id" element={<CustomerRoute><PaymentDashboard /></CustomerRoute>} />
<Route path="/admin/payments" element={<AdminRoute><AdminPaymentsPage /></AdminRoute>} />

<Route path="/contractor/earnings" element={<ContractorRoute><ContractorEarningsPage /></ContractorRoute>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
