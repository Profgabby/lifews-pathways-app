import { getModuleMedia } from "@/lib/module-media";

type ModuleContextMediaProps = {
  code: string;
  priority?: boolean;
};

/**
 * Instructional media for curriculum pages. The central resolver decides which
 * modules benefit from photography, so assessment-heavy pages remain visually
 * quiet and the same approved LIFEWS image can support related competencies.
 */
export function ModuleContextMedia({ code, priority = false }: ModuleContextMediaProps) {
  const media = getModuleMedia(code);
  if (!media) return null;

  return (
    <figure className={`module-context-media module-context-media-${media.role}`}>
      <img
        src={media.asset}
        alt={media.alt}
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </figure>
  );
}
