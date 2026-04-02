#!/usr/bin/env node

const { execSync } = require("child_process");

const cmd = process.argv[2];

const map = {
  dev: "npm run dev",
  build: "npm run build",
  start: "npm run start",
  lint: "npm run lint",
  typecheck: "npm run typecheck"
};

if (!map[cmd]) {
  console.log("SMG Commands:");
  console.log("  smg dev");
  console.log("  smg build");
  console.log("  smg start");
  console.log("  smg lint");
  console.log("  smg typecheck");
  process.exit(0);
}

execSync(map[cmd], { stdio: "inherit" });
