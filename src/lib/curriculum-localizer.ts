import type { CurriculumProgram } from "@/lib/curriculum";
import type { AppLanguage } from "@/lib/i18n6";
import { localizeCurriculumPrograms } from "@/lib/greenskills-i18n";
import { pathwaysLessonTranslations, type LessonLanguage } from "@/lib/curriculum-i18n-pathways";
import { kadaraLessonTranslations } from "@/lib/curriculum-i18n-kadara";
import { greenTechLessonTranslations } from "@/lib/curriculum-i18n-greentech";

const dictionaries = {
  pathways: pathwaysLessonTranslations,
  kadara: kadaraLessonTranslations,
  greentech: greenTechLessonTranslations,
} as const;

export function localizeCurriculum(programs: CurriculumProgram[], language: AppLanguage): CurriculumProgram[] {
  const localizedPrograms = localizeCurriculumPrograms(programs, language);
  if (language === "en") return localizedPrograms;
  const selectedLanguage = language as LessonLanguage;

  return localizedPrograms.map((program) => {
    const dictionary = dictionaries[program.arm][selectedLanguage];
    return {
      ...program,
      lessons: program.lessons.map((lesson) => {
        const translated = dictionary[lesson.code];
        if (!translated) return lesson;
        const [title, competency, diy] = translated;
        return { ...lesson, title, competency, diy };
      }),
    };
  });
}
