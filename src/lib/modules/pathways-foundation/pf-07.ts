import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";

type PF07Module = Omit<PF01Module,"code"> & { code:"PF-07" };

const en: PF07Module = {
  code:"PF-07",
  title:"Food Comes From Somewhere",
  level:"Pathways Foundation",
  age:"Approximately 8–11 years; examples should reflect local diets and food systems without stigmatizing households or communities.",
  duration:"6 guided lessons plus food-origin mapping, practical observation and assessment time",
  fieldworkHours:3,
  bigQuestion:"Where does our food come from, what happens before it reaches us, and how can we make responsible food choices using evidence?",
  whyItMatters:"Food is the result of connected biological, social and technical processes. This module helps learners trace common foods back to plants, animals and production places, recognize basic farm-to-food stages, understand that processing and transport add value and responsibility, and use observation, simple records and verified digital tools to investigate local food systems.",
  outcomes:[
    "Connect familiar foods to plant, animal or mixed origins.",
    "Identify basic production places such as farms, gardens, orchards, fisheries, livestock systems and food-processing spaces.",
    "Describe a simple farm-to-food sequence for at least three local foods.",
    "Distinguish raw ingredients from processed food products.",
    "Recognize that handling, transport, storage and preparation affect food quality and safety.",
    "Create and explain a local food journey using observation and evidence.",
    "Evaluate AI or digital claims about food origins by checking labels, trusted adults, direct observation or reliable references.",
    "Connect food-system knowledge to responsible growing, processing, logistics, retail and service livelihoods without requiring children to sell products."
  ],
  vocabulary:["food","ingredient","crop","livestock","farm","garden","harvest","raw","processed","transport","storage","market","prepare","origin","journey","evidence"],
  materials:["safe examples or pictures of familiar foods and ingredients","food-origin picture cards","paper and markers","clean empty food packages with private/commercial details covered where needed","simple farm-to-food sequence cards","local map or community sketch","optional facilitator-controlled digital device"],
  safety:[
    "Do not require learners to taste foods during the module.",
    "Use clean, sealed, non-perishable examples or pictures for sorting activities.",
    "Check allergies before any activity involving real food contact.",
    "Do not ask children to enter active kitchens, processing machinery areas, roads or markets without appropriate adult supervision and site permission.",
    "Food-safety claims from AI or social media must be checked against trusted local guidance.",
    "Do not rank families or cultures as better or worse based on the foods they eat."
  ],
  lessons:[
    {
      id:"PF-07-L1", title:"Food Has an Origin", objective:"Connect familiar foods to their plant, animal or mixed origins.",
      teaching:["Many foods begin with plants, animals or both.","A food may look very different from its original ingredient after preparation or processing.","Knowing where food comes from helps us understand farming, nutrition, safety and livelihoods."],
      activity:"Sort familiar food and ingredient cards into PLANT, ANIMAL and MIXED origin groups, then explain one choice in each group.",
      diy:"Create a Food Origin Board with at least eight familiar foods and arrows showing their main source.",
      aiLayer:"AI Layer 1 — Recognition: facilitator asks an AI tool to classify several familiar foods by origin; learners check the answers against packages, direct observation or trusted knowledge.",
      enterprise:"Growers, livestock keepers, fishers and food processors create value at different points in the food system.",
      quiz:[
        {question:"Maize mainly comes from…",options:["A plant","A machine","A battery","A mineral"],answer:0},
        {question:"Milk mainly comes from…",options:["Animals","Rocks","Plastic","Soil only"],answer:0},
        {question:"Why learn food origins?",options:["To understand how food is produced and handled","To memorize package colours only","To avoid asking questions","To prove one culture is best"],answer:0}
      ]
    },
    {
      id:"PF-07-L2", title:"Where Food Is Produced", objective:"Identify common places where food is grown, raised, caught or produced.",
      teaching:["Food can come from farms, home gardens, orchards, livestock systems, fisheries and other production environments.","Different foods require different resources, knowledge and care.","Production places are connected to water, soil, energy, labour and weather conditions."],
      activity:"Match foods to possible production places using a local or regional picture map.",
      diy:"Draw a community food-source map showing at least five production places or sources and the foods connected to them.",
      aiLayer:"AI Layer 2 — Guided comparison: compare an AI-generated list of places where one local food could be produced with actual local knowledge and identify what is plausible locally.",
      enterprise:"Food production supports many roles including growers, irrigation workers, animal-care workers, transporters and technicians.",
      quiz:[
        {question:"Which is a food-production place?",options:["A garden","A password screen","A shoe box only","A traffic light"],answer:0},
        {question:"Do all foods use exactly the same production system?",options:["No","Yes always","Only in cities","Only if packaged"],answer:0},
        {question:"Food production often depends on…",options:["Resources such as water and soil","No resources","Only advertising","Only packaging"],answer:0}
      ]
    },
    {
      id:"PF-07-L3", title:"From Raw Ingredient to Food", objective:"Distinguish raw ingredients from processed or prepared food products.",
      teaching:["A raw ingredient is a basic food material before substantial preparation or processing.","Processing can include washing, cutting, drying, grinding, cooking, fermenting, mixing or packaging.","Processing can improve convenience, preservation or value, but it must be carried out safely."],
      activity:"Create before-and-after pairs such as maize → flour, cassava → garri, milk → yoghurt, tomatoes → sauce, or hibiscus calyces → prepared beverage ingredients, using local examples.",
      diy:"Build a three-column chart: RAW INGREDIENT → PROCESS → FOOD PRODUCT for five foods.",
      aiLayer:"AI Layer 3 — Sequencing: ask AI for the steps between a raw ingredient and product, then learners mark which steps are accurate, missing, unsafe or inappropriate for their local example.",
      enterprise:"Processing adds value when quality, hygiene, accurate information and responsible resource use are maintained.",
      quiz:[
        {question:"Which is a processing step?",options:["Grinding","Guessing","Hiding labels","Ignoring hygiene"],answer:0},
        {question:"A raw ingredient can become…",options:["A processed food product","A password","Electricity only","A school desk"],answer:0},
        {question:"Processing should include…",options:["Safe handling and quality control","Unsafe shortcuts","No records","Unknown ingredients"],answer:0}
      ]
    },
    {
      id:"PF-07-L4", title:"The Food Journey", objective:"Sequence the main stages food may pass through from production to the point of eating.",
      teaching:["A simple food journey may include production, harvest or collection, handling, processing, transport, storage, sale or distribution, preparation and eating.","Not every food follows exactly the same journey.","Each stage can affect quality, safety, waste and cost."],
      activity:"Arrange mixed stage cards into a logical journey for one local food and compare with another group's sequence.",
      diy:"Create an illustrated Farm-to-Food Journey strip for one chosen food using at least six stages.",
      aiLayer:"AI Layer 4 — Systems mapping: compare the learner's food journey with an AI-generated pathway, then identify missing stages and unnecessary assumptions.",
      enterprise:"Many occupations exist along the food journey, including production, processing, transport, storage, retail, food service and quality assurance.",
      quiz:[
        {question:"What usually happens before food reaches a consumer?",options:["Several connected stages","Nothing","Only advertising","Only packaging"],answer:0},
        {question:"Do all foods follow identical journeys?",options:["No","Yes","Only imported foods differ","Only drinks differ"],answer:0},
        {question:"Why do journey stages matter?",options:["They can affect quality, safety, waste and cost","They have no effect","They only change colour","They remove the need for hygiene"],answer:0}
      ]
    },
    {
      id:"PF-07-L5", title:"Handling, Storage and Waste", objective:"Recognize simple practices that help protect food quality and reduce avoidable waste.",
      teaching:["Food can be lost or wasted through poor handling, damage, spoilage or unsuitable storage.","Clean handling, appropriate storage and careful transport help protect food quality.","Reducing avoidable waste respects the water, energy, labour and land used to produce food."],
      activity:"Inspect picture scenarios of good and poor food handling and identify what could cause damage, contamination or waste.",
      diy:"Create a Food Care Checklist with five actions for protecting a chosen food during handling or storage.",
      aiLayer:"AI Layer 5 — Decision support: learners compare AI-suggested food-storage ideas with facilitator-approved safe practice and reject claims that lack context or safety verification.",
      enterprise:"Reducing spoilage and damage improves quality and resource efficiency across food enterprises and community food programs.",
      quiz:[
        {question:"Which can reduce avoidable food waste?",options:["Careful handling and suitable storage","Damaging produce","Leaving food in unsafe conditions","Ignoring spoilage"],answer:0},
        {question:"Why does food waste matter beyond the food itself?",options:["Resources such as water, energy and labour were also used","It does not matter","Only packaging is affected","Only shops are affected"],answer:0},
        {question:"Should AI alone decide whether stored food is safe to eat?",options:["No","Yes always","Only if the image is clear","Only if the food is expensive"],answer:0}
      ]
    },
    {
      id:"PF-07-L6", title:"Trace One Food From Source to Table", objective:"Investigate and present a complete evidence-based journey for one familiar food.",
      teaching:["Tracing food means connecting a product to its origin and the stages it passes through.","Evidence may include package information, observation, an interview with a trusted adult, photographs supplied by the facilitator or reliable references.","A strong presentation distinguishes what is known from what is assumed."],
      activity:"Teams choose one local food and build a source-to-table story using verified information from at least two evidence sources.",
      diy:"Complete and present a Food Journey Portfolio: ORIGIN → PRODUCTION → HARVEST/COLLECTION → PROCESS/HANDLING → TRANSPORT/STORAGE → PREPARATION → EATING, with one resource-use and one waste-reduction note.",
      aiLayer:"Integration — verification and explanation: use AI to suggest one missing stage or question, then verify before adding it to the final food journey.",
      enterprise:"Learners identify at least three responsible jobs or services connected to the chosen food journey; minors are not required to sell or perform commercial work.",
      quiz:[
        {question:"What makes a food journey trustworthy?",options:["Verified evidence","Guessing","Copying without checking","A sales slogan"],answer:0},
        {question:"What should you do with an uncertain stage?",options:["Label it as uncertain and check reliable information","Present it as fact","Hide it","Invent evidence"],answer:0},
        {question:"A complete food journey can show…",options:["How many people, resources and steps connect source to table","Only the package colour","Only the final price","Only one person's work"],answer:0}
      ]
    }
  ],
  finalAssessment:{
    mcq:[
      {question:"Rice is mainly produced from…",options:["A plant crop","A battery","Plastic","A mineral"],answer:0},
      {question:"Which is an example of food processing?",options:["Drying or grinding an ingredient","Ignoring hygiene","Leaving produce damaged","Deleting records"],answer:0},
      {question:"What can happen between farm and table?",options:["Harvest, handling, transport, storage and preparation","Nothing","Only advertising","Only payment"],answer:0},
      {question:"Why is careful storage important?",options:["It can protect quality and reduce spoilage","It guarantees unlimited shelf life","It removes all safety risks","It replaces clean handling"],answer:0},
      {question:"Which is a useful source of food-origin evidence?",options:["A verified package label or trusted producer explanation","A random rumour","An unverified post","A guess"],answer:0},
      {question:"Why can food waste also waste water and energy?",options:["Those resources were used during production and handling","Food contains electricity","Packaging creates all resources","Waste has no resource effect"],answer:0},
      {question:"How should AI food-origin information be used?",options:["As a suggestion to verify","As unquestionable truth","Instead of observation","Instead of food-safety guidance"],answer:0},
      {question:"Which statement best describes a food system?",options:["Connected people, resources and activities that move food from source to use","Only a farm","Only a shop","Only a kitchen"],answer:0}
    ],
    theory:[
      "Choose one familiar food and explain whether its main origin is plant, animal or mixed.",
      "Describe at least six stages in the journey of one food from source to eating.",
      "Explain two ways poor handling or storage can increase food loss or waste.",
      "Describe one way processing can add value to a raw ingredient while still requiring safe handling.",
      "Explain how you would check an AI claim about where a food comes from or how it is produced."
    ],
    practical:"Select one familiar food and construct an evidence-based farm-to-food journey showing its origin, at least six stages, one important resource used, one quality or safety consideration, one waste-reduction action, and three responsible jobs or services connected to the journey."
  },
  evidence:["Food Origin Board","Community food-source map","Raw ingredient-to-product chart","Farm-to-Food Journey strip","Food Care Checklist","Final Food Journey Portfolio","Facilitator practical assessment record"],
  passport:["K: identifies food origins, production places and basic food-system stages","P: constructs and explains a source-to-table food journey","D: uses simple evidence and verifies digital/AI food-origin claims","S: follows allergy, food-contact and site-safety boundaries","E: identifies value-adding roles in production, processing, logistics and food service","L: works in teams, distinguishes evidence from assumptions and communicates a food-system story"],
  trainerNotes:["Prioritize familiar local foods so learners can connect the curriculum to lived experience.","Avoid implying that processed foods are automatically good or bad; focus on what processing does and why safety, quality and nutrition matter.","Use images or sealed packages instead of open foods where allergy or hygiene concerns exist.","Invite a farmer, processor, cook, transporter or other food-system worker only through approved safeguarding procedures.","Make visible the contribution of women and men across food-system roles.","Keep enterprise learning conceptual and age-appropriate; do not require minors to sell products."],
  remediation:"Use three familiar foods and picture cards only. Practise the sequence SOURCE → PREPARE/PROCESS → MOVE/STORE → EAT before adding more detailed stages. Allow oral storytelling instead of extended writing.",
  extension:"Learner compares the journeys of a fresh food and a processed food, identifies where water and energy are used in each, and proposes one realistic way to reduce waste.",
  imagePrompts:[
    "Photorealistic African children ages 8–11 in a supervised GreenSkills classroom sorting familiar local foods into plant, animal and mixed-origin groups, diverse foods displayed safely, inclusive participation, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Clean child-friendly educational illustration showing a generic farm-to-food journey from crop field through harvest, washing or processing, transport, covered storage, preparation and family meal, icon sequence, no labels or readable text.",
    "Photorealistic African learners building a food journey map with ingredient samples, safe empty packages, drawings and a community map while a facilitator supports evidence checking, no readable text."
  ]
};

export const pf07ByLanguage: Partial<Record<AppLanguage,PF07Module>> = { en };
export function getPF07(language:AppLanguage):PF07Module { return pf07ByLanguage[language] ?? en; }
