import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import {
  EDM_TAXONOMY,
  midiToName,
  SCALE_DEGREES,
  NOTE_NAMES,
  generateProceduralProgression,
  getHarmonicStyle,
  GeneratedChord,
  ArpType,
  generateBarNotes,
  RHYTHM_PATTERNS,
  SlicedNote,
} from "./data";

import {
  Layers,
  Sparkles,
  Sliders,
  Dices,
  Play,
  Square,
  FileAudio,
  FileCode,
  Download,
  Zap,
  Palette,
  Shuffle,
  ChevronRight,
  Activity,
  RotateCcw,
  MousePointer,
  Wand2,
} from "lucide-react";

// Creative, high-contrast EDM hardware and club themes
interface Theme {
  id: string;
  name: string;
  badge: string;
  bgGradient: string;
  cardBorder: string;
  headerAccent: string;
  panelBg: string;
  accentText: string;
  chordCardBg: string;
  chordCardBorder: string;
  chordCardActiveBg: string;
  chordCardActiveBorder: string;
  pianoRollBg: string;
  noteGradient: string;
  primaryBtn: string;
}

const THEMES: Theme[] = [
  {
    id: "cyberpunk",
    name: "Neon Mirage Synthwave",
    badge: "from-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(6,182,212,0.4)]",
    bgGradient: "from-zinc-900 via-zinc-950 to-black",
    cardBorder: "border-cyan-900/40",
    headerAccent: "text-cyan-400",
    panelBg: "bg-black/60",
    accentText: "text-cyan-300",
    chordCardBg: "bg-cyan-950/20",
    chordCardBorder: "border-cyan-500/20",
    chordCardActiveBg: "bg-cyan-950/70",
    chordCardActiveBorder: "border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    pianoRollBg: "bg-[#0d121a]",
    noteGradient: "from-cyan-400 via-teal-300 to-emerald-300 border-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    primaryBtn: "border-cyan-500/50 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/60",
  },
  {
    id: "acid",
    name: "Radioactive Slime Acid Techno",
    badge: "from-lime-500 to-emerald-600 shadow-[0_0_8px_rgba(132,204,22,0.4)]",
    bgGradient: "from-zinc-950 via-zinc-900 to-black",
    cardBorder: "border-lime-900/50",
    headerAccent: "text-lime-400",
    panelBg: "bg-zinc-950/80",
    accentText: "text-lime-300",
    chordCardBg: "bg-lime-950/25",
    chordCardBorder: "border-lime-500/20",
    chordCardActiveBg: "bg-lime-950/70",
    chordCardActiveBorder: "border-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]",
    pianoRollBg: "bg-[#111710]",
    noteGradient: "from-lime-400 via-emerald-400 to-green-300 border-lime-200 shadow-[0_0_8px_rgba(163,230,53,0.8)]",
    primaryBtn: "border-lime-500/50 bg-lime-950/40 text-lime-200 hover:bg-lime-900/60",
  },
  {
    id: "deep-house",
    name: "Velvet Horizon Deep House",
    badge: "from-amber-500 to-rose-600 shadow-[0_0_8px_rgba(244,63,94,0.4)]",
    bgGradient: "from-slate-950 via-purple-950/40 to-black",
    cardBorder: "border-rose-900/40",
    headerAccent: "text-amber-400",
    panelBg: "bg-slate-900/60",
    accentText: "text-amber-300",
    chordCardBg: "bg-rose-950/25",
    chordCardBorder: "border-rose-500/20",
    chordCardActiveBg: "bg-amber-950/70",
    chordCardActiveBorder: "border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]",
    pianoRollBg: "bg-[#18101a]",
    noteGradient: "from-amber-400 via-rose-400 to-orange-300 border-amber-200 shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    primaryBtn: "border-rose-500/50 bg-rose-950/40 text-rose-200 hover:bg-rose-900/60",
  },
  {
    id: "industrial",
    name: "Steel Foundry Industrial EBM",
    badge: "from-orange-600 to-amber-700 shadow-[0_0_8px_rgba(234,88,12,0.4)]",
    bgGradient: "from-stone-950 via-zinc-950 to-neutral-950",
    cardBorder: "border-orange-950",
    headerAccent: "text-orange-500",
    panelBg: "bg-stone-900/70",
    accentText: "text-orange-400",
    chordCardBg: "bg-orange-950/25",
    chordCardBorder: "border-orange-600/20",
    chordCardActiveBg: "bg-orange-950/70",
    chordCardActiveBorder: "border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]",
    pianoRollBg: "bg-[#181412]",
    noteGradient: "from-orange-500 via-amber-500 to-yellow-400 border-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
    primaryBtn: "border-orange-500/50 bg-orange-950/40 text-orange-200 hover:bg-orange-900/60",
  },
  {
    id: "future-bass",
    name: "Akihabara Glitch Future Bass",
    badge: "from-fuchsia-500 to-pink-600 shadow-[0_0_8px_rgba(217,70,239,0.4)]",
    bgGradient: "from-zinc-950 via-slate-950 to-indigo-950/50",
    cardBorder: "border-fuchsia-900/40",
    headerAccent: "text-fuchsia-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-pink-300",
    chordCardBg: "bg-fuchsia-950/25",
    chordCardBorder: "border-fuchsia-500/20",
    chordCardActiveBg: "bg-fuchsia-950/70",
    chordCardActiveBorder: "border-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.5)]",
    pianoRollBg: "bg-[#170f20]",
    noteGradient: "from-fuchsia-400 via-pink-400 to-indigo-300 border-fuchsia-200 shadow-[0_0_8px_rgba(232,121,249,0.8)]",
    primaryBtn: "border-fuchsia-500/50 bg-fuchsia-950/40 text-fuchsia-200 hover:bg-fuchsia-900/60",
  },
  {
    id: "liquid-dnb",
    name: "Bioluminescent Trench Liquid DnB",
    badge: "from-teal-400 to-cyan-600 shadow-[0_0_8px_rgba(45,212,191,0.4)]",
    bgGradient: "from-slate-950 via-cyan-950/30 to-black",
    cardBorder: "border-teal-900/50",
    headerAccent: "text-teal-400",
    panelBg: "bg-slate-950/80",
    accentText: "text-teal-300",
    chordCardBg: "bg-teal-950/25",
    chordCardBorder: "border-teal-500/20",
    chordCardActiveBg: "bg-teal-950/70",
    chordCardActiveBorder: "border-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.5)]",
    pianoRollBg: "bg-[#0b1618]",
    noteGradient: "from-teal-300 via-cyan-400 to-sky-300 border-teal-200 shadow-[0_0_8px_rgba(45,212,191,0.8)]",
    primaryBtn: "border-teal-500/50 bg-teal-950/40 text-teal-200 hover:bg-teal-900/60",
  },
  {
    id: "melodic-techno",
    name: "Monolithic Void Melodic Techno",
    badge: "from-sky-500 to-blue-700 shadow-[0_0_8px_rgba(14,165,233,0.4)]",
    bgGradient: "from-slate-950 via-neutral-950 to-black",
    cardBorder: "border-sky-900/40",
    headerAccent: "text-sky-400",
    panelBg: "bg-neutral-950/80",
    accentText: "text-sky-300",
    chordCardBg: "bg-sky-950/25",
    chordCardBorder: "border-sky-500/20",
    chordCardActiveBg: "bg-sky-950/70",
    chordCardActiveBorder: "border-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.5)]",
    pianoRollBg: "bg-[#0f141c]",
    noteGradient: "from-sky-400 via-blue-400 to-cyan-300 border-sky-200 shadow-[0_0_8px_rgba(14,165,233,0.8)]",
    primaryBtn: "border-sky-500/50 bg-sky-950/40 text-sky-200 hover:bg-sky-900/60",
  },
  {
    id: "uplifting-trance",
    name: "Astral Aurora Uplifting Trance",
    badge: "from-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(59,130,246,0.4)]",
    bgGradient: "from-slate-950 via-blue-950/40 to-black",
    cardBorder: "border-blue-900/50",
    headerAccent: "text-blue-400",
    panelBg: "bg-slate-900/70",
    accentText: "text-blue-300",
    chordCardBg: "bg-blue-950/25",
    chordCardBorder: "border-blue-500/20",
    chordCardActiveBg: "bg-blue-950/70",
    chordCardActiveBorder: "border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]",
    pianoRollBg: "bg-[#0d1322]",
    noteGradient: "from-blue-400 via-indigo-300 to-cyan-300 border-blue-200 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    primaryBtn: "border-blue-500/50 bg-blue-950/40 text-blue-200 hover:bg-blue-900/60",
  },
  {
    id: "french-touch",
    name: "Rouge Starlight French Touch",
    badge: "from-red-500 to-amber-600 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
    bgGradient: "from-zinc-950 via-red-950/30 to-black",
    cardBorder: "border-red-900/40",
    headerAccent: "text-red-400",
    panelBg: "bg-zinc-900/70",
    accentText: "text-amber-300",
    chordCardBg: "bg-red-950/20",
    chordCardBorder: "border-red-500/20",
    chordCardActiveBg: "bg-red-950/70",
    chordCardActiveBorder: "border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
    pianoRollBg: "bg-[#1a0e10]",
    noteGradient: "from-red-400 via-amber-400 to-yellow-300 border-amber-200 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    primaryBtn: "border-red-500/50 bg-red-950/40 text-red-200 hover:bg-red-900/60",
  },
  {
    id: "nu-disco",
    name: "Chrome Flamingo Nu Disco",
    badge: "from-pink-500 to-rose-600 shadow-[0_0_8px_rgba(236,72,153,0.4)]",
    bgGradient: "from-zinc-950 via-pink-950/30 to-black",
    cardBorder: "border-pink-900/40",
    headerAccent: "text-pink-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-pink-300",
    chordCardBg: "bg-pink-950/20",
    chordCardBorder: "border-pink-500/20",
    chordCardActiveBg: "bg-pink-950/70",
    chordCardActiveBorder: "border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.5)]",
    pianoRollBg: "bg-[#180e18]",
    noteGradient: "from-pink-400 via-rose-400 to-amber-300 border-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.8)]",
    primaryBtn: "border-pink-500/50 bg-pink-950/40 text-pink-200 hover:bg-pink-900/60",
  },
  {
    id: "neurofunk",
    name: "Subatomic Fission Neurofunk",
    badge: "from-emerald-500 to-green-700 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    bgGradient: "from-zinc-950 via-emerald-950/30 to-black",
    cardBorder: "border-emerald-900/50",
    headerAccent: "text-emerald-400",
    panelBg: "bg-zinc-950/80",
    accentText: "text-emerald-300",
    chordCardBg: "bg-emerald-950/20",
    chordCardBorder: "border-emerald-500/20",
    chordCardActiveBg: "bg-emerald-950/70",
    chordCardActiveBorder: "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    pianoRollBg: "bg-[#0c1612]",
    noteGradient: "from-emerald-400 via-green-400 to-lime-300 border-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    primaryBtn: "border-emerald-500/50 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60",
  },
  {
    id: "tearout",
    name: "Magma Cataclysm Tearout Dubstep",
    badge: "from-rose-600 to-red-700 shadow-[0_0_8px_rgba(225,29,72,0.4)]",
    bgGradient: "from-neutral-950 via-red-950/30 to-black",
    cardBorder: "border-rose-950",
    headerAccent: "text-rose-500",
    panelBg: "bg-neutral-900/80",
    accentText: "text-rose-400",
    chordCardBg: "bg-rose-950/25",
    chordCardBorder: "border-rose-600/20",
    chordCardActiveBg: "bg-rose-950/70",
    chordCardActiveBorder: "border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.5)]",
    pianoRollBg: "bg-[#180f12]",
    noteGradient: "from-rose-500 via-red-500 to-orange-400 border-rose-300 shadow-[0_0_8px_rgba(225,29,72,0.8)]",
    primaryBtn: "border-rose-500/50 bg-rose-950/40 text-rose-200 hover:bg-rose-900/60",
  },
  {
    id: "progressive-house",
    name: "Solaris Orbit Progressive House",
    badge: "from-cyan-600 to-blue-700 shadow-[0_0_8px_rgba(8,145,178,0.4)]",
    bgGradient: "from-slate-950 via-cyan-950/40 to-black",
    cardBorder: "border-cyan-900/50",
    headerAccent: "text-cyan-300",
    panelBg: "bg-slate-900/80",
    accentText: "text-cyan-200",
    chordCardBg: "bg-cyan-950/25",
    chordCardBorder: "border-cyan-600/20",
    chordCardActiveBg: "bg-cyan-950/70",
    chordCardActiveBorder: "border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    pianoRollBg: "bg-[#0b171c]",
    noteGradient: "from-cyan-400 via-sky-400 to-blue-300 border-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    primaryBtn: "border-cyan-500/50 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/60",
  },
  {
    id: "ambient",
    name: "Petrichor Mist Ambient Chillout",
    badge: "from-teal-600 to-emerald-700 shadow-[0_0_8px_rgba(13,148,136,0.4)]",
    bgGradient: "from-zinc-950 via-teal-950/20 to-black",
    cardBorder: "border-teal-900/30",
    headerAccent: "text-teal-300",
    panelBg: "bg-zinc-900/60",
    accentText: "text-teal-200",
    chordCardBg: "bg-teal-950/20",
    chordCardBorder: "border-teal-600/20",
    chordCardActiveBg: "bg-teal-950/60",
    chordCardActiveBorder: "border-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.4)]",
    pianoRollBg: "bg-[#0e1616]",
    noteGradient: "from-teal-300 via-emerald-300 to-cyan-200 border-teal-100 shadow-[0_0_8px_rgba(20,184,166,0.7)]",
    primaryBtn: "border-teal-500/40 bg-teal-950/30 text-teal-200 hover:bg-teal-900/50",
  },
  {
    id: "hardstyle",
    name: "Supernova Stadium Hardstyle",
    badge: "from-amber-500 to-orange-600 shadow-[0_0_8px_rgba(245,158,11,0.4)]",
    bgGradient: "from-neutral-950 via-amber-950/40 to-black",
    cardBorder: "border-amber-900/50",
    headerAccent: "text-amber-400",
    panelBg: "bg-neutral-900/80",
    accentText: "text-amber-300",
    chordCardBg: "bg-amber-950/25",
    chordCardBorder: "border-amber-500/20",
    chordCardActiveBg: "bg-amber-950/70",
    chordCardActiveBorder: "border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    pianoRollBg: "bg-[#18130d]",
    noteGradient: "from-amber-400 via-orange-400 to-yellow-300 border-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    primaryBtn: "border-amber-500/50 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60",
  },
  {
    id: "ukg",
    name: "London Fog 2-Step Garage",
    badge: "from-yellow-500 to-amber-600 shadow-[0_0_8px_rgba(234,179,8,0.4)]",
    bgGradient: "from-zinc-950 via-stone-950 to-black",
    cardBorder: "border-yellow-900/40",
    headerAccent: "text-yellow-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-yellow-300",
    chordCardBg: "bg-yellow-950/20",
    chordCardBorder: "border-yellow-500/20",
    chordCardActiveBg: "bg-yellow-950/70",
    chordCardActiveBorder: "border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)]",
    pianoRollBg: "bg-[#18160e]",
    noteGradient: "from-yellow-400 via-amber-300 to-orange-300 border-yellow-200 shadow-[0_0_8px_rgba(234,179,8,0.8)]",
    primaryBtn: "border-yellow-500/50 bg-yellow-950/40 text-yellow-200 hover:bg-yellow-900/60",
  },
  {
    id: "trip-hop",
    name: "Cigarette Smoke Trip Hop",
    badge: "from-purple-600 to-indigo-800 shadow-[0_0_8px_rgba(147,51,234,0.4)]",
    bgGradient: "from-zinc-950 via-purple-950/30 to-black",
    cardBorder: "border-purple-900/40",
    headerAccent: "text-purple-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-purple-300",
    chordCardBg: "bg-purple-950/20",
    chordCardBorder: "border-purple-600/20",
    chordCardActiveBg: "bg-purple-950/70",
    chordCardActiveBorder: "border-purple-400 shadow-[0_0_12px_rgba(147,51,234,0.5)]",
    pianoRollBg: "bg-[#140e1a]",
    noteGradient: "from-purple-400 via-indigo-400 to-pink-300 border-purple-200 shadow-[0_0_8px_rgba(147,51,234,0.8)]",
    primaryBtn: "border-purple-500/50 bg-purple-950/40 text-purple-200 hover:bg-purple-900/60",
  },
  {
    id: "psytrance",
    name: "Chillum Hallucination Psytrance",
    badge: "from-emerald-400 to-violet-600 shadow-[0_0_8px_rgba(52,211,153,0.4)]",
    bgGradient: "from-slate-950 via-violet-950/30 to-black",
    cardBorder: "border-violet-900/40",
    headerAccent: "text-emerald-400",
    panelBg: "bg-slate-900/80",
    accentText: "text-violet-300",
    chordCardBg: "bg-violet-950/25",
    chordCardBorder: "border-emerald-500/20",
    chordCardActiveBg: "bg-emerald-950/70",
    chordCardActiveBorder: "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]",
    pianoRollBg: "bg-[#120d1c]",
    noteGradient: "from-emerald-400 via-cyan-400 to-purple-400 border-emerald-200 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    primaryBtn: "border-emerald-500/50 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60",
  },
  {
    id: "complextro",
    name: "Arcade Overclock Complextro",
    badge: "from-violet-500 to-yellow-500 shadow-[0_0_8px_rgba(139,92,246,0.4)]",
    bgGradient: "from-zinc-950 via-zinc-900 to-black",
    cardBorder: "border-violet-800/40",
    headerAccent: "text-yellow-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-violet-300",
    chordCardBg: "bg-violet-950/20",
    chordCardBorder: "border-yellow-500/20",
    chordCardActiveBg: "bg-violet-950/70",
    chordCardActiveBorder: "border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
    pianoRollBg: "bg-[#14121a]",
    noteGradient: "from-yellow-400 via-amber-400 to-violet-400 border-yellow-200 shadow-[0_0_8px_rgba(250,204,21,0.8)]",
    primaryBtn: "border-yellow-500/50 bg-yellow-950/40 text-yellow-200 hover:bg-yellow-900/60",
  },
  {
    id: "lofi-beats",
    name: "Cassette Tapehead Lo-Fi Beats",
    badge: "from-indigo-400 to-rose-400 shadow-[0_0_8px_rgba(129,140,248,0.4)]",
    bgGradient: "from-slate-950 via-slate-900 to-black",
    cardBorder: "border-indigo-900/40",
    headerAccent: "text-indigo-300",
    panelBg: "bg-slate-900/70",
    accentText: "text-rose-300",
    chordCardBg: "bg-indigo-950/20",
    chordCardBorder: "border-rose-400/20",
    chordCardActiveBg: "bg-indigo-950/70",
    chordCardActiveBorder: "border-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.5)]",
    pianoRollBg: "bg-[#10131e]",
    noteGradient: "from-indigo-300 via-purple-300 to-rose-300 border-indigo-200 shadow-[0_0_8px_rgba(129,140,248,0.8)]",
    primaryBtn: "border-indigo-500/50 bg-indigo-950/40 text-indigo-200 hover:bg-indigo-900/60",
  },
  {
    id: "color-bass",
    name: "Prismatic Kaleidoscope Color Bass",
    badge: "from-sky-400 via-fuchsia-500 to-amber-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]",
    bgGradient: "from-zinc-950 via-purple-950/40 to-black",
    cardBorder: "border-fuchsia-900/40",
    headerAccent: "text-sky-300",
    panelBg: "bg-zinc-900/80",
    accentText: "text-fuchsia-300",
    chordCardBg: "bg-fuchsia-950/20",
    chordCardBorder: "border-sky-500/20",
    chordCardActiveBg: "bg-fuchsia-950/70",
    chordCardActiveBorder: "border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]",
    pianoRollBg: "bg-[#140e1e]",
    noteGradient: "from-sky-300 via-fuchsia-400 to-amber-300 border-sky-200 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
    primaryBtn: "border-sky-500/50 bg-sky-950/40 text-sky-200 hover:bg-sky-900/60",
  },
  {
    id: "big-room",
    name: "Mainstage Laser Storm Big Room",
    badge: "from-blue-600 to-cyan-500 shadow-[0_0_8px_rgba(37,99,235,0.4)]",
    bgGradient: "from-neutral-950 via-blue-950/40 to-black",
    cardBorder: "border-blue-800/40",
    headerAccent: "text-blue-400",
    panelBg: "bg-neutral-900/80",
    accentText: "text-cyan-300",
    chordCardBg: "bg-blue-950/25",
    chordCardBorder: "border-cyan-500/20",
    chordCardActiveBg: "bg-blue-950/70",
    chordCardActiveBorder: "border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    pianoRollBg: "bg-[#0c121e]",
    noteGradient: "from-blue-400 via-cyan-400 to-teal-300 border-blue-200 shadow-[0_0_8px_rgba(37,99,235,0.8)]",
    primaryBtn: "border-blue-500/50 bg-blue-950/40 text-blue-200 hover:bg-blue-900/60",
  },
  {
    id: "schranz",
    name: "Concrete Bunker Schranz Techno",
    badge: "from-red-600 to-orange-700 shadow-[0_0_8px_rgba(220,38,38,0.4)]",
    bgGradient: "from-stone-950 via-red-950/30 to-black",
    cardBorder: "border-red-900/50",
    headerAccent: "text-red-500",
    panelBg: "bg-stone-950/80",
    accentText: "text-orange-400",
    chordCardBg: "bg-red-950/25",
    chordCardBorder: "border-red-600/20",
    chordCardActiveBg: "bg-red-950/70",
    chordCardActiveBorder: "border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]",
    pianoRollBg: "bg-[#180d0d]",
    noteGradient: "from-red-500 via-orange-500 to-amber-400 border-red-300 shadow-[0_0_8px_rgba(220,38,38,0.8)]",
    primaryBtn: "border-red-500/50 bg-red-950/40 text-red-200 hover:bg-red-900/60",
  },
  {
    id: "vaporwave",
    name: "Plaza Palms Vaporwave",
    badge: "from-purple-400 via-pink-400 to-teal-300 shadow-[0_0_8px_rgba(192,132,252,0.4)]",
    bgGradient: "from-slate-950 via-purple-950/30 to-black",
    cardBorder: "border-purple-800/40",
    headerAccent: "text-pink-300",
    panelBg: "bg-slate-900/80",
    accentText: "text-teal-300",
    chordCardBg: "bg-purple-950/20",
    chordCardBorder: "border-teal-400/20",
    chordCardActiveBg: "bg-purple-950/70",
    chordCardActiveBorder: "border-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.5)]",
    pianoRollBg: "bg-[#130f1c]",
    noteGradient: "from-pink-300 via-purple-300 to-teal-300 border-pink-100 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    primaryBtn: "border-pink-400/50 bg-pink-950/40 text-pink-200 hover:bg-pink-900/60",
  },
  {
    id: "jersey-club",
    name: "Brick City Jersey Club",
    badge: "from-blue-500 to-yellow-400 shadow-[0_0_8px_rgba(59,130,246,0.4)]",
    bgGradient: "from-zinc-950 via-blue-950/30 to-black",
    cardBorder: "border-yellow-500/30",
    headerAccent: "text-yellow-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-blue-300",
    chordCardBg: "bg-blue-950/20",
    chordCardBorder: "border-yellow-400/20",
    chordCardActiveBg: "bg-blue-950/70",
    chordCardActiveBorder: "border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
    pianoRollBg: "bg-[#0e1320]",
    noteGradient: "from-yellow-400 via-amber-300 to-blue-400 border-yellow-200 shadow-[0_0_8px_rgba(250,204,21,0.8)]",
    primaryBtn: "border-yellow-500/50 bg-yellow-950/40 text-yellow-200 hover:bg-yellow-900/60",
  },
  {
    id: "dub-techno",
    name: "Submerged Echoes Dub Techno",
    badge: "from-emerald-600 to-teal-800 shadow-[0_0_8px_rgba(5,150,105,0.4)]",
    bgGradient: "from-slate-950 via-zinc-950 to-black",
    cardBorder: "border-emerald-900/40",
    headerAccent: "text-emerald-300",
    panelBg: "bg-slate-950/90",
    accentText: "text-teal-300",
    chordCardBg: "bg-emerald-950/20",
    chordCardBorder: "border-emerald-600/20",
    chordCardActiveBg: "bg-emerald-950/70",
    chordCardActiveBorder: "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    pianoRollBg: "bg-[#0b1411]",
    noteGradient: "from-emerald-400 via-teal-400 to-cyan-300 border-emerald-200 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    primaryBtn: "border-emerald-500/40 bg-emerald-950/30 text-emerald-200 hover:bg-emerald-900/50",
  },
  {
    id: "speed-garage",
    name: "Redline RPM Speed Garage",
    badge: "from-yellow-400 to-lime-500 shadow-[0_0_8px_rgba(250,204,21,0.4)]",
    bgGradient: "from-zinc-950 via-neutral-950 to-black",
    cardBorder: "border-lime-900/40",
    headerAccent: "text-lime-300",
    panelBg: "bg-zinc-900/80",
    accentText: "text-yellow-300",
    chordCardBg: "bg-lime-950/20",
    chordCardBorder: "border-lime-500/20",
    chordCardActiveBg: "bg-lime-950/70",
    chordCardActiveBorder: "border-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]",
    pianoRollBg: "bg-[#12160c]",
    noteGradient: "from-lime-300 via-yellow-400 to-emerald-300 border-lime-200 shadow-[0_0_8px_rgba(163,230,53,0.8)]",
    primaryBtn: "border-lime-500/50 bg-lime-950/40 text-lime-200 hover:bg-lime-900/60",
  },
  {
    id: "italo-disco",
    name: "Intergalactic Strobe Italo Disco",
    badge: "from-fuchsia-500 to-cyan-400 shadow-[0_0_8px_rgba(217,70,239,0.4)]",
    bgGradient: "from-slate-950 via-purple-950/40 to-black",
    cardBorder: "border-fuchsia-800/40",
    headerAccent: "text-fuchsia-400",
    panelBg: "bg-slate-900/80",
    accentText: "text-cyan-300",
    chordCardBg: "bg-fuchsia-950/20",
    chordCardBorder: "border-cyan-400/20",
    chordCardActiveBg: "bg-fuchsia-950/70",
    chordCardActiveBorder: "border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.5)]",
    pianoRollBg: "bg-[#140e1e]",
    noteGradient: "from-fuchsia-400 via-pink-400 to-cyan-300 border-fuchsia-200 shadow-[0_0_8px_rgba(217,70,239,0.8)]",
    primaryBtn: "border-fuchsia-500/50 bg-fuchsia-950/40 text-fuchsia-200 hover:bg-fuchsia-900/60",
  },
  {
    id: "breakbeat",
    name: "Warehouse Riot Nu Skool Breaks",
    badge: "from-orange-500 to-teal-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]",
    bgGradient: "from-zinc-950 via-zinc-900 to-black",
    cardBorder: "border-orange-900/40",
    headerAccent: "text-orange-400",
    panelBg: "bg-zinc-900/80",
    accentText: "text-teal-300",
    chordCardBg: "bg-orange-950/20",
    chordCardBorder: "border-teal-500/20",
    chordCardActiveBg: "bg-orange-950/70",
    chordCardActiveBorder: "border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]",
    pianoRollBg: "bg-[#16120e]",
    noteGradient: "from-orange-400 via-amber-400 to-teal-300 border-orange-200 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
    primaryBtn: "border-orange-500/50 bg-orange-950/40 text-orange-200 hover:bg-orange-900/60",
  },
  {
    id: "chicago-house",
    name: "Paradise Garage Classic Chicago House",
    badge: "from-red-600 to-zinc-400 shadow-[0_0_8px_rgba(220,38,38,0.4)]",
    bgGradient: "from-neutral-950 via-zinc-900 to-black",
    cardBorder: "border-red-900/40",
    headerAccent: "text-red-400",
    panelBg: "bg-neutral-900/80",
    accentText: "text-zinc-300",
    chordCardBg: "bg-red-950/20",
    chordCardBorder: "border-zinc-700/30",
    chordCardActiveBg: "bg-red-950/70",
    chordCardActiveBorder: "border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
    pianoRollBg: "bg-[#161111]",
    noteGradient: "from-red-400 via-amber-300 to-zinc-200 border-red-200 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    primaryBtn: "border-red-500/50 bg-red-950/40 text-red-200 hover:bg-red-900/60",
  },
  {
    id: "amapiano",
    name: "Sun-Drenched Savannah Amapiano",
    badge: "from-amber-600 to-yellow-600 shadow-[0_0_8px_rgba(217,119,6,0.4)]",
    bgGradient: "from-stone-950 via-amber-950/30 to-black",
    cardBorder: "border-amber-900/40",
    headerAccent: "text-amber-400",
    panelBg: "bg-stone-900/80",
    accentText: "text-amber-300",
    chordCardBg: "bg-amber-950/20",
    chordCardBorder: "border-amber-600/20",
    chordCardActiveBg: "bg-amber-950/70",
    chordCardActiveBorder: "border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    pianoRollBg: "bg-[#18120c]",
    noteGradient: "from-amber-400 via-yellow-400 to-orange-300 border-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    primaryBtn: "border-amber-500/50 bg-amber-950/40 text-amber-200 hover:bg-amber-900/60",
  },
  {
    id: "witch-house",
    name: "Cryptic Séance Witch House",
    badge: "from-purple-800 to-zinc-600 shadow-[0_0_8px_rgba(107,33,168,0.4)]",
    bgGradient: "from-neutral-950 via-purple-950/30 to-black",
    cardBorder: "border-purple-950",
    headerAccent: "text-purple-300",
    panelBg: "bg-neutral-900/90",
    accentText: "text-zinc-400",
    chordCardBg: "bg-purple-950/20",
    chordCardBorder: "border-purple-800/20",
    chordCardActiveBg: "bg-purple-950/70",
    chordCardActiveBorder: "border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]",
    pianoRollBg: "bg-[#120e18]",
    noteGradient: "from-purple-300 via-violet-400 to-zinc-300 border-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    primaryBtn: "border-purple-600/50 bg-purple-950/40 text-purple-200 hover:bg-purple-900/60",
  },
];

export default function Component() {
  const [themeId, setThemeId] = useState("cyberpunk");
  const [genreIdx, setGenreIdx] = useState(0);
  const [subgenreIdx, setSubgenreIdx] = useState(0);
  const [keyIdx, setKeyIdx] = useState(0);
  const [scaleName, setScaleName] = useState("Minor");
  const [barsCount, setBarsCount] = useState<4 | 8 | 16>(8);
  const [soundType, setSoundType] = useState<
    "Synth" | "Piano" | "Guitar" | "Harp" | "Pluck" | "Brass" | "Strings" | "Choir"
  >("Synth");
  const [complexity, setComplexity] = useState("9ths/11ths");
  const [voicing, setVoicing] = useState("Drop 2");
  const [variationSeed, setVariationSeed] = useState(42);
  const [strumMs, setStrumMs] = useState(12);

  // New Requested Controls: Arpeggiator & Rhythm Chopper
  const [isArp, setIsArp] = useState(false);
  const [arpType, setArpType] = useState<ArpType>("Up");
  const [arpRate, setArpRate] = useState<"1/8" | "1/16">("1/16");
  const [rhythmNotch, setRhythmNotch] = useState(0); // 0 = Sustain, 1 = 1/4, 2 = 1/8, etc.

  // Manual piano roll user modifications (Bar -> Array of MIDI notes)
  const [userEditedChords, setUserEditedChords] = useState<Record<number, number[]>>({});

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingBarIndex, setPlayingBarIndex] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ stop: () => void }[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const currentGenreData = EDM_TAXONOMY[genreIdx] || EDM_TAXONOMY[0];
  const currentSubgenres = currentGenreData.subgenres;
  const currentSubgenreName = currentSubgenres[subgenreIdx] || currentSubgenres[0] || "Default";
  const harmonicStyle = getHarmonicStyle(currentSubgenreName, currentGenreData.genre);

  // Generate base procedural chords
  const keyRootMidi = 48 + keyIdx;
  const baseChords: GeneratedChord[] = useMemo(() => {
    return generateProceduralProgression({
      subgenre: currentSubgenreName,
      genre: currentGenreData.genre,
      scaleName,
      barsCount,
      seed: variationSeed,
      complexity,
      voicing,
      keyRootMidi,
    });
  }, [currentSubgenreName, currentGenreData.genre, scaleName, barsCount, variationSeed, complexity, voicing, keyRootMidi]);

  // Combine base chords with any user edits made inside the visual piano roll
  const progressionChords: GeneratedChord[] = useMemo(() => {
    return baseChords.map((chord) => {
      if (userEditedChords[chord.bar]) {
        return {
          ...chord,
          notes: [...userEditedChords[chord.bar]].sort((a, b) => a - b),
        };
      }
      return chord;
    });
  }, [baseChords, userEditedChords]);

  // Pre-calculate sliced note events (Arpeggiated or Rhythmically Chopped)
  const barSlices: SlicedNote[][] = useMemo(() => {
    return progressionChords.map((chord, bIdx) => {
      return generateBarNotes(chord.notes, bIdx, isArp, arpType, rhythmNotch, arpRate);
    });
  }, [progressionChords, isArp, arpType, rhythmNotch, arpRate]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    activeNodesRef.current.forEach((n) => {
      try {
        n.stop();
      } catch {}
    });
    activeNodesRef.current = [];
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setIsPlaying(false);
    setPlayingBarIndex(null);
  };

  // Play an instant tactile preview of a note when clicked on the piano roll
  const previewNoteTone = (midi: number) => {
    try {
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      const freq = 440 * Math.pow(2, (midi - 69) / 12);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  // Toggle or add/remove notes directly inside the visual piano roll
  const handlePianoRollClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const xRatio = Math.max(0, Math.min(0.999, clickX / rect.width));
    const yRatio = Math.max(0, Math.min(0.999, clickY / rect.height));

    const clickedBarIdx = Math.floor(xRatio * barsCount);
    const barNumber = clickedBarIdx + 1;

    // Pitch mapping: Top is MIDI 83 (B5), Bottom is MIDI 36 (C2)
    const pitch = Math.round(36 + (1 - yRatio) * 47);

    const currentChordNotes = progressionChords[clickedBarIdx]?.notes || [];
    let updatedNotes: number[];

    if (currentChordNotes.includes(pitch)) {
      // Remove note
      updatedNotes = currentChordNotes.filter((p) => p !== pitch);
    } else {
      // Add note
      updatedNotes = [...currentChordNotes, pitch].sort((a, b) => a - b);
      previewNoteTone(pitch);
    }

    setUserEditedChords((prev) => ({
      ...prev,
      [barNumber]: updatedNotes,
    }));
  };

  const resetAllManualEdits = () => {
    setUserEditedChords({});
  };

  // Schedule and play audio with active arpeggiator / rhythm gate chopping
  const playAudio = () => {
    stopAudio();
    const ctx = audioCtxRef.current || new AudioContext();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    setIsPlaying(true);
    const now = ctx.currentTime;
    const tempo = 128;
    const secondsPerBar = (60 / tempo) * 4;

    progressionChords.forEach((_, bIdx) => {
      const chordStart = now + bIdx * secondsPerBar;

      const barTimer = window.setTimeout(() => {
        setPlayingBarIndex(bIdx);
      }, bIdx * secondsPerBar * 1000);
      timeoutsRef.current.push(barTimer);

      const slices = barSlices[bIdx] || [];
      slices.forEach((slice) => {
        const freq = 440 * Math.pow(2, (slice.pitch - 69) / 12);
        const noteStart = chordStart + slice.startRatio * secondsPerBar;
        const noteDuration = Math.max(0.04, slice.durationRatio * secondsPerBar);

        if (soundType === "Guitar") {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc1.type = "triangle";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2200, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.24, noteStart + 0.006);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc1, osc2);
        } else if (soundType === "Harp") {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc1.type = "sine";
          osc2.type = "triangle";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq * 2, noteStart);
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(2600, noteStart);
          filter.Q.setValueAtTime(2.2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.003);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + Math.min(noteDuration, 1.8));
          osc1.connect(gain);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc1, osc2);
        } else if (soundType === "Pluck") {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(4800, noteStart);
          filter.frequency.exponentialRampToValueAtTime(450, noteStart + Math.min(noteDuration, 0.16));
          filter.Q.setValueAtTime(3.2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.28, noteStart + 0.004);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + Math.min(noteDuration, 0.32));
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteStart);
          osc.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc);
        } else if (soundType === "Brass") {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq * 0.996, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.004, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(700, noteStart);
          filter.frequency.linearRampToValueAtTime(3200, noteStart + Math.min(noteDuration * 0.4, 0.07));
          filter.Q.setValueAtTime(1.8, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.02);
          gain.gain.setValueAtTime(0.18, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc1, osc2);
        } else if (soundType === "Strings") {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "triangle";
          osc1.frequency.setValueAtTime(freq * 0.997, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.003, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2000, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.16, noteStart + Math.min(noteDuration * 0.3, 0.12));
          gain.gain.setValueAtTime(0.15, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration + 0.1);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration + 0.1);
          osc2.stop(noteStart + noteDuration + 0.1);
          activeNodesRef.current.push(osc1, osc2);
        } else if (soundType === "Choir") {
          const osc = ctx.createOscillator();
          const f1 = ctx.createBiquadFilter();
          const f2 = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, noteStart);
          f1.type = "bandpass";
          f1.frequency.setValueAtTime(750, noteStart);
          f1.Q.setValueAtTime(4.0, noteStart);
          f2.type = "bandpass";
          f2.frequency.setValueAtTime(1250, noteStart);
          f2.Q.setValueAtTime(4.0, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.22, noteStart + Math.min(noteDuration * 0.25, 0.08));
          gain.gain.setValueAtTime(0.2, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration + 0.15);
          osc.connect(f1);
          osc.connect(f2);
          f1.connect(gain);
          f2.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteStart);
          osc.stop(noteStart + noteDuration + 0.15);
          activeNodesRef.current.push(osc);
        } else if (soundType === "Piano") {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.type = "sine";
          osc2.type = "sine";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq * 2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.25, noteStart + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc1, osc2);
        } else {
          // Supersaw
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq * 0.998, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.002, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(3600, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.015);
          gain.gain.setValueAtTime(0.15, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
          activeNodesRef.current.push(osc1, osc2);
        }
      });
    });

    const totalDuration = barsCount * secondsPerBar;
    const endTimer = window.setTimeout(() => {
      setIsPlaying(false);
      setPlayingBarIndex(null);
    }, totalDuration * 1000);
    timeoutsRef.current.push(endTimer);
  };

  // Export Audio (WAV / MP3 with active rhythm chops and arpeggio notes)
  const downloadAudio = (isMp3: boolean) => {
    const sampleRate = 44100;
    const tempo = 128;
    const secondsPerBar = (60 / tempo) * 4;
    const totalDuration = barsCount * secondsPerBar;
    const totalSamples = Math.floor(sampleRate * totalDuration);

    const offlineCtx = new OfflineAudioContext(2, totalSamples, sampleRate);

    progressionChords.forEach((_, bIdx) => {
      const chordStart = bIdx * secondsPerBar;
      const slices = barSlices[bIdx] || [];

      slices.forEach((slice) => {
        const freq = 440 * Math.pow(2, (slice.pitch - 69) / 12);
        const noteStart = chordStart + slice.startRatio * secondsPerBar;
        const noteDuration = Math.max(0.04, slice.durationRatio * secondsPerBar);

        if (soundType === "Guitar") {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc1.type = "triangle";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2200, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.24, noteStart + 0.006);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
        } else if (soundType === "Harp") {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc1.type = "sine";
          osc2.type = "triangle";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq * 2, noteStart);
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(2600, noteStart);
          filter.Q.setValueAtTime(2.2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.003);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + Math.min(noteDuration, 1.8));
          osc1.connect(gain);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
        } else if (soundType === "Pluck") {
          const osc = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(4800, noteStart);
          filter.frequency.exponentialRampToValueAtTime(450, noteStart + Math.min(noteDuration, 0.16));
          filter.Q.setValueAtTime(3.2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.28, noteStart + 0.004);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + Math.min(noteDuration, 0.32));
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc.start(noteStart);
          osc.stop(noteStart + noteDuration);
        } else if (soundType === "Brass") {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq * 0.996, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.004, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(700, noteStart);
          filter.frequency.linearRampToValueAtTime(3200, noteStart + Math.min(noteDuration * 0.4, 0.07));
          filter.Q.setValueAtTime(1.8, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.02);
          gain.gain.setValueAtTime(0.18, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
        } else if (soundType === "Strings") {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "triangle";
          osc1.frequency.setValueAtTime(freq * 0.997, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.003, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2000, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.16, noteStart + Math.min(noteDuration * 0.3, 0.12));
          gain.gain.setValueAtTime(0.15, noteStart + noteDuration * 0.88);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration + 0.1);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration + 0.1);
          osc2.stop(noteStart + noteDuration + 0.1);
        } else if (soundType === "Choir") {
          const osc = offlineCtx.createOscillator();
          const f1 = offlineCtx.createBiquadFilter();
          const f2 = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, noteStart);
          f1.type = "bandpass";
          f1.frequency.setValueAtTime(750, noteStart);
          f1.Q.setValueAtTime(4.0, noteStart);
          f2.type = "bandpass";
          f2.frequency.setValueAtTime(1250, noteStart);
          f2.Q.setValueAtTime(4.0, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.22, noteStart + Math.min(noteDuration * 0.25, 0.08));
          gain.gain.setValueAtTime(0.2, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration + 0.15);
          osc.connect(f1);
          osc.connect(f2);
          f1.connect(gain);
          f2.connect(gain);
          gain.connect(offlineCtx.destination);
          osc.start(noteStart);
          osc.stop(noteStart + noteDuration + 0.15);
        } else if (soundType === "Piano") {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const gain = offlineCtx.createGain();
          osc1.type = "sine";
          osc2.type = "sine";
          osc1.frequency.setValueAtTime(freq, noteStart);
          osc2.frequency.setValueAtTime(freq * 2, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.25, noteStart + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
        } else {
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
          osc1.type = "sawtooth";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq * 0.998, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.002, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(3600, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.015);
          gain.gain.setValueAtTime(0.15, noteStart + noteDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + noteDuration);
          osc2.stop(noteStart + noteDuration);
        }
      });
    });

    offlineCtx.startRendering().then((renderedBuffer) => {
      const numChannels = renderedBuffer.numberOfChannels;
      const length = renderedBuffer.length * numChannels * 2 + 44;
      const buffer = new ArrayBuffer(length);
      const view = new DataView(buffer);

      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      writeString(0, "RIFF");
      view.setUint32(4, 36 + renderedBuffer.length * numChannels * 2, true);
      writeString(8, "WAVE");
      writeString(12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(36, "data");
      view.setUint32(40, renderedBuffer.length * numChannels * 2, true);

      let offset = 44;
      for (let i = 0; i < renderedBuffer.length; i++) {
        for (let channel = 0; channel < numChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, renderedBuffer.getChannelData(channel)[i]));
          view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
          offset += 2;
        }
      }

      const blob = new Blob([buffer], { type: isMp3 ? "audio/mp3" : "audio/wav" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentSubgenreName.replace(/\s+/g, "_")}_${barsCount}B_${isArp ? "Arp_" : ""}${RHYTHM_PATTERNS[rhythmNotch].tag}_Var${variationSeed}.${isMp3 ? "mp3" : "wav"}`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // MIDI Export with arpeggio and rhythm gate slicing
  const downloadMidi = () => {
    const ticksPerBar = 1920;
    const trackBytes: number[] = [
      0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20, // 128 bpm
      0x00, 0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08, // 4/4
    ];

    const events: { tick: number; status: number; pitch: number; vel: number }[] = [];
    progressionChords.forEach((_, bIdx) => {
      const barStart = bIdx * ticksPerBar;
      const slices = barSlices[bIdx] || [];

      slices.forEach((slice) => {
        const noteStartTick = barStart + Math.floor(slice.startRatio * ticksPerBar);
        const noteDurationTicks = Math.max(40, Math.floor(slice.durationRatio * ticksPerBar));
        const noteEndTick = noteStartTick + noteDurationTicks;

        events.push({ tick: noteStartTick, status: 0x90, pitch: slice.pitch, vel: 100 });
        events.push({ tick: noteEndTick, status: 0x80, pitch: slice.pitch, vel: 0 });
      });
    });

    events.sort((a, b) => a.tick - b.tick);
    let curTick = 0;
    events.forEach((ev) => {
      let delta = ev.tick - curTick;
      let buf = delta & 0x7f;
      while ((delta >>= 7) > 0) {
        buf <<= 8;
        buf |= 0x80;
        buf += delta & 0x7f;
      }
      while (true) {
        trackBytes.push(buf & 0xff);
        if (buf & 0x80) buf >>= 8;
        else break;
      }
      trackBytes.push(ev.status, ev.pitch, ev.vel);
      curTick = ev.tick;
    });

    trackBytes.push(0x00, 0xff, 0x2f, 0x00);

    const header = [0x4d, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x01, 0x01, 0xe0];
    const trackHead = [
      0x4d, 0x54, 0x72, 0x6b,
      (trackBytes.length >> 24) & 0xff,
      (trackBytes.length >> 16) & 0xff,
      (trackBytes.length >> 8) & 0xff,
      trackBytes.length & 0xff,
    ];

    const blob = new Blob([new Uint8Array([...header, ...trackHead, ...trackBytes])], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentSubgenreName.replace(/\s+/g, "_")}_${barsCount}B_${isArp ? "Arp_" : ""}${RHYTHM_PATTERNS[rhythmNotch].tag}_Var${variationSeed}.mid`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const nextVariation = () => {
    stopAudio();
    setUserEditedChords({});
    setVariationSeed((prev) => prev + 1);
  };

  const randomizeAll = () => {
    stopAudio();
    setUserEditedChords({});
    setVariationSeed(Math.floor(Math.random() * 999999) + 1);
  };

  const getPhraseBadgeColor = (phrase: string) => {
    switch (phrase) {
      case "THEME":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "VAR 8":
        return "bg-purple-500/30 text-purple-200 border-purple-400 font-bold shadow-[0_0_8px_rgba(168,85,247,0.4)]";
      case "VAR 11":
      case "VAR 12":
        return "bg-amber-500/30 text-amber-200 border-amber-400 font-bold shadow-[0_0_8px_rgba(245,158,11,0.4)]";
      case "VAR 16":
        return "bg-emerald-500/30 text-emerald-200 border-emerald-400 font-bold shadow-[0_0_8px_rgba(16,185,129,0.4)]";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  // Dial rotation calculations for the Rotary Rhythm Chopper Knob
  const dialAngle = -135 + (rhythmNotch / 7) * 270;

  const handleDialPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDialPointerMove = (e: React.PointerEvent) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const delta = -e.movementY;
    if (Math.abs(delta) > 2) {
      setRhythmNotch((prev) => {
        const next = delta > 0 ? prev + 1 : prev - 1;
        return Math.max(0, Math.min(7, next));
      });
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start md:justify-center p-2 sm:p-4 md:p-6 font-sans select-none text-zinc-100 bg-linear-to-b ${currentTheme.bgGradient}`}>
      <div className={`w-full max-w-6xl rounded-2xl border ${currentTheme.cardBorder} bg-black/80 p-3 sm:p-4 md:p-6 shadow-2xl flex flex-col gap-2.5 sm:gap-3.5 backdrop-blur-md`}>
        {/* Top Header Controls: Fully Responsive Header */}
        <div className="flex flex-col gap-2 border-b border-zinc-800 pb-2.5">
          {/* Main Top Row: Branding + Primary Action Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br ${currentTheme.badge} shrink-0`}>
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm tracking-tight text-white block leading-tight">
                  EDM CHORD ENGINE
                </span>
                <span className={`text-[8px] sm:text-[9px] font-mono ${currentTheme.headerAccent} block leading-none`}>
                  WEB EDITION
                </span>
              </div>
            </div>

            {/* Quick Actions (Preview, Randomize, Next Var) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Preview / Stop Button */}
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 sm:py-1 text-xs font-bold active:scale-95 transition-all shadow-md ${
                  isPlaying
                    ? "border-emerald-400 bg-emerald-500 text-black shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                    : "border-emerald-500/60 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/70"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="h-3 w-3 fill-black" />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 fill-emerald-300" />
                    <span>PREVIEW</span>
                  </>
                )}
              </button>

              {/* Randomize Button */}
              <button
                onClick={randomizeAll}
                className="flex items-center gap-1.5 rounded-lg border border-purple-500/60 bg-purple-950/50 px-2.5 py-1.5 sm:py-1 text-xs font-semibold text-purple-200 hover:bg-purple-900/70 active:scale-95 transition-all shadow-sm"
                title="Generate a completely new chord progression variation for this subgenre"
              >
                <Dices className="h-3 w-3 text-purple-300" />
                <span>Randomize</span>
              </button>

              {/* Next Variation Stepper */}
              <button
                onClick={nextVariation}
                className="flex items-center gap-1 rounded-lg border border-indigo-500/50 bg-indigo-950/50 px-2 py-1.5 sm:py-1 text-xs font-mono text-indigo-200 hover:bg-indigo-900/60 active:scale-95 transition-all"
                title="Next chord progression variation"
              >
                <Shuffle className="h-3 w-3 text-indigo-300" />
                <span>#{variationSeed}</span>
              </button>
            </div>
          </div>

          {/* Secondary Control Row: Key/Scale, Sound, Exports */}
          <div className="flex items-center justify-between flex-wrap gap-1.5 pt-1 border-t border-zinc-800/60">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Key & Scale & Bars Selector */}
              <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2 py-1 text-xs">
                <span className="text-zinc-500 font-mono text-[9px]">KEY:</span>
                <select
                  value={keyIdx}
                  onChange={(e) => {
                    stopAudio();
                    setKeyIdx(Number(e.target.value));
                  }}
                  className="bg-transparent font-mono font-bold text-cyan-400 focus:outline-none cursor-pointer text-xs"
                >
                  {NOTE_NAMES.map((n, i) => (
                    <option key={n} value={i} className="bg-zinc-900 text-white">
                      {n}
                    </option>
                  ))}
                </select>
                <span className="text-zinc-600">/</span>
                <select
                  value={scaleName}
                  onChange={(e) => {
                    stopAudio();
                    setScaleName(e.target.value);
                  }}
                  className="bg-transparent font-mono text-zinc-300 focus:outline-none cursor-pointer text-xs"
                >
                  {Object.keys(SCALE_DEGREES).map((s) => (
                    <option key={s} value={s} className="bg-zinc-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <span className="text-zinc-600">|</span>
                <select
                  value={barsCount}
                  onChange={(e) => {
                    stopAudio();
                    setBarsCount(Number(e.target.value) as 4 | 8 | 16);
                  }}
                  className="bg-transparent font-mono font-bold text-amber-400 focus:outline-none cursor-pointer text-xs"
                >
                  <option value={4} className="bg-zinc-900 text-amber-300">4B</option>
                  <option value={8} className="bg-zinc-900 text-amber-300">8B (A/B)</option>
                  <option value={16} className="bg-zinc-900 text-amber-300">16B (A/B/C/D)</option>
                </select>
              </div>

              {/* Sound Selector */}
              <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2 py-1 text-xs">
                <span className="text-zinc-500 font-mono text-[9px]">SOUND:</span>
                <select
                  value={soundType}
                  onChange={(e) => setSoundType(e.target.value as any)}
                  className="bg-transparent font-mono font-bold text-emerald-400 focus:outline-none cursor-pointer text-xs"
                >
                  <option value="Synth" className="bg-zinc-900 text-emerald-300">Supersaw Synth</option>
                  <option value="Piano" className="bg-zinc-900 text-emerald-300">Club Piano</option>
                  <option value="Guitar" className="bg-zinc-900 text-emerald-300">Acoustic Guitar</option>
                  <option value="Harp" className="bg-zinc-900 text-emerald-300">Plucked Harp</option>
                  <option value="Pluck" className="bg-zinc-900 text-emerald-300">EDM Pluck</option>
                  <option value="Brass" className="bg-zinc-900 text-emerald-300">Synth Brass</option>
                  <option value="Strings" className="bg-zinc-900 text-emerald-300">Lush Strings</option>
                  <option value="Choir" className="bg-zinc-900 text-emerald-300">Vocal Choir</option>
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => downloadAudio(false)}
                className="flex items-center gap-1 rounded border border-blue-500/50 bg-blue-950/40 px-2 py-1 text-[10px] sm:text-xs font-semibold text-blue-200 hover:bg-blue-900/60 active:scale-95 transition-all"
                title="Export as WAV file"
              >
                <FileAudio className="h-3 w-3 text-blue-400" />
                <span>WAV</span>
              </button>

              <button
                onClick={() => downloadAudio(true)}
                className="flex items-center gap-1 rounded border border-emerald-500/50 bg-emerald-950/40 px-2 py-1 text-[10px] sm:text-xs font-semibold text-emerald-200 hover:bg-emerald-900/60 active:scale-95 transition-all"
                title="Export as MP3 file"
              >
                <Download className="h-3 w-3 text-emerald-400" />
                <span>MP3</span>
              </button>

              <button
                onClick={downloadMidi}
                className="flex items-center gap-1 rounded border border-cyan-500/50 bg-cyan-950/40 px-2 py-1 text-[10px] sm:text-xs font-semibold text-cyan-200 hover:bg-cyan-900/60 active:scale-95 transition-all"
                title="Export as Standard MIDI file"
              >
                <FileCode className="h-3 w-3 text-cyan-400" />
                <span>MIDI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Arpeggio & Rhythm Chopper Processing Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-2 shadow-inner">
          {/* Arpeggio Mode Controller */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsArp(!isArp)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold transition-all shadow-sm ${
                isArp
                  ? "border-amber-400 bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              <Zap className={`h-3 w-3 ${isArp ? "fill-black" : "text-amber-400"}`} />
              <span>ARP MODE: {isArp ? "ON" : "OFF"}</span>
            </button>

            {isArp && (
              <div className="flex items-center gap-1.5 bg-black/50 border border-zinc-800 rounded-lg px-2 py-0.5">
                <span className="text-[9px] font-mono text-zinc-400">TYPE:</span>
                <select
                  value={arpType}
                  onChange={(e) => setArpType(e.target.value as ArpType)}
                  className="bg-transparent font-mono text-amber-300 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="Up" className="bg-zinc-900 text-white">Up (Ascending)</option>
                  <option value="Down" className="bg-zinc-900 text-white">Down (Descending)</option>
                  <option value="Up-Down" className="bg-zinc-900 text-white">Up-Down (Bounce)</option>
                  <option value="Down-Up" className="bg-zinc-900 text-white">Down-Up (Reverse)</option>
                  <option value="Pedal" className="bg-zinc-900 text-white">Pedal (Bass-Lead Roll)</option>
                  <option value="Random" className="bg-zinc-900 text-white">Random (Constellation)</option>
                </select>

                <span className="text-zinc-600">|</span>
                <span className="text-[9px] font-mono text-zinc-400">RATE:</span>
                <select
                  value={arpRate}
                  onChange={(e) => setArpRate(e.target.value as "1/8" | "1/16")}
                  className="bg-transparent font-mono text-cyan-300 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="1/8" className="bg-zinc-900 text-white">1/8</option>
                  <option value="1/16" className="bg-zinc-900 text-white">1/16</option>
                </select>
              </div>
            )}
          </div>

          {/* Rotary Dial: Rhythm Chord Chopper */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end text-right">
              <span className="text-[8px] font-mono uppercase text-zinc-400 tracking-wider">CHORD CHOP DIAL</span>
              <span className="text-xs font-bold font-mono text-purple-300">
                {RHYTHM_PATTERNS[rhythmNotch].name}
              </span>
            </div>

            {/* Interactive Hardware Rotary Dial */}
            <div
              onPointerDown={handleDialPointerDown}
              onPointerMove={handleDialPointerMove}
              className="relative flex h-10 w-10 cursor-ns-resize items-center justify-center rounded-full border-2 border-zinc-700 bg-linear-to-b from-zinc-800 to-black shadow-md active:scale-105 active:border-purple-400 transition-transform touch-none select-none"
              title="Drag up/down to dial different chord chopping rhythms"
            >
              {/* Dial Notch Ticks */}
              {RHYTHM_PATTERNS.map((_, idx) => {
                const tickAngle = -135 + (idx / 7) * 270;
                const isSelected = rhythmNotch === idx;
                return (
                  <div
                    key={idx}
                    className="absolute h-full w-full pointer-events-none"
                    style={{ transform: `rotate(${tickAngle}deg)` }}
                  >
                    <div
                      className={`mx-auto h-1 w-0.5 rounded-full ${
                        isSelected ? "bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.9)]" : "bg-zinc-600"
                      }`}
                    />
                  </div>
                );
              })}

              {/* Rotary Needle Pointer */}
              <div
                className="absolute h-3.5 w-1 rounded-full bg-linear-to-t from-purple-400 to-white shadow-[0_0_8px_rgba(168,85,247,1)] transition-transform duration-75"
                style={{
                  transform: `rotate(${dialAngle}deg) translateY(-8px)`,
                }}
              />
              <div className="h-4 w-4 rounded-full bg-zinc-900 border border-zinc-600" />
            </div>

            {/* Quick Notch Stepper Buttons */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setRhythmNotch((prev) => Math.min(7, prev + 1))}
                className="rounded bg-zinc-800 px-1 py-0.5 text-[8px] text-zinc-300 hover:bg-zinc-700 active:scale-95"
                title="Next rhythm pattern"
              >
                +
              </button>
              <button
                onClick={() => setRhythmNotch((prev) => Math.max(0, prev - 1))}
                className="rounded bg-zinc-800 px-1 py-0.5 text-[8px] text-zinc-300 hover:bg-zinc-700 active:scale-95"
                title="Previous rhythm pattern"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Piano Roll Progression Display */}
        <div className={`flex flex-col gap-2 rounded-xl border ${currentTheme.cardBorder} ${currentTheme.panelBg} p-2.5 sm:p-3 shadow-inner`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-400 gap-1">
            <span className={`flex items-center gap-1.5 ${currentTheme.accentText} flex-wrap`}>
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>{barsCount}-BAR PROGRESSION</span>
              <span className="text-[9px] font-mono text-zinc-400 normal-case">
                {barsCount === 4
                  ? "(Theme Loop)"
                  : barsCount === 8
                  ? "(Theme + Bar 8 Unique Turnaround)"
                  : "(Theme + Unique Bars 8, 11, 12 & 16)"}
              </span>
            </span>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[8px] font-mono text-zinc-400">
                STYLE: <span className="text-zinc-200">{harmonicStyle.replace(/_/g, " ")}</span>
              </span>
              <span className={`font-mono font-bold ${currentTheme.headerAccent}`}>{currentSubgenreName}</span>
            </div>
          </div>

          {/* Chord Chips with Responsive Grid */}
          <div
            className={`grid gap-1.5 sm:gap-2 ${
              barsCount === 4
                ? "grid-cols-2 sm:grid-cols-4"
                : barsCount === 8
                ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
                : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
            }`}
          >
            {progressionChords.map((chord, idx) => {
              const isActive = playingBarIndex === idx;
              const hasUserEdits = !!userEditedChords[chord.bar];
              return (
                <div
                  key={idx}
                  className={`rounded-lg border p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-150 ${
                    isActive
                      ? `${currentTheme.chordCardActiveBg} ${currentTheme.chordCardActiveBorder} scale-[1.02] shadow-md`
                      : `${currentTheme.chordCardBorder} ${currentTheme.chordCardBg}`
                  }`}
                >
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono mb-0.5">
                    <span className="flex items-center gap-1 text-zinc-400 font-bold">
                      <span className={`px-1 py-0.2 rounded border text-[7px] ${getPhraseBadgeColor(chord.phrase)}`}>
                        {chord.phrase}
                      </span>
                      B{chord.bar}
                    </span>
                    <span className={`font-black ${currentTheme.headerAccent} text-xs sm:text-sm`}>{chord.roman}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-white tracking-tight my-0.5">
                    <span className="truncate">{chord.chordName}</span>
                    {hasUserEdits && (
                      <span className="text-[7px] font-mono text-purple-300 bg-purple-950/80 px-1 rounded border border-purple-500/30">
                        EDITED
                      </span>
                    )}
                  </div>

                  <div className="text-[7px] sm:text-[8px] text-zinc-400 truncate font-mono mb-1 leading-tight" title={chord.functionTag}>
                    {chord.functionTag}
                  </div>

                  <div className="flex flex-wrap gap-0.5 truncate">
                    {chord.notes.map((n) => (
                      <span key={n} className="text-[7px] font-mono text-zinc-200 bg-black/70 px-1 py-0.2 rounded">
                        {midiToName(n)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Piano Roll Editor Canvas */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-zinc-400 px-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <MousePointer className="h-3 w-3" />
                <span>INTERACTIVE PIANO ROLL: Click any grid cell to add or remove notes</span>
              </span>
              {Object.keys(userEditedChords).length > 0 && (
                <button
                  onClick={resetAllManualEdits}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  <span>Reset Manual Edits</span>
                </button>
              )}
            </div>

            <div className={`relative flex h-48 sm:h-56 md:h-64 w-full rounded-lg border border-zinc-800 ${currentTheme.pianoRollBg} overflow-hidden shadow-inner`}>
              {/* Note pitch labels on left ruler */}
              <div className="w-8 sm:w-10 flex flex-col justify-between border-r border-zinc-800 bg-black/85 py-0.5 z-20 shrink-0">
                {["B5", "G5", "E5", "C5", "A4", "F4", "D4", "B3", "G3", "E3", "C3", "A2", "F2", "D2", "C2"].map((note) => (
                  <span
                    key={note}
                    className={`text-[7px] sm:text-[8px] font-mono px-1 font-semibold leading-none ${
                      note.startsWith("C") ? `${currentTheme.headerAccent} font-bold` : "text-zinc-600"
                    }`}
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Note canvas grid with interactive click-to-edit */}
              <div
                onClick={handlePianoRollClick}
                className="relative flex-1 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100%_7.14%] overflow-hidden cursor-crosshair"
              >
                {/* Vertical Bar Grid lines and thicker Phrase dividers */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: barsCount }).map((_, i) => {
                    const isPhraseEnd = (i + 1) % 4 === 0 && i !== barsCount - 1;
                    return (
                      <div
                        key={i}
                        className={`h-full relative ${
                          isPhraseEnd ? "border-r-2 border-purple-500/40" : "border-r border-zinc-700/30"
                        } ${playingBarIndex === i ? "bg-white/5" : ""}`}
                        style={{ width: `${100 / barsCount}%` }}
                      >
                        {/* Phrase marker at the top */}
                        {i % 4 === 0 && (
                          <span className="absolute top-1 left-1 text-[6px] sm:text-[7px] font-mono font-bold text-zinc-500 opacity-70">
                            {i === 0 ? "PHRASE A" : i === 4 ? "PHRASE B" : i === 8 ? "PHRASE C" : "PHRASE D"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sliced Note Blocks: Responds dynamically to Arp Mode, Rhythm Chopping, and User Edits */}
                {progressionChords.map((_, bIdx) => {
                  const barWidth = 100 / barsCount;
                  const baseLeft = bIdx * barWidth;
                  const isCurrent = playingBarIndex === bIdx;
                  const slices = barSlices[bIdx] || [];

                  return slices.map((slice, sIdx) => {
                    const clamped = Math.max(36, Math.min(83, slice.pitch));
                    const top = (1 - (clamped - 36) / 47) * 91;
                    const sliceLeft = baseLeft + slice.startRatio * barWidth;
                    const sliceWidth = slice.durationRatio * barWidth;

                    return (
                      <div
                        key={`${bIdx}-${sIdx}-${slice.pitch}`}
                        className={`absolute h-2 sm:h-2.5 rounded-sm bg-linear-to-r ${currentTheme.noteGradient} flex items-center px-0.5 transition-all shadow-sm ${
                          isCurrent ? "brightness-125 scale-[1.03] shadow-[0_0_12px_rgba(255,255,255,0.9)] z-10" : ""
                        }`}
                        style={{
                          top: `${top}%`,
                          left: `${sliceLeft}%`,
                          width: `${Math.max(1.5, sliceWidth)}%`,
                        }}
                      >
                        <span className="text-[5px] sm:text-[6px] font-mono font-black text-black truncate leading-none">
                          {midiToName(slice.pitch)}
                        </span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Controls Panel: Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Genre & Subgenre Selector */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 sm:p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-cyan-400 border-b border-zinc-800 pb-1">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>EDM Genre & Subgenre</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 normal-case">
                16 Genres · 140+ Subgenres
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Parent Genre</label>
                <select
                  value={genreIdx}
                  onChange={(e) => {
                    stopAudio();
                    setUserEditedChords({});
                    setGenreIdx(Number(e.target.value));
                    setSubgenreIdx(0);
                  }}
                  className="w-full rounded border border-cyan-500/40 bg-zinc-900 px-2 py-1.5 text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer"
                >
                  {EDM_TAXONOMY.map((item, idx) => (
                    <option key={item.genre} value={idx}>
                      {item.genre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">
                  Subgenre ({currentSubgenres.length})
                </label>
                <select
                  value={subgenreIdx}
                  onChange={(e) => {
                    stopAudio();
                    setUserEditedChords({});
                    setSubgenreIdx(Number(e.target.value));
                  }}
                  className="w-full rounded border border-purple-500/40 bg-zinc-900 px-2 py-1.5 text-xs font-semibold text-purple-300 focus:outline-none cursor-pointer"
                >
                  {currentSubgenres.map((sub, idx) => (
                    <option key={sub} value={idx}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Voicing & Complexity & Articulation */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 sm:p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-400">
                <Sliders className="h-3.5 w-3.5" />
                <span>Voicing & Complexity Engine</span>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <Palette className="h-3 w-3 text-zinc-400" />
                <select
                  value={themeId}
                  onChange={(e) => setThemeId(e.target.value)}
                  className="bg-transparent font-mono text-zinc-300 focus:outline-none cursor-pointer text-[9px]"
                >
                  {THEMES.map((t) => (
                    <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <div>
                <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Voicing</label>
                <select
                  value={voicing}
                  onChange={(e) => setVoicing(e.target.value)}
                  className="w-full rounded border border-zinc-800 bg-zinc-900 px-1.5 py-1 text-xs font-mono text-zinc-200 cursor-pointer"
                >
                  <option value="Close">Close</option>
                  <option value="Open">Open</option>
                  <option value="Drop 2">Drop 2 (Pro Pad)</option>
                  <option value="Inversion 1">Inversion 1</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Complexity</label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full rounded border border-zinc-800 bg-zinc-900 px-1.5 py-1 text-xs font-mono text-zinc-200 cursor-pointer"
                >
                  <option value="Triads">Triads (3 Notes)</option>
                  <option value="7ths">7ths (4 Notes)</option>
                  <option value="9ths/11ths">9ths/11ths (Lush)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Strum: {strumMs}ms</label>
                <input
                  type="range"
                  min={0}
                  max={80}
                  value={strumMs}
                  onChange={(e) => setStrumMs(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-2 mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Informational Sub-Strip on Progression Architecture */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800/80 pt-2 text-[8px] sm:text-[9px] font-mono text-zinc-400 gap-1 text-center sm:text-left">
          <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            <span className="text-zinc-500 font-bold">STRUCTURE:</span>
            <span>Theme Loop (Bars 1-4)</span>
            {barsCount >= 8 && (
              <>
                <ChevronRight className="h-2.5 w-2.5 text-zinc-600" />
                <span className="text-purple-300 font-bold">Bar 8 (Unique Turnaround)</span>
              </>
            )}
            {barsCount === 16 && (
              <>
                <ChevronRight className="h-2.5 w-2.5 text-zinc-600" />
                <span className="text-amber-300 font-bold">Bars 11–12 (Unique Bridge)</span>
                <ChevronRight className="h-2.5 w-2.5 text-zinc-600" />
                <span className="text-emerald-300 font-bold">Bar 16 (Unique Climax)</span>
              </>
            )}
          </div>
          <div className="text-zinc-500">
            VARIATION SEED #{variationSeed} · KEY: {scaleName.toUpperCase()} · {isArp ? `ARP: ${arpType.toUpperCase()}` : `RHYTHM: ${RHYTHM_PATTERNS[rhythmNotch].tag}`}
          </div>
        </div>
      </div>
    </div>
  );
}