import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import PageShell from "@/components/layout/PageShell";
import AgentProfileActions from "@/components/agent/AgentProfileActions";
import BackToResultsButton from "@/components/agent/BackToResultsButton";
import { MOCK_AGENT, MOCK_CONTINENTAL_PENTHOUSE } from "@/lib/mockPropertyDetail";
import { mockProperties } from "@/lib/mockProperties";

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = MOCK_AGENT;
  const listings = [MOCK_CONTINENTAL_PENTHOUSE, ...mockProperties.slice(0, 2)];
  const whatsapp = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hi ${agent.name}, I found your agent profile on WiseMove and would like to discuss a property.`)}`;

  return (
    <PageShell innerClassName="py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <BackToResultsButton />
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-primary via-primary/80 to-accent sm:h-36" />
          <div className="relative px-5 pb-6 sm:px-8">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-muted shadow-md sm:h-32 sm:w-32">
                  <Image src={agent.photo} alt={agent.name} fill className="object-cover" sizes="128px" priority />
                </div>
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold text-foreground sm:text-3xl">{agent.name}</h1><span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800"><BadgeCheck className="h-3.5 w-3.5" /> Verified agent</span></div>
                  <p className="mt-1 text-sm text-muted-foreground">{agent.title} · WiseMove Property Network</p>
                </div>
              </div>
              <AgentProfileActions agentName={agent.name} email={agent.email} whatsapp={agent.whatsapp} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4"><Stat icon={Building2} label="Active listings" value={String(agent.totalListings)} /><Stat icon={Star} label="Client rating" value={`${agent.rating} / 5`} /><Stat icon={Clock3} label="Typically responds" value={agent.responseTime} /><Stat icon={MapPin} label="Primary market" value="Lagos, Nigeria" /></div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <main>
            <section><h2 className="text-2xl font-bold text-foreground">About {agent.name.split(" ")[0]}</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">With a focus on carefully vetted homes across Lagos, {agent.name} helps clients move with confidence. Every listed property is reviewed for location, ownership signals and listing quality before it is shared with prospective tenants and buyers.</p></section>
            <section className="mt-9"><div className="flex items-end justify-between"><div><h2 className="text-2xl font-bold text-foreground">Featured listings</h2><p className="mt-1 text-sm text-muted-foreground">Properties currently represented by this agent.</p></div><Link href="/search" className="text-sm font-bold text-primary hover:underline">Browse all properties</Link></div><div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{listings.map((property) => <PropertyCard key={property.id} property={property} layout="grid" />)}</div></section>
            <section className="mt-9 rounded-2xl bg-primary p-6 text-white sm:p-8"><h2 className="text-xl font-bold">Looking for something specific?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/80">Send {agent.name.split(" ")[0]} your preferred location, budget and move-in date. They&apos;ll help narrow down suitable, verified options.</p><div className="mt-5"><AgentProfileActions agentName={agent.name} email={agent.email} whatsapp={agent.whatsapp} /></div></section>
          </main>
          <aside className="h-fit rounded-2xl border border-border bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-foreground"><ShieldCheck className="h-5 w-5 text-primary" /><h2 className="font-bold">Agent verification</h2></div><p className="mt-3 text-sm leading-6 text-muted-foreground">This professional&apos;s identity and agency credentials have been checked by WiseMove.</p><div className="mt-5 space-y-3 border-t border-border pt-5"><a href={`tel:+${agent.phone}`} className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary"><Phone className="h-4 w-4 text-primary" /> +{agent.phone}</a><a href={`mailto:${agent.email}`} className="flex items-center gap-3 break-all text-sm font-semibold text-foreground hover:text-primary"><Mail className="h-4 w-4 shrink-0 text-primary" /> {agent.email}</a></div><Button asChild className="mt-5 w-full"><a href={whatsapp} target="_blank" rel="noopener noreferrer">Message agent</a></Button><p className="mt-3 text-center text-xs text-muted-foreground">Reference: {params.id}</p></aside>
        </div>
      </div>
    </PageShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return <div className="rounded-xl bg-muted/60 p-3"><Icon className="h-4 w-4 text-primary" /><p className="mt-2 text-sm font-bold text-foreground">{value}</p><p className="mt-0.5 text-xs text-muted-foreground">{label}</p></div>;
}
