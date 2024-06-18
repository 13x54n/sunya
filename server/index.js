const cluster = require("cluster");
const os = require("os");
const express = require("express");
const { exec } = require("child_process");

const app = express();

// Create a route to generate logs
app.get("/api/analyze", (req, res) => {
  const bashScriptPath = "./scripts/Detector.sh";

  const repoUrl = "https://github.com/13x54n/sunya.git";
  let repoName;
  const targetDir = `./temp-audit-storage/${Date.now()}`;

  const regex = /\/([^\/]+)\.git$/;
  const match = repoUrl.match(regex);

  if (match) {
    repoName = match[1];
  } else {
    res.status(400).send("Invalid repository URL");
    return;
  }

  exec(`bash ${bashScriptPath} "${repoUrl}" "${repoName}" "${targetDir}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      res.status(500).send(`Error executing script: ${error}`);
      return;
    }

    // Combine stdout and stderr into a single response
    let response = `Script output:\n${stdout}`;
    if (stderr) {
      response += `\nScript errors:\n${stderr}`;
    }

    res.send(response);
  });
});

// Cluster mode: Master process forks workers for each CPU core
if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Worker processes handle HTTP server
  app.listen(3001, () => {
    console.log(`Worker ${process.pid} started and listening on port 3001`);
  });
}
