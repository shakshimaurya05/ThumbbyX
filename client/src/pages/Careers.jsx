import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BriefcaseBusiness, CheckCircle2, Clock3, MapPin, Search, Send, Users, X } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_BASE_URL } from "../services/api";

const blankApplication = { fullName: "", email: "", phone: "", coverLetter: "", resume: null };

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const [department, setDepartment] = useState("");
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(blankApplication);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/careers`)
      .then((res) => setCareers(res.data.careers || []))
      .catch(() => toast.error("Unable to load current openings"))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal], main section, main article");
    elements.forEach((element) => element.classList.add("career-reveal"));

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("career-visible")), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));

    const contactLink = document.querySelector('a[href="mailto:careers@thumbbyx.com"]');

    if (contactLink) {
      contactLink.setAttribute("href", "/contact");
      contactLink.textContent = "Contact our team";
    }
    return () => observer.disconnect();
  }, [loading]);
  const departments = useMemo(() =>
    [...new Set(careers.map((item) => item.department))], [careers]);
  const filtered = careers.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) && (!type || item.employmentType === type) && (!mode || item.workMode === mode) && (!department || item.department === department));

  const apply = async (event) => {
    event.preventDefault();
    if (!application.resume) return toast.error("Please upload your resume.");
    const data = new FormData();
    Object.entries(application).forEach(([key, value]) => data.append(key, value || ""));
    data.append("careerId", job._id);
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/careers/apply`, data, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Application submitted successfully. We’ll be in touch!");
      setJob(null); setApplication(blankApplication);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit application");
    }
    finally { setSubmitting(false); }
  };

  return <><Navbar />
    <style>{`.career-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}.career-visible{opacity:1;transform:translateY(0)}.career-delay-1{transition-delay:.12s}.career-delay-2{transition-delay:.24s}@media(prefers-reduced-motion:reduce){.career-reveal{opacity:1;transform:none;transition:none}}`}</style>
    <main className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-[#312884] px-5 py-20 text-center text-white sm:px-8 lg:py-28">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center">
          <span data-reveal className="career-reveal inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
            <BriefcaseBusiness size={15} /> Careers at ThumbbyX</span>
          <h1 data-reveal className="career-reveal career-delay-1 mt-6 text-4xl font-black leading-tight sm:text-6xl">Build meaningful spaces. Build your future.</h1>
          <p data-reveal className="career-reveal career-delay-2 mt-6 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">Join a team reshaping how people plan, build, and experience their dream homes.</p>
          <a data-reveal href="#openings" className="career-reveal career-delay-2 bg-brand-button-gradient mt-8 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white no-underline shadow-lg transition hover:-translate-y-0.5">Explore open roles</a>
        </div>
      </section>
      <section data-reveal className="career-reveal bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-indigo-600">Why join us</p>
          <h2 className="mt-3 text-center text-3xl font-black text-blue-950">Do your best work, with people who care.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[["Impact from day one", "Your ideas shape how thousands of families build their homes."], ["Grow with the challenge", "Take on ambitious problems and keep expanding your craft."], ["People-first culture", "Work with a thoughtful, supportive, and driven team."]].map(([title, text], index) =>
              <div data-reveal key={title}
                className="career-reveal rounded-2xl bg-slate-50 p-6"
                style={{ transitionDelay: `${index * 100}ms` }}>
                <h3 className="font-extrabold text-blue-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            )
            }
          </div>
        </div>
      </section>
      <section id="openings" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Current openings</p>
            <h2 className="mt-2 text-3xl font-black text-blue-950">Find your next opportunity.</h2>
          </div>
          <span className="text-sm font-semibold text-slate-500">{filtered.length} role{filtered.length === 1 ? "" : "s"} available</span>
        </div>
        <div className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><Search size={16} className="text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job title"
              className="w-full py-3 text-sm outline-none" />
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm">
            <option value="">All employment types</option>
            {["Internship", "Full Time", "Part Time", "Contract", "Freelance"].map(x => <option key={x}>{x}</option>
            )
            }
          </select>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm">
            <option value="">All work modes</option>
            {["Remote", "Hybrid", "Onsite"].map(x => <option key={x}>{x}</option>
            )
            }
          </select>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-3 text-sm">
            <option value="">All departments</option>{departments.map(x => <option key={x}>{x}</option>
            )
            }
          </select>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {!loading && filtered.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{item.department}</p>
                <h3 className="mt-2 text-xl font-black text-blue-950">{item.title}</h3>
              </div>
              <span className="h-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Open</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">{item.employmentType}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">{item.workMode}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><MapPin size={12} />{item.location}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-500">
              <span>Experience: <b className="text-slate-700">{item.experience}</b>
              </span>
              <span>Salary: <b className="text-slate-700">{item.salary || "Discussed on application"}</b>
              </span>
              <span>Openings: <b className="text-slate-700">{item.openings}</b></span>{item.duration && <span>Duration: <b className="text-slate-700">{item.duration}</b></span>
              }
            </div>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="text-xs text-slate-400">Posted {new Date(item.createdAt).toLocaleDateString()}</span>
              <button onClick={() => setJob(item)} className="bg-brand-button-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5"><Send size={14} />Apply now</button>
            </div>
          </article>
          )}
          {!loading && !filtered.length &&
            <p className="col-span-full rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-500">No openings match your search right now.</p>
          }
        </div>
      </section>
      <section className="bg-blue-950 px-5 py-16 text-center text-white">
        <h2 className="text-3xl font-black">Not seeing the perfect role?</h2>
        <p className="mx-auto mt-3 max-w-xl text-indigo-100">We’re always interested in meeting thoughtful people who want to shape the future of home building.</p>
        <a href="mailto:careers@thumbbyx.com" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-950 no-underline">Email our team</a>
      </section>
    </main>
    <Footer />
    {job &&
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4">
        <form onSubmit={apply} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Apply for</p>
              <h2 className="mt-1 text-2xl font-black text-blue-950">{job.title}</h2>
            </div>
            <button type="button" onClick={() => setJob(null)}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><X />
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[["fullName", "Full name", "text"],
            ["email", "Email address", "email"],
            ["phone", "Mobile number", "tel"]].map(([key, label, inputType]) =>
              <label key={key} className={key === "fullName" ? "sm:col-span-2" : ""}>
                <span className="mb-1 block text-sm font-bold text-slate-700">{label}</span>
                <input required type={inputType} value={application[key]} onChange={e => setApplication({ ...application, [key]: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-500" />
              </label>
            )
            }
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-bold text-slate-700">Resume (PDF, DOC, or DOCX; max 10 MB)</span>
              <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setApplication({ ...application, resume: e.target.files?.[0] })} className="w-full rounded-xl border border-slate-200 p-2 text-sm" />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-bold text-slate-700">Cover letter <em className="font-normal">(optional)</em></span>
              <textarea rows="4" value={application.coverLetter} onChange={e => setApplication({ ...application, coverLetter: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-indigo-500" />
            </label>
          </div>
          <button disabled={submitting} className="bg-brand-button-gradient mt-6 w-full rounded-xl py-3 text-sm font-bold text-white disabled:opacity-70">{submitting ? "Submitting application..." : "Submit application"}
          </button>
        </form>
      </div>
    }
  </>;
}
