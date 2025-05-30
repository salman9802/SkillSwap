import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setPageTitle(title: string) {
  document.title = title;
}

export function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError | undefined,
) {
  return typeof error === "object" && error !== null && "status" in error;
}

export function getInitials(name: string | undefined) {
  return name
    ?.split(" ")
    .map((w) => w.charAt(0))
    .join();
}
