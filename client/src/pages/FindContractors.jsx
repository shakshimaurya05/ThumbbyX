import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import findHero from "../assets/hero-contractor.png";
import { Link } from "react-router-dom";
import {
  Star,
  Briefcase,
  Building,
  X,
  ArrowUpRight,
  Shield,
  Hammer,
  House,
  HardHat,
  ArrowLeft,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import axios from "axios";

// SVG line-art landmark icons — one per city, monochrome, uses currentColor
const CityIcon = ({ city, size = 16, className = "" }) => {
  const s = size;
  const icons = {
    "All Cities": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M3 14h22M14 3C10 7 8 10.5 8 14s2 7 6 11M14 3c4 4 6 7.5 6 11s-2 7-6 11" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5.5 8h17M5.5 20h17" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    "Patna": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <ellipse cx="14" cy="18" rx="11" ry="6" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M3 18 Q3 8 14 5 Q25 8 25 18" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <line x1="14" y1="5" x2="14" y2="2" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="14" cy="2" r="1" fill="currentColor"/>
        <path d="M6 18 Q6 12 14 10 Q22 12 22 18" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 1.5"/>
      </svg>
    ),
    "Gaya": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="10" y="20" width="8" height="4" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 20 L10 14 Q14 10 18 14 L18 20" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M12 14 L12 10 Q14 7 16 10 L16 14" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M13 10 L13 7 Q14 5 15 7 L15 10" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="14" y1="5" x2="14" y2="3" stroke="currentColor" strokeWidth="1"/>
        <line x1="8" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="6" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Muzaffarpur": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M4 22 L4 14 L14 8 L24 14 L24 22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M4 14 L14 8 L24 14" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="10" y="16" width="8" height="6" stroke="currentColor" strokeWidth="1"/>
        <rect x="5" y="16" width="4" height="4" stroke="currentColor" strokeWidth="1"/>
        <rect x="19" y="16" width="4" height="4" stroke="currentColor" strokeWidth="1"/>
        <line x1="2" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Bhagalpur": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 18 Q14 6 26 18" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <line x1="2" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="8" y1="18" x2="10" y2="13" stroke="currentColor" strokeWidth="1"/>
        <line x1="14" y1="18" x2="14" y2="10" stroke="currentColor" strokeWidth="1"/>
        <line x1="20" y1="18" x2="18" y2="13" stroke="currentColor" strokeWidth="1"/>
        <line x1="2" y1="18" x2="2" y2="22" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="26" y1="18" x2="26" y2="22" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="0" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Darbhanga": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="10" width="22" height="14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M3 10 L3 6 L10 6 L10 10" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M18 10 L18 6 L25 6 L25 10" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M10 6 Q14 2 18 6" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="11" y="16" width="6" height="8" stroke="currentColor" strokeWidth="1"/>
        <line x1="5" y1="14" x2="9" y2="14" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="19" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="0.9"/>
      </svg>
    ),
    "Purnia": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="8" y="8" width="12" height="16" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M6 8 L14 3 L22 8" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="11" y="17" width="6" height="7" stroke="currentColor" strokeWidth="1"/>
        <line x1="10" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="10" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Arrah": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="2" y="14" width="24" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="3" y="10" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="9" y="10" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="15" y="10" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="21" y="10" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="11" y="17" width="6" height="7" stroke="currentColor" strokeWidth="1"/>
        <line x1="0" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Begusarai": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="10" y="4" width="5" height="18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="7" y="4" width="3" height="12" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="15" y="8" width="6" height="14" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M7 22 L5 26 L23 26 L21 22" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="8" y1="4" x2="8" y2="2" stroke="currentColor" strokeWidth="1"/>
        <line x1="12" y1="4" x2="12" y2="2" stroke="currentColor" strokeWidth="1"/>
        <line x1="18" y1="8" x2="18" y2="6" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    "Katihar": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <line x1="14" y1="2" x2="14" y2="24" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="10" y="4" width="8" height="12" stroke="currentColor" strokeWidth="1.1" rx="1" fill="none"/>
        <circle cx="14" cy="8" r="2" stroke="currentColor" strokeWidth="1"/>
        <circle cx="14" cy="13" r="2" stroke="currentColor" strokeWidth="1"/>
        <path d="M4 24 L14 20 L24 24" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="2" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Munger": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M4 16 Q4 12 8 12 L22 12 Q24 12 24 14 Q24 16 22 16 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="22" y1="13" x2="26" y2="11" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="7" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="16" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="2" y1="21" x2="26" y2="21" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    "Chhapra": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 22 L2 18 L6 18 L6 15 L10 15 L10 12 L14 12 L14 9 L18 9 L18 12 L22 12 L22 15 L26 15 L26 18 L26 22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M2 22 Q14 19 26 22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M2 25 Q14 22 26 25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    "Ranchi": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 6 L10 6 L10 14 L14 14 L14 6 L26 6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M10 14 Q10 20 8 26" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M12 14 Q12 20 11 26" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 2"/>
        <path d="M14 14 Q14 20 13 26" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 2"/>
        <line x1="2" y1="6" x2="2" y2="26" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="26" y1="6" x2="26" y2="10" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Hazaribagh": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 22 Q6 14 10 16 Q12 10 14 8 Q16 10 18 16 Q22 14 26 22" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M14 8 L14 4" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 16 Q4 12 6 10 Q8 12 6 16" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M22 16 Q20 12 22 10 Q24 12 22 16" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="2" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Bokaro": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="14" width="6" height="10" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="11" y="10" width="6" height="14" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="19" y="12" width="6" height="12" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="5" y1="14" x2="5" y2="10" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="14" y1="10" x2="14" y2="6" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="22" y1="12" x2="22" y2="8" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="1" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Dhanbad": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M10 24 L10 8 L14 4 L18 8 L18 24" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="10" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1"/>
        <line x1="14" y1="8" x2="14" y2="16" stroke="currentColor" strokeWidth="1"/>
        <circle cx="14" cy="17" r="2" stroke="currentColor" strokeWidth="1"/>
        <rect x="5" y="20" width="18" height="4" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="3" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Kolkata": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <line x1="1" y1="17" x2="27" y2="17" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1 17 L5 8 L8 17" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M27 17 L23 8 L20 17" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M5 8 L14 4 L23 8" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="8" y1="17" x2="10" y2="10" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="11" y1="17" x2="12" y2="8" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="14" y1="17" x2="14" y2="6" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="17" y1="17" x2="16" y2="8" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="20" y1="17" x2="18" y2="10" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="1" y1="17" x2="1" y2="22" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="27" y1="17" x2="27" y2="22" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="0" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Delhi NCR": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M11 24 L11 16 L10 12 L11 8 L12 6 L14 4 L16 6 L17 8 L18 12 L17 16 L17 24" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="11" y1="24" x2="17" y2="24" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1"/>
        <line x1="10" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1"/>
        <line x1="11" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="0.9"/>
        <path d="M12 6 Q14 3 16 6" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="7" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Lucknow": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="14" width="22" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M3 14 Q14 6 25 14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="8" y1="14" x2="8" y2="8" stroke="currentColor" strokeWidth="1"/>
        <line x1="20" y1="14" x2="20" y2="8" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 8 Q8 5 10 8" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M18 8 Q20 5 22 8" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <rect x="11" y="18" width="6" height="6" stroke="currentColor" strokeWidth="1"/>
        <path d="M11 18 Q14 15 17 18" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="1" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Kanpur": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M6 20 Q6 10 14 7 Q22 10 22 20" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="6" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="14" y1="7" x2="14" y2="4" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M12 4 Q14 2 16 4" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M8 20 Q8 14 14 12 Q20 14 20 20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1.5"/>
        <rect x="10" y="20" width="8" height="4" stroke="currentColor" strokeWidth="1"/>
        <line x1="4" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Ghaziabad": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 18 Q8 12 14 12 Q20 12 26 18" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <line x1="2" y1="18" x2="2" y2="24" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="26" y1="18" x2="26" y2="24" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="14" y1="12" x2="14" y2="24" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="8" y1="14" x2="8" y2="24" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="20" y1="14" x2="20" y2="24" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="0" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="0" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2"/>
      </svg>
    ),
    "Gurugram": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="9" y="4" width="10" height="20" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="4" y="10" width="5" height="14" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="19" y="12" width="5" height="12" stroke="currentColor" strokeWidth="1" fill="none"/>
        <line x1="12" y1="4" x2="12" y2="24" stroke="currentColor" strokeWidth="0.7"/>
        <line x1="16" y1="4" x2="16" y2="24" stroke="currentColor" strokeWidth="0.7"/>
        <line x1="9" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="0.7"/>
        <line x1="9" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="0.7"/>
        <line x1="9" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth="0.7"/>
        <line x1="14" y1="4" x2="14" y2="2" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="2" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Aligarh": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="8" width="8" height="16" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="17" y="8" width="8" height="16" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M11 14 Q14 8 17 14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="11" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1"/>
        <line x1="11" y1="24" x2="17" y2="24" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="5" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="19" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="5" y1="16" x2="9" y2="16" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="19" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="1" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Varanasi": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M2 22 L2 18 L6 18 L6 15 L10 15 L10 12 L14 12" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M14 12 L14 8 L16 6 L18 8 L18 12" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M15 8 L14 6 Q16 3 18 6 L17 8" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="16" y1="3" x2="16" y2="1" stroke="currentColor" strokeWidth="1"/>
        <line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1"/>
        <line x1="18" y1="12" x2="26" y2="18" stroke="currentColor" strokeWidth="1"/>
        <line x1="26" y1="18" x2="2" y2="22" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M2 23 Q14 21 26 23" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    "Mumbai": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="14" width="6" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="19" y="14" width="6" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M9 18 Q14 8 19 18" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <line x1="9" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M5 14 L5 10 Q5 7 8 7 L8 14" stroke="currentColor" strokeWidth="1"/>
        <path d="M20 14 L20 10 Q20 7 23 7 L23 14" stroke="currentColor" strokeWidth="1"/>
        <path d="M8 7 Q14 4 20 7" stroke="currentColor" strokeWidth="1"/>
        <line x1="1" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Pune": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="4" y="10" width="20" height="14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M4 10 L4 6 L8 6 L8 10" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M20 10 L20 6 L24 6 L24 10" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M8 6 Q14 2 20 6" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="11" y="17" width="6" height="7" stroke="currentColor" strokeWidth="1"/>
        <path d="M11 17 Q14 14 17 17" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="6" y1="14" x2="10" y2="14" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="18" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="2" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Bangalore": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="3" y="16" width="22" height="8" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M7 16 L7 12 L10 12 L10 16" stroke="currentColor" strokeWidth="1"/>
        <path d="M18 16 L18 12 L21 12 L21 16" stroke="currentColor" strokeWidth="1"/>
        <path d="M10 12 L10 9 L18 9 L18 12" stroke="currentColor" strokeWidth="1"/>
        <path d="M10 9 Q14 5 18 9" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="14" y1="5" x2="14" y2="3" stroke="currentColor" strokeWidth="1"/>
        <circle cx="14" cy="3" r="1" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="1" y1="24" x2="27" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Hyderabad": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="10" y="14" width="8" height="10" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M10 14 Q14 10 18 14" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="10" y1="14" x2="8" y2="4" stroke="currentColor" strokeWidth="1.1"/>
        <line x1="18" y1="14" x2="20" y2="4" stroke="currentColor" strokeWidth="1.1"/>
        <path d="M7 7 Q8 4 9 7" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M19 7 Q20 4 21 7" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="8" y1="4" x2="8" y2="2" stroke="currentColor" strokeWidth="1"/>
        <line x1="20" y1="4" x2="20" y2="2" stroke="currentColor" strokeWidth="1"/>
        <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Chennai": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="8" y="18" width="12" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M8 18 L9 14 L11 10 L13 7 L14 5 L15 7 L17 10 L19 14 L20 18" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="9" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="11" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="13" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="14" y1="5" x2="14" y2="3" stroke="currentColor" strokeWidth="1"/>
        <rect x="11" y="20" width="6" height="4" stroke="currentColor" strokeWidth="1"/>
        <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Ahmedabad": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <path d="M4 8 L8 8 L8 12 L12 12 L12 16 L16 16 L16 20 L20 20 L20 24" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <path d="M24 8 L20 8 L20 12 L16 12 L16 16 L12 16 L12 20 L8 20 L8 24" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="4" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="2" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1"/>
        <line x1="4" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Surat": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="4" y="12" width="20" height="12" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="4" y="8" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="12" y="8" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="20" y="8" width="4" height="5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <rect x="11" y="17" width="6" height="7" stroke="currentColor" strokeWidth="1"/>
        <line x1="7" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="18" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="0.9"/>
        <line x1="2" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    "Vadodara": (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
        <rect x="9" y="14" width="10" height="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M9 14 L9 10 L11 8 L14 6 L17 8 L19 10 L19 14" stroke="currentColor" strokeWidth="1.1" fill="none"/>
        <line x1="9" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="0.9"/>
        <path d="M11 8 Q14 5 17 8" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <line x1="14" y1="6" x2="14" y2="3" stroke="currentColor" strokeWidth="1"/>
        <path d="M12 3 Q14 1 16 3" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <rect x="5" y="18" width="4" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="19" y="18" width="4" height="6" stroke="currentColor" strokeWidth="1" fill="none"/>
        <line x1="3" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  };

  return icons[city] || (
    <svg width={s} height={s} viewBox="0 0 28 28" fill="none" className={className}>
      <rect x="9" y="6" width="10" height="18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M7 6 L14 2 L21 6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <rect x="11" y="16" width="6" height="8" stroke="currentColor" strokeWidth="1"/>
      <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
};

const cities = [
  "All Cities","Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Purnia","Arrah",
  "Begusarai","Katihar","Munger","Chhapra","Ranchi","Hazaribagh","Bokaro","Dhanbad",
  "Kolkata","Delhi","Delhi NCR","Lucknow","Kanpur","Ghaziabad","Gurugram","Aligarh",
  "Varanasi","Mumbai","Pune","Bangalore","Hyderabad","Chennai","Ahmedabad",
  "Surat","Vadodara",
];

export default function FindContractors() {
  const [contractors, setContractors] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const availableCities = ["Patna", "Delhi", "Delhi NCR"];
  const isComingSoonCity = selectedCity !== "All Cities" && !availableCities.includes(selectedCity);

  const filteredContractors =
    selectedCity === "All Cities"
      ? contractors
      : contractors.filter((c) => c.city === selectedCity);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const res = await axios.get(API_BASE_URL + "/contractor/public");
        setContractors(res.data.contractors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContractors();
  }, []);

  console.log(contractors);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#fbfaff]">

        {/* ── Hero ── */}
        <div
          className="relative min-h-[85vh] flex items-center bg-cover bg-center bg-fixed overflow-hidden py-28"
          style={{ backgroundImage: `url(${findHero})` }}
        >
          <div className="absolute inset-0 bg-black/80" />

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center w-full"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4b35a4]/40 bg-[#4b35a4]/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c4b8ff] backdrop-blur">
              <Shield size={11} />
              Find Contractors
            </span>

            <h1 className="text-white text-[36px] sm:text-[44px] md:text-7xl font-black mt-6 leading-[1.02] tracking-tight">
              Hire Trusted
              <span className="block bg-brand-button-gradient bg-clip-text text-transparent">
                Construction Experts
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-white/65 text-[14px] sm:text-[15px] font-medium leading-7 px-2">
              Browse verified contractors, compare experience, review completed
              projects, and connect with the right professional for your dream home.
            </p>
          </motion.div>
        </div>

        {/* ── City Filter ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#17133f] rounded-2xl p-5 sm:p-7 flex flex-col items-center gap-5 w-full max-w-md shadow-[0_32px_80px_rgba(23,19,63,0.28)] border border-white/8"
          >
            <div className="text-center">
              <h3 className="text-white text-lg sm:text-xl font-black mt-1 tracking-tight">
                Find Contractors In Your City
              </h3>
              <p className="text-white/40 text-[13px] mt-1.5 font-medium">
                Select your city to see verified contractors near you
              </p>
            </div>

            <button
              onClick={() => setShowCityModal(true)}
              className="w-full flex items-center justify-between bg-white/6 text-white pl-4 pr-4 py-3.5 rounded-xl border border-white/10 hover:border-[#4b35a4]/60 transition font-medium text-[14px]"
            >
              <div className="flex items-center gap-2">
                {/* City SVG icon replacing MapPin */}
                <span className="text-[#8a74ff] flex-shrink-0">
                  <CityIcon city={selectedCity} size={16} />
                </span>
                <span className={selectedCity === "All Cities" ? "text-white/35" : "text-white"}>
                  {selectedCity === "All Cities" ? "Choose a city..." : selectedCity}
                </span>
              </div>
              <span className="text-white/30 text-xs">▾</span>
            </button>

            {selectedCity !== "All Cities" && (
              <div className="w-full bg-[#4b35a4]/15 border border-[#4b35a4]/30 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#8a74ff] text-[13px] font-medium">
                  {/* City SVG icon replacing MapPin */}
                  <span className="flex-shrink-0">
                    <CityIcon city={selectedCity} size={13} />
                  </span>
                  Showing: <span className="text-white font-bold ml-1">{selectedCity}</span>
                </div>
                <button
                  onClick={() => setSelectedCity("All Cities")}
                  className="text-white/35 hover:text-white text-xs underline"
                >
                  Clear
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── City Modal ── */}
        {showCityModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100d2e]/75 backdrop-blur-xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-5 sm:p-7 w-full max-w-4xl shadow-[0_40px_100px_rgba(8,8,32,0.4)] max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#211c58] tracking-tight">Select Your City</h3>
                  <p className="text-slate-400 text-[12px] mt-1 font-medium">
                    Choose from {cities.length - 1} cities across India
                  </p>
                </div>
                <button
                  onClick={() => setShowCityModal(false)}
                  className="rounded-full bg-[#f6f4ff] p-2.5 text-[#211c58] hover:bg-[#4b35a4] hover:text-white transition flex-shrink-0"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setShowCityModal(false); }}
                    className={`flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3.5 rounded-xl border text-[11px] sm:text-[12px] font-semibold transition-all duration-200 ${
                      selectedCity === city
                        ? "bg-brand-button-gradient text-white border-transparent shadow-[0_8px_20px_rgba(75,53,164,0.3)]"
                        : "bg-[#f8f6ff] text-[#211c58] border-[#ece9ff] hover:border-[#4b35a4]/40 hover:bg-[#f0edff]"
                    }`}
                  >
                    {/* City SVG landmark icon replacing MapPin */}
                    <span className={selectedCity === city ? "text-white" : "text-[#4b35a4]"}>
                      <CityIcon city={city} size={20} />
                    </span>
                    <span className="text-center leading-tight">{city}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {isComingSoonCity ? (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2rem] bg-[#17133f] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[0_30px_80px_rgba(23,19,63,0.2)]"
            >
              <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-[#7058e8]/30 blur-3xl" />
              <div className="absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-[#a994ff]/25 blur-3xl" />
              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#c9beff] shadow-lg">
                  <HardHat size={31} strokeWidth={1.6} />
                </div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b9aaff]">Expanding soon</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">We’re coming to {selectedCity}</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-white/65 sm:text-[15px]">
                  Our verified contractor network is growing. We’re getting ready to make home construction simpler and more dependable in your city.
                </p>

                <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
                  {[
                    { icon: <Hammer size={19} />, title: "Verified contractors", text: "Trusted professionals for every build." },
                    { icon: <House size={19} />, title: "Home construction", text: "From planning through handover." },
                    { icon: <Shield size={19} />, title: "Quality you can trust", text: "Clear, reliable support at every step." },
                  ].map((service) => (
                    <div key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
                      <div className="mb-4 w-fit rounded-xl bg-[#8a74ff]/20 p-2.5 text-[#c9beff]">{service.icon}</div>
                      <h3 className="text-sm font-bold text-white">{service.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-white/55">{service.text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCity("All Cities")}
                  className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#211c58] transition hover:-translate-y-0.5 hover:bg-[#eeeaff]"
                >
                  <ArrowLeft size={15} />
                  Browse available cities
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#4b35a4]">
              Verified Professionals
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#211c58] mt-2 tracking-tight">
              All Contractors
            </h2>
            <p className="text-slate-400 text-[13px] mt-2 font-medium">
              Showing {filteredContractors.length} verified contractors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredContractors.map((contractor, index) => (
              <motion.div
                key={contractor._id}
                initial={{
                  opacity: 0,
                  x: index % 3 === 0 ? -40 : index % 3 === 1 ? 40 : 0,
                  y: index % 3 === 2 ? 40 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#211c58]/8 shadow-[0_12px_40px_rgba(33,28,88,0.07)] transition duration-300 hover:shadow-[0_20px_56px_rgba(75,53,164,0.14)]"
              >
                {/* Photo */}
              <div className="relative h-44 overflow-hidden bg-[#f0edff] flex items-center justify-center">
  {contractor.profilePhoto?.url ? (
    <img
      src={contractor.profilePhoto.url}
      alt={contractor.userId?.fullName || "Contractor"}
      className="h-full w-full object-cover transition duration-500 hover:scale-105"
    />
  ) : (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-[#f0edff] to-[#e8e2ff]">
      <div className="h-16 w-16 rounded-full bg-[#4b35a4]/15 flex items-center justify-center">
        <span className="text-2xl font-black text-[#4b35a4]">
          {(contractor.userId?.fullName || "C").charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-[#211c58]/30 to-transparent" />
  <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]">
    <Shield size={10} />
    Verified
  </div>
</div>

                {/* Body */}
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-[14px] sm:text-[15px] font-black text-[#211c58] leading-snug">
                      {contractor.userId?.fullName}
                    </h3>
                    <div className="flex items-center gap-1 text-[#4b35a4] text-[13px] font-bold shrink-0">
                      <Star size={13} fill="currentColor" />
                      {contractor.rating}
                    </div>
                  </div>

                  {/* City with SVG landmark icon replacing MapPin */}
                  <div className="flex items-center gap-1.5 text-slate-400 mt-2 text-[12px] font-medium">
                    <span className="text-[#8a74ff] flex-shrink-0">
                      <CityIcon city={contractor.city} size={13} />
                    </span>
                    {contractor.city}
                  </div>

                  <div className="mt-3 inline-block bg-[#f7f5ff] border border-[#ece9ff] px-3 py-1 rounded-full text-[11px] font-semibold text-[#4b35a4]">
                    {contractor.specialization}
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4">
                    <div className="bg-[#f8f6ff] border border-[#ece9ff] p-3 rounded-xl">
                      <Briefcase size={14} className="text-[#4b35a4] mb-1.5" />
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.1em]">
                        Experience
                      </p>
                      <p className="font-black text-[13px] text-[#211c58] mt-0.5">
                        {contractor.experienceYears} Years
                      </p>
                    </div>
                    <div className="bg-[#f8f6ff] border border-[#ece9ff] p-3 rounded-xl">
                      <Building size={14} className="text-[#4b35a4] mb-1.5" />
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.1em]">
                        Projects
                      </p>
                      <p className="font-black text-[13px] text-[#211c58] mt-0.5">
                        {contractor.completedHouses}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/contractors/${contractor._id}`}
                    className="bg-brand-button-gradient w-full mt-4 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(75,53,164,0.24)] transition hover:-translate-y-0.5"
                  >
                    View Profile
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}
      </section>
      <Footer />
    </>
  );
}
