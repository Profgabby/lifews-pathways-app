export type AppLanguage = "en" | "ha" | "ar" | "yo" | "ig";

export const supportedLanguages: { code: AppLanguage; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ha", label: "Hausa", nativeLabel: "Hausa" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "yo", label: "Yoruba", nativeLabel: "Yorùbá" },
  { code: "ig", label: "Igbo", nativeLabel: "Igbo" },
];

export function normalizeLanguage(value?: string): AppLanguage {
  return supportedLanguages.some((language) => language.code === value)
    ? (value as AppLanguage)
    : "en";
}

export function localizeHref(href: string, language: AppLanguage) {
  if (href.startsWith("#")) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}lang=${language}`;
}

export const homeCopy = {
  en: {
    tagline: "From Learning to Opportunity",
    nav: ["Home", "Learner space", "Staff workspace", "Program overview"],
    developed: "A program developed by LIFEWS",
    title: "LIFEWS Pathways",
    pillars: "Learning • Skills • Agriculture • Enterprise • Transition",
    intro: "A practical learning and transition program for Almajiri learners, out-of-school children and girls, underserved adolescents and transitioning young adults.",
    learnerButton: "Enter learner space",
    staffButton: "Staff sign in",
    learnerKicker: "For learners",
    learnerTitle: "Learn, grow and build your Pathways Passport",
    learnerBody: "Use age-appropriate learning activities, GrowMeal tasks, food discovery, projects, challenges and progress milestones.",
    learnerLink: "Open learner space →",
    staffKicker: "For educators and program staff",
    staffTitle: "Manage learning, attendance and verified transitions",
    staffBody: "Authorized staff can enroll learners, record evidence, manage safeguarding, support transitions and review program performance.",
    staffLink: "Open staff workspace →",
    servesKicker: "Who the program serves",
    servesTitle: "Inclusive pathways into learning and opportunity",
    audiences: ["Almajiri learners", "Out-of-school children", "Out-of-school girls", "Underserved adolescents", "Transitioning young adults"],
    tracks: [
      ["Almajiri Learning & Livelihood Pathway", "Education, practical skills, agriculture and transition support."],
      ["Girls Learning & Enterprise Pathway", "Learning, safeguarding, practical skills and future opportunity."],
      ["General Out-of-School Pathway", "Flexible re-entry, competency building and positive transition planning."],
    ],
    footer: "Developed by LIFEWS.",
  },
  ha: {
    tagline: "Daga Koyo Zuwa Dama",
    nav: ["Gida", "Wurin ɗalibai", "Wurin ma’aikata", "Bayanin shiri"],
    developed: "Shirin da LIFEWS ta haɓaka",
    title: "LIFEWS Pathways",
    pillars: "Ilimi • Ƙwarewa • Noma • Sana’a • Sauyi",
    intro: "Shirin koyo da sauyi mai amfani ga almajirai, yaran da ba sa makaranta da ’yan mata, matasa marasa isassun dama da matasan da ke shiga sabon mataki.",
    learnerButton: "Shiga wurin ɗalibai",
    staffButton: "Shigar ma’aikata",
    learnerKicker: "Ga ɗalibai",
    learnerTitle: "Koya, girma kuma gina fasfon Pathways ɗinka",
    learnerBody: "Yi ayyukan koyo da suka dace da shekaru, ayyukan GrowMeal, binciken abinci, ayyuka, ƙalubale da matakan ci gaba.",
    learnerLink: "Buɗe wurin ɗalibai →",
    staffKicker: "Ga malamai da ma’aikatan shiri",
    staffTitle: "Gudanar da koyo, halarta da sauye-sauyen da aka tabbatar",
    staffBody: "Ma’aikatan da aka ba izini za su iya rajistar ɗalibai, rubuta shaida, kula da kariya, tallafa wa sauyi da duba aikin shiri.",
    staffLink: "Buɗe wurin ma’aikata →",
    servesKicker: "Wa shirin yake yi wa hidima",
    servesTitle: "Hanyoyi masu haɗawa zuwa ilimi da dama",
    audiences: ["Almajirai", "Yaran da ba sa makaranta", "’Yan matan da ba sa makaranta", "Matasan da ba su da isassun dama", "Matasan da ke shiga sabon mataki"],
    tracks: [
      ["Hanyar Koyo da Rayuwar Almajirai", "Ilimi, ƙwarewar aiki, noma da tallafin sauyi."],
      ["Hanyar Koyon ’Yan Mata da Sana’a", "Koyo, kariya, ƙwarewar aiki da damar gaba."],
      ["Hanyar Yaran da Ba sa Makaranta", "Komawa koyo cikin sassauci, gina ƙwarewa da shirya sauyi mai kyau."],
    ],
    footer: "LIFEWS ce ta haɓaka shirin.",
  },
  ar: {
    tagline: "من التعلّم إلى الفرص",
    nav: ["الرئيسية", "مساحة المتعلم", "مساحة الموظفين", "نظرة عامة على البرنامج"],
    developed: "برنامج طوّرته LIFEWS",
    title: "LIFEWS Pathways",
    pillars: "التعلّم • المهارات • الزراعة • ريادة الأعمال • الانتقال",
    intro: "برنامج عملي للتعلّم والانتقال يدعم متعلمي الألماجيري والأطفال والفتيات غير الملتحقين بالمدرسة والمراهقين المحرومين والشباب في مراحل الانتقال.",
    learnerButton: "دخول مساحة المتعلم",
    staffButton: "دخول الموظفين",
    learnerKicker: "للمتعلمين",
    learnerTitle: "تعلّم، وتطوّر، وابنِ جواز Pathways الخاص بك",
    learnerBody: "استخدم أنشطة تعليمية مناسبة للعمر، ومهام GrowMeal، واكتشاف الغذاء، والمشروعات، والتحديات، ومحطات التقدم.",
    learnerLink: "فتح مساحة المتعلم ←",
    staffKicker: "للمعلمين وموظفي البرنامج",
    staffTitle: "إدارة التعلّم والحضور والانتقالات الموثقة",
    staffBody: "يمكن للموظفين المخولين تسجيل المتعلمين وتوثيق الأدلة وإدارة الحماية ودعم الانتقالات ومراجعة أداء البرنامج.",
    staffLink: "فتح مساحة الموظفين ←",
    servesKicker: "الفئات التي يخدمها البرنامج",
    servesTitle: "مسارات شاملة نحو التعلّم والفرص",
    audiences: ["متعلمو الألماجيري", "الأطفال غير الملتحقين بالمدرسة", "الفتيات غير الملتحقات بالمدرسة", "المراهقون المحرومون", "الشباب في مراحل الانتقال"],
    tracks: [
      ["مسار الألماجيري للتعلّم وسبل العيش", "التعليم والمهارات العملية والزراعة ودعم الانتقال."],
      ["مسار الفتيات للتعلّم وريادة الأعمال", "التعلّم والحماية والمهارات العملية وفرص المستقبل."],
      ["مسار عام لغير الملتحقين بالمدرسة", "عودة مرنة للتعلّم وبناء الكفاءات والتخطيط لانتقال إيجابي."],
    ],
    footer: "طوّرته LIFEWS.",
  },
  yo: {
    tagline: "Láti Ẹ̀kọ́ Sí Àǹfààní",
    nav: ["Ilé", "Àyè akẹ́kọ̀ọ́", "Àyè òṣìṣẹ́", "Àkótán ètò"],
    developed: "Ètò tí LIFEWS dá sílẹ̀",
    title: "LIFEWS Pathways",
    pillars: "Ẹ̀kọ́ • Ọgbọ́n • Ogbin • Iṣòwò • Ìyípadà",
    intro: "Ètò ẹ̀kọ́ àti ìyípadà tó wúlò fún àwọn akẹ́kọ̀ọ́ Almajiri, àwọn ọmọ àti ọmọbìnrin tí kò sí ní ilé-ẹ̀kọ́, àwọn ọdọ tí kò ní àǹfààní tó péye àti àwọn ọdọ tó ń wọ ìpele tuntun.",
    learnerButton: "Wọ àyè akẹ́kọ̀ọ́",
    staffButton: "Wọlé gẹ́gẹ́ bí òṣìṣẹ́",
    learnerKicker: "Fún àwọn akẹ́kọ̀ọ́",
    learnerTitle: "Kọ́ ẹ̀kọ́, dàgbà, kí o sì kọ Pathways Passport rẹ",
    learnerBody: "Lo àwọn iṣẹ́ ẹ̀kọ́ tó bá ọjọ́-ori mu, iṣẹ́ GrowMeal, ìwádìí oúnjẹ, iṣẹ́ àkànṣe, ìpèníjà àti àmì ìlọsíwájú.",
    learnerLink: "Ṣí àyè akẹ́kọ̀ọ́ →",
    staffKicker: "Fún olùkọ́ àti òṣìṣẹ́ ètò",
    staffTitle: "Ṣàkóso ẹ̀kọ́, wíwà ní kíláàsì àti ìyípadà tí a fìdí múlẹ̀",
    staffBody: "Àwọn òṣìṣẹ́ tó ní àṣẹ lè forúkọsílẹ̀ akẹ́kọ̀ọ́, kọ ẹ̀rí sílẹ̀, ṣàkóso ààbò, ṣe atilẹyin ìyípadà àti ṣàyẹ̀wò iṣẹ́ ètò.",
    staffLink: "Ṣí àyè òṣìṣẹ́ →",
    servesKicker: "Àwọn tí ètò náà ń ṣiṣẹ́ fún",
    servesTitle: "Àwọn ọ̀nà tó ṣí sí gbogbo ènìyàn sí ẹ̀kọ́ àti àǹfààní",
    audiences: ["Àwọn akẹ́kọ̀ọ́ Almajiri", "Àwọn ọmọ tí kò sí ní ilé-ẹ̀kọ́", "Àwọn ọmọbìnrin tí kò sí ní ilé-ẹ̀kọ́", "Àwọn ọdọ tí kò ní àǹfààní tó péye", "Àwọn ọdọ tó ń wọ ìpele tuntun"],
    tracks: [
      ["Ọ̀nà Ẹ̀kọ́ àti Ìgbésí-ayé Almajiri", "Ẹ̀kọ́, ọgbọ́n iṣẹ́, ogbin àti atilẹyin ìyípadà."],
      ["Ọ̀nà Ẹ̀kọ́ àti Iṣòwò Ọmọbìnrin", "Ẹ̀kọ́, ààbò, ọgbọ́n iṣẹ́ àti àǹfààní ọjọ́ iwájú."],
      ["Ọ̀nà Gbogbogbò fún Àwọn Tí Kò Sí Ní Ilé-ẹ̀kọ́", "Ìpadà sí ẹ̀kọ́ ní irọrun, ìdàgbàsókè ọgbọ́n àti ètò ìyípadà rere."],
    ],
    footer: "LIFEWS ló dá a sílẹ̀.",
  },
  ig: {
    tagline: "Site n’Ịmụ Ihe Ruo n’Ohere",
    nav: ["Ụlọ", "Ebe onye mmụta", "Ebe ndị ọrụ", "Nchịkọta mmemme"],
    developed: "Mmemme LIFEWS mepụtara",
    title: "LIFEWS Pathways",
    pillars: "Ịmụ ihe • Nkà • Ọrụ ugbo • Azụmahịa • Mgbanwe",
    intro: "Mmemme bara uru maka ịmụ ihe na mgbanwe maka ndị mmụta Almajiri, ụmụaka na ụmụ agbọghọ na-anọghị n'ụlọ akwụkwọ, ndị ntorobịa na-enweghị ohere zuru oke na ndị na-eto eto na-abanye n'ọkwa ọhụrụ.",
    learnerButton: "Banye ebe onye mmụta",
    staffButton: "Nbanye ndị ọrụ",
    learnerKicker: "Maka ndị mmụta",
    learnerTitle: "Mụta, too ma wuo Pathways Passport gị",
    learnerBody: "Jiri ọrụ mmụta dabara afọ, ọrụ GrowMeal, nchọpụta nri, ọrụ ngo, ihe ịma aka na akara ọganihu.",
    learnerLink: "Mepee ebe onye mmụta →",
    staffKicker: "Maka ndị nkuzi na ndị ọrụ mmemme",
    staffTitle: "Jikwaa mmụta, ọbịbịa na mgbanwe e kwadoro",
    staffBody: "Ndị ọrụ nwere ikike nwere ike idebanye ndị mmụta, dekọọ ihe akaebe, jikwaa nchekwa, kwado mgbanwe ma nyochaa arụmọrụ mmemme.",
    staffLink: "Mepee ebe ndị ọrụ →",
    servesKicker: "Ndị mmemme a na-ejere ozi",
    servesTitle: "Ụzọ gụnyere mmadụ niile ruo n'ịmụ ihe na ohere",
    audiences: ["Ndị mmụta Almajiri", "Ụmụaka na-anọghị n'ụlọ akwụkwọ", "Ụmụ agbọghọ na-anọghị n'ụlọ akwụkwọ", "Ndị ntorobịa na-enweghị ohere zuru oke", "Ndị na-eto eto na-abanye n'ọkwa ọhụrụ"],
    tracks: [
      ["Ụzọ Mmụta na Ndụ Almajiri", "Mmụta, nkà bara uru, ọrụ ugbo na nkwado mgbanwe."],
      ["Ụzọ Mmụta na Azụmahịa Ụmụ Agbọghọ", "Mmụta, nchekwa, nkà bara uru na ohere ọdịnihu."],
      ["Ụzọ Izugbe Maka Ndị Na-anọghị n'Ụlọ Akwụkwọ", "Ịlaghachi n'ịmụ ihe n'ụzọ dị mfe, iwulite nkà na ịhazi mgbanwe dị mma."],
    ],
    footer: "LIFEWS mepụtara ya.",
  },
} as const;

export const learnerCopy = {
  en: {
    journey: "Your learning journey", title: "Learn. Grow. Build. Move forward.", intro: "Use this space for learning activities, practical missions, projects and your Pathways Passport.", privacy: "Personal progress will use a secure learner access code. No public page exposes a learner's private record.", back: "Back to home", explore: "Explore →", younger: "For younger learners", assistedTitle: "Teacher-assisted and group learning are supported.", assistedBody: "Educators can guide activities on a shared device, while older learners can progressively use their own secure learner access.", educator: "Educator sign in", areas: [["My Learning", "Literacy, numeracy, science, digital and life-skills activities."], ["GrowMeal", "Garden missions, observation tasks and practical food-production learning."], ["Food Discovery", "Ingredients, hygiene, labels and food-system activities."], ["My Passport", "Projects, badges, competencies and progress milestones."], ["Challenges", "Short missions that turn learning into practical problem solving."], ["My Future", "Explore education, training, agriculture, apprenticeships and careers."]],
  },
  ha: {
    journey: "Tafiyar koyonka", title: "Koya. Girma. Gina. Ci gaba.", intro: "Yi amfani da wannan wuri don ayyukan koyo, aikace-aikace, ayyukan ƙirƙira da Pathways Passport ɗinka.", privacy: "Za a yi amfani da lambar shiga mai tsaro don ci gaban mutum. Babu shafin jama'a da zai nuna bayanan sirrin ɗalibi.", back: "Koma gida", explore: "Bincika →", younger: "Ga ƙananan ɗalibai", assistedTitle: "Ana tallafa wa koyo tare da malami da koyo na rukuni.", assistedBody: "Malamai za su iya jagorantar ayyuka a na'ura ɗaya, yayin da manyan ɗalibai ke fara amfani da shigar kansu mai tsaro.", educator: "Shigar malami", areas: [["Koyona", "Karatu, lissafi, kimiyya, dijital da dabarun rayuwa."], ["GrowMeal", "Ayyukan lambu, lura da koyon samar da abinci."], ["Binciken Abinci", "Sinadarai, tsafta, lakabi da tsarin abinci."], ["Fasfona", "Ayyuka, lambobin yabo, ƙwarewa da matakan ci gaba."], ["Ƙalubale", "Gajerun ayyuka da ke juya koyo zuwa warware matsala."], ["Makomata", "Bincika ilimi, horo, noma, koyon sana'a da ayyukan yi."]],
  },
  ar: {
    journey: "رحلتك التعليمية", title: "تعلّم. تطوّر. ابنِ. تقدّم.", intro: "استخدم هذه المساحة لأنشطة التعلّم والمهام العملية والمشروعات وجواز Pathways الخاص بك.", privacy: "سيُستخدم رمز دخول آمن لمتابعة التقدم الشخصي. لا تعرض أي صفحة عامة السجل الخاص للمتعلم.", back: "العودة للرئيسية", explore: "استكشف ←", younger: "للمتعلمين الأصغر سنًا", assistedTitle: "يتوفر التعلم بمساعدة المعلم والتعلم الجماعي.", assistedBody: "يمكن للمعلمين توجيه الأنشطة على جهاز مشترك، بينما ينتقل المتعلمون الأكبر سنًا تدريجيًا إلى دخولهم الآمن الخاص.", educator: "دخول المعلم", areas: [["تعلّمي", "أنشطة القراءة والحساب والعلوم والمهارات الرقمية والحياتية."], ["GrowMeal", "مهام الحديقة والملاحظة والتعلّم العملي لإنتاج الغذاء."], ["اكتشاف الغذاء", "المكونات والنظافة والملصقات وأنشطة نظم الغذاء."], ["جوازي", "المشروعات والشارات والكفاءات ومحطات التقدم."], ["التحديات", "مهام قصيرة تحول التعلّم إلى حل عملي للمشكلات."], ["مستقبلي", "استكشف التعليم والتدريب والزراعة والتلمذة والمهن."]],
  },
  yo: {
    journey: "Ìrìnàjò ẹ̀kọ́ rẹ", title: "Kọ́ ẹ̀kọ́. Dàgbà. Kọ́. Tẹ̀síwájú.", intro: "Lo àyè yìí fún iṣẹ́ ẹ̀kọ́, iṣẹ́ ọwọ́, iṣẹ́ àkànṣe àti Pathways Passport rẹ.", privacy: "A ó lo kóòdù ìwọlé tó ní ààbò fún ìlọsíwájú ara ẹni. Kò sí ojú-ewé gbogbogbò tí yóò fi àkọsílẹ̀ ikọ̀kọ̀ akẹ́kọ̀ọ́ hàn.", back: "Padà sí ilé", explore: "Ṣàwárí →", younger: "Fún àwọn akẹ́kọ̀ọ́ kékeré", assistedTitle: "A ń ṣe atilẹyin ẹ̀kọ́ pẹ̀lú olùkọ́ àti ẹ̀kọ́ ẹgbẹ́.", assistedBody: "Olùkọ́ lè darí iṣẹ́ lórí ẹ̀rọ tí gbogbo ènìyàn ń lò, nígbà tí àwọn akẹ́kọ̀ọ́ àgbà bá ń lọ sí ìwọlé tó ní ààbò tiwọn.", educator: "Wọlé gẹ́gẹ́ bí olùkọ́", areas: [["Ẹ̀kọ́ Mi", "Ìkàwé, ìṣirò, sáyẹ́nsì, díjítà àti ọgbọ́n ìgbésí-ayé."], ["GrowMeal", "Iṣẹ́ ọgbà, àkíyèsí àti ẹ̀kọ́ gbígbìn oúnjẹ."], ["Ìwádìí Oúnjẹ", "Erojà, ìmọ́tótó, àami àti iṣẹ́ ètò oúnjẹ."], ["Passport Mi", "Iṣẹ́ àkànṣe, àmì ẹ̀yẹ, ọgbọ́n àti ìlọsíwájú."], ["Ìpèníjà", "Iṣẹ́ kukuru tó yí ẹ̀kọ́ padà sí ìyanjú iṣòro."], ["Ọjọ́ Iwájú Mi", "Ṣàwárí ẹ̀kọ́, ìdánilẹ́kọ̀ọ́, ogbin, iṣẹ́ akẹ́kọ̀ọ́ àti iṣẹ́."]],
  },
  ig: {
    journey: "Njem mmụta gị", title: "Mụta. Too. Wuo. Gaa n'ihu.", intro: "Jiri ebe a maka ọrụ mmụta, ọrụ aka, ọrụ ngo na Pathways Passport gị.", privacy: "A ga-eji koodu nnweta echekwara maka ọganihu onwe onye. Enweghị ibe ọha na-egosi ndekọ nzuzo onye mmụta.", back: "Laghachi ụlọ", explore: "Nyochaa →", younger: "Maka ndị mmụta nta", assistedTitle: "A na-akwado mmụta enyemaka onye nkuzi na nke otu.", assistedBody: "Ndị nkuzi nwere ike iduzi ọrụ na ngwaọrụ a na-ekekọrịta, ebe ndị mmụta toro eto na-amalite iji nnweta echekwara nke ha.", educator: "Nbanye onye nkuzi", areas: [["Mmụta M", "Ịgụ akwụkwọ, mgbakọ, sayensị, dijitalụ na nkà ndụ."], ["GrowMeal", "Ọrụ ubi, nlele na mmụta mmepụta nri."], ["Nchọpụta Nri", "Ngwakọta, ịdị ọcha, akara na ọrụ usoro nri."], ["Passport M", "Ọrụ ngo, baajị, ikike na akara ọganihu."], ["Ihe Ịma Aka", "Ọrụ mkpirikpi na-agbanwe mmụta ka ọ bụrụ idozi nsogbu."], ["Ọdịnihu M", "Nyochaa agụmakwụkwọ, ọzụzụ, ọrụ ugbo, mmụta ọrụ na ọrụ."]],
  },
} as const;
