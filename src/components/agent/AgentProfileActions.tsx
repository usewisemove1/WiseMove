"use client";

import { FormEvent, useState } from "react";
import { Calendar, CheckCircle2, Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AgentProfileActionsProps {
  agentName: string;
  email: string;
  whatsapp: string;
}

export default function AgentProfileActions({ agentName, email, whatsapp }: AgentProfileActionsProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const message = encodeURIComponent(`Hi ${agentName}, I found your profile on WiseMove and would like to discuss a property.`);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return <>
    <div className="flex flex-wrap gap-2 sm:pb-1">
      <Button variant="outline" type="button" onClick={() => { setSent(false); setOpen(true); }}><Calendar className="h-4 w-4" /> Request a call</Button>
      <Button asChild><a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a></Button>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        {sent ? <div className="py-7 text-center"><CheckCircle2 className="mx-auto h-11 w-11 text-emerald-600" /><DialogTitle className="mt-4">Request sent</DialogTitle><p className="mt-2 text-sm text-muted-foreground">{agentName} will receive your request and can get back to you using your account contact details.</p><Button className="mt-6" onClick={() => setOpen(false)}>Done</Button></div> : <>
          <DialogHeader><DialogTitle>Request a call with {agentName}</DialogTitle><DialogDescription>Tell the agent a little about what you&apos;re looking for.</DialogDescription></DialogHeader>
          <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-semibold text-foreground">Your message<textarea required rows={4} className="mt-1.5 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="I’m looking for a two-bedroom apartment in Lekki…" /></label><DialogFooter><Button type="submit" className="w-full sm:w-auto">Send request</Button></DialogFooter></form>
          <a href={`mailto:${email}`} className="text-center text-sm font-semibold text-primary hover:underline"><Mail className="mr-1 inline h-4 w-4" /> Email agent instead</a>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}
