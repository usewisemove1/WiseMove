"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  Building2,
  Calendar,
  Clock,
  MessageCircle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PropertyCard from "@/components/property/PropertyCard";
import VerifiedBadge from "@/components/trust/VerifiedBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAgentFirstName } from "@/lib/mockAgentProfile";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";
import type { Agent, Property } from "@/types";

interface AgentProfileClientProps {
  agent: Agent;
  listings: Property[];
}

interface AgentStatItemProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

function AgentStatItem({ icon: Icon, value, label }: AgentStatItemProps) {
  return (
    <div className={cn(cardBaseStyles, "flex items-center gap-4 p-5")}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function AgentProfileClient({
  agent,
  listings,
}: AgentProfileClientProps) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultDate, setConsultDate] = useState("");
  const [consultTime, setConsultTime] = useState("");

  const firstName = getAgentFirstName(agent.name);
  const whatsappMessage = encodeURIComponent(
    `Hi ${agent.name}, I'd like to learn more about your available properties and services on WiseMove.`
  );
  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationOpen(false);
    setConsultDate("");
    setConsultTime("");
  };

  return (
    <>
      <PageShell dataComponent="agent-profile" innerClassName="pb-12 pt-0">
        {/* Banner + identity */}
        <section data-component="agent-profile-header" className="relative">
          <div
            className="h-32 bg-gradient-to-br from-primary via-primary to-primary/75 sm:h-40"
            aria-hidden="true"
          />

          <div className="relative -mt-16 sm:-mt-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white bg-muted shadow-lg sm:mx-0 sm:h-40 sm:w-40">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 128px, 160px"
                    priority
                  />
                </div>

                <div className="pb-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className={cn(typography.h1, "text-foreground")}>
                      {agent.name}
                    </h1>
                    {agent.isVerified ? (
                      <VerifiedBadge verified size="sm" />
                    ) : null}
                  </div>
                  {agent.title ? (
                    <p className={cn(typography.caption, "mt-1")}>
                      {agent.title}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:w-auto lg:justify-end">
                <Button
                  asChild
                  className="h-11 rounded-lg border-0 bg-[#25D366] text-base font-semibold text-white hover:bg-[#20bd5a]"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  type="button"
                  className="h-11 rounded-lg bg-primary text-base font-semibold hover:bg-primary/90"
                  onClick={() => setConsultationOpen(true)}
                >
                  <Calendar className="h-4 w-4" />
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          data-component="agent-profile-stats"
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <AgentStatItem
            icon={Building2}
            value={listings.length}
            label="Active Listings"
          />
          <AgentStatItem
            icon={Award}
            value={`${agent.yearsExperience} years`}
            label="Years Experience"
          />
          <AgentStatItem
            icon={Clock}
            value={agent.responseTime}
            label="Response Time"
          />
          <AgentStatItem
            icon={TrendingUp}
            value={agent.propertiesSoldCount}
            label="Properties Sold/Let"
          />
        </section>

        {/* Bio */}
        <section data-component="agent-profile-bio" className="mt-10 space-y-5">
          <h2 className={typography.h2}>About {firstName}</h2>

          <div className={cn(cardBaseStyles, "space-y-4 p-6 sm:p-8")}>
            {agent.bio.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className={cn(typography.body, "text-muted-foreground")}
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-6 space-y-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.specializations.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listings */}
        <section
          data-component="agent-profile-listings"
          className="mt-10 space-y-5"
        >
          <h2 className={typography.h2}>
            Active Listings ({listings.length})
          </h2>

          {listings.length === 0 ? (
            <div
              className={cn(
                cardBaseStyles,
                "flex flex-col items-center justify-center px-6 py-16 text-center"
              )}
            >
              <p className="text-lg font-semibold text-foreground">
                No active listings at the moment
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Check back soon or contact {firstName} directly to discuss
                upcoming opportunities.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layout="grid"
                />
              ))}
            </div>
          )}
        </section>
      </PageShell>

      <Dialog open={consultationOpen} onOpenChange={setConsultationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Consultation</DialogTitle>
            <DialogDescription>
              Schedule a consultation with {agent.name}. Our team will confirm
              your appointment shortly.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConsultationSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="consult-date"
                className="text-sm font-medium text-foreground"
              >
                Preferred date
              </label>
              <input
                id="consult-date"
                type="date"
                required
                value={consultDate}
                onChange={(e) => setConsultDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="consult-time"
                className="text-sm font-medium text-foreground"
              >
                Preferred time
              </label>
              <input
                id="consult-time"
                type="time"
                required
                value={consultTime}
                onChange={(e) => setConsultTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">
                Request Consultation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
