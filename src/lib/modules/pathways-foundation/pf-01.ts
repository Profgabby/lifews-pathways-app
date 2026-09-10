import type { SupportedLanguage } from "@/lib/i18n6";

export type PF01Lesson = {
  id: string;
  title: string;
  objective: string;
  teaching: string[];
  activity: string;
  diy: string;
  aiLayer: string;
  enterprise: string;
  quiz: { question: string; options: string[]; answer: number }[];
};

export type PF01Module = {
  code: "PF-01";
  title: string;
  level: string;
  age: string;
  duration: string;
  fieldworkHours: number;
  bigQuestion: string;
  whyItMatters: string;
  outcomes: string[];
  vocabulary: string[];
  materials: string[];
  safety: string[];
  lessons: PF01Lesson[];
  finalAssessment: {
    mcq: { question: string; options: string[]; answer: number }[];
    theory: string[];
    practical: string;
  };
  evidence: string[];
  passport: string[];
  trainerNotes: string[];
  remediation: string;
  extension: string;
  imagePrompts: string[];
};

const en: PF01Module = {
  code: "PF-01",
  title: "Welcome to Learning and Opportunity",
  level: "Pathways Foundation",
  age: "Approximately 8–11 years; placement should follow learner assessment, not age alone.",
  duration: "6 guided lessons plus practical and assessment time",
  fieldworkHours: 2,
  bigQuestion: "How can learning help me understand myself, my community and the opportunities around me?",
  whyItMatters: "Many learners entering Pathways have experienced interrupted, limited or no formal schooling. This module establishes belonging, confidence, safe learning routines and a practical connection between learning, everyday life and future opportunity.",
  outcomes: [
    "Explain what LIFEWS Pathways is and identify a personal reason for learning.",
    "Recognize personal strengths, interests and areas for growth.",
    "Identify safe people, places and behaviours within the learning environment.",
    "Set one realistic short-term learning goal and identify steps toward it.",
    "Recognize that useful skills can create value for families and communities.",
    "Use a simple guided digital or AI-supported activity responsibly with an adult facilitator."
  ],
  vocabulary: ["learning", "opportunity", "goal", "strength", "skill", "community", "choice", "practice", "evidence", "responsibility"],
  materials: ["paper or learner workbook", "pencils/crayons", "picture cards", "local community picture map", "goal-card template", "optional shared tablet/phone under facilitator control"],
  safety: ["Never require a learner to disclose traumatic experiences.", "Use positive, non-stigmatizing language about previous schooling.", "Digital devices are facilitator-supervised; learners do not share private information with AI systems.", "Pair and group activities must remain inclusive of girls, learners with disabilities and learners with limited literacy."],
  lessons: [
    {
      id: "PF-01-L1", title: "I Belong Here", objective: "Describe Pathways as a safe place to learn, practise and prepare for future opportunities.",
      teaching: ["Learning can happen in classrooms, gardens, homes, workshops and communities.", "A learner may begin at a different point from another learner; starting points do not determine future ability.", "Pathways connects learning with practical skills and transition opportunities."],
      activity: "Create a class learning agreement using pictures or words for respect, listening, participation, safety and care.",
      diy: "Make a personal 'I am a learner' card with a drawing or symbol showing something you want to learn.",
      aiLayer: "AI Layer 1 — Recognition: facilitator shows examples of tools that can answer questions or sort information and explains that AI is a tool, not a person or authority.",
      enterprise: "Value begins with solving a useful problem. Learners name one helpful task people perform in their community.",
      quiz: [
        { question: "Which action helps make a learning space safe?", options: ["Listening respectfully", "Laughing at mistakes", "Hiding materials", "Stopping others from speaking"], answer: 0 },
        { question: "Where can learning happen?", options: ["Only in a school", "Only online", "In many places", "Only at work"], answer: 2 },
        { question: "What should you do when you do not understand?", options: ["Pretend", "Ask for help", "Leave", "Copy without thinking"], answer: 1 }
      ]
    },
    {
      id: "PF-01-L2", title: "My Strengths and Interests", objective: "Identify at least two strengths or interests and explain how practice can develop them.",
      teaching: ["Strengths include things we can do, ways we help and qualities we show.", "Interests are things we enjoy learning about or doing.", "Skills grow through safe practice, feedback and persistence."],
      activity: "Strength-circle: learners select picture cards representing activities they enjoy or do well and explain one choice to a partner.",
      diy: "Create a three-part strengths shield: I can…, I enjoy…, I want to improve….",
      aiLayer: "AI Layer 2 — Guided interaction: with a facilitator, compare human observations about strengths with a simple AI-generated list; discuss why people must decide what is accurate.",
      enterprise: "Different strengths can become useful skills. Connect examples such as careful measuring, growing plants, repairing, explaining or organizing to community needs.",
      quiz: [
        { question: "A strength is…", options: ["something useful you can develop", "a punishment", "a school building", "a price"], answer: 0 },
        { question: "Skills usually improve through…", options: ["practice", "hiding", "guessing only", "giving up"], answer: 0 },
        { question: "Which statement shows a growth mindset?", options: ["I cannot learn", "I can improve with practice", "Only others have skills", "Mistakes end learning"], answer: 1 }
      ]
    },
    {
      id: "PF-01-L3", title: "Learning Around Me", objective: "Recognize everyday learning opportunities in food, water, energy, home and community activities.",
      teaching: ["Reading signs, counting items, measuring water and observing plants are forms of learning.", "Food-energy-water systems are part of daily life.", "Observation helps us ask better questions."],
      activity: "Learning walk: identify five things that involve reading, counting, measuring, observing or making decisions.",
      diy: "Draw a 'learning around me' map with at least four places and the skill used at each place.",
      aiLayer: "AI Layer 3 — Classification: sort picture cards into food, energy, water or more-than-one category; facilitator may use AI to generate an alternative sorting and learners check it.",
      enterprise: "Identify one local need and one useful skill connected to it, without requiring learners to sell anything.",
      quiz: [
        { question: "Measuring water uses…", options: ["numeracy", "sleep", "silence", "luck"], answer: 0 },
        { question: "Observation means…", options: ["noticing carefully", "forgetting", "hiding", "selling"], answer: 0 },
        { question: "Which can be a learning activity?", options: ["Reading a market sign", "Only examinations", "Only homework", "None"], answer: 0 }
      ]
    },
    {
      id: "PF-01-L4", title: "Goals and Small Steps", objective: "Set one clear learning goal and break it into achievable steps.",
      teaching: ["A goal describes something we want to achieve.", "Good goals can be broken into small actions.", "Evidence helps us see progress."],
      activity: "Turn a broad wish such as 'I want to read better' into three observable practice steps.",
      diy: "Make a seven-day goal ladder with one small action, a helper and a way to show progress.",
      aiLayer: "AI Layer 4 — Prompting with boundaries: facilitator demonstrates asking an AI tool for three practice ideas, then learners judge which suggestion is safe, realistic and useful.",
      enterprise: "Planning is useful in learning and enterprise: goal → resources → action → check result.",
      quiz: [
        { question: "A useful goal should have…", options: ["clear steps", "no action", "no way to check", "only a wish"], answer: 0 },
        { question: "Evidence of progress could be…", options: ["a completed practice page", "a rumor", "nothing", "someone else's work"], answer: 0 },
        { question: "If a step is too difficult, you should…", options: ["break it into smaller steps", "quit immediately", "hide it", "blame someone"], answer: 0 }
      ]
    },
    {
      id: "PF-01-L5", title: "Safe and Responsible Choices", objective: "Identify safe learning, digital and community choices and know when to seek trusted adult help.",
      teaching: ["Safety includes physical, emotional and digital safety.", "Private information should not be shared with unknown people or AI tools.", "Trusted adults can help when something feels unsafe or confusing."],
      activity: "Sort scenario cards into SAFE, ASK AN ADULT, and NOT SAFE, then discuss why.",
      diy: "Create a trusted-help hand: one safe person or service on each finger, using names or symbols appropriate to the learner.",
      aiLayer: "AI Layer 5 — Responsible problem solving: learners evaluate a fictional AI answer and identify information that should be checked with a teacher or trusted adult.",
      enterprise: "Responsible work means honesty, safety, care for resources and fair treatment of others.",
      quiz: [
        { question: "Should you give an AI tool your home address?", options: ["No", "Always", "Only for fun", "Whenever asked"], answer: 0 },
        { question: "If something feels unsafe, a good next step is…", options: ["tell a trusted adult", "keep it secret", "follow a stranger", "share private data"], answer: 0 },
        { question: "Responsible work includes…", options: ["honesty and safety", "damaging tools", "cheating", "excluding others"], answer: 0 }
      ]
    },
    {
      id: "PF-01-L6", title: "My Learning and Opportunity Map", objective: "Combine strengths, goals, community opportunities and support people into a personal learning map.",
      teaching: ["A pathway connects where we are now with possible next steps.", "People can have different pathways and can change goals as they learn.", "Support, practice and evidence help learners move forward."],
      activity: "Review the module and select one strength, one goal, one practical skill to explore, one helper and one next step.",
      diy: "Create and present a personal Learning-and-Opportunity Map: ME → STRENGTH → GOAL → PRACTICE → HELPER → NEXT STEP.",
      aiLayer: "Integration: facilitator may use AI to suggest examples of next-step activities; the learner and facilitator select only age-appropriate, locally realistic options.",
      enterprise: "Learners connect a strength to creating value: helping, making, growing, maintaining, explaining or organizing—without treating children as commercial workers.",
      quiz: [
        { question: "A pathway is…", options: ["a route from now toward a next step", "a punishment", "one fixed job", "a secret"], answer: 0 },
        { question: "Who should choose your learning goal with you?", options: ["you with appropriate support", "a stranger", "an AI alone", "nobody"], answer: 0 },
        { question: "Which belongs on an opportunity map?", options: ["strengths and next steps", "private passwords", "unsafe instructions", "someone else's identity"], answer: 0 }
      ]
    }
  ],
  finalAssessment: {
    mcq: [
      { question: "What is one purpose of Pathways?", options: ["Support learning and transition", "Stop practical learning", "Replace every family decision", "Make every learner follow one route"], answer: 0 },
      { question: "What helps a skill improve?", options: ["Practice and feedback", "Giving up", "Hiding mistakes", "Avoiding questions"], answer: 0 },
      { question: "A good learning goal should be…", options: ["clear and actionable", "impossible to check", "someone else's", "secret from helpers"], answer: 0 },
      { question: "Which is safe digital behaviour?", options: ["Protecting private information", "Sharing passwords", "Giving strangers your address", "Trusting every AI answer"], answer: 0 },
      { question: "What is evidence?", options: ["Something that shows what you did or learned", "A guess", "A rumor", "A punishment"], answer: 0 },
      { question: "Creating value can mean…", options: ["solving a useful problem", "hurting others", "wasting resources", "hiding skills"], answer: 0 },
      { question: "If an AI answer seems wrong, you should…", options: ["check with reliable information or a trusted facilitator", "always accept it", "share it immediately", "enter private data"], answer: 0 },
      { question: "Which best describes a learning pathway?", options: ["A set of possible steps toward a goal", "One route everyone must follow", "Only a school examination", "A password"], answer: 0 }
    ],
    theory: [
      "Describe two things you want to learn and explain why they matter to you.",
      "Name two strengths you have and one way you can practise each strength.",
      "Explain three rules that help keep a learning space safe and respectful.",
      "Describe one community need and a skill that could help address it.",
      "Explain why a learner should check important AI-generated information with a trusted person or reliable source."
    ],
    practical: "Present a Learning-and-Opportunity Map containing one personal strength, one learning goal, at least three small steps, one practical skill to explore, one trusted helper, one evidence item and one age-appropriate next opportunity."
  },
  evidence: ["Completed strengths shield", "Seven-day goal ladder", "Trusted-help hand", "Learning-around-me map", "Final Learning-and-Opportunity Map", "Facilitator practical observation record"],
  passport: ["K: explains learning, goals and opportunity", "P: creates and presents a usable personal learning map", "D: demonstrates guided, privacy-aware use/evaluation of an AI-supported activity", "S: identifies safe choices and trusted help", "E: recognizes skills as ways to create useful community value", "L: sets a goal, communicates strengths and participates respectfully"],
  trainerNotes: ["Use oral, pictorial and demonstration options for learners with emerging literacy.", "Do not compare learners by previous schooling history.", "Use locally recognizable examples and occupations without steering children into hazardous or age-inappropriate work.", "Girls and boys should rotate leadership, materials and presentation roles.", "AI activities are optional where connectivity/devices are unavailable; teach the underlying thinking skill offline."],
  remediation: "Repeat concepts using picture sequencing, role play and one-to-one goal setting. Reduce writing load while keeping the same competency target.",
  extension: "Learner interviews a trusted adult about one skill they learned when young, then adds that learning route to a community opportunity map.",
  imagePrompts: [
    "Photorealistic inclusive northern Nigerian community learning space, boys and girls ages 8–11 learning together with a supportive facilitator, books, number cards, plant samples and simple learning materials, dignified clothing, bright natural daylight, no text, LIFEWS green and warm-yellow visual accents.",
    "Educational illustration for children showing a simple pathway from learner to strength to goal to practice to helper to next step, icons only, clean white background, forest-green and golden-yellow accents, no written labels.",
    "Photorealistic African child-friendly learning activity with learners mapping community food, water and energy examples on paper, supervised shared tablet visible but not dominant, privacy-safe, collaborative, no text."
  ]
};

// PF-01 is authored canonically in English. The platform can display the six-language
// module shell immediately; full pedagogical translations are added as reviewed locale
// records rather than machine-fallback text. This prevents false claims of translated
// assessment equivalence.
export const pf01ByLanguage: Partial<Record<SupportedLanguage, PF01Module>> = { en };

export function getPF01(language: SupportedLanguage): PF01Module {
  return pf01ByLanguage[language] ?? en;
}
