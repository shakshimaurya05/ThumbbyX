import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_BASE_URL } from "../../services/api";

export default function VideoReviewsPage() {
  const [videoReviews, setVideoReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    youtube: "",
    image: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(API_BASE_URL + "/reviews/videos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideoReviews(res.data.videoReviews || []);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.city || !formData.youtube) {
      alert("Please provide name, city, and YouTube link.");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        API_BASE_URL + "/reviews/admin/videos",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideoReviews([res.data.videoReview, ...videoReviews]);
      setFormData({ name: "", city: "", youtube: "", image: "" });
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Unable to save video review.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this video review?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/reviews/admin/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideoReviews(videoReviews.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Unable to delete video review.");
    }
  };

  return (
    <AdminLayout>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        .input:hover, .input:focus { border-color:#5B4FCF !important; }
        .delete-btn:hover { background:#FEE2E2 !important; }
      `}</style>

      <div style={{ marginBottom: 24, animation: "fadeUp 0.4s ease forwards", opacity: 0 }}>
        <div style={{ fontSize: 11, color: "#5B4FCF", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", marginBottom: 6 }}>Reviews</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1A1B3A", margin: "0 0 6px", letterSpacing: "-0.6px" }}>Video Review Links</h1>
        <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Create and manage verified customer video testimonials for the public Reviews page.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 22, marginBottom: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 26, border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#1A1B3A", marginBottom: 14 }}>Add New Video Review</div>
          {[
            { label: "Reviewer Name", name: "name", placeholder: "e.g. Amit Kumar" },
            { label: "City", name: "city", placeholder: "e.g. Patna" },
            { label: "YouTube URL", name: "youtube", placeholder: "https://www.youtube.com/watch?v=..." },
            { label: "Image URL (optional)", name: "image", placeholder: "Poster image URL" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#4B5563", marginBottom: 6 }}>{field.label}</label>
              <input
                className="input"
                type="text"
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                style={{
                  width: "100%",
                  border: "1px solid #D1D5DB",
                  borderRadius: 12,
                  padding: "13px 14px",
                  outline: "none",
                  fontSize: 14,
                  color: "#1F2937",
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            style={{
              background: "#5B4FCF",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {isSaving ? "Saving..." : "Add Video Review"}
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 26, border: "1px solid #EAECF4", boxShadow: "0 2px 16px rgba(91,79,207,0.06)" }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: "#1A1B3A", marginBottom: 14 }}>Recent Video Reviews</div>
          {videoReviews.length === 0 ? (
            <div style={{ color: "#6B7280", fontSize: 13 }}>No video reviews have been added yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {videoReviews.map((video) => (
                <div key={video._id} style={{ padding: 14, borderRadius: 14, background: "#F8F9FC", display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>{video.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{video.city}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(video._id)}
                      className="delete-btn"
                      style={{
                        background: "#FEE2E2",
                        border: "1px solid #FECACA",
                        color: "#991B1B",
                        borderRadius: 10,
                        padding: "8px 12px",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <a href={video.youtube} target="_blank" rel="noreferrer" style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700, wordBreak: "break-all" }}>{video.youtube}</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
