import { cn } from "@/lib/utils";

interface FieldLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}

export function FieldLabel({ htmlFor, children, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-foreground"
    >
      {children}
      {required ? <span className="text-destructive"> *</span> : null}
    </label>
  );
}

interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

interface FieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function FieldInput({ className, error, ...props }: FieldInputProps) {
  return (
    <input
      {...props}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
    />
  );
}

interface FieldTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function FieldTextarea({
  className,
  error,
  ...props
}: FieldTextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
    />
  );
}

interface FieldSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export function FieldSelect({ className, error, ...props }: FieldSelectProps) {
  return (
    <select
      {...props}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
    />
  );
}
