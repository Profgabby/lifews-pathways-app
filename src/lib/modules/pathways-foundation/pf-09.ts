import type { AppLanguage } from "@/lib/i18n6";
import type { PF01Module } from "./pf-01";

type PF09Module = Omit<PF01Module,"code"> & { code:"PF-09" };

const en: PF09Module = {
  code:"PF-09",
  title:"Working Together",
  level:"Pathways Foundation",
  age:"Approximately 8–11 years; roles and responsibilities should be adapted to learner readiness and accessibility needs.",
  duration:"6 guided lessons plus supervised teamwork practice and assessment time",
  fieldworkHours:3,
  bigQuestion:"How can we communicate, share responsibility and solve problems together so everyone can contribute?",
  whyItMatters:"Food, water, gardens, classrooms and community projects depend on people working together. This module develops age-appropriate cooperation, listening, role sharing, respectful communication, conflict resolution and evidence-based reflection. Learners practise teamwork through safe classroom and garden tasks while learning that strong teams value every member and do not use intimidation, discrimination or unsafe pressure.",
  outcomes:[
    "Explain why cooperation and shared responsibility matter in practical work.",
    "Demonstrate active listening and clear, respectful communication.",
    "Identify and perform an age-appropriate team role.",
    "Use a simple plan to divide a shared task fairly.",
    "Respond constructively to disagreement and ask a trusted adult for help when needed.",
    "Use a team checklist to monitor progress and improve a practical task.",
    "Reflect on personal contribution and recognize the contributions of others.",
    "Use AI or digital suggestions as optional planning support and verify that recommendations are fair, safe and suitable."
  ],
  vocabulary:["team","cooperate","communicate","listen","role","responsibility","respect","plan","task","contribute","fair","agree","disagree","conflict","solve","feedback","progress","evidence"],
  materials:["role cards","team-task cards","paper and markers","simple planning sheet","timer or clock","team progress checklist","safe classroom or garden materials","reflection cards","optional facilitator-controlled digital device"],
  safety:[
    "Use only age-appropriate classroom, garden or learning-site tasks under suitable supervision.",
    "Do not assign children hazardous tools, chemicals, heavy lifting, electrical work, commercial selling or unsupervised off-site duties.",
    "Team roles must not be assigned by gender, disability, ethnicity, religion or social status.",
    "No learner should be pressured to disclose private family information during reflection activities.",
    "Bullying, humiliation, threats and exclusion are not acceptable teamwork strategies; involve a trusted adult when conflict cannot be resolved safely.",
    "AI-generated role assignments or conflict advice must be checked by the facilitator for fairness, safeguarding and local appropriateness."
  ],
  lessons:[
    {
      id:"PF-09-L1", title:"What Makes a Team?", objective:"Recognize the behaviours and shared purpose that help a group become an effective team.",
      teaching:["A team is more than people standing together; members work toward a shared purpose.","Good teams communicate, contribute, respect boundaries and help one another complete agreed tasks.","Different strengths can make a team stronger when everyone has a meaningful way to participate."],
      activity:"Sort scenario cards into HELPS THE TEAM / HURTS THE TEAM and explain why behaviours such as listening, interrupting, sharing, excluding, helping and blaming affect the group.",
      diy:"Create a Team Agreement with five observable behaviours the class will use during practical work.",
      aiLayer:"AI Layer 1 — Recognition: compare an AI-generated list of teamwork behaviours with the class agreement and reject any behaviour that is unfair, unsafe or too vague to observe.",
      enterprise:"Farms, workshops, food businesses and service organizations rely on teams whose members understand the shared goal and their responsibilities.",
      quiz:[{question:"What is a team?",options:["People cooperating toward a shared purpose","People who never communicate","One person doing every task","People competing to exclude others"],answer:0},{question:"Which behaviour helps a team?",options:["Listening respectfully","Blaming without evidence","Hiding needed information","Refusing every role"],answer:0},{question:"Can different strengths help a team?",options:["Yes","No","Only if everyone has the same skill","Only adults have strengths"],answer:0}]
    },
    {
      id:"PF-09-L2", title:"Listen, Speak and Check Understanding", objective:"Use active listening and clear communication during a shared task.",
      teaching:["Active listening means paying attention, allowing the speaker to finish and checking what was understood.","Clear instructions describe what needs to happen without insulting or confusing others.","Questions such as 'Can you show me?' or 'Did I understand correctly?' can prevent mistakes."],
      activity:"In pairs, one learner describes a simple arrangement of safe objects while the other recreates it without seeing the original, then both identify which communication habits helped.",
      diy:"Create a LISTEN → REPEAT → ASK → CONFIRM communication card and use it during a second teamwork round.",
      aiLayer:"AI Layer 2 — Communication checking: facilitator provides an AI-written instruction; learners identify ambiguous words and rewrite it so a teammate can follow it safely.",
      enterprise:"Clear workplace communication reduces mistakes, wasted materials and avoidable conflict.",
      quiz:[{question:"What does active listening include?",options:["Paying attention and checking understanding","Interrupting immediately","Ignoring questions","Changing the subject"],answer:0},{question:"What can you do when an instruction is unclear?",options:["Ask a respectful question","Guess and hide mistakes","Blame another person","Walk away without telling anyone"],answer:0},{question:"Why confirm understanding?",options:["To reduce misunderstanding","To make tasks harder","To avoid teamwork","To prove one person is always right"],answer:0}]
    },
    {
      id:"PF-09-L3", title:"Roles and Shared Responsibility", objective:"Identify useful team roles and distribute responsibilities fairly for a practical task.",
      teaching:["A role describes a responsibility within the team, not a person's value or status.","Roles can include coordinator, materials helper, recorder, checker, presenter or clean-up helper depending on the task.","Rotating roles helps learners practise different skills and prevents one person from carrying all responsibility."],
      activity:"Teams receive a simple classroom or garden task, choose suitable roles, explain each responsibility and rotate at least one role halfway through.",
      diy:"Build a Team Role Wheel showing six roles and the observable responsibility attached to each.",
      aiLayer:"AI Layer 3 — Fair allocation: review an AI-suggested role plan and check whether every learner can participate, roles are safe and assignments avoid stereotypes.",
      enterprise:"Workplaces use clear roles and handoffs so tasks are completed safely, consistently and on time.",
      quiz:[{question:"What does a team role describe?",options:["A responsibility for the task","A person's worth","Who is allowed to bully others","Who never needs to help"],answer:0},{question:"Why rotate roles?",options:["To practise different skills and share responsibility","To confuse everyone","To avoid finishing","To make one learner do everything"],answer:0},{question:"Should roles be assigned only by gender?",options:["No","Yes","Always","Only for garden work"],answer:0}]
    },
    {
      id:"PF-09-L4", title:"Plan and Complete a Shared Task", objective:"Use a simple team plan to sequence, allocate and monitor a practical activity.",
      teaching:["Before starting, a team should understand the goal, materials, roles, sequence, safety boundaries and expected evidence.","A large task becomes easier when divided into smaller steps.","Teams should pause to check progress rather than waiting until the end to discover a problem."],
      activity:"Complete a supervised mini-project such as preparing and labeling a seed tray, organizing a learning-material station or caring for a small garden area using a team plan.",
      diy:"Complete a GOAL → STEPS → ROLES → CHECK → FINISH team task board and attach evidence of completion.",
      aiLayer:"AI Layer 4 — Planning support: compare the team's plan with an AI-suggested sequence and adopt only changes that are safe, necessary and appropriate to available resources.",
      enterprise:"Production and service teams use work plans, task sequences and quality checks to coordinate people and resources.",
      quiz:[{question:"What should a team know before starting?",options:["The goal, roles, steps and safety boundaries","Nothing","Only who will present","Only the final colour"],answer:0},{question:"Why divide a task into steps?",options:["To make work easier to organize and check","To hide responsibility","To create arguments","To remove the goal"],answer:0},{question:"When should progress be checked?",options:["During the task as well as at the end","Never","Only after materials are lost","Only by one learner in secret"],answer:0}]
    },
    {
      id:"PF-09-L5", title:"Solve Disagreements Respectfully", objective:"Use a safe, respectful process for simple disagreements and recognize when adult help is needed.",
      teaching:["Disagreement can happen even in good teams; the goal is to solve the problem without attacking the person.","A useful process is STOP → LISTEN → STATE THE PROBLEM → SUGGEST OPTIONS → AGREE AND CHECK.","Threats, bullying, unsafe behaviour or persistent conflict should be taken to a trusted adult rather than handled alone."],
      activity:"Role-play low-risk disagreements such as two learners wanting the same role or disagreeing about task order, then practise the resolution sequence.",
      diy:"Create a Conflict-Solving Pocket Card with the five-step process and one 'ASK AN ADULT' boundary.",
      aiLayer:"AI Layer 5 — Advice evaluation: examine an AI-generated response to a fictional disagreement and identify whether it is respectful, fair, safe and realistic.",
      enterprise:"Professional teams separate problems from personal attacks, document important issues and escalate safety concerns appropriately.",
      quiz:[{question:"What should a team focus on during disagreement?",options:["Solving the problem respectfully","Attacking the person","Winning by shouting","Hiding safety concerns"],answer:0},{question:"When should a trusted adult be involved?",options:["When there is bullying, threats, unsafe behaviour or unresolved conflict","Never","Only after someone is hurt","Only if AI says so"],answer:0},{question:"Which is a useful conflict step?",options:["Listen to each viewpoint","Interrupt constantly","Spread rumours","Exclude the other person"],answer:0}]
    },
    {
      id:"PF-09-L6", title:"Team Challenge and Reflection", objective:"Complete a supervised team task and evaluate both the result and the teamwork process using evidence.",
      teaching:["A successful team reviews both what it produced and how members worked together.","Evidence can include a completed task, checklist, observation notes, photographs supplied under approved procedures or facilitator feedback.","Reflection should identify one strength and one realistic improvement without humiliating anyone."],
      activity:"Teams complete a supervised garden or classroom responsibility challenge, use a progress checklist, present the result and give evidence-based feedback on the teamwork process.",
      diy:"Prepare a Team Evidence Portfolio containing the plan, role record, progress check, completed-task evidence and a short individual reflection.",
      aiLayer:"Integration — reflection support: compare the team's own evidence with an AI-generated teamwork checklist; keep only conclusions supported by observed behaviour.",
      enterprise:"Continuous improvement means teams review performance, recognize contributions and change processes when evidence shows a better way.",
      quiz:[{question:"What should team reflection examine?",options:["The result and how the team worked","Only who spoke most","Only mistakes","Private family information"],answer:0},{question:"What is good feedback?",options:["Specific, respectful and based on evidence","An insult","A rumour","A threat"],answer:0},{question:"Why record one improvement?",options:["To make the next teamwork experience stronger","To blame one person","To hide success","To avoid future teamwork"],answer:0}]
    }
  ],
  finalAssessment:{
    mcq:[
      {question:"Which behaviour supports effective teamwork?",options:["Listening and contributing","Excluding others","Hiding instructions","Blaming without evidence"],answer:0},
      {question:"What is the purpose of a team role?",options:["To clarify responsibility","To rank people's worth","To permit unsafe behaviour","To remove cooperation"],answer:0},
      {question:"What should happen when instructions are unclear?",options:["Ask and confirm","Guess silently","Ignore the task","Invent a different goal"],answer:0},
      {question:"Why use a team plan?",options:["To organize goals, steps, roles and checks","To create unnecessary conflict","To avoid responsibility","To hide progress"],answer:0},
      {question:"How should simple disagreement be handled?",options:["Respectfully, focusing on the problem","With threats","By humiliating someone","By spreading rumours"],answer:0},
      {question:"Which situation should be escalated to a trusted adult?",options:["Bullying or unsafe behaviour","A normal respectful question","Choosing a marker colour","Completing a checklist"],answer:0},
      {question:"How should AI teamwork advice be treated?",options:["As a suggestion to check for fairness and safety","As an automatic command","As more important than safeguarding","As a replacement for facilitator judgment"],answer:0},
      {question:"What makes teamwork feedback useful?",options:["It is specific, respectful and evidence-based","It attacks a person","It contains a rumour","It ignores what happened"],answer:0}
    ],
    theory:[
      "Explain four behaviours that help a team work well and why each matters.",
      "Describe how you would divide a simple garden or classroom task among team members fairly.",
      "Explain the difference between disagreeing about a task and attacking a person.",
      "Describe when a learner should ask a trusted adult for help during teamwork.",
      "Explain one useful way AI could support team planning and two checks needed before following its suggestion."
    ],
    practical:"In a supervised group, plan and complete an age-appropriate classroom or garden responsibility task. Show the shared goal, role allocation, communication process, progress check, safe response to one challenge, completed-task evidence and an individual reflection on contribution and improvement."
  },
  evidence:["Team Agreement","Communication card","Team Role Wheel","Completed team task board","Conflict-Solving Pocket Card","Team progress checklist","Team Evidence Portfolio","Facilitator practical assessment record"],
  passport:["K: explains cooperation, communication, roles and shared responsibility","P: completes a supervised practical task as part of a team","D: uses a simple team plan/checklist and evaluates AI planning suggestions","S: respects safeguarding boundaries and escalates bullying, threats or unsafe behaviour","E: connects teamwork, role clarity and quality checks to responsible workplaces","L: listens, communicates respectfully, resolves low-risk disagreement and reflects on contribution"],
  trainerNotes:["Model respectful language and active listening rather than only describing them.","Rotate visible and less-visible roles so leadership is not equated only with speaking or directing.","Adapt roles so learners with different mobility, literacy, communication or sensory needs can participate meaningfully.","Use fictional or low-risk conflict scenarios; do not ask learners to reenact traumatic or private experiences.","Praise observable teamwork behaviours rather than fixed personality labels.","Keep enterprise examples age-appropriate; minors are learners and should not be assigned commercial selling duties."],
  remediation:"Use pairs before larger groups. Practise one routine at a time: listen and repeat, perform one assigned role, then complete a two-step shared task. Use picture role cards and oral reflection where literacy support is needed.",
  extension:"Learner designs a teamwork plan for a fictional school GrowMeal garden activity, including six roles, task dependencies, two quality checks, an accessibility adaptation and a safe conflict-escalation route.",
  imagePrompts:[
    "Photorealistic African children ages 8–11 cooperating on a supervised school garden task, inclusive boys and girls sharing safe age-appropriate roles, one learner recording observations, another watering carefully, natural daylight, no readable text, LIFEWS forest-green and golden accents.",
    "Child-friendly educational illustration of a diverse team using listening, role sharing, planning, checking and respectful problem solving, simple visual icons and arrows, clean white background, no readable text.",
    "Photorealistic African learners around a classroom task board planning a small practical project with role cards and a progress checklist while a facilitator supervises, collaborative expressions, no readable text."
  ]
};

export const pf09ByLanguage: Partial<Record<AppLanguage,PF09Module>> = { en };
export function getPF09(language:AppLanguage):PF09Module { return pf09ByLanguage[language] ?? en; }
