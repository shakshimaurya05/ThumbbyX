import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import project1 from "../../assets/projects/project1.png";
import project2 from "../../assets/projects/project2.jpg";
import project3 from "../../assets/projects/project3.jpg";
import project4 from "../../assets/projects/project4.jpg";

const projects = [
  {
    image: project1,
    title: "Luxury Villa",
    location: "Delhi NCR",
  },
  {
    image: project2,
    title: "Modern Duplex",
    location: "Lucknow",
  },
  {
    image: project3,
    title: "Premium Residence",
    location: "Bengaluru",
  },
  {
    image: project4,
    title: "Commercial Project",
    location: "Ahmedabad",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-15 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-6">
          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Featured Projects
          </span>

          <h2 className="text-4xl font-bold text-blue-900 mt-2">
            Homes Built With Trust And Quality
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore a selection of completed residential and commercial
            projects delivered by verified contractors.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          centeredSlides={true}
          loop={true}
          speed={800}
          spaceBetween={8}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1.5}
          breakpoints={{
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="featuredSwiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="project-card max-w-[320px] mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100">

                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[220px] w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-bold text-blue-900">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {project.location}
                  </p>

                  <button className="mt-3 text-orange-500 font-semibold hover:text-blue-900 transition">
                    View Project →
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default FeaturedProjects;