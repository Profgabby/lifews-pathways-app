import { z } from "zod";

export const enrollmentSchema = z.object({
  preferredName: z.string().trim().min(2).max(100),
  dateOfBirth: z.string().optional().transform((v) => v || null),
  estimatedAgeYears: z.coerce.number().int().min(0).max(120).optional(),
  track: z.enum(["ALMAJIRI", "GIRLS", "GENERAL"]),
  band: z.enum(["DISCOVER", "EXPLORE", "BUILD", "TRANSITION", "ENTERPRISE"]),
  primaryLanguage: z.string().trim().max(80).optional(),
  guardianName: z.string().trim().max(120).optional(),
  guardianRelationship: z.string().trim().max(80).optional(),
  guardianPhone: z.string().trim().max(40).optional(),
  literacyLevel: z.coerce.number().int().min(0).max(5),
  numeracyLevel: z.coerce.number().int().min(0).max(5),
  digitalLevel: z.coerce.number().int().min(0).max(5),
  appliedSkillsLevel: z.coerce.number().int().min(0).max(5),
  strengths: z.string().trim().max(1500).optional(),
  priorityNeeds: z.string().trim().max(1500).optional(),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
