export default function App() {
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
  
      const chords: { roman: string; notes: number[] }[] = [];
      for (let b = 0; b < barsCount; b++) {
        const step = baseProg[b % baseProg.length];
        const rootMidi = keyRootMidi + (scale[step.deg % 7] || 0);
  
        const maxNotes = complexity === "Triads" ? 3 : complexity === "7ths" ? 4 : 5;
        const notes = step.ext.slice(0, maxNotes).map((ext) => rootMidi + ext);
  
        // Voicing
        if (voicing === "Open" && notes.length >= 3) {
          notes[1] += 12;
        } else if (voicing === "Drop 2" && notes.length >= 4) {
          notes[notes.length - 2] -= 12;
        } else if (voicing === "Inversion 1" && notes.length >= 2) {
          notes[0] += 12;
        }
  
        notes.sort((a, b) => a - b);
        chords.push({ roman: step.roman, notes });
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
            // Plucked string approximation
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
            // Dual sine acoustic hammer
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
            // Dual Detuned Supersaw Synth
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
  
    // Export Audio (WAV / MP3 audio container)
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
        0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20, // 128 bpm
        0x00, 0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08, // 4/4
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
        // encode var len
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
      <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans select-none text-zinc-100 bg-gradient-to-b ${currentTheme.bgGradient}`}>
        <div className={`w-[840px] rounded-2xl border ${currentTheme.cardBorder} bg-black/60 p-4 shadow-2xl flex flex-col gap-3 backdrop-blur-md`}>
          {/* Top Header Controls (Single-Line Compact Strip) */}
          <div className="flex h-10 items-center justify-between border-b border-zinc-800 pb-2 gap-1.5 flex-nowrap">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className={`flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br ${currentTheme.badge}`}>
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
              {/* Key / Scale / Bars */}
              <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] whitespace-nowrap">
                <span className="text-zinc-500 font-mono text-[8px]">KEY:</span>
                <select
                  value={keyIdx}
                  onChange={(e) => setKeyIdx(Number(e.target.value))}
                  className="bg-transparent font-mono font-bold text-cyan-400 focus:outline-none cursor-pointer text-[9px]"
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
                  onChange={(e) => setScaleName(e.target.value)}
                  className="bg-transparent font-mono text-zinc-300 focus:outline-none cursor-pointer text-[9px]"
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
                  onChange={(e) => setBarsCount(Number(e.target.value) as 4 | 8 | 16)}
                  className="bg-transparent font-mono font-bold text-amber-400 focus:outline-none cursor-pointer text-[9px]"
                >
                  <option value={4} className="bg-zinc-900 text-amber-300">4B</option>
                  <option value={8} className="bg-zinc-900 text-amber-300">8B</option>
                  <option value={16} className="bg-zinc-900 text-amber-300">16B</option>
                </select>
              </div>
  
              {/* Sound Preview Model */}
              <div className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[9px] whitespace-nowrap">
                <span className="text-zinc-500 font-mono text-[8px]">SOUND:</span>
                <select
                  value={soundType}
                  onChange={(e) => setSoundType(e.target.value as "Synth" | "Piano" | "Guitar")}
                  className="bg-transparent font-mono font-bold text-emerald-400 focus:outline-none cursor-pointer text-[9px]"
                >
                  <option value="Synth" className="bg-zinc-900 text-emerald-300">Synth</option>
                  <option value="Piano" className="bg-zinc-900 text-emerald-300">Piano</option>
                  <option value="Guitar" className="bg-zinc-900 text-emerald-300">Guitar</option>
                </select>
              </div>
  
              {/* Randomize Button */}
              <button
                onClick={() => setVariationSeed(Math.floor(Math.random() * 99999))}
                className="flex items-center gap-1 rounded border border-purple-500/50 bg-purple-950/40 px-1.5 py-0.5 text-[9px] font-semibold text-purple-200 hover:bg-purple-900/60 active:scale-95 transition-all whitespace-nowrap"
                title="Randomize progression"
              >
                <Dices className="h-2.5 w-2.5 text-purple-300" />
                <span>Randomize</span>
              </button>
  
              {/* Preview Button */}
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-semibold active:scale-95 transition-all whitespace-nowrap ${
                  isPlaying
                    ? "border-emerald-400 bg-emerald-500 text-black shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                    : "border-emerald-500/50 bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="h-2.5 w-2.5 fill-black" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="h-2.5 w-2.5 fill-emerald-300" />
                    <span>Preview</span>
                  </>
                )}
              </button>
  
              {/* Export WAV */}
              <button
                onClick={() => downloadAudio(false)}
                className="flex items-center gap-1 rounded border border-blue-500/50 bg-blue-950/40 px-1.5 py-0.5 text-[9px] font-semibold text-blue-200 hover:bg-blue-900/60 active:scale-95 transition-all whitespace-nowrap"
              >
                <FileAudio className="h-2.5 w-2.5 text-blue-400" />
                <span>WAV</span>
              </button>
  
              {/* Export MP3 */}
              <button
                onClick={() => downloadAudio(true)}
                className="flex items-center gap-1 rounded border border-emerald-500/50 bg-emerald-950/40 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-200 hover:bg-emerald-900/60 active:scale-95 transition-all whitespace-nowrap"
              >
                <Download className="h-2.5 w-2.5 text-emerald-400" />
                <span>MP3</span>
              </button>
  
              {/* Export MIDI */}
              <button
                onClick={downloadMidi}
                className="flex items-center gap-1 rounded border border-cyan-500/50 bg-cyan-950/40 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-200 hover:bg-cyan-900/60 active:scale-95 transition-all whitespace-nowrap"
              >
                <FileCode className="h-2.5 w-2.5 text-cyan-400" />
                <span>MIDI</span>
              </button>
            </div>
          </div>
  
          {/* Piano Roll Progression Display */}
          <div className={`flex flex-col gap-1 rounded-xl border ${currentTheme.cardBorder} ${currentTheme.panelBg} p-2.5 shadow-inner`}>
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              <span className={`flex items-center gap-1 ${currentTheme.accentText}`}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>{barsCount}-BAR PROGRESSION PIANO ROLL</span>
              </span>
              <span className={`font-mono ${currentTheme.headerAccent}`}>{currentSubgenreName}</span>
            </div>
  
            {/* Chord Chips */}
            <div className={`grid gap-1.5 ${barsCount === 4 ? "grid-cols-4" : barsCount === 8 ? "grid-cols-8" : "grid-cols-8 grid-rows-2"}`}>
              {progressionChords.map((chord, idx) => (
                <div key={idx} className={`rounded border ${currentTheme.chordCardBorder} ${currentTheme.chordCardBg} p-1 flex flex-col justify-between`}>
                  <div className="flex justify-between items-center text-[8px] font-mono">
                    <span className="text-zinc-500">B{idx + 1}</span>
                    <span className={`font-bold ${currentTheme.headerAccent} text-[10px]`}>{chord.roman}</span>
                  </div>
                  <div className="flex flex-wrap gap-0.5 truncate mt-0.5">
                    {chord.notes.map((n) => (
                      <span key={n} className="text-[7px] font-mono text-zinc-200 bg-black/60 px-0.5 rounded">
                        {midiToName(n)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Piano Roll Grid Canvas */}
            <div className={`relative flex h-32 w-full rounded border border-zinc-800 ${currentTheme.pianoRollBg} overflow-hidden mt-1`}>
              <div className="w-8 flex flex-col justify-between border-r border-zinc-800 bg-black/60 py-0.5 z-10">
                {["B5", "G5", "E5", "C5", "A4", "F4", "D4", "B3", "G3", "E3", "C3", "A2", "F2", "D2", "C2"].map((note) => (
                  <span
                    key={note}
                    className={`text-[7px] font-mono px-1 font-semibold leading-none ${
                      note.startsWith("C") ? `\${currentTheme.headerAccent} font-bold` : "text-zinc-600"
                    }`}
                  >
                    {note}
                  </span>
                ))}
              </div>
  
              <div className="relative flex-1 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_7.14%]">
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {Array.from({ length: barsCount - 1 }).map((_, i) => (
                    <div key={i} className="border-r border-zinc-700/40 h-full" style={{ width: `${100 / barsCount}%` }} />
                  ))}
                </div>
  
                {progressionChords.map((chord, bIdx) => {
                  const barWidth = 100 / barsCount;
                  const baseLeft = bIdx * barWidth;
                  return chord.notes.map((midi, nIdx) => {
                    const clamped = Math.max(36, Math.min(83, midi));
                    const top = (1 - (clamped - 36) / 47) * 90;
                    const strumOffset = (strumMs * nIdx * 0.003) * (4 / barsCount);
                    return (
                      <div
                        key={`${bIdx}-${midi}`}
                        className={`absolute h-2.5 rounded-sm bg-gradient-to-r ${currentTheme.noteGradient} flex items-center px-1`}
                        style={{
                          top: `${top}%`,
                          left: `${baseLeft + strumOffset}%`,
                          width: `${Math.max(2, barWidth * 0.9 - strumOffset)}%`,
                        }}
                      >
                        <span className="text-[6px] font-mono font-black text-black truncate leading-none">
                          {midiToName(midi)}
                        </span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
  
          {/* Lower Controls Panel */}
          <div className="grid grid-cols-12 gap-3">
            {/* Genre & Subgenre Selector */}
            <div className="col-span-6 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-cyan-400 border-b border-zinc-800 pb-1">
                <Layers className="h-3.5 w-3.5" />
                <span>Genre & Subgenre</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">EDM Genre</label>
                  <select
                    value={genreIdx}
                    onChange={(e) => {
                      setGenreIdx(Number(e.target.value));
                      setSubgenreIdx(0);
                    }}
                    className="w-full rounded border border-cyan-500/40 bg-zinc-900 px-2 py-1 text-xs font-semibold text-cyan-300 focus:outline-none cursor-pointer"
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
                    onChange={(e) => setSubgenreIdx(Number(e.target.value))}
                    className="w-full rounded border border-purple-500/40 bg-zinc-900 px-2 py-1 text-xs font-semibold text-purple-300 focus:outline-none cursor-pointer"
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
  
            {/* Voicing & Complexity & Theme */}
            <div className="col-span-6 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-400">
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Voicing & Articulation Engine</span>
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
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Voicing</label>
                  <select
                    value={voicing}
                    onChange={(e) => setVoicing(e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-900 px-1 py-1 text-[10px] font-mono text-zinc-200 cursor-pointer"
                  >
                    <option value="Close">Close</option>
                    <option value="Open">Open</option>
                    <option value="Drop 2">Drop 2</option>
                    <option value="Inversion 1">Inversion 1</option>
                  </select>
                </div>
  
                <div>
                  <label className="text-[9px] uppercase font-semibold text-zinc-400 block mb-0.5">Complexity</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-900 px-1 py-1 text-[10px] font-mono text-zinc-200 cursor-pointer"
                  >
                    <option value="Triads">Triads</option>
                    <option value="7ths">7ths</option>
                    <option value="9ths/11ths">9ths/11ths</option>
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
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-1 text-[9px] font-mono text-zinc-500">
            <span>EDM CHORD ENGINE · WEB EDITION</span>
            <span>BROWSER WEB AUDIO SYNTHESIS & MIDI EXPORT</span>
          </div>
        </div>
      </div>
    );
  }
}
