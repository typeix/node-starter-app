const fs = require("fs");
// create reports
const packages = JSON.parse(fs.readFileSync("./lerna.json", {encoding: "utf8"}))
  .packages
  .map(name =>  name + "/coverage/lcov.info");

exports.module = Promise.all(
  packages.map(file => {
    console.log("file", file);
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  })
)
  .then(data =>
    new Promise(
      resolve =>
        fs.writeFile("./lcov.info", Buffer.concat(data), resolve))
  )
  .catch(error => console.error(error));
