// QDR Data — embedded from Google Sheets
// Source: https://docs.google.com/spreadsheets/d/1AzcyRsXQsBqvcqt2aiLDED1CIz6FYam4_OBu8FjeaKI/edit

export interface Tattva {
  num: number;
  name: string;
  category: string;
  description: string;
}

export interface ConsciousnessState {
  state: string;
  description: string;
  practice: string;
}

export interface Navatattva {
  num: number;
  name: string;
  element: string;
  direction: string;
  practice: string;
}

export interface ShivaFace {
  face: string;
  direction: string;
  cosmicFunction: string;
  practice: string;
}

export const FOUR_PRINCIPLES = [
  { name: "Integrity", tattva: "Satya", power: "Words", definition: "Honoring your word, commitments, and intentions." },
  { name: "Authenticity", tattva: "Shraddha", power: "Thinking", definition: "Aligning with your highest potential and true self." },
  { name: "Responsibility", tattva: "Svarajya", power: "Feeling", definition: "Taking ownership of your reality and actions." },
  { name: "Enriching", tattva: "Paropakar", power: "Living", definition: "Contributing to the lives of others selflessly." }
];

export const FOURTEEN_FORCES = [
  { name: "Gravity", sanskrit: "Gurutva Shakti", description: "The force of attraction that holds matter together" },
  { name: "Electromagnetic Force", sanskrit: "Vidyut Shakti", description: "Responsible for electric and magnetic fields and radiation" },
  { name: "Weak Nuclear Force", sanskrit: "Durbal Shakti", description: "Governs radioactive decay and particle transformation" },
  { name: "Strong Nuclear Force", sanskrit: "Bal Shakti", description: "Binds protons and neutrons together in an atom's nucleus" },
  { name: "Embodied Consciousness", sanskrit: "Chit Shakti", description: "Pure awareness and consciousness that animates all living beings" },
  { name: "Life Force", sanskrit: "Prana Shakti", description: "Vital energy that sustains life and drives all biological functions" },
  { name: "Time Force", sanskrit: "Kala Shakti", description: "Governs the progression of time, cycles of creation" },
  { name: "Willpower Force", sanskrit: "Icchā Shakti", description: "Intention, desire, and determination that initiates action" },
  { name: "Knowledge Force", sanskrit: "Jnana Shakti", description: "Wisdom, understanding, and perception that leads to higher awareness" },
  { name: "Action Force", sanskrit: "Kriya Shakti", description: "Manifests intention into action and drives creation" },
  { name: "Sound Force", sanskrit: "Mantra Shakti", description: "Vibrational energy of sacred sounds and words" },
  { name: "Geometrical Force", sanskrit: "Yantra Shakti", description: "Energy inherent in sacred geometrical patterns" },
  { name: "Illusionary Force", sanskrit: "Maya Shakti", description: "Creates the perception of duality and separation" },
  { name: "Bliss Force", sanskrit: "Ananda Shakti", description: "Pure joy, bliss, and ecstasy that is the essence of divine consciousness" }
];

export const TWENTY_NINE_STATES: ConsciousnessState[] = [
  { state: "Sushupti (Deep Sleep)", description: "Unconscious state, potential awareness", practice: "Rest, integration" },
  { state: "Svapna (Dream)", description: "Subconscious processing", practice: "Dream journaling, lucid awareness" },
  { state: "Jagrat (Waking)", description: "Normal waking consciousness", practice: "Mindfulness, presence" },
  { state: "Jagrat-Svapna", description: "Waking dream state", practice: "Creative visualization" },
  { state: "Jagrat-Sushupti", description: "Deep rest in waking", practice: "Yoga nidra, deep meditation" },
  { state: "Svapna-Jagrat", description: "Lucid dreaming", practice: "Dream yoga" },
  { state: "Svapna-Sushupti", description: "Deep unconscious", practice: "Hypnagogic practices" },
  { state: "Sushupti-Jagrat", description: "Awakening from deep sleep", practice: "Morning rituals" },
  { state: "Sushupti-Svapna", description: "Deep dream state", practice: "Subconscious healing" },
  { state: "Turiya (Awakened)", description: "Fourth state, witness consciousness", practice: "Self-inquiry, witness stance" },
  { state: "Turiyatita (Alive)", description: "Beyond fourth, continuous awareness", practice: "Sahaja samadhi" },
  { state: "Bodha", description: "Awakening, illumination", practice: "Study, contemplation" },
  { state: "Prajna", description: "Deep wisdom, insight", practice: "Meditation, self-inquiry" },
  { state: "Sat-Chit-Ananda", description: "Being-Consciousness-Bliss", practice: "Nididhyasana" },
  { state: "Tapas", description: "Austerity, inner fire", practice: "Discipline, sadhana" },
  { state: "Bhakti", description: "Devotion, love", practice: "Worship, chanting" },
  { state: "Vairagya", description: "Dispassion, detachment", practice: "Renunciation practices" },
  { state: "Shraddha", description: "Faith, trust", practice: "Surrender, trust in process" },
  { state: "Virya", description: "Energy, vigor", practice: "Active practice, courage" },
  { state: "Dharana", description: "Concentration", practice: "Focused attention" },
  { state: "Dhyana", description: "Meditation", practice: "Sustained awareness" },
  { state: "Kaivalya", description: "Isolation, liberation", practice: "Kaivalya pada practices" },
  { state: "Shaktipat", description: "Descent of energy", practice: "Guru kripa, transmission" },
  { state: "Nishkama", description: "Desireless action", practice: "Karma yoga" },
  { state: "Mahat", description: "Cosmic intellect", practice: "Cosmic awareness" },
  { state: "Brahman", description: "Absolute reality", practice: "Brahman realization" },
  { state: "Shiva", description: "Pure consciousness", practice: "Shiva awareness" },
  { state: "Shakti", description: "Pure energy", practice: "Shakti awakening" },
  { state: "Nirvana", description: "Extinction, liberation", practice: "Nirvana practices" }
];

export const NINE_NAVATATTTVAS: Navatattva[] = [
  { num: 1, name: "Prithvi (Earth)", element: "Stability, grounding", direction: "Center", practice: "Grounding meditation, walking barefoot" },
  { num: 2, name: "Apas (Water)", element: "Flow, adaptability", direction: "Southwest", practice: "Water meditation, emotional flow" },
  { num: 3, name: "Tejas (Fire)", element: "Transformation, energy", direction: "Southeast", practice: "Fire meditation, agni practices" },
  { num: 4, name: "Vayu (Air)", element: "Movement, freedom", direction: "Northwest", practice: "Pranayama, breathwork" },
  { num: 5, name: "Akasha (Space)", element: "Expansion, infinity", direction: "Center", practice: "Space meditation, silence" },
  { num: 6, name: "Kaal (Time)", element: "Cycles, progression", direction: "East", practice: "Time awareness, rhythm practices" },
  { num: 7, name: "Disha (Direction)", element: "Orientation, purpose", direction: "All", practice: "Directional alignment" },
  { num: 8, name: "Manas (Mind)", element: "Thought, emotion", direction: "Inner", practice: "Mindfulness, thought watching" },
  { num: 9, name: "Atma (Soul)", element: "Self, essence", direction: "Heart", practice: "Self-inquiry, atma vichara" }
];

export const SIX_FACES: ShivaFace[] = [
  { face: "Sadyojata", direction: "West", cosmicFunction: "Creation", practice: "Creative visualization, new beginnings" },
  { face: "Vamadeva", direction: "North", cosmicFunction: "Preservation", practice: "Nurturing practices, sustenance" },
  { face: "Tatpurusha", direction: "East", cosmicFunction: "Meditation, consciousness", practice: "Inner awareness, dharana" },
  { face: "Aghora", direction: "South", cosmicFunction: "Destruction, regeneration", practice: "Letting go, transformation" },
  { face: "Ishana", direction: "Upward", cosmicFunction: "Spiritual enlightenment", practice: "Higher knowledge, transcendence" },
  { face: "Mahadeva", direction: "Downward", cosmicFunction: "Hidden, mysterious", practice: "Secret of cosmic operations" }
];

export const THIRTY_SIX_TATTTVAS: Tattva[] = [
  { num: 1, name: "Shiva Tattva", category: "Ultimate Reality", description: "Pure consciousness, source of all creation" },
  { num: 2, name: "Shakti Tattva", category: "Dynamic Energy", description: "Feminine aspect of divinity" },
  { num: 3, name: "Sadashiva Tattva", category: "Bliss", description: "Union of Shiva and Shakti" },
  { num: 4, name: "Ishvara Tattva", category: "Personal God", description: "Governs the universe, creator" },
  { num: 5, name: "Shuddha Vidya Tattva", category: "Pure Knowledge", description: "Leads to liberation" },
  { num: 6, name: "Maya Tattva", category: "Illusion", description: "Veils true nature of reality" },
  { num: 7, name: "Kala Tattva", category: "Time", description: "Influence on creation and existence" },
  { num: 8, name: "Vidya Tattva", category: "Knowledge", description: "Leads to understanding" },
  { num: 9, name: "Raga Tattva", category: "Attachment", description: "Binds the soul" },
  { num: 10, name: "Purusha Tattva", category: "Individual Soul", description: "Experiences existence" },
  { num: 11, name: "Manas (Mind)", category: "Vikara", description: "Faculty for thought and emotion" },
  { num: 12, name: "Buddhi (Intellect)", category: "Vikara", description: "Discriminative power" },
  { num: 13, name: "Ahankara (Ego)", category: "Vikara", description: "Sense of individuality" },
  { num: 14, name: "Shabda (Sound)", category: "Tanmatra", description: "Subtle element of sound" },
  { num: 15, name: "Sparsha (Touch)", category: "Tanmatra", description: "Subtle element of touch" },
  { num: 16, name: "Rupa (Form)", category: "Tanmatra", description: "Subtle element of form" },
  { num: 17, name: "Rasa (Taste)", category: "Tanmatra", description: "Subtle element of taste" },
  { num: 18, name: "Gandha (Smell)", category: "Tanmatra", description: "Subtle element of smell" },
  { num: 19, name: "Akasha (Space)", category: "Mahabhuta", description: "Space element" },
  { num: 20, name: "Vayu (Air)", category: "Mahabhuta", description: "Air element" },
  { num: 21, name: "Agni (Fire)", category: "Mahabhuta", description: "Fire element" },
  { num: 22, name: "Apas (Water)", category: "Mahabhuta", description: "Water element" },
  { num: 23, name: "Prithvi (Earth)", category: "Mahabhuta", description: "Earth element" },
  { num: 24, name: "Shuddha Tattva", category: "Purity", description: "Essence of consciousness free from impurities" },
  { num: 25, name: "Shuddha Vidya", category: "Wisdom", description: "Pure knowledge leading to liberation" },
  { num: 26, name: "Aparavidya", category: "Lower Knowledge", description: "Worldly knowledge binding to samsara" },
  { num: 27, name: "Paravidya", category: "Higher Knowledge", description: "Leads to enlightenment" },
  { num: 28, name: "Sakti", category: "Energy", description: "Dynamic power of creation" },
  { num: 29, name: "Ananda", category: "Bliss", description: "Ultimate happiness from realizing true nature" },
  { num: 30, name: "Maya", category: "Illusion", description: "Creates veil over reality" },
  { num: 31, name: "Karma", category: "Action", description: "Law of cause and effect" },
  { num: 32, name: "Samsara", category: "Cycle", description: "Cycle of birth, death, rebirth" },
  { num: 33, name: "Moksha", category: "Liberation", description: "Freedom from samsara" },
  { num: 34, name: "Integrity", category: "4 Tattvas", description: "Power of words" },
  { num: 35, name: "Authenticity", category: "4 Tattvas", description: "Power of thinking" },
  { num: 36, name: "Responsibility", category: "4 Tattvas", description: "Power of feeling" },
  { num: 37, name: "Enriching", category: "4 Tattvas", description: "Power of living" }
];

export const NIGHTLY_COMPLETION = {
  review: [
    "What worked well today?",
    "What didn't work today?",
    "Where did I successfully apply the 4 Principles?",
    "Where did I successfully apply the 14 Forces?",
    "Where did I embody Mahasadashiva's Actions?"
  ],
  completion: [
    "What incompletions did I notice today?",
    "What fears or limiting patterns surfaced?",
    "What am I ready to release or forgive?",
    "What guilt or regret needs completion?"
  ],
  gratitude: ["3 things I am grateful for today:"],
  release: ["I consciously release:", "I forgive:", "I let go of:"],
  tomorrow: ["My intention for tomorrow:", "One authentic action I will take:", "One enriching action I will take:"]
};
