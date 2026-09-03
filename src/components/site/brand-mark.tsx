interface BrandMarkProps {
  className?: string;
}

/** Geometric mark: a headrail with three descending slats. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <rect x="3" y="4" width="26" height="4" fill="currentColor" />
      <rect x="6" y="12" width="20" height="3" fill="currentColor" opacity="0.85" />
      <rect x="6" y="18" width="20" height="3" fill="currentColor" opacity="0.6" />
      <rect x="6" y="24" width="20" height="3" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
