import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Heart,
  Info,
  LayoutDashboard,
  Menu,
  Phone,
  Star,
  Users,
} from "lucide-react";
import logo from "../../assets/ThumbbyX Logo.png";
import dropdownImage from "../../assets/dream.png";

const featuredMenu = {
  badge: "Featured",
  title: "Visionary Custom Homes",
  desc: "Explore our award-winning architectural designs tailored to modern living.",
  link: "/projects",
};

const moreLinks = [
  {
    icon: Heart,
    label: "Trust & Reviews",
    sub: "Real stories.",
    href: "/reviews",
  },
  {
    icon: ClipboardList,
    label: "Blog",
    sub: "News & trends.",
    href: "/blogs",
  },
  {
    icon: Info,
    label: "How We Work?",
    sub: "Virtual build process.",
    href: "/how-it-works",
  },
  {
    icon: Users,
    label: "About Us",
    sub: "Meet our team.",
    href: "/about-us",
  },
  {
    icon: Phone,
    label: "Contact Us",
    sub: "Get in touch.",
    href: "/contact",
  },
  {
    icon: Users,
    label: "Join Us",
    sub: "Partner with ThumbbyX.",
    href: "/join-us",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Projects", href: "/projects" },
  { label: "Find Contractor", href: "/contractors" },
  { label: "Cost Estimator", href: "/cost-estimator" },
];

const navLinkClass = ({ isActive }) =>
  [
    "rounded-lg px-3.5 py-2 text-sm font-medium transition duration-200",
    "text-black hover:bg-slate-50 hover:text-black",
    isActive ? "text-blue-900" : "",
  ].join(" ");

const MegaMenuItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className="group/item flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-left no-underline shadow-[0_3px_0_rgba(148,163,184,0.28),0_10px_18px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100/85 hover:shadow-[0_5px_0_rgba(148,163,184,0.38),0_16px_24px_rgba(15,23,42,0.10)]"
    >
      <span className="bg-brand-button-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-indigo-600/20 transition duration-200 group-hover/item:shadow-purple-700/25">
        <Icon size={18} strokeWidth={1.9} />
      </span>

      <span>
        <span className="flex items-center gap-2 text-[13.5px] font-semibold leading-tight text-slate-950">
          {item.label}
          {item.badge && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold tracking-wide text-emerald-700">
              {item.badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11.5px] text-slate-500">
          {item.sub}
        </span>
      </span>
    </Link>
  );
};

const MegaMenuButton = ({ icon: Icon, label, sub, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/item flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-left no-underline shadow-[0_3px_0_rgba(148,163,184,0.28),0_10px_18px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100/85 hover:shadow-[0_5px_0_rgba(148,163,184,0.38),0_16px_24px_rgba(15,23,42,0.10)]"
    >
      <span className="bg-brand-button-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md shadow-indigo-600/20 transition duration-200 group-hover/item:shadow-purple-700/25">
        <Icon size={18} strokeWidth={1.9} />
      </span>

      <span>
        <span className="flex items-center gap-2 text-[13.5px] font-semibold leading-tight text-slate-950">
          {label}
        </span>
        <span className="mt-0.5 block text-[11.5px] text-slate-500">
          {sub}
        </span>
      </span>
    </button>
  );
};


const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] =
  useState(null);
const [isLoggedIn, setIsLoggedIn] =
  useState(false);

useEffect(() => {
  const token =
    localStorage.getItem(
      "accessToken"
    );

  const savedUser =
    localStorage.getItem(
      "user"
    );

  setIsLoggedIn(!!token);

  if (savedUser) {
    setUser(
      JSON.parse(savedUser)
    );
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem(
    "accessToken"
  );

  setIsLoggedIn(false);
  toast.success("Logged out successfully");
  navigate("/login");
};

const handleDashboard = () => {
  if (
    user?.role ===
    "contractor"
  ) {
    navigate(
      "/contractor/dashboard"
    );
  } else if (
    user?.role === "admin"
  ) {
    navigate(
      "/admin/dashboard"
    );
  } else {
    navigate(
      "/customer/dashboard"
    );
  }
};

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <nav className="flex h-[68px] items-center justify-between border-b border-slate-200 bg-white px-3 shadow-sm shadow-slate-900/5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 lg:gap-25">
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <img
                src={logo}
                alt="ThumbbyX"
                className="h-[60px] w-auto object-contain sm:h-[76px]"
              />
            </Link>

            <ul className="hidden items-center gap-1.5 p-0 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label} className="list-none">
                  <NavLink to={link.href} className={navLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <li className="group/more flex h-[68px] items-center list-none">
                <button
                  type="button"
                  className="flex cursor-default items-center gap-1.5 rounded-lg border-0 bg-transparent px-3.5 py-2 text-sm font-medium text-black transition duration-200 group-hover/more:bg-slate-50 group-hover/more:text-black group-focus-within/more:bg-slate-50"
                >
                  More
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className="transition duration-200 group-hover/more:rotate-180 group-focus-within/more:rotate-180"
                  />
                </button>

                <div className="pointer-events-none absolute left-0 right-0 top-[68px] z-40 overflow-hidden rounded-b-[28px] opacity-0 shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition-all duration-300 ease-out group-hover/more:pointer-events-auto group-hover/more:opacity-100 group-focus-within/more:pointer-events-auto group-focus-within/more:opacity-100">
                  <div className="-translate-y-3 border-b border-slate-200 bg-white transition duration-300 ease-out group-hover/more:translate-y-0 group-focus-within/more:translate-y-0">
                    <div className="grid min-h-[200px] grid-cols-[390px_1fr] gap-6 px-8 py-6">
                      <div className="relative flex min-h-[150px] flex-col justify-end overflow-hidden rounded-[28px] bg-blue-950 p-6">
                        <img
                          src={dropdownImage}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover opacity-35"
                        />
                        <div className="absolute inset-0 bg-blue-950/25" />

                        <span className="relative mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          <Star size={10} />
                          {featuredMenu.badge}
                        </span>
                        <h3 className="relative mb-2 text-xl font-bold leading-snug text-white">
                          {featuredMenu.title}
                        </h3>
                        <p className="relative mb-5 max-w-[290px] text-sm leading-relaxed text-white/75">
                          {featuredMenu.desc}
                        </p>
                        <Link
                          to={featuredMenu.link}
                          className="relative inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white no-underline transition hover:text-orange-200"
                        >
                          View Showcase
                          <ArrowRight size={13} />
                        </Link>
                      </div>

                    <div className="grid grid-cols-4 content-start gap-3 pt-3">
                        {moreLinks.map((item) => (
                          <MegaMenuItem key={item.label} item={item} />
                        ))}
                        {isLoggedIn && (
                          <MegaMenuButton
                            icon={LayoutDashboard}
                            label="Dashboard"
                            sub="Your control panel."
                            onClick={handleDashboard}
                          />
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
           {!isLoggedIn ? (
  <Link
    to="/login"
    className="hover-brand-button-gradient rounded-full border border-blue-950 px-5 py-2.5 text-sm font-semibold text-blue-950 no-underline transition duration-200 hover:text-white"
  >
    Login
  </Link>
) : (
  <button
    onClick={handleLogout}
    className="rounded-full border border-blue-900 px-5 py-2.5 text-sm font-semibold text--900 transition duration-200 hover:bg-blue-500 hover:text-white"
  >
    Logout
  </button>
)}

            <Link
              to="/talk-to-expert"
              className="bg-brand-button-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-lg shadow-blue-950/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/25"
            >
              Build my Home 
            </Link>
          </div>

          <details className="group relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 text-[#211c58] transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
              <Menu size={20} />
              <span className="sr-only">Open navigation menu</span>
            </summary>
            <div className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              {[...navLinks, ...moreLinks].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f4ff] hover:text-[#4b35a4]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3 sm:hidden">
                {!isLoggedIn ? (
                  <Link to="/login" className="rounded-xl border border-[#4b35a4] px-4 py-3 text-center text-sm font-semibold text-[#4b35a4]">
                    Login
                  </Link>
                ) : (
                  <button onClick={handleLogout} className="rounded-xl border border-[#4b35a4] px-4 py-3 text-sm font-semibold text-[#4b35a4]">
                    Logout
                  </button>
                )}
                <Link to="/talk-to-expert" className="bg-brand-button-gradient rounded-xl px-4 py-3 text-center text-sm font-semibold text-white">
                  Build my Home
                </Link>
              </div>
              {isLoggedIn && (
                <button onClick={handleDashboard} className="mt-2 w-full rounded-xl bg-[#f6f4ff] px-4 py-3 text-left text-sm font-semibold text-[#4b35a4]">
                  Dashboard
                </button>
              )}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
