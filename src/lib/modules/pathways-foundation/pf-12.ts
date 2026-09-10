import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";

type PF12Module = Omit<PF01Module,"code"> & { code:"PF-12" };

const en: PF12Module = {
  code:"PF-12",
  title:"My Next Step",
  level:"Pathways Foundation",
  age:"Approximately 8–11 years; transition goals should remain exploratory, age-appropriate and free from pressure to enter work early.",
  duration:"6 guided lessons plus portfolio preparation, presentation and assessment time",
  fieldworkHours:2,
  bigQuestion:"What have I learned, what evidence can I show, and what is a realistic next learning step for me?",
  whyItMatters:"Progress becomes more meaningful when learners can recognize what they have learned, show evidence, identify strengths and plan a realistic next step. This capstone module helps learners organize their Pathways Foundation evidence, reflect across knowledge, practical skills, digital responsibility, safety, enterprise awareness and leadership, and prepare a simple Pathways Passport presentation. The emphasis is on continued learning and confidence, not premature career selection or commercial work.",
  outcomes:[
    "Identify important knowledge and practical skills gained across Pathways Foundation.",
    "Select evidence that demonstrates learning rather than relying only on memory or self-claims.",
    "Describe at least three personal strengths and one area for further practice.",
    "Use a simple self-assessment across the K, P, D, S, E and L Skills Passport domains.",
    "Set one specific, realistic and age-appropriate next learning goal.",
    "Prepare and deliver a short Pathways Passport presentation using safe, non-sensitive evidence.",
    "Give and receive respectful feedback.",
    "Use AI or digital tools as optional support while keeping personal data private and checking generated suggestions."
  ],
  vocabulary:["progress","evidence","strength","practice","goal","reflection","portfolio","passport","present","feedback","improve","knowledge","practical skill","digital","safety","enterprise","leadership","next step"],
  materials:["learner work samples or approved photographs from prior modules","Pathways Passport reflection sheet","K/P/D/S/E/L domain cards","goal-setting worksheet","portfolio folder or envelope","presentation planning card","peer-feedback sheet","optional facilitator-controlled digital device"],
  safety:[
    "Do not include home addresses, phone numbers, passwords, health information, family financial information or other sensitive personal data in learner portfolios or presentations.",
    "Use only approved photographs or digital evidence and follow consent requirements.",
    "Reflection activities must not pressure learners to disclose trauma, family problems or private circumstances.",
    "Next-step planning must not require child labour, hazardous tasks, commercial selling or unsupervised work.",
    "Feedback must focus on learning evidence and behaviours rather than insults, popularity or social status.",
    "AI tools must not be given unnecessary personal information about a child."
  ],
  lessons:[
    {
      id:"PF-12-L1", title:"Look Back at My Learning", objective:"Recall and categorize major learning experiences from Pathways Foundation.",
      teaching:["Reflection means thinking carefully about what happened, what was learned and what changed.","The Foundation modules covered learning habits, reading, numeracy, plants, seeds, water, food systems, food safety, teamwork, community skills and digital beginnings.","Good reflection uses examples rather than saying only 'I learned a lot'."],
      activity:"Create a Foundation Learning Timeline with one remembered activity, skill or idea from each completed module.",
      diy:"Build a 12-part My Learning Journey strip using drawings, keywords or short sentences.",
      aiLayer:"AI Layer 1 — Recall support: use a facilitator-controlled AI summary only after learners create their own timeline, then check whether anything important was missed or incorrectly added.",
      enterprise:"Workers and entrepreneurs improve by reviewing completed tasks and identifying what they learned from results, mistakes and feedback.",
      quiz:[{question:"What is reflection?",options:["Thinking carefully about what was learned and improved","Copying without thinking","Hiding mistakes","Choosing a job immediately"],answer:0},{question:"What makes reflection stronger?",options:["Specific examples","Only saying 'good'","Private family details","A random guess"],answer:0},{question:"Should an AI summary replace your own reflection?",options:["No","Yes always","Only if longer","Only if it sounds confident"],answer:0}]
    },
    {
      id:"PF-12-L2", title:"Show Evidence of What I Can Do", objective:"Distinguish evidence of learning from unsupported claims and select appropriate portfolio items.",
      teaching:["Evidence is something that helps show what a learner knows or can do.","Useful evidence can include a completed investigation, diagram, checklist, measurement table, supervised practical record, reflection or approved photograph.","Evidence should be relevant, truthful and safe to share."],
      activity:"Sort sample items into STRONG EVIDENCE / NEEDS EXPLANATION / NOT APPROPRIATE TO SHARE and explain each decision.",
      diy:"Select at least six portfolio items from different Foundation modules and add one sentence explaining what each item demonstrates.",
      aiLayer:"AI Layer 2 — Evidence description: compare a learner-written evidence caption with an AI-generated caption and remove claims that the artifact does not actually prove.",
      enterprise:"Portfolios, work samples and records help people demonstrate competence more reliably than unsupported claims.",
      quiz:[{question:"Which is evidence of a practical skill?",options:["A supervised practical assessment record","Saying 'I am the best'","A rumour","Someone else's work"],answer:0},{question:"What should evidence be?",options:["Relevant and truthful","Invented","Private if unnecessary","Exaggerated"],answer:0},{question:"Why add a caption to evidence?",options:["To explain what it demonstrates","To guarantee a grade","To hide who made it","To add private data"],answer:0}]
    },
    {
      id:"PF-12-L3", title:"My Strengths and Areas to Practise", objective:"Identify strengths using evidence and choose one skill area for further development.",
      teaching:["A strength is something a learner can currently do relatively well, supported by examples.","Everyone has areas that still need practice; improvement is part of learning.","Strengths can include observing, measuring, explaining, cooperating, caring for materials, recording data or asking good questions."],
      activity:"Use evidence cards to complete 'I can...' statements and one 'I am still practising...' statement, then discuss in pairs using respectful feedback.",
      diy:"Create a Strengths Shield with three evidence-based strengths and one Practice Target.",
      aiLayer:"AI Layer 3 — Bias awareness: compare AI-suggested strengths based on a fictional portfolio with the actual evidence and discuss why software should not define a child's identity or potential.",
      enterprise:"Continuous skill development depends on knowing both current capability and the next competence to practise.",
      quiz:[{question:"How should a learner identify a strength?",options:["Using examples or evidence","By comparing social status","By guessing what sounds impressive","By copying another learner"],answer:0},{question:"Does needing practice mean failure?",options:["No","Yes always","Only in digital skills","Only for practical work"],answer:0},{question:"Can AI decide a child's future potential?",options:["No","Yes completely","Only from one worksheet","Only if it gives a score"],answer:0}]
    },
    {
      id:"PF-12-L4", title:"Check My Skills Passport", objective:"Use the K, P, D, S, E and L domains to organize evidence of broad competency development.",
      teaching:["K means Knowledge; P means Practical Skills; D means Data & Digital; S means Safety; E means Enterprise & Employability; L means Leadership & Life Skills.","A balanced learning record includes more than test scores.","A learner may have stronger evidence in some domains than others and can set goals accordingly."],
      activity:"Place selected portfolio evidence under the K/P/D/S/E/L domain cards and explain why each item belongs there.",
      diy:"Complete a six-domain Pathways Passport Reflection with one evidence example and one confidence statement for each domain.",
      aiLayer:"AI Layer 4 — Classification check: compare AI categorization of sample evidence with the learner's classification and justify any disagreement.",
      enterprise:"Employability and enterprise readiness depend on combinations of knowledge, practical competence, safety, digital habits and human skills rather than one isolated ability.",
      quiz:[{question:"What does P represent in the Skills Passport?",options:["Practical Skills","Passwords","Profit","Popularity"],answer:0},{question:"What does S represent?",options:["Safety","Selling","Speed","Status"],answer:0},{question:"Why use several domains?",options:["Learning includes different kinds of competence","Only test scores matter","To rank families","To force a career choice"],answer:0}]
    },
    {
      id:"PF-12-L5", title:"Choose a Realistic Next Goal", objective:"Write one specific and age-appropriate next learning goal with simple action steps.",
      teaching:["A useful goal says what the learner wants to improve and what action will be taken.","The next step should be realistic for the learner's age, available support and current level.","Goals can focus on learning, practice, school participation, garden skills, reading, numeracy, digital responsibility or another approved development area."],
      activity:"Transform vague goals such as 'be better at plants' into clearer goals with action, support and a way to check progress.",
      diy:"Complete a NEXT STEP card: MY GOAL → WHY IT MATTERS → THREE ACTIONS → WHO CAN SUPPORT ME → HOW I WILL KNOW I IMPROVED.",
      aiLayer:"AI Layer 5 — Goal refinement: ask AI to suggest ways to make a fictional goal more specific, then reject suggestions that are unsafe, unrealistic, commercial or inappropriate for a child.",
      enterprise:"Planning and goal setting help people build competence over time, but Foundation learners should prioritize education and safe skill exploration.",
      quiz:[{question:"What makes a good next-step goal?",options:["It is specific, realistic and age-appropriate","It requires hazardous work","It guarantees income","It copies another person's goal"],answer:0},{question:"What should a goal include?",options:["Actions and a way to check progress","Private passwords","A guaranteed outcome","A permanent career decision"],answer:0},{question:"Who can support a learner goal?",options:["A trusted educator, caregiver or approved mentor","An unknown online stranger","Anyone asking for private data","No one ever"],answer:0}]
    },
    {
      id:"PF-12-L6", title:"Present My Pathways Passport", objective:"Present selected evidence, reflect on progress and communicate one next step clearly and respectfully.",
      teaching:["A strong presentation has a simple beginning, evidence-based middle and clear next step.","Learners should explain what they did, what they learned and what they want to practise next.","Peer feedback should recognize one strength and suggest one practical improvement."],
      activity:"Learners deliver a short Pathways Passport presentation using selected evidence. Peers use a two-part feedback form: ONE STRENGTH / ONE HELPFUL NEXT SUGGESTION.",
      diy:"Complete the final Pathways Foundation Portfolio and Pathways Passport Presentation with six-domain evidence and one next-step goal.",
      aiLayer:"Integration — presentation support: use AI only for optional rehearsal questions or wording support; the learner must verify the final content and present their own evidence rather than generated achievements.",
      enterprise:"Presenting evidence, explaining skills and responding to feedback are foundational capabilities for future education, training, employment and responsible enterprise.",
      quiz:[{question:"What should a Pathways Passport presentation include?",options:["Evidence, reflection and a next step","Private family data","Invented achievements","A guaranteed career"],answer:0},{question:"What is helpful peer feedback?",options:["One specific strength and one practical suggestion","An insult","A popularity ranking","A rumour"],answer:0},{question:"Who should verify the final presentation content?",options:["The learner with facilitator support","AI alone","An unknown website","No one"],answer:0}]
    }
  ],
  finalAssessment:{
    mcq:[
      {question:"What is the purpose of reflection?",options:["To understand learning and improvement","To hide mistakes","To copy another learner","To collect private data"],answer:0},
      {question:"Which is strong learning evidence?",options:["A completed, supervised practical record","An unsupported boast","A rumour","Someone else's work"],answer:0},
      {question:"What does K represent in the Skills Passport?",options:["Knowledge","Kitchen","Kilometres","Keeping score"],answer:0},
      {question:"What does D represent?",options:["Data & Digital","Discipline only","Daily income","Decoration"],answer:0},
      {question:"What should a next-step goal be?",options:["Specific, realistic and age-appropriate","Hazardous","Commercially compulsory","A permanent decision"],answer:0},
      {question:"What should not be placed in a learner portfolio?",options:["Unnecessary sensitive personal information","Approved work samples","A learning reflection","A supervised assessment record"],answer:0},
      {question:"How should AI be used in the portfolio process?",options:["As optional support that must be checked","To invent achievements","To make final decisions about the learner","To collect unnecessary personal data"],answer:0},
      {question:"What makes feedback useful?",options:["It is respectful, specific and helps improvement","It ranks popularity","It attacks the learner","It ignores evidence"],answer:0}
    ],
    theory:[
      "Describe three important things you learned during Pathways Foundation and identify evidence for each.",
      "Explain the difference between saying you have a skill and showing evidence of that skill.",
      "Choose three Skills Passport domains and explain one piece of evidence you could place under each.",
      "Write one realistic next-step goal and three actions you can take toward it.",
      "Explain two privacy or safety rules you should follow when preparing a digital or paper learning portfolio."
    ],
    practical:"Prepare and deliver a short Pathways Passport presentation. Include at least six approved evidence items spanning the K, P, D, S, E and L domains, three evidence-based strengths, one area for further practice, one specific age-appropriate next-step goal, three supporting actions and a brief response to peer or facilitator feedback."
  },
  evidence:["12-part Learning Journey strip","Six-item evidence selection with captions","Strengths Shield and Practice Target","Six-domain Pathways Passport Reflection","Next Step goal card","Final Pathways Foundation Portfolio","Pathways Passport Presentation","Facilitator practical assessment record"],
  passport:["K: explains important Foundation concepts and identifies evidence of understanding","P: selects and presents evidence of completed practical tasks","D: organizes learning records, protects privacy and checks AI/digital suggestions","S: applies safeguarding, privacy and age-appropriate participation boundaries","E: recognizes how learning, reliability and evidence support future training and responsible opportunity","L: reflects honestly, communicates strengths, receives feedback and sets a realistic next goal"],
  trainerNotes:["Treat the portfolio as evidence of development, not a competition among learners.","Allow oral, pictorial, audio-assisted or facilitator-scribed presentation formats where appropriate.","Check all portfolio artifacts for privacy and consent before public or group display.","Avoid language that fixes a child's identity, intelligence or future occupation.","Next steps should emphasize continued education, Foundation consolidation or progression to an age-appropriate Explorer pathway rather than paid work.","Celebrate effort, evidence, safe practice and improvement without guaranteeing future outcomes."],
  remediation:"Reduce the portfolio to three strong evidence items. Use sentence starters such as 'I learned...', 'I can show this by...' and 'Next I want to practise...'. Complete the K/P/D/S/E/L reflection orally with facilitator prompts before reassessment.",
  extension:"Learner creates a one-page personal learning dashboard that links twelve Foundation experiences to the six Skills Passport domains, identifies two cross-module connections, and develops a four-week practice plan for one next-step goal.",
  imagePrompts:[
    "Photorealistic African children ages 8–11 in a supervised GreenSkills classroom reviewing learning portfolios with seed experiments, water charts, garden observations and teamwork evidence, inclusive participation, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Child-friendly educational illustration showing six balanced competency areas represented by knowledge, practical work, digital/data, safety, enterprise awareness and leadership/life skills, connected around a learner portfolio, no readable text.",
    "Photorealistic African learner confidently presenting a simple Pathways portfolio to classmates and a facilitator, visual evidence boards without readable private information, supportive classroom environment, no readable text."
  ]
};

export const pf12ByLanguage: Partial<Record<AppLanguage,PF12Module>> = { en };
export function getPF12(language:AppLanguage):PF12Module { return pf12ByLanguage[language] ?? en; }
