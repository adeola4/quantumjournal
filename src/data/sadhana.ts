// QDR Sadhana Tool — Complete Data Model
// Source: Nithyanandam SadhanaTool architecture doc
// 30 practices with full ten-axis taxonomy

export type Kosha = "annamaya" | "pranamaya" | "manomaya" | "vijnanamaya" | "anandamaya";
export type Instrument = "kaya" | "prana" | "vak" | "manas" | "buddhi" | "bhava" | "kriya" | "tyaga" | "satsang" | "dhyana";
export type EntryState = "tamas" | "rajas" | "sattva";
export type ExitState = "activated" | "settled" | "expanded" | "sharpened" | "dissolved" | "blissful";
export type Adhikara = "sarvajana" | "shishya" | "sadhaka" | "diksha_required" | "sannyasa_only";
export type Cadence = "nitya" | "vara" | "paksha" | "masa" | "ritu" | "varsha" | "anusthana";

export interface MuhurtaWeights {
  brahma_muhurta?: number;
  pratah?: number;
  madhyahna?: number;
  aparahna?: number;
  sayahna?: number;
  pradosh?: number;
  ratri?: number;
  nishitha?: number;
  ardhayama?: number;
}

export interface CostVector {
  time_minutes: number;
  ojas_spend: number;
  physical_load: number;
  cognitive_load: number;
  emotional_intensity: number;
  recovery_needed_minutes: number;
}

export interface Sadhana {
  id: string;
  name: string;
  tradition: string;
  icon: string;
  koshas: Kosha[];
  primary_kosha: Kosha;
  instruments: Instrument[];
  entry_state: EntryState[];
  exit_state: ExitState;
  cost: CostVector;
  adhikara: Adhikara;
  muhurta_affinity: MuhurtaWeights;
  cadence: Cadence;
  complements: string[];
  clashes: string[];
  requires_after: string[];
  forbidden_after: string[];
  recuperation: string[];
  description: string;
  source: string;
}

export const MUHURTA_BANDS = [
  { id: "brahma_muhurta", name: "Brahma Muhurta", start: 4, end: 6, color: "#fbbf24" },
  { id: "pratah", name: "Pratah", start: 6, end: 9, color: "#f97316" },
  { id: "madhyahna", name: "Madhyahna", start: 9, end: 12, color: "#eab308" },
  { id: "aparahna", name: "Aparahna", start: 12, end: 16, color: "#84cc16" },
  { id: "sayahna", name: "Sayahna", start: 16, end: 19, color: "#22d3ee" },
  { id: "pradosh", name: "Pradosh", start: 19, end: 21, color: "#818cf8" },
  { id: "ratri", name: "Ratri", start: 21, end: 22, color: "#6366f1" },
  { id: "nishitha", name: "Nishitha", start: 22, end: 2, color: "#312e81" },
  { id: "ardhyama", name: "Ardhayama", start: 2, end: 4, color: "#1e1b4b" },
];

export const KOSHA_META: Record<Kosha, { name: string; layer: string; icon: string; color: string }> = {
  annamaya: { name: "Annamaya", layer: "Physical sheath", icon: "🌾", color: "#84cc16" },
  pranamaya: { name: "Pranamaya", layer: "Vital sheath", icon: "🌬️", color: "#22d3ee" },
  manomaya: { name: "Manomaya", layer: "Mental sheath", icon: "💭", color: "#f97316" },
  vijnanamaya: { name: "Vijnanamaya", layer: "Wisdom sheath", icon: "🧠", color: "#a855f7" },
  anandamaya: { name: "Anandamaya", layer: "Bliss sheath", icon: "✨", color: "#fbbf24" },
};

export const INSTRUMENT_META: Record<Instrument, { name: string; icon: string }> = {
  kaya: { name: "Kaya (Body)", icon: "🤸" },
  prana: { name: "Prana (Breath)", icon: "🌬️" },
  vak: { name: "Vak (Speech)", icon: "🗣️" },
  manas: { name: "Manas (Mind)", icon: "💭" },
  buddhi: { name: "Buddhi (Intellect)", icon: "🧠" },
  bhava: { name: "Bhava (Devotion)", icon: "🙏" },
  kriya: { name: "Kriya (Action)", icon: "🤲" },
  tyaga: { name: "Tyaga (Renunciation)", icon: "🕊️" },
  satsang: { name: "Satsang (Company)", icon: "👥" },
  dhyana: { name: "Dhyana (Awareness)", icon: "🧘" },
};

export const SADHANA_LIBRARY: Sadhana[] = [
  {
    id: "nitya_dhyaan_001",
    name: "Nithya Dhyaan",
    tradition: "Nithyananda Yoga",
    icon: "🧘",
    koshas: ["manomaya", "pranamaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "dhyana"],
    entry_state: ["rajas", "sattva"],
    exit_state: "dissolved",
    cost: { time_minutes: 25, ojas_spend: 3, physical_load: 1, cognitive_load: 2, emotional_intensity: 4, recovery_needed_minutes: 10 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 8, sayahna: 6, ratri: 4 },
    cadence: "nitya",
    complements: ["yoga_nidra_001", "mauna_001", "gratitude_001"],
    clashes: ["kapalabhati_001"],
    requires_after: ["seal_yoga_nidra_001"],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001", "shavasana_001"],
    description: "Core meditation practice — settling the mind into pure awareness.",
    source: "Nithyananda Yoga"
  },
  {
    id: "yoga_nidra_001",
    name: "Yoga Nidra",
    tradition: "Yoga",
    icon: "😴",
    koshas: ["manomaya", "pranamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "prana"],
    entry_state: ["tamas", "rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 30, ojas_spend: 1, physical_load: 0, cognitive_load: 1, emotional_intensity: 2, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 6, sayahna: 10, ratri: 8, pradosh: 9 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001", "shavasana_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Yogic sleep — deep restoration while maintaining awareness.",
    source: "Yoga Tradition"
  },
  {
    id: "kapalabhati_001",
    name: "Kapalabhati",
    tradition: "Kundalini Yoga",
    icon: "🔥",
    koshas: ["pranamaya", "annamaya"],
    primary_kosha: "pranamaya",
    instruments: ["prana", "kaya"],
    entry_state: ["tamas"],
    exit_state: "activated",
    cost: { time_minutes: 15, ojas_spend: 6, physical_load: 4, cognitive_load: 3, emotional_intensity: 5, recovery_needed_minutes: 10 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: ["mauna_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001", "shavasana_001"],
    description: "Skull-shining breath — energizing and heating pranayama.",
    source: "Kundalini Yoga"
  },
  {
    id: "bhastrika_001",
    name: "Bhastrika",
    tradition: "Hatha Yoga",
    icon: "🌪️",
    koshas: ["pranamaya", "annamaya"],
    primary_kosha: "pranamaya",
    instruments: ["prana", "kaya"],
    entry_state: ["tamas"],
    exit_state: "activated",
    cost: { time_minutes: 10, ojas_spend: 7, physical_load: 5, cognitive_load: 3, emotional_intensity: 6, recovery_needed_minutes: 15 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 7 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: ["mauna_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Bellows force — rapid breath generating inner heat and energy.",
    source: "Hatha Yoga Pradipika"
  },
  {
    id: "nadi_shodhana_001",
    name: "Nadi Shodhana",
    tradition: "Hatha Yoga",
    icon: "🌊",
    koshas: ["pranamaya", "manomaya"],
    primary_kosha: "pranamaya",
    instruments: ["prana", "manas"],
    entry_state: ["rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 15, ojas_spend: 2, physical_load: 1, cognitive_load: 2, emotional_intensity: 2, recovery_needed_minutes: 5 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 9, pratah: 8, sayahna: 7, ratri: 6 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001", "asana_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Alternate nostril breathing — balances ida and pingala.",
    source: "Hatha Yoga Pradipika"
  },
  {
    id: "asana_001",
    name: "Asana Practice",
    tradition: "Hatha Yoga",
    icon: "🤸",
    koshas: ["annamaya", "pranamaya"],
    primary_kosha: "annamaya",
    instruments: ["kaya", "prana"],
    entry_state: ["tamas", "rajas"],
    exit_state: "activated",
    cost: { time_minutes: 45, ojas_spend: 4, physical_load: 7, cognitive_load: 2, emotional_intensity: 3, recovery_needed_minutes: 15 },
    adhikara: "sarvajana",
    muhurta_affinity: { pratah: 10, brahma_muhurta: 8, aparahna: 6 },
    cadence: "nitya",
    complements: ["pranayama_001", "nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["shavasana_001", "yoga_nidra_001"],
    description: "Physical postures preparing the body for meditation.",
    source: "Yoga Sutras of Patanjali"
  },
  {
    id: "surya_namaskar_001",
    name: "Surya Namaskar",
    tradition: "Hatha Yoga",
    icon: "☀️",
    koshas: ["annamaya", "pranamaya"],
    primary_kosha: "annamaya",
    instruments: ["kaya", "prana"],
    entry_state: ["tamas"],
    exit_state: "activated",
    cost: { time_minutes: 20, ojas_spend: 5, physical_load: 8, cognitive_load: 2, emotional_intensity: 3, recovery_needed_minutes: 10 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 9 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["shavasana_001"],
    description: "Sun salutation — 12-posture flowing sequence honoring solar energy.",
    source: "Hatha Yoga"
  },
  {
    id: "mauna_001",
    name: "Mauna (Silence)",
    tradition: "Vedanta",
    icon: "🤫",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["vak", "tyaga", "dhyana"],
    entry_state: ["rajas", "sattva"],
    exit_state: "dissolved",
    cost: { time_minutes: 60, ojas_spend: 2, physical_load: 0, cognitive_load: 3, emotional_intensity: 5, recovery_needed_minutes: 15 },
    adhikara: "sadhaka",
    muhurta_affinity: { brahma_muhurta: 8, ratri: 10, nishitha: 8 },
    cadence: "vara",
    complements: ["nitya_dhyaan_001", "kirtan_001", "gratitude_001"],
    clashes: ["kapalabhati_001", "bhastrika_001", "kirtan_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Vow of silence — stilling the verbal mind to reveal pure awareness.",
    source: "Vedanta Tradition"
  },
  {
    id: "japa_001",
    name: "Japa (Mantra)",
    tradition: "Bhakti Yoga",
    icon: "📿",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["vak", "manas"],
    entry_state: ["rajas", "sattva"],
    exit_state: "expanded",
    cost: { time_minutes: 20, ojas_spend: 2, physical_load: 0, cognitive_load: 2, emotional_intensity: 4, recovery_needed_minutes: 5 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 8, sayahna: 7, ratri: 6 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001", "svadhyaya_001"],
    clashes: ["mauna_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Repetition of sacred mantra — purifying the subtle body.",
    source: "Bhakti Yoga"
  },
  {
    id: "kirtan_001",
    name: "Kirtan (Chanting)",
    tradition: "Bhakti Yoga",
    icon: "🎵",
    koshas: ["manomaya", "anandamaya", "pranamaya"],
    primary_kosha: "anandamaya",
    instruments: ["vak", "bhava"],
    entry_state: ["rajas", "sattva"],
    exit_state: "blissful",
    cost: { time_minutes: 30, ojas_spend: 3, physical_load: 1, cognitive_load: 1, emotional_intensity: 6, recovery_needed_minutes: 10 },
    adhikara: "sarvajana",
    muhurta_affinity: { sayahna: 10, pradosh: 9, ratri: 8 },
    cadence: "nitya",
    complements: ["mauna_001", "nitya_dhyaan_001"],
    clashes: ["mauna_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Devotional singing — channeling emotion into divine love.",
    source: "Bhakti Yoga"
  },
  {
    id: "svadhyaya_001",
    name: "Svadhyaya (Study)",
    tradition: "Jnana Yoga",
    icon: "📖",
    koshas: ["vijnanamaya"],
    primary_kosha: "vijnanamaya",
    instruments: ["buddhi"],
    entry_state: ["sattva"],
    exit_state: "sharpened",
    cost: { time_minutes: 30, ojas_spend: 2, physical_load: 0, cognitive_load: 6, emotional_intensity: 3, recovery_needed_minutes: 5 },
    adhikara: "sarvajana",
    muhurta_affinity: { pratah: 8, madhyahna: 10, aparahna: 8 },
    cadence: "nitya",
    complements: ["japa_001", "nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Self-study through scripture — sharpening the intellect.",
    source: "Yoga Sutras of Patanjali"
  },
  {
    id: "trataka_001",
    name: "Trataka (Concentration)",
    tradition: "Hatha Yoga",
    icon: "👁️",
    koshas: ["manomaya", "vijnanamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas"],
    entry_state: ["sattva"],
    exit_state: "sharpened",
    cost: { time_minutes: 15, ojas_spend: 3, physical_load: 1, cognitive_load: 5, emotional_intensity: 3, recovery_needed_minutes: 5 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 9, pratah: 7, ratri: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Fixed gaze meditation — developing one-pointed concentration.",
    source: "Hatha Yoga Pradipika"
  },
  {
    id: "yoga_nidra_001r",
    name: "Yoga Nidra (Recovery)",
    tradition: "Yoga",
    icon: "🌙",
    koshas: ["manomaya", "pranamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas"],
    entry_state: ["tamas", "rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 40, ojas_spend: 0, physical_load: 0, cognitive_load: 1, emotional_intensity: 1, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { sayahna: 10, ratri: 9, pradosh: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Deep yogic sleep for restoration and ojas recovery.",
    source: "Yoga Tradition"
  },
  {
    id: "upavasa_001",
    name: "Upavasa (Fasting)",
    tradition: "Ayurveda",
    icon: "🍽️",
    koshas: ["annamaya", "pranamaya"],
    primary_kosha: "annamaya",
    instruments: ["tyaga"],
    entry_state: ["rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 0, ojas_spend: 4, physical_load: 2, cognitive_load: 3, emotional_intensity: 4, recovery_needed_minutes: 30 },
    adhikara: "sadhaka",
    muhurta_affinity: {},
    cadence: "vara",
    complements: ["nitya_dhyaan_001", "pranayama_001"],
    clashes: ["asana_001"],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["sattvic_meal_001"],
    description: "Voluntary fasting — purifying the digestive system and clarifying mind.",
    source: "Ayurveda"
  },
  {
    id: "completion_001",
    name: "Completion Practice",
    tradition: "Nithyananda Yoga",
    icon: "🔮",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "dhyana"],
    entry_state: ["rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 20, ojas_spend: 2, physical_load: 0, cognitive_load: 4, emotional_intensity: 5, recovery_needed_minutes: 10 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 8, sayahna: 10, ratri: 7 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Processing and releasing incomplete patterns and bio-memories.",
    source: "Nithyananda Yoga"
  },
  {
    id: "unclutching_001",
    name: "Unclutching",
    tradition: "Nithyananda Yoga",
    icon: "🕊️",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "dhyana"],
    entry_state: ["rajas", "sattva"],
    exit_state: "dissolved",
    cost: { time_minutes: 15, ojas_spend: 2, physical_load: 0, cognitive_load: 3, emotional_intensity: 4, recovery_needed_minutes: 5 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 7, sayahna: 9, ratri: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Releasing grasping and clinging — letting go into pure being.",
    source: "Nithyananda Yoga"
  },
  {
    id: "shavasana_001",
    name: "Shavasana",
    tradition: "Hatha Yoga",
    icon: "⚰️",
    koshas: ["annamaya", "manomaya"],
    primary_kosha: "annamaya",
    instruments: ["kaya", "manas"],
    entry_state: ["rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 10, ojas_spend: 0, physical_load: 0, cognitive_load: 0, emotional_intensity: 1, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: {},
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Corpse pose — deep relaxation and integration after practice.",
    source: "Hatha Yoga"
  },
  {
    id: "sattvic_meal_001",
    name: "Sattvic Meal",
    tradition: "Ayurveda",
    icon: "🥗",
    koshas: ["annamaya"],
    primary_kosha: "annamaya",
    instruments: ["kriya"],
    entry_state: ["tamas", "rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 30, ojas_spend: -2, physical_load: 0, cognitive_load: 1, emotional_intensity: 1, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { madhyahna: 10, aparahna: 8 },
    cadence: "nitya",
    complements: ["walking_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Pure, plant-based meal prepared and eaten with awareness.",
    source: "Ayurveda"
  },
  {
    id: "walking_001",
    name: "Walking (Prithvi Sadhana)",
    tradition: "Universal",
    icon: "🚶",
    koshas: ["annamaya", "pranamaya"],
    primary_kosha: "annamaya",
    instruments: ["kaya", "prana"],
    entry_state: ["tamas", "rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 30, ojas_spend: 1, physical_load: 3, cognitive_load: 1, emotional_intensity: 1, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { pratah: 10, aparahna: 8, sayahna: 9 },
    cadence: "nitya",
    complements: ["gratitude_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Mindful walking, preferably barefoot on earth — grounding practice.",
    source: "Universal"
  },
  {
    id: "gratitude_001",
    name: "Gratitude Journaling",
    tradition: "Universal",
    icon: "🙏",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["bhava", "manas"],
    entry_state: ["rajas", "sattva"],
    exit_state: "blissful",
    cost: { time_minutes: 5, ojas_spend: 0, physical_load: 0, cognitive_load: 1, emotional_intensity: 2, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { sayahna: 10, ratri: 9 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Daily gratitude practice — sealing the day with recognition.",
    source: "Universal"
  },
  {
    id: "puja_001",
    name: "Puja (Worship)",
    tradition: "Hinduism",
    icon: "🪔",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "anandamaya",
    instruments: ["bhava", "kriya"],
    entry_state: ["rajas", "sattva"],
    exit_state: "blissful",
    cost: { time_minutes: 20, ojas_spend: 2, physical_load: 1, cognitive_load: 2, emotional_intensity: 5, recovery_needed_minutes: 5 },
    adhikara: "sarvajana",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 9, sayahna: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Ritual worship — offering devotion to the divine.",
    source: "Hindu Tradition"
  },
  {
    id: "seva_001",
    name: "Seva (Service)",
    tradition: "Karma Yoga",
    icon: "🤲",
    koshas: ["annamaya", "manomaya"],
    primary_kosha: "manomaya",
    instruments: ["kriya", "bhava"],
    entry_state: ["tamas", "rajas", "sattva"],
    exit_state: "expanded",
    cost: { time_minutes: 60, ojas_spend: 3, physical_load: 5, cognitive_load: 3, emotional_intensity: 4, recovery_needed_minutes: 15 },
    adhikara: "sarvajana",
    muhurta_affinity: { madhyahna: 10, aparahna: 9 },
    cadence: "vara",
    complements: ["gratitude_001", "nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Selfless service — action without attachment to results.",
    source: "Bhagavad Gita"
  },
  {
    id: "dana_001",
    name: "Dana (Charity)",
    tradition: "Dharma",
    icon: "💰",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["kriya", "bhava"],
    entry_state: ["rajas", "sattva"],
    exit_state: "expanded",
    cost: { time_minutes: 15, ojas_spend: 1, physical_load: 0, cognitive_load: 1, emotional_intensity: 3, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { madhyahna: 10, aparahna: 8 },
    cadence: "vara",
    complements: ["gratitude_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Giving without expectation — dissolving the ego through generosity.",
    source: "Dharma Shastras"
  },
  {
    id: "satsang_001",
    name: "Satsang (Company)",
    tradition: "Vedanta",
    icon: "👥",
    koshas: ["manomaya", "vijnanamaya", "anandamaya"],
    primary_kosha: "vijnanamaya",
    instruments: ["satsang", "buddhi"],
    entry_state: ["rajas", "sattva"],
    exit_state: "expanded",
    cost: { time_minutes: 60, ojas_spend: 1, physical_load: 0, cognitive_load: 3, emotional_intensity: 3, recovery_needed_minutes: 5 },
    adhikara: "sarvajana",
    muhurta_affinity: { sayahna: 10, pradosh: 9, ratri: 7 },
    cadence: "vara",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Association with truth — gathering with seekers and teachers.",
    source: "Vedanta"
  },
  {
    id: "guru_yoga_001",
    name: "Guru Yoga",
    tradition: "Vajrayana",
    icon: "🙏",
    koshas: ["anandamaya", "manomaya"],
    primary_kosha: "anandamaya",
    instruments: ["bhava", "dhyana"],
    entry_state: ["sattva"],
    exit_state: "blissful",
    cost: { time_minutes: 30, ojas_spend: 2, physical_load: 0, cognitive_load: 2, emotional_intensity: 5, recovery_needed_minutes: 10 },
    adhikara: "diksha_required",
    muhurta_affinity: { brahma_muhurta: 10, pratah: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Merging with the guru's consciousness — devotion as path to self-realization.",
    source: "Vajrayana"
  },
  {
    id: "ajapa_japa_001",
    name: "Ajapa Japa",
    tradition: "Kundalini Yoga",
    icon: "🌬️",
    koshas: ["pranamaya", "anandamaya"],
    primary_kosha: "pranamaya",
    instruments: ["prana", "dhyana"],
    entry_state: ["sattva"],
    exit_state: "dissolved",
    cost: { time_minutes: 30, ojas_spend: 2, physical_load: 0, cognitive_load: 2, emotional_intensity: 3, recovery_needed_minutes: 10 },
    adhikara: "diksha_required",
    muhurta_affinity: { brahma_muhurta: 10, ratri: 8 },
    cadence: "nitya",
    complements: ["yoga_nidra_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Spontaneous mantra repetition synchronized with breath.",
    source: "Kundalini Yoga"
  },
  {
    id: "nirvikalpa_001",
    name: "Nirvikalpa Dhyana",
    tradition: "Advaita Vedanta",
    icon: "✨",
    koshas: ["anandamaya"],
    primary_kosha: "anandamaya",
    instruments: ["dhyana"],
    entry_state: ["sattva"],
    exit_state: "blissful",
    cost: { time_minutes: 45, ojas_spend: 4, physical_load: 0, cognitive_load: 1, emotional_intensity: 2, recovery_needed_minutes: 20 },
    adhikara: "sadhaka",
    muhurta_affinity: { brahma_muhurta: 10, ratri: 8 },
    cadence: "nitya",
    complements: ["yoga_nidra_001"],
    clashes: [],
    requires_after: ["yoga_nidra_001"],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001", "shavasana_001"],
    description: "Meditation without seed — pure awareness beyond all modification.",
    source: "Advaita Vedanta"
  },
  {
    id: "brahmacharya_001",
    name: "Brahmacharya (Moderation)",
    tradition: "Yoga",
    icon: "🔥",
    koshas: ["pranamaya", "annamaya"],
    primary_kosha: "pranamaya",
    instruments: ["tyaga"],
    entry_state: ["rajas", "sattva"],
    exit_state: "settled",
    cost: { time_minutes: 0, ojas_spend: -3, physical_load: 0, cognitive_load: 2, emotional_intensity: 3, recovery_needed_minutes: 0 },
    adhikara: "sadhaka",
    muhurta_affinity: {},
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Conservation of vital energy — moderation in all activities.",
    source: "Yoga Sutras of Patanjali"
  },
  {
    id: "earlier_sleep_001",
    name: "Earlier Sleep",
    tradition: "Ayurveda",
    icon: "🌙",
    koshas: ["annamaya", "pranamaya"],
    primary_kosha: "annamaya",
    instruments: ["tyaga"],
    entry_state: ["tamas"],
    exit_state: "settled",
    cost: { time_minutes: 0, ojas_spend: -4, physical_load: 0, cognitive_load: 0, emotional_intensity: 0, recovery_needed_minutes: 0 },
    adhikara: "sarvajana",
    muhurta_affinity: { ratri: 10 },
    cadence: "nitya",
    complements: [],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Sleeping before 10pm — the deepest ojas restoration practice.",
    source: "Ayurveda"
  },
  {
    id: "dream_yoga_001",
    name: "Dream Yoga",
    tradition: "Tibetan Buddhism",
    icon: "💭",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "dhyana"],
    entry_state: ["tamas"],
    exit_state: "expanded",
    cost: { time_minutes: 15, ojas_spend: 1, physical_load: 0, cognitive_load: 3, emotional_intensity: 3, recovery_needed_minutes: 5 },
    adhikara: "diksha_required",
    muhurta_affinity: { nishitha: 10, ardhayama: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Lucid dreaming as spiritual practice — recognizing the dream state.",
    source: "Tibetan Buddhism"
  },
  {
    id: "chakra_meditation_001",
    name: "Chakra Meditation",
    tradition: "Tantra",
    icon: "🔮",
    koshas: ["pranamaya", "anandamaya"],
    primary_kosha: "pranamaya",
    instruments: ["manas", "prana", "dhyana"],
    entry_state: ["sattva"],
    exit_state: "expanded",
    cost: { time_minutes: 25, ojas_spend: 4, physical_load: 0, cognitive_load: 3, emotional_intensity: 4, recovery_needed_minutes: 10 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 10, ratri: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Energy center meditation — awakening and balancing the chakras.",
    source: "Tantra"
  },
  {
    id: "nada_yoga_001",
    name: "Nada Yoga",
    tradition: "Yoga",
    icon: "🎶",
    koshas: ["manomaya", "anandamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas", "dhyana"],
    entry_state: ["sattva"],
    exit_state: "dissolved",
    cost: { time_minutes: 30, ojas_spend: 2, physical_load: 0, cognitive_load: 2, emotional_intensity: 3, recovery_needed_minutes: 10 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 9, ratri: 10 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: ["yoga_nidra_001"],
    description: "Yoga of inner sound — listening to the subtle vibrations of being.",
    source: "Yoga Tradition"
  },
  {
    id: "yantra_001",
    name: "Yantra Meditation",
    tradition: "Tantra",
    icon: "🔯",
    koshas: ["manomaya", "vijnanamaya"],
    primary_kosha: "manomaya",
    instruments: ["manas"],
    entry_state: ["sattva"],
    exit_state: "sharpened",
    cost: { time_minutes: 20, ojas_spend: 2, physical_load: 0, cognitive_load: 4, emotional_intensity: 2, recovery_needed_minutes: 5 },
    adhikara: "shishya",
    muhurta_affinity: { brahma_muhurta: 9, pratah: 8 },
    cadence: "nitya",
    complements: ["nitya_dhyaan_001"],
    clashes: [],
    requires_after: [],
    forbidden_after: [],
    recuperation: [],
    description: "Sacred geometry meditation — using visual diagrams to focus awareness.",
    source: "Tantra"
  },
];

// Complement matrix (directed graph)
export const COMPLEMENT_MATRIX: Record<string, { complements: string[]; clashes: string[] }> = {};
SADHANA_LIBRARY.forEach((s) => {
  COMPLEMENT_MATRIX[s.id] = {
    complements: s.complements,
    clashes: s.clashes,
  };
});

// Get current muhurta band
export function getCurrentMuhurta(): typeof MUHURTA_BANDS[number] {
  const hour = new Date().getHours();
  for (const band of MUHURTA_BANDS) {
    if (band.start < band.end) {
      if (hour >= band.start && hour < band.end) return band;
    } else {
      // Wraps midnight
      if (hour >= band.start || hour < band.end) return band;
    }
  }
  return MUHURTA_BANDS[0];
}

// Calculate kosha fill from selected sadhanas
export function calculateKoshaFill(selectedIds: string[]): Record<Kosha, number> {
  const fill: Record<Kosha, number> = { annamaya: 0, pranamaya: 0, manomaya: 0, vijnanamaya: 0, anandamaya: 0 };
  selectedIds.forEach((id) => {
    const s = SADHANA_LIBRARY.find((s) => s.id === id);
    if (s) {
      s.koshas.forEach((k) => {
        fill[k] = Math.min(100, fill[k] + (s.cost.ojas_spend > 0 ? s.cost.ojas_spend * 5 : 5));
      });
    }
  });
  return fill;
}

// Calculate total ojas
export function calculateOjas(selectedIds: string[]): number {
  let ojas = 5; // Base daily ojas
  selectedIds.forEach((id) => {
    const s = SADHANA_LIBRARY.find((s) => s.id === id);
    if (s) {
      ojas -= s.cost.ojas_spend;
    }
  });
  return ojas;
}

// Check for clashes
export function checkClashes(selectedIds: string[]): string[] {
  const warnings: string[] = [];
  selectedIds.forEach((id) => {
    const s = SADHANA_LIBRARY.find((s) => s.id === id);
    if (s) {
      selectedIds.forEach((otherId) => {
        if (id !== otherId && s.clashes.includes(otherId)) {
          const other = SADHANA_LIBRARY.find((s) => s.id === otherId);
          warnings.push(`${s.name} clashes with ${other?.name}`);
        }
      });
    }
  });
  return [...new Set(warnings)];
}

// Get complements for a practice
export function getComplements(id: string): Sadhana[] {
  const s = SADHANA_LIBRARY.find((s) => s.id === id);
  if (!s) return [];
  return SADHANA_LIBRARY.filter((other) => s.complements.includes(other.id));
}
