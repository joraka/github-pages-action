const fs = require("fs");
let indexData = fs.readFileSync("./src/index.html", "utf-8");

indexData = indexData.replace('{{time}}', new Date().toISOString());

fs.writeFileSync('./public/index.html', indexData);