require("colors");
const shell = require("shelljs");
shell.config.silent = true;
const ora = require("ora");
const fse = require("fs-extra");
const set = require("lodash.set");

const createReactApp = (appName, templateType) => {
  let reactScript;
  const spinner = ora("Running create-rct-app...").start();

  switch (templateType) {
    case "template-react":
      reactScript = `npx create-react-app ${appName} --use-yarn`;
      break;

    case "template-react-ts":
      reactScript = `npx create-react-app ${appName} --template typescript --use-yarn`;
      break;

    case "template-next":
      reactScript = "next-js";
      break;

    case "template-next-ts":
      reactScript = "next-ts";
      break;

    default:
      reactScript = "";
      break;
  }

  return new Promise((resolve, reject) => {
    shell.exec(reactScript, () => {
      const cdRes = shell.cd(appName);

      if (cdRes.code !== 0) {
        console.log(`Error changing directory to: ${appName}`.red);
        reject();
      }

      spinner.succeed();
      resolve();
    });
  });
};

const cleanUp = (templateType) => {
  const spinner = ora("Cleaning up repo...");

  const testFile =
    templateType === "template-react" ? "src/App.test.js" : "src/App.test.tsx";

  return new Promise((resolve) => {
    shell.exec(
      `rm src/App.css ${testFile} src/logo.svg src/index.css && yarn format`,
      () => {
        spinner.succeed();
        resolve();
      }
    );
  });
};

const commitGit = () => {
  const spinner = ora("Committing files to Git...");

  return new Promise((resolve) => {
    shell.exec(
      "git add . && git commit --no-verify -m 'secondary commit from rct-app'",
      () => {
        spinner.succeed();
        resolve();
      }
    );
  });
};

const installPackages = async (configList) => {
  let dependencies = [];
  let devDependencies = [];

  configList.forEach((config) => {
    dependencies = [...dependencies, ...config.dependencies];
    devDependencies = [...devDependencies, ...config.devDependencies];
  });

  await new Promise((resolve) => {
    const spinner = ora("Installing additional dependencies...").start();

    shell.exec(`yarn add ${dependencies.join(" ")}`, () => {
      spinner.succeed();
      resolve();
    });
  });

  await new Promise((resolve) => {
    const spinner = ora("Installing additional dev dependencies...").start();

    shell.exec(`yarn add --dev ${devDependencies.join(" ")}`, () => {
      spinner.succeed();
      resolve();
    });
  });
};

const updatePackageDotJson = (configList) => {
  const spinner = ora("Updating package.json scripts...");

  let packageEntries = configList.reduce(
    (acc, val) => [...acc, ...val.packageEntries],
    []
  );

  return new Promise((resolve) => {
    const rawPackage = fse.readFileSync("package.json");
    const myPackage = JSON.parse(rawPackage);

    packageEntries.forEach((script) => {
      // Lodash `set` allows us to dynamically set nested keys within objects
      // i.e. scripts.foo = "bar" will add an entry to the foo field in scripts
      set(myPackage, script.key, script.value);
    });

    fse.writeFile("package.json", JSON.stringify(myPackage, null, 2), function (
      err
    ) {
      if (err) {
        spinner.fail();
        return console.log(err);
      }

      spinner.succeed();
      resolve();
    });
  });
};

const addTemplates = (configList) => {
  const spinner = ora("Adding templates...");

  const templateList = configList.reduce(
    (acc, val) => [...acc, ...val.templates],
    []
  );

  return new Promise((resolve) => {
    templateList.forEach((template) => {
      // outputFile creates a directory when it doesn't exist
      fse.outputFile(template.path, template.file, (err) => {
        if (err) {
          return console.log(err);
        }
      });
    });

    spinner.succeed();
    resolve();
  });
};

module.exports = {
  createReactApp,
  cleanUp,
  commitGit,
  installPackages,
  updatePackageDotJson,
  addTemplates
};
