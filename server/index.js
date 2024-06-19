const cluster = require("cluster");
const os = require("os");
const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const morgan = require("morgan"); // Import morgan middleware

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Morgan middleware to log HTTP requests
app.use(morgan("dev"));

// Create a route to generate logs
app.post("/api/analyze", (req, res) => {
  const bashScriptPath = "./scripts/detector.sh";

  const { repoUrl, projectOwner } = req.body;
  let repoName;
  const targetDir = `./temp-audit-storage/${Date.now()}`;

  const regex = /\/([^\/]+)\.git$/;
  const match = repoUrl.match(regex);

  if (!match) {
    res.status(400).send("Invalid repository URL");
    return;
  }

  repoName = match[1];

  exec(
    `bash ${bashScriptPath} "${repoUrl}" "${repoName}" "${targetDir}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        res.status(500).send(`Error executing script: ${error}`);
        return;
      }

      // Combine stdout and stderr into a single response
      let response = `Script output:\n${stdout}`;
      if (stderr) {
        response += `\nScript output:\n${stderr}`;
      }

      res.send(response);

      exec(
        `rm -rf ${targetDir}`,
        (cleanupError, cleanupStdout, cleanupStderr) => {
          if (cleanupError) {
            console.error(`Error cleaning up: ${cleanupError}`);
          }
          console.log(`Cleanup stdout: ${cleanupStdout}`);
          console.error(`Cleanup stderr: ${cleanupStderr}`);
        }
      );
    }
  );
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
