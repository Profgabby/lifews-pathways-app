-- Seed starter LIFEWS Pathways™ activities for pilot development.

insert into public.learning_activities (module_id,code,title,activity_type,objective,materials,instructions,safety_notes,assessment_method)
select id,'GM-SEED-01','Seed Investigation','GROWMEAL','Compare seeds by size, shape and texture and record observations.',
'["Assorted safe seeds","Tray","Ruler","Observation sheet"]'::jsonb,
'["Observe each seed","Group similar seeds","Count each group","Measure selected seeds","Record one comparison"]'::jsonb,
'Use only non-toxic, non-treated seed samples. Do not place seeds in the mouth.',
'Observation checklist and learner record'
from public.curriculum_modules where code='PATH-AGR-001'
on conflict (code) do nothing;

insert into public.learning_activities (module_id,code,title,activity_type,objective,materials,instructions,safety_notes,assessment_method)
select id,'GM-SOIL-01','Compare Garden Soils','GROWMEAL','Observe differences in texture, color and water behavior among soil samples.',
'["Soil samples","Clear containers","Water","Spoons","Observation sheet"]'::jsonb,
'["Observe dry samples","Describe color and texture","Add a measured amount of water","Compare drainage","Record findings"]'::jsonb,
'Wash hands after handling soil. Do not use contaminated soil.',
'Learner comparison record'
from public.curriculum_modules where code='PATH-SCI-001'
on conflict (code) do nothing;

insert into public.learning_activities (module_id,code,title,activity_type,objective,materials,instructions,safety_notes,assessment_method)
select id,'FD-ING-01','Meet the Ingredient','FOOD_DISCOVERY','Observe a food ingredient and identify its source, plant part, appearance and common uses.',
'["Whole ingredient","Picture card","Tray","Magnifier","Worksheet"]'::jsonb,
'["Name or identify the ingredient","Observe color, shape and texture","Identify the plant part where appropriate","Discuss where it comes from","Record one new fact"]'::jsonb,
'No compulsory tasting. Complete allergy and hygiene checks before any approved tasting activity.',
'Ingredient observation worksheet'
from public.curriculum_modules where code='PATH-FOOD-001'
on conflict (code) do nothing;

insert into public.learning_activities (module_id,code,title,activity_type,objective,materials,instructions,safety_notes,assessment_method)
select id,'FD-LABEL-01','Read the Label','FOOD_DISCOVERY','Identify basic information shown on a food package without treating branding as a nutrition claim.',
'["Clean empty food packages","Label worksheet","Pens"]'::jsonb,
'["Find the product name","Find ingredient information","Find net quantity","Identify storage or date information if present","Compare two packages"]'::jsonb,
'Do not use expired or contaminated packages for tasting. This is a literacy activity, not a product endorsement.',
'Label-literacy checklist'
from public.curriculum_modules where code='PATH-FOOD-001'
on conflict (code) do nothing;

insert into public.knowledge_checks (module_id,title,questions,passing_score)
select id,'Agriculture Foundations Check',
'[{"question":"Which three things does a seed commonly need to begin growing?","type":"short_answer"},{"question":"Why do we record garden observations?","type":"short_answer"}]'::jsonb,60
from public.curriculum_modules where code='PATH-AGR-001'
and not exists (select 1 from public.knowledge_checks kc where kc.module_id=public.curriculum_modules.id and kc.title='Agriculture Foundations Check');
