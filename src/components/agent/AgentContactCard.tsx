"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Agent, Property } from "@/types";

interface AgentContactCardProps {
  agent: Agent;
  property: Property;
  className?: string;
}

export default function AgentContactCard({
  agent,
  property,
  className,
}: AgentContactCardProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");

  const whatsappMessage = encodeURIComponent(
    `Hi ${agent.name}, I'm interested in viewing "${property.title}" in ${property.city}. Is it still available?`
  );
  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingOpen(false);
    setVisitDate("");
    setVisitTime("");
  };

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-border/60 bg-white p-5 shadow-sm",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-base font-bold text-foreground">{agent.name}</p>
            {agent.title && (
              <p className="text-sm text-muted-foreground">{agent.title}</p>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Button
            type="button"
            className="h-11 w-full rounded-lg bg-primary text-base font-semibold hover:bg-primary/90"
            onClick={() => setBookingOpen(true)}
          >
            <Calendar className="h-4 w-4" />
            Book a View
          </Button>

          <Button
            asChild
            className="h-11 w-full rounded-lg border-0 bg-[#25D366] text-base font-semibold text-white hover:bg-[#20bd5a]"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href={`/agent/${agent.id}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
          >
            View Agent Portal
          </Link>
        </div>
      </div>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Viewing</DialogTitle>
            <DialogDescription>
              Schedule a visit to {property.title}. Our team will confirm your
              appointment shortly.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="visit-date"
                className="text-sm font-medium text-foreground"
              >
                Preferred date
              </label>
              <input
                id="visit-date"
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="visit-time"
                className="text-sm font-medium text-foreground"
              >
                Preferred time
              </label>
              <input
                id="visit-time"
                type="time"
                required
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">
                Request Viewing
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
