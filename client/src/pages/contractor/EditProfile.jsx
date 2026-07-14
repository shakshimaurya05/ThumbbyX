import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Upload, CheckCircle, ArrowLeft, Save } from "lucide-react";
import ContractorSidebar from "./ContractorSidebar";
import { API_BASE_URL } from "../../services/api";

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    experienceYears: "",
    completedHouses: "",
    largestProjectSqFt: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/contractor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data.profile;
        setFormData({
          experienceYears: p.experienceYears || "",
          completedHouses: p.completedHouses || "",
          largestProjectSqFt: p.largestProjectSqFt || "",
        });
        if (p.profilePhoto?.url) setPhotoPreview(p.profilePhoto.url);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("accessToken");
    try {
      // Upload photo if changed
      if (photoFile) {
        const docForm = new FormData();
        docForm.append("profilePhoto", photoFile);
        await axios.put(API_BASE_URL + "/contractor/upload-documents", docForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Update profile fields
      await axios.put(
        API_BASE_URL + "/contractor/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully!");
      navigate("/contractor/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
        <ContractorSidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 44, height: 44, border: "3px solid #5B4FCF", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#9095B0", fontWeight: 500 }}>Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6FB", fontFamily: "'Inter', sans-serif" }}>
      <ContractorSidebar />
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EAECF4", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 10px rgba(91,79,207,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => navigate("/contractor/dashboard")}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "#F4F6FB", border: "1px solid #EAECF4", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#4A4F6A" }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1B3A" }}>Edit Profile</div>
              <div style={{ fontSize: 12, color: "#9095B0" }}>Update your photo and project details</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "32px 40px", maxWidth: 680 }}>

          {/* Photo upload card */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", marginBottom: 16 }}>
            <div style={{ fontSize: 10.5, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Profile Photo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* Preview */}
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg,#5B4FCF,#7B6FE8)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>C</span>
                )}
              </div>
              {/* Upload button */}
              <label style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F0EEFF", border: "1.5px dashed #C4BEFF", borderRadius: 10, padding: "12px 20px", transition: "all 0.2s" }}>
                  <Upload size={16} color="#5B4FCF" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#5B4FCF" }}>
                      {photoFile ? photoFile.name : "Click to upload photo"}
                    </div>
                    <div style={{ fontSize: 11, color: "#9095B0", marginTop: 2 }}>JPG, PNG up to 5MB</div>
                  </div>
                  {photoFile && <CheckCircle size={15} color="#0F6E56" style={{ marginLeft: 4 }} />}
                </div>
                <input type="file" accept="image/*" className="hidden" style={{ display: "none" }} onChange={handlePhoto} />
              </label>
            </div>
          </div>

          {/* Fields card */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #EAECF4", boxShadow: "0 1px 8px rgba(91,79,207,0.05)", marginBottom: 16 }}>
            <div style={{ fontSize: 10.5, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Project Details</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4A4F6A", display: "block", marginBottom: 6 }}>Years of Experience</label>
                <input
                  name="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  style={{ width: "100%", border: "1px solid #EAECF4", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1A1B3A", outline: "none", background: "#F8F9FC", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4A4F6A", display: "block", marginBottom: 6 }}>Houses Completed</label>
                <select
                  name="completedHouses"
                  value={formData.completedHouses}
                  onChange={handleChange}
                  style={{ width: "100%", border: "1px solid #EAECF4", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1A1B3A", outline: "none", background: "#F8F9FC", boxSizing: "border-box" }}
                >
                  <option value="">Select range</option>
                  <option value="5">5–10</option>
                  <option value="10">10–25</option>
                  <option value="25">25–50</option>
                  <option value="50">50+</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#4A4F6A", display: "block", marginBottom: 6 }}>Largest Project Completed</label>
                <select
                  name="largestProjectSqFt"
                  value={formData.largestProjectSqFt}
                  onChange={handleChange}
                  style={{ width: "100%", border: "1px solid #EAECF4", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1A1B3A", outline: "none", background: "#F8F9FC", boxSizing: "border-box" }}
                >
                  <option value="">Select size</option>
                  <option value="1000">Under 1000 Sq Ft</option>
                  <option value="2000">1000–2000 Sq Ft</option>
                  <option value="3000">2000–3000 Sq Ft</option>
                  <option value="4000">3000+ Sq Ft</option>
                </select>
              </div>

            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ width: "100%", background: "linear-gradient(90deg,#5B4FCF,#7B6FE8)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 8px 24px rgba(91,79,207,0.3)" }}
          >
            {saving ? (
              <>
                <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
                <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Saving...
              </>
            ) : (
              <><Save size={15} /> Save Changes</>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}