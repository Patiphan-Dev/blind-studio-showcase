import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared wrapper: 24×24, 1.5px stroke, inherits color via `currentColor`. */
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5c0 8.284 6.716 15 15 15 .87 0 1.6-.7 1.6-1.57v-2.4a1.3 1.3 0 0 0-1-1.27l-3-.7a1.3 1.3 0 0 0-1.35.53l-.8 1.1a11.4 11.4 0 0 1-4.97-4.97l1.1-.8a1.3 1.3 0 0 0 .53-1.35l-.7-3A1.3 1.3 0 0 0 8.87 3.4H6.47C5.6 3.4 5 4.13 5 5" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M4 7l8 6 8-6" />
  </Svg>
);

export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 4V5.5Z" />
  </Svg>
);

export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12.5l5 5 11-11" />
  </Svg>
);

export const RulerIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="7" width="19" height="10" rx="1.2" />
    <path d="M7 7v3M11 7v4M15 7v3M19 7v4" />
  </Svg>
);

export const SwatchIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h6v13a3 3 0 1 1-6 0V4Z" />
    <path d="M11 8.5l4-1.6 3.7 9.2a3 3 0 0 1-5.6 2.2" />
    <circle cx="8" cy="17" r=".6" fill="currentColor" />
  </Svg>
);

export const WrenchIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 6a4 4 0 0 0-5 5l-6 6 2 2 6-6a4 4 0 0 0 5-5l-2.5 2.5L14.5 12l-1.5-1.5L15.5 8 15 6Z" />
  </Svg>
);

export const FacebookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1Z" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="16.5" cy="7.5" r=".7" fill="currentColor" />
  </Svg>
);
