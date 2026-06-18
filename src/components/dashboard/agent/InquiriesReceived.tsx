"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatRelativeTime,
  MOCK_INQUIRIES,
} from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";
import type { Inquiry } from "@/types";

export default function InquiriesReceived() {
  const [replyTarget, setReplyTarget] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReplyTarget(null);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Inquiries Received
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {MOCK_INQUIRIES.filter((i) => !i.isRead).length} unread inquiries
        </p>
      </div>

      <ul className="space-y-4">
        {MOCK_INQUIRIES.map((inquiry) => (
          <li
            key={inquiry.id}
            className={cn(
              cardBaseStyles,
              "relative p-4 sm:p-5",
              !inquiry.isRead && "border-primary/20 bg-primary/[0.02]"
            )}
          >
            {!inquiry.isRead && (
              <span
                className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-primary"
                aria-label="Unread"
              />
            )}

            <div className="flex gap-3 sm:gap-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {inquiry.senderAvatar ? (
                  <Image
                    src={inquiry.senderAvatar}
                    alt={inquiry.senderName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary">
                    {inquiry.senderName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-semibold text-foreground">
                    {inquiry.senderName}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(inquiry.timestamp)}
                  </span>
                </div>

                <Link
                  href={`/property/${inquiry.propertyId}`}
                  className="mt-0.5 block text-sm font-medium text-primary hover:underline"
                >
                  {inquiry.propertyTitle}
                </Link>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {inquiry.message}
                </p>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => {
                    setReplyTarget(inquiry);
                    setReplyText(
                      `Hi ${inquiry.senderName},\n\nThank you for your interest in ${inquiry.propertyTitle}. `
                    );
                  }}
                >
                  Reply
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Dialog
        open={replyTarget !== null}
        onOpenChange={(open) => !open && setReplyTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Reply to {replyTarget?.senderName}
            </DialogTitle>
            <DialogDescription>
              Re: {replyTarget?.propertyTitle}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleReplySubmit} className="space-y-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Write your reply..."
            />
            <DialogFooter>
              <Button type="submit">Send Reply</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
