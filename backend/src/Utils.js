const fs = require("fs");
const csv = require("csv-parser");

/**
 * load CSV file from path
 * @param {string} path Valid types for path value in "fs"
 * @param {Object} options see csv-parser options
 * @return {Object[]} A list of csv row object
 */
const loadCSVfrom = (path, options) => {
  console.log(path);
  let list = [];
  // let id = 0;
  fs.createReadStream(path)
    .pipe(csv(options))
    .on("data", (data) => {
      // if (!data.id) data = { id: id++, ...data };
      list.push(data);
    });
  // .on("end", () => {});
  return list;
};

module.exports = { loadCSVfrom };
