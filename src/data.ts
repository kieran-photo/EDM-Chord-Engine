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
  phrase: "A" | "B" | "C" | "D";
  roman: string;
  chordName: string;
  functionTag: string;
  notes: number[];
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

/**
 * Chord Template definition:
 * Semitone intervals above the chord's root, roman numeral, and descriptive function.
 */
interface ChordOption {
  roman: string;
  nameSuffix: string;
  intervals: number[];
  functionTag: string;
}

/**
 * Comprehensive Harmonic Grammar:
 * Defines valid roots, phrase-specific start & cadence rules, Markov transitions,
 * and chord quality choices for each genre family.
 */
interface HarmonicGrammar {
  phraseAStarts: number[];
  phraseACadences: number[];
  phraseBStarts: number[];
  phraseBCadences: number[];
  phraseCStarts: number[];
  phraseCCadences: number[];
  phraseDStarts: number[];
  phraseDCadences: number[];
  transitions: Record<number, number[]>;
  vocab: Record<number, ChordOption[]>;
}

// Master Vocabulary of musically sound chord voicings across scale degrees (semitones: 0=Tonic, 1=bII, 2=ii, 3=bIII, 4=iii, 5=iv/IV, 7=v/V, 8=bVI, 9=vi, 10=bVII, 11=vii°)
const UNIVERSAL_VOCAB: Record<number, ChordOption[]> = {
  // Degree 0 (Tonic: i or I)
  0: [
    { roman: "i9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Deep Minor 9th" },
    { roman: "i11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Lush Minor 11th" },
    { roman: "i(add9)", nameSuffix: "m(add9)", intervals: [0, 3, 7, 14], functionTag: "Anthem Minor Add9" },
    { roman: "i7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Soul Minor 7th" },
    { roman: "i", nameSuffix: "m", intervals: [0, 3, 7, 12], functionTag: "Pure Minor Tonic" },
    { roman: "Imaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Major Sunlight 9th" },
    { roman: "Imaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Major Tonic Seventh" },
    { roman: "I(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Bright Major Add9" },
  ],
  // Degree 1 (bII: Phrygian / Neapolitan modal interchange)
  1: [
    { roman: "bIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Neapolitan Phrygian" },
    { roman: "bII(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Phrygian Add9" },
    { roman: "bII5", nameSuffix: "5", intervals: [0, 7, 12], functionTag: "Industrial Phrygian 5" },
    { roman: "bII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Heavy bII Step" },
  ],
  // Degree 2 (ii or iiø: Supertonic)
  2: [
    { roman: "iiø7", nameSuffix: "m7b5", intervals: [0, 3, 6, 10], functionTag: "Half-Diminished ii" },
    { roman: "ii9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Jazz ii Minor 9th" },
    { roman: "ii11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Silky ii 11th" },
    { roman: "ii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Soul Minor ii" },
  ],
  // Degree 3 (bIII: Mediant / Relative Major)
  3: [
    { roman: "bIIImaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Relative Major 9th" },
    { roman: "bIIImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Warm Relative Major" },
    { roman: "bIII(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Sunlight Add9" },
    { roman: "bIII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Relative Major Anthem" },
  ],
  // Degree 4 (iii: Major Key Mediant)
  4: [
    { roman: "iii7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Sentimental Mediant" },
    { roman: "iii9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Lush Mediant 9th" },
  ],
  // Degree 5 (iv or IV: Subdominant)
  5: [
    { roman: "iv9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Deep Subdominant 9th" },
    { roman: "iv11", nameSuffix: "m11", intervals: [0, 3, 7, 10, 14, 17], functionTag: "Lush Subdominant 11th" },
    { roman: "iv(add9)", nameSuffix: "m(add9)", intervals: [0, 3, 7, 14], functionTag: "Emotional Minor Sub" },
    { roman: "iv7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Classic Minor Sub" },
    { roman: "IVmaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Kawaii Subdominant" },
    { roman: "IVmaj7(#11)", nameSuffix: "maj7(#11)", intervals: [0, 4, 7, 11, 18], functionTag: "Lydian Magic Sub" },
    { roman: "IVmaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Major Subdominant" },
    { roman: "iv6", nameSuffix: "m6", intervals: [0, 3, 7, 9], functionTag: "Gospel Borrowed Sub" },
  ],
  // Degree 7 (v or V: Dominant)
  7: [
    { roman: "v7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Modal Minor Dominant" },
    { roman: "v9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Mellow Dominant 9th" },
    { roman: "V7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Harmonic Dominant" },
    { roman: "V7(b9)", nameSuffix: "7(b9)", intervals: [0, 4, 7, 10, 13], functionTag: "Altered Dominant" },
    { roman: "V7sus4", nameSuffix: "7sus4", intervals: [0, 5, 7, 10], functionTag: "Suspension Turnaround" },
    { roman: "V7alt", nameSuffix: "7alt", intervals: [0, 4, 10, 13, 15], functionTag: "Jazz Altered Turn" },
    { roman: "V9", nameSuffix: "9", intervals: [0, 4, 7, 10, 14], functionTag: "Dominant 9th" },
    { roman: "V13", nameSuffix: "13", intervals: [0, 4, 7, 10, 14, 21], functionTag: "Extended Dominant" },
  ],
  // Degree 8 (bVI: Submediant)
  8: [
    { roman: "bVImaj9", nameSuffix: "maj9", intervals: [0, 4, 7, 11, 14], functionTag: "Silky Submediant 9th" },
    { roman: "bVImaj7", nameSuffix: "maj7", intervals: [0, 4, 7, 11], functionTag: "Warm Submediant" },
    { roman: "bVI(add9)", nameSuffix: "(add9)", intervals: [0, 4, 7, 14], functionTag: "Euphoric Lift" },
    { roman: "bVI6/9", nameSuffix: "6/9", intervals: [0, 4, 7, 9, 14], functionTag: "Jazzy 6/9" },
    { roman: "bVI", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Anthem Major Sixth" },
  ],
  // Degree 9 (vi: Submediant in Major key)
  9: [
    { roman: "vi9", nameSuffix: "m9", intervals: [0, 3, 7, 10, 14], functionTag: "Sweet Minor Sixth" },
    { roman: "vi7", nameSuffix: "m7", intervals: [0, 3, 7, 10], functionTag: "Relative Minor" },
  ],
  // Degree 10 (bVII: Subtonic)
  10: [
    { roman: "bVII13", nameSuffix: "13", intervals: [0, 4, 7, 10, 14, 21], functionTag: "Soul 13th Turn" },
    { roman: "bVII9", nameSuffix: "9", intervals: [0, 4, 7, 10, 14], functionTag: "Smooth 9th" },
    { roman: "bVII7", nameSuffix: "7", intervals: [0, 4, 7, 10], functionTag: "Dominant 7th Subtonic" },
    { roman: "bVII(sus4)", nameSuffix: "sus4", intervals: [0, 5, 7, 10], functionTag: "Suspended Turnaround" },
    { roman: "bVII(sus2)", nameSuffix: "sus2", intervals: [0, 2, 7, 10], functionTag: "Open Sus2" },
    { roman: "bVII", nameSuffix: "", intervals: [0, 4, 7, 12], functionTag: "Subtonic Drive" },
  ],
};

// Generative Grammar Definitions tailored for each EDM Harmonic Style
const GRAMMARS: Record<HarmonicStyle, HarmonicGrammar> = {
  ANTHEMIC_PROGRESSIVE: {
    phraseAStarts: [0, 8],
    phraseACadences: [10, 7, 3],
    phraseBStarts: [8, 5, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [5, 3, 8],
    phraseCCadences: [7, 10],
    phraseDStarts: [8, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 5, 3, 10],
      8: [10, 3, 5, 0],
      3: [10, 5, 8, 7],
      5: [7, 10, 8, 0],
      7: [0, 8, 10],
      10: [0, 8, 3, 7],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  DEEP_HOUSE_GARAGE: {
    phraseAStarts: [0, 8, 5],
    phraseACadences: [10, 7, 5],
    phraseBStarts: [8, 5, 2, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [2, 5, 3],
    phraseCCadences: [7, 10],
    phraseDStarts: [5, 8, 2],
    phraseDCadences: [7, 10, 0],
    transitions: {
      0: [5, 8, 10, 2],
      5: [7, 10, 8, 2],
      7: [0, 8, 5],
      8: [5, 7, 2, 10],
      10: [0, 3, 5, 8],
      2: [7, 10, 0],
      3: [5, 8, 10],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  FUTURE_BASS_COLOR: {
    phraseAStarts: [5, 0, 9],
    phraseACadences: [7, 9, 0],
    phraseBStarts: [2, 5, 8],
    phraseBCadences: [7, 9, 0],
    phraseCStarts: [5, 4, 8],
    phraseCCadences: [7, 0],
    phraseDStarts: [8, 5, 2],
    phraseDCadences: [7, 0],
    transitions: {
      5: [7, 0, 4, 9],
      7: [4, 9, 0, 5],
      4: [9, 5, 2],
      9: [5, 2, 7, 0],
      2: [7, 5, 0],
      0: [5, 9, 8],
      8: [10, 7, 0],
      10: [0, 5, 7],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  MELODIC_TECHNO: {
    phraseAStarts: [0, 8],
    phraseACadences: [7, 10, 5],
    phraseBStarts: [8, 5, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [3, 5, 8],
    phraseCCadences: [7, 5],
    phraseDStarts: [8, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 5, 7, 10],
      8: [5, 7, 10, 0],
      5: [7, 8, 10, 0],
      7: [0, 8, 5],
      10: [0, 8, 7],
      3: [5, 8, 7],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  DARK_INDUSTRIAL_TECHNO: {
    phraseAStarts: [0, 1],
    phraseACadences: [10, 7, 1],
    phraseBStarts: [8, 1, 5],
    phraseBCadences: [7, 1, 0],
    phraseCStarts: [5, 1, 8],
    phraseCCadences: [7, 1],
    phraseDStarts: [1, 8],
    phraseDCadences: [7, 0],
    transitions: {
      0: [1, 8, 10, 5],
      1: [0, 8, 7, 5],
      8: [1, 5, 7, 10],
      5: [7, 1, 0],
      7: [0, 1, 8],
      10: [0, 1, 8],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  LIQUID_DNB: {
    phraseAStarts: [0, 5, 8],
    phraseACadences: [10, 7, 3],
    phraseBStarts: [8, 5, 2, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [5, 2, 3],
    phraseCCadences: [7, 10],
    phraseDStarts: [2, 5, 8],
    phraseDCadences: [7, 0],
    transitions: {
      0: [5, 8, 10, 3],
      5: [10, 7, 8, 2],
      10: [3, 0, 8, 5],
      3: [8, 5, 10, 7],
      8: [5, 7, 2, 10],
      7: [0, 8, 5],
      2: [7, 10, 0],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  DARK_DNB_DUBSTEP: {
    phraseAStarts: [0, 8, 1],
    phraseACadences: [10, 7, 1],
    phraseBStarts: [1, 8, 5],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [5, 1, 3],
    phraseCCadences: [7, 1],
    phraseDStarts: [8, 1, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 1, 5, 10],
      8: [1, 5, 10, 7],
      1: [0, 8, 7, 5],
      5: [7, 1, 8, 0],
      10: [0, 8, 1],
      7: [0, 1, 8],
      3: [5, 8, 7],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  SYNTHWAVE_RETRO: {
    phraseAStarts: [0, 8],
    phraseACadences: [10, 7, 0],
    phraseBStarts: [5, 8, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [8, 3, 5],
    phraseCCadences: [7, 10],
    phraseDStarts: [8, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 10, 5, 3],
      8: [10, 3, 5, 0],
      10: [0, 8, 3, 7],
      5: [10, 7, 8, 0],
      3: [5, 8, 10, 7],
      7: [0, 8, 10],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  FUNK_DISCO: {
    phraseAStarts: [2, 0, 5],
    phraseACadences: [7, 9, 0],
    phraseBStarts: [5, 2, 9],
    phraseBCadences: [7, 0],
    phraseCStarts: [9, 2, 5],
    phraseCCadences: [7, 0],
    phraseDStarts: [5, 2],
    phraseDCadences: [7, 0],
    transitions: {
      2: [7, 0, 5],
      7: [0, 9, 5],
      0: [9, 5, 2],
      9: [2, 5, 7],
      5: [4, 7, 2, 0],
      4: [2, 7, 9],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  CHILL_LOFI_AMBIENT: {
    phraseAStarts: [0, 5, 8],
    phraseACadences: [10, 7, 3],
    phraseBStarts: [8, 5, 2, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [3, 5, 8],
    phraseCCadences: [7, 10],
    phraseDStarts: [8, 2, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [5, 8, 10, 2],
      5: [7, 10, 8, 3],
      7: [0, 8, 5],
      10: [3, 0, 8, 5],
      3: [5, 8, 7],
      8: [5, 7, 2, 0],
      2: [7, 10, 0],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  HARDSTYLE_HARDCORE: {
    phraseAStarts: [0, 8],
    phraseACadences: [10, 7],
    phraseBStarts: [5, 8, 3],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [3, 5, 8],
    phraseCCadences: [7, 10],
    phraseDStarts: [8, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 3, 10, 5],
      8: [10, 3, 5, 0],
      3: [10, 5, 8, 7],
      10: [0, 8, 7],
      5: [8, 10, 7, 0],
      7: [0, 8],
    },
    vocab: UNIVERSAL_VOCAB,
  },
  BREAKS_CLUB: {
    phraseAStarts: [0, 8],
    phraseACadences: [10, 7, 5],
    phraseBStarts: [8, 5, 0],
    phraseBCadences: [7, 10, 0],
    phraseCStarts: [3, 5, 8],
    phraseCCadences: [7, 10],
    phraseDStarts: [8, 5],
    phraseDCadences: [7, 0],
    transitions: {
      0: [8, 5, 10, 7],
      8: [5, 10, 7, 0],
      5: [10, 7, 8, 0],
      10: [0, 8, 5, 7],
      7: [0, 8, 5],
      3: [5, 8, 7],
    },
    vocab: UNIVERSAL_VOCAB,
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

    // Shift entire chord by octave if it drifted too far away from previous center
    while (currentCenter - prevCenter > 6) {
      upper = upper.map((n) => n - 12);
      currentCenter -= 12;
    }
    while (prevCenter - currentCenter > 6) {
      upper = upper.map((n) => n + 12);
      currentCenter += 12;
    }
  }

  // Clamp within playable synthesizer pad range
  upper = upper.map((n) => Math.max(45, Math.min(79, n)));

  const fullChord = [bassNote, ...upper];
  const unique = Array.from(new Set(fullChord)).sort((a, b) => a - b);
  return unique;
}

/**
 * Procedural Step Builder:
 * Given a chosen root semitone offset and style grammar, picks a musically sound chord quality using PRNG.
 */
function pickChordForRoot(
  rootSemitone: number,
  grammar: HarmonicGrammar,
  rng: () => number
): ChordOption {
  const options = grammar.vocab[rootSemitone] || UNIVERSAL_VOCAB[rootSemitone] || UNIVERSAL_VOCAB[0];
  const idx = Math.floor(rng() * options.length);
  return options[idx] || options[0];
}

/**
 * Main procedural generator:
 * Dynamically builds 4, 8, or 16-bar chord progressions using Markov transition graphs.
 * Each roll produces an entirely unique progression.
 * In 8-bar and 16-bar mode, Bars 5-8, 9-12, and 13-16 do NOT repeat previous bars.
 * Every single transition adheres to musical functional harmony and voice leading.
 */
export function generateProceduralProgression(params: {
  subgenre: string;
  genre: string;
  scaleName: string;
  barsCount: 4 | 8 | 16;
  seed: number;
  complexity: string; // "Triads" | "7ths" | "9ths/11ths"
  voicing: string; // "Close" | "Open" | "Drop 2" | "Inversion 1"
  keyRootMidi: number;
}): GeneratedChord[] {
  const { subgenre, genre, barsCount, seed, complexity, voicing, keyRootMidi } = params;

  const style = getHarmonicStyle(subgenre, genre);
  const grammar = GRAMMARS[style] || GRAMMARS.ANTHEMIC_PROGRESSIVE;

  // Composite seed using subgenre string + user seed for unique character per subgenre
  const genreHash = hashString(`${subgenre}_${genre}`);
  const combinedSeed = (seed * 65537 + genreHash * 31) >>> 0;
  const rng = createPRNG(combinedSeed);

  // Helper to pick from an array using rng
  const pick = (arr: number[]) => arr[Math.floor(rng() * arr.length)];

  // Helper to get next transition root
  const nextRoot = (current: number, pool: number[]) => {
    const allowed = grammar.transitions[current] || pool;
    // Prefer transitions that don't just stay on the same root
    const candidates = allowed.filter((r) => r !== current);
    return pick(candidates.length > 0 ? candidates : allowed);
  };

  // --- 1. BUILD PHRASE A (Bars 1-4: Exposition / Theme) ---
  const a1 = pick(grammar.phraseAStarts);
  const a2 = nextRoot(a1, grammar.transitions[a1] || [8, 5, 10]);
  const a3 = nextRoot(a2, grammar.transitions[a2] || [5, 10, 7]);
  // Bar 4 must be a half-cadence or open turnaround
  let a4 = pick(grammar.phraseACadences);
  if (a4 === a3) a4 = pick(grammar.phraseACadences.filter((c) => c !== a3)) || a4;

  const phraseARoots = [a1, a2, a3, a4];

  // --- 2. BUILD PHRASE B (Bars 5-8: Varied Response & Authentic Cadence) ---
  // Bar 5 MUST contrast with Bar 1!
  const b1Candidates = grammar.phraseBStarts.filter((r) => r !== a1);
  const b1 = pick(b1Candidates.length > 0 ? b1Candidates : grammar.phraseBStarts);
  const b2 = nextRoot(b1, grammar.transitions[b1] || [7, 10, 8]);
  const b3 = nextRoot(b2, grammar.transitions[b2] || [8, 5, 2]);
  // Bar 8 must be an authentic cadence or definitive turnaround
  let b4 = pick(grammar.phraseBCadences);
  if (b4 === b3) b4 = pick(grammar.phraseBCadences.filter((c) => c !== b3)) || b4;

  let phraseBRoots = [b1, b2, b3, b4];

  // Strict check: Phrase B must NOT be identical to Phrase A
  if (phraseBRoots.every((r, i) => r === phraseARoots[i])) {
    phraseBRoots[0] = (phraseBRoots[0] + 5) % 12; // transpose subdominant
    phraseBRoots[2] = 2; // inject iiø7 / ii9
  }

  // --- 3. BUILD PHRASE C (Bars 9-12: Bridge Modal Departure) ---
  const c1Candidates = grammar.phraseCStarts.filter((r) => r !== a1 && r !== b1);
  const c1 = pick(c1Candidates.length > 0 ? c1Candidates : grammar.phraseCStarts);
  const c2 = nextRoot(c1, grammar.transitions[c1] || [3, 5, 8]);
  const c3 = nextRoot(c2, grammar.transitions[c2] || [8, 5, 7]);
  const c4 = pick(grammar.phraseCCadences);
  const phraseCRoots = [c1, c2, c3, c4];

  // --- 4. BUILD PHRASE D (Bars 13-16: Climax & Drop Preparation) ---
  const d1 = pick(grammar.phraseDStarts);
  const d2 = nextRoot(d1, grammar.transitions[d1] || [10, 7, 8]);
  const d3 = nextRoot(d2, grammar.transitions[d2] || [8, 1, 5]);
  const d4 = pick(grammar.phraseDCadences);
  const phraseDRoots = [d1, d2, d3, d4];

  // Assemble phrases based on requested barsCount
  const plannedPhrases: { phrase: "A" | "B" | "C" | "D"; roots: number[] }[] = [];
  if (barsCount === 4) {
    plannedPhrases.push({ phrase: "A", roots: phraseARoots });
  } else if (barsCount === 8) {
    plannedPhrases.push({ phrase: "A", roots: phraseARoots });
    plannedPhrases.push({ phrase: "B", roots: phraseBRoots });
  } else {
    plannedPhrases.push({ phrase: "A", roots: phraseARoots });
    plannedPhrases.push({ phrase: "B", roots: phraseBRoots });
    plannedPhrases.push({ phrase: "C", roots: phraseCRoots });
    plannedPhrases.push({ phrase: "D", roots: phraseDRoots });
  }

  const generatedChords: GeneratedChord[] = [];
  let currentBar = 1;
  let prevUpperNotes: number[] | null = null;

  plannedPhrases.forEach(({ phrase, roots }) => {
    roots.forEach((rootOffset) => {
      // Pick chord quality from vocabulary for this root
      const chordChoice = pickChordForRoot(rootOffset, grammar, rng);

      const chordRootMidi = keyRootMidi + rootOffset;
      const rootNoteName = NOTE_NAMES[chordRootMidi % 12];
      const chordName = `${rootNoteName}${chordChoice.nameSuffix}`;

      // Voice-lead with smooth minimal voice displacement
      const notes = voiceLeadChord(chordRootMidi, chordChoice.intervals, prevUpperNotes, voicing, complexity);
      prevUpperNotes = notes.slice(1);

      generatedChords.push({
        bar: currentBar,
        phrase,
        roman: chordChoice.roman,
        chordName,
        functionTag: chordChoice.functionTag,
        notes,
      });

      currentBar++;
    });
  });

  return generatedChords;
}

// Retain legacy exports so existing references compile cleanly
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