export interface EDMGenreData {
  genre: string;
  subgenres: string[];
}

export const EDM_TAXONOMY: EDMGenreData[] = [
  {
    genre: "House",
    subgenres: [
      "Deep House", "Progressive House", "Tech House", "Electro House", "Bass House",
      "Future House", "Afro House", "Melodic House", "French House", "Acid House",
      "Chicago House", "Garage House", "Tropical House", "Outsider House", "Ghetto House",
      "Microhouse", "Diva House", "Hardbag", "Kwaito", "Amapiano",
    ],
  },
  {
    genre: "Techno",
    subgenres: [
      "Peak Time Techno", "Melodic Techno", "Industrial Techno", "Acid Techno", "Dub Techno",
      "Hard Techno", "Minimal Techno", "Detroit Techno", "Schranz", "Bleep Techno",
      "Nortec", "Ghettotech", "Dark Techno",
    ],
  },
  {
    genre: "Trance",
    subgenres: [
      "Uplifting Trance", "Psytrance", "Vocal Trance", "Progressive Trance", "Tech Trance",
      "Goa Trance", "Hard Trance", "Dream Trance", "Dark Psytrance", "Full-On Psytrance",
      "Suomisaundi", "Euro-Trance",
    ],
  },
  {
    genre: "Breakbeat & Breaks",
    subgenres: [
      "Breakbeat", "Big Beat", "Nu Skool Breaks", "Florida Breaks", "Progressive Breaks",
      "Acid Breaks", "Baltimore Club", "Jersey Club", "Miami Bass",
    ],
  },
  {
    genre: "Drum and Bass & Jungle",
    subgenres: [
      "Liquid Funk DnB", "Neurofunk DnB", "Dancefloor DnB", "Jump Up DnB", "Halftime DnB",
      "Jungle", "Ragga Jungle", "Techstep", "Darkstep", "Drill 'n' Bass", "Drumfunk", "Crossbreed",
    ],
  },
  {
    genre: "Dubstep & Bass",
    subgenres: [
      "Melodic Dubstep", "Riddim Dubstep", "Tearout Dubstep", "Deep Dark Dubstep", "Brostep",
      "Cyberpunk Midtempo", "Post-Dubstep", "Color Bass", "Kawaii Future Bass", "Melodic Future Bass",
      "Chillstep", "Wave & Hardwave",
    ],
  },
  {
    genre: "Hardcore & Hard Dance",
    subgenres: [
      "Euphoric Hardstyle", "Rawstyle", "Hardcore / Gabber", "Frenchcore", "Happy Hardcore",
      "UK Hardcore", "Speedcore", "Terrorcore", "Reverse Bass", "Jumpstyle", "Lento Violento", "Makina",
    ],
  },
  {
    genre: "Garage & Grime",
    subgenres: [
      "UK Garage (UKG)", "Speed Garage", "Bassline", "2-Step Garage", "Future Garage",
      "Grime", "Breakstep", "Dubstyle",
    ],
  },
  {
    genre: "Electro & Complextro",
    subgenres: [
      "Electro", "Complextro", "Big Room Electro", "Electroclash", "Nu Disco",
      "French Touch", "Skweee", "Chiptune / 8-Bit", "Bitpop",
    ],
  },
  {
    genre: "Downtempo & Ambient",
    subgenres: [
      "Ambient", "Ambient Dub", "Chillout", "Trip Hop", "Downtempo",
      "Illbient", "Psybient", "Lo-Fi Beats", "Glitch Hop", "Vaporwave",
    ],
  },
  {
    genre: "IDM & Experimental",
    subgenres: [
      "Intelligent Dance Music (IDM)", "Glitch", "Braindance", "Microhouse",
      "Folktronica", "Deconstructed Club", "Hyperpop",
    ],
  },
  {
    genre: "Synth & Retrowave",
    subgenres: [
      "Synthwave", "Darksynth", "Outrun", "Dreamwave", "Chillsynth",
      "Spacewave", "Sovietwave", "Future Funk",
    ],
  },
  {
    genre: "Industrial & EBM",
    subgenres: [
      "Electronic Body Music (EBM)", "Futurepop", "Aggrotech", "Dark Electro",
      "Electro-Industrial", "Witch House",
    ],
  },
  {
    genre: "Disco & Hi-NRG",
    subgenres: [
      "Hi-NRG", "Eurobeat", "Italo Disco", "Space Disco", "Eurodance", "Bubblegum Dance",
    ],
  },
  {
    genre: "Footwork & Juke",
    subgenres: ["Footwork", "Chicago Juke", "Ghettotech"],
  },
  {
    genre: "Post-Disco & Freestyle",
    subgenres: ["Freestyle", "Boogie", "Synth-Pop", "Dance-Pop"],
  },
];

export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function midiToName(midi: number): string {
  if (midi < 0) return "--";
  const note = NOTE_NAMES[Math.round(midi) % 12];
  const oct = Math.floor(Math.round(midi) / 12) - 1;
  return `${note}${oct}`;
}

export const SCALE_DEGREES: Record<string, number[]> = {
  Minor: [0, 2, 3, 5, 7, 8, 10],
  Major: [0, 2, 4, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
};

export interface TheoryChord {
  deg: number;
  quality: "min" | "maj" | "dim" | "dom" | "sus4" | "sus2";
  roman: string;
  ext: number[];
}

export interface GeneratedChord {
  bar: number;
  phrase: "THEME" | "VAR 8" | "VAR 11" | "VAR 12" | "VAR 16";
  roman: string;
  chordName: string;
  functionTag: string;
  notes: number[];
  isUnique?: boolean;
}

// Deterministic PRNG using Mulberry32 for smooth, uniform pseudo-random distributions
function createPRNG(seed: number) {
  let s = (Math.floor(seed) ^ 0x6d2b79f5) >>> 0;
  if (s === 0) s = 0x1337cafe;
  return function next(): number {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

export type HarmonicStyle =
  | "DEEP_HOUSE_GARAGE"
  | "ANTHEMIC_PROGRESSIVE"
  | "MELODIC_TECHNO"
  | "DARK_INDUSTRIAL_TECHNO"
  | "FUTURE_BASS_COLOR"
  | "LIQUID_DNB"
  | "DARK_DNB_DUBSTEP"
  | "SYNTHWAVE_RETRO"
  | "FUNK_DISCO"
  | "CHILL_LOFI_AMBIENT"
  | "HARDSTYLE_HARDCORE"
  | "BREAKS_CLUB";

export function getHarmonicStyle(subgenre: string, genre: string): HarmonicStyle {
  const s = subgenre.toLowerCase();
  const g = genre.toLowerCase();

  if (s.includes("future bass") || s.includes("color bass") || s.includes("hyperpop") || s.includes("chiptune")) {
    return "FUTURE_BASS_COLOR";
  }
  if (s.includes("liquid") || s.includes("chillstep")) {
    return "LIQUID_DNB";
  }
  if (s.includes("deep house") || s.includes("garage") || s.includes("ukg") || s.includes("amapiano") || s.includes("kwaito") || s.includes("afro house") || s.includes("microhouse")) {
    return "DEEP_HOUSE_GARAGE";
  }
  if (s.includes("progressive") || s.includes("trance") || s.includes("melodic house") || s.includes("dream") || s.includes("euphoric")) {
    return "ANTHEMIC_PROGRESSIVE";
  }
  if (s.includes("melodic techno") || s.includes("minimal techno") || s.includes("detroit")) {
    return "MELODIC_TECHNO";
  }
  if (g.includes("techno") || s.includes("industrial") || s.includes("ebm") || s.includes("dark") || s.includes("acid")) {
    return "DARK_INDUSTRIAL_TECHNO";
  }
  if (s.includes("synthwave") || s.includes("darksynth") || s.includes("outrun") || s.includes("dreamwave") || s.includes("retrowave")) {
    return "SYNTHWAVE_RETRO";
  }
  if (s.includes("disco") || s.includes("french touch") || s.includes("french house") || s.includes("funk") || s.includes("boogie")) {
    return "FUNK_DISCO";
  }
  if (g.includes("downtempo") || s.includes("ambient") || s.includes("lo-fi") || s.includes("chillout") || s.includes("trip hop") || s.includes("vaporwave")) {
    return "CHILL_LOFI_AMBIENT";
  }
  if (g.includes("hardcore") || s.includes("hardstyle") || s.includes("rawstyle") || s.includes("gabber")) {
    return "HARDSTYLE_HARDCORE";
  }
  if (g.includes("drum and bass") || g.includes("dubstep") || s.includes("neurofunk") || s.includes("jump up") || s.includes("tearout") || s.includes("riddim")) {
    return "DARK_DNB_DUBSTEP";
  }
  if (g.includes("break") || s.includes("breaks") || s.includes("jersey") || s.includes("baltimore") || s.includes("footwork")) {
    return "BREAKS_CLUB";
  }

  return "ANTHEMIC_PROGRESSIVE";
}

interface ChordOption {
  roman: string;
  nameSuffix: string;
  intervals: number[];
  functionTag: string;
}

// ==========================================
// Scale-Specific Chord Vocabularies
// ==========================================

// 1. Natural Minor Mode Vocabulary (0=i, 2=ii°, 3=bIII, 5=iv, 7=v/V, 8=bVI, 10=bVII, 1=bII)
const MINOR_VOCAB: Record<number, ChordOption[]> = {
  0: [
    { roman: "i9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Minor Tonic 9th" },
    { roman: "i11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Deep Minor 11th" },
    { roman: "i(add9)", nameSuffix: "m(add9)", intervals: [0, 3, 7, 14], functionTag: "Anthem Minor Add9" },
    { roman: "i7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Soul Minor 7th" },
    { roman: "i", nameSuffix: "m", intervals: [0, 3, 7, 12], functionTag: "Natural Minor Tonic" },
  ],
  1: [
    { roman: "bIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Neapolitan bII" },
    { roman: "bII(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Phrygian bII Add9" },
  ],
  2: [
    { roman: "iiø7", nameSuffix: "m7b5", intervals: [0, 3, 6, 10], functionTag: "Half-Diminished ii" },
    { roman: "ii9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Jazz ii 9th" },
    { roman: "ii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Minor ii" },
  ],
  3: [
    { roman: "bIIImaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Relative Major 9th" },
    { roman: "bIIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Warm Relative Major" },
    { roman: "bIII(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Sunlight Add9" },
    { roman: "bIII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Relative Major Anthem" },
  ],
  5: [
    { roman: "iv9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Minor Subdominant 9th" },
    { roman: "iv11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Deep Subdominant 11th" },
    { roman: "iv(add9)", nameSuffix: "m(add9)", intervals: [0, 3, 7, 14], functionTag: "Emotional Minor Sub" },
    { roman: "iv7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Classic Minor Sub" },
  ],
  7: [
    { roman: "v7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Modal Minor Dominant" },
    { roman: "v9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Mellow Dominant 9th" },
    { roman: "V7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Harmonic Dominant" },
    { roman: "V7(b9)", nameSuffix: "7(b9)", intervals: [0, 4, 7, 10, 13], functionTag: "Altered Dominant" },
    { roman: "V7sus4", nameSuffix: "7sus4", intervals: [0, 5, 7, 10], functionTag: "Suspension Turnaround" },
    { roman: "V7alt", nameSuffix: "7alt", intervals: [0, 4, 10, 13, 15], functionTag: "Jazz Altered Turn" },
  ],
  8: [
    { roman: "bVImaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Submediant Maj9" },
    { roman: "bVImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Warm Submediant" },
    { roman: "bVI(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Euphoric Lift" },
    { roman: "bVI", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Anthem Major Sixth" },
  ],
  10: [
    { roman: "bVII13", nameSuffix: "13", intervals: [0, 4, 7, 10, 14, 21], functionTag: "Soul 13th Turn" },
    { roman: "bVII9", nameSuffix: "9", intervals: [0, 4, 7, 10, 14], functionTag: "Smooth 9th" },
    { roman: "bVII7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Dominant 7th Subtonic" },
    { roman: "bVII(sus4)", nameSuffix: "sus4", intervals: [0, 5, 7, 10], functionTag: "Suspended Turnaround" },
    { roman: "bVII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Subtonic Drive" },
  ],
};

// 2. Major Mode Vocabulary (0=I, 2=ii, 4=iii, 5=IV, 7=V, 9=vi, 11=vii°, 10=bVII borrowed, 5=iv borrowed)
const MAJOR_VOCAB: Record<number, ChordOption[]> = {
  0: [
    { roman: "Imaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Major Tonic 9th" },
    { roman: "Imaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Major Tonic Seventh" },
    { roman: "I(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Bright Major Add9" },
    { roman: "I", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Pure Major Tonic" },
  ],
  2: [
    { roman: "ii9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Supertonic Minor 9th" },
    { roman: "ii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Diatonic Minor ii" },
    { roman: "ii11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Silky ii 11th" },
  ],
  4: [
    { roman: "iii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Mediant Minor 7th" },
    { roman: "iii9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Lush Mediant 9th" },
    { roman: "iii", nameSuffix: "m", intervals: [0, 3, 7, 12], functionTag: "Mediant Minor" },
  ],
  5: [
    { roman: "IVmaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Major Subdominant 9th" },
    { roman: "IVmaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Major Subdominant 7th" },
    { roman: "IV(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Sparkle Subdominant" },
    { roman: "IV", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Subdominant Major" },
    { roman: "iv6", nameSuffix: "m6", intervals: [0, 3, 7, 9], functionTag: "Gospel Borrowed Sub" },
  ],
  7: [
    { roman: "V7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Dominant Seventh" },
    { roman: "V9", nameSuffix: "9", intervals: [0, 4, 7, 10, 14], functionTag: "Dominant 9th" },
    { roman: "V7sus4", nameSuffix: "7sus4", intervals: [0, 5, 7, 10], functionTag: "Suspended Dominant" },
    { roman: "V13", nameSuffix: "13", intervals: [0, 4, 7, 10, 14, 21], functionTag: "Extended Dominant" },
    { roman: "V", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Pure Dominant" },
  ],
  9: [
    { roman: "vi9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Relative Minor 9th" },
    { roman: "vi7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Relative Minor 7th" },
    { roman: "vi(add9)", nameSuffix: "m(add9)", intervals: [0, 3, 7, 14], functionTag: "Sweet Sixth Add9" },
    { roman: "vi", nameSuffix: "m", intervals: [0, 3, 7, 12], functionTag: "Relative Minor" },
  ],
  10: [
    { roman: "bVII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Mixolydian Borrowed" },
    { roman: "bVII7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Borrowed Dominant 7" },
    { roman: "bVII(sus4)", nameSuffix: "sus4", intervals: [0, 5, 7, 10], functionTag: "Mixolydian Sus4" },
  ],
  11: [
    { roman: "viiø7", nameSuffix: "m7b5", intervals: [0, 3, 6, 10], functionTag: "Leading Tone Half-Dim" },
  ],
};

// 3. Dorian Mode Vocabulary (Characteristic Major IV!)
const DORIAN_VOCAB: Record<number, ChordOption[]> = {
  0: [
    { roman: "i9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Dorian Minor 9th" },
    { roman: "i7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Dorian Minor 7th" },
    { roman: "i(m6)", nameSuffix: "m6", intervals: [0, 3, 7, 9], functionTag: "Dorian Tonic 6th" },
  ],
  2: [
    { roman: "ii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Dorian ii Minor" },
  ],
  3: [
    { roman: "bIIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Mediant Major 7th" },
  ],
  5: [
    { roman: "IV7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Dorian Major IV (7)" },
    { roman: "IV9", nameSuffix: "9", intervals: [0, 4, 7, 10, 14], functionTag: "Dorian Major IV 9th" },
    { roman: "IV", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Characteristic Major IV" },
  ],
  7: [
    { roman: "v7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Minor Dominant" },
  ],
  10: [
    { roman: "bVIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Dorian bVII Maj7" },
    { roman: "bVII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Subtonic Drive" },
  ],
};

// 4. Phrygian Mode Vocabulary (Characteristic Major bII!)
const PHRYGIAN_VOCAB: Record<number, ChordOption[]> = {
  0: [
    { roman: "i7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Phrygian Tonic 7th" },
    { roman: "i", nameSuffix: "m", intervals: [0, 3, 7, 12], functionTag: "Dark Tonic Minor" },
  ],
  1: [
    { roman: "bIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Characteristic bII Maj7" },
    { roman: "bII(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Bright bII Add9" },
    { roman: "bII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Phrygian bII Major" },
  ],
  5: [
    { roman: "iv7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Minor Subdominant" },
    { roman: "iv9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Deep Subdominant 9th" },
  ],
  7: [
    { roman: "v°", nameSuffix: "dim", intervals: [0, 3, 6, 12], functionTag: "Diminished Fifth" },
    { roman: "v7b5", nameSuffix: "m7b5", intervals: [0, 3, 6, 10], functionTag: "Half-Dim Dominant" },
  ],
  8: [
    { roman: "bVImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Phrygian Submediant" },
    { roman: "bVI", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Major Sixth" },
  ],
  10: [
    { roman: "bvii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Minor Subtonic" },
  ],
};

// ==========================================
// Scale-Specific Progression Grammars
// ==========================================

interface ScaleGrammar {
  startRoots: number[];
  cadenceRoots: number[];
  var8Turnarounds: number[];
  bridgeRootsA: number[];
  bridgeRootsB: number[];
  climaxRoots: number[];
  transitions: Record<number, number[]>;
  vocab: Record<number, ChordOption[]>;
}

const SCALE_GRAMMARS: Record<string, ScaleGrammar> = {
  Minor: {
    startRoots: [0, 8, 5],
    cadenceRoots: [10, 7, 5],
    var8Turnarounds: [7, 10, 2],
    bridgeRootsA: [5, 2, 1, 3],
    bridgeRootsB: [7, 8, 10],
    climaxRoots: [7, 10, 1],
    transitions: {
      0: [8, 5, 3, 10],
      8: [10, 3, 5, 0],
      3: [10, 5, 8, 7],
      5: [7, 10, 8, 0],
      7: [0, 8, 10],
      10: [0, 8, 3, 7],
      2: [7, 10, 0],
      1: [0, 7, 8],
    },
    vocab: MINOR_VOCAB,
  },
  Major: {
    startRoots: [0, 5, 9, 2],
    cadenceRoots: [7, 5, 0],
    var8Turnarounds: [7, 2, 10],
    bridgeRootsA: [4, 2, 5],
    bridgeRootsB: [7, 9, 5],
    climaxRoots: [7, 10],
    transitions: {
      0: [5, 7, 9, 2],
      5: [7, 0, 9, 4],
      7: [0, 9, 5],
      9: [5, 2, 7, 0],
      2: [7, 5, 0],
      4: [9, 5, 2],
      10: [0, 5, 7],
    },
    vocab: MAJOR_VOCAB,
  },
  Dorian: {
    startRoots: [0, 5],
    cadenceRoots: [10, 7, 5],
    var8Turnarounds: [5, 10, 7],
    bridgeRootsA: [3, 2, 5],
    bridgeRootsB: [10, 7, 0],
    climaxRoots: [5, 10],
    transitions: {
      0: [5, 10, 3, 7],
      5: [0, 10, 7, 2],
      10: [0, 5, 3],
      7: [0, 5],
      3: [5, 10, 0],
      2: [5, 7, 0],
    },
    vocab: DORIAN_VOCAB,
  },
  Phrygian: {
    startRoots: [0, 1],
    cadenceRoots: [1, 7, 10],
    var8Turnarounds: [1, 7],
    bridgeRootsA: [5, 8, 1],
    bridgeRootsB: [7, 1, 0],
    climaxRoots: [1, 7],
    transitions: {
      0: [1, 8, 5, 10],
      1: [0, 5, 7, 8],
      5: [1, 7, 8, 0],
      8: [1, 5, 0],
      10: [0, 1, 8],
      7: [0, 1],
    },
    vocab: PHRYGIAN_VOCAB,
  },
};

/**
 * Intelligent Voice Leading Engine:
 * Adjusts chord inversions so voices glide into one another with minimal pitch displacement,
 * maintaining a grounded bass root and smooth upper harmony like a real producer.
 */
function voiceLeadChord(
  rootMidi: number,
  intervals: number[],
  previousUpperNotes: number[] | null,
  voicing: string,
  complexity: string
): number[] {
  let noteCount = 4;
  if (complexity === "Triads") noteCount = 3;
  else if (complexity === "7ths") noteCount = 4;
  else if (complexity === "9ths/11ths") noteCount = Math.min(5, intervals.length);

  const activeIntervals = intervals.slice(0, noteCount);

  // 1. Solid Bass Root in low register (MIDI 36–48)
  let bassNote = 36 + (rootMidi % 12);
  while (bassNote < 36) bassNote += 12;
  while (bassNote > 48) bassNote -= 12;

  // 2. Upper Harmony notes in middle register (MIDI 48–72)
  let upper = activeIntervals.map((intv) => {
    let n = rootMidi + intv;
    while (n < 48) n += 12;
    while (n > 72) n -= 12;
    return n;
  });

  // Apply Voicing Transformations
  if (voicing === "Open" && upper.length >= 3) {
    upper[1] += 12;
  } else if (voicing === "Drop 2" && upper.length >= 4) {
    upper.sort((a, b) => a - b);
    upper[upper.length - 2] -= 12;
  } else if (voicing === "Inversion 1" && upper.length >= 2) {
    upper.sort((a, b) => a - b);
    upper[0] += 12;
  }

  // 3. Smooth Voice Leading relative to previous chord
  if (previousUpperNotes && previousUpperNotes.length > 0) {
    const prevCenter = previousUpperNotes.reduce((a, b) => a + b, 0) / previousUpperNotes.length;
    let currentCenter = upper.reduce((a, b) => a + b, 0) / upper.length;

    while (currentCenter - prevCenter > 6) {
      upper = upper.map((n) => n - 12);
      currentCenter -= 12;
    }
    while (prevCenter - currentCenter > 6) {
      upper = upper.map((n) => n + 12);
      currentCenter += 12;
    }
  }

  upper = upper.map((n) => Math.max(45, Math.min(79, n)));
  const fullChord = [bassNote, ...upper];
  return Array.from(new Set(fullChord)).sort((a, b) => a - b);
}

function pickChordForRoot(
  rootSemitone: number,
  vocab: Record<number, ChordOption[]>,
  rng: () => number
): ChordOption {
  const options = vocab[rootSemitone] || MINOR_VOCAB[rootSemitone] || MINOR_VOCAB[0];
  const idx = Math.floor(rng() * options.length);
  return options[idx] || options[0];
}

/**
 * Main procedural generator:
 * Adapts strictly to selected scaleName (Major -> Major chord progression, Minor -> Minor progression, etc.).
 * Only the 8th bar, 11th bar, 12th bar, and 16th bar are unique from the rest of the chord progression.
 * Procedural PRNG seeded by genre/subgenre + user seed guarantees unlimited variations.
 */
export function generateProceduralProgression(params: {
  subgenre: string;
  genre: string;
  scaleName: string;
  barsCount: 4 | 8 | 16;
  seed: number;
  complexity: string;
  voicing: string;
  keyRootMidi: number;
}): GeneratedChord[] {
  const { subgenre, genre, scaleName, barsCount, seed, complexity, voicing, keyRootMidi } = params;

  // 1. Select the scale grammar based on chosen key type (Major, Minor, Dorian, Phrygian)
  const grammar = SCALE_GRAMMARS[scaleName] || SCALE_GRAMMARS.Minor;

  // Composite seed using subgenre string + scale + user seed for unique character per subgenre
  const genreHash = hashString(`${subgenre}_${genre}_${scaleName}`);
  const combinedSeed = (seed * 65537 + genreHash * 31) >>> 0;
  const rng = createPRNG(combinedSeed);

  const pick = (arr: number[]) => arr[Math.floor(rng() * arr.length)];
  const nextRoot = (current: number, pool: number[]) => {
    const allowed = grammar.transitions[current] || pool;
    const candidates = allowed.filter((r) => r !== current);
    return pick(candidates.length > 0 ? candidates : allowed);
  };

  // --- Step 1: Generate the Core 4-Bar Theme (Bars 1, 2, 3, 4) ---
  const t0 = pick(grammar.startRoots);
  const t1 = nextRoot(t0, grammar.transitions[t0] || [5, 7, 8]);
  const t2 = nextRoot(t1, grammar.transitions[t1] || [7, 8, 10]);
  let t3 = pick(grammar.cadenceRoots);
  if (t3 === t2) t3 = pick(grammar.cadenceRoots.filter((c) => c !== t2)) || t3;

  const themeRoots = [t0, t1, t2, t3];
  const themeChords = themeRoots.map((root) => pickChordForRoot(root, grammar.vocab, rng));

  // --- Step 2: Generate the UNIQUE Bar 8 Turnaround Chord ---
  const var8Candidates = grammar.var8Turnarounds.filter((r) => r !== t3);
  const var8Root = pick(var8Candidates.length > 0 ? var8Candidates : grammar.var8Turnarounds);
  const var8Chord = pickChordForRoot(var8Root, grammar.vocab, rng);

  // --- Step 3: Generate the UNIQUE Bar 11 (Bridge Departure Chord A) ---
  const var11Candidates = grammar.bridgeRootsA.filter((r) => r !== t0 && r !== t1);
  const var11Root = pick(var11Candidates.length > 0 ? var11Candidates : grammar.bridgeRootsA);
  const var11Chord = pickChordForRoot(var11Root, grammar.vocab, rng);

  // --- Step 4: Generate the UNIQUE Bar 12 (Bridge Departure Chord B) ---
  const var12Candidates = (grammar.transitions[var11Root] || grammar.bridgeRootsB).filter((r) => r !== var11Root && r !== t3);
  const var12Root = pick(var12Candidates.length > 0 ? var12Candidates : grammar.bridgeRootsB);
  const var12Chord = pickChordForRoot(var12Root, grammar.vocab, rng);

  // --- Step 5: Generate the UNIQUE Bar 16 (Climax Drop Turnaround) ---
  const var16Candidates = grammar.climaxRoots.filter((r) => r !== t3 && r !== var8Root);
  const var16Root = pick(var16Candidates.length > 0 ? var16Candidates : grammar.climaxRoots);
  const var16Chord = pickChordForRoot(var16Root, grammar.vocab, rng);

  // --- Step 6: Assemble the Progression according to barsCount ---
  interface StepAssignment {
    bar: number;
    phrase: "THEME" | "VAR 8" | "VAR 11" | "VAR 12" | "VAR 16";
    root: number;
    chord: ChordOption;
    isUnique: boolean;
  }

  const barSteps: StepAssignment[] = [];

  for (let b = 1; b <= barsCount; b++) {
    if (b === 8) {
      barSteps.push({ bar: 8, phrase: "VAR 8", root: var8Root, chord: var8Chord, isUnique: true });
    } else if (b === 11) {
      barSteps.push({ bar: 11, phrase: "VAR 11", root: var11Root, chord: var11Chord, isUnique: true });
    } else if (b === 12) {
      barSteps.push({ bar: 12, phrase: "VAR 12", root: var12Root, chord: var12Chord, isUnique: true });
    } else if (b === 16) {
      barSteps.push({ bar: 16, phrase: "VAR 16", root: var16Root, chord: var16Chord, isUnique: true });
    } else {
      const themeIndex = (b - 1) % 4;
      barSteps.push({
        bar: b,
        phrase: "THEME",
        root: themeRoots[themeIndex],
        chord: themeChords[themeIndex],
        isUnique: false,
      });
    }
  }

  const generatedChords: GeneratedChord[] = [];
  let prevUpperNotes: number[] | null = null;

  barSteps.forEach((step) => {
    const chordRootMidi = keyRootMidi + step.root;
    const rootNoteName = NOTE_NAMES[chordRootMidi % 12];
    const chordName = `${rootNoteName}${step.chord.nameSuffix}`;

    const notes = voiceLeadChord(chordRootMidi, step.chord.intervals, prevUpperNotes, voicing, complexity);
    prevUpperNotes = notes.slice(1);

    generatedChords.push({
      bar: step.bar,
      phrase: step.phrase,
      roman: step.chord.roman,
      chordName,
      functionTag: step.isUnique ? `★ ${step.chord.functionTag}` : step.chord.functionTag,
      notes,
      isUnique: step.isUnique,
    });
  });

  return generatedChords;
}

export const GENRE_THEORY_PROGRESSIONS: Record<string, TheoryChord[][]> = {
  "Deep House": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 4, quality: "min", roman: "v7", ext: [0, 3, 7, 10] },
      { deg: 3, quality: "min", roman: "iv9", ext: [0, 3, 7, 10, 14] },
      { deg: 6, quality: "maj", roman: "bVII7", ext: [0, 4, 7, 10] },
    ],
  ],
};

export const DEFAULT_THEORY_PROGRESSIONS: TheoryChord[][] = [
  [
    { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
    { deg: 5, quality: "maj", roman: "bVImaj7", ext: [0, 4, 7, 11] },
    { deg: 2, quality: "maj", roman: "bIIImaj7", ext: [0, 4, 7, 11] },
    { deg: 6, quality: "maj", roman: "bVII7", ext: [0, 4, 7, 10] },
  ],
];

export interface NoteEvent {
  time: number;
  duration: number;
  midi: number;
  velocity: number;
}

export function generateProgressionNotes(
  progression: TheoryChord[],
  rootMidi: number = 60,
  scaleDegrees: number[] = [0, 2, 3, 5, 7, 8, 10],
  chordDurationBars: number = 1
): NoteEvent[] {
  const notes: NoteEvent[] = [];
  const barDuration = 2.0;

  progression.forEach((chord, idx) => {
    const startTime = idx * chordDurationBars * barDuration;
    const duration = chordDurationBars * barDuration - 0.05;
    const baseDegreeSemitones = scaleDegrees[chord.deg % scaleDegrees.length];
    const chordRoot = rootMidi + baseDegreeSemitones;

    chord.ext.forEach((interval) => {
      notes.push({
        time: startTime,
        duration,
        midi: chordRoot + interval,
        velocity: 0.8,
      });
    });
  });

  return notes;
}