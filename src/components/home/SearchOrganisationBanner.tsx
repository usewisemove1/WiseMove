import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

export default function SearchOrganisationBanner() {
  return <section className="border-b border-border bg-white"><PageShell innerClassName="py-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Bell className="h-5 w-5" /></span><div><h2 className="font-bold text-foreground">Stay organised while you search</h2><p className="mt-1 text-sm text-muted-foreground">Save properties, create alerts, and keep your viewings and enquiries in one place.</p></div></div><Button asChild variant="outline" className="shrink-0"><Link href="/register">Create an account <ArrowRight className="h-4 w-4" /></Link></Button></div></PageShell></section>;
}
