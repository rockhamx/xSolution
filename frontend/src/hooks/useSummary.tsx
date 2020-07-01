import { Bill, Summary, BillType } from "../utils/types";
import { useState, useEffect } from "react";

const initialSummary = {
  income: 0,
  expenditure: 0,
  byCategories: new Map<string, number>(),
};

export const useSummary = (props: { bills: Bill[] }) => {
  const { bills } = props;
  const [summary, setSummary] = useState<Summary>(initialSummary);

  useEffect(() => {
    const sum = bills.reduce(
      (sum, bill) => {
        const billAmount = Math.abs(bill.amount);
        // 统计总收支
        if (bill.type === BillType.Earn) sum.income += billAmount;
        else sum.expenditure += billAmount;

        // 分类统计
        let sumByCat = sum.byCategories.get(bill.category);
        if (bill.type === BillType.Earn)
          sumByCat = sumByCat ? sumByCat + bill.amount : bill.amount;
        else sumByCat = sumByCat ? sumByCat - bill.amount : -bill.amount;

        sum.byCategories.set(bill.category, sumByCat);
        return sum;
      },
      {
        income: 0,
        expenditure: 0,
        byCategories: new Map<string, number>(),
      }
    );

    console.log("Changing summary.");
    setSummary(sum);
  }, [bills]);

  return summary;
};
