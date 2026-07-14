import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { API_BASE_URL } from "../../services/api";

// SVG Circular progress ring
function CircleProgress({ pct, size = 88, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EEF0F7" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke="url(#pg)" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }}
      />
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B4FCF" />
          <stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          API_BASE_URL + "/projects/customer/my-projects",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .proj-card:hover { transform:translateY(-5px) !important; box-shadow:0 20px 56px rgba(91,79,207,0.14) !important; border-color:#C4BEFF !important; }
        .view-btn:hover { background:#4A3FBF !important; transform:translateX(3px); }
      `}</style>

      <Sidebar />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{ background:"#fff", borderBottom:"1px solid #EAECF4", padding:"0 40px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 10px rgba(91,79,207,0.05)", animation:"fadeIn 0.4s ease" }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#1A1B3A", letterSpacing:"-0.3px" }}>My Projects</div>
            <div style={{ fontSize:12, color:"#9095B0" }}>All your active and past builds</div>
          </div>
          <span style={{ fontSize:12, background:"#F0EEFF", color:"#5B4FCF", border:"1px solid #C4BEFF", padding:"5px 16px", borderRadius:20, fontWeight:700 }}>
            {projects.length} Project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div style={{ padding:"36px 40px" }}>

          {/* Quote */}
          <div style={{ animation:"fadeUp 0.5s ease forwards", opacity:0, marginBottom:28 }}>
            <div style={{ fontSize:11, color:"#5B4FCF", fontWeight:700, letterSpacing:"1.4px", textTransform:"uppercase", marginBottom:6 }}>Your Builds</div>
            <h1 style={{ fontSize:26, fontWeight:900, color:"#1A1B3A", margin:"0 0 8px", letterSpacing:"-0.5px" }}>My Projects</h1>
            <p style={{ fontSize:13, color:"#6B7280", margin:0, lineHeight:1.7 }}>
              "Every great home starts with a plan. Here's yours — live, tracked, and fully transparent."
            </p>
          </div>

          {/* Stats row */}
          {projects.length > 0 && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:28, animation:"fadeUp 0.5s ease 0.07s forwards", opacity:0 }}>
              {[
                { label:"Total Projects", val:projects.length, icon:"🏗️", color:"#5B4FCF", bg:"#F0EEFF" },
                { label:"In Progress", val:projects.filter(p=>p.status!=="completed").length, icon:"⚡", color:"#0F6E56", bg:"#E6F7F2" },
                { label:"Avg. Progress", val: Math.round(projects.reduce((a,p)=>a+(p.progressPercentage||0),0)/projects.length)+"%", icon:"📈", color:"#B45309", bg:"#FEF3E2" },
              ].map(s => (
                <div key={s.label} style={{ background:"#fff", borderRadius:16, padding:"18px 20px", border:"1px solid #EAECF4", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 10px rgba(91,79,207,0.05)" }}>
                  <div style={{ width:44, height:44, background:s.bg, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:22, fontWeight:900, color:s.color, letterSpacing:"-0.8px" }}>{s.val}</div>
                    <div style={{ fontSize:11, color:"#9095B0", fontWeight:600 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {projects.map((project, i) => {
              const pct = project.progressPercentage || 0;
              const sc = project.status === "completed"
                ? { text:"#0F6E56", bg:"#E6F7F2", border:"#9FE1CB" }
                : project.status === "planning"
                ? { text:"#B45309", bg:"#FEF3E2", border:"#FAC775" }
                : { text:"#5B4FCF", bg:"#F0EEFF", border:"#C4BEFF" };

              return (
                <div key={project._id} className="proj-card" style={{
                  background:"#fff", borderRadius:20, padding:"28px 30px",
                  border:"1px solid #EAECF4", boxShadow:"0 2px 18px rgba(91,79,207,0.07)",
                  transition:"all 0.3s ease",
                  animation:`fadeUp 0.5s ease ${i*0.09+0.14}s forwards`, opacity:0,
                  display:"flex", alignItems:"center", gap:28,
                }}>
                  {/* Circular progress */}
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <CircleProgress pct={pct} />
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ fontSize:16, fontWeight:900, color:"#5B4FCF", letterSpacing:"-0.5px", lineHeight:1 }}>{pct}%</div>
                      <div style={{ fontSize:9, color:"#9095B0", fontWeight:600, marginTop:2 }}>Overall</div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                      <div>
                        <h2 style={{ fontSize:18, fontWeight:900, color:"#1A1B3A", margin:"0 0 4px", letterSpacing:"-0.3px" }}>{project.projectName}</h2>
                        <div style={{ fontSize:12, color:"#9095B0" }}>
                          {pct < 30 ? "🏗 Just getting started" : pct < 70 ? "⚡ Building in progress" : "🎯 Almost ready!"}
                        </div>
                      </div>
                      <span style={{ fontSize:11, padding:"5px 13px", borderRadius:20, fontWeight:700, color:sc.text, background:sc.bg, border:`1px solid ${sc.border}`, textTransform:"capitalize", flexShrink:0, marginLeft:12 }}>
                        {project.status}
                      </span>
                    </div>

                    {/* Bar */}
                    <div style={{ background:"#EEF0F7", borderRadius:8, height:7, overflow:"hidden", marginBottom:6 }}>
                      <div style={{
                        height:7, borderRadius:8,
                        background:"linear-gradient(90deg,#5B4FCF,#7B6FE8)",
                        width:`${pct}%`, transition:"width 1.2s ease",
                      }} />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14 }}>
                      <div style={{ fontSize:12, color:"#B0B5C8" }}>Progress: <strong style={{ color:"#5B4FCF" }}>{pct}%</strong></div>
                      <Link to={`/customer/project/${project._id}`} className="view-btn" style={{
                        background:"#5B4FCF", color:"#fff", textDecoration:"none",
                        padding:"9px 20px", borderRadius:10, fontWeight:700, fontSize:13,
                        boxShadow:"0 3px 14px rgba(91,79,207,0.3)", transition:"all 0.2s ease",
                        display:"inline-flex", alignItems:"center", gap:6,
                      }}>View Project →</Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {projects.length === 0 && (
              <div style={{ background:"#fff", borderRadius:20, padding:"64px 40px", textAlign:"center", border:"1px dashed #D1D5E8", animation:"fadeUp 0.5s ease 0.15s forwards", opacity:0 }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🏗️</div>
                <div style={{ fontWeight:800, fontSize:17, color:"#1A1B3A", marginBottom:8 }}>No projects yet</div>
                <div style={{ fontSize:13, color:"#9095B0", lineHeight:1.6 }}>Your first build is just one step away.<br/>Contact us to get started.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
