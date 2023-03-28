import fetch from "@/api";

export function get() {
  return fetch("/api/registrations", { credentials: "include" });
}
