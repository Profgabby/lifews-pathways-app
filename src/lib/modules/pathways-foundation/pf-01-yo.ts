import type { PF01Module } from "./pf-01";

export const pf01Yo: PF01Module = {
  code: "PF-01",
  title: "Káàbọ̀ sí Ẹ̀kọ́ àti Àǹfààní",
  level: "Pathways Foundation",
  age: "Ní ìwọ̀n ọdún 8–11; ìpín yẹ kí ó tẹ̀lé àyẹ̀wò akẹ́kọ̀ọ́, kì í ṣe ọjọ́-ori nìkan.",
  duration: "Ẹ̀kọ́ amọ̀nà mẹ́fà pẹ̀lú àkókò iṣẹ́ ìṣe àti ìdánwò",
  fieldworkHours: 2,
  bigQuestion: "Báwo ni ẹ̀kọ́ ṣe lè ràn mí lọ́wọ́ láti lóye ara mi, àwùjọ mi àti àwọn àǹfààní tó yí mi ká?",
  whyItMatters: "Ọ̀pọ̀ akẹ́kọ̀ọ́ tí ń wọ Pathways ti ní ìdádúró, àìní tàbí àìsí ẹ̀kọ́ ilé-ìwé. Modulu yìí ń kọ ìmọ̀lára pé ẹni jẹ́ apá kan, ìgboyà, ìlànà ẹ̀kọ́ aláàbò, àti ìbáṣepọ̀ tó wúlò láàárín ẹ̀kọ́, ìgbésí ayé ojoojúmọ́ àti àǹfààní ọjọ́ iwájú.",
  outcomes: [
    "Ṣàlàyé ohun tí LIFEWS Pathways jẹ́, kí o sì sọ ìdí ti ara rẹ fún ẹ̀kọ́.",
    "Mọ àwọn agbára rẹ, ohun tí o fẹ́ràn àti ibi tí o fẹ́ dàgbà sí.",
    "Mọ àwọn ènìyàn, ibi àti ìhùwàsí aláàbò nínú àyíká ẹ̀kọ́.",
    "Ṣètò ète ẹ̀kọ́ kékeré kan tí ó ṣeé ṣe, kí o sì mọ àwọn ìgbésẹ̀ sí i.",
    "Mọ pé ọgbọ́n tó wúlò lè dá iye sílẹ̀ fún ẹbí àti àwùjọ.",
    "Lo iṣẹ́ díjítà tàbí AI tó wà lábẹ́ amọ̀nà ní ojúṣe pẹ̀lú olùkọ́ àgbàlagbà."
  ],
  vocabulary: ["ẹ̀kọ́","àǹfààní","ète","agbára","ọgbọ́n","àwùjọ","yíyan","ìdánwò","ẹ̀rí","ojúṣe"],
  materials: ["ìwé iṣẹ́ tàbí workbook","pẹ́ńsù/crayon","káàdì àwòrán","maapu àwòrán àwùjọ","àpẹẹrẹ káàdì ète","tabulẹti/fóònù pínpín lábẹ́ ìṣàkóso olùkọ́ bí ó bá wà"],
  safety: [
    "Má ṣe fipá mú akẹ́kọ̀ọ́ láti sọ ìrírí tó lè jẹ́ ìfarapa ọkàn.",
    "Lo ọ̀rọ̀ rere tí kò fi ẹnikẹ́ni sílẹ̀ nípa ìtàn ẹ̀kọ́ ṣáájú.",
    "Olùkọ́ gbọdọ̀ ṣàbójútó ẹ̀rọ díjítà; akẹ́kọ̀ọ́ kò gbọdọ̀ fi ìkọ̀kọ̀ ara ẹni sí AI.",
    "Iṣẹ́ méjì-méjì àti ẹgbẹ́ gbọdọ̀ kó àwọn ọmọbìnrin, àwọn akẹ́kọ̀ọ́ aláàbò-pàtàkì àti àwọn tí ìmọ̀-kíkọ wọn ṣì ń dàgbà pọ̀."
  ],
  lessons: [
    {
      id:"PF-01-L1", title:"Mo Jẹ́ Apá Kan Níhìn-ín", objective:"Ṣàpèjúwe Pathways gẹ́gẹ́ bí ibi aláàbò láti kọ́ ẹ̀kọ́, ṣe ìdánwò àti mura sílẹ̀ fún àǹfààní ọjọ́ iwájú.",
      teaching:["Ẹ̀kọ́ lè ṣẹlẹ̀ ní kíláàsì, ọgbà, ilé, workshop àti àwùjọ.","Akẹ́kọ̀ọ́ kan lè bẹ̀rẹ̀ níbi tó yàtọ̀ sí omiì; ibi tí a ti bẹ̀rẹ̀ kò pinnu agbára ọjọ́ iwájú.","Pathways ń so ẹ̀kọ́ pọ̀ mọ́ ọgbọ́n ìṣe àti àǹfààní ìtẹ̀síwájú."],
      activity:"Ṣẹ̀dá àdéhùn ẹ̀kọ́ kíláàsì pẹ̀lú àwòrán tàbí ọ̀rọ̀ fún ìbọ̀wọ̀, fífetí sílẹ̀, kíkópa, ààbò àti ìtọju.",
      diy:"Ṣe káàdì ‘Mo jẹ́ akẹ́kọ̀ọ́’ pẹ̀lú àwòrán tàbí àmì ohun kan tí o fẹ́ kọ́.",
      aiLayer:"AI Layer 1 — Ìmọ̀: olùkọ́ fi àpẹẹrẹ irinṣẹ́ tó lè dáhùn ìbéèrè tàbí ṣètò ìmọ̀ hàn, ó sì ṣàlàyé pé AI jẹ́ irinṣẹ́, kì í ṣe ènìyàn tàbí alákóso òtítọ́.",
      enterprise:"Ìdásílẹ̀ iye bẹ̀rẹ̀ pẹ̀lú yíyan ìṣòro tó wúlò. Akẹ́kọ̀ọ́ sọ iṣẹ́ iranlọwọ kan tí àwọn ènìyàn ń ṣe ní àwùjọ rẹ.",
      quiz:[{question:"Ìṣe wo ni ń mú ibi ẹ̀kọ́ jẹ́ aláàbò?",options:["Fífetí sí ara wa pẹ̀lú ìbọ̀wọ̀","Rírín sí àṣìṣe","Fífipamọ́ ohun èlò","Dídènà àwọn míì láti sọ̀rọ̀"],answer:0},{question:"Níbo ni ẹ̀kọ́ lè ṣẹlẹ̀?",options:["Ní ilé-ìwé nìkan","Lórí ayélujára nìkan","Ní ọ̀pọ̀ ibi","Níbi iṣẹ́ nìkan"],answer:2},{question:"Kí ni o yẹ kí o ṣe tí o kò bá lóye?",options:["Ṣe bí ẹni pé o lóye","Béèrè fún ìrànlọ́wọ́","Kúrò","Daakọ láìronú"],answer:1}]
    },
    {
      id:"PF-01-L2", title:"Àwọn Agbára àti Ohun Tí Mo Fẹ́ràn", objective:"Mọ ó kéré tán agbára tàbí ìfẹ́ méjì, kí o sì ṣàlàyé bí ìdánwò ṣe lè mú wọn dàgbà.",
      teaching:["Agbára lè jẹ́ ohun tí a lè ṣe, bí a ṣe ń ràn míì lọ́wọ́, tàbí ìwà rere tí a ń fi hàn.","Ohun tí a fẹ́ràn ni ohun tí a gbádùn láti kọ́ tàbí ṣe.","Ọgbọ́n ń dàgbà nípasẹ̀ ìdánwò aláàbò, ìmòràn àti sùúrù."],
      activity:"Yípo agbára: yan káàdì àwòrán iṣẹ́ tí o fẹ́ràn tàbí tí o mọ̀ dáadáa, kí o ṣàlàyé yíyan kan fún alábàákẹ́gbẹ́.",
      diy:"Ṣẹ̀dá àpá mẹ́ta fún agbára rẹ: Mo lè…, Mo fẹ́ràn…, Mo fẹ́ mú … dára sí i.",
      aiLayer:"AI Layer 2 — Ìbáṣepọ̀ amọ̀nà: pẹ̀lú olùkọ́, fi ohun tí ènìyàn rí nípa agbára wé àtòjọ tí AI dá; jíròrò ìdí tí ènìyàn fi gbọdọ̀ pinnu ohun tó péye.",
      enterprise:"Àwọn agbára yàtọ̀ lè di ọgbọ́n tó wúlò. So ìwọ̀n pẹkipẹki, gbíngbin, atunṣe, ṣíṣàlàyé tàbí ṣíṣètò mọ́ àìní àwùjọ.",
      quiz:[{question:"Agbára ni…",options:["ohun tó wúlò tí o lè mú dàgbà","ìjìyà","ilé-ìwé","owó"],answer:0},{question:"Ọgbọ́n sábà ń dára sí i nípasẹ̀…",options:["ìdánwò","fífipamọ́","ìfojúsùn nìkan","fífì silẹ̀"],answer:0},{question:"Gbólóhùn wo ló fi ìmòye ìdàgbàsókè hàn?",options:["N kò lè kọ́","Mo lè dára sí i pẹ̀lú ìdánwò","Àwọn míì nìkan ló ní ọgbọ́n","Àṣìṣe parí ẹ̀kọ́"],answer:1}]
    },
    {
      id:"PF-01-L3", title:"Ẹ̀kọ́ Tó Yí Mi Ká", objective:"Mọ àwọn àǹfààní ẹ̀kọ́ ojoojúmọ́ nínú oúnjẹ, omi, agbára, ilé àti iṣẹ́ àwùjọ.",
      teaching:["Kíkà àmì, kíkà iye, wíwọ omi àti ṣíṣàkíyèsí ewéko jẹ́ ẹ̀kọ́.","Ètò oúnjẹ-agbára-omi jẹ́ apá ìgbésí ayé ojoojúmọ́.","Àkíyèsí pẹkipẹki ń ràn wa lọ́wọ́ láti béèrè ìbéèrè tó dára."],
      activity:"Rìn kiri fún ẹ̀kọ́: mọ ohun márùn-ún tó ní kíkà, ìṣírò, ìwọ̀n, àkíyèsí tàbí ìpinnu nínú.",
      diy:"Ya maapu ‘ẹ̀kọ́ tó yí mi ká’ pẹ̀lú ibi mẹ́rin ó kéré tán àti ọgbọ́n tí a ń lò ní ibi kọọkan.",
      aiLayer:"AI Layer 3 — Ìṣètò: pín káàdì àwòrán sí oúnjẹ, agbára, omi tàbí ju ẹ̀ka kan lọ; olùkọ́ lè fi ìṣètò AI hàn kí àwọn akẹ́kọ̀ọ́ ṣàyẹ̀wò rẹ.",
      enterprise:"Mọ àìní àwùjọ kan àti ọgbọ́n kan tó lè ràn lọ́wọ́, láì fi ọmọ sí iṣẹ́ títà.",
      quiz:[{question:"Wíwọ omi ń lo…",options:["ìṣírò","oorun","ìdákẹ́jẹ","oríire"],answer:0},{question:"Àkíyèsí túmọ̀ sí…",options:["fífi ojú sí ohun pẹkipẹki","gbàgbé","fipamọ́","tà"],answer:0},{question:"Èwo lè jẹ́ iṣẹ́ ẹ̀kọ́?",options:["Kíkà àmì ọjà","Ìdánwò nìkan","Iṣẹ́ ilé nìkan","Kò sí"],answer:0}]
    },
    {
      id:"PF-01-L4", title:"Àwọn Ète àti Ìgbésẹ̀ Kékeré", objective:"Ṣètò ète ẹ̀kọ́ kedere kan, kí o sì pín un sí àwọn ìgbésẹ̀ tó ṣeé ṣe.",
      teaching:["Ète ń ṣàlàyé ohun tí a fẹ́ ṣàṣeyọrí.","Ète tó dára lè pín sí iṣẹ́ kékeré.","Ẹ̀rí ń ràn wa lọ́wọ́ láti rí ìtẹ̀síwájú."],
      activity:"Yí ìfẹ́ gbogbogbò bí ‘Mo fẹ́ kà dára sí i’ padà sí ìgbésẹ̀ ìdánwò mẹ́ta tó ṣeé rí.",
      diy:"Ṣe akaba ète ọjọ́ méje pẹ̀lú iṣẹ́ kékeré kan, ẹni tó lè ràn ọ́ lọ́wọ́ àti ọ̀nà láti fi ìtẹ̀síwájú hàn.",
      aiLayer:"AI Layer 4 — Fífún AI ní ìtọ́sọ́nà pẹ̀lú ààlà: olùkọ́ fi hàn bí a ṣe lè béèrè fún ero ìdánwò mẹ́ta; akẹ́kọ̀ọ́ pinnu èwo tó jẹ́ aláàbò, tó ṣeé ṣe àti tó wúlò.",
      enterprise:"Ètò wúlò nínú ẹ̀kọ́ àti iṣẹ́-òwò: ète → ohun èlò → ìṣe → ṣàyẹ̀wò àbájáde.",
      quiz:[{question:"Ète tó wúlò yẹ kí ó ní…",options:["ìgbésẹ̀ kedere","kò sí ìṣe","kò sí ọ̀nà àyẹ̀wò","ìfẹ́ nìkan"],answer:0},{question:"Ẹ̀rí ìtẹ̀síwájú lè jẹ́…",options:["ojú-ewé ìdánwò tí a parí","àgbọ́sọ̀","kò sí nǹkan","iṣẹ́ ẹlòmíì"],answer:0},{question:"Tí ìgbésẹ̀ kan bá nira jù, o yẹ kí o…",options:["pín un sí ìgbésẹ̀ kékeré","jáwọ́ lẹ́sẹ̀kẹsẹ̀","fipamọ́ rẹ","da ẹlòmíì lẹ́bi"],answer:0}]
    },
    {
      id:"PF-01-L5", title:"Àwọn Yíyan Aláàbò àti Ojúṣe", objective:"Mọ yíyan aláàbò nínú ẹ̀kọ́, díjítà àti àwùjọ, kí o sì mọ ìgbà tí o yẹ kí o wá ìrànlọ́wọ́ àgbàlagbà tí o gbẹ́kẹ̀lé.",
      teaching:["Ààbò kó ààbò ara, ọkàn àti díjítà pọ̀.","A kò gbọ́dọ̀ pín ìkọ̀kọ̀ ara ẹni pẹ̀lú ẹni tí a kò mọ̀ tàbí AI.","Àgbàlagbà tí a gbẹ́kẹ̀lé lè ràn wa lọ́wọ́ tí ohun kan bá dàbí ewu tàbí ìdàrúdàpọ̀."],
      activity:"Pín káàdì ìṣẹ̀lẹ̀ sí ALÁÀBÒ, BÉÈRÈ LỌ́WỌ́ ÀGBÀLAGBÀ, àti KÒ ṢE ALÁÀBÒ, kí ẹ sì jíròrò ìdí.",
      diy:"Ṣẹ̀dá ‘ọwọ́ ìrànlọ́wọ́’ pẹ̀lú ènìyàn tàbí iṣẹ́ aláàbò kan lórí ìka kọọkan.",
      aiLayer:"AI Layer 5 — Ìyanjú ìṣòro pẹ̀lú ojúṣe: ṣàyẹ̀wò ìdáhùn AI àròsọ kan, kí o sì mọ ìsọfúnni tí a gbọdọ̀ fìdí rẹ múlẹ̀ lọ́dọ̀ olùkọ́ tàbí àgbàlagbà.",
      enterprise:"Iṣẹ́ pẹ̀lú ojúṣe túmọ̀ sí òtítọ́, ààbò, ìtọju ohun èlò àti ìbáṣepọ̀ ododo.",
      quiz:[{question:"Ṣé o yẹ kí o fún AI ní àdírẹ́sì ilé rẹ?",options:["Rárá","Ní gbogbo ìgbà","Fún eré nìkan","Nígbàkigbà tí a bá béèrè"],answer:0},{question:"Tí ohun kan bá dàbí ewu, ìgbésẹ̀ tó dára ni…",options:["sọ fún àgbàlagbà tí o gbẹ́kẹ̀lé","pa á mọ́","tẹ̀lé àjèjì","pín ìkọ̀kọ̀"],answer:0},{question:"Iṣẹ́ pẹ̀lú ojúṣe kó…",options:["òtítọ́ àti ààbò","bíbà ohun èlò jẹ́","jìbìtì","yíyọ ẹlòmíì kúrò"],answer:0}]
    },
    {
      id:"PF-01-L6", title:"Maapu Ẹ̀kọ́ àti Àǹfààní Mi", objective:"Darapọ̀ agbára, ète, àǹfààní àwùjọ àti àwọn olùrànlọ́wọ́ sínú maapu ẹ̀kọ́ tirẹ.",
      teaching:["Ọ̀nà ẹ̀kọ́ ń so ibi tí a wà báyìí pọ̀ mọ́ ìgbésẹ̀ tó lè tẹ̀lé.","Àwọn ènìyàn lè ní ọ̀nà tó yàtọ̀, wọ́n sì lè yí ète padà bí wọ́n ṣe ń kọ́.","Ìrànlọ́wọ́, ìdánwò àti ẹ̀rí ń ràn akẹ́kọ̀ọ́ lọ́wọ́ láti tẹ̀síwájú."],
      activity:"Ṣàyẹ̀wò modulu náà, kí o sì yan agbára kan, ète kan, ọgbọ́n ìṣe kan, olùrànlọ́wọ́ kan àti ìgbésẹ̀ tó tẹ̀lé.",
      diy:"Ṣẹ̀dá, kí o sì ṣàfihàn Maapu Ẹ̀kọ́-àti-Àǹfààní: ÈMI → AGBÁRA → ÈTE → ÌDÁNWÒ → OLÙRÀNLỌ́WỌ́ → ÌGBÉSẸ̀ TÓ TẸ̀LÉ.",
      aiLayer:"Ìṣọ̀kan: olùkọ́ lè lo AI láti daba àpẹẹrẹ ìgbésẹ̀ tó tẹ̀lé; akẹ́kọ̀ọ́ àti olùkọ́ yóò yan èyí tó bá ọjọ́-ori mu, tó jẹ́ aláàbò àti tó ṣeé ṣe ní agbègbè.",
      enterprise:"So agbára pọ̀ mọ́ dídá iye sílẹ̀: ríràn lọ́wọ́, ṣíṣe ohun, gbíngbin, títọ́jú, ṣíṣàlàyé tàbí ṣíṣètò—láì fi ọmọ sí iṣẹ́ ọjà.",
      quiz:[{question:"Ọ̀nà ẹ̀kọ́ jẹ́…",options:["ọ̀nà láti ibi tí a wà sí ìgbésẹ̀ tó tẹ̀lé","ìjìyà","iṣẹ́ kan ṣoṣo","àṣírí"],answer:0},{question:"Ta ni yẹ kí ó yan ète ẹ̀kọ́ rẹ pẹ̀lú rẹ?",options:["ìwọ pẹ̀lú ìrànlọ́wọ́ tó yẹ","àjèjì","AI nìkan","kò sí ẹni"],answer:0},{question:"Kí ló yẹ kí ó wà lórí maapu àǹfààní?",options:["agbára àti ìgbésẹ̀ tó tẹ̀lé","password","ìtọ́sọ́nà ewu","ìdánimọ̀ ẹlòmíì"],answer:0}]
    }
  ],
  finalAssessment: {
    mcq:[
      {question:"Kí ni ọ̀kan lára ète Pathways?",options:["Láti ṣe atilẹyin ẹ̀kọ́ àti ìtẹ̀síwájú","Láti dá ẹ̀kọ́ ìṣe dúró","Láti rọ́pò gbogbo ìpinnu ẹbí","Láti fi gbogbo akẹ́kọ̀ọ́ sínú ọ̀nà kan"],answer:0},
      {question:"Kí ló ń mú ọgbọ́n dára sí i?",options:["Ìdánwò àti ìmòràn","Fífì sílẹ̀","Fífipamọ́ àṣìṣe","Yíyẹra fún ìbéèrè"],answer:0},
      {question:"Ète ẹ̀kọ́ tó dára yẹ kí ó jẹ́…",options:["kedere àti ohun tí a lè ṣe","ohun tí a kò lè ṣàyẹ̀wò","ti ẹlòmíì","àṣírí fún olùrànlọ́wọ́"],answer:0},
      {question:"Èwo ni ìhùwàsí díjítà aláàbò?",options:["Dídáàbò bo ìkọ̀kọ̀ ara ẹni","Pípín password","Fífún àjèjì ní àdírẹ́sì","Gbígbà gbogbo ìdáhùn AI gbọ́"],answer:0},
      {question:"Kí ni ẹ̀rí?",options:["Ohun tó fi hàn ohun tí o ṣe tàbí kọ́","Ìfojúsùn","Àgbọ́sọ̀","Ìjìyà"],answer:0},
      {question:"Dídá iye sílẹ̀ lè túmọ̀ sí…",options:["yanju ìṣòro tó wúlò","ṣe ẹlòmíì ní ibi","sọ ohun èlò nù","fipamọ́ ọgbọ́n"],answer:0},
      {question:"Tí ìdáhùn AI bá dàbí ẹni pé kò tọ́, o yẹ kí o…",options:["ṣàyẹ̀wò pẹ̀lú ìsọfúnni tó gbẹ́kẹ̀lé tàbí olùkọ́","gba á gbọ́ láìṣàyẹ̀wò","pín un lẹ́sẹ̀kẹsẹ̀","fi ìkọ̀kọ̀ sínú rẹ"],answer:0},
      {question:"Èwo ló ṣàpèjúwe ọ̀nà ẹ̀kọ́ dáadáa?",options:["Àwọn ìgbésẹ̀ tó ṣeé ṣe sí ète kan","Ọ̀nà kan ṣoṣo fún gbogbo ènìyàn","Ìdánwò ilé-ìwé nìkan","Password"],answer:0}
    ],
    theory:["Ṣàpèjúwe ohun méjì tí o fẹ́ kọ́, kí o sì ṣàlàyé ìdí tí wọ́n fi ṣe pàtàkì sí ọ.","Sọ agbára méjì tí o ní àti ọ̀nà kan tí o lè fi ṣe ìdánwò ọkọọkan.","Ṣàlàyé òfin mẹ́ta tó ń mú ibi ẹ̀kọ́ jẹ́ aláàbò àti ibi ìbọ̀wọ̀.","Ṣàpèjúwe àìní àwùjọ kan àti ọgbọ́n kan tó lè ràn lọ́wọ́.","Ṣàlàyé ìdí tí akẹ́kọ̀ọ́ fi yẹ kí ó ṣàyẹ̀wò ìsọfúnni pàtàkì tí AI dá pẹ̀lú ènìyàn tàbí orísun tó gbẹ́kẹ̀lé."],
    practical:"Ṣàfihàn Maapu Ẹ̀kọ́-àti-Àǹfààní tó ní agbára tirẹ kan, ète ẹ̀kọ́ kan, ìgbésẹ̀ kékeré mẹ́ta ó kéré tán, ọgbọ́n ìṣe kan láti ṣàwárí, olùrànlọ́wọ́ kan tí o gbẹ́kẹ̀lé, ẹ̀rí kan àti àǹfààní tó yẹ fún ọjọ́-ori."
  },
  evidence:["Àpá agbára tí a parí","Akaba ète ọjọ́ méje","Ọwọ́ ìrànlọ́wọ́","Maapu ẹ̀kọ́ tó yí mi ká","Maapu Ẹ̀kọ́-àti-Àǹfààní ìkẹyìn","Àkọsílẹ̀ àkíyèsí ìṣe olùkọ́"],
  passport:["K: ṣàlàyé ẹ̀kọ́, ète àti àǹfààní","P: ṣẹ̀dá, kí o sì ṣàfihàn maapu ẹ̀kọ́ tó wúlò","D: fi lílo AI tó wà lábẹ́ amọ̀nà àti ìmúlò ìkọ̀kọ̀ hàn","S: mọ yíyan aláàbò àti ibi ìrànlọ́wọ́","E: mọ ọgbọ́n gẹ́gẹ́ bí ọ̀nà láti dá iye sílẹ̀ fún àwùjọ","L: ṣètò ète, sọ agbára rẹ, kí o sì kópa pẹ̀lú ìbọ̀wọ̀"],
  trainerNotes:["Lo ọ̀rọ̀ ẹnu, àwòrán àti àfihàn fún akẹ́kọ̀ọ́ tí ìmọ̀-kíkọ wọn ṣì ń dàgbà.","Má ṣe fi àwọn akẹ́kọ̀ọ́ wé ara wọn nípa ìtàn ilé-ìwé wọn.","Lo àpẹẹrẹ agbegbe àti iṣẹ́ tí a mọ̀, láì darí ọmọ sí iṣẹ́ ewu tàbí iṣẹ́ tí ọjọ́-ori kò yẹ fún.","Jẹ́ kí ọmọbìnrin àti ọmọkùnrin yí ipa olórí, ohun èlò àti àfihàn pa dà.","Iṣẹ́ AI jẹ́ àṣàyàn níbi tí ẹ̀rọ tàbí nẹ́tíwọ́ọ̀kì kò ti sí; kọ ọgbọ́n ìrònú tó wà lẹ́yìn rẹ láìlò ayélujára."],
  remediation:"Tun àwọn kókó ṣe pẹ̀lú àwòrán-tẹ̀lé, eré ipa àti ṣíṣètò ète ẹni-kọọkan. Dín iṣẹ́ kíkọ kù, ṣùgbọ́n má yí ibi-afẹ́ ọgbọ́n padà.",
  extension:"Akẹ́kọ̀ọ́ bá àgbàlagbà tí ó gbẹ́kẹ̀lé sọ̀rọ̀ nípa ọgbọ́n kan tí ẹni náà kọ́ ní kékeré, kí ó sì fi ọ̀nà ẹ̀kọ́ náà kun maapu àǹfààní àwùjọ.",
  imagePrompts:[]
};