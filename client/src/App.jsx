import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
function App() {
  return (
    <BrowserRouter>
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
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
