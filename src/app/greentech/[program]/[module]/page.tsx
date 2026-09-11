import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { GreenTechModuleWorkspace } from "@/components/greentech-module-workspace";
import { getGreenTechModule, greenTechTiers } from "@/lib/greentech";
import { localizeHref, normalizeLanguage } from "@/lib/i18n6";

type PageProps={params:Promise<{program:string;module:string}>;searchParams?:Promise<{lang?:string}>};
export function generateStaticParams(){return greenTechTiers.flatMap(tier=>tier.modules.map(module=>({program:tier.slug,module:module.code})));}

export default async function GreenTechModulePage({params,searchParams}:PageProps){
 const {program,module:moduleCode}=await params;const query=searchParams?await searchParams:{};const language=normalizeLanguage(query.lang);const result=getGreenTechModule(program,moduleCode);if(!result)notFound();const {tier,module}=result;
 return <div className="program-page-shell" lang={language} dir={language==="ar"?"rtl":"ltr"}>
  <header className="program-topbar"><Link href={localizeHref(`/greentech/${tier.slug}`,language)} className="program-brand-link"><img src="/lifews-mark.svg" alt="LIFEWS"/><div><strong>{module.code}</strong><span>{tier.title}</span></div></Link><LanguageMenu currentLanguage={language}/></header>
  <main>
   <section className="program-detail-hero greentech-hero"><div className="program-detail-number">{module.code}</div><div><div className="gs-eyebrow">INTERACTIVE MODULE WORKSPACE</div><h1>{module.title}</h1><h2>{module.competency}</h2><p><strong>Module flow:</strong> five learning sections → questions & assessment → DIY & practical task.</p><div className="program-detail-actions"><Link href={localizeHref(`/greentech/${tier.slug}`,language)}>← Back to {tier.code}</Link><Link href={localizeHref("/greentech",language)}>GreenTech home</Link></div></div></section>
   <section className="program-content-section"><GreenTechModuleWorkspace tier={tier} module={module}/></section>
  </main>
 </div>;
}
