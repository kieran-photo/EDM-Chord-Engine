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

export const GENRE_THEORY_PROGRESSIONS: Record<string, TheoryChord[][]> = {
  "Deep House": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 4, quality: "min", roman: "v7", ext: [0, 3, 7, 10] },
      { deg: 3, quality: "min", roman: "iv9", ext: [0, 3, 7, 10, 14] },
      { deg: 6, quality: "maj", roman: "bVII7", ext: [0, 4, 7, 10] },
    ],
    [
      { deg: 0, quality: "min", roman: "i11", ext: [0, 3, 7, 10, 14, 17] },
      { deg: 3, quality: "min", roman: "iv9", ext: [0, 3, 7, 10, 14] },
      { deg: 5, quality: "maj", roman: "bVImaj9", ext: [0, 4, 7, 11, 14] },
      { deg: 4, quality: "min", roman: "v7", ext: [0, 3, 7, 10] },
    ],
  ],
  "Progressive House": [
    [
      { deg: 0, quality: "min", roman: "i(add9)", ext: [0, 3, 7, 14] },
      { deg: 5, quality: "maj", roman: "bVImaj7", ext: [0, 4, 7, 11] },
      { deg: 2, quality: "maj", roman: "bIII(add9)", ext: [0, 4, 7, 14] },
      { deg: 6, quality: "maj", roman: "bVII(sus2)", ext: [0, 2, 7, 10] },
    ],
  ],
  "Kawaii Future Bass": [
    [
      { deg: 3, quality: "maj", roman: "IVmaj9", ext: [0, 4, 7, 11, 14] },
      { deg: 4, quality: "dom", roman: "V9", ext: [0, 4, 7, 10, 14] },
      { deg: 2, quality: "min", roman: "iii7", ext: [0, 3, 7, 10] },
      { deg: 5, quality: "min", roman: "vi9", ext: [0, 3, 7, 10, 14] },
    ],
  ],
  "Melodic Future Bass": [
    [
      { deg: 5, quality: "maj", roman: "bVImaj9", ext: [0, 4, 7, 11, 14] },
      { deg: 6, quality: "sus4", roman: "bVII(sus4)", ext: [0, 5, 7, 10] },
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 2, quality: "maj", roman: "bIIImaj7", ext: [0, 4, 7, 11] },
    ],
  ],
  "Color Bass": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 2, quality: "maj", roman: "bIIImaj9", ext: [0, 4, 7, 11, 14] },
      { deg: 5, quality: "maj", roman: "bVImaj9", ext: [0, 4, 7, 11, 14] },
      { deg: 6, quality: "dom", roman: "bVII11", ext: [0, 4, 7, 10, 14, 17] },
    ],
  ],
  "Uplifting Trance": [
    [
      { deg: 0, quality: "min", roman: "i", ext: [0, 3, 7, 12] },
      { deg: 5, quality: "maj", roman: "bVI", ext: [0, 4, 7, 12] },
      { deg: 2, quality: "maj", roman: "bIII", ext: [0, 4, 7, 12] },
      { deg: 6, quality: "maj", roman: "bVII", ext: [0, 4, 7, 12] },
    ],
  ],
  "Melodic Dubstep": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 5, quality: "maj", roman: "bVImaj7", ext: [0, 4, 7, 11] },
      { deg: 3, quality: "min", roman: "iv(add9)", ext: [0, 3, 7, 14] },
      { deg: 4, quality: "min", roman: "v7", ext: [0, 3, 7, 10] },
    ],
  ],
  "Melodic Techno": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 5, quality: "maj", roman: "bVImaj7", ext: [0, 4, 7, 11] },
      { deg: 3, quality: "min", roman: "iv9", ext: [0, 3, 7, 10, 14] },
      { deg: 4, quality: "sus4", roman: "v(sus4)", ext: [0, 5, 7, 10] },
    ],
  ],
  "Liquid Funk DnB": [
    [
      { deg: 0, quality: "min", roman: "i9", ext: [0, 3, 7, 10, 14] },
      { deg: 3, quality: "min", roman: "iv9", ext: [0, 3, 7, 10, 14] },
      { deg: 6, quality: "dom", roman: "bVII11", ext: [0, 4, 7, 10, 14, 17] },
      { deg: 2, quality: "maj", roman: "bIIImaj9", ext: [0, 4, 7, 11, 14] },
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
  [
    { deg: 0, quality: "min", roman: "i7", ext: [0, 3, 7, 10] },
    { deg: 3, quality: "min", roman: "iv7", ext: [0, 3, 7, 10] },
    { deg: 4, quality: "min", roman: "v7", ext: [0, 3, 7, 10] },
    { deg: 5, quality: "maj", roman: "bVImaj7", ext: [0, 4, 7, 11] },
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
