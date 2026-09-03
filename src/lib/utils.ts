import { type ClassValue } from "./types";

/** Tiny classnames joiner — avoids a dependency for a one-liner. */
export function cn(...values: ClassValue[]): string {
  return values.flat().filter(Boolean).join(" ");
}

/** Slugify a Thai/Latin string for use in URLs. Falls back to a timestamp. */
export function slugify(input: string): string {
  const base = input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return base || `item-${Date.now()}`;
}

const THAI_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

/** Format an ISO date as e.g. "มี.ค. 2568". Returns "" for empty input. */
export function formatThaiMonthYear(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${THAI_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/** Split a textarea value into trimmed, non-empty lines. */
export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
