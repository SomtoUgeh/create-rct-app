#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const templateConfig = require("./lib/config");
const argv = require("minimist")(process.argv.slice(2));
const {
  cleanUp,
  commitGit,
  addTemplates,
  createReactApp,
  installPackages,
  updatePackageDotJson
} = require("./lib/scripts");

const supportedTemplates = ["template-react", "template-react-ts"];

async function init() {
  const targetDir = argv._[0] || ".";
  const cwd = process.cwd();
  const root = path.join(cwd, targetDir);

  console.log(`  Scaffolding project in ${root}...`);

  await fs.ensureDir(root);
  const existing = await fs.readdir(root);

  if (existing.length) {
    const validFiles = [".", "..", ".git"];

    const checkFiles = existing
      .filter((file) => file.charAt(0) === ".")
      .filter((file) => !validFiles.includes(file));

    if (checkFiles.length) {
      console.error(
        `Error: ${path.relative(cwd, root)} directory is not empty.`
      );

      process.exit(0);
    }
  }

  const appName = `${path.relative(cwd, root)}` || ".";
  const appType = `template-${argv.t || argv.template || "react"}`;

  if (!appName.length) {
    console.log("Please enter a name for your new app.".red);
    return process.exit(0);
  }

  const app = supportedTemplates.filter((name) => name === appType);

  if (app.length === 0) {
    console.log(
      `App type: ${appType} is not yet supported by this CLI tool.`.red
    );

    return process.exit(0);
  }

  const res = await create(appName, appType);

  if (!res) {
    console.log("There was an error generating your app.".red);
    return process.exit(0);
  }

  return process.exit(0);
}

async function create(appName, template) {
  const preferredConfig = [];

  templateConfig.forEach((config) => {
    if (template === config.name) preferredConfig.push(config);
  });

  await createReactApp(appName, template);
  await installPackages(preferredConfig);
  await updatePackageDotJson(preferredConfig);
  await addTemplates(preferredConfig);
  await cleanUp(template);
  await commitGit();

  console.log();
  console.log(
    `  Created your new React app with: ${preferredConfig
      .map((_) => _.name)
      .join(", ")}.`.green
  );

  console.log("  Run your code: yarn dev (or `npm run dev`)");
  console.log();
  console.log("  Happy hacking!".blue);
  console.log();

  return true;
}

init().catch((e) => console.error(e));
