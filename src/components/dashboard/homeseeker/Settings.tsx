import { cardBaseStyles, cn } from "@/lib/utils";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Notifications, privacy, and account preferences
        </p>
      </div>

      <div
        className={cn(
          cardBaseStyles,
          "flex flex-col items-center justify-center px-6 py-16 text-center"
        )}
      >
        <p className="text-lg font-semibold text-foreground">
          Settings coming soon
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Configure email alerts, language, and security options from this page.
        </p>
      </div>
    </div>
  );
}
