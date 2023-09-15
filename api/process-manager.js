const { log } = require("utils");
const { exec } = require("child_process");

const shutdown = server => {
  server.close(() => log.debug({ message: "gracefully shutdown server" }));
};

exec("ps | grep \".bin/[b]unyan\" | awk '{print $1}'", (err, stdout) => {
  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, () => {
      process.exit(stdout, signal);
      log.debug({ signal, message: "Close server" });
      shutdown(server);
    });
  });
});

