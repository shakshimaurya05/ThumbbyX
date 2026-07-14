import { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, ImagePlus, Plus, Save, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

const API_URL = API_BASE_URL + "/showcase-projects";

const emptyForm = {
  title: "",
  location: "",
  status: "Completed",
  type: "Residential",
  year: "",
  client: "",
  area: "",
  image: "",
  tone: "from-[#211c58] via-[#312884] to-[#f7a500]",
  intro: "",
  detail: "",
  features: "",
  imageFile: null,
};

const inputStyle = {
  width: "100%",
  border: "1px solid #DDE1EF",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  color: "#1A1B3A",
  outline: "none",
  background: "#fff",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  color: "#4B5563",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

function Field({ label, children }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

export default function ShowcaseProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("accessToken");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load showcase projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const buildFormData = () => {
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "imageFile") {
        if (value) data.append("imageFile", value);
        return;
      }

      data.append(key, value);
    });

    return data;
  };

  const saveProject = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, buildFormData(), config);
        alert("Project updated");
      } else {
        await axios.post(API_URL, buildFormData(), config);
        alert("Project added");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const editProject = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      location: project.location || "",
      status: project.status || "Completed",
      type: project.type || "Residential",
      year: project.year || "",
      client: project.client || "",
      area: project.area || "",
      image: project.image || "",
      tone: project.tone || emptyForm.tone,
      intro: project.intro || "",
      detail: project.detail || "",
      features: (project.features || []).join("\n"),
      imageFile: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete this showcase project?")) return;

    try {
      await axios.delete(`${API_URL}/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((project) => project._id !== projectId));
      alert("Project deleted");
    } catch (error) {
      console.log(error);
      alert("Failed to delete project");
    }
  };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .showcase-input:focus { border-color:#5B4FCF !important; box-shadow:0 0 0 3px rgba(91,79,207,0.12); }
        .showcase-card:hover { transform:translateY(-3px); box-shadow:0 16px 44px rgba(91,79,207,0.12) !important; }
      `}</style>

      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>
          Public Gallery
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>
          Add Projects
        </h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
          Add, edit, and delete the projects shown on the public Projects page.
        </p>
      </div>

      <form onSubmit={saveProject} style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, padding: 24, marginBottom: 26, boxShadow: "0 2px 14px rgba(91,79,207,0.06)", animation: "fadeUp 0.45s ease 0.05s forwards", opacity: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0, color: "#1A1B3A", fontSize: 18, fontWeight: 900 }}>
              {editingId ? "Edit Showcase Project" : "New Showcase Project"}
            </h2>
            <p style={{ margin: "4px 0 0", color: "#9095B0", fontSize: 12 }}>
              These fields map directly to the public card and details modal.
            </p>
          </div>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ border: "1px solid #DDE1EF", background: "#fff", color: "#5B4FCF", borderRadius: 10, padding: "9px 14px", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <X size={15} />
              Cancel Edit
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16 }}>
          <Field label="Title">
            <input className="showcase-input" required value={form.title} onChange={(e) => updateField("title", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Location">
            <input className="showcase-input" required value={form.location} onChange={(e) => updateField("location", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Status">
            <select className="showcase-input" value={form.status} onChange={(e) => updateField("status", e.target.value)} style={inputStyle}>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Near Completion</option>
            </select>
          </Field>
          <Field label="Type">
            <input className="showcase-input" required value={form.type} onChange={(e) => updateField("type", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Year">
            <input className="showcase-input" required value={form.year} onChange={(e) => updateField("year", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Client">
            <input className="showcase-input" required value={form.client} onChange={(e) => updateField("client", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Area">
            <input className="showcase-input" required value={form.area} onChange={(e) => updateField("area", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Image URL">
            <input className="showcase-input" value={form.image} onChange={(e) => updateField("image", e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Upload Image">
            <input className="showcase-input" type="file" accept="image/*" onChange={(e) => updateField("imageFile", e.target.files?.[0] || null)} style={{ ...inputStyle, padding: 8 }} />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16, marginTop: 16 }}>
          <Field label="Intro">
            <textarea className="showcase-input" required rows={4} value={form.intro} onChange={(e) => updateField("intro", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
          </Field>
          <Field label="Detail">
            <textarea className="showcase-input" required rows={4} value={form.detail} onChange={(e) => updateField("detail", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16, marginTop: 16 }}>
          <Field label="Features">
            <textarea className="showcase-input" rows={4} value={form.features} onChange={(e) => updateField("features", e.target.value)} placeholder="One feature per line" style={{ ...inputStyle, resize: "vertical" }} />
          </Field>
          <Field label="Gradient Tone">
            <textarea className="showcase-input" rows={4} value={form.tone} onChange={(e) => updateField("tone", e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
          </Field>
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" disabled={saving} style={{ background: "#5B4FCF", color: "#fff", border: "none", borderRadius: 11, padding: "11px 18px", fontSize: 12, fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 8, cursor: saving ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(91,79,207,0.3)", opacity: saving ? 0.7 : 1 }}>
            {editingId ? <Save size={16} /> : <Plus size={16} />}
            {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16 }}>
        {projects.map((project, index) => (
          <div key={project._id} className="showcase-card" style={{ background: "#fff", border: "1px solid #EAECF4", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 14px rgba(91,79,207,0.06)", transition: "all 0.25s ease", animation: `fadeUp 0.45s ease ${index * 0.05 + 0.1}s forwards`, opacity: 0 }}>
            <div style={{ height: 180, background: "#F0EEFF", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {project.image ? (
                <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <ImagePlus size={36} color="#5B4FCF" />
              )}
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div>
                  <h3 style={{ margin: "0 0 5px", color: "#1A1B3A", fontSize: 17, fontWeight: 900 }}>
                    {project.title}
                  </h3>
                  <p style={{ margin: 0, color: "#9095B0", fontSize: 12 }}>
                    {project.location} · {project.type} · {project.year}
                  </p>
                </div>
                <span style={{ height: 26, padding: "5px 10px", borderRadius: 20, background: "#F0EEFF", color: "#5B4FCF", border: "1px solid #C4BEFF", fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>
                  {project.status}
                </span>
              </div>
              <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.6, minHeight: 42, margin: "10px 0 14px" }}>
                {project.intro}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" onClick={() => editProject(project)} style={{ border: "1px solid #C4BEFF", background: "#F0EEFF", color: "#5B4FCF", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <Edit3 size={14} />
                  Edit
                </button>
                <button type="button" onClick={() => deleteProject(project._id)} style={{ border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#B91C1C", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div style={{ background: "#fff", borderRadius: 18, padding: "46px 30px", textAlign: "center", border: "1px dashed #D1D5E8" }}>
          <ImagePlus size={38} color="#5B4FCF" style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 900, color: "#1A1B3A", marginBottom: 6 }}>No showcase projects yet</div>
          <div style={{ color: "#9095B0", fontSize: 13 }}>Add one above to show it on the public Projects page.</div>
        </div>
      )}
    </AdminLayout>
  );
}
