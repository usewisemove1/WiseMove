"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, FileText, ShieldCheck, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAgentVerificationStore } from "@/store/useAgentVerificationStore";

const inputClass = "mt-1.5 block w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function AgentVerificationPortal() {
  const router = useRouter();
  const { status, submittedAt, submit, approveForDemo } = useAgentVerificationStore();
  const [agency, setAgency] = useState("");
  const [licence, setLicence] = useState("");
  const [identityFile, setIdentityFile] = useState("");
  const [licenceFile, setLicenceFile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agency.trim() || !licence.trim() || !identityFile || !licenceFile) {
      setError("Add your agency details and both verification documents to continue.");
      return;
    }
    submit();
    setError("");
  };

  if (status === "approved") {
    return <div className="mx-auto max-w-2xl py-8">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">You&apos;re a verified agent</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Your profile is approved and you can now publish properties for prospective buyers.</p>
        <Button className="mt-6" onClick={() => router.push("/dashboard/listings/new")}>Upload a property</Button>
      </div>
    </div>;
  }

  if (status === "in_review") {
    return <div className="mx-auto max-w-2xl py-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
        <Clock3 className="mx-auto h-12 w-12 text-amber-600" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Verification in review</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">We received your verification request{submittedAt ? ` on ${new Date(submittedAt).toLocaleDateString()}` : ""}. We&apos;ll notify you once it has been reviewed.</p>
        <div className="mt-6 rounded-lg border border-amber-200 bg-white p-4 text-left text-sm text-muted-foreground"><strong className="text-foreground">Demo mode:</strong> approval is normally completed by our team. Use the button below to preview the approved experience.</div>
        <Button variant="outline" className="mt-4" onClick={approveForDemo}>Preview approved portal</Button>
      </div>
    </div>;
  }

  return <div className="mx-auto max-w-2xl py-4 sm:py-8">
    <div className="mb-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"><ShieldCheck className="h-3.5 w-3.5" /> Agent verification</span>
      <h1 className="mt-3 text-3xl font-bold text-foreground">Become a verified property agent</h1>
      <p className="mt-2 text-muted-foreground">Complete your profile and submit your credentials. Verified agents can upload and manage property listings.</p>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-7">
      <section><h2 className="font-bold text-foreground">Agency details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Agency or trading name<input value={agency} onChange={(e) => setAgency(e.target.value)} className={inputClass} placeholder="e.g. Brightstone Realty" /></label>
        <label className="text-sm font-semibold">Licence / registration number<input value={licence} onChange={(e) => setLicence(e.target.value)} className={inputClass} placeholder="Enter registration number" /></label>
      </div></section>
      <section className="border-t border-border pt-6"><h2 className="font-bold text-foreground">Verification documents</h2><p className="mt-1 text-sm text-muted-foreground">Upload a government-issued photo ID and a current agency licence or registration certificate.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="cursor-pointer rounded-xl border border-dashed border-primary/40 bg-primary/[0.03] p-4 text-center hover:bg-primary/[0.06]"><Upload className="mx-auto h-5 w-5 text-primary" /><span className="mt-2 block text-sm font-semibold">Photo ID</span><span className="mt-1 block truncate text-xs text-muted-foreground">{identityFile || "Choose a file"}</span><input type="file" className="sr-only" accept="image/*,.pdf" onChange={(e) => setIdentityFile(e.target.files?.[0]?.name ?? "")} /></label>
        <label className="cursor-pointer rounded-xl border border-dashed border-primary/40 bg-primary/[0.03] p-4 text-center hover:bg-primary/[0.06]"><FileText className="mx-auto h-5 w-5 text-primary" /><span className="mt-2 block text-sm font-semibold">Agency licence</span><span className="mt-1 block truncate text-xs text-muted-foreground">{licenceFile || "Choose a file"}</span><input type="file" className="sr-only" accept="image/*,.pdf" onChange={(e) => setLicenceFile(e.target.files?.[0]?.name ?? "")} /></label>
      </div></section>
      {error && <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap items-center gap-3"><Button type="submit">Submit for verification</Button><Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Back to dashboard</Link></div>
    </form>
  </div>;
}
