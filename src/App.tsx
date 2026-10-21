import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  EDM_TAXONOMY,
  midiToName,
  SCALE_DEGREES,
  NOTE_NAMES,
  GENRE_THEORY_PROGRESSIONS,
  DEFAULT_THEORY_PROGRESSIONS,
} from "./data";

import {
  Layers,
  Sparkles,
  Sliders,
  Volume2,
  Activity,
  Music,
  Download,
  Dices,
  Play,
  Square,
  FileAudio,
  FileCode,
  Zap,
  Palette,
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
    pianoRollBg: string;
    noteGradient: string;
    primaryBtn: string;
  }
  
  const THEMES: Theme[] = [
    {
      id: "cyberpunk",
      name: "Cyberpunk Synth",
      badge: "from-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(6,182,212,0.4)]",
      bgGradient: "from-zinc-900 via-zinc-950 to-black",
      cardBorder: "border-zinc-800",
      headerAccent: "text-cyan-400",
      panelBg: "bg-black/60",
      accentText: "text-purple-300",
      chordCardBg: "bg-purple-950/30",
      chordCardBorder: "border-purple-500/30",
      pianoRollBg: "bg-[#16161c]",
      noteGradient: "from-emerald-400 via-cyan-400 to-teal-300 border-emerald-200/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      primaryBtn: "border-purple-500/50 bg-purple-950/40 text-purple-200 hover:bg-purple-900/60",
    },
    {
      id: "acid",
      name: "Acid 303 Club",
      badge: "from-lime-500 to-emerald-600 shadow-[0_0_8px_rgba(132,204,22,0.4)]",
      bgGradient: "from-zinc-950 via-zinc-900 to-black",
      cardBorder: "border-lime-900/50",
      headerAccent: "text-lime-400",
      panelBg: "bg-zinc-950/80",
      accentText: "text-lime-300",
      chordCardBg: "bg-lime-950/30",
      chordCardBorder: "border-lime-500/30",
      pianoRollBg: "bg-[#131a12]",
      noteGradient: "from-lime-400 via-emerald-400 to-green-300 border-lime-200 shadow-[0_0_8px_rgba(163,230,53,0.8)]",
      primaryBtn: "border-lime-500/50 bg-lime-950/40 text-lime-200 hover:bg-lime-900/60",
    },
    {
      id: "sunset",
      name: "Deep House Sunset",
      badge: "from-amber-500 to-rose-600 shadow-[0_0_8px_rgba(244,63,94,0.4)]",
      bgGradient: "from-slate-950 via-purple-950/40 to-black",
      cardBorder: "border-rose-900/40",
      headerAccent: "text-amber-400",
      panelBg: "bg-slate-900/60",
      accentText: "text-amber-300",
      chordCardBg: "bg-rose-950/30",
      chordCardBorder: "border-rose-500/30",
      pianoRollBg: "bg-[#1d1420]",
      noteGradient: "from-amber-400 via-rose-400 to-orange-300 border-amber-200 shadow-[0_0_8px_rgba(251,146,60,0.8)]",
      primaryBtn: "border-rose-500/50 bg-rose-950/40 text-rose-200 hover:bg-rose-900/60",
    },
    {
      id: "industrial",
      name: "Industrial Amber",
      badge: "from-orange-600 to-amber-700 shadow-[0_0_8px_rgba(234,88,12,0.4)]",
      bgGradient: "from-stone-950 via-zinc-950 to-neutral-950",
      cardBorder: "border-orange-950",
      headerAccent: "text-orange-500",
      panelBg: "bg-stone-900/70",
      accentText: "text-orange-400",
      chordCardBg: "bg-orange-950/30",
      chordCardBorder: "border-orange-600/30",
      pianoRollBg: "bg-[#1b1715]",
      noteGradient: "from-orange-500 via-amber-500 to-yellow-400 border-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
      primaryBtn: "border-orange-500/50 bg-orange-950/40 text-orange-200 hover:bg-orange-900/60",
    },
    {
      id: "tokyo",
      name: "Tokyo Future Bass",
      badge: "from-fuchsia-500 to-pink-600 shadow-[0_0_8px_rgba(217,70,239,0.4)]",
      bgGradient: "from-zinc-950 via-slate-950 to-indigo-950/50",
      cardBorder: "border-fuchsia-900/40",
      headerAccent: "text-fuchsia-400",
      panelBg: "bg-zinc-900/80",
      accentText: "text-pink-300",
      chordCardBg: "bg-fuchsia-950/30",
      chordCardBorder: "border-fuchsia-500/30",
      pianoRollBg: "bg-[#1a1224]",
      noteGradient: "from-fuchsia-400 via-pink-400 to-indigo-300 border-fuchsia-200 shadow-[0_0_8px_rgba(232,121,249,0.8)]",
      primaryBtn: "border-fuchsia-500/50 bg-fuchsia-950/40 text-fuchsia-200 hover:bg-fuchsia-900/60",
    },
  ];
  
  export default function App() {
    const [themeId, setThemeId] = useState("cyberpunk");
    const [genreIdx, setGenreIdx] = useState(0);
    const [subgenreIdx, setSubgenreIdx] = useState(0);
    const [keyIdx, setKeyIdx] = useState(0);
    const [scaleName, setScaleName] = useState("Minor");
    const [barsCount, setBarsCount] = useState<4 | 8 | 16>(4);
    const [soundType, setSoundType] = useState<"Synth" | "Piano" | "Guitar">("Synth");
    const [complexity, setComplexity] = useState("9ths/11ths");
    const [voicing, setVoicing] = useState("Drop 2");
    const [variationSeed, setVariationSeed] = useState(1337);
    const [strumMs, setStrumMs] = useState(12);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const audioCtxRef = useRef<AudioContext | null>(null);
    const activeNodesRef = useRef<{ stop: () => void }[]>([]);
  
    const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  
    const currentGenreData = EDM_TAXONOMY[genreIdx] || EDM_TAXONOMY[0];
    const currentSubgenres = currentGenreData.subgenres;
    const currentSubgenreName = currentSubgenres[subgenreIdx] || currentSubgenres[0] || "Default";
  
    // Build chords progression
    const keyRootMidi = 48 + keyIdx;
    const progressionChords = useMemo(() => {
      const rawList = GENRE_THEORY_PROGRESSIONS[currentSubgenreName] || DEFAULT_THEORY_PROGRESSIONS;
      const baseProg = rawList[variationSeed % rawList.length] || DEFAULT_THEORY_PROGRESSIONS[0];
      const scale = SCALE_DEGREES[scaleName] || SCALE_DEGREES.Minor;

      // Helper to generate a single chord step given degree, extension, and roman numeral
      const buildStep = (deg: number, ext: number[], roman: string) => {
        const rootMidi = keyRootMidi + (scale[deg % 7] || 0);
        const maxNotes = complexity === "Triads" ? 3 : complexity === "7ths" ? 4 : 5;
        const notes = ext.slice(0, maxNotes).map((e) => rootMidi + e);

        // Voicing adjustments
        if (voicing === "Open" && notes.length >= 3) {
          notes[1] += 12;
        } else if (voicing === "Drop 2" && notes.length >= 4) {
          notes[notes.length - 2] -= 12;
        } else if (voicing === "Inversion 1" && notes.length >= 2) {
          notes[0] += 12;
        }

        notes.sort((a, b) => a - b);
        return { roman, notes };
      };

      // Turnaround chord definitions based on music theory / scale mode
      const getTurnaroundStep = (barIndex: number): { deg: number; ext: number[]; roman: string } => {
        const isMinor = scaleName.toLowerCase().includes("minor") || scaleName.toLowerCase().includes("dorian") || scaleName.toLowerCase().includes("phrygian");

        if (barIndex === 7) {
          return isMinor
            ? { deg: 4, ext: [0, 4, 7, 10, 14], roman: "V7" }
            : { deg: 4, ext: [0, 4, 7, 10, 14], roman: "V9" };
        }
        if (barIndex === 11) {
          return isMinor
            ? { deg: 3, ext: [0, 3, 7, 10, 14], roman: "iv7" }
            : { deg: 3, ext: [0, 4, 7, 11, 14], roman: "IVmaj7" };
        }
        if (barIndex === 15) {
          return isMinor
            ? { deg: 6, ext: [0, 4, 7, 10], roman: "VII7" }
            : { deg: 4, ext: [0, 4, 7, 10, 13], roman: "V7(b9)" };
        }
        return { deg: 4, ext: [0, 4, 7, 10], roman: "V" };
      };
  
      const chords: { roman: string; notes: number[] }[] = [];
      
      for (let b = 0; b < barsCount; b++) {
        let step: { deg: number; ext: number[]; roman: string };

        // Apply musical turnarounds on bars 8 (idx 7), 12 (idx 11), and 16 (idx 15)
        if (b === 7 || b === 11 || b === 15) {
          step = getTurnaroundStep(b);
        } else {
          step = baseProg[b % baseProg.length];
        }

        chords.push(buildStep(step.deg, step.ext, step.roman));
      }
      return chords;
    }, [currentSubgenreName, keyRootMidi, scaleName, barsCount, variationSeed, complexity, voicing]);
  
    // Audio Playback
    const stopAudio = () => {
      activeNodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch {}
      });
      activeNodesRef.current = [];
      setIsPlaying(false);
    };
  
    const playAudio = () => {
      stopAudio();
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();
  
      setIsPlaying(true);
      const now = ctx.currentTime;
      const tempo = 128;
      const secondsPerBar = (60 / tempo) * 4;
  
      progressionChords.forEach((chord, bIdx) => {
        const chordStart = now + bIdx * secondsPerBar;
        const chordDuration = secondsPerBar * 0.95;
  
        chord.notes.forEach((midi, nIdx) => {
          const freq = 440 * Math.pow(2, (midi - 69) / 12);
          const noteStart = chordStart + (nIdx * (strumMs * 0.001));
  
          if (soundType === "Guitar") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, noteStart);
            gain.gain.setValueAtTime(0.001, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.3, noteStart + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + chordDuration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(noteStart);
            osc.stop(noteStart + chordDuration);
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
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + chordDuration);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(noteStart);
            osc2.start(noteStart);
            osc1.stop(noteStart + chordDuration);
            osc2.stop(noteStart + chordDuration);
            activeNodesRef.current.push(osc1, osc2);
          } else {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();
            osc1.type = "sawtooth";
            osc2.type = "sawtooth";
            osc1.frequency.setValueAtTime(freq * 0.998, noteStart);
            osc2.frequency.setValueAtTime(freq * 1.002, noteStart);
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(3500, noteStart);
            gain.gain.setValueAtTime(0.001, noteStart);
            gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.02);
            gain.gain.setValueAtTime(0.15, noteStart + chordDuration * 0.85);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + chordDuration);
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(noteStart);
            osc2.start(noteStart);
            osc1.stop(noteStart + chordDuration);
            osc2.stop(noteStart + chordDuration);
            activeNodesRef.current.push(osc1, osc2);
          }
        });
      });
  
      const totalDuration = barsCount * secondsPerBar;
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration * 1000);
    };
  
    // Export Audio (WAV audio container)
    const downloadAudio = (isMp3: boolean) => {
      const sampleRate = 44100;
      const tempo = 128;
      const secondsPerBar = (60 / tempo) * 4;
      const totalDuration = barsCount * secondsPerBar;
      const totalSamples = Math.floor(sampleRate * totalDuration);
  
      const offlineCtx = new OfflineAudioContext(2, totalSamples, sampleRate);
  
      progressionChords.forEach((chord, bIdx) => {
        const chordStart = bIdx * secondsPerBar;
        const chordDuration = secondsPerBar * 0.95;
  
        chord.notes.forEach((midi, nIdx) => {
          const freq = 440 * Math.pow(2, (midi - 69) / 12);
          const noteStart = chordStart + (nIdx * (strumMs * 0.001));
  
          const osc1 = offlineCtx.createOscillator();
          const osc2 = offlineCtx.createOscillator();
          const filter = offlineCtx.createBiquadFilter();
          const gain = offlineCtx.createGain();
  
          osc1.type = "sawtooth";
          osc2.type = "sawtooth";
          osc1.frequency.setValueAtTime(freq * 0.998, noteStart);
          osc2.frequency.setValueAtTime(freq * 1.002, noteStart);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(3500, noteStart);
          gain.gain.setValueAtTime(0.001, noteStart);
          gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.02);
          gain.gain.setValueAtTime(0.15, noteStart + chordDuration * 0.85);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + chordDuration);
  
          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(offlineCtx.destination);
  
          osc1.start(noteStart);
          osc2.start(noteStart);
          osc1.stop(noteStart + chordDuration);
          osc2.stop(noteStart + chordDuration);
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
        a.download = `${currentSubgenreName.replace(/\s+/g, "_")}_Progression.${isMp3 ? "mp3" : "wav"}`;
        a.click();
        URL.revokeObjectURL(url);
      });
    };
  
    const downloadMidi = () => {
      const ticksPerBar = 1920;
      const trackBytes: number[] = [
        0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20,
        0x00, 0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08,
      ];
  
      const events: { tick: number; status: number; pitch: number; vel: number }[] = [];
      progressionChords.forEach((chord, bIdx) => {
        const barStart = bIdx * ticksPerBar;
        const barEnd = barStart + Math.floor(ticksPerBar * 0.95);
        chord.notes.forEach((pitch) => {
          events.push({ tick: barStart, status: 0x90, pitch, vel: 100 });
          events.push({ tick: barEnd, status: 0x80, pitch, vel: 0 });
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
      a.download = `${currentSubgenreName.replace(/\s+/g, "_")}_Progression.mid`;
      a.click();
      URL.revokeObjectURL(url);
    };
  
    return (
      <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans select-none text-zinc-100 bg-linear-to-b ${currentTheme.bgGradient}`}>
        <div className={`w-full max-w-6xl rounded-2xl border ${currentTheme.cardBorder} bg-black/70 p-5 md:p-6 shadow-2xl flex flex-col gap-4 backdrop-blur-md`}>
          {/* Top Header Controls (Single-Line Compact Strip) */}
          <div className="flex h-10 items-center justify-between border-b border-zinc-800 pb-2 gap-1.5 flex-nowrap">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className={`flex h-6 w-6 items-center justify-center rounded bg-linear-to-br ${currentTheme.badge}`}>
                <Zap className="h-3 w-3 text-white" />
              </div>
              <div>
                <span className="font-bold text-xs tracking-tight text-white block leading-tight whitespace-nowrap">
                  EDM CHORD ENGINE
                </span>
                <span className={`text-[8px] font-mono ${currentTheme.headerAccent} block leading-none whitespace-nowrap`}>
                  WEB EDITION
                </span>
              </div>
            </div>
  
            <div className="flex items-center gap-1 shrink-0 flex-nowrap">
              <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] text-zinc-300">
                <Music className="h-3 w-3 text-zinc-400" />
                <span className="font-medium">Key:</span>
                <select 
                  className="bg-transparent text-white font-bold outline-none cursor-pointer"
                  value={keyIdx}
                  onChange={(e) => setKeyIdx(Number(e.target.value))}
                >
                  {NOTE_NAMES.map((name, idx) => (
                    <option key={name} value={idx} className="bg-zinc-900 text-white">{name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] text-zinc-300">
                <Sliders className="h-3 w-3 text-zinc-400" />
                <span className="font-medium">Scale:</span>
                <select 
                  className="bg-transparent text-white font-bold outline-none cursor-pointer"
                  value={scaleName}
                  onChange={(e) => setScaleName(e.target.value)}
                >
                  {Object.keys(SCALE_DEGREES).map((sc) => (
                    <option key={sc} value={sc} className="bg-zinc-900 text-white">{sc}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] text-zinc-300">
                <Activity className="h-3 w-3 text-zinc-400" />
                <span className="font-medium">Bars:</span>
                <select 
                  className="bg-transparent text-white font-bold outline-none cursor-pointer"
                  value={barsCount}
                  onChange={(e) => setBarsCount(Number(e.target.value) as 4 | 8 | 16)}
                >
                  <option value={4} className="bg-zinc-900 text-white">4 Bars</option>
                  <option value={8} className="bg-zinc-900 text-white">8 Bars</option>
                  <option value={16} className="bg-zinc-900 text-white">16 Bars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Genre / Subgenre Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl border border-zinc-800 ${currentTheme.panelBg} flex flex-col gap-2`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">EDM Genre Category</span>
                <span className={`text-[10px] font-bold ${currentTheme.headerAccent}`}>{currentGenreData.category}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {EDM_TAXONOMY.map((genre, gIdx) => (
                  <button
                    key={genre.category}
                    onClick={() => { setGenreIdx(gIdx); setSubgenreIdx(0); }}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${genreIdx === gIdx ? `${currentTheme.badge} text-white font-bold` : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                  >
                    {genre.category}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-xl border border-zinc-800 ${currentTheme.panelBg} flex flex-col gap-2`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">Subgenre Style</span>
                <span className={`text-[10px] font-bold ${currentTheme.accentText}`}>{currentSubgenreName}</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {currentSubgenres.map((sub, sIdx) => (
                  <button
                    key={sub}
                    onClick={() => setSubgenreIdx(sIdx)}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${subgenreIdx === sIdx ? `${currentTheme.badge} text-white font-bold` : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chord Progression Display / Piano Roll Grid */}
          <div className={`p-4 rounded-xl border border-zinc-800 ${currentTheme.pianoRollBg} flex flex-col gap-3 shadow-inner`}>
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">Generated Chord Progression ({barsCount} Bars)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVariationSeed(Math.floor(Math.random() * 10000))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-medium transition-all text-zinc-200"
                >
                  <Dices className="h-3 w-3 text-cyan-400" />
                  <span>Randomize</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {progressionChords.map((chord, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg border ${currentTheme.chordCardBorder} ${currentTheme.chordCardBg} flex flex-col gap-1.5 relative overflow-hidden group shadow`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-400">Bar {idx + 1}</span>
                    <span className={`text-[10px] font-extrabold ${currentTheme.headerAccent}`}>{chord.roman}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {chord.notes.map((midi, nIdx) => (
                      <div key={nIdx} className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-linear-to-r ${currentTheme.noteGradient} text-black`}>
                        {midiToName ? midiToName(midi) : midi}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Controls & Export */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-lg transition-all ${isPlaying ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40' : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-900/40'}`}
              >
                {isPlaying ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                <span>{isPlaying ? "Stop Preview" : "Play Progression"}</span>
              </button>

              <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-1 text-xs">
                {(["Synth", "Piano", "Guitar"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSoundType(s)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${soundType === s ? 'bg-zinc-800 text-white font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadAudio(false)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-all shadow"
              >
                <FileAudio className="h-3.5 w-3.5 text-emerald-400" />
                <span>Export WAV</span>
              </button>
              <button
                onClick={downloadMidi}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-all shadow"
              >
                <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                <span>Export MIDI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
```