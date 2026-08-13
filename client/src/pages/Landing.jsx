import React, { useState, useRef, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowDown,
  Upload,
  Download,
  Share2,
  Copy,
  Printer,
  Sparkles,
  RefreshCw,
  Minus,
  Plus,
  Move,
  Users,
  User,
  Trash2,
  ChevronDown,
  Edit3,
  Check,
  Link2,
  Dices,
} from "lucide-react";

import Logo from "../components/Logo";
import FrameCard from "../components/FrameCard";
import {
  PalmTree,
  House,
  Scooter,
  Cloud,
  Camera,
  Sun,
  Bird,
  Wave,
  Zigzag,
  Coconut,
} from "../components/Decor";
import { EVENT, ROLES as MOCK_ROLES, generateId } from "../mock";
import {
  THEMES,
  FORMAT_OPTIONS,
  generateBuilderTitle,
} from "../lib/constants";

const emptySquadMember = () => ({
  id: generateId(),
  name: "",
  role: "Builder",
  stack: "",
  title: "",
  photo: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
});

const Landing = () => {
  const location = useLocation();

  // Mode: "solo" or "squad"
  const [buildMode, setBuildMode] = useState("solo");

  // Common Settings
  const [format, setFormat] = useState("card"); // "card" or "pfp"
  const [theme, setTheme] = useState("ocean"); // "ocean", "sunset", "forest", "cyber"

  // SOLO State
  const [name, setName] = useState("Aarav Sharma");
  const [role, setRole] = useState("Builder");
  const [stack, setStack] = useState("Fullstack");
  const [customTitle, setCustomTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [builderId, setBuilderId] = useState(generateId());
  const [isEditingCustomTitle, setIsEditingCustomTitle] = useState(false);
  const [isUploadingX, setIsUploadingX] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState("");

  // SQUAD State
  const [teamName, setTeamName] = useState("The Pixel Pirates");
  const [squadMembers, setSquadMembers] = useState([
    {
      id: generateId(),
      name: "Aarav Sharma",
      role: "Builder",
      stack: "Fullstack",
      title: "",
      photo: null,
      zoom: 1,
      pan: { x: 0, y: 0 },
    },
    {
      id: generateId(),
      name: "Riya Patel",
      role: "Designer",
      stack: "UI/UX",
      title: "",
      photo: null,
      zoom: 1,
      pan: { x: 0, y: 0 },
    },
  ]);

  const fileInputRef = useRef(null);
  const cardCanvasRef = useRef(null);
  const builderSectionRef = useRef(null);

  // Auto-scroll to builder if coming from /create or hash
  useEffect(() => {
    if (
      location.pathname === "/create" ||
      location.pathname === "/create/individual" ||
      location.pathname === "/create/team" ||
      location.hash === "#builder"
    ) {
      if (location.pathname === "/create/team") {
        setBuildMode("squad");
      }
      builderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const scrollToBuilder = (mode = "solo") => {
    setBuildMode(mode);
    builderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Roll a new unique ID & barcode for solo builder
  const rollNewId = () => {
    setBuilderId(generateId());
  };

  // Auto-generated builder title — dynamically updates whenever role, stack, or name changes
  const effectiveTitle = useMemo(() => {
    if (customTitle && customTitle.trim()) {
      return customTitle.trim().toUpperCase();
    }
    return generateBuilderTitle(stack, role, name);
  }, [customTitle, stack, role, name]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    // If stack was the previous role or default, clean it up so new role title generates immediately
    if (!stack || stack.toLowerCase() === role.toLowerCase()) {
      setStack(newRole === "Builder" ? "Fullstack" : newRole);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handleResetPan = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // --- ACTIONS & EXPORTS (STAY ON SAME PAGE) ---
  const handleDownloadPng = () => {
    const canvas = cardCanvasRef.current?.getCanvas?.();
    if (!canvas) {
      alert("Canvas preview is still loading...");
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = `HHGOA26-${format.toUpperCase()}-${(name || "BUILDER")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase()}-${builderId}.png`;
      link.download = filename;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, "image/png");
  };

  const handleCopyImage = async () => {
    const canvas = cardCanvasRef.current?.getCanvas?.();
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopiedStatus("copied-image");
          setTimeout(() => setCopiedStatus(""), 2500);
        } else {
          alert("Direct image clipboard copy is not supported on this browser.");
        }
      }, "image/png");
    } catch {
      alert("Could not copy image to clipboard.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedStatus("copied-link");
    setTimeout(() => setCopiedStatus(""), 2500);
  };

  // Print just the clean card graphic
  const handlePrintCard = () => {
    const canvas = cardCanvasRef.current?.getCanvas?.();
    if (!canvas) {
      window.print();
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Card — Hacker House Goa 2026</title>
          <style>
            body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-width: 100%; max-height: 95vh; object-fit: contain; }
            @media print { body { padding: 0; } img { max-width: 100%; } }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Cloudinary + Twitter intent
  const handleShareToX = async () => {
    const canvas = cardCanvasRef.current?.getCanvas?.();
    if (!canvas) return;

    try {
      setIsUploadingX(true);
      const dataUrl = canvas.toDataURL("image/png", 0.95);
      const formData = new FormData();
      formData.append("file", dataUrl);
      formData.append("upload_preset", "hhg_server");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/le7lnbsq/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      const imageUrl = data?.secure_url || "";
      openTwitter(imageUrl);
    } catch (err) {
      console.warn("Cloudinary upload fallback to direct tweet intent", err);
      openTwitter("");
    } finally {
      setIsUploadingX(false);
    }
  };

  const openTwitter = (imageUrl) => {
    const text = encodeURIComponent(
      `Check out my Hacker House Goa 2026 ${
        format === "pfp" ? "PFP" : "Builder ID"
      } (${builderId})! 🌴💻 #FrameInGoa`
    );
    const urlParam = imageUrl ? `&url=${encodeURIComponent(imageUrl)}` : "";
    window.open(
      `https://twitter.com/intent/tweet?text=${text}${urlParam}`,
      "_blank"
    );
  };

  // Squad helpers
  const updateSquadMember = (idx, patch) => {
    setSquadMembers((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, ...patch } : m))
    );
  };

  const addSquadMember = () => {
    setSquadMembers((prev) => [...prev, emptySquadMember()]);
  };

  const removeSquadMember = (idx) => {
    setSquadMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleShareSquadToX = () => {
    const text = encodeURIComponent(
      `We're ready for Hacker House Goa 2026! 🌴💻 Squad: ${teamName} (${squadMembers.length} builders) #FrameInGoa`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-hh-green dotted-bg relative overflow-x-hidden text-hh-cream">
      {/* Top Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-4 md:px-10 py-6">
        <Logo />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToBuilder("solo")}
            className="btn-yellow px-4 md:px-6 py-2.5 rounded-md flex items-center gap-2 text-sm"
          >
            <span>CREATE BADGE</span>
            <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-10 pt-4 md:pt-8 pb-32">
        {/* Decorations */}
        <Cloud className="absolute top-2 left-1/4 w-24 md:w-28 opacity-90 animate-bob-slow pointer-events-none" />
        <Cloud className="absolute top-6 right-1/3 w-20 opacity-70 animate-bob pointer-events-none" />
        <Bird className="absolute top-16 left-1/3 w-8 pointer-events-none" />
        <Bird className="absolute top-24 right-1/4 w-6 pointer-events-none" />
        <Bird className="absolute top-10 left-1/2 w-6 pointer-events-none" />
        <PalmTree
          className="absolute top-16 right-4 w-40 md:w-56 hidden sm:block animate-bob-slow pointer-events-none"
        />
        <PalmTree
          className="absolute top-8 left-0 w-32 md:w-44 opacity-90 hidden sm:block pointer-events-none"
          flip
        />
        <Coconut className="absolute top-32 left-1/4 w-4 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center pt-4">
          <div className="inline-block mb-4 chip chip-cream rotate-[-3deg]">
            BEACH × BYTES
          </div>

          <h1 className="font-display leading-[0.9] text-[54px] sm:text-[100px] md:text-[140px] lg:text-[170px] stroked-yellow relative">
            HACKER HOUSE
            <div className="absolute -top-4 right-8 md:right-24 rotate-[8deg] chip chip-cream border-dashed hidden md:inline-flex">
              &gt; frame.goa(2026)
            </div>
          </h1>

          <div className="relative -mt-4 md:-mt-8">
            <span
              className="inline-block font-display text-hh-pink text-4xl md:text-6xl rotate-[-6deg] absolute left-1/2 -translate-x-[70%] -top-4 md:-top-8"
              style={{ WebkitTextStroke: "2px #0a3d24" }}
            >
              गोवा
            </span>
            <div
              className="font-display text-hh-yellow text-[60px] sm:text-[120px] md:text-[180px] lg:text-[220px] leading-none"
              style={{ WebkitTextStroke: "3px #0a3d24" }}
            >
              GOA 2026
            </div>
            <Zigzag className="w-56 md:w-80 mx-auto mt-2 h-6" />
          </div>

          <div className="mt-8 md:mt-12 font-mono tracking-widest text-hh-cream text-xs md:text-sm">
            {EVENT.location} · {EVENT.dates}
          </div>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => scrollToBuilder("solo")}
              className="btn-yellow px-8 py-3.5 rounded-md text-sm tracking-widest flex items-center gap-2 shadow-[4px_4px_0_#ec2f89]"
            >
              BUILD SOLO ID <ArrowDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToBuilder("squad")}
              className="btn-outline px-6 py-3.5 rounded-md text-sm tracking-widest flex items-center gap-2"
            >
              BUILD SQUAD <Users className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-[10px] tracking-widest text-hh-cream/80">
            <span>SUN • CODE • SURF</span>
          </div>
        </div>

        {/* Bottom decor elements */}
        <Scooter className="absolute bottom-12 left-4 w-32 md:w-44 animate-bob pointer-events-none" />
        <House className="absolute bottom-16 right-6 w-28 md:w-40 animate-bob-slow pointer-events-none" />
        <Camera className="absolute bottom-4 right-1/3 w-16 md:w-20 animate-bob pointer-events-none" />
      </section>

      {/* Animated Ticker */}
      <div className="relative z-10 bg-hh-yellow border-y-2 border-hh-green-deep py-3 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap gap-8 font-display text-hh-green-deep text-lg">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              #FRAMEINGOA ✦ HACKER HOUSE GOA 2026 ✦ BUILD ON THE BEACH ✦ 28–31 OCT ✦
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE BUILDER STUDIO SECTION (Same-Page Flow)                      */}
      {/* ========================================================================= */}
      <section
        ref={builderSectionRef}
        id="builder"
        className="relative z-10 py-16 px-4 md:px-10 bg-hh-green-deep border-t-2 border-hh-yellow"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <div className="chip chip-pink mb-3">✦ GENERATE YOUR BADGE ✦</div>
            <h2 className="font-display text-4xl sm:text-6xl stroked-yellow leading-tight">
              BUILD YOUR IDENTITY
            </h2>
            <p className="mt-3 font-mono text-sm text-hh-cream/80 max-w-xl mx-auto">
              Create your official Hacker House Goa 2026 collectible badge or PFP.
              Customize, zoom & drag, auto-generate titles, and export directly below.
            </p>
          </div>

          {/* Mode Selector: SOLO vs SQUAD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <button
              type="button"
              onClick={() => setBuildMode("solo")}
              className={`p-5 rounded-xl text-left border-2 transition-all tape relative ${
                buildMode === "solo"
                  ? "bg-hh-cream text-hh-green-deep border-hh-yellow shadow-[6px_6px_0_#ec2f89]"
                  : "bg-hh-green-deep/80 text-hh-cream border-hh-cream/30 hover:border-hh-yellow/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-display text-2xl flex items-center gap-2">
                  <User className="w-5 h-5" /> BUILD SOLO
                </div>
                {buildMode === "solo" && (
                  <span className="chip chip-pink text-[9px]">ACTIVE</span>
                )}
              </div>
              <p
                className={`font-mono text-xs ${
                  buildMode === "solo"
                    ? "text-hh-green-deep/80"
                    : "text-hh-cream/70"
                }`}
              >
                One builder. One identity. Choose PFP or Pass Card.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setBuildMode("squad")}
              className={`p-5 rounded-xl text-left border-2 transition-all tape relative ${
                buildMode === "squad"
                  ? "bg-hh-cream text-hh-green-deep border-hh-yellow shadow-[6px_6px_0_#ec2f89]"
                  : "bg-hh-green-deep/80 text-hh-cream border-hh-cream/30 hover:border-hh-yellow/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-display text-2xl flex items-center gap-2">
                  <Users className="w-5 h-5" /> BUILD SQUAD
                </div>
                {buildMode === "squad" && (
                  <span className="chip chip-pink text-[9px]">ACTIVE</span>
                )}
              </div>
              <p
                className={`font-mono text-xs ${
                  buildMode === "squad"
                    ? "text-hh-green-deep/80"
                    : "text-hh-cream/70"
                }`}
              >
                Generate a set of cards for your whole team at once.
              </p>
            </button>
          </div>

          {/* Format & Style Tabs (Available for both Solo and Squad!) */}
          <div className="mb-8">
            <div className="font-mono text-[10px] tracking-widest text-hh-pink font-bold uppercase mb-3 text-center sm:text-left">
              FORMAT & STYLE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {FORMAT_OPTIONS.map((f) => {
                const active = format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`p-4 rounded-xl text-left border-2 transition-all ${
                      active
                        ? "bg-hh-cream text-hh-green-deep border-hh-yellow shadow-[4px_4px_0_#ec2f89]"
                        : "bg-hh-green text-hh-cream border-hh-cream/20 hover:border-hh-cream/50"
                    }`}
                  >
                    <div className="font-display text-lg">{f.name}</div>
                    <div
                      className={`font-mono text-xs mt-1 ${
                        active
                          ? "text-hh-green-deep/80"
                          : "text-hh-cream/60"
                      }`}
                    >
                      {f.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Picker */}
          <div className="mb-8">
            <div className="font-mono text-[10px] tracking-widest text-hh-pink font-bold uppercase mb-2">
              STYLE THEME
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(THEMES).map((t) => {
                const active = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`px-3.5 py-2 rounded-lg border-2 font-mono text-xs tracking-wider flex items-center gap-2 transition-all font-bold ${
                      active
                        ? "bg-hh-yellow text-hh-green-deep border-hh-yellow shadow-[3px_3px_0_#ec2f89]"
                        : "bg-hh-green text-hh-cream border-hh-cream/20 hover:border-hh-cream/50"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: t.dot }}
                    />
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SOLO BUILDER WORKSPACE                                                */}
          {/* ===================================================================== */}
          {buildMode === "solo" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form & Customizer */}
              <div className="lg:col-span-7 bg-hh-cream text-hh-green-deep rounded-2xl p-6 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                <div className="flex items-center justify-between mb-4">
                  <div className="chip chip-pink">
                    SOLO BUILDER DETAILS
                  </div>
                  {/* Unique ID Badge with Roll button */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-hh-green-deep/70">
                      PASS ID:
                    </span>
                    <input
                      type="text"
                      value={builderId}
                      onChange={(e) => setBuilderId(e.target.value.toUpperCase())}
                      className="w-24 bg-white/80 border border-hh-green-deep rounded px-1.5 py-0.5 font-mono text-[11px] font-bold text-hh-green-deep text-center focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={rollNewId}
                      className="p-1 rounded bg-hh-yellow border border-hh-green-deep text-hh-green-deep hover:bg-hh-yellow-soft"
                      title="Roll new unique ID & Barcode"
                    >
                      <Dices className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep uppercase">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name (e.g. Aarav Sharma)"
                      className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink font-bold"
                    />
                  </div>

                  {/* Role & Stack */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep uppercase">
                        ROLE / PASS
                      </label>
                      <div className="relative">
                        <select
                          value={role}
                          onChange={(e) => handleRoleChange(e.target.value)}
                          className="mt-1 w-full appearance-none bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep focus:outline-none focus:border-hh-pink font-bold cursor-pointer"
                        >
                          {MOCK_ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-hh-green-deep" />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep uppercase">
                        STACK / TECH KEYWORDS
                      </label>
                      <input
                        type="text"
                        value={stack}
                        onChange={(e) => setStack(e.target.value)}
                        placeholder="e.g. Fullstack, Rust, AI, Solana"
                        className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink font-bold"
                      />
                    </div>
                  </div>

                  {/* Dynamic Auto-Generated Builder Title Banner */}
                  <div className="p-3.5 bg-hh-green-deep/10 border-2 border-dashed border-hh-green-deep/40 rounded-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-hh-pink flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> DYNAMIC BUILDER TITLE
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setIsEditingCustomTitle(!isEditingCustomTitle)
                        }
                        className="font-mono text-[9px] font-bold text-hh-green-deep hover:text-hh-pink flex items-center gap-1 underline"
                      >
                        <Edit3 className="w-3 h-3" />
                        {isEditingCustomTitle ? "USE AUTO" : "CUSTOMIZE"}
                      </button>
                    </div>

                    {!isEditingCustomTitle ? (
                      <div className="font-mono text-xs font-bold text-hh-green-deep bg-hh-yellow/40 px-3 py-2 rounded-lg border border-hh-green-deep/30 flex items-center justify-between">
                        <span>{effectiveTitle}</span>
                        <span className="chip chip-pink text-[7px] py-0.5 px-1.5">
                          {role.toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder={`e.g. ${effectiveTitle}`}
                        className="w-full bg-white/80 border border-hh-green-deep rounded px-2.5 py-1.5 font-mono text-xs text-hh-green-deep font-bold focus:outline-none focus:border-hh-pink"
                      />
                    )}
                  </div>

                  {/* Photo Upload Box */}
                  <div>
                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep uppercase">
                      PHOTO
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handlePhotoUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-1 w-full border-2 border-dashed border-hh-green-deep rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-hh-yellow/30 transition-colors"
                    >
                      {photo ? (
                        <>
                          <img
                            src={photo}
                            alt="upload preview"
                            className="w-20 h-20 object-cover rounded-lg border-2 border-hh-green-deep shadow-sm"
                          />
                          <span className="font-mono text-[10px] tracking-widest text-hh-green-deep font-bold">
                            ✦ REPLACE PHOTO
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-hh-green-deep" />
                          <span className="font-mono text-[11px] text-hh-green-deep font-bold">
                            Click or drop your photo here
                          </span>
                          <span className="font-mono text-[9px] text-hh-green-deep/60">
                            A clear head-and-shoulders shot works best.
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Canvas Preview & ALL Action Buttons Below It */}
              <div className="lg:col-span-5 sticky top-6">
                <div className="bg-hh-cream rounded-2xl p-5 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-mono text-[10px] tracking-widest text-hh-green-deep font-bold">
                      LIVE PREVIEW
                    </div>
                    <div className="chip chip-yellow text-[9px]">
                      {format === "pfp" ? "PFP FRAME" : "BUILDER PASS"}
                    </div>
                  </div>

                  {/* Canvas Card Container */}
                  <div className="bg-hh-green-deep rounded-xl p-3 flex items-center justify-center">
                    <div className="w-full max-w-[340px]">
                      <FrameCard
                        ref={cardCanvasRef}
                        format={format}
                        name={name || "UNNAMED BUILDER"}
                        role={role}
                        stack={stack}
                        title={effectiveTitle}
                        photo={photo}
                        zoom={zoom}
                        pan={pan}
                        onPanChange={setPan}
                        theme={theme}
                        builderId={builderId}
                      />
                    </div>
                  </div>

                  {/* Photo Alignment & Zoom Controls */}
                  <div className="mt-4 border-2 border-hh-green-deep rounded-xl p-3 bg-white/40">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep">
                        PHOTO ZOOM
                      </span>
                      <span className="chip chip-pink text-[8px]">
                        ×{zoom.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                        className="w-8 h-8 rounded-md bg-hh-yellow border-2 border-hh-green-deep flex items-center justify-center font-bold text-hh-green-deep"
                      >
                        <Minus className="w-4 h-4" strokeWidth={3} />
                      </button>
                      <input
                        type="range"
                        min="1"
                        max="2.5"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="flex-1 accent-hh-pink cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}
                        className="w-8 h-8 rounded-md bg-hh-yellow border-2 border-hh-green-deep flex items-center justify-center font-bold text-hh-green-deep"
                      >
                        <Plus className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>

                    <p className="font-mono text-[9px] text-hh-green-deep/80 mt-2 text-center flex items-center justify-center gap-1">
                      <Move className="w-3 h-3 text-hh-pink" /> Drag photo
                      above to align position
                    </p>

                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={handleResetPan}
                        className="w-full border-2 border-hh-green-deep rounded-md py-1 text-hh-green-deep font-mono text-[9px] font-bold tracking-widest hover:bg-hh-yellow/30"
                      >
                        RESET POSITION
                      </button>
                    </div>
                  </div>

                  {/* Complete Export Actions Directly on the Same Page Below Card */}
                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      onClick={handleDownloadPng}
                      className="btn-yellow w-full py-3 rounded-md flex items-center justify-center gap-2 text-sm shadow-[3px_3px_0_#ec2f89]"
                    >
                      <Download className="w-4 h-4" /> DOWNLOAD PNG
                    </button>

                    <button
                      type="button"
                      onClick={handleShareToX}
                      disabled={isUploadingX}
                      className="w-full py-2.5 rounded-md flex items-center justify-center gap-2 text-xs font-black uppercase text-[#07170E] shadow-[3px_3px_0_#0a3d24] transition-transform hover:translate-y-[-1px] disabled:opacity-50"
                      style={{
                        background:
                          "linear-gradient(90deg, #F5DC3E 0%, #EA3378 100%)",
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {isUploadingX ? "UPLOADING TO X..." : "SHARE TO X ↗"}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleCopyImage}
                        className="btn-outline py-2 rounded-md flex items-center justify-center gap-1.5 text-xs text-hh-green-deep border-hh-green-deep hover:bg-hh-green-deep hover:text-hh-cream font-bold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedStatus === "copied-image"
                          ? "COPIED!"
                          : "COPY IMAGE"}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrintCard}
                        className="btn-outline py-2 rounded-md flex items-center justify-center gap-1.5 text-xs text-hh-green-deep border-hh-green-deep hover:bg-hh-green-deep hover:text-hh-cream font-bold"
                      >
                        <Printer className="w-3.5 h-3.5" /> PRINT CARD
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full py-1 font-mono text-[10px] tracking-widest text-hh-green-deep/70 hover:text-hh-green-deep flex items-center justify-center gap-1"
                    >
                      <Link2 className="w-3 h-3" />
                      {copiedStatus === "copied-link"
                        ? "LINK COPIED TO CLIPBOARD!"
                        : "COPY SHARE LINK"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SQUAD BUILDER WORKSPACE                                               */}
          {/* ===================================================================== */}
          {buildMode === "squad" && (
            <div className="space-y-8">
              {/* Squad Header Card */}
              <div className="bg-hh-cream text-hh-green-deep rounded-2xl p-6 border-2 border-hh-yellow shadow-[6px_6px_0_#0a3d24]">
                <div className="chip chip-pink mb-4">TEAM MODE</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="font-mono text-[10px] font-bold tracking-widest text-hh-green-deep uppercase">
                      TEAM / SQUAD NAME
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. The Pixel Pirates"
                      className="mt-1 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-3 py-2 font-mono text-sm text-hh-green-deep placeholder:text-hh-green-deep/40 focus:outline-none focus:border-hh-pink font-bold"
                    />
                  </div>

                  {/* Squad Batch Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleShareSquadToX}
                      className="btn-yellow px-4 py-2.5 rounded-md text-xs flex items-center gap-1.5 shadow-[3px_3px_0_#ec2f89]"
                    >
                      <Share2 className="w-4 h-4" /> SHARE SQUAD TO X
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn-outline px-3 py-2.5 rounded-md text-xs text-hh-green-deep border-hh-green-deep hover:bg-hh-green-deep hover:text-hh-cream font-bold flex items-center gap-1"
                    >
                      <Printer className="w-4 h-4" /> PRINT SHEET
                    </button>
                  </div>
                </div>
              </div>

              {/* Teammates List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs tracking-widest text-hh-yellow font-bold uppercase">
                    ROSTER ({squadMembers.length} BUILDERS) —{" "}
                    {format === "pfp" ? "PFP FRAMES" : "BUILDER PASSES"}
                  </div>
                  <button
                    type="button"
                    onClick={addSquadMember}
                    className="btn-yellow px-4 py-1.5 rounded-md text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> ADD TEAMMATE
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {squadMembers.map((m, i) => (
                    <SquadMemberCard
                      key={m.id}
                      member={m}
                      index={i}
                      format={format}
                      theme={theme}
                      teamName={teamName}
                      onChange={(patch) => updateSquadMember(i, patch)}
                      onRemove={() => removeSquadMember(i)}
                      canRemove={squadMembers.length > 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 py-10 px-4 border-t-2 border-hh-green-light text-center font-mono text-[10px] tracking-widest text-hh-cream/70 bg-hh-green">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Sun className="w-5 h-5 animate-bob" />
          <span className="font-display text-hh-yellow text-sm">
            HACKER HOUSE GOA 2026
          </span>
        </div>
        <div>
          #FRAMEINGOA • GOA, INDIA • 28–31 OCT 2026 • BEACH × BYTES
        </div>
      </footer>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <Wave className="w-full h-12" color="#1a6a3f" />
      </div>
    </div>
  );
};

/**
 * Squad Member Card Item with live Canvas, Zoom, and Download
 */
const SquadMemberCard = ({
  member,
  index,
  format,
  theme,
  teamName,
  onChange,
  onRemove,
  canRemove,
}) => {
  const fileRef = useRef(null);
  const memberCanvasRef = useRef(null);

  const squadTitle = useMemo(() => {
    return (
      member.title ||
      generateBuilderTitle(member.stack, member.role, member.name)
    );
  }, [member.title, member.stack, member.role, member.name]);

  const rollMemberId = () => {
    onChange({ id: generateId() });
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      onChange({ photo: reader.result, zoom: 1, pan: { x: 0, y: 0 } });
    reader.readAsDataURL(file);
  };

  const handleDownloadSingle = () => {
    const canvas = memberCanvasRef.current?.getCanvas?.();
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${teamName.replace(/\s+/g, "_")}-${member.name || `member_${index + 1}`}-${member.id}.png`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, "image/png");
  };

  return (
    <div className="bg-hh-cream text-hh-green-deep rounded-2xl p-5 border-2 border-hh-yellow shadow-[4px_4px_0_#0a3d24]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="chip chip-pink text-[9px]">
            MEMBER {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] text-hh-green-deep/80 font-bold">
            {member.id}
          </span>
          <button
            type="button"
            onClick={rollMemberId}
            className="p-0.5 rounded bg-hh-yellow border border-hh-green-deep text-hh-green-deep hover:bg-hh-yellow-soft"
            title="Roll new unique ID & Barcode"
          >
            <Dices className="w-3 h-3" />
          </button>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-hh-green-deep/60 hover:text-hh-pink p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Form Inputs */}
        <div className="space-y-2.5">
          <div>
            <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep uppercase">
              NAME
            </label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className="mt-0.5 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-2.5 py-1 font-mono text-xs text-hh-green-deep font-bold focus:outline-none focus:border-hh-pink"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep uppercase">
                ROLE
              </label>
              <select
                value={member.role}
                onChange={(e) => {
                  const newRole = e.target.value;
                  onChange({
                    role: newRole,
                    stack:
                      member.stack ||
                      (newRole === "Builder" ? "Fullstack" : newRole),
                  });
                }}
                className="mt-0.5 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-2 py-1 font-mono text-xs text-hh-green-deep font-bold focus:outline-none focus:border-hh-pink cursor-pointer"
              >
                {MOCK_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] font-bold tracking-widest text-hh-green-deep uppercase">
                STACK
              </label>
              <input
                type="text"
                value={member.stack}
                onChange={(e) => onChange({ stack: e.target.value })}
                placeholder="Rust, React"
                className="mt-0.5 w-full bg-transparent border-2 border-hh-green-deep rounded-md px-2.5 py-1 font-mono text-xs text-hh-green-deep font-bold focus:outline-none focus:border-hh-pink"
              />
            </div>
          </div>

          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhoto}
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex-1 border border-dashed border-hh-green-deep rounded py-1.5 font-mono text-[9px] font-bold text-hh-green-deep hover:bg-hh-yellow/30 flex items-center justify-center gap-1"
              >
                <Upload className="w-3 h-3" />
                {member.photo ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
              </button>
              <button
                type="button"
                onClick={handleDownloadSingle}
                className="px-2.5 py-1.5 bg-hh-yellow border border-hh-green-deep rounded text-hh-green-deep font-mono text-[9px] font-bold hover:bg-hh-yellow-soft flex items-center gap-1"
                title="Download single card"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div className="bg-hh-green-deep rounded-xl p-2 flex items-center justify-center">
          <div className="w-full max-w-[170px]">
            <FrameCard
              ref={memberCanvasRef}
              format={format}
              name={member.name || `BUILDER ${index + 1}`}
              role={member.role}
              stack={member.stack || member.role}
              title={squadTitle}
              photo={member.photo}
              zoom={member.zoom || 1}
              pan={member.pan || { x: 0, y: 0 }}
              onPanChange={(p) => onChange({ pan: p })}
              theme={theme}
              builderId={member.id}
              thumb
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;