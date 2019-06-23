const fs = require("fs");
const tar = require("tar");
const project = JSON.parse(fs.readFileSync("package.json"));
const source = "dist/" + project.name;
const dest = "../../docker/web/dist/app-" + project.version +".tgz";

console.log("Start compression of " + project.name + "-" + project.version);

tar.c(
    {
        file: dest,
        unlink: true,
        cwd: source
    },
    ["."]
).then(_=> console.log("Project compressed and copied in " + dest));