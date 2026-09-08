# LIFEWS Pathways™ Application Architecture

## 1. Product goal

Build a secure, mobile-first, low-connectivity-capable digital operating system for LIFEWS Pathways™ that supports learning, safeguarding, practical skills, evidence of competency, and verified transitions without turning child-focused programming into a commercial sales channel.

## 2. Architectural principles

1. **Safeguarding by design.** Safeguarding records are isolated from ordinary learner records and available only to authorized safeguarding roles.
2. **Least privilege.** Users see only the sites, functions, and sensitive records required by their role.
3. **Child/commercial firewall.** Commercial referrals require adult eligibility and voluntary interest. Child accounts cannot enter commercial pathways.
4. **Offline tolerance.** Attendance, assessments, and field activities should support local caching and later synchronization.
5. **Evidence before metrics.** Badges, competencies, and transitions are supported by recorded evidence rather than attendance alone.
6. **Data minimization.** Routine dashboards use participant IDs and avoid unnecessary sensitive personal data.
7. **Modular growth.** Curriculum, GrowMeal™, Food Discovery Lab™, SkillsBridge™, transitions, and enterprise pathways are separate modules sharing one identity and permissions layer.

## 3. Initial technology stack

- **Frontend:** Next.js + React + TypeScript
- **Database/Auth:** Supabase/PostgreSQL
- **Authorization:** Supabase Auth + Row Level Security
- **Validation:** Zod
- **UI:** custom LIFEWS design system; progressively componentized
- **Hosting target:** Vercel or compatible Node hosting for web; Supabase for managed database/auth
- **Offline strategy:** Progressive Web App service worker + IndexedDB/local queue in a later foundation milestone

## 4. Core bounded modules

### Identity & Access
Users, profiles, roles, site assignments, authentication, permissions, account status.

### Sites & Community Operations
Learning hubs, communities, LGA/state metadata, staff assignments, site readiness.

### Enrollment & Placement
Participant enrollment, guardian/authorized contact data, consent/assent metadata, baseline assessments, developmental-band placement.

### Learning
Age-banded curriculum, module completion, assessment evidence, literacy/numeracy progression.

### GrowMeal™
Garden learning stations, practical activities, observations, measurement, skill evidence.

### Food Discovery Lab™
Ingredient exploration, food-system learning, label literacy, hygiene and supervised investigations.

### SkillsBridge™
Vocational exploration and supervised competency demonstrations for older adolescents and adults.

### Pathways Passport™
Badges, projects, learning achievements, practical competencies and next-pathway goals.

### Attendance
Sessions, learner attendance, late/absence status, follow-up flags and participation analytics.

### Safeguarding
Restricted incidents, immediate actions, referrals, case status and audit trail. This module must not share ordinary list views with education modules.

### Transition
Next-pathway plans, referral mapping, verified destinations and 3/6/12-month retention.

### Adult Enterprise
AgriRoots™, AgriNext™, AgriAble™, ZARIKS™ and other approved adult opportunities. Eligibility requires verified age 18+ or equivalent lawful adult status and explicit voluntary interest.

### Monitoring & Evaluation
KPI definitions, site scorecards, learning progression, competency completion, verified transition rate and quality compliance.

## 5. Role model

- SUPER_ADMIN
- PROGRAM_ADMIN
- SITE_COORDINATOR
- EDUCATOR
- GROWMEAL_FACILITATOR
- SAFEGUARDING_LEAD
- TRANSITION_OFFICER
- M_AND_E_OFFICER
- COMMUNITY_LIAISON
- PARTNER_VIEWER
- ADULT_PARTICIPANT

Safeguarding access must not be inferred from general administrative access alone; production policy will explicitly restrict safeguarding case access.

## 6. Developmental bands

- Discover™ — approximately ages 6–9
- Explore™ — approximately ages 10–12
- Build™ — approximately ages 13–15
- Transition™ — approximately ages 16–17
- Enterprise™ — 18+

Placement uses **age + competency + need + context**, not age alone.

## 7. Initial data domains

The initial migration includes sites, profiles, participants, guardian contacts, baseline assessments, attendance, curriculum modules, competency evidence, badges, transition plans, verified transitions, adult-enterprise referrals and safeguarding incidents.

## 8. Security roadmap

Before production data is accepted:

- implement explicit RLS policies;
- configure authentication and MFA for privileged roles;
- separate safeguarding routes and audit access;
- encrypt all traffic and use managed database encryption at rest;
- define backup and recovery policy;
- define data retention/deletion rules;
- perform dependency and vulnerability scanning;
- perform role/permission tests;
- review Nigerian data-protection and child-protection requirements with qualified local counsel/safeguarding professionals.

## 9. Offline roadmap

The first offline-capable operations should be:

1. attendance capture;
2. baseline/learning assessments;
3. GrowMeal™ observations;
4. competency evidence notes;
5. transition follow-up forms.

Each queued change will carry a client-generated ID, timestamp and synchronization state so duplicate submissions can be handled safely.

## 10. Build sequence

1. Foundation shell and schema
2. Authentication and RLS
3. Sites, staff and role administration
4. Enrollment and baseline assessment
5. Attendance
6. Curriculum and assessments
7. GrowMeal™ and Food Discovery
8. Passport and badges
9. Safeguarding module
10. Transition planning and verification
11. Adult pathways
12. KPI dashboard
13. Offline/PWA capability
14. Pilot hardening, accessibility and localization
