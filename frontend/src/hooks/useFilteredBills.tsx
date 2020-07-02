import { Bill, Filter, Category } from "../types";
import { useState, useEffect } from "react";

export default function useFilteredBill(
  bills: Bill[],
  categories: Map<String, Category>,
  filter: Filter
) {
  const [filteredBills, setfilteredBills] = useState(bills);

  useEffect(() => {
    const filterKeys = Object.keys(filter);

    console.log("Change filtered bills.");
    setfilteredBills(
      bills.filter((bill) => {
        if (filterKeys.length === 0) return true;
        for (const k of filterKeys) {
          switch (k) {
            case "time":
              const billTime = bill.time.toLocaleDateString().split("/");
              if (
                filter.time &&
                filter.time
                  .split("/")
                  .some((num, index) => num !== billTime[index])
              )
                return false;
              break;
            case "category":
              if (
                filter.category &&
                !bill.category.startsWith(
                  categories.get(filter.category)?.name || ""
                )
              )
                return false;
              break;
            case "type":
              if (filter.type && bill.type !== parseInt(filter.type || ""))
                return false;
              break;
          }
        }
        return true;
      })
    );
  }, [bills, filter, categories]);

  return filteredBills;
}
