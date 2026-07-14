import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { API_BASE_URL } from "../../services/api";

import "swiper/css";
import "swiper/css/navigation";

const textVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_BASE_URL + "/showcase-projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.log(error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-10 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-[#4b35a4] font-semibold uppercase tracking-[3px]"
          >
            Featured Projects
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-[#211c58] mt-4 leading-tight"
          >
            Homes Built With{" "}
            <span className="text-[#4b35a4] uppercase tracking-wider">
              Trust And Quality
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-slate-600 mt-5 max-w-2xl mx-auto text-lg"
          >
            Explore a selection of completed residential and commercial
            projects delivered by verified contractors.
          </motion.p>
        </div>

        {projects.length > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation]}
            centeredSlides={true}
            loop={projects.length > 3}
            speed={800}
            spaceBetween={24}
            navigation={true}
            autoplay={{
              delay: 2000,
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
            {projects.map((project) => (
              <SwiperSlide key={project._id}>
                <div className="
                  group
                  bg-white
                  rounded-[32px]
                  overflow-hidden
                  border border-gray-100
                  shadow-[0_20px_50px_-10px_rgba(33,28,88,0.2),0_8px_20px_-5px_rgba(75,53,164,0.15)]
                  hover:shadow-[0_30px_70px_-10px_rgba(75,53,164,0.4),0_10px_30px_-5px_rgba(33,28,88,0.3)]
                  hover:-translate-y-3
                  transition-all
                  duration-500
                  ease-out
                ">
                  <div className="relative overflow-hidden h-[220px] bg-gradient-to-br from-[#211c58] via-[#4b35a4] to-[#7c6fd0]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-5xl font-black text-white/80">
                        {(project.title || "P").charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211c58]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  </div>

                  <div className="p-6">
                    <div className="w-8 h-1 bg-[#4b35a4] rounded-full mb-3"></div>

                    <h3 className="text-xl font-bold text-[#211c58]">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 mt-1 flex items-center gap-1">
                      <span className="text-[#4b35a4]">Location:</span>
                      {project.location}
                    </p>

                    <Link
                      to="/projects"
                      className="mt-4 text-[#4b35a4] font-semibold hover:text-[#211c58] transition duration-300 inline-flex items-center gap-1 group/btn no-underline"
                    >
                      View Project
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="rounded-[32px] border border-dashed border-[#4b35a4]/20 bg-white px-6 py-14 text-center shadow-[0_20px_50px_-10px_rgba(33,28,88,0.12)]">
            <p className="text-[#4b35a4] font-semibold uppercase tracking-[3px]">
              {isLoading ? "Loading Projects" : "No Projects Added"}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#211c58]">
              {isLoading ? "Fetching projects from database..." : "Add projects from the admin panel to feature them here."}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
