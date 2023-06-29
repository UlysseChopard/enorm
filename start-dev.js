const { spawn } = require("child_process");

spawn("docker compose up db", { stdio: "inherit", shell: true });

spawn("npm run -w api dev", { stdio: "inherit", shell: true });

spawn("npm run -w app dev", { stdio: "inherit", shell: true });
