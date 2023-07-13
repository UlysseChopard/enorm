const { spawn } = require("child_process");

const nvm = spawn(`${process.env.HOME}/.nvm/nvm.sh use`, {
  stdio: "inherit",
  shell: true,
});
nvm.on("close", () => {
  spawn("docker compose up db", { stdio: "inherit", shell: true });

  spawn("npm run -w api dev", { stdio: "inherit", shell: true });

  spawn("npm run -w app dev", { stdio: "inherit", shell: true });
});
