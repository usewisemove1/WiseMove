import { cardBaseStyles, cn } from "@/lib/utils";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div
        className={cn(
          cardBaseStyles,
          "flex flex-col items-center justify-center px-6 py-16 text-center"
        )}
      >
        <p className="text-lg font-semibold text-foreground">
          Profile settings coming soon
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          You&apos;ll be able to update your name, contact details, and
          verification status here.
        </p>
      </div>
    </div>
  );
}
