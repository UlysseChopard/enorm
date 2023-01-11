export function get() {
  return fetch("/api/registrations", { credentials: "include" });
};
