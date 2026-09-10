import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";

type PF06Module = Omit<PF01Module,"code"> & { code:"PF-06" };

const en: PF06Module = {
  code:"PF-06",
  title:"Water for Life",
  level:"Pathways Foundation",
  age:"Approximately 8–11 years; activities should be adapted to learner readiness and local water conditions.",
  duration:"6 guided lessons plus practical investigation and assessment time",
  fieldworkHours:3,
  bigQuestion:"Why is water essential for life, how do we use it, and how can we protect and use it wisely?",
  whyItMatters:"Water links health, food production, ecosystems, energy, households and livelihoods. This module builds foundational water literacy through observation, measurement, conservation, simple treatment concepts and responsible decision-making without asking children to perform hazardous water-treatment tasks.",
  outcomes:[
    "Explain at least four ways people, plants and animals depend on water.",
    "Distinguish common household and community water uses and identify opportunities to reduce waste.",
    "Measure and compare simple water quantities using age-appropriate tools.",
    "Recognize visible signs that water may be unsafe while understanding that clear water is not necessarily safe to drink.",
    "Describe basic barriers that can help protect water quality, including source protection, clean storage and adult-supervised treatment.",
    "Complete a simple water-use observation and propose one realistic conservation action.",
    "Use AI or digital suggestions as ideas to verify rather than as a substitute for trusted water-safety guidance."
  ],
  vocabulary:["water","source","safe","clean","contamination","storage","conserve","waste","litre","volume","measure","filter","boil","treatment","irrigation","reuse","evidence"],
  materials:["clean water for demonstrations","transparent cups or bottles","graduated measuring cup or marked container","small watering can","funnels","clean cloth and gravel/sand demonstration materials for non-drinking filtration model","water-use tally sheet","picture cards","optional facilitator-controlled digital device"],
  safety:[
    "Do not ask learners to taste unknown water or determine drinking safety by appearance, smell or taste.",
    "All demonstrations must use facilitator-approved water and clean containers.",
    "A classroom filter model does not make water safe to drink; filtered demonstration water must not be consumed.",
    "Boiling, chemical disinfection, pumps, wells and electrical water systems are adult-supervised topics only at this level.",
    "Clean spills immediately to prevent slipping.",
    "AI-generated water-safety advice must be checked against trusted local public-health guidance and facilitator instructions."
  ],
  lessons:[
    {
      id:"PF-06-L1", title:"Why Living Things Need Water", objective:"Explain how people, plants and animals depend on water.",
      teaching:["People need water for drinking, food preparation, hygiene and many everyday activities.","Plants need water for growth and moving nutrients through their tissues.","Animals also depend on water directly or through the food and habitats they use."],
      activity:"Water-dependence web: connect picture cards of people, crops, livestock, trees, cooking and hygiene to water using arrows and oral explanations.",
      diy:"Create a one-page 'Water Supports Life' wheel with at least six examples from home, school, farm or community.",
      aiLayer:"AI Layer 1 — Recognition: facilitator asks an AI tool for examples of water use; learners sort each example into PEOPLE, PLANTS, ANIMALS or MORE THAN ONE and challenge examples that do not fit their context.",
      enterprise:"Many useful services depend on water—food production, cleaning, processing and irrigation—so responsible water use protects both people and resources.",
      quiz:[
        {question:"Which living things need water?",options:["People, plants and animals","Only people","Only plants","Only farm animals"],answer:0},
        {question:"Why do plants need water?",options:["For growth and movement of nutrients","To become plastic","To make batteries","Only to change colour"],answer:0},
        {question:"Which is a household water use?",options:["Cooking","Charging a phone directly in water","Painting the sky","None"],answer:0}
      ]
    },
    {
      id:"PF-06-L2", title:"Where Water Comes From", objective:"Identify common water sources and explain why source protection matters.",
      teaching:["Communities may obtain water from rain, rivers, springs, boreholes, wells, reservoirs or piped systems.","Water quality can change between the source and the point where people use it.","Protecting sources and storage areas reduces opportunities for contamination."],
      activity:"Create a local water-source map using symbols; discuss how water might move from source to household, school or garden.",
      diy:"Draw a 'source-to-use' pathway showing SOURCE → COLLECTION → STORAGE → USE and mark two places where water should be protected.",
      aiLayer:"AI Layer 2 — Guided comparison: compare an AI-generated list of water sources with the community's actual sources and identify what local knowledge adds.",
      enterprise:"Reliable water supply supports farms, food businesses, schools and households; protecting infrastructure and sources reduces losses and interruptions.",
      quiz:[
        {question:"Which can be a water source?",options:["Rainwater","A pencil","A shoe","A dry battery"],answer:0},
        {question:"Can water become contaminated after leaving its source?",options:["Yes","No, never","Only online","Only in cities"],answer:0},
        {question:"Why protect water storage?",options:["To reduce contamination","To make water disappear","To increase waste","To replace measurement"],answer:0}
      ]
    },
    {
      id:"PF-06-L3", title:"Measure Water", objective:"Use a measuring container to compare and record water volume accurately.",
      teaching:["Volume tells us how much space a liquid occupies.","Litres and millilitres are common units for water volume.","Measurement helps us compare use, plan irrigation and notice waste."],
      activity:"Estimate then measure several safe quantities, such as 250 mL, 500 mL and 1 L, and compare estimate with measurement.",
      diy:"Build a simple marked water-measuring bottle using facilitator-prepared reference volumes and record three measurements.",
      aiLayer:"AI Layer 3 — Number checking: learners solve simple volume comparisons first, then use a calculator or facilitator-controlled AI output to check answers and discuss any difference.",
      enterprise:"Accurate measurement matters when water is delivered, stored, used for crops or combined with ingredients; guessing can waste resources or reduce quality.",
      quiz:[
        {question:"What does volume describe?",options:["How much space a liquid occupies","Its selling price","Its colour only","Its password"],answer:0},
        {question:"Which is a common unit for water volume?",options:["Litre","Kilometre per hour","Degree only","Watt only"],answer:0},
        {question:"Why measure water?",options:["To compare and manage use","To make records less accurate","To hide waste","To remove all decisions"],answer:0}
      ]
    },
    {
      id:"PF-06-L4", title:"Clean-Looking Is Not Always Safe", objective:"Explain why water safety cannot be judged only by visible appearance.",
      teaching:["Some contamination can be seen, but many harmful microorganisms or chemicals cannot be seen with our eyes.","Clear water is not automatically safe drinking water.","Safe drinking-water decisions should follow trusted local guidance and approved treatment practices."],
      activity:"Compare sealed demonstration images or samples showing visibly dirty versus clear water and discuss what can and cannot be concluded from appearance alone.",
      diy:"Create a WATER SAFETY decision card: LOOK → DO NOT TASTE UNKNOWN WATER → ASK/USE TRUSTED GUIDANCE → USE APPROVED SAFE SOURCE/TREATMENT.",
      aiLayer:"AI Layer 4 — Safety verification: facilitator presents a fictional AI claim such as 'clear water is always safe'; learners identify why the claim is unreliable and what trusted source should be consulted.",
      enterprise:"Food and beverage enterprises depend on safe water and hygienic handling; appearance alone is not a quality-control system.",
      quiz:[
        {question:"Is clear water always safe to drink?",options:["No","Yes, always","Only if cold","Only if stored in plastic"],answer:0},
        {question:"Should learners taste unknown water to test it?",options:["No","Yes","Only once","Whenever AI suggests it"],answer:0},
        {question:"What should guide drinking-water safety?",options:["Trusted approved guidance","Appearance alone","Rumours","A random guess"],answer:0}
      ]
    },
    {
      id:"PF-06-L5", title:"Protect, Store and Conserve", objective:"Identify practical ways to keep stored water cleaner and reduce unnecessary water loss.",
      teaching:["Clean, covered storage can reduce contamination after collection.","Closing taps, repairing leaks, using appropriate irrigation quantities and reusing suitable non-contaminated water where safe can reduce waste.","Conservation means using water efficiently, not denying people the water needed for health and dignity."],
      activity:"Water-waste detective: inspect a facilitator-prepared scenario for dripping taps, uncovered containers, overwatering or unnecessary running water and recommend improvements.",
      diy:"Conduct a supervised one-day water-use tally for one classroom or garden activity and identify one conservation change.",
      aiLayer:"AI Layer 5 — Decision support: compare three AI-suggested conservation ideas against criteria: SAFE? PRACTICAL? FAIR? LIKELY TO SAVE WATER? Choose only justified options.",
      enterprise:"Reducing leaks and unnecessary use lowers resource costs and supports reliable service without compromising hygiene or product quality.",
      quiz:[
        {question:"Which can reduce contamination during storage?",options:["A clean covered container","Leaving it open beside waste","Putting dirty hands inside","Mixing unknown water sources"],answer:0},
        {question:"What is water conservation?",options:["Using water efficiently while meeting real needs","Never using water","Skipping handwashing","Hiding leaks"],answer:0},
        {question:"Which is a sensible conservation action?",options:["Repair a leak","Leave a tap running","Overwater every plant","Ignore spills"],answer:0}
      ]
    },
    {
      id:"PF-06-L6", title:"My Water Stewardship Plan", objective:"Use observations and measurements to propose one evidence-based water-protection or conservation action.",
      teaching:["A stewardship plan identifies a problem, evidence, an action, who can help and how improvement will be checked.","Good actions are safe, realistic and appropriate to local conditions.","Small verified improvements can matter when many people practise them consistently."],
      activity:"Teams review water-use observations and select one issue they can safely influence, such as a dripping tap report, uncovered learning-garden storage, or overwatering.",
      diy:"Create and present a Water Stewardship Plan: ISSUE → EVIDENCE → ACTION → HELPER → CHECK → RESULT.",
      aiLayer:"Integration — responsible recommendation: facilitator may ask AI for possible actions; learners score each idea against evidence, local feasibility and safety before accepting or rejecting it.",
      enterprise:"Resource stewardship is part of good enterprise: measure inputs, prevent waste, protect quality and document improvement.",
      quiz:[
        {question:"What should a stewardship plan begin with?",options:["A clearly observed issue","A guaranteed profit","A private password","A random slogan"],answer:0},
        {question:"How should an action be selected?",options:["Using evidence, safety and feasibility","By copying blindly","By choosing the most expensive option","By ignoring local conditions"],answer:0},
        {question:"Why check the result?",options:["To see whether the action helped","To avoid learning","To remove evidence","To guarantee every future outcome"],answer:0}
      ]
    }
  ],
  finalAssessment:{
    mcq:[
      {question:"Why is water important to plants?",options:["It supports growth and movement of nutrients","It turns leaves into metal","It replaces sunlight completely","It has no role"],answer:0},
      {question:"Which can be a community water source?",options:["Borehole","Notebook","Solar panel glass","Pencil"],answer:0},
      {question:"What does one litre measure?",options:["Volume","Temperature","Time","Speed"],answer:0},
      {question:"Is clear water automatically safe to drink?",options:["No","Yes","Only in a bottle","Only when cool"],answer:0},
      {question:"Which storage practice is generally safer?",options:["Clean and covered storage","Open dirty containers","Hand dipping with unwashed hands","Mixing with unknown liquids"],answer:0},
      {question:"Which action can conserve water?",options:["Fixing leaks","Leaving taps open","Overwatering","Ignoring broken pipes"],answer:0},
      {question:"How should important AI water-safety advice be treated?",options:["Verified with trusted guidance","Accepted automatically","Used instead of adult supervision","Shared before checking"],answer:0},
      {question:"Which is an evidence-based water decision?",options:["Measure use, identify waste, act and check the result","Guess and never measure","Copy a claim without checking","Ignore local conditions"],answer:0}
    ],
    theory:[
      "Explain four ways people, plants or animals depend on water.",
      "Describe a water pathway from source to use and identify two points where contamination could occur.",
      "Explain why clear-looking water may still be unsafe to drink.",
      "Describe two water-conservation actions and explain how each could reduce waste without compromising hygiene.",
      "Explain how measurement and verified information can help a household, school garden or small enterprise manage water better."
    ],
    practical:"Measure and record a defined quantity of clean demonstration water, identify one realistic water-use or protection problem from a supervised scenario, and present a Water Stewardship Plan containing evidence, a safe action, a responsible helper and a method for checking whether the action worked."
  },
  evidence:["Water Supports Life wheel","Source-to-use pathway map","Three recorded volume measurements","Water Safety decision card","One-day water-use tally","Water Stewardship Plan","Facilitator practical observation record"],
  passport:["K: explains water needs, sources, safety concepts and conservation principles","P: measures water volume and completes a supervised water-use observation","D: records simple water data and evaluates AI/digital recommendations against evidence and trusted guidance","S: avoids tasting unknown water and follows safe storage, spill and treatment boundaries","E: connects accurate water measurement, quality protection and waste reduction to responsible enterprise","L: collaborates on stewardship decisions, communicates recommendations and identifies appropriate adult support"],
  trainerNotes:["Localize examples to the actual community water context without labeling communities as deficient or unsafe.","Never imply that a simple cloth, sand or gravel demonstration makes water potable.","If local public-health authorities provide specific drinking-water guidance, use that guidance for safety instruction.","Use measuring activities to reinforce PF-03 numeracy.","Give all learners equal access to measuring, recording and presentation roles.","Where water is scarce, keep demonstrations low-volume and reuse clean demonstration water for non-food plants where appropriate."],
  remediation:"Use picture sequencing, one measuring container and a small set of core concepts: NEED WATER → GET WATER → KEEP IT PROTECTED → USE WHAT IS NEEDED → CHECK. Allow oral responses and repeated measurement practice.",
  extension:"With facilitator support, learners compare two days of water use for one safe activity, calculate the difference, and propose a conservation target while explaining why essential hygiene water should not be reduced.",
  imagePrompts:[
    "Photorealistic African children ages 8–11 in a supervised school garden measuring clean water with a transparent graduated container and watering can, inclusive boys and girls, dry safe walkway, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Child-friendly educational illustration showing a water journey from rainfall or borehole to covered storage to household and garden use, simple arrows and icons only, clean white background, no written labels.",
    "Photorealistic classroom water-conservation investigation with African learners observing a closed clean storage container, a model tap and simple measurement sheet, facilitator present, no drinking from test samples, no readable text."
  ]
};

export const pf06ByLanguage: Partial<Record<AppLanguage,PF06Module>> = { en };
export function getPF06(language:AppLanguage):PF06Module { return pf06ByLanguage[language] ?? en; }
