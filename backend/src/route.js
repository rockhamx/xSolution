const router = require("express").Router();
const { loadCSVfrom } = require("./Utils");

let bills = loadCSVfrom("bill.csv", {
  mapValues: ({ header, value }) => {
    switch (header) {
      case "type":
      case "time":
      case "amount":
        return parseInt(value);
      default:
        return value;
    }
  },
});
let cats = loadCSVfrom("categories.csv", {
  mapValues: ({ header, value }) => {
    switch (header) {
      case "type":
        return parseInt(value);
      default:
        return value;
    }
  },
});

router
  .route("/bills")
  .get((_req, res) => {
    let result = { bills, cats: cats };
    // console.log(result);
    res.json(result);
  })
  .post((req, res) => {
    const { bill } = req.body;
    if (typeof bill === "object") {
      bills.push(bill);
    }
    res.json(req.body);
  });

router.get("/categories", (_req, res) => {
  res.json(cats);
});

module.exports = router;
