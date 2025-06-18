const fs = require("fs");
let indexData = fs.readFileSync("./src/index.html", "utf-8");

indexData = indexData.replace("{{time}}", new Date().toISOString());

const files = [];

const filesPath = "./public/files";
try {
  fs.mkdirSync(filesPath);
} catch (err) {}

for (let i = 0; i < 10000; i++) {
//   if (i > 10) break;
  const fileName = `${i}.txt`;
  fs.writeFileSync(`${filesPath}/${fileName}`, `${i} | ${parseInt(Math.random() * 1e16, 10)}`);
  files.push(fileName);
}

indexData = indexData.replace(
  "{{links}}",
  files.map((fileName) => `<a href="files/${fileName}">${fileName}</a>`).join("")
);

fs.writeFileSync("./public/index.html", indexData);

console.log("files built");
