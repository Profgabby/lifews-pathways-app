import type { AppLanguage } from "@/lib/i18n6";

type ModulePlayerCopy = {
  stages: string;
  fieldworks: string;
  moduleProgress: string;
  stageOf: (step: number) => string;
  progressHint: string;
  learn: string;
  assessment: string;
  practicalPassport: string;
  learningStage: (step: number) => string;
  applyConnect: string;
  whyMatters: string;
  achieve: string;
  vocabulary: string;
  materialsSafety: string;
  objective: string;
  learning: string;
  tryIt: string;
  aiDigital: string;
  enterprise: string;
  knowledgeApplication: string;
  assessmentLead: string;
  assessmentStructure: string;
  assessmentSummary: string;
  mcq: string;
  applicationQuestions: string;
  practicalEvidence: string;
  practicalLead: string;
  finalPractical: string;
  evidenceWorkspace: string;
  prepareSubmission: string;
  facilitatorReview: string;
  evidenceIntro: string;
  requiredEvidence: string;
  uploadArea: string;
  uploadPending: string;
  skillsPassport: string;
  competenciesEarned: string;
  passportNote: string;
  diyTasks: string;
  trainerGuidance: string;
  remediation: string;
  extension: string;
  previous: string;
  continue: string;
  learnerSpace: string;
  backTo: string;
};

export const modulePlayerCopy: Record<AppLanguage, ModulePlayerCopy> = {
  en: {
    stages: "stages", fieldworks: "FieldWorks", moduleProgress: "MODULE PROGRESS", stageOf: s => `Stage ${s} of 7`, progressHint: "Keep moving—your evidence builds your Skills Passport.", learn: "Learn", assessment: "Assessment", practicalPassport: "Practical & Passport", learningStage: s => `Learning stage ${s} of 5`, applyConnect: "Apply, connect and consolidate", whyMatters: "Why this matters", achieve: "What you will achieve", vocabulary: "Key vocabulary", materialsSafety: "Materials & safety", objective: "Objective", learning: "Learning", tryIt: "Try it", aiDigital: "AI & digital skill", enterprise: "Enterprise connection", knowledgeApplication: "Knowledge & Application Check", assessmentLead: "Show what you understand before moving into the practical evidence stage.", assessmentStructure: "Assessment structure", assessmentSummary: "8 multiple-choice questions · 5 application questions · practical assessment follows", mcq: "Multiple-choice questions", applicationQuestions: "Application questions", practicalEvidence: "Practical Evidence & Skills Passport", practicalLead: "Turn what you learned into evidence of competence. Your facilitator can review the evidence before it becomes part of your Skills Passport.", finalPractical: "Final practical assessment", evidenceWorkspace: "Evidence workspace", prepareSubmission: "Prepare your submission", facilitatorReview: "Facilitator review", evidenceIntro: "Use this checklist to prepare the evidence required for this module. Secure learner evidence storage is being connected to this workspace.", requiredEvidence: "Required evidence", uploadArea: "Evidence upload area", uploadPending: "Submission controls activate when secure learner evidence storage is connected.", skillsPassport: "Skills Passport", competenciesEarned: "Competencies earned", passportNote: "Competencies should be verified from demonstrated evidence, not attendance alone.", diyTasks: "DIY tasks from all learning stages", trainerGuidance: "Trainer / facilitator guidance", remediation: "Remediation", extension: "Extension", previous: "Previous", continue: "Continue", learnerSpace: "Learner Space", backTo: "Back to"
  },
  fr: {
    stages: "étapes", fieldworks: "FieldWorks", moduleProgress: "PROGRESSION DU MODULE", stageOf: s => `Étape ${s} sur 7`, progressHint: "Continuez — vos preuves renforcent votre Skills Passport.", learn: "Apprendre", assessment: "Évaluation", practicalPassport: "Pratique & Passport", learningStage: s => `Étape d’apprentissage ${s} sur 5`, applyConnect: "Appliquer, relier et consolider", whyMatters: "Pourquoi c’est important", achieve: "Ce que vous allez accomplir", vocabulary: "Vocabulaire clé", materialsSafety: "Matériel & sécurité", objective: "Objectif", learning: "Apprentissage", tryIt: "Essayez", aiDigital: "Compétence IA & numérique", enterprise: "Lien avec l’entrepreneuriat", knowledgeApplication: "Vérification des connaissances et de l’application", assessmentLead: "Montrez ce que vous avez compris avant de passer aux preuves pratiques.", assessmentStructure: "Structure de l’évaluation", assessmentSummary: "8 QCM · 5 questions d’application · évaluation pratique ensuite", mcq: "Questions à choix multiple", applicationQuestions: "Questions d’application", practicalEvidence: "Preuves pratiques & Skills Passport", practicalLead: "Transformez vos apprentissages en preuves de compétence. Votre facilitateur les examine avant leur ajout au Skills Passport.", finalPractical: "Évaluation pratique finale", evidenceWorkspace: "Espace de preuves", prepareSubmission: "Préparez votre soumission", facilitatorReview: "Examen du facilitateur", evidenceIntro: "Utilisez cette liste pour préparer les preuves requises pour ce module. Le stockage sécurisé des preuves est en cours de connexion.", requiredEvidence: "Preuve requise", uploadArea: "Zone de dépôt des preuves", uploadPending: "Les contrôles de soumission s’activeront lorsque le stockage sécurisé sera connecté.", skillsPassport: "Skills Passport", competenciesEarned: "Compétences acquises", passportNote: "Les compétences doivent être vérifiées à partir de preuves démontrées, et non de la seule présence.", diyTasks: "Tâches pratiques de toutes les étapes", trainerGuidance: "Guide du formateur / facilitateur", remediation: "Remédiation", extension: "Approfondissement", previous: "Précédent", continue: "Continuer", learnerSpace: "Espace apprenant", backTo: "Retour à"
  },
  ha: {
    stages: "matakai", fieldworks: "FieldWorks", moduleProgress: "CIGABAN MODUL", stageOf: s => `Mataki ${s} cikin 7`, progressHint: "Ci gaba—shaidarka tana gina Skills Passport ɗinka.", learn: "Koyo", assessment: "Gwaji", practicalPassport: "Aiki & Passport", learningStage: s => `Matakin koyo ${s} cikin 5`, applyConnect: "Aiwatar, haɗa da ƙarfafa", whyMatters: "Dalilin muhimmancinsa", achieve: "Abin da za ka cimma", vocabulary: "Muhimman kalmomi", materialsSafety: "Kayan aiki & tsaro", objective: "Manufa", learning: "Koyo", tryIt: "Gwada", aiDigital: "AI & ƙwarewar dijital", enterprise: "Haɗin sana’a", knowledgeApplication: "Gwajin Ilimi da Aiwatarwa", assessmentLead: "Nuna abin da ka fahimta kafin shiga matakin shaidar aiki.", assessmentStructure: "Tsarin gwaji", assessmentSummary: "Tambayoyi zaɓi 8 · tambayoyin aiwatarwa 5 · gwajin aiki yana biyo baya", mcq: "Tambayoyin zaɓi", applicationQuestions: "Tambayoyin aiwatarwa", practicalEvidence: "Shaidar Aiki & Skills Passport", practicalLead: "Mayar da abin da ka koya zuwa shaidar ƙwarewa. Mai koyarwa zai duba shaidar kafin a saka ta cikin Skills Passport.", finalPractical: "Gwajin aiki na ƙarshe", evidenceWorkspace: "Wurin shaida", prepareSubmission: "Shirya abin da za ka miƙa", facilitatorReview: "Binciken mai koyarwa", evidenceIntro: "Yi amfani da wannan jerin don shirya shaidar da ake buƙata. Ana haɗa ajiyar shaida mai tsaro da wannan wurin.", requiredEvidence: "Shaidar da ake buƙata", uploadArea: "Wurin ɗora shaida", uploadPending: "Za a kunna miƙawa idan an haɗa ajiyar shaida mai tsaro.", skillsPassport: "Skills Passport", competenciesEarned: "Ƙwarewar da aka samu", passportNote: "A tabbatar da ƙwarewa daga shaidar aikin da aka nuna, ba halarta kaɗai ba.", diyTasks: "Ayyukan DIY daga duk matakan koyo", trainerGuidance: "Jagorar mai horarwa / mai koyarwa", remediation: "Gyaran koyo", extension: "Ƙarin ƙalubale", previous: "Baya", continue: "Ci gaba", learnerSpace: "Wurin Ɗalibi", backTo: "Koma"
  },
  yo: {
    stages: "ìpele", fieldworks: "FieldWorks", moduleProgress: "ÌTẸ̀SÍWÁJÚ MODULU", stageOf: s => `Ìpele ${s} nínú 7`, progressHint: "Máa tẹ̀síwájú—ẹ̀rí iṣẹ́ rẹ ń kọ Skills Passport rẹ.", learn: "Kọ́ ẹ̀kọ́", assessment: "Ìdánwò", practicalPassport: "Ìṣe & Passport", learningStage: s => `Ìpele ẹ̀kọ́ ${s} nínú 5`, applyConnect: "Lò ó, so pọ̀, kí o sì fìdí rẹ múlẹ̀", whyMatters: "Ìdí tí èyí fi ṣe pàtàkì", achieve: "Ohun tí iwọ yóò lè ṣe", vocabulary: "Àwọn ọ̀rọ̀ pàtàkì", materialsSafety: "Ohun èlò & ààbò", objective: "Ète", learning: "Ẹ̀kọ́", tryIt: "Gbìyànjú rẹ", aiDigital: "AI & ọgbọ́n díjítà", enterprise: "Ìbáṣepọ̀ pẹ̀lú iṣẹ́-òwò", knowledgeApplication: "Àyẹ̀wò Ìmọ̀ àti Lílò Rẹ̀", assessmentLead: "Fi ohun tí o lóye hàn kí o tó lọ sí ìpele ẹ̀rí iṣẹ́.", assessmentStructure: "Ìlànà ìdánwò", assessmentSummary: "Ìbéèrè yíyan 8 · ìbéèrè lílò 5 · ìdánwò iṣẹ́ yóò tẹ̀lé", mcq: "Àwọn ìbéèrè yíyan", applicationQuestions: "Àwọn ìbéèrè lílò", practicalEvidence: "Ẹ̀rí Ìṣe & Skills Passport", practicalLead: "Yí ohun tí o kọ́ padà sí ẹ̀rí ọgbọ́n. Olùkọ́ yóò ṣàyẹ̀wò ẹ̀rí náà kí ó tó wọ Skills Passport rẹ.", finalPractical: "Ìdánwò ìṣe ìkẹyìn", evidenceWorkspace: "Àyè ẹ̀rí", prepareSubmission: "Mú ohun tí o fẹ́ fi ránṣẹ́ sílẹ̀", facilitatorReview: "Àyẹ̀wò olùkọ́", evidenceIntro: "Lo àtòjọ yìí láti pèsè ẹ̀rí tí modulu yìí nílò. A ń so ibi ìpamọ́ ẹ̀rí aláàbò pọ̀ mọ́ àyè yìí.", requiredEvidence: "Ẹ̀rí tí a nílò", uploadArea: "Àyè fífi ẹ̀rí sílẹ̀", uploadPending: "Ìfiranṣẹ́ yóò ṣiṣẹ́ nígbà tí ibi ìpamọ́ ẹ̀rí aláàbò bá ti sopọ̀.", skillsPassport: "Skills Passport", competenciesEarned: "Àwọn ọgbọ́n tí a ti fìdí múlẹ̀", passportNote: "A gbọ́dọ̀ fìdí ọgbọ́n múlẹ̀ pẹ̀lú ẹ̀rí iṣẹ́, kì í ṣe wíwà ní kíláàsì nìkan.", diyTasks: "Àwọn iṣẹ́ DIY láti gbogbo ìpele ẹ̀kọ́", trainerGuidance: "Ìtọ́sọ́nà olùkọ́ / olùrànlọ́wọ́", remediation: "Àtúnkọ́ ẹ̀kọ́", extension: "Ìtẹ̀síwájú", previous: "Ṣáájú", continue: "Tẹ̀síwájú", learnerSpace: "Àyè Akẹ́kọ̀ọ́", backTo: "Padà sí"
  },
  ig: {
    stages: "usoro", fieldworks: "FieldWorks", moduleProgress: "ỌGANIRU MODUL", stageOf: s => `Usoro ${s} n’ime 7`, progressHint: "Gaa n’ihu—ihe akaebe gị na-ewulite Skills Passport gị.", learn: "Mụta", assessment: "Nnwale", practicalPassport: "Omume & Passport", learningStage: s => `Usoro mmụta ${s} n’ime 5`, applyConnect: "Tinye n’ọrụ, jikọta ma mee ka o sie ike", whyMatters: "Ihe mere nke a ji dị mkpa", achieve: "Ihe ị ga-enwe ike ime", vocabulary: "Okwu ndị dị mkpa", materialsSafety: "Ngwa & nchekwa", objective: "Ebumnuche", learning: "Mmụta", tryIt: "Nwaa ya", aiDigital: "AI & nka dijitalụ", enterprise: "Njikọ azụmahịa", knowledgeApplication: "Nnwale Ihe Ọmụma na Itinye N’ọrụ", assessmentLead: "Gosi ihe ị ghọtara tupu ị banye n’usoro akaebe omume.", assessmentStructure: "Usoro nnwale", assessmentSummary: "Ajụjụ nhọrọ 8 · ajụjụ itinye n’ọrụ 5 · nnwale omume ga-esochi", mcq: "Ajụjụ nhọrọ", applicationQuestions: "Ajụjụ itinye n’ọrụ", practicalEvidence: "Akaebe Omume & Skills Passport", practicalLead: "Gbanwee ihe ị mụtara ka ọ bụrụ akaebe nka. Onye nkuzi ga-enyocha ya tupu etinye ya na Skills Passport gị.", finalPractical: "Nnwale omume ikpeazụ", evidenceWorkspace: "Ebe akaebe", prepareSubmission: "Kwadebe ihe ị ga-eziga", facilitatorReview: "Nyocha onye nkuzi", evidenceIntro: "Jiri ndepụta a kwadebe akaebe modulu a chọrọ. A na-ejikọta nchekwa akaebe echekwara na ebe a.", requiredEvidence: "Akaebe achọrọ", uploadArea: "Ebe bulite akaebe", uploadPending: "Njikwa izipu ga-arụ ọrụ mgbe ejikọrọ nchekwa akaebe echekwara.", skillsPassport: "Skills Passport", competenciesEarned: "Nka enwetara", passportNote: "A ga-akwado nka site n’akaebe e gosipụtara, ọ bụghị naanị site n’ịbịa klas.", diyTasks: "Ọrụ DIY sitere n’usoro mmụta niile", trainerGuidance: "Nduzi onye nkuzi / onye na-enyere aka", remediation: "Mmezi mmụta", extension: "Mgbatị", previous: "Gara aga", continue: "Gaa n’ihu", learnerSpace: "Ebe Onye Mmụta", backTo: "Laghachi"
  },
  ar: {
    stages: "مراحل", fieldworks: "التطبيق الميداني", moduleProgress: "تقدّم الوحدة", stageOf: s => `المرحلة ${s} من 7`, progressHint: "واصل التقدّم—أدلتك تبني جواز مهاراتك.", learn: "تعلّم", assessment: "التقييم", practicalPassport: "التطبيق وجواز المهارات", learningStage: s => `مرحلة التعلّم ${s} من 5`, applyConnect: "طبّق واربط وثبّت التعلّم", whyMatters: "لماذا يهم هذا", achieve: "ما الذي ستتمكن من إنجازه", vocabulary: "المفردات الأساسية", materialsSafety: "المواد والسلامة", objective: "الهدف", learning: "التعلّم", tryIt: "جرّب", aiDigital: "الذكاء الاصطناعي والمهارات الرقمية", enterprise: "الارتباط بريادة الأعمال", knowledgeApplication: "فحص المعرفة والتطبيق", assessmentLead: "أظهر ما فهمته قبل الانتقال إلى مرحلة الأدلة العملية.", assessmentStructure: "هيكل التقييم", assessmentSummary: "8 أسئلة اختيار من متعدد · 5 أسئلة تطبيق · ثم تقييم عملي", mcq: "أسئلة الاختيار من متعدد", applicationQuestions: "أسئلة التطبيق", practicalEvidence: "الأدلة العملية وجواز المهارات", practicalLead: "حوّل ما تعلمته إلى دليل على الكفاءة. يراجع الميسّر الأدلة قبل إضافتها إلى جواز مهاراتك.", finalPractical: "التقييم العملي النهائي", evidenceWorkspace: "مساحة الأدلة", prepareSubmission: "جهّز تسليمك", facilitatorReview: "مراجعة الميسّر", evidenceIntro: "استخدم هذه القائمة لإعداد الأدلة المطلوبة لهذه الوحدة. يجري ربط التخزين الآمن للأدلة بهذه المساحة.", requiredEvidence: "دليل مطلوب", uploadArea: "منطقة رفع الأدلة", uploadPending: "ستتفعّل أدوات التسليم عند ربط التخزين الآمن للأدلة.", skillsPassport: "جواز المهارات", competenciesEarned: "الكفاءات المكتسبة", passportNote: "يجب التحقق من الكفاءات من خلال أدلة الأداء، وليس الحضور وحده.", diyTasks: "مهام عملية من جميع مراحل التعلّم", trainerGuidance: "إرشادات المدرّب / الميسّر", remediation: "الدعم العلاجي", extension: "التوسّع", previous: "السابق", continue: "متابعة", learnerSpace: "مساحة المتعلم", backTo: "العودة إلى"
  }
};