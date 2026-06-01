import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import WhyThumbbyX from "../components/home/WhyThumbbyX";
import TrustStats from "../components/home/TrustStats";
import DreamHomeShowcase from "../components/home/DreamHomeShowcase";
import FeaturedProjects from "../components/home/FeaturedProjects";
import FeaturedContractors from "../components/home/FeaturedContractors";
import Services from "../components/home/Services";
import TalkToExpert from "../components/home/TalkToExpert";
import Footer from "../components/layout/Footer";
import Faq from "../components/home/Faq";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
       <TalkToExpert />
          <TrustStats />
      <WhyThumbbyX />
    <Services />
      <DreamHomeShowcase />
      <FeaturedProjects />
        <FeaturedContractors />
       
       
        <Faq />
        <Footer />
    </>
  );
};

export default HomePage;