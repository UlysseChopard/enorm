const { spawn, exec } = require("child_process");

spawn("docker compose up db", { stdio: "inherit", shell: true }).on(
  "close",
  () => exec("docker compose down")
);

spawn("npm run -w api dev", { stdio: "inherit", shell: true });

spawn("npm run -w app dev", { stdio: "inherit", shell: true });

process.on("SIGINT", () => console.log("SIGINT"));
process.on("SIGTERM", () => console.log("SIGTERM"));
