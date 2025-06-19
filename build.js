const fs = require("fs");
require("dotenv").config();

let indexHTML = fs
  .readFileSync("./src/index.html", "utf-8")
  .replaceAll("{{time}}", new Date().toISOString());

const isDevEnv = process.env?.BUILD_TYPE !== "prod";

const filesNamesList = [];
const filesPath = "./public/files";

fs.mkdirSync(filesPath, { recursive: true });

const randInt = () => parseInt(Math.random() * 1e16, 10);

for (let i = 0; i < 1_00_000; i++) {
  if (isDevEnv && i > 10) break;
  const fileName = `${i}.txt`;
  fs.writeFileSync(
    `${filesPath}/${fileName}`,
    `${i} | ${randInt()} | ${randInt()} | ${randInt()} | ${randInt()}`
  );
  filesNamesList.push(fileName);
}

indexHTML = indexHTML.replace(
  "{{links}}",
  filesNamesList
    .filter((_, index) => index % 5000 === 0 || index === filesNamesList.length - 1)
    .map((fileName) => `<a href="files/${fileName}">${fileName}</a>`)
    .join("<br>")
);

fs.writeFileSync("./public/index.html", indexHTML);

console.log("files built");
