import { cn } from "@/lib/utils";

interface WiseMoveWordmarkProps {
  className?: string;
}

/** WiseMove text logo with gold "Wise", green "Move", and roof chevron. */
export default function WiseMoveWordmark({ className }: WiseMoveWordmarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-end font-sans text-[1.75rem] font-extrabold leading-none tracking-tight sm:text-[2rem]",
        className
      )}
    >
      <span className="text-[#ffb300]">Wise</span>
      <span className="relative text-[#004d40]">
        Move
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 20"
          aria-hidden="true"
          className="absolute -right-1 -top-2 h-2.5 w-4 sm:-top-2.5 sm:h-3 sm:w-5"
        >
          <path
            d="M5 15 L15 5 L25 15"
            fill="none"
            stroke="#ffb300"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}
