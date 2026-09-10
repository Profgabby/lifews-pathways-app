import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";

type PF08Module = Omit<PF01Module,"code"> & { code:"PF-08" };

const en: PF08Module = {
  code:"PF-08",
  title:"Safe Hands, Safe Food",
  level:"Pathways Foundation",
  age:"Approximately 8–11 years; practical roles should be adapted to learner readiness and local food-safety guidance.",
  duration:"6 guided lessons plus hygiene practice and assessment time",
  fieldworkHours:3,
  bigQuestion:"How can clean hands, clean tools and careful food handling help protect people and food?",
  whyItMatters:"Food safety begins with everyday habits. This module helps learners understand contamination, handwashing, clean work areas, safe separation, storage awareness and responsible communication. Learners practise observable hygiene skills without being asked to handle hazardous chemicals, raw high-risk foods or commercial production tasks.",
  outcomes:[
    "Explain in simple terms how germs, dirt, unsafe water and poor handling can contaminate food.",
    "Demonstrate a complete handwashing routine at appropriate times.",
    "Identify clean and unclean food-contact practices using familiar scenarios.",
    "Explain why raw and ready-to-eat foods may need separation and why trusted adults manage higher-risk food preparation.",
    "Recognize that safe storage depends on food type, time, temperature and local guidance.",
    "Use a simple hygiene checklist to inspect and improve a supervised learning activity.",
    "Evaluate AI or digital food-safety suggestions against trusted instructions rather than accepting them automatically."
  ],
  vocabulary:["food safety","hygiene","contamination","germ","clean","dirty","handwashing","rinse","soap","surface","utensil","separate","storage","temperature","waste","checklist","evidence"],
  materials:["handwashing station with safe water","soap","clean drying method","picture-sequence cards","clean demonstration utensils and containers","two sets of colour or symbol cards for separation exercises","food-safety scenario cards","learner notebook","simple hygiene checklist","optional facilitator-controlled digital device"],
  safety:[
    "Use only facilitator-approved demonstration foods and materials; no tasting is required for this module.",
    "Children should not handle raw meat, raw eggs, hazardous cleaning chemicals or hot cooking equipment during activities.",
    "Handwashing water must be from an appropriate safe source and spills should be cleaned promptly.",
    "Do not use smell, taste or appearance alone to declare food safe.",
    "Food allergies, religious dietary requirements and disability-related access needs must be respected in all examples and activities.",
    "AI-generated food-safety advice must be checked against trusted local health guidance, labels and facilitator instructions."
  ],
  lessons:[
    {
      id:"PF-08-L1", title:"How Food Can Become Unsafe", objective:"Recognize common ways contamination can move from hands, water, surfaces or other foods to something people eat.",
      teaching:["Contamination means something unwanted or harmful gets into food.","Hands, dirty water, unclean utensils, pests and contact between different foods can move contamination.","Some harmful germs cannot be seen, smelled or tasted."],
      activity:"Use picture cards to trace possible contamination paths from a dirty hand, unclean surface or unsafe container to food, then identify where the path could be stopped.",
      diy:"Create a contamination-path poster using arrows: SOURCE → CONTACT → FOOD → PREVENTION.",
      aiLayer:"AI Layer 1 — Recognition: facilitator asks AI for possible contamination examples. Learners classify each as plausible, unclear or incorrect and explain what evidence or trusted guidance is needed.",
      enterprise:"Food growers, processors, vendors and kitchens protect value by preventing contamination rather than trying to hide problems after they occur.",
      quiz:[{question:"What is contamination?",options:["Something unwanted or harmful getting into food","Making food colourful","Counting packages","Planting a seed"],answer:0},{question:"Can harmful germs always be seen?",options:["No","Yes, always","Only in water","Only on metal"],answer:0},{question:"Which can transfer contamination?",options:["Unclean hands","A clean sealed notebook","A dry pencil used only for writing","A closed cupboard with no food"],answer:0}]
    },
    {
      id:"PF-08-L2", title:"Wash Hands the Right Way", objective:"Demonstrate when and how to wash hands thoroughly before food-related activities.",
      teaching:["Hands should be washed before handling food and after activities that can make them dirty or contaminated.","Effective handwashing uses safe water, soap, rubbing of all hand surfaces, rinsing and a clean drying method.","A quick splash without soap is not the same as thorough handwashing."],
      activity:"Facilitator models the full routine, then learners practise in pairs using a visual sequence and peer checklist.",
      diy:"Create a six-step handwashing sequence card and demonstrate the sequence without prompting.",
      aiLayer:"AI Layer 2 — Sequence checking: compare a learner-created handwashing sequence with a facilitator-controlled AI sequence and identify missing or misplaced steps.",
      enterprise:"Reliable hygiene routines are basic quality-control habits in food service, processing and hospitality.",
      quiz:[{question:"What should be used for routine handwashing?",options:["Safe water and soap","Soil only","Cooking oil","Paint"],answer:0},{question:"When should hands be washed?",options:["Before handling food and after contaminating activities","Only once a week","Only after eating","Never when using utensils"],answer:0},{question:"Why dry hands with a clean method?",options:["To avoid recontaminating clean hands","To make food sweeter","To measure water","To replace soap"],answer:0}]
    },
    {
      id:"PF-08-L3", title:"Clean Tools and Clean Surfaces", objective:"Distinguish clean food-contact tools and surfaces from practices that could recontaminate them.",
      teaching:["Food-contact surfaces and utensils should start clean and be protected from recontamination.","A cloth, sponge or utensil can spread contamination if it is dirty or used for incompatible tasks.","Cleaning practices should follow safe adult-approved methods and product instructions."],
      activity:"Inspect a staged demonstration table and identify good and poor practices such as a clean covered utensil, a dirty wiping cloth, food placed on the floor or a clean container touched with dirty hands.",
      diy:"Build a CLEAN / NEEDS ATTENTION inspection checklist with at least eight observable items.",
      aiLayer:"AI Layer 3 — Guided inspection: compare the class checklist with an AI-generated checklist and keep only age-appropriate, observable and locally relevant items.",
      enterprise:"Consistent cleaning and inspection reduce product loss, complaints and preventable safety failures.",
      quiz:[{question:"What should happen to a food-contact surface before use?",options:["It should be appropriately clean","It should be covered with soil","It should never be checked","It should be used for every task without cleaning"],answer:0},{question:"Can a dirty cloth spread contamination?",options:["Yes","No","Only outdoors","Only at night"],answer:0},{question:"What is an inspection checklist for?",options:["Checking whether required practices are being followed","Guaranteeing profit","Replacing handwashing","Hiding problems"],answer:0}]
    },
    {
      id:"PF-08-L4", title:"Keep Different Foods Apart", objective:"Explain why some foods and utensils should be separated to reduce cross-contamination.",
      teaching:["Cross-contamination happens when contamination moves from one food, surface or utensil to another.","Raw animal foods can carry hazards that should not be transferred to ready-to-eat foods.","At this level learners practise separation concepts with pictures and clean props; higher-risk raw-food handling remains an adult task."],
      activity:"Sort picture cards into RAW / READY-TO-EAT / CLEAN EQUIPMENT and choose separate boards, plates or symbols for each scenario.",
      diy:"Create a simple separation map showing how a preparation space can keep higher-risk raw items away from ready-to-eat foods.",
      aiLayer:"AI Layer 4 — Scenario reasoning: review an AI-generated kitchen scenario and identify any unsafe contact path or ambiguous advice that should be checked with an adult.",
      enterprise:"Good workflow design protects food quality by arranging people, tools and materials so contamination paths are less likely.",
      quiz:[{question:"What is cross-contamination?",options:["Contamination moving from one item or surface to another","Cooking food evenly","Counting ingredients","Growing two crops together"],answer:0},{question:"Why separate raw animal foods from ready-to-eat foods?",options:["To reduce transfer of hazards","To make labels brighter","To increase water use","To avoid cleaning"],answer:0},{question:"Should children in this module handle raw meat for practice?",options:["No","Yes, without supervision","Only if AI suggests it","Only with bare hands"],answer:0}]
    },
    {
      id:"PF-08-L5", title:"Store Food With Care", objective:"Recognize that safe storage depends on the food, time, temperature, cleanliness and trusted guidance.",
      teaching:["Different foods have different storage needs.","Perishable foods may need temperature control and should not be left in unsafe conditions for extended periods.","Labels, local guidance and responsible adults should be used when learners are unsure how a food should be stored."],
      activity:"Sort illustrated foods and storage situations into ASK AN ADULT / DRY PROTECTED STORAGE / TEMPERATURE-CONTROLLED STORAGE, emphasizing that exact requirements depend on the product.",
      diy:"Create a 'Before I Store Food' decision card: IDENTIFY FOOD → CHECK LABEL/GUIDANCE → USE CLEAN CONTAINER → USE CORRECT PLACE → CHECK AGAIN.",
      aiLayer:"AI Layer 5 — Verification: compare an AI storage recommendation with a product label or facilitator-approved guidance and identify which source controls the final decision.",
      enterprise:"Safe storage protects ingredients and products, reduces avoidable waste and helps maintain consistent quality.",
      quiz:[{question:"Do all foods have the same storage needs?",options:["No","Yes","Only packaged foods differ","Only fruits differ"],answer:0},{question:"What should you check when unsure how to store food?",options:["Trusted guidance or the product label","A random guess","Appearance alone","A social-media rumour"],answer:0},{question:"Why use clean storage containers?",options:["To help protect food from contamination","To replace temperature control","To guarantee freshness forever","To avoid labels"],answer:0}]
    },
    {
      id:"PF-08-L6", title:"Run a Safe Food Practice Check", objective:"Apply hygiene knowledge to inspect a supervised food-learning setup and recommend evidence-based improvements.",
      teaching:["Food safety works as a system: clean hands, safe water, clean tools, separation, suitable storage and responsible supervision.","A checklist helps turn rules into observable actions.","When a problem is found, the correct response is to stop, correct it safely and record what changed."],
      activity:"Teams inspect a facilitator-prepared mock food-learning station, record at least five observations and identify two improvements before the activity begins.",
      diy:"Complete and present a Safe Food Practice Audit: CHECK → FIND → CORRECT → VERIFY → RECORD.",
      aiLayer:"Integration — evidence-based review: compare the team's audit with an AI-generated review and reject any recommendation that conflicts with observed evidence, labels, local rules or facilitator guidance.",
      enterprise:"Quality assurance means preventing problems, documenting checks and correcting deviations before products or services reach users.",
      quiz:[{question:"What should happen when an unsafe condition is found?",options:["Stop and correct it safely","Hide it","Continue without change","Delete the record"],answer:0},{question:"Why verify a correction?",options:["To confirm the problem was actually addressed","To make a poster longer","To avoid responsibility","To guarantee all future conditions"],answer:0},{question:"Which is part of a food-safety system?",options:["Clean hands, clean tools, separation and suitable storage","Taste-testing unknown food","Ignoring labels","Using one dirty cloth for every task"],answer:0}]
    }
  ],
  finalAssessment:{
    mcq:[
      {question:"Which is a common way food can become contaminated?",options:["Contact with unclean hands","Writing in a notebook","Counting sealed packages","Drawing a plant"],answer:0},
      {question:"What is essential for routine handwashing?",options:["Safe water and soap","Sand only","Juice","Cooking oil"],answer:0},
      {question:"Can clear-looking food or water always be assumed safe?",options:["No","Yes","Only when cold","Only in a sealed room"],answer:0},
      {question:"Why keep some raw foods separate from ready-to-eat foods?",options:["To reduce cross-contamination","To change their colour","To save paper","To avoid cleaning"],answer:0},
      {question:"What should guide food storage when you are unsure?",options:["Trusted guidance and labels","Guessing","Smell alone","An unchecked AI answer"],answer:0},
      {question:"What is a hygiene checklist used for?",options:["Making required practices observable and checkable","Replacing soap","Guaranteeing profit","Avoiding supervision"],answer:0},
      {question:"How should AI food-safety advice be used?",options:["As a suggestion that must be verified","As the only authority","Instead of labels","Instead of adult supervision"],answer:0},
      {question:"Which response shows responsible food-safety practice?",options:["Find a problem, correct it and verify the correction","Hide a problem","Continue despite unsafe conditions","Change the record to look better"],answer:0}
    ],
    theory:[
      "Explain three ways contamination can move to food and one prevention method for each.",
      "Describe a complete handwashing routine and give three times when handwashing is important.",
      "Explain cross-contamination in your own words using one food-preparation example.",
      "Describe why food storage decisions should use labels and trusted guidance rather than appearance alone.",
      "Explain one useful role for digital or AI tools in food-safety learning and one reason their output must be verified."
    ],
    practical:"Demonstrate the full handwashing sequence, then use a hygiene checklist to inspect a supervised mock food-learning station. Identify at least three correct practices, two problems, appropriate corrections and one method for verifying that the corrections were completed."
  },
  evidence:["Contamination-path poster","Six-step handwashing sequence card","Observed handwashing demonstration","Clean/Needs Attention inspection checklist","Separation map","Food-storage decision card","Safe Food Practice Audit","Facilitator practical assessment record"],
  passport:["K: explains contamination, hand hygiene, separation and basic storage concepts","P: demonstrates thorough handwashing and completes a supervised hygiene inspection","D: uses a checklist and verifies AI/digital suggestions against trusted evidence","S: follows age-appropriate food-safety boundaries and avoids hazardous food handling","E: connects hygiene, workflow and quality checks to responsible food enterprises","L: communicates safety concerns, works cooperatively and verifies corrections"],
  trainerNotes:["Model every practical routine before learners perform it.","Use culturally and locally familiar food examples while avoiding stigma about particular foods or communities.","Do not ask children to handle hazardous chemicals, boiling water, knives beyond age-appropriate supervised tools, or high-risk raw foods.","Use local public-health or food-safety guidance where it is more specific than this curriculum.","Assess demonstrated behaviour, not memorized slogans alone.","Keep enterprise discussion focused on quality, service and responsibility; minors are not required to sell food products."],
  remediation:"Return to three observable routines: clean hands, clean surface and keep risky contacts apart. Use picture sequencing, facilitator modelling and repeated checklist practice before reassessment.",
  extension:"Learner designs a safe workflow for a fictional school fruit-preparation activity, identifies possible contamination points, proposes controls and explains how each control would be checked.",
  imagePrompts:[
    "Photorealistic African children ages 8–11 in a supervised school food-learning area practising correct handwashing with soap and safe running water, inclusive boys and girls, clean station, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Child-friendly educational illustration showing clean hands, clean utensils, separate preparation areas and covered storage using clear visual icons and arrows, white background, no readable text.",
    "Photorealistic African learners using a simple hygiene checklist to inspect a clean mock food-preparation station while a facilitator supervises, no raw meat, no hazardous chemicals, no readable text."
  ]
};

export const pf08ByLanguage: Partial<Record<AppLanguage,PF08Module>> = { en };
export function getPF08(language:AppLanguage):PF08Module { return pf08ByLanguage[language] ?? en; }
