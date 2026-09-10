import type { AppLanguage } from "@/lib/i18n6";

export const localizedSharedSystems = {
  en: [
    ["LIFEWS Skills Passport","One lifelong record for courses, competencies, projects, badges, certificates, verified practice and transitions."],
    ["FieldWorks","Verified practical assignments, workplace learning, apprenticeships, field hours and supervisor evidence."],
    ["LIFEWS AgriHubs","Physical training, demonstration and community practice infrastructure."],
    ["Grow Systems","GrowMeal, GrowFlow, GrowFloat, GrowAqua, GrowFarm and GrowPower learning and production systems."],
    ["LIFEWS FEW Products","Deployable engineered food-energy-water systems used for technical learning and field deployment."],
    ["CHIPU","Monitoring, controls and system-intelligence layer supporting practical FEW-system training."],
  ],
  ha: [
    ["Fasfon Ƙwarewa na LIFEWS","Rikodi guda ɗaya na rayuwa don darussa, ƙwarewa, ayyuka, bajuna, takardun shaida, aikin da aka tabbatar da sauye-sauye."],
    ["FieldWorks","Ayyukan fili da aka tabbatar, koyon wurin aiki, koyon sana’a, sa’o’in fili da shaidar mai kula."],
    ["LIFEWS AgriHubs","Wuraren horo, nunin aiki da ayyukan al’umma."],
    ["Grow Systems","Tsarin koyo da samarwa na GrowMeal, GrowFlow, GrowFloat, GrowAqua, GrowFarm da GrowPower."],
    ["Kayayyakin LIFEWS FEW","Tsarin abinci-makamashi-ruwa na injiniya da ake turawa don koyon fasaha da amfani a fili."],
    ["CHIPU","Tsarin sa ido, sarrafawa da basirar tsarin da ke tallafa wa horon FEW na aiki."],
  ],
  ar: [
    ["جواز مهارات LIFEWS","سجل واحد مدى الحياة للدورات والكفاءات والمشروعات والشارات والشهادات والممارسة الموثقة والانتقالات."],
    ["FieldWorks","مهام عملية موثقة، وتعلّم في موقع العمل، وتدريب مهني، وساعات ميدانية، وأدلة المشرف."],
    ["LIFEWS AgriHubs","بنية تحتية للتدريب العملي والعروض والتطبيق المجتمعي."],
    ["Grow Systems","أنظمة GrowMeal وGrowFlow وGrowFloat وGrowAqua وGrowFarm وGrowPower للتعلّم والإنتاج."],
    ["منتجات LIFEWS FEW","أنظمة هندسية قابلة للنشر للغذاء والطاقة والمياه تُستخدم للتعلّم التقني والتطبيق الميداني."],
    ["CHIPU","طبقة للمراقبة والتحكم وذكاء الأنظمة تدعم التدريب العملي على أنظمة FEW."],
  ],
  yo: [
    ["Pásípò Ọgbọ́n LIFEWS","Igbasilẹ ìgbésí-ayé kan fún ẹ̀kọ́, agbára, iṣẹ́ àkànṣe, baaji, ìjẹ́rìí, adaṣe tí a fìdí múlẹ̀ àti ìyípadà."],
    ["FieldWorks","Iṣẹ́ ọwọ́ tí a fìdí múlẹ̀, ẹ̀kọ́ ibi iṣẹ́, apprenticeship, wákàtí pápá àti ẹ̀rí olùbojútó."],
    ["LIFEWS AgriHubs","Amáyédẹrùn fún ìdánilẹ́kọ̀ọ́, ìfihàn àti adaṣe àwùjọ."],
    ["Grow Systems","Eto ẹ̀kọ́ àti iṣelọpọ GrowMeal, GrowFlow, GrowFloat, GrowAqua, GrowFarm àti GrowPower."],
    ["Àwọn Ọjà LIFEWS FEW","Eto oúnjẹ-agbára-omi tí a ṣe nípa imọ̀-ẹ̀rọ fún ẹ̀kọ́ tekniki àti lílo ní pápá."],
    ["CHIPU","Fẹ́lẹ́ẹ̀sì ìmójútó, iṣakoso àti ọgbọ́n eto fún ìdánilẹ́kọ̀ọ́ FEW lórí iṣẹ́."],
  ],
  ig: [
    ["Paspọtụ Nkà LIFEWS","Otu ndekọ ndụ maka usoro ọmụmụ, ikike, ọrụ, baajị, asambodo, omume e nyochara na mgbanwe."],
    ["FieldWorks","Ọrụ aka e nyochara, mmụta n’ebe ọrụ, apprenticeship, awa ubi na ihe akaebe onye nlekọta."],
    ["LIFEWS AgriHubs","Akụrụngwa maka ọzụzụ, ngosi na omume obodo."],
    ["Grow Systems","Sistemụ mmụta na mmepụta GrowMeal, GrowFlow, GrowFloat, GrowAqua, GrowFarm na GrowPower."],
    ["Ngwaahịa LIFEWS FEW","Sistemụ nri-ike-mmiri e ji injinia rụọ maka mmụta teknụzụ na itinye n’ọrụ n’ubi."],
    ["CHIPU","Akụkụ nlekota, njikwa na ọgụgụ isi sistemụ na-akwado ọzụzụ FEW n’omume."],
  ],
  fr: [
    ["Passeport de compétences LIFEWS","Un dossier unique à vie pour les cours, compétences, projets, badges, certificats, pratiques vérifiées et transitions."],
    ["FieldWorks","Missions pratiques vérifiées, apprentissage en milieu de travail, apprentissages professionnels, heures de terrain et preuves du superviseur."],
    ["LIFEWS AgriHubs","Infrastructure physique de formation, de démonstration et de pratique communautaire."],
    ["Grow Systems","Systèmes d’apprentissage et de production GrowMeal, GrowFlow, GrowFloat, GrowAqua, GrowFarm et GrowPower."],
    ["Produits LIFEWS FEW","Systèmes techniques déployables alimentation-énergie-eau utilisés pour l’apprentissage technique et le déploiement sur le terrain."],
    ["CHIPU","Couche de suivi, de contrôle et d’intelligence des systèmes soutenant la formation pratique aux systèmes FEW."],
  ],
} as const;

export const localizedStandards = {
  en: {
    assessment: "Assessment combines knowledge checks, practical demonstration, evidence and competency ratings. Attendance alone does not establish competence.",
    evidence: "Each lesson requires a minimum evidence artifact such as a checklist, observation, measurement, project output, field log, photo, video or supervisor verification.",
    delivery: "Delivery must be inclusive and age-appropriate, with equal access to tools, leadership roles and technical practice for girls and boys, women and men.",
  },
  ha: {
    assessment: "Kimantawa tana haɗa gwajin ilimi, nuna aikin hannu, shaida da maki na ƙwarewa. Halarta kaɗai ba ta tabbatar da ƙwarewa.",
    evidence: "Kowane darasi yana buƙatar aƙalla shaida ɗaya kamar jerin dubawa, lura, aunawa, sakamakon aiki, kundin fili, hoto, bidiyo ko tabbatarwar mai kula.",
    delivery: "Dole ne koyarwa ta kasance mai haɗawa kuma ta dace da shekaru, tare da damar amfani da kayan aiki, jagoranci da aikin fasaha iri ɗaya ga mata da maza, ’yan mata da samari.",
  },
  ar: {
    assessment: "يجمع التقييم بين اختبارات المعرفة والعرض العملي والأدلة وتقديرات الكفاءة. الحضور وحده لا يثبت الكفاءة.",
    evidence: "تتطلب كل حصة دليلاً واحداً على الأقل مثل قائمة تحقق أو ملاحظة أو قياس أو ناتج مشروع أو سجل ميداني أو صورة أو فيديو أو تحقق من المشرف.",
    delivery: "يجب أن يكون التنفيذ شاملاً ومناسباً للعمر، مع إتاحة متساوية للأدوات وأدوار القيادة والممارسة التقنية للفتيات والفتيان والنساء والرجال.",
  },
  yo: {
    assessment: "Ìdánwò ń darapọ̀ ìdánwò ìmọ̀, ìfihàn iṣẹ́ ọwọ́, ẹ̀rí àti ìṣírò agbára. Wíwà ní kíláàsì nikan kò fi agbára hàn.",
    evidence: "Gbogbo ẹ̀kọ́ nilo o kere ju ẹ̀rí kan bí àtòjọ ìdánwò, àkíyèsí, ìwọ̀n, àbájáde iṣẹ́, ìwé iṣẹ́ pápá, fọ́tò, fídíò tàbí ìfọwọ́sí olùbojútó.",
    delivery: "Ìkọ́ni gbọ́dọ̀ kó gbogbo ènìyàn wọlé, kí ó bá ọjọ́-ori mu, kí ọmọbìnrin àti ọmọkùnrin, obìnrin àti ọkùnrin ní àǹfààní tó dọ́gba sí irinṣẹ́, ipa olórí àti adaṣe tekniki.",
  },
  ig: {
    assessment: "Nlele na-ejikọta ule ọmụma, ngosipụta ọrụ aka, ihe akaebe na ogo ikike. Ịbịa klaasị naanị anaghị egosi ikike.",
    evidence: "Ihe ọmụmụ ọ bụla chọrọ opekata mpe otu ihe akaebe dịka ndepụta nyocha, nlele, nha, nsonaazụ ọrụ, ndekọ ubi, foto, vidio ma ọ bụ nkwenye onye nlekọta.",
    delivery: "Ọzụzụ ga-agụnye mmadụ niile ma dabara afọ, na ohere hà nhata n’iji ngwá ọrụ, ọrụ ndu na omume teknụzụ maka ụmụ agbọghọ na ụmụ nwoke, ụmụ nwanyị na ụmụ nwoke.",
  },
  fr: {
    assessment: "L’évaluation combine des contrôles de connaissances, une démonstration pratique, des preuves et des niveaux de compétence. La présence seule ne démontre pas la compétence.",
    evidence: "Chaque leçon exige au moins une preuve, par exemple une liste de contrôle, une observation, une mesure, un résultat de projet, un journal de terrain, une photo, une vidéo ou une vérification du superviseur.",
    delivery: "La mise en œuvre doit être inclusive et adaptée à l’âge, avec un accès égal aux outils, aux rôles de leadership et à la pratique technique pour les filles et les garçons, les femmes et les hommes.",
  },
} as const;

export function getSharedSystems(language: AppLanguage) { return localizedSharedSystems[language]; }
export function getLocalizedStandards(language: AppLanguage) { return localizedStandards[language]; }
