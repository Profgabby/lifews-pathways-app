import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "../pathways-foundation/pf-01";

type PE05Module = Omit<PF01Module,"code"> & { code:"PE-05" };

const en: PE05Module = {
  code:"PE-05",
  title:"Measuring the Garden",
  level:"Pathways Explorer",
  age:"Approximately 12–14 years; measurements and field roles should be adapted to learner readiness and accessibility needs.",
  duration:"6 guided lessons plus a supervised garden measurement investigation and assessment",
  fieldworkHours:4,
  bigQuestion:"How can accurate measurements and simple records help us understand and improve a garden?",
  whyItMatters:"Measurement turns observation into evidence. In gardens and food-production systems, learners need to measure length, area, plant growth, water, spacing, counts and time, then record the results in a form that can support decisions. This module develops practical numeracy, field data discipline, introductory digital records, AI-supported checking and early enterprise thinking grounded in accuracy rather than guesswork.",
  outcomes:[
    "Select suitable units and tools for common garden measurements.",
    "Measure length, spacing and simple rectangular area with reasonable accuracy.",
    "Collect repeated plant-growth measurements using a consistent method.",
    "Count and record garden observations using tables, tallies and simple summaries.",
    "Identify obvious measurement errors and explain why consistency matters.",
    "Create a weekly garden data table and use it to describe a basic trend.",
    "Use calculator, spreadsheet or AI support to check arithmetic and patterns without replacing field evidence.",
    "Connect accurate measurement and recordkeeping to planning, quality and resource management."
  ],
  vocabulary:["measure","unit","length","width","height","area","spacing","count","tally","record","table","average","trend","accuracy","repeat","baseline","data","evidence","estimate","error"],
  materials:["30 cm rulers","measuring tapes","string","stakes or markers","garden bed or container-growing area","learner notebooks","pencils","simple data sheets","counting frame or tally sheet","optional calculator","optional facilitator-controlled spreadsheet or AI tool"],
  safety:[
    "Use measuring tapes carefully and do not allow snapping or swinging metal tapes.",
    "Keep strings, stakes and tools out of walkways when not in use.",
    "Do not enter hazardous, unstable or chemically treated areas to collect data.",
    "Wash hands after garden work and before eating.",
    "Do not require learners to lift heavy containers or reach unsafe heights for measurements.",
    "Digital and AI tools may help check calculations but must not replace direct observation or invent missing data."
  ],
  lessons:[
    {id:"PE-05-L1",title:"Choose the Right Measure",objective:"Match common garden questions with appropriate measurements, tools and units.",teaching:["Different questions require different measurements: plant height uses length, bed size may use area, irrigation uses volume, and task duration uses time.","A unit tells us what scale the number represents.","Choosing the right tool and unit reduces confusion and error."],activity:"Measurement match-up: pair garden questions with tools and units such as centimetres, metres, square metres, litres and minutes.",diy:"Create a Garden Measurement Toolkit Card listing at least six quantities, the tool for each and the preferred unit.",aiLayer:"AI Layer 1 — Classification: compare learner tool-and-unit matches with an AI-generated list and correct any unsuitable pairings.",enterprise:"Reliable measurements reduce waste and improve purchasing, layout, costing and quality control.",quiz:[{question:"Which unit is suitable for plant height?",options:["Centimetres","Litres","Kilograms only","Hours"],answer:0},{question:"Which tool is suitable for bed length?",options:["Measuring tape","Cup","Thermometer only","Spoon"],answer:0},{question:"Why record units?",options:["A number without a unit can be ambiguous","Units are decorative","Units replace measurement","Units guarantee accuracy"],answer:0}]},
    {id:"PE-05-L2",title:"Length, Spacing and Area",objective:"Measure garden dimensions and calculate simple rectangular area and plant spacing.",teaching:["Length and width describe dimensions.","For a rectangle, area equals length × width.","Consistent spacing can affect plant access to light, water, nutrients and management space."],activity:"Measure a rectangular bed or marked practice area and calculate its area, then measure several plant-to-plant spacings.",diy:"Prepare a Bed Measurement Sheet showing length, width, area and at least five spacing measurements.",aiLayer:"AI Layer 2 — Calculation checking: compare hand calculations with calculator or AI results and resolve any unit or multiplication mistakes.",enterprise:"Area and spacing measurements help estimate seed needs, materials and labour more accurately.",quiz:[{question:"How is rectangular area calculated?",options:["Length × width","Length + time","Width ÷ colour","Height only"],answer:0},{question:"If a bed is 2 m by 3 m, its area is…",options:["6 m²","5 m²","1 m²","6 m"],answer:0},{question:"Why measure spacing?",options:["To manage layout consistently","To make every crop identical","To replace plant care","Only for decoration"],answer:0}]},
    {id:"PE-05-L3",title:"Measure Plant Growth",objective:"Collect repeated growth measurements using the same method and reference point.",teaching:["Repeated measurements are most useful when taken in the same way each time.","A baseline is the first measurement used for later comparison.","Changing the method can create apparent changes that are measurement error rather than real growth."],activity:"Select marked plants and measure height or another safe growth indicator using an agreed method.",diy:"Start a three-date Plant Growth Record with plant ID, date, measurement, unit and short observation.",aiLayer:"AI Layer 3 — Pattern recognition: after sample data are collected, compare learner descriptions of increase, decrease or little change with an AI-generated interpretation.",enterprise:"Growth records support crop monitoring, scheduling and evidence-based decisions rather than assumptions.",quiz:[{question:"What is a baseline?",options:["A starting measurement","A final price","A type of fertilizer","A password"],answer:0},{question:"Why use the same method repeatedly?",options:["To improve comparability","To guarantee growth","To remove all error","To avoid recording"],answer:0},{question:"If the measuring point changes each week, what can happen?",options:["The data may become misleading","The plant always grows faster","Units disappear","Nothing changes"],answer:0}]},
    {id:"PE-05-L4",title:"Count and Record What You See",objective:"Use tallies and simple tables to record counts and categories consistently.",teaching:["Counts can describe plants, leaves, flowers, pests, damaged items or completed tasks.","Tallies help avoid losing track while counting.","Categories should be defined clearly before data collection."],activity:"Conduct a supervised garden count such as number of plants alive, flowering, damaged or needing attention, using agreed categories.",diy:"Create a Garden Count Table with at least three categories, tally marks, totals and one short interpretation.",aiLayer:"AI Layer 4 — Data organization: compare a learner-made table with an AI-suggested table structure and decide which is clearer for the field question.",enterprise:"Inventory and quality checks depend on accurate counts and clear categories.",quiz:[{question:"Why use tally marks?",options:["To keep track while counting","To replace observation","To guarantee no mistakes","To hide totals"],answer:0},{question:"Why define categories before counting?",options:["So observations are recorded consistently","To make data random","To avoid comparison","To increase confusion"],answer:0},{question:"Which is a useful garden count?",options:["Number of surviving plants","Colour of a notebook only","A guessed future price","A password"],answer:0}]},
    {id:"PE-05-L5",title:"From Data Table to Trend",objective:"Organize repeated measurements in a table and describe a basic trend without overstating the evidence.",teaching:["A data table organizes observations by variable and time.","A trend is a general pattern such as increasing, decreasing or staying similar.","A small dataset may suggest a pattern without proving why it happened."],activity:"Build a class table from three dates of plant measurements and describe the visible trend for each selected plant.",diy:"Create a Weekly Garden Data Table and write three evidence-based statements using actual values.",aiLayer:"AI Layer 5 — Interpretation critique: ask AI to summarize a small prepared dataset, then identify any claims that go beyond the numbers.",enterprise:"Simple records help growers communicate progress, identify problems and support planning decisions.",quiz:[{question:"What is a trend?",options:["A general pattern in data","A guaranteed cause","A type of tool","A crop disease"],answer:0},{question:"Can a small table always prove why a plant changed?",options:["No","Yes","Only if AI says so","Always after three measurements"],answer:0},{question:"A strong data statement should include…",options:["Actual evidence from the table","Only opinion","Invented values","No units"],answer:0}]},
    {id:"PE-05-L6",title:"Measure, Check, Decide",objective:"Integrate field measurements and records to make one justified garden-management recommendation.",teaching:["Good decisions begin with a clear question and relevant evidence.","Measurements should be checked for units, unusual values and possible recording mistakes.","A recommendation should state what the evidence supports and what remains uncertain."],activity:"Teams review a small garden dataset containing dimensions, spacing, growth and counts, identify one issue and propose one practical response.",diy:"Complete a Garden Measurement Report: QUESTION → METHOD → DATA → CHECK → FINDING → RECOMMENDATION → NEXT MEASUREMENT.",aiLayer:"Integration — decision support: compare the team recommendation with an AI-generated alternative and accept only suggestions consistent with the field evidence, safety rules and local constraints.",enterprise:"Measurement supports quoting, input planning, inventory, productivity monitoring and quality assurance; inaccurate data can create financial and operational problems.",quiz:[{question:"What should happen before making a recommendation?",options:["Check the evidence","Ignore units","Invent missing data","Choose a favourite answer"],answer:0},{question:"What should a good recommendation include?",options:["A reason linked to evidence","A guarantee","A hidden assumption only","No next step"],answer:0},{question:"If one value looks unusual, what should you do?",options:["Check the measurement or record","Delete it automatically","Change it to match others","Pretend it is normal"],answer:0}]}
  ],
  finalAssessment:{
    mcq:[
      {question:"Which unit is appropriate for garden-bed area?",options:["Square metres","Litres","Minutes","Degrees only"],answer:0},
      {question:"A bed measuring 4 m by 2 m has an area of…",options:["8 m²","6 m²","2 m²","8 m"],answer:0},
      {question:"Why is a baseline important?",options:["It provides a starting point for comparison","It guarantees future growth","It replaces later measurements","It measures price"],answer:0},
      {question:"What makes repeated measurements more comparable?",options:["Using the same method and units","Changing tools and reference points randomly","Removing dates","Estimating everything"],answer:0},
      {question:"Why use a tally when counting?",options:["To track observations systematically","To make data decorative","To avoid totals","To replace categories"],answer:0},
      {question:"What is a trend?",options:["A general pattern across observations","A guaranteed cause","A measurement tool","A type of seed"],answer:0},
      {question:"How should AI be used with garden measurements?",options:["To check calculations or interpretations while preserving field evidence","To invent missing data","To replace all measurements","To ignore units"],answer:0},
      {question:"Why do enterprises value accurate measurement?",options:["It supports planning, costing and quality control","It removes all risk","It guarantees profit","It makes records unnecessary"],answer:0}
    ],
    theory:[
      "Explain how you would choose a suitable tool and unit to measure a garden bed, plant height and irrigation water.",
      "Describe how to measure and calculate the area of a rectangular garden bed.",
      "Explain why repeated plant measurements should use the same method and reference point.",
      "Describe how a tally table can help organize garden observations.",
      "Explain one useful role for AI or digital tools in garden measurement and one reason field evidence must remain primary."
    ],
    practical:"Measure a supervised garden or practice plot and produce a Garden Measurement Report containing length, width, calculated area, at least five spacing measurements, a minimum three-item count table, one plant-growth or status observation, units, one data-quality check and one evidence-based management recommendation."
  },
  evidence:["Garden Measurement Toolkit Card","Bed Measurement Sheet","Three-date Plant Growth Record","Garden Count Table","Weekly Garden Data Table","Garden Measurement Report","Facilitator practical assessment record"],
  passport:[
    "K: selects suitable quantities, tools and units for common garden measurements",
    "P: measures dimensions, spacing, growth and counts accurately enough for supervised field decisions",
    "D: records data in tables and uses calculator, spreadsheet or AI support to check arithmetic and trends",
    "S: uses measurement tools and field spaces safely and hygienically",
    "E: connects accurate measurement to material planning, inventory, costing and quality",
    "L: works systematically, checks errors, communicates evidence and justifies recommendations"
  ],
  trainerNotes:[
    "Use real garden spaces where safe, but a marked practice plot can substitute when access is limited.",
    "Teach precision appropriate to the task; avoid presenting false precision from simple tools.",
    "Mark plants with stable IDs if repeated measurements will be compared.",
    "Permit oral recording, peer scribing or accessible tools where needed without lowering the competency standard.",
    "Do not let AI generate or fill missing field data; missing observations should remain documented as missing.",
    "Rotate measuring, recording, calculating and presenting roles across genders and ability groups."
  ],
  remediation:"Reduce the task to one bed, one measurement type and one simple table. Rehearse measure → say the unit → record → check, then gradually reintroduce area, spacing and repeated observations.",
  extension:"Learners calculate a simple average plant height or spacing, create a basic line or bar chart using a spreadsheet where available, and compare whether the visual pattern supports their written interpretation.",
  imagePrompts:[
    "Photorealistic African learners ages 12–14 measuring a school garden bed with tape measures and rulers, one learner recording values in a notebook, inclusive boys and girls, safe supervised field activity, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Educational illustration showing garden measurement concepts: bed length and width, plant spacing, plant height, water volume and tally counting, clean white background, simple icons and dimension arrows, no written labels.",
    "Photorealistic small group of African students comparing plant-growth measurements around a raised garden bed, clipboard data table, ruler and measuring tape visible, facilitator supervising, no readable text."
  ]
};

export const pe05ByLanguage: Partial<Record<AppLanguage,PE05Module>> = { en };
export function getPE05(language:AppLanguage):PE05Module { return pe05ByLanguage[language] ?? en; }
